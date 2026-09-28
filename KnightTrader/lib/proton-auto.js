'use strict';

// Signs in with the saved Proton login and writes one WireGuard profile per
// BloFin-allowed free country. Tunnels are brought up later as KnightTrader-*.

const { createHash, generateKeyPairSync } = require('crypto');
const fs = require('fs');
const path = require('path');
const vpn = require('../vpn');

const API = 'https://vpn-api.proton.me';
const APP_VERSION = 'linux-vpn@4.13.1';
const FREE_COUNTRIES = ['NL', 'JP', 'RO', 'PL'];

function localUsername(email) {
  const raw = String(email || '').trim();
  const at = raw.indexOf('@');
  return at === -1 ? raw : raw.slice(0, at);
}

async function api(pathname, { method, body, session } = {}) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-pm-appversion': APP_VERSION,
    'User-Agent': 'ProtonVPN/4.13.1 (Linux; Ubuntu)',
  };
  if (session?.AccessToken) headers.Authorization = `Bearer ${session.AccessToken}`;
  if (session?.UID) headers['x-pm-uid'] = session.UID;
  const res = await fetch(`${API}${pathname}`, {
    method: method || (body ? 'POST' : 'GET'),
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data = {};
  try { data = text ? JSON.parse(text) : {}; } catch (_) { data = { Error: text.slice(0, 180) }; }
  return { status: res.status, data };
}

function sessionPath(userDataPath) {
  return path.join(userDataPath, 'proton', 'session.json');
}

function keysPath(userDataPath) {
  return path.join(userDataPath, 'proton', 'wg-keys.json');
}

function readJson(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch (_) { return null; }
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value), 'utf8');
}

async function login(userDataPath, email, password) {
  const cached = readJson(sessionPath(userDataPath));
  if (cached?.AccessToken && cached?.UID) {
    const check = await api('/vpn', { session: cached });
    if (check.status === 200 && check.data?.Code === 1000) return cached;
  }
  const username = localUsername(email);
  const infoRes = await api('/auth/info', { method: 'POST', body: { Username: username } });
  const info = infoRes.data || {};
  if (infoRes.status !== 200 || info.Code !== 1000) {
    throw new Error(info.Error || 'Proton rejected the account lookup');
  }
  if (info['2FA']?.Enabled === 1) {
    throw new Error('This Proton account has 2FA. Turn it off for the VPN login, or sign in once in the popup and retry.');
  }
  const { getSrp } = require('./vendor/proton-srp.cjs');
  const proofs = await getSrp(
    {
      Version: info.Version,
      Modulus: info.Modulus,
      ServerEphemeral: info.ServerEphemeral,
      Salt: info.Salt,
    },
    { username, password },
  );
  const authRes = await api('/auth', {
    method: 'POST',
    body: {
      Username: username,
      ClientEphemeral: proofs.clientEphemeral,
      ClientProof: proofs.clientProof,
      SRPSession: info.SRPSession,
    },
  });
  const auth = authRes.data || {};
  if (authRes.status !== 200 || auth.Code !== 1000 || !auth.AccessToken) {
    throw new Error(auth.Error || 'Proton sign-in failed');
  }
  if (auth.ServerProof && proofs.expectedServerProof && auth.ServerProof !== proofs.expectedServerProof) {
    throw new Error('Proton server proof did not match');
  }
  const session = {
    UID: auth.UID,
    AccessToken: auth.AccessToken,
    RefreshToken: auth.RefreshToken,
    username,
  };
  writeJson(sessionPath(userDataPath), session);
  return session;
}

function keyPair() {
  const { privateKey, publicKey } = generateKeyPairSync('ed25519');
  const publicDer = publicKey.export({ type: 'spki', format: 'der' });
  const pemBody = Buffer.from(publicDer).toString('base64').match(/.{1,64}/g).join('\n');
  const publicKeyPem = `-----BEGIN PUBLIC KEY-----\n${pemBody}\n-----END PUBLIC KEY-----\n`;
  const privateDer = Buffer.from(privateKey.export({ type: 'pkcs8', format: 'der' }));
  const seed = privateDer.subarray(-32);
  const hash = createHash('sha512').update(seed).digest();
  hash[0] &= 0xf8;
  hash[31] &= 0x7f;
  hash[31] |= 0x40;
  return { publicKeyPem, x25519Private: hash.subarray(0, 32).toString('base64') };
}

async function wireguardKeys(userDataPath, session, username) {
  const existing = readJson(keysPath(userDataPath));
  const now = Math.floor(Date.now() / 1000);
  if (existing?.x25519Private && existing?.username === username && now < (existing.expirationTime || 0)) {
    return existing;
  }
  const pair = keyPair();
  const certRes = await api('/vpn/v1/certificate', {
    method: 'POST',
    session,
    body: {
      ClientPublicKey: pair.publicKeyPem,
      ClientPublicKeyMode: 'EC',
      Mode: 'persistent',
      DeviceName: `KnightTrader-${username}`,
      Duration: '525600 min',
      Features: { NetShieldLevel: 0, RandomNAT: true, PortForwarding: false, SplitTCP: true },
    },
  });
  const cert = certRes.data || {};
  if (certRes.status !== 200 || cert.Code !== 1000) {
    throw new Error(cert.Error || 'Could not register a WireGuard key with Proton');
  }
  const saved = {
    username,
    publicKeyPem: pair.publicKeyPem,
    x25519Private: pair.x25519Private,
    expirationTime: cert.ExpirationTime || (now + 86400 * 30),
  };
  writeJson(keysPath(userDataPath), saved);
  return saved;
}

function pickPhysical(logicals, country, index) {
  const matches = (logicals || []).filter((server) => (
    String(server.ExitCountry || '').toUpperCase() === country
    && server.Tier === 0
    && server.Status === 1
    && Array.isArray(server.Servers)
  ));
  if (!matches.length) return null;
  const logical = matches[index % matches.length];
  const physical = (logical.Servers || []).find((item) => item.Status === 1 && item.X25519PublicKey && item.EntryIP);
  if (!physical) return null;
  return { logical, physical };
}

function renderConf(privateKey, physical) {
  return [
    '[Interface]',
    `PrivateKey = ${privateKey}`,
    'Address = 10.2.0.2/32',
    'DNS = 10.2.0.1',
    '',
    '[Peer]',
    `PublicKey = ${physical.X25519PublicKey}`,
    'AllowedIPs = 0.0.0.0/0',
    `Endpoint = ${physical.EntryIP}:51820`,
    '',
  ].join('\n');
}

async function writeCountryConfig({ userDataPath, email, password, country, serverIndex = 0 }) {
  const code = String(country || '').toUpperCase();
  if (!FREE_COUNTRIES.includes(code)) throw new Error(`${code} is not a free BloFin country`);
  const session = await login(userDataPath, email, password);
  const keys = await wireguardKeys(userDataPath, session, session.username);
  const logicalRes = await api('/vpn/v1/logicals', { session });
  const logicals = logicalRes.data?.LogicalServers || [];
  if (logicalRes.status !== 200) throw new Error(logicalRes.data?.Error || 'Could not list Proton servers');
  const picked = pickPhysical(logicals, code, serverIndex);
  if (!picked) throw new Error(`No free Proton server in ${code}`);
  const conf = renderConf(keys.x25519Private, picked.physical);
  const dest = path.join(vpn.VPN_CONFIG_DIR, `${code}.conf`);
  fs.mkdirSync(vpn.VPN_CONFIG_DIR, { recursive: true });
  fs.writeFileSync(dest, conf, 'utf8');
  return { ok: true, path: dest, country: code, server: picked.logical.Name || code };
}

module.exports = { writeCountryConfig, FREE_COUNTRIES };

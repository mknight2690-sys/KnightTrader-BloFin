'use strict';
// KnightTrader Autoselector — the ONLY inference provider for this app.
// Keys go in, inference comes out. Every model call (Hermes chat, crons,
// tests) hits this local OpenAI-compatible endpoint. It rotates across all
// Nous keys and free models on 429 / errors / truncated replies, with
// backoff, and never surfaces a raw rate-limit error to the caller.
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');

const UPSTREAM = 'https://inference-api.nousresearch.com/v1/chat/completions';
const PORT_CANDIDATES = [18083, 18084, 18085, 18086];
// Models that misbehave (cut off mid-turn). Never routed to.
const MODEL_BLACKLIST = new Set(['stealth/missingno']);
const KEY_COOLDOWN_MS = 60 * 1000;
const MODEL_COOLDOWN_MS = 10 * 60 * 1000;

let opts = { getPrimaryKey: () => '', getStoreKeys: () => [], getModels: async () => [], getDefaultModel: () => '', log: () => {} };
let server = null;
let activePort = null;
const keyCooldown = new Map();   // key -> until
const modelCooldown = new Map(); // model -> until

function isBlacklisted(m) {
  const id = String(m || '').trim().toLowerCase();
  return !id || MODEL_BLACKLIST.has(id) || [...MODEL_BLACKLIST].some((b) => id.startsWith(b));
}

function readKeyFiles() {
  const dirs = [
    path.join(os.homedir(), 'OneDrive', 'Documents'),
    path.join(os.homedir(), 'Documents'),
  ];
  const out = [];
  for (const d of dirs) {
    let names = [];
    try { names = fs.readdirSync(d); } catch { continue; }
    for (const n of names) {
      if (!/^nous api key.*\.txt$/i.test(n)) continue;
      try {
        const t = fs.readFileSync(path.join(d, n), 'utf8');
        const m = t.match(/sk-[A-Za-z0-9_\-]{10,}/g);
        if (m) out.push(...m);
      } catch {}
    }
  }
  return out;
}

function allKeys() {
  const env = Object.keys(process.env).filter((k) => /^NOUS_API_KEY(_\d+)?$/.test(k)).map((k) => process.env[k]);
  const list = [opts.getPrimaryKey(), ...(opts.getStoreKeys() || []), ...env, ...readKeyFiles()]
    .map((k) => String(k || '').trim()).filter((k) => k && k !== 'no-key-required');
  return [...new Set(list)];
}

async function modelOrder(requested) {
  let pool = [];
  try { pool = (await opts.getModels()) || []; } catch {}
  const ids = [requested, opts.getDefaultModel(), ...pool.map((m) => (typeof m === 'string' ? m : m?.id))]
    .map((m) => String(m || '').trim()).filter(Boolean);
  const now = Date.now();
  const uniq = [...new Set(ids)].filter((m) => !isBlacklisted(m));
  const fresh = uniq.filter((m) => !(modelCooldown.get(m) > now));
  const cooling = uniq.filter((m) => modelCooldown.get(m) > now);
  return [...fresh, ...cooling];
}

function post(key, payload, timeoutMs) {
  const body = JSON.stringify(payload);
  return new Promise((resolve) => {
    const req = https.request(UPSTREAM, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
        'Content-Length': Buffer.byteLength(body),
        'User-Agent': 'KnightTrader-Autoselector/1.0',
      },
      timeout: timeoutMs,
    }, (res) => {
      let raw = '';
      res.on('data', (c) => { raw += c; });
      res.on('end', () => resolve({ status: res.statusCode, raw }));
    });
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, raw: 'timeout' }); });
    req.on('error', (e) => resolve({ status: 0, raw: e.message }));
    req.write(body);
    req.end();
  });
}

// Returns null when the response is complete; otherwise a reason string.
function truncationReason(parsed) {
  const ch = parsed?.choices?.[0];
  if (!ch) return 'no-choices';
  const msg = ch.message || {};
  if (ch.finish_reason === 'length') return 'finish_reason=length';
  const tools = Array.isArray(msg.tool_calls) ? msg.tool_calls : [];
  for (const tc of tools) {
    const args = tc?.function?.arguments;
    if (!tc?.function?.name) return 'tool-call-missing-name';
    if (typeof args === 'string' && args.trim()) {
      try { JSON.parse(args); } catch { return 'tool-call-broken-json'; }
    }
  }
  const content = typeof msg.content === 'string' ? msg.content.trim()
    : Array.isArray(msg.content) ? msg.content.map((p) => p?.text || '').join('').trim() : '';
  if (!content && !tools.length) return 'empty-content';
  return null;
}

const isRateLimit = (status, raw) => status === 429 || /rate.?limit|hold up for a bit|too many requests/i.test(raw || '');

async function complete(payload) {
  const keys = allKeys();
  if (!keys.length) return { status: 503, body: { error: { message: 'Autoselector: no Nous API keys configured yet. Add a key in Setup.', type: 'autoselector_unavailable' } } };
  const deadline = Date.now() + 240000;
  for (let round = 0; round < 3 && Date.now() < deadline; round++) {
    const models = await modelOrder(payload.model);
    for (const model of models) {
      if (Date.now() > deadline) break;
      const now = Date.now();
      const usableKeys = keys.filter((k) => !(keyCooldown.get(k) > now));
      for (const key of (usableKeys.length ? usableKeys : keys)) {
        const res = await post(key, { ...payload, model, stream: false }, 120000);
        let parsed = null;
        try { parsed = JSON.parse(res.raw); } catch {}
        if (res.status >= 200 && res.status < 300 && parsed) {
          const bad = truncationReason(parsed);
          if (!bad) {
            modelCooldown.delete(model);
            return { status: 200, body: parsed, model };
          }
          opts.log(`🔁 Autoselector: ${model} returned an incomplete reply (${bad}) — retrying on another model`, 'warn');
          modelCooldown.set(model, Date.now() + MODEL_COOLDOWN_MS);
          break; // model problem, not key problem
        }
        if (isRateLimit(res.status, res.raw)) {
          keyCooldown.set(key, Date.now() + KEY_COOLDOWN_MS);
          opts.log(`🔁 Autoselector: rate-limited on key …${key.slice(-4)} / ${model} — rotating`, 'warn');
          continue; // next key, same model
        }
        if (res.status === 401 || res.status === 403) {
          keyCooldown.set(key, Date.now() + 30 * 60 * 1000);
          continue;
        }
        // model unavailable / 5xx / timeout -> next model
        modelCooldown.set(model, Date.now() + MODEL_COOLDOWN_MS);
        opts.log(`🔁 Autoselector: ${model} failed (${res.status} ${String(res.raw).replace(/\s+/g, ' ').slice(0, 160)}) — next model`, 'warn');
        break;
      }
    }
    await new Promise((r) => setTimeout(r, 2000 * Math.pow(2, round)));
  }
  return { status: 503, body: { error: { message: 'Autoselector: all models are busy right now; please retry in a minute.', type: 'autoselector_busy' } } };
}

function sendStream(res, parsed) {
  res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
  const ch = parsed.choices[0] || {};
  const msg = ch.message || {};
  const base = { id: parsed.id || `as-${Date.now()}`, object: 'chat.completion.chunk', created: parsed.created || Math.floor(Date.now() / 1000), model: parsed.model };
  const delta = { role: 'assistant' };
  if (msg.content != null) delta.content = msg.content;
  if (msg.reasoning != null) delta.reasoning = msg.reasoning;
  if (Array.isArray(msg.tool_calls) && msg.tool_calls.length) delta.tool_calls = msg.tool_calls.map((tc, i) => ({ index: i, ...tc }));
  res.write(`data: ${JSON.stringify({ ...base, choices: [{ index: 0, delta, finish_reason: null }] })}\n\n`);
  res.write(`data: ${JSON.stringify({ ...base, choices: [{ index: 0, delta: {}, finish_reason: ch.finish_reason || 'stop' }], usage: parsed.usage })}\n\n`);
  res.write('data: [DONE]\n\n');
  res.end();
}

function handler(req, res) {
  const url = (req.url || '').split('?')[0].replace(/\/+$/, '');
  if (req.method === 'GET' && (url === '' || url === '/health')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ ok: true, keys: allKeys().length, blacklist: [...MODEL_BLACKLIST] }));
  }
  if (req.method === 'GET' && url === '/v1/models') {
    modelOrder('').then((ms) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ object: 'list', data: ms.map((id) => ({ id, object: 'model', owned_by: 'autoselector' })) }));
    });
    return;
  }
  if (req.method === 'POST' && url === '/v1/chat/completions') {
    let raw = '';
    req.on('data', (c) => { raw += c; });
    req.on('end', async () => {
      let payload;
      try { payload = JSON.parse(raw); } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: { message: 'bad json' } }));
      }
      const wantStream = !!payload.stream;
      delete payload.stream_options;
      const out = await complete(payload);
      if (out.status === 200 && wantStream) return sendStream(res, out.body);
      res.writeHead(out.status, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(out.body));
    });
    return;
  }
  res.writeHead(404); res.end();
}

function tryListen(port) {
  return new Promise((resolve) => {
    const s = http.createServer(handler);
    s.once('error', () => resolve(null));
    s.listen(port, '127.0.0.1', () => resolve(s));
  });
}

async function start(o = {}) {
  opts = { ...opts, ...o };
  if (server) return activePort;
  for (const p of PORT_CANDIDATES) {
    const s = await tryListen(p);
    if (s) { server = s; activePort = p; break; }
  }
  if (server) opts.log(`✅ Autoselector running at http://127.0.0.1:${activePort}/v1 (${allKeys().length} Nous keys)`, 'success');
  return activePort;
}

const baseUrl = () => `http://127.0.0.1:${activePort || PORT_CANDIDATES[0]}/v1`;
module.exports = { start, baseUrl, complete, isBlacklisted, MODEL_BLACKLIST, allKeysCount: () => allKeys().length };

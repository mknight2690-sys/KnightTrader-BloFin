var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn2, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
  } catch (e8) {
    throw err = [e8], e8;
  }
};
var __commonJS = (cb, mod2) => function __require() {
  try {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  } catch (e8) {
    throw mod2 = 0, e8;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to2, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to2, key) && key !== except)
        __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to2;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));
var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

// node_modules/openpgp/dist/lightweight/sha512.min.mjs
function s(t8) {
  return t8 instanceof Uint8Array || ArrayBuffer.isView(t8) && "Uint8Array" === t8.constructor.name;
}
function i(t8) {
  if (!Number.isSafeInteger(t8) || t8 < 0) throw Error("positive integer expected, got " + t8);
}
function n(t8, ...e8) {
  if (!s(t8)) throw Error("Uint8Array expected");
  if (e8.length > 0 && !e8.includes(t8.length)) throw Error("Uint8Array expected of length " + e8 + ", got length=" + t8.length);
}
function r(t8) {
  if ("function" != typeof t8 || "function" != typeof t8.create) throw Error("Hash should be wrapped by utils.createHasher");
  i(t8.outputLen), i(t8.blockLen);
}
function h(t8, e8 = true) {
  if (t8.destroyed) throw Error("Hash instance has been destroyed");
  if (e8 && t8.finished) throw Error("Hash#digest() has already been called");
}
function o(t8, e8) {
  n(t8);
  const s8 = e8.outputLen;
  if (t8.length < s8) throw Error("digestInto() expects output buffer of length at least " + s8);
}
function c(...t8) {
  for (let e8 = 0; e8 < t8.length; e8++) t8[e8].fill(0);
}
function f(t8) {
  return new DataView(t8.buffer, t8.byteOffset, t8.byteLength);
}
function a(t8, e8) {
  return t8 << 32 - e8 | t8 >>> e8;
}
function l(t8, e8) {
  return t8 << e8 | t8 >>> 32 - e8 >>> 0;
}
function x(t8) {
  if (n(t8), d) return t8.toHex();
  let e8 = "";
  for (let s8 = 0; s8 < t8.length; s8++) e8 += b[t8[s8]];
  return e8;
}
function U(t8) {
  return t8 >= p && t8 <= g ? t8 - p : t8 >= y && t8 <= w ? t8 - (y - 10) : t8 >= A && t8 <= E ? t8 - (A - 10) : void 0;
}
function B(t8) {
  if ("string" != typeof t8) throw Error("hex string expected, got " + typeof t8);
  if (d) return Uint8Array.fromHex(t8);
  const e8 = t8.length, s8 = e8 / 2;
  if (e8 % 2) throw Error("hex string expected, got unpadded hex of length " + e8);
  const i8 = new Uint8Array(s8);
  for (let e9 = 0, n8 = 0; e9 < s8; e9++, n8 += 2) {
    const s9 = U(t8.charCodeAt(n8)), r8 = U(t8.charCodeAt(n8 + 1));
    if (void 0 === s9 || void 0 === r8) {
      const e10 = t8[n8] + t8[n8 + 1];
      throw Error('hex string expected, got non-hex character "' + e10 + '" at index ' + n8);
    }
    i8[e9] = 16 * s9 + r8;
  }
  return i8;
}
function L(t8) {
  return "string" == typeof t8 && (t8 = (function(t9) {
    if ("string" != typeof t9) throw Error("string expected");
    return new Uint8Array(new TextEncoder().encode(t9));
  })(t8)), n(t8), t8;
}
function k(...t8) {
  let e8 = 0;
  for (let s9 = 0; s9 < t8.length; s9++) {
    const i8 = t8[s9];
    n(i8), e8 += i8.length;
  }
  const s8 = new Uint8Array(e8);
  for (let e9 = 0, i8 = 0; e9 < t8.length; e9++) {
    const n8 = t8[e9];
    s8.set(n8, i8), i8 += n8.length;
  }
  return s8;
}
function I(t8) {
  const e8 = (e9) => t8().update(L(e9)).digest(), s8 = t8();
  return e8.outputLen = s8.outputLen, e8.blockLen = s8.blockLen, e8.create = () => t8(), e8;
}
function C(t8 = 32) {
  if (e && "function" == typeof e.getRandomValues) return e.getRandomValues(new Uint8Array(t8));
  if (e && "function" == typeof e.randomBytes) return Uint8Array.from(e.randomBytes(t8));
  throw Error("crypto.getRandomValues must be defined");
}
function F(t8, e8, s8) {
  return t8 & e8 ^ ~t8 & s8;
}
function D(t8, e8, s8) {
  return t8 & e8 ^ t8 & s8 ^ e8 & s8;
}
function V(t8, e8 = false) {
  return e8 ? { h: Number(t8 & _), l: Number(t8 >> M & _) } : { h: 0 | Number(t8 >> M & _), l: 0 | Number(t8 & _) };
}
function R(t8, e8 = false) {
  const s8 = t8.length;
  let i8 = new Uint32Array(s8), n8 = new Uint32Array(s8);
  for (let r8 = 0; r8 < s8; r8++) {
    const { h: s9, l: h7 } = V(t8[r8], e8);
    [i8[r8], n8[r8]] = [s9, h7];
  }
  return [i8, n8];
}
function K(t8, e8, s8, i8) {
  const n8 = (e8 >>> 0) + (i8 >>> 0);
  return { h: t8 + s8 + (n8 / 2 ** 32 | 0) | 0, l: 0 | n8 };
}
var t, e, u, d, b, p, g, y, w, A, E, m, H, O, G, v, N, X, _, M, S, j, q, T, z, J, P, Q, W, Y, Z, $, tt, et, st, it, nt, rt, ht, ot, ct, ft, at, lt, ut, dt, bt, xt, pt, gt, yt, wt, At, Et, Ut, Bt, Lt, kt, mt, It, Ht, Ct, Ft, Dt, Ot, Gt, vt, Nt, Xt, _t, Mt;
var init_sha512_min = __esm({
  "node_modules/openpgp/dist/lightweight/sha512.min.mjs"() {
    t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    e = "object" == typeof t && "crypto" in t ? t.crypto : void 0;
    u = /* @__PURE__ */ (() => 68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0])() ? (t8) => t8 : function(t8) {
      for (let s8 = 0; s8 < t8.length; s8++) t8[s8] = (e8 = t8[s8]) << 24 & 4278190080 | e8 << 8 & 16711680 | e8 >>> 8 & 65280 | e8 >>> 24 & 255;
      var e8;
      return t8;
    };
    d = /* @__PURE__ */ (() => "function" == typeof Uint8Array.from([]).toHex && "function" == typeof Uint8Array.fromHex)();
    b = /* @__PURE__ */ Array.from({ length: 256 }, ((t8, e8) => e8.toString(16).padStart(2, "0")));
    p = 48;
    g = 57;
    y = 65;
    w = 70;
    A = 97;
    E = 102;
    m = class {
    };
    H = I;
    O = class extends m {
      constructor(t8, e8, s8, i8) {
        super(), this.finished = false, this.length = 0, this.pos = 0, this.destroyed = false, this.blockLen = t8, this.outputLen = e8, this.padOffset = s8, this.isLE = i8, this.buffer = new Uint8Array(t8), this.view = f(this.buffer);
      }
      update(t8) {
        h(this), n(t8 = L(t8));
        const { view: e8, buffer: s8, blockLen: i8 } = this, r8 = t8.length;
        for (let n8 = 0; n8 < r8; ) {
          const h7 = Math.min(i8 - this.pos, r8 - n8);
          if (h7 !== i8) s8.set(t8.subarray(n8, n8 + h7), this.pos), this.pos += h7, n8 += h7, this.pos === i8 && (this.process(e8, 0), this.pos = 0);
          else {
            const e9 = f(t8);
            for (; i8 <= r8 - n8; n8 += i8) this.process(e9, n8);
          }
        }
        return this.length += t8.length, this.roundClean(), this;
      }
      digestInto(t8) {
        h(this), o(t8, this), this.finished = true;
        const { buffer: e8, view: s8, blockLen: i8, isLE: n8 } = this;
        let { pos: r8 } = this;
        e8[r8++] = 128, c(this.buffer.subarray(r8)), this.padOffset > i8 - r8 && (this.process(s8, 0), r8 = 0);
        for (let t9 = r8; t9 < i8; t9++) e8[t9] = 0;
        !(function(t9, e9, s9, i9) {
          if ("function" == typeof t9.setBigUint64) return t9.setBigUint64(e9, s9, i9);
          const n9 = BigInt(32), r9 = BigInt(4294967295), h7 = Number(s9 >> n9 & r9), o8 = Number(s9 & r9), c7 = i9 ? 4 : 0, f8 = i9 ? 0 : 4;
          t9.setUint32(e9 + c7, h7, i9), t9.setUint32(e9 + f8, o8, i9);
        })(s8, i8 - 8, BigInt(8 * this.length), n8), this.process(s8, 0);
        const a8 = f(t8), l6 = this.outputLen;
        if (l6 % 4) throw Error("_sha2: outputLen should be aligned to 32bit");
        const u8 = l6 / 4, d6 = this.get();
        if (u8 > d6.length) throw Error("_sha2: outputLen bigger than state");
        for (let t9 = 0; t9 < u8; t9++) a8.setUint32(4 * t9, d6[t9], n8);
      }
      digest() {
        const { buffer: t8, outputLen: e8 } = this;
        this.digestInto(t8);
        const s8 = t8.slice(0, e8);
        return this.destroy(), s8;
      }
      _cloneInto(t8) {
        t8 || (t8 = new this.constructor()), t8.set(...this.get());
        const { blockLen: e8, buffer: s8, length: i8, finished: n8, destroyed: r8, pos: h7 } = this;
        return t8.destroyed = r8, t8.finished = n8, t8.length = i8, t8.pos = h7, i8 % e8 && t8.buffer.set(s8), t8;
      }
      clone() {
        return this._cloneInto();
      }
    };
    G = /* @__PURE__ */ Uint32Array.from([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]);
    v = /* @__PURE__ */ Uint32Array.from([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]);
    N = /* @__PURE__ */ Uint32Array.from([3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428]);
    X = /* @__PURE__ */ Uint32Array.from([1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209]);
    _ = /* @__PURE__ */ BigInt(2 ** 32 - 1);
    M = /* @__PURE__ */ BigInt(32);
    S = (t8, e8, s8) => t8 >>> s8;
    j = (t8, e8, s8) => t8 << 32 - s8 | e8 >>> s8;
    q = (t8, e8, s8) => t8 >>> s8 | e8 << 32 - s8;
    T = (t8, e8, s8) => t8 << 32 - s8 | e8 >>> s8;
    z = (t8, e8, s8) => t8 << 64 - s8 | e8 >>> s8 - 32;
    J = (t8, e8, s8) => t8 >>> s8 - 32 | e8 << 64 - s8;
    P = (t8, e8, s8) => (t8 >>> 0) + (e8 >>> 0) + (s8 >>> 0);
    Q = (t8, e8, s8, i8) => e8 + s8 + i8 + (t8 / 2 ** 32 | 0) | 0;
    W = (t8, e8, s8, i8) => (t8 >>> 0) + (e8 >>> 0) + (s8 >>> 0) + (i8 >>> 0);
    Y = (t8, e8, s8, i8, n8) => e8 + s8 + i8 + n8 + (t8 / 2 ** 32 | 0) | 0;
    Z = (t8, e8, s8, i8, n8) => (t8 >>> 0) + (e8 >>> 0) + (s8 >>> 0) + (i8 >>> 0) + (n8 >>> 0);
    $ = (t8, e8, s8, i8, n8, r8) => e8 + s8 + i8 + n8 + r8 + (t8 / 2 ** 32 | 0) | 0;
    tt = /* @__PURE__ */ Uint32Array.from([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]);
    et = /* @__PURE__ */ new Uint32Array(64);
    st = class extends O {
      constructor(t8 = 32) {
        super(64, t8, 8, false), this.A = 0 | G[0], this.B = 0 | G[1], this.C = 0 | G[2], this.D = 0 | G[3], this.E = 0 | G[4], this.F = 0 | G[5], this.G = 0 | G[6], this.H = 0 | G[7];
      }
      get() {
        const { A: t8, B: e8, C: s8, D: i8, E: n8, F: r8, G: h7, H: o8 } = this;
        return [t8, e8, s8, i8, n8, r8, h7, o8];
      }
      set(t8, e8, s8, i8, n8, r8, h7, o8) {
        this.A = 0 | t8, this.B = 0 | e8, this.C = 0 | s8, this.D = 0 | i8, this.E = 0 | n8, this.F = 0 | r8, this.G = 0 | h7, this.H = 0 | o8;
      }
      process(t8, e8) {
        for (let s9 = 0; s9 < 16; s9++, e8 += 4) et[s9] = t8.getUint32(e8, false);
        for (let t9 = 16; t9 < 64; t9++) {
          const e9 = et[t9 - 15], s9 = et[t9 - 2], i9 = a(e9, 7) ^ a(e9, 18) ^ e9 >>> 3, n9 = a(s9, 17) ^ a(s9, 19) ^ s9 >>> 10;
          et[t9] = n9 + et[t9 - 7] + i9 + et[t9 - 16] | 0;
        }
        let { A: s8, B: i8, C: n8, D: r8, E: h7, F: o8, G: c7, H: f8 } = this;
        for (let t9 = 0; t9 < 64; t9++) {
          const e9 = f8 + (a(h7, 6) ^ a(h7, 11) ^ a(h7, 25)) + F(h7, o8, c7) + tt[t9] + et[t9] | 0, l6 = (a(s8, 2) ^ a(s8, 13) ^ a(s8, 22)) + D(s8, i8, n8) | 0;
          f8 = c7, c7 = o8, o8 = h7, h7 = r8 + e9 | 0, r8 = n8, n8 = i8, i8 = s8, s8 = e9 + l6 | 0;
        }
        s8 = s8 + this.A | 0, i8 = i8 + this.B | 0, n8 = n8 + this.C | 0, r8 = r8 + this.D | 0, h7 = h7 + this.E | 0, o8 = o8 + this.F | 0, c7 = c7 + this.G | 0, f8 = f8 + this.H | 0, this.set(s8, i8, n8, r8, h7, o8, c7, f8);
      }
      roundClean() {
        c(et);
      }
      destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0), c(this.buffer);
      }
    };
    it = class extends st {
      constructor() {
        super(28), this.A = 0 | v[0], this.B = 0 | v[1], this.C = 0 | v[2], this.D = 0 | v[3], this.E = 0 | v[4], this.F = 0 | v[5], this.G = 0 | v[6], this.H = 0 | v[7];
      }
    };
    nt = /* @__PURE__ */ (() => R(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map(((t8) => BigInt(t8)))))();
    rt = /* @__PURE__ */ (() => nt[0])();
    ht = /* @__PURE__ */ (() => nt[1])();
    ot = /* @__PURE__ */ new Uint32Array(80);
    ct = /* @__PURE__ */ new Uint32Array(80);
    ft = class extends O {
      constructor(t8 = 64) {
        super(128, t8, 16, false), this.Ah = 0 | X[0], this.Al = 0 | X[1], this.Bh = 0 | X[2], this.Bl = 0 | X[3], this.Ch = 0 | X[4], this.Cl = 0 | X[5], this.Dh = 0 | X[6], this.Dl = 0 | X[7], this.Eh = 0 | X[8], this.El = 0 | X[9], this.Fh = 0 | X[10], this.Fl = 0 | X[11], this.Gh = 0 | X[12], this.Gl = 0 | X[13], this.Hh = 0 | X[14], this.Hl = 0 | X[15];
      }
      get() {
        const { Ah: t8, Al: e8, Bh: s8, Bl: i8, Ch: n8, Cl: r8, Dh: h7, Dl: o8, Eh: c7, El: f8, Fh: a8, Fl: l6, Gh: u8, Gl: d6, Hh: b6, Hl: x7 } = this;
        return [t8, e8, s8, i8, n8, r8, h7, o8, c7, f8, a8, l6, u8, d6, b6, x7];
      }
      set(t8, e8, s8, i8, n8, r8, h7, o8, c7, f8, a8, l6, u8, d6, b6, x7) {
        this.Ah = 0 | t8, this.Al = 0 | e8, this.Bh = 0 | s8, this.Bl = 0 | i8, this.Ch = 0 | n8, this.Cl = 0 | r8, this.Dh = 0 | h7, this.Dl = 0 | o8, this.Eh = 0 | c7, this.El = 0 | f8, this.Fh = 0 | a8, this.Fl = 0 | l6, this.Gh = 0 | u8, this.Gl = 0 | d6, this.Hh = 0 | b6, this.Hl = 0 | x7;
      }
      process(t8, e8) {
        for (let s9 = 0; s9 < 16; s9++, e8 += 4) ot[s9] = t8.getUint32(e8), ct[s9] = t8.getUint32(e8 += 4);
        for (let t9 = 16; t9 < 80; t9++) {
          const e9 = 0 | ot[t9 - 15], s9 = 0 | ct[t9 - 15], i9 = q(e9, s9, 1) ^ q(e9, s9, 8) ^ S(e9, 0, 7), n9 = T(e9, s9, 1) ^ T(e9, s9, 8) ^ j(e9, s9, 7), r9 = 0 | ot[t9 - 2], h8 = 0 | ct[t9 - 2], o9 = q(r9, h8, 19) ^ z(r9, h8, 61) ^ S(r9, 0, 6), c8 = T(r9, h8, 19) ^ J(r9, h8, 61) ^ j(r9, h8, 6), f9 = W(n9, c8, ct[t9 - 7], ct[t9 - 16]), a9 = Y(f9, i9, o9, ot[t9 - 7], ot[t9 - 16]);
          ot[t9] = 0 | a9, ct[t9] = 0 | f9;
        }
        let { Ah: s8, Al: i8, Bh: n8, Bl: r8, Ch: h7, Cl: o8, Dh: c7, Dl: f8, Eh: a8, El: l6, Fh: u8, Fl: d6, Gh: b6, Gl: x7, Hh: p5, Hl: g7 } = this;
        for (let t9 = 0; t9 < 80; t9++) {
          const e9 = q(a8, l6, 14) ^ q(a8, l6, 18) ^ z(a8, l6, 41), y8 = T(a8, l6, 14) ^ T(a8, l6, 18) ^ J(a8, l6, 41), w8 = a8 & u8 ^ ~a8 & b6, A8 = Z(g7, y8, l6 & d6 ^ ~l6 & x7, ht[t9], ct[t9]), E8 = $(A8, p5, e9, w8, rt[t9], ot[t9]), U8 = 0 | A8, B7 = q(s8, i8, 28) ^ z(s8, i8, 34) ^ z(s8, i8, 39), L5 = T(s8, i8, 28) ^ J(s8, i8, 34) ^ J(s8, i8, 39), k7 = s8 & n8 ^ s8 & h7 ^ n8 & h7, m6 = i8 & r8 ^ i8 & o8 ^ r8 & o8;
          p5 = 0 | b6, g7 = 0 | x7, b6 = 0 | u8, x7 = 0 | d6, u8 = 0 | a8, d6 = 0 | l6, { h: a8, l: l6 } = K(0 | c7, 0 | f8, 0 | E8, 0 | U8), c7 = 0 | h7, f8 = 0 | o8, h7 = 0 | n8, o8 = 0 | r8, n8 = 0 | s8, r8 = 0 | i8;
          const I8 = P(U8, L5, m6);
          s8 = Q(I8, E8, B7, k7), i8 = 0 | I8;
        }
        ({ h: s8, l: i8 } = K(0 | this.Ah, 0 | this.Al, 0 | s8, 0 | i8)), { h: n8, l: r8 } = K(0 | this.Bh, 0 | this.Bl, 0 | n8, 0 | r8), { h: h7, l: o8 } = K(0 | this.Ch, 0 | this.Cl, 0 | h7, 0 | o8), { h: c7, l: f8 } = K(0 | this.Dh, 0 | this.Dl, 0 | c7, 0 | f8), { h: a8, l: l6 } = K(0 | this.Eh, 0 | this.El, 0 | a8, 0 | l6), { h: u8, l: d6 } = K(0 | this.Fh, 0 | this.Fl, 0 | u8, 0 | d6), { h: b6, l: x7 } = K(0 | this.Gh, 0 | this.Gl, 0 | b6, 0 | x7), { h: p5, l: g7 } = K(0 | this.Hh, 0 | this.Hl, 0 | p5, 0 | g7), this.set(s8, i8, n8, r8, h7, o8, c7, f8, a8, l6, u8, d6, b6, x7, p5, g7);
      }
      roundClean() {
        c(ot, ct);
      }
      destroy() {
        c(this.buffer), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      }
    };
    at = class extends ft {
      constructor() {
        super(48), this.Ah = 0 | N[0], this.Al = 0 | N[1], this.Bh = 0 | N[2], this.Bl = 0 | N[3], this.Ch = 0 | N[4], this.Cl = 0 | N[5], this.Dh = 0 | N[6], this.Dl = 0 | N[7], this.Eh = 0 | N[8], this.El = 0 | N[9], this.Fh = 0 | N[10], this.Fl = 0 | N[11], this.Gh = 0 | N[12], this.Gl = 0 | N[13], this.Hh = 0 | N[14], this.Hl = 0 | N[15];
      }
    };
    lt = /* @__PURE__ */ I((() => new st()));
    ut = /* @__PURE__ */ I((() => new it()));
    dt = /* @__PURE__ */ I((() => new ft()));
    bt = /* @__PURE__ */ I((() => new at()));
    xt = BigInt(0);
    pt = BigInt(1);
    gt = BigInt(2);
    yt = BigInt(7);
    wt = BigInt(256);
    At = BigInt(113);
    Et = [];
    Ut = [];
    Bt = [];
    for (let t8 = 0, e8 = pt, s8 = 1, i8 = 0; t8 < 24; t8++) {
      [s8, i8] = [i8, (2 * s8 + 3 * i8) % 5], Et.push(2 * (5 * i8 + s8)), Ut.push((t8 + 1) * (t8 + 2) / 2 % 64);
      let n8 = xt;
      for (let t9 = 0; t9 < 7; t9++) e8 = (e8 << pt ^ (e8 >> yt) * At) % wt, e8 & gt && (n8 ^= pt << (pt << /* @__PURE__ */ BigInt(t9)) - pt);
      Bt.push(n8);
    }
    Lt = R(Bt, true);
    kt = Lt[0];
    mt = Lt[1];
    It = (t8, e8, s8) => s8 > 32 ? ((t9, e9, s9) => e9 << s9 - 32 | t9 >>> 64 - s9)(t8, e8, s8) : ((t9, e9, s9) => t9 << s9 | e9 >>> 32 - s9)(t8, e8, s8);
    Ht = (t8, e8, s8) => s8 > 32 ? ((t9, e9, s9) => t9 << s9 - 32 | e9 >>> 64 - s9)(t8, e8, s8) : ((t9, e9, s9) => e9 << s9 | t9 >>> 32 - s9)(t8, e8, s8);
    Ct = class _Ct extends m {
      constructor(t8, e8, s8, n8 = false, r8 = 24) {
        if (super(), this.pos = 0, this.posOut = 0, this.finished = false, this.destroyed = false, this.enableXOF = false, this.blockLen = t8, this.suffix = e8, this.outputLen = s8, this.enableXOF = n8, this.rounds = r8, i(s8), !(0 < t8 && t8 < 200)) throw Error("only keccak-f1600 function is supported");
        var h7;
        this.state = new Uint8Array(200), this.state32 = (h7 = this.state, new Uint32Array(h7.buffer, h7.byteOffset, Math.floor(h7.byteLength / 4)));
      }
      clone() {
        return this._cloneInto();
      }
      keccak() {
        u(this.state32), (function(t8, e8 = 24) {
          const s8 = new Uint32Array(10);
          for (let i8 = 24 - e8; i8 < 24; i8++) {
            for (let e10 = 0; e10 < 10; e10++) s8[e10] = t8[e10] ^ t8[e10 + 10] ^ t8[e10 + 20] ^ t8[e10 + 30] ^ t8[e10 + 40];
            for (let e10 = 0; e10 < 10; e10 += 2) {
              const i9 = (e10 + 8) % 10, n9 = (e10 + 2) % 10, r8 = s8[n9], h7 = s8[n9 + 1], o8 = It(r8, h7, 1) ^ s8[i9], c7 = Ht(r8, h7, 1) ^ s8[i9 + 1];
              for (let s9 = 0; s9 < 50; s9 += 10) t8[e10 + s9] ^= o8, t8[e10 + s9 + 1] ^= c7;
            }
            let e9 = t8[2], n8 = t8[3];
            for (let s9 = 0; s9 < 24; s9++) {
              const i9 = Ut[s9], r8 = It(e9, n8, i9), h7 = Ht(e9, n8, i9), o8 = Et[s9];
              e9 = t8[o8], n8 = t8[o8 + 1], t8[o8] = r8, t8[o8 + 1] = h7;
            }
            for (let e10 = 0; e10 < 50; e10 += 10) {
              for (let i9 = 0; i9 < 10; i9++) s8[i9] = t8[e10 + i9];
              for (let i9 = 0; i9 < 10; i9++) t8[e10 + i9] ^= ~s8[(i9 + 2) % 10] & s8[(i9 + 4) % 10];
            }
            t8[0] ^= kt[i8], t8[1] ^= mt[i8];
          }
          c(s8);
        })(this.state32, this.rounds), u(this.state32), this.posOut = 0, this.pos = 0;
      }
      update(t8) {
        h(this), n(t8 = L(t8));
        const { blockLen: e8, state: s8 } = this, i8 = t8.length;
        for (let n8 = 0; n8 < i8; ) {
          const r8 = Math.min(e8 - this.pos, i8 - n8);
          for (let e9 = 0; e9 < r8; e9++) s8[this.pos++] ^= t8[n8++];
          this.pos === e8 && this.keccak();
        }
        return this;
      }
      finish() {
        if (this.finished) return;
        this.finished = true;
        const { state: t8, suffix: e8, pos: s8, blockLen: i8 } = this;
        t8[s8] ^= e8, 128 & e8 && s8 === i8 - 1 && this.keccak(), t8[i8 - 1] ^= 128, this.keccak();
      }
      writeInto(t8) {
        h(this, false), n(t8), this.finish();
        const e8 = this.state, { blockLen: s8 } = this;
        for (let i8 = 0, n8 = t8.length; i8 < n8; ) {
          this.posOut >= s8 && this.keccak();
          const r8 = Math.min(s8 - this.posOut, n8 - i8);
          t8.set(e8.subarray(this.posOut, this.posOut + r8), i8), this.posOut += r8, i8 += r8;
        }
        return t8;
      }
      xofInto(t8) {
        if (!this.enableXOF) throw Error("XOF is not possible for this instance");
        return this.writeInto(t8);
      }
      xof(t8) {
        return i(t8), this.xofInto(new Uint8Array(t8));
      }
      digestInto(t8) {
        if (o(t8, this), this.finished) throw Error("digest() was already called");
        return this.writeInto(t8), this.destroy(), t8;
      }
      digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
      }
      destroy() {
        this.destroyed = true, c(this.state);
      }
      _cloneInto(t8) {
        const { blockLen: e8, suffix: s8, outputLen: i8, rounds: n8, enableXOF: r8 } = this;
        return t8 || (t8 = new _Ct(e8, s8, i8, r8, n8)), t8.state32.set(this.state32), t8.pos = this.pos, t8.posOut = this.posOut, t8.finished = this.finished, t8.rounds = n8, t8.suffix = s8, t8.outputLen = i8, t8.enableXOF = r8, t8.destroyed = this.destroyed, t8;
      }
    };
    Ft = (t8, e8, s8) => I((() => new Ct(e8, t8, s8)));
    Dt = /* @__PURE__ */ (() => Ft(6, 136, 32))();
    Ot = /* @__PURE__ */ (() => Ft(6, 72, 64))();
    Gt = (t8, e8, s8) => (function(t9) {
      const e9 = (e10, s10) => t9(s10).update(L(e10)).digest(), s9 = t9({});
      return e9.outputLen = s9.outputLen, e9.blockLen = s9.blockLen, e9.create = (e10) => t9(e10), e9;
    })(((i8 = {}) => new Ct(e8, t8, void 0 === i8.dkLen ? s8 : i8.dkLen, true)));
    vt = /* @__PURE__ */ (() => Gt(31, 136, 32))();
    Nt = lt;
    Xt = ut;
    _t = dt;
    Mt = bt;
  }
});

// node_modules/openpgp/dist/lightweight/noble_curves.min.mjs
var noble_curves_min_exports = {};
__export(noble_curves_min_exports, {
  nobleCurves: () => ke
});
function x2(t8, e8 = "") {
  if ("boolean" != typeof t8) {
    throw Error((e8 && `"${e8}"`) + "expected boolean, got type=" + typeof t8);
  }
  return t8;
}
function v2(t8, e8, f8 = "") {
  const n8 = s(t8), o8 = t8?.length, i8 = void 0 !== e8;
  if (!n8 || i8 && o8 !== e8) {
    throw Error((f8 && `"${f8}" `) + "expected Uint8Array" + (i8 ? " of length " + e8 : "") + ", got " + (n8 ? "length=" + o8 : "type=" + typeof t8));
  }
  return t8;
}
function I2(t8) {
  const e8 = t8.toString(16);
  return 1 & e8.length ? "0" + e8 : e8;
}
function S2(t8) {
  if ("string" != typeof t8) throw Error("hex string expected, got " + typeof t8);
  return "" === t8 ? w2 : BigInt("0x" + t8);
}
function O2(t8) {
  return S2(x(t8));
}
function R2(t8) {
  return n(t8), S2(x(Uint8Array.from(t8).reverse()));
}
function F2(e8, f8) {
  return B(e8.toString(16).padStart(2 * f8, "0"));
}
function A2(t8, e8) {
  return F2(t8, e8).reverse();
}
function q2(e8, f8, n8) {
  let o8;
  if ("string" == typeof f8) try {
    o8 = B(f8);
  } catch (t8) {
    throw Error(e8 + " must be hex string or Uint8Array, cause: " + t8);
  }
  else {
    if (!s(f8)) throw Error(e8 + " must be hex string or Uint8Array");
    o8 = Uint8Array.from(f8);
  }
  const i8 = o8.length;
  if ("number" == typeof n8 && i8 !== n8) throw Error(e8 + " of length " + n8 + " expected, got " + i8);
  return o8;
}
function Z2(t8) {
  return Uint8Array.from(t8);
}
function N2(t8, e8, f8, r8) {
  if (!(function(t9, e9, f9) {
    return K2(t9) && K2(e9) && K2(f9) && e9 <= t9 && t9 < f9;
  })(e8, f8, r8)) throw Error("expected valid " + t8 + ": " + f8 + " <= n < " + r8 + ", got " + e8);
}
function P2(t8) {
  let e8;
  for (e8 = 0; t8 > w2; t8 >>= E2, e8 += 1) ;
  return e8;
}
function V2(t8, e8, f8 = {}) {
  if (!t8 || "object" != typeof t8) throw Error("expected valid options object");
  function r8(e9, f9, r9) {
    const n8 = t8[e9];
    if (r9 && void 0 === n8) return;
    const o8 = typeof n8;
    if (o8 !== f9 || null === n8) throw Error(`param "${e9}" is invalid: expected ${f9}, got ${o8}`);
  }
  Object.entries(e8).forEach((([t9, e9]) => r8(t9, e9, false))), Object.entries(f8).forEach((([t9, e9]) => r8(t9, e9, true)));
}
function T2(t8) {
  const e8 = /* @__PURE__ */ new WeakMap();
  return (f8, ...r8) => {
    const n8 = e8.get(f8);
    if (void 0 !== n8) return n8;
    const o8 = t8(f8, ...r8);
    return e8.set(f8, o8), o8;
  };
}
function X2(t8, e8) {
  const f8 = t8 % e8;
  return f8 >= C2 ? f8 : e8 + f8;
}
function M2(t8, e8, f8) {
  let r8 = t8;
  for (; e8-- > C2; ) r8 *= r8, r8 %= f8;
  return r8;
}
function $2(t8, e8) {
  if (t8 === C2) throw Error("invert: expected non-zero number");
  if (e8 <= C2) throw Error("invert: expected positive modulus, got " + e8);
  let f8 = X2(t8, e8), r8 = e8, n8 = C2, o8 = k2;
  for (; f8 !== C2; ) {
    const t9 = r8 % f8, e9 = n8 - o8 * (r8 / f8);
    r8 = f8, f8 = t9, n8 = o8, o8 = e9;
  }
  if (r8 !== k2) throw Error("invert: does not exist");
  return X2(n8, e8);
}
function W2(t8, e8, f8) {
  if (!t8.eql(t8.sqr(e8), f8)) throw Error("Cannot find square root");
}
function J2(t8, e8) {
  const f8 = (t8.ORDER + k2) / G2, r8 = t8.pow(e8, f8);
  return W2(t8, r8, e8), r8;
}
function Q2(t8, e8) {
  const f8 = (t8.ORDER - H2) / z2, r8 = t8.mul(e8, j2), n8 = t8.pow(r8, f8), o8 = t8.mul(e8, n8), i8 = t8.mul(t8.mul(o8, j2), n8), s8 = t8.mul(o8, t8.sub(i8, t8.ONE));
  return W2(t8, s8, e8), s8;
}
function tt2(t8) {
  if (t8 < L2) throw Error("sqrt is not defined for small field");
  let e8 = t8 - k2, f8 = 0;
  for (; e8 % j2 === C2; ) e8 /= j2, f8++;
  let r8 = j2;
  const n8 = it2(t8);
  for (; 1 === nt2(n8, r8); ) if (r8++ > 1e3) throw Error("Cannot find square root: probably non-prime P");
  if (1 === f8) return J2;
  let o8 = n8.pow(r8, e8);
  const i8 = (e8 + k2) / j2;
  return function(t9, r9) {
    if (t9.is0(r9)) return r9;
    if (1 !== nt2(t9, r9)) throw Error("Cannot find square root");
    let n9 = f8, s8 = t9.mul(t9.ONE, o8), c7 = t9.pow(r9, e8), a8 = t9.pow(r9, i8);
    for (; !t9.eql(c7, t9.ONE); ) {
      if (t9.is0(c7)) return t9.ZERO;
      let e9 = 1, f9 = t9.sqr(c7);
      for (; !t9.eql(f9, t9.ONE); ) if (e9++, f9 = t9.sqr(f9), e9 === n9) throw Error("Cannot find square root");
      const r10 = k2 << BigInt(n9 - e9 - 1), o9 = t9.pow(s8, r10);
      n9 = e9, s8 = t9.sqr(o9), c7 = t9.mul(c7, s8), a8 = t9.mul(a8, o9);
    }
    return a8;
  };
}
function et2(t8) {
  return t8 % G2 === L2 ? J2 : t8 % z2 === H2 ? Q2 : t8 % D2 === _2 ? (function(t9) {
    const e8 = it2(t9), f8 = tt2(t9), r8 = f8(e8, e8.neg(e8.ONE)), n8 = f8(e8, r8), o8 = f8(e8, e8.neg(r8)), i8 = (t9 + Y2) / D2;
    return (t10, e9) => {
      let f9 = t10.pow(e9, i8), s8 = t10.mul(f9, r8);
      const c7 = t10.mul(f9, n8), a8 = t10.mul(f9, o8), d6 = t10.eql(t10.sqr(s8), e9), u8 = t10.eql(t10.sqr(c7), e9);
      f9 = t10.cmov(f9, s8, d6), s8 = t10.cmov(a8, c7, u8);
      const l6 = t10.eql(t10.sqr(s8), e9), h7 = t10.cmov(f9, s8, l6);
      return W2(t10, h7, e9), h7;
    };
  })(t8) : tt2(t8);
}
function rt2(t8, e8, f8 = false) {
  const r8 = Array(e8.length).fill(f8 ? t8.ZERO : void 0), n8 = e8.reduce(((e9, f9, n9) => t8.is0(f9) ? e9 : (r8[n9] = e9, t8.mul(e9, f9))), t8.ONE), o8 = t8.inv(n8);
  return e8.reduceRight(((e9, f9, n9) => t8.is0(f9) ? e9 : (r8[n9] = t8.mul(e9, r8[n9]), t8.mul(e9, f9))), o8), r8;
}
function nt2(t8, e8) {
  const f8 = (t8.ORDER - k2) / j2, r8 = t8.pow(e8, f8), n8 = t8.eql(r8, t8.ONE), o8 = t8.eql(r8, t8.ZERO), i8 = t8.eql(r8, t8.neg(t8.ONE));
  if (!n8 && !o8 && !i8) throw Error("invalid Legendre symbol result");
  return n8 ? 1 : o8 ? 0 : -1;
}
function ot2(t8, e8) {
  void 0 !== e8 && i(e8);
  const f8 = void 0 !== e8 ? e8 : t8.toString(2).length;
  return { nBitLength: f8, nByteLength: Math.ceil(f8 / 8) };
}
function it2(t8, e8, f8 = false, r8 = {}) {
  if (t8 <= C2) throw Error("invalid field: expected ORDER > 0, got " + t8);
  let n8, o8, i8, s8 = false;
  if ("object" == typeof e8 && null != e8) {
    if (r8.sqrt || f8) throw Error("cannot specify opts in two arguments");
    const t9 = e8;
    t9.BITS && (n8 = t9.BITS), t9.sqrt && (o8 = t9.sqrt), "boolean" == typeof t9.isLE && (f8 = t9.isLE), "boolean" == typeof t9.modFromBytes && (s8 = t9.modFromBytes), i8 = t9.allowedLengths;
  } else "number" == typeof e8 && (n8 = e8), r8.sqrt && (o8 = r8.sqrt);
  const { nBitLength: c7, nByteLength: a8 } = ot2(t8, n8);
  if (a8 > 2048) throw Error("invalid field: expected ORDER of <= 2048 bytes");
  let d6;
  const u8 = Object.freeze({ ORDER: t8, isLE: f8, BITS: c7, BYTES: a8, MASK: U2(c7), ZERO: C2, ONE: k2, allowedLengths: i8, create: (e9) => X2(e9, t8), isValid: (e9) => {
    if ("bigint" != typeof e9) throw Error("invalid field element: expected bigint, got " + typeof e9);
    return C2 <= e9 && e9 < t8;
  }, is0: (t9) => t9 === C2, isValidNot0: (t9) => !u8.is0(t9) && u8.isValid(t9), isOdd: (t9) => (t9 & k2) === k2, neg: (e9) => X2(-e9, t8), eql: (t9, e9) => t9 === e9, sqr: (e9) => X2(e9 * e9, t8), add: (e9, f9) => X2(e9 + f9, t8), sub: (e9, f9) => X2(e9 - f9, t8), mul: (e9, f9) => X2(e9 * f9, t8), pow: (t9, e9) => (function(t10, e10, f9) {
    if (f9 < C2) throw Error("invalid exponent, negatives unsupported");
    if (f9 === C2) return t10.ONE;
    if (f9 === k2) return e10;
    let r9 = t10.ONE, n9 = e10;
    for (; f9 > C2; ) f9 & k2 && (r9 = t10.mul(r9, n9)), n9 = t10.sqr(n9), f9 >>= k2;
    return r9;
  })(u8, t9, e9), div: (e9, f9) => X2(e9 * $2(f9, t8), t8), sqrN: (t9) => t9 * t9, addN: (t9, e9) => t9 + e9, subN: (t9, e9) => t9 - e9, mulN: (t9, e9) => t9 * e9, inv: (e9) => $2(e9, t8), sqrt: o8 || ((e9) => (d6 || (d6 = et2(t8)), d6(u8, e9))), toBytes: (t9) => f8 ? A2(t9, a8) : F2(t9, a8), fromBytes: (e9, r9 = true) => {
    if (i8) {
      if (!i8.includes(e9.length) || e9.length > a8) throw Error("Field.fromBytes: expected " + i8 + " bytes, got " + e9.length);
      const t9 = new Uint8Array(a8);
      t9.set(e9, f8 ? 0 : t9.length - e9.length), e9 = t9;
    }
    if (e9.length !== a8) throw Error("Field.fromBytes: expected " + a8 + " bytes, got " + e9.length);
    let n9 = f8 ? R2(e9) : O2(e9);
    if (s8 && (n9 = X2(n9, t8)), !r9 && !u8.isValid(n9)) throw Error("invalid field element: outside of range 0..ORDER");
    return n9;
  }, invertBatch: (t9) => rt2(u8, t9), cmov: (t9, e9, f9) => f9 ? e9 : t9 });
  return Object.freeze(u8);
}
function st2(t8) {
  if ("bigint" != typeof t8) throw Error("field order must be bigint");
  const e8 = t8.toString(2).length;
  return Math.ceil(e8 / 8);
}
function ct2(t8) {
  const e8 = st2(t8);
  return e8 + Math.ceil(e8 / 2);
}
function ht2(t8, e8) {
  const f8 = e8.negate();
  return t8 ? f8 : e8;
}
function bt2(t8, e8) {
  const f8 = rt2(t8.Fp, e8.map(((t9) => t9.Z)));
  return e8.map(((e9, r8) => t8.fromAffine(e9.toAffine(f8[r8]))));
}
function gt2(t8, e8) {
  if (!Number.isSafeInteger(t8) || t8 <= 0 || t8 > e8) throw Error("invalid window size, expected [1.." + e8 + "], got W=" + t8);
}
function pt2(t8, e8) {
  gt2(t8, e8);
  const f8 = 2 ** t8;
  return { windows: Math.ceil(e8 / t8) + 1, windowSize: 2 ** (t8 - 1), mask: U2(t8), maxNumber: f8, shiftBy: BigInt(t8) };
}
function yt2(t8, e8, f8) {
  const { windowSize: r8, mask: n8, maxNumber: o8, shiftBy: i8 } = f8;
  let s8 = Number(t8 & n8), c7 = t8 >> i8;
  s8 > r8 && (s8 -= o8, c7 += lt2);
  const a8 = e8 * r8;
  return { nextN: c7, offset: a8 + Math.abs(s8) - 1, isZero: 0 === s8, isNeg: s8 < 0, isNegF: e8 % 2 != 0, offsetF: a8 };
}
function wt2(t8) {
  return Bt2.get(t8) || 1;
}
function Et2(t8) {
  if (t8 !== ut2) throw Error("invalid wNAF");
}
function vt2(t8, e8, f8, r8) {
  !(function(t9, e9) {
    if (!Array.isArray(t9)) throw Error("array expected");
    t9.forEach(((t10, f9) => {
      if (!(t10 instanceof e9)) throw Error("invalid point at index " + f9);
    }));
  })(f8, t8), (function(t9, e9) {
    if (!Array.isArray(t9)) throw Error("array of scalars expected");
    t9.forEach(((t10, f9) => {
      if (!e9.isValid(t10)) throw Error("invalid scalar at index " + f9);
    }));
  })(r8, e8);
  const n8 = f8.length, o8 = r8.length;
  if (n8 !== o8) throw Error("arrays of points and scalars must have equal length");
  const i8 = t8.ZERO, s8 = P2(BigInt(n8));
  let c7 = 1;
  s8 > 12 ? c7 = s8 - 3 : s8 > 4 ? c7 = s8 - 2 : s8 > 0 && (c7 = 2);
  const a8 = U2(c7), d6 = Array(Number(a8) + 1).fill(i8);
  let u8 = i8;
  for (let t9 = Math.floor((e8.BITS - 1) / c7) * c7; t9 >= 0; t9 -= c7) {
    d6.fill(i8);
    for (let e10 = 0; e10 < o8; e10++) {
      const n9 = r8[e10], o9 = Number(n9 >> BigInt(t9) & a8);
      d6[o9] = d6[o9].add(f8[e10]);
    }
    let e9 = i8;
    for (let t10 = d6.length - 1, f9 = i8; t10 > 0; t10--) f9 = f9.add(d6[t10]), e9 = e9.add(f9);
    if (u8 = u8.add(e9), 0 !== t9) for (let t10 = 0; t10 < c7; t10++) u8 = u8.double();
  }
  return u8;
}
function It2(t8, e8, f8) {
  if (e8) {
    if (e8.ORDER !== t8) throw Error("Field.ORDER must match order: Fp == p, Fn == n");
    return (function(t9) {
      V2(t9, ft2.reduce(((t10, e9) => (t10[e9] = "function", t10)), { ORDER: "bigint", MASK: "bigint", BYTES: "number", BITS: "number" }));
    })(e8), e8;
  }
  return it2(t8, { isLE: f8 });
}
function St(t8, e8, f8 = {}, r8) {
  if (void 0 === r8 && (r8 = "edwards" === t8), !e8 || "object" != typeof e8) throw Error(`expected valid ${t8} CURVE object`);
  for (const t9 of ["p", "n", "h"]) {
    const f9 = e8[t9];
    if (!("bigint" == typeof f9 && f9 > ut2)) throw Error(`CURVE.${t9} must be positive bigint`);
  }
  const n8 = It2(e8.p, f8.Fp, r8), o8 = It2(e8.n, f8.Fn, r8), i8 = ["Gx", "Gy", "a", "weierstrass" === t8 ? "b" : "d"];
  for (const t9 of i8) if (!n8.isValid(e8[t9])) throw Error(`CURVE.${t9} must be valid field element of CURVE.Fp`);
  return { CURVE: e8 = Object.freeze(Object.assign({}, e8)), Fp: n8, Fn: o8 };
}
function Rt(t8) {
  if (!["compact", "recovered", "der"].includes(t8)) throw Error('Signature format must be "compact", "recovered", or "der"');
  return t8;
}
function Ft2(t8, e8) {
  const f8 = {};
  for (let r8 of Object.keys(e8)) f8[r8] = void 0 === t8[r8] ? e8[r8] : t8[r8];
  return x2(f8.lowS, "lowS"), x2(f8.prehash, "prehash"), void 0 !== f8.format && Rt(f8.format), f8;
}
function Ut2(t8, e8) {
  const { BYTES: f8 } = t8;
  let r8;
  if ("bigint" == typeof e8) r8 = e8;
  else {
    let n8 = q2("private key", e8);
    try {
      r8 = t8.fromBytes(n8);
    } catch (t9) {
      throw Error(`invalid private key: expected ui8a of size ${f8}, got ${typeof e8}`);
    }
  }
  if (!t8.isValidNot0(r8)) throw Error("invalid private key: out of range [1..N-1]");
  return r8;
}
function Vt(t8, e8 = {}) {
  const r8 = St("weierstrass", t8, e8), { Fp: o8, Fn: i8 } = r8;
  let s8 = r8.CURVE;
  const { h: c7, n: a8 } = s8;
  V2(e8, {}, { allowInfinityPoint: "boolean", clearCofactor: "function", isTorsionFree: "function", fromBytes: "function", toBytes: "function", endo: "object", wrapPrivateKey: "boolean" });
  const { endo: d6 } = e8;
  if (d6 && (!o8.is0(s8.a) || "bigint" != typeof d6.beta || !Array.isArray(d6.basises))) throw Error('invalid endo: expected "beta": bigint and "basises": array');
  const u8 = Ct2(o8, i8);
  function l6() {
    if (!o8.isOdd) throw Error("compression is not supported: Field does not have .isOdd()");
  }
  const h7 = e8.toBytes || function(t9, e9, f8) {
    const { x: r9, y: i9 } = e9.toAffine(), s9 = o8.toBytes(r9);
    if (x2(f8, "isCompressed"), f8) {
      l6();
      const t10 = !o8.isOdd(i9);
      return k(Tt(t10), s9);
    }
    return k(Uint8Array.of(4), s9, o8.toBytes(i9));
  }, b6 = e8.fromBytes || function(t9) {
    v2(t9, void 0, "Point");
    const { publicKey: e9, publicKeyUncompressed: f8 } = u8, r9 = t9.length, n8 = t9[0], i9 = t9.subarray(1);
    if (r9 !== e9 || 2 !== n8 && 3 !== n8) {
      if (r9 === f8 && 4 === n8) {
        const t10 = o8.BYTES, e10 = o8.fromBytes(i9.subarray(0, t10)), f9 = o8.fromBytes(i9.subarray(t10, 2 * t10));
        if (!p5(e10, f9)) throw Error("bad point: is not on curve");
        return { x: e10, y: f9 };
      }
      throw Error(`bad point: got length ${r9}, expected compressed=${e9} or uncompressed=${f8}`);
    }
    {
      const t10 = o8.fromBytes(i9);
      if (!o8.isValid(t10)) throw Error("bad point: is not on curve, wrong x");
      const e10 = g7(t10);
      let f9;
      try {
        f9 = o8.sqrt(e10);
      } catch (t11) {
        const e11 = t11 instanceof Error ? ": " + t11.message : "";
        throw Error("bad point: is not on curve, sqrt error" + e11);
      }
      l6();
      return !(1 & ~n8) !== o8.isOdd(f9) && (f9 = o8.neg(f9)), { x: t10, y: f9 };
    }
  };
  function g7(t9) {
    const e9 = o8.sqr(t9), f8 = o8.mul(e9, t9);
    return o8.add(o8.add(f8, o8.mul(t9, s8.a)), s8.b);
  }
  function p5(t9, e9) {
    const f8 = o8.sqr(e9), r9 = g7(t9);
    return o8.eql(f8, r9);
  }
  if (!p5(s8.Gx, s8.Gy)) throw Error("bad curve params: generator point");
  const y8 = o8.mul(o8.pow(s8.a, Nt2), Pt), m6 = o8.mul(o8.sqr(s8.b), BigInt(27));
  if (o8.is0(o8.add(y8, m6))) throw Error("bad curve params: a or b");
  function B7(t9, e9, f8 = false) {
    if (!o8.isValid(e9) || f8 && o8.is0(e9)) throw Error("bad point coordinate " + t9);
    return e9;
  }
  function w8(t9) {
    if (!(t9 instanceof R7)) throw Error("ProjectivePoint expected");
  }
  function E8(t9) {
    if (!d6 || !d6.basises) throw Error("no endo");
    return (function(t10, e9, f8) {
      const [[r9, n8], [o9, i9]] = e9, s9 = Ot2(i9 * t10, f8), c8 = Ot2(-n8 * t10, f8);
      let a9 = t10 - s9 * r9 - c8 * o9, d7 = -s9 * n8 - c8 * i9;
      const u9 = a9 < qt, l7 = d7 < qt;
      u9 && (a9 = -a9), l7 && (d7 = -d7);
      const h8 = U2(Math.ceil(P2(f8) / 2)) + Zt;
      if (a9 < qt || a9 >= h8 || d7 < qt || d7 >= h8) throw Error("splitScalar (endomorphism): failed, k=" + t10);
      return { k1neg: u9, k1: a9, k2neg: l7, k2: d7 };
    })(t9, d6.basises, i8.ORDER);
  }
  const I8 = T2(((t9, e9) => {
    const { X: f8, Y: r9, Z: n8 } = t9;
    if (o8.eql(n8, o8.ONE)) return { x: f8, y: r9 };
    const i9 = t9.is0();
    null == e9 && (e9 = i9 ? o8.ONE : o8.inv(n8));
    const s9 = o8.mul(f8, e9), c8 = o8.mul(r9, e9), a9 = o8.mul(n8, e9);
    if (i9) return { x: o8.ZERO, y: o8.ZERO };
    if (!o8.eql(a9, o8.ONE)) throw Error("invZ was invalid");
    return { x: s9, y: c8 };
  })), S7 = T2(((t9) => {
    if (t9.is0()) {
      if (e8.allowInfinityPoint && !o8.is0(t9.Y)) return;
      throw Error("bad point: ZERO");
    }
    const { x: f8, y: r9 } = t9.toAffine();
    if (!o8.isValid(f8) || !o8.isValid(r9)) throw Error("bad point: x or y not field elements");
    if (!p5(f8, r9)) throw Error("bad point: equation left != right");
    if (!t9.isTorsionFree()) throw Error("bad point: not in prime-order subgroup");
    return true;
  }));
  function O6(t9, e9, f8, r9, n8) {
    return f8 = new R7(o8.mul(f8.X, t9), f8.Y, f8.Z), e9 = ht2(r9, e9), f8 = ht2(n8, f8), e9.add(f8);
  }
  class R7 {
    constructor(t9, e9, f8) {
      this.X = B7("x", t9), this.Y = B7("y", e9, true), this.Z = B7("z", f8), Object.freeze(this);
    }
    static CURVE() {
      return s8;
    }
    static fromAffine(t9) {
      const { x: e9, y: f8 } = t9 || {};
      if (!t9 || !o8.isValid(e9) || !o8.isValid(f8)) throw Error("invalid affine point");
      if (t9 instanceof R7) throw Error("projective point not allowed");
      return o8.is0(e9) && o8.is0(f8) ? R7.ZERO : new R7(e9, f8, o8.ONE);
    }
    static fromBytes(t9) {
      const e9 = R7.fromAffine(b6(v2(t9, void 0, "point")));
      return e9.assertValidity(), e9;
    }
    static fromHex(t9) {
      return R7.fromBytes(q2("pointHex", t9));
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    precompute(t9 = 8, e9 = true) {
      return A8.createCache(this, t9), e9 || this.multiply(Nt2), this;
    }
    assertValidity() {
      S7(this);
    }
    hasEvenY() {
      const { y: t9 } = this.toAffine();
      if (!o8.isOdd) throw Error("Field doesn't support isOdd");
      return !o8.isOdd(t9);
    }
    equals(t9) {
      w8(t9);
      const { X: e9, Y: f8, Z: r9 } = this, { X: n8, Y: i9, Z: s9 } = t9, c8 = o8.eql(o8.mul(e9, s9), o8.mul(n8, r9)), a9 = o8.eql(o8.mul(f8, s9), o8.mul(i9, r9));
      return c8 && a9;
    }
    negate() {
      return new R7(this.X, o8.neg(this.Y), this.Z);
    }
    double() {
      const { a: t9, b: e9 } = s8, f8 = o8.mul(e9, Nt2), { X: r9, Y: n8, Z: i9 } = this;
      let c8 = o8.ZERO, a9 = o8.ZERO, d7 = o8.ZERO, u9 = o8.mul(r9, r9), l7 = o8.mul(n8, n8), h8 = o8.mul(i9, i9), b7 = o8.mul(r9, n8);
      return b7 = o8.add(b7, b7), d7 = o8.mul(r9, i9), d7 = o8.add(d7, d7), c8 = o8.mul(t9, d7), a9 = o8.mul(f8, h8), a9 = o8.add(c8, a9), c8 = o8.sub(l7, a9), a9 = o8.add(l7, a9), a9 = o8.mul(c8, a9), c8 = o8.mul(b7, c8), d7 = o8.mul(f8, d7), h8 = o8.mul(t9, h8), b7 = o8.sub(u9, h8), b7 = o8.mul(t9, b7), b7 = o8.add(b7, d7), d7 = o8.add(u9, u9), u9 = o8.add(d7, u9), u9 = o8.add(u9, h8), u9 = o8.mul(u9, b7), a9 = o8.add(a9, u9), h8 = o8.mul(n8, i9), h8 = o8.add(h8, h8), u9 = o8.mul(h8, b7), c8 = o8.sub(c8, u9), d7 = o8.mul(h8, l7), d7 = o8.add(d7, d7), d7 = o8.add(d7, d7), new R7(c8, a9, d7);
    }
    add(t9) {
      w8(t9);
      const { X: e9, Y: f8, Z: r9 } = this, { X: n8, Y: i9, Z: c8 } = t9;
      let a9 = o8.ZERO, d7 = o8.ZERO, u9 = o8.ZERO;
      const l7 = s8.a, h8 = o8.mul(s8.b, Nt2);
      let b7 = o8.mul(e9, n8), g8 = o8.mul(f8, i9), p6 = o8.mul(r9, c8), y9 = o8.add(e9, f8), m7 = o8.add(n8, i9);
      y9 = o8.mul(y9, m7), m7 = o8.add(b7, g8), y9 = o8.sub(y9, m7), m7 = o8.add(e9, r9);
      let B8 = o8.add(n8, c8);
      return m7 = o8.mul(m7, B8), B8 = o8.add(b7, p6), m7 = o8.sub(m7, B8), B8 = o8.add(f8, r9), a9 = o8.add(i9, c8), B8 = o8.mul(B8, a9), a9 = o8.add(g8, p6), B8 = o8.sub(B8, a9), u9 = o8.mul(l7, m7), a9 = o8.mul(h8, p6), u9 = o8.add(a9, u9), a9 = o8.sub(g8, u9), u9 = o8.add(g8, u9), d7 = o8.mul(a9, u9), g8 = o8.add(b7, b7), g8 = o8.add(g8, b7), p6 = o8.mul(l7, p6), m7 = o8.mul(h8, m7), g8 = o8.add(g8, p6), p6 = o8.sub(b7, p6), p6 = o8.mul(l7, p6), m7 = o8.add(m7, p6), b7 = o8.mul(g8, m7), d7 = o8.add(d7, b7), b7 = o8.mul(B8, m7), a9 = o8.mul(y9, a9), a9 = o8.sub(a9, b7), b7 = o8.mul(y9, g8), u9 = o8.mul(B8, u9), u9 = o8.add(u9, b7), new R7(a9, d7, u9);
    }
    subtract(t9) {
      return this.add(t9.negate());
    }
    is0() {
      return this.equals(R7.ZERO);
    }
    multiply(t9) {
      const { endo: f8 } = e8;
      if (!i8.isValidNot0(t9)) throw Error("invalid scalar: out of range");
      let r9, n8;
      const o9 = (t10) => A8.cached(this, t10, ((t11) => bt2(R7, t11)));
      if (f8) {
        const { k1neg: e9, k1: i9, k2neg: s9, k2: c8 } = E8(t9), { p: a9, f: d7 } = o9(i9), { p: u9, f: l7 } = o9(c8);
        n8 = d7.add(l7), r9 = O6(f8.beta, a9, u9, e9, s9);
      } else {
        const { p: e9, f: f9 } = o9(t9);
        r9 = e9, n8 = f9;
      }
      return bt2(R7, [r9, n8])[0];
    }
    multiplyUnsafe(t9) {
      const { endo: f8 } = e8, r9 = this;
      if (!i8.isValid(t9)) throw Error("invalid scalar: out of range");
      if (t9 === qt || r9.is0()) return R7.ZERO;
      if (t9 === Zt) return r9;
      if (A8.hasCache(this)) return this.multiply(t9);
      if (f8) {
        const { k1neg: e9, k1: n8, k2neg: o9, k2: i9 } = E8(t9), { p1: s9, p2: c8 } = (function(t10, e10, f9, r10) {
          let n9 = e10, o10 = t10.ZERO, i10 = t10.ZERO;
          for (; f9 > ut2 || r10 > ut2; ) f9 & lt2 && (o10 = o10.add(n9)), r10 & lt2 && (i10 = i10.add(n9)), n9 = n9.double(), f9 >>= lt2, r10 >>= lt2;
          return { p1: o10, p2: i10 };
        })(R7, r9, n8, i9);
        return O6(f8.beta, s9, c8, e9, o9);
      }
      return A8.unsafe(r9, t9);
    }
    multiplyAndAddUnsafe(t9, e9, f8) {
      const r9 = this.multiplyUnsafe(e9).add(t9.multiplyUnsafe(f8));
      return r9.is0() ? void 0 : r9;
    }
    toAffine(t9) {
      return I8(this, t9);
    }
    isTorsionFree() {
      const { isTorsionFree: t9 } = e8;
      return c7 === Zt || (t9 ? t9(R7, this) : A8.unsafe(this, a8).is0());
    }
    clearCofactor() {
      const { clearCofactor: t9 } = e8;
      return c7 === Zt ? this : t9 ? t9(R7, this) : this.multiplyUnsafe(c7);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(c7).is0();
    }
    toBytes(t9 = true) {
      return x2(t9, "isCompressed"), this.assertValidity(), h7(R7, this, t9);
    }
    toHex(t9 = true) {
      return x(this.toBytes(t9));
    }
    toString() {
      return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
    }
    get px() {
      return this.X;
    }
    get py() {
      return this.X;
    }
    get pz() {
      return this.Z;
    }
    toRawBytes(t9 = true) {
      return this.toBytes(t9);
    }
    _setWindowSize(t9) {
      this.precompute(t9);
    }
    static normalizeZ(t9) {
      return bt2(R7, t9);
    }
    static msm(t9, e9) {
      return vt2(R7, i8, t9, e9);
    }
    static fromPrivateKey(t9) {
      return R7.BASE.multiply(Ut2(i8, t9));
    }
  }
  R7.BASE = new R7(s8.Gx, s8.Gy, o8.ONE), R7.ZERO = new R7(o8.ZERO, o8.ONE, o8.ZERO), R7.Fp = o8, R7.Fn = i8;
  const F7 = i8.BITS, A8 = new xt2(R7, e8.endo ? Math.ceil(F7 / 2) : F7);
  return R7.BASE.precompute(8), R7;
}
function Tt(t8) {
  return Uint8Array.of(t8 ? 2 : 3);
}
function Ct2(t8, e8) {
  return { secretKey: e8.BYTES, publicKey: 1 + t8.BYTES, publicKeyUncompressed: 1 + 2 * t8.BYTES, publicKeyHasPrefix: true, signature: 2 * e8.BYTES };
}
function kt2(t8, e8 = {}) {
  const { Fn: f8 } = t8, r8 = e8.randomBytes || C, n8 = Object.assign(Ct2(t8.Fp, f8), { seed: ct2(f8.ORDER) });
  function o8(t9) {
    try {
      return !!Ut2(f8, t9);
    } catch (t10) {
      return false;
    }
  }
  function i8(t9 = r8(n8.seed)) {
    return (function(t10, e9, f9 = false) {
      const r9 = t10.length, n9 = st2(e9), o9 = ct2(e9);
      if (r9 < 16 || r9 < o9 || r9 > 1024) throw Error("expected " + o9 + "-1024 bytes of input, got " + r9);
      const i9 = X2(f9 ? R2(t10) : O2(t10), e9 - k2) + k2;
      return f9 ? A2(i9, n9) : F2(i9, n9);
    })(v2(t9, n8.seed, "seed"), f8.ORDER);
  }
  function s8(e9, r9 = true) {
    return t8.BASE.multiply(Ut2(f8, e9)).toBytes(r9);
  }
  function c7(e9) {
    if ("bigint" == typeof e9) return false;
    if (e9 instanceof t8) return true;
    const { secretKey: r9, publicKey: o9, publicKeyUncompressed: i9 } = n8;
    if (f8.allowedLengths || r9 === o9) return;
    const s9 = q2("key", e9).length;
    return s9 === o9 || s9 === i9;
  }
  const a8 = { isValidSecretKey: o8, isValidPublicKey: function(e9, f9) {
    const { publicKey: r9, publicKeyUncompressed: o9 } = n8;
    try {
      const n9 = e9.length;
      return (true !== f9 || n9 === r9) && ((false !== f9 || n9 === o9) && !!t8.fromBytes(e9));
    } catch (t9) {
      return false;
    }
  }, randomSecretKey: i8, isValidPrivateKey: o8, randomPrivateKey: i8, normPrivateKeyToScalar: (t9) => Ut2(f8, t9), precompute: (e9 = 8, f9 = t8.BASE) => f9.precompute(e9, false) };
  return Object.freeze({ getPublicKey: s8, getSharedSecret: function(e9, r9, n9 = true) {
    if (true === c7(e9)) throw Error("first arg must be private key");
    if (false === c7(r9)) throw Error("second arg must be public key");
    const o9 = Ut2(f8, e9);
    return t8.fromHex(r9).multiply(o9).toBytes(n9);
  }, keygen: function(t9) {
    const e9 = i8(t9);
    return { secretKey: e9, publicKey: s8(e9) };
  }, Point: t8, utils: a8, lengths: n8 });
}
function jt(e8, o8, i8 = {}) {
  r(o8), V2(i8, {}, { hmac: "function", lowS: "boolean", randomBytes: "function", bits2int: "function", bits2int_modN: "function" });
  const c7 = i8.randomBytes || C, a8 = i8.hmac || ((t8, ...e9) => dt2(o8, t8, k(...e9))), { Fp: d6, Fn: l6 } = e8, { ORDER: h7, BITS: b6 } = l6, { keygen: g7, getPublicKey: p5, getSharedSecret: y8, utils: m6, lengths: B7 } = kt2(e8, i8), w8 = { prehash: false, lowS: "boolean" == typeof i8.lowS && i8.lowS, format: void 0, extraEntropy: false }, E8 = "compact";
  function x7(t8) {
    return t8 > h7 >> Zt;
  }
  function I8(t8, e9) {
    if (!l6.isValidNot0(e9)) throw Error(`invalid signature ${t8}: out of range 1..Point.Fn.ORDER`);
    return e9;
  }
  class S7 {
    constructor(t8, e9, f8) {
      this.r = I8("r", t8), this.s = I8("s", e9), null != f8 && (this.recovery = f8), Object.freeze(this);
    }
    static fromBytes(t8, e9 = E8) {
      let f8;
      if ((function(t9, e10) {
        Rt(e10);
        const f9 = B7.signature;
        v2(t9, "compact" === e10 ? f9 : "recovered" === e10 ? f9 + 1 : void 0, e10 + " signature");
      })(t8, e9), "der" === e9) {
        const { r: e10, s: f9 } = At2.toSig(v2(t8));
        return new S7(e10, f9);
      }
      "recovered" === e9 && (f8 = t8[0], e9 = "compact", t8 = t8.subarray(1));
      const r8 = l6.BYTES, n8 = t8.subarray(0, r8), o9 = t8.subarray(r8, 2 * r8);
      return new S7(l6.fromBytes(n8), l6.fromBytes(o9), f8);
    }
    static fromHex(e9, f8) {
      return this.fromBytes(B(e9), f8);
    }
    addRecoveryBit(t8) {
      return new S7(this.r, this.s, t8);
    }
    recoverPublicKey(t8) {
      const f8 = d6.ORDER, { r: r8, s: o9, recovery: i9 } = this;
      if (null == i9 || ![0, 1, 2, 3].includes(i9)) throw Error("recovery id invalid");
      if (h7 * Kt < f8 && i9 > 1) throw Error("recovery id is ambiguous for h>1 curve");
      const s8 = 2 === i9 || 3 === i9 ? r8 + h7 : r8;
      if (!d6.isValid(s8)) throw Error("recovery id 2 or 3 invalid");
      const c8 = d6.toBytes(s8), a9 = e8.fromBytes(k(Tt(!(1 & i9)), c8)), u8 = l6.inv(s8), b7 = F7(q2("msgHash", t8)), g8 = l6.create(-b7 * u8), p6 = l6.create(o9 * u8), y9 = e8.BASE.multiplyUnsafe(g8).add(a9.multiplyUnsafe(p6));
      if (y9.is0()) throw Error("point at infinify");
      return y9.assertValidity(), y9;
    }
    hasHighS() {
      return x7(this.s);
    }
    toBytes(e9 = E8) {
      if (Rt(e9), "der" === e9) return B(At2.hexFromSig(this));
      const f8 = l6.toBytes(this.r), r8 = l6.toBytes(this.s);
      if ("recovered" === e9) {
        if (null == this.recovery) throw Error("recovery bit must be present");
        return k(Uint8Array.of(this.recovery), f8, r8);
      }
      return k(f8, r8);
    }
    toHex(t8) {
      return x(this.toBytes(t8));
    }
    assertValidity() {
    }
    static fromCompact(t8) {
      return S7.fromBytes(q2("sig", t8), "compact");
    }
    static fromDER(t8) {
      return S7.fromBytes(q2("sig", t8), "der");
    }
    normalizeS() {
      return this.hasHighS() ? new S7(this.r, l6.neg(this.s), this.recovery) : this;
    }
    toDERRawBytes() {
      return this.toBytes("der");
    }
    toDERHex() {
      return x(this.toBytes("der"));
    }
    toCompactRawBytes() {
      return this.toBytes("compact");
    }
    toCompactHex() {
      return x(this.toBytes("compact"));
    }
  }
  const R7 = i8.bits2int || function(t8) {
    if (t8.length > 8192) throw Error("input is too large");
    const e9 = O2(t8), f8 = 8 * t8.length - b6;
    return f8 > 0 ? e9 >> BigInt(f8) : e9;
  }, F7 = i8.bits2int_modN || function(t8) {
    return l6.create(R7(t8));
  }, A8 = U2(b6);
  function Z5(t8) {
    return N2("num < 2^" + b6, t8, qt, A8), l6.toBytes(t8);
  }
  function K7(t8, e9) {
    return v2(t8, void 0, "message"), e9 ? v2(o8(t8), void 0, "prehashed message") : t8;
  }
  return Object.freeze({ keygen: g7, getPublicKey: p5, getSharedSecret: y8, utils: m6, lengths: B7, Point: e8, sign: function(t8, f8, r8 = {}) {
    t8 = q2("message", t8);
    const { seed: i9, k2sig: s8 } = (function(t9, f9, r9) {
      if (["recovered", "canonical"].some(((t10) => t10 in r9))) throw Error("sign() legacy options not supported");
      const { lowS: o9, prehash: i10, extraEntropy: s9 } = Ft2(r9, w8);
      t9 = K7(t9, i10);
      const a9 = F7(t9), d7 = Ut2(l6, f9), u8 = [Z5(d7), Z5(a9)];
      if (null != s9 && false !== s9) {
        const t10 = true === s9 ? c7(B7.secretKey) : s9;
        u8.push(q2("extraEntropy", t10));
      }
      const h8 = k(...u8), b7 = a9;
      return { seed: h8, k2sig: function(t10) {
        const f10 = R7(t10);
        if (!l6.isValidNot0(f10)) return;
        const r10 = l6.inv(f10), n8 = e8.BASE.multiply(f10).toAffine(), i11 = l6.create(n8.x);
        if (i11 === qt) return;
        const s10 = l6.create(r10 * l6.create(b7 + i11 * d7));
        if (s10 === qt) return;
        let c8 = (n8.x === i11 ? 0 : 2) | Number(n8.y & Zt), a10 = s10;
        return o9 && x7(s10) && (a10 = l6.neg(s10), c8 ^= 1), new S7(i11, a10, c8);
      } };
    })(t8, f8, r8);
    return (function(t9, e9, f9) {
      if ("number" != typeof t9 || t9 < 2) throw Error("hashLen must be a number");
      if ("number" != typeof e9 || e9 < 2) throw Error("qByteLen must be a number");
      if ("function" != typeof f9) throw Error("hmacFn must be a function");
      const r9 = (t10) => new Uint8Array(t10), o9 = (t10) => Uint8Array.of(t10);
      let i10 = r9(t9), s9 = r9(t9), c8 = 0;
      const a9 = () => {
        i10.fill(1), s9.fill(0), c8 = 0;
      }, d7 = (...t10) => f9(s9, i10, ...t10), u8 = (t10 = r9(0)) => {
        s9 = d7(o9(0), t10), i10 = d7(), 0 !== t10.length && (s9 = d7(o9(1), t10), i10 = d7());
      }, l7 = () => {
        if (c8++ >= 1e3) throw Error("drbg: tried 1000 values");
        let t10 = 0;
        const f10 = [];
        for (; t10 < e9; ) {
          i10 = d7();
          const e10 = i10.slice();
          f10.push(e10), t10 += i10.length;
        }
        return k(...f10);
      };
      return (t10, e10) => {
        let f10;
        for (a9(), u8(t10); !(f10 = e10(l7())); ) u8();
        return a9(), f10;
      };
    })(o8.outputLen, l6.BYTES, a8)(i9, s8);
  }, verify: function(t8, f8, n8, o9 = {}) {
    const { lowS: i9, prehash: s8, format: c8 } = Ft2(o9, w8);
    if (n8 = q2("publicKey", n8), f8 = K7(q2("message", f8), s8), "strict" in o9) throw Error("options.strict was renamed to lowS");
    const a9 = void 0 === c8 ? (function(t9) {
      let e9;
      const f9 = "string" == typeof t9 || s(t9), n9 = !f9 && null !== t9 && "object" == typeof t9 && "bigint" == typeof t9.r && "bigint" == typeof t9.s;
      if (!f9 && !n9) throw Error("invalid signature, expected Uint8Array, hex string or Signature instance");
      if (n9) e9 = new S7(t9.r, t9.s);
      else if (f9) {
        try {
          e9 = S7.fromBytes(q2("sig", t9), "der");
        } catch (t10) {
          if (!(t10 instanceof At2.Err)) throw t10;
        }
        if (!e9) try {
          e9 = S7.fromBytes(q2("sig", t9), "compact");
        } catch (t10) {
          return false;
        }
      }
      return e9 || false;
    })(t8) : S7.fromBytes(q2("sig", t8), c8);
    if (false === a9) return false;
    try {
      const t9 = e8.fromBytes(n8);
      if (i9 && a9.hasHighS()) return false;
      const { r: r8, s: o10 } = a9, s9 = F7(f8), c9 = l6.inv(o10), d7 = l6.create(s9 * c9), u8 = l6.create(r8 * c9), h8 = e8.BASE.multiplyUnsafe(d7).add(t9.multiplyUnsafe(u8));
      if (h8.is0()) return false;
      return l6.create(h8.x) === r8;
    } catch (t9) {
      return false;
    }
  }, recoverPublicKey: function(t8, e9, f8 = {}) {
    const { prehash: r8 } = Ft2(f8, w8);
    return e9 = K7(e9, r8), S7.fromBytes(t8, "recovered").recoverPublicKey(e9).toBytes();
  }, Signature: S7, hash: o8 });
}
function Lt2(t8) {
  const { CURVE: e8, curveOpts: f8 } = (function(t9) {
    const e9 = { a: t9.a, b: t9.b, p: t9.Fp.ORDER, n: t9.n, h: t9.h, Gx: t9.Gx, Gy: t9.Gy }, f9 = t9.Fp;
    let r9 = t9.allowedPrivateKeyLengths ? Array.from(new Set(t9.allowedPrivateKeyLengths.map(((t10) => Math.ceil(t10 / 2))))) : void 0;
    return { CURVE: e9, curveOpts: { Fp: f9, Fn: it2(e9.n, { BITS: t9.nBitLength, allowedLengths: r9, modFromBytes: t9.wrapPrivateKey }), allowInfinityPoint: t9.allowInfinityPoint, endo: t9.endo, isTorsionFree: t9.isTorsionFree, clearCofactor: t9.clearCofactor, fromBytes: t9.fromBytes, toBytes: t9.toBytes } };
  })(t8), r8 = { hmac: t8.hmac, randomBytes: t8.randomBytes, lowS: t8.lowS, bits2int: t8.bits2int, bits2int_modN: t8.bits2int_modN };
  return { CURVE: e8, curveOpts: f8, hash: t8.hash, ecdsaOpts: r8 };
}
function Gt2(t8) {
  const { CURVE: e8, curveOpts: f8, hash: r8, ecdsaOpts: n8 } = Lt2(t8);
  return (function(t9, e9) {
    const f9 = e9.Point;
    return Object.assign({}, e9, { ProjectivePoint: f9, CURVE: Object.assign({}, t9, ot2(f9.Fn.ORDER, f9.Fn.BITS)) });
  })(t8, jt(Vt(e8, f8), r8, n8));
}
function Ht2(t8, e8) {
  const f8 = (e9) => Gt2({ ...t8, hash: e9 });
  return { ...f8(e8), create: f8 };
}
function re(t8, e8 = {}) {
  const r8 = St("edwards", t8, e8, e8.FpFnLE), { Fp: n8, Fn: o8 } = r8;
  let i8 = r8.CURVE;
  const { h: s8 } = i8;
  V2(e8, {}, { uvRatio: "function" });
  const c7 = ee << BigInt(8 * o8.BYTES) - te, a8 = (t9) => n8.create(t9), d6 = e8.uvRatio || ((t9, e9) => {
    try {
      return { isValid: true, value: n8.sqrt(n8.div(t9, e9)) };
    } catch (t10) {
      return { isValid: false, value: Qt };
    }
  });
  if (!(function(t9, e9, f8, r9) {
    const n9 = t9.sqr(f8), o9 = t9.sqr(r9), i9 = t9.add(t9.mul(e9.a, n9), o9), s9 = t9.add(t9.ONE, t9.mul(e9.d, t9.mul(n9, o9)));
    return t9.eql(i9, s9);
  })(n8, i8, i8.Gx, i8.Gy)) throw Error("bad curve params: generator point");
  function u8(t9, e9, f8 = false) {
    return N2("coordinate " + t9, e9, f8 ? te : Qt, c7), e9;
  }
  function l6(t9) {
    if (!(t9 instanceof g7)) throw Error("ExtendedPoint expected");
  }
  const h7 = T2(((t9, e9) => {
    const { X: f8, Y: r9, Z: o9 } = t9, i9 = t9.is0();
    null == e9 && (e9 = i9 ? fe : n8.inv(o9));
    const s9 = a8(f8 * e9), c8 = a8(r9 * e9), d7 = n8.mul(o9, e9);
    if (i9) return { x: Qt, y: te };
    if (d7 !== te) throw Error("invZ was invalid");
    return { x: s9, y: c8 };
  })), b6 = T2(((t9) => {
    const { a: e9, d: f8 } = i8;
    if (t9.is0()) throw Error("bad point: ZERO");
    const { X: r9, Y: n9, Z: o9, T: s9 } = t9, c8 = a8(r9 * r9), d7 = a8(n9 * n9), u9 = a8(o9 * o9), l7 = a8(u9 * u9), h8 = a8(c8 * e9);
    if (a8(u9 * a8(h8 + d7)) !== a8(l7 + a8(f8 * a8(c8 * d7)))) throw Error("bad point: equation left != right (1)");
    if (a8(r9 * n9) !== a8(o9 * s9)) throw Error("bad point: equation left != right (2)");
    return true;
  }));
  class g7 {
    constructor(t9, e9, f8, r9) {
      this.X = u8("x", t9), this.Y = u8("y", e9), this.Z = u8("z", f8, true), this.T = u8("t", r9), Object.freeze(this);
    }
    static CURVE() {
      return i8;
    }
    static fromAffine(t9) {
      if (t9 instanceof g7) throw Error("extended point not allowed");
      const { x: e9, y: f8 } = t9 || {};
      return u8("x", e9), u8("y", f8), new g7(e9, f8, te, a8(e9 * f8));
    }
    static fromBytes(t9, e9 = false) {
      const f8 = n8.BYTES, { a: r9, d: o9 } = i8;
      t9 = Z2(v2(t9, f8, "point")), x2(e9, "zip215");
      const s9 = Z2(t9), u9 = t9[f8 - 1];
      s9[f8 - 1] = -129 & u9;
      const l7 = R2(s9), h8 = e9 ? c7 : n8.ORDER;
      N2("point.y", l7, Qt, h8);
      const b7 = a8(l7 * l7), p6 = a8(b7 - te), y8 = a8(o9 * b7 - r9);
      let { isValid: m6, value: B7 } = d6(p6, y8);
      if (!m6) throw Error("bad point: invalid y coordinate");
      const w8 = (B7 & te) === te, E8 = !!(128 & u9);
      if (!e9 && B7 === Qt && E8) throw Error("bad point: x=0 and x_0=1");
      return E8 !== w8 && (B7 = a8(-B7)), g7.fromAffine({ x: B7, y: l7 });
    }
    static fromHex(t9, e9 = false) {
      return g7.fromBytes(q2("point", t9), e9);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    precompute(t9 = 8, e9 = true) {
      return p5.createCache(this, t9), e9 || this.multiply(ee), this;
    }
    assertValidity() {
      b6(this);
    }
    equals(t9) {
      l6(t9);
      const { X: e9, Y: f8, Z: r9 } = this, { X: n9, Y: o9, Z: i9 } = t9, s9 = a8(e9 * i9), c8 = a8(n9 * r9), d7 = a8(f8 * i9), u9 = a8(o9 * r9);
      return s9 === c8 && d7 === u9;
    }
    is0() {
      return this.equals(g7.ZERO);
    }
    negate() {
      return new g7(a8(-this.X), this.Y, this.Z, a8(-this.T));
    }
    double() {
      const { a: t9 } = i8, { X: e9, Y: f8, Z: r9 } = this, n9 = a8(e9 * e9), o9 = a8(f8 * f8), s9 = a8(ee * a8(r9 * r9)), c8 = a8(t9 * n9), d7 = e9 + f8, u9 = a8(a8(d7 * d7) - n9 - o9), l7 = c8 + o9, h8 = l7 - s9, b7 = c8 - o9, p6 = a8(u9 * h8), y8 = a8(l7 * b7), m6 = a8(u9 * b7), B7 = a8(h8 * l7);
      return new g7(p6, y8, B7, m6);
    }
    add(t9) {
      l6(t9);
      const { a: e9, d: f8 } = i8, { X: r9, Y: n9, Z: o9, T: s9 } = this, { X: c8, Y: d7, Z: u9, T: h8 } = t9, b7 = a8(r9 * c8), p6 = a8(n9 * d7), y8 = a8(s9 * f8 * h8), m6 = a8(o9 * u9), B7 = a8((r9 + n9) * (c8 + d7) - b7 - p6), w8 = m6 - y8, E8 = m6 + y8, x7 = a8(p6 - e9 * b7), v7 = a8(B7 * w8), I8 = a8(E8 * x7), S7 = a8(B7 * x7), O6 = a8(w8 * E8);
      return new g7(v7, I8, O6, S7);
    }
    subtract(t9) {
      return this.add(t9.negate());
    }
    multiply(t9) {
      if (!o8.isValidNot0(t9)) throw Error("invalid scalar: expected 1 <= sc < curve.n");
      const { p: e9, f: f8 } = p5.cached(this, t9, ((t10) => bt2(g7, t10)));
      return bt2(g7, [e9, f8])[0];
    }
    multiplyUnsafe(t9, e9 = g7.ZERO) {
      if (!o8.isValid(t9)) throw Error("invalid scalar: expected 0 <= sc < curve.n");
      return t9 === Qt ? g7.ZERO : this.is0() || t9 === te ? this : p5.unsafe(this, t9, ((t10) => bt2(g7, t10)), e9);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(s8).is0();
    }
    isTorsionFree() {
      return p5.unsafe(this, i8.n).is0();
    }
    toAffine(t9) {
      return h7(this, t9);
    }
    clearCofactor() {
      return s8 === te ? this : this.multiplyUnsafe(s8);
    }
    toBytes() {
      const { x: t9, y: e9 } = this.toAffine(), f8 = n8.toBytes(e9);
      return f8[f8.length - 1] |= t9 & te ? 128 : 0, f8;
    }
    toHex() {
      return x(this.toBytes());
    }
    toString() {
      return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
    }
    get ex() {
      return this.X;
    }
    get ey() {
      return this.Y;
    }
    get ez() {
      return this.Z;
    }
    get et() {
      return this.T;
    }
    static normalizeZ(t9) {
      return bt2(g7, t9);
    }
    static msm(t9, e9) {
      return vt2(g7, o8, t9, e9);
    }
    _setWindowSize(t9) {
      this.precompute(t9);
    }
    toRawBytes() {
      return this.toBytes();
    }
  }
  g7.BASE = new g7(i8.Gx, i8.Gy, te, a8(i8.Gx * i8.Gy)), g7.ZERO = new g7(Qt, te, te, Qt), g7.Fp = n8, g7.Fn = o8;
  const p5 = new xt2(g7, o8.BITS);
  return g7.BASE.precompute(8), g7;
}
function ne(t8, e8, f8 = {}) {
  if ("function" != typeof e8) throw Error('"hash" function param is required');
  V2(f8, {}, { adjustScalarBytes: "function", randomBytes: "function", domain: "function", prehash: "function", mapToCurve: "function" });
  const { prehash: o8 } = f8, { BASE: i8, Fp: s8, Fn: c7 } = t8, a8 = f8.randomBytes || C, d6 = f8.adjustScalarBytes || ((t9) => t9), l6 = f8.domain || ((t9, e9, f9) => {
    if (x2(f9, "phflag"), e9.length || f9) throw Error("Contexts/pre-hash are not supported");
    return t9;
  });
  function h7(t9) {
    return c7.create(R2(t9));
  }
  function b6(t9) {
    const { head: f9, prefix: r8, scalar: n8 } = (function(t10) {
      const f10 = B7.secretKey;
      t10 = q2("private key", t10, f10);
      const r9 = q2("hashed private key", e8(t10), 2 * f10), n9 = d6(r9.slice(0, f10));
      return { head: n9, prefix: r9.slice(f10, 2 * f10), scalar: h7(n9) };
    })(t9), o9 = i8.multiply(n8), s9 = o9.toBytes();
    return { head: f9, prefix: r8, scalar: n8, point: o9, pointBytes: s9 };
  }
  function g7(t9) {
    return b6(t9).pointBytes;
  }
  function p5(t9 = Uint8Array.of(), ...f9) {
    const r8 = k(...f9);
    return h7(e8(l6(r8, q2("context", t9), !!o8)));
  }
  const y8 = { zip215: true };
  const m6 = s8.BYTES, B7 = { secretKey: m6, publicKey: m6, signature: 2 * m6, seed: m6 };
  function w8(t9 = a8(B7.seed)) {
    return v2(t9, B7.seed, "seed");
  }
  const E8 = { getExtendedPublicKey: b6, randomSecretKey: w8, isValidSecretKey: function(t9) {
    return s(t9) && t9.length === c7.BYTES;
  }, isValidPublicKey: function(e9, f9) {
    try {
      return !!t8.fromBytes(e9, f9);
    } catch (t9) {
      return false;
    }
  }, toMontgomery(e9) {
    const { y: f9 } = t8.fromBytes(e9), r8 = B7.publicKey, n8 = 32 === r8;
    if (!n8 && 57 !== r8) throw Error("only defined for 25519 and 448");
    const o9 = n8 ? s8.div(te + f9, te - f9) : s8.div(f9 - te, f9 + te);
    return s8.toBytes(o9);
  }, toMontgomerySecret(t9) {
    const f9 = B7.secretKey;
    v2(t9, f9);
    const r8 = e8(t9.subarray(0, f9));
    return d6(r8).subarray(0, f9);
  }, randomPrivateKey: w8, precompute: (e9 = 8, f9 = t8.BASE) => f9.precompute(e9, false) };
  return Object.freeze({ keygen: function(t9) {
    const e9 = E8.randomSecretKey(t9);
    return { secretKey: e9, publicKey: g7(e9) };
  }, getPublicKey: g7, sign: function(t9, e9, f9 = {}) {
    t9 = q2("message", t9), o8 && (t9 = o8(t9));
    const { prefix: r8, scalar: s9, pointBytes: a9 } = b6(e9), d7 = p5(f9.context, r8, t9), u8 = i8.multiply(d7).toBytes(), l7 = p5(f9.context, u8, a9, t9), h8 = c7.create(d7 + l7 * s9);
    if (!c7.isValid(h8)) throw Error("sign failed: invalid s");
    return v2(k(u8, c7.toBytes(h8)), B7.signature, "result");
  }, verify: function(e9, f9, r8, n8 = y8) {
    const { context: s9, zip215: c8 } = n8, a9 = B7.signature;
    e9 = q2("signature", e9, a9), f9 = q2("message", f9), r8 = q2("publicKey", r8, B7.publicKey), void 0 !== c8 && x2(c8, "zip215"), o8 && (f9 = o8(f9));
    const d7 = a9 / 2, u8 = e9.subarray(0, d7), l7 = R2(e9.subarray(d7, a9));
    let h8, b7, g8;
    try {
      h8 = t8.fromBytes(r8, c8), b7 = t8.fromBytes(u8, c8), g8 = i8.multiplyUnsafe(l7);
    } catch (t9) {
      return false;
    }
    if (!c8 && h8.isSmallOrder()) return false;
    const m7 = p5(s9, b7.toBytes(), h8.toBytes(), f9);
    return b7.add(h8.multiplyUnsafe(m7)).subtract(g8).clearCofactor().is0();
  }, utils: E8, Point: t8, lengths: B7 });
}
function ce(t8) {
  const f8 = (V2(r8 = t8, { adjustScalarBytes: "function", powPminus2: "function" }), Object.freeze({ ...r8 }));
  var r8;
  const { P: n8, type: o8, adjustScalarBytes: i8, powPminus2: s8, randomBytes: c7 } = f8, a8 = "x25519" === o8;
  if (!a8 && "x448" !== o8) throw Error("invalid type");
  const d6 = c7 || C, l6 = a8 ? 255 : 448, h7 = a8 ? 32 : 56, b6 = a8 ? BigInt(9) : BigInt(5), g7 = a8 ? BigInt(121665) : BigInt(39081), p5 = a8 ? se ** BigInt(254) : se ** BigInt(447), y8 = a8 ? BigInt(8) * se ** BigInt(251) - ie : BigInt(4) * se ** BigInt(445) - ie, m6 = p5 + y8 + ie, B7 = (t9) => X2(t9, n8), w8 = E8(b6);
  function E8(t9) {
    return A2(B7(t9), h7);
  }
  function x7(t9, e8) {
    const f9 = (function(t10, e9) {
      N2("u", t10, oe, n8), N2("scalar", e9, p5, m6);
      const f10 = e9, r9 = t10;
      let o9 = ie, i9 = oe, c8 = t10, a9 = ie, d7 = oe;
      for (let t11 = BigInt(l6 - 1); t11 >= oe; t11--) {
        const e10 = f10 >> t11 & ie;
        d7 ^= e10, { x_2: o9, x_3: c8 } = I8(d7, o9, c8), { x_2: i9, x_3: a9 } = I8(d7, i9, a9), d7 = e10;
        const n9 = o9 + i9, s9 = B7(n9 * n9), u9 = o9 - i9, l7 = B7(u9 * u9), h8 = s9 - l7, b7 = c8 + a9, p6 = B7((c8 - a9) * n9), y9 = B7(b7 * u9), m7 = p6 + y9, w9 = p6 - y9;
        c8 = B7(m7 * m7), a9 = B7(r9 * B7(w9 * w9)), o9 = B7(s9 * l7), i9 = B7(h8 * (s9 + B7(g7 * h8)));
      }
      ({ x_2: o9, x_3: c8 } = I8(d7, o9, c8)), { x_2: i9, x_3: a9 } = I8(d7, i9, a9);
      const u8 = s8(i9);
      return B7(o9 * u8);
    })((function(t10) {
      const e9 = q2("u coordinate", t10, h7);
      return a8 && (e9[31] &= 127), B7(R2(e9));
    })(e8), (function(t10) {
      return R2(i8(q2("scalar", t10, h7)));
    })(t9));
    if (f9 === oe) throw Error("invalid private or public key received");
    return E8(f9);
  }
  function v7(t9) {
    return x7(t9, w8);
  }
  function I8(t9, e8, f9) {
    const r9 = B7(t9 * (e8 - f9));
    return { x_2: e8 = B7(e8 - r9), x_3: f9 = B7(f9 + r9) };
  }
  const S7 = { secretKey: h7, publicKey: h7, seed: h7 }, O6 = (t9 = d6(h7)) => (n(t9, S7.seed), t9);
  return { keygen: function(t9) {
    const e8 = O6(t9);
    return { secretKey: e8, publicKey: v7(e8) };
  }, getSharedSecret: (t9, e8) => x7(t9, e8), getPublicKey: (t9) => v7(t9), scalarMult: x7, scalarMultBase: v7, utils: { randomSecretKey: O6, randomPrivateKey: O6 }, GuBytes: w8.slice(), lengths: S7 };
}
function we(t8) {
  const e8 = ae.p, f8 = t8 * t8 * t8 % e8, r8 = f8 * f8 * t8 % e8, n8 = M2(r8, be, e8) * r8 % e8, o8 = M2(n8, be, e8) * r8 % e8, i8 = M2(o8, he, e8) * f8 % e8, s8 = M2(i8, ge, e8) * i8 % e8, c7 = M2(s8, pe, e8) * s8 % e8, a8 = M2(c7, ye, e8) * c7 % e8, d6 = M2(a8, me, e8) * a8 % e8, u8 = M2(d6, ye, e8) * c7 % e8, l6 = M2(u8, he, e8) * f8 % e8, h7 = M2(l6, le, e8) * t8 % e8;
  return M2(h7, Be, e8) * l6 % e8;
}
function Ee(t8) {
  return t8[0] &= 252, t8[55] |= 128, t8[56] = 0, t8;
}
function xe(t8, e8) {
  const f8 = ae.p, r8 = X2(t8 * t8 * e8, f8), n8 = X2(r8 * t8, f8), o8 = X2(n8 * r8 * e8, f8), i8 = X2(n8 * we(o8), f8), s8 = X2(i8 * i8, f8);
  return { isValid: X2(s8 * e8, f8) === t8, value: i8 };
}
function Se(t8, e8, f8) {
  if (e8.length > 255) throw Error("context must be smaller than 255, got: " + e8.length);
  return k((r8 = "SigEd448", Uint8Array.from(r8, ((t9, e9) => {
    const f9 = t9.charCodeAt(0);
    if (1 !== t9.length || f9 > 127) throw Error(`string contains non-ASCII character "${r8[e9]}" with code ${f9} at position ${e9}`);
    return f9;
  }))), new Uint8Array([f8 ? 1 : 0, e8.length]), e8, t8);
  var r8;
}
var w2, E2, K2, U2, C2, k2, j2, L2, G2, H2, Y2, z2, _2, D2, ft2, at2, dt2, ut2, lt2, mt2, Bt2, xt2, Ot2, At2, qt, Zt, Kt, Nt2, Pt, Yt, zt, _t2, Dt2, Xt2, Mt2, $t, Wt, Jt, Qt, te, ee, fe, oe, ie, se, ae, de, ue, le, he, be, ge, pe, ye, me, Be, ve, Ie, Oe, Re, Fe, Ae, qe, Ze, Ke, Ne, Pe, Ue, Ve, Te, Ce, ke;
var init_noble_curves_min = __esm({
  "node_modules/openpgp/dist/lightweight/noble_curves.min.mjs"() {
    init_sha512_min();
    w2 = /* @__PURE__ */ BigInt(0);
    E2 = /* @__PURE__ */ BigInt(1);
    K2 = (t8) => "bigint" == typeof t8 && w2 <= t8;
    U2 = (t8) => (E2 << BigInt(t8)) - E2;
    C2 = BigInt(0);
    k2 = BigInt(1);
    j2 = /* @__PURE__ */ BigInt(2);
    L2 = /* @__PURE__ */ BigInt(3);
    G2 = /* @__PURE__ */ BigInt(4);
    H2 = /* @__PURE__ */ BigInt(5);
    Y2 = /* @__PURE__ */ BigInt(7);
    z2 = /* @__PURE__ */ BigInt(8);
    _2 = /* @__PURE__ */ BigInt(9);
    D2 = /* @__PURE__ */ BigInt(16);
    ft2 = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
    at2 = class extends m {
      constructor(t8, e8) {
        super(), this.finished = false, this.destroyed = false, r(t8);
        const f8 = L(e8);
        if (this.iHash = t8.create(), "function" != typeof this.iHash.update) throw Error("Expected instance of class which extends utils.Hash");
        this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
        const r8 = this.blockLen, n8 = new Uint8Array(r8);
        n8.set(f8.length > r8 ? t8.create().update(f8).digest() : f8);
        for (let t9 = 0; t9 < n8.length; t9++) n8[t9] ^= 54;
        this.iHash.update(n8), this.oHash = t8.create();
        for (let t9 = 0; t9 < n8.length; t9++) n8[t9] ^= 106;
        this.oHash.update(n8), c(n8);
      }
      update(t8) {
        return h(this), this.iHash.update(t8), this;
      }
      digestInto(t8) {
        h(this), n(t8, this.outputLen), this.finished = true, this.iHash.digestInto(t8), this.oHash.update(t8), this.oHash.digestInto(t8), this.destroy();
      }
      digest() {
        const t8 = new Uint8Array(this.oHash.outputLen);
        return this.digestInto(t8), t8;
      }
      _cloneInto(t8) {
        t8 || (t8 = Object.create(Object.getPrototypeOf(this), {}));
        const { oHash: e8, iHash: f8, finished: r8, destroyed: n8, blockLen: o8, outputLen: i8 } = this;
        return t8.finished = r8, t8.destroyed = n8, t8.blockLen = o8, t8.outputLen = i8, t8.oHash = e8._cloneInto(t8.oHash), t8.iHash = f8._cloneInto(t8.iHash), t8;
      }
      clone() {
        return this._cloneInto();
      }
      destroy() {
        this.destroyed = true, this.oHash.destroy(), this.iHash.destroy();
      }
    };
    dt2 = (t8, e8, f8) => new at2(t8, e8).update(f8).digest();
    dt2.create = (t8, e8) => new at2(t8, e8);
    ut2 = BigInt(0);
    lt2 = BigInt(1);
    mt2 = /* @__PURE__ */ new WeakMap();
    Bt2 = /* @__PURE__ */ new WeakMap();
    xt2 = class {
      constructor(t8, e8) {
        this.BASE = t8.BASE, this.ZERO = t8.ZERO, this.Fn = t8.Fn, this.bits = e8;
      }
      _unsafeLadder(t8, e8, f8 = this.ZERO) {
        let r8 = t8;
        for (; e8 > ut2; ) e8 & lt2 && (f8 = f8.add(r8)), r8 = r8.double(), e8 >>= lt2;
        return f8;
      }
      precomputeWindow(t8, e8) {
        const { windows: f8, windowSize: r8 } = pt2(e8, this.bits), n8 = [];
        let o8 = t8, i8 = o8;
        for (let t9 = 0; t9 < f8; t9++) {
          i8 = o8, n8.push(i8);
          for (let t10 = 1; t10 < r8; t10++) i8 = i8.add(o8), n8.push(i8);
          o8 = i8.double();
        }
        return n8;
      }
      wNAF(t8, e8, f8) {
        if (!this.Fn.isValid(f8)) throw Error("invalid scalar");
        let r8 = this.ZERO, n8 = this.BASE;
        const o8 = pt2(t8, this.bits);
        for (let t9 = 0; t9 < o8.windows; t9++) {
          const { nextN: i8, offset: s8, isZero: c7, isNeg: a8, isNegF: d6, offsetF: u8 } = yt2(f8, t9, o8);
          f8 = i8, c7 ? n8 = n8.add(ht2(d6, e8[u8])) : r8 = r8.add(ht2(a8, e8[s8]));
        }
        return Et2(f8), { p: r8, f: n8 };
      }
      wNAFUnsafe(t8, e8, f8, r8 = this.ZERO) {
        const n8 = pt2(t8, this.bits);
        for (let t9 = 0; t9 < n8.windows && f8 !== ut2; t9++) {
          const { nextN: o8, offset: i8, isZero: s8, isNeg: c7 } = yt2(f8, t9, n8);
          if (f8 = o8, !s8) {
            const t10 = e8[i8];
            r8 = r8.add(c7 ? t10.negate() : t10);
          }
        }
        return Et2(f8), r8;
      }
      getPrecomputes(t8, e8, f8) {
        let r8 = mt2.get(e8);
        return r8 || (r8 = this.precomputeWindow(e8, t8), 1 !== t8 && ("function" == typeof f8 && (r8 = f8(r8)), mt2.set(e8, r8))), r8;
      }
      cached(t8, e8, f8) {
        const r8 = wt2(t8);
        return this.wNAF(r8, this.getPrecomputes(r8, t8, f8), e8);
      }
      unsafe(t8, e8, f8, r8) {
        const n8 = wt2(t8);
        return 1 === n8 ? this._unsafeLadder(t8, e8, r8) : this.wNAFUnsafe(n8, this.getPrecomputes(n8, t8, f8), e8, r8);
      }
      createCache(t8, e8) {
        gt2(e8, this.bits), Bt2.set(t8, e8), mt2.delete(t8);
      }
      hasCache(t8) {
        return 1 !== wt2(t8);
      }
    };
    Ot2 = (t8, e8) => (t8 + (t8 >= 0 ? e8 : -e8) / Kt) / e8;
    At2 = { Err: class extends Error {
      constructor(t8 = "") {
        super(t8);
      }
    }, _tlv: { encode: (t8, e8) => {
      const { Err: f8 } = At2;
      if (t8 < 0 || t8 > 256) throw new f8("tlv.encode: wrong tag");
      if (1 & e8.length) throw new f8("tlv.encode: unpadded data");
      const r8 = e8.length / 2, n8 = I2(r8);
      if (n8.length / 2 & 128) throw new f8("tlv.encode: long form length too big");
      const o8 = r8 > 127 ? I2(n8.length / 2 | 128) : "";
      return I2(t8) + o8 + n8 + e8;
    }, decode(t8, e8) {
      const { Err: f8 } = At2;
      let r8 = 0;
      if (t8 < 0 || t8 > 256) throw new f8("tlv.encode: wrong tag");
      if (e8.length < 2 || e8[r8++] !== t8) throw new f8("tlv.decode: wrong tlv");
      const n8 = e8[r8++];
      let o8 = 0;
      if (!!(128 & n8)) {
        const t9 = 127 & n8;
        if (!t9) throw new f8("tlv.decode(long): indefinite length not supported");
        if (t9 > 4) throw new f8("tlv.decode(long): byte length is too big");
        const i9 = e8.subarray(r8, r8 + t9);
        if (i9.length !== t9) throw new f8("tlv.decode: length bytes not complete");
        if (0 === i9[0]) throw new f8("tlv.decode(long): zero leftmost byte");
        for (const t10 of i9) o8 = o8 << 8 | t10;
        if (r8 += t9, o8 < 128) throw new f8("tlv.decode(long): not minimal encoding");
      } else o8 = n8;
      const i8 = e8.subarray(r8, r8 + o8);
      if (i8.length !== o8) throw new f8("tlv.decode: wrong value length");
      return { v: i8, l: e8.subarray(r8 + o8) };
    } }, _int: { encode(t8) {
      const { Err: e8 } = At2;
      if (t8 < qt) throw new e8("integer: negative integers are not allowed");
      let f8 = I2(t8);
      if (8 & Number.parseInt(f8[0], 16) && (f8 = "00" + f8), 1 & f8.length) throw new e8("unexpected DER parsing assertion: unpadded hex");
      return f8;
    }, decode(t8) {
      const { Err: e8 } = At2;
      if (128 & t8[0]) throw new e8("invalid signature integer: negative");
      if (0 === t8[0] && !(128 & t8[1])) throw new e8("invalid signature integer: unnecessary leading zero");
      return O2(t8);
    } }, toSig(t8) {
      const { Err: e8, _int: f8, _tlv: r8 } = At2, n8 = q2("signature", t8), { v: o8, l: i8 } = r8.decode(48, n8);
      if (i8.length) throw new e8("invalid signature: left bytes after parsing");
      const { v: s8, l: c7 } = r8.decode(2, o8), { v: a8, l: d6 } = r8.decode(2, c7);
      if (d6.length) throw new e8("invalid signature: left bytes after parsing");
      return { r: f8.decode(s8), s: f8.decode(a8) };
    }, hexFromSig(t8) {
      const { _tlv: e8, _int: f8 } = At2, r8 = e8.encode(2, f8.encode(t8.r)) + e8.encode(2, f8.encode(t8.s));
      return e8.encode(48, r8);
    } };
    qt = BigInt(0);
    Zt = BigInt(1);
    Kt = BigInt(2);
    Nt2 = BigInt(3);
    Pt = BigInt(4);
    Yt = { p: BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff"), n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"), h: BigInt(1), a: BigInt("0xffffffff00000001000000000000000000000000fffffffffffffffffffffffc"), b: BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"), Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"), Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5") };
    zt = { p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000ffffffff"), n: BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973"), h: BigInt(1), a: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000fffffffc"), b: BigInt("0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef"), Gx: BigInt("0xaa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7"), Gy: BigInt("0x3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f") };
    _t2 = { p: BigInt("0x1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), n: BigInt("0x01fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa51868783bf2f966b7fcc0148f709a5d03bb5c9b8899c47aebb6fb71e91386409"), h: BigInt(1), a: BigInt("0x1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc"), b: BigInt("0x0051953eb9618e1c9a1f929a21a0b68540eea2da725b99b315f3b8b489918ef109e156193951ec7e937b1652c0bd3bb1bf073573df883d2c34f1ef451fd46b503f00"), Gx: BigInt("0x00c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66"), Gy: BigInt("0x011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650") };
    Dt2 = it2(Yt.p);
    Xt2 = it2(zt.p);
    Mt2 = it2(_t2.p);
    $t = Ht2({ ...Yt, Fp: Dt2, lowS: false }, lt);
    Wt = Ht2({ ...zt, Fp: Xt2, lowS: false }, bt);
    Jt = Ht2({ ..._t2, Fp: Mt2, lowS: false, allowedPrivateKeyLengths: [130, 131, 132] }, dt);
    Qt = BigInt(0);
    te = BigInt(1);
    ee = BigInt(2);
    fe = BigInt(8);
    oe = BigInt(0);
    ie = BigInt(1);
    se = BigInt(2);
    ae = { p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), n: BigInt("0x3fffffffffffffffffffffffffffffffffffffffffffffffffffffff7cca23e9c44edb49aed63690216cc2728dc58f552378c292ab5844f3"), h: BigInt(4), a: BigInt(1), d: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffffffffffffffffffffffffffffffffffffffffffffffff6756"), Gx: BigInt("0x4f1970c66bed0ded221d15a622bf36da9e146570470f1767ea6de324a3d3a46412ae1af72ab66511433b80e18b00938e2626a82bc70cc05e"), Gy: BigInt("0x693f46716eb6bc248876203756c9c7624bea73736ca3984087789c1e05a0c2d73ad3ff1ce67c39c4fdbd132c4ed7c8ad9808795bf230fa14") };
    de = Object.assign({}, ae, { d: BigInt("0xd78b4bdc7f0daf19f24f38c29373a2ccad46157242a50f37809b1da3412a12e79ccc9c81264cfe9ad080997058fb61c4243cc32dbaa156b9"), Gx: BigInt("0x79a70b2b70400553ae7c9df416c792c61128751ac92969240c25a07d728bdc93e21f7787ed6972249de732f38496cd11698713093e9c04fc"), Gy: BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffff80000000000000000000000000000000000000000000000000000001") });
    ue = /* @__PURE__ */ I((() => vt.create({ dkLen: 114 })));
    le = BigInt(1);
    he = BigInt(2);
    be = BigInt(3);
    BigInt(4);
    ge = BigInt(11);
    pe = BigInt(22);
    ye = BigInt(44);
    me = BigInt(88);
    Be = BigInt(223);
    ve = /* @__PURE__ */ (() => it2(ae.p, { BITS: 456, isLE: true }))();
    Ie = /* @__PURE__ */ (() => it2(ae.n, { BITS: 456, isLE: true }))();
    Oe = (function(t8) {
      const { CURVE: e8, curveOpts: f8, hash: r8, eddsaOpts: n8 } = (function(t9) {
        const e9 = { a: t9.a, d: t9.d, p: t9.Fp.ORDER, n: t9.n, h: t9.h, Gx: t9.Gx, Gy: t9.Gy }, f9 = { Fp: t9.Fp, Fn: it2(e9.n, t9.nBitLength, true), uvRatio: t9.uvRatio }, r9 = { randomBytes: t9.randomBytes, adjustScalarBytes: t9.adjustScalarBytes, domain: t9.domain, prehash: t9.prehash, mapToCurve: t9.mapToCurve };
        return { CURVE: e9, curveOpts: f9, hash: t9.hash, eddsaOpts: r9 };
      })(t8);
      return (function(t9, e9) {
        const f9 = e9.Point;
        return Object.assign({}, e9, { ExtendedPoint: f9, CURVE: t9, nBitLength: f9.Fn.BITS, nByteLength: f9.Fn.BYTES });
      })(t8, ne(re(e8, f8), r8, n8));
    })(/* @__PURE__ */ (() => ({ ...ae, Fp: ve, Fn: Ie, nBitLength: Ie.BITS, hash: ue, adjustScalarBytes: Ee, domain: Se, uvRatio: xe }))());
    re(de);
    Re = /* @__PURE__ */ (() => {
      const t8 = ae.p;
      return ce({ P: t8, type: "x448", powPminus2: (e8) => X2(M2(we(e8), he, t8) * e8, t8), adjustScalarBytes: Ee });
    })();
    Fe = { p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), n: BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), h: BigInt(1), a: BigInt(0), b: BigInt(7), Gx: BigInt("0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"), Gy: BigInt("0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8") };
    Ae = { beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"), basises: [[BigInt("0x3086d221a7d46bcde86c90e49284eb15"), -BigInt("0xe4437ed6010e88286f547fa90abfe4c3")], [BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), BigInt("0x3086d221a7d46bcde86c90e49284eb15")]] };
    qe = /* @__PURE__ */ BigInt(2);
    Ze = it2(Fe.p, { sqrt: function(t8) {
      const e8 = Fe.p, f8 = BigInt(3), r8 = BigInt(6), n8 = BigInt(11), o8 = BigInt(22), i8 = BigInt(23), s8 = BigInt(44), c7 = BigInt(88), a8 = t8 * t8 * t8 % e8, d6 = a8 * a8 * t8 % e8, u8 = M2(d6, f8, e8) * d6 % e8, l6 = M2(u8, f8, e8) * d6 % e8, h7 = M2(l6, qe, e8) * a8 % e8, b6 = M2(h7, n8, e8) * h7 % e8, g7 = M2(b6, o8, e8) * b6 % e8, p5 = M2(g7, s8, e8) * g7 % e8, y8 = M2(p5, c7, e8) * p5 % e8, m6 = M2(y8, s8, e8) * g7 % e8, B7 = M2(m6, f8, e8) * d6 % e8, w8 = M2(B7, i8, e8) * b6 % e8, E8 = M2(w8, r8, e8) * a8 % e8, x7 = M2(E8, qe, e8);
      if (!Ze.eql(Ze.sqr(x7), t8)) throw Error("Cannot find square root");
      return x7;
    } });
    Ke = Ht2({ ...Fe, Fp: Ze, lowS: true, endo: Ae }, lt);
    Ne = it2(BigInt("0xa9fb57dba1eea9bc3e660a909d838d726e3bf623d52620282013481d1f6e5377"));
    Pe = Ht2({ a: Ne.create(BigInt("0x7d5a0975fc2c3057eef67530417affe7fb8055c126dc5c6ce94a4b44f330b5d9")), b: BigInt("0x26dc5c6ce94a4b44f330b5d9bbd77cbf958416295cf7e1ce6bccdc18ff8c07b6"), Fp: Ne, n: BigInt("0xa9fb57dba1eea9bc3e660a909d838d718c397aa3b561a6f7901e0e82974856a7"), Gx: BigInt("0x8bd2aeb9cb7e57cb2c4b482ffc81b7afb9de27e1e3bd23c23a4453bd9ace3262"), Gy: BigInt("0x547ef835c3dac4fd97f8461a14611dc9c27745132ded8e545c1d54c72f046997"), h: BigInt(1), lowS: false }, Nt);
    Ue = it2(BigInt("0x8cb91e82a3386d280f5d6f7e50e641df152f7109ed5456b412b1da197fb71123acd3a729901d1a71874700133107ec53"));
    Ve = Ht2({ a: Ue.create(BigInt("0x7bc382c63d8c150c3c72080ace05afa0c2bea28e4fb22787139165efba91f90f8aa5814a503ad4eb04a8c7dd22ce2826")), b: BigInt("0x04a8c7dd22ce28268b39b55416f0447c2fb77de107dcd2a62e880ea53eeb62d57cb4390295dbc9943ab78696fa504c11"), Fp: Ue, n: BigInt("0x8cb91e82a3386d280f5d6f7e50e641df152f7109ed5456b31f166e6cac0425a7cf3ab6af6b7fc3103b883202e9046565"), Gx: BigInt("0x1d1c64f068cf45ffa2a63a81b7c13f6b8847a3e77ef14fe3db7fcafe0cbd10e8e826e03436d646aaef87b2e247d4af1e"), Gy: BigInt("0x8abe1d7520f9c2a45cb1eb8e95cfd55262b70b29feec5864e19c054ff99129280e4646217791811142820341263c5315"), h: BigInt(1), lowS: false }, Mt);
    Te = it2(BigInt("0xaadd9db8dbe9c48b3fd4e6ae33c9fc07cb308db3b3c9d20ed6639cca703308717d4d9b009bc66842aecda12ae6a380e62881ff2f2d82c68528aa6056583a48f3"));
    Ce = Ht2({ a: Te.create(BigInt("0x7830a3318b603b89e2327145ac234cc594cbdd8d3df91610a83441caea9863bc2ded5d5aa8253aa10a2ef1c98b9ac8b57f1117a72bf2c7b9e7c1ac4d77fc94ca")), b: BigInt("0x3df91610a83441caea9863bc2ded5d5aa8253aa10a2ef1c98b9ac8b57f1117a72bf2c7b9e7c1ac4d77fc94cadc083e67984050b75ebae5dd2809bd638016f723"), Fp: Te, n: BigInt("0xaadd9db8dbe9c48b3fd4e6ae33c9fc07cb308db3b3c9d20ed6639cca70330870553e5c414ca92619418661197fac10471db1d381085ddaddb58796829ca90069"), Gx: BigInt("0x81aee4bdd82ed9645a21322e9c4c6a9385ed9f70b5d916c1b43b62eef4d0098eff3b1f78e2d0d48d50d1687b93b97d5f7c6d5047406a5e688b352209bcb9f822"), Gy: BigInt("0x7dde385d566332ecc0eabfa9cf7822fdf209f70024a57b1aa000c55b881f8111b2dcde494a5f485e5bca4bd88a2763aed1ca2b2fa8f0540678cd1e0f3ad80892"), h: BigInt(1), lowS: false }, _t);
    ke = new Map(Object.entries({ nistP256: $t, nistP384: Wt, nistP521: Jt, brainpoolP256r1: Pe, brainpoolP384r1: Ve, brainpoolP512r1: Ce, secp256k1: Ke, x448: Re, ed448: Oe }));
  }
});

// node_modules/openpgp/dist/lightweight/noble_hashes.min.mjs
var noble_hashes_min_exports = {};
__export(noble_hashes_min_exports, {
  nobleHashes: () => I3
});
function j3(t8, s8, h7, i8) {
  return 0 === t8 ? s8 ^ h7 ^ i8 : 1 === t8 ? s8 & h7 | ~s8 & i8 : 2 === t8 ? (s8 | ~h7) ^ i8 : 3 === t8 ? s8 & i8 | h7 & ~i8 : s8 ^ (h7 | ~i8);
}
var u2, A3, d2, m2, y2, C3, U3, w3, g2, B2, D3, b2, E3, M3, x3, _3, q3, v3, O3, k3, z3, F3, G3, H3, I3;
var init_noble_hashes_min = __esm({
  "node_modules/openpgp/dist/lightweight/noble_hashes.min.mjs"() {
    init_sha512_min();
    u2 = /* @__PURE__ */ Uint32Array.from([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
    A3 = /* @__PURE__ */ new Uint32Array(80);
    d2 = class extends O {
      constructor() {
        super(64, 20, 8, false), this.A = 0 | u2[0], this.B = 0 | u2[1], this.C = 0 | u2[2], this.D = 0 | u2[3], this.E = 0 | u2[4];
      }
      get() {
        const { A: t8, B: s8, C: h7, D: i8, E: e8 } = this;
        return [t8, s8, h7, i8, e8];
      }
      set(t8, s8, h7, i8, e8) {
        this.A = 0 | t8, this.B = 0 | s8, this.C = 0 | h7, this.D = 0 | i8, this.E = 0 | e8;
      }
      process(t8, s8) {
        for (let h7 = 0; h7 < 16; h7++, s8 += 4) A3[h7] = t8.getUint32(s8, false);
        for (let t9 = 16; t9 < 80; t9++) A3[t9] = l(A3[t9 - 3] ^ A3[t9 - 8] ^ A3[t9 - 14] ^ A3[t9 - 16], 1);
        let { A: i8, B: n8, C: o8, D: a8, E: f8 } = this;
        for (let t9 = 0; t9 < 80; t9++) {
          let s9, l6;
          t9 < 20 ? (s9 = F(n8, o8, a8), l6 = 1518500249) : t9 < 40 ? (s9 = n8 ^ o8 ^ a8, l6 = 1859775393) : t9 < 60 ? (s9 = D(n8, o8, a8), l6 = 2400959708) : (s9 = n8 ^ o8 ^ a8, l6 = 3395469782);
          const c7 = l(i8, 5) + s9 + f8 + l6 + A3[t9] | 0;
          f8 = a8, a8 = o8, o8 = l(n8, 30), n8 = i8, i8 = c7;
        }
        i8 = i8 + this.A | 0, n8 = n8 + this.B | 0, o8 = o8 + this.C | 0, a8 = a8 + this.D | 0, f8 = f8 + this.E | 0, this.set(i8, n8, o8, a8, f8);
      }
      roundClean() {
        c(A3);
      }
      destroy() {
        this.set(0, 0, 0, 0, 0), c(this.buffer);
      }
    };
    m2 = /* @__PURE__ */ I((() => new d2()));
    y2 = /* @__PURE__ */ Uint8Array.from([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]);
    C3 = /* @__PURE__ */ (() => Uint8Array.from(Array(16).fill(0).map(((t8, s8) => s8))))();
    U3 = /* @__PURE__ */ (() => C3.map(((t8) => (9 * t8 + 5) % 16)))();
    w3 = /* @__PURE__ */ (() => {
      const t8 = [[C3], [U3]];
      for (let s8 = 0; s8 < 4; s8++) for (let h7 of t8) h7.push(h7[s8].map(((t9) => y2[t9])));
      return t8;
    })();
    g2 = /* @__PURE__ */ (() => w3[0])();
    B2 = /* @__PURE__ */ (() => w3[1])();
    D3 = /* @__PURE__ */ [[11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8], [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7], [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9], [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6], [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]].map(((t8) => Uint8Array.from(t8)));
    b2 = /* @__PURE__ */ g2.map(((t8, s8) => t8.map(((t9) => D3[s8][t9]))));
    E3 = /* @__PURE__ */ B2.map(((t8, s8) => t8.map(((t9) => D3[s8][t9]))));
    M3 = /* @__PURE__ */ Uint32Array.from([0, 1518500249, 1859775393, 2400959708, 2840853838]);
    x3 = /* @__PURE__ */ Uint32Array.from([1352829926, 1548603684, 1836072691, 2053994217, 0]);
    _3 = /* @__PURE__ */ new Uint32Array(16);
    q3 = class extends O {
      constructor() {
        super(64, 20, 8, true), this.h0 = 1732584193, this.h1 = -271733879, this.h2 = -1732584194, this.h3 = 271733878, this.h4 = -1009589776;
      }
      get() {
        const { h0: t8, h1: s8, h2: h7, h3: i8, h4: e8 } = this;
        return [t8, s8, h7, i8, e8];
      }
      set(t8, s8, h7, i8, e8) {
        this.h0 = 0 | t8, this.h1 = 0 | s8, this.h2 = 0 | h7, this.h3 = 0 | i8, this.h4 = 0 | e8;
      }
      process(t8, s8) {
        for (let h7 = 0; h7 < 16; h7++, s8 += 4) _3[h7] = t8.getUint32(s8, true);
        let i8 = 0 | this.h0, e8 = i8, r8 = 0 | this.h1, n8 = r8, o8 = 0 | this.h2, a8 = o8, f8 = 0 | this.h3, l6 = f8, c7 = 0 | this.h4, p5 = c7;
        for (let t9 = 0; t9 < 5; t9++) {
          const s9 = 4 - t9, u8 = M3[t9], A8 = x3[t9], d6 = g2[t9], m6 = B2[t9], y8 = b2[t9], C8 = E3[t9];
          for (let s10 = 0; s10 < 16; s10++) {
            const e9 = l(i8 + j3(t9, r8, o8, f8) + _3[d6[s10]] + u8, y8[s10]) + c7 | 0;
            i8 = c7, c7 = f8, f8 = 0 | l(o8, 10), o8 = r8, r8 = e9;
          }
          for (let t10 = 0; t10 < 16; t10++) {
            const i9 = l(e8 + j3(s9, n8, a8, l6) + _3[m6[t10]] + A8, C8[t10]) + p5 | 0;
            e8 = p5, p5 = l6, l6 = 0 | l(a8, 10), a8 = n8, n8 = i9;
          }
        }
        this.set(this.h1 + o8 + l6 | 0, this.h2 + f8 + p5 | 0, this.h3 + c7 + e8 | 0, this.h4 + i8 + n8 | 0, this.h0 + r8 + a8 | 0);
      }
      roundClean() {
        c(_3);
      }
      destroy() {
        this.destroyed = true, c(this.buffer), this.set(0, 0, 0, 0, 0);
      }
    };
    v3 = m2;
    O3 = /* @__PURE__ */ I((() => new q3()));
    k3 = Array.from({ length: 64 }, ((t8, s8) => Math.floor(2 ** 32 * Math.abs(Math.sin(s8 + 1)))));
    z3 = (t8, s8, h7) => t8 & s8 ^ ~t8 & h7;
    F3 = /* @__PURE__ */ new Uint32Array([1732584193, 4023233417, 2562383102, 271733878]);
    G3 = /* @__PURE__ */ new Uint32Array(16);
    H3 = class extends O {
      constructor() {
        super(64, 16, 8, true), this.A = 0 | F3[0], this.B = 0 | F3[1], this.C = 0 | F3[2], this.D = 0 | F3[3];
      }
      get() {
        const { A: t8, B: s8, C: h7, D: i8 } = this;
        return [t8, s8, h7, i8];
      }
      set(t8, s8, h7, i8) {
        this.A = 0 | t8, this.B = 0 | s8, this.C = 0 | h7, this.D = 0 | i8;
      }
      process(t8, s8) {
        for (let h7 = 0; h7 < 16; h7++, s8 += 4) G3[h7] = t8.getUint32(s8, true);
        let { A: i8, B: e8, C: r8, D: n8 } = this;
        for (let t9 = 0; t9 < 64; t9++) {
          let s9, o8, a8;
          t9 < 16 ? (s9 = z3(e8, r8, n8), o8 = t9, a8 = [7, 12, 17, 22]) : t9 < 32 ? (s9 = z3(n8, e8, r8), o8 = (5 * t9 + 1) % 16, a8 = [5, 9, 14, 20]) : t9 < 48 ? (s9 = e8 ^ r8 ^ n8, o8 = (3 * t9 + 5) % 16, a8 = [4, 11, 16, 23]) : (s9 = r8 ^ (e8 | ~n8), o8 = 7 * t9 % 16, a8 = [6, 10, 15, 21]), s9 = s9 + i8 + k3[t9] + G3[o8], i8 = n8, n8 = r8, r8 = e8, e8 += l(s9, a8[t9 % 4]);
        }
        i8 = i8 + this.A | 0, e8 = e8 + this.B | 0, r8 = r8 + this.C | 0, n8 = n8 + this.D | 0, this.set(i8, e8, r8, n8);
      }
      roundClean() {
        G3.fill(0);
      }
      destroy() {
        this.set(0, 0, 0, 0), this.buffer.fill(0);
      }
    };
    I3 = new Map(Object.entries({ md5: /* @__PURE__ */ H((() => new H3())), sha1: v3, sha224: Xt, sha256: Nt, sha384: Mt, sha512: _t, sha3_256: Dt, sha3_512: Ot, ripemd160: O3 }));
  }
});

// node_modules/openpgp/dist/lightweight/nacl-fast.min.mjs
var nacl_fast_min_exports = {};
__export(nacl_fast_min_exports, {
  default: () => o2
});
function v4(r8, n8, o8, t8) {
  r8[n8] = o8 >> 24 & 255, r8[n8 + 1] = o8 >> 16 & 255, r8[n8 + 2] = o8 >> 8 & 255, r8[n8 + 3] = 255 & o8, r8[n8 + 4] = t8 >> 24 & 255, r8[n8 + 5] = t8 >> 16 & 255, r8[n8 + 6] = t8 >> 8 & 255, r8[n8 + 7] = 255 & t8;
}
function s2(r8, n8, o8, t8) {
  return (function(r9, n9, o9, t9, f8) {
    var e8, a8 = 0;
    for (e8 = 0; e8 < f8; e8++) a8 |= r9[n9 + e8] ^ o9[t9 + e8];
    return (1 & a8 - 1 >>> 8) - 1;
  })(r8, n8, o8, t8, 32);
}
function A4(r8, n8) {
  var o8;
  for (o8 = 0; o8 < 16; o8++) r8[o8] = 0 | n8[o8];
}
function M4(r8) {
  var n8, o8, t8 = 1;
  for (n8 = 0; n8 < 16; n8++) o8 = r8[n8] + t8 + 65535, t8 = Math.floor(o8 / 65536), r8[n8] = o8 - 65536 * t8;
  r8[0] += t8 - 1 + 37 * (t8 - 1);
}
function g3(r8, n8, o8) {
  for (var t8, f8 = ~(o8 - 1), e8 = 0; e8 < 16; e8++) t8 = f8 & (r8[e8] ^ n8[e8]), r8[e8] ^= t8, n8[e8] ^= t8;
}
function U4(r8, n8) {
  var o8, f8, e8, a8 = t2(), i8 = t2();
  for (o8 = 0; o8 < 16; o8++) i8[o8] = n8[o8];
  for (M4(i8), M4(i8), M4(i8), f8 = 0; f8 < 2; f8++) {
    for (a8[0] = i8[0] - 65517, o8 = 1; o8 < 15; o8++) a8[o8] = i8[o8] - 65535 - (a8[o8 - 1] >> 16 & 1), a8[o8 - 1] &= 65535;
    a8[15] = i8[15] - 32767 - (a8[14] >> 16 & 1), e8 = a8[15] >> 16 & 1, a8[14] &= 65535, g3(i8, a8, 1 - e8);
  }
  for (o8 = 0; o8 < 16; o8++) r8[2 * o8] = 255 & i8[o8], r8[2 * o8 + 1] = i8[o8] >> 8;
}
function d3(r8, n8) {
  var o8 = new Uint8Array(32), t8 = new Uint8Array(32);
  return U4(o8, r8), U4(t8, n8), s2(o8, 0, t8, 0);
}
function b3(r8) {
  var n8 = new Uint8Array(32);
  return U4(n8, r8), 1 & n8[0];
}
function p2(r8, n8) {
  var o8;
  for (o8 = 0; o8 < 16; o8++) r8[o8] = n8[2 * o8] + (n8[2 * o8 + 1] << 8);
  r8[15] &= 32767;
}
function K3(r8, n8, o8) {
  for (var t8 = 0; t8 < 16; t8++) r8[t8] = n8[t8] + o8[t8];
}
function E4(r8, n8, o8) {
  for (var t8 = 0; t8 < 16; t8++) r8[t8] = n8[t8] - o8[t8];
}
function k4(r8, n8, o8) {
  var t8, f8, e8 = 0, a8 = 0, i8 = 0, u8 = 0, l6 = 0, y8 = 0, c7 = 0, h7 = 0, w8 = 0, v7 = 0, s8 = 0, A8 = 0, M8 = 0, g7 = 0, U8 = 0, d6 = 0, b6 = 0, p5 = 0, K7 = 0, E8 = 0, k7 = 0, z7 = 0, P6 = 0, m6 = 0, x7 = 0, F7 = 0, R7 = 0, I8 = 0, G7 = 0, N6 = 0, S7 = 0, V6 = o8[0], j7 = o8[1], T6 = o8[2], q7 = o8[3], B7 = o8[4], C8 = o8[5], D8 = o8[6], H7 = o8[7], J6 = o8[8], L5 = o8[9], O6 = o8[10], Q6 = o8[11], W5 = o8[12], X5 = o8[13], Y5 = o8[14], Z5 = o8[15];
  e8 += (t8 = n8[0]) * V6, a8 += t8 * j7, i8 += t8 * T6, u8 += t8 * q7, l6 += t8 * B7, y8 += t8 * C8, c7 += t8 * D8, h7 += t8 * H7, w8 += t8 * J6, v7 += t8 * L5, s8 += t8 * O6, A8 += t8 * Q6, M8 += t8 * W5, g7 += t8 * X5, U8 += t8 * Y5, d6 += t8 * Z5, a8 += (t8 = n8[1]) * V6, i8 += t8 * j7, u8 += t8 * T6, l6 += t8 * q7, y8 += t8 * B7, c7 += t8 * C8, h7 += t8 * D8, w8 += t8 * H7, v7 += t8 * J6, s8 += t8 * L5, A8 += t8 * O6, M8 += t8 * Q6, g7 += t8 * W5, U8 += t8 * X5, d6 += t8 * Y5, b6 += t8 * Z5, i8 += (t8 = n8[2]) * V6, u8 += t8 * j7, l6 += t8 * T6, y8 += t8 * q7, c7 += t8 * B7, h7 += t8 * C8, w8 += t8 * D8, v7 += t8 * H7, s8 += t8 * J6, A8 += t8 * L5, M8 += t8 * O6, g7 += t8 * Q6, U8 += t8 * W5, d6 += t8 * X5, b6 += t8 * Y5, p5 += t8 * Z5, u8 += (t8 = n8[3]) * V6, l6 += t8 * j7, y8 += t8 * T6, c7 += t8 * q7, h7 += t8 * B7, w8 += t8 * C8, v7 += t8 * D8, s8 += t8 * H7, A8 += t8 * J6, M8 += t8 * L5, g7 += t8 * O6, U8 += t8 * Q6, d6 += t8 * W5, b6 += t8 * X5, p5 += t8 * Y5, K7 += t8 * Z5, l6 += (t8 = n8[4]) * V6, y8 += t8 * j7, c7 += t8 * T6, h7 += t8 * q7, w8 += t8 * B7, v7 += t8 * C8, s8 += t8 * D8, A8 += t8 * H7, M8 += t8 * J6, g7 += t8 * L5, U8 += t8 * O6, d6 += t8 * Q6, b6 += t8 * W5, p5 += t8 * X5, K7 += t8 * Y5, E8 += t8 * Z5, y8 += (t8 = n8[5]) * V6, c7 += t8 * j7, h7 += t8 * T6, w8 += t8 * q7, v7 += t8 * B7, s8 += t8 * C8, A8 += t8 * D8, M8 += t8 * H7, g7 += t8 * J6, U8 += t8 * L5, d6 += t8 * O6, b6 += t8 * Q6, p5 += t8 * W5, K7 += t8 * X5, E8 += t8 * Y5, k7 += t8 * Z5, c7 += (t8 = n8[6]) * V6, h7 += t8 * j7, w8 += t8 * T6, v7 += t8 * q7, s8 += t8 * B7, A8 += t8 * C8, M8 += t8 * D8, g7 += t8 * H7, U8 += t8 * J6, d6 += t8 * L5, b6 += t8 * O6, p5 += t8 * Q6, K7 += t8 * W5, E8 += t8 * X5, k7 += t8 * Y5, z7 += t8 * Z5, h7 += (t8 = n8[7]) * V6, w8 += t8 * j7, v7 += t8 * T6, s8 += t8 * q7, A8 += t8 * B7, M8 += t8 * C8, g7 += t8 * D8, U8 += t8 * H7, d6 += t8 * J6, b6 += t8 * L5, p5 += t8 * O6, K7 += t8 * Q6, E8 += t8 * W5, k7 += t8 * X5, z7 += t8 * Y5, P6 += t8 * Z5, w8 += (t8 = n8[8]) * V6, v7 += t8 * j7, s8 += t8 * T6, A8 += t8 * q7, M8 += t8 * B7, g7 += t8 * C8, U8 += t8 * D8, d6 += t8 * H7, b6 += t8 * J6, p5 += t8 * L5, K7 += t8 * O6, E8 += t8 * Q6, k7 += t8 * W5, z7 += t8 * X5, P6 += t8 * Y5, m6 += t8 * Z5, v7 += (t8 = n8[9]) * V6, s8 += t8 * j7, A8 += t8 * T6, M8 += t8 * q7, g7 += t8 * B7, U8 += t8 * C8, d6 += t8 * D8, b6 += t8 * H7, p5 += t8 * J6, K7 += t8 * L5, E8 += t8 * O6, k7 += t8 * Q6, z7 += t8 * W5, P6 += t8 * X5, m6 += t8 * Y5, x7 += t8 * Z5, s8 += (t8 = n8[10]) * V6, A8 += t8 * j7, M8 += t8 * T6, g7 += t8 * q7, U8 += t8 * B7, d6 += t8 * C8, b6 += t8 * D8, p5 += t8 * H7, K7 += t8 * J6, E8 += t8 * L5, k7 += t8 * O6, z7 += t8 * Q6, P6 += t8 * W5, m6 += t8 * X5, x7 += t8 * Y5, F7 += t8 * Z5, A8 += (t8 = n8[11]) * V6, M8 += t8 * j7, g7 += t8 * T6, U8 += t8 * q7, d6 += t8 * B7, b6 += t8 * C8, p5 += t8 * D8, K7 += t8 * H7, E8 += t8 * J6, k7 += t8 * L5, z7 += t8 * O6, P6 += t8 * Q6, m6 += t8 * W5, x7 += t8 * X5, F7 += t8 * Y5, R7 += t8 * Z5, M8 += (t8 = n8[12]) * V6, g7 += t8 * j7, U8 += t8 * T6, d6 += t8 * q7, b6 += t8 * B7, p5 += t8 * C8, K7 += t8 * D8, E8 += t8 * H7, k7 += t8 * J6, z7 += t8 * L5, P6 += t8 * O6, m6 += t8 * Q6, x7 += t8 * W5, F7 += t8 * X5, R7 += t8 * Y5, I8 += t8 * Z5, g7 += (t8 = n8[13]) * V6, U8 += t8 * j7, d6 += t8 * T6, b6 += t8 * q7, p5 += t8 * B7, K7 += t8 * C8, E8 += t8 * D8, k7 += t8 * H7, z7 += t8 * J6, P6 += t8 * L5, m6 += t8 * O6, x7 += t8 * Q6, F7 += t8 * W5, R7 += t8 * X5, I8 += t8 * Y5, G7 += t8 * Z5, U8 += (t8 = n8[14]) * V6, d6 += t8 * j7, b6 += t8 * T6, p5 += t8 * q7, K7 += t8 * B7, E8 += t8 * C8, k7 += t8 * D8, z7 += t8 * H7, P6 += t8 * J6, m6 += t8 * L5, x7 += t8 * O6, F7 += t8 * Q6, R7 += t8 * W5, I8 += t8 * X5, G7 += t8 * Y5, N6 += t8 * Z5, d6 += (t8 = n8[15]) * V6, a8 += 38 * (p5 += t8 * T6), i8 += 38 * (K7 += t8 * q7), u8 += 38 * (E8 += t8 * B7), l6 += 38 * (k7 += t8 * C8), y8 += 38 * (z7 += t8 * D8), c7 += 38 * (P6 += t8 * H7), h7 += 38 * (m6 += t8 * J6), w8 += 38 * (x7 += t8 * L5), v7 += 38 * (F7 += t8 * O6), s8 += 38 * (R7 += t8 * Q6), A8 += 38 * (I8 += t8 * W5), M8 += 38 * (G7 += t8 * X5), g7 += 38 * (N6 += t8 * Y5), U8 += 38 * (S7 += t8 * Z5), e8 = (t8 = (e8 += 38 * (b6 += t8 * j7)) + (f8 = 1) + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), a8 = (t8 = a8 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), i8 = (t8 = i8 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), u8 = (t8 = u8 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), l6 = (t8 = l6 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), y8 = (t8 = y8 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), c7 = (t8 = c7 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), h7 = (t8 = h7 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), w8 = (t8 = w8 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), v7 = (t8 = v7 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), s8 = (t8 = s8 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), A8 = (t8 = A8 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), M8 = (t8 = M8 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), g7 = (t8 = g7 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), U8 = (t8 = U8 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), d6 = (t8 = d6 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), e8 = (t8 = (e8 += f8 - 1 + 37 * (f8 - 1)) + (f8 = 1) + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), a8 = (t8 = a8 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), i8 = (t8 = i8 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), u8 = (t8 = u8 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), l6 = (t8 = l6 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), y8 = (t8 = y8 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), c7 = (t8 = c7 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), h7 = (t8 = h7 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), w8 = (t8 = w8 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), v7 = (t8 = v7 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), s8 = (t8 = s8 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), A8 = (t8 = A8 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), M8 = (t8 = M8 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), g7 = (t8 = g7 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), U8 = (t8 = U8 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), d6 = (t8 = d6 + f8 + 65535) - 65536 * (f8 = Math.floor(t8 / 65536)), e8 += f8 - 1 + 37 * (f8 - 1), r8[0] = e8, r8[1] = a8, r8[2] = i8, r8[3] = u8, r8[4] = l6, r8[5] = y8, r8[6] = c7, r8[7] = h7, r8[8] = w8, r8[9] = v7, r8[10] = s8, r8[11] = A8, r8[12] = M8, r8[13] = g7, r8[14] = U8, r8[15] = d6;
}
function z4(r8, n8) {
  k4(r8, n8, n8);
}
function P3(r8, n8) {
  var o8, f8 = t2();
  for (o8 = 0; o8 < 16; o8++) f8[o8] = n8[o8];
  for (o8 = 253; o8 >= 0; o8--) z4(f8, f8), 2 !== o8 && 4 !== o8 && k4(f8, f8, n8);
  for (o8 = 0; o8 < 16; o8++) r8[o8] = f8[o8];
}
function m3(r8, n8, o8) {
  var f8, e8, a8 = new Uint8Array(32), i8 = new Float64Array(80), l6 = t2(), y8 = t2(), c7 = t2(), h7 = t2(), w8 = t2(), v7 = t2();
  for (e8 = 0; e8 < 31; e8++) a8[e8] = n8[e8];
  for (a8[31] = 127 & n8[31] | 64, a8[0] &= 248, p2(i8, o8), e8 = 0; e8 < 16; e8++) y8[e8] = i8[e8], h7[e8] = l6[e8] = c7[e8] = 0;
  for (l6[0] = h7[0] = 1, e8 = 254; e8 >= 0; --e8) g3(l6, y8, f8 = a8[e8 >>> 3] >>> (7 & e8) & 1), g3(c7, h7, f8), K3(w8, l6, c7), E4(l6, l6, c7), K3(c7, y8, h7), E4(y8, y8, h7), z4(h7, w8), z4(v7, l6), k4(l6, c7, l6), k4(c7, y8, w8), K3(w8, l6, c7), E4(l6, l6, c7), z4(y8, l6), E4(c7, h7, v7), k4(l6, c7, u3), K3(l6, l6, h7), k4(c7, c7, l6), k4(l6, h7, v7), k4(h7, y8, i8), z4(y8, w8), g3(l6, y8, f8), g3(c7, h7, f8);
  for (e8 = 0; e8 < 16; e8++) i8[e8 + 16] = l6[e8], i8[e8 + 32] = c7[e8], i8[e8 + 48] = y8[e8], i8[e8 + 64] = h7[e8];
  var s8 = i8.subarray(32), A8 = i8.subarray(16);
  return P3(s8, s8), k4(A8, A8, s8), U4(r8, A8), 0;
}
function x4(r8, n8) {
  return m3(r8, n8, e2);
}
function R3(r8, n8, o8, t8) {
  for (var f8, e8, a8, i8, u8, l6, y8, c7, h7, w8, v7, s8, A8, M8, g7, U8, d6, b6, p5, K7, E8, k7, z7, P6, m6, x7, R7 = new Int32Array(16), I8 = new Int32Array(16), G7 = r8[0], N6 = r8[1], S7 = r8[2], V6 = r8[3], j7 = r8[4], T6 = r8[5], q7 = r8[6], B7 = r8[7], C8 = n8[0], D8 = n8[1], H7 = n8[2], J6 = n8[3], L5 = n8[4], O6 = n8[5], Q6 = n8[6], W5 = n8[7], X5 = 0; t8 >= 128; ) {
    for (p5 = 0; p5 < 16; p5++) K7 = 8 * p5 + X5, R7[p5] = o8[K7 + 0] << 24 | o8[K7 + 1] << 16 | o8[K7 + 2] << 8 | o8[K7 + 3], I8[p5] = o8[K7 + 4] << 24 | o8[K7 + 5] << 16 | o8[K7 + 6] << 8 | o8[K7 + 7];
    for (p5 = 0; p5 < 80; p5++) if (f8 = G7, e8 = N6, a8 = S7, i8 = V6, u8 = j7, l6 = T6, y8 = q7, B7, h7 = C8, w8 = D8, v7 = H7, s8 = J6, A8 = L5, M8 = O6, g7 = Q6, W5, z7 = 65535 & (k7 = W5), P6 = k7 >>> 16, m6 = 65535 & (E8 = B7), x7 = E8 >>> 16, z7 += 65535 & (k7 = (L5 >>> 14 | j7 << 18) ^ (L5 >>> 18 | j7 << 14) ^ (j7 >>> 9 | L5 << 23)), P6 += k7 >>> 16, m6 += 65535 & (E8 = (j7 >>> 14 | L5 << 18) ^ (j7 >>> 18 | L5 << 14) ^ (L5 >>> 9 | j7 << 23)), x7 += E8 >>> 16, z7 += 65535 & (k7 = L5 & O6 ^ ~L5 & Q6), P6 += k7 >>> 16, m6 += 65535 & (E8 = j7 & T6 ^ ~j7 & q7), x7 += E8 >>> 16, z7 += 65535 & (k7 = F4[2 * p5 + 1]), P6 += k7 >>> 16, m6 += 65535 & (E8 = F4[2 * p5]), x7 += E8 >>> 16, E8 = R7[p5 % 16], P6 += (k7 = I8[p5 % 16]) >>> 16, m6 += 65535 & E8, x7 += E8 >>> 16, m6 += (P6 += (z7 += 65535 & k7) >>> 16) >>> 16, z7 = 65535 & (k7 = b6 = 65535 & z7 | P6 << 16), P6 = k7 >>> 16, m6 = 65535 & (E8 = d6 = 65535 & m6 | (x7 += m6 >>> 16) << 16), x7 = E8 >>> 16, z7 += 65535 & (k7 = (C8 >>> 28 | G7 << 4) ^ (G7 >>> 2 | C8 << 30) ^ (G7 >>> 7 | C8 << 25)), P6 += k7 >>> 16, m6 += 65535 & (E8 = (G7 >>> 28 | C8 << 4) ^ (C8 >>> 2 | G7 << 30) ^ (C8 >>> 7 | G7 << 25)), x7 += E8 >>> 16, P6 += (k7 = C8 & D8 ^ C8 & H7 ^ D8 & H7) >>> 16, m6 += 65535 & (E8 = G7 & N6 ^ G7 & S7 ^ N6 & S7), x7 += E8 >>> 16, c7 = 65535 & (m6 += (P6 += (z7 += 65535 & k7) >>> 16) >>> 16) | (x7 += m6 >>> 16) << 16, U8 = 65535 & z7 | P6 << 16, z7 = 65535 & (k7 = s8), P6 = k7 >>> 16, m6 = 65535 & (E8 = i8), x7 = E8 >>> 16, P6 += (k7 = b6) >>> 16, m6 += 65535 & (E8 = d6), x7 += E8 >>> 16, N6 = f8, S7 = e8, V6 = a8, j7 = i8 = 65535 & (m6 += (P6 += (z7 += 65535 & k7) >>> 16) >>> 16) | (x7 += m6 >>> 16) << 16, T6 = u8, q7 = l6, B7 = y8, G7 = c7, D8 = h7, H7 = w8, J6 = v7, L5 = s8 = 65535 & z7 | P6 << 16, O6 = A8, Q6 = M8, W5 = g7, C8 = U8, p5 % 16 == 15) for (K7 = 0; K7 < 16; K7++) E8 = R7[K7], z7 = 65535 & (k7 = I8[K7]), P6 = k7 >>> 16, m6 = 65535 & E8, x7 = E8 >>> 16, E8 = R7[(K7 + 9) % 16], z7 += 65535 & (k7 = I8[(K7 + 9) % 16]), P6 += k7 >>> 16, m6 += 65535 & E8, x7 += E8 >>> 16, d6 = R7[(K7 + 1) % 16], z7 += 65535 & (k7 = ((b6 = I8[(K7 + 1) % 16]) >>> 1 | d6 << 31) ^ (b6 >>> 8 | d6 << 24) ^ (b6 >>> 7 | d6 << 25)), P6 += k7 >>> 16, m6 += 65535 & (E8 = (d6 >>> 1 | b6 << 31) ^ (d6 >>> 8 | b6 << 24) ^ d6 >>> 7), x7 += E8 >>> 16, d6 = R7[(K7 + 14) % 16], P6 += (k7 = ((b6 = I8[(K7 + 14) % 16]) >>> 19 | d6 << 13) ^ (d6 >>> 29 | b6 << 3) ^ (b6 >>> 6 | d6 << 26)) >>> 16, m6 += 65535 & (E8 = (d6 >>> 19 | b6 << 13) ^ (b6 >>> 29 | d6 << 3) ^ d6 >>> 6), x7 += E8 >>> 16, x7 += (m6 += (P6 += (z7 += 65535 & k7) >>> 16) >>> 16) >>> 16, R7[K7] = 65535 & m6 | x7 << 16, I8[K7] = 65535 & z7 | P6 << 16;
    z7 = 65535 & (k7 = C8), P6 = k7 >>> 16, m6 = 65535 & (E8 = G7), x7 = E8 >>> 16, E8 = r8[0], P6 += (k7 = n8[0]) >>> 16, m6 += 65535 & E8, x7 += E8 >>> 16, x7 += (m6 += (P6 += (z7 += 65535 & k7) >>> 16) >>> 16) >>> 16, r8[0] = G7 = 65535 & m6 | x7 << 16, n8[0] = C8 = 65535 & z7 | P6 << 16, z7 = 65535 & (k7 = D8), P6 = k7 >>> 16, m6 = 65535 & (E8 = N6), x7 = E8 >>> 16, E8 = r8[1], P6 += (k7 = n8[1]) >>> 16, m6 += 65535 & E8, x7 += E8 >>> 16, x7 += (m6 += (P6 += (z7 += 65535 & k7) >>> 16) >>> 16) >>> 16, r8[1] = N6 = 65535 & m6 | x7 << 16, n8[1] = D8 = 65535 & z7 | P6 << 16, z7 = 65535 & (k7 = H7), P6 = k7 >>> 16, m6 = 65535 & (E8 = S7), x7 = E8 >>> 16, E8 = r8[2], P6 += (k7 = n8[2]) >>> 16, m6 += 65535 & E8, x7 += E8 >>> 16, x7 += (m6 += (P6 += (z7 += 65535 & k7) >>> 16) >>> 16) >>> 16, r8[2] = S7 = 65535 & m6 | x7 << 16, n8[2] = H7 = 65535 & z7 | P6 << 16, z7 = 65535 & (k7 = J6), P6 = k7 >>> 16, m6 = 65535 & (E8 = V6), x7 = E8 >>> 16, E8 = r8[3], P6 += (k7 = n8[3]) >>> 16, m6 += 65535 & E8, x7 += E8 >>> 16, x7 += (m6 += (P6 += (z7 += 65535 & k7) >>> 16) >>> 16) >>> 16, r8[3] = V6 = 65535 & m6 | x7 << 16, n8[3] = J6 = 65535 & z7 | P6 << 16, z7 = 65535 & (k7 = L5), P6 = k7 >>> 16, m6 = 65535 & (E8 = j7), x7 = E8 >>> 16, E8 = r8[4], P6 += (k7 = n8[4]) >>> 16, m6 += 65535 & E8, x7 += E8 >>> 16, x7 += (m6 += (P6 += (z7 += 65535 & k7) >>> 16) >>> 16) >>> 16, r8[4] = j7 = 65535 & m6 | x7 << 16, n8[4] = L5 = 65535 & z7 | P6 << 16, z7 = 65535 & (k7 = O6), P6 = k7 >>> 16, m6 = 65535 & (E8 = T6), x7 = E8 >>> 16, E8 = r8[5], P6 += (k7 = n8[5]) >>> 16, m6 += 65535 & E8, x7 += E8 >>> 16, x7 += (m6 += (P6 += (z7 += 65535 & k7) >>> 16) >>> 16) >>> 16, r8[5] = T6 = 65535 & m6 | x7 << 16, n8[5] = O6 = 65535 & z7 | P6 << 16, z7 = 65535 & (k7 = Q6), P6 = k7 >>> 16, m6 = 65535 & (E8 = q7), x7 = E8 >>> 16, E8 = r8[6], P6 += (k7 = n8[6]) >>> 16, m6 += 65535 & E8, x7 += E8 >>> 16, x7 += (m6 += (P6 += (z7 += 65535 & k7) >>> 16) >>> 16) >>> 16, r8[6] = q7 = 65535 & m6 | x7 << 16, n8[6] = Q6 = 65535 & z7 | P6 << 16, z7 = 65535 & (k7 = W5), P6 = k7 >>> 16, m6 = 65535 & (E8 = B7), x7 = E8 >>> 16, E8 = r8[7], P6 += (k7 = n8[7]) >>> 16, m6 += 65535 & E8, x7 += E8 >>> 16, x7 += (m6 += (P6 += (z7 += 65535 & k7) >>> 16) >>> 16) >>> 16, r8[7] = B7 = 65535 & m6 | x7 << 16, n8[7] = W5 = 65535 & z7 | P6 << 16, X5 += 128, t8 -= 128;
  }
  return t8;
}
function I4(r8, n8, o8) {
  var t8, f8 = new Int32Array(8), e8 = new Int32Array(8), a8 = new Uint8Array(256), i8 = o8;
  for (f8[0] = 1779033703, f8[1] = 3144134277, f8[2] = 1013904242, f8[3] = 2773480762, f8[4] = 1359893119, f8[5] = 2600822924, f8[6] = 528734635, f8[7] = 1541459225, e8[0] = 4089235720, e8[1] = 2227873595, e8[2] = 4271175723, e8[3] = 1595750129, e8[4] = 2917565137, e8[5] = 725511199, e8[6] = 4215389547, e8[7] = 327033209, R3(f8, e8, n8, o8), o8 %= 128, t8 = 0; t8 < o8; t8++) a8[t8] = n8[i8 - o8 + t8];
  for (a8[o8] = 128, a8[(o8 = 256 - 128 * (o8 < 112 ? 1 : 0)) - 9] = 0, v4(a8, o8 - 8, i8 / 536870912 | 0, i8 << 3), R3(f8, e8, a8, o8), t8 = 0; t8 < 8; t8++) v4(r8, 8 * t8, f8[t8], e8[t8]);
  return 0;
}
function G4(r8, n8) {
  var o8 = t2(), f8 = t2(), e8 = t2(), a8 = t2(), i8 = t2(), u8 = t2(), l6 = t2(), c7 = t2(), h7 = t2();
  E4(o8, r8[1], r8[0]), E4(h7, n8[1], n8[0]), k4(o8, o8, h7), K3(f8, r8[0], r8[1]), K3(h7, n8[0], n8[1]), k4(f8, f8, h7), k4(e8, r8[3], n8[3]), k4(e8, e8, y3), k4(a8, r8[2], n8[2]), K3(a8, a8, a8), E4(i8, f8, o8), E4(u8, a8, e8), K3(l6, a8, e8), K3(c7, f8, o8), k4(r8[0], i8, u8), k4(r8[1], c7, l6), k4(r8[2], l6, u8), k4(r8[3], i8, c7);
}
function N3(r8, n8, o8) {
  var t8;
  for (t8 = 0; t8 < 4; t8++) g3(r8[t8], n8[t8], o8);
}
function S3(r8, n8) {
  var o8 = t2(), f8 = t2(), e8 = t2();
  P3(e8, n8[2]), k4(o8, n8[0], e8), k4(f8, n8[1], e8), U4(r8, f8), r8[31] ^= b3(o8) << 7;
}
function V3(r8, n8, o8) {
  var t8, f8;
  for (A4(r8[0], a2), A4(r8[1], i2), A4(r8[2], i2), A4(r8[3], a2), f8 = 255; f8 >= 0; --f8) N3(r8, n8, t8 = o8[f8 / 8 | 0] >> (7 & f8) & 1), G4(n8, r8), G4(r8, r8), N3(r8, n8, t8);
}
function j4(r8, n8) {
  var o8 = [t2(), t2(), t2(), t2()];
  A4(o8[0], c2), A4(o8[1], h2), A4(o8[2], i2), k4(o8[3], c2, h2), V3(r8, o8, n8);
}
function T3(r8, n8, o8) {
  var e8, a8 = new Uint8Array(64), i8 = [t2(), t2(), t2(), t2()];
  for (o8 || f2(n8, 32), I4(a8, n8, 32), a8[0] &= 248, a8[31] &= 127, a8[31] |= 64, j4(i8, a8), S3(r8, i8), e8 = 0; e8 < 32; e8++) n8[e8 + 32] = r8[e8];
  return 0;
}
function B3(r8, n8) {
  var o8, t8, f8, e8;
  for (t8 = 63; t8 >= 32; --t8) {
    for (o8 = 0, f8 = t8 - 32, e8 = t8 - 12; f8 < e8; ++f8) n8[f8] += o8 - 16 * n8[t8] * q4[f8 - (t8 - 32)], o8 = Math.floor((n8[f8] + 128) / 256), n8[f8] -= 256 * o8;
    n8[f8] += o8, n8[t8] = 0;
  }
  for (o8 = 0, f8 = 0; f8 < 32; f8++) n8[f8] += o8 - (n8[31] >> 4) * q4[f8], o8 = n8[f8] >> 8, n8[f8] &= 255;
  for (f8 = 0; f8 < 32; f8++) n8[f8] -= o8 * q4[f8];
  for (t8 = 0; t8 < 32; t8++) n8[t8 + 1] += n8[t8] >> 8, r8[t8] = 255 & n8[t8];
}
function C4(r8) {
  var n8, o8 = new Float64Array(64);
  for (n8 = 0; n8 < 64; n8++) o8[n8] = r8[n8];
  for (n8 = 0; n8 < 64; n8++) r8[n8] = 0;
  B3(r8, o8);
}
function D4(r8, n8) {
  var o8 = t2(), f8 = t2(), e8 = t2(), u8 = t2(), y8 = t2(), c7 = t2(), h7 = t2();
  return A4(r8[2], i2), p2(r8[1], n8), z4(e8, r8[1]), k4(u8, e8, l2), E4(e8, e8, r8[2]), K3(u8, r8[2], u8), z4(y8, u8), z4(c7, y8), k4(h7, c7, y8), k4(o8, h7, e8), k4(o8, o8, u8), (function(r9, n9) {
    var o9, f9 = t2();
    for (o9 = 0; o9 < 16; o9++) f9[o9] = n9[o9];
    for (o9 = 250; o9 >= 0; o9--) z4(f9, f9), 1 !== o9 && k4(f9, f9, n9);
    for (o9 = 0; o9 < 16; o9++) r9[o9] = f9[o9];
  })(o8, o8), k4(o8, o8, e8), k4(o8, o8, u8), k4(o8, o8, u8), k4(r8[0], o8, u8), z4(f8, r8[0]), k4(f8, f8, u8), d3(f8, e8) && k4(r8[0], r8[0], w4), z4(f8, r8[0]), k4(f8, f8, u8), d3(f8, e8) ? -1 : (b3(r8[0]) === n8[31] >> 7 && E4(r8[0], a2, r8[0]), k4(r8[3], r8[0], r8[1]), 0);
}
function J3() {
  for (var r8 = 0; r8 < arguments.length; r8++) if (!(arguments[r8] instanceof Uint8Array)) throw new TypeError("unexpected type, use Uint8Array");
}
var r2, n2, o2, t2, f2, e2, a2, i2, u3, l2, y3, c2, h2, w4, F4, q4, H4;
var init_nacl_fast_min = __esm({
  "node_modules/openpgp/dist/lightweight/nacl-fast.min.mjs"() {
    r2 = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    n2 = "object" == typeof r2 && "crypto" in r2 ? r2.crypto : void 0;
    o2 = {};
    t2 = function(r8) {
      var n8, o8 = new Float64Array(16);
      if (r8) for (n8 = 0; n8 < r8.length; n8++) o8[n8] = r8[n8];
      return o8;
    };
    f2 = function() {
      throw Error("no PRNG");
    };
    e2 = new Uint8Array(32);
    e2[0] = 9;
    a2 = t2();
    i2 = t2([1]);
    u3 = t2([56129, 1]);
    l2 = t2([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]);
    y3 = t2([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]);
    c2 = t2([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]);
    h2 = t2([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]);
    w4 = t2([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);
    F4 = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];
    q4 = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);
    H4 = 64;
    o2.scalarMult = function(r8, n8) {
      if (J3(r8, n8), 32 !== r8.length) throw Error("bad n size");
      if (32 !== n8.length) throw Error("bad p size");
      var o8 = new Uint8Array(32);
      return m3(o8, r8, n8), o8;
    }, o2.box = {}, o2.box.keyPair = function() {
      var r8, n8, o8 = new Uint8Array(32), t8 = new Uint8Array(32);
      return r8 = o8, f2(n8 = t8, 32), x4(r8, n8), { publicKey: o8, secretKey: t8 };
    }, o2.box.keyPair.fromSecretKey = function(r8) {
      if (J3(r8), 32 !== r8.length) throw Error("bad secret key size");
      var n8 = new Uint8Array(32);
      return x4(n8, r8), { publicKey: n8, secretKey: new Uint8Array(r8) };
    }, o2.sign = function(r8, n8) {
      if (J3(r8, n8), 64 !== n8.length) throw Error("bad secret key size");
      var o8 = new Uint8Array(H4 + r8.length);
      return (function(r9, n9, o9, f8) {
        var e8, a8, i8 = new Uint8Array(64), u8 = new Uint8Array(64), l6 = new Uint8Array(64), y8 = new Float64Array(64), c7 = [t2(), t2(), t2(), t2()];
        I4(i8, f8, 32), i8[0] &= 248, i8[31] &= 127, i8[31] |= 64;
        var h7 = o9 + 64;
        for (e8 = 0; e8 < o9; e8++) r9[64 + e8] = n9[e8];
        for (e8 = 0; e8 < 32; e8++) r9[32 + e8] = i8[32 + e8];
        for (I4(l6, r9.subarray(32), o9 + 32), C4(l6), j4(c7, l6), S3(r9, c7), e8 = 32; e8 < 64; e8++) r9[e8] = f8[e8];
        for (I4(u8, r9, o9 + 64), C4(u8), e8 = 0; e8 < 64; e8++) y8[e8] = 0;
        for (e8 = 0; e8 < 32; e8++) y8[e8] = l6[e8];
        for (e8 = 0; e8 < 32; e8++) for (a8 = 0; a8 < 32; a8++) y8[e8 + a8] += u8[e8] * i8[a8];
        B3(r9.subarray(32), y8);
      })(o8, r8, r8.length, n8), o8;
    }, o2.sign.detached = function(r8, n8) {
      for (var t8 = o2.sign(r8, n8), f8 = new Uint8Array(H4), e8 = 0; e8 < f8.length; e8++) f8[e8] = t8[e8];
      return f8;
    }, o2.sign.detached.verify = function(r8, n8, o8) {
      if (J3(r8, n8, o8), n8.length !== H4) throw Error("bad signature size");
      if (32 !== o8.length) throw Error("bad public key size");
      var f8, e8 = new Uint8Array(H4 + r8.length), a8 = new Uint8Array(H4 + r8.length);
      for (f8 = 0; f8 < H4; f8++) e8[f8] = n8[f8];
      for (f8 = 0; f8 < r8.length; f8++) e8[f8 + H4] = r8[f8];
      return (function(r9, n9, o9, f9) {
        var e9, a9 = new Uint8Array(32), i8 = new Uint8Array(64), u8 = [t2(), t2(), t2(), t2()], l6 = [t2(), t2(), t2(), t2()];
        if (o9 < 64) return -1;
        if (D4(l6, f9)) return -1;
        for (e9 = 0; e9 < o9; e9++) r9[e9] = n9[e9];
        for (e9 = 0; e9 < 32; e9++) r9[e9 + 32] = f9[e9];
        if (I4(i8, r9, o9), C4(i8), V3(u8, l6, i8), j4(l6, n9.subarray(32)), G4(u8, l6), S3(a9, u8), o9 -= 64, s2(n9, 0, a9, 0)) {
          for (e9 = 0; e9 < o9; e9++) r9[e9] = 0;
          return -1;
        }
        for (e9 = 0; e9 < o9; e9++) r9[e9] = n9[e9 + 64];
        return o9;
      })(a8, e8, e8.length, o8) >= 0;
    }, o2.sign.keyPair = function() {
      var r8 = new Uint8Array(32), n8 = new Uint8Array(64);
      return T3(r8, n8), { publicKey: r8, secretKey: n8 };
    }, o2.sign.keyPair.fromSecretKey = function(r8) {
      if (J3(r8), 64 !== r8.length) throw Error("bad secret key size");
      for (var n8 = new Uint8Array(32), o8 = 0; o8 < n8.length; o8++) n8[o8] = r8[32 + o8];
      return { publicKey: n8, secretKey: new Uint8Array(r8) };
    }, o2.sign.keyPair.fromSeed = function(r8) {
      if (J3(r8), 32 !== r8.length) throw Error("bad seed size");
      for (var n8 = new Uint8Array(32), o8 = new Uint8Array(64), t8 = 0; t8 < 32; t8++) o8[t8] = r8[t8];
      return T3(n8, o8, true), { publicKey: n8, secretKey: o8 };
    }, o2.setPRNG = function(r8) {
      f2 = r8;
    }, (function() {
      if (n2 && n2.getRandomValues) {
        o2.setPRNG((function(r8, o8) {
          var t8, f8 = new Uint8Array(o8);
          for (t8 = 0; t8 < o8; t8 += 65536) n2.getRandomValues(f8.subarray(t8, t8 + Math.min(o8 - t8, 65536)));
          for (t8 = 0; t8 < o8; t8++) r8[t8] = f8[t8];
          !(function(r9) {
            for (var n8 = 0; n8 < r9.length; n8++) r9[n8] = 0;
          })(f8);
        }));
      }
    })();
  }
});

// node_modules/openpgp/dist/lightweight/legacy_ciphers.min.mjs
var legacy_ciphers_min_exports = {};
__export(legacy_ciphers_min_exports, {
  legacyCiphers: () => y4
});
function t3(t8, i8, e8, n8, s8, o8) {
  const r8 = [16843776, 0, 65536, 16843780, 16842756, 66564, 4, 65536, 1024, 16843776, 16843780, 1024, 16778244, 16842756, 16777216, 4, 1028, 16778240, 16778240, 66560, 66560, 16842752, 16842752, 16778244, 65540, 16777220, 16777220, 65540, 0, 1028, 66564, 16777216, 65536, 16843780, 4, 16842752, 16843776, 16777216, 16777216, 1024, 16842756, 65536, 66560, 16777220, 1024, 4, 16778244, 66564, 16843780, 65540, 16842752, 16778244, 16777220, 1028, 66564, 16843776, 1028, 16778240, 16778240, 0, 65540, 66560, 0, 16842756], h7 = [-2146402272, -2147450880, 32768, 1081376, 1048576, 32, -2146435040, -2147450848, -2147483616, -2146402272, -2146402304, -2147483648, -2147450880, 1048576, 32, -2146435040, 1081344, 1048608, -2147450848, 0, -2147483648, 32768, 1081376, -2146435072, 1048608, -2147483616, 0, 1081344, 32800, -2146402304, -2146435072, 32800, 0, 1081376, -2146435040, 1048576, -2147450848, -2146435072, -2146402304, 32768, -2146435072, -2147450880, 32, -2146402272, 1081376, 32, 32768, -2147483648, 32800, -2146402304, 1048576, -2147483616, 1048608, -2147450848, -2147483616, 1048608, 1081344, 0, -2147450880, 32800, -2147483648, -2146435040, -2146402272, 1081344], c7 = [520, 134349312, 0, 134348808, 134218240, 0, 131592, 134218240, 131080, 134217736, 134217736, 131072, 134349320, 131080, 134348800, 520, 134217728, 8, 134349312, 512, 131584, 134348800, 134348808, 131592, 134218248, 131584, 131072, 134218248, 8, 134349320, 512, 134217728, 134349312, 134217728, 131080, 520, 131072, 134349312, 134218240, 0, 512, 131080, 134349320, 134218240, 134217736, 512, 0, 134348808, 134218248, 131072, 134217728, 134349320, 8, 131592, 131584, 134217736, 134348800, 134218248, 520, 134348800, 131592, 8, 134348808, 131584], a8 = [8396801, 8321, 8321, 128, 8396928, 8388737, 8388609, 8193, 0, 8396800, 8396800, 8396929, 129, 0, 8388736, 8388609, 1, 8192, 8388608, 8396801, 128, 8388608, 8193, 8320, 8388737, 1, 8320, 8388736, 8192, 8396928, 8396929, 129, 8388736, 8388609, 8396800, 8396929, 129, 0, 0, 8396800, 8320, 8388736, 8388737, 1, 8396801, 8321, 8321, 128, 8396929, 129, 1, 8192, 8388609, 8193, 8396928, 8388737, 8193, 8320, 8388608, 8396801, 128, 8388608, 8192, 8396928], f8 = [256, 34078976, 34078720, 1107296512, 524288, 256, 1073741824, 34078720, 1074266368, 524288, 33554688, 1074266368, 1107296512, 1107820544, 524544, 1073741824, 33554432, 1074266112, 1074266112, 0, 1073742080, 1107820800, 1107820800, 33554688, 1107820544, 1073742080, 0, 1107296256, 34078976, 33554432, 1107296256, 524544, 524288, 1107296512, 256, 33554432, 1073741824, 34078720, 1107296512, 1074266368, 33554688, 1073741824, 1107820544, 34078976, 1074266368, 256, 33554432, 1107820544, 1107820800, 524544, 1107296256, 1107820800, 34078720, 0, 1074266112, 1107296256, 524544, 33554688, 1073742080, 524288, 0, 1074266112, 34078976, 1073742080], l6 = [536870928, 541065216, 16384, 541081616, 541065216, 16, 541081616, 4194304, 536887296, 4210704, 4194304, 536870928, 4194320, 536887296, 536870912, 16400, 0, 4194320, 536887312, 16384, 4210688, 536887312, 16, 541065232, 541065232, 0, 4210704, 541081600, 16400, 4210688, 541081600, 536870912, 536887296, 16, 541065232, 4210688, 541081616, 4194304, 16400, 536870928, 4194304, 536887296, 536870912, 16400, 536870928, 541081616, 4210688, 541065216, 4210704, 541081600, 0, 541065232, 16, 16384, 541065216, 4210704, 16384, 4194320, 536887312, 0, 541081600, 536870912, 4194320, 536887312], u8 = [2097152, 69206018, 67110914, 0, 2048, 67110914, 2099202, 69208064, 69208066, 2097152, 0, 67108866, 2, 67108864, 69206018, 2050, 67110912, 2099202, 2097154, 67110912, 67108866, 69206016, 69208064, 2097154, 69206016, 2048, 2050, 69208066, 2099200, 2, 67108864, 2099200, 67108864, 2099200, 2097152, 67110914, 67110914, 69206018, 69206018, 2, 2097154, 67108864, 67110912, 2097152, 69208064, 2050, 2099202, 69208064, 2050, 67108866, 69208066, 69206016, 2099200, 0, 2, 69208066, 0, 2099202, 69206016, 2048, 67108866, 67110912, 2048, 2097154], y8 = [268439616, 4096, 262144, 268701760, 268435456, 268439616, 64, 268435456, 262208, 268697600, 268701760, 266240, 268701696, 266304, 4096, 64, 268697600, 268435520, 268439552, 4160, 266240, 262208, 268697664, 268701696, 4160, 0, 0, 268697664, 268435520, 268439552, 266304, 262144, 266304, 262144, 268701696, 4096, 64, 268697664, 4096, 266304, 268439552, 64, 268435520, 268697600, 268697664, 268435456, 262144, 268439616, 0, 268701760, 262208, 268435520, 268697600, 268439552, 268439616, 0, 268701760, 266240, 266240, 4160, 4160, 262208, 268435456, 268701696];
  let p5, k7, g7, m6, S7, b6, z7, d6, w8, A8, B7 = 0, N6 = i8.length;
  const _6 = 32 === t8.length ? 3 : 9;
  d6 = 3 === _6 ? e8 ? [0, 32, 2] : [30, -2, -2] : e8 ? [0, 32, 2, 62, 30, -2, 64, 96, 2] : [94, 62, -2, 32, 64, 2, 30, -2, -2], e8 && (i8 = (function(t9) {
    const i9 = 8 - t9.length % 8;
    let e9;
    if (!(i9 < 8)) {
      if (8 === i9) return t9;
      throw Error("des: invalid padding");
    }
    e9 = 0;
    const n9 = new Uint8Array(t9.length + i9);
    for (let i10 = 0; i10 < t9.length; i10++) n9[i10] = t9[i10];
    for (let s9 = 0; s9 < i9; s9++) n9[t9.length + s9] = e9;
    return n9;
  })(i8), N6 = i8.length);
  let x7 = new Uint8Array(N6), E8 = 0;
  for (; B7 < N6; ) {
    for (b6 = i8[B7++] << 24 | i8[B7++] << 16 | i8[B7++] << 8 | i8[B7++], z7 = i8[B7++] << 24 | i8[B7++] << 16 | i8[B7++] << 8 | i8[B7++], g7 = 252645135 & (b6 >>> 4 ^ z7), z7 ^= g7, b6 ^= g7 << 4, g7 = 65535 & (b6 >>> 16 ^ z7), z7 ^= g7, b6 ^= g7 << 16, g7 = 858993459 & (z7 >>> 2 ^ b6), b6 ^= g7, z7 ^= g7 << 2, g7 = 16711935 & (z7 >>> 8 ^ b6), b6 ^= g7, z7 ^= g7 << 8, g7 = 1431655765 & (b6 >>> 1 ^ z7), z7 ^= g7, b6 ^= g7 << 1, b6 = b6 << 1 | b6 >>> 31, z7 = z7 << 1 | z7 >>> 31, k7 = 0; k7 < _6; k7 += 3) {
      for (w8 = d6[k7 + 1], A8 = d6[k7 + 2], p5 = d6[k7]; p5 !== w8; p5 += A8) m6 = z7 ^ t8[p5], S7 = (z7 >>> 4 | z7 << 28) ^ t8[p5 + 1], g7 = b6, b6 = z7, z7 = g7 ^ (h7[m6 >>> 24 & 63] | a8[m6 >>> 16 & 63] | l6[m6 >>> 8 & 63] | y8[63 & m6] | r8[S7 >>> 24 & 63] | c7[S7 >>> 16 & 63] | f8[S7 >>> 8 & 63] | u8[63 & S7]);
      g7 = b6, b6 = z7, z7 = g7;
    }
    b6 = b6 >>> 1 | b6 << 31, z7 = z7 >>> 1 | z7 << 31, g7 = 1431655765 & (b6 >>> 1 ^ z7), z7 ^= g7, b6 ^= g7 << 1, g7 = 16711935 & (z7 >>> 8 ^ b6), b6 ^= g7, z7 ^= g7 << 8, g7 = 858993459 & (z7 >>> 2 ^ b6), b6 ^= g7, z7 ^= g7 << 2, g7 = 65535 & (b6 >>> 16 ^ z7), z7 ^= g7, b6 ^= g7 << 16, g7 = 252645135 & (b6 >>> 4 ^ z7), z7 ^= g7, b6 ^= g7 << 4, x7[E8++] = b6 >>> 24, x7[E8++] = b6 >>> 16 & 255, x7[E8++] = b6 >>> 8 & 255, x7[E8++] = 255 & b6, x7[E8++] = z7 >>> 24, x7[E8++] = z7 >>> 16 & 255, x7[E8++] = z7 >>> 8 & 255, x7[E8++] = 255 & z7;
  }
  return e8 || (x7 = (function(t9) {
    let i9, e9 = null;
    if (i9 = 0, !e9) {
      for (e9 = 1; t9[t9.length - e9] === i9; ) e9++;
      e9--;
    }
    return t9.subarray(0, t9.length - e9);
  })(x7)), x7;
}
function i3(t8) {
  const i8 = [0, 4, 536870912, 536870916, 65536, 65540, 536936448, 536936452, 512, 516, 536871424, 536871428, 66048, 66052, 536936960, 536936964], e8 = [0, 1, 1048576, 1048577, 67108864, 67108865, 68157440, 68157441, 256, 257, 1048832, 1048833, 67109120, 67109121, 68157696, 68157697], n8 = [0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272, 0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272], s8 = [0, 2097152, 134217728, 136314880, 8192, 2105344, 134225920, 136323072, 131072, 2228224, 134348800, 136445952, 139264, 2236416, 134356992, 136454144], o8 = [0, 262144, 16, 262160, 0, 262144, 16, 262160, 4096, 266240, 4112, 266256, 4096, 266240, 4112, 266256], r8 = [0, 1024, 32, 1056, 0, 1024, 32, 1056, 33554432, 33555456, 33554464, 33555488, 33554432, 33555456, 33554464, 33555488], h7 = [0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746, 0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746], c7 = [0, 65536, 2048, 67584, 536870912, 536936448, 536872960, 536938496, 131072, 196608, 133120, 198656, 537001984, 537067520, 537004032, 537069568], a8 = [0, 262144, 0, 262144, 2, 262146, 2, 262146, 33554432, 33816576, 33554432, 33816576, 33554434, 33816578, 33554434, 33816578], f8 = [0, 268435456, 8, 268435464, 0, 268435456, 8, 268435464, 1024, 268436480, 1032, 268436488, 1024, 268436480, 1032, 268436488], l6 = [0, 32, 0, 32, 1048576, 1048608, 1048576, 1048608, 8192, 8224, 8192, 8224, 1056768, 1056800, 1056768, 1056800], u8 = [0, 16777216, 512, 16777728, 2097152, 18874368, 2097664, 18874880, 67108864, 83886080, 67109376, 83886592, 69206016, 85983232, 69206528, 85983744], y8 = [0, 4096, 134217728, 134221824, 524288, 528384, 134742016, 134746112, 16, 4112, 134217744, 134221840, 524304, 528400, 134742032, 134746128], p5 = [0, 4, 256, 260, 0, 4, 256, 260, 1, 5, 257, 261, 1, 5, 257, 261], k7 = t8.length > 8 ? 3 : 1, g7 = Array(32 * k7), m6 = [0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0];
  let S7, b6, z7, d6 = 0, w8 = 0;
  for (let A8 = 0; A8 < k7; A8++) {
    let k8 = t8[d6++] << 24 | t8[d6++] << 16 | t8[d6++] << 8 | t8[d6++], A9 = t8[d6++] << 24 | t8[d6++] << 16 | t8[d6++] << 8 | t8[d6++];
    z7 = 252645135 & (k8 >>> 4 ^ A9), A9 ^= z7, k8 ^= z7 << 4, z7 = 65535 & (A9 >>> -16 ^ k8), k8 ^= z7, A9 ^= z7 << -16, z7 = 858993459 & (k8 >>> 2 ^ A9), A9 ^= z7, k8 ^= z7 << 2, z7 = 65535 & (A9 >>> -16 ^ k8), k8 ^= z7, A9 ^= z7 << -16, z7 = 1431655765 & (k8 >>> 1 ^ A9), A9 ^= z7, k8 ^= z7 << 1, z7 = 16711935 & (A9 >>> 8 ^ k8), k8 ^= z7, A9 ^= z7 << 8, z7 = 1431655765 & (k8 >>> 1 ^ A9), A9 ^= z7, k8 ^= z7 << 1, z7 = k8 << 8 | A9 >>> 20 & 240, k8 = A9 << 24 | A9 << 8 & 16711680 | A9 >>> 8 & 65280 | A9 >>> 24 & 240, A9 = z7;
    for (let t9 = 0; t9 < 16; t9++) m6[t9] ? (k8 = k8 << 2 | k8 >>> 26, A9 = A9 << 2 | A9 >>> 26) : (k8 = k8 << 1 | k8 >>> 27, A9 = A9 << 1 | A9 >>> 27), k8 &= -15, A9 &= -15, S7 = i8[k8 >>> 28] | e8[k8 >>> 24 & 15] | n8[k8 >>> 20 & 15] | s8[k8 >>> 16 & 15] | o8[k8 >>> 12 & 15] | r8[k8 >>> 8 & 15] | h7[k8 >>> 4 & 15], b6 = c7[A9 >>> 28] | a8[A9 >>> 24 & 15] | f8[A9 >>> 20 & 15] | l6[A9 >>> 16 & 15] | u8[A9 >>> 12 & 15] | y8[A9 >>> 8 & 15] | p5[A9 >>> 4 & 15], z7 = 65535 & (b6 >>> 16 ^ S7), g7[w8++] = S7 ^ z7, g7[w8++] = b6 ^ z7 << 16;
  }
  return g7;
}
function e3(e8) {
  this.key = [];
  for (let t8 = 0; t8 < 3; t8++) this.key.push(new Uint8Array(e8.subarray(8 * t8, 8 * t8 + 8)));
  this.encrypt = function(e9) {
    return t3(i3(this.key[2]), t3(i3(this.key[1]), t3(i3(this.key[0]), e9, true), false), true);
  };
}
function n3() {
  this.BlockSize = 8, this.KeySize = 16, this.setKey = function(t9) {
    if (this.masking = Array(16), this.rotate = Array(16), this.reset(), t9.length !== this.KeySize) throw Error("CAST-128: keys must be 16 bytes");
    return this.keySchedule(t9), true;
  }, this.reset = function() {
    for (let t9 = 0; t9 < 16; t9++) this.masking[t9] = 0, this.rotate[t9] = 0;
  }, this.getBlockSize = function() {
    return this.BlockSize;
  }, this.encrypt = function(t9) {
    const i9 = Array(t9.length);
    for (let o9 = 0; o9 < t9.length; o9 += 8) {
      let r8, h7 = t9[o9] << 24 | t9[o9 + 1] << 16 | t9[o9 + 2] << 8 | t9[o9 + 3], c7 = t9[o9 + 4] << 24 | t9[o9 + 5] << 16 | t9[o9 + 6] << 8 | t9[o9 + 7];
      r8 = c7, c7 = h7 ^ e8(c7, this.masking[0], this.rotate[0]), h7 = r8, r8 = c7, c7 = h7 ^ n8(c7, this.masking[1], this.rotate[1]), h7 = r8, r8 = c7, c7 = h7 ^ s8(c7, this.masking[2], this.rotate[2]), h7 = r8, r8 = c7, c7 = h7 ^ e8(c7, this.masking[3], this.rotate[3]), h7 = r8, r8 = c7, c7 = h7 ^ n8(c7, this.masking[4], this.rotate[4]), h7 = r8, r8 = c7, c7 = h7 ^ s8(c7, this.masking[5], this.rotate[5]), h7 = r8, r8 = c7, c7 = h7 ^ e8(c7, this.masking[6], this.rotate[6]), h7 = r8, r8 = c7, c7 = h7 ^ n8(c7, this.masking[7], this.rotate[7]), h7 = r8, r8 = c7, c7 = h7 ^ s8(c7, this.masking[8], this.rotate[8]), h7 = r8, r8 = c7, c7 = h7 ^ e8(c7, this.masking[9], this.rotate[9]), h7 = r8, r8 = c7, c7 = h7 ^ n8(c7, this.masking[10], this.rotate[10]), h7 = r8, r8 = c7, c7 = h7 ^ s8(c7, this.masking[11], this.rotate[11]), h7 = r8, r8 = c7, c7 = h7 ^ e8(c7, this.masking[12], this.rotate[12]), h7 = r8, r8 = c7, c7 = h7 ^ n8(c7, this.masking[13], this.rotate[13]), h7 = r8, r8 = c7, c7 = h7 ^ s8(c7, this.masking[14], this.rotate[14]), h7 = r8, r8 = c7, c7 = h7 ^ e8(c7, this.masking[15], this.rotate[15]), h7 = r8, i9[o9] = c7 >>> 24 & 255, i9[o9 + 1] = c7 >>> 16 & 255, i9[o9 + 2] = c7 >>> 8 & 255, i9[o9 + 3] = 255 & c7, i9[o9 + 4] = h7 >>> 24 & 255, i9[o9 + 5] = h7 >>> 16 & 255, i9[o9 + 6] = h7 >>> 8 & 255, i9[o9 + 7] = 255 & h7;
    }
    return i9;
  }, this.decrypt = function(t9) {
    const i9 = Array(t9.length);
    for (let o9 = 0; o9 < t9.length; o9 += 8) {
      let r8, h7 = t9[o9] << 24 | t9[o9 + 1] << 16 | t9[o9 + 2] << 8 | t9[o9 + 3], c7 = t9[o9 + 4] << 24 | t9[o9 + 5] << 16 | t9[o9 + 6] << 8 | t9[o9 + 7];
      r8 = c7, c7 = h7 ^ e8(c7, this.masking[15], this.rotate[15]), h7 = r8, r8 = c7, c7 = h7 ^ s8(c7, this.masking[14], this.rotate[14]), h7 = r8, r8 = c7, c7 = h7 ^ n8(c7, this.masking[13], this.rotate[13]), h7 = r8, r8 = c7, c7 = h7 ^ e8(c7, this.masking[12], this.rotate[12]), h7 = r8, r8 = c7, c7 = h7 ^ s8(c7, this.masking[11], this.rotate[11]), h7 = r8, r8 = c7, c7 = h7 ^ n8(c7, this.masking[10], this.rotate[10]), h7 = r8, r8 = c7, c7 = h7 ^ e8(c7, this.masking[9], this.rotate[9]), h7 = r8, r8 = c7, c7 = h7 ^ s8(c7, this.masking[8], this.rotate[8]), h7 = r8, r8 = c7, c7 = h7 ^ n8(c7, this.masking[7], this.rotate[7]), h7 = r8, r8 = c7, c7 = h7 ^ e8(c7, this.masking[6], this.rotate[6]), h7 = r8, r8 = c7, c7 = h7 ^ s8(c7, this.masking[5], this.rotate[5]), h7 = r8, r8 = c7, c7 = h7 ^ n8(c7, this.masking[4], this.rotate[4]), h7 = r8, r8 = c7, c7 = h7 ^ e8(c7, this.masking[3], this.rotate[3]), h7 = r8, r8 = c7, c7 = h7 ^ s8(c7, this.masking[2], this.rotate[2]), h7 = r8, r8 = c7, c7 = h7 ^ n8(c7, this.masking[1], this.rotate[1]), h7 = r8, r8 = c7, c7 = h7 ^ e8(c7, this.masking[0], this.rotate[0]), h7 = r8, i9[o9] = c7 >>> 24 & 255, i9[o9 + 1] = c7 >>> 16 & 255, i9[o9 + 2] = c7 >>> 8 & 255, i9[o9 + 3] = 255 & c7, i9[o9 + 4] = h7 >>> 24 & 255, i9[o9 + 5] = h7 >> 16 & 255, i9[o9 + 6] = h7 >> 8 & 255, i9[o9 + 7] = 255 & h7;
    }
    return i9;
  };
  const t8 = [, , , ,];
  t8[0] = [, , , ,], t8[0][0] = [4, 0, 13, 15, 12, 14, 8], t8[0][1] = [5, 2, 16, 18, 17, 19, 10], t8[0][2] = [6, 3, 23, 22, 21, 20, 9], t8[0][3] = [7, 1, 26, 25, 27, 24, 11], t8[1] = [, , , ,], t8[1][0] = [0, 6, 21, 23, 20, 22, 16], t8[1][1] = [1, 4, 0, 2, 1, 3, 18], t8[1][2] = [2, 5, 7, 6, 5, 4, 17], t8[1][3] = [3, 7, 10, 9, 11, 8, 19], t8[2] = [, , , ,], t8[2][0] = [4, 0, 13, 15, 12, 14, 8], t8[2][1] = [5, 2, 16, 18, 17, 19, 10], t8[2][2] = [6, 3, 23, 22, 21, 20, 9], t8[2][3] = [7, 1, 26, 25, 27, 24, 11], t8[3] = [, , , ,], t8[3][0] = [0, 6, 21, 23, 20, 22, 16], t8[3][1] = [1, 4, 0, 2, 1, 3, 18], t8[3][2] = [2, 5, 7, 6, 5, 4, 17], t8[3][3] = [3, 7, 10, 9, 11, 8, 19];
  const i8 = [, , , ,];
  function e8(t9, i9, e9) {
    const n9 = i9 + t9, s9 = n9 << e9 | n9 >>> 32 - e9;
    return (o8[0][s9 >>> 24] ^ o8[1][s9 >>> 16 & 255]) - o8[2][s9 >>> 8 & 255] + o8[3][255 & s9];
  }
  function n8(t9, i9, e9) {
    const n9 = i9 ^ t9, s9 = n9 << e9 | n9 >>> 32 - e9;
    return o8[0][s9 >>> 24] - o8[1][s9 >>> 16 & 255] + o8[2][s9 >>> 8 & 255] ^ o8[3][255 & s9];
  }
  function s8(t9, i9, e9) {
    const n9 = i9 - t9, s9 = n9 << e9 | n9 >>> 32 - e9;
    return (o8[0][s9 >>> 24] + o8[1][s9 >>> 16 & 255] ^ o8[2][s9 >>> 8 & 255]) - o8[3][255 & s9];
  }
  i8[0] = [, , , ,], i8[0][0] = [24, 25, 23, 22, 18], i8[0][1] = [26, 27, 21, 20, 22], i8[0][2] = [28, 29, 19, 18, 25], i8[0][3] = [30, 31, 17, 16, 28], i8[1] = [, , , ,], i8[1][0] = [3, 2, 12, 13, 8], i8[1][1] = [1, 0, 14, 15, 13], i8[1][2] = [7, 6, 8, 9, 3], i8[1][3] = [5, 4, 10, 11, 7], i8[2] = [, , , ,], i8[2][0] = [19, 18, 28, 29, 25], i8[2][1] = [17, 16, 30, 31, 28], i8[2][2] = [23, 22, 24, 25, 18], i8[2][3] = [21, 20, 26, 27, 22], i8[3] = [, , , ,], i8[3][0] = [8, 9, 7, 6, 3], i8[3][1] = [10, 11, 5, 4, 7], i8[3][2] = [12, 13, 3, 2, 8], i8[3][3] = [14, 15, 1, 0, 13], this.keySchedule = function(e9) {
    const n9 = [, , , , , , , ,], s9 = Array(32);
    let r8;
    for (let t9 = 0; t9 < 4; t9++) r8 = 4 * t9, n9[t9] = e9[r8] << 24 | e9[r8 + 1] << 16 | e9[r8 + 2] << 8 | e9[r8 + 3];
    const h7 = [6, 7, 4, 5];
    let c7, a8 = 0;
    for (let e10 = 0; e10 < 2; e10++) for (let e11 = 0; e11 < 4; e11++) {
      for (r8 = 0; r8 < 4; r8++) {
        const i9 = t8[e11][r8];
        c7 = n9[i9[1]], c7 ^= o8[4][n9[i9[2] >>> 2] >>> 24 - 8 * (3 & i9[2]) & 255], c7 ^= o8[5][n9[i9[3] >>> 2] >>> 24 - 8 * (3 & i9[3]) & 255], c7 ^= o8[6][n9[i9[4] >>> 2] >>> 24 - 8 * (3 & i9[4]) & 255], c7 ^= o8[7][n9[i9[5] >>> 2] >>> 24 - 8 * (3 & i9[5]) & 255], c7 ^= o8[h7[r8]][n9[i9[6] >>> 2] >>> 24 - 8 * (3 & i9[6]) & 255], n9[i9[0]] = c7;
      }
      for (r8 = 0; r8 < 4; r8++) {
        const t9 = i8[e11][r8];
        c7 = o8[4][n9[t9[0] >>> 2] >>> 24 - 8 * (3 & t9[0]) & 255], c7 ^= o8[5][n9[t9[1] >>> 2] >>> 24 - 8 * (3 & t9[1]) & 255], c7 ^= o8[6][n9[t9[2] >>> 2] >>> 24 - 8 * (3 & t9[2]) & 255], c7 ^= o8[7][n9[t9[3] >>> 2] >>> 24 - 8 * (3 & t9[3]) & 255], c7 ^= o8[4 + r8][n9[t9[4] >>> 2] >>> 24 - 8 * (3 & t9[4]) & 255], s9[a8] = c7, a8++;
      }
    }
    for (let t9 = 0; t9 < 16; t9++) this.masking[t9] = s9[t9], this.rotate[t9] = 31 & s9[16 + t9];
  };
  const o8 = [, , , , , , , ,];
  o8[0] = [821772500, 2678128395, 1810681135, 1059425402, 505495343, 2617265619, 1610868032, 3483355465, 3218386727, 2294005173, 3791863952, 2563806837, 1852023008, 365126098, 3269944861, 584384398, 677919599, 3229601881, 4280515016, 2002735330, 1136869587, 3744433750, 2289869850, 2731719981, 2714362070, 879511577, 1639411079, 575934255, 717107937, 2857637483, 576097850, 2731753936, 1725645e3, 2810460463, 5111599, 767152862, 2543075244, 1251459544, 1383482551, 3052681127, 3089939183, 3612463449, 1878520045, 1510570527, 2189125840, 2431448366, 582008916, 3163445557, 1265446783, 1354458274, 3529918736, 3202711853, 3073581712, 3912963487, 3029263377, 1275016285, 4249207360, 2905708351, 3304509486, 1442611557, 3585198765, 2712415662, 2731849581, 3248163920, 2283946226, 208555832, 2766454743, 1331405426, 1447828783, 3315356441, 3108627284, 2957404670, 2981538698, 3339933917, 1669711173, 286233437, 1465092821, 1782121619, 3862771680, 710211251, 980974943, 1651941557, 430374111, 2051154026, 704238805, 4128970897, 3144820574, 2857402727, 948965521, 3333752299, 2227686284, 718756367, 2269778983, 2731643755, 718440111, 2857816721, 3616097120, 1113355533, 2478022182, 410092745, 1811985197, 1944238868, 2696854588, 1415722873, 1682284203, 1060277122, 1998114690, 1503841958, 82706478, 2315155686, 1068173648, 845149890, 2167947013, 1768146376, 1993038550, 3566826697, 3390574031, 940016341, 3355073782, 2328040721, 904371731, 1205506512, 4094660742, 2816623006, 825647681, 85914773, 2857843460, 1249926541, 1417871568, 3287612, 3211054559, 3126306446, 1975924523, 1353700161, 2814456437, 2438597621, 1800716203, 722146342, 2873936343, 1151126914, 4160483941, 2877670899, 458611604, 2866078500, 3483680063, 770352098, 2652916994, 3367839148, 3940505011, 3585973912, 3809620402, 718646636, 2504206814, 2914927912, 3631288169, 2857486607, 2860018678, 575749918, 2857478043, 718488780, 2069512688, 3548183469, 453416197, 1106044049, 3032691430, 52586708, 3378514636, 3459808877, 3211506028, 1785789304, 218356169, 3571399134, 3759170522, 1194783844, 1523787992, 3007827094, 1975193539, 2555452411, 1341901877, 3045838698, 3776907964, 3217423946, 2802510864, 2889438986, 1057244207, 1636348243, 3761863214, 1462225785, 2632663439, 481089165, 718503062, 24497053, 3332243209, 3344655856, 3655024856, 3960371065, 1195698900, 2971415156, 3710176158, 2115785917, 4027663609, 3525578417, 2524296189, 2745972565, 3564906415, 1372086093, 1452307862, 2780501478, 1476592880, 3389271281, 18495466, 2378148571, 901398090, 891748256, 3279637769, 3157290713, 2560960102, 1447622437, 4284372637, 216884176, 2086908623, 1879786977, 3588903153, 2242455666, 2938092967, 3559082096, 2810645491, 758861177, 1121993112, 215018983, 642190776, 4169236812, 1196255959, 2081185372, 3508738393, 941322904, 4124243163, 2877523539, 1848581667, 2205260958, 3180453958, 2589345134, 3694731276, 550028657, 2519456284, 3789985535, 2973870856, 2093648313, 443148163, 46942275, 2734146937, 1117713533, 1115362972, 1523183689, 3717140224, 1551984063], o8[1] = [522195092, 4010518363, 1776537470, 960447360, 4267822970, 4005896314, 1435016340, 1929119313, 2913464185, 1310552629, 3579470798, 3724818106, 2579771631, 1594623892, 417127293, 2715217907, 2696228731, 1508390405, 3994398868, 3925858569, 3695444102, 4019471449, 3129199795, 3770928635, 3520741761, 990456497, 4187484609, 2783367035, 21106139, 3840405339, 631373633, 3783325702, 532942976, 396095098, 3548038825, 4267192484, 2564721535, 2011709262, 2039648873, 620404603, 3776170075, 2898526339, 3612357925, 4159332703, 1645490516, 223693667, 1567101217, 3362177881, 1029951347, 3470931136, 3570957959, 1550265121, 119497089, 972513919, 907948164, 3840628539, 1613718692, 3594177948, 465323573, 2659255085, 654439692, 2575596212, 2699288441, 3127702412, 277098644, 624404830, 4100943870, 2717858591, 546110314, 2403699828, 3655377447, 1321679412, 4236791657, 1045293279, 4010672264, 895050893, 2319792268, 494945126, 1914543101, 2777056443, 3894764339, 2219737618, 311263384, 4275257268, 3458730721, 669096869, 3584475730, 3835122877, 3319158237, 3949359204, 2005142349, 2713102337, 2228954793, 3769984788, 569394103, 3855636576, 1425027204, 108000370, 2736431443, 3671869269, 3043122623, 1750473702, 2211081108, 762237499, 3972989403, 2798899386, 3061857628, 2943854345, 867476300, 964413654, 1591880597, 1594774276, 2179821409, 552026980, 3026064248, 3726140315, 2283577634, 3110545105, 2152310760, 582474363, 1582640421, 1383256631, 2043843868, 3322775884, 1217180674, 463797851, 2763038571, 480777679, 2718707717, 2289164131, 3118346187, 214354409, 200212307, 3810608407, 3025414197, 2674075964, 3997296425, 1847405948, 1342460550, 510035443, 4080271814, 815934613, 833030224, 1620250387, 1945732119, 2703661145, 3966000196, 1388869545, 3456054182, 2687178561, 2092620194, 562037615, 1356438536, 3409922145, 3261847397, 1688467115, 2150901366, 631725691, 3840332284, 549916902, 3455104640, 394546491, 837744717, 2114462948, 751520235, 2221554606, 2415360136, 3999097078, 2063029875, 803036379, 2702586305, 821456707, 3019566164, 360699898, 4018502092, 3511869016, 3677355358, 2402471449, 812317050, 49299192, 2570164949, 3259169295, 2816732080, 3331213574, 3101303564, 2156015656, 3705598920, 3546263921, 143268808, 3200304480, 1638124008, 3165189453, 3341807610, 578956953, 2193977524, 3638120073, 2333881532, 807278310, 658237817, 2969561766, 1641658566, 11683945, 3086995007, 148645947, 1138423386, 4158756760, 1981396783, 2401016740, 3699783584, 380097457, 2680394679, 2803068651, 3334260286, 441530178, 4016580796, 1375954390, 761952171, 891809099, 2183123478, 157052462, 3683840763, 1592404427, 341349109, 2438483839, 1417898363, 644327628, 2233032776, 2353769706, 2201510100, 220455161, 1815641738, 182899273, 2995019788, 3627381533, 3702638151, 2890684138, 1052606899, 588164016, 1681439879, 4038439418, 2405343923, 4229449282, 167996282, 1336969661, 1688053129, 2739224926, 1543734051, 1046297529, 1138201970, 2121126012, 115334942, 1819067631, 1902159161, 1941945968, 2206692869, 1159982321], o8[2] = [2381300288, 637164959, 3952098751, 3893414151, 1197506559, 916448331, 2350892612, 2932787856, 3199334847, 4009478890, 3905886544, 1373570990, 2450425862, 4037870920, 3778841987, 2456817877, 286293407, 124026297, 3001279700, 1028597854, 3115296800, 4208886496, 2691114635, 2188540206, 1430237888, 1218109995, 3572471700, 308166588, 570424558, 2187009021, 2455094765, 307733056, 1310360322, 3135275007, 1384269543, 2388071438, 863238079, 2359263624, 2801553128, 3380786597, 2831162807, 1470087780, 1728663345, 4072488799, 1090516929, 532123132, 2389430977, 1132193179, 2578464191, 3051079243, 1670234342, 1434557849, 2711078940, 1241591150, 3314043432, 3435360113, 3091448339, 1812415473, 2198440252, 267246943, 796911696, 3619716990, 38830015, 1526438404, 2806502096, 374413614, 2943401790, 1489179520, 1603809326, 1920779204, 168801282, 260042626, 2358705581, 1563175598, 2397674057, 1356499128, 2217211040, 514611088, 2037363785, 2186468373, 4022173083, 2792511869, 2913485016, 1173701892, 4200428547, 3896427269, 1334932762, 2455136706, 602925377, 2835607854, 1613172210, 41346230, 2499634548, 2457437618, 2188827595, 41386358, 4172255629, 1313404830, 2405527007, 3801973774, 2217704835, 873260488, 2528884354, 2478092616, 4012915883, 2555359016, 2006953883, 2463913485, 575479328, 2218240648, 2099895446, 660001756, 2341502190, 3038761536, 3888151779, 3848713377, 3286851934, 1022894237, 1620365795, 3449594689, 1551255054, 15374395, 3570825345, 4249311020, 4151111129, 3181912732, 310226346, 1133119310, 530038928, 136043402, 2476768958, 3107506709, 2544909567, 1036173560, 2367337196, 1681395281, 1758231547, 3641649032, 306774401, 1575354324, 3716085866, 1990386196, 3114533736, 2455606671, 1262092282, 3124342505, 2768229131, 4210529083, 1833535011, 423410938, 660763973, 2187129978, 1639812e3, 3508421329, 3467445492, 310289298, 272797111, 2188552562, 2456863912, 310240523, 677093832, 1013118031, 901835429, 3892695601, 1116285435, 3036471170, 1337354835, 243122523, 520626091, 277223598, 4244441197, 4194248841, 1766575121, 594173102, 316590669, 742362309, 3536858622, 4176435350, 3838792410, 2501204839, 1229605004, 3115755532, 1552908988, 2312334149, 979407927, 3959474601, 1148277331, 176638793, 3614686272, 2083809052, 40992502, 1340822838, 2731552767, 3535757508, 3560899520, 1354035053, 122129617, 7215240, 2732932949, 3118912700, 2718203926, 2539075635, 3609230695, 3725561661, 1928887091, 2882293555, 1988674909, 2063640240, 2491088897, 1459647954, 4189817080, 2302804382, 1113892351, 2237858528, 1927010603, 4002880361, 1856122846, 1594404395, 2944033133, 3855189863, 3474975698, 1643104450, 4054590833, 3431086530, 1730235576, 2984608721, 3084664418, 2131803598, 4178205752, 267404349, 1617849798, 1616132681, 1462223176, 736725533, 2327058232, 551665188, 2945899023, 1749386277, 2575514597, 1611482493, 674206544, 2201269090, 3642560800, 728599968, 1680547377, 2620414464, 1388111496, 453204106, 4156223445, 1094905244, 2754698257, 2201108165, 3757000246, 2704524545, 3922940700, 3996465027], o8[3] = [2645754912, 532081118, 2814278639, 3530793624, 1246723035, 1689095255, 2236679235, 4194438865, 2116582143, 3859789411, 157234593, 2045505824, 4245003587, 1687664561, 4083425123, 605965023, 672431967, 1336064205, 3376611392, 214114848, 4258466608, 3232053071, 489488601, 605322005, 3998028058, 264917351, 1912574028, 756637694, 436560991, 202637054, 135989450, 85393697, 2152923392, 3896401662, 2895836408, 2145855233, 3535335007, 115294817, 3147733898, 1922296357, 3464822751, 4117858305, 1037454084, 2725193275, 2127856640, 1417604070, 1148013728, 1827919605, 642362335, 2929772533, 909348033, 1346338451, 3547799649, 297154785, 1917849091, 4161712827, 2883604526, 3968694238, 1469521537, 3780077382, 3375584256, 1763717519, 136166297, 4290970789, 1295325189, 2134727907, 2798151366, 1566297257, 3672928234, 2677174161, 2672173615, 965822077, 2780786062, 289653839, 1133871874, 3491843819, 35685304, 1068898316, 418943774, 672553190, 642281022, 2346158704, 1954014401, 3037126780, 4079815205, 2030668546, 3840588673, 672283427, 1776201016, 359975446, 3750173538, 555499703, 2769985273, 1324923, 69110472, 152125443, 3176785106, 3822147285, 1340634837, 798073664, 1434183902, 15393959, 216384236, 1303690150, 3881221631, 3711134124, 3960975413, 106373927, 2578434224, 1455997841, 1801814300, 1578393881, 1854262133, 3188178946, 3258078583, 2302670060, 1539295533, 3505142565, 3078625975, 2372746020, 549938159, 3278284284, 2620926080, 181285381, 2865321098, 3970029511, 68876850, 488006234, 1728155692, 2608167508, 836007927, 2435231793, 919367643, 3339422534, 3655756360, 1457871481, 40520939, 1380155135, 797931188, 234455205, 2255801827, 3990488299, 397000196, 739833055, 3077865373, 2871719860, 4022553888, 772369276, 390177364, 3853951029, 557662966, 740064294, 1640166671, 1699928825, 3535942136, 622006121, 3625353122, 68743880, 1742502, 219489963, 1664179233, 1577743084, 1236991741, 410585305, 2366487942, 823226535, 1050371084, 3426619607, 3586839478, 212779912, 4147118561, 1819446015, 1911218849, 530248558, 3486241071, 3252585495, 2886188651, 3410272728, 2342195030, 20547779, 2982490058, 3032363469, 3631753222, 312714466, 1870521650, 1493008054, 3491686656, 615382978, 4103671749, 2534517445, 1932181, 2196105170, 278426614, 6369430, 3274544417, 2913018367, 697336853, 2143000447, 2946413531, 701099306, 1558357093, 2805003052, 3500818408, 2321334417, 3567135975, 216290473, 3591032198, 23009561, 1996984579, 3735042806, 2024298078, 3739440863, 569400510, 2339758983, 3016033873, 3097871343, 3639523026, 3844324983, 3256173865, 795471839, 2951117563, 4101031090, 4091603803, 3603732598, 971261452, 534414648, 428311343, 3389027175, 2844869880, 694888862, 1227866773, 2456207019, 3043454569, 2614353370, 3749578031, 3676663836, 459166190, 4132644070, 1794958188, 51825668, 2252611902, 3084671440, 2036672799, 3436641603, 1099053433, 2469121526, 3059204941, 1323291266, 2061838604, 1018778475, 2233344254, 2553501054, 334295216, 3556750194, 1065731521, 183467730], o8[4] = [2127105028, 745436345, 2601412319, 2788391185, 3093987327, 500390133, 1155374404, 389092991, 150729210, 3891597772, 3523549952, 1935325696, 716645080, 946045387, 2901812282, 1774124410, 3869435775, 4039581901, 3293136918, 3438657920, 948246080, 363898952, 3867875531, 1286266623, 1598556673, 68334250, 630723836, 1104211938, 1312863373, 613332731, 2377784574, 1101634306, 441780740, 3129959883, 1917973735, 2510624549, 3238456535, 2544211978, 3308894634, 1299840618, 4076074851, 1756332096, 3977027158, 297047435, 3790297736, 2265573040, 3621810518, 1311375015, 1667687725, 47300608, 3299642885, 2474112369, 201668394, 1468347890, 576830978, 3594690761, 3742605952, 1958042578, 1747032512, 3558991340, 1408974056, 3366841779, 682131401, 1033214337, 1545599232, 4265137049, 206503691, 103024618, 2855227313, 1337551222, 2428998917, 2963842932, 4015366655, 3852247746, 2796956967, 3865723491, 3747938335, 247794022, 3755824572, 702416469, 2434691994, 397379957, 851939612, 2314769512, 218229120, 1380406772, 62274761, 214451378, 3170103466, 2276210409, 3845813286, 28563499, 446592073, 1693330814, 3453727194, 29968656, 3093872512, 220656637, 2470637031, 77972100, 1667708854, 1358280214, 4064765667, 2395616961, 325977563, 4277240721, 4220025399, 3605526484, 3355147721, 811859167, 3069544926, 3962126810, 652502677, 3075892249, 4132761541, 3498924215, 1217549313, 3250244479, 3858715919, 3053989961, 1538642152, 2279026266, 2875879137, 574252750, 3324769229, 2651358713, 1758150215, 141295887, 2719868960, 3515574750, 4093007735, 4194485238, 1082055363, 3417560400, 395511885, 2966884026, 179534037, 3646028556, 3738688086, 1092926436, 2496269142, 257381841, 3772900718, 1636087230, 1477059743, 2499234752, 3811018894, 2675660129, 3285975680, 90732309, 1684827095, 1150307763, 1723134115, 3237045386, 1769919919, 1240018934, 815675215, 750138730, 2239792499, 1234303040, 1995484674, 138143821, 675421338, 1145607174, 1936608440, 3238603024, 2345230278, 2105974004, 323969391, 779555213, 3004902369, 2861610098, 1017501463, 2098600890, 2628620304, 2940611490, 2682542546, 1171473753, 3656571411, 3687208071, 4091869518, 393037935, 159126506, 1662887367, 1147106178, 391545844, 3452332695, 1891500680, 3016609650, 1851642611, 546529401, 1167818917, 3194020571, 2848076033, 3953471836, 575554290, 475796850, 4134673196, 450035699, 2351251534, 844027695, 1080539133, 86184846, 1554234488, 3692025454, 1972511363, 2018339607, 1491841390, 1141460869, 1061690759, 4244549243, 2008416118, 2351104703, 2868147542, 1598468138, 722020353, 1027143159, 212344630, 1387219594, 1725294528, 3745187956, 2500153616, 458938280, 4129215917, 1828119673, 544571780, 3503225445, 2297937496, 1241802790, 267843827, 2694610800, 1397140384, 1558801448, 3782667683, 1806446719, 929573330, 2234912681, 400817706, 616011623, 4121520928, 3603768725, 1761550015, 1968522284, 4053731006, 4192232858, 4005120285, 872482584, 3140537016, 3894607381, 2287405443, 1963876937, 3663887957, 1584857e3, 2975024454, 1833426440, 4025083860], o8[5] = [4143615901, 749497569, 1285769319, 3795025788, 2514159847, 23610292, 3974978748, 844452780, 3214870880, 3751928557, 2213566365, 1676510905, 448177848, 3730751033, 4086298418, 2307502392, 871450977, 3222878141, 4110862042, 3831651966, 2735270553, 1310974780, 2043402188, 1218528103, 2736035353, 4274605013, 2702448458, 3936360550, 2693061421, 162023535, 2827510090, 687910808, 23484817, 3784910947, 3371371616, 779677500, 3503626546, 3473927188, 4157212626, 3500679282, 4248902014, 2466621104, 3899384794, 1958663117, 925738300, 1283408968, 3669349440, 1840910019, 137959847, 2679828185, 1239142320, 1315376211, 1547541505, 1690155329, 739140458, 3128809933, 3933172616, 3876308834, 905091803, 1548541325, 4040461708, 3095483362, 144808038, 451078856, 676114313, 2861728291, 2469707347, 993665471, 373509091, 2599041286, 4025009006, 4170239449, 2149739950, 3275793571, 3749616649, 2794760199, 1534877388, 572371878, 2590613551, 1753320020, 3467782511, 1405125690, 4270405205, 633333386, 3026356924, 3475123903, 632057672, 2846462855, 1404951397, 3882875879, 3915906424, 195638627, 2385783745, 3902872553, 1233155085, 3355999740, 2380578713, 2702246304, 2144565621, 3663341248, 3894384975, 2502479241, 4248018925, 3094885567, 1594115437, 572884632, 3385116731, 767645374, 1331858858, 1475698373, 3793881790, 3532746431, 1321687957, 619889600, 1121017241, 3440213920, 2070816767, 2833025776, 1933951238, 4095615791, 890643334, 3874130214, 859025556, 360630002, 925594799, 1764062180, 3920222280, 4078305929, 979562269, 2810700344, 4087740022, 1949714515, 546639971, 1165388173, 3069891591, 1495988560, 922170659, 1291546247, 2107952832, 1813327274, 3406010024, 3306028637, 4241950635, 153207855, 2313154747, 1608695416, 1150242611, 1967526857, 721801357, 1220138373, 3691287617, 3356069787, 2112743302, 3281662835, 1111556101, 1778980689, 250857638, 2298507990, 673216130, 2846488510, 3207751581, 3562756981, 3008625920, 3417367384, 2198807050, 529510932, 3547516680, 3426503187, 2364944742, 102533054, 2294910856, 1617093527, 1204784762, 3066581635, 1019391227, 1069574518, 1317995090, 1691889997, 3661132003, 510022745, 3238594800, 1362108837, 1817929911, 2184153760, 805817662, 1953603311, 3699844737, 120799444, 2118332377, 207536705, 2282301548, 4120041617, 145305846, 2508124933, 3086745533, 3261524335, 1877257368, 2977164480, 3160454186, 2503252186, 4221677074, 759945014, 254147243, 2767453419, 3801518371, 629083197, 2471014217, 907280572, 3900796746, 940896768, 2751021123, 2625262786, 3161476951, 3661752313, 3260732218, 1425318020, 2977912069, 1496677566, 3988592072, 2140652971, 3126511541, 3069632175, 977771578, 1392695845, 1698528874, 1411812681, 1369733098, 1343739227, 3620887944, 1142123638, 67414216, 3102056737, 3088749194, 1626167401, 2546293654, 3941374235, 697522451, 33404913, 143560186, 2595682037, 994885535, 1247667115, 3859094837, 2699155541, 3547024625, 4114935275, 2968073508, 3199963069, 2732024527, 1237921620, 951448369, 1898488916, 1211705605, 2790989240, 2233243581, 3598044975], o8[6] = [2246066201, 858518887, 1714274303, 3485882003, 713916271, 2879113490, 3730835617, 539548191, 36158695, 1298409750, 419087104, 1358007170, 749914897, 2989680476, 1261868530, 2995193822, 2690628854, 3443622377, 3780124940, 3796824509, 2976433025, 4259637129, 1551479e3, 512490819, 1296650241, 951993153, 2436689437, 2460458047, 144139966, 3136204276, 310820559, 3068840729, 643875328, 1969602020, 1680088954, 2185813161, 3283332454, 672358534, 198762408, 896343282, 276269502, 3014846926, 84060815, 197145886, 376173866, 3943890818, 3813173521, 3545068822, 1316698879, 1598252827, 2633424951, 1233235075, 859989710, 2358460855, 3503838400, 3409603720, 1203513385, 1193654839, 2792018475, 2060853022, 207403770, 1144516871, 3068631394, 1121114134, 177607304, 3785736302, 326409831, 1929119770, 2983279095, 4183308101, 3474579288, 3200513878, 3228482096, 119610148, 1170376745, 3378393471, 3163473169, 951863017, 3337026068, 3135789130, 2907618374, 1183797387, 2015970143, 4045674555, 2182986399, 2952138740, 3928772205, 384012900, 2454997643, 10178499, 2879818989, 2596892536, 111523738, 2995089006, 451689641, 3196290696, 235406569, 1441906262, 3890558523, 3013735005, 4158569349, 1644036924, 376726067, 1006849064, 3664579700, 2041234796, 1021632941, 1374734338, 2566452058, 371631263, 4007144233, 490221539, 206551450, 3140638584, 1053219195, 1853335209, 3412429660, 3562156231, 735133835, 1623211703, 3104214392, 2738312436, 4096837757, 3366392578, 3110964274, 3956598718, 3196820781, 2038037254, 3877786376, 2339753847, 300912036, 3766732888, 2372630639, 1516443558, 4200396704, 1574567987, 4069441456, 4122592016, 2699739776, 146372218, 2748961456, 2043888151, 35287437, 2596680554, 655490400, 1132482787, 110692520, 1031794116, 2188192751, 1324057718, 1217253157, 919197030, 686247489, 3261139658, 1028237775, 3135486431, 3059715558, 2460921700, 986174950, 2661811465, 4062904701, 2752986992, 3709736643, 367056889, 1353824391, 731860949, 1650113154, 1778481506, 784341916, 357075625, 3608602432, 1074092588, 2480052770, 3811426202, 92751289, 877911070, 3600361838, 1231880047, 480201094, 3756190983, 3094495953, 434011822, 87971354, 363687820, 1717726236, 1901380172, 3926403882, 2481662265, 400339184, 1490350766, 2661455099, 1389319756, 2558787174, 784598401, 1983468483, 30828846, 3550527752, 2716276238, 3841122214, 1765724805, 1955612312, 1277890269, 1333098070, 1564029816, 2704417615, 1026694237, 3287671188, 1260819201, 3349086767, 1016692350, 1582273796, 1073413053, 1995943182, 694588404, 1025494639, 3323872702, 3551898420, 4146854327, 453260480, 1316140391, 1435673405, 3038941953, 3486689407, 1622062951, 403978347, 817677117, 950059133, 4246079218, 3278066075, 1486738320, 1417279718, 481875527, 2549965225, 3933690356, 760697757, 1452955855, 3897451437, 1177426808, 1702951038, 4085348628, 2447005172, 1084371187, 3516436277, 3068336338, 1073369276, 1027665953, 3284188590, 1230553676, 1368340146, 2226246512, 267243139, 2274220762, 4070734279, 2497715176, 2423353163, 2504755875], o8[7] = [3793104909, 3151888380, 2817252029, 895778965, 2005530807, 3871412763, 237245952, 86829237, 296341424, 3851759377, 3974600970, 2475086196, 709006108, 1994621201, 2972577594, 937287164, 3734691505, 168608556, 3189338153, 2225080640, 3139713551, 3033610191, 3025041904, 77524477, 185966941, 1208824168, 2344345178, 1721625922, 3354191921, 1066374631, 1927223579, 1971335949, 2483503697, 1551748602, 2881383779, 2856329572, 3003241482, 48746954, 1398218158, 2050065058, 313056748, 4255789917, 393167848, 1912293076, 940740642, 3465845460, 3091687853, 2522601570, 2197016661, 1727764327, 364383054, 492521376, 1291706479, 3264136376, 1474851438, 1685747964, 2575719748, 1619776915, 1814040067, 970743798, 1561002147, 2925768690, 2123093554, 1880132620, 3151188041, 697884420, 2550985770, 2607674513, 2659114323, 110200136, 1489731079, 997519150, 1378877361, 3527870668, 478029773, 2766872923, 1022481122, 431258168, 1112503832, 897933369, 2635587303, 669726182, 3383752315, 918222264, 163866573, 3246985393, 3776823163, 114105080, 1903216136, 761148244, 3571337562, 1690750982, 3166750252, 1037045171, 1888456500, 2010454850, 642736655, 616092351, 365016990, 1185228132, 4174898510, 1043824992, 2023083429, 2241598885, 3863320456, 3279669087, 3674716684, 108438443, 2132974366, 830746235, 606445527, 4173263986, 2204105912, 1844756978, 2532684181, 4245352700, 2969441100, 3796921661, 1335562986, 4061524517, 2720232303, 2679424040, 634407289, 885462008, 3294724487, 3933892248, 2094100220, 339117932, 4048830727, 3202280980, 1458155303, 2689246273, 1022871705, 2464987878, 3714515309, 353796843, 2822958815, 4256850100, 4052777845, 551748367, 618185374, 3778635579, 4020649912, 1904685140, 3069366075, 2670879810, 3407193292, 2954511620, 4058283405, 2219449317, 3135758300, 1120655984, 3447565834, 1474845562, 3577699062, 550456716, 3466908712, 2043752612, 881257467, 869518812, 2005220179, 938474677, 3305539448, 3850417126, 1315485940, 3318264702, 226533026, 965733244, 321539988, 1136104718, 804158748, 573969341, 3708209826, 937399083, 3290727049, 2901666755, 1461057207, 4013193437, 4066861423, 3242773476, 2421326174, 1581322155, 3028952165, 786071460, 3900391652, 3918438532, 1485433313, 4023619836, 3708277595, 3678951060, 953673138, 1467089153, 1930354364, 1533292819, 2492563023, 1346121658, 1685000834, 1965281866, 3765933717, 4190206607, 2052792609, 3515332758, 690371149, 3125873887, 2180283551, 2903598061, 3933952357, 436236910, 289419410, 14314871, 1242357089, 2904507907, 1616633776, 2666382180, 585885352, 3471299210, 2699507360, 1432659641, 277164553, 3354103607, 770115018, 2303809295, 3741942315, 3177781868, 2853364978, 2269453327, 3774259834, 987383833, 1290892879, 225909803, 1741533526, 890078084, 1496906255, 1111072499, 916028167, 243534141, 1252605537, 2204162171, 531204876, 290011180, 3916834213, 102027703, 237315147, 209093447, 1486785922, 220223953, 2758195998, 4175039106, 82940208, 3127791296, 2569425252, 518464269, 1353887104, 3941492737, 2377294467, 3935040926];
}
function s3(t8) {
  this.cast5 = new n3(), this.cast5.setKey(t8), this.encrypt = function(t9) {
    return this.cast5.encrypt(t9);
  };
}
function r3(t8, i8) {
  return (t8 << i8 | t8 >>> 32 - i8) & o3;
}
function h3(t8, i8) {
  return t8[i8] | t8[i8 + 1] << 8 | t8[i8 + 2] << 16 | t8[i8 + 3] << 24;
}
function c3(t8, i8, e8) {
  t8.splice(i8, 4, 255 & e8, e8 >>> 8 & 255, e8 >>> 16 & 255, e8 >>> 24 & 255);
}
function a3(t8, i8) {
  return t8 >>> 8 * i8 & 255;
}
function f3(t8) {
  this.tf = /* @__PURE__ */ (function() {
    let t9 = null, i8 = null, e8 = -1, n8 = [], s8 = [[], [], [], []];
    function f8(t10) {
      return s8[0][a3(t10, 0)] ^ s8[1][a3(t10, 1)] ^ s8[2][a3(t10, 2)] ^ s8[3][a3(t10, 3)];
    }
    function l6(t10) {
      return s8[0][a3(t10, 3)] ^ s8[1][a3(t10, 0)] ^ s8[2][a3(t10, 1)] ^ s8[3][a3(t10, 2)];
    }
    function u8(t10, i9) {
      let e9 = f8(i9[0]), s9 = l6(i9[1]);
      i9[2] = r3(i9[2] ^ e9 + s9 + n8[4 * t10 + 8] & o3, 31), i9[3] = r3(i9[3], 1) ^ e9 + 2 * s9 + n8[4 * t10 + 9] & o3, e9 = f8(i9[2]), s9 = l6(i9[3]), i9[0] = r3(i9[0] ^ e9 + s9 + n8[4 * t10 + 10] & o3, 31), i9[1] = r3(i9[1], 1) ^ e9 + 2 * s9 + n8[4 * t10 + 11] & o3;
    }
    function y8(t10, i9) {
      let e9 = f8(i9[0]), s9 = l6(i9[1]);
      i9[2] = r3(i9[2], 1) ^ e9 + s9 + n8[4 * t10 + 10] & o3, i9[3] = r3(i9[3] ^ e9 + 2 * s9 + n8[4 * t10 + 11] & o3, 31), e9 = f8(i9[2]), s9 = l6(i9[3]), i9[0] = r3(i9[0], 1) ^ e9 + s9 + n8[4 * t10 + 8] & o3, i9[1] = r3(i9[1] ^ e9 + 2 * s9 + n8[4 * t10 + 9] & o3, 31);
    }
    return { name: "twofish", blocksize: 16, open: function(i9) {
      let e9, c7, f9, l7, u9;
      t9 = i9;
      const y9 = [], p5 = [], k7 = [];
      let g7;
      const m6 = [];
      let S7, b6, z7;
      const d6 = [[8, 1, 7, 13, 6, 15, 3, 2, 0, 11, 5, 9, 14, 12, 10, 4], [2, 8, 11, 13, 15, 7, 6, 14, 3, 1, 9, 4, 0, 10, 12, 5]], w8 = [[14, 12, 11, 8, 1, 2, 3, 5, 15, 4, 10, 6, 7, 0, 9, 13], [1, 14, 2, 11, 4, 12, 3, 7, 6, 13, 10, 5, 15, 9, 0, 8]], A8 = [[11, 10, 5, 14, 6, 13, 9, 0, 12, 8, 15, 3, 2, 4, 7, 1], [4, 12, 7, 5, 1, 6, 9, 10, 0, 14, 13, 8, 2, 11, 3, 15]], B7 = [[13, 7, 15, 4, 1, 2, 6, 14, 9, 11, 3, 0, 8, 5, 12, 10], [11, 9, 5, 1, 12, 3, 13, 14, 6, 4, 7, 15, 2, 0, 8, 10]], N6 = [0, 8, 1, 9, 2, 10, 3, 11, 4, 12, 5, 13, 6, 14, 7, 15], _6 = [0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 5, 14, 7], x7 = [[], []], E8 = [[], [], [], []];
      function K7(t10) {
        return t10 ^ t10 >> 2 ^ [0, 90, 180, 238][3 & t10];
      }
      function O6(t10) {
        return t10 ^ t10 >> 1 ^ t10 >> 2 ^ [0, 238, 180, 90][3 & t10];
      }
      function C8(t10, i10) {
        let e10, n9, s9;
        for (e10 = 0; e10 < 8; e10++) n9 = i10 >>> 24, i10 = i10 << 8 & o3 | t10 >>> 24, t10 = t10 << 8 & o3, s9 = n9 << 1, 128 & n9 && (s9 ^= 333), i10 ^= n9 ^ s9 << 16, s9 ^= n9 >>> 1, 1 & n9 && (s9 ^= 166), i10 ^= s9 << 24 | s9 << 8;
        return i10;
      }
      function I8(t10, i10) {
        const e10 = i10 >> 4, n9 = 15 & i10, s9 = d6[t10][e10 ^ n9], o8 = w8[t10][N6[n9] ^ _6[e10]];
        return B7[t10][N6[o8] ^ _6[s9]] << 4 | A8[t10][s9 ^ o8];
      }
      function L5(t10, i10) {
        let e10 = a3(t10, 0), n9 = a3(t10, 1), s9 = a3(t10, 2), o8 = a3(t10, 3);
        switch (g7) {
          case 4:
            e10 = x7[1][e10] ^ a3(i10[3], 0), n9 = x7[0][n9] ^ a3(i10[3], 1), s9 = x7[0][s9] ^ a3(i10[3], 2), o8 = x7[1][o8] ^ a3(i10[3], 3);
          case 3:
            e10 = x7[1][e10] ^ a3(i10[2], 0), n9 = x7[1][n9] ^ a3(i10[2], 1), s9 = x7[0][s9] ^ a3(i10[2], 2), o8 = x7[0][o8] ^ a3(i10[2], 3);
          case 2:
            e10 = x7[0][x7[0][e10] ^ a3(i10[1], 0)] ^ a3(i10[0], 0), n9 = x7[0][x7[1][n9] ^ a3(i10[1], 1)] ^ a3(i10[0], 1), s9 = x7[1][x7[0][s9] ^ a3(i10[1], 2)] ^ a3(i10[0], 2), o8 = x7[1][x7[1][o8] ^ a3(i10[1], 3)] ^ a3(i10[0], 3);
        }
        return E8[0][e10] ^ E8[1][n9] ^ E8[2][s9] ^ E8[3][o8];
      }
      for (t9 = t9.slice(0, 32), e9 = t9.length; 16 !== e9 && 24 !== e9 && 32 !== e9; ) t9[e9++] = 0;
      for (e9 = 0; e9 < t9.length; e9 += 4) k7[e9 >> 2] = h3(t9, e9);
      for (e9 = 0; e9 < 256; e9++) x7[0][e9] = I8(0, e9), x7[1][e9] = I8(1, e9);
      for (e9 = 0; e9 < 256; e9++) S7 = x7[1][e9], b6 = K7(S7), z7 = O6(S7), E8[0][e9] = S7 + (b6 << 8) + (z7 << 16) + (z7 << 24), E8[2][e9] = b6 + (z7 << 8) + (S7 << 16) + (z7 << 24), S7 = x7[0][e9], b6 = K7(S7), z7 = O6(S7), E8[1][e9] = z7 + (z7 << 8) + (b6 << 16) + (S7 << 24), E8[3][e9] = b6 + (S7 << 8) + (z7 << 16) + (b6 << 24);
      for (g7 = k7.length / 2, e9 = 0; e9 < g7; e9++) c7 = k7[e9 + e9], y9[e9] = c7, f9 = k7[e9 + e9 + 1], p5[e9] = f9, m6[g7 - e9 - 1] = C8(c7, f9);
      for (e9 = 0; e9 < 40; e9 += 2) c7 = 16843009 * e9, f9 = c7 + 16843009, c7 = L5(c7, y9), f9 = r3(L5(f9, p5), 8), n8[e9] = c7 + f9 & o3, n8[e9 + 1] = r3(c7 + 2 * f9, 9);
      for (e9 = 0; e9 < 256; e9++) switch (c7 = f9 = l7 = u9 = e9, g7) {
        case 4:
          c7 = x7[1][c7] ^ a3(m6[3], 0), f9 = x7[0][f9] ^ a3(m6[3], 1), l7 = x7[0][l7] ^ a3(m6[3], 2), u9 = x7[1][u9] ^ a3(m6[3], 3);
        case 3:
          c7 = x7[1][c7] ^ a3(m6[2], 0), f9 = x7[1][f9] ^ a3(m6[2], 1), l7 = x7[0][l7] ^ a3(m6[2], 2), u9 = x7[0][u9] ^ a3(m6[2], 3);
        case 2:
          s8[0][e9] = E8[0][x7[0][x7[0][c7] ^ a3(m6[1], 0)] ^ a3(m6[0], 0)], s8[1][e9] = E8[1][x7[0][x7[1][f9] ^ a3(m6[1], 1)] ^ a3(m6[0], 1)], s8[2][e9] = E8[2][x7[1][x7[0][l7] ^ a3(m6[1], 2)] ^ a3(m6[0], 2)], s8[3][e9] = E8[3][x7[1][x7[1][u9] ^ a3(m6[1], 3)] ^ a3(m6[0], 3)];
      }
    }, close: function() {
      n8 = [], s8 = [[], [], [], []];
    }, encrypt: function(t10, s9) {
      i8 = t10, e8 = s9;
      const o8 = [h3(i8, e8) ^ n8[0], h3(i8, e8 + 4) ^ n8[1], h3(i8, e8 + 8) ^ n8[2], h3(i8, e8 + 12) ^ n8[3]];
      for (let t11 = 0; t11 < 8; t11++) u8(t11, o8);
      return c3(i8, e8, o8[2] ^ n8[4]), c3(i8, e8 + 4, o8[3] ^ n8[5]), c3(i8, e8 + 8, o8[0] ^ n8[6]), c3(i8, e8 + 12, o8[1] ^ n8[7]), e8 += 16, i8;
    }, decrypt: function(t10, s9) {
      i8 = t10, e8 = s9;
      const o8 = [h3(i8, e8) ^ n8[4], h3(i8, e8 + 4) ^ n8[5], h3(i8, e8 + 8) ^ n8[6], h3(i8, e8 + 12) ^ n8[7]];
      for (let t11 = 7; t11 >= 0; t11--) y8(t11, o8);
      c3(i8, e8, o8[2] ^ n8[0]), c3(i8, e8 + 4, o8[3] ^ n8[1]), c3(i8, e8 + 8, o8[0] ^ n8[2]), c3(i8, e8 + 12, o8[1] ^ n8[3]), e8 += 16;
    }, finalize: function() {
      return i8;
    } };
  })(), this.tf.open(Array.from(t8), 0), this.encrypt = function(t9) {
    return this.tf.encrypt(Array.from(t9), 0);
  };
}
function l3() {
}
function u4(t8) {
  this.bf = new l3(), this.bf.init(t8), this.encrypt = function(t9) {
    return this.bf.encryptBlock(t9);
  };
}
var o3, y4;
var init_legacy_ciphers_min = __esm({
  "node_modules/openpgp/dist/lightweight/legacy_ciphers.min.mjs"() {
    e3.keySize = e3.prototype.keySize = 24, e3.blockSize = e3.prototype.blockSize = 8, s3.blockSize = s3.prototype.blockSize = 8, s3.keySize = s3.prototype.keySize = 16;
    o3 = 4294967295;
    f3.keySize = f3.prototype.keySize = 32, f3.blockSize = f3.prototype.blockSize = 16, l3.prototype.BLOCKSIZE = 8, l3.prototype.SBOXES = [[3509652390, 2564797868, 805139163, 3491422135, 3101798381, 1780907670, 3128725573, 4046225305, 614570311, 3012652279, 134345442, 2240740374, 1667834072, 1901547113, 2757295779, 4103290238, 227898511, 1921955416, 1904987480, 2182433518, 2069144605, 3260701109, 2620446009, 720527379, 3318853667, 677414384, 3393288472, 3101374703, 2390351024, 1614419982, 1822297739, 2954791486, 3608508353, 3174124327, 2024746970, 1432378464, 3864339955, 2857741204, 1464375394, 1676153920, 1439316330, 715854006, 3033291828, 289532110, 2706671279, 2087905683, 3018724369, 1668267050, 732546397, 1947742710, 3462151702, 2609353502, 2950085171, 1814351708, 2050118529, 680887927, 999245976, 1800124847, 3300911131, 1713906067, 1641548236, 4213287313, 1216130144, 1575780402, 4018429277, 3917837745, 3693486850, 3949271944, 596196993, 3549867205, 258830323, 2213823033, 772490370, 2760122372, 1774776394, 2652871518, 566650946, 4142492826, 1728879713, 2882767088, 1783734482, 3629395816, 2517608232, 2874225571, 1861159788, 326777828, 3124490320, 2130389656, 2716951837, 967770486, 1724537150, 2185432712, 2364442137, 1164943284, 2105845187, 998989502, 3765401048, 2244026483, 1075463327, 1455516326, 1322494562, 910128902, 469688178, 1117454909, 936433444, 3490320968, 3675253459, 1240580251, 122909385, 2157517691, 634681816, 4142456567, 3825094682, 3061402683, 2540495037, 79693498, 3249098678, 1084186820, 1583128258, 426386531, 1761308591, 1047286709, 322548459, 995290223, 1845252383, 2603652396, 3431023940, 2942221577, 3202600964, 3727903485, 1712269319, 422464435, 3234572375, 1170764815, 3523960633, 3117677531, 1434042557, 442511882, 3600875718, 1076654713, 1738483198, 4213154764, 2393238008, 3677496056, 1014306527, 4251020053, 793779912, 2902807211, 842905082, 4246964064, 1395751752, 1040244610, 2656851899, 3396308128, 445077038, 3742853595, 3577915638, 679411651, 2892444358, 2354009459, 1767581616, 3150600392, 3791627101, 3102740896, 284835224, 4246832056, 1258075500, 768725851, 2589189241, 3069724005, 3532540348, 1274779536, 3789419226, 2764799539, 1660621633, 3471099624, 4011903706, 913787905, 3497959166, 737222580, 2514213453, 2928710040, 3937242737, 1804850592, 3499020752, 2949064160, 2386320175, 2390070455, 2415321851, 4061277028, 2290661394, 2416832540, 1336762016, 1754252060, 3520065937, 3014181293, 791618072, 3188594551, 3933548030, 2332172193, 3852520463, 3043980520, 413987798, 3465142937, 3030929376, 4245938359, 2093235073, 3534596313, 375366246, 2157278981, 2479649556, 555357303, 3870105701, 2008414854, 3344188149, 4221384143, 3956125452, 2067696032, 3594591187, 2921233993, 2428461, 544322398, 577241275, 1471733935, 610547355, 4027169054, 1432588573, 1507829418, 2025931657, 3646575487, 545086370, 48609733, 2200306550, 1653985193, 298326376, 1316178497, 3007786442, 2064951626, 458293330, 2589141269, 3591329599, 3164325604, 727753846, 2179363840, 146436021, 1461446943, 4069977195, 705550613, 3059967265, 3887724982, 4281599278, 3313849956, 1404054877, 2845806497, 146425753, 1854211946], [1266315497, 3048417604, 3681880366, 3289982499, 290971e4, 1235738493, 2632868024, 2414719590, 3970600049, 1771706367, 1449415276, 3266420449, 422970021, 1963543593, 2690192192, 3826793022, 1062508698, 1531092325, 1804592342, 2583117782, 2714934279, 4024971509, 1294809318, 4028980673, 1289560198, 2221992742, 1669523910, 35572830, 157838143, 1052438473, 1016535060, 1802137761, 1753167236, 1386275462, 3080475397, 2857371447, 1040679964, 2145300060, 2390574316, 1461121720, 2956646967, 4031777805, 4028374788, 33600511, 2920084762, 1018524850, 629373528, 3691585981, 3515945977, 2091462646, 2486323059, 586499841, 988145025, 935516892, 3367335476, 2599673255, 2839830854, 265290510, 3972581182, 2759138881, 3795373465, 1005194799, 847297441, 406762289, 1314163512, 1332590856, 1866599683, 4127851711, 750260880, 613907577, 1450815602, 3165620655, 3734664991, 3650291728, 3012275730, 3704569646, 1427272223, 778793252, 1343938022, 2676280711, 2052605720, 1946737175, 3164576444, 3914038668, 3967478842, 3682934266, 1661551462, 3294938066, 4011595847, 840292616, 3712170807, 616741398, 312560963, 711312465, 1351876610, 322626781, 1910503582, 271666773, 2175563734, 1594956187, 70604529, 3617834859, 1007753275, 1495573769, 4069517037, 2549218298, 2663038764, 504708206, 2263041392, 3941167025, 2249088522, 1514023603, 1998579484, 1312622330, 694541497, 2582060303, 2151582166, 1382467621, 776784248, 2618340202, 3323268794, 2497899128, 2784771155, 503983604, 4076293799, 907881277, 423175695, 432175456, 1378068232, 4145222326, 3954048622, 3938656102, 3820766613, 2793130115, 2977904593, 26017576, 3274890735, 3194772133, 1700274565, 1756076034, 4006520079, 3677328699, 720338349, 1533947780, 354530856, 688349552, 3973924725, 1637815568, 332179504, 3949051286, 53804574, 2852348879, 3044236432, 1282449977, 3583942155, 3416972820, 4006381244, 1617046695, 2628476075, 3002303598, 1686838959, 431878346, 2686675385, 1700445008, 1080580658, 1009431731, 832498133, 3223435511, 2605976345, 2271191193, 2516031870, 1648197032, 4164389018, 2548247927, 300782431, 375919233, 238389289, 3353747414, 2531188641, 2019080857, 1475708069, 455242339, 2609103871, 448939670, 3451063019, 1395535956, 2413381860, 1841049896, 1491858159, 885456874, 4264095073, 4001119347, 1565136089, 3898914787, 1108368660, 540939232, 1173283510, 2745871338, 3681308437, 4207628240, 3343053890, 4016749493, 1699691293, 1103962373, 3625875870, 2256883143, 3830138730, 1031889488, 3479347698, 1535977030, 4236805024, 3251091107, 2132092099, 1774941330, 1199868427, 1452454533, 157007616, 2904115357, 342012276, 595725824, 1480756522, 206960106, 497939518, 591360097, 863170706, 2375253569, 3596610801, 1814182875, 2094937945, 3421402208, 1082520231, 3463918190, 2785509508, 435703966, 3908032597, 1641649973, 2842273706, 3305899714, 1510255612, 2148256476, 2655287854, 3276092548, 4258621189, 236887753, 3681803219, 274041037, 1734335097, 3815195456, 3317970021, 1899903192, 1026095262, 4050517792, 356393447, 2410691914, 3873677099, 3682840055], [3913112168, 2491498743, 4132185628, 2489919796, 1091903735, 1979897079, 3170134830, 3567386728, 3557303409, 857797738, 1136121015, 1342202287, 507115054, 2535736646, 337727348, 3213592640, 1301675037, 2528481711, 1895095763, 1721773893, 3216771564, 62756741, 2142006736, 835421444, 2531993523, 1442658625, 3659876326, 2882144922, 676362277, 1392781812, 170690266, 3921047035, 1759253602, 3611846912, 1745797284, 664899054, 1329594018, 3901205900, 3045908486, 2062866102, 2865634940, 3543621612, 3464012697, 1080764994, 553557557, 3656615353, 3996768171, 991055499, 499776247, 1265440854, 648242737, 3940784050, 980351604, 3713745714, 1749149687, 3396870395, 4211799374, 3640570775, 1161844396, 3125318951, 1431517754, 545492359, 4268468663, 3499529547, 1437099964, 2702547544, 3433638243, 2581715763, 2787789398, 1060185593, 1593081372, 2418618748, 4260947970, 69676912, 2159744348, 86519011, 2512459080, 3838209314, 1220612927, 3339683548, 133810670, 1090789135, 1078426020, 1569222167, 845107691, 3583754449, 4072456591, 1091646820, 628848692, 1613405280, 3757631651, 526609435, 236106946, 48312990, 2942717905, 3402727701, 1797494240, 859738849, 992217954, 4005476642, 2243076622, 3870952857, 3732016268, 765654824, 3490871365, 2511836413, 1685915746, 3888969200, 1414112111, 2273134842, 3281911079, 4080962846, 172450625, 2569994100, 980381355, 4109958455, 2819808352, 2716589560, 2568741196, 3681446669, 3329971472, 1835478071, 660984891, 3704678404, 4045999559, 3422617507, 3040415634, 1762651403, 1719377915, 3470491036, 2693910283, 3642056355, 3138596744, 1364962596, 2073328063, 1983633131, 926494387, 3423689081, 2150032023, 4096667949, 1749200295, 3328846651, 309677260, 2016342300, 1779581495, 3079819751, 111262694, 1274766160, 443224088, 298511866, 1025883608, 3806446537, 1145181785, 168956806, 3641502830, 3584813610, 1689216846, 3666258015, 3200248200, 1692713982, 2646376535, 4042768518, 1618508792, 1610833997, 3523052358, 4130873264, 2001055236, 3610705100, 2202168115, 4028541809, 2961195399, 1006657119, 2006996926, 3186142756, 1430667929, 3210227297, 1314452623, 4074634658, 4101304120, 2273951170, 1399257539, 3367210612, 3027628629, 1190975929, 2062231137, 2333990788, 2221543033, 2438960610, 1181637006, 548689776, 2362791313, 3372408396, 3104550113, 3145860560, 296247880, 1970579870, 3078560182, 3769228297, 1714227617, 3291629107, 3898220290, 166772364, 1251581989, 493813264, 448347421, 195405023, 2709975567, 677966185, 3703036547, 1463355134, 2715995803, 1338867538, 1343315457, 2802222074, 2684532164, 233230375, 2599980071, 2000651841, 3277868038, 1638401717, 4028070440, 3237316320, 6314154, 819756386, 300326615, 590932579, 1405279636, 3267499572, 3150704214, 2428286686, 3959192993, 3461946742, 1862657033, 1266418056, 963775037, 2089974820, 2263052895, 1917689273, 448879540, 3550394620, 3981727096, 150775221, 3627908307, 1303187396, 508620638, 2975983352, 2726630617, 1817252668, 1876281319, 1457606340, 908771278, 3720792119, 3617206836, 2455994898, 1729034894, 1080033504], [976866871, 3556439503, 2881648439, 1522871579, 1555064734, 1336096578, 3548522304, 2579274686, 3574697629, 3205460757, 3593280638, 3338716283, 3079412587, 564236357, 2993598910, 1781952180, 1464380207, 3163844217, 3332601554, 1699332808, 1393555694, 1183702653, 3581086237, 1288719814, 691649499, 2847557200, 2895455976, 3193889540, 2717570544, 1781354906, 1676643554, 2592534050, 3230253752, 1126444790, 2770207658, 2633158820, 2210423226, 2615765581, 2414155088, 3127139286, 673620729, 2805611233, 1269405062, 4015350505, 3341807571, 4149409754, 1057255273, 2012875353, 2162469141, 2276492801, 2601117357, 993977747, 3918593370, 2654263191, 753973209, 36408145, 2530585658, 25011837, 3520020182, 2088578344, 530523599, 2918365339, 1524020338, 1518925132, 3760827505, 3759777254, 1202760957, 3985898139, 3906192525, 674977740, 4174734889, 2031300136, 2019492241, 3983892565, 4153806404, 3822280332, 352677332, 2297720250, 60907813, 90501309, 3286998549, 1016092578, 2535922412, 2839152426, 457141659, 509813237, 4120667899, 652014361, 1966332200, 2975202805, 55981186, 2327461051, 676427537, 3255491064, 2882294119, 3433927263, 1307055953, 942726286, 933058658, 2468411793, 3933900994, 4215176142, 1361170020, 2001714738, 2830558078, 3274259782, 1222529897, 1679025792, 2729314320, 3714953764, 1770335741, 151462246, 3013232138, 1682292957, 1483529935, 471910574, 1539241949, 458788160, 3436315007, 1807016891, 3718408830, 978976581, 1043663428, 3165965781, 1927990952, 4200891579, 2372276910, 3208408903, 3533431907, 1412390302, 2931980059, 4132332400, 1947078029, 3881505623, 4168226417, 2941484381, 1077988104, 1320477388, 886195818, 18198404, 3786409e3, 2509781533, 112762804, 3463356488, 1866414978, 891333506, 18488651, 661792760, 1628790961, 3885187036, 3141171499, 876946877, 2693282273, 1372485963, 791857591, 2686433993, 3759982718, 3167212022, 3472953795, 2716379847, 445679433, 3561995674, 3504004811, 3574258232, 54117162, 3331405415, 2381918588, 3769707343, 4154350007, 1140177722, 4074052095, 668550556, 3214352940, 367459370, 261225585, 2610173221, 4209349473, 3468074219, 3265815641, 314222801, 3066103646, 3808782860, 282218597, 3406013506, 3773591054, 379116347, 1285071038, 846784868, 2669647154, 3771962079, 3550491691, 2305946142, 453669953, 1268987020, 3317592352, 3279303384, 3744833421, 2610507566, 3859509063, 266596637, 3847019092, 517658769, 3462560207, 3443424879, 370717030, 4247526661, 2224018117, 4143653529, 4112773975, 2788324899, 2477274417, 1456262402, 2901442914, 1517677493, 1846949527, 2295493580, 3734397586, 2176403920, 1280348187, 1908823572, 3871786941, 846861322, 1172426758, 3287448474, 3383383037, 1655181056, 3139813346, 901632758, 1897031941, 2986607138, 3066810236, 3447102507, 1393639104, 373351379, 950779232, 625454576, 3124240540, 4148612726, 2007998917, 544563296, 2244738638, 2330496472, 2058025392, 1291430526, 424198748, 50039436, 29584100, 3605783033, 2429876329, 2791104160, 1057563949, 3255363231, 3075367218, 3463963227, 1469046755, 985887462]], l3.prototype.PARRAY = [608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479, 2450970073, 2306472731], l3.prototype.NN = 16, l3.prototype._clean = function(t8) {
      if (t8 < 0) {
        t8 = (2147483647 & t8) + 2147483648;
      }
      return t8;
    }, l3.prototype._F = function(t8) {
      let i8;
      const e8 = 255 & t8, n8 = 255 & (t8 >>>= 8), s8 = 255 & (t8 >>>= 8), o8 = 255 & (t8 >>>= 8);
      return i8 = this.sboxes[0][o8] + this.sboxes[1][s8], i8 ^= this.sboxes[2][n8], i8 += this.sboxes[3][e8], i8;
    }, l3.prototype._encryptBlock = function(t8) {
      let i8, e8 = t8[0], n8 = t8[1];
      for (i8 = 0; i8 < this.NN; ++i8) {
        e8 ^= this.parray[i8], n8 = this._F(e8) ^ n8;
        const t9 = e8;
        e8 = n8, n8 = t9;
      }
      e8 ^= this.parray[this.NN + 0], n8 ^= this.parray[this.NN + 1], t8[0] = this._clean(n8), t8[1] = this._clean(e8);
    }, l3.prototype.encryptBlock = function(t8) {
      let i8;
      const e8 = [0, 0], n8 = this.BLOCKSIZE / 2;
      for (i8 = 0; i8 < this.BLOCKSIZE / 2; ++i8) e8[0] = e8[0] << 8 | 255 & t8[i8 + 0], e8[1] = e8[1] << 8 | 255 & t8[i8 + n8];
      this._encryptBlock(e8);
      const s8 = [];
      for (i8 = 0; i8 < this.BLOCKSIZE / 2; ++i8) s8[i8 + 0] = e8[0] >>> 24 - 8 * i8 & 255, s8[i8 + n8] = e8[1] >>> 24 - 8 * i8 & 255;
      return s8;
    }, l3.prototype._decryptBlock = function(t8) {
      let i8, e8 = t8[0], n8 = t8[1];
      for (i8 = this.NN + 1; i8 > 1; --i8) {
        e8 ^= this.parray[i8], n8 = this._F(e8) ^ n8;
        const t9 = e8;
        e8 = n8, n8 = t9;
      }
      e8 ^= this.parray[1], n8 ^= this.parray[0], t8[0] = this._clean(n8), t8[1] = this._clean(e8);
    }, l3.prototype.init = function(t8) {
      let i8, e8 = 0;
      for (this.parray = [], i8 = 0; i8 < this.NN + 2; ++i8) {
        let n9 = 0;
        for (let i9 = 0; i9 < 4; ++i9) n9 = n9 << 8 | 255 & t8[e8], ++e8 >= t8.length && (e8 = 0);
        this.parray[i8] = this.PARRAY[i8] ^ n9;
      }
      for (this.sboxes = [], i8 = 0; i8 < 4; ++i8) for (this.sboxes[i8] = [], e8 = 0; e8 < 256; ++e8) this.sboxes[i8][e8] = this.SBOXES[i8][e8];
      const n8 = [0, 0];
      for (i8 = 0; i8 < this.NN + 2; i8 += 2) this._encryptBlock(n8), this.parray[i8 + 0] = n8[0], this.parray[i8 + 1] = n8[1];
      for (i8 = 0; i8 < 4; ++i8) for (e8 = 0; e8 < 256; e8 += 2) this._encryptBlock(n8), this.sboxes[i8][e8 + 0] = n8[0], this.sboxes[i8][e8 + 1] = n8[1];
    }, u4.keySize = u4.prototype.keySize = 16, u4.blockSize = u4.prototype.blockSize = 8;
    y4 = new Map(Object.entries({ tripledes: e3, cast5: s3, twofish: f3, blowfish: u4 }));
  }
});

// node_modules/openpgp/dist/lightweight/noble_post_quantum.min.mjs
var noble_post_quantum_min_exports = {};
__export(noble_post_quantum_min_exports, {
  ml_dsa65: () => Ie2,
  ml_kem768: () => se2
});
function t4(e8) {
  if (!Number.isSafeInteger(e8) || e8 < 0) throw Error("positive integer expected, got " + e8);
}
function n4(e8, ...t8) {
  if (!((n8 = e8) instanceof Uint8Array || ArrayBuffer.isView(n8) && "Uint8Array" === n8.constructor.name)) throw Error("Uint8Array expected");
  var n8;
  if (t8.length > 0 && !t8.includes(e8.length)) throw Error("Uint8Array expected of length " + t8 + ", got length=" + e8.length);
}
function r4(e8, t8 = true) {
  if (e8.destroyed) throw Error("Hash instance has been destroyed");
  if (t8 && e8.finished) throw Error("Hash#digest() has already been called");
}
function c4(e8, t8 = false) {
  return t8 ? { h: Number(e8 & o4), l: Number(e8 >> s4 & o4) } : { h: 0 | Number(e8 >> s4 & o4), l: 0 | Number(e8 & o4) };
}
function i4(e8, t8 = false) {
  let n8 = new Uint32Array(e8.length), r8 = new Uint32Array(e8.length);
  for (let o8 = 0; o8 < e8.length; o8++) {
    const { h: s8, l: i8 } = c4(e8[o8], t8);
    [n8[o8], r8[o8]] = [s8, i8];
  }
  return [n8, r8];
}
function d4(e8) {
  for (let n8 = 0; n8 < e8.length; n8++) e8[n8] = (t8 = e8[n8]) << 24 & 4278190080 | t8 << 8 & 16711680 | t8 >>> 8 & 65280 | t8 >>> 24 & 255;
  var t8;
}
function a4(e8) {
  return "string" == typeof e8 && (e8 = (function(e9) {
    if ("string" != typeof e9) throw Error("utf8ToBytes expected string, got " + typeof e9);
    return new Uint8Array(new TextEncoder().encode(e9));
  })(e8)), n4(e8), e8;
}
function R4(e8, t8) {
  if (e8.length !== t8.length) return false;
  let n8 = 0;
  for (let r8 = 0; r8 < e8.length; r8++) n8 |= e8[r8] ^ t8[r8];
  return 0 === n8;
}
function _4(...e8) {
  const t8 = (e9) => "number" == typeof e9 ? e9 : e9.bytesLen, n8 = e8.reduce(((e9, n9) => e9 + t8(n9)), 0);
  return { bytesLen: n8, encode: (r8) => {
    const o8 = new Uint8Array(n8);
    for (let n9 = 0, s8 = 0; n9 < e8.length; n9++) {
      const c7 = e8[n9], i8 = t8(c7), u8 = "number" == typeof c7 ? r8[n9] : c7.encode(r8[n9]);
      N4(u8, i8), o8.set(u8, s8), "number" != typeof c7 && u8.fill(0), s8 += i8;
    }
    return o8;
  }, decode: (r8) => {
    N4(r8, n8);
    const o8 = [];
    for (const n9 of e8) {
      const e9 = t8(n9), s8 = r8.subarray(0, e9);
      o8.push("number" == typeof n9 ? s8 : n9.decode(s8)), r8 = r8.subarray(e9);
    }
    return o8;
  } };
}
function H5(e8, t8) {
  const n8 = t8 * e8.bytesLen;
  return { bytesLen: n8, encode: (r8) => {
    if (r8.length !== t8) throw Error(`vecCoder.encode: wrong length=${r8.length}. Expected: ${t8}`);
    const o8 = new Uint8Array(n8);
    for (let t9 = 0, n9 = 0; t9 < r8.length; t9++) {
      const s8 = e8.encode(r8[t9]);
      o8.set(s8, n9), s8.fill(0), n9 += s8.length;
    }
    return o8;
  }, decode: (t9) => {
    N4(t9, n8);
    const r8 = [];
    for (let n9 = 0; n9 < t9.length; n9 += e8.bytesLen) r8.push(e8.decode(t9.subarray(n9, n9 + e8.bytesLen)));
    return r8;
  } };
}
function C5(...e8) {
  for (const t8 of e8) if (Array.isArray(t8)) for (const e9 of t8) e9.fill(0);
  else t8.fill(0);
}
function X3(e8) {
  return (1 << e8) - 1;
}
function G5(e8, t8 = 8) {
  const n8 = e8.toString(2).padStart(8, "0").slice(-t8).padStart(7, "0").split("").reverse().join("");
  return Number.parseInt(n8, 2);
}
function J4(e8, t8) {
  for (let n8 = 0; n8 < Q3; n8++) e8[n8] = j5(e8[n8] + t8[n8]);
}
function ee2(e8, t8) {
  for (let c7 = 0; c7 < 128; c7++) {
    let i8 = W3[64 + (c7 >> 1)];
    1 & c7 && (i8 = -i8);
    const { c0: u8, c1: l6 } = (n8 = e8[2 * c7 + 0], r8 = e8[2 * c7 + 1], o8 = t8[2 * c7 + 0], s8 = t8[2 * c7 + 1], { c0: j5(r8 * s8 * i8 + n8 * o8), c1: j5(n8 * s8 + r8 * o8) });
    e8[2 * c7 + 0] = u8, e8[2 * c7 + 1] = l6;
  }
  var n8, r8, o8, s8;
  return e8;
}
function te2(e8) {
  const t8 = new Uint16Array(Q3);
  for (let n8 = 0; n8 < Q3; ) {
    const r8 = e8();
    if (r8.length % 3) throw Error("SampleNTT: unaligned block");
    for (let e9 = 0; n8 < Q3 && e9 + 3 <= r8.length; e9 += 3) {
      const o8 = 4095 & (r8[e9 + 0] | r8[e9 + 1] << 8), s8 = 4095 & (r8[e9 + 1] >> 4 | r8[e9 + 2] << 4);
      o8 < V4 && (t8[n8++] = o8), n8 < Q3 && s8 < V4 && (t8[n8++] = s8);
    }
  }
  return t8;
}
function ne2(e8, t8, n8, r8) {
  const o8 = e8(r8 * Q3 / 4, t8, n8), s8 = new Uint16Array(Q3), c7 = l4(o8);
  let i8 = 0;
  for (let e9 = 0, t9 = 0, n9 = 0, o9 = 0; e9 < c7.length; e9++) {
    let u8 = c7[e9];
    for (let e10 = 0; e10 < 32; e10++) n9 += 1 & u8, u8 >>= 1, i8 += 1, i8 === r8 ? (o9 = n9, n9 = 0) : i8 === 2 * r8 && (s8[t9++] = j5(o9 - n9), n9 = 0, i8 = 0);
  }
  if (i8) throw Error("sampleCBD: leftover bits: " + i8);
  return s8;
}
function oe2(e8) {
  const t8 = re2(e8), { HASH256: n8, HASH512: r8, KDF: o8 } = e8, { secretCoder: s8, cipherTextLen: c7 } = t8, i8 = t8.publicKeyLen, u8 = _4(t8.secretKeyLen, t8.publicKeyLen, 32, 32), l6 = u8.bytesLen;
  return { publicKeyLen: i8, msgLen: 32, keygen: (e9 = S4(64)) => {
    N4(e9, 64);
    const { publicKey: r9, secretKey: o9 } = t8.keygen(e9.subarray(0, 32)), s9 = n8(r9), c8 = u8.encode([o9, r9, s9, e9.subarray(32)]);
    return C5(o9, s9), { publicKey: r9, secretKey: c8 };
  }, encapsulate: (o9, c8 = S4(32)) => {
    N4(o9, i8), N4(c8, 32);
    const u9 = o9.subarray(0, 384 * e8.K), l7 = s8.encode(s8.decode(u9.slice()));
    if (!R4(l7, u9)) throw C5(l7), Error("ML-KEM.encapsulate: wrong publicKey modulus");
    C5(l7);
    const f8 = r8.create().update(c8).update(n8(o9)).digest(), d6 = t8.encrypt(o9, c8, f8.subarray(32, 64));
    return f8.subarray(32).fill(0), { cipherText: d6, sharedSecret: f8.subarray(0, 32) };
  }, decapsulate: (e9, n9) => {
    N4(n9, l6), N4(e9, c7);
    const [s9, i9, f8, d6] = u8.decode(n9), a8 = t8.decrypt(e9, s9), h7 = r8.create().update(a8).update(f8).digest(), y8 = h7.subarray(0, 32), p5 = t8.encrypt(i9, a8, h7.subarray(32, 64)), g7 = R4(e9, p5), b6 = o8.create({ dkLen: 32 }).update(d6).update(e9).digest();
    return C5(a8, p5, g7 ? b6 : y8), g7 ? y8 : b6;
  } };
}
function Te2(e8) {
  const t8 = de2(ce2);
  for (let n8 = 0; n8 < ce2; ) {
    const r8 = e8();
    if (r8.length % 3) throw Error("RejNTTPoly: unaligned block");
    for (let e9 = 0; n8 < ce2 && e9 <= r8.length - 3; e9 += 3) {
      const o8 = 8388607 & (r8[e9 + 0] | r8[e9 + 1] << 8 | r8[e9 + 2] << 16);
      o8 < ie2 && (t8[n8++] = o8);
    }
  }
  return t8;
}
function me2(e8) {
  const { K: t8, L: r8, GAMMA1: o8, GAMMA2: s8, TAU: c7, ETA: i8, OMEGA: u8 } = e8, { CRH_BYTES: l6, TR_BYTES: f8, C_TILDE_BYTES: d6, XOF128: a8, XOF256: h7 } = e8;
  if (![2, 4].includes(i8)) throw Error("Wrong ETA");
  if (![1 << 17, 1 << 19].includes(o8)) throw Error("Wrong GAMMA1");
  if (![ue2, le2].includes(s8)) throw Error("Wrong GAMMA2");
  const y8 = c7 * i8, p5 = (e9) => {
    const t9 = ae2(e9), n8 = 0 | he2(t9, 2 * s8);
    if (t9 - n8 == ie2 - 1) return { r1: 0, r0: n8 - 1 | 0 };
    return { r1: 0 | Math.floor((t9 - n8) / (2 * s8)), r0: n8 };
  }, g7 = (e9) => p5(e9).r1, b6 = (e9) => p5(e9).r0, w8 = (e9, t9) => {
    const n8 = Math.floor((ie2 - 1) / (2 * s8)), { r1: r9, r0: o9 } = p5(t9);
    return 1 === e9 ? o9 > 0 ? 0 | ae2(r9 + 1, n8) : 0 | ae2(r9 - 1, n8) : 0 | r9;
  }, A8 = (e9) => {
    const t9 = ae2(e9), n8 = 0 | he2(t9, 8192);
    return { r1: 0 | Math.floor((t9 - n8) / 8192), r0: n8 };
  }, L5 = { bytesLen: u8 + t8, encode: (e9) => {
    if (false === e9) throw Error("hint.encode: hint is false");
    const n8 = new Uint8Array(u8 + t8);
    for (let r9 = 0, o9 = 0; r9 < t8; r9++) {
      for (let t9 = 0; t9 < ce2; t9++) 0 !== e9[r9][t9] && (n8[o9++] = t9);
      n8[u8 + r9] = o9;
    }
    return n8;
  }, decode: (e9) => {
    const n8 = [];
    let r9 = 0;
    for (let o9 = 0; o9 < t8; o9++) {
      const t9 = de2(ce2);
      if (e9[u8 + o9] < r9 || e9[u8 + o9] > u8) return false;
      for (let n9 = r9; n9 < e9[u8 + o9]; n9++) {
        if (n9 > r9 && e9[n9] <= e9[n9 - 1]) return false;
        t9[e9[n9]] = 1;
      }
      r9 = e9[u8 + o9], n8.push(t9);
    }
    for (let t9 = r9; t9 < u8; t9++) if (0 !== e9[t9]) return false;
    return n8;
  } }, k7 = be2(2 === i8 ? 3 : 4, ((e9) => i8 - e9), ((e9) => {
    if (!(-i8 <= e9 && e9 <= i8)) throw Error(`malformed key s1/s3 ${e9} outside of ETA range [${-i8}, ${i8}]`);
    return e9;
  })), E8 = be2(13, ((e9) => 4096 - e9)), T6 = be2(10), U8 = be2(o8 === 1 << 17 ? 18 : 20, ((e9) => he2(o8 - e9))), m6 = H5(be2(s8 === ue2 ? 6 : 4), t8), I8 = _4(32, H5(T6, t8)), O6 = _4(32, 32, f8, H5(k7, r8), H5(k7, t8), H5(E8, t8)), B7 = _4(d6, H5(U8, r8), L5), K7 = 2 === i8 ? (e9) => e9 < 15 && 2 - e9 % 5 : (e9) => e9 < 9 && 4 - e9;
  function x7(e9) {
    const t9 = de2(ce2);
    for (let n8 = 0; n8 < ce2; ) {
      const r9 = e9();
      for (let e10 = 0; n8 < ce2 && e10 < r9.length; e10 += 1) {
        const o9 = K7(15 & r9[e10]), s9 = K7(r9[e10] >> 4 & 15);
        false !== o9 && (t9[n8++] = o9), n8 < ce2 && false !== s9 && (t9[n8++] = s9);
      }
    }
    return t9;
  }
  const M8 = (e9) => {
    const t9 = de2(ce2), n8 = v5.create({}).update(e9), r9 = new Uint8Array(v5.blockLen);
    n8.xofInto(r9);
    const o9 = r9.slice(0, 8);
    for (let e10 = ce2 - c7, s9 = 8, i9 = 0, u9 = 0; e10 < ce2; e10++) {
      let c8 = e10 + 1;
      for (; c8 > e10; ) c8 = r9[s9++], s9 < v5.blockLen || (n8.xofInto(r9), s9 = 0);
      t9[e10] = t9[c8], t9[c8] = 1 - ((o9[i9] >> u9++ & 1) << 1), u9 >= 8 && (i9++, u9 = 0);
    }
    return t9;
  }, F7 = (e9) => {
    const t9 = de2(ce2), n8 = de2(ce2);
    for (let r9 = 0; r9 < e9.length; r9++) {
      const { r0: o9, r1: s9 } = A8(e9[r9]);
      t9[r9] = o9, n8[r9] = s9;
    }
    return { r0: t9, r1: n8 };
  }, X5 = (e9, t9) => {
    for (let n8 = 0; n8 < ce2; n8++) e9[n8] = w8(t9[n8], e9[n8]);
    return e9;
  }, G7 = (e9, t9) => {
    const n8 = de2(ce2);
    let r9 = 0;
    for (let i9 = 0; i9 < ce2; i9++) {
      const u9 = (o9 = e9[i9], c8 = t9[i9], o9 <= s8 || o9 > ie2 - s8 || o9 === ie2 - s8 && 0 === c8 ? 0 : 1);
      n8[i9] = u9, r9 += u9;
    }
    var o9, c8;
    return { v: n8, cnt: r9 };
  }, Y5 = _4(32, 64, 32), D8 = { signRandBytes: 32, keygen: (e9 = S4(32)) => {
    const n8 = new Uint8Array(34);
    n8.set(e9), n8[32] = t8, n8[33] = r8;
    const [o9, s9, c8] = Y5.decode(v5(n8, { dkLen: Y5.bytesLen })), i9 = h7(s9), u9 = [];
    for (let e10 = 0; e10 < r8; e10++) u9.push(x7(i9.get(255 & e10, e10 >> 8 & 255)));
    const l7 = [];
    for (let e10 = r8; e10 < r8 + t8; e10++) l7.push(x7(i9.get(255 & e10, e10 >> 8 & 255)));
    const d7 = u9.map(((e10) => ye2.encode(e10.slice()))), y9 = [], p6 = [], g8 = a8(o9), b7 = de2(ce2);
    for (let e10 = 0; e10 < t8; e10++) {
      b7.fill(0);
      for (let t10 = 0; t10 < r8; t10++) {
        const n10 = Te2(g8.get(t10, e10));
        we2(b7, Ee2(n10, d7[t10]));
      }
      ye2.decode(b7);
      const { r0: t9, r1: n9 } = F7(we2(b7, l7[e10]));
      y9.push(t9), p6.push(n9);
    }
    const w9 = I8.encode([o9, p6]), A9 = v5(w9, { dkLen: f8 }), L6 = O6.encode([o9, c8, A9, u9, l7, y9]);
    return g8.clean(), i9.clean(), C5(o9, s9, c8, u9, l7, d7, b7, y9, p6, A9, n8), { publicKey: w9, secretKey: L6 };
  }, sign: (e9, n8, c8) => {
    const [i9, f9, p6, w9, A9, L6] = O6.decode(e9), k8 = [], E9 = a8(i9);
    for (let e10 = 0; e10 < t8; e10++) {
      const t9 = [];
      for (let n9 = 0; n9 < r8; n9++) t9.push(Te2(E9.get(n9, e10)));
      k8.push(t9);
    }
    E9.clean();
    for (let e10 = 0; e10 < r8; e10++) ye2.encode(w9[e10]);
    for (let e10 = 0; e10 < t8; e10++) ye2.encode(A9[e10]), ye2.encode(L6[e10]);
    const T7 = v5.create({ dkLen: l6 }).update(p6).update(n8).digest(), I9 = c8 || new Uint8Array(32);
    N4(I9);
    const K8 = v5.create({ dkLen: l6 }).update(f9).update(I9).update(T7).digest();
    N4(K8, l6);
    const x8 = h7(K8, U8.bytesLen);
    e: for (let e10 = 0; ; ) {
      const n9 = [];
      for (let t9 = 0; t9 < r8; t9++, e10++) n9.push(U8.decode(x8.get(255 & e10, e10 >> 8)()));
      const c9 = n9.map(((e11) => ye2.encode(e11.slice()))), i10 = [];
      for (let e11 = 0; e11 < t8; e11++) {
        const t9 = de2(ce2);
        for (let n10 = 0; n10 < r8; n10++) we2(t9, Ee2(k8[e11][n10], c9[n10]));
        ye2.decode(t9), i10.push(t9);
      }
      const l7 = i10.map(((e11) => e11.map(g7))), f10 = v5.create({ dkLen: d6 }).update(T7).update(m6.encode(l7)).digest(), a9 = ye2.encode(M8(f10)), h8 = w9.map(((e11) => Ee2(e11, a9)));
      for (let e11 = 0; e11 < r8; e11++) if (we2(ye2.decode(h8[e11]), n9[e11]), ke2(h8[e11], o8 - y8)) continue e;
      let p7 = 0;
      const E10 = [];
      for (let e11 = 0; e11 < t8; e11++) {
        const t9 = ye2.decode(Ee2(A9[e11], a9)), n10 = Ae2(i10[e11], t9).map(b6);
        if (ke2(n10, s8 - y8)) continue e;
        const r9 = ye2.decode(Ee2(L6[e11], a9));
        if (ke2(r9, s8)) continue e;
        we2(n10, r9);
        const o9 = G7(n10, l7[e11]);
        E10.push(o9.v), p7 += o9.cnt;
      }
      if (p7 > u8) continue;
      x8.clean();
      const I10 = B7.encode([f10, h8, E10]);
      return C5(f10, h8, E10, a9, l7, i10, c9, n9, K8, T7, w9, A9, L6, ...k8), I10;
    }
    throw Error("Unreachable code path reached, report this error");
  }, verify: (e9, n8, s9) => {
    const [c8, i9] = I8.decode(e9), h8 = v5(e9, { dkLen: f8 });
    if (s9.length !== B7.bytesLen) return false;
    const [p6, g8, b7] = B7.decode(s9);
    if (false === b7) return false;
    for (let e10 = 0; e10 < r8; e10++) if (ke2(g8[e10], o8 - y8)) return false;
    const w9 = v5.create({ dkLen: l6 }).update(h8).update(n8).digest(), A9 = ye2.encode(M8(p6)), L6 = g8.map(((e10) => e10.slice()));
    for (let e10 = 0; e10 < r8; e10++) ye2.encode(L6[e10]);
    const k8 = [], E9 = a8(c8);
    for (let e10 = 0; e10 < t8; e10++) {
      const t9 = Ee2(ye2.encode(Le(i9[e10])), A9), n9 = de2(ce2);
      for (let t10 = 0; t10 < r8; t10++) {
        const r9 = Te2(E9.get(t10, e10));
        we2(n9, Ee2(r9, L6[t10]));
      }
      const o9 = ye2.decode(Ae2(n9, t9));
      k8.push(X5(o9, b7[e10]));
    }
    E9.clean();
    const T7 = v5.create({ dkLen: d6 }).update(w9).update(m6.encode(k8)).digest();
    for (const e10 of b7) {
      if (!(e10.reduce(((e11, t9) => e11 + t9), 0) <= u8)) return false;
    }
    for (const e10 of g8) if (ke2(e10, o8 - y8)) return false;
    return R4(p6, T7);
  } }, P6 = (e9, t9 = Ue2) => {
    if (N4(e9), N4(t9), t9.length > 255) throw Error("context should be less than 255 bytes");
    return (function(...e10) {
      let t10 = 0;
      for (let r10 = 0; r10 < e10.length; r10++) {
        const o9 = e10[r10];
        n4(o9), t10 += o9.length;
      }
      const r9 = new Uint8Array(t10);
      for (let t11 = 0, n8 = 0; t11 < e10.length; t11++) {
        const o9 = e10[t11];
        r9.set(o9, n8), n8 += o9.length;
      }
      return r9;
    })(new Uint8Array([0, t9.length]), t9, e9);
  };
  return { internal: D8, keygen: D8.keygen, signRandBytes: D8.signRandBytes, sign: (e9, t9, n8 = Ue2, r9) => {
    const o9 = P6(t9, n8), s9 = D8.sign(e9, o9, r9);
    return o9.fill(0), s9;
  }, verify: (e9, t9, n8, r9 = Ue2) => D8.verify(e9, P6(t9, r9), n8) };
}
var e4, o4, s4, u5, l4, f4, h4, y5, p3, g4, b4, w5, A5, L3, k5, E5, T4, U5, m4, I5, O4, B4, K4, x5, M5, F5, v5, N4, S4, Y3, D5, P4, $3, Q3, V4, j5, W3, Z3, q5, z5, re2, se2, ce2, ie2, ue2, le2, fe2, de2, ae2, he2, ye2, pe2, ge2, be2, we2, Ae2, Le, ke2, Ee2, Ue2, Ie2;
var init_noble_post_quantum_min = __esm({
  "node_modules/openpgp/dist/lightweight/noble_post_quantum.min.mjs"() {
    e4 = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    o4 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
    s4 = /* @__PURE__ */ BigInt(32);
    u5 = "object" == typeof e4 && "crypto" in e4 ? e4.crypto : void 0;
    l4 = (e8) => new Uint32Array(e8.buffer, e8.byteOffset, Math.floor(e8.byteLength / 4));
    f4 = /* @__PURE__ */ (() => 68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0])();
    h4 = class {
      clone() {
        return this._cloneInto();
      }
    };
    y5 = [];
    p3 = [];
    g4 = [];
    b4 = /* @__PURE__ */ BigInt(0);
    w5 = /* @__PURE__ */ BigInt(1);
    A5 = /* @__PURE__ */ BigInt(2);
    L3 = /* @__PURE__ */ BigInt(7);
    k5 = /* @__PURE__ */ BigInt(256);
    E5 = /* @__PURE__ */ BigInt(113);
    for (let e8 = 0, t8 = w5, n8 = 1, r8 = 0; e8 < 24; e8++) {
      [n8, r8] = [r8, (2 * n8 + 3 * r8) % 5], y5.push(2 * (5 * r8 + n8)), p3.push((e8 + 1) * (e8 + 2) / 2 % 64);
      let o8 = b4;
      for (let e9 = 0; e9 < 7; e9++) t8 = (t8 << w5 ^ (t8 >> L3) * E5) % k5, t8 & A5 && (o8 ^= w5 << (w5 << /* @__PURE__ */ BigInt(e9)) - w5);
      g4.push(o8);
    }
    [T4, U5] = /* @__PURE__ */ i4(g4, true);
    m4 = (e8, t8, n8) => n8 > 32 ? ((e9, t9, n9) => t9 << n9 - 32 | e9 >>> 64 - n9)(e8, t8, n8) : ((e9, t9, n9) => e9 << n9 | t9 >>> 32 - n9)(e8, t8, n8);
    I5 = (e8, t8, n8) => n8 > 32 ? ((e9, t9, n9) => e9 << n9 - 32 | t9 >>> 64 - n9)(e8, t8, n8) : ((e9, t9, n9) => t9 << n9 | e9 >>> 32 - n9)(e8, t8, n8);
    O4 = class _O extends h4 {
      constructor(e8, n8, r8, o8 = false, s8 = 24) {
        if (super(), this.blockLen = e8, this.suffix = n8, this.outputLen = r8, this.enableXOF = o8, this.rounds = s8, this.pos = 0, this.posOut = 0, this.finished = false, this.destroyed = false, t4(r8), 0 >= this.blockLen || this.blockLen >= 200) throw Error("Sha3 supports only keccak-f1600 function");
        this.state = new Uint8Array(200), this.state32 = l4(this.state);
      }
      keccak() {
        f4 || d4(this.state32), (function(e8, t8 = 24) {
          const n8 = new Uint32Array(10);
          for (let r8 = 24 - t8; r8 < 24; r8++) {
            for (let t10 = 0; t10 < 10; t10++) n8[t10] = e8[t10] ^ e8[t10 + 10] ^ e8[t10 + 20] ^ e8[t10 + 30] ^ e8[t10 + 40];
            for (let t10 = 0; t10 < 10; t10 += 2) {
              const r9 = (t10 + 8) % 10, o9 = (t10 + 2) % 10, s8 = n8[o9], c7 = n8[o9 + 1], i8 = m4(s8, c7, 1) ^ n8[r9], u8 = I5(s8, c7, 1) ^ n8[r9 + 1];
              for (let n9 = 0; n9 < 50; n9 += 10) e8[t10 + n9] ^= i8, e8[t10 + n9 + 1] ^= u8;
            }
            let t9 = e8[2], o8 = e8[3];
            for (let n9 = 0; n9 < 24; n9++) {
              const r9 = p3[n9], s8 = m4(t9, o8, r9), c7 = I5(t9, o8, r9), i8 = y5[n9];
              t9 = e8[i8], o8 = e8[i8 + 1], e8[i8] = s8, e8[i8 + 1] = c7;
            }
            for (let t10 = 0; t10 < 50; t10 += 10) {
              for (let r9 = 0; r9 < 10; r9++) n8[r9] = e8[t10 + r9];
              for (let r9 = 0; r9 < 10; r9++) e8[t10 + r9] ^= ~n8[(r9 + 2) % 10] & n8[(r9 + 4) % 10];
            }
            e8[0] ^= T4[r8], e8[1] ^= U5[r8];
          }
          n8.fill(0);
        })(this.state32, this.rounds), f4 || d4(this.state32), this.posOut = 0, this.pos = 0;
      }
      update(e8) {
        r4(this);
        const { blockLen: t8, state: n8 } = this, o8 = (e8 = a4(e8)).length;
        for (let r8 = 0; r8 < o8; ) {
          const s8 = Math.min(t8 - this.pos, o8 - r8);
          for (let t9 = 0; t9 < s8; t9++) n8[this.pos++] ^= e8[r8++];
          this.pos === t8 && this.keccak();
        }
        return this;
      }
      finish() {
        if (this.finished) return;
        this.finished = true;
        const { state: e8, suffix: t8, pos: n8, blockLen: r8 } = this;
        e8[n8] ^= t8, 128 & t8 && n8 === r8 - 1 && this.keccak(), e8[r8 - 1] ^= 128, this.keccak();
      }
      writeInto(e8) {
        r4(this, false), n4(e8), this.finish();
        const t8 = this.state, { blockLen: o8 } = this;
        for (let n8 = 0, r8 = e8.length; n8 < r8; ) {
          this.posOut >= o8 && this.keccak();
          const s8 = Math.min(o8 - this.posOut, r8 - n8);
          e8.set(t8.subarray(this.posOut, this.posOut + s8), n8), this.posOut += s8, n8 += s8;
        }
        return e8;
      }
      xofInto(e8) {
        if (!this.enableXOF) throw Error("XOF is not possible for this instance");
        return this.writeInto(e8);
      }
      xof(e8) {
        return t4(e8), this.xofInto(new Uint8Array(e8));
      }
      digestInto(e8) {
        if ((function(e9, t8) {
          n4(e9);
          const r8 = t8.outputLen;
          if (e9.length < r8) throw Error("digestInto() expects output buffer of length at least " + r8);
        })(e8, this), this.finished) throw Error("digest() was already called");
        return this.writeInto(e8), this.destroy(), e8;
      }
      digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
      }
      destroy() {
        this.destroyed = true, this.state.fill(0);
      }
      _cloneInto(e8) {
        const { blockLen: t8, suffix: n8, outputLen: r8, rounds: o8, enableXOF: s8 } = this;
        return e8 || (e8 = new _O(t8, n8, r8, s8, o8)), e8.state32.set(this.state32), e8.pos = this.pos, e8.posOut = this.posOut, e8.finished = this.finished, e8.rounds = o8, e8.suffix = n8, e8.outputLen = r8, e8.enableXOF = s8, e8.destroyed = this.destroyed, e8;
      }
    };
    B4 = (e8, t8, n8) => (function(e9) {
      const t9 = (t10) => e9().update(a4(t10)).digest(), n9 = e9();
      return t9.outputLen = n9.outputLen, t9.blockLen = n9.blockLen, t9.create = () => e9(), t9;
    })((() => new O4(t8, e8, n8)));
    K4 = /* @__PURE__ */ B4(6, 136, 32);
    x5 = /* @__PURE__ */ B4(6, 72, 64);
    M5 = (e8, t8, n8) => (function(e9) {
      const t9 = (t10, n10) => e9(n10).update(a4(t10)).digest(), n9 = e9({});
      return t9.outputLen = n9.outputLen, t9.blockLen = n9.blockLen, t9.create = (t10) => e9(t10), t9;
    })(((r8 = {}) => new O4(t8, e8, void 0 === r8.dkLen ? n8 : r8.dkLen, true)));
    F5 = /* @__PURE__ */ M5(31, 168, 16);
    v5 = /* @__PURE__ */ M5(31, 136, 32);
    N4 = n4;
    S4 = function(e8 = 32) {
      if (u5 && "function" == typeof u5.getRandomValues) return u5.getRandomValues(new Uint8Array(e8));
      if (u5 && "function" == typeof u5.randomBytes) return u5.randomBytes(e8);
      throw Error("crypto.getRandomValues must be defined");
    };
    Y3 = (e8) => {
      const { newPoly: t8, N: n8, Q: r8, F: o8, ROOT_OF_UNITY: s8, brvBits: c7, isKyber: i8 } = e8, u8 = (e9, t9 = r8) => {
        const n9 = e9 % t9 | 0;
        return 0 | (n9 >= 0 ? n9 : t9 + n9);
      };
      const l6 = (function() {
        const e9 = t8(n8);
        for (let t9 = 0; t9 < n8; t9++) {
          const n9 = G5(t9, c7), o9 = BigInt(s8) ** BigInt(n9) % BigInt(r8);
          e9[t9] = 0 | Number(o9);
        }
        return e9;
      })(), f8 = i8 ? 128 : n8, d6 = i8 ? 1 : 0, a8 = { encode: (e9) => {
        for (let t9 = 1, r9 = 128; r9 > d6; r9 >>= 1) for (let o9 = 0; o9 < n8; o9 += 2 * r9) {
          const n9 = l6[t9++];
          for (let t10 = o9; t10 < o9 + r9; t10++) {
            const o10 = u8(n9 * e9[t10 + r9]);
            e9[t10 + r9] = 0 | u8(e9[t10] - o10), e9[t10] = 0 | u8(e9[t10] + o10);
          }
        }
        return e9;
      }, decode: (e9) => {
        for (let t9 = f8 - 1, r9 = 1 + d6; r9 < f8 + d6; r9 <<= 1) for (let o9 = 0; o9 < n8; o9 += 2 * r9) {
          const n9 = l6[t9--];
          for (let t10 = o9; t10 < o9 + r9; t10++) {
            const o10 = e9[t10];
            e9[t10] = u8(o10 + e9[t10 + r9]), e9[t10 + r9] = u8(n9 * (e9[t10 + r9] - o10));
          }
        }
        for (let t9 = 0; t9 < e9.length; t9++) e9[t9] = u8(o8 * e9[t9]);
        return e9;
      } };
      return { mod: u8, smod: (e9, t9 = r8) => {
        const n9 = 0 | u8(e9, t9);
        return 0 | (n9 > t9 >> 1 ? n9 - t9 : n9);
      }, nttZetas: l6, NTT: a8, bitsCoder: (e9, r9) => {
        const o9 = X3(e9), s9 = e9 * (n8 / 8);
        return { bytesLen: s9, encode: (t9) => {
          const n9 = new Uint8Array(s9);
          for (let s10 = 0, c8 = 0, i9 = 0, u9 = 0; s10 < t9.length; s10++) for (c8 |= (r9.encode(t9[s10]) & o9) << i9, i9 += e9; i9 >= 8; i9 -= 8, c8 >>= 8) n9[u9++] = c8 & X3(i9);
          return n9;
        }, decode: (s10) => {
          const c8 = t8(n8);
          for (let t9 = 0, n9 = 0, i9 = 0, u9 = 0; t9 < s10.length; t9++) for (n9 |= s10[t9] << i9, i9 += 8; i9 >= e9; i9 -= e9, n9 >>= e9) c8[u9++] = r9.decode(n9 & o9);
          return c8;
        } };
      } };
    };
    D5 = (e8) => (t8, n8) => {
      n8 || (n8 = e8.blockLen);
      const r8 = new Uint8Array(t8.length + 2);
      r8.set(t8);
      const o8 = t8.length, s8 = new Uint8Array(n8);
      let c7 = e8.create({}), i8 = 0, u8 = 0;
      return { stats: () => ({ calls: i8, xofs: u8 }), get: (t9, n9) => (r8[o8 + 0] = t9, r8[o8 + 1] = n9, c7.destroy(), c7 = e8.create({}).update(r8), i8++, () => (u8++, c7.xofInto(s8))), clean: () => {
        c7.destroy(), s8.fill(0), r8.fill(0);
      } };
    };
    P4 = /* @__PURE__ */ D5(F5);
    $3 = /* @__PURE__ */ D5(v5);
    Q3 = 256;
    V4 = 3329;
    ({ mod: j5, nttZetas: W3, NTT: Z3, bitsCoder: q5 } = Y3({ N: Q3, Q: V4, F: 3303, ROOT_OF_UNITY: 17, newPoly: (e8) => new Uint16Array(e8), brvBits: 7, isKyber: true }));
    z5 = (e8) => q5(e8, ((e9) => {
      if (e9 >= 12) return { encode: (e10) => e10, decode: (e10) => e10 };
      const t8 = 2 ** (e9 - 1);
      return { encode: (t9) => ((t9 << e9) + V4 / 2) / V4, decode: (n8) => n8 * V4 + t8 >>> e9 };
    })(e8));
    re2 = (e8) => {
      const { K: t8, PRF: n8, XOF: r8, HASH512: o8, ETA1: s8, ETA2: c7, du: i8, dv: u8 } = e8, l6 = z5(1), f8 = z5(u8), d6 = z5(i8), a8 = _4(H5(z5(12), t8), 32), h7 = H5(z5(12), t8), y8 = _4(H5(d6, t8), f8), p5 = _4(32, 32);
      return { secretCoder: h7, secretKeyLen: h7.bytesLen, publicKeyLen: a8.bytesLen, cipherTextLen: y8.bytesLen, keygen: (e9) => {
        const c8 = new Uint8Array(33);
        c8.set(e9), c8[32] = t8;
        const i9 = o8(c8), [u9, l7] = p5.decode(i9), f9 = [], d7 = [];
        for (let e10 = 0; e10 < t8; e10++) f9.push(Z3.encode(ne2(n8, l7, e10, s8)));
        const y9 = r8(u9);
        for (let e10 = 0; e10 < t8; e10++) {
          const r9 = Z3.encode(ne2(n8, l7, t8 + e10, s8));
          for (let n9 = 0; n9 < t8; n9++) {
            J4(r9, ee2(te2(y9.get(n9, e10)), f9[n9]));
          }
          d7.push(r9);
        }
        y9.clean();
        const g7 = { publicKey: a8.encode([d7, u9]), secretKey: h7.encode(f9) };
        return C5(u9, l7, f9, d7, c8, i9), g7;
      }, encrypt: (e9, o9, i9) => {
        const [u9, f9] = a8.decode(e9), d7 = [];
        for (let e10 = 0; e10 < t8; e10++) d7.push(Z3.encode(ne2(n8, i9, e10, s8)));
        const h8 = r8(f9), p6 = new Uint16Array(Q3), g7 = [];
        for (let e10 = 0; e10 < t8; e10++) {
          const r9 = ne2(n8, i9, t8 + e10, c7), o10 = new Uint16Array(Q3);
          for (let n9 = 0; n9 < t8; n9++) {
            J4(o10, ee2(te2(h8.get(e10, n9)), d7[n9]));
          }
          J4(r9, Z3.decode(o10)), g7.push(r9), J4(p6, ee2(u9[e10], d7[e10])), o10.fill(0);
        }
        h8.clean();
        const b6 = ne2(n8, i9, 2 * t8, c7);
        J4(b6, Z3.decode(p6));
        const w8 = l6.decode(o9);
        return J4(w8, b6), C5(u9, d7, p6, b6), y8.encode([g7, w8]);
      }, decrypt: (e9, n9) => {
        const [r9, o9] = y8.decode(e9), s9 = h7.decode(n9), c8 = new Uint16Array(Q3);
        for (let e10 = 0; e10 < t8; e10++) J4(c8, ee2(s9[e10], Z3.encode(r9[e10])));
        return (function(e10, t9) {
          for (let n10 = 0; n10 < Q3; n10++) e10[n10] = j5(e10[n10] - t9[n10]);
        })(o9, Z3.decode(c8)), C5(c8, s9, r9), l6.encode(o9);
      } };
    };
    se2 = /* @__PURE__ */ oe2({ ...{ HASH256: K4, HASH512: x5, KDF: v5, XOF: P4, PRF: function(e8, t8, n8) {
      return v5.create({ dkLen: e8 }).update(t8).update(new Uint8Array([n8])).digest();
    } }, ...{ N: Q3, Q: V4, K: 3, ETA1: 2, ETA2: 2, du: 10, dv: 4, RBGstrength: 192 } });
    ce2 = 256;
    ie2 = 8380417;
    ue2 = 95232;
    le2 = 261888;
    fe2 = { K: 6, L: 5, D: 13, GAMMA1: 2 ** 19, GAMMA2: le2, TAU: 49, ETA: 4, OMEGA: 55 };
    de2 = (e8) => new Int32Array(e8);
    ({ mod: ae2, smod: he2, NTT: ye2, bitsCoder: pe2 } = Y3({ N: ce2, Q: ie2, F: 8347681, ROOT_OF_UNITY: 1753, newPoly: de2, isKyber: false, brvBits: 8 }));
    ge2 = (e8) => e8;
    be2 = (e8, t8 = ge2, n8 = ge2) => pe2(e8, { encode: (e9) => t8(n8(e9)), decode: (e9) => n8(t8(e9)) });
    we2 = (e8, t8) => {
      for (let n8 = 0; n8 < e8.length; n8++) e8[n8] = ae2(e8[n8] + t8[n8]);
      return e8;
    };
    Ae2 = (e8, t8) => {
      for (let n8 = 0; n8 < e8.length; n8++) e8[n8] = ae2(e8[n8] - t8[n8]);
      return e8;
    };
    Le = (e8) => {
      for (let t8 = 0; t8 < ce2; t8++) e8[t8] <<= 13;
      return e8;
    };
    ke2 = (e8, t8) => {
      for (let n8 = 0; n8 < ce2; n8++) if (Math.abs(he2(e8[n8])) >= t8) return true;
      return false;
    };
    Ee2 = (e8, t8) => {
      const n8 = de2(ce2);
      for (let r8 = 0; r8 < e8.length; r8++) n8[r8] = ae2(e8[r8] * t8[r8]);
      return n8;
    };
    Ue2 = new Uint8Array(0);
    Ie2 = /* @__PURE__ */ me2({ ...fe2, CRH_BYTES: 64, TR_BYTES: 64, C_TILDE_BYTES: 48, XOF128: P4, XOF256: $3 });
  }
});

// node_modules/openpgp/dist/lightweight/argon2id.min.mjs
var argon2id_min_exports = {};
__export(argon2id_min_exports, {
  default: () => R5
});
function I6(A8, I8, g7, B7) {
  A8[I8] += g7[B7], A8[I8 + 1] += g7[B7 + 1] + (A8[I8] < g7[B7]);
}
function g5(A8, I8) {
  A8[0] += I8, A8[1] += A8[0] < I8;
}
function B5(A8, g7, B7, C8, Q6, E8, t8, w8) {
  I6(A8, B7, A8, C8), I6(A8, B7, g7, t8);
  let i8 = A8[E8] ^ A8[B7], e8 = A8[E8 + 1] ^ A8[B7 + 1];
  A8[E8] = e8, A8[E8 + 1] = i8, I6(A8, Q6, A8, E8), i8 = A8[C8] ^ A8[Q6], e8 = A8[C8 + 1] ^ A8[Q6 + 1], A8[C8] = i8 >>> 24 ^ e8 << 8, A8[C8 + 1] = e8 >>> 24 ^ i8 << 8, I6(A8, B7, A8, C8), I6(A8, B7, g7, w8), i8 = A8[E8] ^ A8[B7], e8 = A8[E8 + 1] ^ A8[B7 + 1], A8[E8] = i8 >>> 16 ^ e8 << 16, A8[E8 + 1] = e8 >>> 16 ^ i8 << 16, I6(A8, Q6, A8, E8), i8 = A8[C8] ^ A8[Q6], e8 = A8[C8 + 1] ^ A8[Q6 + 1], A8[C8] = e8 >>> 31 ^ i8 << 1, A8[C8 + 1] = i8 >>> 31 ^ e8 << 1;
}
function E6(A8, I8) {
  const g7 = new Uint32Array(32), E8 = new Uint32Array(A8.b.buffer, A8.b.byteOffset, 32);
  for (let I9 = 0; I9 < 16; I9++) g7[I9] = A8.h[I9], g7[I9 + 16] = C6[I9];
  g7[24] ^= A8.t0[0], g7[25] ^= A8.t0[1];
  const t8 = I8 ? 4294967295 : 0;
  g7[28] ^= t8, g7[29] ^= t8;
  for (let A9 = 0; A9 < 12; A9++) {
    const I9 = A9 << 4;
    B5(g7, E8, 0, 8, 16, 24, Q4[I9 + 0], Q4[I9 + 1]), B5(g7, E8, 2, 10, 18, 26, Q4[I9 + 2], Q4[I9 + 3]), B5(g7, E8, 4, 12, 20, 28, Q4[I9 + 4], Q4[I9 + 5]), B5(g7, E8, 6, 14, 22, 30, Q4[I9 + 6], Q4[I9 + 7]), B5(g7, E8, 0, 10, 20, 30, Q4[I9 + 8], Q4[I9 + 9]), B5(g7, E8, 2, 12, 22, 24, Q4[I9 + 10], Q4[I9 + 11]), B5(g7, E8, 4, 14, 16, 26, Q4[I9 + 12], Q4[I9 + 13]), B5(g7, E8, 6, 8, 18, 28, Q4[I9 + 14], Q4[I9 + 15]);
  }
  for (let I9 = 0; I9 < 16; I9++) A8.h[I9] ^= g7[I9] ^ g7[I9 + 16];
}
function w6(A8, I8, g7, B7) {
  if (A8 > i5) throw Error(`outlen must be at most ${i5} (given: ${A8})`);
  return new t5(A8, I8, g7, B7);
}
function s5(A8, I8, g7) {
  return A8[g7 + 0] = I8, A8[g7 + 1] = I8 >> 8, A8[g7 + 2] = I8 >> 16, A8[g7 + 3] = I8 >> 24, A8;
}
function f5(A8, I8, g7) {
  if (I8 > Number.MAX_SAFE_INTEGER) throw Error("LE64: large numbers unsupported");
  let B7 = I8;
  for (let I9 = g7; I9 < g7 + 7; I9++) A8[I9] = B7, B7 = (B7 - A8[I9]) / 256;
  return A8;
}
function r5(A8, I8, g7) {
  const B7 = new Uint8Array(64), C8 = new Uint8Array(4 + I8.length);
  if (s5(C8, A8, 0), C8.set(I8, 4), A8 <= 64) return w6(A8).update(C8).digest(g7), g7;
  const Q6 = Math.ceil(A8 / 32) - 2;
  for (let A9 = 0; A9 < Q6; A9++) w6(64).update(0 === A9 ? C8 : B7).digest(B7), g7.set(B7.subarray(0, 32), 32 * A9);
  const E8 = new Uint8Array(w6(A8 - 32 * Q6).update(B7).digest());
  return g7.set(E8, 32 * Q6), g7;
}
function o5(A8, I8, g7, B7) {
  return A8.fn.XOR(I8.byteOffset, g7.byteOffset, B7.byteOffset), I8;
}
function c5(A8, I8, g7, B7) {
  return A8.fn.G(I8.byteOffset, g7.byteOffset, B7.byteOffset, A8.refs.gZ.byteOffset), B7;
}
function a5(A8, I8, g7, B7) {
  return A8.fn.G2(I8.byteOffset, g7.byteOffset, B7.byteOffset, A8.refs.gZ.byteOffset), B7;
}
function* S5(A8, I8, g7, B7, C8, Q6, E8, t8) {
  A8.refs.prngTmp.fill(0);
  const w8 = A8.refs.prngTmp.subarray(0, 48);
  f5(w8, I8, 0), f5(w8, g7, 8), f5(w8, B7, 16), f5(w8, C8, 24), f5(w8, Q6, 32), f5(w8, 2, 40);
  for (let I9 = 1; I9 <= E8; I9++) {
    f5(A8.refs.prngTmp, I9, w8.length);
    const g8 = a5(A8, A8.refs.ZERO1024, A8.refs.prngTmp, A8.refs.prngR);
    for (let A9 = 1 === I9 ? 8 * t8 : 0; A9 < g8.length; A9 += 8) yield g8.subarray(A9, A9 + 8);
  }
  return [];
}
function y6(A8, { memory: I8, instance: g7 }) {
  if (!D6) throw Error("BigEndian system not supported");
  const B7 = (function({ type: A9, version: I9, tagLength: g8, password: B8, salt: C9, ad: Q7, secret: E9, parallelism: t9, memorySize: w8, passes: i9 }) {
    const e9 = (A10, I10, g9, B9) => {
      if (I10 < g9 || I10 > B9) throw Error(`${A10} size should be between ${g9} and ${B9} bytes`);
    };
    if (2 !== A9 || 19 !== I9) throw Error("Unsupported type or version");
    return e9("password", B8, 8, 4294967295), e9("salt", C9, 8, 4294967295), e9("tag", g8, 4, 4294967295), e9("memory", w8, 8 * t9, 4294967295), Q7 && e9("associated data", Q7, 0, 4294967295), E9 && e9("secret", E9, 0, 32), { type: A9, version: I9, tagLength: g8, password: B8, salt: C9, ad: Q7, secret: E9, lanes: t9, memorySize: w8, passes: i9 };
  })({ type: 2, version: 19, ...A8 }), { G: C8, G2: Q6, xor: E8, getLZ: t8 } = g7.exports, i8 = {}, e8 = {};
  e8.G = C8, e8.G2 = Q6, e8.XOR = E8;
  const f8 = 4 * B7.lanes * Math.floor(B7.memorySize / (4 * B7.lanes)), a8 = f8 * n5 + 10240;
  if (I8.buffer.byteLength < a8) {
    const A9 = Math.ceil((a8 - I8.buffer.byteLength) / 65536);
    I8.grow(A9);
  }
  let y8 = 0;
  i8.gZ = new Uint8Array(I8.buffer, y8, n5), y8 += i8.gZ.length, i8.prngR = new Uint8Array(I8.buffer, y8, n5), y8 += i8.prngR.length, i8.prngTmp = new Uint8Array(I8.buffer, y8, n5), y8 += i8.prngTmp.length, i8.ZERO1024 = new Uint8Array(I8.buffer, y8, 1024), y8 += i8.ZERO1024.length;
  const h7 = new Uint32Array(I8.buffer, y8, 2);
  y8 += h7.length * Uint32Array.BYTES_PER_ELEMENT;
  const M8 = { fn: e8, refs: i8 }, U8 = new Uint8Array(I8.buffer, y8, n5);
  y8 += U8.length;
  const R7 = new Uint8Array(I8.buffer, y8, B7.memorySize * n5), N6 = new Uint8Array(I8.buffer, 0, y8), k7 = (function(A9) {
    const I9 = w6(64), g8 = new Uint8Array(4), B8 = new Uint8Array(24);
    s5(B8, A9.lanes, 0), s5(B8, A9.tagLength, 4), s5(B8, A9.memorySize, 8), s5(B8, A9.passes, 12), s5(B8, A9.version, 16), s5(B8, A9.type, 20);
    const C9 = [B8];
    A9.password ? (C9.push(s5(new Uint8Array(4), A9.password.length, 0)), C9.push(A9.password)) : C9.push(g8);
    A9.salt ? (C9.push(s5(new Uint8Array(4), A9.salt.length, 0)), C9.push(A9.salt)) : C9.push(g8);
    A9.secret ? (C9.push(s5(new Uint8Array(4), A9.secret.length, 0)), C9.push(A9.secret)) : C9.push(g8);
    A9.ad ? (C9.push(s5(new Uint8Array(4), A9.ad.length, 0)), C9.push(A9.ad)) : C9.push(g8);
    I9.update((function(A10) {
      if (1 === A10.length) return A10[0];
      let I10 = 0;
      for (let g10 = 0; g10 < A10.length; g10++) {
        if (!(A10[g10] instanceof Uint8Array)) throw Error("concatArrays: Data must be in the form of a Uint8Array");
        I10 += A10[g10].length;
      }
      const g9 = new Uint8Array(I10);
      let B9 = 0;
      return A10.forEach(((A11) => {
        g9.set(A11, B9), B9 += A11.length;
      })), g9;
    })(C9));
    const Q7 = I9.digest();
    return new Uint8Array(Q7);
  })(B7), H7 = f8 / B7.lanes, l6 = Array(B7.lanes).fill(null).map((() => Array(H7))), G7 = (A9, I9) => (l6[A9][I9] = R7.subarray(A9 * H7 * 1024 + 1024 * I9, A9 * H7 * 1024 + 1024 * I9 + n5), l6[A9][I9]);
  for (let A9 = 0; A9 < B7.lanes; A9++) {
    const I9 = new Uint8Array(k7.length + 8);
    I9.set(k7), s5(I9, 0, k7.length), s5(I9, A9, k7.length + 4), r5(n5, I9, G7(A9, 0)), s5(I9, 1, k7.length), r5(n5, I9, G7(A9, 1));
  }
  const F7 = H7 / 4;
  for (let A9 = 0; A9 < B7.passes; A9++) for (let I9 = 0; I9 < 4; I9++) {
    const g8 = 0 === A9 && I9 <= 1;
    for (let C9 = 0; C9 < B7.lanes; C9++) {
      let Q7 = 0 === I9 && 0 === A9 ? 2 : 0;
      const E9 = g8 ? S5(M8, A9, C9, I9, f8, B7.passes, F7, Q7) : null;
      for (; Q7 < F7; Q7++) {
        const w8 = I9 * F7 + Q7, i9 = w8 > 0 ? l6[C9][w8 - 1] : l6[C9][H7 - 1], e9 = g8 ? E9.next().value : i9;
        t8(h7.byteOffset, e9.byteOffset, C9, B7.lanes, A9, I9, Q7, 4, F7);
        const n8 = h7[0], D8 = h7[1];
        0 === A9 && G7(C9, w8), c5(M8, i9, l6[n8][D8], A9 > 0 ? U8 : l6[C9][w8]), A9 > 0 && o5(M8, l6[C9][w8], U8, l6[C9][w8]);
      }
    }
  }
  const L5 = l6[0][H7 - 1];
  for (let A9 = 1; A9 < B7.lanes; A9++) o5(M8, L5, L5, l6[A9][H7 - 1]);
  const J6 = r5(B7.tagLength, L5, new Uint8Array(B7.tagLength));
  return N6.fill(0), I8.grow(0), J6;
}
async function M6(A8, I8) {
  const g7 = new WebAssembly.Memory({ initial: 1040, maximum: 65536 }), B7 = await (async function(A9, I9, g8) {
    const B8 = { env: { memory: A9 } };
    if (void 0 === h5) try {
      const A10 = await I9(B8);
      return h5 = true, A10;
    } catch (A10) {
      h5 = false;
    }
    return (h5 ? I9 : g8)(B8);
  })(g7, A8, I8);
  return (A9) => y6(A9, { instance: B7.instance, memory: g7 });
}
function U6(I8, g7, B7, C8) {
  var Q6 = null, E8 = A6.atob(B7), t8 = E8.length;
  Q6 = new Uint8Array(new ArrayBuffer(t8));
  for (var w8 = 0; w8 < t8; w8++) Q6[w8] = E8.charCodeAt(w8);
  return (function(A8, I9, g8) {
    var B8 = g8 ? WebAssembly.instantiateStreaming : WebAssembly.instantiate, C9 = g8 ? WebAssembly.compileStreaming : WebAssembly.compile;
    return I9 ? B8(A8, I9) : C9(A8);
  })(Q6, C8, false);
}
var A6, C6, Q4, t5, i5, e5, n5, D6, h5, R5;
var init_argon2id_min = __esm({
  "node_modules/openpgp/dist/lightweight/argon2id.min.mjs"() {
    A6 = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    C6 = new Uint32Array([4089235720, 1779033703, 2227873595, 3144134277, 4271175723, 1013904242, 1595750129, 2773480762, 2917565137, 1359893119, 725511199, 2600822924, 4215389547, 528734635, 327033209, 1541459225]);
    Q4 = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9, 12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11, 13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10, 6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5, 10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3].map(((A8) => 2 * A8)));
    t5 = class {
      constructor(A8, I8, g7, B7) {
        const Q6 = new Uint8Array(64);
        this.S = { b: new Uint8Array(e5), h: new Uint32Array(i5 / 4), t0: new Uint32Array(2), c: 0, outlen: A8 }, Q6[0] = A8, I8 && (Q6[1] = I8.length), Q6[2] = 1, Q6[3] = 1, g7 && Q6.set(g7, 32), B7 && Q6.set(B7, 48);
        const E8 = new Uint32Array(Q6.buffer, Q6.byteOffset, Q6.length / Uint32Array.BYTES_PER_ELEMENT);
        for (let A9 = 0; A9 < 16; A9++) this.S.h[A9] = C6[A9] ^ E8[A9];
        if (I8) {
          const A9 = new Uint8Array(e5);
          A9.set(I8), this.update(A9);
        }
      }
      update(A8) {
        if (!(A8 instanceof Uint8Array)) throw Error("Input must be Uint8Array or Buffer");
        let I8 = 0;
        for (; I8 < A8.length; ) {
          this.S.c === e5 && (g5(this.S.t0, this.S.c), E6(this.S, false), this.S.c = 0);
          let B7 = e5 - this.S.c;
          this.S.b.set(A8.subarray(I8, I8 + B7), this.S.c);
          const C8 = Math.min(B7, A8.length - I8);
          this.S.c += C8, I8 += C8;
        }
        return this;
      }
      digest(A8) {
        g5(this.S.t0, this.S.c), this.S.b.fill(0, this.S.c), this.S.c = e5, E6(this.S, true);
        const I8 = A8 || new Uint8Array(this.S.outlen);
        for (let A9 = 0; A9 < this.S.outlen; A9++) I8[A9] = this.S.h[A9 >> 2] >> 8 * (3 & A9);
        return this.S.h = null, I8.buffer;
      }
    };
    i5 = 64;
    e5 = 128;
    n5 = 1024;
    D6 = 205 === new Uint8Array(new Uint16Array([43981]).buffer)[0];
    R5 = async () => M6(((A8) => U6(0, 0, "AGFzbQEAAAABKwdgBH9/f38AYAABf2AAAGADf39/AGAJf39/f39/f39/AX9gAX8AYAF/AX8CEwEDZW52Bm1lbW9yeQIBkAiAgAQDCgkCAwAABAEFBgEEBQFwAQICBgkBfwFBkIjAAgsHfQoDeG9yAAEBRwACAkcyAAMFZ2V0TFoABBlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQALX2luaXRpYWxpemUAABBfX2Vycm5vX2xvY2F0aW9uAAgJc3RhY2tTYXZlAAUMc3RhY2tSZXN0b3JlAAYKc3RhY2tBbGxvYwAHCQcBAEEBCwEACs0gCQMAAQtYAQJ/A0AgACAEQQR0IgNqIAIgA2r9AAQAIAEgA2r9AAQA/VH9CwQAIAAgA0EQciIDaiACIANq/QAEACABIANq/QAEAP1R/QsEACAEQQJqIgRBwABHDQALC7ceAgt7A38DQCADIBFBBHQiD2ogASAPav0ABAAgACAPav0ABAD9USIF/QsEACACIA9qIAX9CwQAIAMgD0EQciIPaiABIA9q/QAEACAAIA9q/QAEAP1RIgX9CwQAIAIgD2ogBf0LBAAgEUECaiIRQcAARw0ACwNAIAMgEEEHdGoiAEEQaiAA/QAEcCAA/QAEMCIFIAD9AAQQIgT9zgEgBSAF/Q0AAQIDCAkKCwABAgMICQoLIAQgBP0NAAECAwgJCgsAAQIDCAkKC/3eAUEB/csB/c4BIgT9USIJQSD9ywEgCUEg/c0B/VAiCSAA/QAEUCIG/c4BIAkgCf0NAAECAwgJCgsAAQIDCAkKCyAGIAb9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIGIAX9USIFQSj9ywEgBUEY/c0B/VAiCCAE/c4BIAggCP0NAAECAwgJCgsAAQIDCAkKCyAEIAT9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIKIAogCf1RIgVBMP3LASAFQRD9zQH9UCIFIAb9zgEgBSAF/Q0AAQIDCAkKCwABAgMICQoLIAYgBv0NAAECAwgJCgsAAQIDCAkKC/3eAUEB/csB/c4BIgkgCP1RIgRBAf3LASAEQT/9zQH9UCIMIAD9AARgIAD9AAQgIgQgAP0ABAAiBv3OASAEIAT9DQABAgMICQoLAAECAwgJCgsgBiAG/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiBv1RIghBIP3LASAIQSD9zQH9UCIIIABBQGsiAf0ABAAiB/3OASAIIAj9DQABAgMICQoLAAECAwgJCgsgByAH/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiByAE/VEiBEEo/csBIARBGP3NAf1QIgsgBv3OASALIAv9DQABAgMICQoLAAECAwgJCgsgBiAG/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiBiAI/VEiBEEw/csBIARBEP3NAf1QIgQgB/3OASAEIAT9DQABAgMICQoLAAECAwgJCgsgByAH/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiCCAL/VEiB0EB/csBIAdBP/3NAf1QIg0gDf0NAAECAwQFBgcQERITFBUWF/0NCAkKCwwNDg8YGRobHB0eHyIH/c4BIAcgB/0NAAECAwgJCgsAAQIDCAkKCyAKIAr9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIKIAQgBSAF/Q0AAQIDBAUGBxAREhMUFRYX/Q0ICQoLDA0ODxgZGhscHR4f/VEiC0Eg/csBIAtBIP3NAf1QIgsgCP3OASALIAv9DQABAgMICQoLAAECAwgJCgsgCCAI/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiCCAH/VEiB0Eo/csBIAdBGP3NAf1QIgcgCv3OASAHIAf9DQABAgMICQoLAAECAwgJCgsgCiAK/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiDv0LBAAgACAGIA0gDCAM/Q0AAQIDBAUGBxAREhMUFRYX/Q0ICQoLDA0ODxgZGhscHR4fIgr9zgEgCiAK/Q0AAQIDCAkKCwABAgMICQoLIAYgBv0NAAECAwgJCgsAAQIDCAkKC/3eAUEB/csB/c4BIgYgBSAEIAT9DQABAgMEBQYHEBESExQVFhf9DQgJCgsMDQ4PGBkaGxwdHh/9USIFQSD9ywEgBUEg/c0B/VAiBSAJ/c4BIAUgBf0NAAECAwgJCgsAAQIDCAkKCyAJIAn9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIJIAr9USIEQSj9ywEgBEEY/c0B/VAiCiAG/c4BIAogCv0NAAECAwgJCgsAAQIDCAkKCyAGIAb9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIE/QsEACAAIAQgBf1RIgVBMP3LASAFQRD9zQH9UCIFIA4gC/1RIgRBMP3LASAEQRD9zQH9UCIEIAT9DQABAgMEBQYHEBESExQVFhf9DQgJCgsMDQ4PGBkaGxwdHh/9CwRgIAAgBCAFIAX9DQABAgMEBQYHEBESExQVFhf9DQgJCgsMDQ4PGBkaGxwdHh/9CwRwIAEgBCAI/c4BIAQgBP0NAAECAwgJCgsAAQIDCAkKCyAIIAj9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIE/QsEACAAIAUgCf3OASAFIAX9DQABAgMICQoLAAECAwgJCgsgCSAJ/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiCf0LBFAgACAEIAf9USIFQQH9ywEgBUE//c0B/VAiBSAJIAr9USIEQQH9ywEgBEE//c0B/VAiBCAE/Q0AAQIDBAUGBxAREhMUFRYX/Q0ICQoLDA0ODxgZGhscHR4f/QsEICAAIAQgBSAF/Q0AAQIDBAUGBxAREhMUFRYX/Q0ICQoLDA0ODxgZGhscHR4f/QsEMCAQQQFqIhBBCEcNAAtBACEQA0AgAyAQQQR0aiIAQYABaiAA/QAEgAcgAP0ABIADIgUgAP0ABIABIgT9zgEgBSAF/Q0AAQIDCAkKCwABAgMICQoLIAQgBP0NAAECAwgJCgsAAQIDCAkKC/3eAUEB/csB/c4BIgT9USIJQSD9ywEgCUEg/c0B/VAiCSAA/QAEgAUiBv3OASAJIAn9DQABAgMICQoLAAECAwgJCgsgBiAG/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiBiAF/VEiBUEo/csBIAVBGP3NAf1QIgggBP3OASAIIAj9DQABAgMICQoLAAECAwgJCgsgBCAE/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiCiAKIAn9USIFQTD9ywEgBUEQ/c0B/VAiBSAG/c4BIAUgBf0NAAECAwgJCgsAAQIDCAkKCyAGIAb9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIJIAj9USIEQQH9ywEgBEE//c0B/VAiDCAA/QAEgAYgAP0ABIACIgQgAP0ABAAiBv3OASAEIAT9DQABAgMICQoLAAECAwgJCgsgBiAG/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiBv1RIghBIP3LASAIQSD9zQH9UCIIIAD9AASABCIH/c4BIAggCP0NAAECAwgJCgsAAQIDCAkKCyAHIAf9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIHIAT9USIEQSj9ywEgBEEY/c0B/VAiCyAG/c4BIAsgC/0NAAECAwgJCgsAAQIDCAkKCyAGIAb9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIGIAj9USIEQTD9ywEgBEEQ/c0B/VAiBCAH/c4BIAQgBP0NAAECAwgJCgsAAQIDCAkKCyAHIAf9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIIIAv9USIHQQH9ywEgB0E//c0B/VAiDSAN/Q0AAQIDBAUGBxAREhMUFRYX/Q0ICQoLDA0ODxgZGhscHR4fIgf9zgEgByAH/Q0AAQIDCAkKCwABAgMICQoLIAogCv0NAAECAwgJCgsAAQIDCAkKC/3eAUEB/csB/c4BIgogBCAFIAX9DQABAgMEBQYHEBESExQVFhf9DQgJCgsMDQ4PGBkaGxwdHh/9USILQSD9ywEgC0Eg/c0B/VAiCyAI/c4BIAsgC/0NAAECAwgJCgsAAQIDCAkKCyAIIAj9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIIIAf9USIHQSj9ywEgB0EY/c0B/VAiByAK/c4BIAcgB/0NAAECAwgJCgsAAQIDCAkKCyAKIAr9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIO/QsEACAAIAYgDSAMIAz9DQABAgMEBQYHEBESExQVFhf9DQgJCgsMDQ4PGBkaGxwdHh8iCv3OASAKIAr9DQABAgMICQoLAAECAwgJCgsgBiAG/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiBiAFIAQgBP0NAAECAwQFBgcQERITFBUWF/0NCAkKCwwNDg8YGRobHB0eH/1RIgVBIP3LASAFQSD9zQH9UCIFIAn9zgEgBSAF/Q0AAQIDCAkKCwABAgMICQoLIAkgCf0NAAECAwgJCgsAAQIDCAkKC/3eAUEB/csB/c4BIgkgCv1RIgRBKP3LASAEQRj9zQH9UCIKIAb9zgEgCiAK/Q0AAQIDCAkKCwABAgMICQoLIAYgBv0NAAECAwgJCgsAAQIDCAkKC/3eAUEB/csB/c4BIgT9CwQAIAAgBCAF/VEiBUEw/csBIAVBEP3NAf1QIgUgDiAL/VEiBEEw/csBIARBEP3NAf1QIgQgBP0NAAECAwQFBgcQERITFBUWF/0NCAkKCwwNDg8YGRobHB0eH/0LBIAGIAAgBCAFIAX9DQABAgMEBQYHEBESExQVFhf9DQgJCgsMDQ4PGBkaGxwdHh/9CwSAByAAIAQgCP3OASAEIAT9DQABAgMICQoLAAECAwgJCgsgCCAI/Q0AAQIDCAkKCwABAgMICQoL/d4BQQH9ywH9zgEiBP0LBIAEIAAgBSAJ/c4BIAUgBf0NAAECAwgJCgsAAQIDCAkKCyAJIAn9DQABAgMICQoLAAECAwgJCgv93gFBAf3LAf3OASIJ/QsEgAUgACAEIAf9USIFQQH9ywEgBUE//c0B/VAiBSAJIAr9USIEQQH9ywEgBEE//c0B/VAiBCAE/Q0AAQIDBAUGBxAREhMUFRYX/Q0ICQoLDA0ODxgZGhscHR4f/QsEgAIgACAEIAUgBf0NAAECAwQFBgcQERITFBUWF/0NCAkKCwwNDg8YGRobHB0eH/0LBIADIBBBAWoiEEEIRw0AC0EAIRADQCACIBBBBHQiAGoiASAAIANq/QAEACAB/QAEAP1R/QsEACACIABBEHIiAWoiDyABIANq/QAEACAP/QAEAP1R/QsEACACIABBIHIiAWoiDyABIANq/QAEACAP/QAEAP1R/QsEACACIABBMHIiAGoiASAAIANq/QAEACAB/QAEAP1R/QsEACAQQQRqIhBBwABHDQALCxYAIAAgASACIAMQAiAAIAIgAiADEAILewIBfwF+IAIhCSABNQIAIQogBCAFcgRAIAEoAgQgA3AhCQsgACAJNgIAIAAgB0EBayAFIAQbIAhsIAZBAWtBAEF/IAYbIAIgCUYbaiIBIAVBAWogCGxBACAEG2ogAa0gCiAKfkIgiH5CIIinQX9zaiAHIAhscDYCBCAACwQAIwALBgAgACQACxAAIwAgAGtBcHEiACQAIAALBQBBgAgL", A8)), ((A8) => U6(0, 0, "AGFzbQEAAAABPwhgBH9/f38AYAABf2AAAGADf39/AGARf39/f39/f39/f39/f39/f38AYAl/f39/f39/f38Bf2ABfwBgAX8BfwITAQNlbnYGbWVtb3J5AgGQCICABAMLCgIDBAAABQEGBwEEBQFwAQICBgkBfwFBkIjAAgsHfQoDeG9yAAEBRwADAkcyAAQFZ2V0TFoABRlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQALX2luaXRpYWxpemUAABBfX2Vycm5vX2xvY2F0aW9uAAkJc3RhY2tTYXZlAAYMc3RhY2tSZXN0b3JlAAcKc3RhY2tBbGxvYwAICQcBAEEBCwEACssaCgMAAQtQAQJ/A0AgACAEQQN0IgNqIAIgA2opAwAgASADaikDAIU3AwAgACADQQhyIgNqIAIgA2opAwAgASADaikDAIU3AwAgBEECaiIEQYABRw0ACwveDwICfgF/IAAgAUEDdGoiEyATKQMAIhEgACAFQQN0aiIBKQMAIhJ8IBFCAYZC/v///x+DIBJC/////w+DfnwiETcDACAAIA1BA3RqIgUgESAFKQMAhUIgiSIRNwMAIAAgCUEDdGoiCSARIAkpAwAiEnwgEUL/////D4MgEkIBhkL+////H4N+fCIRNwMAIAEgESABKQMAhUIoiSIRNwMAIBMgESATKQMAIhJ8IBFC/////w+DIBJCAYZC/v///x+DfnwiETcDACAFIBEgBSkDAIVCMIkiETcDACAJIBEgCSkDACISfCARQv////8PgyASQgGGQv7///8fg358IhE3AwAgASARIAEpAwCFQgGJNwMAIAAgAkEDdGoiDSANKQMAIhEgACAGQQN0aiICKQMAIhJ8IBFCAYZC/v///x+DIBJC/////w+DfnwiETcDACAAIA5BA3RqIgYgESAGKQMAhUIgiSIRNwMAIAAgCkEDdGoiCiARIAopAwAiEnwgEUL/////D4MgEkIBhkL+////H4N+fCIRNwMAIAIgESACKQMAhUIoiSIRNwMAIA0gESANKQMAIhJ8IBFC/////w+DIBJCAYZC/v///x+DfnwiETcDACAGIBEgBikDAIVCMIkiETcDACAKIBEgCikDACISfCARQv////8PgyASQgGGQv7///8fg358IhE3AwAgAiARIAIpAwCFQgGJNwMAIAAgA0EDdGoiDiAOKQMAIhEgACAHQQN0aiIDKQMAIhJ8IBFCAYZC/v///x+DIBJC/////w+DfnwiETcDACAAIA9BA3RqIgcgESAHKQMAhUIgiSIRNwMAIAAgC0EDdGoiCyARIAspAwAiEnwgEUL/////D4MgEkIBhkL+////H4N+fCIRNwMAIAMgESADKQMAhUIoiSIRNwMAIA4gESAOKQMAIhJ8IBFC/////w+DIBJCAYZC/v///x+DfnwiETcDACAHIBEgBykDAIVCMIkiETcDACALIBEgCykDACISfCARQv////8PgyASQgGGQv7///8fg358IhE3AwAgAyARIAMpAwCFQgGJNwMAIAAgBEEDdGoiDyAPKQMAIhEgACAIQQN0aiIEKQMAIhJ8IBFCAYZC/v///x+DIBJC/////w+DfnwiETcDACAAIBBBA3RqIgggESAIKQMAhUIgiSIRNwMAIAAgDEEDdGoiACARIAApAwAiEnwgEUL/////D4MgEkIBhkL+////H4N+fCIRNwMAIAQgESAEKQMAhUIoiSIRNwMAIA8gESAPKQMAIhJ8IBFC/////w+DIBJCAYZC/v///x+DfnwiETcDACAIIBEgCCkDAIVCMIkiETcDACAAIBEgACkDACISfCARQv////8PgyASQgGGQv7///8fg358IhE3AwAgBCARIAQpAwCFQgGJNwMAIBMgEykDACIRIAIpAwAiEnwgEUIBhkL+////H4MgEkL/////D4N+fCIRNwMAIAggESAIKQMAhUIgiSIRNwMAIAsgESALKQMAIhJ8IBFC/////w+DIBJCAYZC/v///x+DfnwiETcDACACIBEgAikDAIVCKIkiETcDACATIBEgEykDACISfCARQv////8PgyASQgGGQv7///8fg358IhE3AwAgCCARIAgpAwCFQjCJIhE3AwAgCyARIAspAwAiEnwgEUL/////D4MgEkIBhkL+////H4N+fCIRNwMAIAIgESACKQMAhUIBiTcDACANIA0pAwAiESADKQMAIhJ8IBFCAYZC/v///x+DIBJC/////w+DfnwiETcDACAFIBEgBSkDAIVCIIkiETcDACAAIBEgACkDACISfCARQv////8PgyASQgGGQv7///8fg358IhE3AwAgAyARIAMpAwCFQiiJIhE3AwAgDSARIA0pAwAiEnwgEUL/////D4MgEkIBhkL+////H4N+fCIRNwMAIAUgESAFKQMAhUIwiSIRNwMAIAAgESAAKQMAIhJ8IBFC/////w+DIBJCAYZC/v///x+DfnwiETcDACADIBEgAykDAIVCAYk3AwAgDiAOKQMAIhEgBCkDACISfCARQgGGQv7///8fgyASQv////8Pg358IhE3AwAgBiARIAYpAwCFQiCJIhE3AwAgCSARIAkpAwAiEnwgEUL/////D4MgEkIBhkL+////H4N+fCIRNwMAIAQgESAEKQMAhUIoiSIRNwMAIA4gESAOKQMAIhJ8IBFC/////w+DIBJCAYZC/v///x+DfnwiETcDACAGIBEgBikDAIVCMIkiETcDACAJIBEgCSkDACISfCARQv////8PgyASQgGGQv7///8fg358IhE3AwAgBCARIAQpAwCFQgGJNwMAIA8gDykDACIRIAEpAwAiEnwgEUIBhkL+////H4MgEkL/////D4N+fCIRNwMAIAcgESAHKQMAhUIgiSIRNwMAIAogESAKKQMAIhJ8IBFC/////w+DIBJCAYZC/v///x+DfnwiETcDACABIBEgASkDAIVCKIkiETcDACAPIBEgDykDACISfCARQv////8PgyASQgGGQv7///8fg358IhE3AwAgByARIAcpAwCFQjCJIhE3AwAgCiARIAopAwAiEnwgEUL/////D4MgEkIBhkL+////H4N+fCIRNwMAIAEgESABKQMAhUIBiTcDAAvdCAEPfwNAIAIgBUEDdCIGaiABIAZqKQMAIAAgBmopAwCFNwMAIAIgBkEIciIGaiABIAZqKQMAIAAgBmopAwCFNwMAIAVBAmoiBUGAAUcNAAsDQCADIARBA3QiAGogACACaikDADcDACADIARBAXIiAEEDdCIBaiABIAJqKQMANwMAIAMgBEECciIBQQN0IgVqIAIgBWopAwA3AwAgAyAEQQNyIgVBA3QiBmogAiAGaikDADcDACADIARBBHIiBkEDdCIHaiACIAdqKQMANwMAIAMgBEEFciIHQQN0IghqIAIgCGopAwA3AwAgAyAEQQZyIghBA3QiCWogAiAJaikDADcDACADIARBB3IiCUEDdCIKaiACIApqKQMANwMAIAMgBEEIciIKQQN0IgtqIAIgC2opAwA3AwAgAyAEQQlyIgtBA3QiDGogAiAMaikDADcDACADIARBCnIiDEEDdCINaiACIA1qKQMANwMAIAMgBEELciINQQN0Ig5qIAIgDmopAwA3AwAgAyAEQQxyIg5BA3QiD2ogAiAPaikDADcDACADIARBDXIiD0EDdCIQaiACIBBqKQMANwMAIAMgBEEOciIQQQN0IhFqIAIgEWopAwA3AwAgAyAEQQ9yIhFBA3QiEmogAiASaikDADcDACADIARB//8DcSAAQf//A3EgAUH//wNxIAVB//8DcSAGQf//A3EgB0H//wNxIAhB//8DcSAJQf//A3EgCkH//wNxIAtB//8DcSAMQf//A3EgDUH//wNxIA5B//8DcSAPQf//A3EgEEH//wNxIBFB//8DcRACIARB8ABJIQAgBEEQaiEEIAANAAtBACEBIANBAEEBQRBBEUEgQSFBMEExQcAAQcEAQdAAQdEAQeAAQeEAQfAAQfEAEAIgA0ECQQNBEkETQSJBI0EyQTNBwgBBwwBB0gBB0wBB4gBB4wBB8gBB8wAQAiADQQRBBUEUQRVBJEElQTRBNUHEAEHFAEHUAEHVAEHkAEHlAEH0AEH1ABACIANBBkEHQRZBF0EmQSdBNkE3QcYAQccAQdYAQdcAQeYAQecAQfYAQfcAEAIgA0EIQQlBGEEZQShBKUE4QTlByABByQBB2ABB2QBB6ABB6QBB+ABB+QAQAiADQQpBC0EaQRtBKkErQTpBO0HKAEHLAEHaAEHbAEHqAEHrAEH6AEH7ABACIANBDEENQRxBHUEsQS1BPEE9QcwAQc0AQdwAQd0AQewAQe0AQfwAQf0AEAIgA0EOQQ9BHkEfQS5BL0E+QT9BzgBBzwBB3gBB3wBB7gBB7wBB/gBB/wAQAgNAIAIgAUEDdCIAaiIEIAAgA2opAwAgBCkDAIU3AwAgAiAAQQhyIgRqIgUgAyAEaikDACAFKQMAhTcDACACIABBEHIiBGoiBSADIARqKQMAIAUpAwCFNwMAIAIgAEEYciIAaiIEIAAgA2opAwAgBCkDAIU3AwAgAUEEaiIBQYABRw0ACwsWACAAIAEgAiADEAMgACACIAIgAxADC3sCAX8BfiACIQkgATUCACEKIAQgBXIEQCABKAIEIANwIQkLIAAgCTYCACAAIAdBAWsgBSAEGyAIbCAGQQFrQQBBfyAGGyACIAlGG2oiASAFQQFqIAhsQQAgBBtqIAGtIAogCn5CIIh+QiCIp0F/c2ogByAIbHA2AgQgAAsEACMACwYAIAAkAAsQACMAIABrQXBxIgAkACAACwUAQYAICw==", A8)));
  }
});

// node_modules/openpgp/dist/lightweight/unbzip2-stream.min.mjs
var unbzip2_stream_min_exports = {};
__export(unbzip2_stream_min_exports, {
  i: () => s6
});
function r6(r8, t8) {
  return t8.forEach((function(t9) {
    t9 && "string" != typeof t9 && !Array.isArray(t9) && Object.keys(t9).forEach((function(e8) {
      if ("default" !== e8 && !(e8 in r8)) {
        var n8 = Object.getOwnPropertyDescriptor(t9, e8);
        Object.defineProperty(r8, e8, n8.get ? n8 : { enumerable: true, get: function() {
          return t9[e8];
        } });
      }
    }));
  })), Object.freeze(r8);
}
function t6(r8) {
  return r8 && r8.__esModule && Object.prototype.hasOwnProperty.call(r8, "default") ? r8.default : r8;
}
var e6, n6, a6, o6, i6, f6, u6, s6;
var init_unbzip2_stream_min = __esm({
  "node_modules/openpgp/dist/lightweight/unbzip2-stream.min.mjs"() {
    u6 = (function() {
      if (f6) return i6;
      f6 = 1;
      const r8 = (function() {
        if (n6) return e6;
        function r9(r10) {
          this.name = "Bzip2Error", this.message = r10, this.stack = Error().stack;
        }
        n6 = 1, r9.prototype = Error();
        var t9 = function(t10) {
          throw new r9(t10);
        }, a8 = {};
        return a8.Bzip2Error = r9, a8.crcTable = [0, 79764919, 159529838, 222504665, 319059676, 398814059, 445009330, 507990021, 638119352, 583659535, 797628118, 726387553, 890018660, 835552979, 1015980042, 944750013, 1276238704, 1221641927, 1167319070, 1095957929, 1595256236, 1540665371, 1452775106, 1381403509, 1780037320, 1859660671, 1671105958, 1733955601, 2031960084, 2111593891, 1889500026, 1952343757, 2552477408, 2632100695, 2443283854, 2506133561, 2334638140, 2414271883, 2191915858, 2254759653, 3190512472, 3135915759, 3081330742, 3009969537, 2905550212, 2850959411, 2762807018, 2691435357, 3560074640, 3505614887, 3719321342, 3648080713, 3342211916, 3287746299, 3467911202, 3396681109, 4063920168, 4143685023, 4223187782, 4286162673, 3779000052, 3858754371, 3904687514, 3967668269, 881225847, 809987520, 1023691545, 969234094, 662832811, 591600412, 771767749, 717299826, 311336399, 374308984, 453813921, 533576470, 25881363, 88864420, 134795389, 214552010, 2023205639, 2086057648, 1897238633, 1976864222, 1804852699, 1867694188, 1645340341, 1724971778, 1587496639, 1516133128, 1461550545, 1406951526, 1302016099, 1230646740, 1142491917, 1087903418, 2896545431, 2825181984, 2770861561, 2716262478, 3215044683, 3143675388, 3055782693, 3001194130, 2326604591, 2389456536, 2200899649, 2280525302, 2578013683, 2640855108, 2418763421, 2498394922, 3769900519, 3832873040, 3912640137, 3992402750, 4088425275, 4151408268, 4197601365, 4277358050, 3334271071, 3263032808, 3476998961, 3422541446, 3585640067, 3514407732, 3694837229, 3640369242, 1762451694, 1842216281, 1619975040, 1682949687, 2047383090, 2127137669, 1938468188, 2001449195, 1325665622, 1271206113, 1183200824, 1111960463, 1543535498, 1489069629, 1434599652, 1363369299, 622672798, 568075817, 748617968, 677256519, 907627842, 853037301, 1067152940, 995781531, 51762726, 131386257, 177728840, 240578815, 269590778, 349224269, 429104020, 491947555, 4046411278, 4126034873, 4172115296, 4234965207, 3794477266, 3874110821, 3953728444, 4016571915, 3609705398, 3555108353, 3735388376, 3664026991, 3290680682, 3236090077, 3449943556, 3378572211, 3174993278, 3120533705, 3032266256, 2961025959, 2923101090, 2868635157, 2813903052, 2742672763, 2604032198, 2683796849, 2461293480, 2524268063, 2284983834, 2364738477, 2175806836, 2238787779, 1569362073, 1498123566, 1409854455, 1355396672, 1317987909, 1246755826, 1192025387, 1137557660, 2072149281, 2135122070, 1912620623, 1992383480, 1753615357, 1816598090, 1627664531, 1707420964, 295390185, 358241886, 404320391, 483945776, 43990325, 106832002, 186451547, 266083308, 932423249, 861060070, 1041341759, 986742920, 613929101, 542559546, 756411363, 701822548, 3316196985, 3244833742, 3425377559, 3370778784, 3601682597, 3530312978, 3744426955, 3689838204, 3819031489, 3881883254, 3928223919, 4007849240, 4037393693, 4100235434, 4180117107, 4259748804, 2310601993, 2373574846, 2151335527, 2231098320, 2596047829, 2659030626, 2470359227, 2550115596, 2947551409, 2876312838, 2788305887, 2733848168, 3165939309, 3094707162, 3040238851, 2985771188], a8.array = function(r10) {
          var t10 = 0, e8 = 0, n8 = [0, 1, 3, 7, 15, 31, 63, 127, 255];
          return function(a9) {
            for (var o8 = 0; a9 > 0; ) {
              var i8 = 8 - t10;
              a9 >= i8 ? (o8 <<= i8, o8 |= n8[i8] & r10[e8++], t10 = 0, a9 -= i8) : (o8 <<= a9, o8 |= (r10[e8] & n8[a9] << 8 - a9 - t10) >> 8 - a9 - t10, t10 += a9, a9 = 0);
            }
            return o8;
          };
        }, a8.simple = function(r10, t10) {
          var e8 = a8.array(r10), n8 = false, o8 = 1e5 * a8.header(e8), i8 = new Int32Array(o8);
          do {
            n8 = a8.decompress(e8, t10, i8, o8);
          } while (!n8);
        }, a8.header = function(r10) {
          this.byteCount = new Int32Array(256), this.symToByte = new Uint8Array(256), this.mtfSymbol = new Int32Array(256), this.selectors = new Uint8Array(32768), 4348520 != r10(24) && t9("No magic number found");
          var e8 = r10(8) - 48;
          return (e8 < 1 || e8 > 9) && t9("Not a BZIP archive"), e8;
        }, a8.decompress = function(r10, e8, n8, a9, o8) {
          for (var i8 = -1, f8 = "", u8 = 0; u8 < 6; u8++) f8 += r10(8).toString(16);
          if ("177245385090" == f8) return (0 | r10(32)) !== o8 && t9("Error in bzip2: crc32 do not match"), r10(null), null;
          "314159265359" != f8 && t9("Invalid bzip data");
          var s8 = 0 | r10(32);
          r10(1) && t9("unsupported obsolete version");
          var l6 = r10(24);
          l6 > a9 && t9("Initial position larger than buffer size");
          var c7 = r10(16), y8 = 0;
          for (u8 = 0; u8 < 16; u8++) if (c7 & 1 << 15 - u8) {
            var d6 = r10(16);
            for (m6 = 0; m6 < 16; m6++) d6 & 1 << 15 - m6 && (this.symToByte[y8++] = 16 * u8 + m6);
          }
          var b6 = r10(3);
          (b6 < 2 || b6 > 6) && t9("Invalid bzip data");
          var h7 = r10(15);
          for (0 == h7 && t9("Invalid bzip data"), u8 = 0; u8 < b6; u8++) this.mtfSymbol[u8] = u8;
          for (u8 = 0; u8 < h7; u8++) {
            for (var m6 = 0; r10(1); m6++) m6 >= b6 && t9("Invalid bzip data");
            var p5 = this.mtfSymbol[m6];
            for (d6 = m6 - 1; d6 >= 0; d6--) this.mtfSymbol[d6 + 1] = this.mtfSymbol[d6];
            this.mtfSymbol[0] = p5, this.selectors[u8] = p5;
          }
          var v7, w8, I8, z7, g7 = y8 + 2, A8 = [], S7 = new Uint8Array(258), E8 = new Uint16Array(21);
          for (m6 = 0; m6 < b6; m6++) {
            for (c7 = r10(5), u8 = 0; u8 < g7; u8++) {
              for (; (c7 < 1 || c7 > 20) && t9("Invalid bzip data"), r10(1); ) r10(1) ? c7-- : c7++;
              S7[u8] = c7;
            }
            var C8, R7;
            for (C8 = R7 = S7[0], u8 = 1; u8 < g7; u8++) S7[u8] > R7 ? R7 = S7[u8] : S7[u8] < C8 && (C8 = S7[u8]);
            (v7 = A8[m6] = {}).permute = new Int32Array(258), v7.limit = new Int32Array(21), v7.base = new Int32Array(21), v7.minLen = C8, v7.maxLen = R7;
            var B7 = v7.base, O6 = v7.limit, T6 = 0;
            for (u8 = C8; u8 <= R7; u8++) for (c7 = 0; c7 < g7; c7++) S7[c7] == u8 && (v7.permute[T6++] = c7);
            for (u8 = C8; u8 <= R7; u8++) E8[u8] = O6[u8] = 0;
            for (u8 = 0; u8 < g7; u8++) E8[S7[u8]]++;
            for (T6 = c7 = 0, u8 = C8; u8 < R7; u8++) T6 += E8[u8], O6[u8] = T6 - 1, T6 <<= 1, B7[u8 + 1] = T6 - (c7 += E8[u8]);
            O6[R7] = T6 + E8[R7] - 1, B7[C8] = 0;
          }
          for (u8 = 0; u8 < 256; u8++) this.mtfSymbol[u8] = u8, this.byteCount[u8] = 0;
          for (w8 = I8 = g7 = z7 = 0; ; ) {
            for (g7-- || (g7 = 49, z7 >= h7 && t9("Invalid bzip data"), B7 = (v7 = A8[this.selectors[z7++]]).base, O6 = v7.limit), m6 = r10(u8 = v7.minLen); u8 > v7.maxLen && t9("Invalid bzip data"), !(m6 <= O6[u8]); ) u8++, m6 = m6 << 1 | r10(1);
            ((m6 -= B7[u8]) < 0 || m6 >= 258) && t9("Invalid bzip data");
            var _6 = v7.permute[m6];
            if (0 != _6 && 1 != _6) {
              if (w8) for (w8 = 0, I8 + c7 > a9 && t9("Invalid bzip data"), p5 = this.symToByte[this.mtfSymbol[0]], this.byteCount[p5] += c7; c7--; ) n8[I8++] = p5;
              if (_6 > y8) break;
              for (I8 >= a9 && t9("Invalid bzip data"), u8 = _6 - 1, p5 = this.mtfSymbol[u8], d6 = u8 - 1; d6 >= 0; d6--) this.mtfSymbol[d6 + 1] = this.mtfSymbol[d6];
              this.mtfSymbol[0] = p5, p5 = this.symToByte[p5], this.byteCount[p5]++, n8[I8++] = p5;
            } else w8 || (w8 = 1, c7 = 0), c7 += 0 == _6 ? w8 : 2 * w8, w8 <<= 1;
          }
          for ((l6 < 0 || l6 >= I8) && t9("Invalid bzip data"), m6 = 0, u8 = 0; u8 < 256; u8++) d6 = m6 + this.byteCount[u8], this.byteCount[u8] = m6, m6 = d6;
          for (u8 = 0; u8 < I8; u8++) p5 = 255 & n8[u8], n8[this.byteCount[p5]] |= u8 << 8, this.byteCount[p5]++;
          var j7, k7, U8, L5 = 0, P6 = 0, x7 = 0;
          for (I8 && (P6 = 255 & (L5 = n8[l6]), L5 >>= 8, x7 = -1); I8; ) {
            for (I8--, k7 = P6, P6 = 255 & (L5 = n8[L5]), L5 >>= 8, 3 == x7++ ? (j7 = P6, U8 = k7, P6 = -1) : (j7 = 1, U8 = P6); j7--; ) i8 = 4294967295 & (i8 << 8 ^ this.crcTable[255 & (i8 >> 24 ^ U8)]), e8(U8);
            P6 != k7 && (x7 = 0);
          }
          return (0 | (i8 = ~i8 >>> 0)) != (0 | s8) && t9("Error in bzip2: crc32 do not match"), 4294967295 & (i8 ^ (o8 << 1 | o8 >>> 31));
        }, e6 = a8;
      })(), t8 = (function() {
        if (o6) return a6;
        o6 = 1;
        var r9 = [0, 1, 3, 7, 15, 31, 63, 127, 255];
        return a6 = function(t9) {
          var e8 = 0, n8 = 0, a8 = t9(), o8 = function(i8) {
            if (null === i8 && 0 != e8) return e8 = 0, void n8++;
            for (var f8 = 0; i8 > 0; ) {
              n8 >= a8.length && (n8 = 0, a8 = t9());
              var u8 = 8 - e8;
              0 === e8 && i8 > 0 && o8.bytesRead++, i8 >= u8 ? (f8 <<= u8, f8 |= r9[u8] & a8[n8++], e8 = 0, i8 -= u8) : (f8 <<= i8, f8 |= (a8[n8] & r9[i8] << 8 - i8 - e8) >> 8 - i8 - e8, e8 += i8, i8 = 0);
            }
            return f8;
          };
          return o8.bytesRead = 0, o8;
        };
      })();
      return i6 = function(e8) {
        const n8 = [];
        let a8 = 0, o8 = 0, i8 = false, f8 = false, u8 = null, s8 = null;
        let l6, c7 = 0;
        function y8(t9) {
          if (!i8) try {
            return (function(t10) {
              if (o8) {
                const e9 = 1e5 * o8, n9 = new Int32Array(e9), a9 = [], i9 = function(r9) {
                  a9.push(r9);
                };
                return s8 = r8.decompress(u8, i9, n9, e9, s8), null === s8 ? (o8 = 0, false) : (t10(new Uint8Array(a9)), true);
              }
              return o8 = r8.header(u8), s8 = 0, false;
            })((function(r9) {
              t9.enqueue(r9), null !== r9 && (c7 += r9.length);
            }));
          } catch (r9) {
            return t9.error(r9), i8 = true, true;
          }
        }
        return new ReadableStream({ start() {
          l6 = e8.getReader();
        }, async pull(r9) {
          try {
            for (; ; ) {
              for (; !(f8 || u8 && a8 - u8.bytesRead + 1 >= 25e3 + 1e5 * (o8 || 4)); ) {
                const { value: r10, done: e9 } = await l6.read();
                e9 ? f8 = true : (n8.push(r10), a8 += r10.length, null === u8 && (u8 = t8((function() {
                  return n8.shift();
                }))));
              }
              for (; f8 ? u8 && a8 > u8.bytesRead : u8 && a8 - u8.bytesRead + 1 >= 25e3 + 1e5 * (o8 || 4); ) if (y8(r9)) return;
              if (f8 && !i8 && (!u8 || a8 <= u8.bytesRead)) return void (null === s8 ? r9.close() : r9.error(Error("input stream ended prematurely")));
            }
          } catch (t9) {
            r9.error(t9);
          }
        }, async cancel(r9) {
          await l6.abort(r9);
        } }, { highWaterMark: 0 });
      };
    })();
    s6 = /* @__PURE__ */ r6({ __proto__: null, default: /* @__PURE__ */ t6(u6) }, [u6]);
  }
});

// node_modules/@noble/hashes/_u64.js
function setU64FromNum(view, byteOffset, n8, isLE) {
  const h7 = fromNumH(n8);
  const l6 = fromNumL(n8);
  view.setUint32(byteOffset, isLE ? l6 : h7, isLE);
  view.setUint32(byteOffset + 4, isLE ? h7 : l6, isLE);
}
var fromNumH, fromNumL;
var init_u64 = __esm({
  "node_modules/@noble/hashes/_u64.js"() {
    fromNumH = (n8) => n8 / 2 ** 32 | 0;
    fromNumL = (n8) => n8 >>> 0;
  }
});

// node_modules/@noble/hashes/utils.js
function isBytes(a8) {
  return a8 instanceof Uint8Array || ArrayBuffer.isView(a8) && a8.constructor.name === "Uint8Array" && "BYTES_PER_ELEMENT" in a8 && a8.BYTES_PER_ELEMENT === 1;
}
function anumber(n8, title = "") {
  if (typeof n8 !== "number")
    throw new TypeError(atitle(title) + "expected number, got " + typeof n8);
  if (!Number.isSafeInteger(n8) || n8 < 0)
    throw new RangeError(atitle(title) + "expected integer >= 0, got " + n8);
  return n8;
}
function abytes(value, length, title = "") {
  if (isBytes(value) && (length === void 0 || value.length === length))
    return value;
  if (length !== void 0)
    anumber(length, "length");
  const bytes = isBytes(value);
  const ofLen = length !== void 0 ? ` of length ${length}` : "";
  const got = bytes ? `length=${value.length}` : `type=${typeof value}`;
  const message = atitle(title) + "expected Uint8Array" + ofLen + ", got " + got;
  if (!bytes)
    throw new TypeError(message);
  throw new RangeError(message);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("hash was destroyed");
  if (checkFinished && instance.finished)
    throw new Error("digest() was already called");
}
function aoutput(out, instance) {
  abytes(out, void 0, "output");
  const min = instance.outputLen;
  if (!(out.length >= min)) {
    throw new RangeError('"output" expected length >= ' + min);
  }
}
function clean(...arrays) {
  for (let i8 = 0; i8 < arrays.length; i8++) {
    arrays[i8].fill(0);
  }
}
function createView(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotl(word, shift) {
  return word << shift | word >>> 32 - shift >>> 0;
}
function checkOpts(defaults, opts, title = "opts") {
  aopts(defaults, "defaults");
  if (opts !== void 0)
    aopts(opts, title);
  const merged = Object.assign(/* @__PURE__ */ Object.create(null), defaults, opts);
  return merged;
}
function createHasher(hashCons, info = {}) {
  if (typeof hashCons !== "function")
    throw new TypeError('"hashCons" expected function, got type=' + typeof hashCons);
  info = checkOpts({}, info, "info");
  const hashC = (msg, opts) => hashCons(opts).update(msg).digest();
  const tmp = hashCons(void 0);
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.canXOF = tmp.canXOF;
  hashC.create = (opts) => hashCons(opts);
  Object.assign(hashC, info);
  return Object.freeze(hashC);
}
var atitle, aobject, aopts;
var init_utils = __esm({
  "node_modules/@noble/hashes/utils.js"() {
    atitle = (title) => title ? `"${title}" ` : "";
    aobject = (value, label) => {
      if (value === null || typeof value !== "object" || Array.isArray(value))
        throw new TypeError((label === "object" ? "" : `"${label}" `) + "expected object, got type=" + typeof value);
    };
    aopts = (value, label) => {
      aobject(value, label);
      const proto = Object.getPrototypeOf(value);
      if (proto !== Object.prototype && proto !== null)
        throw new TypeError(`"${label}" expected plain object`);
      if (Object.hasOwn(value, "__proto__"))
        throw new TypeError(`"${label}.__proto__" is not allowed`);
    };
  }
});

// node_modules/@noble/hashes/_md.js
function Chi(a8, b6, c7) {
  return a8 & b6 ^ ~a8 & c7;
}
function Maj(a8, b6, c7) {
  return a8 & b6 ^ a8 & c7 ^ b6 & c7;
}
var HashMD;
var init_md = __esm({
  "node_modules/@noble/hashes/_md.js"() {
    init_u64();
    init_utils();
    HashMD = class {
      blockLen;
      outputLen;
      canXOF = false;
      padOffset;
      isLE;
      // For partial updates less than block size
      buffer;
      view;
      finished = false;
      length = 0;
      pos = 0;
      destroyed = false;
      constructor(blockLen, outputLen, padOffset, isLE) {
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.padOffset = padOffset;
        this.isLE = isLE;
        this.buffer = new Uint8Array(blockLen);
        this.view = createView(this.buffer);
      }
      update(data) {
        aexists(this);
        abytes(data);
        const { view, buffer, blockLen } = this;
        const len = data.length;
        let processed = false;
        for (let pos = 0; pos < len; ) {
          const take = Math.min(blockLen - this.pos, len - pos);
          if (take === blockLen) {
            const dataView = createView(data);
            for (; blockLen <= len - pos; pos += blockLen)
              this.process(dataView, pos);
            processed = true;
            continue;
          }
          buffer.set(pos === 0 && take === len ? data : data.subarray(pos, pos + take), this.pos);
          this.pos += take;
          pos += take;
          if (this.pos === blockLen) {
            this.process(view, 0);
            this.pos = 0;
            processed = true;
          }
        }
        this.length += data.length;
        if (processed)
          this.roundClean();
        return this;
      }
      digestInto(out) {
        aexists(this);
        aoutput(out, this);
        this.finished = true;
        const { buffer, view, blockLen, isLE } = this;
        let { pos } = this;
        buffer[pos++] = 128;
        buffer.fill(0, pos);
        if (this.padOffset > blockLen - pos) {
          this.process(view, 0);
          buffer.fill(0);
        }
        setU64FromNum(view, blockLen - 8, this.length * 8, isLE);
        this.process(view, 0);
        this.roundClean();
        const oview = out === buffer ? view : createView(out);
        const len = this.outputLen;
        const outLen = len / 4;
        const state = this.get();
        if (len % 4 || outLen > state.length)
          throw new Error("invalid outputLen");
        for (let i8 = 0; i8 < outLen; i8++)
          oview.setUint32(4 * i8, state[i8], isLE);
      }
      digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
      }
      _cloneIntoMeta(to2) {
        const { buffer, length, finished, destroyed, pos } = this;
        to2.destroyed = destroyed;
        to2.finished = finished;
        to2.length = length;
        to2.pos = pos;
        if (pos)
          to2.buffer.set(buffer);
        return to2;
      }
      clone() {
        return this._cloneInto();
      }
    };
  }
});

// node_modules/@noble/hashes/legacy.js
var legacy_exports = {};
__export(legacy_exports, {
  _MD5: () => _MD5,
  _RIPEMD160: () => _RIPEMD160,
  _SHA1: () => _SHA1,
  md5: () => md5,
  ripemd160: () => ripemd160,
  sha1: () => sha1
});
function ripemd_f(group, x7, y8, z7) {
  if (group === 0)
    return x7 ^ y8 ^ z7;
  if (group === 1)
    return x7 & y8 | ~x7 & z7;
  if (group === 2)
    return (x7 | ~y8) ^ z7;
  if (group === 3)
    return x7 & z7 | y8 & ~z7;
  return x7 ^ (y8 | ~z7);
}
var SHA1_IV, SHA1_W, _SHA1, sha1, p32, K6, MD5_IV, MD5_W, MD5_SHIFTS, _MD5, md5, Rho160, Id160, Pi160, idxLR, idxL, idxR, shifts160, shiftsL160, shiftsR160, Kl160, Kr160, BUF_160, _RIPEMD160, ripemd160;
var init_legacy = __esm({
  "node_modules/@noble/hashes/legacy.js"() {
    init_md();
    init_utils();
    SHA1_IV = /* @__PURE__ */ Uint32Array.from([
      1732584193,
      4023233417,
      2562383102,
      271733878,
      3285377520
    ]);
    SHA1_W = /* @__PURE__ */ new Uint32Array(80);
    _SHA1 = class extends HashMD {
      A = SHA1_IV[0] | 0;
      B = SHA1_IV[1] | 0;
      C = SHA1_IV[2] | 0;
      D = SHA1_IV[3] | 0;
      E = SHA1_IV[4] | 0;
      constructor() {
        super(64, 20, 8, false);
      }
      get() {
        const { A: A8, B: B7, C: C8, D: D8, E: E8 } = this;
        return [A8, B7, C8, D8, E8];
      }
      set(A8, B7, C8, D8, E8) {
        this.A = A8 | 0;
        this.B = B7 | 0;
        this.C = C8 | 0;
        this.D = D8 | 0;
        this.E = E8 | 0;
      }
      _cloneInto(to2) {
        (to2 ||= new this.constructor()).set(...this.get());
        return this._cloneIntoMeta(to2);
      }
      process(view, offset) {
        for (let i8 = 0; i8 < 16; i8++, offset += 4)
          SHA1_W[i8] = view.getUint32(offset, false);
        for (let i8 = 16; i8 < 80; i8++)
          SHA1_W[i8] = rotl(SHA1_W[i8 - 3] ^ SHA1_W[i8 - 8] ^ SHA1_W[i8 - 14] ^ SHA1_W[i8 - 16], 1);
        let { A: A8, B: B7, C: C8, D: D8, E: E8 } = this;
        for (let i8 = 0; i8 < 80; i8++) {
          let F7, K7;
          if (i8 < 20) {
            F7 = Chi(B7, C8, D8);
            K7 = 1518500249;
          } else if (i8 < 40) {
            F7 = B7 ^ C8 ^ D8;
            K7 = 1859775393;
          } else if (i8 < 60) {
            F7 = Maj(B7, C8, D8);
            K7 = 2400959708;
          } else {
            F7 = B7 ^ C8 ^ D8;
            K7 = 3395469782;
          }
          const T6 = rotl(A8, 5) + F7 + E8 + K7 + SHA1_W[i8] | 0;
          E8 = D8;
          D8 = C8;
          C8 = rotl(B7, 30);
          B7 = A8;
          A8 = T6;
        }
        A8 = A8 + this.A | 0;
        B7 = B7 + this.B | 0;
        C8 = C8 + this.C | 0;
        D8 = D8 + this.D | 0;
        E8 = E8 + this.E | 0;
        this.set(A8, B7, C8, D8, E8);
      }
      roundClean() {
        clean(SHA1_W);
      }
      destroy() {
        this.destroyed = true;
        this.set(0, 0, 0, 0, 0);
        clean(this.buffer);
      }
    };
    sha1 = /* @__PURE__ */ createHasher(() => new _SHA1());
    p32 = /* @__PURE__ */ Math.pow(2, 32);
    K6 = /* @__PURE__ */ Array.from({ length: 64 }, (_6, i8) => Math.floor(p32 * Math.abs(Math.sin(i8 + 1))));
    MD5_IV = /* @__PURE__ */ SHA1_IV.slice(0, 4);
    MD5_W = /* @__PURE__ */ new Uint32Array(16);
    MD5_SHIFTS = /* @__PURE__ */ (() => {
      const S7 = [
        [7, 12, 17, 22],
        [5, 9, 14, 20],
        [4, 11, 16, 23],
        [6, 10, 15, 21]
      ];
      return Uint8Array.from({ length: 64 }, (_6, i8) => S7[Math.floor(i8 / 16)][i8 % 4]);
    })();
    _MD5 = class extends HashMD {
      A = MD5_IV[0] | 0;
      B = MD5_IV[1] | 0;
      C = MD5_IV[2] | 0;
      D = MD5_IV[3] | 0;
      constructor() {
        super(64, 16, 8, true);
      }
      get() {
        const { A: A8, B: B7, C: C8, D: D8 } = this;
        return [A8, B7, C8, D8];
      }
      set(A8, B7, C8, D8) {
        this.A = A8 | 0;
        this.B = B7 | 0;
        this.C = C8 | 0;
        this.D = D8 | 0;
      }
      _cloneInto(to2) {
        (to2 ||= new this.constructor()).set(...this.get());
        return this._cloneIntoMeta(to2);
      }
      process(view, offset) {
        for (let i8 = 0; i8 < 16; i8++, offset += 4)
          MD5_W[i8] = view.getUint32(offset, true);
        let { A: A8, B: B7, C: C8, D: D8 } = this;
        for (let i8 = 0; i8 < 64; i8++) {
          let F7, g7;
          if (i8 < 16) {
            F7 = Chi(B7, C8, D8);
            g7 = i8;
          } else if (i8 < 32) {
            F7 = Chi(D8, B7, C8);
            g7 = (5 * i8 + 1) % 16;
          } else if (i8 < 48) {
            F7 = B7 ^ C8 ^ D8;
            g7 = (3 * i8 + 5) % 16;
          } else {
            F7 = C8 ^ (B7 | ~D8);
            g7 = 7 * i8 % 16;
          }
          F7 = F7 + A8 + K6[i8] + MD5_W[g7];
          A8 = D8;
          D8 = C8;
          C8 = B7;
          B7 = B7 + rotl(F7, MD5_SHIFTS[i8]);
        }
        A8 = A8 + this.A | 0;
        B7 = B7 + this.B | 0;
        C8 = C8 + this.C | 0;
        D8 = D8 + this.D | 0;
        this.set(A8, B7, C8, D8);
      }
      roundClean() {
        clean(MD5_W);
      }
      destroy() {
        this.destroyed = true;
        this.set(0, 0, 0, 0);
        clean(this.buffer);
      }
    };
    md5 = /* @__PURE__ */ createHasher(() => new _MD5());
    Rho160 = /* @__PURE__ */ Uint8Array.from([
      7,
      4,
      13,
      1,
      10,
      6,
      15,
      3,
      12,
      0,
      9,
      5,
      2,
      14,
      11,
      8
    ]);
    Id160 = /* @__PURE__ */ (() => Uint8Array.from(new Array(16).fill(0).map((_6, i8) => i8)))();
    Pi160 = /* @__PURE__ */ (() => Id160.map((i8) => (9 * i8 + 5) % 16))();
    idxLR = /* @__PURE__ */ (() => {
      const L5 = [Id160];
      const R7 = [Pi160];
      const res = [L5, R7];
      for (let i8 = 0; i8 < 4; i8++)
        for (let j7 of res)
          j7.push(j7[i8].map((k7) => Rho160[k7]));
      return res;
    })();
    idxL = /* @__PURE__ */ (() => idxLR[0])();
    idxR = /* @__PURE__ */ (() => idxLR[1])();
    shifts160 = /* @__PURE__ */ [
      [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
      [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
      [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
      [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
      [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
    ].map((i8) => Uint8Array.from(i8));
    shiftsL160 = /* @__PURE__ */ idxL.map((idx, i8) => idx.map((j7) => shifts160[i8][j7]));
    shiftsR160 = /* @__PURE__ */ idxR.map((idx, i8) => idx.map((j7) => shifts160[i8][j7]));
    Kl160 = /* @__PURE__ */ Uint32Array.from([
      0,
      1518500249,
      1859775393,
      2400959708,
      2840853838
    ]);
    Kr160 = /* @__PURE__ */ Uint32Array.from([
      1352829926,
      1548603684,
      1836072691,
      2053994217,
      0
    ]);
    BUF_160 = /* @__PURE__ */ new Uint32Array(16);
    _RIPEMD160 = class extends HashMD {
      h0 = 1732584193 | 0;
      h1 = 4023233417 | 0;
      h2 = 2562383102 | 0;
      h3 = 271733878 | 0;
      h4 = 3285377520 | 0;
      constructor() {
        super(64, 20, 8, true);
      }
      get() {
        const { h0, h1, h2: h22, h3: h32, h4: h42 } = this;
        return [h0, h1, h22, h32, h42];
      }
      set(h0, h1, h22, h32, h42) {
        this.h0 = h0 | 0;
        this.h1 = h1 | 0;
        this.h2 = h22 | 0;
        this.h3 = h32 | 0;
        this.h4 = h42 | 0;
      }
      _cloneInto(to2) {
        (to2 ||= new this.constructor()).set(...this.get());
        return this._cloneIntoMeta(to2);
      }
      process(view, offset) {
        for (let i8 = 0; i8 < 16; i8++, offset += 4)
          BUF_160[i8] = view.getUint32(offset, true);
        let al = this.h0 | 0, ar2 = al, bl = this.h1 | 0, br2 = bl, cl = this.h2 | 0, cr2 = cl, dl = this.h3 | 0, dr2 = dl, el = this.h4 | 0, er2 = el;
        for (let group = 0; group < 5; group++) {
          const rGroup = 4 - group;
          const hbl = Kl160[group], hbr = Kr160[group];
          const rl = idxL[group], rr2 = idxR[group];
          const sl = shiftsL160[group], sr2 = shiftsR160[group];
          for (let i8 = 0; i8 < 16; i8++) {
            const tl = rotl(al + ripemd_f(group, bl, cl, dl) + BUF_160[rl[i8]] + hbl, sl[i8]) + el | 0;
            al = el, el = dl, dl = rotl(cl, 10) | 0, cl = bl, bl = tl;
          }
          for (let i8 = 0; i8 < 16; i8++) {
            const tr2 = rotl(ar2 + ripemd_f(rGroup, br2, cr2, dr2) + BUF_160[rr2[i8]] + hbr, sr2[i8]) + er2 | 0;
            ar2 = er2, er2 = dr2, dr2 = rotl(cr2, 10) | 0, cr2 = br2, br2 = tr2;
          }
        }
        this.set(this.h1 + cl + dr2 | 0, this.h2 + dl + er2 | 0, this.h3 + el + ar2 | 0, this.h4 + al + br2 | 0, this.h0 + bl + cr2 | 0);
      }
      roundClean() {
        clean(BUF_160);
      }
      destroy() {
        this.destroyed = true;
        clean(this.buffer);
        this.set(0, 0, 0, 0, 0);
      }
    };
    ripemd160 = /* @__PURE__ */ createHasher(() => new _RIPEMD160());
  }
});

// node_modules/@protontech/crypto/src/utils.ts
function utf8StringToUint8Array(str) {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}
function uint8ArrayToUtf8String(utf8Bytes) {
  const decoder = new TextDecoder();
  return decoder.decode(utf8Bytes);
}
function mergeUint8Arrays(arrays) {
  const length = arrays.reduce((sum, arr) => sum + arr.length, 0);
  const chunksAll = new Uint8Array(length);
  arrays.reduce((position, arr) => {
    chunksAll.set(arr, position);
    return position + arr.length;
  }, 0);
  return chunksAll;
}
var isString, uint8ArrayToBinaryString, binaryStringToUint8Array;
var init_utils2 = __esm({
  "node_modules/@protontech/crypto/src/utils.ts"() {
    isString = (data) => {
      return typeof data === "string" || data instanceof String;
    };
    uint8ArrayToBinaryString = (bytes) => {
      const result = [];
      const bs2 = 1 << 14;
      const j7 = bytes.length;
      for (let i8 = 0; i8 < j7; i8 += bs2) {
        result.push(
          // eslint-disable-next-line prefer-spread
          String.fromCharCode.apply(
            String,
            // @ts-expect-error expects number[] instead of Uint8Array
            bytes.subarray(i8, Math.min(i8 + bs2, j7))
          )
        );
      }
      return result.join("");
    };
    binaryStringToUint8Array = (binaryString) => {
      if (!isString(binaryString)) {
        throw new Error(
          "binaryStringToUint8Array: Data must be in the form of a string"
        );
      }
      const result = new Uint8Array(binaryString.length);
      for (let i8 = 0; i8 < binaryString.length; i8++) {
        result[i8] = binaryString.charCodeAt(i8);
      }
      return result;
    };
  }
});

// node_modules/@protontech/crypto/src/jsmimeparser/utils.js
function decode_qp(buffer) {
  const decoded = buffer.replace(
    // Replace either =<hex><hex> or =<wsp>CRLF
    /=([0-9A-F][0-9A-F]|[ \t]*(\r\n|[\r\n]|$))/gi,
    function(match, param) {
      if (param.trim().length == 0) {
        return "";
      }
      return String.fromCharCode(parseInt(param, 16));
    }
  );
  return [decoded, ""];
}
function decode_base64(buffer, more) {
  let sanitize = buffer.replace(/[^A-Za-z0-9+/=]/g, "");
  sanitize = sanitize.replace(/=+([A-Za-z0-9+/])/g, "$1");
  const excess = sanitize.length % 4;
  if (excess != 0 && more) {
    buffer = sanitize.slice(-excess);
  } else {
    buffer = "";
  }
  sanitize = sanitize.substring(0, sanitize.length - excess);
  sanitize = sanitize.replace(/(====)+$/g, "");
  return [atob(sanitize), buffer];
}
var kMonthNames;
var init_utils3 = __esm({
  "node_modules/@protontech/crypto/src/jsmimeparser/utils.js"() {
    init_utils2();
    kMonthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
  }
});

// node_modules/@protontech/crypto/src/jsmimeparser/textDecoders.js
function MimeTextDecoder(charset, options) {
  switch (charset.toLowerCase()) {
    case "utf-7":
      return new UTF7TextDecoder();
    case "utf-7-imap":
      return new UTF7ImapTextDecoder();
    case "cp932":
      return new TextDecoder("shift_jis", options);
    default:
      return new TextDecoder(charset, options);
  }
}
function decodeFromUTF7(str) {
  const octets = Uint8Array.fromBase64(str);
  let output = "";
  for (let i8 = 0, len = octets.length; i8 < len; ) {
    output += String.fromCharCode(octets[i8++] << 8 | octets[i8++]);
  }
  return output;
}
var UTF7TextDecoder, UTF7ImapTextDecoder, decodeUtf7, decodeUtf7Imap;
var init_textDecoders = __esm({
  "node_modules/@protontech/crypto/src/jsmimeparser/textDecoders.js"() {
    init_utils3();
    UTF7TextDecoder = class {
      constructor() {
        this.collectInput = "";
        this.decodeString = decodeUtf7;
      }
      decode(input, options = {}) {
        const more = options.stream;
        if (input) {
          this.collectInput += uint8ArrayToBinaryString(input);
        }
        if (more) {
          return "";
        }
        return this.decodeString(this.collectInput);
      }
    };
    UTF7ImapTextDecoder = class extends UTF7TextDecoder {
      constructor() {
        super();
        this.decodeString = decodeUtf7Imap;
      }
    };
    decodeUtf7 = (str) => str.replace(/\+([A-Za-z0-9/]*)-?/gi, (_6, chunk) => chunk === "" ? "+" : decodeFromUTF7(chunk));
    decodeUtf7Imap = (str) => str.replace(/&([^-]*)-/g, (_6, chunk) => chunk === "" ? "&" : decodeFromUTF7(chunk.replace(/,/g, "/")));
  }
});

// node_modules/@protontech/crypto/src/jsmimeparser/structuredHeaders.js
function addHeader(name, decoder, encoder) {
  const lowerName = name.toLowerCase();
  structuredDecoders.set(lowerName, decoder);
  structuredEncoders.set(lowerName, encoder);
  preferredSpellings.set(lowerName, name);
}
function parseAddress(value) {
  const headerparser2 = this;
  return value.reduce(function(results, header) {
    return results.concat(headerparser2.parseAddressingHeader(header, true));
  }, []);
}
function writeAddress(value) {
  if (!Array.isArray(value)) {
    value = [value];
  }
  this.addAddresses(value);
}
function parseParameterHeader(value, do2231, do2047) {
  return this.parseParameterHeader(value[0], do2231, do2047);
}
function parseContentType(value) {
  let params = parseParameterHeader.call(this, value, false, false);
  const origtype = params.preSemi;
  let parts = origtype.split("/");
  if (parts.length != 2) {
    params = /* @__PURE__ */ new Map();
    parts = ["text", "plain"];
  }
  const mediatype = parts[0].toLowerCase();
  const subtype = parts[1].toLowerCase();
  const type = mediatype + "/" + subtype;
  const structure = /* @__PURE__ */ new Map();
  structure.mediatype = mediatype;
  structure.subtype = subtype;
  structure.type = type;
  params.forEach(function(value2, name) {
    structure.set(name.toLowerCase(), value2);
  });
  return structure;
}
function parseUnstructured(values) {
  return this.decodeRFC2047Words(values[0]);
}
function writeUnstructured(value) {
  this.addUnstructured(value);
}
function parseMessageID(values) {
  return this.decodeRFC2047Words(values[0]);
}
function writeMessageID(value) {
  this.addUnstructured(value);
}
function parseDate(values) {
  return this.parseDateHeader(values[0]);
}
function writeDate(value) {
  this.addDate(value);
}
function preprocessMessageIDs(values) {
  const msgId = /<[^>]*>/g;
  let match;
  const ids = [];
  while ((match = msgId.exec(values)) !== null) {
    ids.push(match[0]);
  }
  return ids.join(" ");
}
var structuredDecoders, structuredEncoders, preferredSpellings;
var init_structuredHeaders = __esm({
  "node_modules/@protontech/crypto/src/jsmimeparser/structuredHeaders.js"() {
    structuredDecoders = /* @__PURE__ */ new Map();
    structuredEncoders = /* @__PURE__ */ new Map();
    preferredSpellings = /* @__PURE__ */ new Map();
    addHeader("Bcc", parseAddress, writeAddress);
    addHeader("Cc", parseAddress, writeAddress);
    addHeader("From", parseAddress, writeAddress);
    addHeader("Reply-To", parseAddress, writeAddress);
    addHeader("Resent-Bcc", parseAddress, writeAddress);
    addHeader("Resent-Cc", parseAddress, writeAddress);
    addHeader("Resent-From", parseAddress, writeAddress);
    addHeader("Resent-Reply-To", parseAddress, writeAddress);
    addHeader("Resent-Sender", parseAddress, writeAddress);
    addHeader("Resent-To", parseAddress, writeAddress);
    addHeader("Sender", parseAddress, writeAddress);
    addHeader("To", parseAddress, writeAddress);
    addHeader("Approved", parseAddress, writeAddress);
    addHeader("Disposition-Notification-To", parseAddress, writeAddress);
    addHeader("Delivered-To", parseAddress, writeAddress);
    addHeader("Return-Receipt-To", parseAddress, writeAddress);
    addHeader("Mail-Reply-To", parseAddress, writeAddress);
    addHeader("Mail-Followup-To", parseAddress, writeAddress);
    structuredDecoders.set("Content-Type", parseContentType);
    addHeader("Comments", parseUnstructured, writeUnstructured);
    addHeader("Keywords", parseUnstructured, writeUnstructured);
    addHeader("Subject", parseUnstructured, writeUnstructured);
    addHeader("MIME-Version", parseUnstructured, writeUnstructured);
    addHeader("Content-Description", parseUnstructured, writeUnstructured);
    addHeader("User-Agent", parseUnstructured, writeUnstructured);
    addHeader("Date", parseDate, writeDate);
    addHeader("Resent-Date", parseDate, writeDate);
    addHeader("Expires", parseDate, writeDate);
    addHeader("Injection-Date", parseDate, writeDate);
    addHeader("NNTP-Posting-Date", parseDate, writeDate);
    addHeader("Message-ID", parseMessageID, writeMessageID);
    addHeader("Resent-Message-ID", parseMessageID, writeMessageID);
    structuredDecoders.set("Content-Transfer-Encoding", function(values) {
      return values[0].toLowerCase();
    });
    structuredEncoders.set("Content-Transfer-Encoding", writeUnstructured);
    structuredDecoders.set("References", preprocessMessageIDs);
    structuredDecoders.set("In-Reply-To", preprocessMessageIDs);
  }
});

// node_modules/@protontech/crypto/src/jsmimeparser/headerParser.js
function cleanToken(token) {
  token = token.replace(
    /[\xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/g,
    " "
  );
  token = token.replace(
    // oxlint-disable-next-line no-misleading-character-class
    /[\u034F\u17B4\u17B5\u180B-\u180D\uFE00-\uFE0F]/g,
    ""
  );
  token = token.replace(/\uDB40[\uDD00-\uDDEF]/g, "");
  token = token.replace(/(?![\t\n\r])[\0-\x1F\x7F-\x9F]/g, "");
  token = token.replace(
    /(?:[\xAD\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC38]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F])/g,
    " "
  );
  token = token.replace(/\u2800/g, " ");
  return token;
}
function getHeaderTokens(value, delimiters, opts) {
  const tokenList = [];
  function Token(token) {
    this.token = token.replace(/\\(.?)/g, "$1");
  }
  Token.prototype.toString = function() {
    return this.token;
  };
  let tokenStart = void 0;
  const wsp = " 	\r\n";
  let endQuote = void 0;
  let commentDepth = 0;
  const length = value.length;
  for (let i8 = 0; i8 < length; i8++) {
    const ch = value[i8];
    if (ch == "\\") {
      i8++;
      continue;
    }
    if (endQuote !== void 0) {
      if (ch == endQuote && ch == '"') {
        let text = value.slice(tokenStart + 1, i8);
        if (opts.rfc2047) {
          text = decodeRFC2047Words(text);
        }
        tokenList.push(new Token(text));
        endQuote = void 0;
        tokenStart = void 0;
      } else if (ch == endQuote && ch == "]") {
        tokenList.push(new Token(value.slice(tokenStart, i8 + 1)));
        endQuote = void 0;
        tokenStart = void 0;
      }
      continue;
    }
    if (opts.rfc2047 && ch == "=" && i8 + 1 < value.length && value[i8 + 1] == "?") {
      const encodedWordsRE = /([ \t\r\n]*=\?[^?]*\?[BbQq]\?[^?]*\?=)+/;
      const result = encodedWordsRE.exec(value.slice(i8));
      if (result !== null) {
        if (tokenStart !== void 0) {
          tokenList.push(new Token(value.slice(tokenStart, i8)));
          tokenStart = void 0;
        }
        const encWordsLen = result[0].length;
        const string = decodeRFC2047Words(
          value.slice(i8, i8 + encWordsLen),
          "UTF-8"
        );
        tokenList.push({
          toString() {
            return string;
          }
        });
        i8 += encWordsLen - 1;
        continue;
      }
    }
    let tokenIsEnding = false, tokenIsStarting = false, isSpecial = false;
    if (wsp.includes(ch)) {
      tokenIsEnding = true;
    } else if (commentDepth == 0 && delimiters.includes(ch)) {
      tokenIsEnding = true;
      isSpecial = true;
    } else if (opts.qstring && ch == '"') {
      tokenIsEnding = true;
      tokenIsStarting = true;
      endQuote = ch;
    } else if (opts.dliteral && ch == "[") {
      tokenIsEnding = true;
      tokenIsStarting = true;
      endQuote = "]";
    } else if (opts.comments && ch == "(") {
      commentDepth++;
      if (commentDepth == 1) {
        tokenIsEnding = true;
        isSpecial = true;
      } else {
        tokenIsStarting = true;
      }
    } else if (opts.comments && ch == ")") {
      if (commentDepth > 0) {
        commentDepth--;
      }
      if (commentDepth == 0) {
        tokenIsEnding = true;
        isSpecial = true;
      } else {
        tokenIsStarting = true;
      }
    } else {
      tokenIsStarting = true;
    }
    if (tokenIsEnding && tokenStart !== void 0) {
      tokenList.push(new Token(value.slice(tokenStart, i8)));
      tokenStart = void 0;
    }
    if (isSpecial) {
      tokenList.push(ch);
    }
    if (tokenIsStarting && tokenStart === void 0) {
      tokenStart = i8;
    }
  }
  if (tokenStart !== void 0) {
    if (endQuote == '"') {
      tokenList.push(new Token(value.slice(tokenStart + 1)));
    } else {
      tokenList.push(new Token(value.slice(tokenStart)));
    }
  }
  return tokenList;
}
function convert8BitHeader(headerValue, fallbackCharset) {
  if (/[\x80-\xff]/.exec(headerValue)) {
    const typedarray = binaryStringToUint8Array(headerValue);
    const hasFallback = fallbackCharset && !fallbackCharset.toLowerCase().startsWith("utf");
    const utf8Decoder = new MimeTextDecoder("utf-8", { fatal: hasFallback });
    try {
      headerValue = utf8Decoder.decode(typedarray);
    } catch {
      try {
        const decoder = new MimeTextDecoder(fallbackCharset, {
          fatal: false
        });
        headerValue = decoder.decode(typedarray);
      } catch {
      }
    }
  }
  return headerValue;
}
function decodeRFC2047Words(headerValue) {
  let lastCharset = "", currentDecoder = void 0;
  function decode2047Token(token, isLastToken) {
    const tokenParts = token.split("?");
    if (tokenParts.length != 5 || tokenParts[4] != "=") {
      return false;
    }
    const charset = tokenParts[1].split("*", 1)[0];
    const encoding = tokenParts[2], text = tokenParts[3];
    let buffer;
    if (encoding == "B" || encoding == "b") {
      if (/[^ A-Za-z0-9+/=]/.exec(text)) {
        return false;
      }
      buffer = decode_base64(text, false)[0];
    } else if (encoding == "Q" || encoding == "q") {
      buffer = decode_qp(text.replace(/_/g, " "), false)[0];
    } else {
      return false;
    }
    const stringBuffer = buffer;
    buffer = binaryStringToUint8Array(buffer);
    let output = "";
    if (charset != lastCharset && currentDecoder) {
      output += currentDecoder.decode();
      currentDecoder = null;
    }
    lastCharset = charset;
    if (!currentDecoder) {
      try {
        currentDecoder = new MimeTextDecoder(charset, { fatal: false });
      } catch {
        return false;
      }
    }
    let doStreaming;
    if (isLastToken || charset.toUpperCase() == "ISO-2022-JP" && stringBuffer.endsWith("\x1B(B")) {
      doStreaming = { stream: false };
    } else {
      doStreaming = { stream: true };
    }
    return output + currentDecoder.decode(buffer, doStreaming);
  }
  const components = headerValue.split(/(=\?[^?]*\?[BQbq]\?[^?]*\?=)/);
  let lastRFC2047Index = -1;
  for (let i8 = 0; i8 < components.length; i8++) {
    if (components[i8].startsWith("=?")) {
      lastRFC2047Index = i8;
    }
  }
  for (let i8 = 0; i8 < components.length; i8++) {
    if (components[i8].startsWith("=?")) {
      const decoded = decode2047Token(components[i8], i8 == lastRFC2047Index);
      if (decoded !== false) {
        components[i8] = decoded;
        continue;
      }
    } else if (/^[ \t\r\n]*$/.exec(components[i8])) {
      components[i8] = "";
      continue;
    }
    lastCharset = "";
    if (currentDecoder) {
      components[i8] = currentDecoder.decode() + components[i8];
      currentDecoder = null;
    }
  }
  return components.join("");
}
function parseAddressingHeader(header, doRFC2047) {
  if (doRFC2047 === void 0) {
    doRFC2047 = true;
  }
  let results = [];
  let addrlist = [];
  let name = "", groupName = "", localPart = "", address = "", comment = "";
  let inAngle = false, inComment = false, needsSpace = false, afterAddress = false;
  let preserveSpace = false;
  let commentClosed = false;
  let lastComment = "";
  function addToAddrList(displayName, addrSpec) {
    const lp = addrSpec.substring(0, addrSpec.lastIndexOf("@"));
    if (/[ !()<>[\]:;@\\,"]/.exec(lp) !== null) {
      addrSpec = '"' + lp.replace(/([\\"])/g, "\\$1") + '"' + addrSpec.substring(addrSpec.lastIndexOf("@"));
    }
    displayName = displayName.replace(/\s+/g, " ").trim();
    if (displayName === "" && lastComment !== "") {
      const offset = lastComment.startsWith(" ") ? 2 : 1;
      displayName = lastComment.substr(
        offset,
        lastComment.length - offset - 1
      );
    }
    if (displayName !== "" || addrSpec !== "") {
      addrlist.push({ name: displayName, email: addrSpec });
    }
    name = localPart = address = lastComment = "";
    inAngle = inComment = needsSpace = afterAddress = false;
  }
  for (let headerToken of getHeaderTokens(header, ":,;<>@", {
    qstring: true,
    comments: true,
    dliteral: true,
    rfc2047: doRFC2047
  })) {
    if (headerToken === ":") {
      groupName = name;
      name = "";
      localPart = "";
      if (addrlist.length > 0) {
        results = results.concat(addrlist);
      }
      addrlist = [];
    } else if (headerToken === "<" && !afterAddress) {
      if (inAngle) {
        if (address.length > 0) {
          name = address;
        }
        localPart = address = "";
      } else {
        inAngle = true;
      }
    } else if (headerToken === ">" && !afterAddress) {
      inAngle = false;
      lastComment = "";
      afterAddress = true;
    } else if (headerToken === "(") {
      inComment = true;
      preserveSpace = needsSpace;
      if (!needsSpace) {
        needsSpace = name !== "" && name.substr(-1) !== " ";
      }
      comment = needsSpace ? " (" : "(";
      commentClosed = false;
    } else if (headerToken === ")") {
      inComment = false;
      comment += ")";
      lastComment = comment;
      if (inAngle) {
        needsSpace = preserveSpace;
      } else {
        name += comment;
        needsSpace = true;
      }
      commentClosed = true;
      continue;
    } else if (headerToken === "@") {
      if (afterAddress) {
        continue;
      }
      if (!inAngle) {
        address = localPart;
        name = "";
        localPart = "";
        inAngle = true;
      }
      address += "@";
    } else if (headerToken === ",") {
      addToAddrList(name, address);
      afterAddress = false;
    } else if (headerToken === ";") {
      addToAddrList(name, address);
      if (groupName === "") {
        results = results.concat(addrlist);
      } else {
        results.push({
          name: groupName,
          group: addrlist
        });
      }
      addrlist = [];
      groupName = "";
    } else {
      headerToken = cleanToken(headerToken.toString());
      let spacedToken = headerToken;
      if (needsSpace && headerToken && headerToken[0] != ".") {
        spacedToken = " " + spacedToken;
      }
      if (inComment) {
        comment += spacedToken;
      } else if (inAngle) {
        address += spacedToken;
      } else {
        if (!afterAddress) {
          name += spacedToken;
        }
        if (commentClosed) {
          localPart += headerToken;
          commentClosed = false;
        } else {
          localPart += spacedToken;
        }
      }
      needsSpace = headerToken && headerToken[0] != ".";
      continue;
    }
    needsSpace = false;
  }
  addToAddrList(name, address);
  if (groupName !== "") {
    results.push({ name: groupName, group: addrlist });
    addrlist = [];
  }
  return results.concat(addrlist);
}
function parseParameterHeader2(headerValue, doRFC2047, doRFC2231) {
  const semi = headerValue.indexOf(";");
  let start, rest;
  if (semi < 0) {
    start = headerValue;
    rest = "";
  } else {
    start = headerValue.substring(0, semi);
    rest = headerValue.substring(semi);
  }
  start = start.trim().split(/[ \t\r\n]/)[0];
  const opts = { qstring: true, rfc2047: doRFC2047 };
  let name = "", inName = true;
  const matches = [];
  for (let headerToken of getHeaderTokens(rest, ";=", opts)) {
    if (headerToken === ";") {
      if (name != "" && !inName) {
        matches.push([name, ""]);
      }
      name = "";
      inName = true;
    } else if (headerToken === "=") {
      inName = false;
    } else if (inName && name == "") {
      name = headerToken.toString();
    } else if (!inName && name != "") {
      headerToken = headerToken.toString();
      if (doRFC2231 && name.endsWith("*")) {
        headerToken = headerToken.replace(/%([0-9A-Fa-f]{2})/g, function(match, hexchars) {
          return String.fromCharCode(parseInt(hexchars, 16));
        });
      }
      matches.push([name, headerToken]);
      name = "";
    } else if (inName) {
      name = "";
    }
  }
  if (name != "" && !inName) {
    matches.push([name, ""]);
  }
  const simpleValues = /* @__PURE__ */ new Map(), charsetValues = /* @__PURE__ */ new Map(), continuationValues = /* @__PURE__ */ new Map();
  for (const pair of matches) {
    let name2 = pair[0];
    const value = pair[1];
    const star = name2.indexOf("*");
    if (star == -1) {
      if (!simpleValues.has(name2)) {
        simpleValues.set(name2, value);
      }
    } else if (star == name2.length - 1) {
      name2 = name2.substring(0, star);
      if (!charsetValues.has(name2)) {
        charsetValues.set(name2, value);
      }
    } else {
      const param = name2.substring(0, star);
      let entry = continuationValues.get(param);
      if (continuationValues.has(param) && !entry.valid) {
        continue;
      }
      if (!continuationValues.has(param)) {
        entry = [];
        entry.valid = true;
        entry.hasCharset = void 0;
        continuationValues.set(param, entry);
      }
      const lastStar = name2[name2.length - 1] == "*";
      let number = name2.substring(
        star + 1,
        name2.length - (lastStar ? 1 : 0)
      );
      if (number == "0") {
        entry.hasCharset = lastStar;
      } else if (number.length == 0 || number[0] == "0" && number != "0" || !/^[0-9]+$/.test(number)) {
        entry.valid = false;
        continue;
      }
      number = parseInt(number, 10);
      if (entry[number] !== void 0) {
        entry.valid = false;
        continue;
      }
      entry[number] = value;
    }
  }
  const values = /* @__PURE__ */ new Map();
  for (const pair of simpleValues) {
    values.set(pair[0], pair[1]);
  }
  if (doRFC2231) {
    for (const pair of continuationValues) {
      const name2 = pair[0];
      const entry = pair[1];
      if (entry.hasCharset === void 0) {
        continue;
      }
      let valid = true;
      for (var i8 = 0; valid && i8 < entry.length; i8++) {
        if (entry[i8] === void 0) {
          valid = false;
        }
      }
      let value = entry.slice(0, i8).join("");
      if (entry.hasCharset) {
        try {
          value = decode2231Value(value);
        } catch {
          continue;
        }
      }
      values.set(name2, value);
    }
    for (const pair of charsetValues) {
      try {
        values.set(pair[0], decode2231Value(pair[1]));
      } catch {
      }
    }
  }
  values.preSemi = start;
  return values;
}
function decode2231Value(value) {
  const quote1 = value.indexOf("'");
  const quote2 = quote1 >= 0 ? value.indexOf("'", quote1 + 1) : -1;
  const charset = quote1 >= 0 ? value.substring(0, quote1) : "";
  value = value.substring(Math.max(quote1, quote2) + 1);
  const typedarray = binaryStringToUint8Array(value);
  return new MimeTextDecoder(charset, { fatal: true }).decode(typedarray, {
    stream: false
  });
}
function parseDateHeader(header) {
  let tokens = getHeaderTokens(header, ",:", {}).map((x7) => x7.toString());
  if (tokens.length > 1 && tokens[1] === ",") {
    tokens = tokens.slice(2);
  }
  if (tokens.length < 8) {
    return /* @__PURE__ */ new Date(NaN);
  }
  const day = parseInt(tokens[0]);
  let year = parseInt(tokens[2]);
  const hours = parseInt(tokens[3]);
  const minutes = parseInt(tokens[5]);
  const seconds = parseInt(tokens[7]);
  let month = kMonthNames.indexOf(tokens[1].slice(0, 3));
  if (month < 0) {
    month = NaN;
  }
  if (year < 100) {
    year += year < 50 ? 2e3 : 1900;
  }
  let tzoffset = tokens[8];
  if (tzoffset in kKnownTZs) {
    tzoffset = kKnownTZs[tzoffset];
  }
  let decompose = /^([+-])(\d\d)(\d\d)$/.exec(tzoffset);
  if (decompose === null) {
    decompose = ["+0000", "+", "00", "00"];
  }
  let tzOffsetInMin = parseInt(decompose[2]) * 60 + parseInt(decompose[3]);
  if (decompose[1] == "-") {
    tzOffsetInMin = -tzOffsetInMin;
  }
  const finalDate = new Date(
    Date.UTC(year, month, day, hours, minutes, seconds) - tzOffsetInMin * 60 * 1e3
  );
  return finalDate;
}
function parseStructuredHeader(header, value) {
  if (typeof value === "string" || value instanceof String) {
    value = [value];
  }
  if (!Array.isArray(value)) {
    throw new TypeError("Header value is not an array: " + value);
  }
  const lowerHeader = header.toLowerCase();
  if (structuredDecoders2.has(lowerHeader)) {
    return structuredDecoders2.get(lowerHeader).call(headerparser, value);
  }
  throw new Error("Unknown structured header: " + header);
}
function addStructuredDecoder(header, decoder) {
  const lowerHeader = header.toLowerCase();
  if (forbiddenHeaders.has(lowerHeader)) {
    throw new Error("Cannot override header: " + header);
  }
  structuredDecoders2.set(lowerHeader, decoder);
  if (!preferredSpellings.has(lowerHeader)) {
    preferredSpellings.set(lowerHeader, header);
  }
}
var headerparser, kKnownTZs, structuredDecoders2, forbiddenHeaders, headerParser_default;
var init_headerParser = __esm({
  "node_modules/@protontech/crypto/src/jsmimeparser/headerParser.js"() {
    init_utils3();
    init_textDecoders();
    init_structuredHeaders();
    headerparser = {};
    kKnownTZs = {
      // The following timezones are explicitly listed in RFC 5322.
      UT: "+0000",
      GMT: "+0000",
      EST: "-0500",
      EDT: "-0400",
      CST: "-0600",
      CDT: "-0500",
      MST: "-0700",
      MDT: "-0600",
      PST: "-0800",
      PDT: "-0700",
      // The following are time zones copied from NSPR's prtime.c
      AST: "-0400",
      // Atlantic Standard Time
      NST: "-0330",
      // Newfoundland Standard Time
      BST: "+0100",
      // British Summer Time
      MET: "+0100",
      // Middle Europe Time
      EET: "+0200",
      // Eastern Europe Time
      JST: "+0900"
      // Japan Standard Time
    };
    structuredDecoders2 = /* @__PURE__ */ new Map();
    forbiddenHeaders = /* @__PURE__ */ new Set();
    for (const pair of structuredDecoders) {
      addStructuredDecoder(pair[0], pair[1]);
      forbiddenHeaders.add(pair[0].toLowerCase());
    }
    headerparser.addStructuredDecoder = addStructuredDecoder;
    headerparser.convert8BitHeader = convert8BitHeader;
    headerparser.decodeRFC2047Words = decodeRFC2047Words;
    headerparser.getHeaderTokens = getHeaderTokens;
    headerparser.parseAddressingHeader = parseAddressingHeader;
    headerparser.parseDateHeader = parseDateHeader;
    headerparser.parseParameterHeader = parseParameterHeader2;
    headerparser.parseStructuredHeader = parseStructuredHeader;
    headerParser_default = Object.freeze(headerparser);
  }
});

// node_modules/@protontech/crypto/src/jsmimeparser/rawMimeParser.js
function StructuredHeaders(rawHeaderText, options) {
  const values = rawHeaderText.split(/(?:\r\n|\n)(?![ \t])|\r(?![ \t\n])/);
  if (values.length > 0 && values[0].substring(0, 5) == "From ") {
    values.shift();
    if (values.length == 0) {
      rawHeaderText = "";
    } else {
      rawHeaderText = rawHeaderText.substring(
        rawHeaderText.indexOf(values[0])
      );
    }
  }
  const headers = /* @__PURE__ */ new Map();
  for (let i8 = 0; i8 < values.length; i8++) {
    const colon = values[i8].indexOf(":");
    let header, val;
    if (colon >= 0) {
      header = values[i8].substring(0, colon);
      val = values[i8].substring(colon + 1).trim();
      if (options.stripcontinuations) {
        val = val.replace(/[\r\n]/g, "");
      }
    } else {
      header = values[i8];
      val = "";
    }
    header = header.trim().toLowerCase();
    if (header == "") {
      continue;
    }
    if (headers.has(header)) {
      headers.get(header).push(val);
    } else {
      headers.set(header, [val]);
    }
  }
  this._rawHeaders = headers;
  this._cachedHeaders = /* @__PURE__ */ new Map();
  Object.defineProperty(this, "rawHeaderText", {
    get() {
      return rawHeaderText;
    }
  });
  Object.defineProperty(this, "size", {
    get() {
      return this._rawHeaders.size;
    }
  });
  Object.defineProperty(this, "charset", {
    get() {
      return this._charset;
    },
    set(value) {
      this._charset = value;
      this._cachedHeaders.clear();
    }
  });
  if ("charset" in options) {
    this._charset = options.charset;
  } else {
    this._charset = null;
  }
  Object.defineProperty(this, "contentType", {
    configurable: true,
    get() {
      return this.get("Content-Type");
    }
  });
}
function capitalize(headerName) {
  return headerName.replace(/\b[a-z]/g, function(match) {
    return match.toUpperCase();
  });
}
function MimeParser(emitter, options) {
  this._emitter = emitter;
  this._options = {
    pruneat: "",
    bodyformat: "nodecode",
    strformat: "binarystring",
    stripcontinuations: true,
    charset: "",
    "force-charset": false,
    onerror: () => {
    }
  };
  if (options) {
    for (const opt in options) {
      this._options[opt] = options[opt];
    }
  }
  if (typeof this._options.onerror != "function") {
    throw new Error("onerror callback must be a function");
  }
  this.resetParser();
}
function conditionToEndOnCRLF(buffer) {
  const lastCR = buffer.lastIndexOf("\r", buffer.length - 2);
  const lastLF = buffer.lastIndexOf("\n");
  const end = lastLF > lastCR ? lastLF : lastCR;
  return [buffer.substring(0, end + 1), buffer.substring(end + 1)];
}
var JS_HAS_SYMBOLS, ITERATOR_SYMBOL, PARSING_HEADERS, SEND_TO_BLACK_HOLE, SEND_TO_EMITTER, SEND_TO_SUBPARSER, ContentDecoders, rawMimeParser_default;
var init_rawMimeParser = __esm({
  "node_modules/@protontech/crypto/src/jsmimeparser/rawMimeParser.js"() {
    init_utils3();
    init_headerParser();
    init_structuredHeaders();
    init_textDecoders();
    StructuredHeaders.prototype.getRawHeader = function(headerName) {
      return this._rawHeaders.get(headerName.toLowerCase());
    };
    StructuredHeaders.prototype.get = function(headerName) {
      headerName = headerName.toLowerCase();
      if (this._cachedHeaders.has(headerName)) {
        return this._cachedHeaders.get(headerName);
      }
      let headerValue = this._rawHeaders.get(headerName);
      if (headerValue === void 0) {
        return headerValue;
      }
      const charset = this.charset;
      headerValue = headerValue.map(function(value) {
        return headerParser_default.convert8BitHeader(value, charset);
      });
      let structured;
      try {
        structured = headerParser_default.parseStructuredHeader(
          headerName,
          headerValue
        );
      } catch {
        structured = headerValue.map(function(value) {
          return headerParser_default.decodeRFC2047Words(value);
        });
      }
      this._cachedHeaders.set(headerName, structured);
      return structured;
    };
    StructuredHeaders.prototype.has = function(headerName) {
      return this._rawHeaders.has(headerName.toLowerCase());
    };
    JS_HAS_SYMBOLS = typeof Symbol === "function";
    ITERATOR_SYMBOL = JS_HAS_SYMBOLS ? Symbol.iterator : "@@iterator";
    StructuredHeaders.prototype[ITERATOR_SYMBOL] = function* () {
      for (const headerName of this.keys()) {
        yield [headerName, this.get(headerName)];
      }
    };
    StructuredHeaders.prototype.forEach = function(callback, thisarg) {
      for (const [header, value] of this) {
        callback.call(thisarg, value, header, this);
      }
    };
    StructuredHeaders.prototype.entries = StructuredHeaders.prototype[Symbol.iterator];
    StructuredHeaders.prototype.keys = function* () {
      for (const name of this._rawHeaders.keys()) {
        yield preferredSpellings.get(name) || capitalize(name);
      }
    };
    StructuredHeaders.prototype.values = function* () {
      for (const [, value] of this) {
        yield value;
      }
    };
    MimeParser.prototype.resetParser = function() {
      this._state = PARSING_HEADERS;
      this._holdData = "";
      this._headerData = "";
      this._triggeredCall = false;
      this._splitRegex = this._handleSplit = void 0;
      this._subparser = this._subPartNum = void 0;
      this._savedBuffer = "";
      this._convertData = void 0;
      this._decoder = void 0;
    };
    MimeParser.prototype.deliverData = function(buffer) {
      if (this._holdData) {
        buffer = this._holdData + buffer;
        this._holdData = "";
      }
      if (buffer.length > 0) {
        [buffer, this._holdData] = conditionToEndOnCRLF(buffer);
      }
      if (buffer.length == 0) {
        return;
      }
      if (!this._triggeredCall) {
        this._callEmitter("startMessage");
        this._triggeredCall = true;
      }
      this._dispatchData("", buffer, true);
    };
    MimeParser.prototype.deliverEOF = function() {
      if (!this._triggeredCall) {
        this._triggeredCall = true;
        this._callEmitter("startMessage");
      }
      if (this._holdData) {
        this._dispatchData("", this._holdData, true);
      }
      this._dispatchEOF("");
      this._callEmitter("endMessage");
    };
    MimeParser.prototype._callEmitter = function(funcname, ...args) {
      if (this._emitter && funcname in this._emitter) {
        if (args.length > 0 && this._willIgnorePart(args[0])) {
          return;
        }
        try {
          this._emitter[funcname](...args);
        } catch (e8) {
          this._options.onerror(e8);
        }
      }
    };
    MimeParser.prototype._willIgnorePart = function(part) {
      if (this._options.pruneat) {
        const match = this._options.pruneat;
        const start = part.substr(0, match.length);
        if (start != match || match.length < part.length && !"$.".includes(part[match.length])) {
          return true;
        }
      }
      return false;
    };
    PARSING_HEADERS = 1;
    SEND_TO_BLACK_HOLE = 2;
    SEND_TO_EMITTER = 3;
    SEND_TO_SUBPARSER = 4;
    MimeParser.prototype._dispatchData = function(partNum, buffer, checkSplit) {
      if (this._state == PARSING_HEADERS) {
        this._headerData += buffer;
        const result = /(?:^(?:\r\n|[\r\n]))|(\r\n|[\r\n])\1/.exec(
          this._headerData
        );
        if (result != null) {
          const headers = this._headerData.substr(0, result.index);
          buffer = this._headerData.substring(result.index + result[0].length);
          this._headerData = headers;
          this._headers = this._parseHeaders();
          this._callEmitter("startPart", partNum, this._headers);
          this._startBody(partNum);
        } else {
          return;
        }
      }
      if (checkSplit && this._splitRegex) {
        const splitResult = this._splitRegex.exec(buffer);
        if (splitResult) {
          const start = splitResult.index, len = splitResult[0].length;
          if (start > 0) {
            this._dispatchData(partNum, buffer.substr(0, start), false);
          }
          this._handleSplit(partNum, splitResult);
          buffer = buffer.substring(start + len);
          if (buffer.length > 0) {
            this._dispatchData(partNum, buffer, true);
          }
          return;
        }
      }
      if (this._state == SEND_TO_BLACK_HOLE) {
      } else if (this._state == SEND_TO_EMITTER) {
        const passData = this._options.bodyformat != "none";
        if (!passData || this._willIgnorePart(partNum)) {
          return;
        }
        const { coerced, raw } = this._applyDataConversion(buffer, this._options.strformat);
        this._callEmitter("deliverPartData", partNum, coerced, raw);
      } else if (this._state == SEND_TO_SUBPARSER) {
        const { coerced } = this._applyDataConversion(buffer, "binarystring");
        if (buffer.length > 0) {
          this._subparser._dispatchData(this._subPartNum, coerced, true);
        }
      }
    };
    MimeParser.prototype._applyDataConversion = function(buf, type) {
      if (this._convertData) {
        buf = this._savedBuffer + buf;
        [buf, this._savedBuffer] = this._convertData(buf, true);
      }
      return {
        coerced: this._coerceData(buf, type, false),
        raw: buf instanceof Uint8Array ? buf : binaryStringToUint8Array(buf)
      };
    };
    MimeParser.prototype._coerceData = function(buffer, type, more) {
      if (typeof buffer == "string") {
        if (type == "binarystring") {
          return buffer;
        }
        const typedarray = binaryStringToUint8Array(buffer);
        return type == "unicode" ? this._coerceData(typedarray, "unicode", more) : typedarray;
      } else if (type == "binarystring") {
        return uint8ArrayToBinaryString(buffer);
      } else if (type == "unicode") {
        if (this._decoder) {
          return this._decoder.decode(buffer, { stream: more });
        }
        return buffer;
      }
      throw new Error("Invalid type: " + type);
    };
    MimeParser.prototype._dispatchEOF = function(partNum) {
      if (this._state == PARSING_HEADERS) {
        this._headers = this._parseHeaders();
        this._callEmitter("startPart", partNum, this._headers);
      } else if (this._state == SEND_TO_SUBPARSER) {
        if (this._convertData && this._savedBuffer) {
          this._subparser._dispatchData(
            this._subPartNum,
            this._convertData(this._savedBuffer, false)[0],
            true
          );
        }
        this._subparser._dispatchEOF(this._subPartNum);
        this._subparser = null;
      } else if (this._convertData && this._savedBuffer) {
        let [buffer] = this._convertData(this._savedBuffer, false);
        buffer = this._coerceData(buffer, this._options.strformat, false);
        if (buffer.length > 0) {
          this._callEmitter("deliverPartData", partNum, buffer);
        }
      }
      this._callEmitter("endPart", partNum);
    };
    MimeParser.prototype._parseHeaders = function() {
      const headers = new StructuredHeaders(this._headerData, this._options);
      let contentType = headers.get("Content-Type");
      if (typeof contentType === "undefined") {
        contentType = headerParser_default.parseStructuredHeader(
          "Content-Type",
          this._defaultContentType || "text/plain"
        );
        Object.defineProperty(headers, "contentType", {
          get() {
            return contentType;
          }
        });
      } else {
        Object.defineProperty(headers, "contentType", { configurable: false });
      }
      let charset = "";
      if (this._options["force-charset"]) {
        charset = this._options.charset;
      } else if (contentType.has("charset")) {
        charset = contentType.get("charset");
      } else {
        charset = this._options.charset;
      }
      headers.charset = charset;
      this._charset = charset;
      return headers;
    };
    MimeParser.prototype._startBody = function(partNum) {
      const contentType = this._headers.contentType;
      if (this._options.bodyformat == "raw" && partNum == this._options.pruneat) {
        this._state = SEND_TO_EMITTER;
        return;
      }
      if (contentType.mediatype == "multipart") {
        if (!contentType.has("boundary")) {
          this._state = SEND_TO_BLACK_HOLE;
          return;
        }
        this._splitRegex = new RegExp(
          // nosemgrep
          "(\r\n|[\r\n]|^)--" + contentType.get("boundary").replace(/[\\^$*+?.()|{}[\]]/g, "\\$&") + "(--)?[ 	]*(?:\r\n|[\r\n]|$)"
        );
        this._handleSplit = this._whenMultipart;
        this._subparser = new MimeParser(this._emitter, this._options);
        if (contentType.subtype == "digest") {
          this._subparser._defaultContentType = "message/rfc822";
        }
        this._state = SEND_TO_BLACK_HOLE;
        this._convertData = function(buffer, more) {
          let splitPoint = buffer.length;
          if (more) {
            if (buffer.charAt(splitPoint - 1) == "\n") {
              splitPoint--;
            }
            if (splitPoint >= 0 && buffer.charAt(splitPoint - 1) == "\r") {
              splitPoint--;
            }
          }
          const res = conditionToEndOnCRLF(buffer.substring(0, splitPoint));
          const preLF = res[0];
          const rest = res[1];
          return [preLF, rest + buffer.substring(splitPoint)];
        };
      } else if (contentType.type == "message/rfc822" || contentType.type == "message/global" || contentType.type == "message/news") {
        this._state = SEND_TO_SUBPARSER;
        this._subPartNum = partNum + "$";
        this._subparser = new MimeParser(this._emitter, this._options);
        const cte = this._extractHeader("content-transfer-encoding", "");
        if (cte in ContentDecoders) {
          this._convertData = ContentDecoders[cte];
        }
      } else {
        this._state = SEND_TO_EMITTER;
        if (this._options.bodyformat == "decode") {
          const cte = this._extractHeader("content-transfer-encoding", "");
          if (cte in ContentDecoders) {
            this._convertData = ContentDecoders[cte];
          }
        }
      }
      if (this._options.strformat == "unicode" && contentType.mediatype == "text") {
        this._decoder = null;
        if (this._charset !== "") {
          try {
            this._decoder = new MimeTextDecoder(this._charset);
          } catch (e8) {
            console.error(e8);
          }
        }
        if (!this._decoder) {
          this._decoder = {
            decode(buffer) {
              return MimeParser.prototype._coerceData(
                buffer,
                "binarystring",
                true
              );
            }
          };
        }
      } else {
        this._decoder = null;
      }
    };
    MimeParser.prototype._whenMultipart = function(partNum, lastResult) {
      if (partNum != "") {
        partNum += ".";
      }
      if (!this._subPartNum) {
        this._count = 1;
      } else {
        if (this._savedBuffer != "" && lastResult[1] === "") {
          let useEnd = this._savedBuffer.length - 1;
          if (this._savedBuffer[useEnd] == "\n") {
            useEnd--;
          }
          if (useEnd >= 0 && this._savedBuffer[useEnd] == "\r") {
            useEnd--;
          }
          this._savedBuffer = this._savedBuffer.substring(0, useEnd + 1);
        }
        if (this._savedBuffer != "") {
          this._subparser._dispatchData(
            this._subPartNum,
            this._savedBuffer,
            true
          );
        }
        this._subparser._dispatchEOF(this._subPartNum);
      }
      this._savedBuffer = "";
      if (lastResult[2] == void 0) {
        this._subparser.resetParser();
        this._state = SEND_TO_SUBPARSER;
        this._subPartNum = partNum + this._count;
        this._count += 1;
      } else {
        this._splitRegex = null;
        this._state = SEND_TO_BLACK_HOLE;
      }
    };
    MimeParser.prototype._extractHeader = function(name, dflt) {
      name = name.toLowerCase();
      return this._headers.has(name) ? this._headers.get(name) : headerParser_default.parseStructuredHeader(name, [dflt]);
    };
    ContentDecoders = {};
    ContentDecoders["quoted-printable"] = decode_qp;
    ContentDecoders.base64 = decode_base64;
    rawMimeParser_default = MimeParser;
  }
});

// node_modules/@protontech/crypto/src/jsmimeparser/mailParser.js
function parseMail(data) {
  const encoded = typeof data === "string" ? new TextEncoder().encode(data) : data;
  const { headers, allAttachments, bodyParts } = MimeParser2.extractMimeMsg(uint8ArrayToBinaryString(encoded));
  const singleKeys = /* @__PURE__ */ new Set([
    "message-id",
    "content-id",
    "from",
    "sender",
    "in-reply-to",
    "reply-to",
    "subject",
    "date",
    "content-disposition",
    "content-type",
    "content-transfer-encoding",
    "priority",
    "mime-version",
    "content-description",
    "precedence",
    "errors-to"
  ]);
  const mail = {
    headers,
    // drop some fields for each attachment.
    // also, and convert a `null` rawBody to an empty array (edge-case when passing only the attachment headers as `data`)
    attachments: allAttachments.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ parts, partName, body, isEncrypted, rawBody, ...rest }) => ({ ...rest, content: rawBody || new Uint8Array() })
    ),
    // join all body parts and normalise EOL to \n
    body: {
      html: bodyParts.html.length ? bodyParts.html.join("<br>\n").replace(/\r?\n/g, "\n") : null,
      text: bodyParts.text.length ? bodyParts.text.join("\n").replace(/\r?\n/g, "\n") : null
    }
  };
  ["subject", "date", "to", "from", "cc", "bcc", "message-id", "in-reply-to", "reply-to"].forEach((key) => {
    if (!headers[key]) return;
    const maybeArrayValue = headers[key] && headerParser_default.parseStructuredHeader(key, headers[key]);
    mail[key] = singleKeys.has(key) && Array.isArray(maybeArrayValue) ? maybeArrayValue[maybeArrayValue.length - 1] : maybeArrayValue;
  });
  return mail;
}
var ExtractMimeMsgEmitter, ExtractHeadersEmitter, ExtractHeadersAndBodyEmitter, MimeParser2;
var init_mailParser = __esm({
  "node_modules/@protontech/crypto/src/jsmimeparser/mailParser.js"() {
    init_headerParser();
    init_rawMimeParser();
    init_utils3();
    ExtractMimeMsgEmitter = {
      getAttachmentName(part) {
        if (!part?.headers) {
          return "";
        }
        if (part.headers["content-disposition"]) {
          const filename = MimeParser2.getParameter(
            part.headers["content-disposition"][0],
            "filename"
          );
          if (filename) {
            return filename;
          }
        }
        if (part.headers["content-type"]) {
          const name = MimeParser2.getParameter(
            part.headers["content-type"][0],
            "name"
          );
          if (name) {
            return name;
          }
        }
        return "";
      },
      // All parts of content-disposition = "attachment" are returned as attachments.
      // For content-disposition = "inline", all parts except those with content-type
      // text/plain, text/html and text/enriched are returned as attachments.
      isAttachment(part) {
        if (!part) {
          return false;
        }
        const contentType = part.contentType || "text/plain";
        if (contentType.search(/^multipart\//i) === 0) {
          return false;
        }
        let contentDisposition = "";
        if (Array.isArray(part.headers["content-disposition"]) && part.headers["content-disposition"].length > 0) {
          contentDisposition = part.headers["content-disposition"][0];
        }
        if (contentDisposition.search(/^attachment/i) === 0 || contentType.search(/^text\/plain|^text\/html|^text\/enriched/i) === -1) {
          return true;
        }
        return false;
      },
      /** JSMime API **/
      startMessage() {
        this.mimeTree = {
          partName: "",
          contentType: "message/rfc822",
          parts: [],
          size: 0,
          headers: {},
          rawHeaderText: "",
          allAttachments: [],
          // keep track of encountered body parts, based on content-type
          bodyParts: { text: [], html: [] },
          // No support for encryption.
          isEncrypted: false
        };
        this.partsPath = [this.mimeTree];
        this.options = this.options || {};
      },
      endMessage() {
        this.mimeMsg = null;
        if (this.mimeTree.parts.length == 0) {
          return;
        }
        if (this.options.getMimePart) {
          if (this.mimeTree.parts[0].partName == this.options.getMimePart) {
            this.mimeMsg = this.mimeTree.parts[0];
            this.mimeMsg.bodyAsTypedArray = binaryStringToUint8Array(
              this.mimeMsg.body
            );
          }
          return;
        }
        this.mimeMsg = this.mimeTree;
      },
      startPart(partNum, headerMap) {
        const utf8Encoder = new TextEncoder();
        const contentType = headerMap.contentType?.type ? headerMap.contentType.type : "text/plain";
        let rawHeaderText = headerMap.rawHeaderText;
        let headers = {};
        for (const [headerName, headerValue] of headerMap._rawHeaders) {
          const valueArray = Array.isArray(headerValue) ? headerValue : [headerValue];
          headers[headerName] = valueArray.map((value) => {
            const utf8ByteArray = utf8Encoder.encode(value);
            return uint8ArrayToBinaryString(utf8ByteArray);
          });
        }
        const currentPart = this.partsPath[this.partsPath.length - 1];
        const partName = "1" + (partNum !== "" ? "." : "") + partNum;
        if (partName == "1") {
          currentPart.rawHeaderText = rawHeaderText;
          rawHeaderText = rawHeaderText.split(/\n(?![ \t])/).filter((h7) => h7.toLowerCase().startsWith("content-")).join("\n").trim();
          currentPart.headers = headers;
          headers = Object.fromEntries(
            Object.entries(headers).filter((h7) => h7[0].startsWith("content-"))
          );
        }
        if (!headers["content-type"]) {
          headers["content-type"] = ["text/plain"];
        }
        const newPart = {
          partName,
          rawBody: null,
          // Uint8Array
          body: "",
          // string, coerced based on options
          headers,
          rawHeaderText,
          contentType,
          size: 0,
          parts: [],
          // No support for encryption.
          isEncrypted: false
        };
        currentPart.parts.push(newPart);
        this.partsPath.push(newPart);
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      endPart(partNum) {
        let deleteBody = false;
        let currentPart = this.partsPath[this.partsPath.length - 1];
        const size = currentPart.body.length;
        currentPart.size += size;
        if (this.isAttachment(currentPart)) {
          currentPart.fileName = this.getAttachmentName(currentPart);
          const contentDispositionHeader = currentPart.headers["content-disposition"]?.[0];
          const contentIdHeader = currentPart.headers["content-id"]?.[0];
          currentPart.contentDisposition = contentDispositionHeader ? contentDispositionHeader.split(";").shift() : void 0;
          currentPart.contentId = contentIdHeader || void 0;
          if (this.options.includeAttachments) {
            this.mimeTree.allAttachments.push(currentPart);
          } else {
            deleteBody = true;
          }
        } else if (currentPart.rawBody) {
          delete currentPart.rawBody;
          const bodyType = currentPart.contentType || "text/plain";
          switch (bodyType) {
            case "text/html":
              this.mimeTree.bodyParts.html.push(currentPart.body);
              break;
            case "text/plain":
              this.mimeTree.bodyParts.text.push(currentPart.body);
              break;
          }
        }
        if (deleteBody) {
          delete currentPart.body;
          delete currentPart.rawBody;
        }
        currentPart.headers = Object.fromEntries(
          Object.entries(currentPart.headers).filter(
            (h7) => !["content-disposition", "content-transfer-encoding"].includes(h7[0])
          )
        );
        this.partsPath.pop();
        currentPart = this.partsPath[this.partsPath.length - 1];
        currentPart.size += size;
      },
      /**
      * The data parameter is either a string or a Uint8Array.
      */
      deliverPartData(partNum, data, rawData) {
        const currentPart = this.partsPath[this.partsPath.length - 1];
        if (typeof data === "string") {
          currentPart.body += data;
        } else {
          currentPart.body += uint8ArrayToBinaryString(data);
        }
        if (currentPart.rawBody === null) {
          currentPart.rawBody = rawData;
        } else {
          currentPart.rawBody = mergeUint8Arrays([currentPart.rawBody, rawData]);
        }
      }
    };
    ExtractHeadersEmitter = {
      startPart(partNum, headers) {
        if (partNum == "") {
          this.headers = headers;
        }
      }
    };
    ExtractHeadersAndBodyEmitter = {
      body: "",
      // eslint-disable-next-line @typescript-eslint/unbound-method
      startPart: ExtractHeadersEmitter.startPart,
      deliverPartData(partNum, data) {
        if (partNum == "") {
          this.body += data;
        }
      }
    };
    MimeParser2 = {
      /***
      * Determine an arbitrary "parameter" part of a mail header.
      *
      * @param {string} headerStr - The string containing all parts of the header.
      * @param {string} parameter - The parameter we are looking for.
      *
      *
      * 'multipart/signed; protocol="xyz"', 'protocol' --> returns "xyz"
      *
      * @return {string} String containing the value of the parameter; or "".
      */
      getParameter(headerStr, parameter) {
        parameter = parameter.toLowerCase();
        headerStr = headerStr.replace(/[\r\n]+[ \t]+/g, "");
        const hdrMap = headerParser_default.parseParameterHeader(
          ";" + headerStr,
          true,
          true
        );
        for (const [key, value] of hdrMap.entries()) {
          if (parameter == key.toLowerCase()) {
            return value;
          }
        }
        return "";
      },
      /**
      * Triggers an synchronous parse of the given input.
      *
      * The input is a string that is immediately parsed, calling all functions on
      * the emitter before this function returns.
      *
      * @param {BinaryString} input   A string or input stream of text to parse.
      * @param emitter The emitter to receive callbacks on.
      * @param opts    A set of options for the parser.
      */
      parseSync(input, emitter, opts) {
        if (typeof input != "string") {
          throw new Error("input is not a recognizable type!");
        }
        const parser = new rawMimeParser_default(emitter, opts);
        parser.deliverData(input);
        parser.deliverEOF();
      },
      /**
      * Returns a stream listener that feeds data into a parser.
      *
      * In addition to the functions on the emitter that the parser may use, the
      * generated stream listener will also make calls to onStartRequest and
      * onStopRequest on the emitter (if they exist).
      *
      * @param emitter The emitter to receive callbacks on.
      * @param opts    A set of options for the parser.
      */
      // makeStreamListenerParser(emitter, opts) {
      //   var StreamListener = {
      //     onStartRequest(aRequest) {
      //       try {
      //         if ("onStartRequest" in emitter) {
      //           emitter.onStartRequest(aRequest);
      //         }
      //       } finally {
      //         this._parser.resetParser();
      //       }
      //     },
      //     onStopRequest(aRequest, aStatus) {
      //       this._parser.deliverEOF();
      //       if ("onStopRequest" in emitter) {
      //         emitter.onStopRequest(aRequest, aStatus);
      //       }
      //     },
      //     onDataAvailable(aRequest, aStream, aOffset, aCount) {
      //       var scriptIn = Cc[
      //         "@mozilla.org/scriptableinputstream;1"
      //       ].createInstance(Ci.nsIScriptableInputStream);
      //       scriptIn.init(aStream);
      //       // Use readBytes instead of read to handle embedded NULs properly.
      //       this._parser.deliverData(scriptIn.readBytes(aCount));
      //     },
      //     QueryInterface: ChromeUtils.generateQI([
      //       "nsIStreamListener",
      //       "nsIRequestObserver",
      //     ]),
      //   };
      //   setDefaultParserOptions(opts);
      //   StreamListener._parser = new RawMimeParser(emitter, opts);
      //   return StreamListener;
      // },
      /**
      * Returns a new raw MIME parser.
      *
      * Prefer one of the other methods where possible, since the input here must
      * be driven manually.
      *
      * @param emitter The emitter to receive callbacks on.
      * @param opts    A set of options for the parser.
      */
      makeParser(emitter, opts) {
        return new rawMimeParser_default(emitter, opts);
      },
      /**
      * Returns a mimeMsg object for the given input. The returned object tries to
      * be compatible with the return value of MsgHdrToMimeMessage. Differences:
      *  - no support for encryption
      *  - calculated sizes differ slightly
      *  - allAttachments includes the content and not a URL
      *  - does not eat TABs in headers, if they follow a CRLF
      *
      * The input is any type of input that would be accepted by parseSync.
      *
      * @param {BinaryString} input   A string of text to parse.
      */
      extractMimeMsg(input, options = {}) {
        const emitter = Object.create(ExtractMimeMsgEmitter);
        emitter.options = {
          includeAttachments: true,
          getMimePart: ""
        };
        for (const option of Object.keys(options)) {
          emitter.options[option] = options[option];
        }
        MimeParser2.parseSync(input, emitter, {
          // jsmime does not use the "1." prefix for the partName.
          pruneat: emitter.options.getMimePart.split(".").slice(1).join("."),
          bodyformat: "decode",
          stripcontinuations: true,
          strformat: "unicode"
        });
        return emitter.mimeMsg;
      },
      /**
      * Returns a dictionary of headers for the given input.
      *
      * The input is any type of input that would be accepted by parseSync. What
      * is returned is a JS object that represents the headers of the entire
      * envelope as would be received by startPart when partNum is the empty
      * string.
      *
      * @param input   A string of text to parse.
      */
      extractHeaders(input) {
        const emitter = Object.create(ExtractHeadersEmitter);
        MimeParser2.parseSync(input, emitter, { pruneat: "", bodyformat: "none" });
        return emitter.headers;
      },
      /**
      * Returns the headers and body for the given input message.
      *
      * The return value is an array whose first element is the dictionary of
      * headers (as would be returned by extractHeaders) and whose second element
      * is a binary string of the entire body of the message.
      *
      * @param input   A string of text to parse.
      */
      extractHeadersAndBody(input) {
        const emitter = Object.create(ExtractHeadersAndBodyEmitter);
        MimeParser2.parseSync(input, emitter, { pruneat: "", bodyformat: "raw" });
        return [emitter.headers, emitter.body];
      },
      // Parameters for parseHeaderField
      /**
      * Parse the header as if it were unstructured.
      *
      * This results in the same string if no other options are specified. If other
      * options are specified, this causes the string to be modified appropriately.
      */
      HEADER_UNSTRUCTURED: 0,
      /**
      * Parse the header as if it were in the form text; attr=val; attr=val.
      *
      * Such headers include Content-Type, Content-Disposition, and most other
      * headers used by MIME as opposed to messages.
      */
      HEADER_PARAMETER: 2,
      /**
      * Parse the header as if it were a sequence of mailboxes.
      */
      HEADER_ADDRESS: 3,
      /**
      * This decodes parameter values according to RFC 2231.
      *
      * This flag means nothing if HEADER_PARAMETER is not specified.
      */
      HEADER_OPTION_DECODE_2231: 16,
      /**
      * This decodes the inline encoded-words that are in RFC 2047.
      */
      HEADER_OPTION_DECODE_2047: 32,
      /**
      * This converts the header from a raw string to proper Unicode.
      */
      HEADER_OPTION_ALLOW_RAW: 64,
      // Convenience for all three of the above.
      HEADER_OPTION_ALL_I18N: 112,
      /**
      * Parse a header field according to the specification given by flags.
      *
      * Permissible flags begin with one of the HEADER_* flags, which may be or'd
      * with any of the HEADER_OPTION_* flags to modify the result appropriately.
      *
      * If the option HEADER_OPTION_ALLOW_RAW is passed, the charset parameter, if
      * present, is the charset to fallback to if the header is not decodable as
      * UTF-8 text. If HEADER_OPTION_ALLOW_RAW is passed but the charset parameter
      * is not provided, then no fallback decoding will be done. If
      * HEADER_OPTION_ALLOW_RAW is not passed, then no attempt will be made to
      * convert charsets.
      *
      * @param text    The value of a MIME or message header to parse.
      * @param flags   A set of flags that controls interpretation of the header.
      * @param charset A default charset to assume if no information may be found.
      */
      parseHeaderField(text, flags, charset) {
        if (flags & MimeParser2.HEADER_OPTION_ALLOW_RAW) {
          text = headerParser_default.convert8BitHeader(text, charset);
        }
        switch (flags & 15) {
          case MimeParser2.HEADER_UNSTRUCTURED:
            if (flags & MimeParser2.HEADER_OPTION_DECODE_2047) {
              text = headerParser_default.decodeRFC2047Words(text);
            }
            return text;
          case MimeParser2.HEADER_PARAMETER:
            return headerParser_default.parseParameterHeader(
              text,
              (flags & MimeParser2.HEADER_OPTION_DECODE_2047) != 0,
              (flags & MimeParser2.HEADER_OPTION_DECODE_2231) != 0
            );
          case MimeParser2.HEADER_ADDRESS:
            return headerParser_default.parseAddressingHeader(
              text,
              (flags & MimeParser2.HEADER_OPTION_DECODE_2047) != 0
            );
          default:
            throw new Error("Illegal type of header field");
        }
      }
    };
  }
});

// node_modules/@protontech/crypto/src/jsmimeparser/index.js
var jsmimeparser_exports = {};
__export(jsmimeparser_exports, {
  parseMail: () => parseMail
});
var init_jsmimeparser = __esm({
  "node_modules/@protontech/crypto/src/jsmimeparser/index.js"() {
    init_mailParser();
  }
});

// (disabled):crypto
var require_crypto = __commonJS({
  "(disabled):crypto"() {
  }
});

// lib/vendor/proton-srp-entry.mjs
var proton_srp_entry_exports = {};
__export(proton_srp_entry_exports, {
  getSrp: () => getSrp
});
module.exports = __toCommonJS(proton_srp_entry_exports);

// node_modules/@protontech/crypto/src/pmcrypto/serverTime.ts
var lastServerTime = null;
var serverTime = () => lastServerTime ?? /* @__PURE__ */ new Date();

// node_modules/@protontech/crypto/src/pmcrypto/constants.ts
var VERIFICATION_STATUS = /* @__PURE__ */ ((VERIFICATION_STATUS2) => {
  VERIFICATION_STATUS2[VERIFICATION_STATUS2["NOT_SIGNED"] = 0] = "NOT_SIGNED";
  VERIFICATION_STATUS2[VERIFICATION_STATUS2["SIGNED_AND_VALID"] = 1] = "SIGNED_AND_VALID";
  VERIFICATION_STATUS2[VERIFICATION_STATUS2["SIGNED_AND_INVALID"] = 2] = "SIGNED_AND_INVALID";
  return VERIFICATION_STATUS2;
})(VERIFICATION_STATUS || {});
var MAX_ENC_HEADER_LENGTH = 1024;
var DEFAULT_KEY_GENERATION_OFFSET = -6e4;
var DEFAULT_SIGNATURE_VERIFICATION_OFFSET = 6e4;
var ARGON2_PARAMS = {
  // from https://www.rfc-editor.org/rfc/rfc9106.html#name-parameter-choice
  RECOMMENDED: {
    passes: 1,
    parallelism: 4,
    memoryExponent: 19,
    tagLength: 32
  },
  MINIMUM: { passes: 3, parallelism: 4, memoryExponent: 16, tagLength: 32 }
};

// node_modules/@protontech/crypto/src/proxy/proxy.ts
var assertNotNull = (value) => {
  if (value === null) {
    throw new Error("CryptoProxy: endpoint not initialized");
  }
  return value;
};
var endpoint = null;
var onEndpointRelease = async () => {
};
var sentryLogger = null;
async function verifyMessageWithFallback(options) {
  const verificationResult = await assertNotNull(endpoint).verifyMessage(options);
  const { textData, stripTrailingSpaces } = options;
  if (verificationResult.verificationStatus === 2 /* SIGNED_AND_INVALID */ && stripTrailingSpaces && textData && verificationResult.data !== textData) {
    const fallbackverificationResult = await assertNotNull(
      endpoint
    ).verifyMessage({
      ...options,
      binaryData: void 0,
      stripTrailingSpaces: false
    });
    if (fallbackverificationResult.verificationStatus === 1 /* SIGNED_AND_VALID */) {
      sentryLogger?.("Fallback verification needed", {
        level: "info"
      });
      return fallbackverificationResult;
    }
    const legacyRemoveTrailingSpaces = (text) => {
      return text.split("\n").map((line) => {
        let i8 = line.length - 1;
        while (i8 >= 0 && (line[i8] === " " || line[i8] === "	")) {
          i8--;
        }
        return line.substring(0, i8 + 1);
      }).join("\n");
    };
    if (textData !== legacyRemoveTrailingSpaces(textData)) {
      sentryLogger?.("Fallback verification insufficient", {
        level: "info"
      });
    }
  }
  return verificationResult;
}
var CryptoProxy = {
  setEndpoint(endpointInstance, onRelease = onEndpointRelease) {
    if (endpoint) {
      throw new Error("already initialised");
    }
    endpoint = endpointInstance;
    onEndpointRelease = onRelease;
  },
  releaseEndpoint() {
    const tmp = endpoint;
    endpoint = null;
    return onEndpointRelease(assertNotNull(tmp));
  },
  setSentryLogger(logger) {
    sentryLogger = logger;
  },
  encryptMessage: async ({ date = serverTime(), ...opts }) => assertNotNull(endpoint).encryptMessage({ ...opts, date }),
  encryptMessageStream: async ({ date = serverTime(), ...opts }) => assertNotNull(endpoint).encryptMessageStream({ ...opts, date }),
  decryptMessage: async ({
    date = new Date(+serverTime() + DEFAULT_SIGNATURE_VERIFICATION_OFFSET),
    ...opts
  }) => assertNotNull(endpoint).decryptMessage({ ...opts, date }),
  decryptMessageStream: async ({
    date = new Date(+serverTime() + DEFAULT_SIGNATURE_VERIFICATION_OFFSET),
    ...opts
  }) => assertNotNull(endpoint).decryptMessageStream({ ...opts, date }),
  signMessage: async ({ date = serverTime(), ...opts }) => assertNotNull(endpoint).signMessage({ ...opts, date }),
  verifyMessage: async ({
    date = new Date(+serverTime() + DEFAULT_SIGNATURE_VERIFICATION_OFFSET),
    ...opts
  }) => verifyMessageWithFallback({ ...opts, date }),
  verifyCleartextMessage: async ({ date = serverTime(), ...opts }) => assertNotNull(endpoint).verifyCleartextMessage({ ...opts, date }),
  processMIME: async ({ date = serverTime(), ...opts }) => assertNotNull(endpoint).processMIME({ ...opts, date }),
  generateSessionKey: async ({ date = serverTime(), ...opts }) => assertNotNull(endpoint).generateSessionKey({ ...opts, date }),
  generateSessionKeyForAlgorithm: async (opts) => assertNotNull(endpoint).generateSessionKeyForAlgorithm(opts),
  encryptSessionKey: async ({ date = serverTime(), ...opts }) => assertNotNull(endpoint).encryptSessionKey({ ...opts, date }),
  decryptSessionKey: async ({ date = serverTime(), ...opts }) => assertNotNull(endpoint).decryptSessionKey({ ...opts, date }),
  importPrivateKey: async (opts) => assertNotNull(endpoint).importPrivateKey(opts),
  importPublicKey: async (opts) => assertNotNull(endpoint).importPublicKey(opts),
  generateKey: async ({
    date = new Date(+serverTime() + DEFAULT_KEY_GENERATION_OFFSET),
    ...opts
  }) => assertNotNull(endpoint).generateKey({ ...opts, date }),
  reformatKey: async ({
    privateKey,
    date = privateKey.getCreationTime(),
    ...opts
  }) => assertNotNull(endpoint).reformatKey({ ...opts, privateKey, date }),
  exportPublicKey: async (opts) => assertNotNull(endpoint).exportPublicKey(opts),
  exportPrivateKey: async (opts) => assertNotNull(endpoint).exportPrivateKey(opts),
  clearKeyStore: () => assertNotNull(endpoint).clearKeyStore(),
  clearKey: async (opts) => assertNotNull(endpoint).clearKey(opts),
  replaceUserIDs: async (opts) => assertNotNull(endpoint).replaceUserIDs(opts),
  cloneKeyAndChangeUserIDs: async (opts) => assertNotNull(endpoint).cloneKeyAndChangeUserIDs(opts),
  generateE2EEForwardingMaterial: async ({ date = serverTime(), ...opts }) => assertNotNull(endpoint).generateE2EEForwardingMaterial({
    ...opts,
    date
  }),
  doesKeySupportE2EEForwarding: async ({ date = serverTime(), ...opts }) => assertNotNull(endpoint).doesKeySupportE2EEForwarding({ ...opts, date }),
  isE2EEForwardingKey: async ({ date = serverTime(), ...opts }) => assertNotNull(endpoint).isE2EEForwardingKey({ ...opts, date }),
  isRevokedKey: async ({ date = serverTime(), ...opts }) => assertNotNull(endpoint).isRevokedKey({ ...opts, date }),
  isExpiredKey: async ({ date = serverTime(), ...opts }) => assertNotNull(endpoint).isExpiredKey({ ...opts, date }),
  canKeyEncrypt: async ({ date = serverTime(), ...opts }) => assertNotNull(endpoint).canKeyEncrypt({ ...opts, date }),
  computeHash: async (opts) => assertNotNull(endpoint).computeHash(opts),
  computeHashStream: async (opts) => assertNotNull(endpoint).computeHashStream(opts),
  computeArgon2: (opts) => assertNotNull(endpoint).computeArgon2(opts),
  getArmoredMessage: async (opts) => assertNotNull(endpoint).getArmoredMessage(opts),
  getArmoredKeys: async (opts) => assertNotNull(endpoint).getArmoredKeys(opts),
  getArmoredSignature: async (opts) => assertNotNull(endpoint).getArmoredSignature(opts),
  getSignatureInfo: async (opts) => assertNotNull(endpoint).getSignatureInfo(opts),
  getMessageInfo: async (opts) => assertNotNull(endpoint).getMessageInfo(opts),
  getKeyInfo: async (opts) => assertNotNull(endpoint).getKeyInfo(opts)
};

// node_modules/openpgp/dist/lightweight/openpgp.min.mjs
var e7 = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
var t7 = /* @__PURE__ */ Symbol("doneWritingPromise");
var r7 = /* @__PURE__ */ Symbol("doneWritingResolve");
var i7 = /* @__PURE__ */ Symbol("doneWritingReject");
var a7 = /* @__PURE__ */ Symbol("readingIndex");
var n7 = class _n2 extends Array {
  constructor() {
    super(), Object.setPrototypeOf(this, _n2.prototype), this[t7] = new Promise(((e8, t8) => {
      this[r7] = e8, this[i7] = t8;
    })), this[t7].catch((() => {
    }));
  }
};
function s7(e8) {
  return e8 && e8.getReader && Array.isArray(e8);
}
function o7(e8) {
  if (!s7(e8)) {
    const t8 = e8.getWriter(), r8 = t8.releaseLock;
    return t8.releaseLock = () => {
      t8.closed.catch((function() {
      })), r8.call(t8);
    }, t8;
  }
  this.stream = e8;
}
function c6(t8) {
  if (s7(t8)) return "array";
  if (e7.ReadableStream && e7.ReadableStream.prototype.isPrototypeOf(t8)) return "web";
  if (t8 && !(e7.ReadableStream && t8 instanceof e7.ReadableStream) && "function" == typeof t8._read && "object" == typeof t8._readableState) throw Error("Native Node streams are no longer supported: please manually convert the stream to a WebStream, using e.g. `stream.Readable.toWeb`");
  return !(!t8 || !t8.getReader) && "web-like";
}
function u7(e8) {
  return Uint8Array.prototype.isPrototypeOf(e8);
}
function h6(e8) {
  if (1 === e8.length) return e8[0];
  let t8 = 0;
  for (let r9 = 0; r9 < e8.length; r9++) {
    if (!u7(e8[r9])) throw Error("concatUint8Array: Data must be in the form of a Uint8Array");
    t8 += e8[r9].length;
  }
  const r8 = new Uint8Array(t8);
  let i8 = 0;
  return e8.forEach((function(e9) {
    r8.set(e9, i8), i8 += e9.length;
  })), r8;
}
n7.prototype.getReader = function() {
  return void 0 === this[a7] && (this[a7] = 0), { read: async () => (await this[t7], this[a7] === this.length ? { value: void 0, done: true } : { value: this[this[a7]++], done: false }) };
}, n7.prototype.readToEnd = async function(e8) {
  await this[t7];
  const r8 = e8(this.slice(this[a7]));
  return this.length = 0, r8;
}, n7.prototype.clone = function() {
  const e8 = new n7();
  return e8[t7] = this[t7].then((() => {
    e8.push(...this);
  })), e8;
}, o7.prototype.write = async function(e8) {
  this.stream.push(e8);
}, o7.prototype.close = async function() {
  this.stream[r7]();
}, o7.prototype.abort = async function(e8) {
  return this.stream[i7](e8), e8;
}, o7.prototype.releaseLock = function() {
}, "object" == typeof e7.process && e7.process.versions;
var l5 = /* @__PURE__ */ new WeakSet();
var y7 = /* @__PURE__ */ Symbol("externalBuffer");
function p4(e8) {
  if (this.stream = e8, e8[y7] && (this[y7] = e8[y7].slice()), s7(e8)) {
    const t9 = e8.getReader();
    return this._read = t9.read.bind(t9), this._releaseLock = () => {
    }, void (this._cancel = () => {
    });
  }
  if (c6(e8)) {
    const t9 = e8.getReader();
    return this._read = t9.read.bind(t9), this._releaseLock = () => {
      t9.closed.catch((function() {
      })), t9.releaseLock();
    }, void (this._cancel = t9.cancel.bind(t9));
  }
  let t8 = false;
  this._read = async () => t8 || l5.has(e8) ? { value: void 0, done: true } : (t8 = true, { value: e8, done: false }), this._releaseLock = () => {
    if (t8) try {
      l5.add(e8);
    } catch {
    }
  };
}
function d5(e8) {
  return c6(e8) ? e8 : new ReadableStream({ start(t8) {
    t8.enqueue(e8), t8.close();
  } });
}
function g6(e8) {
  const t8 = c6(e8);
  if (t8) {
    if ("array" !== t8) throw Error("Can't convert Stream to ArrayStream here, call `readToEnd` first");
    return e8;
  }
  const r8 = new n7();
  return (async () => {
    const t9 = T5(r8);
    await t9.write(e8), await t9.close();
  })(), r8;
}
function m5(e8) {
  return e8.some(((e9) => c6(e9) && !s7(e9))) ? (function(e9) {
    const t8 = e9.map(d5), r8 = w7((async function(e10) {
      await Promise.all(a8.map(((t9) => x6(t9, e10))));
    }));
    let i8 = Promise.resolve();
    const a8 = t8.map(((e10, a9) => K5(e10, ((e11, n8) => (i8 = i8.then((() => f7(e11, r8.writable, { preventClose: a9 !== t8.length - 1 }))), i8)))));
    return r8.readable;
  })(e8) : e8.some(((e9) => s7(e9))) ? (function(e9) {
    const t8 = new n7();
    let r8 = Promise.resolve();
    return e9.forEach(((i8, a8) => (r8 = r8.then((() => f7(i8, t8, { preventClose: a8 !== e9.length - 1 }))), r8))), t8;
  })(e8) : "string" == typeof e8[0] ? e8.join("") : h6(e8);
}
async function f7(e8, t8, { preventClose: r8 = false, preventAbort: i8 = false, preventCancel: a8 = false } = {}) {
  if (c6(e8) && !s7(e8) && !s7(t8)) {
    e8 = d5(e8);
    try {
      if (e8[y7]) {
        const r9 = T5(t8);
        for (let t9 = 0; t9 < e8[y7].length; t9++) await r9.ready, await r9.write(e8[y7][t9]);
        r9.releaseLock();
      }
      await e8.pipeTo(t8, { preventClose: r8, preventAbort: i8, preventCancel: a8 });
    } catch {
    }
    return;
  }
  c6(e8) || (e8 = g6(e8));
  const n8 = I7(e8), o8 = T5(t8);
  try {
    for (; ; ) {
      await o8.ready;
      const { done: e9, value: t9 } = await n8.read();
      if (e9) {
        r8 || await o8.close();
        break;
      }
      await o8.write(t9);
    }
  } catch (e9) {
    i8 || await o8.abort(e9);
  } finally {
    n8.releaseLock(), o8.releaseLock();
  }
}
function w7(e8) {
  let t8, r8, i8, a8 = false, n8 = false;
  return { readable: new ReadableStream({ start(e9) {
    i8 = e9;
  }, pull() {
    t8 ? t8() : a8 = true;
  }, async cancel(t9) {
    n8 = true, e8 && await e8(t9), r8 && r8(t9);
  } }, { highWaterMark: 0 }), writable: new WritableStream({ write: async function(e9) {
    if (n8) throw Error("Stream is cancelled");
    i8.enqueue(e9), a8 ? a8 = false : (await new Promise(((e10, i9) => {
      t8 = e10, r8 = i9;
    })), t8 = null, r8 = null);
  }, close: i8.close.bind(i8), abort: i8.error.bind(i8) }) };
}
function b5(e8, t8 = () => {
}, r8 = () => {
}, i8 = { highWaterMark: 0 }) {
  if (c6(e8)) return v6(e8, t8, r8, i8);
  const a8 = t8(e8), n8 = r8();
  return void 0 !== a8 && void 0 !== n8 ? m5([a8, n8]) : void 0 !== a8 ? a8 : n8;
}
async function k6(e8, t8 = async () => {
}, r8 = async () => {
}, i8 = { highWaterMark: 1 }) {
  if (c6(e8)) return v6(e8, t8, r8, i8);
  const a8 = await t8(e8), n8 = await r8();
  return void 0 !== a8 && void 0 !== n8 ? m5([a8, n8]) : void 0 !== a8 ? a8 : n8;
}
function v6(e8, t8, r8, i8) {
  if (s7(e8)) {
    const i9 = new n7();
    return (async () => {
      const a8 = T5(i9);
      try {
        const i10 = await D7(e8), n8 = await t8(i10), s8 = await r8();
        let o8;
        o8 = void 0 !== n8 && void 0 !== s8 ? m5([n8, s8]) : void 0 !== n8 ? n8 : s8, await a8.write(o8), await a8.close();
      } catch (e9) {
        await a8.abort(e9);
      }
    })(), i9;
  }
  if (c6(e8)) {
    let a8, n8 = false;
    return new ReadableStream({ start() {
      a8 = e8.getReader();
    }, async pull(i9) {
      if (n8) return i9.close(), void e8.releaseLock();
      try {
        for (; ; ) {
          const { value: s8, done: o8 } = await a8.read();
          n8 = o8;
          const c7 = await (o8 ? r8 : t8)(s8);
          if (void 0 !== c7) return void i9.enqueue(c7);
          if (o8) return i9.close(), void e8.releaseLock();
        }
      } catch (e9) {
        i9.error(e9);
      }
    }, async cancel(e9) {
      await a8.cancel(e9);
    } }, i8);
  }
  throw Error("Unreachable");
}
function K5(e8, t8) {
  if (c6(e8) && !s7(e8)) {
    let r9;
    const i8 = new TransformStream({ start(e9) {
      r9 = e9;
    } }), a8 = f7(e8, i8.writable), n8 = w7((async function(e9) {
      r9.error(e9), await a8, await new Promise(((e10) => setTimeout(e10)));
    }));
    return t8(i8.readable, n8.writable), n8.readable;
  }
  e8 = g6(e8);
  const r8 = new n7();
  return t8(e8, r8), r8;
}
function A7(e8, t8) {
  let r8;
  const i8 = K5(e8, ((e9, a8) => {
    const n8 = I7(e9);
    n8.remainder = () => (n8.releaseLock(), f7(e9, a8), i8), r8 = t8(n8);
  }));
  return r8;
}
function E7(e8) {
  if (s7(e8)) return e8.clone();
  if (c6(e8)) {
    const t8 = (function(e9) {
      if (s7(e9)) throw Error("ArrayStream cannot be tee()d, use clone() instead");
      if (c6(e9)) {
        const t9 = d5(e9).tee();
        return t9[0][y7] = t9[1][y7] = e9[y7], t9;
      }
      return [U7(e9), U7(e9)];
    })(e8);
    return P5(e8, t8[0]), t8[1];
  }
  return U7(e8);
}
function S6(e8) {
  return s7(e8) ? E7(e8) : c6(e8) ? new ReadableStream({ start(t8) {
    const r8 = K5(e8, (async (e9, r9) => {
      const i8 = I7(e9), a8 = T5(r9);
      try {
        for (; ; ) {
          await a8.ready;
          const { done: e10, value: r10 } = await i8.read();
          if (e10) {
            try {
              t8.close();
            } catch {
            }
            return void await a8.close();
          }
          try {
            t8.enqueue(r10);
          } catch {
          }
          await a8.write(r10);
        }
      } catch (e10) {
        t8.error(e10), await a8.abort(e10);
      }
    }));
    P5(e8, r8);
  } }) : U7(e8);
}
function P5(e8, t8) {
  Object.entries(Object.getOwnPropertyDescriptors(e8.constructor.prototype)).forEach((([r8, i8]) => {
    "constructor" !== r8 && (i8.value ? i8.value = i8.value.bind(t8) : i8.get = i8.get.bind(t8), Object.defineProperty(e8, r8, i8));
  }));
}
function U7(e8, t8 = 0, r8 = 1 / 0) {
  if (s7(e8)) throw Error("Not implemented");
  if (c6(e8)) {
    if (t8 >= 0 && r8 >= 0) {
      let i8, a8 = 0;
      return new ReadableStream({ start() {
        i8 = e8.getReader();
      }, async pull(n8) {
        try {
          for (; ; ) {
            if (!(a8 < r8)) return n8.close(), void e8.releaseLock();
            {
              const { value: s8, done: o8 } = await i8.read();
              if (o8) return n8.close(), void e8.releaseLock();
              let c7;
              if (a8 + s8.length >= t8 && (c7 = U7(s8, Math.max(t8 - a8, 0), r8 - a8)), a8 += s8.length, c7) return void n8.enqueue(c7);
            }
          }
        } catch (e9) {
          n8.error(e9);
        }
      }, async cancel(e9) {
        await i8.cancel(e9);
      } }, { highWaterMark: 0 });
    }
    if (t8 < 0 && (r8 < 0 || r8 === 1 / 0)) {
      let i8 = [];
      return b5(e8, ((e9) => {
        e9.length >= -t8 ? i8 = [e9] : i8.push(e9);
      }), (() => U7(m5(i8), t8, r8)));
    }
    if (0 === t8 && r8 < 0) {
      let i8;
      return b5(e8, ((e9) => {
        const a8 = i8 ? m5([i8, e9]) : e9;
        if (a8.length >= -r8) return i8 = U7(a8, r8), U7(a8, t8, r8);
        i8 = a8;
      }));
    }
    return console.warn(`stream.slice(input, ${t8}, ${r8}) not implemented efficiently.`), C7((async () => U7(await D7(e8), t8, r8)));
  }
  return e8[y7] && (e8 = m5(e8[y7].concat([e8]))), u7(e8) ? e8.subarray(t8, r8 === 1 / 0 ? e8.length : r8) : e8.slice(t8, r8);
}
async function D7(e8, t8 = m5) {
  return s7(e8) ? e8.readToEnd(t8) : c6(e8) ? I7(e8).readToEnd(t8) : e8;
}
async function x6(e8, t8) {
  if (c6(e8)) {
    if (e8.cancel) {
      const r8 = await e8.cancel(t8);
      return await new Promise(((e9) => setTimeout(e9))), r8;
    }
    if (e8.destroy) return e8.destroy(t8), await new Promise(((e9) => setTimeout(e9))), t8;
  }
}
function C7(e8) {
  const t8 = new n7();
  return (async () => {
    const r8 = T5(t8);
    try {
      await r8.write(await e8()), await r8.close();
    } catch (e9) {
      await r8.abort(e9);
    }
  })(), t8;
}
function I7(e8) {
  return new p4(e8);
}
function T5(e8) {
  return new o7(e8);
}
p4.prototype.read = async function() {
  if (this[y7] && this[y7].length) {
    return { done: false, value: this[y7].shift() };
  }
  return this._read();
}, p4.prototype.releaseLock = function() {
  this[y7] && (this.stream[y7] = this[y7]), this._releaseLock();
}, p4.prototype.cancel = function(e8) {
  return this._cancel(e8);
}, p4.prototype.readLine = async function() {
  let e8, t8 = [];
  for (; !e8; ) {
    let { done: r8, value: i8 } = await this.read();
    if (i8 += "", r8) return t8.length ? m5(t8) : void 0;
    const a8 = i8.indexOf("\n") + 1;
    a8 && (e8 = m5(t8.concat(i8.substr(0, a8))), t8 = []), a8 !== i8.length && t8.push(i8.substr(a8));
  }
  return this.unshift(...t8), e8;
}, p4.prototype.readByte = async function() {
  const { done: e8, value: t8 } = await this.read();
  if (e8) return;
  const r8 = t8[0];
  return this.unshift(U7(t8, 1)), r8;
}, p4.prototype.readBytes = async function(e8) {
  const t8 = [];
  let r8 = 0;
  for (; ; ) {
    const { done: i8, value: a8 } = await this.read();
    if (i8) return t8.length ? m5(t8) : void 0;
    if (t8.push(a8), r8 += a8.length, r8 >= e8) {
      const r9 = m5(t8);
      return this.unshift(U7(r9, e8)), U7(r9, 0, e8);
    }
  }
}, p4.prototype.peekBytes = async function(e8) {
  const t8 = await this.readBytes(e8);
  return this.unshift(t8), t8;
}, p4.prototype.unshift = function(...e8) {
  this[y7] || (this[y7] = []), 1 === e8.length && u7(e8[0]) && this[y7].length && e8[0].length && this[y7][0].byteOffset >= e8[0].length ? this[y7][0] = new Uint8Array(this[y7][0].buffer, this[y7][0].byteOffset - e8[0].length, this[y7][0].byteLength + e8[0].length) : this[y7].unshift(...e8.filter(((e9) => e9 && e9.length)));
}, p4.prototype.readToEnd = async function(e8 = m5) {
  const t8 = [];
  for (; ; ) {
    const { done: e9, value: r8 } = await this.read();
    if (e9) break;
    t8.push(r8);
  }
  return e8(t8);
};
var B6 = /* @__PURE__ */ Symbol("byValue");
var M7 = { curve: { nistP256: "nistP256", p256: "nistP256", nistP384: "nistP384", p384: "nistP384", nistP521: "nistP521", p521: "nistP521", secp256k1: "secp256k1", ed25519Legacy: "ed25519Legacy", ed25519: "ed25519Legacy", curve25519Legacy: "curve25519Legacy", curve25519: "curve25519Legacy", brainpoolP256r1: "brainpoolP256r1", brainpoolP384r1: "brainpoolP384r1", brainpoolP512r1: "brainpoolP512r1" }, kdfFlags: { replace_fingerprint: 1, replace_kdf_params: 2 }, s2k: { simple: 0, salted: 1, iterated: 3, argon2: 4, gnu: 101 }, publicKey: { rsaEncryptSign: 1, rsaEncrypt: 2, rsaSign: 3, elgamal: 16, dsa: 17, ecdh: 18, ecdsa: 19, eddsaLegacy: 22, aedh: 23, aedsa: 24, x25519: 25, x448: 26, ed25519: 27, ed448: 28, pqc_mldsa_ed25519: 30, pqc_mlkem_x25519: 35, aead: 100, hmac: 101 }, symmetric: { idea: 1, tripledes: 2, cast5: 3, blowfish: 4, aes128: 7, aes192: 8, aes256: 9, twofish: 10 }, compression: { uncompressed: 0, zip: 1, zlib: 2, bzip2: 3 }, hash: { md5: 1, sha1: 2, ripemd: 3, sha256: 8, sha384: 9, sha512: 10, sha224: 11, sha3_256: 12, sha3_512: 14 }, webHash: { "SHA-1": 2, "SHA-256": 8, "SHA-384": 9, "SHA-512": 10 }, aead: { eax: 1, ocb: 2, gcm: 3, experimentalGCM: 100 }, packet: { publicKeyEncryptedSessionKey: 1, signature: 2, symEncryptedSessionKey: 3, onePassSignature: 4, secretKey: 5, publicKey: 6, secretSubkey: 7, compressedData: 8, symmetricallyEncryptedData: 9, marker: 10, literalData: 11, trust: 12, userID: 13, publicSubkey: 14, userAttribute: 17, symEncryptedIntegrityProtectedData: 18, modificationDetectionCode: 19, aeadEncryptedData: 20, padding: 21 }, literal: { binary: 98, text: 116, utf8: 117, mime: 109 }, signature: { binary: 0, text: 1, standalone: 2, certGeneric: 16, certPersona: 17, certCasual: 18, certPositive: 19, certRevocation: 48, subkeyBinding: 24, keyBinding: 25, key: 31, keyRevocation: 32, subkeyRevocation: 40, timestamp: 64, thirdParty: 80 }, signatureSubpacket: { signatureCreationTime: 2, signatureExpirationTime: 3, exportableCertification: 4, trustSignature: 5, regularExpression: 6, revocable: 7, keyExpirationTime: 9, placeholderBackwardsCompatibility: 10, preferredSymmetricAlgorithms: 11, revocationKey: 12, issuerKeyID: 16, notationData: 20, preferredHashAlgorithms: 21, preferredCompressionAlgorithms: 22, keyServerPreferences: 23, preferredKeyServer: 24, primaryUserID: 25, policyURI: 26, keyFlags: 27, signersUserID: 28, reasonForRevocation: 29, features: 30, signatureTarget: 31, embeddedSignature: 32, issuerFingerprint: 33, preferredAEADAlgorithms: 34, preferredCipherSuites: 39 }, keyFlags: { certifyKeys: 1, signData: 2, encryptCommunication: 4, encryptStorage: 8, splitPrivateKey: 16, authentication: 32, forwardedCommunication: 64, sharedPrivateKey: 128 }, armor: { multipartSection: 0, multipartLast: 1, signed: 2, message: 3, publicKey: 4, privateKey: 5, signature: 6 }, reasonForRevocation: { noReason: 0, keySuperseded: 1, keyCompromised: 2, keyRetired: 3, userIDInvalid: 32 }, features: { modificationDetection: 1, aead: 2, v5Keys: 4, seipdv2: 8 }, write: function(e8, t8) {
  if ("number" == typeof t8 && (t8 = this.read(e8, t8)), void 0 !== e8[t8]) return e8[t8];
  throw Error("Invalid enum value.");
}, read: function(e8, t8) {
  if (e8[B6] || (e8[B6] = [], Object.entries(e8).forEach((([t9, r8]) => {
    e8[B6][r8] = t9;
  }))), void 0 !== e8[B6][t8]) return e8[B6][t8];
  throw Error("Invalid enum value.");
} };
var L4 = { preferredHashAlgorithm: M7.hash.sha512, preferredSymmetricAlgorithm: M7.symmetric.aes256, preferredCompressionAlgorithm: M7.compression.uncompressed, aeadProtect: false, ignoreSEIPDv2FeatureFlag: false, parseAEADEncryptedV4KeysAsLegacy: false, preferredAEADAlgorithm: M7.aead.gcm, aeadChunkSizeByte: 12, v6Keys: false, enableParsingV5Entities: false, s2kType: M7.s2k.iterated, s2kIterationCountByte: 224, s2kArgon2Params: { passes: 3, parallelism: 4, memoryExponent: 16 }, maxArgon2MemoryExponent: 30, allowUnauthenticatedMessages: false, allowUnauthenticatedStream: false, allowForwardedMessages: false, minRSABits: 2047, passwordCollisionCheck: false, allowInsecureDecryptionWithSigningKeys: false, allowInsecureVerificationWithReformattedKeys: false, allowMissingKeyFlags: false, constantTimePKCS1Decryption: false, constantTimePKCS1DecryptionSupportedSymmetricAlgorithms: /* @__PURE__ */ new Set([M7.symmetric.aes128, M7.symmetric.aes192, M7.symmetric.aes256]), ignoreUnsupportedPackets: true, ignoreMalformedPackets: false, enforceGrammar: true, additionalAllowedPackets: [], showVersion: false, showComment: false, versionString: "OpenPGP.js 6.3.1", commentString: "https://openpgpjs.org", maxUserIDLength: 5120, maxDecompressedMessageSize: 1 / 0, knownNotations: [], nonDeterministicSignaturesViaNotation: true, useEllipticFallback: true, rejectHashAlgorithms: /* @__PURE__ */ new Set([M7.hash.md5, M7.hash.ripemd]), rejectMessageHashAlgorithms: /* @__PURE__ */ new Set([M7.hash.md5, M7.hash.ripemd, M7.hash.sha1]), rejectPublicKeyAlgorithms: /* @__PURE__ */ new Set([M7.publicKey.elgamal, M7.publicKey.dsa]), rejectCurves: /* @__PURE__ */ new Set([M7.curve.secp256k1]) };
var F6 = (() => {
  try {
    return true;
  } catch {
  }
  return false;
})();
var _5 = { isString: function(e8) {
  return "string" == typeof e8 || e8 instanceof String;
}, nodeRequire: () => {
}, isArray: function(e8) {
  return e8 instanceof Array;
}, isUint8Array: u7, isStream: c6, getNobleCurve: async (e8, t8) => {
  if (!L4.useEllipticFallback) throw Error("This curve is only supported in the full build of OpenPGP.js");
  const { nobleCurves: r8 } = await Promise.resolve().then(() => (init_noble_curves_min(), noble_curves_min_exports));
  switch (e8) {
    case M7.publicKey.ecdh:
    case M7.publicKey.ecdsa: {
      const e9 = r8.get(t8);
      if (!e9) throw Error("Unsupported curve");
      return e9;
    }
    case M7.publicKey.x448:
      return r8.get("x448");
    case M7.publicKey.ed448:
      return r8.get("ed448");
    default:
      throw Error("Unsupported curve");
  }
}, readNumber: function(e8) {
  let t8 = 0;
  for (let r8 = 0; r8 < e8.length; r8++) t8 += 256 ** r8 * e8[e8.length - 1 - r8];
  return t8;
}, writeNumber: function(e8, t8) {
  const r8 = new Uint8Array(t8);
  for (let i8 = 0; i8 < t8; i8++) r8[i8] = e8 >> 8 * (t8 - i8 - 1) & 255;
  return r8;
}, readDate: function(e8) {
  const t8 = _5.readNumber(e8);
  return new Date(1e3 * t8);
}, writeDate: function(e8) {
  const t8 = Math.floor(e8.getTime() / 1e3);
  return _5.writeNumber(t8, 4);
}, normalizeDate: function(e8 = Date.now()) {
  return null === e8 || e8 === 1 / 0 ? e8 : new Date(1e3 * Math.floor(+e8 / 1e3));
}, readMPI: function(e8) {
  const t8 = (e8[0] << 8 | e8[1]) + 7 >>> 3;
  return _5.readExactSubarray(e8, 2, 2 + t8);
}, readExactSubarray: function(e8, t8, r8) {
  if (e8.length < r8) throw Error("Input array too short");
  return e8.subarray(t8, r8);
}, leftPad(e8, t8) {
  if (e8.length > t8) throw Error("Input array too long");
  const r8 = new Uint8Array(t8), i8 = t8 - e8.length;
  return r8.set(e8, i8), r8;
}, uint8ArrayToMPI: function(e8) {
  const t8 = _5.uint8ArrayBitLength(e8);
  if (0 === t8) throw Error("Zero MPI");
  const r8 = e8.subarray(e8.length - Math.ceil(t8 / 8)), i8 = new Uint8Array([(65280 & t8) >> 8, 255 & t8]);
  return _5.concatUint8Array([i8, r8]);
}, uint8ArrayBitLength: function(e8) {
  let t8;
  for (t8 = 0; t8 < e8.length && 0 === e8[t8]; t8++) ;
  if (t8 === e8.length) return 0;
  const r8 = e8.subarray(t8);
  return 8 * (r8.length - 1) + _5.nbits(r8[0]);
}, hexToUint8Array: function(e8) {
  const t8 = new Uint8Array(e8.length >> 1);
  for (let r8 = 0; r8 < e8.length >> 1; r8++) t8[r8] = parseInt(e8.substr(r8 << 1, 2), 16);
  return t8;
}, uint8ArrayToHex: function(e8) {
  const t8 = "0123456789abcdef";
  let r8 = "";
  return e8.forEach(((e9) => {
    r8 += t8[e9 >> 4] + t8[15 & e9];
  })), r8;
}, stringToUint8Array: function(e8) {
  return b5(e8, ((e9) => {
    if (!_5.isString(e9)) throw Error("stringToUint8Array: Data must be in the form of a string");
    const t8 = new Uint8Array(e9.length);
    for (let r8 = 0; r8 < e9.length; r8++) t8[r8] = e9.charCodeAt(r8);
    return t8;
  }));
}, uint8ArrayToString: function(e8) {
  const t8 = [], r8 = 16384, i8 = (e8 = new Uint8Array(e8)).length;
  for (let a8 = 0; a8 < i8; a8 += r8) t8.push(String.fromCharCode.apply(String, e8.subarray(a8, a8 + r8 < i8 ? a8 + r8 : i8)));
  return t8.join("");
}, encodeUTF8: function(e8) {
  const t8 = new TextEncoder("utf-8");
  function r8(e9, r9 = false) {
    return t8.encode(e9, { stream: !r9 });
  }
  return b5(e8, r8, (() => r8("", true)));
}, decodeUTF8: function(e8) {
  const t8 = new TextDecoder("utf-8");
  function r8(e9, r9 = false) {
    return t8.decode(e9, { stream: !r9 });
  }
  return b5(e8, r8, (() => r8(new Uint8Array(), true)));
}, concat: m5, concatUint8Array: h6, equalsUint8Array: function(e8, t8) {
  if (!_5.isUint8Array(e8) || !_5.isUint8Array(t8)) throw Error("Data must be in the form of a Uint8Array");
  if (e8.length !== t8.length) return false;
  for (let r8 = 0; r8 < e8.length; r8++) if (e8[r8] !== t8[r8]) return false;
  return true;
}, findLastIndex: function(e8, t8) {
  for (let r8 = e8.length; r8 >= 0; r8--) if (t8(e8[r8], r8, e8)) return r8;
  return -1;
}, writeChecksum: function(e8) {
  let t8 = 0;
  for (let r8 = 0; r8 < e8.length; r8++) t8 = t8 + e8[r8] & 65535;
  return _5.writeNumber(t8, 2);
}, printDebug: function(e8) {
  F6 && console.log("[OpenPGP.js debug]", e8);
}, printDebugError: function(e8) {
  F6 && console.error("[OpenPGP.js debug]", e8);
}, nbits: function(e8) {
  let t8 = 1, r8 = e8 >>> 16;
  return 0 !== r8 && (e8 = r8, t8 += 16), r8 = e8 >> 8, 0 !== r8 && (e8 = r8, t8 += 8), r8 = e8 >> 4, 0 !== r8 && (e8 = r8, t8 += 4), r8 = e8 >> 2, 0 !== r8 && (e8 = r8, t8 += 2), r8 = e8 >> 1, 0 !== r8 && (e8 = r8, t8 += 1), t8;
}, double: function(e8) {
  const t8 = new Uint8Array(e8.length), r8 = e8.length - 1;
  for (let i8 = 0; i8 < r8; i8++) t8[i8] = e8[i8] << 1 ^ e8[i8 + 1] >> 7;
  return t8[r8] = e8[r8] << 1 ^ 135 * (e8[0] >> 7), t8;
}, shiftRight: function(e8, t8) {
  if (t8) for (let r8 = e8.length - 1; r8 >= 0; r8--) e8[r8] >>= t8, r8 > 0 && (e8[r8] |= e8[r8 - 1] << 8 - t8);
  return e8;
}, getWebCrypto: function() {
  const t8 = void 0 !== e7 && e7.crypto && e7.crypto.subtle || this.getNodeCrypto()?.webcrypto.subtle;
  if (!t8) throw Error("The WebCrypto API is not available");
  return t8;
}, getNodeCrypto: function() {
  return this.nodeRequire("crypto");
}, getNodeZlib: function() {
  return this.nodeRequire("zlib");
}, getNodeBuffer: function() {
  return (this.nodeRequire("buffer") || {}).Buffer;
}, getHardwareConcurrency: function() {
  if ("undefined" != typeof navigator) return navigator.hardwareConcurrency || 1;
  return this.nodeRequire("os").cpus().length;
}, isEmailAddress: function(e8) {
  if (!_5.isString(e8)) return false;
  return /^[^\p{C}\p{Z}@<>\\]+@[^\p{C}\p{Z}@<>\\]+[^\p{C}\p{Z}\p{P}]$/u.test(e8);
}, canonicalizeEOL: function(e8) {
  let t8 = false;
  return b5(e8, ((e9) => {
    let r8;
    t8 && (e9 = _5.concatUint8Array([new Uint8Array([13]), e9])), 13 === e9[e9.length - 1] ? (t8 = true, e9 = e9.subarray(0, -1)) : t8 = false;
    const i8 = [];
    for (let t9 = 0; r8 = e9.indexOf(10, t9) + 1, r8; t9 = r8) 13 !== e9[r8 - 2] && i8.push(r8);
    if (!i8.length) return e9;
    const a8 = new Uint8Array(e9.length + i8.length);
    let n8 = 0;
    for (let t9 = 0; t9 < i8.length; t9++) {
      const r9 = e9.subarray(i8[t9 - 1] || 0, i8[t9]);
      a8.set(r9, n8), n8 += r9.length, a8[n8 - 1] = 13, a8[n8] = 10, n8++;
    }
    return a8.set(e9.subarray(i8[i8.length - 1] || 0), n8), a8;
  }), (() => t8 ? new Uint8Array([13]) : void 0));
}, nativeEOL: function(e8) {
  let t8 = false;
  return b5(e8, ((e9) => {
    let r8;
    13 === (e9 = t8 && 10 !== e9[0] ? _5.concatUint8Array([new Uint8Array([13]), e9]) : new Uint8Array(e9))[e9.length - 1] ? (t8 = true, e9 = e9.subarray(0, -1)) : t8 = false;
    let i8 = 0;
    for (let t9 = 0; t9 !== e9.length; t9 = r8) {
      r8 = e9.indexOf(13, t9) + 1, r8 || (r8 = e9.length);
      const a8 = r8 - (10 === e9[r8] ? 1 : 0);
      t9 && e9.copyWithin(i8, t9, a8), i8 += a8 - t9;
    }
    return e9.subarray(0, i8);
  }), (() => t8 ? new Uint8Array([13]) : void 0));
}, removeTrailingSpaces: function(e8) {
  return e8.split("\n").map(((e9) => {
    let t8 = e9.length - 1;
    for (; t8 >= 0 && (" " === e9[t8] || "	" === e9[t8] || "\r" === e9[t8]); t8--) ;
    return e9.substr(0, t8 + 1);
  })).join("\n");
}, wrapError: function(e8, t8) {
  if (!t8) return e8 instanceof Error ? e8 : Error(e8);
  if (e8 instanceof Error) {
    try {
      e8.message += ": " + t8.message, e8.cause = t8;
    } catch {
    }
    return e8;
  }
  return Error(e8 + ": " + t8.message, { cause: t8 });
}, constructAllowedPackets: function(e8) {
  const t8 = {};
  return e8.forEach(((e9) => {
    if (!e9.tag) throw Error("Invalid input: expected a packet class");
    t8[e9.tag] = e9;
  })), t8;
}, anyPromise: function(e8) {
  return new Promise(((t8, r8) => {
    let i8;
    Promise.all(e8.map((async (e9) => {
      try {
        t8(await e9);
      } catch (e10) {
        i8 = e10;
      }
    }))).then((() => {
      r8(i8);
    }));
  }));
}, selectUint8Array: function(e8, t8, r8) {
  const i8 = Math.max(t8.length, r8.length), a8 = new Uint8Array(i8);
  let n8 = 0;
  for (let i9 = 0; i9 < a8.length; i9++) a8[i9] = t8[i9] & 256 - e8 | r8[i9] & 255 + e8, n8 += e8 & i9 < t8.length | 1 - e8 & i9 < r8.length;
  return a8.subarray(0, n8);
}, selectUint8: function(e8, t8, r8) {
  return t8 & 256 - e8 | r8 & 255 + e8;
}, isAES: function(e8) {
  return e8 === M7.symmetric.aes128 || e8 === M7.symmetric.aes192 || e8 === M7.symmetric.aes256;
} };
var N5 = _5.getNodeBuffer();
var R6;
var z6;
function O5(e8) {
  let t8 = new Uint8Array();
  return b5(e8, ((e9) => {
    t8 = _5.concatUint8Array([t8, e9]);
    const r8 = [], i8 = Math.floor(t8.length / 45), a8 = 45 * i8, n8 = R6(t8.subarray(0, a8));
    for (let e10 = 0; e10 < i8; e10++) r8.push(n8.substr(60 * e10, 60)), r8.push("\n");
    return t8 = t8.subarray(a8), r8.join("");
  }), (() => t8.length ? R6(t8) + "\n" : ""));
}
function j6(e8) {
  let t8 = "";
  return b5(e8, ((e9) => {
    t8 += e9;
    let r8 = 0;
    const i8 = [" ", "	", "\r", "\n"];
    for (let e10 = 0; e10 < i8.length; e10++) {
      const a9 = i8[e10];
      for (let e11 = t8.indexOf(a9); -1 !== e11; e11 = t8.indexOf(a9, e11 + 1)) r8++;
    }
    let a8 = t8.length;
    for (; a8 > 0 && (a8 - r8) % 4 != 0; a8--) i8.includes(t8[a8]) && r8--;
    const n8 = z6(t8.substr(0, a8));
    return t8 = t8.substr(a8), n8;
  }), (() => z6(t8)));
}
function q6(e8) {
  return j6(e8.replace(/-/g, "+").replace(/_/g, "/"));
}
function H6(e8, t8) {
  let r8 = O5(e8).replace(/[\r\n]/g, "");
  return r8 = r8.replace(/[+]/g, "-").replace(/[/]/g, "_").replace(/[=]/g, ""), r8;
}
function G6(e8) {
  const t8 = e8.match(/^-----BEGIN PGP (MESSAGE, PART \d+\/\d+|MESSAGE, PART \d+|SIGNED MESSAGE|MESSAGE|PUBLIC KEY BLOCK|PRIVATE KEY BLOCK|SIGNATURE)-----$/m);
  if (!t8) throw Error("Unknown ASCII armor type");
  return /MESSAGE, PART \d+\/\d+/.test(t8[1]) ? M7.armor.multipartSection : /MESSAGE, PART \d+/.test(t8[1]) ? M7.armor.multipartLast : /SIGNED MESSAGE/.test(t8[1]) ? M7.armor.signed : /MESSAGE/.test(t8[1]) ? M7.armor.message : /PUBLIC KEY BLOCK/.test(t8[1]) ? M7.armor.publicKey : /PRIVATE KEY BLOCK/.test(t8[1]) ? M7.armor.privateKey : /SIGNATURE/.test(t8[1]) ? M7.armor.signature : void 0;
}
function V5(e8, t8) {
  let r8 = "";
  return t8.showVersion && (r8 += "Version: " + t8.versionString + "\n"), t8.showComment && (r8 += "Comment: " + t8.commentString + "\n"), e8 && (r8 += "Comment: " + e8 + "\n"), r8 += "\n", r8;
}
function W4(e8) {
  const t8 = (function(e9) {
    let t9 = 13501623;
    return b5(e9, ((e10) => {
      const r8 = Q5 ? Math.floor(e10.length / 4) : 0, i8 = new Uint32Array(e10.buffer, e10.byteOffset, r8);
      for (let e11 = 0; e11 < r8; e11++) t9 ^= i8[e11], t9 = $4[0][t9 >> 24 & 255] ^ $4[1][t9 >> 16 & 255] ^ $4[2][t9 >> 8 & 255] ^ $4[3][255 & t9];
      for (let i9 = 4 * r8; i9 < e10.length; i9++) t9 = t9 >> 8 ^ $4[0][255 & t9 ^ e10[i9]];
    }), (() => new Uint8Array([t9, t9 >> 8, t9 >> 16])));
  })(e8);
  return O5(t8);
}
N5 ? (R6 = (e8) => N5.from(e8).toString("base64"), z6 = (e8) => {
  const t8 = N5.from(e8, "base64");
  return new Uint8Array(t8.buffer, t8.byteOffset, t8.byteLength);
}) : (R6 = (e8) => btoa(_5.uint8ArrayToString(e8)), z6 = (e8) => _5.stringToUint8Array(atob(e8)));
var $4 = [Array(255), Array(255), Array(255), Array(255)];
for (let e8 = 0; e8 <= 255; e8++) {
  let t8 = e8 << 16;
  for (let e9 = 0; e9 < 8; e9++) t8 = t8 << 1 ^ (8388608 & t8 ? 8801531 : 0);
  $4[0][e8] = (16711680 & t8) >> 16 | 65280 & t8 | (255 & t8) << 16;
}
for (let e8 = 0; e8 <= 255; e8++) $4[1][e8] = $4[0][e8] >> 8 ^ $4[0][255 & $4[0][e8]];
for (let e8 = 0; e8 <= 255; e8++) $4[2][e8] = $4[1][e8] >> 8 ^ $4[0][255 & $4[1][e8]];
for (let e8 = 0; e8 <= 255; e8++) $4[3][e8] = $4[2][e8] >> 8 ^ $4[0][255 & $4[2][e8]];
var Q5 = (function() {
  const e8 = new ArrayBuffer(2);
  return new DataView(e8).setInt16(0, 255, true), 255 === new Int16Array(e8)[0];
})();
function X4(e8) {
  for (let t8 = 0; t8 < e8.length; t8++) /^([^\s:]|[^\s:][^:]*[^\s:]): .+$/.test(e8[t8]) || _5.printDebugError(Error("Improperly formatted armor header: " + e8[t8])), /^(Version|Comment|MessageID|Hash|Charset): .+$/.test(e8[t8]) || _5.printDebugError(Error("Unknown header: " + e8[t8]));
}
function Y4(e8) {
  let t8 = e8;
  const r8 = e8.lastIndexOf("=");
  return r8 >= 0 && r8 !== e8.length - 1 && (t8 = e8.slice(0, r8)), t8;
}
function Z4(e8) {
  return new Promise(((t8, r8) => {
    try {
      const i8 = /^-----[^-]+-----$/m, a8 = /^[ \f\r\t\u00a0\u2000-\u200a\u202f\u205f\u3000]*$/;
      let n8;
      const s8 = [];
      let o8, c7, u8 = s8, h7 = [];
      const l6 = j6(K5(e8, (async (e9, y8) => {
        const p5 = I7(e9);
        try {
          for (; ; ) {
            let e10 = await p5.readLine();
            if (void 0 === e10) throw Error("Misformed armored text");
            if (e10 = _5.removeTrailingSpaces(e10.replace(/[\r\n]/g, "")), n8) if (o8) c7 || n8 !== M7.armor.signed || (i8.test(e10) ? (h7 = h7.join("\r\n"), c7 = true, X4(u8), u8 = [], o8 = false) : h7.push(e10.replace(/^- /, "")));
            else if (i8.test(e10) && r8(Error("Mandatory blank line missing between armor headers and armor data")), a8.test(e10)) {
              if (X4(u8), o8 = true, c7 || n8 !== M7.armor.signed) {
                t8({ text: h7, data: l6, headers: s8, type: n8 });
                break;
              }
            } else u8.push(e10);
            else i8.test(e10) && (n8 = G6(e10));
          }
        } catch (e10) {
          return void r8(e10);
        }
        const d6 = T5(y8);
        try {
          for (; ; ) {
            await d6.ready;
            const { done: e10, value: t9 } = await p5.read();
            if (e10) throw Error("Misformed armored text");
            const r9 = t9 + "";
            if (-1 !== r9.indexOf("=") || -1 !== r9.indexOf("-")) {
              let e11 = await p5.readToEnd();
              e11.length || (e11 = ""), e11 = r9 + e11, e11 = _5.removeTrailingSpaces(e11.replace(/\r/g, ""));
              const t10 = e11.split(i8);
              if (1 === t10.length) throw Error("Misformed armored text");
              const a9 = Y4(t10[0].slice(0, -1));
              await d6.write(a9);
              break;
            }
            await d6.write(r9);
          }
          await d6.ready, await d6.close();
        } catch (e10) {
          await d6.abort(e10);
        }
      })));
    } catch (e9) {
      r8(e9);
    }
  })).then((async (e9) => (s7(e9.data) && (e9.data = await D7(e9.data)), e9)));
}
function J5(e8, t8, r8, i8, a8, n8 = false, s8 = L4) {
  let o8, c7;
  e8 === M7.armor.signed && (o8 = t8.text, c7 = t8.hash, t8 = t8.data);
  const u8 = n8 && S6(t8), h7 = [];
  switch (e8) {
    case M7.armor.multipartSection:
      h7.push("-----BEGIN PGP MESSAGE, PART " + r8 + "/" + i8 + "-----\n"), h7.push(V5(a8, s8)), h7.push(O5(t8)), u8 && h7.push("=", W4(u8)), h7.push("-----END PGP MESSAGE, PART " + r8 + "/" + i8 + "-----\n");
      break;
    case M7.armor.multipartLast:
      h7.push("-----BEGIN PGP MESSAGE, PART " + r8 + "-----\n"), h7.push(V5(a8, s8)), h7.push(O5(t8)), u8 && h7.push("=", W4(u8)), h7.push("-----END PGP MESSAGE, PART " + r8 + "-----\n");
      break;
    case M7.armor.signed:
      h7.push("-----BEGIN PGP SIGNED MESSAGE-----\n"), h7.push(c7 ? `Hash: ${c7}

` : "\n"), h7.push(o8.replace(/^-/gm, "- -")), h7.push("\n-----BEGIN PGP SIGNATURE-----\n"), h7.push(V5(a8, s8)), h7.push(O5(t8)), u8 && h7.push("=", W4(u8)), h7.push("-----END PGP SIGNATURE-----\n");
      break;
    case M7.armor.message:
      h7.push("-----BEGIN PGP MESSAGE-----\n"), h7.push(V5(a8, s8)), h7.push(O5(t8)), u8 && h7.push("=", W4(u8)), h7.push("-----END PGP MESSAGE-----\n");
      break;
    case M7.armor.publicKey:
      h7.push("-----BEGIN PGP PUBLIC KEY BLOCK-----\n"), h7.push(V5(a8, s8)), h7.push(O5(t8)), u8 && h7.push("=", W4(u8)), h7.push("-----END PGP PUBLIC KEY BLOCK-----\n");
      break;
    case M7.armor.privateKey:
      h7.push("-----BEGIN PGP PRIVATE KEY BLOCK-----\n"), h7.push(V5(a8, s8)), h7.push(O5(t8)), u8 && h7.push("=", W4(u8)), h7.push("-----END PGP PRIVATE KEY BLOCK-----\n");
      break;
    case M7.armor.signature:
      h7.push("-----BEGIN PGP SIGNATURE-----\n"), h7.push(V5(a8, s8)), h7.push(O5(t8)), u8 && h7.push("=", W4(u8)), h7.push("-----END PGP SIGNATURE-----\n");
  }
  return _5.concat(h7);
}
var ee3 = BigInt(0);
var te3 = BigInt(1);
function re3(e8) {
  const t8 = "0123456789ABCDEF";
  let r8 = "";
  return e8.forEach(((e9) => {
    r8 += t8[e9 >> 4] + t8[15 & e9];
  })), BigInt("0x0" + r8);
}
function ie3(e8, t8) {
  const r8 = e8 % t8;
  return r8 < ee3 ? r8 + t8 : r8;
}
function ae3(e8, t8, r8) {
  const i8 = -e8;
  return t8 & i8 | r8 & ~i8;
}
function ne3(e8, t8, r8) {
  if (r8 === ee3) throw Error("Modulo cannot be zero");
  if (r8 === te3) return BigInt(0);
  if (t8 < ee3) throw Error("Unsopported negative exponent");
  let i8 = t8, a8 = e8;
  a8 %= r8;
  let n8 = BigInt(1);
  for (; i8 > ee3; ) {
    const e9 = i8 & te3;
    i8 >>= te3;
    n8 = ae3(e9, n8 * a8 % r8, n8), a8 = a8 * a8 % r8;
  }
  return n8;
}
function se3(e8) {
  return e8 >= ee3 ? e8 : -e8;
}
function oe3(e8, t8) {
  const { gcd: r8, x: i8 } = (function(e9, t9) {
    let r9 = BigInt(0), i9 = BigInt(1), a8 = BigInt(1), n8 = BigInt(0), s8 = se3(e9), o8 = se3(t9);
    const c7 = e9 < ee3, u8 = t9 < ee3;
    for (; o8 !== ee3; ) {
      const e10 = s8 / o8;
      let t10 = r9;
      r9 = a8 - e10 * r9, a8 = t10, t10 = i9, i9 = n8 - e10 * i9, n8 = t10, t10 = o8, o8 = s8 % o8, s8 = t10;
    }
    return { x: c7 ? -a8 : a8, y: u8 ? -n8 : n8, gcd: s8 };
  })(e8, t8);
  if (r8 !== te3) throw Error("Inverse does not exist");
  return ie3(i8 + t8, t8);
}
function ce3(e8) {
  const t8 = Number(e8);
  if (t8 > Number.MAX_SAFE_INTEGER) throw Error("Number can only safely store up to 53 bits");
  return t8;
}
function ue3(e8, t8) {
  return (e8 >> BigInt(t8) & te3) === ee3 ? 0 : 1;
}
function he3(e8) {
  const t8 = e8 < ee3 ? BigInt(-1) : ee3;
  let r8 = 1, i8 = e8;
  for (; (i8 >>= te3) !== t8; ) r8++;
  return r8;
}
function le3(e8) {
  const t8 = e8 < ee3 ? BigInt(-1) : ee3, r8 = BigInt(8);
  let i8 = 1, a8 = e8;
  for (; (a8 >>= r8) !== t8; ) i8++;
  return i8;
}
function ye3(e8, t8 = "be", r8) {
  let i8 = e8.toString(16);
  i8.length % 2 == 1 && (i8 = "0" + i8);
  const a8 = i8.length / 2, n8 = new Uint8Array(r8 || a8), s8 = r8 ? r8 - a8 : 0;
  let o8 = 0;
  for (; o8 < a8; ) n8[o8 + s8] = parseInt(i8.slice(2 * o8, 2 * o8 + 2), 16), o8++;
  return "be" !== t8 && n8.reverse(), n8;
}
var pe3 = _5.getNodeCrypto();
function de3(e8) {
  const t8 = "undefined" != typeof crypto ? crypto : pe3?.webcrypto;
  if (t8?.getRandomValues) {
    const r8 = new Uint8Array(e8);
    return t8.getRandomValues(r8);
  }
  throw Error("No secure random number generator available.");
}
function ge3(e8, t8) {
  if (t8 < e8) throw Error("Illegal parameter value: max <= min");
  const r8 = t8 - e8;
  return ie3(re3(de3(le3(r8) + 8)), r8) + e8;
}
var me3 = BigInt(1);
function fe3(e8, t8, r8) {
  const i8 = BigInt(30), a8 = me3 << BigInt(e8 - 1), n8 = [1, 6, 5, 4, 3, 2, 1, 4, 3, 2, 1, 2, 1, 4, 3, 2, 1, 2, 1, 4, 3, 2, 1, 6, 5, 4, 3, 2, 1, 2];
  let s8 = ge3(a8, a8 << me3), o8 = ce3(ie3(s8, i8));
  do {
    s8 += BigInt(n8[o8]), o8 = (o8 + n8[o8]) % n8.length, he3(s8) > e8 && (s8 = ie3(s8, a8 << me3), s8 += a8, o8 = ce3(ie3(s8, i8)));
  } while (!we3(s8, t8, r8));
  return s8;
}
function we3(e8, t8, r8) {
  return (!t8 || (function(e9, t9) {
    let r9 = e9, i8 = t9;
    for (; i8 !== ee3; ) {
      const e10 = i8;
      i8 = r9 % i8, r9 = e10;
    }
    return r9;
  })(e8 - me3, t8) === me3) && (!!(function(e9) {
    const t9 = BigInt(0);
    return be3.every(((r9) => ie3(e9, r9) !== t9));
  })(e8) && (!!(function(e9, t9 = BigInt(2)) {
    return ne3(t9, e9 - me3, e9) === me3;
  })(e8) && !!(function(e9, t9) {
    const r9 = he3(e9);
    t9 || (t9 = Math.max(1, r9 / 48 | 0));
    const i8 = e9 - me3;
    let a8 = 0;
    for (; !ue3(i8, a8); ) a8++;
    const n8 = e9 >> BigInt(a8);
    for (; t9 > 0; t9--) {
      let t10, r10 = ne3(ge3(BigInt(2), i8), n8, e9);
      if (r10 !== me3 && r10 !== i8) {
        for (t10 = 1; t10 < a8; t10++) {
          if (r10 = ie3(r10 * r10, e9), r10 === me3) return false;
          if (r10 === i8) break;
        }
        if (t10 === a8) return false;
      }
    }
    return true;
  })(e8, r8)));
}
var be3 = [7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083, 2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161, 2179, 2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273, 2281, 2287, 2293, 2297, 2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381, 2383, 2389, 2393, 2399, 2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467, 2473, 2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591, 2593, 2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677, 2683, 2687, 2689, 2693, 2699, 2707, 2711, 2713, 2719, 2729, 2731, 2741, 2749, 2753, 2767, 2777, 2789, 2791, 2797, 2801, 2803, 2819, 2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887, 2897, 2903, 2909, 2917, 2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999, 3001, 3011, 3019, 3023, 3037, 3041, 3049, 3061, 3067, 3079, 3083, 3089, 3109, 3119, 3121, 3137, 3163, 3167, 3169, 3181, 3187, 3191, 3203, 3209, 3217, 3221, 3229, 3251, 3253, 3257, 3259, 3271, 3299, 3301, 3307, 3313, 3319, 3323, 3329, 3331, 3343, 3347, 3359, 3361, 3371, 3373, 3389, 3391, 3407, 3413, 3433, 3449, 3457, 3461, 3463, 3467, 3469, 3491, 3499, 3511, 3517, 3527, 3529, 3533, 3539, 3541, 3547, 3557, 3559, 3571, 3581, 3583, 3593, 3607, 3613, 3617, 3623, 3631, 3637, 3643, 3659, 3671, 3673, 3677, 3691, 3697, 3701, 3709, 3719, 3727, 3733, 3739, 3761, 3767, 3769, 3779, 3793, 3797, 3803, 3821, 3823, 3833, 3847, 3851, 3853, 3863, 3877, 3881, 3889, 3907, 3911, 3917, 3919, 3923, 3929, 3931, 3943, 3947, 3967, 3989, 4001, 4003, 4007, 4013, 4019, 4021, 4027, 4049, 4051, 4057, 4073, 4079, 4091, 4093, 4099, 4111, 4127, 4129, 4133, 4139, 4153, 4157, 4159, 4177, 4201, 4211, 4217, 4219, 4229, 4231, 4241, 4243, 4253, 4259, 4261, 4271, 4273, 4283, 4289, 4297, 4327, 4337, 4339, 4349, 4357, 4363, 4373, 4391, 4397, 4409, 4421, 4423, 4441, 4447, 4451, 4457, 4463, 4481, 4483, 4493, 4507, 4513, 4517, 4519, 4523, 4547, 4549, 4561, 4567, 4583, 4591, 4597, 4603, 4621, 4637, 4639, 4643, 4649, 4651, 4657, 4663, 4673, 4679, 4691, 4703, 4721, 4723, 4729, 4733, 4751, 4759, 4783, 4787, 4789, 4793, 4799, 4801, 4813, 4817, 4831, 4861, 4871, 4877, 4889, 4903, 4909, 4919, 4931, 4933, 4937, 4943, 4951, 4957, 4967, 4969, 4973, 4987, 4993, 4999].map(((e8) => BigInt(e8)));
var ke3 = _5.getWebCrypto();
var ve2 = _5.getNodeCrypto();
var Ke2 = ve2 && ve2.getHashes();
function Ae3(e8) {
  if (ve2 && Ke2.includes(e8)) return async function(t8) {
    const r8 = ve2.createHash(e8);
    return b5(t8, ((e9) => {
      r8.update(e9);
    }), (() => new Uint8Array(r8.digest())));
  };
}
function Ee3(e8, t8) {
  const r8 = async () => {
    const { nobleHashes: t9 } = await Promise.resolve().then(() => (init_noble_hashes_min(), noble_hashes_min_exports)), r9 = t9.get(e8);
    if (!r9) throw Error("Unsupported hash");
    return r9;
  };
  return async function(e9) {
    if (s7(e9) && (e9 = await D7(e9)), _5.isStream(e9)) {
      const t9 = (await r8()).create();
      return b5(e9, ((e10) => {
        t9.update(e10);
      }), (() => t9.digest()));
    }
    if (ke3 && t8) return new Uint8Array(await ke3.digest(t8, e9));
    return (await r8())(e9);
  };
}
var Se2 = Ae3("md5") || Ee3("md5");
var Pe2 = Ae3("sha1") || Ee3("sha1", "SHA-1");
var Ue3 = Ae3("sha224") || Ee3("sha224");
var De = Ae3("sha256") || Ee3("sha256", "SHA-256");
var xe2 = Ae3("sha384") || Ee3("sha384", "SHA-384");
var Ce2 = Ae3("sha512") || Ee3("sha512", "SHA-512");
var Ie3 = Ae3("ripemd160") || Ee3("ripemd160");
var Te3 = Ae3("sha3-256") || Ee3("sha3_256");
var Be2 = Ae3("sha3-512") || Ee3("sha3_512");
function Me(e8, t8) {
  switch (e8) {
    case M7.hash.md5:
      return Se2(t8);
    case M7.hash.sha1:
      return Pe2(t8);
    case M7.hash.ripemd:
      return Ie3(t8);
    case M7.hash.sha256:
      return De(t8);
    case M7.hash.sha384:
      return xe2(t8);
    case M7.hash.sha512:
      return Ce2(t8);
    case M7.hash.sha224:
      return Ue3(t8);
    case M7.hash.sha3_256:
      return Te3(t8);
    case M7.hash.sha3_512:
      return Be2(t8);
    default:
      throw Error("Unsupported hash function");
  }
}
function Le2(e8) {
  switch (e8) {
    case M7.hash.md5:
      return 16;
    case M7.hash.sha1:
    case M7.hash.ripemd:
      return 20;
    case M7.hash.sha256:
      return 32;
    case M7.hash.sha384:
      return 48;
    case M7.hash.sha512:
      return 64;
    case M7.hash.sha224:
      return 28;
    case M7.hash.sha3_256:
      return 32;
    case M7.hash.sha3_512:
      return 64;
    default:
      throw Error("Invalid hash algorithm.");
  }
}
var Fe2 = [];
function _e(e8, t8) {
  const r8 = e8.length;
  if (r8 > t8 - 11) throw Error("Message too long");
  const i8 = (function(e9) {
    const t9 = new Uint8Array(e9);
    let r9 = 0;
    for (; r9 < e9; ) {
      const i9 = de3(e9 - r9);
      for (let e10 = 0; e10 < i9.length; e10++) 0 !== i9[e10] && (t9[r9++] = i9[e10]);
    }
    return t9;
  })(t8 - r8 - 3), a8 = new Uint8Array(t8);
  return a8[1] = 2, a8.set(i8, 2), a8.set(e8, t8 - r8), a8;
}
function Ne2(e8, t8) {
  let r8 = 2, i8 = 1;
  for (let t9 = r8; t9 < e8.length; t9++) i8 &= 0 !== e8[t9], r8 += i8;
  const a8 = r8 - 2, n8 = e8.subarray(r8 + 1), s8 = 0 === e8[0] & 2 === e8[1] & a8 >= 8 & !i8;
  if (t8) return _5.selectUint8Array(s8, n8, t8);
  if (s8) return n8;
  throw Error("Decryption error");
}
function Re2(e8, t8, r8) {
  let i8;
  if (t8.length !== Le2(e8)) throw Error("Invalid hash length");
  const a8 = new Uint8Array(Fe2[e8].length);
  for (i8 = 0; i8 < Fe2[e8].length; i8++) a8[i8] = Fe2[e8][i8];
  const n8 = a8.length + t8.length;
  if (r8 < n8 + 11) throw Error("Intended encoded message length too short");
  const s8 = new Uint8Array(r8 - n8 - 3).fill(255), o8 = new Uint8Array(r8);
  return o8[1] = 1, o8.set(s8, 2), o8.set(a8, r8 - n8), o8.set(t8, r8 - t8.length), o8;
}
Fe2[1] = [48, 32, 48, 12, 6, 8, 42, 134, 72, 134, 247, 13, 2, 5, 5, 0, 4, 16], Fe2[2] = [48, 33, 48, 9, 6, 5, 43, 14, 3, 2, 26, 5, 0, 4, 20], Fe2[3] = [48, 33, 48, 9, 6, 5, 43, 36, 3, 2, 1, 5, 0, 4, 20], Fe2[8] = [48, 49, 48, 13, 6, 9, 96, 134, 72, 1, 101, 3, 4, 2, 1, 5, 0, 4, 32], Fe2[9] = [48, 65, 48, 13, 6, 9, 96, 134, 72, 1, 101, 3, 4, 2, 2, 5, 0, 4, 48], Fe2[10] = [48, 81, 48, 13, 6, 9, 96, 134, 72, 1, 101, 3, 4, 2, 3, 5, 0, 4, 64], Fe2[11] = [48, 45, 48, 13, 6, 9, 96, 134, 72, 1, 101, 3, 4, 2, 4, 5, 0, 4, 28], Fe2[12] = [48, 49, 48, 13, 6, 9, 96, 134, 72, 1, 101, 3, 4, 2, 8, 5, 0, 4, 32], Fe2[14] = [48, 81, 48, 13, 6, 9, 96, 134, 72, 1, 101, 3, 4, 2, 10, 5, 0, 4, 64];
var ze = _5.getWebCrypto();
var Oe2 = _5.getNodeCrypto();
var je = BigInt(1);
async function qe2(e8, t8, r8, i8, a8, n8, s8, o8, c7) {
  if (Le2(e8) >= r8.length) throw Error("Digest size cannot exceed key modulus size");
  if (t8 && !_5.isStream(t8)) {
    if (_5.getWebCrypto()) try {
      return await (async function(e9, t9, r9, i9, a9, n9, s9, o9) {
        const c8 = We(r9, i9, a9, n9, s9, o9), u8 = { name: "RSASSA-PKCS1-v1_5", hash: { name: e9 } }, h7 = await ze.importKey("jwk", c8, u8, false, ["sign"]);
        return new Uint8Array(await ze.sign("RSASSA-PKCS1-v1_5", h7, t9));
      })(M7.read(M7.webHash, e8), t8, r8, i8, a8, n8, s8, o8);
    } catch (e9) {
      _5.printDebugError(e9);
    }
    else if (_5.getNodeCrypto()) return (function(e9, t9, r9, i9, a9, n9, s9, o9) {
      const c8 = Oe2.createSign(M7.read(M7.hash, e9));
      c8.write(t9), c8.end();
      const u8 = We(r9, i9, a9, n9, s9, o9);
      return new Uint8Array(c8.sign({ key: u8, format: "jwk", type: "pkcs1" }));
    })(e8, t8, r8, i8, a8, n8, s8, o8);
  }
  return (function(e9, t9, r9, i9) {
    t9 = re3(t9);
    const a9 = re3(Re2(e9, i9, le3(t9)));
    return r9 = re3(r9), ye3(ne3(a9, r9, t9), "be", le3(t9));
  })(e8, r8, a8, c7);
}
async function He(e8, t8, r8, i8, a8, n8) {
  if (t8 && !_5.isStream(t8)) {
    if (_5.getWebCrypto()) try {
      return await (async function(e9, t9, r9, i9, a9) {
        const n9 = $e(i9, a9), s8 = await ze.importKey("jwk", n9, { name: "RSASSA-PKCS1-v1_5", hash: { name: e9 } }, false, ["verify"]);
        return ze.verify("RSASSA-PKCS1-v1_5", s8, r9, t9);
      })(M7.read(M7.webHash, e8), t8, r8, i8, a8);
    } catch (e9) {
      _5.printDebugError(e9);
    }
    else if (_5.getNodeCrypto()) return (function(e9, t9, r9, i9, a9) {
      const n9 = $e(i9, a9), s8 = { key: n9, format: "jwk", type: "pkcs1" }, o8 = Oe2.createVerify(M7.read(M7.hash, e9));
      o8.write(t9), o8.end();
      try {
        return o8.verify(s8, r9);
      } catch {
        return false;
      }
    })(e8, t8, r8, i8, a8);
  }
  return (function(e9, t9, r9, i9, a9) {
    if (r9 = re3(r9), t9 = re3(t9), i9 = re3(i9), t9 >= r9) throw Error("Signature size cannot exceed modulus size");
    const n9 = ye3(ne3(t9, i9, r9), "be", le3(r9)), s8 = Re2(e9, a9, le3(r9));
    return _5.equalsUint8Array(n9, s8);
  })(e8, r8, i8, a8, n8);
}
async function Ge(e8, t8, r8) {
  return _5.getNodeCrypto() ? (function(e9, t9, r9) {
    const i8 = $e(t9, r9), a8 = { key: i8, format: "jwk", type: "pkcs1", padding: Oe2.constants.RSA_PKCS1_PADDING };
    return new Uint8Array(Oe2.publicEncrypt(a8, e9));
  })(e8, t8, r8) : (function(e9, t9, r9) {
    if (t9 = re3(t9), e9 = re3(_e(e9, le3(t9))), r9 = re3(r9), e9 >= t9) throw Error("Message size cannot exceed modulus size");
    return ye3(ne3(e9, r9, t9), "be", le3(t9));
  })(e8, t8, r8);
}
async function Ve2(e8, t8, r8, i8, a8, n8, s8, o8) {
  if (_5.getNodeCrypto() && !o8) try {
    return (function(e9, t9, r9, i9, a9, n9, s9) {
      const o9 = We(t9, r9, i9, a9, n9, s9), c7 = { key: o9, format: "jwk", type: "pkcs1", padding: Oe2.constants.RSA_PKCS1_PADDING };
      try {
        return new Uint8Array(Oe2.privateDecrypt(c7, e9));
      } catch {
        throw Error("Decryption error");
      }
    })(e8, t8, r8, i8, a8, n8, s8);
  } catch (e9) {
    _5.printDebugError(e9);
  }
  return (function(e9, t9, r9, i9, a9, n9, s9, o9) {
    if (e9 = re3(e9), t9 = re3(t9), r9 = re3(r9), i9 = re3(i9), a9 = re3(a9), n9 = re3(n9), s9 = re3(s9), e9 >= t9) throw Error("Data too large.");
    const c7 = ie3(i9, n9 - je), u8 = ie3(i9, a9 - je), h7 = ge3(BigInt(2), t9), l6 = ne3(oe3(h7, t9), r9, t9);
    e9 = ie3(e9 * l6, t9);
    const y8 = ne3(e9, u8, a9), p5 = ne3(e9, c7, n9), d6 = ie3(s9 * (p5 - y8), n9);
    let g7 = d6 * a9 + y8;
    return g7 = ie3(g7 * h7, t9), Ne2(ye3(g7, "be", le3(t9)), o9);
  })(e8, t8, r8, i8, a8, n8, s8, o8);
}
function We(e8, t8, r8, i8, a8, n8) {
  const s8 = re3(i8), o8 = re3(a8), c7 = re3(r8);
  let u8 = ie3(c7, o8 - je), h7 = ie3(c7, s8 - je);
  return h7 = ye3(h7), u8 = ye3(u8), { kty: "RSA", n: H6(e8), e: H6(t8), d: H6(r8), p: H6(a8), q: H6(i8), dp: H6(u8), dq: H6(h7), qi: H6(n8), ext: true };
}
function $e(e8, t8) {
  return { kty: "RSA", n: H6(e8), e: H6(t8), ext: true };
}
function Qe(e8, t8) {
  return { n: q6(e8.n), e: ye3(t8), d: q6(e8.d), p: q6(e8.q), q: q6(e8.p), u: q6(e8.qi) };
}
var Xe = BigInt(1);
var Ye = { "2a8648ce3d030107": M7.curve.nistP256, "2b81040022": M7.curve.nistP384, "2b81040023": M7.curve.nistP521, "2b8104000a": M7.curve.secp256k1, "2b06010401da470f01": M7.curve.ed25519Legacy, "2b060104019755010501": M7.curve.curve25519Legacy, "2b2403030208010107": M7.curve.brainpoolP256r1, "2b240303020801010b": M7.curve.brainpoolP384r1, "2b240303020801010d": M7.curve.brainpoolP512r1 };
var Ze2 = class _Ze {
  constructor(e8) {
    if (e8 instanceof _Ze) this.oid = e8.oid;
    else if (_5.isArray(e8) || _5.isUint8Array(e8)) {
      if (6 === (e8 = new Uint8Array(e8))[0]) {
        if (e8[1] !== e8.length - 2) throw Error("Length mismatch in DER encoded oid");
        e8 = e8.subarray(2);
      }
      this.oid = e8;
    } else this.oid = "";
  }
  read(e8) {
    if (e8.length >= 1) {
      const t8 = e8[0];
      if (e8.length >= 1 + t8) return this.oid = e8.subarray(1, 1 + t8), 1 + this.oid.length;
    }
    throw Error("Invalid oid");
  }
  write() {
    return _5.concatUint8Array([new Uint8Array([this.oid.length]), this.oid]);
  }
  toHex() {
    return _5.uint8ArrayToHex(this.oid);
  }
  getName() {
    const e8 = Ye[this.toHex()];
    if (!e8) throw Error("Unknown curve object identifier.");
    return e8;
  }
};
function Je(e8) {
  let t8, r8 = 0;
  const i8 = e8[0];
  return i8 < 192 ? ([r8] = e8, t8 = 1) : i8 < 255 ? (r8 = (e8[0] - 192 << 8) + e8[1] + 192, t8 = 2) : 255 === i8 && (r8 = _5.readNumber(e8.subarray(1, 5)), t8 = 5), { len: r8, offset: t8 };
}
function et3(e8) {
  return e8 < 192 ? new Uint8Array([e8]) : e8 > 191 && e8 < 8384 ? new Uint8Array([192 + (e8 - 192 >> 8), e8 - 192 & 255]) : _5.concatUint8Array([new Uint8Array([255]), _5.writeNumber(e8, 4)]);
}
function tt3(e8) {
  if (e8 < 0 || e8 > 30) throw Error("Partial Length power must be between 1 and 30");
  return new Uint8Array([224 + e8]);
}
function rt3(e8) {
  return new Uint8Array([192 | e8]);
}
function it3(e8, t8) {
  return _5.concatUint8Array([rt3(e8), et3(t8)]);
}
function at3(e8) {
  return [M7.packet.literalData, M7.packet.compressedData, M7.packet.symmetricallyEncryptedData, M7.packet.symEncryptedIntegrityProtectedData, M7.packet.aeadEncryptedData].includes(e8);
}
async function nt3(e8, t8, r8) {
  let i8, a8;
  try {
    const s8 = await e8.peekBytes(2);
    if (!s8 || s8.length < 2 || !(128 & s8[0])) throw Error("Error during parsing. This message / key probably does not conform to a valid OpenPGP format.");
    const o8 = await e8.readByte();
    let c7, u8, h7 = -1, l6 = -1;
    l6 = 0, 64 & o8 && (l6 = 1), l6 ? h7 = 63 & o8 : (h7 = (63 & o8) >> 2, u8 = 3 & o8);
    const y8 = at3(h7);
    let p5, d6 = null;
    if (t8 && y8) {
      if ("array" === t8) {
        const e9 = new n7();
        i8 = T5(e9), d6 = e9;
      } else {
        const e9 = new TransformStream();
        i8 = T5(e9.writable), d6 = e9.readable;
      }
      a8 = r8({ tag: h7, packet: d6 });
    } else d6 = [];
    do {
      if (l6) {
        const t9 = await e8.readByte();
        if (p5 = false, t9 < 192) c7 = t9;
        else if (t9 >= 192 && t9 < 224) c7 = (t9 - 192 << 8) + await e8.readByte() + 192;
        else if (t9 > 223 && t9 < 255) {
          if (c7 = 1 << (31 & t9), p5 = true, !y8) throw new TypeError("This packet type does not support partial lengths.");
        } else c7 = await e8.readByte() << 24 | await e8.readByte() << 16 | await e8.readByte() << 8 | await e8.readByte();
      } else switch (u8) {
        case 0:
          c7 = await e8.readByte();
          break;
        case 1:
          c7 = await e8.readByte() << 8 | await e8.readByte();
          break;
        case 2:
          c7 = await e8.readByte() << 24 | await e8.readByte() << 16 | await e8.readByte() << 8 | await e8.readByte();
          break;
        default:
          c7 = 1 / 0;
      }
      if (c7 > 0) {
        let t9 = 0;
        for (; ; ) {
          i8 && await i8.ready;
          const { done: r9, value: a9 } = await e8.read();
          if (r9) {
            if (c7 === 1 / 0) break;
            throw Error("Unexpected end of packet");
          }
          const n8 = c7 === 1 / 0 ? a9 : a9.subarray(0, c7 - t9);
          if (i8 ? await i8.write(n8) : d6.push(n8), t9 += a9.length, t9 >= c7) {
            e8.unshift(a9.subarray(c7 - t9 + a9.length));
            break;
          }
        }
      }
    } while (p5);
    i8 ? (await i8.ready, await i8.close()) : (d6 = _5.concatUint8Array(d6), await r8({ tag: h7, packet: d6 }));
  } catch (e9) {
    if (i8) return await i8.abort(e9), true;
    throw e9;
  } finally {
    i8 && await a8;
  }
}
var st3 = class _st extends Error {
  constructor(...e8) {
    super(...e8), Error.captureStackTrace && Error.captureStackTrace(this, _st), this.name = "UnsupportedError";
  }
};
var ot3 = class extends st3 {
  constructor(...e8) {
    super(...e8), Error.captureStackTrace && Error.captureStackTrace(this, st3), this.name = "UnknownPacketError";
  }
};
var ct3 = class extends st3 {
  constructor(...e8) {
    super(...e8), Error.captureStackTrace && Error.captureStackTrace(this, st3), this.name = "MalformedPacketError";
  }
};
var ut3 = class {
  constructor(e8, t8) {
    this.tag = e8, this.rawContent = t8;
  }
  write() {
    return this.rawContent;
  }
};
async function ht3(e8) {
  switch (e8) {
    case M7.publicKey.ed25519:
      try {
        const e9 = _5.getWebCrypto(), t8 = await e9.generateKey("Ed25519", true, ["sign", "verify"]).catch(((e10) => {
          if ("OperationError" === e10.name) {
            const e11 = Error("Unexpected key generation issue");
            throw e11.name = "NotSupportedError", e11;
          }
          throw e10;
        })), r8 = await e9.exportKey("jwk", t8.privateKey), i8 = await e9.exportKey("jwk", t8.publicKey);
        return { A: new Uint8Array(q6(i8.x)), seed: q6(r8.d) };
      } catch (t8) {
        if ("NotSupportedError" !== t8.name) throw t8;
        const { default: r8 } = await Promise.resolve().then(() => (init_nacl_fast_min(), nacl_fast_min_exports)), i8 = de3(dt3(e8)), { publicKey: a8 } = r8.sign.keyPair.fromSeed(i8);
        return { A: a8, seed: i8 };
      }
    case M7.publicKey.ed448: {
      const e9 = await _5.getNobleCurve(M7.publicKey.ed448), { secretKey: t8, publicKey: r8 } = e9.keygen();
      return { A: r8, seed: t8 };
    }
    default:
      throw Error("Unsupported EdDSA algorithm");
  }
}
async function lt3(e8, t8, r8, i8, a8, n8) {
  switch (e8) {
    case M7.publicKey.ed25519:
      try {
        const t9 = _5.getWebCrypto(), r9 = ft3(e8, i8, a8), s8 = await t9.importKey("jwk", r9, "Ed25519", false, ["sign"]);
        return { RS: new Uint8Array(await t9.sign("Ed25519", s8, n8)) };
      } catch (e9) {
        if ("NotSupportedError" !== e9.name) throw e9;
        const { default: t9 } = await Promise.resolve().then(() => (init_nacl_fast_min(), nacl_fast_min_exports)), r9 = _5.concatUint8Array([a8, i8]);
        return { RS: t9.sign.detached(n8, r9) };
      }
    case M7.publicKey.ed448:
      return { RS: (await _5.getNobleCurve(M7.publicKey.ed448)).sign(n8, a8) };
    default:
      throw Error("Unsupported EdDSA algorithm");
  }
}
async function yt3(e8, t8, { RS: r8 }, i8, a8, n8) {
  switch (e8) {
    case M7.publicKey.ed25519:
      try {
        const t9 = _5.getWebCrypto(), i9 = mt3(e8, a8), s8 = await t9.importKey("jwk", i9, "Ed25519", false, ["verify"]);
        return await t9.verify("Ed25519", s8, r8, n8);
      } catch (e9) {
        if ("NotSupportedError" !== e9.name) throw e9;
        const { default: t9 } = await Promise.resolve().then(() => (init_nacl_fast_min(), nacl_fast_min_exports));
        return t9.sign.detached.verify(n8, r8, a8);
      }
    case M7.publicKey.ed448:
      return (await _5.getNobleCurve(M7.publicKey.ed448)).verify(r8, n8, a8);
    default:
      throw Error("Unsupported EdDSA algorithm");
  }
}
async function pt3(e8, t8, r8) {
  switch (e8) {
    case M7.publicKey.ed25519:
      try {
        const i8 = _5.getWebCrypto(), a8 = ft3(e8, t8, r8), n8 = mt3(e8, t8), s8 = await i8.importKey("jwk", a8, "Ed25519", false, ["sign"]), o8 = await i8.importKey("jwk", n8, "Ed25519", false, ["verify"]), c7 = de3(8), u8 = new Uint8Array(await i8.sign("Ed25519", s8, c7));
        return await i8.verify("Ed25519", o8, u8, c7);
      } catch (e9) {
        if ("NotSupportedError" !== e9.name) return false;
        const { default: i8 } = await Promise.resolve().then(() => (init_nacl_fast_min(), nacl_fast_min_exports)), { publicKey: a8 } = i8.sign.keyPair.fromSeed(r8);
        return _5.equalsUint8Array(t8, a8);
      }
    case M7.publicKey.ed448: {
      const e9 = (await _5.getNobleCurve(M7.publicKey.ed448)).getPublicKey(r8);
      return _5.equalsUint8Array(t8, e9);
    }
    default:
      return false;
  }
}
function dt3(e8) {
  switch (e8) {
    case M7.publicKey.ed25519:
      return 32;
    case M7.publicKey.ed448:
      return 57;
    default:
      throw Error("Unsupported EdDSA algorithm");
  }
}
function gt3(e8) {
  switch (e8) {
    case M7.publicKey.ed25519:
      return M7.hash.sha256;
    case M7.publicKey.ed448:
      return M7.hash.sha512;
    default:
      throw Error("Unknown EdDSA algo");
  }
}
var mt3 = (e8, t8) => {
  if (e8 === M7.publicKey.ed25519) {
    return { kty: "OKP", crv: "Ed25519", x: H6(t8), ext: true };
  }
  throw Error("Unsupported EdDSA algorithm");
};
var ft3 = (e8, t8, r8) => {
  if (e8 === M7.publicKey.ed25519) {
    const i8 = mt3(e8, t8);
    return i8.d = H6(r8), i8;
  }
  throw Error("Unsupported EdDSA algorithm");
};
var wt3 = /* @__PURE__ */ Object.freeze({ __proto__: null, generate: ht3, getPayloadSize: dt3, getPreferredHashAlgo: gt3, sign: lt3, validateParams: pt3, verify: yt3 });
function bt3(e8) {
  return e8 instanceof Uint8Array || ArrayBuffer.isView(e8) && "Uint8Array" === e8.constructor.name;
}
function kt3(e8, ...t8) {
  if (!bt3(e8)) throw Error("Uint8Array expected");
  if (t8.length > 0 && !t8.includes(e8.length)) throw Error("Uint8Array expected of length " + t8 + ", got length=" + e8.length);
}
function vt3(e8, t8 = true) {
  if (e8.destroyed) throw Error("Hash instance has been destroyed");
  if (t8 && e8.finished) throw Error("Hash#digest() has already been called");
}
function Kt2(e8, t8) {
  kt3(e8);
  const r8 = t8.outputLen;
  if (e8.length < r8) throw Error("digestInto() expects output buffer of length at least " + r8);
}
function At3(e8) {
  return new Uint8Array(e8.buffer, e8.byteOffset, e8.byteLength);
}
function Et3(e8) {
  return new Uint32Array(e8.buffer, e8.byteOffset, Math.floor(e8.byteLength / 4));
}
function St2(...e8) {
  for (let t8 = 0; t8 < e8.length; t8++) e8[t8].fill(0);
}
function Pt2(e8) {
  return new DataView(e8.buffer, e8.byteOffset, e8.byteLength);
}
var Ut3 = /* @__PURE__ */ (() => 68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0])();
function Dt3(e8) {
  if ("string" == typeof e8) e8 = (function(e9) {
    if ("string" != typeof e9) throw Error("string expected");
    return new Uint8Array(new TextEncoder().encode(e9));
  })(e8);
  else {
    if (!bt3(e8)) throw Error("Uint8Array expected, got " + typeof e8);
    e8 = Ft3(e8);
  }
  return e8;
}
function xt3(e8, t8) {
  return e8.buffer === t8.buffer && e8.byteOffset < t8.byteOffset + t8.byteLength && t8.byteOffset < e8.byteOffset + e8.byteLength;
}
function Ct3(e8, t8) {
  if (xt3(e8, t8) && e8.byteOffset < t8.byteOffset) throw Error("complex overlap of input and output is not supported");
}
function It3(e8, t8) {
  if (e8.length !== t8.length) return false;
  let r8 = 0;
  for (let i8 = 0; i8 < e8.length; i8++) r8 |= e8[i8] ^ t8[i8];
  return 0 === r8;
}
var Tt2 = (e8, t8) => {
  function r8(r9, ...i8) {
    if (kt3(r9), !Ut3) throw Error("Non little-endian hardware is not yet supported");
    if (void 0 !== e8.nonceLength) {
      const t9 = i8[0];
      if (!t9) throw Error("nonce / iv required");
      e8.varSizeNonce ? kt3(t9) : kt3(t9, e8.nonceLength);
    }
    const a8 = e8.tagLength;
    a8 && void 0 !== i8[1] && kt3(i8[1]);
    const n8 = t8(r9, ...i8), s8 = (e9, t9) => {
      if (void 0 !== t9) {
        if (2 !== e9) throw Error("cipher output not supported");
        kt3(t9);
      }
    };
    let o8 = false;
    return { encrypt(e9, t9) {
      if (o8) throw Error("cannot encrypt() twice with same key + nonce");
      return o8 = true, kt3(e9), s8(n8.encrypt.length, t9), n8.encrypt(e9, t9);
    }, decrypt(e9, t9) {
      if (kt3(e9), a8 && e9.length < a8) throw Error("invalid ciphertext length: smaller than tagLength=" + a8);
      return s8(n8.decrypt.length, t9), n8.decrypt(e9, t9);
    } };
  }
  return Object.assign(r8, e8), r8;
};
function Bt3(e8, t8, r8 = true) {
  if (void 0 === t8) return new Uint8Array(e8);
  if (t8.length !== e8) throw Error("invalid output length, expected " + e8 + ", got: " + t8.length);
  if (r8 && !Lt3(t8)) throw Error("invalid output, must be aligned");
  return t8;
}
function Mt3(e8, t8, r8, i8) {
  if ("function" == typeof e8.setBigUint64) return e8.setBigUint64(t8, r8, i8);
  const a8 = BigInt(32), n8 = BigInt(4294967295), s8 = Number(r8 >> a8 & n8), o8 = Number(r8 & n8);
  e8.setUint32(t8 + 0, s8, i8), e8.setUint32(t8 + 4, o8, i8);
}
function Lt3(e8) {
  return e8.byteOffset % 4 == 0;
}
function Ft3(e8) {
  return Uint8Array.from(e8);
}
var _t3 = 16;
var Nt3 = /* @__PURE__ */ new Uint8Array(16);
var Rt2 = Et3(Nt3);
var zt2 = (e8) => (e8 >>> 0 & 255) << 24 | (e8 >>> 8 & 255) << 16 | (e8 >>> 16 & 255) << 8 | e8 >>> 24 & 255;
var Ot3 = class {
  constructor(e8, t8) {
    this.blockLen = _t3, this.outputLen = _t3, this.s0 = 0, this.s1 = 0, this.s2 = 0, this.s3 = 0, this.finished = false, kt3(e8 = Dt3(e8), 16);
    const r8 = Pt2(e8);
    let i8 = r8.getUint32(0, false), a8 = r8.getUint32(4, false), n8 = r8.getUint32(8, false), s8 = r8.getUint32(12, false);
    const o8 = [];
    for (let e9 = 0; e9 < 128; e9++) o8.push({ s0: zt2(i8), s1: zt2(a8), s2: zt2(n8), s3: zt2(s8) }), { s0: i8, s1: a8, s2: n8, s3: s8 } = { s3: (h7 = n8) << 31 | (l6 = s8) >>> 1, s2: (u8 = a8) << 31 | h7 >>> 1, s1: (c7 = i8) << 31 | u8 >>> 1, s0: c7 >>> 1 ^ 225 << 24 & -(1 & l6) };
    var c7, u8, h7, l6;
    const y8 = (p5 = t8 || 1024) > 65536 ? 8 : p5 > 1024 ? 4 : 2;
    var p5;
    if (![1, 2, 4, 8].includes(y8)) throw Error("ghash: invalid window size, expected 2, 4 or 8");
    this.W = y8;
    const d6 = 128 / y8, g7 = this.windowSize = 2 ** y8, m6 = [];
    for (let e9 = 0; e9 < d6; e9++) for (let t9 = 0; t9 < g7; t9++) {
      let r9 = 0, i9 = 0, a9 = 0, n9 = 0;
      for (let s9 = 0; s9 < y8; s9++) {
        if (!(t9 >>> y8 - s9 - 1 & 1)) continue;
        const { s0: c8, s1: u9, s2: h8, s3: l7 } = o8[y8 * e9 + s9];
        r9 ^= c8, i9 ^= u9, a9 ^= h8, n9 ^= l7;
      }
      m6.push({ s0: r9, s1: i9, s2: a9, s3: n9 });
    }
    this.t = m6;
  }
  _updateBlock(e8, t8, r8, i8) {
    e8 ^= this.s0, t8 ^= this.s1, r8 ^= this.s2, i8 ^= this.s3;
    const { W: a8, t: n8, windowSize: s8 } = this;
    let o8 = 0, c7 = 0, u8 = 0, h7 = 0;
    const l6 = (1 << a8) - 1;
    let y8 = 0;
    for (const p5 of [e8, t8, r8, i8]) for (let e9 = 0; e9 < 4; e9++) {
      const t9 = p5 >>> 8 * e9 & 255;
      for (let e10 = 8 / a8 - 1; e10 >= 0; e10--) {
        const r9 = t9 >>> a8 * e10 & l6, { s0: i9, s1: p6, s2: d6, s3: g7 } = n8[y8 * s8 + r9];
        o8 ^= i9, c7 ^= p6, u8 ^= d6, h7 ^= g7, y8 += 1;
      }
    }
    this.s0 = o8, this.s1 = c7, this.s2 = u8, this.s3 = h7;
  }
  update(e8) {
    vt3(this), kt3(e8 = Dt3(e8));
    const t8 = Et3(e8), r8 = Math.floor(e8.length / _t3), i8 = e8.length % _t3;
    for (let e9 = 0; e9 < r8; e9++) this._updateBlock(t8[4 * e9 + 0], t8[4 * e9 + 1], t8[4 * e9 + 2], t8[4 * e9 + 3]);
    return i8 && (Nt3.set(e8.subarray(r8 * _t3)), this._updateBlock(Rt2[0], Rt2[1], Rt2[2], Rt2[3]), St2(Rt2)), this;
  }
  destroy() {
    const { t: e8 } = this;
    for (const t8 of e8) t8.s0 = 0, t8.s1 = 0, t8.s2 = 0, t8.s3 = 0;
  }
  digestInto(e8) {
    vt3(this), Kt2(e8, this), this.finished = true;
    const { s0: t8, s1: r8, s2: i8, s3: a8 } = this, n8 = Et3(e8);
    return n8[0] = t8, n8[1] = r8, n8[2] = i8, n8[3] = a8, e8;
  }
  digest() {
    const e8 = new Uint8Array(_t3);
    return this.digestInto(e8), this.destroy(), e8;
  }
};
var jt2 = class extends Ot3 {
  constructor(e8, t8) {
    kt3(e8 = Dt3(e8));
    const r8 = (function(e9) {
      e9.reverse();
      const t9 = 1 & e9[15];
      let r9 = 0;
      for (let t10 = 0; t10 < e9.length; t10++) {
        const i8 = e9[t10];
        e9[t10] = i8 >>> 1 | r9, r9 = (1 & i8) << 7;
      }
      return e9[0] ^= 225 & -t9, e9;
    })(Ft3(e8));
    super(r8, t8), St2(r8);
  }
  update(e8) {
    e8 = Dt3(e8), vt3(this);
    const t8 = Et3(e8), r8 = e8.length % _t3, i8 = Math.floor(e8.length / _t3);
    for (let e9 = 0; e9 < i8; e9++) this._updateBlock(zt2(t8[4 * e9 + 3]), zt2(t8[4 * e9 + 2]), zt2(t8[4 * e9 + 1]), zt2(t8[4 * e9 + 0]));
    return r8 && (Nt3.set(e8.subarray(i8 * _t3)), this._updateBlock(zt2(Rt2[3]), zt2(Rt2[2]), zt2(Rt2[1]), zt2(Rt2[0])), St2(Rt2)), this;
  }
  digestInto(e8) {
    vt3(this), Kt2(e8, this), this.finished = true;
    const { s0: t8, s1: r8, s2: i8, s3: a8 } = this, n8 = Et3(e8);
    return n8[0] = t8, n8[1] = r8, n8[2] = i8, n8[3] = a8, e8.reverse();
  }
};
function qt2(e8) {
  const t8 = (t9, r9) => e8(r9, t9.length).update(Dt3(t9)).digest(), r8 = e8(new Uint8Array(16), 0);
  return t8.outputLen = r8.outputLen, t8.blockLen = r8.blockLen, t8.create = (t9, r9) => e8(t9, r9), t8;
}
var Ht3 = qt2(((e8, t8) => new Ot3(e8, t8)));
qt2(((e8, t8) => new jt2(e8, t8)));
var Gt3 = 16;
var Vt2 = /* @__PURE__ */ new Uint8Array(Gt3);
function Wt2(e8) {
  return e8 << 1 ^ 283 & -(e8 >> 7);
}
function $t2(e8, t8) {
  let r8 = 0;
  for (; t8 > 0; t8 >>= 1) r8 ^= e8 & -(1 & t8), e8 = Wt2(e8);
  return r8;
}
var Qt2 = /* @__PURE__ */ (() => {
  const e8 = new Uint8Array(256);
  for (let t9 = 0, r8 = 1; t9 < 256; t9++, r8 ^= Wt2(r8)) e8[t9] = r8;
  const t8 = new Uint8Array(256);
  t8[0] = 99;
  for (let r8 = 0; r8 < 255; r8++) {
    let i8 = e8[255 - r8];
    i8 |= i8 << 8, t8[e8[r8]] = 255 & (i8 ^ i8 >> 4 ^ i8 >> 5 ^ i8 >> 6 ^ i8 >> 7 ^ 99);
  }
  return St2(e8), t8;
})();
var Xt3 = /* @__PURE__ */ Qt2.map(((e8, t8) => Qt2.indexOf(t8)));
var Yt2 = (e8) => e8 << 8 | e8 >>> 24;
var Zt2 = (e8) => e8 << 24 & 4278190080 | e8 << 8 & 16711680 | e8 >>> 8 & 65280 | e8 >>> 24 & 255;
function Jt2(e8, t8) {
  if (256 !== e8.length) throw Error("Wrong sbox length");
  const r8 = new Uint32Array(256).map(((r9, i9) => t8(e8[i9]))), i8 = r8.map(Yt2), a8 = i8.map(Yt2), n8 = a8.map(Yt2), s8 = new Uint32Array(65536), o8 = new Uint32Array(65536), c7 = new Uint16Array(65536);
  for (let t9 = 0; t9 < 256; t9++) for (let u8 = 0; u8 < 256; u8++) {
    const h7 = 256 * t9 + u8;
    s8[h7] = r8[t9] ^ i8[u8], o8[h7] = a8[t9] ^ n8[u8], c7[h7] = e8[t9] << 8 | e8[u8];
  }
  return { sbox: e8, sbox2: c7, T0: r8, T1: i8, T2: a8, T3: n8, T01: s8, T23: o8 };
}
var er = /* @__PURE__ */ Jt2(Qt2, ((e8) => $t2(e8, 3) << 24 | e8 << 16 | e8 << 8 | $t2(e8, 2)));
var tr = /* @__PURE__ */ Jt2(Xt3, ((e8) => $t2(e8, 11) << 24 | $t2(e8, 13) << 16 | $t2(e8, 9) << 8 | $t2(e8, 14)));
var rr = /* @__PURE__ */ (() => {
  const e8 = new Uint8Array(16);
  for (let t8 = 0, r8 = 1; t8 < 16; t8++, r8 = Wt2(r8)) e8[t8] = r8;
  return e8;
})();
function ir(e8) {
  kt3(e8);
  const t8 = e8.length;
  if (![16, 24, 32].includes(t8)) throw Error("aes: invalid key size, should be 16, 24 or 32, got " + t8);
  const { sbox2: r8 } = er, i8 = [];
  Lt3(e8) || i8.push(e8 = Ft3(e8));
  const a8 = Et3(e8), n8 = a8.length, s8 = (e9) => sr(r8, e9, e9, e9, e9), o8 = new Uint32Array(t8 + 28);
  o8.set(a8);
  for (let e9 = n8; e9 < o8.length; e9++) {
    let t9 = o8[e9 - 1];
    e9 % n8 == 0 ? t9 = s8((c7 = t9) << 24 | c7 >>> 8) ^ rr[e9 / n8 - 1] : n8 > 6 && e9 % n8 == 4 && (t9 = s8(t9)), o8[e9] = o8[e9 - n8] ^ t9;
  }
  var c7;
  return St2(...i8), o8;
}
function ar(e8) {
  const t8 = ir(e8), r8 = t8.slice(), i8 = t8.length, { sbox2: a8 } = er, { T0: n8, T1: s8, T2: o8, T3: c7 } = tr;
  for (let e9 = 0; e9 < i8; e9 += 4) for (let a9 = 0; a9 < 4; a9++) r8[e9 + a9] = t8[i8 - e9 - 4 + a9];
  St2(t8);
  for (let e9 = 4; e9 < i8 - 4; e9++) {
    const t9 = r8[e9], i9 = sr(a8, t9, t9, t9, t9);
    r8[e9] = n8[255 & i9] ^ s8[i9 >>> 8 & 255] ^ o8[i9 >>> 16 & 255] ^ c7[i9 >>> 24];
  }
  return r8;
}
function nr(e8, t8, r8, i8, a8, n8) {
  return e8[r8 << 8 & 65280 | i8 >>> 8 & 255] ^ t8[a8 >>> 8 & 65280 | n8 >>> 24 & 255];
}
function sr(e8, t8, r8, i8, a8) {
  return e8[255 & t8 | 65280 & r8] | e8[i8 >>> 16 & 255 | a8 >>> 16 & 65280] << 16;
}
function or(e8, t8, r8, i8, a8) {
  const { sbox2: n8, T01: s8, T23: o8 } = er;
  let c7 = 0;
  t8 ^= e8[c7++], r8 ^= e8[c7++], i8 ^= e8[c7++], a8 ^= e8[c7++];
  const u8 = e8.length / 4 - 2;
  for (let n9 = 0; n9 < u8; n9++) {
    const n10 = e8[c7++] ^ nr(s8, o8, t8, r8, i8, a8), u9 = e8[c7++] ^ nr(s8, o8, r8, i8, a8, t8), h7 = e8[c7++] ^ nr(s8, o8, i8, a8, t8, r8), l6 = e8[c7++] ^ nr(s8, o8, a8, t8, r8, i8);
    t8 = n10, r8 = u9, i8 = h7, a8 = l6;
  }
  return { s0: e8[c7++] ^ sr(n8, t8, r8, i8, a8), s1: e8[c7++] ^ sr(n8, r8, i8, a8, t8), s2: e8[c7++] ^ sr(n8, i8, a8, t8, r8), s3: e8[c7++] ^ sr(n8, a8, t8, r8, i8) };
}
function cr(e8, t8, r8, i8, a8) {
  const { sbox2: n8, T01: s8, T23: o8 } = tr;
  let c7 = 0;
  t8 ^= e8[c7++], r8 ^= e8[c7++], i8 ^= e8[c7++], a8 ^= e8[c7++];
  const u8 = e8.length / 4 - 2;
  for (let n9 = 0; n9 < u8; n9++) {
    const n10 = e8[c7++] ^ nr(s8, o8, t8, a8, i8, r8), u9 = e8[c7++] ^ nr(s8, o8, r8, t8, a8, i8), h7 = e8[c7++] ^ nr(s8, o8, i8, r8, t8, a8), l6 = e8[c7++] ^ nr(s8, o8, a8, i8, r8, t8);
    t8 = n10, r8 = u9, i8 = h7, a8 = l6;
  }
  return { s0: e8[c7++] ^ sr(n8, t8, a8, i8, r8), s1: e8[c7++] ^ sr(n8, r8, t8, a8, i8), s2: e8[c7++] ^ sr(n8, i8, r8, t8, a8), s3: e8[c7++] ^ sr(n8, a8, i8, r8, t8) };
}
function ur(e8, t8, r8, i8) {
  kt3(t8, Gt3), kt3(r8);
  const a8 = r8.length;
  Ct3(r8, i8 = Bt3(a8, i8));
  const n8 = t8, s8 = Et3(n8);
  let { s0: o8, s1: c7, s2: u8, s3: h7 } = or(e8, s8[0], s8[1], s8[2], s8[3]);
  const l6 = Et3(r8), y8 = Et3(i8);
  for (let t9 = 0; t9 + 4 <= l6.length; t9 += 4) {
    y8[t9 + 0] = l6[t9 + 0] ^ o8, y8[t9 + 1] = l6[t9 + 1] ^ c7, y8[t9 + 2] = l6[t9 + 2] ^ u8, y8[t9 + 3] = l6[t9 + 3] ^ h7;
    let r9 = 1;
    for (let e9 = n8.length - 1; e9 >= 0; e9--) r9 = r9 + (255 & n8[e9]) | 0, n8[e9] = 255 & r9, r9 >>>= 8;
    ({ s0: o8, s1: c7, s2: u8, s3: h7 } = or(e8, s8[0], s8[1], s8[2], s8[3]));
  }
  const p5 = Gt3 * Math.floor(l6.length / 4);
  if (p5 < a8) {
    const e9 = new Uint32Array([o8, c7, u8, h7]), t9 = At3(e9);
    for (let e10 = p5, n9 = 0; e10 < a8; e10++, n9++) i8[e10] = r8[e10] ^ t9[n9];
    St2(e9);
  }
  return i8;
}
function hr(e8, t8, r8, i8, a8) {
  kt3(r8, Gt3), kt3(i8), a8 = Bt3(i8.length, a8);
  const n8 = r8, s8 = Et3(n8), o8 = Pt2(n8), c7 = Et3(i8), u8 = Et3(a8), h7 = t8 ? 0 : 12, l6 = i8.length;
  let y8 = o8.getUint32(h7, t8), { s0: p5, s1: d6, s2: g7, s3: m6 } = or(e8, s8[0], s8[1], s8[2], s8[3]);
  for (let r9 = 0; r9 + 4 <= c7.length; r9 += 4) u8[r9 + 0] = c7[r9 + 0] ^ p5, u8[r9 + 1] = c7[r9 + 1] ^ d6, u8[r9 + 2] = c7[r9 + 2] ^ g7, u8[r9 + 3] = c7[r9 + 3] ^ m6, y8 = y8 + 1 >>> 0, o8.setUint32(h7, y8, t8), { s0: p5, s1: d6, s2: g7, s3: m6 } = or(e8, s8[0], s8[1], s8[2], s8[3]);
  const f8 = Gt3 * Math.floor(c7.length / 4);
  if (f8 < l6) {
    const e9 = new Uint32Array([p5, d6, g7, m6]), t9 = At3(e9);
    for (let e10 = f8, r9 = 0; e10 < l6; e10++, r9++) a8[e10] = i8[e10] ^ t9[r9];
    St2(e9);
  }
  return a8;
}
var lr = /* @__PURE__ */ Tt2({ blockSize: 16, nonceLength: 16 }, (function(e8, t8) {
  function r8(r9, i8) {
    if (kt3(r9), void 0 !== i8 && (kt3(i8), !Lt3(i8))) throw Error("unaligned destination");
    const a8 = ir(e8), n8 = Ft3(t8), s8 = [a8, n8];
    Lt3(r9) || s8.push(r9 = Ft3(r9));
    const o8 = ur(a8, n8, r9, i8);
    return St2(...s8), o8;
  }
  return { encrypt: (e9, t9) => r8(e9, t9), decrypt: (e9, t9) => r8(e9, t9) };
}));
var yr = /* @__PURE__ */ Tt2({ blockSize: 16, nonceLength: 16 }, (function(e8, t8, r8 = {}) {
  const i8 = !r8.disablePadding;
  return { encrypt(r9, a8) {
    const n8 = ir(e8), { b: s8, o: o8, out: c7 } = (function(e9, t9, r10) {
      kt3(e9);
      let i9 = e9.length;
      const a9 = i9 % Gt3;
      if (!t9 && 0 !== a9) throw Error("aec/(cbc-ecb): unpadded plaintext with disabled padding");
      Lt3(e9) || (e9 = Ft3(e9));
      const n9 = Et3(e9);
      if (t9) {
        let e10 = Gt3 - a9;
        e10 || (e10 = Gt3), i9 += e10;
      }
      return Ct3(e9, r10 = Bt3(i9, r10)), { b: n9, o: Et3(r10), out: r10 };
    })(r9, i8, a8);
    let u8 = t8;
    const h7 = [n8];
    Lt3(u8) || h7.push(u8 = Ft3(u8));
    const l6 = Et3(u8);
    let y8 = l6[0], p5 = l6[1], d6 = l6[2], g7 = l6[3], m6 = 0;
    for (; m6 + 4 <= s8.length; ) y8 ^= s8[m6 + 0], p5 ^= s8[m6 + 1], d6 ^= s8[m6 + 2], g7 ^= s8[m6 + 3], { s0: y8, s1: p5, s2: d6, s3: g7 } = or(n8, y8, p5, d6, g7), o8[m6++] = y8, o8[m6++] = p5, o8[m6++] = d6, o8[m6++] = g7;
    if (i8) {
      const e9 = (function(e10) {
        const t9 = new Uint8Array(16), r10 = Et3(t9);
        t9.set(e10);
        const i9 = Gt3 - e10.length;
        for (let e11 = Gt3 - i9; e11 < Gt3; e11++) t9[e11] = i9;
        return r10;
      })(r9.subarray(4 * m6));
      y8 ^= e9[0], p5 ^= e9[1], d6 ^= e9[2], g7 ^= e9[3], { s0: y8, s1: p5, s2: d6, s3: g7 } = or(n8, y8, p5, d6, g7), o8[m6++] = y8, o8[m6++] = p5, o8[m6++] = d6, o8[m6++] = g7;
    }
    return St2(...h7), c7;
  }, decrypt(r9, a8) {
    !(function(e9) {
      if (kt3(e9), e9.length % Gt3 != 0) throw Error("aes-(cbc/ecb).decrypt ciphertext should consist of blocks with size 16");
    })(r9);
    const n8 = ar(e8);
    let s8 = t8;
    const o8 = [n8];
    Lt3(s8) || o8.push(s8 = Ft3(s8));
    const c7 = Et3(s8);
    a8 = Bt3(r9.length, a8), Lt3(r9) || o8.push(r9 = Ft3(r9)), Ct3(r9, a8);
    const u8 = Et3(r9), h7 = Et3(a8);
    let l6 = c7[0], y8 = c7[1], p5 = c7[2], d6 = c7[3];
    for (let e9 = 0; e9 + 4 <= u8.length; ) {
      const t9 = l6, r10 = y8, i9 = p5, a9 = d6;
      l6 = u8[e9 + 0], y8 = u8[e9 + 1], p5 = u8[e9 + 2], d6 = u8[e9 + 3];
      const { s0: s9, s1: o9, s2: c8, s3: g7 } = cr(n8, l6, y8, p5, d6);
      h7[e9++] = s9 ^ t9, h7[e9++] = o9 ^ r10, h7[e9++] = c8 ^ i9, h7[e9++] = g7 ^ a9;
    }
    return St2(...o8), (function(e9, t9) {
      if (!t9) return e9;
      const r10 = e9.length;
      if (!r10) throw Error("aes/pcks5: empty ciphertext not allowed");
      const i9 = e9[r10 - 1];
      if (i9 <= 0 || i9 > 16) throw Error("aes/pcks5: wrong padding");
      const a9 = e9.subarray(0, -i9);
      for (let t10 = 0; t10 < i9; t10++) if (e9[r10 - t10 - 1] !== i9) throw Error("aes/pcks5: wrong padding");
      return a9;
    })(a8, i8);
  } };
}));
var pr = /* @__PURE__ */ Tt2({ blockSize: 16, nonceLength: 16 }, (function(e8, t8) {
  function r8(r9, i8, a8) {
    kt3(r9);
    const n8 = r9.length;
    if (xt3(r9, a8 = Bt3(n8, a8))) throw Error("overlapping src and dst not supported.");
    const s8 = ir(e8);
    let o8 = t8;
    const c7 = [s8];
    Lt3(o8) || c7.push(o8 = Ft3(o8)), Lt3(r9) || c7.push(r9 = Ft3(r9));
    const u8 = Et3(r9), h7 = Et3(a8), l6 = i8 ? h7 : u8, y8 = Et3(o8);
    let p5 = y8[0], d6 = y8[1], g7 = y8[2], m6 = y8[3];
    for (let e9 = 0; e9 + 4 <= u8.length; ) {
      const { s0: t9, s1: r10, s2: i9, s3: a9 } = or(s8, p5, d6, g7, m6);
      h7[e9 + 0] = u8[e9 + 0] ^ t9, h7[e9 + 1] = u8[e9 + 1] ^ r10, h7[e9 + 2] = u8[e9 + 2] ^ i9, h7[e9 + 3] = u8[e9 + 3] ^ a9, p5 = l6[e9++], d6 = l6[e9++], g7 = l6[e9++], m6 = l6[e9++];
    }
    const f8 = Gt3 * Math.floor(u8.length / 4);
    if (f8 < n8) {
      ({ s0: p5, s1: d6, s2: g7, s3: m6 } = or(s8, p5, d6, g7, m6));
      const e9 = At3(new Uint32Array([p5, d6, g7, m6]));
      for (let t9 = f8, i9 = 0; t9 < n8; t9++, i9++) a8[t9] = r9[t9] ^ e9[i9];
      St2(e9);
    }
    return St2(...c7), a8;
  }
  return { encrypt: (e9, t9) => r8(e9, true, t9), decrypt: (e9, t9) => r8(e9, false, t9) };
}));
function dr(e8, t8, r8, i8, a8) {
  const n8 = a8 ? a8.length : 0, s8 = e8.create(r8, i8.length + n8);
  a8 && s8.update(a8);
  const o8 = (function(e9, t9, r9) {
    const i9 = new Uint8Array(16), a9 = Pt2(i9);
    return Mt3(a9, 0, BigInt(t9), r9), Mt3(a9, 8, BigInt(e9), r9), i9;
  })(8 * i8.length, 8 * n8, t8);
  s8.update(i8), s8.update(o8);
  const c7 = s8.digest();
  return St2(o8), c7;
}
var gr = /* @__PURE__ */ Tt2({ blockSize: 16, nonceLength: 12, tagLength: 16, varSizeNonce: true }, (function(e8, t8, r8) {
  if (t8.length < 8) throw Error("aes/gcm: invalid nonce length");
  function i8(e9, t9, i9) {
    const a9 = dr(Ht3, false, e9, i9, r8);
    for (let e10 = 0; e10 < t9.length; e10++) a9[e10] ^= t9[e10];
    return a9;
  }
  function a8() {
    const r9 = ir(e8), i9 = Vt2.slice(), a9 = Vt2.slice();
    if (hr(r9, false, a9, a9, i9), 12 === t8.length) a9.set(t8);
    else {
      const e9 = Vt2.slice();
      Mt3(Pt2(e9), 8, BigInt(8 * t8.length), false);
      const r10 = Ht3.create(i9).update(t8).update(e9);
      r10.digestInto(a9), r10.destroy();
    }
    return { xk: r9, authKey: i9, counter: a9, tagMask: hr(r9, false, a9, Vt2) };
  }
  return { encrypt(e9) {
    const { xk: t9, authKey: r9, counter: n8, tagMask: s8 } = a8(), o8 = new Uint8Array(e9.length + 16), c7 = [t9, r9, n8, s8];
    Lt3(e9) || c7.push(e9 = Ft3(e9)), hr(t9, false, n8, e9, o8.subarray(0, e9.length));
    const u8 = i8(r9, s8, o8.subarray(0, o8.length - 16));
    return c7.push(u8), o8.set(u8, e9.length), St2(...c7), o8;
  }, decrypt(e9) {
    const { xk: t9, authKey: r9, counter: n8, tagMask: s8 } = a8(), o8 = [t9, r9, s8, n8];
    Lt3(e9) || o8.push(e9 = Ft3(e9));
    const c7 = e9.subarray(0, -16), u8 = e9.subarray(-16), h7 = i8(r9, s8, c7);
    if (o8.push(h7), !It3(h7, u8)) throw Error("aes/gcm: invalid ghash tag");
    const l6 = hr(t9, false, n8, c7);
    return St2(...o8), l6;
  } };
}));
function mr(e8) {
  return e8 instanceof Uint32Array || ArrayBuffer.isView(e8) && "Uint32Array" === e8.constructor.name;
}
function fr(e8, t8) {
  if (kt3(t8, 16), !mr(e8)) throw Error("_encryptBlock accepts result of expandKeyLE");
  const r8 = Et3(t8);
  let { s0: i8, s1: a8, s2: n8, s3: s8 } = or(e8, r8[0], r8[1], r8[2], r8[3]);
  return r8[0] = i8, r8[1] = a8, r8[2] = n8, r8[3] = s8, t8;
}
function wr(e8, t8) {
  if (kt3(t8, 16), !mr(e8)) throw Error("_decryptBlock accepts result of expandKeyLE");
  const r8 = Et3(t8);
  let { s0: i8, s1: a8, s2: n8, s3: s8 } = cr(e8, r8[0], r8[1], r8[2], r8[3]);
  return r8[0] = i8, r8[1] = a8, r8[2] = n8, r8[3] = s8, t8;
}
var br = { encrypt(e8, t8) {
  if (t8.length >= 2 ** 32) throw Error("plaintext should be less than 4gb");
  const r8 = ir(e8);
  if (16 === t8.length) fr(r8, t8);
  else {
    const e9 = Et3(t8);
    let i8 = e9[0], a8 = e9[1];
    for (let t9 = 0, n8 = 1; t9 < 6; t9++) for (let t10 = 2; t10 < e9.length; t10 += 2, n8++) {
      const { s0: s8, s1: o8, s2: c7, s3: u8 } = or(r8, i8, a8, e9[t10], e9[t10 + 1]);
      i8 = s8, a8 = o8 ^ Zt2(n8), e9[t10] = c7, e9[t10 + 1] = u8;
    }
    e9[0] = i8, e9[1] = a8;
  }
  r8.fill(0);
}, decrypt(e8, t8) {
  if (t8.length - 8 >= 2 ** 32) throw Error("ciphertext should be less than 4gb");
  const r8 = ar(e8), i8 = t8.length / 8 - 1;
  if (1 === i8) wr(r8, t8);
  else {
    const e9 = Et3(t8);
    let a8 = e9[0], n8 = e9[1];
    for (let t9 = 0, s8 = 6 * i8; t9 < 6; t9++) for (let t10 = 2 * i8; t10 >= 1; t10 -= 2, s8--) {
      n8 ^= Zt2(s8);
      const { s0: i9, s1: o8, s2: c7, s3: u8 } = cr(r8, a8, n8, e9[t10], e9[t10 + 1]);
      a8 = i9, n8 = o8, e9[t10] = c7, e9[t10 + 1] = u8;
    }
    e9[0] = a8, e9[1] = n8;
  }
  r8.fill(0);
} };
var kr = /* @__PURE__ */ new Uint8Array(8).fill(166);
var vr = /* @__PURE__ */ Tt2({ blockSize: 8 }, ((e8) => ({ encrypt(t8) {
  if (!t8.length || t8.length % 8 != 0) throw Error("invalid plaintext length");
  if (8 === t8.length) throw Error("8-byte keys not allowed in AESKW, use AESKWP instead");
  const r8 = (function(...e9) {
    let t9 = 0;
    for (let r10 = 0; r10 < e9.length; r10++) {
      const i8 = e9[r10];
      kt3(i8), t9 += i8.length;
    }
    const r9 = new Uint8Array(t9);
    for (let t10 = 0, i8 = 0; t10 < e9.length; t10++) {
      const a8 = e9[t10];
      r9.set(a8, i8), i8 += a8.length;
    }
    return r9;
  })(kr, t8);
  return br.encrypt(e8, r8), r8;
}, decrypt(t8) {
  if (t8.length % 8 != 0 || t8.length < 24) throw Error("invalid ciphertext length");
  const r8 = Ft3(t8);
  if (br.decrypt(e8, r8), !It3(r8.subarray(0, 8), kr)) throw Error("integrity check failed");
  return r8.subarray(0, 8).fill(0), r8.subarray(8);
} })));
var Kr = { expandKeyLE: ir, expandKeyDecLE: ar, encrypt: or, decrypt: cr, encryptBlock: fr, decryptBlock: wr, ctrCounter: ur, ctr32: hr };
async function Ar(e8) {
  switch (e8) {
    case M7.symmetric.aes128:
    case M7.symmetric.aes192:
    case M7.symmetric.aes256:
      throw Error("Not a legacy cipher");
    case M7.symmetric.cast5:
    case M7.symmetric.blowfish:
    case M7.symmetric.twofish:
    case M7.symmetric.tripledes: {
      const { legacyCiphers: t8 } = await Promise.resolve().then(() => (init_legacy_ciphers_min(), legacy_ciphers_min_exports)), r8 = M7.read(M7.symmetric, e8), i8 = t8.get(r8);
      if (!i8) throw Error("Unsupported cipher algorithm");
      return i8;
    }
    default:
      throw Error("Unsupported cipher algorithm");
  }
}
function Er(e8) {
  switch (e8) {
    case M7.symmetric.aes128:
    case M7.symmetric.aes192:
    case M7.symmetric.aes256:
    case M7.symmetric.twofish:
      return 16;
    case M7.symmetric.blowfish:
    case M7.symmetric.cast5:
    case M7.symmetric.tripledes:
      return 8;
    default:
      throw Error("Unsupported cipher");
  }
}
function Sr(e8) {
  switch (e8) {
    case M7.symmetric.aes128:
    case M7.symmetric.blowfish:
    case M7.symmetric.cast5:
      return 16;
    case M7.symmetric.aes192:
    case M7.symmetric.tripledes:
      return 24;
    case M7.symmetric.aes256:
    case M7.symmetric.twofish:
      return 32;
    default:
      throw Error("Unsupported cipher");
  }
}
function Pr(e8) {
  return { keySize: Sr(e8), blockSize: Er(e8) };
}
var Ur = _5.getWebCrypto();
async function Dr(e8, t8, r8) {
  const { keySize: i8 } = Pr(e8);
  if (!_5.isAES(e8) || t8.length !== i8) throw Error("Unexpected algorithm or key size");
  try {
    const e9 = await Ur.importKey("raw", t8, { name: "AES-KW" }, false, ["wrapKey"]), i9 = await Ur.importKey("raw", r8, { name: "HMAC", hash: "SHA-256" }, true, ["sign"]), a8 = await Ur.wrapKey("raw", i9, e9, { name: "AES-KW" });
    return new Uint8Array(a8);
  } catch (e9) {
    if ("NotSupportedError" !== e9.name && (24 !== t8.length || "OperationError" !== e9.name)) throw e9;
    _5.printDebugError("Browser did not support operation: " + e9.message);
  }
  return vr(t8).encrypt(r8);
}
async function xr(e8, t8, r8) {
  const { keySize: i8 } = Pr(e8);
  if (!_5.isAES(e8) || t8.length !== i8) throw Error("Unexpected algorithm or key size");
  let a8;
  try {
    a8 = await Ur.importKey("raw", t8, { name: "AES-KW" }, false, ["unwrapKey"]);
  } catch (e9) {
    if ("NotSupportedError" !== e9.name && (24 !== t8.length || "OperationError" !== e9.name)) throw e9;
    return _5.printDebugError("Browser did not support operation: " + e9.message), vr(t8).decrypt(r8);
  }
  try {
    const e9 = await Ur.unwrapKey("raw", r8, a8, { name: "AES-KW" }, { name: "HMAC", hash: "SHA-256" }, true, ["sign"]);
    return new Uint8Array(await Ur.exportKey("raw", e9));
  } catch (e9) {
    if ("OperationError" === e9.name) throw Error("Key Data Integrity failed");
    throw e9;
  }
}
async function Cr(e8, t8, r8, i8, a8) {
  const n8 = _5.getWebCrypto(), s8 = M7.read(M7.webHash, e8);
  if (!s8) throw Error("Hash algo not supported with HKDF");
  const o8 = await n8.importKey("raw", t8, "HKDF", false, ["deriveBits"]), c7 = await n8.deriveBits({ name: "HKDF", hash: s8, salt: r8, info: i8 }, o8, 8 * a8);
  return new Uint8Array(c7);
}
var Ir = { x25519: _5.encodeUTF8("OpenPGP X25519"), x448: _5.encodeUTF8("OpenPGP X448") };
async function Tr(e8) {
  switch (e8) {
    case M7.publicKey.x25519:
      try {
        const e9 = _5.getWebCrypto(), t8 = await e9.generateKey("X25519", true, ["deriveKey", "deriveBits"]).catch(((e10) => {
          if ("OperationError" === e10.name) {
            const e11 = Error("Unexpected key generation issue");
            throw e11.name = "NotSupportedError", e11;
          }
          throw e10;
        })), r8 = await e9.exportKey("jwk", t8.privateKey), i8 = await e9.exportKey("jwk", t8.publicKey);
        if (r8.x !== i8.x) {
          const e10 = Error("Unexpected mismatching public point");
          throw e10.name = "NotSupportedError", e10;
        }
        return { A: new Uint8Array(q6(i8.x)), k: q6(r8.d) };
      } catch (e9) {
        if ("NotSupportedError" !== e9.name) throw e9;
        const { default: t8 } = await Promise.resolve().then(() => (init_nacl_fast_min(), nacl_fast_min_exports)), { secretKey: r8, publicKey: i8 } = t8.box.keyPair();
        return { A: i8, k: r8 };
      }
    case M7.publicKey.x448: {
      const e9 = await _5.getNobleCurve(M7.publicKey.x448), { secretKey: t8, publicKey: r8 } = e9.keygen();
      return { A: r8, k: t8 };
    }
    default:
      throw Error("Unsupported ECDH algorithm");
  }
}
async function Br(e8, t8, r8) {
  switch (e8) {
    case M7.publicKey.x25519:
      try {
        const { ephemeralPublicKey: i8, sharedSecret: a8 } = await _r(e8, t8), n8 = await Nr(e8, i8, t8, r8);
        return _5.equalsUint8Array(a8, n8);
      } catch {
        return false;
      }
    case M7.publicKey.x448: {
      const e9 = (await _5.getNobleCurve(M7.publicKey.x448)).getPublicKey(r8);
      return _5.equalsUint8Array(t8, e9);
    }
    default:
      return false;
  }
}
async function Mr(e8, t8, r8) {
  const { ephemeralPublicKey: i8, sharedSecret: a8 } = await _r(e8, r8), n8 = _5.concatUint8Array([i8, r8, a8]);
  switch (e8) {
    case M7.publicKey.x25519: {
      const e9 = M7.symmetric.aes128, { keySize: r9 } = Pr(e9), a9 = await Cr(M7.hash.sha256, n8, new Uint8Array(), Ir.x25519, r9);
      return { ephemeralPublicKey: i8, wrappedKey: await Dr(e9, a9, t8) };
    }
    case M7.publicKey.x448: {
      const e9 = M7.symmetric.aes256, { keySize: r9 } = Pr(M7.symmetric.aes256), a9 = await Cr(M7.hash.sha512, n8, new Uint8Array(), Ir.x448, r9);
      return { ephemeralPublicKey: i8, wrappedKey: await Dr(e9, a9, t8) };
    }
    default:
      throw Error("Unsupported ECDH algorithm");
  }
}
async function Lr(e8, t8, r8, i8, a8) {
  const n8 = await Nr(e8, t8, i8, a8), s8 = _5.concatUint8Array([t8, i8, n8]);
  switch (e8) {
    case M7.publicKey.x25519: {
      const e9 = M7.symmetric.aes128, { keySize: t9 } = Pr(e9);
      return xr(e9, await Cr(M7.hash.sha256, s8, new Uint8Array(), Ir.x25519, t9), r8);
    }
    case M7.publicKey.x448: {
      const e9 = M7.symmetric.aes256, { keySize: t9 } = Pr(M7.symmetric.aes256);
      return xr(e9, await Cr(M7.hash.sha512, s8, new Uint8Array(), Ir.x448, t9), r8);
    }
    default:
      throw Error("Unsupported ECDH algorithm");
  }
}
function Fr(e8) {
  switch (e8) {
    case M7.publicKey.x25519:
      return 32;
    case M7.publicKey.x448:
      return 56;
    default:
      throw Error("Unsupported ECDH algorithm");
  }
}
async function _r(e8, t8) {
  switch (e8) {
    case M7.publicKey.x25519:
      try {
        const r8 = _5.getWebCrypto(), i8 = await r8.generateKey("X25519", true, ["deriveKey", "deriveBits"]).catch(((e9) => {
          if ("OperationError" === e9.name) {
            const e10 = Error("Unexpected key generation issue");
            throw e10.name = "NotSupportedError", e10;
          }
          throw e9;
        })), a8 = await r8.exportKey("jwk", i8.publicKey);
        if ((await r8.exportKey("jwk", i8.privateKey)).x !== a8.x) {
          const e9 = Error("Unexpected mismatching public point");
          throw e9.name = "NotSupportedError", e9;
        }
        const n8 = zr(e8, t8), s8 = await r8.importKey("jwk", n8, "X25519", false, []), o8 = await r8.deriveBits({ name: "X25519", public: s8 }, i8.privateKey, 8 * Fr(e8));
        return { sharedSecret: new Uint8Array(o8), ephemeralPublicKey: new Uint8Array(q6(a8.x)) };
      } catch (e9) {
        if ("NotSupportedError" !== e9.name) throw e9;
        const { default: r8 } = await Promise.resolve().then(() => (init_nacl_fast_min(), nacl_fast_min_exports)), { secretKey: i8, publicKey: a8 } = r8.box.keyPair(), n8 = r8.scalarMult(i8, t8);
        return Rr(n8), { ephemeralPublicKey: a8, sharedSecret: n8 };
      }
    case M7.publicKey.x448: {
      const e9 = await _5.getNobleCurve(M7.publicKey.x448), { secretKey: r8, publicKey: i8 } = e9.keygen(), a8 = e9.getSharedSecret(r8, t8);
      return Rr(a8), { ephemeralPublicKey: i8, sharedSecret: a8 };
    }
    default:
      throw Error("Unsupported ECDH algorithm");
  }
}
async function Nr(e8, t8, r8, i8) {
  switch (e8) {
    case M7.publicKey.x25519:
      try {
        const a8 = _5.getWebCrypto(), n8 = (function(e9, t9, r9) {
          if (e9 === M7.publicKey.x25519) {
            const i9 = zr(e9, t9);
            return i9.d = H6(r9), i9;
          }
          throw Error("Unsupported ECDH algorithm");
        })(e8, r8, i8), s8 = zr(e8, t8), o8 = await a8.importKey("jwk", n8, "X25519", false, ["deriveKey", "deriveBits"]), c7 = await a8.importKey("jwk", s8, "X25519", false, []), u8 = await a8.deriveBits({ name: "X25519", public: c7 }, o8, 8 * Fr(e8));
        return new Uint8Array(u8);
      } catch (e9) {
        if ("NotSupportedError" !== e9.name) throw e9;
        const { default: r9 } = await Promise.resolve().then(() => (init_nacl_fast_min(), nacl_fast_min_exports)), a8 = r9.scalarMult(i8, t8);
        return Rr(a8), a8;
      }
    case M7.publicKey.x448: {
      const e9 = (await _5.getNobleCurve(M7.publicKey.x448)).getSharedSecret(i8, t8);
      return Rr(e9), e9;
    }
    default:
      throw Error("Unsupported ECDH algorithm");
  }
}
function Rr(e8) {
  let t8 = 0;
  for (let r8 = 0; r8 < e8.length; r8++) t8 |= e8[r8];
  if (0 === t8) throw Error("Unexpected low order point");
}
function zr(e8, t8) {
  if (e8 === M7.publicKey.x25519) {
    return { kty: "OKP", crv: "X25519", x: H6(t8), ext: true };
  }
  throw Error("Unsupported ECDH algorithm");
}
var Or = /* @__PURE__ */ Object.freeze({ __proto__: null, decrypt: Lr, encrypt: Mr, generate: Tr, generateEphemeralEncryptionMaterial: _r, getPayloadSize: Fr, recomputeSharedSecret: Nr, validateParams: Br });
var jr = _5.getWebCrypto();
var qr = _5.getNodeCrypto();
var Hr = { [M7.curve.nistP256]: "P-256", [M7.curve.nistP384]: "P-384", [M7.curve.nistP521]: "P-521" };
var Gr = qr ? qr.getCurves() : [];
var Vr = qr ? { [M7.curve.secp256k1]: Gr.includes("secp256k1") ? "secp256k1" : void 0, [M7.curve.nistP256]: Gr.includes("prime256v1") ? "prime256v1" : void 0, [M7.curve.nistP384]: Gr.includes("secp384r1") ? "secp384r1" : void 0, [M7.curve.nistP521]: Gr.includes("secp521r1") ? "secp521r1" : void 0, [M7.curve.ed25519Legacy]: Gr.includes("ED25519") ? "ED25519" : void 0, [M7.curve.curve25519Legacy]: Gr.includes("X25519") ? "X25519" : void 0, [M7.curve.brainpoolP256r1]: Gr.includes("brainpoolP256r1") ? "brainpoolP256r1" : void 0, [M7.curve.brainpoolP384r1]: Gr.includes("brainpoolP384r1") ? "brainpoolP384r1" : void 0, [M7.curve.brainpoolP512r1]: Gr.includes("brainpoolP512r1") ? "brainpoolP512r1" : void 0 } : {};
var Wr = { [M7.curve.nistP256]: { oid: [6, 8, 42, 134, 72, 206, 61, 3, 1, 7], keyType: M7.publicKey.ecdsa, hash: M7.hash.sha256, cipher: M7.symmetric.aes128, node: Vr[M7.curve.nistP256], web: Hr[M7.curve.nistP256], payloadSize: 32, sharedSize: 256, wireFormatLeadingByte: 4 }, [M7.curve.nistP384]: { oid: [6, 5, 43, 129, 4, 0, 34], keyType: M7.publicKey.ecdsa, hash: M7.hash.sha384, cipher: M7.symmetric.aes192, node: Vr[M7.curve.nistP384], web: Hr[M7.curve.nistP384], payloadSize: 48, sharedSize: 384, wireFormatLeadingByte: 4 }, [M7.curve.nistP521]: { oid: [6, 5, 43, 129, 4, 0, 35], keyType: M7.publicKey.ecdsa, hash: M7.hash.sha512, cipher: M7.symmetric.aes256, node: Vr[M7.curve.nistP521], web: Hr[M7.curve.nistP521], payloadSize: 66, sharedSize: 528, wireFormatLeadingByte: 4 }, [M7.curve.secp256k1]: { oid: [6, 5, 43, 129, 4, 0, 10], keyType: M7.publicKey.ecdsa, hash: M7.hash.sha256, cipher: M7.symmetric.aes128, node: Vr[M7.curve.secp256k1], payloadSize: 32, wireFormatLeadingByte: 4 }, [M7.curve.ed25519Legacy]: { oid: [6, 9, 43, 6, 1, 4, 1, 218, 71, 15, 1], keyType: M7.publicKey.eddsaLegacy, hash: M7.hash.sha512, node: false, payloadSize: 32, wireFormatLeadingByte: 64 }, [M7.curve.curve25519Legacy]: { oid: [6, 10, 43, 6, 1, 4, 1, 151, 85, 1, 5, 1], keyType: M7.publicKey.ecdh, hash: M7.hash.sha256, cipher: M7.symmetric.aes128, node: false, payloadSize: 32, wireFormatLeadingByte: 64 }, [M7.curve.brainpoolP256r1]: { oid: [6, 9, 43, 36, 3, 3, 2, 8, 1, 1, 7], keyType: M7.publicKey.ecdsa, hash: M7.hash.sha256, cipher: M7.symmetric.aes128, node: Vr[M7.curve.brainpoolP256r1], payloadSize: 32, wireFormatLeadingByte: 4 }, [M7.curve.brainpoolP384r1]: { oid: [6, 9, 43, 36, 3, 3, 2, 8, 1, 1, 11], keyType: M7.publicKey.ecdsa, hash: M7.hash.sha384, cipher: M7.symmetric.aes192, node: Vr[M7.curve.brainpoolP384r1], payloadSize: 48, wireFormatLeadingByte: 4 }, [M7.curve.brainpoolP512r1]: { oid: [6, 9, 43, 36, 3, 3, 2, 8, 1, 1, 13], keyType: M7.publicKey.ecdsa, hash: M7.hash.sha512, cipher: M7.symmetric.aes256, node: Vr[M7.curve.brainpoolP512r1], payloadSize: 64, wireFormatLeadingByte: 4 } };
var $r = class {
  constructor(e8) {
    try {
      this.name = e8 instanceof Ze2 ? e8.getName() : M7.write(M7.curve, e8);
    } catch {
      throw new st3("Unknown curve");
    }
    const t8 = Wr[this.name];
    this.keyType = t8.keyType, this.oid = t8.oid, this.hash = t8.hash, this.cipher = t8.cipher, this.node = t8.node, this.web = t8.web, this.payloadSize = t8.payloadSize, this.sharedSize = t8.sharedSize, this.wireFormatLeadingByte = t8.wireFormatLeadingByte, this.web && _5.getWebCrypto() ? this.type = "web" : this.node && _5.getNodeCrypto() ? this.type = "node" : this.name === M7.curve.curve25519Legacy ? this.type = "curve25519Legacy" : this.name === M7.curve.ed25519Legacy && (this.type = "ed25519Legacy");
  }
  async genKeyPair() {
    switch (this.type) {
      case "web":
        try {
          return await (async function(e8, t8) {
            const r8 = await jr.generateKey({ name: "ECDSA", namedCurve: Hr[e8] }, true, ["sign", "verify"]), i8 = await jr.exportKey("jwk", r8.privateKey);
            return { publicKey: ei(await jr.exportKey("jwk", r8.publicKey), t8), privateKey: q6(i8.d) };
          })(this.name, this.wireFormatLeadingByte);
        } catch (e8) {
          return _5.printDebugError("Browser did not support generating ec key " + e8.message), Jr(this.name);
        }
      case "node":
        return (function(e8) {
          const t8 = qr.createECDH(Vr[e8]);
          return t8.generateKeys(), { publicKey: new Uint8Array(t8.getPublicKey()), privateKey: new Uint8Array(t8.getPrivateKey()) };
        })(this.name);
      case "curve25519Legacy": {
        const { k: e8, A: t8 } = await Tr(M7.publicKey.x25519), r8 = e8.slice().reverse();
        r8[0] = 127 & r8[0] | 64, r8[31] &= 248;
        return { publicKey: _5.concatUint8Array([new Uint8Array([this.wireFormatLeadingByte]), t8]), privateKey: r8 };
      }
      case "ed25519Legacy": {
        const { seed: e8, A: t8 } = await ht3(M7.publicKey.ed25519);
        return { publicKey: _5.concatUint8Array([new Uint8Array([this.wireFormatLeadingByte]), t8]), privateKey: e8 };
      }
      default:
        return Jr(this.name);
    }
  }
};
async function Qr(e8) {
  const t8 = new $r(e8), { oid: r8, hash: i8, cipher: a8 } = t8, n8 = await t8.genKeyPair();
  return { oid: r8, Q: n8.publicKey, secret: _5.leftPad(n8.privateKey, t8.payloadSize), hash: i8, cipher: a8 };
}
function Xr(e8) {
  return Wr[e8.getName()].hash;
}
async function Yr(e8, t8, r8, i8) {
  const a8 = { [M7.curve.nistP256]: true, [M7.curve.nistP384]: true, [M7.curve.nistP521]: true, [M7.curve.secp256k1]: true, [M7.curve.curve25519Legacy]: e8 === M7.publicKey.ecdh, [M7.curve.brainpoolP256r1]: true, [M7.curve.brainpoolP384r1]: true, [M7.curve.brainpoolP512r1]: true }, n8 = t8.getName();
  if (!a8[n8]) return false;
  if (n8 === M7.curve.curve25519Legacy) {
    const e9 = i8.slice().reverse();
    return !(r8.length < 1 || 64 !== r8[0]) && Br(M7.publicKey.x25519, r8.subarray(1), e9);
  }
  const s8 = (await _5.getNobleCurve(M7.publicKey.ecdsa, n8)).getPublicKey(i8, false);
  return !!_5.equalsUint8Array(s8, r8);
}
function Zr(e8, t8) {
  const { payloadSize: r8, wireFormatLeadingByte: i8, name: a8 } = e8, n8 = a8 === M7.curve.curve25519Legacy || a8 === M7.curve.ed25519Legacy ? r8 : 2 * r8;
  if (t8[0] !== i8 || t8.length !== n8 + 1) throw Error("Invalid point encoding");
}
async function Jr(e8) {
  const t8 = await _5.getNobleCurve(M7.publicKey.ecdsa, e8), { secretKey: r8 } = t8.keygen();
  return { publicKey: t8.getPublicKey(r8, false), privateKey: r8 };
}
function ei(e8, t8) {
  const r8 = q6(e8.x), i8 = q6(e8.y), a8 = new Uint8Array(r8.length + i8.length + 1);
  return a8[0] = t8, a8.set(r8, 1), a8.set(i8, r8.length + 1), a8;
}
function ti(e8, t8, r8) {
  const i8 = e8, a8 = r8.slice(1, i8 + 1), n8 = r8.slice(i8 + 1, 2 * i8 + 1);
  return { kty: "EC", crv: t8, x: H6(a8), y: H6(n8), ext: true };
}
function ri(e8, t8, r8, i8) {
  const a8 = ti(e8, t8, r8);
  return a8.d = H6(i8), a8;
}
var ii = _5.getWebCrypto();
var ai = _5.getNodeCrypto();
async function ni(e8, t8, r8, i8, a8, n8) {
  const s8 = new $r(e8);
  if (Zr(s8, i8), r8 && !_5.isStream(r8)) {
    const e9 = { publicKey: i8, privateKey: a8 };
    switch (s8.type) {
      case "web":
        try {
          return await (async function(e10, t9, r9, i9) {
            const a9 = e10.payloadSize, n9 = ri(e10.payloadSize, Hr[e10.name], i9.publicKey, i9.privateKey), s9 = await ii.importKey("jwk", n9, { name: "ECDSA", namedCurve: Hr[e10.name], hash: { name: M7.read(M7.webHash, e10.hash) } }, false, ["sign"]), o9 = new Uint8Array(await ii.sign({ name: "ECDSA", namedCurve: Hr[e10.name], hash: { name: M7.read(M7.webHash, t9) } }, s9, r9));
            return { r: o9.slice(0, a9), s: o9.slice(a9, a9 << 1) };
          })(s8, t8, r8, e9);
        } catch (e10) {
          if ("nistP521" !== s8.name && ("DataError" === e10.name || "OperationError" === e10.name)) throw e10;
          _5.printDebugError("Browser did not support signing: " + e10.message);
        }
        break;
      case "node":
        return (function(e10, t9, r9, i9) {
          const a9 = _5.nodeRequire("eckey-utils"), n9 = _5.getNodeBuffer(), { privateKey: s9 } = a9.generateDer({ curveName: Vr[e10.name], privateKey: n9.from(i9) }), o9 = ai.createSign(M7.read(M7.hash, t9));
          o9.write(r9), o9.end();
          const c7 = new Uint8Array(o9.sign({ key: s9, format: "der", type: "sec1", dsaEncoding: "ieee-p1363" })), u8 = e10.payloadSize;
          return { r: c7.subarray(0, u8), s: c7.subarray(u8, u8 << 1) };
        })(s8, t8, r8, a8);
    }
  }
  const o8 = (await _5.getNobleCurve(M7.publicKey.ecdsa, s8.name)).sign(n8, a8, { lowS: false });
  return { r: ye3(o8.r, "be", s8.payloadSize), s: ye3(o8.s, "be", s8.payloadSize) };
}
async function si(e8, t8, r8, i8, a8, n8) {
  const s8 = new $r(e8);
  Zr(s8, a8);
  const o8 = async () => 0 === n8[0] && oi(s8, r8, n8.subarray(1), a8);
  if (i8 && !_5.isStream(i8)) switch (s8.type) {
    case "web":
      try {
        const e9 = await (async function(e10, t9, { r: r9, s: i9 }, a9, n9) {
          const s9 = ti(e10.payloadSize, Hr[e10.name], n9), o9 = await ii.importKey("jwk", s9, { name: "ECDSA", namedCurve: Hr[e10.name], hash: { name: M7.read(M7.webHash, e10.hash) } }, false, ["verify"]), c7 = _5.concatUint8Array([r9, i9]).buffer;
          return ii.verify({ name: "ECDSA", namedCurve: Hr[e10.name], hash: { name: M7.read(M7.webHash, t9) } }, o9, c7, a9);
        })(s8, t8, r8, i8, a8);
        return e9 || o8();
      } catch (e9) {
        if ("nistP521" !== s8.name && ("DataError" === e9.name || "OperationError" === e9.name)) throw e9;
        _5.printDebugError("Browser did not support verifying: " + e9.message);
      }
      break;
    case "node": {
      const e9 = (function(e10, t9, { r: r9, s: i9 }, a9, n9) {
        const s9 = _5.nodeRequire("eckey-utils"), o9 = _5.getNodeBuffer(), { publicKey: c7 } = s9.generateDer({ curveName: Vr[e10.name], publicKey: o9.from(n9) }), u8 = ai.createVerify(M7.read(M7.hash, t9));
        u8.write(a9), u8.end();
        const h7 = _5.concatUint8Array([r9, i9]);
        try {
          return u8.verify({ key: c7, format: "der", type: "spki", dsaEncoding: "ieee-p1363" }, h7);
        } catch {
          return false;
        }
      })(s8, t8, r8, i8, a8);
      return e9 || o8();
    }
  }
  return await oi(s8, r8, n8, a8) || o8();
}
async function oi(e8, t8, r8, i8) {
  return (await _5.getNobleCurve(M7.publicKey.ecdsa, e8.name)).verify(_5.concatUint8Array([t8.r, t8.s]), r8, i8, { lowS: false });
}
var ci = /* @__PURE__ */ Object.freeze({ __proto__: null, sign: ni, validateParams: async function(e8, t8, r8) {
  const i8 = new $r(e8);
  if (i8.keyType !== M7.publicKey.ecdsa) return false;
  switch (i8.type) {
    case "web":
    case "node": {
      const i9 = de3(8), a8 = M7.hash.sha256, n8 = await Me(a8, i9);
      try {
        const s8 = await ni(e8, a8, i9, t8, r8, n8);
        return await si(e8, a8, s8, i9, t8, n8);
      } catch {
        return false;
      }
    }
    default:
      return Yr(M7.publicKey.ecdsa, e8, t8, r8);
  }
}, verify: si });
async function ui(e8, t8, r8, i8, a8, n8) {
  Zr(new $r(e8), i8);
  const { RS: s8 } = await lt3(M7.publicKey.ed25519, 0, 0, i8.subarray(1), a8, n8);
  return { r: s8.subarray(0, 32), s: s8.subarray(32) };
}
async function hi(e8, t8, { r: r8, s: i8 }, a8, n8, s8) {
  Zr(new $r(e8), n8);
  const o8 = _5.concatUint8Array([r8, i8]);
  return yt3(M7.publicKey.ed25519, 0, { RS: o8 }, 0, n8.subarray(1), s8);
}
async function li(e8, t8, r8) {
  return e8.getName() === M7.curve.ed25519Legacy && (!(t8.length < 1 || 64 !== t8[0]) && pt3(M7.publicKey.ed25519, t8.subarray(1), r8));
}
var yi = /* @__PURE__ */ Object.freeze({ __proto__: null, sign: ui, validateParams: li, verify: hi });
function pi(e8) {
  const t8 = e8.length;
  if (t8 > 0) {
    const r8 = e8[t8 - 1];
    if (r8 >= 1) {
      const i8 = e8.subarray(t8 - r8), a8 = new Uint8Array(r8).fill(r8);
      if (_5.equalsUint8Array(i8, a8)) return e8.subarray(0, t8 - r8);
    }
  }
  throw Error("Invalid padding");
}
function di(e8, t8, r8, i8) {
  return _5.concatUint8Array([t8.write(), new Uint8Array([e8]), r8.write(true), _5.stringToUint8Array("Anonymous Sender    "), r8.replacementFingerprint || i8]);
}
async function gi(e8, t8, r8, i8, a8 = false, n8 = false) {
  let s8;
  if (a8) {
    for (s8 = 0; s8 < t8.length && 0 === t8[s8]; s8++) ;
    t8 = t8.subarray(s8);
  }
  if (n8) {
    for (s8 = t8.length - 1; s8 >= 0 && 0 === t8[s8]; s8--) ;
    t8 = t8.subarray(0, s8 + 1);
  }
  return (await Me(e8, _5.concatUint8Array([new Uint8Array([0, 0, 0, 1]), t8, i8]))).subarray(0, r8);
}
async function mi(e8, t8) {
  switch (e8.type) {
    case "curve25519Legacy": {
      const { sharedSecret: r8, ephemeralPublicKey: i8 } = await _r(M7.publicKey.x25519, t8.subarray(1));
      return { publicKey: _5.concatUint8Array([new Uint8Array([e8.wireFormatLeadingByte]), i8]), sharedKey: r8 };
    }
    case "web":
      if (e8.web && _5.getWebCrypto()) try {
        return await (async function(e9, t9) {
          const r8 = _5.getWebCrypto(), i8 = ti(e9.payloadSize, e9.web, t9);
          let a8 = r8.generateKey({ name: "ECDH", namedCurve: e9.web }, true, ["deriveKey", "deriveBits"]), n8 = r8.importKey("jwk", i8, { name: "ECDH", namedCurve: e9.web }, false, []);
          [a8, n8] = await Promise.all([a8, n8]);
          let s8 = r8.deriveBits({ name: "ECDH", namedCurve: e9.web, public: n8 }, a8.privateKey, e9.sharedSize), o8 = r8.exportKey("jwk", a8.publicKey);
          [s8, o8] = await Promise.all([s8, o8]);
          const c7 = new Uint8Array(s8), u8 = new Uint8Array(ei(o8, e9.wireFormatLeadingByte));
          return { publicKey: u8, sharedKey: c7 };
        })(e8, t8);
      } catch (r8) {
        return _5.printDebugError(r8), vi(e8, t8);
      }
      break;
    case "node":
      return (function(e9, t9) {
        const r8 = _5.getNodeCrypto(), i8 = r8.createECDH(e9.node);
        i8.generateKeys();
        const a8 = new Uint8Array(i8.computeSecret(t9));
        return { publicKey: new Uint8Array(i8.getPublicKey()), sharedKey: a8 };
      })(e8, t8);
    default:
      return vi(e8, t8);
  }
}
async function fi(e8, t8, r8, i8, a8) {
  const n8 = (function(e9) {
    const t9 = 8 - e9.length % 8, r9 = new Uint8Array(e9.length + t9).fill(t9);
    return r9.set(e9), r9;
  })(r8), s8 = new $r(e8);
  Zr(s8, i8);
  const { publicKey: o8, sharedKey: c7 } = await mi(s8, i8), u8 = di(M7.publicKey.ecdh, e8, t8, a8), { keySize: h7 } = Pr(t8.cipher), l6 = await gi(t8.hash, c7, h7, u8);
  return { publicKey: o8, wrappedKey: await Dr(t8.cipher, l6, n8) };
}
async function wi(e8, t8, r8, i8) {
  if (i8.length !== e8.payloadSize) {
    const t9 = new Uint8Array(e8.payloadSize);
    t9.set(i8, e8.payloadSize - i8.length), i8 = t9;
  }
  switch (e8.type) {
    case "curve25519Legacy": {
      const e9 = i8.slice().reverse();
      return { secretKey: e9, sharedKey: await Nr(M7.publicKey.x25519, t8.subarray(1), r8.subarray(1), e9) };
    }
    case "web":
      if (e8.web && _5.getWebCrypto()) try {
        return await (async function(e9, t9, r9, i9) {
          const a8 = _5.getWebCrypto(), n8 = ri(e9.payloadSize, e9.web, r9, i9);
          let s8 = a8.importKey("jwk", n8, { name: "ECDH", namedCurve: e9.web }, true, ["deriveKey", "deriveBits"]);
          const o8 = ti(e9.payloadSize, e9.web, t9);
          let c7 = a8.importKey("jwk", o8, { name: "ECDH", namedCurve: e9.web }, true, []);
          [s8, c7] = await Promise.all([s8, c7]);
          let u8 = a8.deriveBits({ name: "ECDH", namedCurve: e9.web, public: c7 }, s8, e9.sharedSize), h7 = a8.exportKey("jwk", s8);
          [u8, h7] = await Promise.all([u8, h7]);
          const l6 = new Uint8Array(u8);
          return { secretKey: q6(h7.d), sharedKey: l6 };
        })(e8, t8, r8, i8);
      } catch (r9) {
        return _5.printDebugError(r9), ki(e8, t8, i8);
      }
      break;
    case "node":
      return (function(e9, t9, r9) {
        const i9 = _5.getNodeCrypto(), a8 = i9.createECDH(e9.node);
        a8.setPrivateKey(r9);
        const n8 = new Uint8Array(a8.computeSecret(t9));
        return { secretKey: new Uint8Array(a8.getPrivateKey()), sharedKey: n8 };
      })(e8, t8, i8);
    default:
      return ki(e8, t8, i8);
  }
}
async function bi(e8, t8, r8, i8, a8, n8, s8) {
  const o8 = new $r(e8);
  Zr(o8, a8), Zr(o8, r8);
  const { sharedKey: c7 } = await wi(o8, r8, a8, n8), u8 = di(M7.publicKey.ecdh, e8, t8, s8), { keySize: h7 } = Pr(t8.cipher);
  let l6;
  for (let e9 = 0; e9 < 3; e9++) try {
    const r9 = await gi(t8.hash, c7, h7, u8, 1 === e9, 2 === e9);
    return pi(await xr(t8.cipher, r9, i8));
  } catch (e10) {
    l6 = e10;
  }
  throw l6;
}
async function ki(e8, t8, r8) {
  return { secretKey: r8, sharedKey: (await _5.getNobleCurve(M7.publicKey.ecdh, e8.name)).getSharedSecret(r8, t8).subarray(1) };
}
async function vi(e8, t8) {
  const r8 = await _5.getNobleCurve(M7.publicKey.ecdh, e8.name), { publicKey: i8, privateKey: a8 } = await e8.genKeyPair();
  return { publicKey: i8, sharedKey: r8.getSharedSecret(a8, t8).subarray(1) };
}
var Ki = /* @__PURE__ */ Object.freeze({ __proto__: null, CurveWithOID: $r, ecdh: /* @__PURE__ */ Object.freeze({ __proto__: null, decrypt: bi, encrypt: fi, validateParams: async function(e8, t8, r8) {
  return Yr(M7.publicKey.ecdh, e8, t8, r8);
} }), ecdhX: Or, ecdsa: ci, eddsa: wt3, eddsaLegacy: yi, generate: Qr, getPreferredHashAlgo: Xr });
var Ai = BigInt(0);
var Ei = BigInt(1);
var Si = /* @__PURE__ */ new Set([M7.hash.sha1, M7.hash.sha256, M7.hash.sha512]);
var Pi = _5.getWebCrypto();
var Ui = _5.getNodeCrypto();
async function Di(e8, t8) {
  if (e8 === M7.publicKey.pqc_mlkem_x25519) {
    const { ml_kem768: e9 } = await Promise.resolve().then(() => (init_noble_post_quantum_min(), noble_post_quantum_min_exports)), { publicKey: r8, secretKey: i8 } = e9.keygen(t8);
    return { mlkemPublicKey: r8, mlkemSecretKey: i8 };
  }
  throw Error("Unsupported KEM algorithm");
}
async function xi(e8) {
  const { eccPublicKey: t8, eccSecretKey: r8 } = await (async function(e9) {
    if (e9 === M7.publicKey.pqc_mlkem_x25519) {
      const { A: e10, k: t9 } = await Tr(M7.publicKey.x25519);
      return { eccPublicKey: e10, eccSecretKey: t9 };
    }
    throw Error("Unsupported KEM algorithm");
  })(e8), { mlkemPublicKey: i8, mlkemSeed: a8, mlkemSecretKey: n8 } = await (async function(e9) {
    if (e9 === M7.publicKey.pqc_mlkem_x25519) {
      const t9 = de3(64), { mlkemSecretKey: r9, mlkemPublicKey: i9 } = await Di(e9, t9);
      return { mlkemSeed: t9, mlkemSecretKey: r9, mlkemPublicKey: i9 };
    }
    throw Error("Unsupported KEM algorithm");
  })(e8);
  return { eccPublicKey: t8, eccSecretKey: r8, mlkemPublicKey: i8, mlkemSeed: a8, mlkemSecretKey: n8 };
}
async function Ci(e8, t8, r8, i8) {
  const { eccKeyShare: a8, eccCipherText: n8 } = await (async function(e9, t9) {
    if (e9 === M7.publicKey.pqc_mlkem_x25519) {
      const { ephemeralPublicKey: e10, sharedSecret: r9 } = await _r(M7.publicKey.x25519, t9);
      return { eccCipherText: e10, eccKeyShare: r9 };
    }
    throw Error("Unsupported KEM algorithm");
  })(e8, t8), { mlkemKeyShare: s8, mlkemCipherText: o8 } = await (async function(e9, t9) {
    if (e9 === M7.publicKey.pqc_mlkem_x25519) {
      const { ml_kem768: e10 } = await Promise.resolve().then(() => (init_noble_post_quantum_min(), noble_post_quantum_min_exports)), { cipherText: r9, sharedSecret: i9 } = e10.encapsulate(t9);
      return { mlkemCipherText: r9, mlkemKeyShare: i9 };
    }
    throw Error("Unsupported KEM algorithm");
  })(e8, r8), c7 = await Ti(e8, s8, a8, n8, t8);
  return { eccCipherText: n8, mlkemCipherText: o8, wrappedKey: await Dr(M7.symmetric.aes256, c7, i8) };
}
async function Ii(e8, t8, r8, i8, a8, n8, s8, o8) {
  const c7 = await (async function(e9, t9, r9, i9) {
    if (e9 === M7.publicKey.pqc_mlkem_x25519) return await Nr(M7.publicKey.x25519, t9, i9, r9);
    throw Error("Unsupported KEM algorithm");
  })(e8, t8, i8, a8), u8 = await (async function(e9, t9, r9) {
    if (e9 === M7.publicKey.pqc_mlkem_x25519) {
      const { ml_kem768: e10 } = await Promise.resolve().then(() => (init_noble_post_quantum_min(), noble_post_quantum_min_exports));
      return e10.decapsulate(t9, r9);
    }
    throw Error("Unsupported KEM algorithm");
  })(e8, r8, n8), h7 = await Ti(e8, u8, c7, t8, a8);
  return await xr(M7.symmetric.aes256, h7, o8);
}
async function Ti(e8, t8, r8, i8, a8) {
  const n8 = _5.encodeUTF8("OpenPGPCompositeKDFv1"), s8 = _5.concatUint8Array([t8, r8, i8, a8, new Uint8Array([e8]), n8, new Uint8Array([n8.length])]);
  return await Me(M7.hash.sha3_256, s8);
}
async function Bi(e8, t8, r8, i8, a8) {
  const n8 = (async function(e9, t9, r9) {
    if (e9 === M7.publicKey.pqc_mlkem_x25519) return Br(M7.publicKey.x25519, t9, r9);
    throw Error("Unsupported KEM algorithm");
  })(e8, t8, r8), s8 = (async function(e9, t9, r9) {
    if (e9 === M7.publicKey.pqc_mlkem_x25519) {
      const { mlkemPublicKey: i9 } = await Di(e9, r9);
      return _5.equalsUint8Array(t9, i9);
    }
    throw Error("Unsupported KEM algorithm");
  })(e8, i8, a8);
  return await n8 && await s8;
}
async function Mi(e8, t8) {
  if (e8 === M7.publicKey.pqc_mldsa_ed25519) {
    const { ml_dsa65: e9 } = await Promise.resolve().then(() => (init_noble_post_quantum_min(), noble_post_quantum_min_exports)), { secretKey: r8, publicKey: i8 } = e9.keygen(t8);
    return { mldsaSecretKey: r8, mldsaPublicKey: i8 };
  }
  throw Error("Unsupported signature algorithm");
}
async function Li(e8) {
  if (e8 === M7.publicKey.pqc_mldsa_ed25519) {
    const { eccSecretKey: t8, eccPublicKey: r8 } = await (async function(e9) {
      if (e9 === M7.publicKey.pqc_mldsa_ed25519) {
        const { A: e10, seed: t9 } = await ht3(M7.publicKey.ed25519);
        return { eccPublicKey: e10, eccSecretKey: t9 };
      }
      throw Error("Unsupported signature algorithm");
    })(e8), { mldsaSeed: i8, mldsaSecretKey: a8, mldsaPublicKey: n8 } = await (async function(e9) {
      if (e9 === M7.publicKey.pqc_mldsa_ed25519) {
        const t9 = de3(32), { mldsaSecretKey: r9, mldsaPublicKey: i9 } = await Mi(e9, t9);
        return { mldsaSeed: t9, mldsaSecretKey: r9, mldsaPublicKey: i9 };
      }
      throw Error("Unsupported signature algorithm");
    })(e8);
    return { eccSecretKey: t8, eccPublicKey: r8, mldsaSeed: i8, mldsaSecretKey: a8, mldsaPublicKey: n8 };
  }
  throw Error("Unsupported signature algorithm");
}
async function Fi(e8, t8, r8, i8, a8, n8) {
  if (e8 === M7.publicKey.pqc_mldsa_ed25519) {
    const { eccSignature: t9 } = await (async function(e9, t10, r9, i9, a9) {
      if (e9 === M7.publicKey.pqc_mldsa_ed25519) {
        const { RS: e10 } = await lt3(M7.publicKey.ed25519, 0, 0, i9, r9, a9);
        return { eccSignature: e10 };
      }
      throw Error("Unsupported signature algorithm");
    })(e8, 0, r8, i8, n8), { mldsaSignature: s8 } = await (async function(e9, t10, r9) {
      if (e9 === M7.publicKey.pqc_mldsa_ed25519) {
        const { ml_dsa65: e10 } = await Promise.resolve().then(() => (init_noble_post_quantum_min(), noble_post_quantum_min_exports));
        return { mldsaSignature: e10.sign(t10, r9) };
      }
      throw Error("Unsupported signature algorithm");
    })(e8, a8, n8);
    return { eccSignature: t9, mldsaSignature: s8 };
  }
  throw Error("Unsupported signature algorithm");
}
async function _i(e8, t8, r8, i8, a8, { eccSignature: n8, mldsaSignature: s8 }) {
  if (e8 === M7.publicKey.pqc_mldsa_ed25519) {
    const t9 = (async function(e9, t10, r9, i9, a9) {
      if (e9 === M7.publicKey.pqc_mldsa_ed25519) return yt3(M7.publicKey.ed25519, 0, { RS: a9 }, 0, r9, i9);
      throw Error("Unsupported signature algorithm");
    })(e8, 0, r8, a8, n8), o8 = (async function(e9, t10, r9, i9) {
      if (e9 === M7.publicKey.pqc_mldsa_ed25519) {
        const { ml_dsa65: e10 } = await Promise.resolve().then(() => (init_noble_post_quantum_min(), noble_post_quantum_min_exports));
        return e10.verify(t10, r9, i9);
      }
      throw Error("Unsupported signature algorithm");
    })(e8, i8, a8, s8);
    return await t9 && await o8;
  }
  throw Error("Unsupported signature algorithm");
}
function Ni(e8, t8) {
  if (e8 === M7.publicKey.pqc_mldsa_ed25519) return Le2(t8) >= 32;
  throw Error("Unsupported signature algorithm");
}
async function Ri(e8, t8, r8, i8, a8) {
  const n8 = (async function(e9, t9, r9) {
    if (e9 === M7.publicKey.pqc_mldsa_ed25519) return pt3(M7.publicKey.ed25519, t9, r9);
    throw Error("Unsupported signature algorithm");
  })(e8, t8, r8), s8 = (async function(e9, t9, r9) {
    if (e9 === M7.publicKey.pqc_mldsa_ed25519) {
      const { mldsaPublicKey: i9 } = await Mi(e9, r9);
      return _5.equalsUint8Array(t9, i9);
    }
    throw Error("Unsupported signature algorithm");
  })(e8, i8, a8);
  return await n8 && await s8;
}
var zi = class {
  constructor(e8) {
    e8 && (this.data = e8);
  }
  read(e8) {
    if (e8.length >= 1) {
      const t8 = e8[0];
      if (e8.length >= 1 + t8) return this.data = e8.subarray(1, 1 + t8), 1 + this.data.length;
    }
    throw Error("Invalid symmetric key");
  }
  write() {
    return _5.concatUint8Array([new Uint8Array([this.data.length]), this.data]);
  }
};
var Oi = class {
  constructor(e8) {
    if (e8) {
      const { version: t8, hash: r8, cipher: i8, replacementFingerprint: a8 } = e8;
      this.version = t8 || 1, this.hash = r8, this.cipher = i8, this.replacementFingerprint = a8;
    } else this.version = null, this.hash = null, this.cipher = null, this.replacementFingerprint = null;
  }
  read(e8) {
    if (e8.length < 4 || 1 !== e8[1] && 255 !== e8[1]) throw new st3("Cannot read KDFParams");
    const t8 = e8[0];
    this.version = e8[1], this.hash = e8[2], this.cipher = e8[3];
    let r8 = 4;
    if (255 === this.version) {
      const i8 = t8 - r8 + 1;
      this.replacementFingerprint = e8.slice(r8, r8 + i8), r8 += i8;
    }
    return r8;
  }
  write(e8) {
    if (!this.version || 1 === this.version || e8) return new Uint8Array([3, 1, this.hash, this.cipher]);
    return _5.concatUint8Array([new Uint8Array([3 + this.replacementFingerprint.length, this.version, this.hash, this.cipher]), this.replacementFingerprint]);
  }
};
var ji = class _ji {
  static fromObject({ wrappedKey: e8, algorithm: t8 }) {
    const r8 = new _ji();
    return r8.wrappedKey = e8, r8.algorithm = t8, r8;
  }
  read(e8) {
    let t8 = 0, r8 = e8[t8++];
    this.algorithm = r8 % 2 ? e8[t8++] : null, r8 -= r8 % 2, this.wrappedKey = _5.readExactSubarray(e8, t8, t8 + r8), t8 += r8;
  }
  write() {
    return _5.concatUint8Array([this.algorithm ? new Uint8Array([this.wrappedKey.length + 1, this.algorithm]) : new Uint8Array([this.wrappedKey.length]), this.wrappedKey]);
  }
};
var qi = class {
  constructor(e8) {
    if (void 0 === e8 && (e8 = new Uint8Array([])), !_5.isUint8Array(e8)) throw Error("data must be in the form of a Uint8Array");
    this.data = e8, this.length = this.data.byteLength;
  }
  write() {
    return _5.concatUint8Array([new Uint8Array([this.length]), this.data]);
  }
  read(e8) {
    if (e8.length >= 1) {
      const t8 = e8[0];
      if (e8.length >= t8 + 1) return this.data = e8.subarray(1, 1 + t8), this.length = t8, 1 + t8;
    }
    throw Error("Invalid octet string");
  }
};
var Hi = (e8) => class {
  constructor(e9) {
    this.data = void 0 === e9 ? null : e9;
  }
  read(t8) {
    const r8 = t8[0];
    return this.data = M7.write(e8, r8), 1;
  }
  write() {
    return new Uint8Array([this.data]);
  }
  getName() {
    return M7.read(e8, this.data);
  }
  getValue() {
    return this.data;
  }
};
var Gi = Hi(M7.aead);
var Vi = Hi(M7.symmetric);
var Wi = Hi(M7.hash);
var $i = _5.getWebCrypto();
var Qi = _5.getNodeCrypto();
var Xi = Qi ? Qi.getCiphers() : [];
var Yi = { idea: Xi.includes("idea-cfb") ? "idea-cfb" : void 0, tripledes: Xi.includes("des-ede3-cfb") ? "des-ede3-cfb" : void 0, cast5: Xi.includes("cast5-cfb") ? "cast5-cfb" : void 0, blowfish: Xi.includes("bf-cfb") ? "bf-cfb" : void 0, aes128: Xi.includes("aes-128-cfb") ? "aes-128-cfb" : void 0, aes192: Xi.includes("aes-192-cfb") ? "aes-192-cfb" : void 0, aes256: Xi.includes("aes-256-cfb") ? "aes-256-cfb" : void 0 };
function Zi(e8) {
  const { blockSize: t8 } = Pr(e8), r8 = de3(t8), i8 = new Uint8Array([r8[r8.length - 2], r8[r8.length - 1]]);
  return _5.concat([r8, i8]);
}
async function Ji(e8, t8, r8, i8, a8) {
  const n8 = M7.read(M7.symmetric, e8);
  if (_5.getNodeCrypto() && Yi[n8]) return (function(e9, t9, r9, i9) {
    const a9 = M7.read(M7.symmetric, e9), n9 = new Qi.createCipheriv(Yi[a9], t9, i9);
    return b5(r9, ((e10) => new Uint8Array(n9.update(e10))));
  })(e8, t8, r8, i8);
  if (_5.isAES(e8)) return (async function(e9, t9, r9, i9) {
    if ($i && await ta.isSupported(e9)) {
      const a9 = new ta(e9, t9, i9);
      return _5.isStream(r9) ? k6(r9, ((e10) => a9.encryptChunk(e10)), (() => a9.finish())) : a9.encrypt(r9);
    }
    if (_5.isStream(r9)) {
      const a9 = new ra(true, e9, t9, i9);
      return k6(r9, ((e10) => a9.processChunk(e10)), (() => a9.finish()));
    }
    return pr(t9, i9).encrypt(r9);
  })(e8, t8, r8, i8);
  const s8 = new (await Ar(e8))(t8), o8 = s8.blockSize, c7 = i8.slice();
  let u8 = new Uint8Array();
  const h7 = (e9) => {
    e9 && (u8 = _5.concatUint8Array([u8, e9]));
    const t9 = new Uint8Array(u8.length);
    let r9, i9 = 0;
    for (; e9 ? u8.length >= o8 : u8.length; ) {
      const e10 = s8.encrypt(c7);
      for (r9 = 0; r9 < o8; r9++) c7[r9] = u8[r9] ^ e10[r9], t9[i9++] = c7[r9];
      u8 = u8.subarray(o8);
    }
    return t9.subarray(0, i9);
  };
  return b5(r8, h7, h7);
}
async function ea(e8, t8, r8, i8) {
  const a8 = M7.read(M7.symmetric, e8);
  if (Qi && Yi[a8]) return (function(e9, t9, r9, i9) {
    const a9 = M7.read(M7.symmetric, e9), n9 = new Qi.createDecipheriv(Yi[a9], t9, i9);
    return b5(r9, ((e10) => new Uint8Array(n9.update(e10))));
  })(e8, t8, r8, i8);
  if (_5.isAES(e8)) return (function(e9, t9, r9, i9) {
    if (_5.isStream(r9)) {
      const a9 = new ra(false, e9, t9, i9);
      return k6(r9, ((e10) => a9.processChunk(e10)), (() => a9.finish()));
    }
    return pr(t9, i9).decrypt(r9);
  })(e8, t8, r8, i8);
  const n8 = new (await Ar(e8))(t8), s8 = n8.blockSize;
  let o8 = i8, c7 = new Uint8Array();
  const u8 = (e9) => {
    e9 && (c7 = _5.concatUint8Array([c7, e9]));
    const t9 = new Uint8Array(c7.length);
    let r9, i9 = 0;
    for (; e9 ? c7.length >= s8 : c7.length; ) {
      const e10 = n8.encrypt(o8);
      for (o8 = c7.subarray(0, s8), r9 = 0; r9 < s8; r9++) t9[i9++] = o8[r9] ^ e10[r9];
      c7 = c7.subarray(s8);
    }
    return t9.subarray(0, i9);
  };
  return b5(r8, u8, u8);
}
var ta = class {
  constructor(e8, t8, r8) {
    const { blockSize: i8 } = Pr(e8);
    this.key = t8, this.iv = r8, this.prevBlock = r8.slice(), this.nextBlock = new Uint8Array(i8), this.i = 0, this.blockSize = i8, this.zeroBlock = new Uint8Array(this.blockSize);
  }
  static isSupported(e8) {
    const { keySize: t8 } = Pr(e8);
    return $i.importKey("raw", new Uint8Array(t8), "aes-cbc", false, ["encrypt"]).then((() => true), (() => false));
  }
  async _runCBC(e8, t8) {
    const r8 = "AES-CBC";
    this.keyRef = this.keyRef || await $i.importKey("raw", this.key, r8, false, ["encrypt"]);
    const i8 = await $i.encrypt({ name: r8, iv: t8 || this.zeroBlock }, this.keyRef, e8);
    return new Uint8Array(i8).subarray(0, e8.length);
  }
  async encryptChunk(e8) {
    const t8 = this.nextBlock.length - this.i, r8 = e8.subarray(0, t8);
    if (this.nextBlock.set(r8, this.i), this.i + e8.length >= 2 * this.blockSize) {
      const r9 = (e8.length - t8) % this.blockSize, i9 = _5.concatUint8Array([this.nextBlock, e8.subarray(t8, e8.length - r9)]), a8 = _5.concatUint8Array([this.prevBlock, i9.subarray(0, i9.length - this.blockSize)]), n8 = await this._runCBC(a8);
      return ia(n8, i9), this.prevBlock = n8.slice(-this.blockSize), r9 > 0 && this.nextBlock.set(e8.subarray(-r9)), this.i = r9, n8;
    }
    let i8;
    if (this.i += r8.length, this.i === this.nextBlock.length) {
      const t9 = this.nextBlock;
      i8 = await this._runCBC(this.prevBlock), ia(i8, t9), this.prevBlock = i8.slice(), this.i = 0;
      const a8 = e8.subarray(r8.length);
      this.nextBlock.set(a8, this.i), this.i += a8.length;
    } else i8 = new Uint8Array();
    return i8;
  }
  async finish() {
    let e8;
    if (0 === this.i) e8 = new Uint8Array();
    else {
      this.nextBlock = this.nextBlock.subarray(0, this.i);
      const t8 = this.nextBlock, r8 = await this._runCBC(this.prevBlock);
      ia(r8, t8), e8 = r8.subarray(0, t8.length);
    }
    return this.clearSensitiveData(), e8;
  }
  clearSensitiveData() {
    this.nextBlock.fill(0), this.prevBlock.fill(0), this.keyRef = null, this.key = null;
  }
  async encrypt(e8) {
    const t8 = (await this._runCBC(_5.concatUint8Array([new Uint8Array(this.blockSize), e8]), this.iv)).subarray(0, e8.length);
    return ia(t8, e8), this.clearSensitiveData(), t8;
  }
};
var ra = class {
  constructor(e8, t8, r8, i8) {
    this.forEncryption = e8;
    const { blockSize: a8 } = Pr(t8);
    this.key = Kr.expandKeyLE(r8), i8.byteOffset % 4 != 0 && (i8 = i8.slice()), this.prevBlock = aa(i8), this.nextBlock = new Uint8Array(a8), this.i = 0, this.blockSize = a8;
  }
  _runCFB(e8) {
    const t8 = aa(e8), r8 = new Uint8Array(e8.length), i8 = aa(r8);
    for (let e9 = 0; e9 + 4 <= i8.length; e9 += 4) {
      const { s0: r9, s1: a8, s2: n8, s3: s8 } = Kr.encrypt(this.key, this.prevBlock[0], this.prevBlock[1], this.prevBlock[2], this.prevBlock[3]);
      i8[e9 + 0] = t8[e9 + 0] ^ r9, i8[e9 + 1] = t8[e9 + 1] ^ a8, i8[e9 + 2] = t8[e9 + 2] ^ n8, i8[e9 + 3] = t8[e9 + 3] ^ s8, this.prevBlock = (this.forEncryption ? i8 : t8).slice(e9, e9 + 4);
    }
    return r8;
  }
  async processChunk(e8) {
    const t8 = this.nextBlock.length - this.i, r8 = e8.subarray(0, t8);
    if (this.nextBlock.set(r8, this.i), this.i + e8.length >= 2 * this.blockSize) {
      const r9 = (e8.length - t8) % this.blockSize, i9 = _5.concatUint8Array([this.nextBlock, e8.subarray(t8, e8.length - r9)]), a8 = this._runCFB(i9);
      return r9 > 0 && this.nextBlock.set(e8.subarray(-r9)), this.i = r9, a8;
    }
    let i8;
    if (this.i += r8.length, this.i === this.nextBlock.length) {
      i8 = this._runCFB(this.nextBlock), this.i = 0;
      const t9 = e8.subarray(r8.length);
      this.nextBlock.set(t9, this.i), this.i += t9.length;
    } else i8 = new Uint8Array();
    return i8;
  }
  async finish() {
    let e8;
    if (0 === this.i) e8 = new Uint8Array();
    else {
      e8 = this._runCFB(this.nextBlock).subarray(0, this.i);
    }
    return this.clearSensitiveData(), e8;
  }
  clearSensitiveData() {
    this.nextBlock.fill(0), this.prevBlock.fill(0), this.key.fill(0);
  }
};
function ia(e8, t8) {
  const r8 = Math.min(e8.length, t8.length);
  for (let i8 = 0; i8 < r8; i8++) e8[i8] = e8[i8] ^ t8[i8];
}
var aa = (e8) => new Uint32Array(e8.buffer, e8.byteOffset, Math.floor(e8.byteLength / 4));
var na = _5.getWebCrypto();
var sa = _5.getNodeCrypto();
var oa = 16;
function ca(e8, t8) {
  const r8 = e8.length - oa;
  for (let i8 = 0; i8 < oa; i8++) e8[i8 + r8] ^= t8[i8];
  return e8;
}
var ua = new Uint8Array(oa);
async function ha(e8) {
  const t8 = await la(e8), r8 = _5.double(await t8(ua)), i8 = _5.double(r8);
  return async function(e9) {
    return (await t8((function(e10, t9, r9) {
      if (e10.length && e10.length % oa == 0) return ca(e10, t9);
      const i9 = new Uint8Array(e10.length + (oa - e10.length % oa));
      return i9.set(e10), i9[e10.length] = 128, ca(i9, r9);
    })(e9, r8, i8))).subarray(-16);
  };
}
async function la(e8) {
  if (_5.getNodeCrypto()) return async function(t8) {
    const r8 = new sa.createCipheriv("aes-" + 8 * e8.length + "-cbc", e8, ua).update(t8);
    return new Uint8Array(r8);
  };
  if (_5.getWebCrypto()) try {
    return e8 = await na.importKey("raw", e8, { name: "AES-CBC", length: 8 * e8.length }, false, ["encrypt"]), async function(t8) {
      const r8 = await na.encrypt({ name: "AES-CBC", iv: ua, length: 128 }, e8, t8);
      return new Uint8Array(r8).subarray(0, r8.byteLength - oa);
    };
  } catch (t8) {
    if ("NotSupportedError" !== t8.name && (24 !== e8.length || "OperationError" !== t8.name)) throw t8;
    _5.printDebugError("Browser did not support operation: " + t8.message);
  }
  return async function(t8) {
    return yr(e8, ua, { disablePadding: true }).encrypt(t8);
  };
}
var ya = _5.getWebCrypto();
var pa = _5.getNodeCrypto();
var da = _5.getNodeBuffer();
var ga = 16;
var ma = ga;
var fa = new Uint8Array(ga);
var wa = new Uint8Array(ga);
wa[15] = 1;
var ba = new Uint8Array(ga);
async function ka(e8) {
  const t8 = await ha(e8);
  return function(e9, r8) {
    return t8(_5.concatUint8Array([e9, r8]));
  };
}
async function va(e8) {
  if (_5.getNodeCrypto()) return async function(t8, r8) {
    const i8 = new pa.createCipheriv("aes-" + 8 * e8.length + "-ctr", e8, r8), a8 = da.concat([i8.update(t8), i8.final()]);
    return new Uint8Array(a8);
  };
  if (_5.getWebCrypto()) try {
    const t8 = await ya.importKey("raw", e8, { name: "AES-CTR", length: 8 * e8.length }, false, ["encrypt"]);
    return async function(e9, r8) {
      const i8 = await ya.encrypt({ name: "AES-CTR", counter: r8, length: 128 }, t8, e9);
      return new Uint8Array(i8);
    };
  } catch (t8) {
    if ("NotSupportedError" !== t8.name && (24 !== e8.length || "OperationError" !== t8.name)) throw t8;
    _5.printDebugError("Browser did not support operation: " + t8.message);
  }
  return async function(t8, r8) {
    return lr(e8, r8).encrypt(t8);
  };
}
async function Ka(e8, t8) {
  if (e8 !== M7.symmetric.aes128 && e8 !== M7.symmetric.aes192 && e8 !== M7.symmetric.aes256) throw Error("EAX mode supports only AES cipher");
  const [r8, i8] = await Promise.all([ka(t8), va(t8)]);
  return { encrypt: async function(e9, t9, a8) {
    const [n8, s8] = await Promise.all([r8(fa, t9), r8(wa, a8)]), o8 = await i8(e9, n8), c7 = await r8(ba, o8);
    for (let e10 = 0; e10 < ma; e10++) c7[e10] ^= s8[e10] ^ n8[e10];
    return _5.concatUint8Array([o8, c7]);
  }, decrypt: async function(e9, t9, a8) {
    if (e9.length < ma) throw Error("Invalid EAX ciphertext");
    const n8 = e9.subarray(0, -16), s8 = e9.subarray(-16), [o8, c7, u8] = await Promise.all([r8(fa, t9), r8(wa, a8), r8(ba, n8)]), h7 = u8;
    for (let e10 = 0; e10 < ma; e10++) h7[e10] ^= c7[e10] ^ o8[e10];
    if (!_5.equalsUint8Array(s8, h7)) throw Error("Authentication tag mismatch");
    return await i8(n8, o8);
  } };
}
ba[15] = 2, Ka.getNonce = function(e8, t8) {
  const r8 = e8.slice();
  for (let e9 = 0; e9 < t8.length; e9++) r8[8 + e9] ^= t8[e9];
  return r8;
}, Ka.blockLength = ga, Ka.ivLength = 16, Ka.tagLength = ma;
var Aa = 16;
var Ea = 16;
function Sa(e8) {
  let t8 = 0;
  for (let r8 = 1; !(e8 & r8); r8 <<= 1) t8++;
  return t8;
}
function Pa(e8, t8) {
  for (let r8 = 0; r8 < e8.length; r8++) e8[r8] ^= t8[r8];
  return e8;
}
function Ua(e8, t8) {
  return Pa(e8.slice(), t8);
}
var Da = new Uint8Array(Aa);
var xa = new Uint8Array([1]);
async function Ca(e8, t8) {
  const { keySize: r8 } = Pr(e8);
  if (!_5.isAES(e8) || t8.length !== r8) throw Error("Unexpected algorithm or key size");
  let i8 = 0;
  const a8 = (e9) => yr(t8, Da, { disablePadding: true }).encrypt(e9), n8 = (e9) => yr(t8, Da, { disablePadding: true }).decrypt(e9);
  let s8;
  function o8(e9, t9, r9, n9) {
    const o9 = t9.length / Aa | 0;
    !(function(e10, t10) {
      const r10 = _5.nbits(Math.max(e10.length, t10.length) / Aa | 0) - 1;
      for (let e11 = i8 + 1; e11 <= r10; e11++) s8[e11] = _5.double(s8[e11 - 1]);
      i8 = r10;
    })(t9, n9);
    const c7 = _5.concatUint8Array([Da.subarray(0, 15 - r9.length), xa, r9]), u8 = 63 & c7[15];
    c7[15] &= 192;
    const h7 = a8(c7), l6 = _5.concatUint8Array([h7, Ua(h7.subarray(0, 8), h7.subarray(1, 9))]), y8 = _5.shiftRight(l6.subarray(0 + (u8 >> 3), 17 + (u8 >> 3)), 8 - (7 & u8)).subarray(1), p5 = new Uint8Array(Aa), d6 = new Uint8Array(t9.length + Ea);
    let g7, m6 = 0;
    for (g7 = 0; g7 < o9; g7++) Pa(y8, s8[Sa(g7 + 1)]), d6.set(Pa(e9(Ua(y8, t9)), y8), m6), Pa(p5, e9 === a8 ? t9 : d6.subarray(m6)), t9 = t9.subarray(Aa), m6 += Aa;
    if (t9.length) {
      Pa(y8, s8.x);
      const r10 = a8(y8);
      d6.set(Ua(t9, r10), m6);
      const i9 = new Uint8Array(Aa);
      i9.set(e9 === a8 ? t9 : d6.subarray(m6, -16), 0), i9[t9.length] = 128, Pa(p5, i9), m6 += t9.length;
    }
    const f8 = Pa(a8(Pa(Pa(p5, y8), s8.$)), (function(e10) {
      if (!e10.length) return Da;
      const t10 = e10.length / Aa | 0, r10 = new Uint8Array(Aa), i9 = new Uint8Array(Aa);
      for (let n10 = 0; n10 < t10; n10++) Pa(r10, s8[Sa(n10 + 1)]), Pa(i9, a8(Ua(r10, e10))), e10 = e10.subarray(Aa);
      if (e10.length) {
        Pa(r10, s8.x);
        const t11 = new Uint8Array(Aa);
        t11.set(e10, 0), t11[e10.length] = 128, Pa(t11, r10), Pa(i9, a8(t11));
      }
      return i9;
    })(n9));
    return d6.set(f8, m6), d6;
  }
  return (function() {
    const e9 = a8(Da), t9 = _5.double(e9);
    s8 = [], s8[0] = _5.double(t9), s8.x = e9, s8.$ = t9;
  })(), { encrypt: async function(e9, t9, r9) {
    return o8(a8, e9, t9, r9);
  }, decrypt: async function(e9, t9, r9) {
    if (e9.length < Ea) throw Error("Invalid OCB ciphertext");
    const i9 = e9.subarray(-16);
    e9 = e9.subarray(0, -16);
    const a9 = o8(n8, e9, t9, r9);
    if (_5.equalsUint8Array(i9, a9.subarray(-16))) return a9.subarray(0, -16);
    throw Error("Authentication tag mismatch");
  } };
}
Ca.getNonce = function(e8, t8) {
  const r8 = e8.slice();
  for (let e9 = 0; e9 < t8.length; e9++) r8[7 + e9] ^= t8[e9];
  return r8;
}, Ca.blockLength = Aa, Ca.ivLength = 15, Ca.tagLength = Ea;
var Ia = _5.getWebCrypto();
var Ta = _5.getNodeCrypto();
var Ba = _5.getNodeBuffer();
var Ma = 16;
var La = "AES-GCM";
async function Fa(e8, t8) {
  if (e8 !== M7.symmetric.aes128 && e8 !== M7.symmetric.aes192 && e8 !== M7.symmetric.aes256) throw Error("GCM mode supports only AES cipher");
  if (_5.getNodeCrypto()) return { encrypt: async function(e9, r8, i8 = new Uint8Array()) {
    const a8 = new Ta.createCipheriv("aes-" + 8 * t8.length + "-gcm", t8, r8);
    a8.setAAD(i8);
    const n8 = Ba.concat([a8.update(e9), a8.final(), a8.getAuthTag()]);
    return new Uint8Array(n8);
  }, decrypt: async function(e9, r8, i8 = new Uint8Array()) {
    const a8 = new Ta.createDecipheriv("aes-" + 8 * t8.length + "-gcm", t8, r8);
    a8.setAAD(i8), a8.setAuthTag(e9.slice(e9.length - Ma, e9.length));
    const n8 = Ba.concat([a8.update(e9.slice(0, e9.length - Ma)), a8.final()]);
    return new Uint8Array(n8);
  } };
  if (_5.getWebCrypto()) try {
    const e9 = await Ia.importKey("raw", t8, { name: La }, false, ["encrypt", "decrypt"]), r8 = navigator.userAgent.match(/Version\/13\.\d(\.\d)* Safari/) || navigator.userAgent.match(/Version\/(13|14)\.\d(\.\d)* Mobile\/\S* Safari/);
    return { encrypt: async function(i8, a8, n8 = new Uint8Array()) {
      if (r8 && !i8.length) return gr(t8, a8, n8).encrypt(i8);
      const s8 = await Ia.encrypt({ name: La, iv: a8, additionalData: n8, tagLength: 128 }, e9, i8);
      return new Uint8Array(s8);
    }, decrypt: async function(i8, a8, n8 = new Uint8Array()) {
      if (r8 && i8.length === Ma) return gr(t8, a8, n8).decrypt(i8);
      try {
        const t9 = await Ia.decrypt({ name: La, iv: a8, additionalData: n8, tagLength: 128 }, e9, i8);
        return new Uint8Array(t9);
      } catch (e10) {
        if ("OperationError" === e10.name) throw Error("Authentication tag mismatch");
      }
    } };
  } catch (e9) {
    if ("NotSupportedError" !== e9.name && (24 !== t8.length || "OperationError" !== e9.name)) throw e9;
    _5.printDebugError("Browser did not support operation: " + e9.message);
  }
  return { encrypt: async function(e9, r8, i8) {
    return gr(t8, r8, i8).encrypt(e9);
  }, decrypt: async function(e9, r8, i8) {
    return gr(t8, r8, i8).decrypt(e9);
  } };
}
function _a(e8, t8 = false) {
  switch (e8) {
    case M7.aead.eax:
      return Ka;
    case M7.aead.ocb:
      return Ca;
    case M7.aead.gcm:
      return Fa;
    case M7.aead.experimentalGCM:
      if (!t8) throw Error("Unexpected non-standard `experimentalGCM` AEAD algorithm provided in `config.preferredAEADAlgorithm`: use `gcm` instead");
      return Fa;
    default:
      throw Error("Unsupported AEAD mode");
  }
}
async function Na(e8, t8, r8, i8, a8, n8) {
  switch (e8) {
    case M7.publicKey.rsaEncrypt:
    case M7.publicKey.rsaEncryptSign: {
      const { n: e9, e: t9 } = r8;
      return { c: await Ge(a8, e9, t9) };
    }
    case M7.publicKey.elgamal: {
      const { p: e9, g: t9, y: i9 } = r8;
      return (async function(e10, t10, r9, i10) {
        t10 = re3(t10), r9 = re3(r9), i10 = re3(i10);
        const a9 = re3(_e(e10, le3(t10))), n9 = ge3(Xe, t10 - Xe);
        return { c1: ye3(ne3(r9, n9, t10)), c2: ye3(ie3(ne3(i10, n9, t10) * a9, t10)) };
      })(a8, e9, t9, i9);
    }
    case M7.publicKey.ecdh: {
      const { oid: e9, Q: t9, kdfParams: i9 } = r8, { publicKey: s8, wrappedKey: o8 } = await fi(e9, i9, a8, t9, n8);
      return { V: s8, C: new zi(o8) };
    }
    case M7.publicKey.x25519:
    case M7.publicKey.x448: {
      if (t8 && !_5.isAES(t8)) throw Error("X25519 and X448 keys can only encrypt AES session keys");
      const { A: i9 } = r8, { ephemeralPublicKey: n9, wrappedKey: s8 } = await Mr(e8, a8, i9);
      return { ephemeralPublicKey: n9, C: ji.fromObject({ algorithm: t8, wrappedKey: s8 }) };
    }
    case M7.publicKey.aead: {
      if (!i8) throw Error("Cannot encrypt with symmetric key missing private parameters");
      const { cipher: e9 } = r8, t9 = e9.getValue(), { keyMaterial: n9 } = i8, s8 = L4.preferredAEADAlgorithm, o8 = _a(L4.preferredAEADAlgorithm), { ivLength: c7 } = o8, u8 = de3(c7), h7 = await o8(t9, n9), l6 = await h7.encrypt(a8, u8, new Uint8Array());
      return { aeadMode: new Gi(s8), iv: u8, c: new qi(l6) };
    }
    case M7.publicKey.pqc_mlkem_x25519: {
      const { eccPublicKey: i9, mlkemPublicKey: n9 } = r8, { eccCipherText: s8, mlkemCipherText: o8, wrappedKey: c7 } = await Ci(e8, i9, n9, a8);
      return { eccCipherText: s8, mlkemCipherText: o8, C: ji.fromObject({ algorithm: t8, wrappedKey: c7 }) };
    }
    default:
      return [];
  }
}
async function Ra(e8, t8, r8, i8, a8, n8) {
  switch (e8) {
    case M7.publicKey.rsaEncryptSign:
    case M7.publicKey.rsaEncrypt: {
      const { c: e9 } = i8, { n: a9, e: s8 } = t8, { d: o8, p: c7, q: u8, u: h7 } = r8;
      return Ve2(e9, a9, s8, o8, c7, u8, h7, n8);
    }
    case M7.publicKey.elgamal: {
      const { c1: e9, c2: a9 } = i8;
      return (async function(e10, t9, r9, i9, a10) {
        return e10 = re3(e10), t9 = re3(t9), r9 = re3(r9), Ne2(ye3(ie3(oe3(ne3(e10, i9 = re3(i9), r9), r9) * t9, r9), "be", le3(r9)), a10);
      })(e9, a9, t8.p, r8.x, n8);
    }
    case M7.publicKey.ecdh: {
      const { oid: e9, Q: n9, kdfParams: s8 } = t8, { d: o8 } = r8, { V: c7, C: u8 } = i8;
      return bi(e9, s8, c7, u8.data, n9, o8, a8);
    }
    case M7.publicKey.x25519:
    case M7.publicKey.x448: {
      const { A: a9 } = t8, { k: n9 } = r8, { ephemeralPublicKey: s8, C: o8 } = i8;
      if (null !== o8.algorithm && !_5.isAES(o8.algorithm)) throw Error("AES session key expected");
      return Lr(e8, s8, o8.wrappedKey, a9, n9);
    }
    case M7.publicKey.aead: {
      const { cipher: e9 } = t8, a9 = e9.getValue(), { keyMaterial: n9 } = r8, { aeadMode: s8, iv: o8, c: c7 } = i8, u8 = _a(s8.getValue());
      return (await u8(a9, n9)).decrypt(c7.data, o8, new Uint8Array());
    }
    case M7.publicKey.pqc_mlkem_x25519: {
      const { eccSecretKey: a9, mlkemSecretKey: n9 } = r8, { eccPublicKey: s8, mlkemPublicKey: o8 } = t8, { eccCipherText: c7, mlkemCipherText: u8, C: h7 } = i8;
      return Ii(e8, c7, u8, a9, s8, n9, 0, h7.wrappedKey);
    }
    default:
      throw Error("Unknown public key encryption algorithm.");
  }
}
async function za(e8, t8, r8) {
  let i8 = 0;
  switch (e8) {
    case M7.publicKey.rsaEncrypt:
    case M7.publicKey.rsaEncryptSign:
    case M7.publicKey.rsaSign: {
      const e9 = _5.readMPI(t8.subarray(i8));
      i8 += e9.length + 2;
      const r9 = _5.readMPI(t8.subarray(i8));
      i8 += r9.length + 2;
      const a8 = _5.readMPI(t8.subarray(i8));
      i8 += a8.length + 2;
      const n8 = _5.readMPI(t8.subarray(i8));
      return i8 += n8.length + 2, { read: i8, privateParams: { d: e9, p: r9, q: a8, u: n8 } };
    }
    case M7.publicKey.dsa:
    case M7.publicKey.elgamal: {
      const e9 = _5.readMPI(t8.subarray(i8));
      return i8 += e9.length + 2, { read: i8, privateParams: { x: e9 } };
    }
    case M7.publicKey.ecdsa:
    case M7.publicKey.ecdh: {
      const a8 = Wa(e8, r8.oid);
      let n8 = _5.readMPI(t8.subarray(i8));
      return i8 += n8.length + 2, n8 = _5.leftPad(n8, a8), { read: i8, privateParams: { d: n8 } };
    }
    case M7.publicKey.eddsaLegacy: {
      const a8 = Wa(e8, r8.oid);
      if (r8.oid.getName() !== M7.curve.ed25519Legacy) throw Error("Unexpected OID for eddsaLegacy");
      let n8 = _5.readMPI(t8.subarray(i8));
      return i8 += n8.length + 2, n8 = _5.leftPad(n8, a8), { read: i8, privateParams: { seed: n8 } };
    }
    case M7.publicKey.ed25519:
    case M7.publicKey.ed448: {
      const r9 = Wa(e8), a8 = _5.readExactSubarray(t8, i8, i8 + r9);
      return i8 += a8.length, { read: i8, privateParams: { seed: a8 } };
    }
    case M7.publicKey.x25519:
    case M7.publicKey.x448: {
      const r9 = Wa(e8), a8 = _5.readExactSubarray(t8, i8, i8 + r9);
      return i8 += a8.length, { read: i8, privateParams: { k: a8 } };
    }
    case M7.publicKey.hmac: {
      const { cipher: e9 } = r8, a8 = Le2(e9.getValue()), n8 = t8.subarray(i8, i8 + 32);
      i8 += 32;
      const s8 = t8.subarray(i8, i8 + a8);
      return i8 += a8, { read: i8, privateParams: { hashSeed: n8, keyMaterial: s8 } };
    }
    case M7.publicKey.aead: {
      const { cipher: e9 } = r8, a8 = t8.subarray(i8, i8 + 32);
      i8 += 32;
      const { keySize: n8 } = Pr(e9.getValue()), s8 = t8.subarray(i8, i8 + n8);
      return i8 += n8, { read: i8, privateParams: { hashSeed: a8, keyMaterial: s8 } };
    }
    case M7.publicKey.pqc_mlkem_x25519: {
      const r9 = _5.readExactSubarray(t8, i8, i8 + Wa(M7.publicKey.x25519));
      i8 += r9.length;
      const a8 = _5.readExactSubarray(t8, i8, i8 + 64);
      i8 += a8.length;
      const { mlkemSecretKey: n8 } = await Di(e8, a8);
      return { read: i8, privateParams: { eccSecretKey: r9, mlkemSecretKey: n8, mlkemSeed: a8 } };
    }
    case M7.publicKey.pqc_mldsa_ed25519: {
      const r9 = _5.readExactSubarray(t8, i8, i8 + Wa(M7.publicKey.ed25519));
      i8 += r9.length;
      const a8 = _5.readExactSubarray(t8, i8, i8 + 32);
      i8 += a8.length;
      const { mldsaSecretKey: n8 } = await Mi(e8, a8);
      return { read: i8, privateParams: { eccSecretKey: r9, mldsaSecretKey: n8, mldsaSeed: a8 } };
    }
    default:
      throw new st3("Unknown public key encryption algorithm.");
  }
}
function Oa(e8, t8) {
  const r8 = /* @__PURE__ */ new Set([M7.publicKey.ed25519, M7.publicKey.x25519, M7.publicKey.ed448, M7.publicKey.x448, M7.publicKey.aead, M7.publicKey.hmac, M7.publicKey.pqc_mlkem_x25519, M7.publicKey.pqc_mldsa_ed25519]), i8 = { [M7.publicKey.pqc_mlkem_x25519]: /* @__PURE__ */ new Set(["mlkemSecretKey"]), [M7.publicKey.pqc_mldsa_ed25519]: /* @__PURE__ */ new Set(["mldsaSecretKey"]) }, a8 = Object.keys(t8).map(((a9) => {
    if (i8[e8]?.has(a9)) return new Uint8Array();
    const n8 = t8[a9];
    return _5.isUint8Array(n8) ? r8.has(e8) ? n8 : _5.uint8ArrayToMPI(n8) : n8.write();
  }));
  return _5.concatUint8Array(a8);
}
async function ja(e8, t8, r8, i8) {
  switch (e8) {
    case M7.publicKey.rsaEncrypt:
    case M7.publicKey.rsaEncryptSign:
    case M7.publicKey.rsaSign:
      return (async function(e9, t9) {
        if (t9 = BigInt(t9), _5.getWebCrypto()) {
          const r10 = { name: "RSASSA-PKCS1-v1_5", modulusLength: e9, publicExponent: ye3(t9), hash: { name: "SHA-1" } }, i10 = await ze.generateKey(r10, true, ["sign", "verify"]);
          return Qe(await ze.exportKey("jwk", i10.privateKey), t9);
        }
        if (_5.getNodeCrypto()) {
          const r10 = { modulusLength: e9, publicExponent: ce3(t9), publicKeyEncoding: { type: "pkcs1", format: "jwk" }, privateKeyEncoding: { type: "pkcs1", format: "jwk" } }, i10 = await new Promise(((e10, t10) => {
            Oe2.generateKeyPair("rsa", r10, ((r11, i11, a9) => {
              r11 ? t10(r11) : e10(a9);
            }));
          }));
          return Qe(i10, t9);
        }
        let r9, i9, a8;
        do {
          i9 = fe3(e9 - (e9 >> 1), t9, 40), r9 = fe3(e9 >> 1, t9, 40), a8 = r9 * i9;
        } while (he3(a8) !== e9);
        const n8 = (r9 - je) * (i9 - je);
        return i9 < r9 && ([r9, i9] = [i9, r9]), { n: ye3(a8), e: ye3(t9), d: ye3(oe3(t9, n8)), p: ye3(r9), q: ye3(i9), u: ye3(oe3(r9, i9)) };
      })(t8, 65537).then((({ n: e9, e: t9, d: r9, p: i9, q: a8, u: n8 }) => ({ privateParams: { d: r9, p: i9, q: a8, u: n8 }, publicParams: { n: e9, e: t9 } })));
    case M7.publicKey.ecdsa:
      return Qr(r8).then((({ oid: e9, Q: t9, secret: r9 }) => ({ privateParams: { d: r9 }, publicParams: { oid: new Ze2(e9), Q: t9 } })));
    case M7.publicKey.eddsaLegacy:
      return Qr(r8).then((({ oid: e9, Q: t9, secret: r9 }) => ({ privateParams: { seed: r9 }, publicParams: { oid: new Ze2(e9), Q: t9 } })));
    case M7.publicKey.ecdh:
      return Qr(r8).then((({ oid: e9, Q: t9, secret: r9, hash: i9, cipher: a8 }) => ({ privateParams: { d: r9 }, publicParams: { oid: new Ze2(e9), Q: t9, kdfParams: new Oi({ hash: i9, cipher: a8 }) } })));
    case M7.publicKey.ed25519:
    case M7.publicKey.ed448:
      return ht3(e8).then((({ A: e9, seed: t9 }) => ({ privateParams: { seed: t9 }, publicParams: { A: e9 } })));
    case M7.publicKey.x25519:
    case M7.publicKey.x448:
      return Tr(e8).then((({ A: e9, k: t9 }) => ({ privateParams: { k: t9 }, publicParams: { A: e9 } })));
    case M7.publicKey.hmac:
      return qa(await (async function(e9) {
        if (!Si.has(e9)) throw Error("Unsupported hash algorithm.");
        const t9 = M7.read(M7.webHash, e9), r9 = Pi || Ui.webcrypto.subtle, i9 = await r9.generateKey({ name: "HMAC", hash: { name: t9 } }, true, ["sign", "verify"]), a8 = await r9.exportKey("raw", i9);
        return new Uint8Array(a8);
      })(i8), new Wi(i8));
    case M7.publicKey.aead:
      return qa(Ga(i8), new Vi(i8));
    case M7.publicKey.pqc_mlkem_x25519:
      return xi(e8).then((({ eccSecretKey: e9, eccPublicKey: t9, mlkemSeed: r9, mlkemSecretKey: i9, mlkemPublicKey: a8 }) => ({ privateParams: { eccSecretKey: e9, mlkemSeed: r9, mlkemSecretKey: i9 }, publicParams: { eccPublicKey: t9, mlkemPublicKey: a8 } })));
    case M7.publicKey.pqc_mldsa_ed25519:
      return Li(e8).then((({ eccSecretKey: e9, eccPublicKey: t9, mldsaSeed: r9, mldsaSecretKey: i9, mldsaPublicKey: a8 }) => ({ privateParams: { eccSecretKey: e9, mldsaSeed: r9, mldsaSecretKey: i9 }, publicParams: { eccPublicKey: t9, mldsaPublicKey: a8 } })));
    case M7.publicKey.dsa:
    case M7.publicKey.elgamal:
      throw Error("Unsupported algorithm for key generation.");
    default:
      throw Error("Unknown public key algorithm.");
  }
}
async function qa(e8, t8) {
  const r8 = de3(32);
  return { privateParams: { hashSeed: r8, keyMaterial: e8 }, publicParams: { cipher: t8, digest: await Me(M7.hash.sha256, r8) } };
}
async function Ha(e8, t8, r8) {
  if (!t8 || !r8) throw Error("Missing key parameters");
  switch (e8) {
    case M7.publicKey.rsaEncrypt:
    case M7.publicKey.rsaEncryptSign:
    case M7.publicKey.rsaSign: {
      const { n: e9, e: i8 } = t8, { d: a8, p: n8, q: s8, u: o8 } = r8;
      return (async function(e10, t9, r9, i9, a9, n9) {
        if (e10 = re3(e10), (i9 = re3(i9)) * (a9 = re3(a9)) !== e10) return false;
        const s9 = BigInt(2);
        if (ie3(i9 * (n9 = re3(n9)), a9) !== BigInt(1)) return false;
        t9 = re3(t9), r9 = re3(r9);
        const o9 = ge3(s9, s9 << BigInt(Math.floor(he3(e10) / 3))), c7 = o9 * r9 * t9;
        return !(ie3(c7, i9 - je) !== o9 || ie3(c7, a9 - je) !== o9);
      })(e9, i8, a8, n8, s8, o8);
    }
    case M7.publicKey.dsa: {
      const { p: e9, q: i8, g: a8, y: n8 } = t8, { x: s8 } = r8;
      return (async function(e10, t9, r9, i9, a9) {
        const n9 = re3(e10), s9 = re3(t9), o8 = re3(r9), c7 = re3(i9);
        if (o8 <= Ei || o8 >= n9) return false;
        if (ie3(n9 - Ei, s9) !== Ai) return false;
        if (ne3(o8, s9, n9) !== Ei) return false;
        const u8 = BigInt(he3(s9));
        if (u8 < BigInt(150) || !we3(s9, null, 32)) return false;
        const h7 = re3(a9), l6 = BigInt(2);
        return c7 === ne3(o8, s9 * ge3(l6 << u8 - Ei, l6 << u8) + h7, n9);
      })(e9, i8, a8, n8, s8);
    }
    case M7.publicKey.elgamal: {
      const { p: e9, g: i8, y: a8 } = t8, { x: n8 } = r8;
      return (async function(e10, t9, r9, i9) {
        const a9 = re3(e10), n9 = re3(t9), s8 = re3(r9);
        if (n9 <= Xe || n9 >= a9) return false;
        const o8 = BigInt(he3(a9));
        if (o8 < BigInt(1023)) return false;
        if (ne3(n9, a9 - Xe, a9) !== Xe) return false;
        let c7 = n9, u8 = BigInt(1);
        const h7 = BigInt(2), l6 = h7 << BigInt(17);
        for (; u8 < l6; ) {
          if (c7 = ie3(c7 * n9, a9), c7 === Xe) return false;
          u8++;
        }
        const y8 = re3(i9), p5 = ge3(h7 << o8 - Xe, h7 << o8);
        return s8 === ne3(n9, (a9 - Xe) * p5 + y8, a9);
      })(e9, i8, a8, n8);
    }
    case M7.publicKey.ecdsa:
    case M7.publicKey.ecdh: {
      const i8 = Ki[M7.read(M7.publicKey, e8)], { oid: a8, Q: n8 } = t8, { d: s8 } = r8;
      return i8.validateParams(a8, n8, s8);
    }
    case M7.publicKey.eddsaLegacy: {
      const { Q: e9, oid: i8 } = t8, { seed: a8 } = r8;
      return li(i8, e9, a8);
    }
    case M7.publicKey.ed25519:
    case M7.publicKey.ed448: {
      const { A: i8 } = t8, { seed: a8 } = r8;
      return pt3(e8, i8, a8);
    }
    case M7.publicKey.x25519:
    case M7.publicKey.x448: {
      const { A: i8 } = t8, { k: a8 } = r8;
      return Br(e8, i8, a8);
    }
    case M7.publicKey.hmac: {
      const { cipher: e9, digest: i8 } = t8, { hashSeed: a8, keyMaterial: n8 } = r8;
      return Le2(e9.getValue()) === n8.length && _5.equalsUint8Array(i8, await Me(M7.hash.sha256, a8));
    }
    case M7.publicKey.aead: {
      const { cipher: e9, digest: i8 } = t8, { hashSeed: a8, keyMaterial: n8 } = r8, { keySize: s8 } = Pr(e9.getValue());
      return s8 === n8.length && _5.equalsUint8Array(i8, await Me(M7.hash.sha256, a8));
    }
    case M7.publicKey.pqc_mlkem_x25519: {
      const { eccSecretKey: i8, mlkemSeed: a8 } = r8, { eccPublicKey: n8, mlkemPublicKey: s8 } = t8;
      return Bi(e8, n8, i8, s8, a8);
    }
    case M7.publicKey.pqc_mldsa_ed25519: {
      const { eccSecretKey: i8, mldsaSeed: a8 } = r8, { eccPublicKey: n8, mldsaPublicKey: s8 } = t8;
      return Ri(e8, n8, i8, s8, a8);
    }
    default:
      throw Error("Unknown public key algorithm.");
  }
}
function Ga(e8) {
  const { keySize: t8 } = Pr(e8);
  return de3(t8);
}
function Va(e8) {
  try {
    e8.getName();
  } catch {
    throw new st3("Unknown curve OID");
  }
}
function Wa(e8, t8) {
  switch (e8) {
    case M7.publicKey.ecdsa:
    case M7.publicKey.ecdh:
    case M7.publicKey.eddsaLegacy:
      return new $r(t8).payloadSize;
    case M7.publicKey.ed25519:
    case M7.publicKey.ed448:
      return dt3(e8);
    case M7.publicKey.x25519:
    case M7.publicKey.x448:
      return Fr(e8);
    default:
      throw Error("Unknown elliptic algo");
  }
}
async function $a(e8, t8, r8, i8, a8, n8, s8) {
  switch (e8) {
    case M7.publicKey.rsaEncryptSign:
    case M7.publicKey.rsaEncrypt:
    case M7.publicKey.rsaSign: {
      const { n: e9, e: a9 } = i8;
      return He(t8, n8, _5.leftPad(r8.s, e9.length), e9, a9, s8);
    }
    case M7.publicKey.dsa: {
      const { g: e9, p: t9, q: a9, y: n9 } = i8, { r: o8, s: c7 } = r8;
      return (async function(e10, t10, r9, i9, a10, n10, s9, o9) {
        if (t10 = re3(t10), r9 = re3(r9), n10 = re3(n10), s9 = re3(s9), a10 = re3(a10), o9 = re3(o9), t10 <= Ai || t10 >= s9 || r9 <= Ai || r9 >= s9) return _5.printDebug("invalid DSA Signature"), false;
        const c8 = ie3(re3(i9.subarray(0, le3(s9))), s9), u8 = oe3(r9, s9);
        if (u8 === Ai) return _5.printDebug("invalid DSA Signature"), false;
        a10 = ie3(a10, n10), o9 = ie3(o9, n10);
        const h7 = ie3(c8 * u8, s9), l6 = ie3(t10 * u8, s9);
        return ie3(ie3(ne3(a10, h7, n10) * ne3(o9, l6, n10), n10), s9) === t10;
      })(0, o8, c7, s8, e9, t9, a9, n9);
    }
    case M7.publicKey.ecdsa: {
      const { oid: e9, Q: a9 } = i8, o8 = new $r(e9).payloadSize;
      return si(e9, t8, { r: _5.leftPad(r8.r, o8), s: _5.leftPad(r8.s, o8) }, n8, a9, s8);
    }
    case M7.publicKey.eddsaLegacy: {
      if (Le2(t8) < Le2(M7.hash.sha256)) throw Error("Hash algorithm too weak for EdDSALegacy.");
      const { oid: e9, Q: a9 } = i8, n9 = new $r(e9).payloadSize;
      return hi(e9, 0, { r: _5.leftPad(r8.r, n9), s: _5.leftPad(r8.s, n9) }, 0, a9, s8);
    }
    case M7.publicKey.ed25519:
    case M7.publicKey.ed448: {
      if (Le2(t8) < Le2(gt3(e8))) throw Error("Hash algorithm too weak for EdDSA.");
      const { A: a9 } = i8;
      return yt3(e8, 0, r8, 0, a9, s8);
    }
    case M7.publicKey.hmac: {
      if (!a8) throw Error("Cannot verify HMAC signature with symmetric key missing private parameters");
      const { cipher: e9 } = i8, { keyMaterial: t9 } = a8;
      return (async function(e10, t10, r9, i9) {
        if (!Si.has(e10)) throw Error("Unsupported hash algorithm.");
        const a9 = M7.read(M7.webHash, e10), n9 = Pi || Ui.webcrypto.subtle, s9 = await n9.importKey("raw", t10, { name: "HMAC", hash: { name: a9 } }, false, ["verify"]);
        return n9.verify("HMAC", s9, r9, i9);
      })(e9.getValue(), t9, r8.mac.data, s8);
    }
    case M7.publicKey.pqc_mldsa_ed25519: {
      if (!Ni(e8, t8)) throw Error("Unexpected hash algorithm for PQC signature: digest size too short");
      const { eccPublicKey: a9, mldsaPublicKey: n9 } = i8;
      return _i(e8, 0, a9, n9, s8, r8);
    }
    default:
      throw Error("Unknown signature algorithm.");
  }
}
async function Qa(e8, t8, r8, i8, a8, n8) {
  if (!r8 || !i8) throw Error("Missing key parameters");
  switch (e8) {
    case M7.publicKey.rsaEncryptSign:
    case M7.publicKey.rsaEncrypt:
    case M7.publicKey.rsaSign: {
      const { n: e9, e: s8 } = r8, { d: o8, p: c7, q: u8, u: h7 } = i8;
      return { s: await qe2(t8, a8, e9, s8, o8, c7, u8, h7, n8) };
    }
    case M7.publicKey.dsa: {
      const { g: e9, p: t9, q: a9 } = r8, { x: s8 } = i8;
      return (async function(e10, t10, r9, i9, a10, n9) {
        const s9 = BigInt(0);
        let o8, c7, u8, h7;
        i9 = re3(i9), a10 = re3(a10), r9 = re3(r9), n9 = re3(n9), r9 = ie3(r9, i9), n9 = ie3(n9, a10);
        const l6 = ie3(re3(t10.subarray(0, le3(a10))), a10);
        for (; ; ) {
          if (o8 = ge3(Ei, a10), c7 = ie3(ne3(r9, o8, i9), a10), c7 === s9) continue;
          const e11 = ie3(n9 * c7, a10);
          if (h7 = ie3(l6 + e11, a10), u8 = ie3(oe3(o8, a10) * h7, a10), u8 !== s9) break;
        }
        return { r: ye3(c7, "be", le3(i9)), s: ye3(u8, "be", le3(i9)) };
      })(0, n8, e9, t9, a9, s8);
    }
    case M7.publicKey.elgamal:
      throw Error("Signing with Elgamal is not defined in the OpenPGP standard.");
    case M7.publicKey.ecdsa: {
      const { oid: e9, Q: s8 } = r8, { d: o8 } = i8;
      return ni(e9, t8, a8, s8, o8, n8);
    }
    case M7.publicKey.eddsaLegacy: {
      if (Le2(t8) < Le2(M7.hash.sha256)) throw Error("Hash algorithm too weak for EdDSALegacy.");
      const { oid: e9, Q: a9 } = r8, { seed: s8 } = i8;
      return ui(e9, 0, 0, a9, s8, n8);
    }
    case M7.publicKey.ed25519:
    case M7.publicKey.ed448: {
      if (Le2(t8) < Le2(gt3(e8))) throw Error("Hash algorithm too weak for EdDSA.");
      const { A: a9 } = r8, { seed: s8 } = i8;
      return lt3(e8, 0, 0, a9, s8, n8);
    }
    case M7.publicKey.hmac: {
      const { cipher: e9 } = r8, { keyMaterial: t9 } = i8, a9 = await (async function(e10, t10, r9) {
        if (!Si.has(e10)) throw Error("Unsupported hash algorithm.");
        const i9 = M7.read(M7.webHash, e10), a10 = Pi || Ui.webcrypto.subtle, n9 = await a10.importKey("raw", t10, { name: "HMAC", hash: { name: i9 } }, false, ["sign"]), s8 = await a10.sign("HMAC", n9, r9);
        return new Uint8Array(s8);
      })(e9.getValue(), t9, n8);
      return { mac: new qi(a9) };
    }
    case M7.publicKey.pqc_mldsa_ed25519: {
      if (!Ni(e8, t8)) throw Error("Unexpected hash algorithm for PQC signature: digest size too short");
      const { eccPublicKey: a9 } = r8, { eccSecretKey: s8, mldsaSecretKey: o8 } = i8;
      return Fi(e8, 0, s8, a9, o8, n8);
    }
    default:
      throw Error("Unknown signature algorithm.");
  }
}
Fa.getNonce = function(e8, t8) {
  const r8 = e8.slice();
  for (let e9 = 0; e9 < t8.length; e9++) r8[4 + e9] ^= t8[e9];
  return r8;
}, Fa.blockLength = 16, Fa.ivLength = 12, Fa.tagLength = Ma;
var Xa = class _Xa extends Error {
  constructor(...e8) {
    super(...e8), Error.captureStackTrace && Error.captureStackTrace(this, _Xa), this.name = "Argon2OutOfMemoryError";
  }
};
var Ya;
var Za;
var Ja = 2 << 19;
var en = class _en {
  static get ARGON2_WASM_MEMORY_THRESHOLD_RELOAD() {
    return Ja;
  }
  static set ARGON2_WASM_MEMORY_THRESHOLD_RELOAD(e8) {
    Ja = e8;
  }
  static reloadWasmModule() {
    Ya && (Za = Ya(), Za.catch((() => {
    })));
  }
  constructor(e8 = L4) {
    const { passes: t8, parallelism: r8, memoryExponent: i8 } = e8.s2kArgon2Params;
    this.type = "argon2", this.salt = null, this.t = t8, this.p = r8, this.encodedM = i8;
  }
  generateSalt() {
    this.salt = de3(16);
  }
  read(e8) {
    let t8 = 0;
    return this.salt = e8.subarray(t8, t8 + 16), t8 += 16, this.t = e8[t8++], this.p = e8[t8++], this.encodedM = e8[t8++], t8;
  }
  write() {
    const e8 = [new Uint8Array([M7.write(M7.s2k, this.type)]), this.salt, new Uint8Array([this.t, this.p, this.encodedM])];
    return _5.concatUint8Array(e8);
  }
  async produceKey(e8, t8, r8) {
    if (r8.maxArgon2MemoryExponent > 30) throw new Xa("'config.maxArgon2MemoryExponent' exceeds the max allowed value of 30");
    if (this.encodedM > r8.maxArgon2MemoryExponent) throw new Xa("Argon2 required memory exceeds `config.maxArgon2MemoryExponent`");
    const i8 = 1 << this.encodedM;
    try {
      Ya = Ya || (await Promise.resolve().then(() => (init_argon2id_min(), argon2id_min_exports))).default, Za = Za || Ya();
      const r9 = await Za, a8 = r9({ version: 19, type: 2, password: _5.encodeUTF8(e8), salt: this.salt, tagLength: t8, memorySize: i8, parallelism: this.p, passes: this.t });
      return i8 > _en.ARGON2_WASM_MEMORY_THRESHOLD_RELOAD && _en.reloadWasmModule(), a8;
    } catch (e9) {
      throw e9.message && (e9.message.includes("Unable to grow instance memory") || e9.message.includes("failed to grow memory") || e9.message.includes("WebAssembly.Memory.grow") || e9.message.includes("Out of memory")) ? new Xa("Could not allocate required memory for Argon2") : e9;
    }
  }
};
var tn = class {
  constructor(e8, t8 = L4) {
    this.algorithm = M7.hash.sha256, this.type = M7.read(M7.s2k, e8), this.c = t8.s2kIterationCountByte, this.salt = null;
  }
  generateSalt() {
    switch (this.type) {
      case "salted":
      case "iterated":
        this.salt = de3(8);
    }
  }
  getCount() {
    return 16 + (15 & this.c) << 6 + (this.c >> 4);
  }
  read(e8) {
    let t8 = 0;
    switch (this.algorithm = e8[t8++], this.type) {
      case "simple":
        break;
      case "salted":
        this.salt = e8.subarray(t8, t8 + 8), t8 += 8;
        break;
      case "iterated":
        this.salt = e8.subarray(t8, t8 + 8), t8 += 8, this.c = e8[t8++];
        break;
      case "gnu":
        if ("GNU" !== _5.uint8ArrayToString(e8.subarray(t8, t8 + 3))) throw new st3("Unknown s2k type.");
        t8 += 3;
        if (1001 !== 1e3 + e8[t8++]) throw new st3("Unknown s2k gnu protection mode.");
        this.type = "gnu-dummy";
        break;
      default:
        throw new st3("Unknown s2k type.");
    }
    return t8;
  }
  write() {
    if ("gnu-dummy" === this.type) return new Uint8Array([101, 0, ..._5.stringToUint8Array("GNU"), 1]);
    const e8 = [new Uint8Array([M7.write(M7.s2k, this.type), this.algorithm])];
    switch (this.type) {
      case "simple":
        break;
      case "salted":
        e8.push(this.salt);
        break;
      case "iterated":
        e8.push(this.salt), e8.push(new Uint8Array([this.c]));
        break;
      case "gnu":
        throw Error("GNU s2k type not supported.");
      default:
        throw Error("Unknown s2k type.");
    }
    return _5.concatUint8Array(e8);
  }
  async produceKey(e8, t8, r8) {
    e8 = _5.encodeUTF8(e8);
    const i8 = [];
    let a8 = 0, n8 = 0;
    for (; a8 < t8; ) {
      let t9;
      switch (this.type) {
        case "simple":
          t9 = _5.concatUint8Array([new Uint8Array(n8), e8]);
          break;
        case "salted":
          t9 = _5.concatUint8Array([new Uint8Array(n8), this.salt, e8]);
          break;
        case "iterated": {
          const r10 = _5.concatUint8Array([this.salt, e8]);
          let i9 = r10.length;
          const a9 = Math.max(this.getCount(), i9);
          t9 = new Uint8Array(n8 + a9), t9.set(r10, n8);
          for (let e9 = n8 + i9; e9 < a9; e9 += i9, i9 *= 2) t9.copyWithin(e9, n8, e9);
          break;
        }
        case "gnu":
          throw Error("GNU s2k type not supported.");
        default:
          throw Error("Unknown s2k type.");
      }
      const r9 = await Me(this.algorithm, t9);
      i8.push(r9), a8 += r9.length, n8++;
    }
    return _5.concatUint8Array(i8).subarray(0, t8);
  }
};
var rn = /* @__PURE__ */ new Set([M7.s2k.argon2, M7.s2k.iterated]);
function an(e8, t8 = L4) {
  switch (e8) {
    case M7.s2k.argon2:
      return new en(t8);
    case M7.s2k.iterated:
    case M7.s2k.gnu:
    case M7.s2k.salted:
    case M7.s2k.simple:
      return new tn(e8, t8);
    default:
      throw new st3("Unsupported S2K type");
  }
}
function nn(e8) {
  const { s2kType: t8 } = e8;
  if (!rn.has(t8)) throw Error("The provided `config.s2kType` value is not allowed");
  return an(t8, e8);
}
var sn = Uint8Array;
var on = Uint16Array;
var cn = Int32Array;
var un = new sn([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]);
var hn = new sn([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]);
var ln = new sn([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var yn = function(e8, t8) {
  for (var r8 = new on(31), i8 = 0; i8 < 31; ++i8) r8[i8] = t8 += 1 << e8[i8 - 1];
  var a8 = new cn(r8[30]);
  for (i8 = 1; i8 < 30; ++i8) for (var n8 = r8[i8]; n8 < r8[i8 + 1]; ++n8) a8[n8] = n8 - r8[i8] << 5 | i8;
  return { b: r8, r: a8 };
};
var pn = yn(un, 2);
var dn = pn.b;
var gn = pn.r;
dn[28] = 258, gn[258] = 28;
for (mn = yn(hn, 0), fn = mn.b, wn = mn.r, bn = new on(32768), kn = 0; kn < 32768; ++kn) {
  vn = (43690 & kn) >> 1 | (21845 & kn) << 1;
  vn = (61680 & (vn = (52428 & vn) >> 2 | (13107 & vn) << 2)) >> 4 | (3855 & vn) << 4, bn[kn] = ((65280 & vn) >> 8 | (255 & vn) << 8) >> 1;
}
var vn;
var mn;
var fn;
var wn;
var bn;
var kn;
var Kn = function(e8, t8, r8) {
  for (var i8 = e8.length, a8 = 0, n8 = new on(t8); a8 < i8; ++a8) e8[a8] && ++n8[e8[a8] - 1];
  var s8, o8 = new on(t8);
  for (a8 = 1; a8 < t8; ++a8) o8[a8] = o8[a8 - 1] + n8[a8 - 1] << 1;
  if (r8) {
    s8 = new on(1 << t8);
    var c7 = 15 - t8;
    for (a8 = 0; a8 < i8; ++a8) if (e8[a8]) for (var u8 = a8 << 4 | e8[a8], h7 = t8 - e8[a8], l6 = o8[e8[a8] - 1]++ << h7, y8 = l6 | (1 << h7) - 1; l6 <= y8; ++l6) s8[bn[l6] >> c7] = u8;
  } else for (s8 = new on(i8), a8 = 0; a8 < i8; ++a8) e8[a8] && (s8[a8] = bn[o8[e8[a8] - 1]++] >> 15 - e8[a8]);
  return s8;
};
var An = new sn(288);
for (kn = 0; kn < 144; ++kn) An[kn] = 8;
for (kn = 144; kn < 256; ++kn) An[kn] = 9;
for (kn = 256; kn < 280; ++kn) An[kn] = 7;
for (kn = 280; kn < 288; ++kn) An[kn] = 8;
var En = new sn(32);
for (kn = 0; kn < 32; ++kn) En[kn] = 5;
var Sn = /* @__PURE__ */ Kn(An, 9, 0);
var Pn = /* @__PURE__ */ Kn(An, 9, 1);
var Un = /* @__PURE__ */ Kn(En, 5, 0);
var Dn = /* @__PURE__ */ Kn(En, 5, 1);
var xn = function(e8) {
  for (var t8 = e8[0], r8 = 1; r8 < e8.length; ++r8) e8[r8] > t8 && (t8 = e8[r8]);
  return t8;
};
var Cn = function(e8, t8, r8) {
  var i8 = t8 / 8 | 0;
  return (e8[i8] | e8[i8 + 1] << 8) >> (7 & t8) & r8;
};
var In = function(e8, t8) {
  var r8 = t8 / 8 | 0;
  return (e8[r8] | e8[r8 + 1] << 8 | e8[r8 + 2] << 16) >> (7 & t8);
};
var Tn = function(e8) {
  return (e8 + 7) / 8 | 0;
};
var Bn = function(e8, t8, r8) {
  return (null == t8 || t8 < 0) && (t8 = 0), (null == r8 || r8 > e8.length) && (r8 = e8.length), new sn(e8.subarray(t8, r8));
};
var Mn = ["unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler", , "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data"];
var Ln = function(e8, t8, r8) {
  var i8 = Error(t8 || Mn[e8]);
  if (i8.code = e8, Error.captureStackTrace && Error.captureStackTrace(i8, Ln), !r8) throw i8;
  return i8;
};
var Fn = function(e8, t8, r8) {
  r8 <<= 7 & t8;
  var i8 = t8 / 8 | 0;
  e8[i8] |= r8, e8[i8 + 1] |= r8 >> 8;
};
var _n = function(e8, t8, r8) {
  r8 <<= 7 & t8;
  var i8 = t8 / 8 | 0;
  e8[i8] |= r8, e8[i8 + 1] |= r8 >> 8, e8[i8 + 2] |= r8 >> 16;
};
var Nn = function(e8, t8) {
  for (var r8 = [], i8 = 0; i8 < e8.length; ++i8) e8[i8] && r8.push({ s: i8, f: e8[i8] });
  var a8 = r8.length, n8 = r8.slice();
  if (!a8) return { t: Gn, l: 0 };
  if (1 == a8) {
    var s8 = new sn(r8[0].s + 1);
    return s8[r8[0].s] = 1, { t: s8, l: 1 };
  }
  r8.sort((function(e9, t9) {
    return e9.f - t9.f;
  })), r8.push({ s: -1, f: 25001 });
  var o8 = r8[0], c7 = r8[1], u8 = 0, h7 = 1, l6 = 2;
  for (r8[0] = { s: -1, f: o8.f + c7.f, l: o8, r: c7 }; h7 != a8 - 1; ) o8 = r8[r8[u8].f < r8[l6].f ? u8++ : l6++], c7 = r8[u8 != h7 && r8[u8].f < r8[l6].f ? u8++ : l6++], r8[h7++] = { s: -1, f: o8.f + c7.f, l: o8, r: c7 };
  var y8 = n8[0].s;
  for (i8 = 1; i8 < a8; ++i8) n8[i8].s > y8 && (y8 = n8[i8].s);
  var p5 = new on(y8 + 1), d6 = Rn(r8[h7 - 1], p5, 0);
  if (d6 > t8) {
    i8 = 0;
    var g7 = 0, m6 = d6 - t8, f8 = 1 << m6;
    for (n8.sort((function(e9, t9) {
      return p5[t9.s] - p5[e9.s] || e9.f - t9.f;
    })); i8 < a8; ++i8) {
      var w8 = n8[i8].s;
      if (!(p5[w8] > t8)) break;
      g7 += f8 - (1 << d6 - p5[w8]), p5[w8] = t8;
    }
    for (g7 >>= m6; g7 > 0; ) {
      var b6 = n8[i8].s;
      p5[b6] < t8 ? g7 -= 1 << t8 - p5[b6]++ - 1 : ++i8;
    }
    for (; i8 >= 0 && g7; --i8) {
      var k7 = n8[i8].s;
      p5[k7] == t8 && (--p5[k7], ++g7);
    }
    d6 = t8;
  }
  return { t: new sn(p5), l: d6 };
};
var Rn = function(e8, t8, r8) {
  return -1 == e8.s ? Math.max(Rn(e8.l, t8, r8 + 1), Rn(e8.r, t8, r8 + 1)) : t8[e8.s] = r8;
};
var zn = function(e8) {
  for (var t8 = e8.length; t8 && !e8[--t8]; ) ;
  for (var r8 = new on(++t8), i8 = 0, a8 = e8[0], n8 = 1, s8 = function(e9) {
    r8[i8++] = e9;
  }, o8 = 1; o8 <= t8; ++o8) if (e8[o8] == a8 && o8 != t8) ++n8;
  else {
    if (!a8 && n8 > 2) {
      for (; n8 > 138; n8 -= 138) s8(32754);
      n8 > 2 && (s8(n8 > 10 ? n8 - 11 << 5 | 28690 : n8 - 3 << 5 | 12305), n8 = 0);
    } else if (n8 > 3) {
      for (s8(a8), --n8; n8 > 6; n8 -= 6) s8(8304);
      n8 > 2 && (s8(n8 - 3 << 5 | 8208), n8 = 0);
    }
    for (; n8--; ) s8(a8);
    n8 = 1, a8 = e8[o8];
  }
  return { c: r8.subarray(0, i8), n: t8 };
};
var On = function(e8, t8) {
  for (var r8 = 0, i8 = 0; i8 < t8.length; ++i8) r8 += e8[i8] * t8[i8];
  return r8;
};
var jn = function(e8, t8, r8) {
  var i8 = r8.length, a8 = Tn(t8 + 2);
  e8[a8] = 255 & i8, e8[a8 + 1] = i8 >> 8, e8[a8 + 2] = 255 ^ e8[a8], e8[a8 + 3] = 255 ^ e8[a8 + 1];
  for (var n8 = 0; n8 < i8; ++n8) e8[a8 + n8 + 4] = r8[n8];
  return 8 * (a8 + 4 + i8);
};
var qn = function(e8, t8, r8, i8, a8, n8, s8, o8, c7, u8, h7) {
  Fn(t8, h7++, r8), ++a8[256];
  for (var l6 = Nn(a8, 15), y8 = l6.t, p5 = l6.l, d6 = Nn(n8, 15), g7 = d6.t, m6 = d6.l, f8 = zn(y8), w8 = f8.c, b6 = f8.n, k7 = zn(g7), v7 = k7.c, K7 = k7.n, A8 = new on(19), E8 = 0; E8 < w8.length; ++E8) ++A8[31 & w8[E8]];
  for (E8 = 0; E8 < v7.length; ++E8) ++A8[31 & v7[E8]];
  for (var S7 = Nn(A8, 7), P6 = S7.t, U8 = S7.l, D8 = 19; D8 > 4 && !P6[ln[D8 - 1]]; --D8) ;
  var x7, C8, I8, T6, B7 = u8 + 5 << 3, M8 = On(a8, An) + On(n8, En) + s8, L5 = On(a8, y8) + On(n8, g7) + s8 + 14 + 3 * D8 + On(A8, P6) + 2 * A8[16] + 3 * A8[17] + 7 * A8[18];
  if (c7 >= 0 && B7 <= M8 && B7 <= L5) return jn(t8, h7, e8.subarray(c7, c7 + u8));
  if (Fn(t8, h7, 1 + (L5 < M8)), h7 += 2, L5 < M8) {
    x7 = Kn(y8, p5, 0), C8 = y8, I8 = Kn(g7, m6, 0), T6 = g7;
    var F7 = Kn(P6, U8, 0);
    Fn(t8, h7, b6 - 257), Fn(t8, h7 + 5, K7 - 1), Fn(t8, h7 + 10, D8 - 4), h7 += 14;
    for (E8 = 0; E8 < D8; ++E8) Fn(t8, h7 + 3 * E8, P6[ln[E8]]);
    h7 += 3 * D8;
    for (var _6 = [w8, v7], N6 = 0; N6 < 2; ++N6) {
      var R7 = _6[N6];
      for (E8 = 0; E8 < R7.length; ++E8) {
        var z7 = 31 & R7[E8];
        Fn(t8, h7, F7[z7]), h7 += P6[z7], z7 > 15 && (Fn(t8, h7, R7[E8] >> 5 & 127), h7 += R7[E8] >> 12);
      }
    }
  } else x7 = Sn, C8 = An, I8 = Un, T6 = En;
  for (E8 = 0; E8 < o8; ++E8) {
    var O6 = i8[E8];
    if (O6 > 255) {
      _n(t8, h7, x7[(z7 = O6 >> 18 & 31) + 257]), h7 += C8[z7 + 257], z7 > 7 && (Fn(t8, h7, O6 >> 23 & 31), h7 += un[z7]);
      var j7 = 31 & O6;
      _n(t8, h7, I8[j7]), h7 += T6[j7], j7 > 3 && (_n(t8, h7, O6 >> 5 & 8191), h7 += hn[j7]);
    } else _n(t8, h7, x7[O6]), h7 += C8[O6];
  }
  return _n(t8, h7, x7[256]), h7 + C8[256];
};
var Hn = /* @__PURE__ */ new cn([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
var Gn = /* @__PURE__ */ new sn(0);
var Vn = function() {
  var e8 = 1, t8 = 0;
  return { p: function(r8) {
    for (var i8 = e8, a8 = t8, n8 = 0 | r8.length, s8 = 0; s8 != n8; ) {
      for (var o8 = Math.min(s8 + 2655, n8); s8 < o8; ++s8) a8 += i8 += r8[s8];
      i8 = (65535 & i8) + 15 * (i8 >> 16), a8 = (65535 & a8) + 15 * (a8 >> 16);
    }
    e8 = i8, t8 = a8;
  }, d: function() {
    return (255 & (e8 %= 65521)) << 24 | (65280 & e8) << 8 | (255 & (t8 %= 65521)) << 8 | t8 >> 8;
  } };
};
var Wn = function(e8, t8, r8, i8, a8) {
  if (!a8 && (a8 = { l: 1 }, t8.dictionary)) {
    var n8 = t8.dictionary.subarray(-32768), s8 = new sn(n8.length + e8.length);
    s8.set(n8), s8.set(e8, n8.length), e8 = s8, a8.w = n8.length;
  }
  return (function(e9, t9, r9, i9, a9, n9) {
    var s9 = n9.z || e9.length, o8 = new sn(i9 + s9 + 5 * (1 + Math.ceil(s9 / 7e3)) + a9), c7 = o8.subarray(i9, o8.length - a9), u8 = n9.l, h7 = 7 & (n9.r || 0);
    if (t9) {
      h7 && (c7[0] = n9.r >> 3);
      for (var l6 = Hn[t9 - 1], y8 = l6 >> 13, p5 = 8191 & l6, d6 = (1 << r9) - 1, g7 = n9.p || new on(32768), m6 = n9.h || new on(d6 + 1), f8 = Math.ceil(r9 / 3), w8 = 2 * f8, b6 = function(t10) {
        return (e9[t10] ^ e9[t10 + 1] << f8 ^ e9[t10 + 2] << w8) & d6;
      }, k7 = new cn(25e3), v7 = new on(288), K7 = new on(32), A8 = 0, E8 = 0, S7 = n9.i || 0, P6 = 0, U8 = n9.w || 0, D8 = 0; S7 + 2 < s9; ++S7) {
        var x7 = b6(S7), C8 = 32767 & S7, I8 = m6[x7];
        if (g7[C8] = I8, m6[x7] = C8, U8 <= S7) {
          var T6 = s9 - S7;
          if ((A8 > 7e3 || P6 > 24576) && (T6 > 423 || !u8)) {
            h7 = qn(e9, c7, 0, k7, v7, K7, E8, P6, D8, S7 - D8, h7), P6 = A8 = E8 = 0, D8 = S7;
            for (var B7 = 0; B7 < 286; ++B7) v7[B7] = 0;
            for (B7 = 0; B7 < 30; ++B7) K7[B7] = 0;
          }
          var M8 = 2, L5 = 0, F7 = p5, _6 = C8 - I8 & 32767;
          if (T6 > 2 && x7 == b6(S7 - _6)) for (var N6 = Math.min(y8, T6) - 1, R7 = Math.min(32767, S7), z7 = Math.min(258, T6); _6 <= R7 && --F7 && C8 != I8; ) {
            if (e9[S7 + M8] == e9[S7 + M8 - _6]) {
              for (var O6 = 0; O6 < z7 && e9[S7 + O6] == e9[S7 + O6 - _6]; ++O6) ;
              if (O6 > M8) {
                if (M8 = O6, L5 = _6, O6 > N6) break;
                var j7 = Math.min(_6, O6 - 2), q7 = 0;
                for (B7 = 0; B7 < j7; ++B7) {
                  var H7 = S7 - _6 + B7 & 32767, G7 = H7 - g7[H7] & 32767;
                  G7 > q7 && (q7 = G7, I8 = H7);
                }
              }
            }
            _6 += (C8 = I8) - (I8 = g7[C8]) & 32767;
          }
          if (L5) {
            k7[P6++] = 268435456 | gn[M8] << 18 | wn[L5];
            var V6 = 31 & gn[M8], W5 = 31 & wn[L5];
            E8 += un[V6] + hn[W5], ++v7[257 + V6], ++K7[W5], U8 = S7 + M8, ++A8;
          } else k7[P6++] = e9[S7], ++v7[e9[S7]];
        }
      }
      for (S7 = Math.max(S7, U8); S7 < s9; ++S7) k7[P6++] = e9[S7], ++v7[e9[S7]];
      h7 = qn(e9, c7, u8, k7, v7, K7, E8, P6, D8, S7 - D8, h7), u8 || (n9.r = 7 & h7 | c7[h7 / 8 | 0] << 3, h7 -= 7, n9.h = m6, n9.p = g7, n9.i = S7, n9.w = U8);
    } else {
      for (S7 = n9.w || 0; S7 < s9 + u8; S7 += 65535) {
        var $5 = S7 + 65535;
        $5 >= s9 && (c7[h7 / 8 | 0] = u8, $5 = s9), h7 = jn(c7, h7 + 1, e9.subarray(S7, $5));
      }
      n9.i = s9;
    }
    return Bn(o8, 0, i9 + Tn(h7) + a9);
  })(e8, null == t8.level ? 6 : t8.level, null == t8.mem ? a8.l ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(e8.length)))) : 20 : 12 + t8.mem, r8, i8, a8);
};
var $n = function(e8, t8, r8) {
  for (; r8; ++t8) e8[t8] = r8, r8 >>>= 8;
};
var Qn = /* @__PURE__ */ (function() {
  function e8(e9, t8) {
    if ("function" == typeof e9 && (t8 = e9, e9 = {}), this.ondata = t8, this.o = e9 || {}, this.s = { l: 0, i: 32768, w: 32768, z: 32768 }, this.b = new sn(98304), this.o.dictionary) {
      var r8 = this.o.dictionary.subarray(-32768);
      this.b.set(r8, 32768 - r8.length), this.s.i = 32768 - r8.length;
    }
  }
  return e8.prototype.p = function(e9, t8) {
    this.ondata(Wn(e9, this.o, 0, 0, this.s), t8);
  }, e8.prototype.push = function(e9, t8) {
    this.ondata || Ln(5), this.s.l && Ln(4);
    var r8 = e9.length + this.s.z;
    if (r8 > this.b.length) {
      if (r8 > 2 * this.b.length - 32768) {
        var i8 = new sn(-32768 & r8);
        i8.set(this.b.subarray(0, this.s.z)), this.b = i8;
      }
      var a8 = this.b.length - this.s.z;
      this.b.set(e9.subarray(0, a8), this.s.z), this.s.z = this.b.length, this.p(this.b, false), this.b.set(this.b.subarray(-32768)), this.b.set(e9.subarray(a8), 32768), this.s.z = e9.length - a8 + 32768, this.s.i = 32766, this.s.w = 32768;
    } else this.b.set(e9, this.s.z), this.s.z += e9.length;
    this.s.l = 1 & t8, (this.s.z > this.s.w + 8191 || t8) && (this.p(this.b, t8 || false), this.s.w = this.s.i, this.s.i -= 2), t8 && (this.s = this.o = {}, this.b = Gn);
  }, e8.prototype.flush = function(e9) {
    if (this.ondata || Ln(5), this.s.l && Ln(4), this.p(this.b, false), this.s.w = this.s.i, this.s.i -= 2, e9) {
      var t8 = new sn(6);
      t8[0] = this.s.r >> 3;
      var r8 = jn(t8, this.s.r, Gn);
      this.s.r = 0, this.ondata(t8.subarray(0, r8 >> 3), false);
    }
  }, e8;
})();
var Xn = /* @__PURE__ */ (function() {
  function e8(e9, t8) {
    "function" == typeof e9 && (t8 = e9, e9 = {}), this.ondata = t8;
    var r8 = e9 && e9.dictionary && e9.dictionary.subarray(-32768);
    this.s = { i: 0, b: r8 ? r8.length : 0 }, this.o = new sn(32768), this.p = new sn(0), r8 && this.o.set(r8);
  }
  return e8.prototype.e = function(e9) {
    if (this.ondata || Ln(5), this.d && Ln(4), this.p.length) {
      if (e9.length) {
        var t8 = new sn(this.p.length + e9.length);
        t8.set(this.p), t8.set(e9, this.p.length), this.p = t8;
      }
    } else this.p = e9;
  }, e8.prototype.c = function(e9) {
    this.s.i = +(this.d = e9 || false);
    var t8 = this.s.b, r8 = (function(e10, t9, r9, i8) {
      var a8 = e10.length;
      if (!a8 || t9.f && !t9.l) return r9 || new sn(0);
      var n8 = !r9, s8 = n8 || 2 != t9.i, o8 = t9.i;
      n8 && (r9 = new sn(3 * a8));
      var c7 = function(e11) {
        var t10 = r9.length;
        if (e11 > t10) {
          var i9 = new sn(Math.max(2 * t10, e11));
          i9.set(r9), r9 = i9;
        }
      }, u8 = t9.f || 0, h7 = t9.p || 0, l6 = t9.b || 0, y8 = t9.l, p5 = t9.d, d6 = t9.m, g7 = t9.n, m6 = 8 * a8;
      do {
        if (!y8) {
          u8 = Cn(e10, h7, 1);
          var f8 = Cn(e10, h7 + 1, 3);
          if (h7 += 3, !f8) {
            var w8 = e10[(x7 = Tn(h7) + 4) - 4] | e10[x7 - 3] << 8, b6 = x7 + w8;
            if (b6 > a8) {
              o8 && Ln(0);
              break;
            }
            s8 && c7(l6 + w8), r9.set(e10.subarray(x7, b6), l6), t9.b = l6 += w8, t9.p = h7 = 8 * b6, t9.f = u8;
            continue;
          }
          if (1 == f8) y8 = Pn, p5 = Dn, d6 = 9, g7 = 5;
          else if (2 == f8) {
            var k7 = Cn(e10, h7, 31) + 257, v7 = Cn(e10, h7 + 10, 15) + 4, K7 = k7 + Cn(e10, h7 + 5, 31) + 1;
            h7 += 14;
            for (var A8 = new sn(K7), E8 = new sn(19), S7 = 0; S7 < v7; ++S7) E8[ln[S7]] = Cn(e10, h7 + 3 * S7, 7);
            h7 += 3 * v7;
            var P6 = xn(E8), U8 = (1 << P6) - 1, D8 = Kn(E8, P6, 1);
            for (S7 = 0; S7 < K7; ) {
              var x7, C8 = D8[Cn(e10, h7, U8)];
              if (h7 += 15 & C8, (x7 = C8 >> 4) < 16) A8[S7++] = x7;
              else {
                var I8 = 0, T6 = 0;
                for (16 == x7 ? (T6 = 3 + Cn(e10, h7, 3), h7 += 2, I8 = A8[S7 - 1]) : 17 == x7 ? (T6 = 3 + Cn(e10, h7, 7), h7 += 3) : 18 == x7 && (T6 = 11 + Cn(e10, h7, 127), h7 += 7); T6--; ) A8[S7++] = I8;
              }
            }
            var B7 = A8.subarray(0, k7), M8 = A8.subarray(k7);
            d6 = xn(B7), g7 = xn(M8), y8 = Kn(B7, d6, 1), p5 = Kn(M8, g7, 1);
          } else Ln(1);
          if (h7 > m6) {
            o8 && Ln(0);
            break;
          }
        }
        s8 && c7(l6 + 131072);
        for (var L5 = (1 << d6) - 1, F7 = (1 << g7) - 1, _6 = h7; ; _6 = h7) {
          var N6 = (I8 = y8[In(e10, h7) & L5]) >> 4;
          if ((h7 += 15 & I8) > m6) {
            o8 && Ln(0);
            break;
          }
          if (I8 || Ln(2), N6 < 256) r9[l6++] = N6;
          else {
            if (256 == N6) {
              _6 = h7, y8 = null;
              break;
            }
            var R7 = N6 - 254;
            if (N6 > 264) {
              var z7 = un[S7 = N6 - 257];
              R7 = Cn(e10, h7, (1 << z7) - 1) + dn[S7], h7 += z7;
            }
            var O6 = p5[In(e10, h7) & F7], j7 = O6 >> 4;
            if (O6 || Ln(3), h7 += 15 & O6, M8 = fn[j7], j7 > 3 && (z7 = hn[j7], M8 += In(e10, h7) & (1 << z7) - 1, h7 += z7), h7 > m6) {
              o8 && Ln(0);
              break;
            }
            s8 && c7(l6 + 131072);
            var q7 = l6 + R7;
            if (l6 < M8) {
              var H7 = 0 - M8, G7 = Math.min(M8, q7);
              for (H7 + l6 < 0 && Ln(3); l6 < G7; ++l6) r9[l6] = i8[H7 + l6];
            }
            for (; l6 < q7; ++l6) r9[l6] = r9[l6 - M8];
          }
        }
        t9.l = y8, t9.p = _6, t9.b = l6, t9.f = u8, y8 && (u8 = 1, t9.m = d6, t9.d = p5, t9.n = g7);
      } while (!u8);
      return l6 != r9.length && n8 ? Bn(r9, 0, l6) : r9.subarray(0, l6);
    })(this.p, this.s, this.o);
    this.ondata(Bn(r8, t8, this.s.b), this.d), this.o = Bn(r8, this.s.b - 32768), this.s.b = this.o.length, this.p = Bn(this.p, this.s.p / 8 | 0), this.s.p &= 7;
  }, e8.prototype.push = function(e9, t8) {
    this.e(e9), this.c(t8);
  }, e8;
})();
var Yn = /* @__PURE__ */ (function() {
  function e8(e9, t8) {
    this.c = Vn(), this.v = 1, Qn.call(this, e9, t8);
  }
  return e8.prototype.push = function(e9, t8) {
    this.c.p(e9), Qn.prototype.push.call(this, e9, t8);
  }, e8.prototype.p = function(e9, t8) {
    var r8 = Wn(e9, this.o, this.v && (this.o.dictionary ? 6 : 2), t8 && 4, this.s);
    this.v && ((function(e10, t9) {
      var r9 = t9.level, i8 = 0 == r9 ? 0 : r9 < 6 ? 1 : 9 == r9 ? 3 : 2;
      if (e10[0] = 120, e10[1] = i8 << 6 | (t9.dictionary && 32), e10[1] |= 31 - (e10[0] << 8 | e10[1]) % 31, t9.dictionary) {
        var a8 = Vn();
        a8.p(t9.dictionary), $n(e10, 2, a8.d());
      }
    })(r8, this.o), this.v = 0), t8 && $n(r8, r8.length - 4, this.c.d()), this.ondata(r8, t8);
  }, e8.prototype.flush = function(e9) {
    Qn.prototype.flush.call(this, e9);
  }, e8;
})();
var Zn = /* @__PURE__ */ (function() {
  function e8(e9, t8) {
    Xn.call(this, e9, t8), this.v = e9 && e9.dictionary ? 2 : 1;
  }
  return e8.prototype.push = function(e9, t8) {
    if (Xn.prototype.e.call(this, e9), this.v) {
      if (this.p.length < 6 && !t8) return;
      this.p = this.p.subarray((r8 = this.p, i8 = this.v - 1, (8 != (15 & r8[0]) || r8[0] >> 4 > 7 || (r8[0] << 8 | r8[1]) % 31) && Ln(6, "invalid zlib data"), (r8[1] >> 5 & 1) == +!i8 && Ln(6, "invalid zlib data: " + (32 & r8[1] ? "need" : "unexpected") + " dictionary"), 2 + (r8[1] >> 3 & 4))), this.v = 0;
    }
    var r8, i8;
    t8 && (this.p.length < 4 && Ln(6, "invalid zlib data"), this.p = this.p.subarray(0, -4)), Xn.prototype.c.call(this, t8);
  }, e8;
})();
var Jn = "undefined" != typeof TextDecoder && /* @__PURE__ */ new TextDecoder();
try {
  Jn.decode(Gn, { stream: true });
} catch (e8) {
}
var es = class {
  static get tag() {
    return M7.packet.literalData;
  }
  constructor(e8 = /* @__PURE__ */ new Date()) {
    this.format = M7.literal.utf8, this.date = _5.normalizeDate(e8), this.text = null, this.data = null, this.filename = "";
  }
  setText(e8, t8 = M7.literal.utf8) {
    this.format = t8, this.text = e8, this.data = null;
  }
  getText(e8 = false) {
    return (null === this.text || _5.isStream(this.text)) && (this.text = _5.decodeUTF8(_5.nativeEOL(this.getBytes(e8)))), this.text;
  }
  setBytes(e8, t8) {
    this.format = t8, this.data = e8, this.text = null;
  }
  getBytes(e8 = false) {
    return null === this.data && (this.data = _5.canonicalizeEOL(_5.encodeUTF8(this.text))), e8 ? S6(this.data) : this.data;
  }
  setFilename(e8) {
    this.filename = e8;
  }
  getFilename() {
    return this.filename;
  }
  async read(e8) {
    await A7(e8, (async (e9) => {
      const t8 = await e9.readByte(), r8 = await e9.readByte();
      this.filename = _5.decodeUTF8(await e9.readBytes(r8)), this.date = _5.readDate(await e9.readBytes(4));
      let i8 = e9.remainder();
      s7(i8) && (i8 = await D7(i8)), this.setBytes(i8, t8);
    }));
  }
  writeHeader() {
    const e8 = _5.encodeUTF8(this.filename), t8 = new Uint8Array([e8.length]), r8 = new Uint8Array([this.format]), i8 = _5.writeDate(this.date);
    return _5.concatUint8Array([r8, t8, e8, i8]);
  }
  write() {
    const e8 = this.writeHeader(), t8 = this.getBytes();
    return _5.concat([e8, t8]);
  }
};
var ts = class _ts {
  constructor() {
    this.bytes = "";
  }
  read(e8) {
    return this.bytes = _5.uint8ArrayToString(e8.subarray(0, 8)), this.bytes.length;
  }
  write() {
    return _5.stringToUint8Array(this.bytes);
  }
  toHex() {
    return _5.uint8ArrayToHex(_5.stringToUint8Array(this.bytes));
  }
  equals(e8, t8 = false) {
    return t8 && (e8.isWildcard() || this.isWildcard()) || this.bytes === e8.bytes;
  }
  isNull() {
    return "" === this.bytes;
  }
  isWildcard() {
    return /^0+$/.test(this.toHex());
  }
  static mapToHex(e8) {
    return e8.toHex();
  }
  static fromID(e8) {
    const t8 = new _ts();
    return t8.read(_5.hexToUint8Array(e8)), t8;
  }
  static wildcard() {
    const e8 = new _ts();
    return e8.read(new Uint8Array(8)), e8;
  }
};
var rs = /* @__PURE__ */ Symbol("verified");
var is = "salt@notations.openpgpjs.org";
var as = /* @__PURE__ */ new Set([M7.signatureSubpacket.issuerKeyID, M7.signatureSubpacket.issuerFingerprint, M7.signatureSubpacket.embeddedSignature]);
var ns = class _ns {
  static get tag() {
    return M7.packet.signature;
  }
  constructor() {
    this.version = null, this.signatureType = null, this.hashAlgorithm = null, this.publicKeyAlgorithm = null, this.signatureData = null, this.unhashedSubpackets = [], this.unknownSubpackets = [], this.signedHashValue = null, this.salt = null, this.created = null, this.signatureExpirationTime = null, this.signatureNeverExpires = true, this.exportable = null, this.trustLevel = null, this.trustAmount = null, this.regularExpression = null, this.revocable = null, this.keyExpirationTime = null, this.keyNeverExpires = null, this.preferredSymmetricAlgorithms = null, this.revocationKeyClass = null, this.revocationKeyAlgorithm = null, this.revocationKeyFingerprint = null, this.issuerKeyID = new ts(), this.rawNotations = [], this.notations = {}, this.preferredHashAlgorithms = null, this.preferredCompressionAlgorithms = null, this.keyServerPreferences = null, this.preferredKeyServer = null, this.isPrimaryUserID = null, this.policyURI = null, this.keyFlags = null, this.signersUserID = null, this.reasonForRevocationFlag = null, this.reasonForRevocationString = null, this.features = null, this.signatureTargetPublicKeyAlgorithm = null, this.signatureTargetHashAlgorithm = null, this.signatureTargetHash = null, this.embeddedSignature = null, this.issuerKeyVersion = null, this.issuerFingerprint = null, this.preferredAEADAlgorithms = null, this.preferredCipherSuites = null, this.revoked = null, this[rs] = null;
  }
  read(e8, t8 = L4) {
    let r8 = 0;
    if (this.version = e8[r8++], 5 === this.version && !t8.enableParsingV5Entities) throw new st3("Support for v5 entities is disabled; turn on `config.enableParsingV5Entities` if needed");
    if (4 !== this.version && 5 !== this.version && 6 !== this.version) throw new st3(`Version ${this.version} of the signature packet is unsupported.`);
    if (this.signatureType = e8[r8++], this.publicKeyAlgorithm = e8[r8++], this.hashAlgorithm = e8[r8++], r8 += this.readSubPackets(e8.subarray(r8, e8.length), true), !this.created) throw Error("Missing signature creation time subpacket.");
    if (this.signatureData = e8.subarray(0, r8), r8 += this.readSubPackets(e8.subarray(r8, e8.length), false), this.signedHashValue = e8.subarray(r8, r8 + 2), r8 += 2, 6 === this.version) {
      const t9 = e8[r8++];
      this.salt = e8.subarray(r8, r8 + t9), r8 += t9;
    }
    const i8 = e8.subarray(r8, e8.length), { read: a8, signatureParams: n8 } = (function(e9, t9) {
      let r9 = 0;
      switch (e9) {
        case M7.publicKey.rsaEncryptSign:
        case M7.publicKey.rsaEncrypt:
        case M7.publicKey.rsaSign: {
          const e10 = _5.readMPI(t9.subarray(r9));
          return r9 += e10.length + 2, { read: r9, signatureParams: { s: e10 } };
        }
        case M7.publicKey.dsa:
        case M7.publicKey.ecdsa: {
          const e10 = _5.readMPI(t9.subarray(r9));
          r9 += e10.length + 2;
          const i9 = _5.readMPI(t9.subarray(r9));
          return r9 += i9.length + 2, { read: r9, signatureParams: { r: e10, s: i9 } };
        }
        case M7.publicKey.eddsaLegacy: {
          const e10 = _5.readMPI(t9.subarray(r9));
          r9 += e10.length + 2;
          const i9 = _5.readMPI(t9.subarray(r9));
          return r9 += i9.length + 2, { read: r9, signatureParams: { r: e10, s: i9 } };
        }
        case M7.publicKey.ed25519:
        case M7.publicKey.ed448: {
          const i9 = 2 * dt3(e9), a9 = _5.readExactSubarray(t9, r9, r9 + i9);
          return r9 += a9.length, { read: r9, signatureParams: { RS: a9 } };
        }
        case M7.publicKey.hmac: {
          const e10 = new qi();
          return r9 += e10.read(t9.subarray(r9)), { read: r9, signatureParams: { mac: e10 } };
        }
        case M7.publicKey.pqc_mldsa_ed25519: {
          const e10 = 2 * dt3(M7.publicKey.ed25519), i9 = _5.readExactSubarray(t9, r9, r9 + e10);
          r9 += i9.length;
          const a9 = _5.readExactSubarray(t9, r9, r9 + 3309);
          return r9 += a9.length, { read: r9, signatureParams: { eccSignature: i9, mldsaSignature: a9 } };
        }
        default:
          throw new st3("Unknown signature algorithm.");
      }
    })(this.publicKeyAlgorithm, i8);
    if (a8 < i8.length) throw Error("Error reading MPIs");
    this.params = n8;
  }
  writeParams() {
    return this.params instanceof Promise ? C7((async () => Oa(this.publicKeyAlgorithm, await this.params))) : Oa(this.publicKeyAlgorithm, this.params);
  }
  write() {
    const e8 = [];
    return e8.push(this.signatureData), e8.push(this.writeUnhashedSubPackets()), e8.push(this.signedHashValue), 6 === this.version && (e8.push(new Uint8Array([this.salt.length])), e8.push(this.salt)), e8.push(this.writeParams()), _5.concat(e8);
  }
  async sign(e8, t8, r8 = /* @__PURE__ */ new Date(), i8 = false, a8) {
    this.version = e8.version, this.created = _5.normalizeDate(r8), this.issuerKeyVersion = e8.version, this.issuerFingerprint = e8.getFingerprintBytes(), this.issuerKeyID = e8.getKeyID();
    const n8 = [new Uint8Array([this.version, this.signatureType, this.publicKeyAlgorithm, this.hashAlgorithm])];
    if (6 === this.version) {
      const e9 = os(this.hashAlgorithm);
      if (null === this.salt) this.salt = de3(e9);
      else if (e9 !== this.salt.length) throw Error("Provided salt does not have the required length");
    } else if (a8.nonDeterministicSignaturesViaNotation) {
      if (0 !== this.rawNotations.filter((({ name: e9 }) => e9 === is)).length) throw Error("Unexpected existing salt notation");
      {
        const e9 = de3(os(this.hashAlgorithm));
        this.rawNotations.push({ name: is, value: e9, humanReadable: false, critical: false });
      }
    }
    n8.push(this.writeHashedSubPackets()), this.unhashedSubpackets = [], this.signatureData = _5.concat(n8);
    const s8 = this.toHash(this.signatureType, t8, i8), o8 = await this.hash(this.signatureType, t8, s8, i8);
    this.signedHashValue = U7(E7(o8), 0, 2);
    const c7 = async () => Qa(this.publicKeyAlgorithm, this.hashAlgorithm, e8.publicParams, e8.privateParams, s8, await D7(o8));
    _5.isStream(o8) ? this.params = c7() : (this.params = await c7(), this[rs] = true);
  }
  writeHashedSubPackets() {
    const e8 = M7.signatureSubpacket, t8 = [];
    let r8;
    if (null === this.created) throw Error("Missing signature creation time");
    t8.push(ss(e8.signatureCreationTime, true, _5.writeDate(this.created))), null !== this.signatureExpirationTime && t8.push(ss(e8.signatureExpirationTime, true, _5.writeNumber(this.signatureExpirationTime, 4))), null !== this.exportable && t8.push(ss(e8.exportableCertification, true, new Uint8Array([this.exportable ? 1 : 0]))), null !== this.trustLevel && (r8 = new Uint8Array([this.trustLevel, this.trustAmount]), t8.push(ss(e8.trustSignature, true, r8))), null !== this.regularExpression && t8.push(ss(e8.regularExpression, true, this.regularExpression)), null !== this.revocable && t8.push(ss(e8.revocable, true, new Uint8Array([this.revocable ? 1 : 0]))), null !== this.keyExpirationTime && t8.push(ss(e8.keyExpirationTime, true, _5.writeNumber(this.keyExpirationTime, 4))), null !== this.preferredSymmetricAlgorithms && (r8 = _5.stringToUint8Array(_5.uint8ArrayToString(this.preferredSymmetricAlgorithms)), t8.push(ss(e8.preferredSymmetricAlgorithms, false, r8))), null !== this.revocationKeyClass && (r8 = new Uint8Array([this.revocationKeyClass, this.revocationKeyAlgorithm]), r8 = _5.concat([r8, this.revocationKeyFingerprint]), t8.push(ss(e8.revocationKey, false, r8))), !this.issuerKeyID.isNull() && this.issuerKeyVersion < 5 && t8.push(ss(e8.issuerKeyID, false, this.issuerKeyID.write())), this.rawNotations.forEach((({ name: i9, value: a9, humanReadable: n8, critical: s8 }) => {
      r8 = [new Uint8Array([n8 ? 128 : 0, 0, 0, 0])];
      const o8 = _5.encodeUTF8(i9);
      r8.push(_5.writeNumber(o8.length, 2)), r8.push(_5.writeNumber(a9.length, 2)), r8.push(o8), r8.push(a9), r8 = _5.concat(r8), t8.push(ss(e8.notationData, s8, r8));
    })), null !== this.preferredHashAlgorithms && (r8 = _5.stringToUint8Array(_5.uint8ArrayToString(this.preferredHashAlgorithms)), t8.push(ss(e8.preferredHashAlgorithms, false, r8))), null !== this.preferredCompressionAlgorithms && (r8 = _5.stringToUint8Array(_5.uint8ArrayToString(this.preferredCompressionAlgorithms)), t8.push(ss(e8.preferredCompressionAlgorithms, false, r8))), null !== this.keyServerPreferences && (r8 = _5.stringToUint8Array(_5.uint8ArrayToString(this.keyServerPreferences)), t8.push(ss(e8.keyServerPreferences, false, r8))), null !== this.preferredKeyServer && t8.push(ss(e8.preferredKeyServer, false, _5.encodeUTF8(this.preferredKeyServer))), null !== this.isPrimaryUserID && t8.push(ss(e8.primaryUserID, false, new Uint8Array([this.isPrimaryUserID ? 1 : 0]))), null !== this.policyURI && t8.push(ss(e8.policyURI, false, _5.encodeUTF8(this.policyURI))), null !== this.keyFlags && (r8 = _5.stringToUint8Array(_5.uint8ArrayToString(this.keyFlags)), t8.push(ss(e8.keyFlags, true, r8))), null !== this.signersUserID && t8.push(ss(e8.signersUserID, false, _5.encodeUTF8(this.signersUserID))), null !== this.reasonForRevocationFlag && (r8 = _5.stringToUint8Array(String.fromCharCode(this.reasonForRevocationFlag) + this.reasonForRevocationString), t8.push(ss(e8.reasonForRevocation, true, r8))), null !== this.features && (r8 = _5.stringToUint8Array(_5.uint8ArrayToString(this.features)), t8.push(ss(e8.features, false, r8))), null !== this.signatureTargetPublicKeyAlgorithm && (r8 = [new Uint8Array([this.signatureTargetPublicKeyAlgorithm, this.signatureTargetHashAlgorithm])], r8.push(_5.stringToUint8Array(this.signatureTargetHash)), r8 = _5.concat(r8), t8.push(ss(e8.signatureTarget, true, r8))), null !== this.embeddedSignature && t8.push(ss(e8.embeddedSignature, true, this.embeddedSignature.write())), null !== this.issuerFingerprint && (r8 = [new Uint8Array([this.issuerKeyVersion]), this.issuerFingerprint], r8 = _5.concat(r8), t8.push(ss(e8.issuerFingerprint, this.version >= 5, r8))), null !== this.preferredAEADAlgorithms && (r8 = _5.stringToUint8Array(_5.uint8ArrayToString(this.preferredAEADAlgorithms)), t8.push(ss(e8.preferredAEADAlgorithms, false, r8))), null !== this.preferredCipherSuites && (r8 = new Uint8Array([].concat(...this.preferredCipherSuites)), t8.push(ss(e8.preferredCipherSuites, false, r8)));
    const i8 = _5.concat(t8), a8 = _5.writeNumber(i8.length, 6 === this.version ? 4 : 2);
    return _5.concat([a8, i8]);
  }
  writeUnhashedSubPackets() {
    const e8 = this.unhashedSubpackets.map((({ type: e9, critical: t9, body: r9 }) => ss(e9, t9, r9))), t8 = _5.concat(e8), r8 = _5.writeNumber(t8.length, 6 === this.version ? 4 : 2);
    return _5.concat([r8, t8]);
  }
  readSubPacket(e8, t8 = true) {
    let r8 = 0;
    const i8 = !!(128 & e8[r8]), a8 = 127 & e8[r8];
    if (r8++, t8 || (this.unhashedSubpackets.push({ type: a8, critical: i8, body: e8.subarray(r8, e8.length) }), as.has(a8))) switch (a8) {
      case M7.signatureSubpacket.signatureCreationTime:
        this.created = _5.readDate(e8.subarray(r8, e8.length));
        break;
      case M7.signatureSubpacket.signatureExpirationTime: {
        const t9 = _5.readNumber(e8.subarray(r8, e8.length));
        this.signatureNeverExpires = 0 === t9, this.signatureExpirationTime = t9;
        break;
      }
      case M7.signatureSubpacket.exportableCertification:
        this.exportable = 1 === e8[r8++];
        break;
      case M7.signatureSubpacket.trustSignature:
        this.trustLevel = e8[r8++], this.trustAmount = e8[r8++];
        break;
      case M7.signatureSubpacket.regularExpression:
        this.regularExpression = e8[r8];
        break;
      case M7.signatureSubpacket.revocable:
        this.revocable = 1 === e8[r8++];
        break;
      case M7.signatureSubpacket.keyExpirationTime: {
        const t9 = _5.readNumber(e8.subarray(r8, e8.length));
        this.keyExpirationTime = t9, this.keyNeverExpires = 0 === t9;
        break;
      }
      case M7.signatureSubpacket.preferredSymmetricAlgorithms:
        this.preferredSymmetricAlgorithms = [...e8.subarray(r8, e8.length)];
        break;
      case M7.signatureSubpacket.revocationKey:
        this.revocationKeyClass = e8[r8++], this.revocationKeyAlgorithm = e8[r8++], this.revocationKeyFingerprint = e8.subarray(r8, r8 + 20);
        break;
      case M7.signatureSubpacket.issuerKeyID:
        if (4 === this.version) this.issuerKeyID.read(e8.subarray(r8, e8.length));
        else if (t8) throw Error("Unexpected Issuer Key ID subpacket");
        break;
      case M7.signatureSubpacket.notationData: {
        const t9 = !!(128 & e8[r8]);
        r8 += 4;
        const a9 = _5.readNumber(e8.subarray(r8, r8 + 2));
        r8 += 2;
        const n8 = _5.readNumber(e8.subarray(r8, r8 + 2));
        r8 += 2;
        const s8 = _5.decodeUTF8(e8.subarray(r8, r8 + a9)), o8 = e8.subarray(r8 + a9, r8 + a9 + n8);
        this.rawNotations.push({ name: s8, humanReadable: t9, value: o8, critical: i8 }), t9 && (this.notations[s8] = _5.decodeUTF8(o8));
        break;
      }
      case M7.signatureSubpacket.preferredHashAlgorithms:
        this.preferredHashAlgorithms = [...e8.subarray(r8, e8.length)];
        break;
      case M7.signatureSubpacket.preferredCompressionAlgorithms:
        this.preferredCompressionAlgorithms = [...e8.subarray(r8, e8.length)];
        break;
      case M7.signatureSubpacket.keyServerPreferences:
        this.keyServerPreferences = [...e8.subarray(r8, e8.length)];
        break;
      case M7.signatureSubpacket.preferredKeyServer:
        this.preferredKeyServer = _5.decodeUTF8(e8.subarray(r8, e8.length));
        break;
      case M7.signatureSubpacket.primaryUserID:
        this.isPrimaryUserID = 0 !== e8[r8++];
        break;
      case M7.signatureSubpacket.policyURI:
        this.policyURI = _5.decodeUTF8(e8.subarray(r8, e8.length));
        break;
      case M7.signatureSubpacket.keyFlags:
        this.keyFlags = [...e8.subarray(r8, e8.length)];
        break;
      case M7.signatureSubpacket.signersUserID:
        this.signersUserID = _5.decodeUTF8(e8.subarray(r8, e8.length));
        break;
      case M7.signatureSubpacket.reasonForRevocation:
        this.reasonForRevocationFlag = e8[r8++], this.reasonForRevocationString = _5.decodeUTF8(e8.subarray(r8, e8.length));
        break;
      case M7.signatureSubpacket.features:
        this.features = [...e8.subarray(r8, e8.length)];
        break;
      case M7.signatureSubpacket.signatureTarget: {
        this.signatureTargetPublicKeyAlgorithm = e8[r8++], this.signatureTargetHashAlgorithm = e8[r8++];
        const t9 = Le2(this.signatureTargetHashAlgorithm);
        this.signatureTargetHash = _5.uint8ArrayToString(e8.subarray(r8, r8 + t9));
        break;
      }
      case M7.signatureSubpacket.embeddedSignature:
        this.embeddedSignature = new _ns(), this.embeddedSignature.read(e8.subarray(r8, e8.length));
        break;
      case M7.signatureSubpacket.issuerFingerprint:
        this.issuerKeyVersion = e8[r8++], this.issuerFingerprint = e8.subarray(r8, e8.length), this.issuerKeyVersion >= 5 ? this.issuerKeyID.read(this.issuerFingerprint) : this.issuerKeyID.read(this.issuerFingerprint.subarray(-8));
        break;
      case M7.signatureSubpacket.preferredAEADAlgorithms:
        this.preferredAEADAlgorithms = [...e8.subarray(r8, e8.length)];
        break;
      case M7.signatureSubpacket.preferredCipherSuites:
        this.preferredCipherSuites = [];
        for (let t9 = r8; t9 < e8.length; t9 += 2) this.preferredCipherSuites.push([e8[t9], e8[t9 + 1]]);
        break;
      default:
        this.unknownSubpackets.push({ type: a8, critical: i8, body: e8.subarray(r8, e8.length) });
    }
  }
  readSubPackets(e8, t8 = true, r8) {
    const i8 = 6 === this.version ? 4 : 2, a8 = _5.readNumber(e8.subarray(0, i8));
    let n8 = i8;
    for (; n8 < 2 + a8; ) {
      const i9 = Je(e8.subarray(n8, e8.length));
      n8 += i9.offset, this.readSubPacket(e8.subarray(n8, n8 + i9.len), t8, r8), n8 += i9.len;
    }
    return n8;
  }
  toSign(e8, t8) {
    const r8 = M7.signature;
    switch (e8) {
      case r8.binary:
        return null !== t8.text ? _5.encodeUTF8(t8.getText(true)) : t8.getBytes(true);
      case r8.text: {
        const e9 = t8.getBytes(true);
        return _5.canonicalizeEOL(e9);
      }
      case r8.standalone:
        return new Uint8Array(0);
      case r8.certGeneric:
      case r8.certPersona:
      case r8.certCasual:
      case r8.certPositive:
      case r8.certRevocation: {
        let e9, i8;
        if (t8.userID) i8 = 180, e9 = t8.userID;
        else {
          if (!t8.userAttribute) throw Error("Either a userID or userAttribute packet needs to be supplied for certification.");
          i8 = 209, e9 = t8.userAttribute;
        }
        const a8 = e9.write();
        return _5.concat([this.toSign(r8.key, t8), new Uint8Array([i8]), _5.writeNumber(a8.length, 4), a8]);
      }
      case r8.subkeyBinding:
      case r8.subkeyRevocation:
      case r8.keyBinding:
        return _5.concat([this.toSign(r8.key, t8), this.toSign(r8.key, { key: t8.bind })]);
      case r8.key:
        if (void 0 === t8.key) throw Error("Key packet is required for this signature.");
        return t8.key.writeForHash(this.version);
      case r8.keyRevocation:
        return this.toSign(r8.key, t8);
      case r8.timestamp:
        return new Uint8Array(0);
      case r8.thirdParty:
        throw Error("Not implemented");
      default:
        throw Error("Unknown signature type.");
    }
  }
  calculateTrailer(e8, t8) {
    let r8 = 0;
    return b5(E7(this.signatureData), ((e9) => {
      r8 += e9.length;
    }), (() => {
      const i8 = [];
      return 5 !== this.version || this.signatureType !== M7.signature.binary && this.signatureType !== M7.signature.text || (t8 ? i8.push(new Uint8Array(6)) : i8.push(e8.writeHeader())), i8.push(new Uint8Array([this.version, 255])), 5 === this.version && i8.push(new Uint8Array(4)), i8.push(_5.writeNumber(r8, 4)), _5.concat(i8);
    }));
  }
  toHash(e8, t8, r8 = false) {
    const i8 = this.toSign(e8, t8);
    return _5.concat([this.salt || new Uint8Array(), i8, this.signatureData, this.calculateTrailer(t8, r8)]);
  }
  async hash(e8, t8, r8, i8 = false) {
    if (6 === this.version && this.salt.length !== os(this.hashAlgorithm)) throw Error("Signature salt does not have the expected length");
    return r8 || (r8 = this.toHash(e8, t8, i8)), Me(this.hashAlgorithm, r8);
  }
  async verify(e8, t8, r8, i8 = /* @__PURE__ */ new Date(), a8 = false, n8 = L4) {
    if (!this.issuerKeyID.equals(e8.getKeyID())) throw Error("Signature was not issued by the given public key");
    if (this.publicKeyAlgorithm !== e8.algorithm) throw Error("Public key algorithm used to sign signature does not match issuer key algorithm.");
    const s8 = t8 === M7.signature.binary || t8 === M7.signature.text;
    if (!(this[rs] && !s8)) {
      let i9, n9;
      if (this.hashed ? n9 = await this.hashed : (i9 = this.toHash(t8, r8, a8), n9 = await this.hash(t8, r8, i9)), n9 = await D7(n9), this.signedHashValue[0] !== n9[0] || this.signedHashValue[1] !== n9[1]) throw Error("Signed digest did not match");
      this.params = await this.params;
      const s9 = this.publicKeyAlgorithm === M7.publicKey.hmac ? e8.privateParams : null;
      if (this[rs] = await $a(this.publicKeyAlgorithm, this.hashAlgorithm, this.params, e8.publicParams, s9, i9, n9), !this[rs]) throw Error("Signature verification failed");
    }
    const o8 = _5.normalizeDate(i8);
    if (o8 && this.created > o8) throw Error("Signature creation time is in the future");
    if (o8 && o8 >= this.getExpirationTime()) throw Error("Signature is expired");
    if (n8.rejectHashAlgorithms.has(this.hashAlgorithm)) throw Error("Insecure hash algorithm: " + M7.read(M7.hash, this.hashAlgorithm).toUpperCase());
    if (n8.rejectMessageHashAlgorithms.has(this.hashAlgorithm) && [M7.signature.binary, M7.signature.text].includes(this.signatureType)) throw Error("Insecure message hash algorithm: " + M7.read(M7.hash, this.hashAlgorithm).toUpperCase());
    if (this.unknownSubpackets.forEach((({ type: e9, critical: t9 }) => {
      if (t9) throw Error("Unknown critical signature subpacket type " + e9);
    })), this.rawNotations.forEach((({ name: e9, critical: t9 }) => {
      if (t9 && n8.knownNotations.indexOf(e9) < 0) throw Error("Unknown critical notation: " + e9);
    })), null !== this.revocationKeyClass) throw Error("This key is intended to be revoked with an authorized key, which OpenPGP.js does not support.");
  }
  isExpired(e8 = /* @__PURE__ */ new Date()) {
    const t8 = _5.normalizeDate(e8);
    return null !== t8 && !(this.created <= t8 && t8 < this.getExpirationTime());
  }
  getExpirationTime() {
    return this.signatureNeverExpires ? 1 / 0 : new Date(this.created.getTime() + 1e3 * this.signatureExpirationTime);
  }
};
function ss(e8, t8, r8) {
  const i8 = [];
  return i8.push(et3(r8.length + 1)), i8.push(new Uint8Array([(t8 ? 128 : 0) | e8])), i8.push(r8), _5.concat(i8);
}
function os(e8) {
  switch (e8) {
    case M7.hash.sha256:
      return 16;
    case M7.hash.sha384:
      return 24;
    case M7.hash.sha512:
      return 32;
    case M7.hash.sha224:
    case M7.hash.sha3_256:
      return 16;
    case M7.hash.sha3_512:
      return 32;
    default:
      throw Error("Unsupported hash function");
  }
}
var cs = class _cs {
  static get tag() {
    return M7.packet.onePassSignature;
  }
  static fromSignaturePacket(e8, t8) {
    const r8 = new _cs();
    return r8.version = 6 === e8.version ? 6 : 3, r8.signatureType = e8.signatureType, r8.hashAlgorithm = e8.hashAlgorithm, r8.publicKeyAlgorithm = e8.publicKeyAlgorithm, r8.issuerKeyID = e8.issuerKeyID, r8.salt = e8.salt, r8.issuerFingerprint = e8.issuerFingerprint, r8.flags = t8 ? 1 : 0, r8;
  }
  constructor() {
    this.version = null, this.signatureType = null, this.hashAlgorithm = null, this.publicKeyAlgorithm = null, this.salt = null, this.issuerKeyID = null, this.issuerFingerprint = null, this.flags = null;
  }
  read(e8) {
    let t8 = 0;
    if (this.version = e8[t8++], 3 !== this.version && 6 !== this.version) throw new st3(`Version ${this.version} of the one-pass signature packet is unsupported.`);
    if (this.signatureType = e8[t8++], this.hashAlgorithm = e8[t8++], this.publicKeyAlgorithm = e8[t8++], 6 === this.version) {
      const r8 = e8[t8++];
      this.salt = e8.subarray(t8, t8 + r8), t8 += r8, this.issuerFingerprint = e8.subarray(t8, t8 + 32), t8 += 32, this.issuerKeyID = new ts(), this.issuerKeyID.read(this.issuerFingerprint);
    } else this.issuerKeyID = new ts(), this.issuerKeyID.read(e8.subarray(t8, t8 + 8)), t8 += 8;
    return this.flags = e8[t8++], this;
  }
  write() {
    const e8 = [new Uint8Array([this.version, this.signatureType, this.hashAlgorithm, this.publicKeyAlgorithm])];
    return 6 === this.version ? e8.push(new Uint8Array([this.salt.length]), this.salt, this.issuerFingerprint) : e8.push(this.issuerKeyID.write()), e8.push(new Uint8Array([this.flags])), _5.concatUint8Array(e8);
  }
  calculateTrailer(...e8) {
    return C7((async () => ns.prototype.calculateTrailer.apply(await this.correspondingSig, e8)));
  }
  async verify() {
    const e8 = await this.correspondingSig;
    if (!e8 || e8.constructor.tag !== M7.packet.signature) throw Error("Corresponding signature packet missing");
    if (e8.signatureType !== this.signatureType || e8.hashAlgorithm !== this.hashAlgorithm || e8.publicKeyAlgorithm !== this.publicKeyAlgorithm || !e8.issuerKeyID.equals(this.issuerKeyID) || 3 === this.version && 6 === e8.version || 6 === this.version && 6 !== e8.version || 6 === this.version && !_5.equalsUint8Array(e8.issuerFingerprint, this.issuerFingerprint) || 6 === this.version && !_5.equalsUint8Array(e8.salt, this.salt)) throw Error("Corresponding signature packet does not match one-pass signature packet");
    return e8.hashed = this.hashed, e8.verify.apply(e8, arguments);
  }
};
function us(e8, t8) {
  if (!t8[e8]) {
    let t9;
    try {
      t9 = M7.read(M7.packet, e8);
    } catch {
      throw new ot3("Unknown packet type with tag: " + e8);
    }
    throw Error("Packet not allowed in this context: " + t9);
  }
  return new t8[e8]();
}
cs.prototype.hash = ns.prototype.hash, cs.prototype.toHash = ns.prototype.toHash, cs.prototype.toSign = ns.prototype.toSign;
var hs = class _hs extends Array {
  static async fromBinary(e8, t8, r8 = L4, i8 = null, a8 = false) {
    const n8 = new _hs();
    return await n8.read(e8, t8, r8, i8, a8), n8;
  }
  async read(e8, t8, r8 = L4, i8 = null, a8 = false) {
    let n8;
    r8.additionalAllowedPackets.length && (n8 = _5.constructAllowedPackets(r8.additionalAllowedPackets), t8 = { ...t8, ...n8 }), this.stream = K5(e8, (async (e9, s9) => {
      const o8 = I7(e9), c7 = T5(s9);
      try {
        let s10 = _5.isStream(e9);
        for (; ; ) {
          let e10, u8;
          if (await c7.ready, await nt3(o8, s10, (async (s11) => {
            try {
              if (s11.tag === M7.packet.marker || s11.tag === M7.packet.trust || s11.tag === M7.packet.padding) return;
              const e11 = us(s11.tag, t8);
              try {
                i8?.recordPacket(s11.tag, n8);
              } catch (e12) {
                if (r8.enforceGrammar) throw e12;
                _5.printDebugError(e12);
              }
              e11.packets = new _hs(), e11.fromStream = _5.isStream(s11.packet), u8 = e11.fromStream;
              try {
                await e11.read(s11.packet, r8);
              } catch (t9) {
                if (!(t9 instanceof st3)) throw _5.wrapError(new ct3(`Parsing ${e11.constructor.name} failed`), t9);
                throw t9;
              }
              await c7.write(e11);
            } catch (t9) {
              const i9 = t9 instanceof ot3 && s11.tag <= 39, n9 = t9 instanceof st3 && !(t9 instanceof ot3) && !r8.ignoreUnsupportedPackets, o9 = t9 instanceof ct3 && !r8.ignoreMalformedPackets, u9 = at3(s11.tag);
              if (i9 || n9 || o9 || u9 || !(t9 instanceof ot3 || t9 instanceof st3 || t9 instanceof ct3)) a8 ? e10 = t9 : await c7.abort(t9);
              else {
                const e11 = new ut3(s11.tag, s11.packet);
                await c7.write(e11);
              }
              _5.printDebugError(t9);
            }
          })), u8 && (s10 = null), e10) throw await o8.readToEnd(), e10;
          const h7 = await o8.peekBytes(2);
          if (!h7 || !h7.length) {
            try {
              i8?.recordEnd();
            } catch (e11) {
              if (r8.enforceGrammar) throw e11;
              _5.printDebugError(e11);
            }
            return await c7.ready, void await c7.close();
          }
        }
      } catch (e10) {
        await c7.abort(e10);
      }
    }));
    const s8 = I7(this.stream);
    for (; ; ) {
      const { done: e9, value: t9 } = await s8.read();
      if (e9 ? this.stream = null : this.push(t9), e9 || at3(t9.constructor.tag)) break;
    }
    s8.releaseLock();
  }
  write() {
    const e8 = [];
    for (let t8 = 0; t8 < this.length; t8++) {
      const r8 = this[t8] instanceof ut3 ? this[t8].tag : this[t8].constructor.tag, i8 = this[t8].write();
      if (_5.isStream(i8) && at3(this[t8].constructor.tag)) {
        let t9 = [], a8 = 0;
        const n8 = 512;
        e8.push(rt3(r8)), e8.push(b5(i8, ((e9) => {
          if (t9.push(e9), a8 += e9.length, a8 >= n8) {
            const e10 = Math.min(Math.log(a8) / Math.LN2 | 0, 30), r9 = 2 ** e10, i9 = _5.concat([tt3(e10)].concat(t9));
            return t9 = [i9.subarray(1 + r9)], a8 = t9[0].length, i9.subarray(0, 1 + r9);
          }
        }), (() => _5.concat([et3(a8)].concat(t9)))));
      } else {
        if (_5.isStream(i8)) {
          let t9 = 0;
          e8.push(b5(E7(i8), ((e9) => {
            t9 += e9.length;
          }), (() => it3(r8, t9))));
        } else e8.push(it3(r8, i8.length));
        e8.push(i8);
      }
    }
    return _5.concat(e8);
  }
  filterByTag(...e8) {
    const t8 = new _hs(), r8 = (e9) => (t9) => e9 === t9;
    for (let i8 = 0; i8 < this.length; i8++) e8.some(r8(this[i8].constructor.tag)) && t8.push(this[i8]);
    return t8;
  }
  findPacket(e8) {
    return this.find(((t8) => t8.constructor.tag === e8));
  }
  indexOfTag(...e8) {
    const t8 = [], r8 = this, i8 = (e9) => (t9) => e9 === t9;
    for (let a8 = 0; a8 < this.length; a8++) e8.some(i8(r8[a8].constructor.tag)) && t8.push(a8);
    return t8;
  }
};
var ls = class _ls extends Error {
  constructor(...e8) {
    super(...e8), Error.captureStackTrace && Error.captureStackTrace(this, _ls), this.name = "GrammarError";
  }
};
var ys;
!(function(e8) {
  e8[e8.EmptyMessage = 0] = "EmptyMessage", e8[e8.PlaintextOrEncryptedData = 1] = "PlaintextOrEncryptedData", e8[e8.EncryptedSessionKeys = 2] = "EncryptedSessionKeys", e8[e8.StandaloneAdditionalAllowedData = 3] = "StandaloneAdditionalAllowedData";
})(ys || (ys = {}));
var ps = class {
  constructor() {
    this.state = ys.EmptyMessage, this.leadingOnePassSignatureCounter = 0;
  }
  recordPacket(e8, t8) {
    switch (this.state) {
      case ys.EmptyMessage:
      case ys.StandaloneAdditionalAllowedData:
        switch (e8) {
          case M7.packet.literalData:
          case M7.packet.compressedData:
          case M7.packet.aeadEncryptedData:
          case M7.packet.symEncryptedIntegrityProtectedData:
          case M7.packet.symmetricallyEncryptedData:
            return void (this.state = ys.PlaintextOrEncryptedData);
          case M7.packet.signature:
            if (this.state === ys.StandaloneAdditionalAllowedData && --this.leadingOnePassSignatureCounter < 0) throw new ls("Trailing signature packet without OPS");
            return;
          case M7.packet.onePassSignature:
            if (this.state === ys.StandaloneAdditionalAllowedData) throw new ls("OPS following StandaloneAdditionalAllowedData");
            return void this.leadingOnePassSignatureCounter++;
          case M7.packet.publicKeyEncryptedSessionKey:
          case M7.packet.symEncryptedSessionKey:
            return void (this.state = ys.EncryptedSessionKeys);
          default:
            if (!t8?.[e8]) throw new ls(`Unexpected packet ${e8} in state ${this.state}`);
            return void (this.state = ys.StandaloneAdditionalAllowedData);
        }
      case ys.PlaintextOrEncryptedData:
        if (e8 === M7.packet.signature) {
          if (--this.leadingOnePassSignatureCounter < 0) throw new ls("Trailing signature packet without OPS");
          return void (this.state = ys.PlaintextOrEncryptedData);
        }
        if (!t8?.[e8]) throw new ls(`Unexpected packet ${e8} in state ${this.state}`);
        return void (this.state = ys.PlaintextOrEncryptedData);
      case ys.EncryptedSessionKeys:
        switch (e8) {
          case M7.packet.publicKeyEncryptedSessionKey:
          case M7.packet.symEncryptedSessionKey:
            return void (this.state = ys.EncryptedSessionKeys);
          case M7.packet.symEncryptedIntegrityProtectedData:
          case M7.packet.aeadEncryptedData:
          case M7.packet.symmetricallyEncryptedData:
            return void (this.state = ys.PlaintextOrEncryptedData);
          case M7.packet.signature:
            if (--this.leadingOnePassSignatureCounter < 0) throw new ls("Trailing signature packet without OPS");
            return void (this.state = ys.PlaintextOrEncryptedData);
          default:
            if (!t8?.[e8]) throw new ls(`Unexpected packet ${e8} in state ${this.state}`);
            this.state = ys.EncryptedSessionKeys;
        }
    }
  }
  recordEnd() {
    switch (this.state) {
      case ys.EmptyMessage:
      case ys.PlaintextOrEncryptedData:
      case ys.EncryptedSessionKeys:
      case ys.StandaloneAdditionalAllowedData:
        if (this.leadingOnePassSignatureCounter > 0) throw new ls("Missing trailing signature packets");
    }
  }
};
var ds = /* @__PURE__ */ _5.constructAllowedPackets([es, cs, ns]);
var gs = class {
  static get tag() {
    return M7.packet.compressedData;
  }
  constructor(e8 = L4) {
    this.packets = null, this.algorithm = e8.preferredCompressionAlgorithm, this.compressed = null;
  }
  async read(e8, t8 = L4) {
    await A7(e8, (async (e9) => {
      this.algorithm = await e9.readByte(), this.compressed = e9.remainder(), await this.decompress(t8);
    }));
  }
  write() {
    return null === this.compressed && this.compress(), _5.concat([new Uint8Array([this.algorithm]), this.compressed]);
  }
  async decompress(e8 = L4) {
    const t8 = M7.read(M7.compression, this.algorithm), r8 = ks[t8];
    if (!r8) throw Error(t8 + " decompression not supported");
    let i8 = await r8(this.compressed);
    if (e8.maxDecompressedMessageSize !== 1 / 0) {
      let t9 = 0;
      i8 = b5(i8, ((r9) => {
        if (t9 += r9.length, t9 > e8.maxDecompressedMessageSize) throw Error("Maximum decompressed message size exceeded");
        return r9;
      }));
    }
    c6(this.compressed) && !s7(this.compressed) || (i8 = await D7(i8)), this.packets = await hs.fromBinary(i8, ds, e8, new ps());
  }
  compress() {
    const e8 = M7.read(M7.compression, this.algorithm), t8 = bs[e8];
    if (!t8) throw Error(e8 + " compression not supported");
    const r8 = this.packets.write();
    let i8 = t8(r8);
    c6(r8) && !s7(r8) || (i8 = C7((() => D7(i8)))), this.compressed = i8;
  }
};
function ms(e8, t8) {
  return (r8) => {
    let i8;
    if (i8 = s7(r8) ? new ReadableStream({ async start(e9) {
      try {
        e9.enqueue(await D7(r8)), e9.close();
      } catch (t9) {
        e9.error(t9);
      }
    } }) : c6(r8) ? r8 : d5(r8), i8 = (function(e9) {
      const t9 = I7(e9);
      return new ReadableStream({ async pull(e10) {
        try {
          const { value: r9, done: i9 } = await t9.read();
          if (i9) return void e10.close();
          for (let t10 = 0; t10 <= r9.length; t10 += 65536) (!t10 || t10 < r9.length) && e10.enqueue(r9.subarray(t10, t10 + 65536));
        } catch (t10) {
          e10.error(t10);
        }
      } }, { highWaterMark: 0 });
    })(i8), e8) try {
      const t9 = e8();
      return i8.pipeThrough(t9);
    } catch (e9) {
      if ("TypeError" !== e9.name) throw e9;
    }
    const a8 = I7(i8), n8 = new t8();
    let o8 = false, u8 = false;
    return new ReadableStream({ start(e9) {
      n8.ondata = (t9, r9) => {
        e9.enqueue(t9), o8 = true, r9 && (e9.close(), u8 = true);
      };
    }, async pull() {
      for (o8 = false; !o8 && !u8; ) {
        const { done: e9, value: t9 } = await a8.read();
        if (e9) return void n8.push(new Uint8Array(), true);
        t9.length && n8.push(t9);
      }
    } }, { highWaterMark: 0 });
  };
}
function fs() {
  return async function(e8) {
    const { default: t8 } = await Promise.resolve().then(() => (init_unbzip2_stream_min(), unbzip2_stream_min_exports)).then((function(e9) {
      return e9.i;
    }));
    return t8(d5(e8));
  };
}
var ws = (e8) => ({ compressor: "undefined" != typeof CompressionStream && (() => new CompressionStream(e8)), decompressor: "undefined" != typeof DecompressionStream && (() => new DecompressionStream(e8)) });
var bs = { zip: /* @__PURE__ */ ms(ws("deflate-raw").compressor, Qn), zlib: /* @__PURE__ */ ms(ws("deflate").compressor, Yn) };
var ks = { uncompressed: (e8) => e8, zip: /* @__PURE__ */ ms(ws("deflate-raw").decompressor, Xn), zlib: /* @__PURE__ */ ms(ws("deflate").decompressor, Zn), bzip2: /* @__PURE__ */ fs() };
var vs = /* @__PURE__ */ _5.constructAllowedPackets([es, gs, cs, ns]);
var Ks = class _Ks {
  static get tag() {
    return M7.packet.symEncryptedIntegrityProtectedData;
  }
  static fromObject({ version: e8, aeadAlgorithm: t8 }) {
    if (1 !== e8 && 2 !== e8) throw Error("Unsupported SEIPD version");
    const r8 = new _Ks();
    return r8.version = e8, 2 === e8 && (r8.aeadAlgorithm = t8), r8;
  }
  constructor() {
    this.version = null, this.cipherAlgorithm = null, this.aeadAlgorithm = null, this.chunkSizeByte = null, this.salt = null, this.encrypted = null, this.packets = null;
  }
  async read(e8) {
    await A7(e8, (async (e9) => {
      if (this.version = await e9.readByte(), 1 !== this.version && 2 !== this.version) throw new st3(`Version ${this.version} of the SEIP packet is unsupported.`);
      2 === this.version && (this.cipherAlgorithm = await e9.readByte(), this.aeadAlgorithm = await e9.readByte(), this.chunkSizeByte = await e9.readByte(), this.salt = await e9.readBytes(32)), this.encrypted = e9.remainder();
    }));
  }
  write() {
    return 2 === this.version ? _5.concat([new Uint8Array([this.version, this.cipherAlgorithm, this.aeadAlgorithm, this.chunkSizeByte]), this.salt, this.encrypted]) : _5.concat([new Uint8Array([this.version]), this.encrypted]);
  }
  async encrypt(e8, t8, r8 = L4) {
    const { blockSize: i8, keySize: a8 } = Pr(e8);
    if (t8.length !== a8) throw Error("Unexpected session key size");
    let n8 = this.packets.write();
    if (s7(n8) && (n8 = await D7(n8)), 2 === this.version) this.cipherAlgorithm = e8, this.salt = de3(32), this.chunkSizeByte = r8.aeadChunkSizeByte, this.encrypted = await As(this, "encrypt", t8, n8);
    else {
      const r9 = await Zi(e8), a9 = new Uint8Array([211, 20]), s8 = _5.concat([r9, n8, a9]), o8 = await Me(M7.hash.sha1, S6(s8)), c7 = _5.concat([s8, o8]);
      this.encrypted = await Ji(e8, t8, c7, new Uint8Array(i8));
    }
    return true;
  }
  async decrypt(e8, t8, r8 = L4) {
    if (t8.length !== Pr(e8).keySize) throw Error("Unexpected session key size");
    let i8, a8 = E7(this.encrypted);
    s7(a8) && (a8 = await D7(a8));
    let n8 = false;
    if (2 === this.version) {
      if (this.cipherAlgorithm !== e8) throw Error("Unexpected session key algorithm");
      i8 = await As(this, "decrypt", t8, a8);
    } else {
      const { blockSize: s8 } = Pr(e8), o8 = await ea(e8, t8, a8, new Uint8Array(s8)), c7 = U7(S6(o8), -20), u8 = U7(o8, 0, -20), h7 = Promise.all([D7(await Me(M7.hash.sha1, S6(u8))), D7(c7)]).then((([e9, t9]) => {
        if (!_5.equalsUint8Array(e9, t9)) throw Error("Modification detected.");
        return new Uint8Array();
      })), l6 = U7(u8, s8 + 2);
      i8 = U7(l6, 0, -2), i8 = m5([i8, C7((() => h7))]), _5.isStream(a8) && r8.allowUnauthenticatedStream ? n8 = true : i8 = await D7(i8);
    }
    return this.packets = await hs.fromBinary(i8, vs, r8, new ps(), n8), true;
  }
};
async function As(e8, t8, r8, i8) {
  const a8 = e8 instanceof Ks && 2 === e8.version, n8 = !a8 && e8.constructor.tag === M7.packet.aeadEncryptedData;
  if (!a8 && !n8) throw Error("Unexpected packet type");
  const s8 = _a(e8.aeadAlgorithm, n8), o8 = "decrypt" === t8 ? s8.tagLength : 0, c7 = "encrypt" === t8 ? s8.tagLength : 0, u8 = 2 ** (e8.chunkSizeByte + 6) + o8, h7 = n8 ? 8 : 0, l6 = new ArrayBuffer(13 + h7), y8 = new Uint8Array(l6, 0, 5 + h7), p5 = new Uint8Array(l6), d6 = new DataView(l6), g7 = new Uint8Array(l6, 5, 8);
  y8.set([192 | e8.constructor.tag, e8.version, e8.cipherAlgorithm, e8.aeadAlgorithm, e8.chunkSizeByte], 0);
  let m6, w8, b6 = 0, k7 = Promise.resolve(), v7 = 0, A8 = 0;
  if (a8) {
    const { keySize: t9 } = Pr(e8.cipherAlgorithm), { ivLength: i9 } = s8, a9 = new Uint8Array(l6, 0, 5), n9 = await Cr(M7.hash.sha256, r8, e8.salt, a9, t9 + i9);
    r8 = n9.subarray(0, t9), m6 = n9.subarray(t9), m6.fill(0, m6.length - 8), w8 = new DataView(m6.buffer, m6.byteOffset, m6.byteLength);
  } else m6 = e8.iv;
  const E8 = await s8(e8.cipherAlgorithm, r8);
  return K5(i8, (async (r9, i9) => {
    if ("array" !== _5.isStream(r9)) {
      const t9 = new TransformStream({}, { highWaterMark: _5.getHardwareConcurrency() * 2 ** (e8.chunkSizeByte + 6), size: (e9) => e9.length });
      f7(t9.readable, i9), i9 = t9.writable;
    }
    const n9 = I7(r9), s9 = T5(i9);
    try {
      for (; ; ) {
        let e9 = await n9.readBytes(u8 + o8) || new Uint8Array();
        const r10 = e9.subarray(e9.length - o8);
        let i10, l7, f8;
        if (e9 = e9.subarray(0, e9.length - o8), a8) f8 = m6;
        else {
          f8 = m6.slice();
          for (let e10 = 0; e10 < 8; e10++) f8[m6.length - 8 + e10] ^= g7[e10];
        }
        if (!b6 || e9.length ? (n9.unshift(r10), i10 = E8[t8](e9, f8, y8), i10.catch((() => {
        })), A8 += e9.length - o8 + c7) : (d6.setInt32(5 + h7 + 4, v7), i10 = E8[t8](r10, f8, p5), i10.catch((() => {
        })), A8 += c7, l7 = true), v7 += e9.length - o8, k7 = k7.then((() => i10)).then((async (e10) => {
          await s9.ready, await s9.write(e10), A8 -= e10.length;
        })).catch(((e10) => s9.abort(e10))), (l7 || A8 > s9.desiredSize) && await k7, l7) {
          await s9.close();
          break;
        }
        a8 ? w8.setInt32(m6.length - 4, ++b6) : d6.setInt32(9, ++b6);
      }
    } catch (e9) {
      await s9.ready.catch((() => {
      })), await s9.abort(e9);
    }
  }));
}
var Es = /* @__PURE__ */ _5.constructAllowedPackets([es, gs, cs, ns]);
var Ss = class {
  static get tag() {
    return M7.packet.aeadEncryptedData;
  }
  constructor() {
    this.version = 1, this.cipherAlgorithm = null, this.aeadAlgorithm = M7.aead.eax, this.chunkSizeByte = null, this.iv = null, this.encrypted = null, this.packets = null;
  }
  async read(e8) {
    await A7(e8, (async (e9) => {
      const t8 = await e9.readByte();
      if (1 !== t8) throw new st3(`Version ${t8} of the AEAD-encrypted data packet is not supported.`);
      this.cipherAlgorithm = await e9.readByte(), this.aeadAlgorithm = await e9.readByte(), this.chunkSizeByte = await e9.readByte();
      const r8 = _a(this.aeadAlgorithm, true);
      this.iv = await e9.readBytes(r8.ivLength), this.encrypted = e9.remainder();
    }));
  }
  write() {
    return _5.concat([new Uint8Array([this.version, this.cipherAlgorithm, this.aeadAlgorithm, this.chunkSizeByte]), this.iv, this.encrypted]);
  }
  async decrypt(e8, t8, r8 = L4) {
    this.packets = await hs.fromBinary(await As(this, "decrypt", t8, E7(this.encrypted)), Es, r8, new ps());
  }
  async encrypt(e8, t8, r8 = L4) {
    this.cipherAlgorithm = e8;
    const { ivLength: i8 } = _a(this.aeadAlgorithm, true);
    this.iv = de3(i8), this.chunkSizeByte = r8.aeadChunkSizeByte;
    const a8 = this.packets.write();
    this.encrypted = await As(this, "encrypt", t8, a8);
  }
};
var Ps = /* @__PURE__ */ new Set([M7.publicKey.x25519, M7.publicKey.x448, M7.publicKey.pqc_mlkem_x25519]);
var Us = class _Us {
  static get tag() {
    return M7.packet.publicKeyEncryptedSessionKey;
  }
  constructor() {
    this.version = null, this.publicKeyID = new ts(), this.publicKeyVersion = null, this.publicKeyFingerprint = null, this.publicKeyAlgorithm = null, this.sessionKey = null, this.sessionKeyAlgorithm = null, this.encrypted = {};
  }
  static fromObject({ version: e8, encryptionKeyPacket: t8, anonymousRecipient: r8, sessionKey: i8, sessionKeyAlgorithm: a8 }) {
    const n8 = new _Us();
    if (3 !== e8 && 6 !== e8) throw Error("Unsupported PKESK version");
    return n8.version = e8, 6 === e8 && (n8.publicKeyVersion = r8 ? null : t8.version, n8.publicKeyFingerprint = r8 ? null : t8.getFingerprintBytes()), n8.publicKeyID = r8 ? ts.wildcard() : t8.getKeyID(), n8.publicKeyAlgorithm = t8.algorithm, n8.sessionKey = i8, n8.sessionKeyAlgorithm = a8, n8;
  }
  read(e8) {
    let t8 = 0;
    if (this.version = e8[t8++], 3 !== this.version && 6 !== this.version) throw new st3(`Version ${this.version} of the PKESK packet is unsupported.`);
    if (6 === this.version) {
      const r8 = e8[t8++];
      if (r8) {
        this.publicKeyVersion = e8[t8++];
        const i8 = r8 - 1;
        this.publicKeyFingerprint = e8.subarray(t8, t8 + i8), t8 += i8, this.publicKeyVersion >= 5 ? this.publicKeyID.read(this.publicKeyFingerprint) : this.publicKeyID.read(this.publicKeyFingerprint.subarray(-8));
      } else this.publicKeyID = ts.wildcard();
    } else t8 += this.publicKeyID.read(e8.subarray(t8, t8 + 8));
    if (this.publicKeyAlgorithm = e8[t8++], this.encrypted = (function(e9, t9) {
      let r8 = 0;
      switch (e9) {
        case M7.publicKey.rsaEncrypt:
        case M7.publicKey.rsaEncryptSign:
          return { c: _5.readMPI(t9.subarray(r8)) };
        case M7.publicKey.elgamal: {
          const e10 = _5.readMPI(t9.subarray(r8));
          return r8 += e10.length + 2, { c1: e10, c2: _5.readMPI(t9.subarray(r8)) };
        }
        case M7.publicKey.ecdh: {
          const e10 = _5.readMPI(t9.subarray(r8));
          r8 += e10.length + 2;
          const i8 = new zi();
          return i8.read(t9.subarray(r8)), { V: e10, C: i8 };
        }
        case M7.publicKey.x25519:
        case M7.publicKey.x448: {
          const i8 = Wa(e9), a8 = _5.readExactSubarray(t9, r8, r8 + i8);
          r8 += a8.length;
          const n8 = new ji();
          return n8.read(t9.subarray(r8)), { ephemeralPublicKey: a8, C: n8 };
        }
        case M7.publicKey.aead: {
          const e10 = new Gi();
          r8 += e10.read(t9.subarray(r8));
          const { ivLength: i8 } = _a(e10.getValue()), a8 = t9.subarray(r8, r8 + i8);
          r8 += i8;
          const n8 = new qi();
          return r8 += n8.read(t9.subarray(r8)), { aeadMode: e10, iv: a8, c: n8 };
        }
        case M7.publicKey.pqc_mlkem_x25519: {
          const e10 = _5.readExactSubarray(t9, r8, r8 + Wa(M7.publicKey.x25519));
          r8 += e10.length;
          const i8 = _5.readExactSubarray(t9, r8, r8 + 1088);
          r8 += i8.length;
          const a8 = new ji();
          return a8.read(t9.subarray(r8)), { eccCipherText: e10, mlkemCipherText: i8, C: a8 };
        }
        default:
          throw new st3("Unknown public key encryption algorithm.");
      }
    })(this.publicKeyAlgorithm, e8.subarray(t8)), Ps.has(this.publicKeyAlgorithm)) {
      if (3 === this.version) this.sessionKeyAlgorithm = M7.write(M7.symmetric, this.encrypted.C.algorithm);
      else if (null !== this.encrypted.C.algorithm) throw Error("Unexpected cleartext symmetric algorithm");
    }
  }
  write() {
    const e8 = [new Uint8Array([this.version])];
    return 6 === this.version ? null !== this.publicKeyFingerprint ? (e8.push(new Uint8Array([this.publicKeyFingerprint.length + 1, this.publicKeyVersion])), e8.push(this.publicKeyFingerprint)) : e8.push(new Uint8Array([0])) : e8.push(this.publicKeyID.write()), e8.push(new Uint8Array([this.publicKeyAlgorithm]), Oa(this.publicKeyAlgorithm, this.encrypted)), _5.concatUint8Array(e8);
  }
  async encrypt(e8) {
    const t8 = M7.write(M7.publicKey, this.publicKeyAlgorithm), r8 = 3 === this.version ? this.sessionKeyAlgorithm : null, i8 = 5 === e8.version ? e8.getFingerprintBytes().subarray(0, 20) : e8.getFingerprintBytes(), a8 = Ds(this.version, t8, r8, this.sessionKey), n8 = t8 === M7.publicKey.aead ? e8.privateParams : null;
    this.encrypted = await Na(t8, r8, e8.publicParams, n8, a8, i8);
  }
  async decrypt(e8, t8) {
    if (this.publicKeyAlgorithm !== e8.algorithm) throw Error("Decryption error");
    const r8 = t8 ? Ds(this.version, this.publicKeyAlgorithm, t8.sessionKeyAlgorithm, t8.sessionKey) : null, i8 = 5 === e8.version ? e8.getFingerprintBytes().subarray(0, 20) : e8.getFingerprintBytes(), a8 = await Ra(this.publicKeyAlgorithm, e8.publicParams, e8.privateParams, this.encrypted, i8, r8), { sessionKey: n8, sessionKeyAlgorithm: s8 } = (function(e9, t9, r9, i9) {
      switch (t9) {
        case M7.publicKey.rsaEncrypt:
        case M7.publicKey.rsaEncryptSign:
        case M7.publicKey.elgamal:
        case M7.publicKey.ecdh:
        case M7.publicKey.aead: {
          const t10 = r9.subarray(0, r9.length - 2), a9 = r9.subarray(r9.length - 2), n9 = _5.writeChecksum(t10.subarray(t10.length % 8)), s9 = n9[0] === a9[0] & n9[1] === a9[1], o8 = 6 === e9 ? { sessionKeyAlgorithm: null, sessionKey: t10 } : { sessionKeyAlgorithm: t10[0], sessionKey: t10.subarray(1) };
          if (i9) {
            const t11 = s9 & o8.sessionKeyAlgorithm === i9.sessionKeyAlgorithm & o8.sessionKey.length === i9.sessionKey.length;
            return { sessionKey: _5.selectUint8Array(t11, o8.sessionKey, i9.sessionKey), sessionKeyAlgorithm: 6 === e9 ? null : _5.selectUint8(t11, o8.sessionKeyAlgorithm, i9.sessionKeyAlgorithm) };
          }
          if (s9 && (6 === e9 || M7.read(M7.symmetric, o8.sessionKeyAlgorithm))) return o8;
          throw Error("Decryption error");
        }
        case M7.publicKey.x25519:
        case M7.publicKey.x448:
        case M7.publicKey.pqc_mlkem_x25519:
          return { sessionKeyAlgorithm: null, sessionKey: r9 };
        default:
          throw Error("Unsupported public key algorithm");
      }
    })(this.version, this.publicKeyAlgorithm, a8, t8);
    if (3 === this.version) {
      const e9 = !Ps.has(this.publicKeyAlgorithm);
      if (this.sessionKeyAlgorithm = e9 ? s8 : this.sessionKeyAlgorithm, n8.length !== Pr(this.sessionKeyAlgorithm).keySize) throw Error("Unexpected session key size");
    }
    this.sessionKey = n8;
  }
};
function Ds(e8, t8, r8, i8) {
  switch (t8) {
    case M7.publicKey.rsaEncrypt:
    case M7.publicKey.rsaEncryptSign:
    case M7.publicKey.elgamal:
    case M7.publicKey.ecdh:
    case M7.publicKey.aead:
      return _5.concatUint8Array([new Uint8Array(6 === e8 ? [] : [r8]), i8, _5.writeChecksum(i8.subarray(i8.length % 8))]);
    case M7.publicKey.x25519:
    case M7.publicKey.x448:
    case M7.publicKey.pqc_mlkem_x25519:
      return i8;
    default:
      throw Error("Unsupported public key algorithm");
  }
}
var xs = class _xs {
  static get tag() {
    return M7.packet.symEncryptedSessionKey;
  }
  constructor(e8 = L4) {
    this.version = e8.aeadProtect ? 6 : 4, this.sessionKey = null, this.sessionKeyEncryptionAlgorithm = null, this.sessionKeyAlgorithm = null, this.aeadAlgorithm = M7.write(M7.aead, e8.preferredAEADAlgorithm), this.encrypted = null, this.s2k = null, this.iv = null;
  }
  read(e8) {
    let t8 = 0;
    if (this.version = e8[t8++], 4 !== this.version && 5 !== this.version && 6 !== this.version) throw new st3(`Version ${this.version} of the SKESK packet is unsupported.`);
    6 === this.version && t8++;
    const r8 = e8[t8++];
    this.version >= 5 && (this.aeadAlgorithm = e8[t8++], 6 === this.version && t8++);
    const i8 = e8[t8++];
    if (this.s2k = an(i8), t8 += this.s2k.read(e8.subarray(t8, e8.length)), this.version >= 5) {
      const r9 = _a(this.aeadAlgorithm, true);
      this.iv = e8.subarray(t8, t8 += r9.ivLength);
    }
    this.version >= 5 || t8 < e8.length ? (this.encrypted = e8.subarray(t8, e8.length), this.sessionKeyEncryptionAlgorithm = r8) : this.sessionKeyAlgorithm = r8;
  }
  write() {
    const e8 = null === this.encrypted ? this.sessionKeyAlgorithm : this.sessionKeyEncryptionAlgorithm;
    let t8;
    const r8 = this.s2k.write();
    if (6 === this.version) {
      const i8 = r8.length, a8 = 3 + i8 + this.iv.length;
      t8 = _5.concatUint8Array([new Uint8Array([this.version, a8, e8, this.aeadAlgorithm, i8]), r8, this.iv, this.encrypted]);
    } else 5 === this.version ? t8 = _5.concatUint8Array([new Uint8Array([this.version, e8, this.aeadAlgorithm]), r8, this.iv, this.encrypted]) : (t8 = _5.concatUint8Array([new Uint8Array([this.version, e8]), r8]), null !== this.encrypted && (t8 = _5.concatUint8Array([t8, this.encrypted])));
    return t8;
  }
  async decrypt(e8, t8 = L4) {
    const r8 = null !== this.sessionKeyEncryptionAlgorithm ? this.sessionKeyEncryptionAlgorithm : this.sessionKeyAlgorithm, { blockSize: i8, keySize: a8 } = Pr(r8), n8 = await this.s2k.produceKey(e8, a8, t8);
    if (this.version >= 5) {
      const e9 = _a(this.aeadAlgorithm, true), t9 = new Uint8Array([192 | _xs.tag, this.version, this.sessionKeyEncryptionAlgorithm, this.aeadAlgorithm]), i9 = 6 === this.version ? await Cr(M7.hash.sha256, n8, new Uint8Array(), t9, a8) : n8, s8 = await e9(r8, i9);
      this.sessionKey = await s8.decrypt(this.encrypted, this.iv, t9);
    } else if (null !== this.encrypted) {
      const e9 = await ea(r8, n8, this.encrypted, new Uint8Array(i8));
      if (this.sessionKeyAlgorithm = M7.write(M7.symmetric, e9[0]), this.sessionKey = e9.subarray(1, e9.length), this.sessionKey.length !== Pr(this.sessionKeyAlgorithm).keySize) throw Error("Unexpected session key size");
    } else this.sessionKey = n8;
  }
  async encrypt(e8, t8 = L4) {
    const r8 = null !== this.sessionKeyEncryptionAlgorithm ? this.sessionKeyEncryptionAlgorithm : this.sessionKeyAlgorithm;
    this.sessionKeyEncryptionAlgorithm = r8, this.s2k = nn(t8), this.s2k.generateSalt();
    const { blockSize: i8, keySize: a8 } = Pr(r8), n8 = await this.s2k.produceKey(e8, a8, t8);
    if (null === this.sessionKey && (this.sessionKey = Ga(this.sessionKeyAlgorithm)), this.version >= 5) {
      const e9 = _a(this.aeadAlgorithm);
      this.iv = de3(e9.ivLength);
      const t9 = new Uint8Array([192 | _xs.tag, this.version, this.sessionKeyEncryptionAlgorithm, this.aeadAlgorithm]), i9 = 6 === this.version ? await Cr(M7.hash.sha256, n8, new Uint8Array(), t9, a8) : n8, s8 = await e9(r8, i9);
      this.encrypted = await s8.encrypt(this.sessionKey, this.iv, t9);
    } else {
      const e9 = _5.concatUint8Array([new Uint8Array([this.sessionKeyAlgorithm]), this.sessionKey]);
      this.encrypted = await Ji(r8, n8, e9, new Uint8Array(i8));
    }
  }
};
var Cs = class _Cs {
  static get tag() {
    return M7.packet.publicKey;
  }
  constructor(e8 = /* @__PURE__ */ new Date(), t8 = L4) {
    this.version = t8.v6Keys ? 6 : 4, this.created = _5.normalizeDate(e8), this.algorithm = null, this.publicParams = null, this.expirationTimeV3 = 0, this.fingerprint = null, this.keyID = null;
  }
  static fromSecretKeyPacket(e8) {
    const t8 = new _Cs(), { version: r8, created: i8, algorithm: a8, publicParams: n8, keyID: s8, fingerprint: o8 } = e8;
    return t8.version = r8, t8.created = i8, t8.algorithm = a8, t8.publicParams = n8, t8.keyID = s8, t8.fingerprint = o8, t8;
  }
  async read(e8, t8 = L4) {
    let r8 = 0;
    if (this.version = e8[r8++], 5 === this.version && !t8.enableParsingV5Entities) throw new st3("Support for parsing v5 entities is disabled; turn on `config.enableParsingV5Entities` if needed");
    if (4 === this.version || 5 === this.version || 6 === this.version) {
      this.created = _5.readDate(e8.subarray(r8, r8 + 4)), r8 += 4, this.algorithm = e8[r8++], this.version >= 5 && (r8 += 4);
      const { read: t9, publicParams: i8 } = (function(e9, t10) {
        let r9 = 0;
        switch (e9) {
          case M7.publicKey.rsaEncrypt:
          case M7.publicKey.rsaEncryptSign:
          case M7.publicKey.rsaSign: {
            const e10 = _5.readMPI(t10.subarray(r9));
            r9 += e10.length + 2;
            const i9 = _5.readMPI(t10.subarray(r9));
            return r9 += i9.length + 2, { read: r9, publicParams: { n: e10, e: i9 } };
          }
          case M7.publicKey.dsa: {
            const e10 = _5.readMPI(t10.subarray(r9));
            r9 += e10.length + 2;
            const i9 = _5.readMPI(t10.subarray(r9));
            r9 += i9.length + 2;
            const a8 = _5.readMPI(t10.subarray(r9));
            r9 += a8.length + 2;
            const n8 = _5.readMPI(t10.subarray(r9));
            return r9 += n8.length + 2, { read: r9, publicParams: { p: e10, q: i9, g: a8, y: n8 } };
          }
          case M7.publicKey.elgamal: {
            const e10 = _5.readMPI(t10.subarray(r9));
            r9 += e10.length + 2;
            const i9 = _5.readMPI(t10.subarray(r9));
            r9 += i9.length + 2;
            const a8 = _5.readMPI(t10.subarray(r9));
            return r9 += a8.length + 2, { read: r9, publicParams: { p: e10, g: i9, y: a8 } };
          }
          case M7.publicKey.ecdsa: {
            const e10 = new Ze2();
            r9 += e10.read(t10), Va(e10);
            const i9 = _5.readMPI(t10.subarray(r9));
            return r9 += i9.length + 2, { read: r9, publicParams: { oid: e10, Q: i9 } };
          }
          case M7.publicKey.eddsaLegacy: {
            const e10 = new Ze2();
            if (r9 += e10.read(t10), Va(e10), e10.getName() !== M7.curve.ed25519Legacy) throw Error("Unexpected OID for eddsaLegacy");
            let i9 = _5.readMPI(t10.subarray(r9));
            return r9 += i9.length + 2, i9 = _5.leftPad(i9, 33), { read: r9, publicParams: { oid: e10, Q: i9 } };
          }
          case M7.publicKey.ecdh: {
            const e10 = new Ze2();
            r9 += e10.read(t10), Va(e10);
            const i9 = _5.readMPI(t10.subarray(r9));
            r9 += i9.length + 2;
            const a8 = new Oi();
            return r9 += a8.read(t10.subarray(r9)), { read: r9, publicParams: { oid: e10, Q: i9, kdfParams: a8 } };
          }
          case M7.publicKey.ed25519:
          case M7.publicKey.ed448:
          case M7.publicKey.x25519:
          case M7.publicKey.x448: {
            const i9 = _5.readExactSubarray(t10, r9, r9 + Wa(e9));
            return r9 += i9.length, { read: r9, publicParams: { A: i9 } };
          }
          case M7.publicKey.hmac:
          case M7.publicKey.aead: {
            const e10 = new Vi();
            r9 += e10.read(t10);
            const i9 = Le2(M7.hash.sha256), a8 = t10.subarray(r9, r9 + i9);
            return r9 += i9, { read: r9, publicParams: { cipher: e10, digest: a8 } };
          }
          case M7.publicKey.pqc_mlkem_x25519: {
            const e10 = _5.readExactSubarray(t10, r9, r9 + Wa(M7.publicKey.x25519));
            r9 += e10.length;
            const i9 = _5.readExactSubarray(t10, r9, r9 + 1184);
            return r9 += i9.length, { read: r9, publicParams: { eccPublicKey: e10, mlkemPublicKey: i9 } };
          }
          case M7.publicKey.pqc_mldsa_ed25519: {
            const e10 = _5.readExactSubarray(t10, r9, r9 + Wa(M7.publicKey.ed25519));
            r9 += e10.length;
            const i9 = _5.readExactSubarray(t10, r9, r9 + 1952);
            return r9 += i9.length, { read: r9, publicParams: { eccPublicKey: e10, mldsaPublicKey: i9 } };
          }
          default:
            throw new st3("Unknown public key encryption algorithm.");
        }
      })(this.algorithm, e8.subarray(r8));
      if (6 === this.version && i8.oid && (i8.oid.getName() === M7.curve.curve25519Legacy || i8.oid.getName() === M7.curve.ed25519Legacy)) throw Error("Legacy curve25519 cannot be used with v6 keys");
      if (6 !== this.version && this.algorithm === M7.publicKey.pqc_mldsa_ed25519) throw Error("Unexpected key version: ML-DSA algorithms can only be used with v6 keys");
      return this.publicParams = i8, r8 += t9, await this.computeFingerprintAndKeyID(), r8;
    }
    throw new st3(`Version ${this.version} of the key packet is unsupported.`);
  }
  write() {
    const e8 = [];
    e8.push(new Uint8Array([this.version])), e8.push(_5.writeDate(this.created)), e8.push(new Uint8Array([this.algorithm]));
    const t8 = Oa(this.algorithm, this.publicParams);
    return this.version >= 5 && e8.push(_5.writeNumber(t8.length, 4)), e8.push(t8), _5.concatUint8Array(e8);
  }
  writeForHash(e8) {
    const t8 = this.writePublicKey(), r8 = 149 + e8, i8 = e8 >= 5 ? 4 : 2;
    return _5.concatUint8Array([new Uint8Array([r8]), _5.writeNumber(t8.length, i8), t8]);
  }
  isDecrypted() {
    return null;
  }
  getCreationTime() {
    return this.created;
  }
  getKeyID() {
    return this.keyID;
  }
  async computeFingerprintAndKeyID() {
    if (await this.computeFingerprint(), this.keyID = new ts(), this.version >= 5) this.keyID.read(this.fingerprint.subarray(0, 8));
    else {
      if (4 !== this.version) throw Error("Unsupported key version");
      this.keyID.read(this.fingerprint.subarray(12, 20));
    }
  }
  async computeFingerprint() {
    const e8 = this.writeForHash(this.version);
    if (this.version >= 5) this.fingerprint = await Me(M7.hash.sha256, e8);
    else {
      if (4 !== this.version) throw Error("Unsupported key version");
      this.fingerprint = await Me(M7.hash.sha1, e8);
    }
  }
  getFingerprintBytes() {
    return this.fingerprint;
  }
  getFingerprint() {
    return _5.uint8ArrayToHex(this.getFingerprintBytes());
  }
  hasSameFingerprintAs(e8) {
    return this.version === e8.version && _5.equalsUint8Array(this.writePublicKey(), e8.writePublicKey());
  }
  getAlgorithmInfo() {
    const e8 = {};
    e8.algorithm = M7.read(M7.publicKey, this.algorithm);
    const t8 = this.publicParams.n || this.publicParams.p;
    return t8 ? e8.bits = _5.uint8ArrayBitLength(t8) : this.publicParams.oid ? e8.curve = this.publicParams.oid.getName() : this.publicParams.cipher && (e8.symmetric = this.publicParams.cipher.getName()), e8;
  }
};
Cs.prototype.readPublicKey = Cs.prototype.read, Cs.prototype.writePublicKey = Cs.prototype.write;
var Is = /* @__PURE__ */ _5.constructAllowedPackets([es, gs, cs, ns]);
var Ts = class {
  static get tag() {
    return M7.packet.symmetricallyEncryptedData;
  }
  constructor() {
    this.encrypted = null, this.packets = null;
  }
  read(e8) {
    this.encrypted = e8;
  }
  write() {
    return this.encrypted;
  }
  async decrypt(e8, t8, r8 = L4) {
    if (!r8.allowUnauthenticatedMessages) throw Error("Message is not authenticated.");
    const { blockSize: i8 } = Pr(e8), a8 = await D7(E7(this.encrypted)), n8 = await ea(e8, t8, a8.subarray(i8 + 2), a8.subarray(2, i8 + 2));
    this.packets = await hs.fromBinary(n8, Is, r8);
  }
  async encrypt(e8, t8, r8 = L4) {
    const i8 = this.packets.write(), { blockSize: a8 } = Pr(e8), n8 = await Zi(e8), s8 = await Ji(e8, t8, n8, new Uint8Array(a8)), o8 = await Ji(e8, t8, i8, s8.subarray(2));
    this.encrypted = _5.concat([s8, o8]);
  }
};
var Ms = class _Ms extends Cs {
  static get tag() {
    return M7.packet.publicSubkey;
  }
  constructor(e8, t8) {
    super(e8, t8);
  }
  static fromSecretSubkeyPacket(e8) {
    const t8 = new _Ms(), { version: r8, created: i8, algorithm: a8, publicParams: n8, keyID: s8, fingerprint: o8 } = e8;
    return t8.version = r8, t8.created = i8, t8.algorithm = a8, t8.publicParams = n8, t8.keyID = s8, t8.fingerprint = o8, t8;
  }
};
var Ls = class _Ls {
  static get tag() {
    return M7.packet.userAttribute;
  }
  constructor() {
    this.attributes = [];
  }
  read(e8) {
    let t8 = 0;
    for (; t8 < e8.length; ) {
      const r8 = Je(e8.subarray(t8, e8.length));
      t8 += r8.offset, this.attributes.push(_5.uint8ArrayToString(e8.subarray(t8, t8 + r8.len))), t8 += r8.len;
    }
  }
  write() {
    const e8 = [];
    for (let t8 = 0; t8 < this.attributes.length; t8++) e8.push(et3(this.attributes[t8].length)), e8.push(_5.stringToUint8Array(this.attributes[t8]));
    return _5.concatUint8Array(e8);
  }
  equals(e8) {
    return !!(e8 && e8 instanceof _Ls) && this.attributes.every((function(t8, r8) {
      return t8 === e8.attributes[r8];
    }));
  }
};
var Fs = class extends Cs {
  static get tag() {
    return M7.packet.secretKey;
  }
  constructor(e8 = /* @__PURE__ */ new Date(), t8 = L4) {
    super(e8, t8), this.keyMaterial = null, this.isEncrypted = null, this.s2kUsage = 0, this.s2k = null, this.symmetric = null, this.aead = null, this.isLegacyAEAD = null, this.privateParams = null, this.usedModernAEAD = null;
  }
  async read(e8, t8 = L4) {
    let r8 = await this.readPublicKey(e8, t8);
    const i8 = r8;
    this.s2kUsage = e8[r8++], 5 === this.version && r8++, 6 === this.version && this.s2kUsage && r8++;
    try {
      if (255 === this.s2kUsage || 254 === this.s2kUsage || 253 === this.s2kUsage) {
        this.symmetric = e8[r8++], 253 === this.s2kUsage && (this.aead = e8[r8++]), 6 === this.version && r8++;
        const t9 = e8[r8++];
        if (this.s2k = an(t9), r8 += this.s2k.read(e8.subarray(r8, e8.length)), "gnu-dummy" === this.s2k.type) return;
      } else this.s2kUsage && (this.symmetric = this.s2kUsage);
      this.s2kUsage && (this.isLegacyAEAD = 253 === this.s2kUsage && (5 === this.version || 4 === this.version && t8.parseAEADEncryptedV4KeysAsLegacy), 253 !== this.s2kUsage || this.isLegacyAEAD ? (this.iv = e8.subarray(r8, r8 + Pr(this.symmetric).blockSize), this.usedModernAEAD = false) : (this.iv = e8.subarray(r8, r8 + _a(this.aead).ivLength), this.usedModernAEAD = true), r8 += this.iv.length);
    } catch (t9) {
      if (!this.s2kUsage) throw t9;
      this.unparseableKeyMaterial = e8.subarray(i8), this.isEncrypted = true;
    }
    if (5 === this.version && (r8 += 4), this.keyMaterial = e8.subarray(r8), this.isEncrypted = !!this.s2kUsage, !this.isEncrypted) {
      let e9;
      if (6 === this.version) e9 = this.keyMaterial;
      else if (e9 = this.keyMaterial.subarray(0, -2), !_5.equalsUint8Array(_5.writeChecksum(e9), this.keyMaterial.subarray(-2))) throw Error("Key checksum mismatch");
      try {
        const { read: t9, privateParams: r9 } = await za(this.algorithm, e9, this.publicParams);
        if (t9 < e9.length) throw Error("Error reading MPIs");
        this.privateParams = r9;
      } catch (e10) {
        if (e10 instanceof st3) throw e10;
        throw Error("Error reading MPIs");
      }
    }
  }
  write() {
    const e8 = this.writePublicKey();
    if (this.unparseableKeyMaterial) return _5.concatUint8Array([e8, this.unparseableKeyMaterial]);
    const t8 = [e8];
    t8.push(new Uint8Array([this.s2kUsage]));
    const r8 = [];
    if (255 === this.s2kUsage || 254 === this.s2kUsage || 253 === this.s2kUsage) {
      r8.push(this.symmetric), 253 === this.s2kUsage && r8.push(this.aead);
      const e9 = this.s2k.write();
      6 === this.version && r8.push(e9.length), r8.push(...e9);
    }
    return this.s2kUsage && "gnu-dummy" !== this.s2k.type && r8.push(...this.iv), (5 === this.version || 6 === this.version && this.s2kUsage) && t8.push(new Uint8Array([r8.length])), t8.push(new Uint8Array(r8)), this.isDummy() || (this.s2kUsage || (this.keyMaterial = Oa(this.algorithm, this.privateParams)), 5 === this.version && t8.push(_5.writeNumber(this.keyMaterial.length, 4)), t8.push(this.keyMaterial), this.s2kUsage || 6 === this.version || t8.push(_5.writeChecksum(this.keyMaterial))), _5.concatUint8Array(t8);
  }
  isDecrypted() {
    return false === this.isEncrypted;
  }
  isMissingSecretKeyMaterial() {
    return void 0 !== this.unparseableKeyMaterial || this.isDummy();
  }
  isDummy() {
    return !(!this.s2k || "gnu-dummy" !== this.s2k.type);
  }
  makeDummy(e8 = L4) {
    this.isDummy() || (this.isDecrypted() && this.clearPrivateParams(), delete this.unparseableKeyMaterial, this.isEncrypted = null, this.keyMaterial = null, this.s2k = an(M7.s2k.gnu, e8), this.s2k.algorithm = 0, this.s2k.c = 0, this.s2k.type = "gnu-dummy", this.s2kUsage = 254, this.symmetric = M7.symmetric.aes256, this.isLegacyAEAD = null, this.usedModernAEAD = null);
  }
  async encrypt(e8, t8 = L4) {
    if (this.isDummy()) return;
    if (!this.isDecrypted()) throw Error("Key packet is already encrypted");
    if (!e8) throw Error("A non-empty passphrase is required for key encryption.");
    this.s2k = nn(t8), this.s2k.generateSalt();
    const r8 = Oa(this.algorithm, this.privateParams);
    this.symmetric = M7.symmetric.aes256;
    const { blockSize: i8 } = Pr(this.symmetric);
    if (t8.aeadProtect) {
      this.s2kUsage = 253, this.aead = t8.preferredAEADAlgorithm;
      const a8 = _a(this.aead);
      this.isLegacyAEAD = 5 === this.version, this.usedModernAEAD = !this.isLegacyAEAD;
      const n8 = rt3(this.constructor.tag), s8 = await _s(this.version, this.s2k, e8, this.symmetric, this.aead, n8, this.isLegacyAEAD, t8), o8 = await a8(this.symmetric, s8);
      this.iv = this.isLegacyAEAD ? de3(i8) : de3(a8.ivLength);
      const c7 = this.isLegacyAEAD ? new Uint8Array() : _5.concatUint8Array([n8, this.writePublicKey()]);
      this.keyMaterial = await o8.encrypt(r8, this.iv.subarray(0, a8.ivLength), c7);
    } else {
      this.s2kUsage = 254, this.usedModernAEAD = false;
      const a8 = await _s(this.version, this.s2k, e8, this.symmetric, void 0, void 0, void 0, t8);
      this.iv = de3(i8), this.keyMaterial = await Ji(this.symmetric, a8, _5.concatUint8Array([r8, await Me(M7.hash.sha1, r8)]), this.iv);
    }
  }
  async decrypt(e8, t8 = L4) {
    if (this.isDummy()) return false;
    if (this.unparseableKeyMaterial) throw Error("Key packet cannot be decrypted: unsupported S2K or cipher algo");
    if (this.isDecrypted()) throw Error("Key packet is already decrypted.");
    let r8;
    const i8 = rt3(this.constructor.tag);
    if (254 !== this.s2kUsage && 253 !== this.s2kUsage) throw 255 === this.s2kUsage ? Error("Encrypted private key is authenticated using an insecure two-byte hash") : Error("Private key is encrypted using an insecure S2K function: unsalted MD5");
    let a8;
    if (r8 = await _s(this.version, this.s2k, e8, this.symmetric, this.aead, i8, this.isLegacyAEAD, t8), 253 === this.s2kUsage) {
      const e9 = _a(this.aead, true), t9 = await e9(this.symmetric, r8);
      try {
        const r9 = this.isLegacyAEAD ? new Uint8Array() : _5.concatUint8Array([i8, this.writePublicKey()]);
        a8 = await t9.decrypt(this.keyMaterial, this.iv.subarray(0, e9.ivLength), r9);
      } catch (e10) {
        if ("Authentication tag mismatch" === e10.message) throw Error("Incorrect key passphrase: " + e10.message);
        throw e10;
      }
    } else {
      const e9 = await ea(this.symmetric, r8, this.keyMaterial, this.iv);
      a8 = e9.subarray(0, -20);
      const t9 = await Me(M7.hash.sha1, a8);
      if (!_5.equalsUint8Array(t9, e9.subarray(-20))) throw Error("Incorrect key passphrase");
    }
    try {
      const { privateParams: e9 } = await za(this.algorithm, a8, this.publicParams);
      this.privateParams = e9;
    } catch {
      throw Error("Error reading MPIs");
    }
    this.isEncrypted = false, this.keyMaterial = null, this.s2kUsage = 0, this.aead = null, this.symmetric = null, this.isLegacyAEAD = null;
  }
  async validate() {
    if (this.isDummy()) return;
    if (!this.isDecrypted()) throw Error("Key is not decrypted");
    if (this.usedModernAEAD) return;
    let e8;
    try {
      e8 = await Ha(this.algorithm, this.publicParams, this.privateParams);
    } catch {
      e8 = false;
    }
    if (!e8) throw Error("Key is invalid");
  }
  async generate(e8, t8, r8) {
    if (6 === this.version && (this.algorithm === M7.publicKey.ecdh && t8 === M7.curve.curve25519Legacy || this.algorithm === M7.publicKey.eddsaLegacy)) throw Error(`Cannot generate v6 keys of type 'ecc' with curve ${t8}. Generate a key of type 'curve25519' instead`);
    if (6 !== this.version && this.algorithm === M7.publicKey.pqc_mldsa_ed25519) throw Error(`Cannot generate v${this.version} signing keys of type 'pqc'. Generate a v6 key instead`);
    const { privateParams: i8, publicParams: a8 } = await ja(this.algorithm, e8, t8, r8);
    this.privateParams = i8, this.publicParams = a8, this.isEncrypted = false;
  }
  clearPrivateParams() {
    this.isMissingSecretKeyMaterial() || (Object.keys(this.privateParams).forEach(((e8) => {
      this.privateParams[e8].fill(0), delete this.privateParams[e8];
    })), this.privateParams = null, this.isEncrypted = true);
  }
};
async function _s(e8, t8, r8, i8, a8, n8, s8, o8) {
  if ("argon2" === t8.type && !a8) throw Error("Using Argon2 S2K without AEAD is not allowed");
  if ("simple" === t8.type && 6 === e8) throw Error("Using Simple S2K with version 6 keys is not allowed");
  const { keySize: c7 } = Pr(i8), u8 = await t8.produceKey(r8, c7, o8);
  if (!a8 || 5 === e8 || s8) return u8;
  const h7 = _5.concatUint8Array([n8, new Uint8Array([e8, i8, a8])]);
  return Cr(M7.hash.sha256, u8, new Uint8Array(), h7, c7);
}
var Ns = class _Ns {
  static get tag() {
    return M7.packet.userID;
  }
  constructor() {
    this.userID = "", this.name = "", this.email = "", this.comment = "";
  }
  static fromObject(e8) {
    if (_5.isString(e8) || e8.name && !_5.isString(e8.name) || e8.email && !_5.isEmailAddress(e8.email) || e8.comment && !_5.isString(e8.comment)) throw Error("Invalid user ID format");
    const t8 = new _Ns();
    Object.assign(t8, e8);
    const r8 = [];
    return t8.name && r8.push(t8.name), t8.comment && r8.push(`(${t8.comment})`), t8.email && r8.push(`<${t8.email}>`), t8.userID = r8.join(" "), t8;
  }
  read(e8, t8 = L4) {
    const r8 = _5.decodeUTF8(e8);
    if (r8.length > t8.maxUserIDLength) throw Error("User ID string is too long");
    const i8 = (e9) => /^[^\s@]+@[^\s@]+$/.test(e9), a8 = r8.indexOf("<"), n8 = r8.lastIndexOf(">");
    if (-1 !== a8 && -1 !== n8 && n8 > a8) {
      const e9 = r8.substring(a8 + 1, n8);
      if (i8(e9)) {
        this.email = e9;
        const t9 = r8.substring(0, a8).trim(), i9 = t9.indexOf("("), n9 = t9.lastIndexOf(")");
        -1 !== i9 && -1 !== n9 && n9 > i9 ? (this.comment = t9.substring(i9 + 1, n9).trim(), this.name = t9.substring(0, i9).trim()) : (this.name = t9, this.comment = "");
      }
    } else i8(r8.trim()) && (this.email = r8.trim(), this.name = "", this.comment = "");
    this.userID = r8;
  }
  write() {
    return _5.encodeUTF8(this.userID);
  }
  equals(e8) {
    return e8 && e8.userID === this.userID;
  }
};
var Rs = class extends Fs {
  static get tag() {
    return M7.packet.secretSubkey;
  }
  constructor(e8 = /* @__PURE__ */ new Date(), t8 = L4) {
    super(e8, t8);
  }
};
var js = /* @__PURE__ */ _5.constructAllowedPackets([ns]);
var qs = class {
  constructor(e8) {
    this.packets = e8 || new hs();
  }
  write() {
    return this.packets.write();
  }
  armor(e8 = L4) {
    const t8 = this.packets.some(((e9) => e9.constructor.tag === ns.tag && 6 !== e9.version));
    return J5(M7.armor.signature, this.write(), void 0, void 0, void 0, t8, e8);
  }
  getSigningKeyIDs() {
    return this.packets.map(((e8) => e8.issuerKeyID));
  }
};
async function Hs({ armoredSignature: e8, binarySignature: t8, config: r8, ...i8 }) {
  r8 = { ...L4, ...r8 };
  let a8 = e8 || t8;
  if (!a8) throw Error("readSignature: must pass options object containing `armoredSignature` or `binarySignature`");
  if (e8 && !_5.isString(e8)) throw Error("readSignature: options.armoredSignature must be a string");
  if (t8 && !_5.isUint8Array(t8)) throw Error("readSignature: options.binarySignature must be a Uint8Array");
  const n8 = Object.keys(i8);
  if (n8.length > 0) throw Error("Unknown option: " + n8.join(", "));
  if (e8) {
    const { type: e9, data: t9 } = await Z4(a8);
    if (e9 !== M7.armor.signature) throw Error("Armored text not of type signature");
    a8 = t9;
  }
  const s8 = await hs.fromBinary(a8, js, r8);
  return new qs(s8);
}
async function Gs(e8, t8) {
  const r8 = new Rs(e8.date, t8);
  return r8.packets = null, r8.algorithm = M7.write(M7.publicKey, e8.algorithm), await r8.generate(e8.rsaBits, e8.curve, e8.symmetric), await r8.computeFingerprintAndKeyID(), r8;
}
async function Vs(e8, t8) {
  const r8 = new Fs(e8.date, t8);
  return r8.packets = null, r8.algorithm = M7.write(M7.publicKey, e8.algorithm), await r8.generate(e8.rsaBits, e8.curve, e8.symmetric), await r8.computeFingerprintAndKeyID(), r8;
}
async function Ws(e8, t8, r8, i8, a8 = /* @__PURE__ */ new Date(), n8) {
  let s8, o8;
  for (let c7 = e8.length - 1; c7 >= 0; c7--) try {
    (!s8 || e8[c7].created >= s8.created) && (await e8[c7].verify(t8, r8, i8, a8, void 0, n8), s8 = e8[c7]);
  } catch (e9) {
    o8 = e9;
  }
  if (!s8) throw _5.wrapError(`Could not find valid ${M7.read(M7.signature, r8)} signature in key ${t8.getKeyID().toHex()}`.replace("certGeneric ", "self-").replace(/([a-z])([A-Z])/g, ((e9, t9, r9) => t9 + " " + r9.toLowerCase())), o8);
  return s8;
}
function $s(e8, t8, r8 = /* @__PURE__ */ new Date()) {
  const i8 = _5.normalizeDate(r8);
  if (null !== i8) {
    const r9 = eo(e8, t8);
    return !(e8.created <= i8 && i8 < r9);
  }
  return false;
}
async function Qs(e8, t8, r8, i8) {
  const a8 = {};
  a8.key = t8, a8.bind = e8;
  const n8 = { signatureType: M7.signature.subkeyBinding };
  r8.sign ? (n8.keyFlags = [M7.keyFlags.signData], n8.embeddedSignature = await Ys(a8, [], e8, { signatureType: M7.signature.keyBinding }, r8.date, void 0, void 0, void 0, i8)) : n8.keyFlags = r8.forwarding ? [M7.keyFlags.forwardedCommunication] : [M7.keyFlags.encryptCommunication | M7.keyFlags.encryptStorage], r8.keyExpirationTime > 0 && (n8.keyExpirationTime = r8.keyExpirationTime, n8.keyNeverExpires = false);
  return await Ys(a8, [], t8, n8, r8.date, void 0, void 0, void 0, i8);
}
async function Xs(e8, t8, r8 = /* @__PURE__ */ new Date(), i8 = [], a8) {
  const n8 = M7.hash.sha256, s8 = a8.preferredHashAlgorithm, o8 = await Promise.all(e8.map((async (e9, t9) => (await e9.getPrimarySelfSignature(r8, i8[t9], a8)).preferredHashAlgorithms || []))), c7 = /* @__PURE__ */ new Map();
  for (const e9 of o8) for (const t9 of e9) try {
    const e10 = M7.write(M7.hash, t9);
    c7.set(e10, c7.has(e10) ? c7.get(e10) + 1 : 1);
  } catch {
  }
  const u8 = (t9) => 0 === e8.length || c7.get(t9) === e8.length || t9 === n8, h7 = () => {
    if (0 === c7.size) return n8;
    const e9 = Array.from(c7.keys()).filter(((e10) => u8(e10))).sort(((e10, t9) => Le2(e10) - Le2(t9)))[0];
    return Le2(e9) >= Le2(n8) ? e9 : n8;
  }, l6 = /* @__PURE__ */ new Set([M7.publicKey.ecdsa, M7.publicKey.eddsaLegacy, M7.publicKey.ed25519, M7.publicKey.ed448]), y8 = /* @__PURE__ */ new Set([M7.publicKey.pqc_mldsa_ed25519]);
  if (l6.has(t8.algorithm)) {
    const e9 = (function(e10, t9) {
      switch (e10) {
        case M7.publicKey.ecdsa:
        case M7.publicKey.eddsaLegacy:
          return Xr(t9);
        case M7.publicKey.ed25519:
        case M7.publicKey.ed448:
          return gt3(e10);
        default:
          throw Error("Unknown elliptic signing algo");
      }
    })(t8.algorithm, t8.publicParams.oid), r9 = u8(s8), i9 = Le2(s8) >= Le2(e9);
    if (r9 && i9) return s8;
    {
      const t9 = h7();
      return Le2(t9) >= Le2(e9) ? t9 : e9;
    }
  }
  if (y8.has(t8.algorithm)) {
    if (u8(s8) && Ni(t8.algorithm, s8)) return s8;
    {
      const e9 = h7();
      return Ni(t8.algorithm, e9) ? e9 : n8;
    }
  }
  return u8(s8) ? s8 : h7();
}
async function Ys(e8, t8, r8, i8, a8, n8, s8 = [], o8 = false, c7) {
  if (r8.isDummy()) throw Error("Cannot sign with a gnu-dummy key.");
  if (!r8.isDecrypted()) throw Error("Signing key is not decrypted.");
  const u8 = new ns();
  return Object.assign(u8, i8), u8.publicKeyAlgorithm = r8.algorithm, u8.hashAlgorithm = await Xs(t8, r8, a8, n8, c7), u8.rawNotations = [...s8], await u8.sign(r8, e8, a8, o8, c7), u8;
}
async function Zs(e8, t8, r8, i8 = /* @__PURE__ */ new Date(), a8) {
  (e8 = e8[r8]) && (t8[r8].length ? await Promise.all(e8.map((async function(e9) {
    e9.isExpired(i8) || a8 && !await a8(e9) || t8[r8].some((function(t9) {
      return _5.equalsUint8Array(t9.writeParams(), e9.writeParams());
    })) || t8[r8].push(e9);
  }))) : t8[r8] = e8);
}
async function Js(e8, t8, r8, i8, a8, n8, s8 = /* @__PURE__ */ new Date(), o8) {
  n8 = n8 || e8;
  const c7 = [];
  return await Promise.all(i8.map((async function(e9) {
    try {
      if (!a8 || e9.issuerKeyID.equals(a8.issuerKeyID)) {
        const i9 = ![M7.reasonForRevocation.keyRetired, M7.reasonForRevocation.keySuperseded, M7.reasonForRevocation.userIDInvalid].includes(e9.reasonForRevocationFlag);
        await e9.verify(n8, t8, r8, i9 ? null : s8, false, o8), c7.push(e9.issuerKeyID);
      }
    } catch {
    }
  }))), a8 ? (a8.revoked = !!c7.some(((e9) => e9.equals(a8.issuerKeyID))) || (a8.revoked || false), a8.revoked) : c7.length > 0;
}
function eo(e8, t8) {
  let r8;
  return false === t8.keyNeverExpires && (r8 = e8.created.getTime() + 1e3 * t8.keyExpirationTime), r8 ? new Date(r8) : 1 / 0;
}
function to(e8, t8 = {}) {
  if (e8.type = e8.type || t8.type, e8.curve = e8.curve || t8.curve, e8.rsaBits = e8.rsaBits || t8.rsaBits, e8.symmetricHash = e8.symmetricHash || t8.symmetricHash, e8.symmetricCipher = e8.symmetricCipher || t8.symmetricCipher, e8.keyExpirationTime = void 0 !== e8.keyExpirationTime ? e8.keyExpirationTime : t8.keyExpirationTime, e8.passphrase = _5.isString(e8.passphrase) ? e8.passphrase : t8.passphrase, e8.date = e8.date || t8.date, e8.sign = e8.sign || false, e8.forwarding = e8.forwarding || false, e8.sign && e8.forwarding) throw Error('Incompatible options: "sign" and "forwarding" cannot be set together');
  switch (e8.type) {
    case "pqc":
      e8.sign ? e8.algorithm = M7.publicKey.pqc_mldsa_ed25519 : e8.algorithm = M7.publicKey.pqc_mlkem_x25519;
      break;
    case "ecc":
      try {
        e8.curve = M7.write(M7.curve, e8.curve);
      } catch {
        throw Error("Unknown curve");
      }
      e8.curve !== M7.curve.ed25519Legacy && e8.curve !== M7.curve.curve25519Legacy && "ed25519" !== e8.curve && "curve25519" !== e8.curve || (e8.curve = e8.sign ? M7.curve.ed25519Legacy : M7.curve.curve25519Legacy), e8.sign ? e8.algorithm = e8.curve === M7.curve.ed25519Legacy ? M7.publicKey.eddsaLegacy : M7.publicKey.ecdsa : e8.algorithm = M7.publicKey.ecdh;
      break;
    case "curve25519":
      e8.algorithm = e8.sign ? M7.publicKey.ed25519 : M7.publicKey.x25519;
      break;
    case "curve448":
      e8.algorithm = e8.sign ? M7.publicKey.ed448 : M7.publicKey.x448;
      break;
    case "rsa":
      e8.algorithm = M7.publicKey.rsaEncryptSign;
      break;
    case "symmetric":
      if (e8.sign) {
        e8.algorithm = M7.publicKey.hmac;
        try {
          e8.symmetric = M7.write(M7.hash, e8.symmetricHash);
        } catch {
          throw Error("Unknown hash algorithm");
        }
      } else {
        e8.algorithm = M7.publicKey.aead;
        try {
          e8.symmetric = M7.write(M7.symmetric, e8.symmetricCipher);
        } catch {
          throw Error("Unknown symmetric algorithm");
        }
      }
      break;
    default:
      throw Error("Unsupported key type " + e8.type);
  }
  return e8;
}
function ro(e8, t8, r8) {
  switch (e8.algorithm) {
    case M7.publicKey.rsaEncryptSign:
    case M7.publicKey.rsaSign:
    case M7.publicKey.dsa:
    case M7.publicKey.ecdsa:
    case M7.publicKey.eddsaLegacy:
    case M7.publicKey.ed25519:
    case M7.publicKey.ed448:
    case M7.publicKey.hmac:
    case M7.publicKey.pqc_mldsa_ed25519:
      if (!t8.keyFlags && !r8.allowMissingKeyFlags) throw Error("None of the key flags is set: consider passing `config.allowMissingKeyFlags`");
      return !t8.keyFlags || !!(t8.keyFlags[0] & M7.keyFlags.signData);
    default:
      return false;
  }
}
function io(e8, t8, r8) {
  switch (e8.algorithm) {
    case M7.publicKey.rsaEncryptSign:
    case M7.publicKey.rsaEncrypt:
    case M7.publicKey.elgamal:
    case M7.publicKey.ecdh:
    case M7.publicKey.x25519:
    case M7.publicKey.x448:
    case M7.publicKey.aead:
    case M7.publicKey.pqc_mlkem_x25519:
      if (!t8.keyFlags && !r8.allowMissingKeyFlags) throw Error("None of the key flags is set: consider passing `config.allowMissingKeyFlags`");
      return !t8.keyFlags || !!(t8.keyFlags[0] & M7.keyFlags.encryptCommunication) || !!(t8.keyFlags[0] & M7.keyFlags.encryptStorage);
    default:
      return false;
  }
}
function ao(e8, t8, r8) {
  if (!t8.keyFlags && !r8.allowMissingKeyFlags) throw Error("None of the key flags is set: consider passing `config.allowMissingKeyFlags`");
  switch (e8.algorithm) {
    case M7.publicKey.rsaEncryptSign:
    case M7.publicKey.rsaEncrypt:
    case M7.publicKey.elgamal:
    case M7.publicKey.ecdh:
    case M7.publicKey.x25519:
    case M7.publicKey.x448:
    case M7.publicKey.pqc_mlkem_x25519:
      return !(!(!t8.keyFlags || !!(t8.keyFlags[0] & M7.keyFlags.signData)) || !r8.allowInsecureDecryptionWithSigningKeys) || (!t8.keyFlags || !!(t8.keyFlags[0] & M7.keyFlags.encryptCommunication) || !!(t8.keyFlags[0] & M7.keyFlags.encryptStorage) || r8.allowForwardedMessages && !!(t8.keyFlags[0] & M7.keyFlags.forwardedCommunication));
    default:
      return false;
  }
}
function no(e8, t8) {
  const r8 = M7.write(M7.publicKey, e8.algorithm), i8 = e8.getAlgorithmInfo();
  if (t8.rejectPublicKeyAlgorithms.has(r8)) throw Error(i8.algorithm + " keys are considered too weak.");
  switch (r8) {
    case M7.publicKey.rsaEncryptSign:
    case M7.publicKey.rsaSign:
    case M7.publicKey.rsaEncrypt:
      if (i8.bits < t8.minRSABits) throw Error(`RSA keys shorter than ${t8.minRSABits} bits are considered too weak.`);
      break;
    case M7.publicKey.ecdsa:
    case M7.publicKey.eddsaLegacy:
    case M7.publicKey.ecdh:
      if (t8.rejectCurves.has(i8.curve)) throw Error(`Support for ${i8.algorithm} keys using curve ${i8.curve} is disabled.`);
  }
}
var so = class _so {
  constructor(e8, t8) {
    this.userID = e8.constructor.tag === M7.packet.userID ? e8 : null, this.userAttribute = e8.constructor.tag === M7.packet.userAttribute ? e8 : null, this.selfCertifications = [], this.otherCertifications = [], this.revocationSignatures = [], this.mainKey = t8;
  }
  toPacketList() {
    const e8 = new hs();
    return e8.push(this.userID || this.userAttribute), e8.push(...this.revocationSignatures), e8.push(...this.selfCertifications), e8.push(...this.otherCertifications), e8;
  }
  clone() {
    const e8 = new _so(this.userID || this.userAttribute, this.mainKey);
    return e8.selfCertifications = [...this.selfCertifications], e8.otherCertifications = [...this.otherCertifications], e8.revocationSignatures = [...this.revocationSignatures], e8;
  }
  async certify(e8, t8, r8) {
    const i8 = this.mainKey.keyPacket, a8 = { userID: this.userID, userAttribute: this.userAttribute, key: i8 }, n8 = new _so(a8.userID || a8.userAttribute, this.mainKey);
    return n8.otherCertifications = await Promise.all(e8.map((async function(e9) {
      if (!e9.isPrivate()) throw Error("Need private key for signing");
      if (e9.hasSameFingerprintAs(i8)) throw Error("The user's own key can only be used for self-certifications");
      const n9 = await e9.getSigningKey(void 0, t8, void 0, r8);
      return Ys(a8, [e9], n9.keyPacket, { signatureType: M7.signature.certGeneric, keyFlags: [M7.keyFlags.certifyKeys | M7.keyFlags.signData] }, t8, void 0, void 0, void 0, r8);
    }))), await n8.update(this, t8, r8), n8;
  }
  async isRevoked(e8, t8, r8 = /* @__PURE__ */ new Date(), i8 = L4) {
    const a8 = this.mainKey.keyPacket;
    return Js(a8, M7.signature.certRevocation, { key: a8, userID: this.userID, userAttribute: this.userAttribute }, this.revocationSignatures, e8, t8, r8, i8);
  }
  async verifyCertificate(e8, t8, r8 = /* @__PURE__ */ new Date(), i8) {
    const a8 = this, n8 = this.mainKey.keyPacket, s8 = { userID: this.userID, userAttribute: this.userAttribute, key: n8 }, { issuerKeyID: o8 } = e8, c7 = t8.filter(((e9) => e9.getKeys(o8).length > 0));
    return 0 === c7.length ? null : (await Promise.all(c7.map((async (t9) => {
      const n9 = await t9.getSigningKey(o8, e8.created, void 0, i8);
      if (e8.revoked || await a8.isRevoked(e8, n9.keyPacket, r8, i8)) throw Error("User certificate is revoked");
      try {
        await e8.verify(n9.keyPacket, M7.signature.certGeneric, s8, r8, void 0, i8);
      } catch (e9) {
        throw _5.wrapError("User certificate is invalid", e9);
      }
    }))), true);
  }
  async verifyAllCertifications(e8, t8 = /* @__PURE__ */ new Date(), r8) {
    const i8 = this, a8 = this.selfCertifications.concat(this.otherCertifications);
    return Promise.all(a8.map((async (a9) => ({ keyID: a9.issuerKeyID, valid: await i8.verifyCertificate(a9, e8, t8, r8).catch((() => false)) }))));
  }
  async verify(e8 = /* @__PURE__ */ new Date(), t8) {
    if (!this.selfCertifications.length) throw Error("No self-certifications found");
    const r8 = this, i8 = this.mainKey.keyPacket, a8 = { userID: this.userID, userAttribute: this.userAttribute, key: i8 };
    let n8;
    for (let s8 = this.selfCertifications.length - 1; s8 >= 0; s8--) try {
      const n9 = this.selfCertifications[s8];
      if (n9.revoked || await r8.isRevoked(n9, void 0, e8, t8)) throw Error("Self-certification is revoked");
      try {
        await n9.verify(i8, M7.signature.certGeneric, a8, e8, void 0, t8);
      } catch (e9) {
        throw _5.wrapError("Self-certification is invalid", e9);
      }
      return true;
    } catch (e9) {
      n8 = e9;
    }
    throw n8;
  }
  async update(e8, t8, r8) {
    const i8 = this.mainKey.keyPacket, a8 = { userID: this.userID, userAttribute: this.userAttribute, key: i8 };
    await Zs(e8, this, "selfCertifications", t8, (async function(e9) {
      try {
        return await e9.verify(i8, M7.signature.certGeneric, a8, t8, false, r8), true;
      } catch {
        return false;
      }
    })), await Zs(e8, this, "otherCertifications", t8), await Zs(e8, this, "revocationSignatures", t8, (function(e9) {
      return Js(i8, M7.signature.certRevocation, a8, [e9], void 0, void 0, t8, r8);
    }));
  }
  async revoke(e8, { flag: t8 = M7.reasonForRevocation.noReason, string: r8 = "" } = {}, i8 = /* @__PURE__ */ new Date(), a8 = L4) {
    const n8 = { userID: this.userID, userAttribute: this.userAttribute, key: e8 }, s8 = new _so(n8.userID || n8.userAttribute, this.mainKey);
    return s8.revocationSignatures.push(await Ys(n8, [], e8, { signatureType: M7.signature.certRevocation, reasonForRevocationFlag: M7.write(M7.reasonForRevocation, t8), reasonForRevocationString: r8 }, i8, void 0, void 0, false, a8)), await s8.update(this), s8;
  }
};
var oo = class _oo {
  constructor(e8, t8) {
    this.keyPacket = e8, this.bindingSignatures = [], this.revocationSignatures = [], this.mainKey = t8;
  }
  toPacketList() {
    const e8 = new hs();
    return e8.push(this.keyPacket), e8.push(...this.revocationSignatures), e8.push(...this.bindingSignatures), e8;
  }
  clone() {
    const e8 = new _oo(this.keyPacket, this.mainKey);
    return e8.bindingSignatures = [...this.bindingSignatures], e8.revocationSignatures = [...this.revocationSignatures], e8;
  }
  async isRevoked(e8, t8, r8 = /* @__PURE__ */ new Date(), i8 = L4) {
    const a8 = this.mainKey.keyPacket;
    return Js(a8, M7.signature.subkeyRevocation, { key: a8, bind: this.keyPacket }, this.revocationSignatures, e8, t8, r8, i8);
  }
  async verify(e8 = /* @__PURE__ */ new Date(), t8 = L4) {
    const r8 = this.mainKey.keyPacket, i8 = { key: r8, bind: this.keyPacket }, a8 = await Ws(this.bindingSignatures, r8, M7.signature.subkeyBinding, i8, e8, t8);
    if (a8.revoked || await this.isRevoked(a8, null, e8, t8)) throw Error("Subkey is revoked");
    if ($s(this.keyPacket, a8, e8)) throw Error("Subkey is expired");
    return a8;
  }
  async getExpirationTime(e8 = /* @__PURE__ */ new Date(), t8 = L4) {
    const r8 = this.mainKey.keyPacket, i8 = { key: r8, bind: this.keyPacket };
    let a8;
    try {
      a8 = await Ws(this.bindingSignatures, r8, M7.signature.subkeyBinding, i8, e8, t8);
    } catch {
      return null;
    }
    const n8 = eo(this.keyPacket, a8), s8 = a8.getExpirationTime();
    return n8 < s8 ? n8 : s8;
  }
  async update(e8, t8 = /* @__PURE__ */ new Date(), r8 = L4) {
    const i8 = this.mainKey.keyPacket;
    if (!this.hasSameFingerprintAs(e8)) throw Error("Subkey update method: fingerprints of subkeys not equal");
    this.keyPacket.constructor.tag === M7.packet.publicSubkey && e8.keyPacket.constructor.tag === M7.packet.secretSubkey && (this.keyPacket = e8.keyPacket);
    const a8 = this, n8 = { key: i8, bind: a8.keyPacket };
    await Zs(e8, this, "bindingSignatures", t8, (async function(e9) {
      for (let t9 = 0; t9 < a8.bindingSignatures.length; t9++) if (a8.bindingSignatures[t9].issuerKeyID.equals(e9.issuerKeyID)) return e9.created > a8.bindingSignatures[t9].created && (a8.bindingSignatures[t9] = e9), false;
      try {
        return await e9.verify(i8, M7.signature.subkeyBinding, n8, t8, void 0, r8), true;
      } catch {
        return false;
      }
    })), await Zs(e8, this, "revocationSignatures", t8, (function(e9) {
      return Js(i8, M7.signature.subkeyRevocation, n8, [e9], void 0, void 0, t8, r8);
    }));
  }
  async revoke(e8, { flag: t8 = M7.reasonForRevocation.noReason, string: r8 = "" } = {}, i8 = /* @__PURE__ */ new Date(), a8 = L4) {
    const n8 = { key: e8, bind: this.keyPacket }, s8 = new _oo(this.keyPacket, this.mainKey);
    return s8.revocationSignatures.push(await Ys(n8, [], e8, { signatureType: M7.signature.subkeyRevocation, reasonForRevocationFlag: M7.write(M7.reasonForRevocation, t8), reasonForRevocationString: r8 }, i8, void 0, void 0, false, a8)), await s8.update(this), s8;
  }
  hasSameFingerprintAs(e8) {
    return this.keyPacket.hasSameFingerprintAs(e8.keyPacket || e8);
  }
};
["getKeyID", "getFingerprint", "getAlgorithmInfo", "getCreationTime", "isDecrypted"].forEach(((e8) => {
  oo.prototype[e8] = function() {
    return this.keyPacket[e8]();
  };
}));
var co = /* @__PURE__ */ _5.constructAllowedPackets([ns]);
var uo = /* @__PURE__ */ new Set([M7.packet.publicKey, M7.packet.privateKey]);
var ho = /* @__PURE__ */ new Set([M7.packet.publicKey, M7.packet.privateKey, M7.packet.publicSubkey, M7.packet.privateSubkey]);
var lo = class {
  packetListToStructure(e8, t8 = /* @__PURE__ */ new Set()) {
    let r8, i8, a8, n8;
    for (const s8 of e8) {
      if (s8 instanceof ut3) {
        ho.has(s8.tag) && !n8 && (n8 = uo.has(s8.tag) ? uo : ho);
        continue;
      }
      const e9 = s8.constructor.tag;
      if (n8) {
        if (!n8.has(e9)) continue;
        n8 = null;
      }
      if (t8.has(e9)) throw Error("Unexpected packet type: " + e9);
      switch (e9) {
        case M7.packet.publicKey:
        case M7.packet.secretKey:
          if (this.keyPacket) throw Error("Key block contains multiple keys");
          if (this.keyPacket = s8, i8 = this.getKeyID(), !i8) throw Error("Missing Key ID");
          break;
        case M7.packet.userID:
        case M7.packet.userAttribute:
          r8 = new so(s8, this), this.users.push(r8);
          break;
        case M7.packet.publicSubkey:
        case M7.packet.secretSubkey:
          r8 = null, a8 = new oo(s8, this), this.subkeys.push(a8);
          break;
        case M7.packet.signature:
          switch (s8.signatureType) {
            case M7.signature.certGeneric:
            case M7.signature.certPersona:
            case M7.signature.certCasual:
            case M7.signature.certPositive:
              if (!r8) {
                _5.printDebug("Dropping certification signatures without preceding user packet");
                continue;
              }
              s8.issuerKeyID.equals(i8) ? r8.selfCertifications.push(s8) : r8.otherCertifications.push(s8);
              break;
            case M7.signature.certRevocation:
              r8 ? r8.revocationSignatures.push(s8) : this.directSignatures.push(s8);
              break;
            case M7.signature.key:
              this.directSignatures.push(s8);
              break;
            case M7.signature.subkeyBinding:
              if (!a8) {
                _5.printDebug("Dropping subkey binding signature without preceding subkey packet");
                continue;
              }
              a8.bindingSignatures.push(s8);
              break;
            case M7.signature.keyRevocation:
              this.revocationSignatures.push(s8);
              break;
            case M7.signature.subkeyRevocation:
              if (!a8) {
                _5.printDebug("Dropping subkey revocation signature without preceding subkey packet");
                continue;
              }
              a8.revocationSignatures.push(s8);
          }
      }
    }
  }
  toPacketList() {
    const e8 = new hs();
    return e8.push(this.keyPacket), e8.push(...this.revocationSignatures), e8.push(...this.directSignatures), this.users.map(((t8) => e8.push(...t8.toPacketList()))), this.subkeys.map(((t8) => e8.push(...t8.toPacketList()))), e8;
  }
  clone(e8 = false) {
    const t8 = new this.constructor(this.toPacketList());
    return e8 && t8.getKeys().forEach(((e9) => {
      if (e9.keyPacket = Object.create(Object.getPrototypeOf(e9.keyPacket), Object.getOwnPropertyDescriptors(e9.keyPacket)), !e9.keyPacket.isDecrypted()) return;
      const t9 = {};
      Object.keys(e9.keyPacket.privateParams).forEach(((r8) => {
        t9[r8] = new Uint8Array(e9.keyPacket.privateParams[r8]);
      })), e9.keyPacket.privateParams = t9;
    })), t8;
  }
  getSubkeys(e8 = null) {
    return this.subkeys.filter(((t8) => !e8 || t8.getKeyID().equals(e8, true)));
  }
  getKeys(e8 = null) {
    const t8 = [];
    return e8 && !this.getKeyID().equals(e8, true) || t8.push(this), t8.concat(this.getSubkeys(e8));
  }
  getKeyIDs() {
    return this.getKeys().map(((e8) => e8.getKeyID()));
  }
  getUserIDs() {
    return this.users.map(((e8) => e8.userID ? e8.userID.userID : null)).filter(((e8) => null !== e8));
  }
  write() {
    return this.toPacketList().write();
  }
  async getSigningKey(e8 = null, t8 = /* @__PURE__ */ new Date(), r8 = {}, i8 = L4) {
    await this.verifyPrimaryKey(t8, r8, i8);
    const a8 = this.keyPacket;
    try {
      no(a8, i8);
    } catch (e9) {
      throw _5.wrapError("Could not verify primary key", e9);
    }
    const n8 = this.subkeys.slice().sort(((e9, t9) => t9.keyPacket.created - e9.keyPacket.created || t9.keyPacket.algorithm - e9.keyPacket.algorithm));
    let s8;
    for (const r9 of n8) if (!e8 || r9.getKeyID().equals(e8)) try {
      await r9.verify(t8, i8);
      const e9 = { key: a8, bind: r9.keyPacket }, n9 = await Ws(r9.bindingSignatures, a8, M7.signature.subkeyBinding, e9, t8, i8);
      if (!ro(r9.keyPacket, n9, i8)) continue;
      if (!n9.embeddedSignature) throw Error("Missing embedded signature");
      return await Ws([n9.embeddedSignature], r9.keyPacket, M7.signature.keyBinding, e9, t8, i8), no(r9.keyPacket, i8), r9;
    } catch (e9) {
      s8 = e9;
    }
    try {
      const n9 = await this.getPrimarySelfSignature(t8, r8, i8);
      if ((!e8 || a8.getKeyID().equals(e8)) && ro(a8, n9, i8)) return no(a8, i8), this;
    } catch (e9) {
      s8 = e9;
    }
    throw _5.wrapError("Could not find valid signing key packet in key " + this.getKeyID().toHex(), s8);
  }
  async getEncryptionKey(e8, t8 = /* @__PURE__ */ new Date(), r8 = {}, i8 = L4) {
    await this.verifyPrimaryKey(t8, r8, i8);
    const a8 = this.keyPacket;
    try {
      no(a8, i8);
    } catch (e9) {
      throw _5.wrapError("Could not verify primary key", e9);
    }
    const n8 = this.subkeys.slice().sort(((e9, t9) => t9.keyPacket.created - e9.keyPacket.created || t9.keyPacket.algorithm - e9.keyPacket.algorithm));
    let s8;
    for (const r9 of n8) if (!e8 || r9.getKeyID().equals(e8)) try {
      await r9.verify(t8, i8);
      const e9 = { key: a8, bind: r9.keyPacket }, n9 = await Ws(r9.bindingSignatures, a8, M7.signature.subkeyBinding, e9, t8, i8);
      if (io(r9.keyPacket, n9, i8)) return no(r9.keyPacket, i8), r9;
    } catch (e9) {
      s8 = e9;
    }
    try {
      const n9 = await this.getPrimarySelfSignature(t8, r8, i8);
      if ((!e8 || a8.getKeyID().equals(e8)) && io(a8, n9, i8)) return no(a8, i8), this;
    } catch (e9) {
      s8 = e9;
    }
    throw _5.wrapError("Could not find valid encryption key packet in key " + this.getKeyID().toHex(), s8);
  }
  async isRevoked(e8, t8, r8 = /* @__PURE__ */ new Date(), i8 = L4) {
    return Js(this.keyPacket, M7.signature.keyRevocation, { key: this.keyPacket }, this.revocationSignatures, e8, t8, r8, i8);
  }
  async verifyPrimaryKey(e8 = /* @__PURE__ */ new Date(), t8 = {}, r8 = L4) {
    const i8 = this.keyPacket;
    if (await this.isRevoked(null, null, e8, r8)) throw Error("Primary key is revoked");
    if ($s(i8, await this.getPrimarySelfSignature(e8, t8, r8), e8)) throw Error("Primary key is expired");
    if (6 !== i8.version) {
      const t9 = await Ws(this.directSignatures, i8, M7.signature.key, { key: i8 }, e8, r8).catch((() => {
      }));
      if (t9 && $s(i8, t9, e8)) throw Error("Primary key is expired");
    }
  }
  async getExpirationTime(e8, t8 = L4) {
    let r8;
    try {
      const i8 = await this.getPrimarySelfSignature(null, e8, t8), a8 = eo(this.keyPacket, i8), n8 = i8.getExpirationTime(), s8 = 6 !== this.keyPacket.version && await Ws(this.directSignatures, this.keyPacket, M7.signature.key, { key: this.keyPacket }, null, t8).catch((() => {
      }));
      if (s8) {
        const e9 = eo(this.keyPacket, s8);
        r8 = Math.min(a8, n8, e9);
      } else r8 = a8 < n8 ? a8 : n8;
    } catch {
      r8 = null;
    }
    return _5.normalizeDate(r8);
  }
  async getPrimarySelfSignature(e8 = /* @__PURE__ */ new Date(), t8 = {}, r8 = L4) {
    const i8 = this.keyPacket;
    if (6 === i8.version) return Ws(this.directSignatures, i8, M7.signature.key, { key: i8 }, e8, r8);
    const { selfCertification: a8 } = await this.getPrimaryUser(e8, t8, r8);
    return a8;
  }
  async getPrimaryUser(e8 = /* @__PURE__ */ new Date(), t8 = {}, r8 = L4) {
    const i8 = this.keyPacket, a8 = [];
    let n8;
    for (let s9 = 0; s9 < this.users.length; s9++) try {
      const n9 = this.users[s9];
      if (!n9.userID) continue;
      if (void 0 !== t8.name && n9.userID.name !== t8.name || void 0 !== t8.email && n9.userID.email !== t8.email || void 0 !== t8.comment && n9.userID.comment !== t8.comment) throw Error("Could not find user that matches that user ID");
      const o9 = { userID: n9.userID, key: i8 }, c8 = await Ws(n9.selfCertifications, i8, M7.signature.certGeneric, o9, e8, r8);
      a8.push({ index: s9, user: n9, selfCertification: c8 });
    } catch (e9) {
      n8 = e9;
    }
    if (!a8.length) throw n8 || Error("Could not find primary user");
    await Promise.all(a8.map((async (t9) => {
      t9.selfCertification.revoked || await t9.user.isRevoked(t9.selfCertification, null, e8, r8);
    })));
    const s8 = a8.sort((function(e9, t9) {
      const r9 = e9.selfCertification, i9 = t9.selfCertification;
      return i9.revoked - r9.revoked || r9.isPrimaryUserID - i9.isPrimaryUserID || r9.created - i9.created;
    })).pop(), { user: o8, selfCertification: c7 } = s8;
    if (c7.revoked || await o8.isRevoked(c7, null, e8, r8)) throw Error("Primary user is revoked");
    return s8;
  }
  async update(e8, t8 = /* @__PURE__ */ new Date(), r8 = L4) {
    if (!this.hasSameFingerprintAs(e8)) throw Error("Primary key fingerprints must be equal to update the key");
    if (!this.isPrivate() && e8.isPrivate()) {
      if (!(this.subkeys.length === e8.subkeys.length && this.subkeys.every(((t9) => e8.subkeys.some(((e9) => t9.hasSameFingerprintAs(e9))))))) throw Error("Cannot update public key with private key if subkeys mismatch");
      return e8.update(this, r8);
    }
    const i8 = this.clone();
    return await Zs(e8, i8, "revocationSignatures", t8, ((a8) => Js(i8.keyPacket, M7.signature.keyRevocation, i8, [a8], null, e8.keyPacket, t8, r8))), await Zs(e8, i8, "directSignatures", t8), await Promise.all(e8.users.map((async (e9) => {
      const a8 = i8.users.filter(((t9) => e9.userID && e9.userID.equals(t9.userID) || e9.userAttribute && e9.userAttribute.equals(t9.userAttribute)));
      if (a8.length > 0) await Promise.all(a8.map(((i9) => i9.update(e9, t8, r8))));
      else {
        const t9 = e9.clone();
        t9.mainKey = i8, i8.users.push(t9);
      }
    }))), await Promise.all(e8.subkeys.map((async (e9) => {
      const a8 = i8.subkeys.filter(((t9) => t9.hasSameFingerprintAs(e9)));
      if (a8.length > 0) await Promise.all(a8.map(((i9) => i9.update(e9, t8, r8))));
      else {
        const t9 = e9.clone();
        t9.mainKey = i8, i8.subkeys.push(t9);
      }
    }))), i8;
  }
  async getRevocationCertificate(e8 = /* @__PURE__ */ new Date(), t8 = L4) {
    const r8 = { key: this.keyPacket }, i8 = await Ws(this.revocationSignatures, this.keyPacket, M7.signature.keyRevocation, r8, e8, t8), a8 = new hs();
    a8.push(i8);
    const n8 = 6 !== this.keyPacket.version;
    return J5(M7.armor.publicKey, a8.write(), null, null, "This is a revocation certificate", n8, t8);
  }
  async applyRevocationCertificate(e8, t8 = /* @__PURE__ */ new Date(), r8 = L4) {
    const i8 = await Z4(e8), a8 = (await hs.fromBinary(i8.data, co, r8)).findPacket(M7.packet.signature);
    if (!a8 || a8.signatureType !== M7.signature.keyRevocation) throw Error("Could not find revocation signature packet");
    if (!a8.issuerKeyID.equals(this.getKeyID())) throw Error("Revocation signature does not match key");
    try {
      await a8.verify(this.keyPacket, M7.signature.keyRevocation, { key: this.keyPacket }, t8, void 0, r8);
    } catch (e9) {
      throw _5.wrapError("Could not verify revocation signature", e9);
    }
    const n8 = this.clone();
    return n8.revocationSignatures.push(a8), n8;
  }
  async signPrimaryUser(e8, t8, r8, i8 = L4) {
    const { index: a8, user: n8 } = await this.getPrimaryUser(t8, r8, i8), s8 = await n8.certify(e8, t8, i8), o8 = this.clone();
    return o8.users[a8] = s8, o8;
  }
  async signAllUsers(e8, t8 = /* @__PURE__ */ new Date(), r8 = L4) {
    const i8 = this.clone();
    return i8.users = await Promise.all(this.users.map((function(i9) {
      return i9.certify(e8, t8, r8);
    }))), i8;
  }
  async verifyPrimaryUser(e8, t8 = /* @__PURE__ */ new Date(), r8, i8 = L4) {
    const a8 = this.keyPacket, { user: n8 } = await this.getPrimaryUser(t8, r8, i8);
    return e8 ? await n8.verifyAllCertifications(e8, t8, i8) : [{ keyID: a8.getKeyID(), valid: await n8.verify(t8, i8).catch((() => false)) }];
  }
  async verifyAllUsers(e8, t8 = /* @__PURE__ */ new Date(), r8 = L4) {
    const i8 = this.keyPacket, a8 = [];
    return await Promise.all(this.users.map((async (n8) => {
      const s8 = e8 ? await n8.verifyAllCertifications(e8, t8, r8) : [{ keyID: i8.getKeyID(), valid: await n8.verify(t8, r8).catch((() => false)) }];
      a8.push(...s8.map(((e9) => ({ userID: n8.userID ? n8.userID.userID : null, userAttribute: n8.userAttribute, keyID: e9.keyID, valid: e9.valid }))));
    }))), a8;
  }
};
["getKeyID", "getFingerprint", "getAlgorithmInfo", "getCreationTime", "hasSameFingerprintAs"].forEach(((e8) => {
  lo.prototype[e8] = oo.prototype[e8];
}));
var yo = class extends lo {
  constructor(e8) {
    if (super(), this.keyPacket = null, this.revocationSignatures = [], this.directSignatures = [], this.users = [], this.subkeys = [], e8 && (this.packetListToStructure(e8, /* @__PURE__ */ new Set([M7.packet.secretKey, M7.packet.secretSubkey])), !this.keyPacket)) throw Error("Invalid key: missing public-key packet");
  }
  isPrivate() {
    return false;
  }
  toPublic() {
    return this;
  }
  armor(e8 = L4) {
    const t8 = 6 !== this.keyPacket.version;
    return J5(M7.armor.publicKey, this.toPacketList().write(), void 0, void 0, void 0, t8, e8);
  }
};
var po = class _po extends yo {
  constructor(e8) {
    if (super(), this.packetListToStructure(e8, /* @__PURE__ */ new Set([M7.packet.publicKey, M7.packet.publicSubkey])), !this.keyPacket) throw Error("Invalid key: missing private-key packet");
  }
  isPrivate() {
    return true;
  }
  toPublic() {
    const e8 = new hs(), t8 = this.toPacketList();
    let r8 = false;
    for (const i8 of t8) if (!r8 || i8.constructor.tag !== M7.packet.Signature) switch (r8 && (r8 = false), i8.constructor.tag) {
      case M7.packet.secretKey: {
        if (i8.algorithm === M7.publicKey.aead || i8.algorithm === M7.publicKey.hmac) throw Error("Cannot create public key from symmetric private");
        const t9 = Cs.fromSecretKeyPacket(i8);
        e8.push(t9);
        break;
      }
      case M7.packet.secretSubkey: {
        if (i8.algorithm === M7.publicKey.aead || i8.algorithm === M7.publicKey.hmac) {
          r8 = true;
          break;
        }
        const t9 = Ms.fromSecretSubkeyPacket(i8);
        e8.push(t9);
        break;
      }
      default:
        e8.push(i8);
    }
    return new yo(e8);
  }
  armor(e8 = L4) {
    const t8 = 6 !== this.keyPacket.version;
    return J5(M7.armor.privateKey, this.toPacketList().write(), void 0, void 0, void 0, t8, e8);
  }
  async getDecryptionKeys(e8, t8 = /* @__PURE__ */ new Date(), r8 = {}, i8 = L4) {
    const a8 = this.keyPacket, n8 = [];
    let s8 = null;
    for (let r9 = 0; r9 < this.subkeys.length; r9++) if (!e8 || this.subkeys[r9].getKeyID().equals(e8, true)) {
      if (this.subkeys[r9].keyPacket.isDummy()) {
        s8 = s8 || Error("Gnu-dummy key packets cannot be used for decryption");
        continue;
      }
      try {
        const e9 = { key: a8, bind: this.subkeys[r9].keyPacket }, s9 = await Ws(this.subkeys[r9].bindingSignatures, a8, M7.signature.subkeyBinding, e9, t8, i8);
        ao(this.subkeys[r9].keyPacket, s9, i8) && n8.push(this.subkeys[r9]);
      } catch (e9) {
        s8 = e9;
      }
    }
    const o8 = await this.getPrimarySelfSignature(t8, r8, i8);
    if (e8 && !a8.getKeyID().equals(e8, true) || !ao(a8, o8, i8) || (a8.isDummy() ? s8 = s8 || Error("Gnu-dummy key packets cannot be used for decryption") : n8.push(this)), 0 === n8.length) throw s8 || Error("No decryption key packets found");
    return n8;
  }
  isDecrypted() {
    return this.getKeys().some((({ keyPacket: e8 }) => e8.isDecrypted()));
  }
  async validate(e8 = L4) {
    if (!this.isPrivate()) throw Error("Cannot validate a public key");
    let t8;
    if (this.keyPacket.isDummy()) {
      const r8 = await this.getSigningKey(null, null, void 0, { ...e8, rejectPublicKeyAlgorithms: /* @__PURE__ */ new Set(), minRSABits: 0 });
      r8 && !r8.keyPacket.isDummy() && (t8 = r8.keyPacket);
    } else t8 = this.keyPacket;
    if (t8) return t8.validate();
    {
      const e9 = this.getKeys();
      if (e9.map(((e10) => e10.keyPacket.isDummy())).every(Boolean)) throw Error("Cannot validate an all-gnu-dummy key");
      return Promise.all(e9.map(((e10) => e10.keyPacket.validate())));
    }
  }
  clearPrivateParams() {
    this.getKeys().forEach((({ keyPacket: e8 }) => {
      e8.isDecrypted() && e8.clearPrivateParams();
    }));
  }
  async revoke({ flag: e8 = M7.reasonForRevocation.noReason, string: t8 = "" } = {}, r8 = /* @__PURE__ */ new Date(), i8 = L4) {
    if (!this.isPrivate()) throw Error("Need private key for revoking");
    const a8 = { key: this.keyPacket }, n8 = this.clone();
    return n8.revocationSignatures.push(await Ys(a8, [], this.keyPacket, { signatureType: M7.signature.keyRevocation, reasonForRevocationFlag: M7.write(M7.reasonForRevocation, e8), reasonForRevocationString: t8 }, r8, void 0, void 0, void 0, i8)), n8;
  }
  async addSubkey(e8 = {}) {
    const t8 = { ...L4, ...e8.config };
    if (e8.passphrase) throw Error("Subkey could not be encrypted here, please encrypt whole key");
    if (e8.rsaBits < t8.minRSABits) throw Error(`rsaBits should be at least ${t8.minRSABits}, got: ${e8.rsaBits}`);
    const r8 = this.keyPacket;
    if (r8.isDummy()) throw Error("Cannot add subkey to gnu-dummy primary key");
    if (!r8.isDecrypted()) throw Error("Key is not decrypted");
    const i8 = r8.getAlgorithmInfo();
    i8.type = (function(e9) {
      switch (M7.write(M7.publicKey, e9)) {
        case M7.publicKey.rsaEncrypt:
        case M7.publicKey.rsaEncryptSign:
        case M7.publicKey.rsaSign:
        case M7.publicKey.dsa:
          return "rsa";
        case M7.publicKey.ecdsa:
        case M7.publicKey.eddsaLegacy:
          return "ecc";
        case M7.publicKey.ed25519:
          return "curve25519";
        case M7.publicKey.ed448:
          return "curve448";
        default:
          throw Error("Unsupported algorithm");
      }
    })(i8.algorithm), i8.rsaBits = i8.bits || 4096, i8.curve = i8.curve || "curve25519Legacy", e8 = to(e8, i8);
    const a8 = await Gs(e8, { ...t8, v6Keys: 6 === this.keyPacket.version });
    no(a8, t8);
    const n8 = await Qs(a8, r8, e8, t8), s8 = this.toPacketList();
    return s8.push(a8, n8), new _po(s8);
  }
};
var go = /* @__PURE__ */ _5.constructAllowedPackets([Cs, Ms, Fs, Rs, Ns, Ls, ns]);
function mo(e8) {
  for (const t8 of e8) switch (t8.constructor.tag) {
    case M7.packet.secretKey:
      return new po(e8);
    case M7.packet.publicKey:
      return new yo(e8);
  }
  throw Error("No key packet found");
}
async function fo(e8, t8, r8, i8) {
  r8.passphrase && await e8.encrypt(r8.passphrase, i8), await Promise.all(t8.map((async function(e9, t9) {
    const a9 = r8.subkeys[t9].passphrase;
    a9 && await e9.encrypt(a9, i8);
  })));
  const a8 = new hs();
  function n8(e9, t9) {
    return [t9, ...e9.filter(((e10) => e10 !== t9))];
  }
  function s8() {
    const t9 = {};
    t9.keyFlags = [M7.keyFlags.certifyKeys | M7.keyFlags.signData];
    const a9 = n8([M7.symmetric.aes256, M7.symmetric.aes128], i8.preferredSymmetricAlgorithm);
    if (t9.preferredSymmetricAlgorithms = a9, i8.aeadProtect) {
      const e9 = n8([M7.aead.gcm, M7.aead.eax, M7.aead.ocb], i8.preferredAEADAlgorithm);
      t9.preferredCipherSuites = e9.flatMap(((e10) => a9.map(((t10) => [t10, e10]))));
    }
    return t9.preferredHashAlgorithms = n8([M7.hash.sha512, M7.hash.sha256, ...6 === e8.version ? [M7.hash.sha3_512, M7.hash.sha3_256] : []], i8.preferredHashAlgorithm), t9.preferredCompressionAlgorithms = n8([M7.compression.uncompressed, M7.compression.zlib, M7.compression.zip], i8.preferredCompressionAlgorithm), t9.features = [0], t9.features[0] |= M7.features.modificationDetection, i8.aeadProtect && (t9.features[0] |= M7.features.seipdv2), r8.keyExpirationTime > 0 && (t9.keyExpirationTime = r8.keyExpirationTime, t9.keyNeverExpires = false), t9;
  }
  if (a8.push(e8), 6 === e8.version) {
    const t9 = { key: e8 }, n9 = s8();
    n9.signatureType = M7.signature.key;
    const o9 = await Ys(t9, [], e8, n9, r8.date, void 0, r8.signatureNotations, void 0, i8);
    a8.push(o9);
  }
  await Promise.all(r8.userIDs.map((async function(t9, a9) {
    const n9 = Ns.fromObject(t9), o9 = { userID: n9, key: e8 }, c7 = 6 !== e8.version ? s8() : {};
    c7.signatureType = M7.signature.certPositive, 0 === a9 && (c7.isPrimaryUserID = true);
    return { userIDPacket: n9, signaturePacket: await Ys(o9, [], e8, c7, r8.date, void 0, r8.signatureNotations, void 0, i8) };
  }))).then(((e9) => {
    e9.forEach((({ userIDPacket: e10, signaturePacket: t9 }) => {
      a8.push(e10), a8.push(t9);
    }));
  })), await Promise.all(t8.map((async function(t9, a9) {
    const n9 = r8.subkeys[a9];
    return { secretSubkeyPacket: t9, subkeySignaturePacket: await Qs(t9, e8, n9, i8) };
  }))).then(((e9) => {
    e9.forEach((({ secretSubkeyPacket: e10, subkeySignaturePacket: t9 }) => {
      a8.push(e10), a8.push(t9);
    }));
  }));
  const o8 = { key: e8 };
  return a8.push(await Ys(o8, [], e8, { signatureType: M7.signature.keyRevocation, reasonForRevocationFlag: M7.reasonForRevocation.noReason, reasonForRevocationString: "" }, r8.date, void 0, void 0, void 0, i8)), r8.passphrase && e8.clearPrivateParams(), t8.map((function(e9, t9) {
    r8.subkeys[t9].passphrase && e9.clearPrivateParams();
  })), new po(a8);
}
async function wo({ armoredKey: e8, binaryKey: t8, config: r8, ...i8 }) {
  if (r8 = { ...L4, ...r8 }, !e8 && !t8) throw Error("readKey: must pass options object containing `armoredKey` or `binaryKey`");
  if (e8 && !_5.isString(e8)) throw Error("readKey: options.armoredKey must be a string");
  if (t8 && !_5.isUint8Array(t8)) throw Error("readKey: options.binaryKey must be a Uint8Array");
  const a8 = Object.keys(i8);
  if (a8.length > 0) throw Error("Unknown option: " + a8.join(", "));
  let n8;
  if (e8) {
    const { type: t9, data: r9 } = await Z4(e8);
    if (t9 !== M7.armor.publicKey && t9 !== M7.armor.privateKey) throw Error("Armored text not of type key");
    n8 = r9;
  } else n8 = t8;
  const s8 = await hs.fromBinary(n8, go, r8), o8 = s8.indexOfTag(M7.packet.publicKey, M7.packet.secretKey);
  if (0 === o8.length) throw Error("No key packet found");
  return mo(s8.slice(o8[0], o8[1]));
}
async function bo({ armoredKey: e8, binaryKey: t8, config: r8, ...i8 }) {
  if (r8 = { ...L4, ...r8 }, !e8 && !t8) throw Error("readPrivateKey: must pass options object containing `armoredKey` or `binaryKey`");
  if (e8 && !_5.isString(e8)) throw Error("readPrivateKey: options.armoredKey must be a string");
  if (t8 && !_5.isUint8Array(t8)) throw Error("readPrivateKey: options.binaryKey must be a Uint8Array");
  const a8 = Object.keys(i8);
  if (a8.length > 0) throw Error("Unknown option: " + a8.join(", "));
  let n8;
  if (e8) {
    const { type: t9, data: r9 } = await Z4(e8);
    if (t9 !== M7.armor.privateKey) throw Error("Armored text not of type private key");
    n8 = r9;
  } else n8 = t8;
  const s8 = await hs.fromBinary(n8, go, r8), o8 = s8.indexOfTag(M7.packet.publicKey, M7.packet.secretKey);
  for (let e9 = 0; e9 < o8.length; e9++) {
    if (s8[o8[e9]].constructor.tag === M7.packet.publicKey) continue;
    const t9 = s8.slice(o8[e9], o8[e9 + 1]);
    return new po(t9);
  }
  throw Error("No secret key packet found");
}
async function ko({ armoredKeys: e8, binaryKeys: t8, config: r8, ...i8 }) {
  r8 = { ...L4, ...r8 };
  let a8 = e8 || t8;
  if (!a8) throw Error("readKeys: must pass options object containing `armoredKeys` or `binaryKeys`");
  if (e8 && !_5.isString(e8)) throw Error("readKeys: options.armoredKeys must be a string");
  if (t8 && !_5.isUint8Array(t8)) throw Error("readKeys: options.binaryKeys must be a Uint8Array");
  const n8 = Object.keys(i8);
  if (n8.length > 0) throw Error("Unknown option: " + n8.join(", "));
  if (e8) {
    const { type: t9, data: r9 } = await Z4(e8);
    if (t9 !== M7.armor.publicKey && t9 !== M7.armor.privateKey) throw Error("Armored text not of type key");
    a8 = r9;
  }
  const s8 = [], o8 = await hs.fromBinary(a8, go, r8), c7 = o8.indexOfTag(M7.packet.publicKey, M7.packet.secretKey);
  if (0 === c7.length) throw Error("No key packet found");
  for (let e9 = 0; e9 < c7.length; e9++) {
    const t9 = mo(o8.slice(c7[e9], c7[e9 + 1]));
    s8.push(t9);
  }
  return s8;
}
var Ko = /* @__PURE__ */ _5.constructAllowedPackets([es, gs, Ss, Ks, Ts, Us, xs, cs, ns]);
var Ao = /* @__PURE__ */ _5.constructAllowedPackets([xs]);
var Eo = /* @__PURE__ */ _5.constructAllowedPackets([ns]);
var So = class _So {
  constructor(e8) {
    this.packets = e8 || new hs();
  }
  getEncryptionKeyIDs() {
    const e8 = [];
    return this.packets.filterByTag(M7.packet.publicKeyEncryptedSessionKey).forEach((function(t8) {
      e8.push(t8.publicKeyID);
    })), e8;
  }
  getSigningKeyIDs() {
    const e8 = this.unwrapCompressed(), t8 = e8.packets.filterByTag(M7.packet.onePassSignature);
    if (t8.length > 0) return t8.map(((e9) => e9.issuerKeyID));
    return e8.packets.filterByTag(M7.packet.signature).map(((e9) => e9.issuerKeyID));
  }
  async decrypt(e8, t8, r8, i8 = /* @__PURE__ */ new Date(), a8 = L4) {
    const n8 = this.packets.filterByTag(M7.packet.symmetricallyEncryptedData, M7.packet.symEncryptedIntegrityProtectedData, M7.packet.aeadEncryptedData);
    if (0 === n8.length) throw Error("No encrypted data found");
    const s8 = n8[0], o8 = s8.cipherAlgorithm, c7 = r8 || await this.decryptSessionKeys(e8, t8, o8, i8, a8);
    let u8 = null;
    const h7 = Promise.all(c7.map((async ({ algorithm: e9, data: t9 }) => {
      if (!_5.isUint8Array(t9) || !s8.cipherAlgorithm && !_5.isString(e9)) throw Error("Invalid session key for decryption.");
      try {
        const r9 = s8.cipherAlgorithm || M7.write(M7.symmetric, e9);
        await s8.decrypt(r9, t9, a8);
      } catch (e10) {
        _5.printDebugError(e10), u8 = e10;
      }
    })));
    if (x6(s8.encrypted), s8.encrypted = null, await h7, !s8.packets || !s8.packets.length) throw u8 || Error("Decryption failed.");
    const l6 = new _So(s8.packets);
    return s8.packets = new hs(), l6;
  }
  async decryptSessionKeys(e8, t8, r8, i8 = /* @__PURE__ */ new Date(), a8 = L4) {
    let n8, s8 = [];
    if (t8) {
      const e9 = this.packets.filterByTag(M7.packet.symEncryptedSessionKey);
      if (0 === e9.length) throw Error("No symmetrically encrypted session key packet found.");
      await Promise.all(t8.map((async function(t9, r9) {
        let i9;
        i9 = r9 ? await hs.fromBinary(e9.write(), Ao, a8) : e9, await Promise.all(i9.map((async function(e10) {
          try {
            await e10.decrypt(t9, a8), s8.push(e10);
          } catch (e11) {
            _5.printDebugError(e11), e11 instanceof Xa && (n8 = e11);
          }
        })));
      })));
    } else {
      if (!e8) throw Error("No key or password specified.");
      {
        const t9 = this.packets.filterByTag(M7.packet.publicKeyEncryptedSessionKey);
        if (0 === t9.length) throw Error("No public key encrypted session key packet found.");
        await Promise.all(t9.map((async function(t10) {
          await Promise.all(e8.map((async function(e9) {
            let o8;
            try {
              o8 = (await e9.getDecryptionKeys(t10.publicKeyID, null, void 0, a8)).map(((e10) => e10.keyPacket));
            } catch (e10) {
              return void (n8 = e10);
            }
            let c7 = [M7.symmetric.aes256, M7.symmetric.aes128, M7.symmetric.tripledes, M7.symmetric.cast5];
            try {
              const t11 = await e9.getPrimarySelfSignature(i8, void 0, a8);
              t11.preferredSymmetricAlgorithms && (c7 = c7.concat(t11.preferredSymmetricAlgorithms));
            } catch {
            }
            await Promise.all(o8.map((async function(e10) {
              if (!e10.isDecrypted()) throw Error("Decryption key is not decrypted.");
              if (a8.constantTimePKCS1Decryption && (t10.publicKeyAlgorithm === M7.publicKey.rsaEncrypt || t10.publicKeyAlgorithm === M7.publicKey.rsaEncryptSign || t10.publicKeyAlgorithm === M7.publicKey.rsaSign || t10.publicKeyAlgorithm === M7.publicKey.elgamal)) {
                const i9 = t10.write();
                await Promise.all((r8 ? [r8] : Array.from(a8.constantTimePKCS1DecryptionSupportedSymmetricAlgorithms)).map((async (t11) => {
                  const r9 = new Us();
                  r9.read(i9);
                  const a9 = { sessionKeyAlgorithm: t11, sessionKey: Ga(t11) };
                  try {
                    await r9.decrypt(e10, a9), s8.push(r9);
                  } catch (e11) {
                    _5.printDebugError(e11), n8 = e11;
                  }
                })));
              } else try {
                await t10.decrypt(e10);
                const i9 = r8 || t10.sessionKeyAlgorithm;
                if (i9 && !c7.includes(M7.write(M7.symmetric, i9))) throw Error("A non-preferred symmetric algorithm was used.");
                s8.push(t10);
              } catch (e11) {
                _5.printDebugError(e11), n8 = e11;
              }
            })));
          }))), x6(t10.encrypted), t10.encrypted = null;
        })));
      }
    }
    if (s8.length > 0) {
      if (s8.length > 1) {
        const e9 = /* @__PURE__ */ new Set();
        s8 = s8.filter(((t9) => {
          const r9 = t9.sessionKeyAlgorithm + _5.uint8ArrayToString(t9.sessionKey);
          return !e9.has(r9) && (e9.add(r9), true);
        }));
      }
      return s8.map(((e9) => ({ data: e9.sessionKey, algorithm: e9.sessionKeyAlgorithm && M7.read(M7.symmetric, e9.sessionKeyAlgorithm) })));
    }
    throw n8 || Error("Session key decryption failed.");
  }
  getLiteralData() {
    const e8 = this.unwrapCompressed().packets.findPacket(M7.packet.literalData);
    return e8 && e8.getBytes() || null;
  }
  getFilename() {
    const e8 = this.unwrapCompressed().packets.findPacket(M7.packet.literalData);
    return e8 && e8.getFilename() || null;
  }
  getText() {
    const e8 = this.unwrapCompressed().packets.findPacket(M7.packet.literalData);
    return e8 ? e8.getText() : null;
  }
  static async generateSessionKey(e8 = [], t8 = /* @__PURE__ */ new Date(), r8 = [], i8 = L4) {
    const { symmetricAlgo: a8, aeadAlgo: n8 } = await (async function(e9 = [], t9 = /* @__PURE__ */ new Date(), r9 = [], i9 = L4) {
      const a9 = await Promise.all(e9.map(((e10, a10) => e10.getPrimarySelfSignature(t9, r9[a10], i9))));
      if (e9.length ? !i9.ignoreSEIPDv2FeatureFlag && a9.every(((e10) => e10.features && e10.features[0] & M7.features.seipdv2)) : i9.aeadProtect) {
        const e10 = { symmetricAlgo: M7.symmetric.aes128, aeadAlgo: M7.aead.ocb }, t10 = [{ symmetricAlgo: i9.preferredSymmetricAlgorithm, aeadAlgo: i9.preferredAEADAlgorithm }, { symmetricAlgo: i9.preferredSymmetricAlgorithm, aeadAlgo: M7.aead.ocb }, { symmetricAlgo: M7.symmetric.aes128, aeadAlgo: i9.preferredAEADAlgorithm }];
        for (const e11 of t10) if (a9.every(((t11) => t11.preferredCipherSuites && t11.preferredCipherSuites.some(((t12) => t12[0] === e11.symmetricAlgo && t12[1] === e11.aeadAlgo))))) return e11;
        return e10;
      }
      const n9 = M7.symmetric.aes128, s9 = i9.preferredSymmetricAlgorithm;
      return { symmetricAlgo: a9.every(((e10) => e10.preferredSymmetricAlgorithms && e10.preferredSymmetricAlgorithms.includes(s9))) ? s9 : n9, aeadAlgo: void 0 };
    })(e8, t8, r8, i8), s8 = M7.read(M7.symmetric, a8), o8 = n8 ? M7.read(M7.aead, n8) : void 0;
    await Promise.all(e8.map(((e9) => e9.getEncryptionKey().catch((() => null)).then(((e10) => {
      if (e10 && (e10.keyPacket.algorithm === M7.publicKey.x25519 || e10.keyPacket.algorithm === M7.publicKey.x448) && !o8 && !_5.isAES(a8)) throw Error("Could not generate a session key compatible with the given `encryptionKeys`: X22519 and X448 keys can only be used to encrypt AES session keys; change `config.preferredSymmetricAlgorithm` accordingly.");
    })))));
    return { data: Ga(a8), algorithm: s8, aeadAlgorithm: o8 };
  }
  async encrypt(e8, t8, r8, i8 = false, a8 = [], n8 = /* @__PURE__ */ new Date(), s8 = [], o8 = L4) {
    if (r8) {
      if (!_5.isUint8Array(r8.data) || !_5.isString(r8.algorithm)) throw Error("Invalid session key for encryption.");
    } else if (e8 && e8.length) r8 = await _So.generateSessionKey(e8, n8, s8, o8);
    else {
      if (!t8 || !t8.length) throw Error("No keys, passwords, or session key provided.");
      r8 = await _So.generateSessionKey(void 0, void 0, void 0, o8);
    }
    const { data: c7, algorithm: u8, aeadAlgorithm: h7 } = r8, l6 = await _So.encryptSessionKey(c7, u8, h7, e8, t8, i8, a8, n8, s8, o8), y8 = Ks.fromObject({ version: h7 ? 2 : 1, aeadAlgorithm: h7 ? M7.write(M7.aead, h7) : null });
    y8.packets = this.packets;
    const p5 = M7.write(M7.symmetric, u8);
    return await y8.encrypt(p5, c7, o8), l6.packets.push(y8), y8.packets = new hs(), l6;
  }
  static async encryptSessionKey(e8, t8, r8, i8, a8, n8 = false, s8 = [], o8 = /* @__PURE__ */ new Date(), c7 = [], u8 = L4) {
    const h7 = new hs(), l6 = M7.write(M7.symmetric, t8), y8 = r8 && M7.write(M7.aead, r8);
    if (i8) {
      const t9 = await Promise.all(i8.map((async function(t10, r9) {
        const i9 = await t10.getEncryptionKey(s8[r9], o8, c7, u8), a9 = Us.fromObject({ version: y8 ? 6 : 3, encryptionKeyPacket: i9.keyPacket, anonymousRecipient: n8, sessionKey: e8, sessionKeyAlgorithm: l6 });
        return await a9.encrypt(i9.keyPacket), delete a9.sessionKey, a9;
      })));
      h7.push(...t9);
    }
    if (a8) {
      const t9 = async function(e9, t10) {
        try {
          return await e9.decrypt(t10, u8), 1;
        } catch {
          return 0;
        }
      }, r9 = (e9, t10) => e9 + t10, i9 = async function(e9, n10, s9, o9) {
        const c8 = new xs(u8);
        if (c8.sessionKey = e9, c8.sessionKeyAlgorithm = n10, s9 && (c8.aeadAlgorithm = s9), await c8.encrypt(o9, u8), u8.passwordCollisionCheck) {
          if (1 !== (await Promise.all(a8.map(((e10) => t9(c8, e10))))).reduce(r9)) return i9(e9, n10, o9);
        }
        return delete c8.sessionKey, c8;
      }, n9 = await Promise.all(a8.map(((t10) => i9(e8, l6, y8, t10))));
      h7.push(...n9);
    }
    return new _So(h7);
  }
  async sign(e8 = [], t8 = [], r8 = null, i8 = [], a8 = /* @__PURE__ */ new Date(), n8 = [], s8 = [], o8 = [], c7 = L4) {
    const u8 = new hs(), h7 = this.packets.findPacket(M7.packet.literalData);
    if (!h7) throw Error("No literal data packet to sign.");
    const l6 = await Po(h7, e8, t8, r8, i8, a8, n8, s8, o8, false, c7), y8 = l6.map(((e9, t9) => cs.fromSignaturePacket(e9, 0 === t9))).reverse();
    return u8.push(...y8), u8.push(h7), u8.push(...l6), new _So(u8);
  }
  compress(e8, t8 = L4) {
    if (e8 === M7.compression.uncompressed) return this;
    const r8 = new gs(t8);
    r8.algorithm = e8, r8.packets = this.packets;
    const i8 = new hs();
    return i8.push(r8), new _So(i8);
  }
  async signDetached(e8 = [], t8 = [], r8 = null, i8 = [], a8 = [], n8 = /* @__PURE__ */ new Date(), s8 = [], o8 = [], c7 = L4) {
    const u8 = this.packets.findPacket(M7.packet.literalData);
    if (!u8) throw Error("No literal data packet to sign.");
    return new qs(await Po(u8, e8, t8, r8, i8, a8, n8, s8, o8, true, c7));
  }
  async verify(e8, t8 = /* @__PURE__ */ new Date(), r8 = L4) {
    const i8 = this.unwrapCompressed(), a8 = i8.packets.filterByTag(M7.packet.literalData);
    if (1 !== a8.length) throw Error("Can only verify message with one literal data packet.");
    let n8 = i8.packets;
    s7(n8.stream) && (n8 = n8.concat(await D7(n8.stream, ((e9) => e9 || []))));
    const o8 = n8.filterByTag(M7.packet.onePassSignature).reverse(), c7 = n8.filterByTag(M7.packet.signature);
    return o8.length && !c7.length && _5.isStream(n8.stream) && !s7(n8.stream) ? (await Promise.all(o8.map((async (e9) => {
      e9.correspondingSig = new Promise(((t9, r9) => {
        e9.correspondingSigResolve = t9, e9.correspondingSigReject = r9;
      })), e9.signatureData = C7((async () => (await e9.correspondingSig).signatureData)), e9.hashed = D7(await e9.hash(e9.signatureType, a8[0], void 0, false)), e9.hashed.catch((() => {
      }));
    }))), n8.stream = K5(n8.stream, (async (e9, t9) => {
      const r9 = I7(e9), i9 = T5(t9);
      try {
        for (let e10 = 0; e10 < o8.length; e10++) {
          const { value: t10 } = await r9.read();
          o8[e10].correspondingSigResolve(t10);
        }
        await r9.readToEnd(), await i9.ready, await i9.close();
      } catch (e10) {
        o8.forEach(((t10) => {
          t10.correspondingSigReject(e10);
        })), await i9.abort(e10);
      }
    })), Uo(o8, a8, e8, t8, false, r8)) : Uo(c7, a8, e8, t8, false, r8);
  }
  async verifyDetached(e8, t8, r8 = /* @__PURE__ */ new Date(), i8 = L4) {
    const a8 = this.unwrapCompressed().packets.filterByTag(M7.packet.literalData);
    if (1 !== a8.length) throw Error("Can only verify message with one literal data packet.");
    return Uo(e8.packets.filterByTag(M7.packet.signature), a8, t8, r8, true, i8);
  }
  unwrapCompressed() {
    const e8 = this.packets.filterByTag(M7.packet.compressedData);
    return e8.length ? new _So(e8[0].packets) : this;
  }
  async appendSignature(e8, t8 = L4) {
    await this.packets.read(_5.isUint8Array(e8) ? e8 : (await Z4(e8)).data, Eo, t8);
  }
  write() {
    return this.packets.write();
  }
  armor(e8 = L4) {
    const t8 = this.packets[this.packets.length - 1], r8 = t8.constructor.tag === Ks.tag ? 2 !== t8.version : this.packets.some(((e9) => e9.constructor.tag === ns.tag && 6 !== e9.version));
    return J5(M7.armor.message, this.write(), null, null, null, r8, e8);
  }
};
async function Po(e8, t8, r8 = [], i8 = null, a8 = [], n8 = /* @__PURE__ */ new Date(), s8 = [], o8 = [], c7 = [], u8 = false, h7 = L4) {
  const l6 = new hs(), y8 = null === e8.text ? M7.signature.binary : M7.signature.text;
  if (await Promise.all(t8.map((async (t9, i9) => {
    const l7 = s8[i9];
    if (!t9.isPrivate()) throw Error("Need private key for signing");
    const p5 = await t9.getSigningKey(a8[i9], n8, l7, h7);
    return Ys(e8, r8.length ? r8 : [t9], p5.keyPacket, { signatureType: y8 }, n8, o8, c7, u8, h7);
  }))).then(((e9) => {
    l6.push(...e9);
  })), i8) {
    const e9 = i8.packets.filterByTag(M7.packet.signature);
    l6.push(...e9);
  }
  return l6;
}
function Uo(e8, t8, r8, i8 = /* @__PURE__ */ new Date(), a8 = false, n8 = L4) {
  return e8.filter(((e9) => ["text", "binary"].includes(M7.read(M7.signature, e9.signatureType)))).map(((e9) => (function(e10, t9, r9, i9 = /* @__PURE__ */ new Date(), a9 = false, n9 = L4) {
    let s8, o8;
    for (const t10 of r9) {
      const r10 = t10.getKeys(e10.issuerKeyID);
      if (r10.length > 0) {
        s8 = t10, o8 = r10[0];
        break;
      }
    }
    const c7 = e10 instanceof cs ? e10.correspondingSig : e10, u8 = { keyID: e10.issuerKeyID, verified: (async () => {
      if (!o8) throw Error("Could not find signing key with key ID " + e10.issuerKeyID.toHex());
      await e10.verify(o8.keyPacket, e10.signatureType, t9[0], i9, a9, n9);
      const r10 = await c7;
      if (o8.getCreationTime() > r10.created) throw Error("Key is newer than the signature");
      try {
        await s8.getSigningKey(o8.getKeyID(), r10.created, void 0, n9);
      } catch (e11) {
        if (!n9.allowInsecureVerificationWithReformattedKeys || !e11.message.match(/Signature creation time is in the future/)) throw e11;
        await s8.getSigningKey(o8.getKeyID(), i9, void 0, n9);
      }
      return true;
    })(), signature: (async () => {
      const e11 = await c7, t10 = new hs();
      return e11 && t10.push(e11), new qs(t10);
    })() };
    return u8.signature.catch((() => {
    })), u8.verified.catch((() => {
    })), u8;
  })(e9, t8, r8, i8, a8, n8)));
}
async function Do({ armoredMessage: e8, binaryMessage: t8, config: r8, ...i8 }) {
  r8 = { ...L4, ...r8 };
  let a8 = e8 || t8;
  if (!a8) throw Error("readMessage: must pass options object containing `armoredMessage` or `binaryMessage`");
  if (e8 && !_5.isString(e8) && !_5.isStream(e8)) throw Error("readMessage: options.armoredMessage must be a string or stream");
  if (t8 && !_5.isUint8Array(t8) && !_5.isStream(t8)) throw Error("readMessage: options.binaryMessage must be a Uint8Array or stream");
  const n8 = Object.keys(i8);
  if (n8.length > 0) throw Error("Unknown option: " + n8.join(", "));
  const s8 = _5.isStream(a8);
  if (e8) {
    const { type: e9, data: t9 } = await Z4(a8);
    if (e9 !== M7.armor.message) throw Error("Armored text not of type message");
    a8 = t9;
  }
  const o8 = await hs.fromBinary(a8, Ko, r8, new ps()), c7 = new So(o8);
  return c7.fromStream = s8, c7;
}
async function xo({ text: e8, binary: t8, filename: r8, date: i8 = /* @__PURE__ */ new Date(), format: a8 = void 0 !== e8 ? "utf8" : "binary", ...n8 }) {
  const s8 = void 0 !== e8 ? e8 : t8;
  if (void 0 === s8) throw Error("createMessage: must pass options object containing `text` or `binary`");
  if (e8 && !_5.isString(e8) && !_5.isStream(e8)) throw Error("createMessage: options.text must be a string or stream");
  if (t8 && !_5.isUint8Array(t8) && !_5.isStream(t8)) throw Error("createMessage: options.binary must be a Uint8Array or stream");
  const o8 = Object.keys(n8);
  if (o8.length > 0) throw Error("Unknown option: " + o8.join(", "));
  const c7 = _5.isStream(s8), u8 = new es(i8);
  void 0 !== e8 ? u8.setText(s8, M7.write(M7.literal, a8)) : u8.setBytes(s8, M7.write(M7.literal, a8)), void 0 !== r8 && u8.setFilename(r8);
  const h7 = new hs();
  h7.push(u8);
  const l6 = new So(h7);
  return l6.fromStream = c7, l6;
}
var Co = /* @__PURE__ */ _5.constructAllowedPackets([ns]);
var Io = class _Io {
  constructor(e8, t8) {
    if (this.text = _5.removeTrailingSpaces(e8).replace(/\r?\n/g, "\r\n"), t8 && !(t8 instanceof qs)) throw Error("Invalid signature input");
    this.signature = t8 || new qs(new hs());
  }
  getSigningKeyIDs() {
    const e8 = [];
    return this.signature.packets.forEach((function(t8) {
      e8.push(t8.issuerKeyID);
    })), e8;
  }
  async sign(e8, t8 = [], r8 = null, i8 = [], a8 = /* @__PURE__ */ new Date(), n8 = [], s8 = [], o8 = [], c7 = L4) {
    const u8 = new es();
    u8.setText(this.text);
    const h7 = new qs(await Po(u8, e8, t8, r8, i8, a8, n8, s8, o8, true, c7));
    return new _Io(this.text, h7);
  }
  verify(e8, t8 = /* @__PURE__ */ new Date(), r8 = L4) {
    const i8 = this.signature.packets.filterByTag(M7.packet.signature), a8 = new es();
    return a8.setText(this.text), Uo(i8, [a8], e8, t8, true, r8);
  }
  getText() {
    return this.text.replace(/\r\n/g, "\n");
  }
  armor(e8 = L4) {
    const t8 = this.signature.packets.some(((e9) => 6 !== e9.version)), r8 = { hash: t8 ? Array.from(new Set(this.signature.packets.map(((e9) => M7.read(M7.hash, e9.hashAlgorithm).toUpperCase())))).join() : null, text: this.text, data: this.signature.packets.write() };
    return J5(M7.armor.signed, r8, void 0, void 0, void 0, t8, e8);
  }
};
async function To({ cleartextMessage: e8, config: t8, ...r8 }) {
  if (t8 = { ...L4, ...t8 }, !e8) throw Error("readCleartextMessage: must pass options object containing `cleartextMessage`");
  if (!_5.isString(e8)) throw Error("readCleartextMessage: options.cleartextMessage must be a string");
  const i8 = Object.keys(r8);
  if (i8.length > 0) throw Error("Unknown option: " + i8.join(", "));
  const a8 = await Z4(e8);
  if (a8.type !== M7.armor.signed) throw Error("No cleartext signed message.");
  const n8 = await hs.fromBinary(a8.data, Co, t8);
  !(function(e9, t9) {
    const r9 = function(e10) {
      const r10 = (e11) => (t10) => e11.hashAlgorithm === t10;
      for (let i10 = 0; i10 < t9.length; i10++) if (t9[i10].constructor.tag === M7.packet.signature && !e10.some(r10(t9[i10]))) return false;
      return true;
    }, i9 = [];
    if (e9.forEach(((e10) => {
      const t10 = e10.match(/^Hash: (.+)$/);
      if (!t10) throw Error('Only "Hash" header allowed in cleartext signed message');
      {
        const e11 = t10[1].replace(/\s/g, "").split(",").map(((e12) => {
          try {
            return M7.write(M7.hash, e12.toLowerCase());
          } catch {
            throw Error("Unknown hash algorithm in armor header: " + e12.toLowerCase());
          }
        }));
        i9.push(...e11);
      }
    })), i9.length && !r9(i9)) throw Error("Hash algorithm mismatch in armor header and signature");
  })(a8.headers, n8);
  const s8 = new qs(n8);
  return new Io(a8.text, s8);
}
async function Mo({ userIDs: e8 = [], passphrase: t8, type: r8, curve: i8, rsaBits: a8 = 4096, symmetricHash: n8 = "sha256", symmetricCipher: s8 = "aes256", keyExpirationTime: o8 = 0, date: c7 = /* @__PURE__ */ new Date(), subkeys: u8 = [{}], format: h7 = "armored", signatureNotations: l6 = [], config: y8, ...p5 }) {
  Xo(y8 = { ...L4, ...y8 }), r8 || i8 ? (r8 = r8 || "ecc", i8 = i8 || "curve25519Legacy") : (r8 = y8.v6Keys ? "curve25519" : "ecc", i8 = "curve25519Legacy"), e8 = Yo(e8), l6 = Yo(l6);
  const d6 = Object.keys(p5);
  if (d6.length > 0) throw Error("Unknown option: " + d6.join(", "));
  if (0 === e8.length && !y8.v6Keys) throw Error("UserIDs are required for V4 keys");
  if ("rsa" === r8 && a8 < y8.minRSABits) throw Error(`rsaBits should be at least ${y8.minRSABits}, got: ${a8}`);
  const g7 = { userIDs: e8, passphrase: t8, type: r8, rsaBits: a8, curve: i8, keyExpirationTime: o8, date: c7, subkeys: u8, signatureNotations: l6, symmetricHash: n8, symmetricCipher: s8 };
  try {
    const { key: e9, revocationCertificate: t9 } = await (async function(e10, t10) {
      e10.sign = true, (e10 = to(e10)).subkeys = e10.subkeys.map(((t11, r10) => to(e10.subkeys[r10], e10)));
      let r9 = [Vs(e10, t10)];
      r9 = r9.concat(e10.subkeys.map(((e11) => Gs(e11, t10))));
      const i9 = await Promise.all(r9), a9 = await fo(i9[0], i9.slice(1), e10, t10), n9 = await a9.getRevocationCertificate(e10.date, t10);
      return a9.revocationSignatures = [], { key: a9, revocationCertificate: n9 };
    })(g7, y8);
    return e9.getKeys().forEach((({ keyPacket: e10 }) => no(e10, y8))), { privateKey: ec(e9, h7, y8), publicKey: "symmetric" !== r8 ? ec(e9.toPublic(), h7, y8) : null, revocationCertificate: t9 };
  } catch (e9) {
    throw _5.wrapError("Error generating keypair", e9);
  }
}
async function Lo({ privateKey: e8, userIDs: t8 = [], passphrase: r8, keyExpirationTime: i8 = 0, date: a8, format: n8 = "armored", signatureNotations: s8 = [], config: o8, ...c7 }) {
  Xo(o8 = { ...L4, ...o8 }), t8 = Yo(t8), s8 = Yo(s8);
  const u8 = Object.keys(c7);
  if (u8.length > 0) throw Error("Unknown option: " + u8.join(", "));
  if (0 === t8.length && 6 !== e8.keyPacket.version) throw Error("UserIDs are required for V4 keys");
  const h7 = { privateKey: e8, userIDs: t8, passphrase: r8, keyExpirationTime: i8, date: a8, signatureNotations: s8 };
  try {
    const { key: e9, revocationCertificate: t9 } = await (async function(e10, t10) {
      e10 = o9(e10);
      const { privateKey: r9 } = e10;
      if (!r9.isPrivate()) throw Error("Cannot reformat a public key");
      if (r9.keyPacket.isDummy()) throw Error("Cannot reformat a gnu-dummy primary key");
      if (!r9.getKeys().every((({ keyPacket: e11 }) => e11.isDecrypted()))) throw Error("Key is not decrypted");
      const i9 = r9.keyPacket;
      e10.subkeys || (e10.subkeys = await Promise.all(r9.subkeys.map((async (e11) => {
        const r10 = e11.keyPacket, a10 = { key: i9, bind: r10 }, n10 = await Ws(e11.bindingSignatures, i9, M7.signature.subkeyBinding, a10, null, t10).catch((() => ({})));
        return { sign: n10.keyFlags && n10.keyFlags[0] & M7.keyFlags.signData, forwarding: n10.keyFlags && n10.keyFlags[0] & M7.keyFlags.forwardedCommunication };
      }))));
      const a9 = r9.subkeys.map(((e11) => e11.keyPacket));
      if (e10.subkeys.length !== a9.length) throw Error("Number of subkey options does not match number of subkeys");
      e10.subkeys = e10.subkeys.map(((t11) => o9(t11, e10)));
      const n9 = await fo(i9, a9, e10, t10), s9 = await n9.getRevocationCertificate(e10.date, t10);
      return n9.revocationSignatures = [], { key: n9, revocationCertificate: s9 };
      function o9(e11, t11 = {}) {
        return e11.keyExpirationTime = e11.keyExpirationTime || t11.keyExpirationTime, e11.passphrase = _5.isString(e11.passphrase) ? e11.passphrase : t11.passphrase, e11.date = e11.date || t11.date, e11;
      }
    })(h7, o8);
    return { privateKey: ec(e9, n8, o8), publicKey: ec(e9.toPublic(), n8, o8), revocationCertificate: t9 };
  } catch (e9) {
    throw _5.wrapError("Error reformatting keypair", e9);
  }
}
async function _o({ privateKey: e8, passphrase: t8, config: r8, ...i8 }) {
  Xo(r8 = { ...L4, ...r8 });
  const a8 = Object.keys(i8);
  if (a8.length > 0) throw Error("Unknown option: " + a8.join(", "));
  if (!e8.isPrivate()) throw Error("Cannot decrypt a public key");
  const n8 = e8.clone(true), s8 = _5.isArray(t8) ? t8 : [t8];
  try {
    return await Promise.all(n8.getKeys().map(((e9) => _5.anyPromise(s8.map(((t9) => e9.keyPacket.decrypt(t9, r8))))))), await n8.validate(r8), n8;
  } catch (e9) {
    throw n8.clearPrivateParams(), _5.wrapError("Error decrypting private key", e9);
  }
}
async function No({ privateKey: e8, passphrase: t8, config: r8, ...i8 }) {
  Xo(r8 = { ...L4, ...r8 });
  const a8 = Object.keys(i8);
  if (a8.length > 0) throw Error("Unknown option: " + a8.join(", "));
  if (!e8.isPrivate()) throw Error("Cannot encrypt a public key");
  const n8 = e8.clone(true), s8 = n8.getKeys(), o8 = _5.isArray(t8) ? t8 : Array(s8.length).fill(t8);
  if (o8.length !== s8.length) throw Error("Invalid number of passphrases given for key encryption");
  try {
    return await Promise.all(s8.map((async (e9, t9) => {
      const { keyPacket: i9 } = e9;
      await i9.encrypt(o8[t9], r8), i9.clearPrivateParams();
    }))), n8;
  } catch (e9) {
    throw n8.clearPrivateParams(), _5.wrapError("Error encrypting private key", e9);
  }
}
async function Ro({ message: e8, encryptionKeys: t8, signingKeys: r8, passwords: i8, sessionKey: a8, format: n8 = "armored", signature: s8 = null, wildcard: o8 = false, signingKeyIDs: c7 = [], encryptionKeyIDs: u8 = [], date: h7 = /* @__PURE__ */ new Date(), signingUserIDs: l6 = [], encryptionUserIDs: y8 = [], signatureNotations: p5 = [], config: d6, ...g7 }) {
  if (Xo(d6 = { ...L4, ...d6 }), Vo(e8), $o(n8), t8 = Yo(t8), r8 = Yo(r8), i8 = Yo(i8), c7 = Yo(c7), u8 = Yo(u8), l6 = Yo(l6), y8 = Yo(y8), p5 = Yo(p5), g7.detached) throw Error("The `detached` option has been removed from openpgp.encrypt, separately call openpgp.sign instead. Don't forget to remove the `privateKeys` option as well.");
  if (g7.publicKeys) throw Error("The `publicKeys` option has been removed from openpgp.encrypt, pass `encryptionKeys` instead");
  if (g7.privateKeys) throw Error("The `privateKeys` option has been removed from openpgp.encrypt, pass `signingKeys` instead");
  if (void 0 !== g7.armor) throw Error("The `armor` option has been removed from openpgp.encrypt, pass `format` instead.");
  const m6 = Object.keys(g7);
  if (m6.length > 0) throw Error("Unknown option: " + m6.join(", "));
  r8 || (r8 = []);
  try {
    if ((r8.length || s8) && (e8 = await e8.sign(r8, t8, s8, c7, h7, l6, u8, p5, d6)), e8 = e8.compress(await (async function(e9 = [], t9 = /* @__PURE__ */ new Date(), r9 = [], i9 = L4) {
      const a9 = M7.compression.uncompressed, n9 = i9.preferredCompressionAlgorithm, s9 = await Promise.all(e9.map((async function(e10, a10) {
        const s10 = (await e10.getPrimarySelfSignature(t9, r9[a10], i9)).preferredCompressionAlgorithms;
        return !!s10 && s10.indexOf(n9) >= 0;
      })));
      return s9.every(Boolean) ? n9 : a9;
    })(t8, h7, y8, d6), d6), e8 = await e8.encrypt(t8, i8, a8, o8, u8, h7, y8, d6), "object" === n8) return e8;
    const g8 = "armored" === n8 ? e8.armor(d6) : e8.write();
    return await Zo(g8);
  } catch (e9) {
    throw _5.wrapError("Error encrypting message", e9);
  }
}
async function zo({ message: e8, decryptionKeys: t8, passwords: r8, sessionKeys: i8, verificationKeys: a8, expectSigned: n8 = false, format: s8 = "utf8", signature: o8 = null, date: c7 = /* @__PURE__ */ new Date(), config: u8, ...h7 }) {
  if (Xo(u8 = { ...L4, ...u8 }), Vo(e8), a8 = Yo(a8), t8 = Yo(t8), r8 = Yo(r8), i8 = Yo(i8), h7.privateKeys) throw Error("The `privateKeys` option has been removed from openpgp.decrypt, pass `decryptionKeys` instead");
  if (h7.publicKeys) throw Error("The `publicKeys` option has been removed from openpgp.decrypt, pass `verificationKeys` instead");
  const l6 = Object.keys(h7);
  if (l6.length > 0) throw Error("Unknown option: " + l6.join(", "));
  try {
    const h8 = await e8.decrypt(t8, r8, i8, c7, u8);
    a8 || (a8 = []);
    const l7 = {};
    if (l7.signatures = o8 ? await h8.verifyDetached(o8, a8, c7, u8) : await h8.verify(a8, c7, u8), l7.data = "binary" === s8 ? h8.getLiteralData() : h8.getText(), l7.filename = h8.getFilename(), Jo(l7, e8, .../* @__PURE__ */ new Set([h8, h8.unwrapCompressed()])), n8) {
      if (0 === a8.length) throw Error("Verification keys are required to verify message signatures");
      if (0 === l7.signatures.length) throw Error("Message is not signed");
      l7.data = m5([l7.data, C7((async () => (await _5.anyPromise(l7.signatures.map(((e9) => e9.verified))), "binary" === s8 ? new Uint8Array() : "")))]);
    }
    return l7.data = await Zo(l7.data), l7;
  } catch (e9) {
    throw _5.wrapError("Error decrypting message", e9);
  }
}
async function Oo({ message: e8, signingKeys: t8, recipientKeys: r8 = [], format: i8 = "armored", detached: a8 = false, signingKeyIDs: n8 = [], date: s8 = /* @__PURE__ */ new Date(), signingUserIDs: o8 = [], recipientUserIDs: c7 = [], signatureNotations: u8 = [], config: h7, ...l6 }) {
  if (Xo(h7 = { ...L4, ...h7 }), Wo(e8), $o(i8), t8 = Yo(t8), n8 = Yo(n8), o8 = Yo(o8), r8 = Yo(r8), c7 = Yo(c7), u8 = Yo(u8), l6.privateKeys) throw Error("The `privateKeys` option has been removed from openpgp.sign, pass `signingKeys` instead");
  if (void 0 !== l6.armor) throw Error("The `armor` option has been removed from openpgp.sign, pass `format` instead.");
  const y8 = Object.keys(l6);
  if (y8.length > 0) throw Error("Unknown option: " + y8.join(", "));
  if (e8 instanceof Io && "binary" === i8) throw Error("Cannot return signed cleartext message in binary format");
  if (e8 instanceof Io && a8) throw Error("Cannot detach-sign a cleartext message");
  if (!t8 || 0 === t8.length) throw Error("No signing keys provided");
  try {
    let l7;
    if (l7 = a8 ? await e8.signDetached(t8, r8, void 0, n8, s8, o8, c7, u8, h7) : await e8.sign(t8, r8, void 0, n8, s8, o8, c7, u8, h7), "object" === i8) return l7;
    return l7 = "armored" === i8 ? l7.armor(h7) : l7.write(), a8 && (l7 = K5(e8.packets.write(), (async (e9, t9) => {
      await Promise.all([f7(l7, t9), D7(e9).catch((() => {
      }))]);
    }))), await Zo(l7);
  } catch (e9) {
    throw _5.wrapError("Error signing message", e9);
  }
}
async function jo({ message: e8, verificationKeys: t8, expectSigned: r8 = false, format: i8 = "utf8", signature: a8 = null, date: n8 = /* @__PURE__ */ new Date(), config: s8, ...o8 }) {
  if (Xo(s8 = { ...L4, ...s8 }), Wo(e8), t8 = Yo(t8), o8.publicKeys) throw Error("The `publicKeys` option has been removed from openpgp.verify, pass `verificationKeys` instead");
  const c7 = Object.keys(o8);
  if (c7.length > 0) throw Error("Unknown option: " + c7.join(", "));
  if (e8 instanceof Io && "binary" === i8) throw Error("Can't return cleartext message data as binary");
  if (e8 instanceof Io && a8) throw Error("Can't verify detached cleartext signature");
  try {
    const o9 = {};
    if (o9.signatures = a8 ? await e8.verifyDetached(a8, t8, n8, s8) : await e8.verify(t8, n8, s8), o9.data = "binary" === i8 ? e8.getLiteralData() : e8.getText(), e8.fromStream && !a8 && Jo(o9, .../* @__PURE__ */ new Set([e8, e8.unwrapCompressed()])), r8) {
      if (0 === o9.signatures.length) throw Error("Message is not signed");
      o9.data = m5([o9.data, C7((async () => (await _5.anyPromise(o9.signatures.map(((e9) => e9.verified))), "binary" === i8 ? new Uint8Array() : "")))]);
    }
    return o9.data = await Zo(o9.data), o9;
  } catch (e9) {
    throw _5.wrapError("Error verifying signed message", e9);
  }
}
async function qo({ encryptionKeys: e8, date: t8 = /* @__PURE__ */ new Date(), encryptionUserIDs: r8 = [], config: i8, ...a8 }) {
  if (Xo(i8 = { ...L4, ...i8 }), e8 = Yo(e8), r8 = Yo(r8), a8.publicKeys) throw Error("The `publicKeys` option has been removed from openpgp.generateSessionKey, pass `encryptionKeys` instead");
  const n8 = Object.keys(a8);
  if (n8.length > 0) throw Error("Unknown option: " + n8.join(", "));
  try {
    return await So.generateSessionKey(e8, t8, r8, i8);
  } catch (e9) {
    throw _5.wrapError("Error generating session key", e9);
  }
}
async function Ho({ data: e8, algorithm: t8, aeadAlgorithm: r8, encryptionKeys: i8, passwords: a8, format: n8 = "armored", wildcard: s8 = false, encryptionKeyIDs: o8 = [], date: c7 = /* @__PURE__ */ new Date(), encryptionUserIDs: u8 = [], config: h7, ...l6 }) {
  if (Xo(h7 = { ...L4, ...h7 }), (function(e9) {
    if (!_5.isUint8Array(e9)) throw Error("Parameter [data] must be of type Uint8Array");
  })(e8), (function(e9, t9) {
    if (!_5.isString(e9)) throw Error("Parameter [" + t9 + "] must be of type String");
  })(t8, "algorithm"), $o(n8), i8 = Yo(i8), a8 = Yo(a8), o8 = Yo(o8), u8 = Yo(u8), l6.publicKeys) throw Error("The `publicKeys` option has been removed from openpgp.encryptSessionKey, pass `encryptionKeys` instead");
  const y8 = Object.keys(l6);
  if (y8.length > 0) throw Error("Unknown option: " + y8.join(", "));
  if (!(i8 && 0 !== i8.length || a8 && 0 !== a8.length)) throw Error("No encryption keys or passwords provided.");
  try {
    return ec(await So.encryptSessionKey(e8, t8, r8, i8, a8, s8, o8, c7, u8, h7), n8, h7);
  } catch (e9) {
    throw _5.wrapError("Error encrypting session key", e9);
  }
}
async function Go({ message: e8, decryptionKeys: t8, passwords: r8, date: i8 = /* @__PURE__ */ new Date(), config: a8, ...n8 }) {
  if (Xo(a8 = { ...L4, ...a8 }), Vo(e8), t8 = Yo(t8), r8 = Yo(r8), n8.privateKeys) throw Error("The `privateKeys` option has been removed from openpgp.decryptSessionKeys, pass `decryptionKeys` instead");
  const s8 = Object.keys(n8);
  if (s8.length > 0) throw Error("Unknown option: " + s8.join(", "));
  try {
    return await e8.decryptSessionKeys(t8, r8, void 0, i8, a8);
  } catch (e9) {
    throw _5.wrapError("Error decrypting session keys", e9);
  }
}
function Vo(e8) {
  if (!(e8 instanceof So)) throw Error("Parameter [message] needs to be of type Message");
}
function Wo(e8) {
  if (!(e8 instanceof Io || e8 instanceof So)) throw Error("Parameter [message] needs to be of type Message or CleartextMessage");
}
function $o(e8) {
  if ("armored" !== e8 && "binary" !== e8 && "object" !== e8) throw Error("Unsupported format " + e8);
}
var Qo = Object.keys(L4).length;
function Xo(e8) {
  const t8 = Object.keys(e8);
  if (t8.length !== Qo) {
    for (const e9 of t8) if (void 0 === L4[e9]) throw Error("Unknown config property: " + e9);
  }
}
function Yo(e8) {
  return e8 && !_5.isArray(e8) && (e8 = [e8]), e8;
}
async function Zo(e8) {
  return "array" === _5.isStream(e8) ? D7(e8) : e8;
}
function Jo(e8, t8, ...r8) {
  e8.data = K5(t8.packets.stream, (async (t9, i8) => {
    await f7(e8.data, i8, { preventClose: true });
    const a8 = T5(i8);
    try {
      await D7(t9, ((e9) => e9)), await Promise.all(r8.map(((e9) => D7(e9.packets.stream, ((e10) => e10))))), await a8.close();
    } catch (e9) {
      await a8.abort(e9);
    }
  }));
}
function ec(e8, t8, r8) {
  switch (t8) {
    case "object":
      return e8;
    case "armored":
      return e8.armor(r8);
    case "binary":
      return e8.write();
    default:
      throw Error("Unsupported format " + t8);
  }
}

// node_modules/@protontech/crypto/src/pmcrypto/openpgp.ts
var setConfig = () => {
  L4.s2kIterationCountByte = 255;
  L4.allowInsecureDecryptionWithSigningKeys = true;
  L4.allowInsecureVerificationWithReformattedKeys = true;
  L4.rejectPublicKeyAlgorithms = /* @__PURE__ */ new Set();
  L4.rejectCurves = /* @__PURE__ */ new Set();
  L4.minRSABits = 1023;
  L4.ignoreSEIPDv2FeatureFlag = true;
  L4.enableParsingV5Entities = true;
  L4.maxArgon2MemoryExponent = 20;
};

// node_modules/@protontech/crypto/src/pmcrypto/crypto/hash.ts
var SHA256 = async (data) => {
  const digest = await crypto.subtle.digest("SHA-256", data);
  return new Uint8Array(digest);
};
var SHA512 = async (data) => {
  const digest = await crypto.subtle.digest("SHA-512", data);
  return new Uint8Array(digest);
};
var unsafeMD5 = async (data) => Promise.resolve().then(() => (init_legacy(), legacy_exports)).then(
  ({ md5: md52 }) => md52(data)
);
async function unsafeSHA1(data) {
  if (data instanceof Uint8Array) {
    const digest = await crypto.subtle.digest("SHA-1", data);
    return new Uint8Array(digest);
  }
  const { sha1: sha12 } = await Promise.resolve().then(() => (init_legacy(), legacy_exports));
  const hashInstance = sha12.create();
  const inputReader = data.getReader();
  while (true) {
    const { done, value } = await inputReader.read();
    if (done) {
      return hashInstance.digest();
    }
    hashInstance.update(value);
  }
}

// node_modules/@protontech/crypto/src/pmcrypto/crypto/argon2.ts
var SECOND = 1e3;
var TimeoutHandler = {
  id: void 0,
  cancelReloadingTimeout: (memoryExponent) => memoryExponent > ARGON2_PARAMS.MINIMUM.memoryExponent && clearTimeout(TimeoutHandler.id),
  setupReloadingTimeout: (memoryExponent) => {
    const shouldReloadAfterTimeout = memoryExponent > ARGON2_PARAMS.MINIMUM.memoryExponent && memoryExponent <= en.ARGON2_WASM_MEMORY_THRESHOLD_RELOAD;
    TimeoutHandler.id = shouldReloadAfterTimeout ? setTimeout(() => en.reloadWasmModule(), 10 * SECOND) : void 0;
  }
};
async function argon2({
  password,
  salt,
  params = ARGON2_PARAMS.RECOMMENDED
}) {
  TimeoutHandler.cancelReloadingTimeout(params.memoryExponent);
  const s2k = new en({ ...L4, s2kArgon2Params: params });
  s2k.salt = salt;
  const result = await s2k.produceKey(
    password,
    params.tagLength,
    // @ts-expect-error missing config param declaration
    L4
  );
  TimeoutHandler.setupReloadingTimeout(params.memoryExponent);
  return result;
}

// node_modules/@protontech/crypto/src/pmcrypto/crypto/utils.ts
var SYMMETRIC_KEY_SIZES = {
  aes128: 16,
  aes192: 24,
  aes256: 32
};
function getSymmetricKeySize(algoName) {
  if (!SYMMETRIC_KEY_SIZES[algoName]) {
    throw new Error("Unsupported symmetric algorithm");
  }
  return SYMMETRIC_KEY_SIZES[algoName];
}
var getRandomBytes = (length) => {
  return crypto.getRandomValues(new Uint8Array(length));
};

// node_modules/@openpgp/web-stream-tools/lib/writer.js
var doneWritingPromise = /* @__PURE__ */ Symbol("doneWritingPromise");
var doneWritingResolve = /* @__PURE__ */ Symbol("doneWritingResolve");
var doneWritingReject = /* @__PURE__ */ Symbol("doneWritingReject");
var readingIndex = /* @__PURE__ */ Symbol("readingIndex");
var ArrayStream = class _ArrayStream extends Array {
  constructor() {
    super();
    Object.setPrototypeOf(this, _ArrayStream.prototype);
    this[doneWritingPromise] = new Promise((resolve, reject) => {
      this[doneWritingResolve] = resolve;
      this[doneWritingReject] = reject;
    });
    this[doneWritingPromise].catch(() => {
    });
  }
};
ArrayStream.prototype.getReader = function() {
  if (this[readingIndex] === void 0) {
    this[readingIndex] = 0;
  }
  return {
    read: async () => {
      await this[doneWritingPromise];
      if (this[readingIndex] === this.length) {
        return { value: void 0, done: true };
      }
      return { value: this[this[readingIndex]++], done: false };
    }
  };
};
ArrayStream.prototype.readToEnd = async function(join) {
  await this[doneWritingPromise];
  const result = join(this.slice(this[readingIndex]));
  this.length = 0;
  return result;
};
ArrayStream.prototype.clone = function() {
  const clone2 = new ArrayStream();
  clone2[doneWritingPromise] = this[doneWritingPromise].then(() => {
    clone2.push(...this);
  });
  return clone2;
};
function isArrayStream(input) {
  return input && input.getReader && Array.isArray(input);
}
function Writer(input) {
  if (!isArrayStream(input)) {
    const writer = input.getWriter();
    const releaseLock = writer.releaseLock;
    writer.releaseLock = () => {
      writer.closed.catch(function() {
      });
      releaseLock.call(writer);
    };
    return writer;
  }
  this.stream = input;
}
Writer.prototype.write = async function(chunk) {
  this.stream.push(chunk);
};
Writer.prototype.close = async function() {
  this.stream[doneWritingResolve]();
};
Writer.prototype.abort = async function(reason) {
  this.stream[doneWritingReject](reason);
  return reason;
};
Writer.prototype.releaseLock = function() {
};

// node_modules/@openpgp/web-stream-tools/lib/util.js
var isNode = typeof globalThis.process === "object" && typeof globalThis.process.versions === "object";
function isStream(input) {
  if (isArrayStream(input)) {
    return "array";
  }
  if (globalThis.ReadableStream && globalThis.ReadableStream.prototype.isPrototypeOf(input)) {
    return "web";
  }
  if (input && !(globalThis.ReadableStream && input instanceof globalThis.ReadableStream) && typeof input._read === "function" && typeof input._readableState === "object") {
    throw new Error("Native Node streams are no longer supported: please manually convert the stream to a WebStream, using e.g. `stream.Readable.toWeb`");
  }
  if (input && input.getReader) {
    return "web-like";
  }
  return false;
}
function isUint8Array(input) {
  return Uint8Array.prototype.isPrototypeOf(input);
}
function concatUint8Array(arrays) {
  if (arrays.length === 1) return arrays[0];
  let totalLength = 0;
  for (let i8 = 0; i8 < arrays.length; i8++) {
    if (!isUint8Array(arrays[i8])) {
      throw new Error("concatUint8Array: Data must be in the form of a Uint8Array");
    }
    totalLength += arrays[i8].length;
  }
  const result = new Uint8Array(totalLength);
  let pos = 0;
  arrays.forEach(function(element) {
    result.set(element, pos);
    pos += element.length;
  });
  return result;
}

// node_modules/@openpgp/web-stream-tools/lib/reader.js
var doneReadingSet = /* @__PURE__ */ new WeakSet();
var externalBuffer = /* @__PURE__ */ Symbol("externalBuffer");
function Reader(input) {
  this.stream = input;
  if (input[externalBuffer]) {
    this[externalBuffer] = input[externalBuffer].slice();
  }
  if (isArrayStream(input)) {
    const reader = input.getReader();
    this._read = reader.read.bind(reader);
    this._releaseLock = () => {
    };
    this._cancel = () => {
    };
    return;
  }
  let streamType = isStream(input);
  if (streamType) {
    const reader = input.getReader();
    this._read = reader.read.bind(reader);
    this._releaseLock = () => {
      reader.closed.catch(function() {
      });
      reader.releaseLock();
    };
    this._cancel = reader.cancel.bind(reader);
    return;
  }
  let doneReading = false;
  this._read = async () => {
    if (doneReading || doneReadingSet.has(input)) {
      return { value: void 0, done: true };
    }
    doneReading = true;
    return { value: input, done: false };
  };
  this._releaseLock = () => {
    if (doneReading) {
      try {
        doneReadingSet.add(input);
      } catch {
      }
    }
  };
}
Reader.prototype.read = async function() {
  if (this[externalBuffer] && this[externalBuffer].length) {
    const value = this[externalBuffer].shift();
    return { done: false, value };
  }
  return this._read();
};
Reader.prototype.releaseLock = function() {
  if (this[externalBuffer]) {
    this.stream[externalBuffer] = this[externalBuffer];
  }
  this._releaseLock();
};
Reader.prototype.cancel = function(reason) {
  return this._cancel(reason);
};
Reader.prototype.readLine = async function() {
  let buffer = [];
  let returnVal;
  while (!returnVal) {
    let { done, value } = await this.read();
    value += "";
    if (done) {
      if (buffer.length) return concat(buffer);
      return;
    }
    const lineEndIndex = value.indexOf("\n") + 1;
    if (lineEndIndex) {
      returnVal = concat(buffer.concat(value.substr(0, lineEndIndex)));
      buffer = [];
    }
    if (lineEndIndex !== value.length) {
      buffer.push(value.substr(lineEndIndex));
    }
  }
  this.unshift(...buffer);
  return returnVal;
};
Reader.prototype.readByte = async function() {
  const { done, value } = await this.read();
  if (done) return;
  const byte = value[0];
  this.unshift(slice(value, 1));
  return byte;
};
Reader.prototype.readBytes = async function(length) {
  const buffer = [];
  let bufferLength = 0;
  while (true) {
    const { done, value } = await this.read();
    if (done) {
      if (buffer.length) return concat(buffer);
      return;
    }
    buffer.push(value);
    bufferLength += value.length;
    if (bufferLength >= length) {
      const bufferConcat = concat(buffer);
      this.unshift(slice(bufferConcat, length));
      return slice(bufferConcat, 0, length);
    }
  }
};
Reader.prototype.peekBytes = async function(length) {
  const bytes = await this.readBytes(length);
  this.unshift(bytes);
  return bytes;
};
Reader.prototype.unshift = function(...values) {
  if (!this[externalBuffer]) {
    this[externalBuffer] = [];
  }
  if (values.length === 1 && isUint8Array(values[0]) && this[externalBuffer].length && values[0].length && this[externalBuffer][0].byteOffset >= values[0].length) {
    this[externalBuffer][0] = new Uint8Array(
      this[externalBuffer][0].buffer,
      this[externalBuffer][0].byteOffset - values[0].length,
      this[externalBuffer][0].byteLength + values[0].length
    );
    return;
  }
  this[externalBuffer].unshift(...values.filter((value) => value && value.length));
};
Reader.prototype.readToEnd = async function(join = concat) {
  const result = [];
  while (true) {
    const { done, value } = await this.read();
    if (done) break;
    result.push(value);
  }
  return join(result);
};

// node_modules/@openpgp/web-stream-tools/lib/streams.js
function toStream(input) {
  if (isStream(input)) {
    return input;
  }
  return new ReadableStream({
    start(controller) {
      controller.enqueue(input);
      controller.close();
    }
  });
}
function toArrayStream(input) {
  const streamType = isStream(input);
  if (streamType) {
    if (streamType !== "array") {
      throw new Error("Can't convert Stream to ArrayStream here, call `readToEnd` first");
    }
    return input;
  }
  const stream = new ArrayStream();
  (async () => {
    const writer = getWriter(stream);
    await writer.write(input);
    await writer.close();
  })();
  return stream;
}
function concat(list) {
  if (list.some((stream) => isStream(stream) && !isArrayStream(stream))) {
    return concatStream(list);
  }
  if (list.some((stream) => isArrayStream(stream))) {
    return concatArrayStream(list);
  }
  if (typeof list[0] === "string") {
    return list.join("");
  }
  return concatUint8Array(list);
}
function concatStream(list) {
  const streamedList = list.map(toStream);
  const transform2 = transformWithCancel(async function(reason) {
    await Promise.all(transforms.map((stream) => cancel(stream, reason)));
  });
  let prev = Promise.resolve();
  const transforms = streamedList.map((stream, i8) => transformPair(stream, (readable, _writable) => {
    prev = prev.then(() => pipe(readable, transform2.writable, {
      preventClose: i8 !== streamedList.length - 1
    }));
    return prev;
  }));
  return transform2.readable;
}
function concatArrayStream(list) {
  const result = new ArrayStream();
  let prev = Promise.resolve();
  list.forEach((stream, i8) => {
    prev = prev.then(() => pipe(stream, result, {
      preventClose: i8 !== list.length - 1
    }));
    return prev;
  });
  return result;
}
async function pipe(input, target, {
  preventClose = false,
  preventAbort = false,
  preventCancel = false
} = {}) {
  if (isStream(input) && !isArrayStream(input) && !isArrayStream(target)) {
    input = toStream(input);
    try {
      if (input[externalBuffer]) {
        const writer2 = getWriter(target);
        for (let i8 = 0; i8 < input[externalBuffer].length; i8++) {
          await writer2.ready;
          await writer2.write(input[externalBuffer][i8]);
        }
        writer2.releaseLock();
      }
      await input.pipeTo(target, {
        preventClose,
        preventAbort,
        preventCancel
      });
    } catch {
    }
    return;
  }
  if (!isStream(input)) {
    input = toArrayStream(input);
  }
  const reader = getReader(input);
  const writer = getWriter(target);
  try {
    while (true) {
      await writer.ready;
      const { done, value } = await reader.read();
      if (done) {
        if (!preventClose) await writer.close();
        break;
      }
      await writer.write(value);
    }
  } catch (e8) {
    if (!preventAbort) await writer.abort(e8);
  } finally {
    reader.releaseLock();
    writer.releaseLock();
  }
}
function transformWithCancel(customCancel) {
  let pulled = false;
  let cancelled = false;
  let backpressureChangePromiseResolve, backpressureChangePromiseReject;
  let outputController;
  return {
    readable: new ReadableStream({
      start(controller) {
        outputController = controller;
      },
      pull() {
        if (backpressureChangePromiseResolve) {
          backpressureChangePromiseResolve();
        } else {
          pulled = true;
        }
      },
      async cancel(reason) {
        cancelled = true;
        if (customCancel) {
          await customCancel(reason);
        }
        if (backpressureChangePromiseReject) {
          backpressureChangePromiseReject(reason);
        }
      }
    }, { highWaterMark: 0 }),
    writable: new WritableStream({
      write: async function(chunk) {
        if (cancelled) {
          throw new Error("Stream is cancelled");
        }
        outputController.enqueue(chunk);
        if (!pulled) {
          await new Promise((resolve, reject) => {
            backpressureChangePromiseResolve = resolve;
            backpressureChangePromiseReject = reject;
          });
          backpressureChangePromiseResolve = null;
          backpressureChangePromiseReject = null;
        } else {
          pulled = false;
        }
      },
      close: outputController.close.bind(outputController),
      abort: outputController.error.bind(outputController)
    })
  };
}
function transform(input, process2 = () => void 0, finish = () => void 0, queuingStrategy = { highWaterMark: 0 }) {
  if (isStream(input)) {
    return _transformStream(input, process2, finish, queuingStrategy);
  }
  const result1 = process2(input);
  const result2 = finish();
  if (result1 !== void 0 && result2 !== void 0) return concat([result1, result2]);
  return result1 !== void 0 ? result1 : result2;
}
function _transformStream(input, process2, finish, queuingStrategy) {
  if (isArrayStream(input)) {
    const output = new ArrayStream();
    (async () => {
      const writer = getWriter(output);
      try {
        const data = await readToEnd(input);
        const result1 = await process2(data);
        const result2 = await finish();
        let result;
        if (result1 !== void 0 && result2 !== void 0) result = concat([result1, result2]);
        else result = result1 !== void 0 ? result1 : result2;
        await writer.write(result);
        await writer.close();
      } catch (e8) {
        await writer.abort(e8);
      }
    })();
    return output;
  }
  if (isStream(input)) {
    let reader;
    let allDone = false;
    return new ReadableStream({
      start() {
        reader = input.getReader();
      },
      async pull(controller) {
        if (allDone) {
          controller.close();
          input.releaseLock();
          return;
        }
        try {
          while (true) {
            const { value, done } = await reader.read();
            allDone = done;
            const result = await (done ? finish : process2)(value);
            if (result !== void 0) {
              controller.enqueue(result);
              return;
            }
            if (done) {
              controller.close();
              input.releaseLock();
              return;
            }
          }
        } catch (e8) {
          controller.error(e8);
        }
      },
      async cancel(reason) {
        await reader.cancel(reason);
      }
    }, queuingStrategy);
  }
  throw new Error("Unreachable");
}
function transformPair(input, fn2) {
  if (isStream(input) && !isArrayStream(input)) {
    let incomingTransformController;
    const incoming = new TransformStream({
      start(controller) {
        incomingTransformController = controller;
      }
    });
    const pipeDonePromise = pipe(input, incoming.writable);
    const outgoing = transformWithCancel(async function(reason) {
      incomingTransformController.error(reason);
      await pipeDonePromise;
      await new Promise((resolve) => setTimeout(resolve));
    });
    fn2(incoming.readable, outgoing.writable);
    return outgoing.readable;
  }
  input = toArrayStream(input);
  const output = new ArrayStream();
  fn2(input, output);
  return output;
}
function tee(input) {
  if (isArrayStream(input)) {
    throw new Error("ArrayStream cannot be tee()d, use clone() instead");
  }
  if (isStream(input)) {
    const teed = toStream(input).tee();
    teed[0][externalBuffer] = teed[1][externalBuffer] = input[externalBuffer];
    return teed;
  }
  return [slice(input), slice(input)];
}
function clone(input) {
  if (isArrayStream(input)) {
    return input.clone();
  }
  if (isStream(input)) {
    const teed = tee(input);
    overwrite(input, teed[0]);
    return teed[1];
  }
  return slice(input);
}
function passiveClone(input) {
  if (isArrayStream(input)) {
    return clone(input);
  }
  if (isStream(input)) {
    return new ReadableStream({
      start(controller) {
        const transformed = transformPair(input, async (readable, writable) => {
          const reader = getReader(readable);
          const writer = getWriter(writable);
          try {
            while (true) {
              await writer.ready;
              const { done, value } = await reader.read();
              if (done) {
                try {
                  controller.close();
                } catch {
                }
                await writer.close();
                return;
              }
              try {
                controller.enqueue(value);
              } catch {
              }
              await writer.write(value);
            }
          } catch (e8) {
            controller.error(e8);
            await writer.abort(e8);
          }
        });
        overwrite(input, transformed);
      }
    });
  }
  return slice(input);
}
function overwrite(input, clone2) {
  Object.entries(Object.getOwnPropertyDescriptors(input.constructor.prototype)).forEach(([name, descriptor]) => {
    if (name === "constructor") {
      return;
    }
    if (descriptor.value) {
      descriptor.value = descriptor.value.bind(clone2);
    } else {
      descriptor.get = descriptor.get.bind(clone2);
    }
    Object.defineProperty(input, name, descriptor);
  });
}
function slice(input, begin = 0, end = Infinity) {
  if (isArrayStream(input)) {
    throw new Error("Not implemented");
  }
  if (isStream(input)) {
    if (begin >= 0 && end >= 0) {
      let reader;
      let bytesRead = 0;
      return new ReadableStream({
        start() {
          reader = input.getReader();
        },
        async pull(controller) {
          try {
            while (true) {
              if (bytesRead < end) {
                const { value, done } = await reader.read();
                if (done) {
                  controller.close();
                  input.releaseLock();
                  return;
                }
                let valueToEnqueue;
                if (bytesRead + value.length >= begin) {
                  valueToEnqueue = slice(value, Math.max(begin - bytesRead, 0), end - bytesRead);
                }
                bytesRead += value.length;
                if (valueToEnqueue) {
                  controller.enqueue(valueToEnqueue);
                  return;
                }
              } else {
                controller.close();
                input.releaseLock();
                return;
              }
            }
          } catch (e8) {
            controller.error(e8);
          }
        },
        async cancel(reason) {
          await reader.cancel(reason);
        }
      }, { highWaterMark: 0 });
    }
    if (begin < 0 && (end < 0 || end === Infinity)) {
      let lastBytes = [];
      return transform(input, (value) => {
        if (value.length >= -begin) lastBytes = [value];
        else lastBytes.push(value);
      }, () => slice(concat(lastBytes), begin, end));
    }
    if (begin === 0 && end < 0) {
      let lastBytes;
      return transform(input, (value) => {
        const returnValue = lastBytes ? concat([lastBytes, value]) : value;
        if (returnValue.length >= -end) {
          lastBytes = slice(returnValue, end);
          return slice(returnValue, begin, end);
        }
        lastBytes = returnValue;
      });
    }
    console.warn(`stream.slice(input, ${begin}, ${end}) not implemented efficiently.`);
    return fromAsync(async () => slice(await readToEnd(input), begin, end));
  }
  if (input[externalBuffer]) {
    input = concat(input[externalBuffer].concat([input]));
  }
  if (isUint8Array(input)) {
    return input.subarray(begin, end === Infinity ? input.length : end);
  }
  return input.slice(begin, end);
}
async function readToEnd(input, join = concat) {
  if (isArrayStream(input)) {
    return input.readToEnd(join);
  }
  if (isStream(input)) {
    return getReader(input).readToEnd(join);
  }
  return input;
}
async function cancel(input, reason) {
  if (isStream(input)) {
    if (input.cancel) {
      const cancelled = await input.cancel(reason);
      await new Promise((resolve) => setTimeout(resolve));
      return cancelled;
    }
    if (input.destroy) {
      input.destroy(reason);
      await new Promise((resolve) => setTimeout(resolve));
      return reason;
    }
  }
}
function fromAsync(fn2) {
  const arrayStream = new ArrayStream();
  (async () => {
    const writer = getWriter(arrayStream);
    try {
      await writer.write(await fn2());
      await writer.close();
    } catch (e8) {
      await writer.abort(e8);
    }
  })();
  return arrayStream;
}
function getReader(input) {
  return new Reader(input);
}
function getWriter(input) {
  return new Writer(input);
}

// node_modules/@protontech/crypto/src/pmcrypto/message/utils.ts
var removeTrailingSpaces = (text) => {
  return text.split("\n").map((line) => {
    let i8 = line.length - 1;
    for (; i8 >= 0 && (line[i8] === " " || line[i8] === "	" || line[i8] === "\r"); i8--) ;
    return line.substring(0, i8 + 1);
  }).join("\n");
};
async function armorBytes(binaryMessage) {
  const bodyMessage = await Do({ binaryMessage });
  return readToEnd(bodyMessage.armor());
}

// node_modules/@protontech/crypto/src/pmcrypto/utils.ts
var normalizeDate = (time) => new Date(Math.floor(+time / 1e3) * 1e3);

// node_modules/@protontech/crypto/src/pmcrypto/message/context.ts
var CONTEXT_NOTATION_NAME = "context@proton.ch";
var getNotationForContext = (contextValue, critical) => ({
  name: CONTEXT_NOTATION_NAME,
  value: new TextEncoder().encode(contextValue),
  humanReadable: true,
  critical
});
var isValidSignatureContext = (contextOptions, signature) => {
  const { value: expectedValue, required, requiredAfter } = contextOptions;
  const isContextRequired = requiredAfter ? signature.created >= normalizeDate(requiredAfter) : required;
  const contextNotations = signature.rawNotations.filter(
    ({ name }) => name === CONTEXT_NOTATION_NAME
  );
  const matchingContext = contextNotations.find(
    ({ value }) => new TextDecoder().decode(value) === expectedValue
  );
  if (matchingContext) {
    return true;
  } else if (contextNotations.length > 0) {
    return false;
  }
  return !isContextRequired;
};
var getConfigForContextVerification = (config) => ({
  ...config,
  knownNotations: [CONTEXT_NOTATION_NAME]
  // we can overwrite the field as we currently don't use any other known notations
});
var SignatureContextError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "SignatureContextError";
  }
};

// node_modules/@protontech/crypto/src/pmcrypto/message/encrypt.js
async function encryptMessage({
  textData,
  binaryData,
  stripTrailingSpaces,
  signatureContext,
  format = "armored",
  date = serverTime(),
  detached = false,
  ...options
}) {
  if (signatureContext && (options.signingKeys === void 0 || options.signingKeys.length === 0)) {
    throw new Error(
      "Unexpected `signatureContext` input without any `signingKeys` provided"
    );
  }
  const sanitizedOptions = {
    ...options,
    signatureNotations: signatureContext ? getNotationForContext(
      signatureContext.value,
      signatureContext.critical
    ) : void 0,
    date,
    format
  };
  const dataType = binaryData ? "binary" : "text";
  const data = binaryData || (stripTrailingSpaces ? removeTrailingSpaces(textData) : textData);
  if (!options.sessionKey) {
    sanitizedOptions.sessionKey = await qo({
      encryptionKeys: sanitizedOptions.encryptionKeys,
      date: sanitizedOptions.date,
      encryptionUserIDs: sanitizedOptions.encryptionUserIDs,
      config: sanitizedOptions.config
    });
  }
  const result = {};
  if (detached) {
    if (format === "object") {
      throw new Error(
        "Unsupported detached signature when requesting 'object' result"
      );
    }
    const detachedSignatureBinary = await Oo({
      message: await xo({
        [dataType]: isStream(data) ? passiveClone(data) : data,
        date
      }),
      signingKeys: sanitizedOptions.signingKeys,
      signingKeyIDs: sanitizedOptions.signingKeyIDs,
      signingUserIDs: sanitizedOptions.signingUserIDs,
      signatureNotations: sanitizedOptions.signatureNotations,
      date: sanitizedOptions.date,
      config: sanitizedOptions.config,
      format: "binary",
      detached: true
    });
    result.encryptedSignature = await Ro({
      ...sanitizedOptions,
      signingKeys: [],
      message: await xo({
        binary: clone(detachedSignatureBinary),
        date
      })
      // clone is very cheap for non-stream binary data (it just returns a subarray)
    });
    result.signature = format === "armored" ? J5(M7.armor.signature, detachedSignatureBinary) : detachedSignatureBinary;
  }
  result.message = await Ro({
    ...sanitizedOptions,
    message: await xo({ [dataType]: data, date }),
    // Encrypt message without signing it if we store a separate detached signature
    signingKeys: detached ? [] : sanitizedOptions.signingKeys
  });
  return result;
}

// node_modules/@protontech/crypto/src/pmcrypto/key/utils.js
async function generateKey({
  date = new Date(+serverTime() + DEFAULT_KEY_GENERATION_OFFSET),
  ...rest
}) {
  return Mo({ date, ...rest });
}
async function generateSessionKeyForAlgorithm(algoName) {
  const keySize = getSymmetricKeySize(algoName);
  return getRandomBytes(keySize);
}
function generateSessionKey({
  recipientKeys,
  date = serverTime(),
  ...options
}) {
  return qo({
    encryptionKeys: recipientKeys,
    date,
    ...options
  });
}
function reformatKey({
  privateKey,
  passphrase,
  date = privateKey.getCreationTime(),
  ...rest
}) {
  return Lo({ privateKey, passphrase, date, ...rest });
}
async function isExpiredKey(key, date = serverTime()) {
  const now = +date;
  const expirationTime = await key.getExpirationTime();
  return !(key.getCreationTime() <= now && now < expirationTime);
}
async function isRevokedKey(key, date = serverTime()) {
  return key.isRevoked(null, null, date);
}
var canKeyEncrypt = async (publicKey, date = serverTime()) => {
  try {
    await encryptMessage({
      textData: "test message",
      encryptionKeys: publicKey,
      date
    });
    return true;
  } catch {
    return false;
  }
};
var getSHA256Fingerprints = (key) => {
  return Promise.all(
    key.getKeys().map(async (keyOrSubkey) => {
      const { version } = keyOrSubkey.keyPacket;
      const keyFingerprintIsSHA256 = version === 5 || version === 6;
      return keyFingerprintIsSHA256 ? keyOrSubkey.getFingerprint() : (await SHA256(keyOrSubkey.keyPacket.writeForHash(version))).toHex();
    })
  );
};

// node_modules/@protontech/crypto/src/pmcrypto/bigInteger.ts
var _0n = BigInt(0);
var _1n = BigInt(1);
function uint8ArrayToBigInt(bytes) {
  const hexAlphabet = "0123456789ABCDEF";
  let s8 = "";
  bytes.forEach((v7) => {
    s8 += hexAlphabet[v7 >> 4] + hexAlphabet[v7 & 15];
  });
  return BigInt("0x0" + s8);
}
function mod(a8, m6) {
  const reduced = a8 % m6;
  return reduced < _0n ? reduced + m6 : reduced;
}
function modExp(b6, e8, n8) {
  if (n8 === _0n) throw Error("Modulo cannot be zero");
  if (n8 === _1n) return BigInt(0);
  if (e8 < _0n) throw Error("Unsopported negative exponent");
  let exp = e8;
  let x7 = b6;
  x7 %= n8;
  let r8 = BigInt(1);
  while (exp > _0n) {
    const lsb = exp & _1n;
    exp >>= _1n;
    const rx = r8 * x7 % n8;
    r8 = lsb ? rx : r8;
    x7 = x7 * x7 % n8;
  }
  return r8;
}
function abs(x7) {
  return x7 >= _0n ? x7 : -x7;
}
function _egcd(aInput, bInput) {
  let x7 = BigInt(0);
  let y8 = BigInt(1);
  let xPrev = BigInt(1);
  let yPrev = BigInt(0);
  let a8 = abs(aInput);
  let b6 = abs(bInput);
  const aNegated = aInput < _0n;
  const bNegated = bInput < _0n;
  while (b6 !== _0n) {
    const q7 = a8 / b6;
    let tmp = x7;
    x7 = xPrev - q7 * x7;
    xPrev = tmp;
    tmp = y8;
    y8 = yPrev - q7 * y8;
    yPrev = tmp;
    tmp = b6;
    b6 = a8 % b6;
    a8 = tmp;
  }
  return {
    x: aNegated ? -xPrev : xPrev,
    y: bNegated ? -yPrev : yPrev,
    gcd: a8
  };
}
function modInv(a8, n8) {
  const { gcd, x: x7 } = _egcd(a8, n8);
  if (gcd !== _1n) {
    throw new Error("Inverse does not exist");
  }
  return mod(x7 + n8, n8);
}
function byteLength(x7) {
  const target = x7 < _0n ? BigInt(-1) : _0n;
  const _8n = BigInt(8);
  let len = 1;
  let tmp = x7;
  while ((tmp >>= _8n) !== target) {
    len++;
  }
  return len;
}
function bigIntToUint8Array(x7, endian = "be", length) {
  let hex = x7.toString(16);
  if (hex.length % 2 === 1) {
    hex = "0" + hex;
  }
  const rawLength = hex.length / 2;
  const bytes = new Uint8Array(length ?? rawLength);
  const offset = length ? length - rawLength : 0;
  let i8 = 0;
  while (i8 < rawLength) {
    bytes[i8 + offset] = parseInt(hex.slice(2 * i8, 2 * i8 + 2), 16);
    i8++;
  }
  if (endian !== "be") {
    bytes.reverse();
  }
  return bytes;
}

// node_modules/@protontech/crypto/src/pmcrypto/key/forwarding.ts
function computeProxyParameter(forwarderSecret, forwardeeSecret) {
  const dB = uint8ArrayToBigInt(forwarderSecret);
  const dC = uint8ArrayToBigInt(forwardeeSecret);
  const n8 = BigInt(
    "0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed"
  );
  const proxyParameter = bigIntToUint8Array(
    mod(modInv(dC, n8) * dB, n8),
    "le",
    forwardeeSecret.length
  );
  return proxyParameter;
}
var doesKeyPacketSupportForwarding = (maybeForwardeeKey) => {
  const curveName = "curve25519Legacy";
  return maybeForwardeeKey.keyPacket instanceof Rs && // only ECDH can forward, and they are always subkeys
  !maybeForwardeeKey.keyPacket.isDummy() && maybeForwardeeKey.keyPacket.version === 4 && // TODO add support for v6
  maybeForwardeeKey.getAlgorithmInfo().algorithm === "ecdh" && maybeForwardeeKey.getAlgorithmInfo().curve === curveName;
};
async function getEncryptionKeysForForwarding(forwarderKey, date) {
  const forwarderEncryptionKeys = (await Promise.all(
    forwarderKey.getKeyIDs().map(
      (maybeEncryptionKeyID) => forwarderKey.getEncryptionKey(maybeEncryptionKeyID, date).catch(() => null)
    )
  )).filter((maybeKey) => !!maybeKey);
  if (!forwarderEncryptionKeys.every(doesKeyPacketSupportForwarding)) {
    throw new Error(
      "One or more encryption key packets are unsuitable for forwarding"
    );
  }
  return forwarderEncryptionKeys;
}
async function doesKeySupportForwarding(forwarderKey, date = serverTime()) {
  if (!forwarderKey.isDecrypted()) {
    return false;
  }
  try {
    const keys = await getEncryptionKeysForForwarding(forwarderKey, date);
    return keys.length > 0;
  } catch {
    return false;
  }
}
var isForwardingKey = async (keyToCheck, date = serverTime()) => {
  const allDecryptionKeys = await keyToCheck.getDecryptionKeys(void 0, date, void 0, {
    ...L4,
    allowForwardedMessages: true
  }).catch(() => []);
  const hasForwardingKeyFlag = (maybeForwardingSubkey) => maybeForwardingSubkey.bindingSignatures.length > 0 && maybeForwardingSubkey.bindingSignatures.every(({ keyFlags }) => {
    const flags = keyFlags?.[0];
    if (!flags) {
      return false;
    }
    return (flags & M7.keyFlags.forwardedCommunication) !== 0;
  });
  const allValidKeys = allDecryptionKeys.every(
    (key) => doesKeyPacketSupportForwarding(key) && hasForwardingKeyFlag(key)
  );
  return allDecryptionKeys.length > 0 && allValidKeys;
};
async function generateForwardingMaterial(forwarderKey, userIDsForForwardeeKey, date = serverTime()) {
  if (!forwarderKey.isDecrypted()) {
    throw new Error("Forwarder key must be decrypted");
  }
  const curveName = "curve25519Legacy";
  const forwarderEncryptionKeys = await getEncryptionKeysForForwarding(
    forwarderKey,
    date
  );
  const { privateKey: forwardeeKeyToSetup } = await generateKey({
    // TODO handle v6 keys
    type: "ecc",
    userIDs: userIDsForForwardeeKey,
    subkeys: new Array(forwarderEncryptionKeys.length).fill({
      curve: curveName,
      forwarding: true
    }),
    format: "object",
    date
  });
  const proxyInstances = await Promise.all(
    forwarderEncryptionKeys.map(async (forwarderSubkey, i8) => {
      const forwarderSubkeyPacket = forwarderSubkey.keyPacket;
      const forwardeeSubkeyPacket = forwardeeKeyToSetup.subkeys[i8].keyPacket;
      const forwarderKeyFingerprint = forwarderSubkeyPacket.getFingerprintBytes();
      const { hash: hash2, cipher } = (
        // @ts-expect-error missing publicParams definition
        forwarderSubkeyPacket.publicParams.kdfParams
      );
      forwardeeSubkeyPacket.publicParams.kdfParams = new Oi({
        version: 255,
        hash: hash2,
        cipher,
        replacementFingerprint: forwarderKeyFingerprint.subarray(0, 20)
      });
      const proxyParameter = computeProxyParameter(
        // @ts-expect-error privateParams fields are not defined
        forwarderSubkeyPacket.privateParams?.d,
        // @ts-expect-error privateParams fields are not defined
        forwardeeSubkeyPacket.privateParams?.d
      );
      await forwardeeSubkeyPacket.computeFingerprintAndKeyID();
      const forwardeeKeyFingerprint = forwardeeSubkeyPacket.getFingerprintBytes();
      return {
        keyVersion: forwarderSubkeyPacket.version,
        proxyParameter,
        forwarderKeyFingerprint,
        forwardeeKeyFingerprint
      };
    })
  );
  const { privateKey: finalForwardeeKey } = await reformatKey({
    privateKey: forwardeeKeyToSetup,
    userIDs: userIDsForForwardeeKey,
    format: "object"
  });
  return { proxyInstances, forwardeeKey: finalForwardeeKey };
}

// node_modules/@protontech/crypto/src/pmcrypto/key/decrypt.js
async function decryptSessionKey(options) {
  const result = await Go(options);
  if (result.length > 1) {
    throw new Error("Multiple decrypted session keys found");
  }
  return result[0];
}

// node_modules/@protontech/crypto/src/pmcrypto/key/encrypt.js
var encryptSessionKey = ({ date = serverTime(), ...rest }) => Ho({ date, ...rest });
var encryptKey = ({ config = {}, ...rest }) => No({
  ...rest,
  // user passwords go through bcrypt rounds, hence we can lower the iteration counts
  config: { ...config, s2kIterationCountByte: 96 }
});

// node_modules/@protontech/crypto/src/pmcrypto/message/verify.js
var { NOT_SIGNED, SIGNED_AND_VALID, SIGNED_AND_INVALID } = VERIFICATION_STATUS;
async function handleVerificationResult(verificationResult, signatureContext, expectSigned) {
  const { data, signatures: sigsInfo } = verificationResult;
  const signatures = [];
  const errors = [];
  let verificationStatus = NOT_SIGNED;
  let signatureTimestamp = null;
  if (sigsInfo?.length) {
    verificationStatus = SIGNED_AND_INVALID;
    for (let i8 = 0; i8 < sigsInfo.length; i8++) {
      const { signature: signaturePromise, verified: verifiedPromise } = sigsInfo[i8];
      const signature = await signaturePromise;
      const verified = await verifiedPromise.catch((err) => {
        errors.push(err);
        return false;
      });
      if (verified) {
        const verifiedSigPacket = signature.packets[0];
        if (!signatureContext || isValidSignatureContext(signatureContext, verifiedSigPacket)) {
          verificationStatus = SIGNED_AND_VALID;
        } else {
          errors.push(
            new SignatureContextError("context verification error")
          );
        }
        if (!signatureTimestamp) {
          signatureTimestamp = verifiedSigPacket.created;
        }
      }
      signatures.push(signature);
    }
  }
  if (expectSigned && verificationStatus !== SIGNED_AND_VALID) {
    throw errors[0];
  }
  return {
    data,
    verificationStatus,
    signatures,
    signatureTimestamp,
    errors: verificationStatus === SIGNED_AND_INVALID ? errors : void 0
  };
}
async function verifyMessage({
  textData,
  binaryData,
  stripTrailingSpaces,
  signatureContext,
  config = {},
  date = new Date(+serverTime() + DEFAULT_SIGNATURE_VERIFICATION_OFFSET),
  ...options
}) {
  const dataType = binaryData ? "binary" : "text";
  const dataToVerify = binaryData || (stripTrailingSpaces ? removeTrailingSpaces(textData) : textData);
  const sanitizedOptions = {
    ...options,
    date,
    message: await xo({ [dataType]: dataToVerify, date }),
    config: signatureContext ? getConfigForContextVerification(config) : config
  };
  const verificationResult = await jo(sanitizedOptions);
  return handleVerificationResult(
    verificationResult,
    signatureContext,
    options.expectSigned
  );
}
async function verifyCleartextMessage({
  cleartextMessage,
  date = serverTime(),
  ...options
}) {
  if (!(cleartextMessage instanceof Io)) {
    throw new Error("CleartextMessage expected.");
  }
  const sanitizedOptions = { ...options, date, message: cleartextMessage };
  const verificationResult = await jo(sanitizedOptions);
  return handleVerificationResult(
    verificationResult,
    void 0,
    options.expectSigned
  );
}

// node_modules/@protontech/crypto/src/pmcrypto/message/decrypt.js
async function decryptMessage({
  date = new Date(+serverTime() + DEFAULT_SIGNATURE_VERIFICATION_OFFSET),
  encryptedSignature,
  signatureContext,
  config = {},
  ...options
}) {
  if (signatureContext && (options.verificationKeys === void 0 || options.verificationKeys instanceof Array && options.verificationKeys.length === 0)) {
    throw new Error(
      "Unexpected `signatureContext` input without any `verificationKeys` provided"
    );
  }
  if (options.expectSigned && options.message.fromStream) {
    throw new Error("`expectSigned: true` is currently not supported with streamed inputs");
  }
  const sanitizedOptions = {
    ...options,
    date,
    config: signatureContext ? getConfigForContextVerification(config) : config
  };
  if (encryptedSignature) {
    const { data: decryptedSignature } = await zo({
      ...sanitizedOptions,
      message: encryptedSignature,
      format: "binary"
    });
    sanitizedOptions.signature = await Hs({
      binarySignature: await readToEnd(decryptedSignature)
    });
  }
  const decryptionResult = await zo(sanitizedOptions);
  const verificationResult = handleVerificationResult(
    decryptionResult,
    signatureContext,
    options.expectSigned
  );
  let verificationStatus = verificationResult.then(
    (result) => result.verificationStatus
  );
  let verifiedSignatures = verificationResult.then(
    (result) => result.signatures
  );
  let verificationErrors = verificationResult.then((result) => result.errors);
  if (!isStream(decryptionResult.data)) {
    verificationStatus = await verificationStatus;
    verifiedSignatures = await verifiedSignatures;
    verificationErrors = await verificationErrors;
  }
  return {
    data: decryptionResult.data,
    filename: decryptionResult.filename,
    verificationStatus,
    signatures: verifiedSignatures,
    verificationErrors
  };
}

// node_modules/@protontech/crypto/src/pmcrypto/message/sign.js
async function signMessage({
  textData,
  binaryData,
  stripTrailingSpaces,
  signatureContext,
  date = serverTime(),
  format = "armored",
  ...options
}) {
  const dataType = binaryData ? "binary" : "text";
  const data = binaryData || (stripTrailingSpaces ? removeTrailingSpaces(textData) : textData);
  const sanitizedOptions = {
    ...options,
    date,
    format,
    message: await xo({ [dataType]: data, date }),
    signatureNotations: signatureContext ? getNotationForContext(
      signatureContext.value,
      signatureContext.critical
    ) : void 0
  };
  return Oo(sanitizedOptions).catch((err) => {
    console.error(err);
    throw err;
  });
}

// node_modules/@protontech/crypto/src/pmcrypto/message/parseMail.ts
var parseMail2 = (mail) => Promise.resolve().then(() => (init_jsmimeparser(), jsmimeparser_exports)).then(
  ({ parseMail: jsmimeParseEmail }) => jsmimeParseEmail(mail)
);
var mimeExtensions = {
  "application/octet-stream": "bin",
  "application/x-rar-compressed": "rar",
  "application/x-zip-compressed": "zip",
  "application/zip": "zip",
  "application/x-7z-compressed": "7z",
  "application/x-arj": "arj",
  "application/x-debian-package": "deb",
  "application/x-redhat-package-manager": "rpm",
  "application/x-rpm": "rpm",
  "application/vnd.rar": "rar",
  "application/gzip": "gz",
  "application/x-gzip": "gz",
  "application/x-compress": "z",
  "application/vnd.apple.installer+xml": "pkg",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.oasis.opendocument.spreadsheet": "ods",
  "application/vnd.oasis.opendocument.presentation": "odp",
  "application/xliff+xml": "xlf",
  "application/xml": "xml",
  "text/html": "html",
  "application/xhtml+xml": "xhtml",
  "application/pgp-keys": "asc",
  "application/rtf": "rtf",
  "application/x-tex": "tex",
  "application/vnd.oasis.opendocument.text": "odt",
  "application/vnd.wordperfect": "wpd",
  "application/vnd.ms-fontobject": "eot",
  "application/font-sfnt": "ttf",
  "application/vnd.oasis.opendocument.formula-template": "odft",
  "application/x-bzip": "bz",
  "application/x-bzip2": "bzip2",
  "application/epub+zip": "epub",
  "application/javascript": "js",
  "application/json": "json",
  "application/pdf": "pdf",
  "application/pgp-encrypted": "pgp",
  "application/pgp-signature": "asc",
  "application/pkcs7-mime": "p7m",
  "application/pkcs7-signature": "p7s",
  "audio/aac": "aac",
  "audio/midi": "midi",
  "audio/x-midi": "midi",
  "audio/ogg": "oga",
  "audio/mp3": "mp3",
  "audio/mp4": "m4a",
  "audio/mpeg": "mpga",
  "font/otf": "otf",
  "font/ttf": "ttf",
  "font/woff": "woff",
  "font/woff2": "woff2",
  "image/avif": "avif",
  "image/bmp": "bmp",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/svg+xml": "svg",
  "image/tiff": "tif",
  "message/rfc822": "eml",
  "text/calendar": "ics",
  "text/css": "css",
  "text/csv": "csv",
  "text/markdown": "md",
  "text/plain": "txt",
  "text/richtext": "rtx",
  "text/vcard": "vcard",
  "text/xml": "xml",
  "text/yaml": "yaml",
  "video/x-msvideo": "avi",
  "video/mp4": "mp4",
  "video/mpeg": "mpeg",
  "video/quicktime": "mov",
  "video/webm": "webm",
  "video/ogg": "ogv"
};
var generateFileName = (parsedFileName, contentType) => {
  const defaultExt = !parsedFileName && contentType ? mimeExtensions[contentType] : "";
  const fileName = parsedFileName || (defaultExt ? `attachment.${defaultExt}` : "attachment");
  return fileName.split(/[/\\]+/).pop()?.replace(/^\.+/, "") || "attachment";
};

// node_modules/@protontech/crypto/src/pmcrypto/message/processMIME.ts
init_utils2();
var verifySignature = async ({ verificationKeys = [], date = serverTime() }, data) => {
  const { headers } = await parseMail2(
    data.split(/\r?\n\s*\r?\n/g)[0] + "\n\n"
  );
  const [contentType] = headers["content-type"] ?? [""];
  const [baseContentType] = contentType.split(";");
  if (baseContentType.toLowerCase() !== "multipart/signed") {
    return {
      subdata: data,
      verificationStatus: 0 /* NOT_SIGNED */,
      signatures: []
    };
  }
  const [, rawboundary] = /boundary\s*=\s*([^;]*)\s*(;|$)/gi.exec(contentType) ?? [];
  if (!rawboundary) {
    return {
      subdata: data,
      verificationStatus: 0 /* NOT_SIGNED */,
      signatures: []
    };
  }
  const boundary = (
    // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
    rawboundary[0] === '"' ? JSON.parse(rawboundary) || rawboundary : rawboundary
  );
  const [mainPart] = data.split(`
--${boundary}--
`);
  const parts = mainPart.split(`
--${boundary}
`);
  if (parts.length < 3) {
    return {
      subdata: data,
      verificationStatus: 0 /* NOT_SIGNED */,
      signatures: []
    };
  }
  const {
    attachments: [sigAttachment]
  } = await parseMail2(parts[2].trim());
  const {
    contentType: sigAttachmentContentType = "",
    content: sigAttachmentContent = new Uint8Array()
  } = sigAttachment ?? {};
  if (sigAttachmentContentType.toLowerCase() !== "application/pgp-signature") {
    return {
      subdata: data,
      verificationStatus: 0 /* NOT_SIGNED */,
      signatures: []
    };
  }
  const sigData = uint8ArrayToUtf8String(sigAttachmentContent);
  let signature;
  try {
    signature = await Hs({ armoredSignature: sigData });
  } catch {
    console.error("Failed to read signature over MIME message");
    return {
      subdata: data,
      verificationStatus: 0 /* NOT_SIGNED */,
      signatures: []
    };
  }
  const body = parts[1];
  const {
    data: subdata,
    verificationStatus,
    signatures
  } = await verifyMessage({
    // The body is to be treated as CleartextMessage, see https://github.com/openpgpjs/openpgpjs/pull/1265#issue-830304843
    textData: removeTrailingSpaces(body).replaceAll("\n", "\r\n"),
    verificationKeys,
    date,
    signature
  });
  return { subdata, verificationStatus, signatures };
};
var parse = async ({ headerFilename = "Encrypted Headers.txt", sender = "" }, mailContent = "", verificationStatus = 0 /* NOT_SIGNED */, signatures = []) => {
  const {
    attachments: parsedAttachments,
    body: { text, html },
    subject: mimeSubject = ""
  } = await parseMail2(mailContent);
  let encryptedSubjectHeader;
  const attachments = [];
  const fileNameCounter = {};
  for (const parsedAttachment of parsedAttachments) {
    let generatedFileName = generateFileName(
      parsedAttachment.fileName,
      parsedAttachment.contentType
    );
    if (fileNameCounter[generatedFileName]) {
      generatedFileName = `${generatedFileName} (${fileNameCounter[generatedFileName]++})`;
    } else {
      fileNameCounter[generatedFileName] = 1;
    }
    const attachment = {
      ...parsedAttachment,
      fileName: generatedFileName,
      contentId: parsedAttachment.contentId || `<${crypto.getRandomValues(new Uint8Array(16)).toHex()}@pmcrypto>`
    };
    attachments.push(attachment);
    if (parsedAttachment.fileName || parsedAttachment.contentType !== "text/rfc822-headers" || parsedAttachment.content.length > MAX_ENC_HEADER_LENGTH) {
      continue;
    }
    attachment.fileName = `${headerFilename}.txt`;
    attachment.contentDisposition = "attachment";
    const { from, subject: attachmentSubject } = await parseMail2(
      parsedAttachment.content
    );
    if (!attachmentSubject || !from) {
      continue;
    }
    if (from.email.toLowerCase() !== sender.toLowerCase()) {
      continue;
    }
    encryptedSubjectHeader = encryptedSubjectHeader || attachmentSubject;
  }
  const encryptedSubject = encryptedSubjectHeader || mimeSubject;
  if (html !== null) {
    return {
      body: html,
      attachments,
      verificationStatus,
      encryptedSubject,
      mimeType: "text/html",
      signatures
    };
  }
  if (text !== null) {
    return {
      body: text,
      attachments,
      verificationStatus,
      encryptedSubject,
      mimeType: "text/plain",
      signatures
    };
  }
  if (attachments.length) {
    return {
      body: "",
      attachments,
      verificationStatus,
      encryptedSubject,
      mimeType: void 0,
      signatures
    };
  }
  throw new Error("No body or attachments found in the mime message");
};
async function processMIME({
  data,
  ...options
}) {
  const { subdata, verificationStatus, signatures } = await verifySignature(
    options,
    data
  );
  return parse(options, subdata, verificationStatus, signatures);
}

// node_modules/@protontech/crypto/src/pmcrypto/key/check.ts
function checkKeyStrength(publicKey) {
  const minRSABits = 2047;
  const allowedCurves = /* @__PURE__ */ new Set([
    M7.curve.ed25519Legacy,
    M7.curve.curve25519Legacy,
    M7.curve.nistP256,
    M7.curve.nistP384,
    M7.curve.nistP521
  ]);
  const allowedPublicKeyAlgorithms = /* @__PURE__ */ new Set([
    M7.publicKey.rsaEncryptSign,
    M7.publicKey.rsaSign,
    M7.publicKey.rsaEncrypt,
    M7.publicKey.ecdh,
    M7.publicKey.ecdsa,
    M7.publicKey.eddsaLegacy,
    // the following algos are currently only supported for v6 keys, but discriminating
    // based on the key version is not important here, as we assume `checkKeyCompatibility`
    // is used for that.
    M7.publicKey.ed25519,
    M7.publicKey.x25519,
    M7.publicKey.ed448,
    M7.publicKey.x448,
    M7.publicKey.pqc_mlkem_x25519,
    M7.publicKey.pqc_mldsa_ed25519
  ]);
  publicKey.getKeys().forEach(({ keyPacket }) => {
    const keyInfo = keyPacket.getAlgorithmInfo();
    const keyAlgo = M7.write(
      M7.publicKey,
      keyInfo.algorithm
    );
    if (!allowedPublicKeyAlgorithms.has(keyAlgo)) {
      throw new Error(`${keyInfo.algorithm} keys are considered unsafe`);
    }
    if (keyInfo.curve && !allowedCurves.has(keyInfo.curve)) {
      throw new Error(
        `Keys using curve ${keyInfo.curve} are considered unsafe`
      );
    }
    if (keyInfo.bits && keyInfo.bits < minRSABits) {
      throw new Error(
        `Keys shorter than ${minRSABits} bits are considered unsafe`
      );
    }
  });
}
function checkKeyCompatibility(publicKey, v6KeysAllowed = false) {
  const keyVersion = publicKey.keyPacket.version;
  const keyVersionIsSupported = keyVersion === 4 || v6KeysAllowed && keyVersion === 6;
  if (!keyVersionIsSupported) {
    throw new Error(
      `Version ${publicKey.keyPacket.version} keys are currently not supported.`
    );
  }
  const v6OnlyPublicKeyAlgorithms = [
    M7.publicKey.ed25519,
    M7.publicKey.ed448,
    M7.publicKey.x25519,
    M7.publicKey.x448,
    M7.publicKey.pqc_mlkem_x25519,
    M7.publicKey.pqc_mldsa_ed25519
  ];
  const supportedPublicKeyAlgorithms = /* @__PURE__ */ new Set([
    M7.publicKey.dsa,
    M7.publicKey.elgamal,
    M7.publicKey.rsaEncryptSign,
    M7.publicKey.rsaSign,
    M7.publicKey.rsaEncrypt,
    M7.publicKey.ecdh,
    M7.publicKey.ecdsa,
    M7.publicKey.eddsaLegacy,
    ...keyVersion === 6 ? v6OnlyPublicKeyAlgorithms : []
  ]);
  const supportedCurves = /* @__PURE__ */ new Set([
    M7.curve.ed25519Legacy,
    M7.curve.curve25519Legacy,
    M7.curve.nistP256,
    M7.curve.nistP384,
    M7.curve.nistP521,
    M7.curve.brainpoolP256r1,
    M7.curve.brainpoolP384r1,
    M7.curve.brainpoolP512r1,
    M7.curve.secp256k1
  ]);
  publicKey.getKeys().forEach(({ keyPacket }) => {
    const keyInfo = keyPacket.getAlgorithmInfo();
    const keyAlgo = M7.write(
      M7.publicKey,
      keyInfo.algorithm
    );
    if (!supportedPublicKeyAlgorithms.has(keyAlgo)) {
      throw new Error(
        `The key algorithm ${keyInfo.algorithm} is currently not supported.`
      );
    }
    if (keyInfo.curve && !supportedCurves.has(keyInfo.curve)) {
      throw new Error(
        `Keys using curve ${keyInfo.curve} are currently not supported.`
      );
    }
  });
}

// node_modules/@protontech/crypto/src/pmcrypto/pmcrypto.js
function init() {
  if (arguments.length) {
    throw new Error("Loading OpenPGP separately is no longer required");
  }
  setConfig();
}

// node_modules/@protontech/crypto/src/proxy/endpoint/api.ts
var getSignature = async ({
  armoredSignature,
  binarySignature
}) => {
  if (armoredSignature) {
    return Hs({ armoredSignature });
  } else if (binarySignature) {
    return Hs({ binarySignature });
  }
  throw new Error("Must provide `armoredSignature` or `binarySignature`");
};
var getMessage = async ({
  armoredMessage,
  binaryMessage
}) => {
  if (armoredMessage) {
    return Do({ armoredMessage });
  } else if (binaryMessage) {
    return Do({ binaryMessage });
  }
  throw new Error("Must provide `armoredMessage` or `binaryMessage`");
};
var getKey = async ({ armoredKey, binaryKey }) => {
  if (armoredKey) {
    return wo({ armoredKey });
  } else if (binaryKey) {
    return wo({ binaryKey });
  }
  throw new Error("Must provide `armoredKey` or `binaryKey`");
};
var toArray = (maybeArray) => Array.isArray(maybeArray) ? maybeArray : [maybeArray];
var getPublicKeyReference = async (key, keyStoreID) => {
  const publicKey = key.isPrivate() ? key.toPublic() : key;
  const version = publicKey.keyPacket.version;
  const fingerprint = publicKey.getFingerprint();
  const hexKeyID = publicKey.getKeyID().toHex();
  const hexKeyIDs = publicKey.getKeyIDs().map((id) => id.toHex());
  const sha256Fingerprings = await getSHA256Fingerprints(publicKey);
  const algorithmInfo = publicKey.getAlgorithmInfo();
  const creationTime = publicKey.getCreationTime();
  const expirationTime = await publicKey.getExpirationTime();
  const userIDs = publicKey.getUserIDs();
  const keyContentHash = await SHA256(publicKey.write()).then(
    (bytes) => bytes.toHex()
  );
  let keyContentHashNoCerts;
  if (publicKey.users.some((user) => user.otherCertifications.length > 0)) {
    const publicKeyClone = publicKey.clone();
    publicKeyClone.users.forEach((user) => {
      user.otherCertifications = [];
    });
    keyContentHashNoCerts = await SHA256(publicKeyClone.write()).then(
      (bytes) => bytes.toHex()
    );
  } else {
    keyContentHashNoCerts = keyContentHash;
  }
  let isWeak;
  try {
    checkKeyStrength(publicKey);
    isWeak = false;
  } catch {
    isWeak = true;
  }
  return {
    _idx: keyStoreID,
    _keyContentHash: [keyContentHash, keyContentHashNoCerts],
    isPrivate: () => false,
    isPrivateKeyV4: () => false,
    isPrivateKeyV6: () => false,
    getVersion: () => version,
    getFingerprint: () => fingerprint,
    getSHA256Fingerprints: () => sha256Fingerprings,
    getKeyID: () => hexKeyID,
    getKeyIDs: () => hexKeyIDs,
    getAlgorithmInfo: () => algorithmInfo,
    getCreationTime: () => creationTime,
    getExpirationTime: () => expirationTime,
    getUserIDs: () => userIDs,
    isWeak: () => isWeak,
    equals: (otherKey, ignoreOtherCerts) => ignoreOtherCerts ? otherKey._keyContentHash[1] === keyContentHashNoCerts : otherKey._keyContentHash[0] === keyContentHash,
    subkeys: publicKey.getSubkeys().map((subkey) => {
      const subkeyAlgoInfo = subkey.getAlgorithmInfo();
      const subkeyKeyID = subkey.getKeyID().toHex();
      return {
        getAlgorithmInfo: () => subkeyAlgoInfo,
        getKeyID: () => subkeyKeyID
      };
    })
  };
};
var getPrivateKeyReference = async (privateKey, keyStoreID) => {
  const publicKeyReference = await getPublicKeyReference(
    privateKey.toPublic(),
    keyStoreID
  );
  return {
    ...publicKeyReference,
    isPrivate: () => true,
    isPrivateKeyV4: () => publicKeyReference.getVersion() === 4,
    isPrivateKeyV6: () => publicKeyReference.getVersion() === 6,
    _dummyType: "private"
  };
};
var KeyStore = class {
  store = /* @__PURE__ */ new Map();
  /**
   * Monotonic counter keeping track of the next unique identifier to index a newly added key.
   * The starting counter value is picked at random to minimize the changes of collisions between keys during different user sessions.
   * NB: key references may be stored by webapps even after the worker has been destroyed (e.g. after closing the browser window),
   * hence we want to keep using different identifiers even after restarting the worker, to also invalidate those stale key references.
   */
  nextIdx = crypto.getRandomValues(new Uint32Array(1))[0];
  /**
   * Add a key to the key store.
   * @param key - key to add
   * @param customIdx - custom identifier to use to store the key, instead of the internally generated one.
   *                    This argument is primarily intended for when key store identifiers need to be synchronised across different workers.
   *                    This value must be unique for each key, even across different sessions.
   * @returns key identifier to retrieve the key from the store
   */
  add(key, customIdx) {
    const idx = customIdx ?? this.nextIdx;
    if (this.store.has(idx)) {
      throw new Error(`Idx ${idx} already in use`);
    }
    this.store.set(idx, key);
    this.nextIdx++;
    return idx;
  }
  get(idx) {
    const key = this.store.get(idx);
    if (!key) {
      throw new Error("Key not found");
    }
    return key;
  }
  clearAll() {
    this.store.forEach((key) => {
      if (key.isPrivate()) {
        key.clearPrivateParams();
      }
    });
    this.store.clear();
  }
  clear(idx) {
    const keyToClear = this.get(idx);
    if (keyToClear.isPrivate()) {
      keyToClear.clearPrivateParams();
    }
    this.store.delete(idx);
  }
};
var KeyManagementApi = class {
  static test = 1;
  keyStore = new KeyStore();
  /**
   * Invalidate all key references by removing all keys from the internal key store.
   * The private key material corresponding to any PrivateKeyReference is erased from memory.
   */
  async clearKeyStore() {
    this.keyStore.clearAll();
  }
  /**
   * Invalidate the key reference by removing the key from the internal key store.
   * If a PrivateKeyReference is given, the private key material is erased from memory.
   */
  async clearKey({ key: keyReference }) {
    this.keyStore.clear(keyReference._idx);
  }
  /**
   * Generate a key for the given UserID.
   * The key is stored in the key store, and can be exported using `exportPrivateKey` or `exportPublicKey`.
   * @param options.userIDs - user IDs as objects: `{ name: 'Jo Doe', email: 'info@jo.com' }`
   * @param options.type - key algorithm type: ECC (default) or RSA
   * @param options.rsaBits - number of bits for RSA keys
   * @param options.curve - elliptic curve for ECC keys
   * @param options.keyExpirationTime- number of seconds from the key creation time after which the key expires
   * @param options.subkeys - options for each subkey e.g. `[{ sign: true, passphrase: '123'}]`
   * @param options.date - use the given date as creation date of the key and the key signatures, instead of the server time
   * @returns reference to the generated private key
   */
  async generateKey(options) {
    const { privateKey } = await generateKey({
      ...options,
      format: "object"
    });
    if (!privateKey.isDecrypted()) {
      throw new Error(
        "Unexpected 'passphrase' option on key generation. Use 'exportPrivateKey' after key generation to obtain a transferable encrypted key."
      );
    }
    const keyStoreID = this.keyStore.add(privateKey);
    return getPrivateKeyReference(privateKey, keyStoreID);
  }
  async reformatKey({
    privateKey: keyReference,
    ...options
  }) {
    const originalKey = this.keyStore.get(keyReference._idx);
    const keyToReformat = originalKey.clone(true);
    const { privateKey } = await reformatKey({
      ...options,
      privateKey: keyToReformat,
      format: "object"
    });
    if (!privateKey.isDecrypted()) {
      throw new Error(
        "Unexpected 'passphrase' option on key reformat. Use 'exportPrivateKey' after key reformatting to obtain a transferable encrypted key."
      );
    }
    const keyStoreID = this.keyStore.add(privateKey);
    return getPrivateKeyReference(privateKey, keyStoreID);
  }
  /**
   * Import a private key, which is either already decrypted, or that can be decrypted with the given passphrase.
   * If a passphrase is given, but the key is already decrypted, importing fails.
   * Either `armoredKey` or `binaryKey` must be provided.
   * Note: if the passphrase to decrypt the key is unknown, the key shuld be imported using `importPublicKey` instead.
   * @param options.passphrase - key passphrase if the input key is encrypted, or `null` if the input key is expected to be already decrypted
   * @returns reference to imported private key
   * @throws {Error} if the key cannot be decrypted or importing fails
   */
  async importPrivateKey({
    armoredKey,
    binaryKey,
    passphrase,
    checkCompatibility = 1 /* NONE */
  }, _customIdx) {
    if (!armoredKey && !binaryKey) {
      throw new Error("Must provide `armoredKey` or `binaryKey`");
    }
    const expectDecrypted = passphrase === null;
    const maybeEncryptedKey = binaryKey ? await bo({ binaryKey }) : await bo({ armoredKey });
    if (checkCompatibility !== 1 /* NONE */) {
      checkKeyCompatibility(
        maybeEncryptedKey,
        checkCompatibility === 3 /* V6_COMPATIBLE */
      );
    }
    let decryptedKey;
    if (expectDecrypted) {
      if (!maybeEncryptedKey.isDecrypted()) {
        throw new Error(
          "Provide passphrase to import an encrypted private key"
        );
      }
      decryptedKey = maybeEncryptedKey;
      await decryptedKey.validate();
    } else {
      const usesArgon2 = maybeEncryptedKey.getKeys().some(
        (keyOrSubkey) => (
          // @ts-expect-error s2k field not declared
          keyOrSubkey.keyPacket.s2k?.type === "argon2"
        )
      );
      if (usesArgon2) {
        throw new Error(
          "Keys encrypted using Argon2 are not supported yet"
        );
      }
      decryptedKey = await _o({
        privateKey: maybeEncryptedKey,
        passphrase
      });
    }
    const keyStoreID = this.keyStore.add(decryptedKey, _customIdx);
    return getPrivateKeyReference(decryptedKey, keyStoreID);
  }
  /**
   * Import a public key.
   * Either `armoredKey` or `binaryKey` must be provided.
   * Note: if a private key is given, it will be converted to a public key before import.
   * @returns reference to imported public key
   */
  async importPublicKey({
    armoredKey,
    binaryKey,
    checkCompatibility = 1 /* NONE */
  }, _customIdx) {
    const publicKey = await getKey({ binaryKey, armoredKey });
    if (checkCompatibility !== 1 /* NONE */) {
      checkKeyCompatibility(
        publicKey,
        checkCompatibility === 3 /* V6_COMPATIBLE */
      );
    }
    const keyStoreID = this.keyStore.add(publicKey, _customIdx);
    return getPublicKeyReference(publicKey, keyStoreID);
  }
  /**
   * Get the serialized public key.
   * Exporting a key does not invalidate the corresponding `KeyReference`, nor does it remove the key from internal storage (use `clearKey()` for that).
   * @param options.format - `'binary'` or `'armored'` format of serialized key
   * @returns serialized public key
   */
  async exportPublicKey({
    format = "armored",
    key: keyReference
  }) {
    const maybePrivateKey = this.keyStore.get(keyReference._idx);
    const publicKey = maybePrivateKey.isPrivate() ? maybePrivateKey.toPublic() : maybePrivateKey;
    const serializedKey = format === "binary" ? publicKey.write() : publicKey.armor();
    return serializedKey;
  }
  /**
   * Get the serialized private key, encrypted with the given `passphrase`.
   * Exporting a key does not invalidate the corresponding `keyReference`, nor does it remove the key from internal storage (use `clearKey()` for that).
   * @param options.passphrase - passphrase to encrypt the key with (non-empty string), or `null` to export an unencrypted key (not recommended).
   * @param options.format - `'binary'` or `'armored'` format of serialized key
   * @returns serialized encrypted key
   */
  async exportPrivateKey({
    format = "armored",
    ...options
  }) {
    const { privateKey: keyReference, passphrase } = options;
    if (!keyReference.isPrivate()) {
      throw new Error("Private key expected");
    }
    const privateKey = this.keyStore.get(keyReference._idx);
    const doNotEncrypt = passphrase === null;
    const maybeEncryptedKey = doNotEncrypt ? privateKey : await encryptKey({ privateKey, passphrase });
    const serializedKey = format === "binary" ? maybeEncryptedKey.write() : maybeEncryptedKey.armor();
    return serializedKey;
  }
};
var Api = class extends KeyManagementApi {
  /**
   * Init pmcrypto and set the underlying global OpenPGP config.
   */
  // eslint-disable-next-line no-empty-pattern
  static init({}) {
    init();
  }
  /**
   * Encrypt the given data using `encryptionKeys`, `sessionKeys` and `passwords`, after optionally
   * signing it with `signingKeys`.
   * Either `textData` or `binaryData` must be given.
   * A detached signature over the data may be provided by passing either `armoredSignature` or `binarySignature`.
   * @param options.textData - text data to encrypt
   * @param options.binaryData - binary data to encrypt
   * @param options.stripTrailingSpaces - whether trailing spaces should be removed from each line of `textData`
   * @param options.context - (signed data only) settings to prevent verifying the signature in a different context (signature domain separation)
   * @param options.format - `'binary` or `'armored'` format of serialized signed message
   * @param options.date - use the given date for the message signature, instead of the server time
   */
  async encryptMessage({
    encryptionKeys: encryptionKeyRefs = [],
    signingKeys: signingKeyRefs = [],
    armoredSignature,
    binarySignature,
    compress = false,
    config = {},
    ...options
  }) {
    const signingKeys = toArray(signingKeyRefs).map(
      (keyReference) => this.keyStore.get(keyReference._idx)
    );
    const encryptionKeys = toArray(encryptionKeyRefs).map(
      (keyReference) => this.keyStore.get(keyReference._idx)
    );
    const inputSignature = binarySignature || armoredSignature ? await getSignature({ armoredSignature, binarySignature }) : void 0;
    if (config.preferredCompressionAlgorithm) {
      throw new Error(
        "Passing `config.preferredCompressionAlgorithm` is not supported. Use `compress` option instead."
      );
    }
    const encryptionResult = await encryptMessage({
      ...options,
      encryptionKeys,
      signingKeys,
      signature: inputSignature,
      config: {
        ...config,
        preferredCompressionAlgorithm: compress ? M7.compression.zlib : M7.compression.uncompressed
      }
    });
    return encryptionResult;
  }
  /**
   * Similar to `encryptMessage` but for ReadableStream inputs of `binaryData`.
   * Options remain the same, expect for the following enforced ones (for simplicity):
   * - `detached: false`
   */
  async encryptMessageStream({
    binaryDataStream,
    binaryData,
    textData,
    encryptionKeys: encryptionKeyRefs = [],
    signingKeys: signingKeyRefs = [],
    armoredSignature,
    binarySignature,
    compress = false,
    config = {},
    ...options
  }) {
    if (binaryData || textData) {
      throw new Error("Input data must be passed to `binaryDataStream`.");
    }
    if (options.detached) {
      throw new Error("Detached signatures not supported with streamed encryption");
    }
    const signingKeys = toArray(signingKeyRefs).map(
      (keyReference) => this.keyStore.get(keyReference._idx)
    );
    const encryptionKeys = toArray(encryptionKeyRefs).map(
      (keyReference) => this.keyStore.get(keyReference._idx)
    );
    const inputSignature = binarySignature || armoredSignature ? await getSignature({ armoredSignature, binarySignature }) : void 0;
    if (config.preferredCompressionAlgorithm) {
      throw new Error(
        "Passing `config.preferredCompressionAlgorithm` is not supported. Use `compress` option instead."
      );
    }
    const { message: messageStream } = await encryptMessage({
      ...options,
      binaryData: binaryDataStream,
      encryptionKeys,
      signingKeys,
      signature: inputSignature,
      config: {
        ...config,
        preferredCompressionAlgorithm: compress ? M7.compression.zlib : M7.compression.uncompressed
      }
    });
    return { messageStream };
  }
  /**
  * Create a signature over the given data using `signingKeys`.
       * Either `textData` or `binaryData` must be given.
       * @param options.textData - text data to sign
       * @param options.binaryData - binary data to sign
       * @param options.stripTrailingSpaces - whether trailing spaces should be removed from each line of `textData`
       * @param options.context - settings to prevent verifying the signature in a different context (signature domain separation)
       * @param options.detached - whether to return a detached signature, without the signed data
       * @param options.format - `'binary` or `'armored'` format of serialized signed message
       * @param options.date - use the given date for signing, instead of the server time
       * @returns serialized signed message or signature
       */
  async signMessage({
    signingKeys: signingKeyRefs = [],
    ...options
  }) {
    const signingKeys = toArray(signingKeyRefs).map(
      (keyReference) => this.keyStore.get(keyReference._idx)
    );
    const signResult = await signMessage({
      ...options,
      signingKeys
    });
    return signResult;
  }
  /**
   * Verify a signature over the given data.
   * Either `armoredSignature` or `binarySignature` must be given for the signature, and either `textData` or `binaryData` must be given as data to be verified.
   * To verify a Cleartext message, which includes both the signed data and the corresponding signature, see `verifyCleartextMessage`.
   * @param options.textData - expected signed text data
   * @param options.binaryData - expected signed binary data
   * @param options.armoredSignature - armored signature to verify
   * @param options.binarySignature - binary signature to verify
   * @param options.stripTrailingSpaces - whether trailing spaces should be removed from each line of `textData`.
   *                                      This option must match the one used when signing.
   * @param options.context - settings to prevent verifying a signature from a different context (signature domain separation).
   *                          This option should match the one used when signing.
   * @returns signature verification result over the given data
   */
  async verifyMessage({
    armoredSignature,
    binarySignature,
    verificationKeys: verificationKeyRefs,
    ...options
  }) {
    const verificationKeys = toArray(verificationKeyRefs).map(
      (keyReference) => this.keyStore.get(keyReference._idx)
    );
    const signature = await getSignature({
      armoredSignature,
      binarySignature
    });
    const {
      signatures: signatureObjects,
      // extracting this is needed for proper type inference of `serialisedResult.signatures`
      ...verificationResultWithoutSignatures
    } = await verifyMessage({
      signature,
      verificationKeys,
      ...options
    });
    const serialisedResult = {
      ...verificationResultWithoutSignatures,
      signatures: signatureObjects.map(
        (sig) => sig.write()
      )
      // no support for streamed input for now
    };
    return serialisedResult;
  }
  /**
   * Verify a Cleartext message, which includes the signed data and the corresponding signature.
   * A cleartext message is always in armored form.
   * To verify a detached signature over some data, see `verifyMessage` instead.
   * @params options.armoredCleartextSignature - armored cleartext message to verify
   */
  async verifyCleartextMessage({
    armoredCleartextMessage,
    verificationKeys: verificationKeyRefs,
    ...options
  }) {
    const verificationKeys = toArray(verificationKeyRefs).map(
      (keyReference) => this.keyStore.get(keyReference._idx)
    );
    const cleartextMessage = await To({
      cleartextMessage: armoredCleartextMessage
    });
    const {
      signatures: signatureObjects,
      // extracting this is needed for proper type inference of `serialisedResult.signatures`
      ...verificationResultWithoutSignatures
    } = await verifyCleartextMessage({
      cleartextMessage,
      verificationKeys,
      ...options
    });
    const serialisedResult = {
      ...verificationResultWithoutSignatures,
      signatures: signatureObjects.map(
        (sig) => sig.write()
      )
      // no support for streamed input for now
    };
    return serialisedResult;
  }
  /**
   * Decrypt a message using `decryptionKeys`, `sessionKey`, or `passwords`, and optionally verify the content using `verificationKeys`.
   * Eiher `armoredMessage` or `binaryMessage` must be given.
   * For detached signature verification over the decrypted data, one of `armoredSignature`,
   * `binarySignature`, `armoredEncryptedSignature` and `binaryEncryptedSignature` may be given.
   * @param options.armoredMessage - armored data to decrypt
   * @param options.binaryMessage - binary data to decrypt
   * @param options.expectSigned - if true, data decryption fails if the message is not signed with the provided `verificationKeys`
   * @param options.context - (signed data only) settings to prevent verifying a signature from a different context (signature domain separation).
   *                          This option should match the one used when encrypting.
   * @param options.format - whether to return data as a string or Uint8Array. If 'utf8' (the default), also normalize newlines.
   * @param options.date - use the given date for verification instead of the server time
   */
  async decryptMessage({
    decryptionKeys: decryptionKeyRefs = [],
    verificationKeys: verificationKeyRefs = [],
    armoredMessage,
    binaryMessage,
    armoredSignature,
    binarySignature,
    armoredEncryptedSignature: armoredEncSignature,
    binaryEncryptedSignature: binaryEncSingature,
    ...options
  }) {
    const decryptionKeys = toArray(decryptionKeyRefs).map(
      (keyReference) => this.keyStore.get(keyReference._idx)
    );
    const verificationKeys = toArray(verificationKeyRefs).map(
      (keyReference) => this.keyStore.get(keyReference._idx)
    );
    const message = await getMessage({ binaryMessage, armoredMessage });
    const signature = binarySignature || armoredSignature ? await getSignature({ binarySignature, armoredSignature }) : void 0;
    const encryptedSignature = binaryEncSingature || armoredEncSignature ? await getMessage({
      binaryMessage: binaryEncSingature,
      armoredMessage: armoredEncSignature
    }) : void 0;
    const {
      signatures: signatureObjects,
      ...decryptionResultWithoutSignatures
    } = await decryptMessage({
      ...options,
      message,
      signature,
      encryptedSignature,
      decryptionKeys,
      verificationKeys
    });
    const serialisedResult = {
      ...decryptionResultWithoutSignatures,
      // TODO once more apps opt-into v6-PQC support: consider returning a single signature by concatenating the serialized ones.
      signatures: signatureObjects.map(
        (sig) => sig.write()
      )
      // no support for streamed input for now
    };
    return serialisedResult;
  }
  /**
   * Similar to `decryptMessage` but for ReadableStream inputs for armoredMessage/binaryMessage.
   * Options remain the same, except for verification being unsupported
   */
  async decryptMessageStream({
    decryptionKeys: decryptionKeyRefs = [],
    verificationKeys: verificationKeyRefs = [],
    binaryMessageStream,
    armoredMessage,
    binaryMessage,
    armoredSignature,
    binarySignature,
    armoredEncryptedSignature: armoredEncSignature,
    binaryEncryptedSignature: binaryEncSingature,
    ...options
  }) {
    if (binaryMessage || armoredMessage) {
      throw new Error("Input data must be passed to `binaryMessageStream`.");
    }
    if (verificationKeyRefs.length > 0 || binarySignature || armoredSignature || binaryEncSingature || armoredEncSignature) {
      throw new Error("Signature verification is not supported with streamed decryption");
    }
    const decryptionKeys = toArray(decryptionKeyRefs).map(
      (keyReference) => this.keyStore.get(keyReference._idx)
    );
    const message = await Do({ binaryMessage: binaryMessageStream });
    const { data: dataStream } = await decryptMessage({
      ...options,
      message,
      decryptionKeys,
      verificationKeys: []
    });
    return {
      dataStream
    };
  }
  /**
   * Generate forwardee key and proxy parameter needed to setup end-to-end encrypted forwarding for the given
   * privateKey.
   * @param options.forwarderPrivateKey - private key of original recipient, initiating the forwarding
   * @param options.userIDsForForwardeeKey - userIDs to attach to forwardee key
   * @param options.passphrase - passphrase to encrypt the generated forwardee key with
   * @param options.date - date to use as key creation time, instead of server time
   */
  async generateE2EEForwardingMaterial({
    forwarderKey,
    userIDsForForwardeeKey,
    passphrase,
    date
  }) {
    const originalKey = this.keyStore.get(forwarderKey._idx);
    const { proxyInstances, forwardeeKey } = await generateForwardingMaterial(
      originalKey,
      userIDsForForwardeeKey,
      date
    );
    const maybeEncryptedKey = passphrase ? await encryptKey({ privateKey: forwardeeKey, passphrase }) : forwardeeKey;
    return {
      forwardeeKey: maybeEncryptedKey.armor(),
      proxyInstances
    };
  }
  /**
   * Check whether a key can be used as input to `generateE2EEForwardingMaterial` to setup E2EE forwarding.
   */
  async doesKeySupportE2EEForwarding({
    forwarderKey: keyReference,
    date
  }) {
    const key = this.keyStore.get(keyReference._idx);
    if (!key.isPrivate()) {
      return false;
    }
    const supportsForwarding = await doesKeySupportForwarding(key, date);
    return supportsForwarding;
  }
  /**
   * Whether a key is a E2EE forwarding recipient key, where all its decryption-capable (sub)keys are setup
   * as forwardee keys.
   * NB: this function also accepts `PublicKeyReference`s in order to determine the status of inactive (undecryptable)
   * private keys. Such keys can only be imported using `importPublicKey`, but it's important that the encrypted
   * private key is imported (not the corresponding public key).
   * @throws if a PublicKeyReference containing a public key is given
   */
  async isE2EEForwardingKey({
    key: keyReference,
    date
  }) {
    const key = this.keyStore.get(keyReference._idx);
    if (!key.isPrivate()) {
      throw new Error("Unexpected public key");
    }
    const forForwarding = await isForwardingKey(key, date);
    return forForwarding;
  }
  /**
   * Generating a session key for the specified symmetric algorithm.
   * To generate a session key based on some recipient's public key preferences,
   * use `generateSessionKey()` instead.
   */
  async generateSessionKeyForAlgorithm(algoName) {
    const sessionKeyBytes = await generateSessionKeyForAlgorithm(algoName);
    return sessionKeyBytes;
  }
  /**
   * Generate a session key compatible with the given recipient keys.
   * To get a session key for a specific symmetric algorithm, use `generateSessionKeyForAlgorithm` instead.
   */
  async generateSessionKey({
    recipientKeys: recipientKeyRefs = [],
    ...options
  }) {
    const recipientKeys = toArray(recipientKeyRefs).map(
      (keyReference) => this.keyStore.get(keyReference._idx)
    );
    const sessionKey = await generateSessionKey({
      recipientKeys,
      ...options
    });
    return sessionKey;
  }
  /**
   * Encrypt a session key with `encryptionKeys`, `passwords`, or both at once.
   * At least one of `encryptionKeys` or `passwords` must be specified.
   * @param options.data - the session key to be encrypted e.g. 16 random bytes (for aes128)
   * @param options.algorithm - algorithm of the session key
   * @param options.aeadAlgorithm - AEAD algorithm of the session key
   * @param options.format - `'armored'` or `'binary'` format of the returned encrypted message
   * @param options.wildcard - use a key ID of 0 instead of the encryption key IDs
   * @param options.date - use the given date for key validity checks, instead of the server time
   */
  async encryptSessionKey({
    encryptionKeys: encryptionKeyRefs = [],
    ...options
  }) {
    const encryptionKeys = toArray(encryptionKeyRefs).map(
      (keyReference) => this.keyStore.get(keyReference._idx)
    );
    const encryptedData = await encryptSessionKey({
      ...options,
      encryptionKeys
    });
    return encryptedData;
  }
  /**
   * Decrypt the message's session keys using either `decryptionKeys` or `passwords`.
   * Either `armoredMessage` or `binaryMessage` must be given.
   * @param options.armoredMessage - an armored message containing encrypted session key packets
   * @param options.binaryMessage - a binary message containing encrypted session key packets
   * @param options.date - date to use for key validity checks instead of the server time
   * @throws if no session key could be found or decrypted
   */
  async decryptSessionKey({
    decryptionKeys: decryptionKeyRefs = [],
    armoredMessage,
    binaryMessage,
    ...options
  }) {
    const decryptionKeys = toArray(decryptionKeyRefs).map(
      (keyReference) => this.keyStore.get(keyReference._idx)
    );
    const message = await getMessage({ binaryMessage, armoredMessage });
    const sessionKey = await decryptSessionKey({
      ...options,
      message,
      decryptionKeys
    });
    return sessionKey;
  }
  async processMIME({
    verificationKeys: verificationKeyRefs = [],
    ...options
  }) {
    const verificationKeys = toArray(verificationKeyRefs).map(
      (keyReference) => this.keyStore.get(keyReference._idx)
    );
    const { signatures: signatureObjects, ...resultWithoutSignature } = await processMIME({
      ...options,
      verificationKeys
    });
    const serialisedResult = {
      ...resultWithoutSignature,
      signatures: signatureObjects.map(
        (sig) => sig.write()
      )
    };
    return serialisedResult;
  }
  async getMessageInfo({
    armoredMessage,
    binaryMessage
  }) {
    const message = await getMessage({ binaryMessage, armoredMessage });
    const signingKeyIDs = message.getSigningKeyIDs().map((keyID) => keyID.toHex());
    const encryptionKeyIDs = message.getEncryptionKeyIDs().map((keyID) => keyID.toHex());
    return { signingKeyIDs, encryptionKeyIDs };
  }
  async getSignatureInfo({
    armoredSignature,
    binarySignature
  }) {
    const signature = await getSignature({
      binarySignature,
      armoredSignature
    });
    const signingKeyIDs = signature.getSigningKeyIDs().map((keyID) => keyID.toHex());
    return { signingKeyIDs };
  }
  /**
   * Get basic info about a serialied key without importing it in the key store.
   * E.g. determine whether the given key is private, and whether it is decrypted.
   */
  async getKeyInfo({
    armoredKey,
    binaryKey
  }) {
    const key = await getKey({ binaryKey, armoredKey });
    const keyIsPrivate = key.isPrivate();
    const keyIsDecrypted = keyIsPrivate ? key.isDecrypted() : null;
    const fingerprint = key.getFingerprint();
    const keyIDs = key.getKeyIDs().map((keyID) => keyID.toHex());
    return {
      keyIsPrivate,
      keyIsDecrypted,
      fingerprint,
      keyIDs
    };
  }
  /**
   * Armor a message signature in binary form
   */
  async getArmoredSignature({
    binarySignature
  }) {
    const signature = await getSignature({ binarySignature });
    return signature.armor();
  }
  /**
   * Armor a message given in binary form
   */
  async getArmoredMessage({
    binaryMessage
  }) {
    const armoredMessage = await armorBytes(binaryMessage);
    return armoredMessage;
  }
  /**
   * Given one or more keys concatenated in binary format, get the corresponding keys in armored format.
   * The keys are not imported into the key store nor processed further. Both private and public keys are supported.
   * @returns array of armored keys
   */
  async getArmoredKeys({
    binaryKeys
  }) {
    const keys = await ko({ binaryKeys });
    return keys.map((key) => key.armor());
  }
  /**
   * Returns whether the primary key is revoked.
   * @param options.date - date to use for signature verification, instead of the server time
   */
  async isRevokedKey({
    key: keyReference,
    date
  }) {
    const key = this.keyStore.get(keyReference._idx);
    const isRevoked = await isRevokedKey(key, date);
    return isRevoked;
  }
  /**
   * Returns whether the primary key is expired, or its creation time is in the future.
   * @param options.date - date to use for the expiration check, instead of the server time
   */
  async isExpiredKey({
    key: keyReference,
    date
  }) {
    const key = this.keyStore.get(keyReference._idx);
    const isExpired = await isExpiredKey(key, date);
    return isExpired;
  }
  /**
   * Check whether a key can successfully encrypt a message.
   * This confirms that the key has encryption capabilities, it is neither expired nor revoked, and that its key material is valid.
   */
  async canKeyEncrypt({
    key: keyReference,
    date
  }) {
    const key = this.keyStore.get(keyReference._idx);
    const canEncrypt = await canKeyEncrypt(key, date);
    return canEncrypt;
  }
  async computeHash({
    algorithm,
    data
  }) {
    let hash2;
    switch (algorithm) {
      case "SHA512":
        hash2 = await SHA512(data);
        return hash2;
      case "SHA256":
        hash2 = await SHA256(data);
        return hash2;
      case "unsafeSHA1":
        hash2 = await unsafeSHA1(data);
        return hash2;
      case "unsafeMD5":
        hash2 = await unsafeMD5(data);
        return hash2;
      default:
        throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
  }
  // this function may be merged with `computeHash` once we add streaming support to all/most hash algos
  async computeHashStream({
    algorithm,
    binaryDataStream
  }) {
    switch (algorithm) {
      case "unsafeSHA1": {
        return {
          hashedDataStream: new ReadableStream({
            async start(controller) {
              controller.enqueue(await unsafeSHA1(binaryDataStream));
              controller.close();
            }
          })
        };
      }
      default:
        throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
  }
  /**
   * Compute argon2 hash of the given `password`
   */
  async computeArgon2({
    password,
    salt,
    params = ARGON2_PARAMS.RECOMMENDED
  }) {
    const result = await argon2({ password, salt, params });
    return result;
  }
  /**
   * Replace the User IDs of the target key to match those of the source key.
   * NOTE: this function mutates the target key in place, and does not update binding signatures.
   */
  async replaceUserIDs({
    sourceKey: sourceKeyReference,
    targetKey: targetKeyReference
  }) {
    const sourceKey = this.keyStore.get(sourceKeyReference._idx);
    const targetKey = this.keyStore.get(targetKeyReference._idx);
    if (targetKey.getFingerprint() !== sourceKey.getFingerprint()) {
      throw new Error("Cannot replace UserIDs of a different key");
    }
    targetKey.users = sourceKey.users.map((sourceUser) => {
      const destUser = sourceUser.clone();
      destUser.mainKey = targetKey;
      return destUser;
    });
  }
  /**
   * Return a new key reference with changed userIDs.
   * Aside from the userIDs, the two keys are identical (e.g. same binding signatures).
   * The original key is not modified.
   */
  async cloneKeyAndChangeUserIDs({
    privateKey: privateKeyRef,
    userIDs
  }) {
    const originalKey = this.keyStore.get(privateKeyRef._idx);
    const updatedKey = originalKey.clone(true);
    const updatedSubkeys = updatedKey.subkeys;
    updatedKey.subkeys = [];
    const { publicKey: temporaryKeyWithNewUsers } = await reformatKey({
      privateKey: updatedKey,
      userIDs,
      format: "object"
    });
    updatedKey.subkeys = updatedSubkeys;
    updatedKey.users = temporaryKeyWithNewUsers.users.map((newUser) => {
      const destUser = newUser.clone();
      destUser.mainKey = updatedKey;
      return destUser;
    });
    const keyStoreID = this.keyStore.add(updatedKey);
    return getPrivateKeyReference(updatedKey, keyStoreID);
  }
};

// node_modules/@protontech/crypto/src/srp/constants.ts
var SRP_LEN = 2048 / 8;
var MAX_VALUE_ITERATIONS = 1e3;
var SRP_MODULUS_KEY = `-----BEGIN PGP PUBLIC KEY BLOCK-----

xjMEXAHLgxYJKwYBBAHaRw8BAQdAFurWXXwjTemqjD7CXjXVyKf0of7n9Ctm
L8v9enkzggHNEnByb3RvbkBzcnAubW9kdWx1c8J3BBAWCgApBQJcAcuDBgsJ
BwgDAgkQNQWFxOlRjyYEFQgKAgMWAgECGQECGwMCHgEAAPGRAP9sauJsW12U
MnTQUZpsbJb53d0Wv55mZIIiJL2XulpWPQD/V6NglBd96lZKBmInSXX/kXat
Sv+y0io+LR8i2+jV+AbOOARcAcuDEgorBgEEAZdVAQUBAQdAeJHUz1c9+KfE
kSIgcBRE3WuXC4oj5a2/U3oASExGDW4DAQgHwmEEGBYIABMFAlwBy4MJEDUF
hcTpUY8mAhsMAAD/XQD8DxNI6E78meodQI+wLsrKLeHn32iLvUqJbVDhfWSU
WO4BAMcm1u02t4VKw++ttECPt+HUgPUq5pqQWe5Q2cW4TMsE
=Y4Mw
-----END PGP PUBLIC KEY BLOCK-----`;
var BCRYPT_PREFIX = "$2y$10$";

// node_modules/@protontech/crypto/src/srp/srp.ts
init_utils2();

// node_modules/@protontech/crypto/src/srp/passwords.ts
init_utils2();

// node_modules/bcryptjs/index.js
var import_crypto = __toESM(require_crypto(), 1);
var randomFallback = null;
function randomBytes(len) {
  try {
    return crypto.getRandomValues(new Uint8Array(len));
  } catch {
  }
  try {
    return import_crypto.default.randomBytes(len);
  } catch {
  }
  if (!randomFallback) {
    throw Error(
      "Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative"
    );
  }
  return randomFallback(len);
}
function genSaltSync(rounds, seed_length) {
  rounds = rounds || GENSALT_DEFAULT_LOG2_ROUNDS;
  if (typeof rounds !== "number")
    throw Error(
      "Illegal arguments: " + typeof rounds + ", " + typeof seed_length
    );
  if (rounds < 4) rounds = 4;
  else if (rounds > 31) rounds = 31;
  var salt = [];
  salt.push("$2b$");
  if (rounds < 10) salt.push("0");
  salt.push(rounds.toString());
  salt.push("$");
  salt.push(base64_encode(randomBytes(BCRYPT_SALT_LEN), BCRYPT_SALT_LEN));
  return salt.join("");
}
function genSalt(rounds, seed_length, callback) {
  if (typeof seed_length === "function")
    callback = seed_length, seed_length = void 0;
  if (typeof rounds === "function") callback = rounds, rounds = void 0;
  if (typeof rounds === "undefined") rounds = GENSALT_DEFAULT_LOG2_ROUNDS;
  else if (typeof rounds !== "number")
    throw Error("illegal arguments: " + typeof rounds);
  function _async(callback2) {
    nextTick(function() {
      try {
        callback2(null, genSaltSync(rounds));
      } catch (err) {
        callback2(err);
      }
    });
  }
  if (callback) {
    if (typeof callback !== "function")
      throw Error("Illegal callback: " + typeof callback);
    _async(callback);
  } else
    return new Promise(function(resolve, reject) {
      _async(function(err, res) {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
}
function hash(password, salt, callback, progressCallback) {
  function _async(callback2) {
    if (typeof password === "string" && typeof salt === "number")
      genSalt(salt, function(err, salt2) {
        _hash(password, salt2, callback2, progressCallback);
      });
    else if (typeof password === "string" && typeof salt === "string")
      _hash(password, salt, callback2, progressCallback);
    else
      nextTick(
        callback2.bind(
          this,
          Error("Illegal arguments: " + typeof password + ", " + typeof salt)
        )
      );
  }
  if (callback) {
    if (typeof callback !== "function")
      throw Error("Illegal callback: " + typeof callback);
    _async(callback);
  } else
    return new Promise(function(resolve, reject) {
      _async(function(err, res) {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
}
var nextTick = typeof setImmediate === "function" ? setImmediate : typeof scheduler === "object" && typeof scheduler.postTask === "function" ? scheduler.postTask.bind(scheduler) : setTimeout;
function utf8Length(string) {
  var len = 0, c7 = 0;
  for (var i8 = 0; i8 < string.length; ++i8) {
    c7 = string.charCodeAt(i8);
    if (c7 < 128) len += 1;
    else if (c7 < 2048) len += 2;
    else if ((c7 & 64512) === 55296 && (string.charCodeAt(i8 + 1) & 64512) === 56320) {
      ++i8;
      len += 4;
    } else len += 3;
  }
  return len;
}
function utf8Array(string) {
  var offset = 0, c1, c22;
  var buffer = new Array(utf8Length(string));
  for (var i8 = 0, k7 = string.length; i8 < k7; ++i8) {
    c1 = string.charCodeAt(i8);
    if (c1 < 128) {
      buffer[offset++] = c1;
    } else if (c1 < 2048) {
      buffer[offset++] = c1 >> 6 | 192;
      buffer[offset++] = c1 & 63 | 128;
    } else if ((c1 & 64512) === 55296 && ((c22 = string.charCodeAt(i8 + 1)) & 64512) === 56320) {
      c1 = 65536 + ((c1 & 1023) << 10) + (c22 & 1023);
      ++i8;
      buffer[offset++] = c1 >> 18 | 240;
      buffer[offset++] = c1 >> 12 & 63 | 128;
      buffer[offset++] = c1 >> 6 & 63 | 128;
      buffer[offset++] = c1 & 63 | 128;
    } else {
      buffer[offset++] = c1 >> 12 | 224;
      buffer[offset++] = c1 >> 6 & 63 | 128;
      buffer[offset++] = c1 & 63 | 128;
    }
  }
  return buffer;
}
var BASE64_CODE = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
var BASE64_INDEX = [
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  0,
  1,
  54,
  55,
  56,
  57,
  58,
  59,
  60,
  61,
  62,
  63,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  52,
  53,
  -1,
  -1,
  -1,
  -1,
  -1
];
function base64_encode(b6, len) {
  var off = 0, rs2 = [], c1, c22;
  if (len <= 0 || len > b6.length) throw Error("Illegal len: " + len);
  while (off < len) {
    c1 = b6[off++] & 255;
    rs2.push(BASE64_CODE[c1 >> 2 & 63]);
    c1 = (c1 & 3) << 4;
    if (off >= len) {
      rs2.push(BASE64_CODE[c1 & 63]);
      break;
    }
    c22 = b6[off++] & 255;
    c1 |= c22 >> 4 & 15;
    rs2.push(BASE64_CODE[c1 & 63]);
    c1 = (c22 & 15) << 2;
    if (off >= len) {
      rs2.push(BASE64_CODE[c1 & 63]);
      break;
    }
    c22 = b6[off++] & 255;
    c1 |= c22 >> 6 & 3;
    rs2.push(BASE64_CODE[c1 & 63]);
    rs2.push(BASE64_CODE[c22 & 63]);
  }
  return rs2.join("");
}
function base64_decode(s8, len) {
  var off = 0, slen = s8.length, olen = 0, rs2 = [], c1, c22, c32, c42, o8, code;
  if (len <= 0) throw Error("Illegal len: " + len);
  while (off < slen - 1 && olen < len) {
    code = s8.charCodeAt(off++);
    c1 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
    code = s8.charCodeAt(off++);
    c22 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
    if (c1 == -1 || c22 == -1) break;
    o8 = c1 << 2 >>> 0;
    o8 |= (c22 & 48) >> 4;
    rs2.push(String.fromCharCode(o8));
    if (++olen >= len || off >= slen) break;
    code = s8.charCodeAt(off++);
    c32 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
    if (c32 == -1) break;
    o8 = (c22 & 15) << 4 >>> 0;
    o8 |= (c32 & 60) >> 2;
    rs2.push(String.fromCharCode(o8));
    if (++olen >= len || off >= slen) break;
    code = s8.charCodeAt(off++);
    c42 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
    o8 = (c32 & 3) << 6 >>> 0;
    o8 |= c42;
    rs2.push(String.fromCharCode(o8));
    ++olen;
  }
  var res = [];
  for (off = 0; off < olen; off++) res.push(rs2[off].charCodeAt(0));
  return res;
}
var BCRYPT_SALT_LEN = 16;
var GENSALT_DEFAULT_LOG2_ROUNDS = 10;
var BLOWFISH_NUM_ROUNDS = 16;
var MAX_EXECUTION_TIME = 100;
var P_ORIG = [
  608135816,
  2242054355,
  320440878,
  57701188,
  2752067618,
  698298832,
  137296536,
  3964562569,
  1160258022,
  953160567,
  3193202383,
  887688300,
  3232508343,
  3380367581,
  1065670069,
  3041331479,
  2450970073,
  2306472731
];
var S_ORIG = [
  3509652390,
  2564797868,
  805139163,
  3491422135,
  3101798381,
  1780907670,
  3128725573,
  4046225305,
  614570311,
  3012652279,
  134345442,
  2240740374,
  1667834072,
  1901547113,
  2757295779,
  4103290238,
  227898511,
  1921955416,
  1904987480,
  2182433518,
  2069144605,
  3260701109,
  2620446009,
  720527379,
  3318853667,
  677414384,
  3393288472,
  3101374703,
  2390351024,
  1614419982,
  1822297739,
  2954791486,
  3608508353,
  3174124327,
  2024746970,
  1432378464,
  3864339955,
  2857741204,
  1464375394,
  1676153920,
  1439316330,
  715854006,
  3033291828,
  289532110,
  2706671279,
  2087905683,
  3018724369,
  1668267050,
  732546397,
  1947742710,
  3462151702,
  2609353502,
  2950085171,
  1814351708,
  2050118529,
  680887927,
  999245976,
  1800124847,
  3300911131,
  1713906067,
  1641548236,
  4213287313,
  1216130144,
  1575780402,
  4018429277,
  3917837745,
  3693486850,
  3949271944,
  596196993,
  3549867205,
  258830323,
  2213823033,
  772490370,
  2760122372,
  1774776394,
  2652871518,
  566650946,
  4142492826,
  1728879713,
  2882767088,
  1783734482,
  3629395816,
  2517608232,
  2874225571,
  1861159788,
  326777828,
  3124490320,
  2130389656,
  2716951837,
  967770486,
  1724537150,
  2185432712,
  2364442137,
  1164943284,
  2105845187,
  998989502,
  3765401048,
  2244026483,
  1075463327,
  1455516326,
  1322494562,
  910128902,
  469688178,
  1117454909,
  936433444,
  3490320968,
  3675253459,
  1240580251,
  122909385,
  2157517691,
  634681816,
  4142456567,
  3825094682,
  3061402683,
  2540495037,
  79693498,
  3249098678,
  1084186820,
  1583128258,
  426386531,
  1761308591,
  1047286709,
  322548459,
  995290223,
  1845252383,
  2603652396,
  3431023940,
  2942221577,
  3202600964,
  3727903485,
  1712269319,
  422464435,
  3234572375,
  1170764815,
  3523960633,
  3117677531,
  1434042557,
  442511882,
  3600875718,
  1076654713,
  1738483198,
  4213154764,
  2393238008,
  3677496056,
  1014306527,
  4251020053,
  793779912,
  2902807211,
  842905082,
  4246964064,
  1395751752,
  1040244610,
  2656851899,
  3396308128,
  445077038,
  3742853595,
  3577915638,
  679411651,
  2892444358,
  2354009459,
  1767581616,
  3150600392,
  3791627101,
  3102740896,
  284835224,
  4246832056,
  1258075500,
  768725851,
  2589189241,
  3069724005,
  3532540348,
  1274779536,
  3789419226,
  2764799539,
  1660621633,
  3471099624,
  4011903706,
  913787905,
  3497959166,
  737222580,
  2514213453,
  2928710040,
  3937242737,
  1804850592,
  3499020752,
  2949064160,
  2386320175,
  2390070455,
  2415321851,
  4061277028,
  2290661394,
  2416832540,
  1336762016,
  1754252060,
  3520065937,
  3014181293,
  791618072,
  3188594551,
  3933548030,
  2332172193,
  3852520463,
  3043980520,
  413987798,
  3465142937,
  3030929376,
  4245938359,
  2093235073,
  3534596313,
  375366246,
  2157278981,
  2479649556,
  555357303,
  3870105701,
  2008414854,
  3344188149,
  4221384143,
  3956125452,
  2067696032,
  3594591187,
  2921233993,
  2428461,
  544322398,
  577241275,
  1471733935,
  610547355,
  4027169054,
  1432588573,
  1507829418,
  2025931657,
  3646575487,
  545086370,
  48609733,
  2200306550,
  1653985193,
  298326376,
  1316178497,
  3007786442,
  2064951626,
  458293330,
  2589141269,
  3591329599,
  3164325604,
  727753846,
  2179363840,
  146436021,
  1461446943,
  4069977195,
  705550613,
  3059967265,
  3887724982,
  4281599278,
  3313849956,
  1404054877,
  2845806497,
  146425753,
  1854211946,
  1266315497,
  3048417604,
  3681880366,
  3289982499,
  290971e4,
  1235738493,
  2632868024,
  2414719590,
  3970600049,
  1771706367,
  1449415276,
  3266420449,
  422970021,
  1963543593,
  2690192192,
  3826793022,
  1062508698,
  1531092325,
  1804592342,
  2583117782,
  2714934279,
  4024971509,
  1294809318,
  4028980673,
  1289560198,
  2221992742,
  1669523910,
  35572830,
  157838143,
  1052438473,
  1016535060,
  1802137761,
  1753167236,
  1386275462,
  3080475397,
  2857371447,
  1040679964,
  2145300060,
  2390574316,
  1461121720,
  2956646967,
  4031777805,
  4028374788,
  33600511,
  2920084762,
  1018524850,
  629373528,
  3691585981,
  3515945977,
  2091462646,
  2486323059,
  586499841,
  988145025,
  935516892,
  3367335476,
  2599673255,
  2839830854,
  265290510,
  3972581182,
  2759138881,
  3795373465,
  1005194799,
  847297441,
  406762289,
  1314163512,
  1332590856,
  1866599683,
  4127851711,
  750260880,
  613907577,
  1450815602,
  3165620655,
  3734664991,
  3650291728,
  3012275730,
  3704569646,
  1427272223,
  778793252,
  1343938022,
  2676280711,
  2052605720,
  1946737175,
  3164576444,
  3914038668,
  3967478842,
  3682934266,
  1661551462,
  3294938066,
  4011595847,
  840292616,
  3712170807,
  616741398,
  312560963,
  711312465,
  1351876610,
  322626781,
  1910503582,
  271666773,
  2175563734,
  1594956187,
  70604529,
  3617834859,
  1007753275,
  1495573769,
  4069517037,
  2549218298,
  2663038764,
  504708206,
  2263041392,
  3941167025,
  2249088522,
  1514023603,
  1998579484,
  1312622330,
  694541497,
  2582060303,
  2151582166,
  1382467621,
  776784248,
  2618340202,
  3323268794,
  2497899128,
  2784771155,
  503983604,
  4076293799,
  907881277,
  423175695,
  432175456,
  1378068232,
  4145222326,
  3954048622,
  3938656102,
  3820766613,
  2793130115,
  2977904593,
  26017576,
  3274890735,
  3194772133,
  1700274565,
  1756076034,
  4006520079,
  3677328699,
  720338349,
  1533947780,
  354530856,
  688349552,
  3973924725,
  1637815568,
  332179504,
  3949051286,
  53804574,
  2852348879,
  3044236432,
  1282449977,
  3583942155,
  3416972820,
  4006381244,
  1617046695,
  2628476075,
  3002303598,
  1686838959,
  431878346,
  2686675385,
  1700445008,
  1080580658,
  1009431731,
  832498133,
  3223435511,
  2605976345,
  2271191193,
  2516031870,
  1648197032,
  4164389018,
  2548247927,
  300782431,
  375919233,
  238389289,
  3353747414,
  2531188641,
  2019080857,
  1475708069,
  455242339,
  2609103871,
  448939670,
  3451063019,
  1395535956,
  2413381860,
  1841049896,
  1491858159,
  885456874,
  4264095073,
  4001119347,
  1565136089,
  3898914787,
  1108368660,
  540939232,
  1173283510,
  2745871338,
  3681308437,
  4207628240,
  3343053890,
  4016749493,
  1699691293,
  1103962373,
  3625875870,
  2256883143,
  3830138730,
  1031889488,
  3479347698,
  1535977030,
  4236805024,
  3251091107,
  2132092099,
  1774941330,
  1199868427,
  1452454533,
  157007616,
  2904115357,
  342012276,
  595725824,
  1480756522,
  206960106,
  497939518,
  591360097,
  863170706,
  2375253569,
  3596610801,
  1814182875,
  2094937945,
  3421402208,
  1082520231,
  3463918190,
  2785509508,
  435703966,
  3908032597,
  1641649973,
  2842273706,
  3305899714,
  1510255612,
  2148256476,
  2655287854,
  3276092548,
  4258621189,
  236887753,
  3681803219,
  274041037,
  1734335097,
  3815195456,
  3317970021,
  1899903192,
  1026095262,
  4050517792,
  356393447,
  2410691914,
  3873677099,
  3682840055,
  3913112168,
  2491498743,
  4132185628,
  2489919796,
  1091903735,
  1979897079,
  3170134830,
  3567386728,
  3557303409,
  857797738,
  1136121015,
  1342202287,
  507115054,
  2535736646,
  337727348,
  3213592640,
  1301675037,
  2528481711,
  1895095763,
  1721773893,
  3216771564,
  62756741,
  2142006736,
  835421444,
  2531993523,
  1442658625,
  3659876326,
  2882144922,
  676362277,
  1392781812,
  170690266,
  3921047035,
  1759253602,
  3611846912,
  1745797284,
  664899054,
  1329594018,
  3901205900,
  3045908486,
  2062866102,
  2865634940,
  3543621612,
  3464012697,
  1080764994,
  553557557,
  3656615353,
  3996768171,
  991055499,
  499776247,
  1265440854,
  648242737,
  3940784050,
  980351604,
  3713745714,
  1749149687,
  3396870395,
  4211799374,
  3640570775,
  1161844396,
  3125318951,
  1431517754,
  545492359,
  4268468663,
  3499529547,
  1437099964,
  2702547544,
  3433638243,
  2581715763,
  2787789398,
  1060185593,
  1593081372,
  2418618748,
  4260947970,
  69676912,
  2159744348,
  86519011,
  2512459080,
  3838209314,
  1220612927,
  3339683548,
  133810670,
  1090789135,
  1078426020,
  1569222167,
  845107691,
  3583754449,
  4072456591,
  1091646820,
  628848692,
  1613405280,
  3757631651,
  526609435,
  236106946,
  48312990,
  2942717905,
  3402727701,
  1797494240,
  859738849,
  992217954,
  4005476642,
  2243076622,
  3870952857,
  3732016268,
  765654824,
  3490871365,
  2511836413,
  1685915746,
  3888969200,
  1414112111,
  2273134842,
  3281911079,
  4080962846,
  172450625,
  2569994100,
  980381355,
  4109958455,
  2819808352,
  2716589560,
  2568741196,
  3681446669,
  3329971472,
  1835478071,
  660984891,
  3704678404,
  4045999559,
  3422617507,
  3040415634,
  1762651403,
  1719377915,
  3470491036,
  2693910283,
  3642056355,
  3138596744,
  1364962596,
  2073328063,
  1983633131,
  926494387,
  3423689081,
  2150032023,
  4096667949,
  1749200295,
  3328846651,
  309677260,
  2016342300,
  1779581495,
  3079819751,
  111262694,
  1274766160,
  443224088,
  298511866,
  1025883608,
  3806446537,
  1145181785,
  168956806,
  3641502830,
  3584813610,
  1689216846,
  3666258015,
  3200248200,
  1692713982,
  2646376535,
  4042768518,
  1618508792,
  1610833997,
  3523052358,
  4130873264,
  2001055236,
  3610705100,
  2202168115,
  4028541809,
  2961195399,
  1006657119,
  2006996926,
  3186142756,
  1430667929,
  3210227297,
  1314452623,
  4074634658,
  4101304120,
  2273951170,
  1399257539,
  3367210612,
  3027628629,
  1190975929,
  2062231137,
  2333990788,
  2221543033,
  2438960610,
  1181637006,
  548689776,
  2362791313,
  3372408396,
  3104550113,
  3145860560,
  296247880,
  1970579870,
  3078560182,
  3769228297,
  1714227617,
  3291629107,
  3898220290,
  166772364,
  1251581989,
  493813264,
  448347421,
  195405023,
  2709975567,
  677966185,
  3703036547,
  1463355134,
  2715995803,
  1338867538,
  1343315457,
  2802222074,
  2684532164,
  233230375,
  2599980071,
  2000651841,
  3277868038,
  1638401717,
  4028070440,
  3237316320,
  6314154,
  819756386,
  300326615,
  590932579,
  1405279636,
  3267499572,
  3150704214,
  2428286686,
  3959192993,
  3461946742,
  1862657033,
  1266418056,
  963775037,
  2089974820,
  2263052895,
  1917689273,
  448879540,
  3550394620,
  3981727096,
  150775221,
  3627908307,
  1303187396,
  508620638,
  2975983352,
  2726630617,
  1817252668,
  1876281319,
  1457606340,
  908771278,
  3720792119,
  3617206836,
  2455994898,
  1729034894,
  1080033504,
  976866871,
  3556439503,
  2881648439,
  1522871579,
  1555064734,
  1336096578,
  3548522304,
  2579274686,
  3574697629,
  3205460757,
  3593280638,
  3338716283,
  3079412587,
  564236357,
  2993598910,
  1781952180,
  1464380207,
  3163844217,
  3332601554,
  1699332808,
  1393555694,
  1183702653,
  3581086237,
  1288719814,
  691649499,
  2847557200,
  2895455976,
  3193889540,
  2717570544,
  1781354906,
  1676643554,
  2592534050,
  3230253752,
  1126444790,
  2770207658,
  2633158820,
  2210423226,
  2615765581,
  2414155088,
  3127139286,
  673620729,
  2805611233,
  1269405062,
  4015350505,
  3341807571,
  4149409754,
  1057255273,
  2012875353,
  2162469141,
  2276492801,
  2601117357,
  993977747,
  3918593370,
  2654263191,
  753973209,
  36408145,
  2530585658,
  25011837,
  3520020182,
  2088578344,
  530523599,
  2918365339,
  1524020338,
  1518925132,
  3760827505,
  3759777254,
  1202760957,
  3985898139,
  3906192525,
  674977740,
  4174734889,
  2031300136,
  2019492241,
  3983892565,
  4153806404,
  3822280332,
  352677332,
  2297720250,
  60907813,
  90501309,
  3286998549,
  1016092578,
  2535922412,
  2839152426,
  457141659,
  509813237,
  4120667899,
  652014361,
  1966332200,
  2975202805,
  55981186,
  2327461051,
  676427537,
  3255491064,
  2882294119,
  3433927263,
  1307055953,
  942726286,
  933058658,
  2468411793,
  3933900994,
  4215176142,
  1361170020,
  2001714738,
  2830558078,
  3274259782,
  1222529897,
  1679025792,
  2729314320,
  3714953764,
  1770335741,
  151462246,
  3013232138,
  1682292957,
  1483529935,
  471910574,
  1539241949,
  458788160,
  3436315007,
  1807016891,
  3718408830,
  978976581,
  1043663428,
  3165965781,
  1927990952,
  4200891579,
  2372276910,
  3208408903,
  3533431907,
  1412390302,
  2931980059,
  4132332400,
  1947078029,
  3881505623,
  4168226417,
  2941484381,
  1077988104,
  1320477388,
  886195818,
  18198404,
  3786409e3,
  2509781533,
  112762804,
  3463356488,
  1866414978,
  891333506,
  18488651,
  661792760,
  1628790961,
  3885187036,
  3141171499,
  876946877,
  2693282273,
  1372485963,
  791857591,
  2686433993,
  3759982718,
  3167212022,
  3472953795,
  2716379847,
  445679433,
  3561995674,
  3504004811,
  3574258232,
  54117162,
  3331405415,
  2381918588,
  3769707343,
  4154350007,
  1140177722,
  4074052095,
  668550556,
  3214352940,
  367459370,
  261225585,
  2610173221,
  4209349473,
  3468074219,
  3265815641,
  314222801,
  3066103646,
  3808782860,
  282218597,
  3406013506,
  3773591054,
  379116347,
  1285071038,
  846784868,
  2669647154,
  3771962079,
  3550491691,
  2305946142,
  453669953,
  1268987020,
  3317592352,
  3279303384,
  3744833421,
  2610507566,
  3859509063,
  266596637,
  3847019092,
  517658769,
  3462560207,
  3443424879,
  370717030,
  4247526661,
  2224018117,
  4143653529,
  4112773975,
  2788324899,
  2477274417,
  1456262402,
  2901442914,
  1517677493,
  1846949527,
  2295493580,
  3734397586,
  2176403920,
  1280348187,
  1908823572,
  3871786941,
  846861322,
  1172426758,
  3287448474,
  3383383037,
  1655181056,
  3139813346,
  901632758,
  1897031941,
  2986607138,
  3066810236,
  3447102507,
  1393639104,
  373351379,
  950779232,
  625454576,
  3124240540,
  4148612726,
  2007998917,
  544563296,
  2244738638,
  2330496472,
  2058025392,
  1291430526,
  424198748,
  50039436,
  29584100,
  3605783033,
  2429876329,
  2791104160,
  1057563949,
  3255363231,
  3075367218,
  3463963227,
  1469046755,
  985887462
];
var C_ORIG = [
  1332899944,
  1700884034,
  1701343084,
  1684370003,
  1668446532,
  1869963892
];
function _encipher(lr2, off, P6, S7) {
  var n8, l6 = lr2[off], r8 = lr2[off + 1];
  l6 ^= P6[0];
  n8 = S7[l6 >>> 24];
  n8 += S7[256 | l6 >> 16 & 255];
  n8 ^= S7[512 | l6 >> 8 & 255];
  n8 += S7[768 | l6 & 255];
  r8 ^= n8 ^ P6[1];
  n8 = S7[r8 >>> 24];
  n8 += S7[256 | r8 >> 16 & 255];
  n8 ^= S7[512 | r8 >> 8 & 255];
  n8 += S7[768 | r8 & 255];
  l6 ^= n8 ^ P6[2];
  n8 = S7[l6 >>> 24];
  n8 += S7[256 | l6 >> 16 & 255];
  n8 ^= S7[512 | l6 >> 8 & 255];
  n8 += S7[768 | l6 & 255];
  r8 ^= n8 ^ P6[3];
  n8 = S7[r8 >>> 24];
  n8 += S7[256 | r8 >> 16 & 255];
  n8 ^= S7[512 | r8 >> 8 & 255];
  n8 += S7[768 | r8 & 255];
  l6 ^= n8 ^ P6[4];
  n8 = S7[l6 >>> 24];
  n8 += S7[256 | l6 >> 16 & 255];
  n8 ^= S7[512 | l6 >> 8 & 255];
  n8 += S7[768 | l6 & 255];
  r8 ^= n8 ^ P6[5];
  n8 = S7[r8 >>> 24];
  n8 += S7[256 | r8 >> 16 & 255];
  n8 ^= S7[512 | r8 >> 8 & 255];
  n8 += S7[768 | r8 & 255];
  l6 ^= n8 ^ P6[6];
  n8 = S7[l6 >>> 24];
  n8 += S7[256 | l6 >> 16 & 255];
  n8 ^= S7[512 | l6 >> 8 & 255];
  n8 += S7[768 | l6 & 255];
  r8 ^= n8 ^ P6[7];
  n8 = S7[r8 >>> 24];
  n8 += S7[256 | r8 >> 16 & 255];
  n8 ^= S7[512 | r8 >> 8 & 255];
  n8 += S7[768 | r8 & 255];
  l6 ^= n8 ^ P6[8];
  n8 = S7[l6 >>> 24];
  n8 += S7[256 | l6 >> 16 & 255];
  n8 ^= S7[512 | l6 >> 8 & 255];
  n8 += S7[768 | l6 & 255];
  r8 ^= n8 ^ P6[9];
  n8 = S7[r8 >>> 24];
  n8 += S7[256 | r8 >> 16 & 255];
  n8 ^= S7[512 | r8 >> 8 & 255];
  n8 += S7[768 | r8 & 255];
  l6 ^= n8 ^ P6[10];
  n8 = S7[l6 >>> 24];
  n8 += S7[256 | l6 >> 16 & 255];
  n8 ^= S7[512 | l6 >> 8 & 255];
  n8 += S7[768 | l6 & 255];
  r8 ^= n8 ^ P6[11];
  n8 = S7[r8 >>> 24];
  n8 += S7[256 | r8 >> 16 & 255];
  n8 ^= S7[512 | r8 >> 8 & 255];
  n8 += S7[768 | r8 & 255];
  l6 ^= n8 ^ P6[12];
  n8 = S7[l6 >>> 24];
  n8 += S7[256 | l6 >> 16 & 255];
  n8 ^= S7[512 | l6 >> 8 & 255];
  n8 += S7[768 | l6 & 255];
  r8 ^= n8 ^ P6[13];
  n8 = S7[r8 >>> 24];
  n8 += S7[256 | r8 >> 16 & 255];
  n8 ^= S7[512 | r8 >> 8 & 255];
  n8 += S7[768 | r8 & 255];
  l6 ^= n8 ^ P6[14];
  n8 = S7[l6 >>> 24];
  n8 += S7[256 | l6 >> 16 & 255];
  n8 ^= S7[512 | l6 >> 8 & 255];
  n8 += S7[768 | l6 & 255];
  r8 ^= n8 ^ P6[15];
  n8 = S7[r8 >>> 24];
  n8 += S7[256 | r8 >> 16 & 255];
  n8 ^= S7[512 | r8 >> 8 & 255];
  n8 += S7[768 | r8 & 255];
  l6 ^= n8 ^ P6[16];
  lr2[off] = r8 ^ P6[BLOWFISH_NUM_ROUNDS + 1];
  lr2[off + 1] = l6;
  return lr2;
}
function _streamtoword(data, offp) {
  for (var i8 = 0, word = 0; i8 < 4; ++i8)
    word = word << 8 | data[offp] & 255, offp = (offp + 1) % data.length;
  return { key: word, offp };
}
function _key(key, P6, S7) {
  var offset = 0, lr2 = [0, 0], plen = P6.length, slen = S7.length, sw;
  for (var i8 = 0; i8 < plen; i8++)
    sw = _streamtoword(key, offset), offset = sw.offp, P6[i8] = P6[i8] ^ sw.key;
  for (i8 = 0; i8 < plen; i8 += 2)
    lr2 = _encipher(lr2, 0, P6, S7), P6[i8] = lr2[0], P6[i8 + 1] = lr2[1];
  for (i8 = 0; i8 < slen; i8 += 2)
    lr2 = _encipher(lr2, 0, P6, S7), S7[i8] = lr2[0], S7[i8 + 1] = lr2[1];
}
function _ekskey(data, key, P6, S7) {
  var offp = 0, lr2 = [0, 0], plen = P6.length, slen = S7.length, sw;
  for (var i8 = 0; i8 < plen; i8++)
    sw = _streamtoword(key, offp), offp = sw.offp, P6[i8] = P6[i8] ^ sw.key;
  offp = 0;
  for (i8 = 0; i8 < plen; i8 += 2)
    sw = _streamtoword(data, offp), offp = sw.offp, lr2[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr2[1] ^= sw.key, lr2 = _encipher(lr2, 0, P6, S7), P6[i8] = lr2[0], P6[i8 + 1] = lr2[1];
  for (i8 = 0; i8 < slen; i8 += 2)
    sw = _streamtoword(data, offp), offp = sw.offp, lr2[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr2[1] ^= sw.key, lr2 = _encipher(lr2, 0, P6, S7), S7[i8] = lr2[0], S7[i8 + 1] = lr2[1];
}
function _crypt(b6, salt, rounds, callback, progressCallback) {
  var cdata = C_ORIG.slice(), clen = cdata.length, err;
  if (rounds < 4 || rounds > 31) {
    err = Error("Illegal number of rounds (4-31): " + rounds);
    if (callback) {
      nextTick(callback.bind(this, err));
      return;
    } else throw err;
  }
  if (salt.length !== BCRYPT_SALT_LEN) {
    err = Error(
      "Illegal salt length: " + salt.length + " != " + BCRYPT_SALT_LEN
    );
    if (callback) {
      nextTick(callback.bind(this, err));
      return;
    } else throw err;
  }
  rounds = 1 << rounds >>> 0;
  var P6, S7, i8 = 0, j7;
  if (typeof Int32Array === "function") {
    P6 = new Int32Array(P_ORIG);
    S7 = new Int32Array(S_ORIG);
  } else {
    P6 = P_ORIG.slice();
    S7 = S_ORIG.slice();
  }
  _ekskey(salt, b6, P6, S7);
  function next() {
    if (progressCallback) progressCallback(i8 / rounds);
    if (i8 < rounds) {
      var start = Date.now();
      for (; i8 < rounds; ) {
        i8 = i8 + 1;
        _key(b6, P6, S7);
        _key(salt, P6, S7);
        if (Date.now() - start > MAX_EXECUTION_TIME) break;
      }
    } else {
      for (i8 = 0; i8 < 64; i8++)
        for (j7 = 0; j7 < clen >> 1; j7++) _encipher(cdata, j7 << 1, P6, S7);
      var ret = [];
      for (i8 = 0; i8 < clen; i8++)
        ret.push((cdata[i8] >> 24 & 255) >>> 0), ret.push((cdata[i8] >> 16 & 255) >>> 0), ret.push((cdata[i8] >> 8 & 255) >>> 0), ret.push((cdata[i8] & 255) >>> 0);
      if (callback) {
        callback(null, ret);
        return;
      } else return ret;
    }
    if (callback) nextTick(next);
  }
  if (typeof callback !== "undefined") {
    next();
  } else {
    var res;
    while (true) if (typeof (res = next()) !== "undefined") return res || [];
  }
}
function _hash(password, salt, callback, progressCallback) {
  var err;
  if (typeof password !== "string" || typeof salt !== "string") {
    err = Error("Invalid string / salt: Not a string");
    if (callback) {
      nextTick(callback.bind(this, err));
      return;
    } else throw err;
  }
  var minor, offset;
  if (salt.charAt(0) !== "$" || salt.charAt(1) !== "2") {
    err = Error("Invalid salt version: " + salt.substring(0, 2));
    if (callback) {
      nextTick(callback.bind(this, err));
      return;
    } else throw err;
  }
  if (salt.charAt(2) === "$") minor = String.fromCharCode(0), offset = 3;
  else {
    minor = salt.charAt(2);
    if (minor !== "a" && minor !== "b" && minor !== "y" || salt.charAt(3) !== "$") {
      err = Error("Invalid salt revision: " + salt.substring(2, 4));
      if (callback) {
        nextTick(callback.bind(this, err));
        return;
      } else throw err;
    }
    offset = 4;
  }
  if (salt.charAt(offset + 2) > "$") {
    err = Error("Missing salt rounds");
    if (callback) {
      nextTick(callback.bind(this, err));
      return;
    } else throw err;
  }
  var r1 = parseInt(salt.substring(offset, offset + 1), 10) * 10, r22 = parseInt(salt.substring(offset + 1, offset + 2), 10), rounds = r1 + r22, real_salt = salt.substring(offset + 3, offset + 25);
  password += minor >= "a" ? "\0" : "";
  var passwordb = utf8Array(password), saltb = base64_decode(real_salt, BCRYPT_SALT_LEN);
  function finish(bytes) {
    var res = [];
    res.push("$2");
    if (minor >= "a") res.push(minor);
    res.push("$");
    if (rounds < 10) res.push("0");
    res.push(rounds.toString());
    res.push("$");
    res.push(base64_encode(saltb, saltb.length));
    res.push(base64_encode(bytes, C_ORIG.length * 4 - 1));
    return res.join("");
  }
  if (typeof callback == "undefined")
    return finish(_crypt(passwordb, saltb, rounds));
  else {
    _crypt(
      passwordb,
      saltb,
      rounds,
      function(err2, bytes) {
        if (err2) callback(err2, null);
        else callback(null, finish(bytes));
      },
      progressCallback
    );
  }
}
function encodeBase64(bytes, length) {
  return base64_encode(bytes, length);
}

// node_modules/@protontech/crypto/src/srp/utils/username.ts
var cleanUsername = (name = "") => name.replace(/[.\-_]/g, "").toLowerCase();
var checkUsername = (authVersion, username, usernameApi) => {
  if (authVersion === 2) {
    if (!username || !usernameApi) {
      throw new Error("Missing username");
    }
    if (cleanUsername(username) !== cleanUsername(usernameApi)) {
      return false;
    }
  }
  if (authVersion <= 1) {
    if (!username || !usernameApi) {
      throw new Error("Missing username");
    }
    if (username.toLowerCase() !== usernameApi.toLowerCase()) {
      return false;
    }
  }
  return true;
};

// node_modules/@protontech/crypto/src/srp/passwords.ts
var expandHash = async (input) => {
  const promises = new Array(4).fill(null).map(
    (_6, i8) => CryptoProxy.computeHash({
      algorithm: "SHA512",
      data: mergeUint8Arrays([input, new Uint8Array([i8])])
    })
  );
  return mergeUint8Arrays(await Promise.all(promises));
};
var formatHash = async (password, salt, modulus) => {
  const unexpandedHash = await hash(password, BCRYPT_PREFIX + salt);
  return expandHash(mergeUint8Arrays([binaryStringToUint8Array(unexpandedHash), modulus]));
};
var hashPassword3 = (password, salt, modulus) => {
  const saltBinary = binaryStringToUint8Array(`${salt}proton`);
  return formatHash(password, encodeBase64(saltBinary, 16), modulus);
};
var hashPassword1 = async (password, username, modulus) => {
  const value = utf8StringToUint8Array(username.toLowerCase());
  const salt = (await CryptoProxy.computeHash({ algorithm: "unsafeMD5", data: value })).toHex();
  return formatHash(password, salt, modulus);
};
var hashPassword0 = async (password, username, modulus) => {
  const value = await CryptoProxy.computeHash({
    algorithm: "SHA512",
    data: utf8StringToUint8Array(username.toLowerCase() + password)
  });
  const prehashed = value.toBase64();
  return hashPassword1(prehashed, username, modulus);
};
var hashPassword = ({
  password,
  salt,
  username,
  modulus,
  version
}) => {
  if (version === 4 || version === 3) {
    if (!salt) {
      throw new Error("Missing salt");
    }
    return hashPassword3(password, salt, modulus);
  }
  if (version === 2) {
    return hashPassword1(password, cleanUsername(username), modulus);
  }
  if (version === 1) {
    if (!username) {
      throw new Error("Missing username");
    }
    return hashPassword1(password, username, modulus);
  }
  if (version === 0) {
    if (!username) {
      throw new Error("Missing username");
    }
    return hashPassword0(password, username, modulus);
  }
  throw new Error("Unsupported auth version");
};

// node_modules/@protontech/crypto/src/srp/utils/modulus.ts
var getModulusKey = /* @__PURE__ */ (() => {
  let cachedKeyReference;
  const get = async () => {
    try {
      const keyReference = await CryptoProxy.importPublicKey({ armoredKey: SRP_MODULUS_KEY });
      cachedKeyReference = keyReference;
      return cachedKeyReference;
    } catch (e8) {
      cachedKeyReference = void 0;
      throw e8;
    }
  };
  return async () => {
    const isValidKeyReference = cachedKeyReference && // after logging out, the key store is cleared, and the key reference becomes invalid.
    // try and export the key to see if it's still valid
    await CryptoProxy.exportPublicKey({ key: cachedKeyReference, format: "binary" }).then(() => true).catch(() => false);
    if (isValidKeyReference) {
      return cachedKeyReference;
    }
    return get();
  };
})();
var verifyModulus = async (publicKey, modulus) => {
  try {
    const { data: modulusData, verificationStatus } = await CryptoProxy.verifyCleartextMessage({
      armoredCleartextMessage: modulus,
      verificationKeys: publicKey
    });
    if (verificationStatus !== 1 /* SIGNED_AND_VALID */) {
      throw new Error();
    }
    return modulusData;
  } catch {
    throw new Error("Unable to verify server identity");
  }
};
var verifyAndGetModulus = async (modulus) => {
  const publicKey = await getModulusKey();
  const modulusData = await verifyModulus(publicKey, modulus);
  return Uint8Array.fromBase64(modulusData);
};

// node_modules/@protontech/crypto/src/srp/srp.ts
var srpHasher = (arr) => expandHash(arr);
var littleEndianArrayToBigInteger = async (arr) => uint8ArrayToBigInt(arr.slice().reverse());
var generateClientSecret = (length) => {
  return littleEndianArrayToBigInteger(crypto.getRandomValues(new Uint8Array(length)));
};
var generateParameters = async ({ byteLength: byteLength2, generator, modulus, serverEphemeralArray }) => {
  const clientSecret = await generateClientSecret(byteLength2);
  const clientEphemeral = modExp(generator, clientSecret, modulus);
  const clientEphemeralArray = bigIntToUint8Array(clientEphemeral, "le", byteLength2);
  const clientServerHash = await srpHasher(mergeUint8Arrays([clientEphemeralArray, serverEphemeralArray]));
  const scramblingParam = await littleEndianArrayToBigInteger(clientServerHash);
  return {
    clientSecret,
    clientEphemeral,
    scramblingParam
  };
};
var getParameters = async ({ byteLength: byteLength2, generator, modulus, serverEphemeralArray }) => {
  for (let i8 = 0; i8 < MAX_VALUE_ITERATIONS; ++i8) {
    const { clientSecret, clientEphemeral, scramblingParam } = await generateParameters({
      byteLength: byteLength2,
      generator,
      modulus,
      serverEphemeralArray
    });
    if (scramblingParam === BigInt(0) || clientEphemeral === BigInt(0)) {
      continue;
    }
    return {
      clientSecret,
      clientEphemeral,
      scramblingParam
    };
  }
  throw new Error("Could not find safe parameters");
};
var generateProofs = async ({
  byteLength: byteLength2,
  modulusArray,
  hashedPasswordArray,
  serverEphemeralArray
}) => {
  const modulus = await littleEndianArrayToBigInteger(modulusArray);
  if (byteLength(modulus) !== byteLength2) {
    throw new Error("SRP modulus has incorrect size");
  }
  const generator = BigInt(2);
  const hashedArray = await srpHasher(
    mergeUint8Arrays([bigIntToUint8Array(generator, "le", byteLength2), modulusArray])
  );
  const multiplier = await littleEndianArrayToBigInteger(hashedArray);
  const serverEphemeral = await littleEndianArrayToBigInteger(serverEphemeralArray);
  const hashedPassword = await littleEndianArrayToBigInteger(hashedPasswordArray);
  const modulusMinusOne = modulus - BigInt(1);
  const multiplierReduced = mod(multiplier, modulus);
  if (serverEphemeral === BigInt(0)) {
    throw new Error("SRP server ephemeral is out of bounds");
  }
  const { clientSecret, clientEphemeral, scramblingParam } = await getParameters({
    byteLength: byteLength2,
    generator,
    modulus,
    serverEphemeralArray
  });
  const kgx = mod(modExp(generator, hashedPassword, modulus) * multiplierReduced, modulus);
  const sharedSessionKeyExponent = mod(scramblingParam * hashedPassword + clientSecret, modulusMinusOne);
  const sharedSessionKeyBase = mod(serverEphemeral - kgx, modulus);
  const sharedSessionKey = modExp(sharedSessionKeyBase, sharedSessionKeyExponent, modulus);
  const clientEphemeralArray = bigIntToUint8Array(clientEphemeral, "le", byteLength2);
  const sharedSessionArray = bigIntToUint8Array(sharedSessionKey, "le", byteLength2);
  const clientProof = await srpHasher(
    mergeUint8Arrays([clientEphemeralArray, serverEphemeralArray, sharedSessionArray])
  );
  const expectedServerProof = await srpHasher(
    mergeUint8Arrays([clientEphemeralArray, clientProof, sharedSessionArray])
  );
  return {
    clientEphemeral: clientEphemeralArray,
    clientProof,
    expectedServerProof,
    sharedSession: sharedSessionArray
  };
};
var getSrp = async ({ Version, Modulus: serverModulus, ServerEphemeral, Username, Salt }, { username, password }, authVersion = Version) => {
  if (!checkUsername(authVersion, username, Username)) {
    const error = new Error(
      "Please login with just your ProtonMail username (without @protonmail.com or @protonmail.ch)."
    );
    error.trace = false;
    throw error;
  }
  const modulusArray = await verifyAndGetModulus(serverModulus);
  const serverEphemeralArray = Uint8Array.fromBase64(ServerEphemeral);
  const hashedPasswordArray = await hashPassword({
    version: authVersion,
    password,
    salt: authVersion < 3 ? void 0 : uint8ArrayToBinaryString(Uint8Array.fromBase64(Salt)),
    username: authVersion < 3 ? Username : void 0,
    modulus: modulusArray
  });
  const { clientEphemeral, clientProof, expectedServerProof, sharedSession } = await generateProofs({
    byteLength: SRP_LEN,
    modulusArray,
    hashedPasswordArray,
    serverEphemeralArray
  });
  return {
    clientEphemeral: clientEphemeral.toBase64(),
    clientProof: clientProof.toBase64(),
    expectedServerProof: expectedServerProof.toBase64(),
    sharedSession
  };
};

// lib/vendor/proton-srp-entry.mjs
Api.init({});
CryptoProxy.setEndpoint(new Api(), (endpoint2) => endpoint2.clearKeyStore());
/*! Bundled license information:

openpgp/dist/lightweight/sha512.min.mjs:
  (*! OpenPGP.js v6.3.1 - 2026-07-31 - this is LGPL licensed code, see LICENSE/our website https://openpgpjs.org/ for more information. *)
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

openpgp/dist/lightweight/noble_curves.min.mjs:
  (*! OpenPGP.js v6.3.1 - 2026-07-31 - this is LGPL licensed code, see LICENSE/our website https://openpgpjs.org/ for more information. *)
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

openpgp/dist/lightweight/noble_hashes.min.mjs:
openpgp/dist/lightweight/nacl-fast.min.mjs:
openpgp/dist/lightweight/legacy_ciphers.min.mjs:
openpgp/dist/lightweight/argon2id.min.mjs:
openpgp/dist/lightweight/unbzip2-stream.min.mjs:
  (*! OpenPGP.js v6.3.1 - 2026-07-31 - this is LGPL licensed code, see LICENSE/our website https://openpgpjs.org/ for more information. *)

openpgp/dist/lightweight/noble_post_quantum.min.mjs:
  (*! OpenPGP.js v6.3.1 - 2026-07-31 - this is LGPL licensed code, see LICENSE/our website https://openpgpjs.org/ for more information. *)
  (*! noble-post-quantum - MIT License (c) 2024 Paul Miller (paulmillr.com) *)

openpgp/dist/lightweight/openpgp.min.mjs:
  (*! OpenPGP.js v6.3.1 - 2026-07-31 - this is LGPL licensed code, see LICENSE/our website https://openpgpjs.org/ for more information. *)
  (*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) *)
*/

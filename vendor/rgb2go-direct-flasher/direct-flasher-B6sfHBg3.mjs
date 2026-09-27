class T extends Error {
}
/*! pako 2.2.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */
const ba = 4, Ge = 0, Ze = 1, Aa = 2;
function At(e) {
  let i = e.length;
  for (; --i >= 0; )
    e[i] = 0;
}
const ya = 0, Bi = 1, xa = 2, Ra = 3, Ia = 258, Oe = 29, Ht = 256, Lt = Ht + 1 + Oe, wt = 30, Fe = 19, Ni = 2 * Lt + 1, st = 15, he = 16, va = 7, Pe = 256, Hi = 16, zi = 17, $i = 18, xe = (
  /* extra bits for each length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0])
), Vt = (
  /* extra bits for each distance code */
  new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13])
), Ta = (
  /* extra bits for each bit length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7])
), Gi = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), ka = 512, X = new Array((Lt + 2) * 2);
At(X);
const Tt = new Array(wt * 2);
At(Tt);
const Ot = new Array(ka);
At(Ot);
const Ft = new Array(Ia - Ra + 1);
At(Ft);
const Ue = new Array(Oe);
At(Ue);
const Yt = new Array(wt);
At(Yt);
function le(e, i, t, a, n) {
  this.static_tree = e, this.extra_bits = i, this.extra_base = t, this.elems = a, this.max_length = n, this.has_stree = e && e.length;
}
let Zi, Wi, Ki;
function ce(e, i) {
  this.dyn_tree = e, this.max_code = 0, this.stat_desc = i;
}
const qi = (e) => e < 256 ? Ot[e] : Ot[256 + (e >>> 7)], Pt = (e, i) => {
  e.pending_buf[e.pending++] = i & 255, e.pending_buf[e.pending++] = i >>> 8 & 255;
}, F = (e, i, t) => {
  e.bi_valid > he - t ? (e.bi_buf |= i << e.bi_valid & 65535, Pt(e, e.bi_buf), e.bi_buf = i >> he - e.bi_valid, e.bi_valid += t - he) : (e.bi_buf |= i << e.bi_valid & 65535, e.bi_valid += t);
}, K = (e, i, t) => {
  F(
    e,
    t[i * 2],
    t[i * 2 + 1]
    /*.Len*/
  );
}, ji = (e, i) => {
  let t = 0;
  do
    t |= e & 1, e >>>= 1, t <<= 1;
  while (--i > 0);
  return t >>> 1;
}, Da = (e) => {
  e.bi_valid === 16 ? (Pt(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = e.bi_buf & 255, e.bi_buf >>= 8, e.bi_valid -= 8);
}, Ma = (e, i) => {
  const t = i.dyn_tree, a = i.max_code, n = i.stat_desc.static_tree, s = i.stat_desc.has_stree, r = i.stat_desc.extra_bits, h = i.stat_desc.extra_base, l = i.stat_desc.max_length;
  let o, c, u, d, f, g, A = 0;
  for (d = 0; d <= st; d++)
    e.bl_count[d] = 0;
  for (t[e.heap[e.heap_max] * 2 + 1] = 0, o = e.heap_max + 1; o < Ni; o++)
    c = e.heap[o], d = t[t[c * 2 + 1] * 2 + 1] + 1, d > l && (d = l, A++), t[c * 2 + 1] = d, !(c > a) && (e.bl_count[d]++, f = 0, c >= h && (f = r[c - h]), g = t[c * 2], e.opt_len += g * (d + f), s && (e.static_len += g * (n[c * 2 + 1] + f)));
  if (A !== 0) {
    do {
      for (d = l - 1; e.bl_count[d] === 0; )
        d--;
      e.bl_count[d]--, e.bl_count[d + 1] += 2, e.bl_count[l]--, A -= 2;
    } while (A > 0);
    for (d = l; d !== 0; d--)
      for (c = e.bl_count[d]; c !== 0; )
        u = e.heap[--o], !(u > a) && (t[u * 2 + 1] !== d && (e.opt_len += (d - t[u * 2 + 1]) * t[u * 2], t[u * 2 + 1] = d), c--);
  }
}, Vi = (e, i, t) => {
  const a = new Array(st + 1);
  let n = 0, s, r;
  for (s = 1; s <= st; s++)
    n = n + t[s - 1] << 1, a[s] = n;
  for (r = 0; r <= i; r++) {
    let h = e[r * 2 + 1];
    h !== 0 && (e[r * 2] = ji(a[h]++, h));
  }
}, Ca = () => {
  let e, i, t, a, n;
  const s = new Array(st + 1);
  for (t = 0, a = 0; a < Oe - 1; a++)
    for (Ue[a] = t, e = 0; e < 1 << xe[a]; e++)
      Ft[t++] = a;
  for (Ft[t - 1] = a, n = 0, a = 0; a < 16; a++)
    for (Yt[a] = n, e = 0; e < 1 << Vt[a]; e++)
      Ot[n++] = a;
  for (n >>= 7; a < wt; a++)
    for (Yt[a] = n << 7, e = 0; e < 1 << Vt[a] - 7; e++)
      Ot[256 + n++] = a;
  for (i = 0; i <= st; i++)
    s[i] = 0;
  for (e = 0; e <= 143; )
    X[e * 2 + 1] = 8, e++, s[8]++;
  for (; e <= 255; )
    X[e * 2 + 1] = 9, e++, s[9]++;
  for (; e <= 279; )
    X[e * 2 + 1] = 7, e++, s[7]++;
  for (; e <= 287; )
    X[e * 2 + 1] = 8, e++, s[8]++;
  for (Vi(X, Lt + 1, s), e = 0; e < wt; e++)
    Tt[e * 2 + 1] = 5, Tt[e * 2] = ji(e, 5);
  Zi = new le(X, xe, Ht + 1, Lt, st), Wi = new le(Tt, Vt, 0, wt, st), Ki = new le(new Array(0), Ta, 0, Fe, va);
}, Yi = (e) => {
  let i;
  for (i = 0; i < Lt; i++)
    e.dyn_ltree[i * 2] = 0;
  for (i = 0; i < wt; i++)
    e.dyn_dtree[i * 2] = 0;
  for (i = 0; i < Fe; i++)
    e.bl_tree[i * 2] = 0;
  e.dyn_ltree[Pe * 2] = 1, e.opt_len = e.static_len = 0, e.sym_next = e.matches = 0;
}, Xi = (e) => {
  e.bi_valid > 8 ? Pt(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0;
}, We = (e, i, t, a) => {
  const n = i * 2, s = t * 2;
  return e[n] < e[s] || e[n] === e[s] && a[i] <= a[t];
}, fe = (e, i, t) => {
  const a = e.heap[t];
  let n = t << 1;
  for (; n <= e.heap_len && (n < e.heap_len && We(i, e.heap[n + 1], e.heap[n], e.depth) && n++, !We(i, a, e.heap[n], e.depth)); )
    e.heap[t] = e.heap[n], t = n, n <<= 1;
  e.heap[t] = a;
}, Ke = (e, i, t) => {
  let a, n, s = 0, r, h;
  if (e.sym_next !== 0)
    do
      a = e.pending_buf[e.sym_buf + s++] & 255, a += (e.pending_buf[e.sym_buf + s++] & 255) << 8, n = e.pending_buf[e.sym_buf + s++], a === 0 ? K(e, n, i) : (r = Ft[n], K(e, r + Ht + 1, i), h = xe[r], h !== 0 && (n -= Ue[r], F(e, n, h)), a--, r = qi(a), K(e, r, t), h = Vt[r], h !== 0 && (a -= Yt[r], F(e, a, h)));
    while (s < e.sym_next);
  K(e, Pe, i);
}, Re = (e, i) => {
  const t = i.dyn_tree, a = i.stat_desc.static_tree, n = i.stat_desc.has_stree, s = i.stat_desc.elems;
  let r, h, l = -1, o;
  for (e.heap_len = 0, e.heap_max = Ni, r = 0; r < s; r++)
    t[r * 2] !== 0 ? (e.heap[++e.heap_len] = l = r, e.depth[r] = 0) : t[r * 2 + 1] = 0;
  for (; e.heap_len < 2; )
    o = e.heap[++e.heap_len] = l < 2 ? ++l : 0, t[o * 2] = 1, e.depth[o] = 0, e.opt_len--, n && (e.static_len -= a[o * 2 + 1]);
  for (i.max_code = l, r = e.heap_len >> 1; r >= 1; r--)
    fe(e, t, r);
  o = s;
  do
    r = e.heap[
      1
      /*SMALLEST*/
    ], e.heap[
      1
      /*SMALLEST*/
    ] = e.heap[e.heap_len--], fe(
      e,
      t,
      1
      /*SMALLEST*/
    ), h = e.heap[
      1
      /*SMALLEST*/
    ], e.heap[--e.heap_max] = r, e.heap[--e.heap_max] = h, t[o * 2] = t[r * 2] + t[h * 2], e.depth[o] = (e.depth[r] >= e.depth[h] ? e.depth[r] : e.depth[h]) + 1, t[r * 2 + 1] = t[h * 2 + 1] = o, e.heap[
      1
      /*SMALLEST*/
    ] = o++, fe(
      e,
      t,
      1
      /*SMALLEST*/
    );
  while (e.heap_len >= 2);
  e.heap[--e.heap_max] = e.heap[
    1
    /*SMALLEST*/
  ], Ma(e, i), Vi(t, l, e.bl_count);
}, qe = (e, i, t) => {
  let a, n = -1, s, r = i[0 * 2 + 1], h = 0, l = 7, o = 4;
  for (r === 0 && (l = 138, o = 3), i[(t + 1) * 2 + 1] = 65535, a = 0; a <= t; a++)
    s = r, r = i[(a + 1) * 2 + 1], !(++h < l && s === r) && (h < o ? e.bl_tree[s * 2] += h : s !== 0 ? (s !== n && e.bl_tree[s * 2]++, e.bl_tree[Hi * 2]++) : h <= 10 ? e.bl_tree[zi * 2]++ : e.bl_tree[$i * 2]++, h = 0, n = s, r === 0 ? (l = 138, o = 3) : s === r ? (l = 6, o = 3) : (l = 7, o = 4));
}, je = (e, i, t) => {
  let a, n = -1, s, r = i[0 * 2 + 1], h = 0, l = 7, o = 4;
  for (r === 0 && (l = 138, o = 3), a = 0; a <= t; a++)
    if (s = r, r = i[(a + 1) * 2 + 1], !(++h < l && s === r)) {
      if (h < o)
        do
          K(e, s, e.bl_tree);
        while (--h !== 0);
      else s !== 0 ? (s !== n && (K(e, s, e.bl_tree), h--), K(e, Hi, e.bl_tree), F(e, h - 3, 2)) : h <= 10 ? (K(e, zi, e.bl_tree), F(e, h - 3, 3)) : (K(e, $i, e.bl_tree), F(e, h - 11, 7));
      h = 0, n = s, r === 0 ? (l = 138, o = 3) : s === r ? (l = 6, o = 3) : (l = 7, o = 4);
    }
}, La = (e) => {
  let i;
  for (qe(e, e.dyn_ltree, e.l_desc.max_code), qe(e, e.dyn_dtree, e.d_desc.max_code), Re(e, e.bl_desc), i = Fe - 1; i >= 3 && e.bl_tree[Gi[i] * 2 + 1] === 0; i--)
    ;
  return e.opt_len += 3 * (i + 1) + 5 + 5 + 4, i;
}, Oa = (e, i, t, a) => {
  let n;
  for (F(e, i - 257, 5), F(e, t - 1, 5), F(e, a - 4, 4), n = 0; n < a; n++)
    F(e, e.bl_tree[Gi[n] * 2 + 1], 3);
  je(e, e.dyn_ltree, i - 1), je(e, e.dyn_dtree, t - 1);
}, Fa = (e) => {
  let i = 4093624447, t;
  for (t = 0; t <= 31; t++, i >>>= 1)
    if (i & 1 && e.dyn_ltree[t * 2] !== 0)
      return Ge;
  if (e.dyn_ltree[9 * 2] !== 0 || e.dyn_ltree[10 * 2] !== 0 || e.dyn_ltree[13 * 2] !== 0)
    return Ze;
  for (t = 32; t < Ht; t++)
    if (e.dyn_ltree[t * 2] !== 0)
      return Ze;
  return Ge;
};
let Ve = !1;
const Pa = (e) => {
  Ve || (Ca(), Ve = !0), e.l_desc = new ce(e.dyn_ltree, Zi), e.d_desc = new ce(e.dyn_dtree, Wi), e.bl_desc = new ce(e.bl_tree, Ki), e.bi_buf = 0, e.bi_valid = 0, Yi(e);
}, Ji = (e, i, t, a) => {
  F(e, (ya << 1) + (a ? 1 : 0), 3), Xi(e), Pt(e, t), Pt(e, ~t), t && e.pending_buf.set(e.window.subarray(i, i + t), e.pending), e.pending += t;
}, Ua = (e) => {
  F(e, Bi << 1, 3), K(e, Pe, X), Da(e);
}, Ba = (e, i, t, a) => {
  let n, s, r = 0;
  e.level > 0 ? (e.strm.data_type === Aa && (e.strm.data_type = Fa(e)), Re(e, e.l_desc), Re(e, e.d_desc), r = La(e), n = e.opt_len + 3 + 7 >>> 3, s = e.static_len + 3 + 7 >>> 3, s <= n && (n = s)) : n = s = t + 5, t + 4 <= n && i !== -1 ? Ji(e, i, t, a) : e.strategy === ba || s === n ? (F(e, (Bi << 1) + (a ? 1 : 0), 3), Ke(e, X, Tt)) : (F(e, (xa << 1) + (a ? 1 : 0), 3), Oa(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, r + 1), Ke(e, e.dyn_ltree, e.dyn_dtree)), Yi(e), a && Xi(e);
}, Na = (e, i, t) => (e.pending_buf[e.sym_buf + e.sym_next++] = i, e.pending_buf[e.sym_buf + e.sym_next++] = i >> 8, e.pending_buf[e.sym_buf + e.sym_next++] = t, i === 0 ? e.dyn_ltree[t * 2]++ : (e.matches++, i--, e.dyn_ltree[(Ft[t] + Ht + 1) * 2]++, e.dyn_dtree[qi(i) * 2]++), e.sym_next === e.sym_end);
var Ha = Pa, za = Ji, $a = Ba, Ga = Na, Za = Ua, Wa = {
  _tr_init: Ha,
  _tr_stored_block: za,
  _tr_flush_block: $a,
  _tr_tally: Ga,
  _tr_align: Za
};
const Ka = (e, i, t, a) => {
  let n = e & 65535 | 0, s = e >>> 16 & 65535 | 0, r = 0;
  for (; t !== 0; ) {
    r = t > 2e3 ? 2e3 : t, t -= r;
    do
      n = n + i[a++] | 0, s = s + n | 0;
    while (--r);
    n %= 65521, s %= 65521;
  }
  return n | s << 16 | 0;
};
var Ut = Ka;
const qa = () => {
  let e, i = [];
  for (var t = 0; t < 256; t++) {
    e = t;
    for (var a = 0; a < 8; a++)
      e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1;
    i[t] = e;
  }
  return i;
}, ja = new Uint32Array(qa()), Va = (e, i, t, a) => {
  const n = ja, s = a + t;
  e ^= -1;
  for (let r = a; r < s; r++)
    e = e >>> 8 ^ n[(e ^ i[r]) & 255];
  return e ^ -1;
};
var C = Va, St = {
  2: "need dictionary",
  /* Z_NEED_DICT       2  */
  1: "stream end",
  /* Z_STREAM_END      1  */
  0: "",
  /* Z_OK              0  */
  "-1": "file error",
  /* Z_ERRNO         (-1) */
  "-2": "stream error",
  /* Z_STREAM_ERROR  (-2) */
  "-3": "data error",
  /* Z_DATA_ERROR    (-3) */
  "-4": "insufficient memory",
  /* Z_MEM_ERROR     (-4) */
  "-5": "buffer error",
  /* Z_BUF_ERROR     (-5) */
  "-6": "incompatible version"
  /* Z_VERSION_ERROR (-6) */
}, Qt = {
  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN: 2,
  /* The deflate compression method */
  Z_DEFLATED: 8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};
const { _tr_init: Ya, _tr_stored_block: Ie, _tr_flush_block: Xa, _tr_tally: et, _tr_align: Ja } = Wa, {
  Z_NO_FLUSH: it,
  Z_PARTIAL_FLUSH: Qa,
  Z_FULL_FLUSH: tn,
  Z_FINISH: $,
  Z_BLOCK: Ye,
  Z_OK: L,
  Z_STREAM_END: Xe,
  Z_STREAM_ERROR: q,
  Z_DATA_ERROR: en,
  Z_BUF_ERROR: de,
  Z_DEFAULT_COMPRESSION: an,
  Z_FILTERED: nn,
  Z_HUFFMAN_ONLY: Zt,
  Z_RLE: sn,
  Z_FIXED: rn,
  Z_DEFAULT_STRATEGY: on,
  Z_UNKNOWN: hn,
  Z_DEFLATED: te
} = Qt, ln = 9, cn = 15, fn = 8, dn = 29, _n = 256, ve = _n + 1 + dn, un = 30, gn = 19, wn = 2 * ve + 1, pn = 15, I = 3, tt = 258, j = tt + I + 1, Sn = 32, Et = 42, Be = 57, Te = 69, ke = 73, De = 91, Me = 103, rt = 113, It = 666, O = 1, yt = 2, ht = 3, xt = 4, En = 3, ot = (e, i) => (e.msg = St[i], i), Je = (e) => e * 2 - (e > 4 ? 9 : 0), Q = (e) => {
  let i = e.length;
  for (; --i >= 0; )
    e[i] = 0;
}, mn = (e) => {
  let i, t, a, n = e.w_size;
  i = e.hash_size, a = i;
  do
    t = e.head[--a], e.head[a] = t >= n ? t - n : 0;
  while (--i);
  i = n, a = i;
  do
    t = e.prev[--a], e.prev[a] = t >= n ? t - n : 0;
  while (--i);
};
let Ne = (e, i, t) => (i << e.hash_shift ^ t) & e.hash_mask;
const lt = (e, i) => {
  let t;
  if (e.legacy_hash)
    t = e.ins_h = Ne(e, e.ins_h, e.window[i + I - 1]);
  else {
    const n = e.window, s = n[i] | n[i + 1] << 8 | n[i + 2] << 16 | n[i + 3] << 24;
    t = e.ins_h = Math.imul(s, 66521) + 66521 >>> 16 & e.hash_mask;
  }
  const a = e.prev[i & e.w_mask] = e.head[t];
  return e.head[t] = i, a;
}, B = (e) => {
  const i = e.state;
  let t = i.pending;
  t > e.avail_out && (t = e.avail_out), t !== 0 && (e.output.set(i.pending_buf.subarray(i.pending_out, i.pending_out + t), e.next_out), e.next_out += t, i.pending_out += t, e.total_out += t, e.avail_out -= t, i.pending -= t, i.pending === 0 && (i.pending_out = 0));
}, N = (e, i) => {
  Xa(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, i), e.block_start = e.strstart, B(e.strm);
}, v = (e, i) => {
  e.pending_buf[e.pending++] = i;
}, Rt = (e, i) => {
  e.pending_buf[e.pending++] = i >>> 8 & 255, e.pending_buf[e.pending++] = i & 255;
}, Ce = (e, i, t, a) => {
  let n = e.avail_in;
  return n > a && (n = a), n === 0 ? 0 : (e.avail_in -= n, i.set(e.input.subarray(e.next_in, e.next_in + n), t), e.state.wrap === 1 ? e.adler = Ut(e.adler, i, n, t) : e.state.wrap === 2 && (e.adler = C(e.adler, i, n, t)), e.next_in += n, e.total_in += n, n);
}, Qi = (e, i) => {
  let t = e.max_chain_length, a = e.strstart, n, s, r = e.prev_length, h = e.nice_match;
  const l = e.strstart > e.w_size - j ? e.strstart - (e.w_size - j) : 0, o = e.window, c = e.w_mask, u = e.prev, d = e.strstart + tt;
  let f = o[a + r - 1], g = o[a + r];
  e.prev_length >= e.good_match && (t >>= 2), h > e.lookahead && (h = e.lookahead);
  do
    if (n = i, !(o[n + r] !== g || o[n + r - 1] !== f || o[n] !== o[a] || o[++n] !== o[a + 1])) {
      a += 2, n++;
      do
        ;
      while (o[++a] === o[++n] && o[++a] === o[++n] && o[++a] === o[++n] && o[++a] === o[++n] && o[++a] === o[++n] && o[++a] === o[++n] && o[++a] === o[++n] && o[++a] === o[++n] && a < d);
      if (s = tt - (d - a), a = d - tt, s > r) {
        if (e.match_start = i, r = s, s >= h)
          break;
        f = o[a + r - 1], g = o[a + r];
      }
    }
  while ((i = u[i & c]) > l && --t !== 0);
  return r <= e.lookahead ? r : e.lookahead;
}, mt = (e) => {
  const i = e.w_size;
  let t, a, n;
  do {
    if (a = e.window_size - e.lookahead - e.strstart, e.strstart >= i + (i - j) && (e.window.set(e.window.subarray(i, i + i - a), 0), e.match_start -= i, e.strstart -= i, e.block_start -= i, e.insert > e.strstart && (e.insert = e.strstart), mn(e), a += i), e.strm.avail_in === 0)
      break;
    if (t = Ce(e.strm, e.window, e.strstart + e.lookahead, a), e.lookahead += t, e.legacy_hash) {
      if (e.lookahead + e.insert >= I)
        for (n = e.strstart - e.insert, e.ins_h = e.window[n], e.ins_h = Ne(e, e.ins_h, e.window[n + 1]); e.insert && (lt(e, n), n++, e.insert--, !(e.lookahead + e.insert < I)); )
          ;
    } else if (e.lookahead + e.insert > I)
      for (n = e.strstart - e.insert; e.insert && (lt(e, n), n++, e.insert--, !(e.lookahead + e.insert <= I)); )
        ;
  } while (e.lookahead < j && e.strm.avail_in !== 0);
}, ta = (e, i) => {
  let t = e.pending_buf_size - 5 > e.w_size ? e.w_size : e.pending_buf_size - 5, a, n, s, r = 0, h = e.strm.avail_in;
  do {
    if (a = 65535, s = e.bi_valid + 42 >> 3, e.strm.avail_out < s || (s = e.strm.avail_out - s, n = e.strstart - e.block_start, a > n + e.strm.avail_in && (a = n + e.strm.avail_in), a > s && (a = s), a < t && (a === 0 && i !== $ || i === it || a !== n + e.strm.avail_in)))
      break;
    r = i === $ && a === n + e.strm.avail_in ? 1 : 0, Ie(e, 0, 0, r), e.pending_buf[e.pending - 4] = a, e.pending_buf[e.pending - 3] = a >> 8, e.pending_buf[e.pending - 2] = ~a, e.pending_buf[e.pending - 1] = ~a >> 8, B(e.strm), n && (n > a && (n = a), e.strm.output.set(e.window.subarray(e.block_start, e.block_start + n), e.strm.next_out), e.strm.next_out += n, e.strm.avail_out -= n, e.strm.total_out += n, e.block_start += n, a -= n), a && (Ce(e.strm, e.strm.output, e.strm.next_out, a), e.strm.next_out += a, e.strm.avail_out -= a, e.strm.total_out += a);
  } while (r === 0);
  return h -= e.strm.avail_in, h && (h >= e.w_size ? (e.matches = 2, e.window.set(e.strm.input.subarray(e.strm.next_in - e.w_size, e.strm.next_in), 0), e.strstart = e.w_size, e.insert = e.strstart) : (e.window_size - e.strstart <= h && (e.strstart -= e.w_size, e.window.set(e.window.subarray(e.w_size, e.w_size + e.strstart), 0), e.matches < 2 && e.matches++, e.insert > e.strstart && (e.insert = e.strstart)), e.window.set(e.strm.input.subarray(e.strm.next_in - h, e.strm.next_in), e.strstart), e.strstart += h, e.insert += h > e.w_size - e.insert ? e.w_size - e.insert : h), e.block_start = e.strstart), e.high_water < e.strstart && (e.high_water = e.strstart), r ? xt : i !== it && i !== $ && e.strm.avail_in === 0 && e.strstart === e.block_start ? yt : (s = e.window_size - e.strstart, e.strm.avail_in > s && e.block_start >= e.w_size && (e.block_start -= e.w_size, e.strstart -= e.w_size, e.window.set(e.window.subarray(e.w_size, e.w_size + e.strstart), 0), e.matches < 2 && e.matches++, s += e.w_size, e.insert > e.strstart && (e.insert = e.strstart)), s > e.strm.avail_in && (s = e.strm.avail_in), s && (Ce(e.strm, e.window, e.strstart, s), e.strstart += s, e.insert += s > e.w_size - e.insert ? e.w_size - e.insert : s), e.high_water < e.strstart && (e.high_water = e.strstart), s = e.bi_valid + 42 >> 3, s = e.pending_buf_size - s > 65535 ? 65535 : e.pending_buf_size - s, t = s > e.w_size ? e.w_size : s, n = e.strstart - e.block_start, (n >= t || (n || i === $) && i !== it && e.strm.avail_in === 0 && n <= s) && (a = n > s ? s : n, r = i === $ && e.strm.avail_in === 0 && a === n ? 1 : 0, Ie(e, e.block_start, a, r), e.block_start += a, B(e.strm)), r ? ht : O);
}, _e = (e, i) => {
  let t, a;
  for (; ; ) {
    if (e.lookahead < j) {
      if (mt(e), e.lookahead < j && i === it)
        return O;
      if (e.lookahead === 0)
        break;
    }
    if (t = 0, e.lookahead >= I && (t = lt(e, e.strstart)), t !== 0 && e.strstart - t <= e.w_size - j && (e.match_length = Qi(e, t)), e.match_length >= I)
      if (a = et(e, e.strstart - e.match_start, e.match_length - I), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= I) {
        e.match_length--;
        do
          e.strstart++, t = lt(e, e.strstart);
        while (--e.match_length !== 0);
        e.strstart++;
      } else
        e.strstart += e.match_length, e.match_length = 0, e.legacy_hash && (e.ins_h = e.window[e.strstart], e.ins_h = Ne(e, e.ins_h, e.window[e.strstart + 1]));
    else
      a = et(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
    if (a && (N(e, !1), e.strm.avail_out === 0))
      return O;
  }
  return e.insert = e.strstart < I - 1 ? e.strstart : I - 1, i === $ ? (N(e, !0), e.strm.avail_out === 0 ? ht : xt) : e.sym_next && (N(e, !1), e.strm.avail_out === 0) ? O : yt;
}, ut = (e, i) => {
  let t, a, n;
  for (; ; ) {
    if (e.lookahead < j) {
      if (mt(e), e.lookahead < j && i === it)
        return O;
      if (e.lookahead === 0)
        break;
    }
    if (t = 0, e.lookahead >= I && (t = lt(e, e.strstart)), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = I - 1, t !== 0 && e.prev_length < e.max_lazy_match && e.strstart - t <= e.w_size - j && (e.match_length = Qi(e, t), e.match_length <= 5 && (e.strategy === nn || e.match_length === I && e.strstart - e.match_start > 4096) && (e.match_length = I - 1)), e.prev_length >= I && e.match_length <= e.prev_length) {
      n = e.strstart + e.lookahead - I, a = et(e, e.strstart - 1 - e.prev_match, e.prev_length - I), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
      do
        ++e.strstart <= n && (t = lt(e, e.strstart));
      while (--e.prev_length !== 0);
      if (e.match_available = 0, e.match_length = I - 1, e.strstart++, a && (N(e, !1), e.strm.avail_out === 0))
        return O;
    } else if (e.match_available) {
      if (a = et(e, 0, e.window[e.strstart - 1]), a && N(e, !1), e.strstart++, e.lookahead--, e.strm.avail_out === 0)
        return O;
    } else
      e.match_available = 1, e.strstart++, e.lookahead--;
  }
  return e.match_available && (a = et(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = e.strstart < I - 1 ? e.strstart : I - 1, i === $ ? (N(e, !0), e.strm.avail_out === 0 ? ht : xt) : e.sym_next && (N(e, !1), e.strm.avail_out === 0) ? O : yt;
}, bn = (e, i) => {
  let t, a, n, s;
  const r = e.window;
  for (; ; ) {
    if (e.lookahead <= tt) {
      if (mt(e), e.lookahead <= tt && i === it)
        return O;
      if (e.lookahead === 0)
        break;
    }
    if (e.match_length = 0, e.lookahead >= I && e.strstart > 0 && (n = e.strstart - 1, a = r[n], a === r[++n] && a === r[++n] && a === r[++n])) {
      s = e.strstart + tt;
      do
        ;
      while (a === r[++n] && a === r[++n] && a === r[++n] && a === r[++n] && a === r[++n] && a === r[++n] && a === r[++n] && a === r[++n] && n < s);
      e.match_length = tt - (s - n), e.match_length > e.lookahead && (e.match_length = e.lookahead);
    }
    if (e.match_length >= I ? (t = et(e, 1, e.match_length - I), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (t = et(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), t && (N(e, !1), e.strm.avail_out === 0))
      return O;
  }
  return e.insert = 0, i === $ ? (N(e, !0), e.strm.avail_out === 0 ? ht : xt) : e.sym_next && (N(e, !1), e.strm.avail_out === 0) ? O : yt;
}, An = (e, i) => {
  let t;
  for (; ; ) {
    if (e.lookahead === 0 && (mt(e), e.lookahead === 0)) {
      if (i === it)
        return O;
      break;
    }
    if (e.match_length = 0, t = et(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, t && (N(e, !1), e.strm.avail_out === 0))
      return O;
  }
  return e.insert = 0, i === $ ? (N(e, !0), e.strm.avail_out === 0 ? ht : xt) : e.sym_next && (N(e, !1), e.strm.avail_out === 0) ? O : yt;
};
function Z(e, i, t, a, n) {
  this.good_length = e, this.max_lazy = i, this.nice_length = t, this.max_chain = a, this.func = n;
}
const vt = [
  /*      good lazy nice chain */
  new Z(0, 0, 0, 0, ta),
  /* 0 store only */
  new Z(4, 4, 8, 4, _e),
  /* 1 max speed, no lazy matches */
  new Z(4, 5, 16, 8, _e),
  /* 2 */
  new Z(4, 6, 32, 32, _e),
  /* 3 */
  new Z(4, 4, 16, 16, ut),
  /* 4 lazy matches */
  new Z(8, 16, 32, 32, ut),
  /* 5 */
  new Z(8, 16, 128, 128, ut),
  /* 6 */
  new Z(8, 32, 128, 256, ut),
  /* 7 */
  new Z(32, 128, 258, 1024, ut),
  /* 8 */
  new Z(32, 258, 258, 4096, ut)
  /* 9 max compression */
], yn = (e) => {
  e.window_size = 2 * e.w_size, Q(e.head), e.max_lazy_match = vt[e.level].max_lazy, e.good_match = vt[e.level].good_length, e.nice_match = vt[e.level].nice_length, e.max_chain_length = vt[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = I - 1, e.match_available = 0, e.ins_h = 0;
};
function xn() {
  this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = te, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.legacy_hash = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(wn * 2), this.dyn_dtree = new Uint16Array((2 * un + 1) * 2), this.bl_tree = new Uint16Array((2 * gn + 1) * 2), Q(this.dyn_ltree), Q(this.dyn_dtree), Q(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Uint16Array(pn + 1), this.heap = new Uint16Array(2 * ve + 1), Q(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Uint16Array(2 * ve + 1), Q(this.depth), this.sym_buf = 0, this.lit_bufsize = 0, this.sym_next = 0, this.sym_end = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
}
const zt = (e) => {
  if (!e)
    return 1;
  const i = e.state;
  return !i || i.strm !== e || i.status !== Et && //#ifdef GZIP
  i.status !== Be && //#endif
  i.status !== Te && i.status !== ke && i.status !== De && i.status !== Me && i.status !== rt && i.status !== It ? 1 : 0;
}, ea = (e) => {
  if (zt(e))
    return ot(e, q);
  e.total_in = e.total_out = 0, e.data_type = hn;
  const i = e.state;
  return i.pending = 0, i.pending_out = 0, i.wrap < 0 && (i.wrap = -i.wrap), i.status = //#ifdef GZIP
  i.wrap === 2 ? Be : (
    //#endif
    i.wrap ? Et : rt
  ), e.adler = i.wrap === 2 ? 0 : 1, i.last_flush = -2, Ya(i), L;
}, ia = (e) => {
  const i = ea(e);
  return i === L && yn(e.state), i;
}, Rn = (e, i) => zt(e) || e.state.wrap !== 2 ? q : (e.state.gzhead = i, L), aa = (e, i, t, a, n, s, r) => {
  if (!e)
    return q;
  let h = 1;
  if (i === an && (i = 6), a < 0 ? (h = 0, a = -a) : a > 15 && (h = 2, a -= 16), n < 1 || n > ln || t !== te || a < 8 || a > 15 || i < 0 || i > 9 || s < 0 || s > rn || a === 8 && h !== 1)
    return ot(e, q);
  a === 8 && (a = 9);
  const l = new xn();
  return e.state = l, l.strm = e, l.status = Et, l.wrap = h, l.gzhead = null, l.w_bits = a, l.w_size = 1 << l.w_bits, l.w_mask = l.w_size - 1, l.legacy_hash = r ? 1 : 0, l.hash_bits = n + 7, !l.legacy_hash && l.hash_bits < 15 && (l.hash_bits = 15), l.hash_size = 1 << l.hash_bits, l.hash_mask = l.hash_size - 1, l.hash_shift = ~~((l.hash_bits + I - 1) / I), l.window = new Uint8Array(l.w_size * 2), l.head = new Uint16Array(l.hash_size), l.prev = new Uint16Array(l.w_size), l.lit_bufsize = 1 << n + 6, l.pending_buf_size = l.lit_bufsize * 4, l.pending_buf = new Uint8Array(l.pending_buf_size), l.sym_buf = l.lit_bufsize, l.sym_end = (l.lit_bufsize - 1) * 3, l.level = i, l.strategy = s, l.method = t, ia(e);
}, In = (e, i) => aa(e, i, te, cn, fn, on), vn = (e, i) => {
  if (zt(e) || i > Ye || i < 0)
    return e ? ot(e, q) : q;
  const t = e.state;
  if (!e.output || e.avail_in !== 0 && !e.input || t.status === It && i !== $)
    return ot(e, e.avail_out === 0 ? de : q);
  const a = t.last_flush;
  if (t.last_flush = i, t.pending !== 0) {
    if (B(e), e.avail_out === 0)
      return t.last_flush = -1, L;
  } else if (e.avail_in === 0 && Je(i) <= Je(a) && i !== $)
    return ot(e, de);
  if (t.status === It && e.avail_in !== 0)
    return ot(e, de);
  if (t.status === Et && t.wrap === 0 && (t.status = rt), t.status === Et) {
    let n = te + (t.w_bits - 8 << 4) << 8, s = -1;
    if (t.strategy >= Zt || t.level < 2 ? s = 0 : t.level < 6 ? s = 1 : t.level === 6 ? s = 2 : s = 3, n |= s << 6, t.strstart !== 0 && (n |= Sn), n += 31 - n % 31, Rt(t, n), t.strstart !== 0 && (Rt(t, e.adler >>> 16), Rt(t, e.adler & 65535)), e.adler = 1, t.status = rt, B(e), t.pending !== 0)
      return t.last_flush = -1, L;
  }
  if (t.status === Be) {
    if (e.adler = 0, v(t, 31), v(t, 139), v(t, 8), t.gzhead)
      v(
        t,
        (t.gzhead.text ? 1 : 0) + (t.gzhead.hcrc ? 2 : 0) + (t.gzhead.extra ? 4 : 0) + (t.gzhead.name ? 8 : 0) + (t.gzhead.comment ? 16 : 0)
      ), v(t, t.gzhead.time & 255), v(t, t.gzhead.time >> 8 & 255), v(t, t.gzhead.time >> 16 & 255), v(t, t.gzhead.time >> 24 & 255), v(t, t.level === 9 ? 2 : t.strategy >= Zt || t.level < 2 ? 4 : 0), v(t, t.gzhead.os & 255), t.gzhead.extra && t.gzhead.extra.length && (v(t, t.gzhead.extra.length & 255), v(t, t.gzhead.extra.length >> 8 & 255)), t.gzhead.hcrc && (e.adler = C(e.adler, t.pending_buf, t.pending, 0)), t.gzindex = 0, t.status = Te;
    else if (v(t, 0), v(t, 0), v(t, 0), v(t, 0), v(t, 0), v(t, t.level === 9 ? 2 : t.strategy >= Zt || t.level < 2 ? 4 : 0), v(t, En), t.status = rt, B(e), t.pending !== 0)
      return t.last_flush = -1, L;
  }
  if (t.status === Te) {
    if (t.gzhead.extra) {
      let n = t.pending, s = (t.gzhead.extra.length & 65535) - t.gzindex;
      for (; t.pending + s > t.pending_buf_size; ) {
        let h = t.pending_buf_size - t.pending;
        if (t.pending_buf.set(t.gzhead.extra.subarray(t.gzindex, t.gzindex + h), t.pending), t.pending = t.pending_buf_size, t.gzhead.hcrc && t.pending > n && (e.adler = C(e.adler, t.pending_buf, t.pending - n, n)), t.gzindex += h, B(e), t.pending !== 0)
          return t.last_flush = -1, L;
        n = 0, s -= h;
      }
      let r = new Uint8Array(t.gzhead.extra);
      t.pending_buf.set(r.subarray(t.gzindex, t.gzindex + s), t.pending), t.pending += s, t.gzhead.hcrc && t.pending > n && (e.adler = C(e.adler, t.pending_buf, t.pending - n, n)), t.gzindex = 0;
    }
    t.status = ke;
  }
  if (t.status === ke) {
    if (t.gzhead.name) {
      let n = t.pending, s;
      do {
        if (t.pending === t.pending_buf_size) {
          if (t.gzhead.hcrc && t.pending > n && (e.adler = C(e.adler, t.pending_buf, t.pending - n, n)), B(e), t.pending !== 0)
            return t.last_flush = -1, L;
          n = 0;
        }
        t.gzindex < t.gzhead.name.length ? s = t.gzhead.name.charCodeAt(t.gzindex++) & 255 : s = 0, v(t, s);
      } while (s !== 0);
      t.gzhead.hcrc && t.pending > n && (e.adler = C(e.adler, t.pending_buf, t.pending - n, n)), t.gzindex = 0;
    }
    t.status = De;
  }
  if (t.status === De) {
    if (t.gzhead.comment) {
      let n = t.pending, s;
      do {
        if (t.pending === t.pending_buf_size) {
          if (t.gzhead.hcrc && t.pending > n && (e.adler = C(e.adler, t.pending_buf, t.pending - n, n)), B(e), t.pending !== 0)
            return t.last_flush = -1, L;
          n = 0;
        }
        t.gzindex < t.gzhead.comment.length ? s = t.gzhead.comment.charCodeAt(t.gzindex++) & 255 : s = 0, v(t, s);
      } while (s !== 0);
      t.gzhead.hcrc && t.pending > n && (e.adler = C(e.adler, t.pending_buf, t.pending - n, n));
    }
    t.status = Me;
  }
  if (t.status === Me) {
    if (t.gzhead.hcrc) {
      if (t.pending + 2 > t.pending_buf_size && (B(e), t.pending !== 0))
        return t.last_flush = -1, L;
      v(t, e.adler & 255), v(t, e.adler >> 8 & 255), e.adler = 0;
    }
    if (t.status = rt, B(e), t.pending !== 0)
      return t.last_flush = -1, L;
  }
  if (e.avail_in !== 0 || t.lookahead !== 0 || i !== it && t.status !== It) {
    let n = t.level === 0 ? ta(t, i) : t.strategy === Zt ? An(t, i) : t.strategy === sn ? bn(t, i) : vt[t.level].func(t, i);
    if ((n === ht || n === xt) && (t.status = It), n === O || n === ht)
      return e.avail_out === 0 && (t.last_flush = -1), L;
    if (n === yt && (i === Qa ? Ja(t) : i !== Ye && (Ie(t, 0, 0, !1), i === tn && (Q(t.head), t.lookahead === 0 && (t.strstart = 0, t.block_start = 0, t.insert = 0))), B(e), e.avail_out === 0))
      return t.last_flush = -1, L;
  }
  return i !== $ ? L : t.wrap <= 0 ? Xe : (t.wrap === 2 ? (v(t, e.adler & 255), v(t, e.adler >> 8 & 255), v(t, e.adler >> 16 & 255), v(t, e.adler >> 24 & 255), v(t, e.total_in & 255), v(t, e.total_in >> 8 & 255), v(t, e.total_in >> 16 & 255), v(t, e.total_in >> 24 & 255)) : (Rt(t, e.adler >>> 16), Rt(t, e.adler & 65535)), B(e), t.wrap > 0 && (t.wrap = -t.wrap), t.pending !== 0 ? L : Xe);
}, Tn = (e) => {
  if (zt(e))
    return q;
  const i = e.state.status;
  return e.state = null, i === rt ? ot(e, en) : L;
}, kn = (e, i) => {
  let t = i.length;
  if (zt(e))
    return q;
  const a = e.state, n = a.wrap;
  if (n === 2 || n === 1 && a.status !== Et || a.lookahead)
    return q;
  if (n === 1 && (e.adler = Ut(e.adler, i, t, 0)), a.wrap = 0, t >= a.w_size) {
    n === 0 && (Q(a.head), a.strstart = 0, a.block_start = 0, a.insert = 0);
    let l = new Uint8Array(a.w_size);
    l.set(i.subarray(t - a.w_size, t), 0), i = l, t = a.w_size;
  }
  const s = e.avail_in, r = e.next_in, h = e.input;
  for (e.avail_in = t, e.next_in = 0, e.input = i, mt(a); a.lookahead >= I; ) {
    let l = a.strstart, o = a.lookahead - (I - 1);
    do
      lt(a, l), l++;
    while (--o);
    a.strstart = l, a.lookahead = I - 1, mt(a);
  }
  return a.strstart += a.lookahead, a.block_start = a.strstart, a.insert = a.lookahead, a.lookahead = 0, a.match_length = a.prev_length = I - 1, a.match_available = 0, e.next_in = r, e.input = h, e.avail_in = s, a.wrap = n, L;
};
var Dn = In, Mn = aa, Cn = ia, Ln = ea, On = Rn, Fn = vn, Pn = Tn, Un = kn, Bn = "pako deflate (from Nodeca project)", kt = {
  deflateInit: Dn,
  deflateInit2: Mn,
  deflateReset: Cn,
  deflateResetKeep: Ln,
  deflateSetHeader: On,
  deflate: Fn,
  deflateEnd: Pn,
  deflateSetDictionary: Un,
  deflateInfo: Bn
};
const Nn = (e, i) => Object.prototype.hasOwnProperty.call(e, i);
var Hn = function(e) {
  const i = Array.prototype.slice.call(arguments, 1);
  for (; i.length; ) {
    const t = i.shift();
    if (t) {
      if (typeof t != "object")
        throw new TypeError(t + "must be non-object");
      for (const a in t)
        Nn(t, a) && (e[a] = t[a]);
    }
  }
  return e;
}, zn = (e) => {
  let i = 0;
  for (let a = 0, n = e.length; a < n; a++)
    i += e[a].length;
  const t = new Uint8Array(i);
  for (let a = 0, n = 0, s = e.length; a < s; a++) {
    let r = e[a];
    t.set(r, n), n += r.length;
  }
  return t;
}, ee = {
  assign: Hn,
  flattenChunks: zn
};
let na = !0;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  na = !1;
}
const Bt = new Uint8Array(256);
for (let e = 0; e < 256; e++)
  Bt[e] = e >= 252 ? 6 : e >= 248 ? 5 : e >= 240 ? 4 : e >= 224 ? 3 : e >= 192 ? 2 : 1;
Bt[254] = Bt[255] = 1;
var $n = (e) => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
    return new TextEncoder().encode(e);
  let i, t, a, n, s, r = e.length, h = 0;
  for (n = 0; n < r; n++)
    t = e.charCodeAt(n), (t & 64512) === 55296 && n + 1 < r && (a = e.charCodeAt(n + 1), (a & 64512) === 56320 && (t = 65536 + (t - 55296 << 10) + (a - 56320), n++)), h += t < 128 ? 1 : t < 2048 ? 2 : t < 65536 ? 3 : 4;
  for (i = new Uint8Array(h), s = 0, n = 0; s < h; n++)
    t = e.charCodeAt(n), (t & 64512) === 55296 && n + 1 < r && (a = e.charCodeAt(n + 1), (a & 64512) === 56320 && (t = 65536 + (t - 55296 << 10) + (a - 56320), n++)), t < 128 ? i[s++] = t : t < 2048 ? (i[s++] = 192 | t >>> 6, i[s++] = 128 | t & 63) : t < 65536 ? (i[s++] = 224 | t >>> 12, i[s++] = 128 | t >>> 6 & 63, i[s++] = 128 | t & 63) : (i[s++] = 240 | t >>> 18, i[s++] = 128 | t >>> 12 & 63, i[s++] = 128 | t >>> 6 & 63, i[s++] = 128 | t & 63);
  return i;
};
const Gn = (e, i) => {
  if (i < 65534 && e.subarray && na)
    return String.fromCharCode.apply(null, e.length === i ? e : e.subarray(0, i));
  let t = "";
  for (let a = 0; a < i; a++)
    t += String.fromCharCode(e[a]);
  return t;
};
var Zn = (e, i) => {
  const t = i || e.length;
  if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
    return new TextDecoder().decode(e.subarray(0, i));
  let a, n;
  const s = new Array(t * 2);
  for (n = 0, a = 0; a < t; ) {
    let r = e[a++];
    if (r < 128) {
      s[n++] = r;
      continue;
    }
    let h = Bt[r];
    if (h > 4) {
      s[n++] = 65533, a += h - 1;
      continue;
    }
    for (r &= h === 2 ? 31 : h === 3 ? 15 : 7; h > 1 && a < t; )
      r = r << 6 | e[a++] & 63, h--;
    if (h > 1) {
      s[n++] = 65533;
      continue;
    }
    r < 65536 ? s[n++] = r : (r -= 65536, s[n++] = 55296 | r >> 10 & 1023, s[n++] = 56320 | r & 1023);
  }
  return Gn(s, n);
}, Wn = (e, i) => {
  i = i || e.length, i > e.length && (i = e.length);
  let t = i - 1;
  for (; t >= 0 && (e[t] & 192) === 128; )
    t--;
  return t < 0 || t === 0 ? i : t + Bt[e[t]] > i ? t : i;
}, Nt = {
  string2buf: $n,
  buf2string: Zn,
  utf8border: Wn
};
function Kn() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var sa = Kn;
const ra = Object.prototype.toString, {
  Z_NO_FLUSH: qn,
  Z_SYNC_FLUSH: jn,
  Z_FULL_FLUSH: Vn,
  Z_FINISH: Yn,
  Z_OK: Xt,
  Z_STREAM_END: Xn,
  Z_DEFAULT_COMPRESSION: Jn,
  Z_DEFAULT_STRATEGY: Qn,
  Z_DEFLATED: ts
} = Qt, es = {
  level: Jn,
  method: ts,
  chunkSize: 16384,
  windowBits: 15,
  memLevel: 8,
  strategy: Qn,
  legacyHash: !0
};
function ie(e) {
  this.options = ee.assign({}, es, e || {});
  let i = this.options;
  i.raw && i.windowBits > 0 ? i.windowBits = -i.windowBits : i.gzip && i.windowBits > 0 && i.windowBits < 16 && (i.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new sa(), this.strm.avail_out = 0;
  let t = kt.deflateInit2(
    this.strm,
    i.level,
    i.method,
    i.windowBits,
    i.memLevel,
    i.strategy,
    i.legacyHash
  );
  if (t !== Xt)
    throw new Error(St[t]);
  if (i.header && kt.deflateSetHeader(this.strm, i.header), i.dictionary) {
    let a;
    if (typeof i.dictionary == "string" ? a = Nt.string2buf(i.dictionary) : ra.call(i.dictionary) === "[object ArrayBuffer]" ? a = new Uint8Array(i.dictionary) : a = i.dictionary, t = kt.deflateSetDictionary(this.strm, a), t !== Xt)
      throw new Error(St[t]);
    this._dict_set = !0;
  }
}
ie.prototype.push = function(e, i) {
  const t = this.strm, a = this.options.chunkSize;
  let n, s;
  if (this.ended)
    return !1;
  for (i === ~~i ? s = i : s = i === !0 ? Yn : qn, typeof e == "string" ? t.input = Nt.string2buf(e) : ra.call(e) === "[object ArrayBuffer]" ? t.input = new Uint8Array(e) : t.input = e, t.next_in = 0, t.avail_in = t.input.length; ; ) {
    if (t.avail_out === 0 && (t.output = new Uint8Array(a), t.next_out = 0, t.avail_out = a), (s === jn || s === Vn) && t.avail_out <= 6) {
      this.onData(t.output.subarray(0, t.next_out)), t.avail_out = 0;
      continue;
    }
    if (n = kt.deflate(t, s), n === Xn)
      return t.next_out > 0 && this.onData(t.output.subarray(0, t.next_out)), n = kt.deflateEnd(this.strm), this.onEnd(n), this.ended = !0, n === Xt;
    if (t.avail_out === 0) {
      this.onData(t.output);
      continue;
    }
    if (s > 0 && t.next_out > 0) {
      this.onData(t.output.subarray(0, t.next_out)), t.avail_out = 0;
      continue;
    }
    if (t.avail_in === 0) break;
  }
  return !0;
};
ie.prototype.onData = function(e) {
  this.chunks.push(e);
};
ie.prototype.onEnd = function(e) {
  e === Xt && (this.result = ee.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
};
function is(e, i) {
  const t = new ie(i);
  if (t.push(e, !0), t.err)
    throw t.msg || St[t.err];
  return t.result;
}
var as = is, ns = {
  deflate: as
};
const Wt = 16209, ss = 16191;
var rs = function(i, t) {
  let a, n, s, r, h, l, o, c, u, d, f, g, A, p, b, S, E, _, R, D, w, k, x, m;
  const y = i.state;
  a = i.next_in, x = i.input, n = a + (i.avail_in - 5), s = i.next_out, m = i.output, r = s - (t - i.avail_out), h = s + (i.avail_out - 257), l = y.dmax, o = y.wsize, c = y.whave, u = y.wnext, d = y.window, f = y.hold, g = y.bits, A = y.lencode, p = y.distcode, b = (1 << y.lenbits) - 1, S = (1 << y.distbits) - 1;
  t:
    do {
      g < 15 && (f += x[a++] << g, g += 8, f += x[a++] << g, g += 8), E = A[f & b];
      e:
        for (; ; ) {
          if (_ = E >>> 24, f >>>= _, g -= _, _ = E >>> 16 & 255, _ === 0)
            m[s++] = E & 65535;
          else if (_ & 16) {
            R = E & 65535, _ &= 15, _ && (g < _ && (f += x[a++] << g, g += 8), R += f & (1 << _) - 1, f >>>= _, g -= _), g < 15 && (f += x[a++] << g, g += 8, f += x[a++] << g, g += 8), E = p[f & S];
            i:
              for (; ; ) {
                if (_ = E >>> 24, f >>>= _, g -= _, _ = E >>> 16 & 255, _ & 16) {
                  if (D = E & 65535, _ &= 15, g < _ && (f += x[a++] << g, g += 8, g < _ && (f += x[a++] << g, g += 8)), D += f & (1 << _) - 1, D > l) {
                    i.msg = "invalid distance too far back", y.mode = Wt;
                    break t;
                  }
                  if (f >>>= _, g -= _, _ = s - r, D > _) {
                    if (_ = D - _, _ > c && y.sane) {
                      i.msg = "invalid distance too far back", y.mode = Wt;
                      break t;
                    }
                    if (w = 0, k = d, u === 0) {
                      if (w += o - _, _ < R) {
                        R -= _;
                        do
                          m[s++] = d[w++];
                        while (--_);
                        w = s - D, k = m;
                      }
                    } else if (u < _) {
                      if (w += o + u - _, _ -= u, _ < R) {
                        R -= _;
                        do
                          m[s++] = d[w++];
                        while (--_);
                        if (w = 0, u < R) {
                          _ = u, R -= _;
                          do
                            m[s++] = d[w++];
                          while (--_);
                          w = s - D, k = m;
                        }
                      }
                    } else if (w += u - _, _ < R) {
                      R -= _;
                      do
                        m[s++] = d[w++];
                      while (--_);
                      w = s - D, k = m;
                    }
                    for (; R > 2; )
                      m[s++] = k[w++], m[s++] = k[w++], m[s++] = k[w++], R -= 3;
                    R && (m[s++] = k[w++], R > 1 && (m[s++] = k[w++]));
                  } else {
                    w = s - D;
                    do
                      m[s++] = m[w++], m[s++] = m[w++], m[s++] = m[w++], R -= 3;
                    while (R > 2);
                    R && (m[s++] = m[w++], R > 1 && (m[s++] = m[w++]));
                  }
                } else if (_ & 64) {
                  i.msg = "invalid distance code", y.mode = Wt;
                  break t;
                } else {
                  E = p[(E & 65535) + (f & (1 << _) - 1)];
                  continue i;
                }
                break;
              }
          } else if (_ & 64)
            if (_ & 32) {
              y.mode = ss;
              break t;
            } else {
              i.msg = "invalid literal/length code", y.mode = Wt;
              break t;
            }
          else {
            E = A[(E & 65535) + (f & (1 << _) - 1)];
            continue e;
          }
          break;
        }
    } while (a < n && s < h);
  R = g >> 3, a -= R, g -= R << 3, f &= (1 << g) - 1, i.next_in = a, i.next_out = s, i.avail_in = a < n ? 5 + (n - a) : 5 - (a - n), i.avail_out = s < h ? 257 + (h - s) : 257 - (s - h), y.hold = f, y.bits = g;
};
const gt = 15, Qe = 852, ti = 592, ei = 0, ue = 1, ii = 2, os = new Uint16Array([
  /* Length codes 257..285 base */
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
]), hs = new Uint8Array([
  /* Length codes 257..285 extra */
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  199,
  75
]), ls = new Uint16Array([
  /* Distance codes 0..29 base */
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
]), cs = new Uint8Array([
  /* Distance codes 0..29 extra */
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
]), fs = (e, i, t, a, n, s, r, h) => {
  const l = h.bits;
  let o = 0, c = 0, u = 0, d = 0, f = 0, g = 0, A = 0, p = 0, b = 0, S = 0, E, _, R, D, w, k = null, x;
  const m = new Uint16Array(gt + 1), y = new Uint16Array(gt + 1);
  let H = null, Gt, P, U;
  for (o = 0; o <= gt; o++)
    m[o] = 0;
  for (c = 0; c < a; c++)
    m[i[t + c]]++;
  for (f = l, d = gt; d >= 1 && m[d] === 0; d--)
    ;
  if (f > d && (f = d), d === 0)
    return n[s++] = 1 << 24 | 64 << 16 | 0, n[s++] = 1 << 24 | 64 << 16 | 0, h.bits = 1, 0;
  for (u = 1; u < d && m[u] === 0; u++)
    ;
  for (f < u && (f = u), p = 1, o = 1; o <= gt; o++)
    if (p <<= 1, p -= m[o], p < 0)
      return -1;
  if (p > 0 && (e === ei || d !== 1))
    return -1;
  for (y[1] = 0, o = 1; o < gt; o++)
    y[o + 1] = y[o] + m[o];
  for (c = 0; c < a; c++)
    i[t + c] !== 0 && (r[y[i[t + c]]++] = c);
  if (e === ei ? (k = H = r, x = 20) : e === ue ? (k = os, H = hs, x = 257) : (k = ls, H = cs, x = 0), S = 0, c = 0, o = u, w = s, g = f, A = 0, R = -1, b = 1 << f, D = b - 1, e === ue && b > Qe || e === ii && b > ti)
    return 1;
  for (; ; ) {
    Gt = o - A, r[c] + 1 < x ? (P = 0, U = r[c]) : r[c] >= x ? (P = H[r[c] - x], U = k[r[c] - x]) : (P = 96, U = 0), E = 1 << o - A, _ = 1 << g, u = _;
    do
      _ -= E, n[w + (S >> A) + _] = Gt << 24 | P << 16 | U | 0;
    while (_ !== 0);
    for (E = 1 << o - 1; S & E; )
      E >>= 1;
    if (E !== 0 ? (S &= E - 1, S += E) : S = 0, c++, --m[o] === 0) {
      if (o === d)
        break;
      o = i[t + r[c]];
    }
    if (o > f && (S & D) !== R) {
      for (A === 0 && (A = f), w += u, g = o - A, p = 1 << g; g + A < d && (p -= m[g + A], !(p <= 0)); )
        g++, p <<= 1;
      if (b += 1 << g, e === ue && b > Qe || e === ii && b > ti)
        return 1;
      R = S & D, n[R] = f << 24 | g << 16 | w - s | 0;
    }
  }
  return S !== 0 && (n[w + S] = o - A << 24 | 64 << 16 | 0), h.bits = f, 0;
};
var Dt = fs;
const ds = 0, oa = 1, ha = 2, {
  Z_FINISH: ai,
  Z_BLOCK: _s,
  Z_TREES: Kt,
  Z_OK: ct,
  Z_STREAM_END: us,
  Z_NEED_DICT: gs,
  Z_STREAM_ERROR: G,
  Z_DATA_ERROR: la,
  Z_MEM_ERROR: ca,
  Z_BUF_ERROR: ws,
  Z_DEFLATED: ni
} = Qt, ae = 16180, si = 16181, ri = 16182, oi = 16183, hi = 16184, li = 16185, ci = 16186, fi = 16187, di = 16188, _i = 16189, Jt = 16190, V = 16191, ge = 16192, ui = 16193, we = 16194, gi = 16195, wi = 16196, pi = 16197, Si = 16198, qt = 16199, jt = 16200, Ei = 16201, mi = 16202, bi = 16203, Ai = 16204, yi = 16205, pe = 16206, xi = 16207, Ri = 16208, M = 16209, fa = 16210, da = 16211, ps = 852, Ss = 592, Es = 15, ms = Es, Ii = (e) => (e >>> 24 & 255) + (e >>> 8 & 65280) + ((e & 65280) << 8) + ((e & 255) << 24);
function bs() {
  this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
const dt = (e) => {
  if (!e)
    return 1;
  const i = e.state;
  return !i || i.strm !== e || i.mode < ae || i.mode > da ? 1 : 0;
}, _a = (e) => {
  if (dt(e))
    return G;
  const i = e.state;
  return e.total_in = e.total_out = i.total = 0, e.msg = "", i.wrap && (e.adler = i.wrap & 1), i.mode = ae, i.last = 0, i.havedict = 0, i.flags = -1, i.dmax = 32768, i.head = null, i.hold = 0, i.bits = 0, i.lencode = i.lendyn = new Int32Array(ps), i.distcode = i.distdyn = new Int32Array(Ss), i.sane = 1, i.back = -1, ct;
}, ua = (e) => {
  if (dt(e))
    return G;
  const i = e.state;
  return i.wsize = 0, i.whave = 0, i.wnext = 0, _a(e);
}, ga = (e, i) => {
  let t;
  if (dt(e))
    return G;
  const a = e.state;
  return i < 0 ? (t = 0, i = -i) : (t = (i >> 4) + 5, i < 48 && (i &= 15)), i && (i < 8 || i > 15) ? G : (a.window !== null && a.wbits !== i && (a.window = null), a.wrap = t, a.wbits = i, ua(e));
}, wa = (e, i) => {
  if (!e)
    return G;
  const t = new bs();
  e.state = t, t.strm = e, t.window = null, t.mode = ae;
  const a = ga(e, i);
  return a !== ct && (e.state = null), a;
}, As = (e) => wa(e, ms);
let vi = !0, Se, Ee;
const ys = (e) => {
  if (vi) {
    Se = new Int32Array(512), Ee = new Int32Array(32);
    let i = 0;
    for (; i < 144; )
      e.lens[i++] = 8;
    for (; i < 256; )
      e.lens[i++] = 9;
    for (; i < 280; )
      e.lens[i++] = 7;
    for (; i < 288; )
      e.lens[i++] = 8;
    for (Dt(oa, e.lens, 0, 288, Se, 0, e.work, { bits: 9 }), i = 0; i < 32; )
      e.lens[i++] = 5;
    Dt(ha, e.lens, 0, 32, Ee, 0, e.work, { bits: 5 }), vi = !1;
  }
  e.lencode = Se, e.lenbits = 9, e.distcode = Ee, e.distbits = 5;
}, pa = (e, i, t, a) => {
  let n;
  const s = e.state;
  return s.window === null && (s.window = new Uint8Array(1 << s.wbits)), s.wsize === 0 && (s.wsize = 1 << s.wbits, s.wnext = 0, s.whave = 0), a >= s.wsize ? (s.window.set(i.subarray(t - s.wsize, t), 0), s.wnext = 0, s.whave = s.wsize) : (n = s.wsize - s.wnext, n > a && (n = a), s.window.set(i.subarray(t - a, t - a + n), s.wnext), a -= n, a ? (s.window.set(i.subarray(t - a, t), 0), s.wnext = a, s.whave = s.wsize) : (s.wnext += n, s.wnext === s.wsize && (s.wnext = 0), s.whave < s.wsize && (s.whave += n))), 0;
}, xs = (e, i) => {
  let t, a, n, s, r, h, l, o, c, u, d, f, g, A, p = 0, b, S, E, _, R, D, w, k;
  const x = new Uint8Array(4);
  let m, y;
  const H = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (dt(e) || !e.output || !e.input && e.avail_in !== 0)
    return G;
  t = e.state, t.mode === V && (t.mode = ge), r = e.next_out, n = e.output, l = e.avail_out, s = e.next_in, a = e.input, h = e.avail_in, o = t.hold, c = t.bits, u = h, d = l, k = ct;
  t:
    for (; ; )
      switch (t.mode) {
        case ae:
          if (t.wrap === 0) {
            t.mode = ge;
            break;
          }
          for (; c < 16; ) {
            if (h === 0)
              break t;
            h--, o += a[s++] << c, c += 8;
          }
          if (t.wrap & 2 && o === 35615) {
            t.wbits === 0 && (t.wbits = 15), t.check = 0, x[0] = o & 255, x[1] = o >>> 8 & 255, t.check = C(t.check, x, 2, 0), o = 0, c = 0, t.mode = si;
            break;
          }
          if (t.head && (t.head.done = !1), !(t.wrap & 1) || /* check if zlib header allowed */
          (((o & 255) << 8) + (o >> 8)) % 31) {
            e.msg = "incorrect header check", t.mode = M;
            break;
          }
          if ((o & 15) !== ni) {
            e.msg = "unknown compression method", t.mode = M;
            break;
          }
          if (o >>>= 4, c -= 4, w = (o & 15) + 8, t.wbits === 0 && (t.wbits = w), w > 15 || w > t.wbits) {
            e.msg = "invalid window size", t.mode = M;
            break;
          }
          t.dmax = 1 << t.wbits, t.flags = 0, e.adler = t.check = 1, t.mode = o & 512 ? _i : V, o = 0, c = 0;
          break;
        case si:
          for (; c < 16; ) {
            if (h === 0)
              break t;
            h--, o += a[s++] << c, c += 8;
          }
          if (t.flags = o, (t.flags & 255) !== ni) {
            e.msg = "unknown compression method", t.mode = M;
            break;
          }
          if (t.flags & 57344) {
            e.msg = "unknown header flags set", t.mode = M;
            break;
          }
          t.head && (t.head.text = o >> 8 & 1), t.flags & 512 && t.wrap & 4 && (x[0] = o & 255, x[1] = o >>> 8 & 255, t.check = C(t.check, x, 2, 0)), o = 0, c = 0, t.mode = ri;
        /* falls through */
        case ri:
          for (; c < 32; ) {
            if (h === 0)
              break t;
            h--, o += a[s++] << c, c += 8;
          }
          t.head && (t.head.time = o), t.flags & 512 && t.wrap & 4 && (x[0] = o & 255, x[1] = o >>> 8 & 255, x[2] = o >>> 16 & 255, x[3] = o >>> 24 & 255, t.check = C(t.check, x, 4, 0)), o = 0, c = 0, t.mode = oi;
        /* falls through */
        case oi:
          for (; c < 16; ) {
            if (h === 0)
              break t;
            h--, o += a[s++] << c, c += 8;
          }
          t.head && (t.head.xflags = o & 255, t.head.os = o >> 8), t.flags & 512 && t.wrap & 4 && (x[0] = o & 255, x[1] = o >>> 8 & 255, t.check = C(t.check, x, 2, 0)), o = 0, c = 0, t.mode = hi;
        /* falls through */
        case hi:
          if (t.flags & 1024) {
            for (; c < 16; ) {
              if (h === 0)
                break t;
              h--, o += a[s++] << c, c += 8;
            }
            t.length = o, t.head && (t.head.extra_len = o), t.flags & 512 && t.wrap & 4 && (x[0] = o & 255, x[1] = o >>> 8 & 255, t.check = C(t.check, x, 2, 0)), o = 0, c = 0;
          } else t.head && (t.head.extra = null);
          t.mode = li;
        /* falls through */
        case li:
          if (t.flags & 1024 && (f = t.length, f > h && (f = h), f && (t.head && (w = t.head.extra_len - t.length, t.head.extra || (t.head.extra = new Uint8Array(t.head.extra_len)), t.head.extra.set(
            a.subarray(
              s,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              s + f
            ),
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            w
          )), t.flags & 512 && t.wrap & 4 && (t.check = C(t.check, a, f, s)), h -= f, s += f, t.length -= f), t.length))
            break t;
          t.length = 0, t.mode = ci;
        /* falls through */
        case ci:
          if (t.flags & 2048) {
            if (h === 0)
              break t;
            f = 0;
            do
              w = a[s + f++], t.head && w && t.length < 65536 && (t.head.name += String.fromCharCode(w));
            while (w && f < h);
            if (t.flags & 512 && t.wrap & 4 && (t.check = C(t.check, a, f, s)), h -= f, s += f, w)
              break t;
          } else t.head && (t.head.name = null);
          t.length = 0, t.mode = fi;
        /* falls through */
        case fi:
          if (t.flags & 4096) {
            if (h === 0)
              break t;
            f = 0;
            do
              w = a[s + f++], t.head && w && t.length < 65536 && (t.head.comment += String.fromCharCode(w));
            while (w && f < h);
            if (t.flags & 512 && t.wrap & 4 && (t.check = C(t.check, a, f, s)), h -= f, s += f, w)
              break t;
          } else t.head && (t.head.comment = null);
          t.mode = di;
        /* falls through */
        case di:
          if (t.flags & 512) {
            for (; c < 16; ) {
              if (h === 0)
                break t;
              h--, o += a[s++] << c, c += 8;
            }
            if (t.wrap & 4 && o !== (t.check & 65535)) {
              e.msg = "header crc mismatch", t.mode = M;
              break;
            }
            o = 0, c = 0;
          }
          t.head && (t.head.hcrc = t.flags >> 9 & 1, t.head.done = !0), e.adler = t.check = 0, t.mode = V;
          break;
        case _i:
          for (; c < 32; ) {
            if (h === 0)
              break t;
            h--, o += a[s++] << c, c += 8;
          }
          e.adler = t.check = Ii(o), o = 0, c = 0, t.mode = Jt;
        /* falls through */
        case Jt:
          if (t.havedict === 0)
            return e.next_out = r, e.avail_out = l, e.next_in = s, e.avail_in = h, t.hold = o, t.bits = c, gs;
          e.adler = t.check = 1, t.mode = V;
        /* falls through */
        case V:
          if (i === _s || i === Kt)
            break t;
        /* falls through */
        case ge:
          if (t.last) {
            o >>>= c & 7, c -= c & 7, t.mode = pe;
            break;
          }
          for (; c < 3; ) {
            if (h === 0)
              break t;
            h--, o += a[s++] << c, c += 8;
          }
          switch (t.last = o & 1, o >>>= 1, c -= 1, o & 3) {
            case 0:
              t.mode = ui;
              break;
            case 1:
              if (ys(t), t.mode = qt, i === Kt) {
                o >>>= 2, c -= 2;
                break t;
              }
              break;
            case 2:
              t.mode = wi;
              break;
            case 3:
              e.msg = "invalid block type", t.mode = M;
          }
          o >>>= 2, c -= 2;
          break;
        case ui:
          for (o >>>= c & 7, c -= c & 7; c < 32; ) {
            if (h === 0)
              break t;
            h--, o += a[s++] << c, c += 8;
          }
          if ((o & 65535) !== (o >>> 16 ^ 65535)) {
            e.msg = "invalid stored block lengths", t.mode = M;
            break;
          }
          if (t.length = o & 65535, o = 0, c = 0, t.mode = we, i === Kt)
            break t;
        /* falls through */
        case we:
          t.mode = gi;
        /* falls through */
        case gi:
          if (f = t.length, f) {
            if (f > h && (f = h), f > l && (f = l), f === 0)
              break t;
            n.set(a.subarray(s, s + f), r), h -= f, s += f, l -= f, r += f, t.length -= f;
            break;
          }
          t.mode = V;
          break;
        case wi:
          for (; c < 14; ) {
            if (h === 0)
              break t;
            h--, o += a[s++] << c, c += 8;
          }
          if (t.nlen = (o & 31) + 257, o >>>= 5, c -= 5, t.ndist = (o & 31) + 1, o >>>= 5, c -= 5, t.ncode = (o & 15) + 4, o >>>= 4, c -= 4, t.nlen > 286 || t.ndist > 30) {
            e.msg = "too many length or distance symbols", t.mode = M;
            break;
          }
          t.have = 0, t.mode = pi;
        /* falls through */
        case pi:
          for (; t.have < t.ncode; ) {
            for (; c < 3; ) {
              if (h === 0)
                break t;
              h--, o += a[s++] << c, c += 8;
            }
            t.lens[H[t.have++]] = o & 7, o >>>= 3, c -= 3;
          }
          for (; t.have < 19; )
            t.lens[H[t.have++]] = 0;
          if (t.lencode = t.lendyn, t.lenbits = 7, m = { bits: t.lenbits }, k = Dt(ds, t.lens, 0, 19, t.lencode, 0, t.work, m), t.lenbits = m.bits, k) {
            e.msg = "invalid code lengths set", t.mode = M;
            break;
          }
          t.have = 0, t.mode = Si;
        /* falls through */
        case Si:
          for (; t.have < t.nlen + t.ndist; ) {
            for (; p = t.lencode[o & (1 << t.lenbits) - 1], b = p >>> 24, S = p >>> 16 & 255, E = p & 65535, !(b <= c); ) {
              if (h === 0)
                break t;
              h--, o += a[s++] << c, c += 8;
            }
            if (E < 16)
              o >>>= b, c -= b, t.lens[t.have++] = E;
            else {
              if (E === 16) {
                for (y = b + 2; c < y; ) {
                  if (h === 0)
                    break t;
                  h--, o += a[s++] << c, c += 8;
                }
                if (o >>>= b, c -= b, t.have === 0) {
                  e.msg = "invalid bit length repeat", t.mode = M;
                  break;
                }
                w = t.lens[t.have - 1], f = 3 + (o & 3), o >>>= 2, c -= 2;
              } else if (E === 17) {
                for (y = b + 3; c < y; ) {
                  if (h === 0)
                    break t;
                  h--, o += a[s++] << c, c += 8;
                }
                o >>>= b, c -= b, w = 0, f = 3 + (o & 7), o >>>= 3, c -= 3;
              } else {
                for (y = b + 7; c < y; ) {
                  if (h === 0)
                    break t;
                  h--, o += a[s++] << c, c += 8;
                }
                o >>>= b, c -= b, w = 0, f = 11 + (o & 127), o >>>= 7, c -= 7;
              }
              if (t.have + f > t.nlen + t.ndist) {
                e.msg = "invalid bit length repeat", t.mode = M;
                break;
              }
              for (; f--; )
                t.lens[t.have++] = w;
            }
          }
          if (t.mode === M)
            break;
          if (t.lens[256] === 0) {
            e.msg = "invalid code -- missing end-of-block", t.mode = M;
            break;
          }
          if (t.lenbits = 9, m = { bits: t.lenbits }, k = Dt(oa, t.lens, 0, t.nlen, t.lencode, 0, t.work, m), t.lenbits = m.bits, k) {
            e.msg = "invalid literal/lengths set", t.mode = M;
            break;
          }
          if (t.distbits = 6, t.distcode = t.distdyn, m = { bits: t.distbits }, k = Dt(ha, t.lens, t.nlen, t.ndist, t.distcode, 0, t.work, m), t.distbits = m.bits, k) {
            e.msg = "invalid distances set", t.mode = M;
            break;
          }
          if (t.mode = qt, i === Kt)
            break t;
        /* falls through */
        case qt:
          t.mode = jt;
        /* falls through */
        case jt:
          if (h >= 6 && l >= 258) {
            e.next_out = r, e.avail_out = l, e.next_in = s, e.avail_in = h, t.hold = o, t.bits = c, rs(e, d), r = e.next_out, n = e.output, l = e.avail_out, s = e.next_in, a = e.input, h = e.avail_in, o = t.hold, c = t.bits, t.mode === V && (t.back = -1);
            break;
          }
          for (t.back = 0; p = t.lencode[o & (1 << t.lenbits) - 1], b = p >>> 24, S = p >>> 16 & 255, E = p & 65535, !(b <= c); ) {
            if (h === 0)
              break t;
            h--, o += a[s++] << c, c += 8;
          }
          if (S && !(S & 240)) {
            for (_ = b, R = S, D = E; p = t.lencode[D + ((o & (1 << _ + R) - 1) >> _)], b = p >>> 24, S = p >>> 16 & 255, E = p & 65535, !(_ + b <= c); ) {
              if (h === 0)
                break t;
              h--, o += a[s++] << c, c += 8;
            }
            o >>>= _, c -= _, t.back += _;
          }
          if (o >>>= b, c -= b, t.back += b, t.length = E, S === 0) {
            t.mode = yi;
            break;
          }
          if (S & 32) {
            t.back = -1, t.mode = V;
            break;
          }
          if (S & 64) {
            e.msg = "invalid literal/length code", t.mode = M;
            break;
          }
          t.extra = S & 15, t.mode = Ei;
        /* falls through */
        case Ei:
          if (t.extra) {
            for (y = t.extra; c < y; ) {
              if (h === 0)
                break t;
              h--, o += a[s++] << c, c += 8;
            }
            t.length += o & (1 << t.extra) - 1, o >>>= t.extra, c -= t.extra, t.back += t.extra;
          }
          t.was = t.length, t.mode = mi;
        /* falls through */
        case mi:
          for (; p = t.distcode[o & (1 << t.distbits) - 1], b = p >>> 24, S = p >>> 16 & 255, E = p & 65535, !(b <= c); ) {
            if (h === 0)
              break t;
            h--, o += a[s++] << c, c += 8;
          }
          if (!(S & 240)) {
            for (_ = b, R = S, D = E; p = t.distcode[D + ((o & (1 << _ + R) - 1) >> _)], b = p >>> 24, S = p >>> 16 & 255, E = p & 65535, !(_ + b <= c); ) {
              if (h === 0)
                break t;
              h--, o += a[s++] << c, c += 8;
            }
            o >>>= _, c -= _, t.back += _;
          }
          if (o >>>= b, c -= b, t.back += b, S & 64) {
            e.msg = "invalid distance code", t.mode = M;
            break;
          }
          t.offset = E, t.extra = S & 15, t.mode = bi;
        /* falls through */
        case bi:
          if (t.extra) {
            for (y = t.extra; c < y; ) {
              if (h === 0)
                break t;
              h--, o += a[s++] << c, c += 8;
            }
            t.offset += o & (1 << t.extra) - 1, o >>>= t.extra, c -= t.extra, t.back += t.extra;
          }
          if (t.offset > t.dmax) {
            e.msg = "invalid distance too far back", t.mode = M;
            break;
          }
          t.mode = Ai;
        /* falls through */
        case Ai:
          if (l === 0)
            break t;
          if (f = d - l, t.offset > f) {
            if (f = t.offset - f, f > t.whave && t.sane) {
              e.msg = "invalid distance too far back", t.mode = M;
              break;
            }
            f > t.wnext ? (f -= t.wnext, g = t.wsize - f) : g = t.wnext - f, f > t.length && (f = t.length), A = t.window;
          } else
            A = n, g = r - t.offset, f = t.length;
          f > l && (f = l), l -= f, t.length -= f;
          do
            n[r++] = A[g++];
          while (--f);
          t.length === 0 && (t.mode = jt);
          break;
        case yi:
          if (l === 0)
            break t;
          n[r++] = t.length, l--, t.mode = jt;
          break;
        case pe:
          if (t.wrap) {
            for (; c < 32; ) {
              if (h === 0)
                break t;
              h--, o |= a[s++] << c, c += 8;
            }
            if (d -= l, e.total_out += d, t.total += d, t.wrap & 4 && d && (e.adler = t.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
            t.flags ? C(t.check, n, d, r - d) : Ut(t.check, n, d, r - d)), d = l, t.wrap & 4 && (t.flags ? o : Ii(o)) !== t.check) {
              e.msg = "incorrect data check", t.mode = M;
              break;
            }
            o = 0, c = 0;
          }
          t.mode = xi;
        /* falls through */
        case xi:
          if (t.wrap && t.flags) {
            for (; c < 32; ) {
              if (h === 0)
                break t;
              h--, o += a[s++] << c, c += 8;
            }
            if (t.wrap & 4 && o !== (t.total & 4294967295)) {
              e.msg = "incorrect length check", t.mode = M;
              break;
            }
            o = 0, c = 0;
          }
          t.mode = Ri;
        /* falls through */
        case Ri:
          k = us;
          break t;
        case M:
          k = la;
          break t;
        case fa:
          return ca;
        case da:
        /* falls through */
        default:
          return G;
      }
  return e.next_out = r, e.avail_out = l, e.next_in = s, e.avail_in = h, t.hold = o, t.bits = c, (t.wsize || d !== e.avail_out && t.mode < M && (t.mode < pe || i !== ai)) && pa(e, e.output, e.next_out, d - e.avail_out), u -= e.avail_in, d -= e.avail_out, e.total_in += u, e.total_out += d, t.total += d, t.wrap & 4 && d && (e.adler = t.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
  t.flags ? C(t.check, n, d, e.next_out - d) : Ut(t.check, n, d, e.next_out - d)), e.data_type = t.bits + (t.last ? 64 : 0) + (t.mode === V ? 128 : 0) + (t.mode === qt || t.mode === we ? 256 : 0), (u === 0 && d === 0 || i === ai) && k === ct && (k = ws), k;
}, Rs = (e) => {
  if (dt(e))
    return G;
  let i = e.state;
  return i.window && (i.window = null), e.state = null, ct;
}, Is = (e, i) => {
  if (dt(e))
    return G;
  const t = e.state;
  return t.wrap & 2 ? (t.head = i, i.done = !1, ct) : G;
}, vs = (e, i) => {
  const t = i.length;
  let a, n, s;
  return dt(e) || (a = e.state, a.wrap !== 0 && a.mode !== Jt) ? G : a.mode === Jt && (n = 1, n = Ut(n, i, t, 0), n !== a.check) ? la : (s = pa(e, i, t, t), s ? (a.mode = fa, ca) : (a.havedict = 1, ct));
};
var Ts = ua, ks = ga, Ds = _a, Ms = As, Cs = wa, Ls = xs, Os = Rs, Fs = Is, Ps = vs, Us = "pako inflate (from Nodeca project)", W = {
  inflateReset: Ts,
  inflateReset2: ks,
  inflateResetKeep: Ds,
  inflateInit: Ms,
  inflateInit2: Cs,
  inflate: Ls,
  inflateEnd: Os,
  inflateGetHeader: Fs,
  inflateSetDictionary: Ps,
  inflateInfo: Us
};
function Bs() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var Ns = Bs;
const Sa = Object.prototype.toString, {
  Z_NO_FLUSH: Hs,
  Z_FINISH: Ti,
  Z_OK: pt,
  Z_STREAM_END: me,
  Z_NEED_DICT: be,
  Z_STREAM_ERROR: zs,
  Z_DATA_ERROR: ki,
  Z_MEM_ERROR: $s,
  Z_BUF_ERROR: Di
} = Qt, Gs = {
  chunkSize: 1024 * 64,
  windowBits: 15,
  to: ""
};
function ne(e) {
  this.options = ee.assign({}, Gs, e || {});
  const i = this.options;
  i.raw && i.windowBits >= 0 && i.windowBits < 16 && (i.windowBits = -i.windowBits, i.windowBits === 0 && (i.windowBits = -15)), i.windowBits >= 0 && i.windowBits < 16 && !(e && e.windowBits) && (i.windowBits += 32), i.windowBits > 15 && i.windowBits < 48 && (i.windowBits & 15 || (i.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new sa(), this.strm.avail_out = 0;
  let t = W.inflateInit2(
    this.strm,
    i.windowBits
  );
  if (t !== pt)
    throw new Error(St[t]);
  if (this.header = new Ns(), W.inflateGetHeader(this.strm, this.header), i.dictionary && (typeof i.dictionary == "string" ? i.dictionary = Nt.string2buf(i.dictionary) : Sa.call(i.dictionary) === "[object ArrayBuffer]" && (i.dictionary = new Uint8Array(i.dictionary)), i.raw && (t = W.inflateSetDictionary(this.strm, i.dictionary), t !== pt)))
    throw new Error(St[t]);
}
ne.prototype.push = function(e, i) {
  const t = this.strm, a = this.options.chunkSize, n = this.options.dictionary;
  let s, r, h;
  if (this.ended) return !1;
  for (i === ~~i ? r = i : r = i === !0 ? Ti : Hs, Sa.call(e) === "[object ArrayBuffer]" ? t.input = new Uint8Array(e) : t.input = e, t.next_in = 0, t.avail_in = t.input.length; ; ) {
    for (t.avail_out === 0 && (t.output = new Uint8Array(a), t.next_out = 0, t.avail_out = a), s = W.inflate(t, r), s === be && n && (s = W.inflateSetDictionary(t, n), s === pt ? s = W.inflate(t, r) : s === ki && (s = be)); t.avail_in > 0 && s === me && t.state.wrap & 2 && t.state.flags !== 0 && t.input[t.next_in] !== 0; )
      W.inflateReset(t), s = W.inflate(t, r);
    switch (s) {
      case zs:
      case ki:
      case be:
      case $s:
        return this.onEnd(s), this.ended = !0, !1;
    }
    if (h = t.avail_out, t.next_out && (t.avail_out === 0 || s === me || r > 0))
      if (this.options.to === "string") {
        let l = Nt.utf8border(t.output, t.next_out), o = t.next_out - l, c = Nt.buf2string(t.output, l);
        t.next_out = o, t.avail_out = a - o, o && t.output.set(t.output.subarray(l, l + o), 0), this.onData(c);
      } else
        this.onData(t.output.length === t.next_out ? t.output : t.output.subarray(0, t.next_out)), t.avail_out = 0, t.next_out = 0;
    if (!((s === pt || s === Di) && h === 0)) {
      if (s === me)
        return s = W.inflateEnd(this.strm), this.onEnd(s), this.ended = !0, !0;
      if (t.avail_in === 0) {
        if (r === Ti)
          return s = W.inflateEnd(this.strm), this.onEnd(s === pt ? Di : s), this.ended = !0, !1;
        break;
      }
    }
  }
  return !0;
};
ne.prototype.onData = function(e) {
  this.chunks.push(e);
};
ne.prototype.onEnd = function(e) {
  e === pt && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = ee.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
};
var Zs = ne, Ws = {
  Inflate: Zs
};
const { deflate: Ks } = ns, { Inflate: qs } = Ws;
var js = Ks, Vs = qs;
function Le(e, i, t = 255) {
  const a = e.length % i;
  if (a !== 0) {
    const n = new Uint8Array(i - a).fill(t), s = new Uint8Array(e.length + n.length);
    return s.set(e), s.set(n, e.length), s;
  }
  return e;
}
const He = 239;
function Mi(e, i = He) {
  for (let t = 0; t < e.length; t++)
    i ^= e[t];
  return i;
}
function se(e) {
  const i = new Uint8Array(e.length);
  for (let t = 0; t < e.length; t++)
    i[t] = e.charCodeAt(t);
  return i;
}
function Mt(e) {
  return new Promise((i) => setTimeout(i, e));
}
class Ea {
  constructor(i, t = !1, a = !0) {
    this.device = i, this.tracing = t, this.slipReaderEnabled = !1, this.baudrate = 0, this.traceLog = "", this.lastTraceTime = Date.now(), this.buffer = new Uint8Array(0), this.onDeviceLostCallback = null, this.SLIP_END = 192, this.SLIP_ESC = 219, this.SLIP_ESC_END = 220, this.SLIP_ESC_ESC = 221, this._DTR_state = !1, this.slipReaderEnabled = a;
  }
  /**
   * Set callback for when device is lost
   * @param {Function} callback Function to call when device is lost
   */
  setDeviceLostCallback(i) {
    this.onDeviceLostCallback = i;
  }
  /**
   * Update the device reference (used when re-selecting device after reset)
   * @param {typeof import("w3c-web-serial").SerialPort} newDevice New SerialPort device
   */
  updateDevice(i) {
    this.device = i, this.trace("Device reference updated");
  }
  /**
   * Request the serial device vendor ID and Product ID as string.
   * @returns {string} Return the device VendorID and ProductID from SerialPortInfo as formatted string.
   */
  getInfo() {
    const i = this.device.getInfo();
    return i.usbVendorId && i.usbProductId ? `WebSerial VendorID 0x${i.usbVendorId.toString(16)} ProductID 0x${i.usbProductId.toString(16)}` : "";
  }
  /**
   * Request the serial device product id from SerialPortInfo.
   * @returns {number | undefined} Return the product ID.
   */
  getPid() {
    return this.device.getInfo().usbProductId;
  }
  /**
   * Format received or sent data for tracing output.
   * @param {string} message Message to format as trace line.
   */
  trace(i) {
    const n = `${`TRACE ${(Date.now() - this.lastTraceTime).toFixed(3)}`} ${i}`;
    console.log(n), this.traceLog += n + `
`;
  }
  async returnTrace() {
    try {
      await navigator.clipboard.writeText(this.traceLog), console.log("Text copied to clipboard!");
    } catch (i) {
      console.error("Failed to copy text:", i);
    }
  }
  hexify(i) {
    return Array.from(i).map((t) => t.toString(16).padStart(2, "0")).join("").padEnd(16, " ");
  }
  hexConvert(i, t = !0) {
    if (t && i.length > 16) {
      let a = "", n = i;
      for (; n.length > 0; ) {
        const s = n.slice(0, 16), r = String.fromCharCode(...s).split("").map((h) => h === " " || h >= " " && h <= "~" && h !== "  " ? h : ".").join("");
        n = n.slice(16), a += `
    ${this.hexify(s.slice(0, 8))} ${this.hexify(s.slice(8))} | ${r}`;
      }
      return a;
    } else
      return this.hexify(i);
  }
  /**
   * Format data packet using the Serial Line Internet Protocol (SLIP).
   * @param {Uint8Array} data Binary unsigned 8 bit array data to format.
   * @returns {Uint8Array} Formatted unsigned 8 bit data array.
   */
  slipWriter(i) {
    const t = [];
    t.push(192);
    for (let a = 0; a < i.length; a++)
      i[a] === 219 ? t.push(219, 221) : i[a] === 192 ? t.push(219, 220) : t.push(i[a]);
    return t.push(192), new Uint8Array(t);
  }
  /**
   * Write binary data to device using the WebSerial device writable stream.
   * @param {Uint8Array} data 8 bit unsigned data array to write to device.
   */
  async write(i) {
    const t = this.slipWriter(i);
    if (this.device.writable) {
      const a = this.device.writable.getWriter();
      this.tracing && this.trace(`Write ${t.length} bytes: ${this.hexConvert(t)}`), await a.write(t), a.releaseLock();
    }
  }
  /**
   * Append a buffer array after another buffer array
   * @param {Uint8Array} arr1 - First array buffer.
   * @param {Uint8Array} arr2 - magic hex number to select ROM.
   * @returns {Uint8Array} Return a 8 bit unsigned array.
   */
  appendArray(i, t) {
    const a = new Uint8Array(i.length + t.length);
    return a.set(i), a.set(t, i.length), a;
  }
  /**
   * Read from serial device and append to buffer
   */
  async readLoop() {
    for (var i; this.device.readable; ) {
      this.reader = (i = this.device.readable) === null || i === void 0 ? void 0 : i.getReader();
      try {
        const { value: t, done: a } = await this.reader.read();
        if (a) {
          this.trace("Serial port done");
          break;
        }
        if (t && t.length) {
          const n = Uint8Array.from(t);
          this.buffer = this.appendArray(this.buffer, n);
        }
      } catch (t) {
        if (t instanceof Error) {
          if (["BufferOverrunError", "FramingError", "BreakError", "ParityError"].includes(t.name)) {
            this.trace(`Recoverable serial port error: ${t.message}`);
            continue;
          }
          this.trace(`Unrecoverable serial port error: ${t.message}`);
          break;
        }
        if (t instanceof DOMException) {
          this.onDeviceLostCallback ? this.onDeviceLostCallback() : this.trace(`Unrecoverable serial port error: ${t.message}`);
          break;
        }
        this.trace(`Unrecoverable serial port error: ${t}`);
        break;
      } finally {
        this.reader.releaseLock();
      }
    }
    this.trace("readLoop exited");
  }
  flushInput() {
    this.buffer = new Uint8Array(0);
  }
  async flushOutput() {
    try {
      if (this.device.writable) {
        const i = this.device.writable.getWriter();
        await i.close(), i.releaseLock();
      }
    } catch (i) {
      this.trace(`Error while flushing output: ${i}`);
    }
  }
  // `inWaiting` returns the count of bytes in the buffer
  inWaiting() {
    return this.buffer.length;
  }
  // peek at the buffer without removing the data from the buffer
  peek() {
    return this.buffer;
  }
  /**
   * Detect if the data read from device is a Fatal or Guru meditation error.
   * @param {Uint8Array} input Data read from device
   */
  detectPanicHandler(i) {
    const t = /G?uru Meditation Error: (?:Core \d panic'ed \(([a-zA-Z ]*)\))?/, a = /F?atal exception \(\d+\): (?:([a-zA-Z ]*)?.*epc)?/, n = new TextDecoder("utf-8").decode(i), s = n.match(t) || n.match(a);
    if (s) {
      const r = s[1] || s[2], h = `Guru Meditation Error detected${r ? ` (${r})` : ""}`;
      throw new Error(h);
    }
  }
  /**
   * Take a data array and return the first well formed packet after
   * replacing the escape sequence. Reads at least 8 bytes.
   * @param {number} timeout Timeout read data.
   * @returns {Uint8Array} Formatted packet using SLIP escape sequences.
   */
  async read(i) {
    let t = null, a = !1, n = null;
    for (; ; ) {
      const s = Date.now();
      for (n = new Uint8Array(0); Date.now() - s < i; )
        if (this.buffer.length > 0) {
          n = this.buffer, this.buffer = new Uint8Array(0);
          break;
        } else
          await Mt(1);
      if (!n || n.length === 0) {
        const r = t === null ? "Serial data stream stopped: Possible serial noise or corruption." : "No serial data received.";
        throw this.tracing && this.trace(r), new Error(r);
      }
      this.tracing && this.trace(`Read ${n.length} bytes: ${this.hexConvert(n)}`);
      for (let r = 0; r < n.length; r++) {
        const h = n[r];
        if (t === null)
          if (h === this.SLIP_END)
            t = new Uint8Array(0);
          else {
            this.tracing && this.trace(`Read invalid data: ${this.hexConvert(n)}`);
            const l = this.buffer;
            throw this.tracing && this.trace(`Remaining data in serial buffer: ${this.hexConvert(l)}`), this.detectPanicHandler(new Uint8Array([...n, ...l || []])), new Error(`Invalid head of packet (0x${h.toString(16)}): Possible serial noise or corruption.`);
          }
        else if (a)
          if (a = !1, h === this.SLIP_ESC_END)
            t = this.appendArray(t, new Uint8Array([this.SLIP_END]));
          else if (h === this.SLIP_ESC_ESC)
            t = this.appendArray(t, new Uint8Array([this.SLIP_ESC]));
          else {
            this.tracing && this.trace(`Read invalid data: ${this.hexConvert(n)}`);
            const l = this.buffer;
            throw this.tracing && this.trace(`Remaining data in serial buffer: ${this.hexConvert(l)}`), this.detectPanicHandler(new Uint8Array([...n, ...l || []])), new Error(`Invalid SLIP escape (0xdb, 0x${h.toString(16)})`);
          }
        else if (h === this.SLIP_ESC)
          a = !0;
        else if (h === this.SLIP_END) {
          if (this.tracing && this.trace(`Received full packet: ${this.hexConvert(t)}`), r + 1 < n.length) {
            const l = n.slice(r + 1);
            this.buffer = this.appendArray(l, this.buffer);
          }
          return t;
        } else
          t = this.appendArray(t, new Uint8Array([h]));
      }
    }
  }
  /**
   * Read from serial device without SLIP formatting. Calls onData for each chunk.
   * Stops when isClosed() returns true or the stream ends/errors.
   * @param {Function} onData Callback for each chunk of data read
   * @param {Function} isClosed Function that returns true when reading should stop (e.g. when console is closed)
   */
  async rawRead(i, t) {
    let a;
    try {
      if (!this.device.readable)
        return;
      for (a = this.device.readable.getReader(); !t(); ) {
        const { value: n, done: s } = await a.read();
        if (s || !n)
          break;
        this.tracing && this.trace(`Read ${n.length} bytes: ${this.hexConvert(n)}`), i(n);
      }
    } catch (n) {
      this.trace(`Error reading from serial port: ${n}`), n instanceof Error && n.name === "NetworkError" && n.message.includes("device has been lost") && (this.trace("Device lost detected (NetworkError)"), this.onDeviceLostCallback && this.onDeviceLostCallback());
    } finally {
      a == null || a.releaseLock();
    }
  }
  /**
   * Send the RequestToSend (RTS) signal to given state
   * # True for EN=LOW, chip in reset and False EN=HIGH, chip out of reset
   * @param {boolean} state Boolean state to set the signal
   */
  async setRTS(i) {
    await this.device.setSignals({ requestToSend: i }), await this.setDTR(this._DTR_state);
  }
  /**
   * Send the dataTerminalReady (DTS) signal to given state
   * # True for IO0=LOW, chip in reset and False IO0=HIGH
   * @param {boolean} state Boolean state to set the signal
   */
  async setDTR(i) {
    this._DTR_state = i, await this.device.setSignals({ dataTerminalReady: i });
  }
  /**
   * Connect to serial device using the Webserial open method.
   * @param {number} baud Number baud rate for serial connection. Default is 115200.
   * @param {typeof import("w3c-web-serial").SerialOptions} serialOptions Serial Options for WebUSB SerialPort class.
   */
  async connect(i = 115200, t = {}) {
    await this.device.open({
      baudRate: i,
      dataBits: t == null ? void 0 : t.dataBits,
      stopBits: t == null ? void 0 : t.stopBits,
      bufferSize: t == null ? void 0 : t.bufferSize,
      parity: t == null ? void 0 : t.parity,
      flowControl: t == null ? void 0 : t.flowControl
    }), this.baudrate = i;
  }
  /**
   * Wait for a given timeout ms for serial device unlock.
   * @param {number} timeout Timeout time in milliseconds (ms) to sleep
   */
  async waitForUnlock(i) {
    for (; this.device.readable && this.device.readable.locked || this.device.writable && this.device.writable.locked; )
      await Mt(i);
  }
  /**
   * Disconnect from serial device by running SerialPort.close() after streams unlock.
   */
  async disconnect() {
    var i, t;
    !((i = this.device.readable) === null || i === void 0) && i.locked && await ((t = this.reader) === null || t === void 0 ? void 0 : t.cancel()), await this.waitForUnlock(400), await this.device.close(), this.reader = void 0;
  }
}
function J(e) {
  return new Promise((i) => setTimeout(i, e));
}
class Ys {
  constructor(i, t) {
    this.resetDelay = t, this.transport = i;
  }
  async reset() {
    await this.transport.setDTR(!1), await this.transport.setRTS(!0), await J(100), await this.transport.setDTR(!0), await this.transport.setRTS(!1), await J(this.resetDelay), await this.transport.setDTR(!1);
  }
}
class Xs {
  constructor(i) {
    this.transport = i;
  }
  async reset() {
    await this.transport.setRTS(!1), await this.transport.setDTR(!1), await J(100), await this.transport.setDTR(!0), await this.transport.setRTS(!1), await J(100), await this.transport.setRTS(!0), await this.transport.setDTR(!1), await this.transport.setRTS(!0), await J(100), await this.transport.setRTS(!1), await this.transport.setDTR(!1);
  }
}
class Js {
  constructor(i, t = !1) {
    this.transport = i, this.usingUsbOtg = t, this.transport = i;
  }
  async reset() {
    this.usingUsbOtg ? (await J(200), await this.transport.setRTS(!1), await J(200)) : (await J(100), await this.transport.setRTS(!1));
  }
}
function Qs(e) {
  const i = ["D", "R", "W"], t = e.split("|");
  for (const a of t) {
    const n = a[0], s = a.slice(1);
    if (!i.includes(n))
      return !1;
    if (n === "D" || n === "R") {
      if (s !== "0" && s !== "1")
        return !1;
    } else if (n === "W") {
      const r = parseInt(s);
      if (isNaN(r) || r <= 0)
        return !1;
    }
  }
  return !0;
}
class tr {
  constructor(i, t) {
    this.transport = i, this.sequenceString = t, this.transport = i;
  }
  async reset() {
    const i = {
      D: async (t) => await this.transport.setDTR(t),
      R: async (t) => await this.transport.setRTS(t),
      W: async (t) => await J(t)
    };
    try {
      if (!Qs(this.sequenceString))
        return;
      const a = this.sequenceString.split("|");
      for (const n of a) {
        const s = n[0], r = n.slice(1);
        s === "W" ? await i.W(Number(r)) : (s === "D" || s === "R") && await i[s](r === "1");
      }
    } catch {
      throw new Error("Invalid custom reset sequence");
    }
  }
}
function er(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ae, Ci;
function ir() {
  return Ci || (Ci = 1, Ae = function(i) {
    return atob(i);
  }), Ae;
}
var ar = ir();
const nr = /* @__PURE__ */ er(ar);
async function Li(e, i) {
  let t;
  switch (e) {
    case "ESP32":
      t = await import("./stub_flasher_32-De6IF1qQ.mjs");
      break;
    case "ESP32-C2":
      t = await import("./stub_flasher_32c2-CmtEGinQ.mjs");
      break;
    case "ESP32-C3":
      t = await import("./stub_flasher_32c3-COF1MpA-.mjs");
      break;
    case "ESP32-C5":
      t = await import("./stub_flasher_32c5-bcHSLnh8.mjs");
      break;
    case "ESP32-C6":
      t = await import("./stub_flasher_32c6-DMu7FFpT.mjs");
      break;
    case "ESP32-C61":
      t = await import("./stub_flasher_32c61-Dim6JJZL.mjs");
      break;
    case "ESP32-H2":
      t = await import("./stub_flasher_32h2-DIR5HfOk.mjs");
      break;
    case "ESP32-P4":
      i && i < 300 ? t = await import("./stub_flasher_32p4rc1-01DPVsGi.mjs") : t = await import("./stub_flasher_32p4-CbRPeJUc.mjs");
      break;
    case "ESP32-S2":
      t = await import("./stub_flasher_32s2-D_F_EHOa.mjs");
      break;
    case "ESP32-S3":
      t = await import("./stub_flasher_32s3-TO1nm7HD.mjs");
      break;
    case "ESP8266":
      t = await import("./stub_flasher_8266-DGKFSU-5.mjs");
      break;
  }
  if (t)
    return {
      bss_start: t.bss_start,
      data: t.data,
      data_start: t.data_start,
      entry: t.entry,
      text: t.text,
      text_start: t.text_start,
      decodedData: Oi(t.data),
      decodedText: Oi(t.text)
    };
}
function Oi(e) {
  const t = nr(e).split("").map(function(a) {
    return a.charCodeAt(0);
  });
  return new Uint8Array(t);
}
class sr {
  constructor() {
    this.FLASH_SIZES = {
      "1MB": 0,
      "2MB": 16,
      "4MB": 32,
      "8MB": 48,
      "16MB": 64,
      "32MB": 80,
      "64MB": 96,
      "128MB": 112
    }, this.FLASH_FREQUENCY = {
      "80m": 15,
      "40m": 0,
      "26m": 1,
      "20m": 2
    };
  }
  /**
   * Get the chip erase size.
   * @param {number} offset - Offset to start erase.
   * @param {number} size - Size to erase.
   * @returns {number} The erase size of the chip as number.
   */
  getEraseSize(i, t) {
    return t;
  }
}
class bt extends sr {
  constructor() {
    super(...arguments), this.CHIP_NAME = "ESP8266", this.CHIP_DETECT_MAGIC_VALUE = [4293968129], this.EFUSE_RD_REG_BASE = 1072693328, this.UART_CLKDIV_REG = 1610612756, this.UART_CLKDIV_MASK = 1048575, this.XTAL_CLK_DIVIDER = 2, this.FLASH_WRITE_SIZE = 16384, this.BOOTLOADER_FLASH_OFFSET = 0, this.UART_DATE_REG_ADDR = 0, this.FLASH_SIZES = {
      "512KB": 0,
      "256KB": 16,
      "1MB": 32,
      "2MB": 48,
      "4MB": 64,
      "2MB-c1": 80,
      "4MB-c1": 96,
      "8MB": 128,
      "16MB": 144
    }, this.FLASH_FREQUENCY = {
      "80m": 15,
      "40m": 0,
      "26m": 1,
      "20m": 2
    }, this.MEMORY_MAP = [
      [1072693248, 1072693264, "DPORT"],
      [1073643520, 1073741824, "DRAM"],
      [1074790400, 1074823168, "IRAM"],
      [1075843088, 1076760592, "IROM"]
    ], this.SPI_REG_BASE = 1610613248, this.SPI_USR_OFFS = 28, this.SPI_USR1_OFFS = 32, this.SPI_USR2_OFFS = 36, this.SPI_MOSI_DLEN_OFFS = 0, this.SPI_MISO_DLEN_OFFS = 0, this.SPI_W0_OFFS = 64, this.getChipFeatures = async (i) => {
      const t = ["WiFi"];
      return await this.getChipDescription(i) == "ESP8285" && t.push("Embedded Flash"), t;
    };
  }
  async readEfuse(i, t) {
    const a = this.EFUSE_RD_REG_BASE + 4 * t;
    return i.debug("Read efuse " + a), await i.readReg(a);
  }
  async getChipDescription(i) {
    const t = await this.readEfuse(i, 2);
    return (await this.readEfuse(i, 0) & 16 | t & 65536) != 0 ? "ESP8285" : "ESP8266EX";
  }
  async getCrystalFreq(i) {
    const t = await i.readReg(this.UART_CLKDIV_REG) & this.UART_CLKDIV_MASK, a = i.transport.baudrate * t / 1e6 / this.XTAL_CLK_DIVIDER;
    let n;
    return a > 33 ? n = 40 : n = 26, Math.abs(n - a) > 1 && i.info("WARNING: Detected crystal freq " + a + "MHz is quite different to normalized freq " + n + "MHz. Unsupported crystal in use?"), n;
  }
  _d2h(i) {
    const t = (+i).toString(16);
    return t.length === 1 ? "0" + t : t;
  }
  async readMac(i) {
    let t = await this.readEfuse(i, 0);
    t = t >>> 0;
    let a = await this.readEfuse(i, 1);
    a = a >>> 0;
    let n = await this.readEfuse(i, 3);
    n = n >>> 0;
    const s = new Uint8Array(6);
    return n != 0 ? (s[0] = n >> 16 & 255, s[1] = n >> 8 & 255, s[2] = n & 255) : a >> 16 & 255 ? (a >> 16 & 255) == 1 ? (s[0] = 172, s[1] = 208, s[2] = 116) : i.error("Unknown OUI") : (s[0] = 24, s[1] = 254, s[2] = 52), s[3] = a >> 8 & 255, s[4] = a & 255, s[5] = t >> 24 & 255, this._d2h(s[0]) + ":" + this._d2h(s[1]) + ":" + this._d2h(s[2]) + ":" + this._d2h(s[3]) + ":" + this._d2h(s[4]) + ":" + this._d2h(s[5]);
  }
  getEraseSize(i, t) {
    return t;
  }
}
bt.IROM_MAP_START = 1075838976;
bt.IROM_MAP_END = 1076887552;
const rr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ESP8266ROM: bt
}, Symbol.toStringTag, { value: "Module" })), $t = 233;
function Ct(e, i) {
  const t = i - 1 - e % i;
  return e + t;
}
function ye(e, i) {
  return e[i] | e[i + 1] << 8 | e[i + 2] << 16 | e[i + 3] << 24;
}
class at {
  constructor(i, t, a = null, n = 0) {
    this.addr = i, this.data = t, this.fileOffs = a, this.flags = n, this.includeInChecksum = !0, this.addr !== 0 && this.padToAlignment(4);
  }
  copyWithNewAddr(i) {
    return new at(i, this.data, 0);
  }
  splitImage(i) {
    const t = new at(this.addr, this.data.slice(0, i), 0);
    return this.data = this.data.slice(i), this.addr += i, this.fileOffs = null, t;
  }
  toString() {
    let i = `len 0x${this.data.length.toString(16).padStart(5, "0")} load 0x${this.addr.toString(16).padStart(8, "0")}`;
    return this.fileOffs !== null && (i += ` file_offs 0x${this.fileOffs.toString(16).padStart(8, "0")}`), i;
  }
  getMemoryType(i) {
    return i.ROM_LOADER.MEMORY_MAP.filter((t) => t[0] <= this.addr && this.addr < t[1]).map((t) => t[2]);
  }
  padToAlignment(i) {
    this.data = Le(this.data, i, 0);
  }
}
class Fi extends at {
  constructor(i, t, a, n) {
    super(t, a, null, n), this.name = i;
  }
  toString() {
    return `${this.name} ${super.toString()}`;
  }
}
class ze {
  constructor(i) {
    this.SEG_HEADER_LEN = 8, this.SHA256_DIGEST_LEN = 32, this.ELF_FLAG_WRITE = 1, this.ELF_FLAG_READ = 2, this.ELF_FLAG_EXEC = 4, this.segments = [], this.entrypoint = 0, this.elfSha256 = null, this.elfSha256Offset = 0, this.padToSize = 0, this.flashMode = 0, this.flashSizeFreq = 0, this.checksum = 0, this.datalength = 0, this.IROM_ALIGN = 0, this.MMU_PAGE_SIZE_CONF = [], this.ROM_LOADER = i;
  }
  loadCommonHeader(i, t, a) {
    const n = i[t], s = i[t + 1];
    if (this.flashMode = i[t + 2], this.flashSizeFreq = i[t + 3], this.entrypoint = ye(i, t + 4), n !== a)
      throw new T(`Invalid firmware image magic=0x${n.toString(16)}`);
    return s;
  }
  verify() {
    if (this.segments.length > 16)
      throw new T(`Invalid segment count ${this.segments.length} (max 16). Usually this indicates a linker script problem.`);
  }
  loadSegment(i, t, a = !1) {
    const n = t, s = ye(i, t), r = ye(i, t + 4);
    this.warnIfUnusualSegment(s, r, a);
    const h = i.slice(t + 8, t + 8 + r);
    if (h.length < r)
      throw new T(`End of file reading segment 0x${s.toString(16)}, length ${r} (actual length ${h.length})`);
    const l = new at(s, h, n);
    return this.segments.push(l), l;
  }
  warnIfUnusualSegment(i, t, a) {
    a || (i > 1075838976 || i < 1073610752 || t > 65536) && console.warn(`WARNING: Suspicious segment 0x${i.toString(16)}, length ${t}`);
  }
  maybePatchSegmentData(i, t) {
    const a = i.length;
    if (this.elfSha256Offset >= t && this.elfSha256Offset < t + a) {
      const n = this.elfSha256Offset - t;
      if (n < this.SEG_HEADER_LEN || n + this.SHA256_DIGEST_LEN > a)
        throw new T(`Cannot place SHA256 digest on segment boundary(elf_sha256_offset=${this.elfSha256Offset}, file_pos=${t}, segment_size=${a})`);
      const s = n - this.SEG_HEADER_LEN;
      if (!i.slice(s, s + this.SHA256_DIGEST_LEN).every((d) => d === 0))
        throw new T(`Contents of segment at SHA256 digest offset 0x${this.elfSha256Offset.toString(16)} are not all zero. Refusing to overwrite.`);
      if (!this.elfSha256 || this.elfSha256.length !== this.SHA256_DIGEST_LEN)
        throw new T("ELF SHA256 digest is not properly initialized");
      const l = i.slice(0, s), o = i.slice(s + this.SHA256_DIGEST_LEN), c = l.length + this.elfSha256.length + o.length, u = new Uint8Array(c);
      return u.set(l, 0), u.set(this.elfSha256, l.length), u.set(o, l.length + this.elfSha256.length), u;
    }
    return i;
  }
  saveSegment(i, t, a, n = null) {
    const s = this.maybePatchSegmentData(a.data, t), r = new DataView(i.buffer, t);
    return r.setUint32(0, a.addr, !0), r.setUint32(4, s.length, !0), i.set(s, t + 8), n !== null ? Mi(s, n) : 0;
  }
  saveFlashSegment(i, t, a, n = null) {
    if (this.ROM_LOADER.CHIP_NAME === "ESP32") {
      const r = (t + a.data.length + this.SEG_HEADER_LEN) % this.IROM_ALIGN;
      if (r < 36) {
        const h = new Uint8Array(a.data.length + (36 - r));
        h.set(a.data), h.fill(0, a.data.length), a.data = h;
      }
    }
    return this.saveSegment(i, t, a, n);
  }
  /**
   * Return ESPLoader checksum from end of just-read image
   * @param {Uint8Array} data image to read checksum from
   * @param {number} offset Current offset in image
   * @returns {number} checksum value
   */
  readChecksum(i, t) {
    const a = Ct(t, 16);
    return i[a];
  }
  /**
   * Calculate checksum of loaded image, based on segments in segment array.
   * @returns {number} checksum value
   */
  calculateChecksum() {
    let i = He;
    for (const t of this.segments)
      t.includeInChecksum && (i = Mi(t.data, i));
    return i;
  }
  appendChecksum(i, t, a) {
    const n = Ct(t, 16);
    i[n] = a;
  }
  writeCommonHeader(i, t, a) {
    i[t] = $t, i[t + 1] = a, i[t + 2] = this.flashMode, i[t + 3] = this.flashSizeFreq, new DataView(i.buffer, t + 4).setUint32(0, this.entrypoint, !0);
  }
  isIromAddr(i) {
    return bt.IROM_MAP_START <= i && i < bt.IROM_MAP_END;
  }
  getIromSegment() {
    const i = this.segments.filter((t) => this.isIromAddr(t.addr));
    if (i.length > 0) {
      if (i.length !== 1)
        throw new T(`Found ${i.length} segments that could be irom0. Bad ELF file?`);
      return i[0];
    }
    return null;
  }
  getNonIromSegments() {
    const i = this.getIromSegment();
    return this.segments.filter((t) => t !== i);
  }
  sortSegments() {
    this.segments.length && this.segments.sort((i, t) => i.addr - t.addr);
  }
  mergeAdjacentSegments() {
    if (!this.segments.length)
      return;
    const i = [];
    for (let t = this.segments.length - 1; t > 0; t--) {
      const a = this.segments[t - 1], n = this.segments[t];
      if (a.getMemoryType(this).join(",") === n.getMemoryType(this).join(",") && a.includeInChecksum === n.includeInChecksum && n.addr === a.addr + a.data.length && (n.flags & this.ELF_FLAG_EXEC) === (a.flags & this.ELF_FLAG_EXEC)) {
        const s = new Uint8Array(a.data.length + n.data.length);
        s.set(a.data), s.set(n.data, a.data.length), a.data = s;
      } else
        i.unshift(n);
    }
    i.unshift(this.segments[0]), this.segments = i;
  }
  setMmuPageSize(i) {
    if (!this.MMU_PAGE_SIZE_CONF && i !== this.IROM_ALIGN)
      console.warn(`WARNING: Changing MMU page size is not supported on ${this.ROM_LOADER.CHIP_NAME}! ` + (this.IROM_ALIGN !== 0 ? `Defaulting to ${this.IROM_ALIGN / 1024}KB.` : ""));
    else if (this.MMU_PAGE_SIZE_CONF && !this.MMU_PAGE_SIZE_CONF.includes(i)) {
      const t = this.MMU_PAGE_SIZE_CONF.map((a) => `${a / 1024}KB`).join(", ");
      throw new T(`${i} bytes is not a valid ${this.ROM_LOADER.CHIP_NAME} page size, select from ${t}.`);
    } else
      this.IROM_ALIGN = i;
  }
}
class nt extends ze {
  constructor(i, t = null, a = !0, n = !1) {
    super(i), this.securePad = null, this.flashMode = 0, this.flashSizeFreq = 0, this.version = 1, this.WP_PIN_DISABLED = 238, this.wpPin = this.WP_PIN_DISABLED, this.clkDrv = 0, this.qDrv = 0, this.dDrv = 0, this.csDrv = 0, this.hdDrv = 0, this.wpDrv = 0, this.chipId = 0, this.minRev = 0, this.minRevFull = 0, this.maxRevFull = 0, this.storedDigest = null, this.calcDigest = null, this.dataLength = 0, this.IROM_ALIGN = 65536, this.ROM_LOADER = i, this.appendDigest = a, this.ramOnlyHeader = n, t !== null && this.loadFromFile(t);
  }
  async loadFromFile(i) {
    const a = i instanceof Uint8Array ? i : se(i);
    let n = 0;
    const s = this.loadCommonHeader(a, n, $t);
    n += 8, this.loadExtendedHeader(a, n), n += 16;
    for (let r = 0; r < s; r++) {
      const h = this.loadSegment(a, n);
      n += 8 + h.data.length;
    }
    if (this.checksum = this.readChecksum(a, n), n = Ct(n, 16), this.appendDigest) {
      const r = n;
      this.storedDigest = a.slice(n, n + this.SHA256_DIGEST_LEN);
      const h = await crypto.subtle.digest("SHA-256", a.slice(0, r));
      this.calcDigest = new Uint8Array(h), this.dataLength = r - 0;
    }
    this.verify();
  }
  isFlashAddr(i) {
    return this.ROM_LOADER.IROM_MAP_START <= i && i < this.ROM_LOADER.IROM_MAP_END || this.ROM_LOADER.DROM_MAP_START <= i && i < this.ROM_LOADER.DROM_MAP_END;
  }
  async save() {
    let i = 0;
    const t = new Uint8Array(1024 * 1024);
    let a = 0;
    this.writeCommonHeader(t, a, this.segments.length), a += 8, this.saveExtendedHeader(t, a), a += 16;
    let n = He;
    const s = this.segments.filter((l) => this.isFlashAddr(l.addr)).sort((l, o) => l.addr - o.addr), r = this.segments.filter((l) => !this.isFlashAddr(l.addr)).sort((l, o) => l.addr - o.addr);
    for (let l = 0; l < s.length; l++) {
      const o = s[l];
      if (o instanceof Fi && o.name === ".flash.appdesc") {
        s.splice(l, 1), s.unshift(o);
        break;
      }
    }
    for (let l = 0; l < r.length; l++) {
      const o = r[l];
      if (o instanceof Fi && o.name === ".dram0.bootdesc") {
        r.splice(l, 1), r.unshift(o);
        break;
      }
    }
    if (s.length > 0) {
      let l = s[0].addr;
      for (const o of s.slice(1)) {
        if (Math.floor(o.addr / this.IROM_ALIGN) === Math.floor(l / this.IROM_ALIGN))
          throw new T(`Segment loaded at 0x${o.addr.toString(16)} lands in same 64KB flash mapping as segment loaded at 0x${l.toString(16)}. Can't generate binary. Suggest changing linker script or ELF to merge sections.`);
        l = o.addr;
      }
    }
    if (this.ramOnlyHeader) {
      for (const l of r)
        n = this.saveSegment(t, a, l, n), a += 8 + l.data.length, i++;
      this.appendChecksum(t, a, n), a = Ct(a, 16);
      for (const l of s.reverse()) {
        let o = this.getAlignmentDataNeeded(l, a);
        if (o > 0) {
          const c = this.ROM_LOADER.BOOTLOADER_FLASH_OFFSET - this.SEG_HEADER_LEN;
          o < c && (o += this.IROM_ALIGN), o -= this.ROM_LOADER.BOOTLOADER_FLASH_OFFSET;
          const u = new at(0, new Uint8Array(o).fill(0), a);
          n = this.saveSegment(t, a, u, n), a += 8 + o, i++;
        }
        this.saveFlashSegment(t, a, l), a += 8 + l.data.length, i++;
      }
    } else {
      for (; s.length > 0; ) {
        const l = s[0], o = this.getAlignmentDataNeeded(l, a);
        if (o > 0) {
          if (r.length > 0 && o > this.SEG_HEADER_LEN) {
            const c = r[0].splitImage(o);
            r[0].data.length === 0 && r.shift(), n = this.saveSegment(t, a, c, n);
          } else {
            const c = new at(0, new Uint8Array(o).fill(0), a);
            n = this.saveSegment(t, a, c, n);
          }
          a += 8 + o, i++;
        } else {
          if ((a + 8) % this.IROM_ALIGN !== l.addr % this.IROM_ALIGN)
            throw new Error("Flash segment alignment mismatch");
          n = this.saveFlashSegment(t, a, l, n), s.shift(), a += 8 + l.data.length, i++;
        }
      }
      for (const l of r)
        n = this.saveSegment(t, a, l, n), a += 8 + l.data.length, i++;
    }
    if (this.securePad) {
      if (!this.appendDigest)
        throw new Error("secure_pad only applies if a SHA-256 digest is also appended to the image");
      const l = (a + this.SEG_HEADER_LEN) % this.IROM_ALIGN, o = 16;
      let c = 0;
      this.securePad === "1" ? c = 112 : this.securePad === "2" && (c = 32);
      const u = (this.IROM_ALIGN - l - o - c) % this.IROM_ALIGN, d = new at(0, new Uint8Array(u).fill(0), a);
      n = this.saveSegment(t, a, d, n), a += 8 + u, i++;
    }
    this.ramOnlyHeader || (this.appendChecksum(t, a, n), a = Ct(a, 16));
    const h = a;
    if (this.ramOnlyHeader ? t[1] = r.length : t[1] = i, this.appendDigest) {
      const l = await crypto.subtle.digest("SHA-256", t.slice(0, h)), o = new Uint8Array(l);
      t.set(o, h), a += 32;
    }
    if (this.padToSize && a % this.padToSize !== 0) {
      const l = this.padToSize - a % this.padToSize, o = new Uint8Array(l);
      o.fill(255), t.set(o, a), a += l;
    }
    return t;
  }
  loadExtendedHeader(i, t) {
    const a = new DataView(i.buffer, t);
    this.wpPin = a.getUint8(0);
    const n = a.getUint8(1);
    [this.clkDrv, this.qDrv] = this.splitByte(n);
    const s = a.getUint8(2);
    [this.dDrv, this.csDrv] = this.splitByte(s);
    const r = a.getUint8(3);
    [this.hdDrv, this.wpDrv] = this.splitByte(r), this.chipId = a.getUint8(4), this.chipId !== this.ROM_LOADER.IMAGE_CHIP_ID && console.warn(`Unexpected chip id in image. Expected ${this.ROM_LOADER.IMAGE_CHIP_ID} but value was ${this.chipId}. Is this image for a different chip model?`), this.minRev = a.getUint8(5), this.minRevFull = a.getUint16(6, !0), this.maxRevFull = a.getUint16(8, !0);
    const h = a.getUint8(15);
    if (h === 0 || h === 1)
      this.appendDigest = h === 1;
    else
      throw new Error(`Invalid value for append_digest field (0x${h.toString(16)}). Should be 0 or 1.`);
  }
  saveExtendedHeader(i, t) {
    const a = new ArrayBuffer(16), n = new DataView(a);
    n.setUint8(0, this.wpPin), n.setUint8(1, this.joinByte(this.clkDrv, this.qDrv)), n.setUint8(2, this.joinByte(this.dDrv, this.csDrv)), n.setUint8(3, this.joinByte(this.hdDrv, this.wpDrv)), n.setUint8(4, this.ROM_LOADER.IMAGE_CHIP_ID), n.setUint8(5, this.minRev), n.setUint16(6, this.minRevFull, !0), n.setUint16(8, this.maxRevFull, !0);
    for (let s = 9; s < 15; s++)
      n.setUint8(s, 0);
    n.setUint8(15, this.appendDigest ? 1 : 0), i.set(new Uint8Array(a), t);
  }
  splitByte(i) {
    return [i & 15, i >> 4 & 15];
  }
  joinByte(i, t) {
    return i & 15 | (t & 15) << 4;
  }
  getAlignmentDataNeeded(i, t) {
    const a = i.addr % this.IROM_ALIGN - this.SEG_HEADER_LEN;
    let n = this.IROM_ALIGN - t % this.IROM_ALIGN + a;
    return n === 0 || n === this.IROM_ALIGN ? 0 : (n -= this.SEG_HEADER_LEN, n < 0 && (n += this.IROM_ALIGN), n);
  }
}
class or extends ze {
  constructor(i, t = null) {
    super(i), this.version = 1, this.ROM_LOADER = i, this.flashMode = 0, this.flashSizeFreq = 0, t !== null && this.loadFromFile(t);
  }
  loadFromFile(i) {
    const t = i instanceof Uint8Array ? i : se(i);
    let a = 0;
    const n = this.loadCommonHeader(t, a, $t);
    a += 8;
    for (let s = 0; s < n; s++) {
      const r = this.loadSegment(t, a);
      a += 8 + r.data.length;
    }
    this.checksum = this.readChecksum(t, a), this.verify();
  }
  defaultOutputName(i) {
    return i + "-";
  }
}
class ft extends ze {
  constructor(i, t = null) {
    super(i), this.version = 2, this.ROM_LOADER = i, this.flashMode = 0, this.flashSizeFreq = 0, t !== null && this.loadFromFile(t);
  }
  async loadFromFile(i) {
    const t = i instanceof Uint8Array ? i : se(i);
    let a = 0;
    const n = this.loadCommonHeader(t, a, ft.IMAGE_V2_MAGIC);
    a += 8, n !== ft.IMAGE_V2_SEGMENT && console.warn(`Warning: V2 header has unexpected "segment" count ${n} (usually 4)`);
    const s = this.flashMode, r = this.flashSizeFreq, h = this.entrypoint, l = this.loadSegment(t, a, !0);
    l.addr = 0, l.includeInChecksum = !1, a += 8 + l.data.length;
    const o = this.loadCommonHeader(t, a, $t);
    a += 8, s !== this.flashMode && console.warn(`WARNING: Flash mode value in first header (0x${s.toString(16)}) disagrees with second (0x${this.flashMode.toString(16)}). Using second value.`), r !== this.flashSizeFreq && console.warn(`WARNING: Flash size/freq value in first header (0x${r.toString(16)}) disagrees with second (0x${this.flashSizeFreq.toString(16)}). Using second value.`), h !== this.entrypoint && console.warn(`WARNING: Entrypoint address in first header (0x${h.toString(16)}) disagrees with second header (0x${this.entrypoint.toString(16)}). Using second value.`);
    for (let c = 0; c < o; c++) {
      const u = this.loadSegment(t, a);
      a += 8 + u.data.length;
    }
    this.checksum = this.readChecksum(t, a), this.verify();
  }
  defaultOutputName(i) {
    const t = this.getIromSegment();
    let a = 0;
    t !== null && (a = t.addr - bt.IROM_MAP_START);
    const n = i.replace(/\.[^/.]+$/, ""), s = a & -4096;
    return `${n}-0x${s.toString(16).padStart(5, "0")}.bin`;
  }
}
ft.IMAGE_V2_MAGIC = 234;
ft.IMAGE_V2_SEGMENT = 4;
class hr extends nt {
  constructor(i, t = null, a = !0, n = !1) {
    super(i, t, a, n), this.ROM_LOADER = i;
  }
}
class lr extends nt {
  constructor(i, t = null, a = !0, n = !1) {
    super(i, t, a, n), this.ROM_LOADER = i;
  }
}
class cr extends nt {
  constructor(i, t = null, a = !0, n = !1) {
    super(i, t, a, n), this.ROM_LOADER = i;
  }
}
class fr extends nt {
  constructor(i, t = null, a = !0, n = !1) {
    super(i, t, a, n), this.MMU_PAGE_SIZE_CONF = [16384, 32768, 65536], this.ROM_LOADER = i;
  }
}
class $e extends nt {
  constructor(i, t = null, a = !0, n = !1) {
    super(i, t, a, n), this.MMU_PAGE_SIZE_CONF = [8192, 16384, 32768, 65536], this.ROM_LOADER = i;
  }
}
class dr extends $e {
  constructor(i, t = null, a = !0, n = !1) {
    super(i, t, a, n), this.ROM_LOADER = i;
  }
}
class _r extends nt {
  constructor(i, t = null, a = !0, n = !1) {
    super(i, t, a, n), this.ROM_LOADER = i;
  }
}
class ur extends nt {
  constructor(i, t = null, a = !0, n = !1) {
    super(i, t, a, n), this.ROM_LOADER = i;
  }
}
class gr extends $e {
  constructor(i, t = null, a = !0, n = !1) {
    super(i, t, a, n), this.ROM_LOADER = i;
  }
}
async function Pi(e, i) {
  const t = i instanceof Uint8Array ? i : se(i), a = e.CHIP_NAME.toLowerCase().replace(/[-()]/g, "");
  let n;
  if (a !== "esp8266")
    switch (a) {
      case "esp32":
        n = nt;
        break;
      case "esp32s2":
        n = hr;
        break;
      case "esp32s3":
        n = lr;
        break;
      case "esp32c3":
        n = cr;
        break;
      case "esp32c2":
        n = fr;
        break;
      case "esp32c6":
        n = $e;
        break;
      case "esp32c61":
        n = dr;
        break;
      case "esp32c5":
        n = _r;
        break;
      case "esp32h2":
        n = gr;
        break;
      case "esp32p4":
        n = ur;
        break;
      default:
        throw new T(`Unsupported chip name: ${a}`);
    }
  else {
    const h = t[0];
    if (h === $t)
      n = or;
    else if (h === ft.IMAGE_V2_MAGIC)
      n = ft;
    else
      throw new T(`Invalid image magic number: ${h}`);
  }
  const s = new n(e), r = s;
  if (typeof r.loadFromFile == "function") {
    const h = r.loadFromFile(t);
    h instanceof Promise && await h;
  }
  return s;
}
async function wr(e) {
  switch (e) {
    case 15736195: {
      const { ESP32ROM: i } = await import("./esp32-DVoTa3CL.mjs");
      return new i();
    }
    case 203546735:
    case 1867591791:
    case 2084675695: {
      const { ESP32C2ROM: i } = await import("./esp32c2-D2PXr4sv.mjs");
      return new i();
    }
    case 1763790959:
    case 456216687:
    case 1216438383:
    case 1130455151: {
      const { ESP32C3ROM: i } = await import("./esp32c3-CCh5I3_i.mjs");
      return new i();
    }
    case 752910447: {
      const { ESP32C6ROM: i } = await import("./esp32c6-XPZuwE4W.mjs");
      return new i();
    }
    case 606167151:
    case 871374959:
    case 1333878895: {
      const { ESP32C61ROM: i } = await import("./esp32c61-DttKHk0f.mjs");
      return new i();
    }
    case 285294703:
    case 1675706479:
    case 1607549039: {
      const { ESP32C5ROM: i } = await import("./esp32c5-Dgti22Z4.mjs");
      return new i();
    }
    case 3619110528:
    case 2548236392: {
      const { ESP32H2ROM: i } = await import("./esp32h2-CLI6DaxR.mjs");
      return new i();
    }
    case 9: {
      const { ESP32S3ROM: i } = await import("./esp32s3-DvncYVbP.mjs");
      return new i();
    }
    case 1990: {
      const { ESP32S2ROM: i } = await import("./esp32s2-rIk6gPXf.mjs");
      return new i();
    }
    case 4293968129: {
      const { ESP8266ROM: i } = await Promise.resolve().then(() => rr);
      return new i();
    }
    case 0:
    case 182303440:
    case 117676761: {
      const { ESP32P4ROM: i } = await import("./esp32p4-D4fGUH2k.mjs");
      return new i();
    }
    default:
      return null;
  }
}
class pr {
  /**
   * Create a new ESPLoader to perform serial communication
   * such as read/write flash memory and registers using a LoaderOptions object.
   * @param {LoaderOptions} options - LoaderOptions object argument for ESPLoader.
   * ```
   * const myLoader = new ESPLoader({ transport: Transport, baudrate: number, terminal?: IEspLoaderTerminal });
   * ```
   */
  constructor(i) {
    var t, a, n, s, r, h, l, o;
    this.ESP_RAM_BLOCK = 6144, this.ESP_FLASH_BEGIN = 2, this.ESP_FLASH_DATA = 3, this.ESP_FLASH_END = 4, this.ESP_MEM_BEGIN = 5, this.ESP_MEM_END = 6, this.ESP_MEM_DATA = 7, this.ESP_WRITE_REG = 9, this.ESP_READ_REG = 10, this.ESP_SPI_ATTACH = 13, this.ESP_CHANGE_BAUDRATE = 15, this.ESP_FLASH_DEFL_BEGIN = 16, this.ESP_FLASH_DEFL_DATA = 17, this.ESP_FLASH_DEFL_END = 18, this.ESP_SPI_FLASH_MD5 = 19, this.ESP_ERASE_FLASH = 208, this.ESP_ERASE_REGION = 209, this.ESP_READ_FLASH = 210, this.ESP_RUN_USER_CODE = 211, this.ESP_IMAGE_MAGIC = 233, this.ESP_CHECKSUM_MAGIC = 239, this.ROM_INVALID_RECV_MSG = 5, this.DEFAULT_TIMEOUT = 3e3, this.ERASE_REGION_TIMEOUT_PER_MB = 3e4, this.ERASE_WRITE_TIMEOUT_PER_MB = 4e4, this.MD5_TIMEOUT_PER_MB = 8e3, this.CHIP_ERASE_TIMEOUT = 12e4, this.FLASH_READ_TIMEOUT = 1e5, this.MAX_TIMEOUT = this.CHIP_ERASE_TIMEOUT * 2, this.SPI_ADDR_REG_MSB = !0, this.CHIP_DETECT_MAGIC_REG_ADDR = 1073745920, this.DETECTED_FLASH_SIZES = {
      18: "256KB",
      19: "512KB",
      20: "1MB",
      21: "2MB",
      22: "4MB",
      23: "8MB",
      24: "16MB",
      25: "32MB",
      26: "64MB",
      27: "128MB",
      28: "256MB",
      32: "64MB",
      33: "128MB",
      34: "256MB",
      50: "256KB",
      51: "512KB",
      52: "1MB",
      53: "2MB",
      54: "4MB",
      55: "8MB",
      56: "16MB",
      57: "32MB",
      58: "64MB"
    }, this.USB_JTAG_SERIAL_PID = 4097, this.romBaudrate = 115200, this.debugLogging = !1, this.syncStubDetected = !1, this.IS_STUB = !1, this.FLASH_WRITE_SIZE = 16384, this.transport = i.transport, this.baudrate = i.baudrate, this.resetConstructors = {
      classicReset: (c, u) => new Ys(c, u),
      customReset: (c, u) => new tr(c, u),
      hardReset: (c, u) => new Js(c, u),
      usbJTAGSerialReset: (c) => new Xs(c)
    }, i.serialOptions && (this.serialOptions = i.serialOptions), i.terminal && (this.terminal = i.terminal, this.terminal.clean()), typeof i.debugLogging < "u" && (this.debugLogging = i.debugLogging), i.port && (this.transport = new Ea(i.port)), typeof i.enableTracing < "u" && (this.transport.tracing = i.enableTracing), !((t = i.resetConstructors) === null || t === void 0) && t.classicReset && (this.resetConstructors.classicReset = (a = i.resetConstructors) === null || a === void 0 ? void 0 : a.classicReset), !((n = i.resetConstructors) === null || n === void 0) && n.customReset && (this.resetConstructors.customReset = (s = i.resetConstructors) === null || s === void 0 ? void 0 : s.customReset), !((r = i.resetConstructors) === null || r === void 0) && r.hardReset && (this.resetConstructors.hardReset = (h = i.resetConstructors) === null || h === void 0 ? void 0 : h.hardReset), !((l = i.resetConstructors) === null || l === void 0) && l.usbJTAGSerialReset && (this.resetConstructors.usbJTAGSerialReset = (o = i.resetConstructors) === null || o === void 0 ? void 0 : o.usbJTAGSerialReset), this.info("esptool.js"), this.info("Serial port " + this.transport.getInfo());
  }
  /**
   * Write to ESP Loader constructor's terminal with or without new line.
   * @param {string} str - String to write.
   * @param {boolean} withNewline - Add new line at the end ?
   */
  write(i, t = !0) {
    this.terminal ? t ? this.terminal.writeLine(i) : this.terminal.write(i) : console.log(i);
  }
  /**
   * Write error message to ESP Loader constructor's terminal with or without new line.
   * @param {string} str - String to write.
   * @param {boolean} withNewline - Add new line at the end ?
   */
  error(i, t = !0) {
    this.write(`Error: ${i}`, t);
  }
  /**
   * Write information message to ESP Loader constructor's terminal with or without new line.
   * @param {string} str - String to write.
   * @param {boolean} withNewline - Add new line at the end ?
   */
  info(i, t = !0) {
    this.write(i, t);
  }
  /**
   * Write debug message to ESP Loader constructor's terminal with or without new line.
   * @param {string} str - String to write.
   * @param {boolean} withNewline - Add new line at the end ?
   */
  debug(i, t = !0) {
    this.debugLogging && this.write(`Debug: ${i}`, t);
  }
  /**
   * Convert short integer to byte array
   * @param {number} i - Number to convert.
   * @returns {Uint8Array} Byte array.
   */
  _shortToBytearray(i) {
    return new Uint8Array([i & 255, i >> 8 & 255]);
  }
  /**
   * Convert an integer to byte array
   * @param {number} i - Number to convert.
   * @returns {ROM} The chip ROM class related to given magic hex number.
   */
  _intToByteArray(i) {
    return new Uint8Array([i & 255, i >> 8 & 255, i >> 16 & 255, i >> 24 & 255]);
  }
  /**
   * Convert a byte array to short integer.
   * @param {number} i - Number to convert.
   * @param {number} j - Number to convert.
   * @returns {number} Return a short integer number.
   */
  _byteArrayToShort(i, t) {
    return i | t >> 8;
  }
  /**
   * Convert a byte array to integer.
   * @param {number} i - Number to convert.
   * @param {number} j - Number to convert.
   * @param {number} k - Number to convert.
   * @param {number} l - Number to convert.
   * @returns {number} Return a integer number.
   */
  _byteArrayToInt(i, t, a, n) {
    return i | t << 8 | a << 16 | n << 24;
  }
  /**
   * Append a buffer array after another buffer array
   * @param {ArrayBuffer} buffer1 - First array buffer.
   * @param {ArrayBuffer} buffer2 - magic hex number to select ROM.
   * @returns {ArrayBufferLike} Return an array buffer.
   */
  _appendBuffer(i, t) {
    const a = new Uint8Array(i.byteLength + t.byteLength);
    return a.set(new Uint8Array(i), 0), a.set(new Uint8Array(t), i.byteLength), a.buffer;
  }
  /**
   * Append a buffer array after another buffer array
   * @param {Uint8Array} arr1 - First array buffer.
   * @param {Uint8Array} arr2 - magic hex number to select ROM.
   * @returns {Uint8Array} Return a 8 bit unsigned array.
   */
  _appendArray(i, t) {
    const a = new Uint8Array(i.length + t.length);
    return a.set(i, 0), a.set(t, i.length), a;
  }
  /**
   * Convert a unsigned 8 bit integer array to byte string.
   * @param {Uint8Array} u8Array - magic hex number to select ROM.
   * @returns {string} Return the equivalent string.
   */
  ui8ToBstr(i) {
    let t = "";
    for (let a = 0; a < i.length; a++)
      t += String.fromCharCode(i[a]);
    return t;
  }
  /**
   * Convert a byte string to unsigned 8 bit integer array.
   * @param {string} bStr - binary string input
   * @returns {Uint8Array} Return a 8 bit unsigned integer array.
   */
  bstrToUi8(i) {
    const t = new Uint8Array(i.length);
    for (let a = 0; a < i.length; a++)
      t[a] = i.charCodeAt(a);
    return t;
  }
  /**
   * Use the device serial port read function with given timeout to create a valid packet.
   * @param {number} op Operation number
   * @param {number} timeout timeout number in milliseconds
   * @returns {[number, Uint8Array]} valid response packet.
   */
  async readPacket(i = null, t = this.DEFAULT_TIMEOUT) {
    for (let a = 0; a < 100; a++) {
      const n = await this.transport.read(t);
      if (!n || n.length < 8)
        continue;
      const s = n[0];
      if (s !== 1)
        continue;
      const r = n[1], h = this._byteArrayToInt(n[4], n[5], n[6], n[7]), l = n.slice(8);
      if (s == 1) {
        if (i == null || r == i)
          return [h, l];
        if (l[0] != 0 && l[1] == this.ROM_INVALID_RECV_MSG)
          throw this.transport.flushInput(), new T("unsupported command error");
      }
    }
    throw new T("invalid response");
  }
  /**
   * Write a serial command to the chip
   * @param {number} op - Operation number
   * @param {Uint8Array} data - Unsigned 8 bit array
   * @param {number} chk - channel number
   * @param {boolean} waitResponse - wait for response ?
   * @param {number} timeout - timeout number in milliseconds
   * @returns {Promise<[number, Uint8Array]>} Return a number and a 8 bit unsigned integer array.
   */
  async command(i = null, t = new Uint8Array(0), a = 0, n = !0, s = this.DEFAULT_TIMEOUT) {
    if (i != null) {
      this.transport.tracing && this.transport.trace(`command op:0x${i.toString(16).padStart(2, "0")} data len=${t.length} wait_response=${n ? 1 : 0} timeout=${(s / 1e3).toFixed(3)} data=${this.transport.hexConvert(t)}`);
      const r = new Uint8Array(8 + t.length);
      r[0] = 0, r[1] = i, r[2] = this._shortToBytearray(t.length)[0], r[3] = this._shortToBytearray(t.length)[1], r[4] = this._intToByteArray(a)[0], r[5] = this._intToByteArray(a)[1], r[6] = this._intToByteArray(a)[2], r[7] = this._intToByteArray(a)[3];
      let h;
      for (h = 0; h < t.length; h++)
        r[8 + h] = t[h];
      await this.transport.write(r);
    }
    return n ? this.readPacket(i, s) : [0, new Uint8Array(0)];
  }
  /**
   * Read a register from chip.
   * @param {number} addr - Register address number
   * @param {number} timeout - Timeout in milliseconds (Default: 3000ms)
   * @returns {number} - Command number value
   */
  async readReg(i, t = this.DEFAULT_TIMEOUT) {
    this.debug(`Read Register:${this.toHex(i)}`);
    const a = this._intToByteArray(i), n = await this.command(this.ESP_READ_REG, a, void 0, void 0, t);
    return this.debug(`Read Register Value:${n[0]}`), n[0];
  }
  /**
   * Write a number value to register address in chip.
   * @param {number} addr - Register address number
   * @param {number} value - Number value to write in register
   * @param {number} mask - Hex number for mask
   * @param {number} delayUs Delay number
   * @param {number} delayAfterUs Delay after previous delay
   */
  async writeReg(i, t, a = 4294967295, n = 0, s = 0) {
    let r = this._appendArray(this._intToByteArray(i), this._intToByteArray(t));
    r = this._appendArray(r, this._intToByteArray(a)), r = this._appendArray(r, this._intToByteArray(n)), s > 0 && (r = this._appendArray(r, this._intToByteArray(this.chip.UART_DATE_REG_ADDR)), r = this._appendArray(r, this._intToByteArray(0)), r = this._appendArray(r, this._intToByteArray(0)), r = this._appendArray(r, this._intToByteArray(s))), await this.checkCommand("write target memory", this.ESP_WRITE_REG, r);
  }
  /**
   * Sync chip by sending sync command.
   * @returns {[number, Uint8Array]} Command result
   */
  async sync() {
    this.debug("Sync");
    const i = new Uint8Array(36);
    let t;
    for (i[0] = 7, i[1] = 7, i[2] = 18, i[3] = 32, t = 0; t < 32; t++)
      i[4 + t] = 85;
    try {
      let a = await this.command(8, i, void 0, void 0, 100);
      this.syncStubDetected = a[0] === 0;
      for (let n = 0; n < 7; n++)
        a = await this.readPacket(8, 100), this.syncStubDetected = this.syncStubDetected && a[0] === 0;
      return a;
    } catch (a) {
      throw this.debug("Sync err " + a), a;
    }
  }
  /**
   * Attempt to connect to the chip by sending a reset sequence and later a sync command.
   * @param {string} mode - Reset mode to use
   * @param {ResetStrategy} resetStrategy - Reset strategy class to use for connect
   * @returns {string} - Returns 'success' or 'error' message.
   */
  async _connectAttempt(i = "default_reset", t) {
    this.debug("_connect_attempt " + i), t && await t.reset();
    const a = this.transport.peek(), n = Array.from(a, (u) => String.fromCharCode(u)).join(""), s = /boot:(0x[0-9a-fA-F]+)([\s\S]*?waiting for download)?/, r = n.match(s);
    let h = !1, l = "", o = !1;
    r && (h = !0, l = r[1], o = !!r[2]), this.debug(`bootMode:${l} downloadMode:${o}`);
    let c = "";
    for (let u = 0; u < 5; u++)
      try {
        this.debug(`Sync connect attempt ${u}`), this.transport.flushInput();
        const d = await this.sync();
        return this.debug(d[0].toString()), "success";
      } catch (d) {
        this.debug(`Error at sync ${d}`), d instanceof Error ? c = d.message : typeof d == "string" ? c = d : c = JSON.stringify(d);
      }
    return h && (c = `Wrong boot mode detected (${l}).
        This chip needs to be in download mode.`, o && (c = `Download mode successfully detected, but getting no sync reply:
           The serial TX path seems to be down.`)), c;
  }
  /**
   * Constructs a sequence of reset strategies based on the OS,
   * used ESP chip, external settings, and environment variables.
   * Returns a tuple of one or more reset strategies to be tried sequentially.
   * @param {string} mode - Reset mode to use
   * @returns {ResetStrategy[]} - Array of reset strategies
   */
  constructResetSequence(i) {
    if (i !== "no_reset") {
      if (i === "usb_reset" || this.transport.getPid() === this.USB_JTAG_SERIAL_PID) {
        if (this.resetConstructors.usbJTAGSerialReset)
          return this.debug("using USB JTAG Serial Reset"), [this.resetConstructors.usbJTAGSerialReset(this.transport)];
      } else if (this.resetConstructors.classicReset)
        return this.debug("using Classic Serial Reset"), [
          this.resetConstructors.classicReset(this.transport, 50),
          this.resetConstructors.classicReset(this.transport, 550)
        ];
    }
    return [];
  }
  /**
   * Perform a connection to chip.
   * @param {string} mode - Reset mode to use. Example: 'default_reset' | 'no_reset'
   * @param {number} attempts - Number of connection attempts
   * @param {boolean} detecting - Detect the connected chip
   */
  async connect(i = "default_reset", t = 7, a = !0) {
    let n;
    this.info("Connecting...", !1), await this.transport.connect(this.romBaudrate, this.serialOptions), this.transport.readLoop();
    const s = this.constructResetSequence(i);
    for (let r = 0; r < t; r++) {
      const h = s.length > 0 ? s[r % s.length] : null;
      if (n = await this._connectAttempt(i, h), n === "success")
        break;
    }
    if (n !== "success")
      throw new T("Failed to connect with the device");
    if (this.debug("Connect attempt successful."), this.info(`
\r`, !1), a) {
      const r = await this.readReg(this.CHIP_DETECT_MAGIC_REG_ADDR) >>> 0;
      this.debug("Chip Magic " + r.toString(16));
      const h = await wr(r);
      if (typeof this.chip === null)
        throw new T(`Unexpected CHIP magic value ${r}. Failed to autodetect chip type.`);
      this.chip = h;
    }
  }
  /**
   * Connect and detect the existing chip.
   * @param {string} mode Reset mode to use for connection.
   */
  async detectChip(i = "default_reset") {
    await this.connect(i), this.info("Detecting chip type... ", !1), this.chip != null ? this.info(this.chip.CHIP_NAME) : this.info("unknown!");
  }
  /**
   * Execute the command and check the command response.
   * @param {string} opDescription Command operation description.
   * @param {number} op Command operation number
   * @param {Uint8Array} data Command value
   * @param {number} chk Checksum to use
   * @param {number} responseDataLength Length of the response data to expect
   * @param {number} timeout TImeout number in milliseconds (ms)
   * @returns {number} Command result
   */
  async checkCommand(i = "", t = null, a = new Uint8Array(0), n = 0, s = 0, r = this.DEFAULT_TIMEOUT) {
    this.debug("check_command " + i);
    const h = 2, l = await this.command(t, a, n, void 0, r);
    if (l && l[1] && l[1].length < s + h) {
      const c = l[1].slice(0, 2);
      throw c[0] !== 0 ? new T(`Failed to ${i} failed with status ${c}`) : new T(`Failed to ${i}.
 Only got ${l[1].length} bytes of data.`);
    }
    const o = l[1].slice(s, s + h);
    if (o[0] !== 0)
      throw new T(`Failed to ${i} failed with status ${o}`);
    return s > 0 ? l[1].slice(0, s) : l[0];
  }
  /**
   * Start downloading an application image to RAM
   * @param {number} size Image size number
   * @param {number} blocks Number of data blocks
   * @param {number} blocksize Size of each data block
   * @param {number} offset Image offset number
   */
  async memBegin(i, t, a, n) {
    if (this.IS_STUB) {
      const r = n, h = n + i, l = this.chip.getChipRevision ? await this.chip.getChipRevision(this) : void 0, o = await Li(this.chip.CHIP_NAME, l);
      if (o) {
        const c = [
          [o.bss_start || o.data_start, o.data_start + o.decodedData.length],
          [o.text_start, o.text_start + o.decodedText.length]
        ];
        for (const [u, d] of c)
          if (r < d && h > u)
            throw new T(`Software loader is resident at 0x${u.toString(16).padStart(8, "0")}-0x${d.toString(16).padStart(8, "0")}.
            Can't load binary at overlapping address range 0x${r.toString(16).padStart(8, "0")}-0x${h.toString(16).padStart(8, "0")}.
            Either change binary loading address, or use the no-stub option to disable the software loader.`);
      }
    }
    this.debug("mem_begin " + i + " " + t + " " + a + " " + n.toString(16));
    let s = this._appendArray(this._intToByteArray(i), this._intToByteArray(t));
    s = this._appendArray(s, this._intToByteArray(a)), s = this._appendArray(s, this._intToByteArray(n)), await this.checkCommand("enter RAM download mode", this.ESP_MEM_BEGIN, s);
  }
  /**
   * Get the checksum for given unsigned 8-bit array
   * @param {Uint8Array} data Unsigned 8-bit integer array
   * @param {number} state Initial checksum
   * @returns {number} - Array checksum
   */
  checksum(i, t = this.ESP_CHECKSUM_MAGIC) {
    for (let a = 0; a < i.length; a++)
      t ^= i[a];
    return t;
  }
  /**
   * Send a block of image to RAM
   * @param {Uint8Array} buffer Unsigned 8-bit array
   * @param {number} seq Sequence number
   */
  async memBlock(i, t) {
    let a = this._appendArray(this._intToByteArray(i.length), this._intToByteArray(t));
    a = this._appendArray(a, this._intToByteArray(0)), a = this._appendArray(a, this._intToByteArray(0)), a = this._appendArray(a, i);
    const n = this.checksum(i);
    await this.checkCommand("write to target RAM", this.ESP_MEM_DATA, a, n);
  }
  /**
   * Leave RAM download mode and run application
   * @param {number} entrypoint - Entrypoint number
   */
  async memFinish(i) {
    const t = i === 0 ? 1 : 0, a = this._appendArray(this._intToByteArray(t), this._intToByteArray(i));
    await this.checkCommand("leave RAM download mode", this.ESP_MEM_END, a, void 0, void 0, 200);
  }
  /**
   * Configure SPI flash pins
   * @param {number} hspiArg -  Argument for SPI attachment
   */
  async flashSpiAttach(i) {
    const t = this._intToByteArray(i);
    await this.checkCommand("configure SPI flash pins", this.ESP_SPI_ATTACH, t);
  }
  /**
   * Scale timeouts which are size-specific.
   * @param {number} secondsPerMb Seconds per megabytes as number
   * @param {number} sizeBytes Size bytes number
   * @returns {number} - Scaled timeout for specified size.
   */
  timeoutPerMb(i, t) {
    const a = i * (t / 1e6);
    return a < 3e3 ? 3e3 : a;
  }
  /**
   * Start downloading to Flash (performs an erase)
   * @param {number} size Size to erase
   * @param {number} offset Offset to erase
   * @returns {number} Number of blocks (of size self.FLASH_WRITE_SIZE) to write.
   */
  async flashBegin(i, t) {
    const a = Math.floor((i + this.FLASH_WRITE_SIZE - 1) / this.FLASH_WRITE_SIZE), n = this.chip.getEraseSize(t, i), s = /* @__PURE__ */ new Date(), r = s.getTime();
    let h = 3e3;
    this.IS_STUB == !1 && (h = this.timeoutPerMb(this.ERASE_REGION_TIMEOUT_PER_MB, i)), this.debug("flash begin " + n + " " + a + " " + this.FLASH_WRITE_SIZE + " " + t + " " + i);
    let l = this._appendArray(this._intToByteArray(n), this._intToByteArray(a));
    l = this._appendArray(l, this._intToByteArray(this.FLASH_WRITE_SIZE)), l = this._appendArray(l, this._intToByteArray(t)), this.IS_STUB == !1 && (l = this._appendArray(l, this._intToByteArray(0))), await this.checkCommand("enter Flash download mode", this.ESP_FLASH_BEGIN, l, void 0, void 0, h);
    const o = s.getTime();
    return i != 0 && this.IS_STUB == !1 && this.info("Took " + (o - r) / 1e3 + "." + (o - r) % 1e3 + "s to erase flash block"), a;
  }
  /**
   * Start downloading compressed data to Flash (performs an erase)
   * @param {number} size Write size
   * @param {number} compsize Compressed size
   * @param {number} offset Offset for write
   * @returns {number} Returns number of blocks (size self.FLASH_WRITE_SIZE) to write.
   */
  async flashDeflBegin(i, t, a) {
    const n = Math.floor((t + this.FLASH_WRITE_SIZE - 1) / this.FLASH_WRITE_SIZE), s = Math.floor((i + this.FLASH_WRITE_SIZE - 1) / this.FLASH_WRITE_SIZE), r = /* @__PURE__ */ new Date(), h = r.getTime();
    let l, o;
    this.IS_STUB ? (l = i, o = this.DEFAULT_TIMEOUT) : (l = s * this.FLASH_WRITE_SIZE, o = this.timeoutPerMb(this.ERASE_REGION_TIMEOUT_PER_MB, l)), this.info("Compressed " + i + " bytes to " + t + "...");
    let c = this._appendArray(this._intToByteArray(l), this._intToByteArray(n));
    c = this._appendArray(c, this._intToByteArray(this.FLASH_WRITE_SIZE)), c = this._appendArray(c, this._intToByteArray(a)), (this.chip.CHIP_NAME === "ESP32-S2" || this.chip.CHIP_NAME === "ESP32-S3" || this.chip.CHIP_NAME === "ESP32-C3" || this.chip.CHIP_NAME === "ESP32-C2") && this.IS_STUB === !1 && (c = this._appendArray(c, this._intToByteArray(0))), await this.checkCommand("enter compressed flash mode", this.ESP_FLASH_DEFL_BEGIN, c, void 0, void 0, o);
    const u = r.getTime();
    return i != 0 && this.IS_STUB === !1 && this.info("Took " + (u - h) / 1e3 + "." + (u - h) % 1e3 + "s to erase flash block"), n;
  }
  /**
   * Write block to flash, retry if fail
   * @param {Uint8Array} data Unsigned 8-bit array data.
   * @param {number} seq Sequence number
   * @param {number} timeout Timeout in milliseconds (ms)
   * @returns {Promise<void>} Promise that resolves when the block is written.
   */
  async flashBlock(i, t, a) {
    let n = this._appendArray(this._intToByteArray(i.length), this._intToByteArray(t));
    n = this._appendArray(n, this._intToByteArray(0)), n = this._appendArray(n, this._intToByteArray(0)), n = this._appendArray(n, i);
    const s = this.checksum(i);
    await this.checkCommand("write to target Flash after seq " + t, this.ESP_FLASH_DATA, n, s, void 0, a);
  }
  /**
   * Write block to flash, send compressed, retry if fail
   * @param {Uint8Array} data Unsigned int 8-bit array data to write
   * @param {number} seq Sequence number
   * @param {number} timeout Timeout in milliseconds (ms)
   */
  async flashDeflBlock(i, t, a) {
    let n = this._appendArray(this._intToByteArray(i.length), this._intToByteArray(t));
    n = this._appendArray(n, this._intToByteArray(0)), n = this._appendArray(n, this._intToByteArray(0)), n = this._appendArray(n, i);
    const s = this.checksum(i);
    this.debug("flash_defl_block " + i[0].toString(16) + " " + i[1].toString(16)), await this.checkCommand("write compressed data to flash after seq " + t, this.ESP_FLASH_DEFL_DATA, n, s, void 0, a);
  }
  /**
   * Leave flash mode and run/reboot
   * @param {boolean} reboot Reboot after leaving flash mode ?
   * @param {number} timeout Timeout in milliseconds (ms)
   * @returns {Promise<void>} Promise that resolves when the flash mode is left.
   */
  async flashFinish(i = !1, t = this.DEFAULT_TIMEOUT) {
    const a = i ? 0 : 1, n = this._intToByteArray(a);
    await this.checkCommand("leave Flash mode", this.ESP_FLASH_END, n, void 0, void 0, t);
  }
  /**
   * Leave compressed flash mode and run/reboot
   * @param {boolean} reboot Reboot after leaving flash mode ?
   * @param {number} timeout Timeout in milliseconds (ms)
   * @returns {Promise<void>} Promise that resolves when the compressed flash mode is left.
   */
  async flashDeflFinish(i = !1, t = this.DEFAULT_TIMEOUT) {
    const a = i ? 0 : 1, n = this._intToByteArray(a);
    await this.checkCommand("leave compressed flash mode", this.ESP_FLASH_DEFL_END, n, void 0, void 0, t);
  }
  /**
   * Run an arbitrary SPI flash command.
   *
   * This function uses the "USR_COMMAND" functionality in the ESP
   * SPI hardware, rather than the precanned commands supported by
   * hardware. So the value of spiflashCommand is an actual command
   * byte, sent over the wire.
   *
   * After writing command byte, writes 'data' to MOSI and then
   * reads back 'readBits' of reply on MISO. Result is a number.
   * @param {number} spiflashCommand Command to execute in SPI
   * @param {Uint8Array} data Data to send
   * @param {number} readBits Number of bits to read
   * @param {number} addr Address to use
   * @param {number} addrLen Length of address
   * @param {number} dummyLen length of dummy
   * @returns {number} Register SPI_W0_REG value
   */
  async runSpiflashCommand(i, t, a, n = null, s = 0, r = 0) {
    const d = this.chip.SPI_REG_BASE, f = d + 0, g = d + 4, A = d + this.chip.SPI_USR_OFFS, p = d + this.chip.SPI_USR1_OFFS, b = d + this.chip.SPI_USR2_OFFS, S = d + this.chip.SPI_W0_OFFS;
    let E;
    this.chip.SPI_MOSI_DLEN_OFFS != null ? E = async (P, U) => {
      const z = d + this.chip.SPI_MOSI_DLEN_OFFS, re = d + this.chip.SPI_MISO_DLEN_OFFS;
      P > 0 && await this.writeReg(z, P - 1), U > 0 && await this.writeReg(re, U - 1);
      let _t = 0;
      r > 0 && (_t |= r - 1), s > 0 && (_t |= s - 1 << D), _t && await this.writeReg(p, _t);
    } : E = async (P, U) => {
      const z = p, re = 17, _t = 8, ma = P === 0 ? 0 : P - 1;
      let oe = (U === 0 ? 0 : U - 1) << _t | ma << re;
      r > 0 && (oe |= r - 1), s > 0 && (oe |= s - 1 << D), await this.writeReg(z, oe);
    };
    const _ = 1 << 18, R = 28, D = 26;
    if (a > 32)
      throw new T("Reading more than 32 bits back from a SPI flash operation is unsupported");
    if (t.length > 64)
      throw new T("Writing more than 64 bytes of data with one SPI command is unsupported");
    const w = t.length * 8, k = await this.readReg(A), x = await this.readReg(b);
    let m = -2147483648;
    a > 0 && (m |= 268435456), w > 0 && (m |= 134217728), s > 0 && (m |= 1073741824), r > 0 && (m |= 536870912), await E(w, a), await this.writeReg(A, m);
    let y = 7 << R | i;
    if (await this.writeReg(b, y), n && s > 0 && (this.SPI_ADDR_REG_MSB && (n = n << 32 - s), await this.writeReg(g, n)), w == 0)
      await this.writeReg(S, 0);
    else {
      t = Le(t, 4, 0);
      const P = [];
      for (let z = 0; z < t.length; z += 4)
        P.push((t[z] | t[z + 1] << 8 | t[z + 2] << 16 | t[z + 3] << 24) >>> 0);
      let U = S;
      for (const z of P)
        await this.writeReg(U, z), U += 4;
    }
    await this.writeReg(f, _);
    let H;
    for (H = 0; H < 10 && (y = await this.readReg(f) & _, y != 0); H++)
      ;
    if (H === 10)
      throw new T("SPI command did not complete in time");
    const Gt = await this.readReg(S);
    return await this.writeReg(A, k), await this.writeReg(b, x), Gt;
  }
  /**
   * Read flash id by executing the SPIFLASH_RDID flash command.
   * @returns {Promise<number>} Register SPI_W0_REG value
   */
  async readFlashId() {
    const t = new Uint8Array(0);
    return await this.runSpiflashCommand(159, t, 24);
  }
  /**
   * Execute the erase flash command
   * @returns {Promise<number | Uint8Array>} Erase flash command result
   */
  async eraseFlash() {
    this.info("Erasing flash (this may take a while)...");
    let i = /* @__PURE__ */ new Date();
    const t = i.getTime(), a = await this.checkCommand("erase flash", this.ESP_ERASE_FLASH, void 0, void 0, void 0, this.CHIP_ERASE_TIMEOUT);
    i = /* @__PURE__ */ new Date();
    const n = i.getTime();
    return this.info("Chip erase completed successfully in " + (n - t) / 1e3 + "s"), a;
  }
  /**
   * Convert a number or unsigned 8-bit array to hex string
   * @param {number | Uint8Array } buffer Data to convert to hex string.
   * @returns {string} A hex string
   */
  toHex(i) {
    return Array.prototype.map.call(i, (t) => ("00" + t.toString(16)).slice(-2)).join("");
  }
  /**
   * Calculate the MD5 Checksum command
   * @param {number} addr Address number
   * @param {number} size Package size
   * @returns {string} MD5 Checksum string
   */
  async flashMd5sum(i, t) {
    const a = this.timeoutPerMb(this.MD5_TIMEOUT_PER_MB, t);
    let n = this._appendArray(this._intToByteArray(i), this._intToByteArray(t));
    n = this._appendArray(n, this._intToByteArray(0)), n = this._appendArray(n, this._intToByteArray(0));
    const h = this.IS_STUB ? 16 : 32, l = await this.checkCommand("calculate md5sum", this.ESP_SPI_FLASH_MD5, n, void 0, h, a);
    return this.toHex(l);
  }
  /**
   * Read flash memory from the chip.
   * @param {number} addr Address number
   * @param {number} size Package size
   * @param {FlashReadCallback} onPacketReceived Callback function to call when packet is received
   * @returns {Uint8Array} Flash read data
   */
  async readFlash(i, t, a = null) {
    let n = this._appendArray(this._intToByteArray(i), this._intToByteArray(t));
    n = this._appendArray(n, this._intToByteArray(4096)), n = this._appendArray(n, this._intToByteArray(1024));
    const s = await this.checkCommand("read flash", this.ESP_READ_FLASH, n);
    if (s != 0)
      throw new T("Failed to read memory: " + s);
    let r = new Uint8Array(0);
    for (; r.length < t; ) {
      const h = await this.transport.read(this.FLASH_READ_TIMEOUT);
      if (h instanceof Uint8Array)
        h.length > 0 && (r = this._appendArray(r, h), await this.transport.write(this._intToByteArray(r.length)), a && a(h, r.length, t));
      else
        throw new T("Failed to read memory: " + h);
    }
    return r;
  }
  /**
   * Upload the flasher ROM bootloader (flasher stub) to the chip.
   * @returns {ROM} The Chip ROM
   */
  async runStub() {
    if (this.syncStubDetected)
      return this.info("Stub is already running. No upload is necessary."), this.chip;
    this.info("Uploading stub...");
    const i = this.chip.getChipRevision ? await this.chip.getChipRevision(this) : void 0, t = await Li(this.chip.CHIP_NAME, i);
    if (t === void 0)
      throw this.debug("Error loading Stub json"), new Error("Error loading Stub json");
    const a = [t.decodedText, t.decodedData];
    for (let r = 0; r < a.length; r++)
      if (a[r]) {
        const h = r === 0 ? t.text_start : t.data_start, l = a[r].length, o = Math.floor((l + this.ESP_RAM_BLOCK - 1) / this.ESP_RAM_BLOCK);
        await this.memBegin(l, o, this.ESP_RAM_BLOCK, h);
        for (let c = 0; c < o; c++) {
          const u = c * this.ESP_RAM_BLOCK, d = u + this.ESP_RAM_BLOCK;
          await this.memBlock(a[r].slice(u, d), c);
        }
      }
    this.info("Running stub..."), await this.memFinish(t.entry);
    const n = await this.transport.read(this.DEFAULT_TIMEOUT), s = String.fromCharCode(...n);
    if (s !== "OHAI")
      throw new T(`Failed to start stub. Unexpected response ${s}`);
    return this.info("Stub running..."), this.IS_STUB = !0, this.chip;
  }
  /**
   * Change the chip baudrate.
   */
  async changeBaud() {
    this.info("Changing baudrate to " + this.baudrate);
    const i = this.IS_STUB ? this.romBaudrate : 0, t = this._appendArray(this._intToByteArray(this.baudrate), this._intToByteArray(i));
    await this.command(this.ESP_CHANGE_BAUDRATE, t), this.info("Changed"), this.info("If the chip does not respond to any further commands, consider using a lower baud rate."), await Mt(50), await this.transport.disconnect(), await Mt(50), await this.transport.connect(this.baudrate, this.serialOptions), await Mt(50), this.transport.readLoop();
  }
  /**
   * Execute the main function of ESPLoader.
   * @param {string} mode Reset mode to use
   * @returns {string} chip ROM
   */
  async main(i = "default_reset") {
    await this.detectChip(i);
    const t = await this.chip.getChipDescription(this);
    if (this.chip.getChipRevision) {
      const a = await this.chip.getChipRevision(this);
      this.info("Chip Revision: " + a);
    }
    this.info("Chip is " + t), this.info("Features: " + await this.chip.getChipFeatures(this)), this.info("Crystal is " + await this.chip.getCrystalFreq(this) + "MHz"), this.info("MAC: " + await this.chip.readMac(this)), await this.chip.readMac(this), typeof this.chip.postConnect < "u" && await this.chip.postConnect(this), await this.runStub(), this.romBaudrate !== this.baudrate && await this.changeBaud();
    try {
      const a = await this.readFlashId();
      this.info("Flash ID: " + a.toString(16)), (a === 16777215 || a === 0) && this.info(`WARNING: Failed to communicate with the flash chip,
read/write operations will fail.
Try checking the chip connections or removing
any other hardware connected to IOs.`);
    } catch (a) {
      throw new T("Unable to verify flash chip connection " + a);
    }
    return t;
  }
  /**
   * Get flash size bytes from flash size string.
   * @param {string} flashSize Flash Size string
   * @returns {number} Flash size bytes
   */
  flashSizeBytes(i) {
    let t = -1;
    return this.transport.trace(`Flash size string ${i}`), i.toString().indexOf("KB") !== -1 ? t = parseInt(i.toString().slice(0, i.toString().indexOf("KB"))) * 1024 : i.toString().indexOf("MB") !== -1 && (t = parseInt(i.toString().slice(0, i.toString().indexOf("MB"))) * 1024 * 1024), this.transport.trace(`Flash size in bytes ${t}`), t;
  }
  /**
   * Parse a given flash size string to a number
   * @param {string} flsz Flash size to request
   * @returns {number} Flash size number
   */
  parseFlashSizeArg(i) {
    if (typeof this.chip.FLASH_SIZES[i] > "u")
      throw new T("Flash size " + i + " is not supported by this chip type. Supported sizes: " + this.chip.FLASH_SIZES);
    return this.chip.FLASH_SIZES[i];
  }
  /**
   * Update the image flash parameters with given arguments.
   * @param {Uint8Array} image binary image as Uint8Array
   * @param {number} address flash address number
   * @param {FlashModeValues} flashMode Flash mode string
   * @param {FlashFreqValues} flashFreq Flash frequency string
   * @param {FlashSizeValues} flashSize Flash size string
   * @returns {Uint8Array} modified image Uint8Array
   */
  async _updateImageFlashParams(i, t, a = "keep", n = "keep", s = "keep") {
    if (this.debug(`_update_image_flash_params ${s} ${a} ${n}`), i.length < 8 || t != this.chip.BOOTLOADER_FLASH_OFFSET)
      return i;
    if (s === "keep" && a === "keep" && n === "keep")
      return this.info("Not changing the image"), i;
    const r = i[0];
    let h = i[2];
    const l = i[3];
    if (r !== this.ESP_IMAGE_MAGIC)
      return this.info("Warning: Image file at 0x" + t.toString(16) + " doesn't look like an image file, so not changing any flash settings."), i;
    try {
      (await Pi(this.chip, i)).verify();
    } catch {
      return this.debug(`Warning: Image file at 0x${t.toString(16)} is not a valid ${this.chip.CHIP_NAME} image, so not changing any flash settings.`), i;
    }
    const o = this.chip.CHIP_NAME !== "ESP8266" && i[23] === 49;
    a !== "keep" && (h = { qio: 0, qout: 1, dio: 2, dout: 3 }[a]);
    let c = l & 15;
    n !== "keep" && (c = { "40m": 0, "26m": 1, "20m": 2, "80m": 15 }[n]);
    let u = l & 240;
    if (s !== "keep")
      if (s === "detect") {
        this.info("Configuring flash size...");
        const g = await this.detectFlashSize();
        this.info("Detected flash size set to " + g), u = this.parseFlashSizeArg(g);
      } else
        u = this.parseFlashSizeArg(s);
    const d = h << 8 | c + u;
    this.info("Flash params set to " + d.toString(16));
    const f = new Uint8Array(i);
    if (i[2] !== h && (f[2] = h), i[3] !== c + u && (f[3] = c + u), o) {
      const g = await Pi(this.chip, f), A = f.slice(0, g.datalength), p = f.slice(g.datalength + g.SHA256_DIGEST_LEN), b = await crypto.subtle.digest("SHA-256", p), S = new Uint8Array(b), E = new Uint8Array(A.length + S.length + p.length);
      E.set(A, 0), E.set(S, A.length), E.set(p, A.length + S.length);
      const _ = E.slice(g.datalength, g.datalength + g.SHA256_DIGEST_LEN);
      return this.transport.hexify(S) === this.transport.hexify(_) ? this.info("SHA digest in image updated") : this.info(`WARNING: SHA recalculation for binary failed!
	Expected calculated SHA: ${this.transport.hexify(S)}
	SHA stored in binary:    ${this.transport.hexify(_)}`), E;
    }
    return f;
  }
  /**
   * Write set of file images into given address based on given FlashOptions object.
   * @param {FlashOptions} options FlashOptions to configure how and what to write into flash.
   */
  async writeFlash(i) {
    if (this.debug("EspLoader program"), i.flashSize !== "keep") {
      const n = this.flashSizeBytes(i.flashSize);
      for (let s = 0; s < i.fileArray.length; s++)
        if (i.fileArray[s].data.length + i.fileArray[s].address > n)
          throw new T(`File ${s + 1} doesn't fit in the available flash`);
    }
    this.IS_STUB === !0 && i.eraseAll === !0 && await this.eraseFlash();
    let t, a;
    for (let n = 0; n < i.fileArray.length; n++) {
      if (this.debug("Data Length " + i.fileArray[n].data.length), t = i.fileArray[n].data, this.debug("Image Length " + t.length), t.length === 0) {
        this.debug("Warning: File is empty");
        continue;
      }
      t = Le(t, 4), a = i.fileArray[n].address, t = await this._updateImageFlashParams(t, a, i.flashMode, i.flashFreq, i.flashSize);
      let s = null;
      i.calculateMD5Hash && (s = i.calculateMD5Hash(t), this.debug("Image MD5 " + s));
      const r = t.length;
      let h;
      i.compress ? (t = js(t, { level: 9 }), h = await this.flashDeflBegin(r, t.length, a)) : h = await this.flashBegin(r, a);
      let l = 0, o = 0;
      const c = t.length;
      i.reportProgress && i.reportProgress(n, 0, c);
      let u = /* @__PURE__ */ new Date();
      const d = u.getTime();
      let f = 5e3;
      const g = new Vs({ chunkSize: 1 });
      let A = 0;
      g.onData = function(S) {
        A += S.byteLength;
      };
      let p = 0;
      for (; p < t.length; ) {
        this.debug("Write loop " + a + " " + l + " " + h), this.info("Writing at 0x" + (a + A).toString(16) + "... (" + Math.floor(100 * (l + 1) / h) + "%)");
        const S = Math.min(this.FLASH_WRITE_SIZE, t.length - p), E = t.slice(p, p + S), _ = p + S >= t.length;
        if (i.compress) {
          const R = A;
          g.push(E, _);
          const D = A - R;
          let w = 3e3;
          this.timeoutPerMb(this.ERASE_WRITE_TIMEOUT_PER_MB, D) > 3e3 && (w = this.timeoutPerMb(this.ERASE_WRITE_TIMEOUT_PER_MB, D)), this.IS_STUB === !1 && (f = w), await this.flashDeflBlock(E, l, f), this.IS_STUB && (f = w);
        } else
          throw new T("Yet to handle Non Compressed writes");
        o += E.length, p += S, l++, i.reportProgress && i.reportProgress(n, o, c);
      }
      this.IS_STUB && (i.compress ? await this.flashDeflFinish(!1, f) : await this.flashFinish(!1, f)), u = /* @__PURE__ */ new Date();
      const b = u.getTime() - d;
      if (i.compress && this.info("Wrote " + r + " bytes (" + o + " compressed) at 0x" + a.toString(16) + " in " + b / 1e3 + " seconds."), s) {
        this.info("File  md5: " + s);
        const S = await this.flashMd5sum(a, r);
        if (this.info("Flash md5: " + S), new String(S).valueOf() != new String(s).valueOf())
          throw new T("MD5 of file does not match data in flash!");
        this.info("Hash of data verified.");
      }
    }
    this.info("Leaving...");
  }
  /**
   * Read SPI flash manufacturer and device id.
   */
  async flashId() {
    this.debug("flash_id");
    const i = await this.readFlashId();
    this.info("Manufacturer: " + (i & 255).toString(16));
    const t = i >> 16 & 255;
    this.info("Device: " + (i >> 8 & 255).toString(16) + t.toString(16)), this.info("Detected flash size: " + this.DETECTED_FLASH_SIZES[t]);
  }
  async detectFlashSize() {
    this.debug("detectFlashSize");
    const t = await this.readFlashId() >> 16 & 255;
    let a = this.DETECTED_FLASH_SIZES[t];
    return a ? this.info("Auto-detected Flash size: " + a) : (a = "4MB", this.info("Could not auto-detect Flash size. defaulting to 4MB")), a;
  }
  /**
   * Soft reset the device chip. Soft reset with run user code is the closest.
   * @param {boolean} stayInBootloader Flag to indicate if to stay in bootloader
   */
  async softReset(i) {
    if (this.IS_STUB) {
      if (this.chip.CHIP_NAME != "ESP8266")
        throw new T("Soft resetting is currently only supported on ESP8266");
      i ? (await this.flashBegin(0, 0), await this.flashFinish(!0)) : await this.command(this.ESP_RUN_USER_CODE, void 0, void 0, !1);
    } else {
      if (i)
        return;
      await this.flashBegin(0, 0), await this.flashFinish(!1);
    }
  }
  /**
   * Execute this function to execute after operation reset functions.
   * @param {After} mode After operation mode. Default is 'hard_reset'.
   * @param { boolean } usingUsbOtg For 'hard_reset' to specify if using USB-OTG
   * @param {string} sequenceString For 'custom_reset' to specify the custom reset sequence string
   */
  async after(i = "hard_reset", t, a) {
    switch (i) {
      case "hard_reset":
        this.resetConstructors.hardReset && (this.info("Hard resetting via RTS pin..."), await this.resetConstructors.hardReset(this.transport, t).reset());
        break;
      case "soft_reset":
        this.info("Soft resetting..."), await this.softReset(!1);
        break;
      case "no_reset_stub":
        this.info("Staying in flasher stub.");
        break;
      case "custom_reset":
        a || this.info("Custom reset sequence not provided, doing nothing."), this.resetConstructors.customReset || this.info("Custom reset constructor not available, doing nothing."), this.resetConstructors.customReset && a && (this.info("Custom resetting using sequence " + a), await this.resetConstructors.customReset(this.transport, a).reset());
        break;
      default:
        this.info("Staying in bootloader."), this.IS_STUB && this.softReset(!0);
        break;
    }
  }
}
const Sr = (e) => new Promise((i) => setTimeout(i, e)), Y = (e, i = !1) => {
  const t = document.querySelector("#flashStatus");
  t && (t.textContent = e, t.style.color = i ? "#ff8585" : "#aeb8c2");
};
async function Ui(e, i) {
  try {
    await i.setRTS(!0), await Sr(100), await e.after();
  } catch {
  }
}
async function Er(e, i) {
  var h, l;
  const t = new URL(e, window.location.href).toString();
  Y("Downloading firmware…");
  const a = await fetch(t, { cache: "no-store" });
  if (!a.ok) throw new Error(`Manifest download failed (${a.status}).`);
  const n = await a.json(), s = (h = n.builds) == null ? void 0 : h.find((o) => o.chipFamily === i && o.serialType === void 0);
  if (!((l = s == null ? void 0 : s.parts) != null && l.length)) throw new Error(`No ${i} firmware image is available in this manifest.`);
  const r = await Promise.all(s.parts.map(async (o) => {
    const c = await fetch(new URL(o.path, t), { cache: "no-store" });
    if (!c.ok) throw new Error(`Firmware download failed (${c.status}).`);
    return { data: new Uint8Array(await c.arrayBuffer()), address: o.offset };
  }));
  return { manifest: n, parts: r, total: r.reduce((o, c) => o + c.data.length, 0) };
}
async function mr() {
  const e = document.querySelector("#flashBtn"), i = e == null ? void 0 : e.dataset.manifest;
  if (!i) return;
  if (!navigator.serial) {
    Y("Web Serial requires current Chrome or Edge.", !0);
    return;
  }
  if (!window.confirm("This will write the selected RGB2Go firmware. Verify the controller and options, then continue.")) return;
  e.disabled = !0;
  let t;
  try {
    Y("Select the controller COM port…");
    const a = await navigator.serial.requestPort();
    t = new Ea(a);
    const n = new pr({ transport: t, baudrate: 115200 });
    Y("Connecting at 115200 baud…"), await n.main(), await n.flashId();
    const { manifest: s, parts: r, total: h } = await Er(i, n.chip.CHIP_NAME);
    if (!window.confirm(`Ready to write ${s.name || "selected firmware"} ${s.version || ""} (${h.toLocaleString()} bytes) at 115200 baud. Start flashing?`)) {
      Y("Flash canceled before writing."), await Ui(n, t);
      return;
    }
    let l = -1;
    Y("Writing firmware: 0%…"), await n.writeFlash({
      fileArray: r,
      flashSize: "keep",
      flashMode: "keep",
      flashFreq: "keep",
      eraseAll: !1,
      compress: !0,
      reportProgress: (o, c, u) => {
        const d = r.slice(0, o).reduce((A, p) => A + p.data.length, 0), f = c / u * r[o].data.length, g = Math.floor((d + f) / h * 100);
        g !== l && (l = g, Y(`Writing firmware: ${g}%…`));
      }
    }), await Ui(n, t), Y("Flash complete. The controller is restarting.");
  } catch (a) {
    console.error(a), Y(`Flash failed: ${(a == null ? void 0 : a.message) || a}`, !0);
  } finally {
    try {
      await (t == null ? void 0 : t.disconnect());
    } catch {
    }
    e.disabled = !1;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  var e;
  return (e = document.querySelector("#flashBtn")) == null ? void 0 : e.addEventListener("click", mr);
});
export {
  sr as R
};

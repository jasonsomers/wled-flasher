class k extends Error {
}
/*! pako 2.2.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */
const Tn = 4, Ke = 0, qe = 1, Dn = 2;
function xt(e) {
  let i = e.length;
  for (; --i >= 0; )
    e[i] = 0;
}
const Cn = 0, Zi = 1, Mn = 2, Ln = 3, Pn = 258, Ue = 29, $t = 256, Ot = $t + 1 + Ue, wt = 30, Ne = 19, Wi = 2 * Ot + 1, st = 15, fe = 16, On = 7, Be = 256, Ki = 16, qi = 17, Vi = 18, Ie = (
  /* extra bits for each length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0])
), Xt = (
  /* extra bits for each distance code */
  new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13])
), Fn = (
  /* extra bits for each bit length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7])
), ji = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), Un = 512, X = new Array((Ot + 2) * 2);
xt(X);
const Dt = new Array(wt * 2);
xt(Dt);
const Ft = new Array(Un);
xt(Ft);
const Ut = new Array(Pn - Ln + 1);
xt(Ut);
const He = new Array(Ue);
xt(He);
const Jt = new Array(wt);
xt(Jt);
function de(e, i, t, n, a) {
  this.static_tree = e, this.extra_bits = i, this.extra_base = t, this.elems = n, this.max_length = a, this.has_stree = e && e.length;
}
let Yi, Xi, Ji;
function _e(e, i) {
  this.dyn_tree = e, this.max_code = 0, this.stat_desc = i;
}
const Qi = (e) => e < 256 ? Ft[e] : Ft[256 + (e >>> 7)], Nt = (e, i) => {
  e.pending_buf[e.pending++] = i & 255, e.pending_buf[e.pending++] = i >>> 8 & 255;
}, O = (e, i, t) => {
  e.bi_valid > fe - t ? (e.bi_buf |= i << e.bi_valid & 65535, Nt(e, e.bi_buf), e.bi_buf = i >> fe - e.bi_valid, e.bi_valid += t - fe) : (e.bi_buf |= i << e.bi_valid & 65535, e.bi_valid += t);
}, q = (e, i, t) => {
  O(
    e,
    t[i * 2],
    t[i * 2 + 1]
    /*.Len*/
  );
}, tn = (e, i) => {
  let t = 0;
  do
    t |= e & 1, e >>>= 1, t <<= 1;
  while (--i > 0);
  return t >>> 1;
}, Nn = (e) => {
  e.bi_valid === 16 ? (Nt(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = e.bi_buf & 255, e.bi_buf >>= 8, e.bi_valid -= 8);
}, Bn = (e, i) => {
  const t = i.dyn_tree, n = i.max_code, a = i.stat_desc.static_tree, s = i.stat_desc.has_stree, r = i.stat_desc.extra_bits, l = i.stat_desc.extra_base, h = i.stat_desc.max_length;
  let o, c, u, d, f, g, y = 0;
  for (d = 0; d <= st; d++)
    e.bl_count[d] = 0;
  for (t[e.heap[e.heap_max] * 2 + 1] = 0, o = e.heap_max + 1; o < Wi; o++)
    c = e.heap[o], d = t[t[c * 2 + 1] * 2 + 1] + 1, d > h && (d = h, y++), t[c * 2 + 1] = d, !(c > n) && (e.bl_count[d]++, f = 0, c >= l && (f = r[c - l]), g = t[c * 2], e.opt_len += g * (d + f), s && (e.static_len += g * (a[c * 2 + 1] + f)));
  if (y !== 0) {
    do {
      for (d = h - 1; e.bl_count[d] === 0; )
        d--;
      e.bl_count[d]--, e.bl_count[d + 1] += 2, e.bl_count[h]--, y -= 2;
    } while (y > 0);
    for (d = h; d !== 0; d--)
      for (c = e.bl_count[d]; c !== 0; )
        u = e.heap[--o], !(u > n) && (t[u * 2 + 1] !== d && (e.opt_len += (d - t[u * 2 + 1]) * t[u * 2], t[u * 2 + 1] = d), c--);
  }
}, en = (e, i, t) => {
  const n = new Array(st + 1);
  let a = 0, s, r;
  for (s = 1; s <= st; s++)
    a = a + t[s - 1] << 1, n[s] = a;
  for (r = 0; r <= i; r++) {
    let l = e[r * 2 + 1];
    l !== 0 && (e[r * 2] = tn(n[l]++, l));
  }
}, Hn = () => {
  let e, i, t, n, a;
  const s = new Array(st + 1);
  for (t = 0, n = 0; n < Ue - 1; n++)
    for (He[n] = t, e = 0; e < 1 << Ie[n]; e++)
      Ut[t++] = n;
  for (Ut[t - 1] = n, a = 0, n = 0; n < 16; n++)
    for (Jt[n] = a, e = 0; e < 1 << Xt[n]; e++)
      Ft[a++] = n;
  for (a >>= 7; n < wt; n++)
    for (Jt[n] = a << 7, e = 0; e < 1 << Xt[n] - 7; e++)
      Ft[256 + a++] = n;
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
  for (en(X, Ot + 1, s), e = 0; e < wt; e++)
    Dt[e * 2 + 1] = 5, Dt[e * 2] = tn(e, 5);
  Yi = new de(X, Ie, $t + 1, Ot, st), Xi = new de(Dt, Xt, 0, wt, st), Ji = new de(new Array(0), Fn, 0, Ne, On);
}, nn = (e) => {
  let i;
  for (i = 0; i < Ot; i++)
    e.dyn_ltree[i * 2] = 0;
  for (i = 0; i < wt; i++)
    e.dyn_dtree[i * 2] = 0;
  for (i = 0; i < Ne; i++)
    e.bl_tree[i * 2] = 0;
  e.dyn_ltree[Be * 2] = 1, e.opt_len = e.static_len = 0, e.sym_next = e.matches = 0;
}, an = (e) => {
  e.bi_valid > 8 ? Nt(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0;
}, Ve = (e, i, t, n) => {
  const a = i * 2, s = t * 2;
  return e[a] < e[s] || e[a] === e[s] && n[i] <= n[t];
}, ue = (e, i, t) => {
  const n = e.heap[t];
  let a = t << 1;
  for (; a <= e.heap_len && (a < e.heap_len && Ve(i, e.heap[a + 1], e.heap[a], e.depth) && a++, !Ve(i, n, e.heap[a], e.depth)); )
    e.heap[t] = e.heap[a], t = a, a <<= 1;
  e.heap[t] = n;
}, je = (e, i, t) => {
  let n, a, s = 0, r, l;
  if (e.sym_next !== 0)
    do
      n = e.pending_buf[e.sym_buf + s++] & 255, n += (e.pending_buf[e.sym_buf + s++] & 255) << 8, a = e.pending_buf[e.sym_buf + s++], n === 0 ? q(e, a, i) : (r = Ut[a], q(e, r + $t + 1, i), l = Ie[r], l !== 0 && (a -= He[r], O(e, a, l)), n--, r = Qi(n), q(e, r, t), l = Xt[r], l !== 0 && (n -= Jt[r], O(e, n, l)));
    while (s < e.sym_next);
  q(e, Be, i);
}, ke = (e, i) => {
  const t = i.dyn_tree, n = i.stat_desc.static_tree, a = i.stat_desc.has_stree, s = i.stat_desc.elems;
  let r, l, h = -1, o;
  for (e.heap_len = 0, e.heap_max = Wi, r = 0; r < s; r++)
    t[r * 2] !== 0 ? (e.heap[++e.heap_len] = h = r, e.depth[r] = 0) : t[r * 2 + 1] = 0;
  for (; e.heap_len < 2; )
    o = e.heap[++e.heap_len] = h < 2 ? ++h : 0, t[o * 2] = 1, e.depth[o] = 0, e.opt_len--, a && (e.static_len -= n[o * 2 + 1]);
  for (i.max_code = h, r = e.heap_len >> 1; r >= 1; r--)
    ue(e, t, r);
  o = s;
  do
    r = e.heap[
      1
      /*SMALLEST*/
    ], e.heap[
      1
      /*SMALLEST*/
    ] = e.heap[e.heap_len--], ue(
      e,
      t,
      1
      /*SMALLEST*/
    ), l = e.heap[
      1
      /*SMALLEST*/
    ], e.heap[--e.heap_max] = r, e.heap[--e.heap_max] = l, t[o * 2] = t[r * 2] + t[l * 2], e.depth[o] = (e.depth[r] >= e.depth[l] ? e.depth[r] : e.depth[l]) + 1, t[r * 2 + 1] = t[l * 2 + 1] = o, e.heap[
      1
      /*SMALLEST*/
    ] = o++, ue(
      e,
      t,
      1
      /*SMALLEST*/
    );
  while (e.heap_len >= 2);
  e.heap[--e.heap_max] = e.heap[
    1
    /*SMALLEST*/
  ], Bn(e, i), en(t, h, e.bl_count);
}, Ye = (e, i, t) => {
  let n, a = -1, s, r = i[0 * 2 + 1], l = 0, h = 7, o = 4;
  for (r === 0 && (h = 138, o = 3), i[(t + 1) * 2 + 1] = 65535, n = 0; n <= t; n++)
    s = r, r = i[(n + 1) * 2 + 1], !(++l < h && s === r) && (l < o ? e.bl_tree[s * 2] += l : s !== 0 ? (s !== a && e.bl_tree[s * 2]++, e.bl_tree[Ki * 2]++) : l <= 10 ? e.bl_tree[qi * 2]++ : e.bl_tree[Vi * 2]++, l = 0, a = s, r === 0 ? (h = 138, o = 3) : s === r ? (h = 6, o = 3) : (h = 7, o = 4));
}, Xe = (e, i, t) => {
  let n, a = -1, s, r = i[0 * 2 + 1], l = 0, h = 7, o = 4;
  for (r === 0 && (h = 138, o = 3), n = 0; n <= t; n++)
    if (s = r, r = i[(n + 1) * 2 + 1], !(++l < h && s === r)) {
      if (l < o)
        do
          q(e, s, e.bl_tree);
        while (--l !== 0);
      else s !== 0 ? (s !== a && (q(e, s, e.bl_tree), l--), q(e, Ki, e.bl_tree), O(e, l - 3, 2)) : l <= 10 ? (q(e, qi, e.bl_tree), O(e, l - 3, 3)) : (q(e, Vi, e.bl_tree), O(e, l - 11, 7));
      l = 0, a = s, r === 0 ? (h = 138, o = 3) : s === r ? (h = 6, o = 3) : (h = 7, o = 4);
    }
}, zn = (e) => {
  let i;
  for (Ye(e, e.dyn_ltree, e.l_desc.max_code), Ye(e, e.dyn_dtree, e.d_desc.max_code), ke(e, e.bl_desc), i = Ne - 1; i >= 3 && e.bl_tree[ji[i] * 2 + 1] === 0; i--)
    ;
  return e.opt_len += 3 * (i + 1) + 5 + 5 + 4, i;
}, $n = (e, i, t, n) => {
  let a;
  for (O(e, i - 257, 5), O(e, t - 1, 5), O(e, n - 4, 4), a = 0; a < n; a++)
    O(e, e.bl_tree[ji[a] * 2 + 1], 3);
  Xe(e, e.dyn_ltree, i - 1), Xe(e, e.dyn_dtree, t - 1);
}, Gn = (e) => {
  let i = 4093624447, t;
  for (t = 0; t <= 31; t++, i >>>= 1)
    if (i & 1 && e.dyn_ltree[t * 2] !== 0)
      return Ke;
  if (e.dyn_ltree[9 * 2] !== 0 || e.dyn_ltree[10 * 2] !== 0 || e.dyn_ltree[13 * 2] !== 0)
    return qe;
  for (t = 32; t < $t; t++)
    if (e.dyn_ltree[t * 2] !== 0)
      return qe;
  return Ke;
};
let Je = !1;
const Zn = (e) => {
  Je || (Hn(), Je = !0), e.l_desc = new _e(e.dyn_ltree, Yi), e.d_desc = new _e(e.dyn_dtree, Xi), e.bl_desc = new _e(e.bl_tree, Ji), e.bi_buf = 0, e.bi_valid = 0, nn(e);
}, sn = (e, i, t, n) => {
  O(e, (Cn << 1) + (n ? 1 : 0), 3), an(e), Nt(e, t), Nt(e, ~t), t && e.pending_buf.set(e.window.subarray(i, i + t), e.pending), e.pending += t;
}, Wn = (e) => {
  O(e, Zi << 1, 3), q(e, Be, X), Nn(e);
}, Kn = (e, i, t, n) => {
  let a, s, r = 0;
  e.level > 0 ? (e.strm.data_type === Dn && (e.strm.data_type = Gn(e)), ke(e, e.l_desc), ke(e, e.d_desc), r = zn(e), a = e.opt_len + 3 + 7 >>> 3, s = e.static_len + 3 + 7 >>> 3, s <= a && (a = s)) : a = s = t + 5, t + 4 <= a && i !== -1 ? sn(e, i, t, n) : e.strategy === Tn || s === a ? (O(e, (Zi << 1) + (n ? 1 : 0), 3), je(e, X, Dt)) : (O(e, (Mn << 1) + (n ? 1 : 0), 3), $n(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, r + 1), je(e, e.dyn_ltree, e.dyn_dtree)), nn(e), n && an(e);
}, qn = (e, i, t) => (e.pending_buf[e.sym_buf + e.sym_next++] = i, e.pending_buf[e.sym_buf + e.sym_next++] = i >> 8, e.pending_buf[e.sym_buf + e.sym_next++] = t, i === 0 ? e.dyn_ltree[t * 2]++ : (e.matches++, i--, e.dyn_ltree[(Ut[t] + $t + 1) * 2]++, e.dyn_dtree[Qi(i) * 2]++), e.sym_next === e.sym_end);
var Vn = Zn, jn = sn, Yn = Kn, Xn = qn, Jn = Wn, Qn = {
  _tr_init: Vn,
  _tr_stored_block: jn,
  _tr_flush_block: Yn,
  _tr_tally: Xn,
  _tr_align: Jn
};
const ta = (e, i, t, n) => {
  let a = e & 65535 | 0, s = e >>> 16 & 65535 | 0, r = 0;
  for (; t !== 0; ) {
    r = t > 2e3 ? 2e3 : t, t -= r;
    do
      a = a + i[n++] | 0, s = s + a | 0;
    while (--r);
    a %= 65521, s %= 65521;
  }
  return a | s << 16 | 0;
};
var Bt = ta;
const ea = () => {
  let e, i = [];
  for (var t = 0; t < 256; t++) {
    e = t;
    for (var n = 0; n < 8; n++)
      e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1;
    i[t] = e;
  }
  return i;
}, ia = new Uint32Array(ea()), na = (e, i, t, n) => {
  const a = ia, s = n + t;
  e ^= -1;
  for (let r = n; r < s; r++)
    e = e >>> 8 ^ a[(e ^ i[r]) & 255];
  return e ^ -1;
};
var M = na, St = {
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
}, ie = {
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
const { _tr_init: aa, _tr_stored_block: Te, _tr_flush_block: sa, _tr_tally: et, _tr_align: ra } = Qn, {
  Z_NO_FLUSH: it,
  Z_PARTIAL_FLUSH: oa,
  Z_FULL_FLUSH: la,
  Z_FINISH: G,
  Z_BLOCK: Qe,
  Z_OK: L,
  Z_STREAM_END: ti,
  Z_STREAM_ERROR: V,
  Z_DATA_ERROR: ha,
  Z_BUF_ERROR: ge,
  Z_DEFAULT_COMPRESSION: ca,
  Z_FILTERED: fa,
  Z_HUFFMAN_ONLY: Kt,
  Z_RLE: da,
  Z_FIXED: _a,
  Z_DEFAULT_STRATEGY: ua,
  Z_UNKNOWN: ga,
  Z_DEFLATED: ne
} = ie, pa = 9, wa = 15, Ea = 8, Sa = 29, ma = 256, De = ma + 1 + Sa, ba = 30, ya = 19, xa = 2 * De + 1, Aa = 15, v = 3, tt = 258, j = tt + v + 1, Ra = 32, mt = 42, ze = 57, Ce = 69, Me = 73, Le = 91, Pe = 103, rt = 113, It = 666, P = 1, At = 2, lt = 3, Rt = 4, va = 3, ot = (e, i) => (e.msg = St[i], i), ei = (e) => e * 2 - (e > 4 ? 9 : 0), Q = (e) => {
  let i = e.length;
  for (; --i >= 0; )
    e[i] = 0;
}, Ia = (e) => {
  let i, t, n, a = e.w_size;
  i = e.hash_size, n = i;
  do
    t = e.head[--n], e.head[n] = t >= a ? t - a : 0;
  while (--i);
  i = a, n = i;
  do
    t = e.prev[--n], e.prev[n] = t >= a ? t - a : 0;
  while (--i);
};
let $e = (e, i, t) => (i << e.hash_shift ^ t) & e.hash_mask;
const ht = (e, i) => {
  let t;
  if (e.legacy_hash)
    t = e.ins_h = $e(e, e.ins_h, e.window[i + v - 1]);
  else {
    const a = e.window, s = a[i] | a[i + 1] << 8 | a[i + 2] << 16 | a[i + 3] << 24;
    t = e.ins_h = Math.imul(s, 66521) + 66521 >>> 16 & e.hash_mask;
  }
  const n = e.prev[i & e.w_mask] = e.head[t];
  return e.head[t] = i, n;
}, N = (e) => {
  const i = e.state;
  let t = i.pending;
  t > e.avail_out && (t = e.avail_out), t !== 0 && (e.output.set(i.pending_buf.subarray(i.pending_out, i.pending_out + t), e.next_out), e.next_out += t, i.pending_out += t, e.total_out += t, e.avail_out -= t, i.pending -= t, i.pending === 0 && (i.pending_out = 0));
}, B = (e, i) => {
  sa(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, i), e.block_start = e.strstart, N(e.strm);
}, I = (e, i) => {
  e.pending_buf[e.pending++] = i;
}, vt = (e, i) => {
  e.pending_buf[e.pending++] = i >>> 8 & 255, e.pending_buf[e.pending++] = i & 255;
}, Oe = (e, i, t, n) => {
  let a = e.avail_in;
  return a > n && (a = n), a === 0 ? 0 : (e.avail_in -= a, i.set(e.input.subarray(e.next_in, e.next_in + a), t), e.state.wrap === 1 ? e.adler = Bt(e.adler, i, a, t) : e.state.wrap === 2 && (e.adler = M(e.adler, i, a, t)), e.next_in += a, e.total_in += a, a);
}, rn = (e, i) => {
  let t = e.max_chain_length, n = e.strstart, a, s, r = e.prev_length, l = e.nice_match;
  const h = e.strstart > e.w_size - j ? e.strstart - (e.w_size - j) : 0, o = e.window, c = e.w_mask, u = e.prev, d = e.strstart + tt;
  let f = o[n + r - 1], g = o[n + r];
  e.prev_length >= e.good_match && (t >>= 2), l > e.lookahead && (l = e.lookahead);
  do
    if (a = i, !(o[a + r] !== g || o[a + r - 1] !== f || o[a] !== o[n] || o[++a] !== o[n + 1])) {
      n += 2, a++;
      do
        ;
      while (o[++n] === o[++a] && o[++n] === o[++a] && o[++n] === o[++a] && o[++n] === o[++a] && o[++n] === o[++a] && o[++n] === o[++a] && o[++n] === o[++a] && o[++n] === o[++a] && n < d);
      if (s = tt - (d - n), n = d - tt, s > r) {
        if (e.match_start = i, r = s, s >= l)
          break;
        f = o[n + r - 1], g = o[n + r];
      }
    }
  while ((i = u[i & c]) > h && --t !== 0);
  return r <= e.lookahead ? r : e.lookahead;
}, bt = (e) => {
  const i = e.w_size;
  let t, n, a;
  do {
    if (n = e.window_size - e.lookahead - e.strstart, e.strstart >= i + (i - j) && (e.window.set(e.window.subarray(i, i + i - n), 0), e.match_start -= i, e.strstart -= i, e.block_start -= i, e.insert > e.strstart && (e.insert = e.strstart), Ia(e), n += i), e.strm.avail_in === 0)
      break;
    if (t = Oe(e.strm, e.window, e.strstart + e.lookahead, n), e.lookahead += t, e.legacy_hash) {
      if (e.lookahead + e.insert >= v)
        for (a = e.strstart - e.insert, e.ins_h = e.window[a], e.ins_h = $e(e, e.ins_h, e.window[a + 1]); e.insert && (ht(e, a), a++, e.insert--, !(e.lookahead + e.insert < v)); )
          ;
    } else if (e.lookahead + e.insert > v)
      for (a = e.strstart - e.insert; e.insert && (ht(e, a), a++, e.insert--, !(e.lookahead + e.insert <= v)); )
        ;
  } while (e.lookahead < j && e.strm.avail_in !== 0);
}, on = (e, i) => {
  let t = e.pending_buf_size - 5 > e.w_size ? e.w_size : e.pending_buf_size - 5, n, a, s, r = 0, l = e.strm.avail_in;
  do {
    if (n = 65535, s = e.bi_valid + 42 >> 3, e.strm.avail_out < s || (s = e.strm.avail_out - s, a = e.strstart - e.block_start, n > a + e.strm.avail_in && (n = a + e.strm.avail_in), n > s && (n = s), n < t && (n === 0 && i !== G || i === it || n !== a + e.strm.avail_in)))
      break;
    r = i === G && n === a + e.strm.avail_in ? 1 : 0, Te(e, 0, 0, r), e.pending_buf[e.pending - 4] = n, e.pending_buf[e.pending - 3] = n >> 8, e.pending_buf[e.pending - 2] = ~n, e.pending_buf[e.pending - 1] = ~n >> 8, N(e.strm), a && (a > n && (a = n), e.strm.output.set(e.window.subarray(e.block_start, e.block_start + a), e.strm.next_out), e.strm.next_out += a, e.strm.avail_out -= a, e.strm.total_out += a, e.block_start += a, n -= a), n && (Oe(e.strm, e.strm.output, e.strm.next_out, n), e.strm.next_out += n, e.strm.avail_out -= n, e.strm.total_out += n);
  } while (r === 0);
  return l -= e.strm.avail_in, l && (l >= e.w_size ? (e.matches = 2, e.window.set(e.strm.input.subarray(e.strm.next_in - e.w_size, e.strm.next_in), 0), e.strstart = e.w_size, e.insert = e.strstart) : (e.window_size - e.strstart <= l && (e.strstart -= e.w_size, e.window.set(e.window.subarray(e.w_size, e.w_size + e.strstart), 0), e.matches < 2 && e.matches++, e.insert > e.strstart && (e.insert = e.strstart)), e.window.set(e.strm.input.subarray(e.strm.next_in - l, e.strm.next_in), e.strstart), e.strstart += l, e.insert += l > e.w_size - e.insert ? e.w_size - e.insert : l), e.block_start = e.strstart), e.high_water < e.strstart && (e.high_water = e.strstart), r ? Rt : i !== it && i !== G && e.strm.avail_in === 0 && e.strstart === e.block_start ? At : (s = e.window_size - e.strstart, e.strm.avail_in > s && e.block_start >= e.w_size && (e.block_start -= e.w_size, e.strstart -= e.w_size, e.window.set(e.window.subarray(e.w_size, e.w_size + e.strstart), 0), e.matches < 2 && e.matches++, s += e.w_size, e.insert > e.strstart && (e.insert = e.strstart)), s > e.strm.avail_in && (s = e.strm.avail_in), s && (Oe(e.strm, e.window, e.strstart, s), e.strstart += s, e.insert += s > e.w_size - e.insert ? e.w_size - e.insert : s), e.high_water < e.strstart && (e.high_water = e.strstart), s = e.bi_valid + 42 >> 3, s = e.pending_buf_size - s > 65535 ? 65535 : e.pending_buf_size - s, t = s > e.w_size ? e.w_size : s, a = e.strstart - e.block_start, (a >= t || (a || i === G) && i !== it && e.strm.avail_in === 0 && a <= s) && (n = a > s ? s : a, r = i === G && e.strm.avail_in === 0 && n === a ? 1 : 0, Te(e, e.block_start, n, r), e.block_start += n, N(e.strm)), r ? lt : P);
}, pe = (e, i) => {
  let t, n;
  for (; ; ) {
    if (e.lookahead < j) {
      if (bt(e), e.lookahead < j && i === it)
        return P;
      if (e.lookahead === 0)
        break;
    }
    if (t = 0, e.lookahead >= v && (t = ht(e, e.strstart)), t !== 0 && e.strstart - t <= e.w_size - j && (e.match_length = rn(e, t)), e.match_length >= v)
      if (n = et(e, e.strstart - e.match_start, e.match_length - v), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= v) {
        e.match_length--;
        do
          e.strstart++, t = ht(e, e.strstart);
        while (--e.match_length !== 0);
        e.strstart++;
      } else
        e.strstart += e.match_length, e.match_length = 0, e.legacy_hash && (e.ins_h = e.window[e.strstart], e.ins_h = $e(e, e.ins_h, e.window[e.strstart + 1]));
    else
      n = et(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
    if (n && (B(e, !1), e.strm.avail_out === 0))
      return P;
  }
  return e.insert = e.strstart < v - 1 ? e.strstart : v - 1, i === G ? (B(e, !0), e.strm.avail_out === 0 ? lt : Rt) : e.sym_next && (B(e, !1), e.strm.avail_out === 0) ? P : At;
}, ut = (e, i) => {
  let t, n, a;
  for (; ; ) {
    if (e.lookahead < j) {
      if (bt(e), e.lookahead < j && i === it)
        return P;
      if (e.lookahead === 0)
        break;
    }
    if (t = 0, e.lookahead >= v && (t = ht(e, e.strstart)), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = v - 1, t !== 0 && e.prev_length < e.max_lazy_match && e.strstart - t <= e.w_size - j && (e.match_length = rn(e, t), e.match_length <= 5 && (e.strategy === fa || e.match_length === v && e.strstart - e.match_start > 4096) && (e.match_length = v - 1)), e.prev_length >= v && e.match_length <= e.prev_length) {
      a = e.strstart + e.lookahead - v, n = et(e, e.strstart - 1 - e.prev_match, e.prev_length - v), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
      do
        ++e.strstart <= a && (t = ht(e, e.strstart));
      while (--e.prev_length !== 0);
      if (e.match_available = 0, e.match_length = v - 1, e.strstart++, n && (B(e, !1), e.strm.avail_out === 0))
        return P;
    } else if (e.match_available) {
      if (n = et(e, 0, e.window[e.strstart - 1]), n && B(e, !1), e.strstart++, e.lookahead--, e.strm.avail_out === 0)
        return P;
    } else
      e.match_available = 1, e.strstart++, e.lookahead--;
  }
  return e.match_available && (n = et(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = e.strstart < v - 1 ? e.strstart : v - 1, i === G ? (B(e, !0), e.strm.avail_out === 0 ? lt : Rt) : e.sym_next && (B(e, !1), e.strm.avail_out === 0) ? P : At;
}, ka = (e, i) => {
  let t, n, a, s;
  const r = e.window;
  for (; ; ) {
    if (e.lookahead <= tt) {
      if (bt(e), e.lookahead <= tt && i === it)
        return P;
      if (e.lookahead === 0)
        break;
    }
    if (e.match_length = 0, e.lookahead >= v && e.strstart > 0 && (a = e.strstart - 1, n = r[a], n === r[++a] && n === r[++a] && n === r[++a])) {
      s = e.strstart + tt;
      do
        ;
      while (n === r[++a] && n === r[++a] && n === r[++a] && n === r[++a] && n === r[++a] && n === r[++a] && n === r[++a] && n === r[++a] && a < s);
      e.match_length = tt - (s - a), e.match_length > e.lookahead && (e.match_length = e.lookahead);
    }
    if (e.match_length >= v ? (t = et(e, 1, e.match_length - v), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (t = et(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), t && (B(e, !1), e.strm.avail_out === 0))
      return P;
  }
  return e.insert = 0, i === G ? (B(e, !0), e.strm.avail_out === 0 ? lt : Rt) : e.sym_next && (B(e, !1), e.strm.avail_out === 0) ? P : At;
}, Ta = (e, i) => {
  let t;
  for (; ; ) {
    if (e.lookahead === 0 && (bt(e), e.lookahead === 0)) {
      if (i === it)
        return P;
      break;
    }
    if (e.match_length = 0, t = et(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, t && (B(e, !1), e.strm.avail_out === 0))
      return P;
  }
  return e.insert = 0, i === G ? (B(e, !0), e.strm.avail_out === 0 ? lt : Rt) : e.sym_next && (B(e, !1), e.strm.avail_out === 0) ? P : At;
};
function W(e, i, t, n, a) {
  this.good_length = e, this.max_lazy = i, this.nice_length = t, this.max_chain = n, this.func = a;
}
const kt = [
  /*      good lazy nice chain */
  new W(0, 0, 0, 0, on),
  /* 0 store only */
  new W(4, 4, 8, 4, pe),
  /* 1 max speed, no lazy matches */
  new W(4, 5, 16, 8, pe),
  /* 2 */
  new W(4, 6, 32, 32, pe),
  /* 3 */
  new W(4, 4, 16, 16, ut),
  /* 4 lazy matches */
  new W(8, 16, 32, 32, ut),
  /* 5 */
  new W(8, 16, 128, 128, ut),
  /* 6 */
  new W(8, 32, 128, 256, ut),
  /* 7 */
  new W(32, 128, 258, 1024, ut),
  /* 8 */
  new W(32, 258, 258, 4096, ut)
  /* 9 max compression */
], Da = (e) => {
  e.window_size = 2 * e.w_size, Q(e.head), e.max_lazy_match = kt[e.level].max_lazy, e.good_match = kt[e.level].good_length, e.nice_match = kt[e.level].nice_length, e.max_chain_length = kt[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = v - 1, e.match_available = 0, e.ins_h = 0;
};
function Ca() {
  this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = ne, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.legacy_hash = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(xa * 2), this.dyn_dtree = new Uint16Array((2 * ba + 1) * 2), this.bl_tree = new Uint16Array((2 * ya + 1) * 2), Q(this.dyn_ltree), Q(this.dyn_dtree), Q(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Uint16Array(Aa + 1), this.heap = new Uint16Array(2 * De + 1), Q(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Uint16Array(2 * De + 1), Q(this.depth), this.sym_buf = 0, this.lit_bufsize = 0, this.sym_next = 0, this.sym_end = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
}
const Gt = (e) => {
  if (!e)
    return 1;
  const i = e.state;
  return !i || i.strm !== e || i.status !== mt && //#ifdef GZIP
  i.status !== ze && //#endif
  i.status !== Ce && i.status !== Me && i.status !== Le && i.status !== Pe && i.status !== rt && i.status !== It ? 1 : 0;
}, ln = (e) => {
  if (Gt(e))
    return ot(e, V);
  e.total_in = e.total_out = 0, e.data_type = ga;
  const i = e.state;
  return i.pending = 0, i.pending_out = 0, i.wrap < 0 && (i.wrap = -i.wrap), i.status = //#ifdef GZIP
  i.wrap === 2 ? ze : (
    //#endif
    i.wrap ? mt : rt
  ), e.adler = i.wrap === 2 ? 0 : 1, i.last_flush = -2, aa(i), L;
}, hn = (e) => {
  const i = ln(e);
  return i === L && Da(e.state), i;
}, Ma = (e, i) => Gt(e) || e.state.wrap !== 2 ? V : (e.state.gzhead = i, L), cn = (e, i, t, n, a, s, r) => {
  if (!e)
    return V;
  let l = 1;
  if (i === ca && (i = 6), n < 0 ? (l = 0, n = -n) : n > 15 && (l = 2, n -= 16), a < 1 || a > pa || t !== ne || n < 8 || n > 15 || i < 0 || i > 9 || s < 0 || s > _a || n === 8 && l !== 1)
    return ot(e, V);
  n === 8 && (n = 9);
  const h = new Ca();
  return e.state = h, h.strm = e, h.status = mt, h.wrap = l, h.gzhead = null, h.w_bits = n, h.w_size = 1 << h.w_bits, h.w_mask = h.w_size - 1, h.legacy_hash = r ? 1 : 0, h.hash_bits = a + 7, !h.legacy_hash && h.hash_bits < 15 && (h.hash_bits = 15), h.hash_size = 1 << h.hash_bits, h.hash_mask = h.hash_size - 1, h.hash_shift = ~~((h.hash_bits + v - 1) / v), h.window = new Uint8Array(h.w_size * 2), h.head = new Uint16Array(h.hash_size), h.prev = new Uint16Array(h.w_size), h.lit_bufsize = 1 << a + 6, h.pending_buf_size = h.lit_bufsize * 4, h.pending_buf = new Uint8Array(h.pending_buf_size), h.sym_buf = h.lit_bufsize, h.sym_end = (h.lit_bufsize - 1) * 3, h.level = i, h.strategy = s, h.method = t, hn(e);
}, La = (e, i) => cn(e, i, ne, wa, Ea, ua), Pa = (e, i) => {
  if (Gt(e) || i > Qe || i < 0)
    return e ? ot(e, V) : V;
  const t = e.state;
  if (!e.output || e.avail_in !== 0 && !e.input || t.status === It && i !== G)
    return ot(e, e.avail_out === 0 ? ge : V);
  const n = t.last_flush;
  if (t.last_flush = i, t.pending !== 0) {
    if (N(e), e.avail_out === 0)
      return t.last_flush = -1, L;
  } else if (e.avail_in === 0 && ei(i) <= ei(n) && i !== G)
    return ot(e, ge);
  if (t.status === It && e.avail_in !== 0)
    return ot(e, ge);
  if (t.status === mt && t.wrap === 0 && (t.status = rt), t.status === mt) {
    let a = ne + (t.w_bits - 8 << 4) << 8, s = -1;
    if (t.strategy >= Kt || t.level < 2 ? s = 0 : t.level < 6 ? s = 1 : t.level === 6 ? s = 2 : s = 3, a |= s << 6, t.strstart !== 0 && (a |= Ra), a += 31 - a % 31, vt(t, a), t.strstart !== 0 && (vt(t, e.adler >>> 16), vt(t, e.adler & 65535)), e.adler = 1, t.status = rt, N(e), t.pending !== 0)
      return t.last_flush = -1, L;
  }
  if (t.status === ze) {
    if (e.adler = 0, I(t, 31), I(t, 139), I(t, 8), t.gzhead)
      I(
        t,
        (t.gzhead.text ? 1 : 0) + (t.gzhead.hcrc ? 2 : 0) + (t.gzhead.extra ? 4 : 0) + (t.gzhead.name ? 8 : 0) + (t.gzhead.comment ? 16 : 0)
      ), I(t, t.gzhead.time & 255), I(t, t.gzhead.time >> 8 & 255), I(t, t.gzhead.time >> 16 & 255), I(t, t.gzhead.time >> 24 & 255), I(t, t.level === 9 ? 2 : t.strategy >= Kt || t.level < 2 ? 4 : 0), I(t, t.gzhead.os & 255), t.gzhead.extra && t.gzhead.extra.length && (I(t, t.gzhead.extra.length & 255), I(t, t.gzhead.extra.length >> 8 & 255)), t.gzhead.hcrc && (e.adler = M(e.adler, t.pending_buf, t.pending, 0)), t.gzindex = 0, t.status = Ce;
    else if (I(t, 0), I(t, 0), I(t, 0), I(t, 0), I(t, 0), I(t, t.level === 9 ? 2 : t.strategy >= Kt || t.level < 2 ? 4 : 0), I(t, va), t.status = rt, N(e), t.pending !== 0)
      return t.last_flush = -1, L;
  }
  if (t.status === Ce) {
    if (t.gzhead.extra) {
      let a = t.pending, s = (t.gzhead.extra.length & 65535) - t.gzindex;
      for (; t.pending + s > t.pending_buf_size; ) {
        let l = t.pending_buf_size - t.pending;
        if (t.pending_buf.set(t.gzhead.extra.subarray(t.gzindex, t.gzindex + l), t.pending), t.pending = t.pending_buf_size, t.gzhead.hcrc && t.pending > a && (e.adler = M(e.adler, t.pending_buf, t.pending - a, a)), t.gzindex += l, N(e), t.pending !== 0)
          return t.last_flush = -1, L;
        a = 0, s -= l;
      }
      let r = new Uint8Array(t.gzhead.extra);
      t.pending_buf.set(r.subarray(t.gzindex, t.gzindex + s), t.pending), t.pending += s, t.gzhead.hcrc && t.pending > a && (e.adler = M(e.adler, t.pending_buf, t.pending - a, a)), t.gzindex = 0;
    }
    t.status = Me;
  }
  if (t.status === Me) {
    if (t.gzhead.name) {
      let a = t.pending, s;
      do {
        if (t.pending === t.pending_buf_size) {
          if (t.gzhead.hcrc && t.pending > a && (e.adler = M(e.adler, t.pending_buf, t.pending - a, a)), N(e), t.pending !== 0)
            return t.last_flush = -1, L;
          a = 0;
        }
        t.gzindex < t.gzhead.name.length ? s = t.gzhead.name.charCodeAt(t.gzindex++) & 255 : s = 0, I(t, s);
      } while (s !== 0);
      t.gzhead.hcrc && t.pending > a && (e.adler = M(e.adler, t.pending_buf, t.pending - a, a)), t.gzindex = 0;
    }
    t.status = Le;
  }
  if (t.status === Le) {
    if (t.gzhead.comment) {
      let a = t.pending, s;
      do {
        if (t.pending === t.pending_buf_size) {
          if (t.gzhead.hcrc && t.pending > a && (e.adler = M(e.adler, t.pending_buf, t.pending - a, a)), N(e), t.pending !== 0)
            return t.last_flush = -1, L;
          a = 0;
        }
        t.gzindex < t.gzhead.comment.length ? s = t.gzhead.comment.charCodeAt(t.gzindex++) & 255 : s = 0, I(t, s);
      } while (s !== 0);
      t.gzhead.hcrc && t.pending > a && (e.adler = M(e.adler, t.pending_buf, t.pending - a, a));
    }
    t.status = Pe;
  }
  if (t.status === Pe) {
    if (t.gzhead.hcrc) {
      if (t.pending + 2 > t.pending_buf_size && (N(e), t.pending !== 0))
        return t.last_flush = -1, L;
      I(t, e.adler & 255), I(t, e.adler >> 8 & 255), e.adler = 0;
    }
    if (t.status = rt, N(e), t.pending !== 0)
      return t.last_flush = -1, L;
  }
  if (e.avail_in !== 0 || t.lookahead !== 0 || i !== it && t.status !== It) {
    let a = t.level === 0 ? on(t, i) : t.strategy === Kt ? Ta(t, i) : t.strategy === da ? ka(t, i) : kt[t.level].func(t, i);
    if ((a === lt || a === Rt) && (t.status = It), a === P || a === lt)
      return e.avail_out === 0 && (t.last_flush = -1), L;
    if (a === At && (i === oa ? ra(t) : i !== Qe && (Te(t, 0, 0, !1), i === la && (Q(t.head), t.lookahead === 0 && (t.strstart = 0, t.block_start = 0, t.insert = 0))), N(e), e.avail_out === 0))
      return t.last_flush = -1, L;
  }
  return i !== G ? L : t.wrap <= 0 ? ti : (t.wrap === 2 ? (I(t, e.adler & 255), I(t, e.adler >> 8 & 255), I(t, e.adler >> 16 & 255), I(t, e.adler >> 24 & 255), I(t, e.total_in & 255), I(t, e.total_in >> 8 & 255), I(t, e.total_in >> 16 & 255), I(t, e.total_in >> 24 & 255)) : (vt(t, e.adler >>> 16), vt(t, e.adler & 65535)), N(e), t.wrap > 0 && (t.wrap = -t.wrap), t.pending !== 0 ? L : ti);
}, Oa = (e) => {
  if (Gt(e))
    return V;
  const i = e.state.status;
  return e.state = null, i === rt ? ot(e, ha) : L;
}, Fa = (e, i) => {
  let t = i.length;
  if (Gt(e))
    return V;
  const n = e.state, a = n.wrap;
  if (a === 2 || a === 1 && n.status !== mt || n.lookahead)
    return V;
  if (a === 1 && (e.adler = Bt(e.adler, i, t, 0)), n.wrap = 0, t >= n.w_size) {
    a === 0 && (Q(n.head), n.strstart = 0, n.block_start = 0, n.insert = 0);
    let h = new Uint8Array(n.w_size);
    h.set(i.subarray(t - n.w_size, t), 0), i = h, t = n.w_size;
  }
  const s = e.avail_in, r = e.next_in, l = e.input;
  for (e.avail_in = t, e.next_in = 0, e.input = i, bt(n); n.lookahead >= v; ) {
    let h = n.strstart, o = n.lookahead - (v - 1);
    do
      ht(n, h), h++;
    while (--o);
    n.strstart = h, n.lookahead = v - 1, bt(n);
  }
  return n.strstart += n.lookahead, n.block_start = n.strstart, n.insert = n.lookahead, n.lookahead = 0, n.match_length = n.prev_length = v - 1, n.match_available = 0, e.next_in = r, e.input = l, e.avail_in = s, n.wrap = a, L;
};
var Ua = La, Na = cn, Ba = hn, Ha = ln, za = Ma, $a = Pa, Ga = Oa, Za = Fa, Wa = "pako deflate (from Nodeca project)", Ct = {
  deflateInit: Ua,
  deflateInit2: Na,
  deflateReset: Ba,
  deflateResetKeep: Ha,
  deflateSetHeader: za,
  deflate: $a,
  deflateEnd: Ga,
  deflateSetDictionary: Za,
  deflateInfo: Wa
};
const Ka = (e, i) => Object.prototype.hasOwnProperty.call(e, i);
var qa = function(e) {
  const i = Array.prototype.slice.call(arguments, 1);
  for (; i.length; ) {
    const t = i.shift();
    if (t) {
      if (typeof t != "object")
        throw new TypeError(t + "must be non-object");
      for (const n in t)
        Ka(t, n) && (e[n] = t[n]);
    }
  }
  return e;
}, Va = (e) => {
  let i = 0;
  for (let n = 0, a = e.length; n < a; n++)
    i += e[n].length;
  const t = new Uint8Array(i);
  for (let n = 0, a = 0, s = e.length; n < s; n++) {
    let r = e[n];
    t.set(r, a), a += r.length;
  }
  return t;
}, ae = {
  assign: qa,
  flattenChunks: Va
};
let fn = !0;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  fn = !1;
}
const Ht = new Uint8Array(256);
for (let e = 0; e < 256; e++)
  Ht[e] = e >= 252 ? 6 : e >= 248 ? 5 : e >= 240 ? 4 : e >= 224 ? 3 : e >= 192 ? 2 : 1;
Ht[254] = Ht[255] = 1;
var ja = (e) => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
    return new TextEncoder().encode(e);
  let i, t, n, a, s, r = e.length, l = 0;
  for (a = 0; a < r; a++)
    t = e.charCodeAt(a), (t & 64512) === 55296 && a + 1 < r && (n = e.charCodeAt(a + 1), (n & 64512) === 56320 && (t = 65536 + (t - 55296 << 10) + (n - 56320), a++)), l += t < 128 ? 1 : t < 2048 ? 2 : t < 65536 ? 3 : 4;
  for (i = new Uint8Array(l), s = 0, a = 0; s < l; a++)
    t = e.charCodeAt(a), (t & 64512) === 55296 && a + 1 < r && (n = e.charCodeAt(a + 1), (n & 64512) === 56320 && (t = 65536 + (t - 55296 << 10) + (n - 56320), a++)), t < 128 ? i[s++] = t : t < 2048 ? (i[s++] = 192 | t >>> 6, i[s++] = 128 | t & 63) : t < 65536 ? (i[s++] = 224 | t >>> 12, i[s++] = 128 | t >>> 6 & 63, i[s++] = 128 | t & 63) : (i[s++] = 240 | t >>> 18, i[s++] = 128 | t >>> 12 & 63, i[s++] = 128 | t >>> 6 & 63, i[s++] = 128 | t & 63);
  return i;
};
const Ya = (e, i) => {
  if (i < 65534 && e.subarray && fn)
    return String.fromCharCode.apply(null, e.length === i ? e : e.subarray(0, i));
  let t = "";
  for (let n = 0; n < i; n++)
    t += String.fromCharCode(e[n]);
  return t;
};
var Xa = (e, i) => {
  const t = i || e.length;
  if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
    return new TextDecoder().decode(e.subarray(0, i));
  let n, a;
  const s = new Array(t * 2);
  for (a = 0, n = 0; n < t; ) {
    let r = e[n++];
    if (r < 128) {
      s[a++] = r;
      continue;
    }
    let l = Ht[r];
    if (l > 4) {
      s[a++] = 65533, n += l - 1;
      continue;
    }
    for (r &= l === 2 ? 31 : l === 3 ? 15 : 7; l > 1 && n < t; )
      r = r << 6 | e[n++] & 63, l--;
    if (l > 1) {
      s[a++] = 65533;
      continue;
    }
    r < 65536 ? s[a++] = r : (r -= 65536, s[a++] = 55296 | r >> 10 & 1023, s[a++] = 56320 | r & 1023);
  }
  return Ya(s, a);
}, Ja = (e, i) => {
  i = i || e.length, i > e.length && (i = e.length);
  let t = i - 1;
  for (; t >= 0 && (e[t] & 192) === 128; )
    t--;
  return t < 0 || t === 0 ? i : t + Ht[e[t]] > i ? t : i;
}, zt = {
  string2buf: ja,
  buf2string: Xa,
  utf8border: Ja
};
function Qa() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var dn = Qa;
const _n = Object.prototype.toString, {
  Z_NO_FLUSH: ts,
  Z_SYNC_FLUSH: es,
  Z_FULL_FLUSH: is,
  Z_FINISH: ns,
  Z_OK: Qt,
  Z_STREAM_END: as,
  Z_DEFAULT_COMPRESSION: ss,
  Z_DEFAULT_STRATEGY: rs,
  Z_DEFLATED: os
} = ie, ls = {
  level: ss,
  method: os,
  chunkSize: 16384,
  windowBits: 15,
  memLevel: 8,
  strategy: rs,
  legacyHash: !0
};
function se(e) {
  this.options = ae.assign({}, ls, e || {});
  let i = this.options;
  i.raw && i.windowBits > 0 ? i.windowBits = -i.windowBits : i.gzip && i.windowBits > 0 && i.windowBits < 16 && (i.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new dn(), this.strm.avail_out = 0;
  let t = Ct.deflateInit2(
    this.strm,
    i.level,
    i.method,
    i.windowBits,
    i.memLevel,
    i.strategy,
    i.legacyHash
  );
  if (t !== Qt)
    throw new Error(St[t]);
  if (i.header && Ct.deflateSetHeader(this.strm, i.header), i.dictionary) {
    let n;
    if (typeof i.dictionary == "string" ? n = zt.string2buf(i.dictionary) : _n.call(i.dictionary) === "[object ArrayBuffer]" ? n = new Uint8Array(i.dictionary) : n = i.dictionary, t = Ct.deflateSetDictionary(this.strm, n), t !== Qt)
      throw new Error(St[t]);
    this._dict_set = !0;
  }
}
se.prototype.push = function(e, i) {
  const t = this.strm, n = this.options.chunkSize;
  let a, s;
  if (this.ended)
    return !1;
  for (i === ~~i ? s = i : s = i === !0 ? ns : ts, typeof e == "string" ? t.input = zt.string2buf(e) : _n.call(e) === "[object ArrayBuffer]" ? t.input = new Uint8Array(e) : t.input = e, t.next_in = 0, t.avail_in = t.input.length; ; ) {
    if (t.avail_out === 0 && (t.output = new Uint8Array(n), t.next_out = 0, t.avail_out = n), (s === es || s === is) && t.avail_out <= 6) {
      this.onData(t.output.subarray(0, t.next_out)), t.avail_out = 0;
      continue;
    }
    if (a = Ct.deflate(t, s), a === as)
      return t.next_out > 0 && this.onData(t.output.subarray(0, t.next_out)), a = Ct.deflateEnd(this.strm), this.onEnd(a), this.ended = !0, a === Qt;
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
se.prototype.onData = function(e) {
  this.chunks.push(e);
};
se.prototype.onEnd = function(e) {
  e === Qt && (this.result = ae.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
};
function hs(e, i) {
  const t = new se(i);
  if (t.push(e, !0), t.err)
    throw t.msg || St[t.err];
  return t.result;
}
var cs = hs, fs = {
  deflate: cs
};
const qt = 16209, ds = 16191;
var _s = function(i, t) {
  let n, a, s, r, l, h, o, c, u, d, f, g, y, p, w, E, m, _, R, D, S, T, A, b;
  const x = i.state;
  n = i.next_in, A = i.input, a = n + (i.avail_in - 5), s = i.next_out, b = i.output, r = s - (t - i.avail_out), l = s + (i.avail_out - 257), h = x.dmax, o = x.wsize, c = x.whave, u = x.wnext, d = x.window, f = x.hold, g = x.bits, y = x.lencode, p = x.distcode, w = (1 << x.lenbits) - 1, E = (1 << x.distbits) - 1;
  t:
    do {
      g < 15 && (f += A[n++] << g, g += 8, f += A[n++] << g, g += 8), m = y[f & w];
      e:
        for (; ; ) {
          if (_ = m >>> 24, f >>>= _, g -= _, _ = m >>> 16 & 255, _ === 0)
            b[s++] = m & 65535;
          else if (_ & 16) {
            R = m & 65535, _ &= 15, _ && (g < _ && (f += A[n++] << g, g += 8), R += f & (1 << _) - 1, f >>>= _, g -= _), g < 15 && (f += A[n++] << g, g += 8, f += A[n++] << g, g += 8), m = p[f & E];
            i:
              for (; ; ) {
                if (_ = m >>> 24, f >>>= _, g -= _, _ = m >>> 16 & 255, _ & 16) {
                  if (D = m & 65535, _ &= 15, g < _ && (f += A[n++] << g, g += 8, g < _ && (f += A[n++] << g, g += 8)), D += f & (1 << _) - 1, D > h) {
                    i.msg = "invalid distance too far back", x.mode = qt;
                    break t;
                  }
                  if (f >>>= _, g -= _, _ = s - r, D > _) {
                    if (_ = D - _, _ > c && x.sane) {
                      i.msg = "invalid distance too far back", x.mode = qt;
                      break t;
                    }
                    if (S = 0, T = d, u === 0) {
                      if (S += o - _, _ < R) {
                        R -= _;
                        do
                          b[s++] = d[S++];
                        while (--_);
                        S = s - D, T = b;
                      }
                    } else if (u < _) {
                      if (S += o + u - _, _ -= u, _ < R) {
                        R -= _;
                        do
                          b[s++] = d[S++];
                        while (--_);
                        if (S = 0, u < R) {
                          _ = u, R -= _;
                          do
                            b[s++] = d[S++];
                          while (--_);
                          S = s - D, T = b;
                        }
                      }
                    } else if (S += u - _, _ < R) {
                      R -= _;
                      do
                        b[s++] = d[S++];
                      while (--_);
                      S = s - D, T = b;
                    }
                    for (; R > 2; )
                      b[s++] = T[S++], b[s++] = T[S++], b[s++] = T[S++], R -= 3;
                    R && (b[s++] = T[S++], R > 1 && (b[s++] = T[S++]));
                  } else {
                    S = s - D;
                    do
                      b[s++] = b[S++], b[s++] = b[S++], b[s++] = b[S++], R -= 3;
                    while (R > 2);
                    R && (b[s++] = b[S++], R > 1 && (b[s++] = b[S++]));
                  }
                } else if (_ & 64) {
                  i.msg = "invalid distance code", x.mode = qt;
                  break t;
                } else {
                  m = p[(m & 65535) + (f & (1 << _) - 1)];
                  continue i;
                }
                break;
              }
          } else if (_ & 64)
            if (_ & 32) {
              x.mode = ds;
              break t;
            } else {
              i.msg = "invalid literal/length code", x.mode = qt;
              break t;
            }
          else {
            m = y[(m & 65535) + (f & (1 << _) - 1)];
            continue e;
          }
          break;
        }
    } while (n < a && s < l);
  R = g >> 3, n -= R, g -= R << 3, f &= (1 << g) - 1, i.next_in = n, i.next_out = s, i.avail_in = n < a ? 5 + (a - n) : 5 - (n - a), i.avail_out = s < l ? 257 + (l - s) : 257 - (s - l), x.hold = f, x.bits = g;
};
const gt = 15, ii = 852, ni = 592, ai = 0, we = 1, si = 2, us = new Uint16Array([
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
]), gs = new Uint8Array([
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
]), ps = new Uint16Array([
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
]), ws = new Uint8Array([
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
]), Es = (e, i, t, n, a, s, r, l) => {
  const h = l.bits;
  let o = 0, c = 0, u = 0, d = 0, f = 0, g = 0, y = 0, p = 0, w = 0, E = 0, m, _, R, D, S, T = null, A;
  const b = new Uint16Array(gt + 1), x = new Uint16Array(gt + 1);
  let H = null, Wt, F, U;
  for (o = 0; o <= gt; o++)
    b[o] = 0;
  for (c = 0; c < n; c++)
    b[i[t + c]]++;
  for (f = h, d = gt; d >= 1 && b[d] === 0; d--)
    ;
  if (f > d && (f = d), d === 0)
    return a[s++] = 1 << 24 | 64 << 16 | 0, a[s++] = 1 << 24 | 64 << 16 | 0, l.bits = 1, 0;
  for (u = 1; u < d && b[u] === 0; u++)
    ;
  for (f < u && (f = u), p = 1, o = 1; o <= gt; o++)
    if (p <<= 1, p -= b[o], p < 0)
      return -1;
  if (p > 0 && (e === ai || d !== 1))
    return -1;
  for (x[1] = 0, o = 1; o < gt; o++)
    x[o + 1] = x[o] + b[o];
  for (c = 0; c < n; c++)
    i[t + c] !== 0 && (r[x[i[t + c]]++] = c);
  if (e === ai ? (T = H = r, A = 20) : e === we ? (T = us, H = gs, A = 257) : (T = ps, H = ws, A = 0), E = 0, c = 0, o = u, S = s, g = f, y = 0, R = -1, w = 1 << f, D = w - 1, e === we && w > ii || e === si && w > ni)
    return 1;
  for (; ; ) {
    Wt = o - y, r[c] + 1 < A ? (F = 0, U = r[c]) : r[c] >= A ? (F = H[r[c] - A], U = T[r[c] - A]) : (F = 96, U = 0), m = 1 << o - y, _ = 1 << g, u = _;
    do
      _ -= m, a[S + (E >> y) + _] = Wt << 24 | F << 16 | U | 0;
    while (_ !== 0);
    for (m = 1 << o - 1; E & m; )
      m >>= 1;
    if (m !== 0 ? (E &= m - 1, E += m) : E = 0, c++, --b[o] === 0) {
      if (o === d)
        break;
      o = i[t + r[c]];
    }
    if (o > f && (E & D) !== R) {
      for (y === 0 && (y = f), S += u, g = o - y, p = 1 << g; g + y < d && (p -= b[g + y], !(p <= 0)); )
        g++, p <<= 1;
      if (w += 1 << g, e === we && w > ii || e === si && w > ni)
        return 1;
      R = E & D, a[R] = f << 24 | g << 16 | S - s | 0;
    }
  }
  return E !== 0 && (a[S + E] = o - y << 24 | 64 << 16 | 0), l.bits = f, 0;
};
var Mt = Es;
const Ss = 0, un = 1, gn = 2, {
  Z_FINISH: ri,
  Z_BLOCK: ms,
  Z_TREES: Vt,
  Z_OK: ct,
  Z_STREAM_END: bs,
  Z_NEED_DICT: ys,
  Z_STREAM_ERROR: Z,
  Z_DATA_ERROR: pn,
  Z_MEM_ERROR: wn,
  Z_BUF_ERROR: xs,
  Z_DEFLATED: oi
} = ie, re = 16180, li = 16181, hi = 16182, ci = 16183, fi = 16184, di = 16185, _i = 16186, ui = 16187, gi = 16188, pi = 16189, te = 16190, Y = 16191, Ee = 16192, wi = 16193, Se = 16194, Ei = 16195, Si = 16196, mi = 16197, bi = 16198, jt = 16199, Yt = 16200, yi = 16201, xi = 16202, Ai = 16203, Ri = 16204, vi = 16205, me = 16206, Ii = 16207, ki = 16208, C = 16209, En = 16210, Sn = 16211, As = 852, Rs = 592, vs = 15, Is = vs, Ti = (e) => (e >>> 24 & 255) + (e >>> 8 & 65280) + ((e & 65280) << 8) + ((e & 255) << 24);
function ks() {
  this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
const dt = (e) => {
  if (!e)
    return 1;
  const i = e.state;
  return !i || i.strm !== e || i.mode < re || i.mode > Sn ? 1 : 0;
}, mn = (e) => {
  if (dt(e))
    return Z;
  const i = e.state;
  return e.total_in = e.total_out = i.total = 0, e.msg = "", i.wrap && (e.adler = i.wrap & 1), i.mode = re, i.last = 0, i.havedict = 0, i.flags = -1, i.dmax = 32768, i.head = null, i.hold = 0, i.bits = 0, i.lencode = i.lendyn = new Int32Array(As), i.distcode = i.distdyn = new Int32Array(Rs), i.sane = 1, i.back = -1, ct;
}, bn = (e) => {
  if (dt(e))
    return Z;
  const i = e.state;
  return i.wsize = 0, i.whave = 0, i.wnext = 0, mn(e);
}, yn = (e, i) => {
  let t;
  if (dt(e))
    return Z;
  const n = e.state;
  return i < 0 ? (t = 0, i = -i) : (t = (i >> 4) + 5, i < 48 && (i &= 15)), i && (i < 8 || i > 15) ? Z : (n.window !== null && n.wbits !== i && (n.window = null), n.wrap = t, n.wbits = i, bn(e));
}, xn = (e, i) => {
  if (!e)
    return Z;
  const t = new ks();
  e.state = t, t.strm = e, t.window = null, t.mode = re;
  const n = yn(e, i);
  return n !== ct && (e.state = null), n;
}, Ts = (e) => xn(e, Is);
let Di = !0, be, ye;
const Ds = (e) => {
  if (Di) {
    be = new Int32Array(512), ye = new Int32Array(32);
    let i = 0;
    for (; i < 144; )
      e.lens[i++] = 8;
    for (; i < 256; )
      e.lens[i++] = 9;
    for (; i < 280; )
      e.lens[i++] = 7;
    for (; i < 288; )
      e.lens[i++] = 8;
    for (Mt(un, e.lens, 0, 288, be, 0, e.work, { bits: 9 }), i = 0; i < 32; )
      e.lens[i++] = 5;
    Mt(gn, e.lens, 0, 32, ye, 0, e.work, { bits: 5 }), Di = !1;
  }
  e.lencode = be, e.lenbits = 9, e.distcode = ye, e.distbits = 5;
}, An = (e, i, t, n) => {
  let a;
  const s = e.state;
  return s.window === null && (s.window = new Uint8Array(1 << s.wbits)), s.wsize === 0 && (s.wsize = 1 << s.wbits, s.wnext = 0, s.whave = 0), n >= s.wsize ? (s.window.set(i.subarray(t - s.wsize, t), 0), s.wnext = 0, s.whave = s.wsize) : (a = s.wsize - s.wnext, a > n && (a = n), s.window.set(i.subarray(t - n, t - n + a), s.wnext), n -= a, n ? (s.window.set(i.subarray(t - n, t), 0), s.wnext = n, s.whave = s.wsize) : (s.wnext += a, s.wnext === s.wsize && (s.wnext = 0), s.whave < s.wsize && (s.whave += a))), 0;
}, Cs = (e, i) => {
  let t, n, a, s, r, l, h, o, c, u, d, f, g, y, p = 0, w, E, m, _, R, D, S, T;
  const A = new Uint8Array(4);
  let b, x;
  const H = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (dt(e) || !e.output || !e.input && e.avail_in !== 0)
    return Z;
  t = e.state, t.mode === Y && (t.mode = Ee), r = e.next_out, a = e.output, h = e.avail_out, s = e.next_in, n = e.input, l = e.avail_in, o = t.hold, c = t.bits, u = l, d = h, T = ct;
  t:
    for (; ; )
      switch (t.mode) {
        case re:
          if (t.wrap === 0) {
            t.mode = Ee;
            break;
          }
          for (; c < 16; ) {
            if (l === 0)
              break t;
            l--, o += n[s++] << c, c += 8;
          }
          if (t.wrap & 2 && o === 35615) {
            t.wbits === 0 && (t.wbits = 15), t.check = 0, A[0] = o & 255, A[1] = o >>> 8 & 255, t.check = M(t.check, A, 2, 0), o = 0, c = 0, t.mode = li;
            break;
          }
          if (t.head && (t.head.done = !1), !(t.wrap & 1) || /* check if zlib header allowed */
          (((o & 255) << 8) + (o >> 8)) % 31) {
            e.msg = "incorrect header check", t.mode = C;
            break;
          }
          if ((o & 15) !== oi) {
            e.msg = "unknown compression method", t.mode = C;
            break;
          }
          if (o >>>= 4, c -= 4, S = (o & 15) + 8, t.wbits === 0 && (t.wbits = S), S > 15 || S > t.wbits) {
            e.msg = "invalid window size", t.mode = C;
            break;
          }
          t.dmax = 1 << t.wbits, t.flags = 0, e.adler = t.check = 1, t.mode = o & 512 ? pi : Y, o = 0, c = 0;
          break;
        case li:
          for (; c < 16; ) {
            if (l === 0)
              break t;
            l--, o += n[s++] << c, c += 8;
          }
          if (t.flags = o, (t.flags & 255) !== oi) {
            e.msg = "unknown compression method", t.mode = C;
            break;
          }
          if (t.flags & 57344) {
            e.msg = "unknown header flags set", t.mode = C;
            break;
          }
          t.head && (t.head.text = o >> 8 & 1), t.flags & 512 && t.wrap & 4 && (A[0] = o & 255, A[1] = o >>> 8 & 255, t.check = M(t.check, A, 2, 0)), o = 0, c = 0, t.mode = hi;
        /* falls through */
        case hi:
          for (; c < 32; ) {
            if (l === 0)
              break t;
            l--, o += n[s++] << c, c += 8;
          }
          t.head && (t.head.time = o), t.flags & 512 && t.wrap & 4 && (A[0] = o & 255, A[1] = o >>> 8 & 255, A[2] = o >>> 16 & 255, A[3] = o >>> 24 & 255, t.check = M(t.check, A, 4, 0)), o = 0, c = 0, t.mode = ci;
        /* falls through */
        case ci:
          for (; c < 16; ) {
            if (l === 0)
              break t;
            l--, o += n[s++] << c, c += 8;
          }
          t.head && (t.head.xflags = o & 255, t.head.os = o >> 8), t.flags & 512 && t.wrap & 4 && (A[0] = o & 255, A[1] = o >>> 8 & 255, t.check = M(t.check, A, 2, 0)), o = 0, c = 0, t.mode = fi;
        /* falls through */
        case fi:
          if (t.flags & 1024) {
            for (; c < 16; ) {
              if (l === 0)
                break t;
              l--, o += n[s++] << c, c += 8;
            }
            t.length = o, t.head && (t.head.extra_len = o), t.flags & 512 && t.wrap & 4 && (A[0] = o & 255, A[1] = o >>> 8 & 255, t.check = M(t.check, A, 2, 0)), o = 0, c = 0;
          } else t.head && (t.head.extra = null);
          t.mode = di;
        /* falls through */
        case di:
          if (t.flags & 1024 && (f = t.length, f > l && (f = l), f && (t.head && (S = t.head.extra_len - t.length, t.head.extra || (t.head.extra = new Uint8Array(t.head.extra_len)), t.head.extra.set(
            n.subarray(
              s,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              s + f
            ),
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            S
          )), t.flags & 512 && t.wrap & 4 && (t.check = M(t.check, n, f, s)), l -= f, s += f, t.length -= f), t.length))
            break t;
          t.length = 0, t.mode = _i;
        /* falls through */
        case _i:
          if (t.flags & 2048) {
            if (l === 0)
              break t;
            f = 0;
            do
              S = n[s + f++], t.head && S && t.length < 65536 && (t.head.name += String.fromCharCode(S));
            while (S && f < l);
            if (t.flags & 512 && t.wrap & 4 && (t.check = M(t.check, n, f, s)), l -= f, s += f, S)
              break t;
          } else t.head && (t.head.name = null);
          t.length = 0, t.mode = ui;
        /* falls through */
        case ui:
          if (t.flags & 4096) {
            if (l === 0)
              break t;
            f = 0;
            do
              S = n[s + f++], t.head && S && t.length < 65536 && (t.head.comment += String.fromCharCode(S));
            while (S && f < l);
            if (t.flags & 512 && t.wrap & 4 && (t.check = M(t.check, n, f, s)), l -= f, s += f, S)
              break t;
          } else t.head && (t.head.comment = null);
          t.mode = gi;
        /* falls through */
        case gi:
          if (t.flags & 512) {
            for (; c < 16; ) {
              if (l === 0)
                break t;
              l--, o += n[s++] << c, c += 8;
            }
            if (t.wrap & 4 && o !== (t.check & 65535)) {
              e.msg = "header crc mismatch", t.mode = C;
              break;
            }
            o = 0, c = 0;
          }
          t.head && (t.head.hcrc = t.flags >> 9 & 1, t.head.done = !0), e.adler = t.check = 0, t.mode = Y;
          break;
        case pi:
          for (; c < 32; ) {
            if (l === 0)
              break t;
            l--, o += n[s++] << c, c += 8;
          }
          e.adler = t.check = Ti(o), o = 0, c = 0, t.mode = te;
        /* falls through */
        case te:
          if (t.havedict === 0)
            return e.next_out = r, e.avail_out = h, e.next_in = s, e.avail_in = l, t.hold = o, t.bits = c, ys;
          e.adler = t.check = 1, t.mode = Y;
        /* falls through */
        case Y:
          if (i === ms || i === Vt)
            break t;
        /* falls through */
        case Ee:
          if (t.last) {
            o >>>= c & 7, c -= c & 7, t.mode = me;
            break;
          }
          for (; c < 3; ) {
            if (l === 0)
              break t;
            l--, o += n[s++] << c, c += 8;
          }
          switch (t.last = o & 1, o >>>= 1, c -= 1, o & 3) {
            case 0:
              t.mode = wi;
              break;
            case 1:
              if (Ds(t), t.mode = jt, i === Vt) {
                o >>>= 2, c -= 2;
                break t;
              }
              break;
            case 2:
              t.mode = Si;
              break;
            case 3:
              e.msg = "invalid block type", t.mode = C;
          }
          o >>>= 2, c -= 2;
          break;
        case wi:
          for (o >>>= c & 7, c -= c & 7; c < 32; ) {
            if (l === 0)
              break t;
            l--, o += n[s++] << c, c += 8;
          }
          if ((o & 65535) !== (o >>> 16 ^ 65535)) {
            e.msg = "invalid stored block lengths", t.mode = C;
            break;
          }
          if (t.length = o & 65535, o = 0, c = 0, t.mode = Se, i === Vt)
            break t;
        /* falls through */
        case Se:
          t.mode = Ei;
        /* falls through */
        case Ei:
          if (f = t.length, f) {
            if (f > l && (f = l), f > h && (f = h), f === 0)
              break t;
            a.set(n.subarray(s, s + f), r), l -= f, s += f, h -= f, r += f, t.length -= f;
            break;
          }
          t.mode = Y;
          break;
        case Si:
          for (; c < 14; ) {
            if (l === 0)
              break t;
            l--, o += n[s++] << c, c += 8;
          }
          if (t.nlen = (o & 31) + 257, o >>>= 5, c -= 5, t.ndist = (o & 31) + 1, o >>>= 5, c -= 5, t.ncode = (o & 15) + 4, o >>>= 4, c -= 4, t.nlen > 286 || t.ndist > 30) {
            e.msg = "too many length or distance symbols", t.mode = C;
            break;
          }
          t.have = 0, t.mode = mi;
        /* falls through */
        case mi:
          for (; t.have < t.ncode; ) {
            for (; c < 3; ) {
              if (l === 0)
                break t;
              l--, o += n[s++] << c, c += 8;
            }
            t.lens[H[t.have++]] = o & 7, o >>>= 3, c -= 3;
          }
          for (; t.have < 19; )
            t.lens[H[t.have++]] = 0;
          if (t.lencode = t.lendyn, t.lenbits = 7, b = { bits: t.lenbits }, T = Mt(Ss, t.lens, 0, 19, t.lencode, 0, t.work, b), t.lenbits = b.bits, T) {
            e.msg = "invalid code lengths set", t.mode = C;
            break;
          }
          t.have = 0, t.mode = bi;
        /* falls through */
        case bi:
          for (; t.have < t.nlen + t.ndist; ) {
            for (; p = t.lencode[o & (1 << t.lenbits) - 1], w = p >>> 24, E = p >>> 16 & 255, m = p & 65535, !(w <= c); ) {
              if (l === 0)
                break t;
              l--, o += n[s++] << c, c += 8;
            }
            if (m < 16)
              o >>>= w, c -= w, t.lens[t.have++] = m;
            else {
              if (m === 16) {
                for (x = w + 2; c < x; ) {
                  if (l === 0)
                    break t;
                  l--, o += n[s++] << c, c += 8;
                }
                if (o >>>= w, c -= w, t.have === 0) {
                  e.msg = "invalid bit length repeat", t.mode = C;
                  break;
                }
                S = t.lens[t.have - 1], f = 3 + (o & 3), o >>>= 2, c -= 2;
              } else if (m === 17) {
                for (x = w + 3; c < x; ) {
                  if (l === 0)
                    break t;
                  l--, o += n[s++] << c, c += 8;
                }
                o >>>= w, c -= w, S = 0, f = 3 + (o & 7), o >>>= 3, c -= 3;
              } else {
                for (x = w + 7; c < x; ) {
                  if (l === 0)
                    break t;
                  l--, o += n[s++] << c, c += 8;
                }
                o >>>= w, c -= w, S = 0, f = 11 + (o & 127), o >>>= 7, c -= 7;
              }
              if (t.have + f > t.nlen + t.ndist) {
                e.msg = "invalid bit length repeat", t.mode = C;
                break;
              }
              for (; f--; )
                t.lens[t.have++] = S;
            }
          }
          if (t.mode === C)
            break;
          if (t.lens[256] === 0) {
            e.msg = "invalid code -- missing end-of-block", t.mode = C;
            break;
          }
          if (t.lenbits = 9, b = { bits: t.lenbits }, T = Mt(un, t.lens, 0, t.nlen, t.lencode, 0, t.work, b), t.lenbits = b.bits, T) {
            e.msg = "invalid literal/lengths set", t.mode = C;
            break;
          }
          if (t.distbits = 6, t.distcode = t.distdyn, b = { bits: t.distbits }, T = Mt(gn, t.lens, t.nlen, t.ndist, t.distcode, 0, t.work, b), t.distbits = b.bits, T) {
            e.msg = "invalid distances set", t.mode = C;
            break;
          }
          if (t.mode = jt, i === Vt)
            break t;
        /* falls through */
        case jt:
          t.mode = Yt;
        /* falls through */
        case Yt:
          if (l >= 6 && h >= 258) {
            e.next_out = r, e.avail_out = h, e.next_in = s, e.avail_in = l, t.hold = o, t.bits = c, _s(e, d), r = e.next_out, a = e.output, h = e.avail_out, s = e.next_in, n = e.input, l = e.avail_in, o = t.hold, c = t.bits, t.mode === Y && (t.back = -1);
            break;
          }
          for (t.back = 0; p = t.lencode[o & (1 << t.lenbits) - 1], w = p >>> 24, E = p >>> 16 & 255, m = p & 65535, !(w <= c); ) {
            if (l === 0)
              break t;
            l--, o += n[s++] << c, c += 8;
          }
          if (E && !(E & 240)) {
            for (_ = w, R = E, D = m; p = t.lencode[D + ((o & (1 << _ + R) - 1) >> _)], w = p >>> 24, E = p >>> 16 & 255, m = p & 65535, !(_ + w <= c); ) {
              if (l === 0)
                break t;
              l--, o += n[s++] << c, c += 8;
            }
            o >>>= _, c -= _, t.back += _;
          }
          if (o >>>= w, c -= w, t.back += w, t.length = m, E === 0) {
            t.mode = vi;
            break;
          }
          if (E & 32) {
            t.back = -1, t.mode = Y;
            break;
          }
          if (E & 64) {
            e.msg = "invalid literal/length code", t.mode = C;
            break;
          }
          t.extra = E & 15, t.mode = yi;
        /* falls through */
        case yi:
          if (t.extra) {
            for (x = t.extra; c < x; ) {
              if (l === 0)
                break t;
              l--, o += n[s++] << c, c += 8;
            }
            t.length += o & (1 << t.extra) - 1, o >>>= t.extra, c -= t.extra, t.back += t.extra;
          }
          t.was = t.length, t.mode = xi;
        /* falls through */
        case xi:
          for (; p = t.distcode[o & (1 << t.distbits) - 1], w = p >>> 24, E = p >>> 16 & 255, m = p & 65535, !(w <= c); ) {
            if (l === 0)
              break t;
            l--, o += n[s++] << c, c += 8;
          }
          if (!(E & 240)) {
            for (_ = w, R = E, D = m; p = t.distcode[D + ((o & (1 << _ + R) - 1) >> _)], w = p >>> 24, E = p >>> 16 & 255, m = p & 65535, !(_ + w <= c); ) {
              if (l === 0)
                break t;
              l--, o += n[s++] << c, c += 8;
            }
            o >>>= _, c -= _, t.back += _;
          }
          if (o >>>= w, c -= w, t.back += w, E & 64) {
            e.msg = "invalid distance code", t.mode = C;
            break;
          }
          t.offset = m, t.extra = E & 15, t.mode = Ai;
        /* falls through */
        case Ai:
          if (t.extra) {
            for (x = t.extra; c < x; ) {
              if (l === 0)
                break t;
              l--, o += n[s++] << c, c += 8;
            }
            t.offset += o & (1 << t.extra) - 1, o >>>= t.extra, c -= t.extra, t.back += t.extra;
          }
          if (t.offset > t.dmax) {
            e.msg = "invalid distance too far back", t.mode = C;
            break;
          }
          t.mode = Ri;
        /* falls through */
        case Ri:
          if (h === 0)
            break t;
          if (f = d - h, t.offset > f) {
            if (f = t.offset - f, f > t.whave && t.sane) {
              e.msg = "invalid distance too far back", t.mode = C;
              break;
            }
            f > t.wnext ? (f -= t.wnext, g = t.wsize - f) : g = t.wnext - f, f > t.length && (f = t.length), y = t.window;
          } else
            y = a, g = r - t.offset, f = t.length;
          f > h && (f = h), h -= f, t.length -= f;
          do
            a[r++] = y[g++];
          while (--f);
          t.length === 0 && (t.mode = Yt);
          break;
        case vi:
          if (h === 0)
            break t;
          a[r++] = t.length, h--, t.mode = Yt;
          break;
        case me:
          if (t.wrap) {
            for (; c < 32; ) {
              if (l === 0)
                break t;
              l--, o |= n[s++] << c, c += 8;
            }
            if (d -= h, e.total_out += d, t.total += d, t.wrap & 4 && d && (e.adler = t.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
            t.flags ? M(t.check, a, d, r - d) : Bt(t.check, a, d, r - d)), d = h, t.wrap & 4 && (t.flags ? o : Ti(o)) !== t.check) {
              e.msg = "incorrect data check", t.mode = C;
              break;
            }
            o = 0, c = 0;
          }
          t.mode = Ii;
        /* falls through */
        case Ii:
          if (t.wrap && t.flags) {
            for (; c < 32; ) {
              if (l === 0)
                break t;
              l--, o += n[s++] << c, c += 8;
            }
            if (t.wrap & 4 && o !== (t.total & 4294967295)) {
              e.msg = "incorrect length check", t.mode = C;
              break;
            }
            o = 0, c = 0;
          }
          t.mode = ki;
        /* falls through */
        case ki:
          T = bs;
          break t;
        case C:
          T = pn;
          break t;
        case En:
          return wn;
        case Sn:
        /* falls through */
        default:
          return Z;
      }
  return e.next_out = r, e.avail_out = h, e.next_in = s, e.avail_in = l, t.hold = o, t.bits = c, (t.wsize || d !== e.avail_out && t.mode < C && (t.mode < me || i !== ri)) && An(e, e.output, e.next_out, d - e.avail_out), u -= e.avail_in, d -= e.avail_out, e.total_in += u, e.total_out += d, t.total += d, t.wrap & 4 && d && (e.adler = t.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
  t.flags ? M(t.check, a, d, e.next_out - d) : Bt(t.check, a, d, e.next_out - d)), e.data_type = t.bits + (t.last ? 64 : 0) + (t.mode === Y ? 128 : 0) + (t.mode === jt || t.mode === Se ? 256 : 0), (u === 0 && d === 0 || i === ri) && T === ct && (T = xs), T;
}, Ms = (e) => {
  if (dt(e))
    return Z;
  let i = e.state;
  return i.window && (i.window = null), e.state = null, ct;
}, Ls = (e, i) => {
  if (dt(e))
    return Z;
  const t = e.state;
  return t.wrap & 2 ? (t.head = i, i.done = !1, ct) : Z;
}, Ps = (e, i) => {
  const t = i.length;
  let n, a, s;
  return dt(e) || (n = e.state, n.wrap !== 0 && n.mode !== te) ? Z : n.mode === te && (a = 1, a = Bt(a, i, t, 0), a !== n.check) ? pn : (s = An(e, i, t, t), s ? (n.mode = En, wn) : (n.havedict = 1, ct));
};
var Os = bn, Fs = yn, Us = mn, Ns = Ts, Bs = xn, Hs = Cs, zs = Ms, $s = Ls, Gs = Ps, Zs = "pako inflate (from Nodeca project)", K = {
  inflateReset: Os,
  inflateReset2: Fs,
  inflateResetKeep: Us,
  inflateInit: Ns,
  inflateInit2: Bs,
  inflate: Hs,
  inflateEnd: zs,
  inflateGetHeader: $s,
  inflateSetDictionary: Gs,
  inflateInfo: Zs
};
function Ws() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var Ks = Ws;
const Rn = Object.prototype.toString, {
  Z_NO_FLUSH: qs,
  Z_FINISH: Ci,
  Z_OK: Et,
  Z_STREAM_END: xe,
  Z_NEED_DICT: Ae,
  Z_STREAM_ERROR: Vs,
  Z_DATA_ERROR: Mi,
  Z_MEM_ERROR: js,
  Z_BUF_ERROR: Li
} = ie, Ys = {
  chunkSize: 1024 * 64,
  windowBits: 15,
  to: ""
};
function oe(e) {
  this.options = ae.assign({}, Ys, e || {});
  const i = this.options;
  i.raw && i.windowBits >= 0 && i.windowBits < 16 && (i.windowBits = -i.windowBits, i.windowBits === 0 && (i.windowBits = -15)), i.windowBits >= 0 && i.windowBits < 16 && !(e && e.windowBits) && (i.windowBits += 32), i.windowBits > 15 && i.windowBits < 48 && (i.windowBits & 15 || (i.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new dn(), this.strm.avail_out = 0;
  let t = K.inflateInit2(
    this.strm,
    i.windowBits
  );
  if (t !== Et)
    throw new Error(St[t]);
  if (this.header = new Ks(), K.inflateGetHeader(this.strm, this.header), i.dictionary && (typeof i.dictionary == "string" ? i.dictionary = zt.string2buf(i.dictionary) : Rn.call(i.dictionary) === "[object ArrayBuffer]" && (i.dictionary = new Uint8Array(i.dictionary)), i.raw && (t = K.inflateSetDictionary(this.strm, i.dictionary), t !== Et)))
    throw new Error(St[t]);
}
oe.prototype.push = function(e, i) {
  const t = this.strm, n = this.options.chunkSize, a = this.options.dictionary;
  let s, r, l;
  if (this.ended) return !1;
  for (i === ~~i ? r = i : r = i === !0 ? Ci : qs, Rn.call(e) === "[object ArrayBuffer]" ? t.input = new Uint8Array(e) : t.input = e, t.next_in = 0, t.avail_in = t.input.length; ; ) {
    for (t.avail_out === 0 && (t.output = new Uint8Array(n), t.next_out = 0, t.avail_out = n), s = K.inflate(t, r), s === Ae && a && (s = K.inflateSetDictionary(t, a), s === Et ? s = K.inflate(t, r) : s === Mi && (s = Ae)); t.avail_in > 0 && s === xe && t.state.wrap & 2 && t.state.flags !== 0 && t.input[t.next_in] !== 0; )
      K.inflateReset(t), s = K.inflate(t, r);
    switch (s) {
      case Vs:
      case Mi:
      case Ae:
      case js:
        return this.onEnd(s), this.ended = !0, !1;
    }
    if (l = t.avail_out, t.next_out && (t.avail_out === 0 || s === xe || r > 0))
      if (this.options.to === "string") {
        let h = zt.utf8border(t.output, t.next_out), o = t.next_out - h, c = zt.buf2string(t.output, h);
        t.next_out = o, t.avail_out = n - o, o && t.output.set(t.output.subarray(h, h + o), 0), this.onData(c);
      } else
        this.onData(t.output.length === t.next_out ? t.output : t.output.subarray(0, t.next_out)), t.avail_out = 0, t.next_out = 0;
    if (!((s === Et || s === Li) && l === 0)) {
      if (s === xe)
        return s = K.inflateEnd(this.strm), this.onEnd(s), this.ended = !0, !0;
      if (t.avail_in === 0) {
        if (r === Ci)
          return s = K.inflateEnd(this.strm), this.onEnd(s === Et ? Li : s), this.ended = !0, !1;
        break;
      }
    }
  }
  return !0;
};
oe.prototype.onData = function(e) {
  this.chunks.push(e);
};
oe.prototype.onEnd = function(e) {
  e === Et && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = ae.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
};
var Xs = oe, Js = {
  Inflate: Xs
};
const { deflate: Qs } = fs, { Inflate: tr } = Js;
var er = Qs, ir = tr;
function Fe(e, i, t = 255) {
  const n = e.length % i;
  if (n !== 0) {
    const a = new Uint8Array(i - n).fill(t), s = new Uint8Array(e.length + a.length);
    return s.set(e), s.set(a, e.length), s;
  }
  return e;
}
const Ge = 239;
function Pi(e, i = Ge) {
  for (let t = 0; t < e.length; t++)
    i ^= e[t];
  return i;
}
function le(e) {
  const i = new Uint8Array(e.length);
  for (let t = 0; t < e.length; t++)
    i[t] = e.charCodeAt(t);
  return i;
}
function Lt(e) {
  return new Promise((i) => setTimeout(i, e));
}
class vn {
  constructor(i, t = !1, n = !0) {
    this.device = i, this.tracing = t, this.slipReaderEnabled = !1, this.baudrate = 0, this.traceLog = "", this.lastTraceTime = Date.now(), this.buffer = new Uint8Array(0), this.onDeviceLostCallback = null, this.SLIP_END = 192, this.SLIP_ESC = 219, this.SLIP_ESC_END = 220, this.SLIP_ESC_ESC = 221, this._DTR_state = !1, this.slipReaderEnabled = n;
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
    const a = `${`TRACE ${(Date.now() - this.lastTraceTime).toFixed(3)}`} ${i}`;
    console.log(a), this.traceLog += a + `
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
      let n = "", a = i;
      for (; a.length > 0; ) {
        const s = a.slice(0, 16), r = String.fromCharCode(...s).split("").map((l) => l === " " || l >= " " && l <= "~" && l !== "  " ? l : ".").join("");
        a = a.slice(16), n += `
    ${this.hexify(s.slice(0, 8))} ${this.hexify(s.slice(8))} | ${r}`;
      }
      return n;
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
    for (let n = 0; n < i.length; n++)
      i[n] === 219 ? t.push(219, 221) : i[n] === 192 ? t.push(219, 220) : t.push(i[n]);
    return t.push(192), new Uint8Array(t);
  }
  /**
   * Write binary data to device using the WebSerial device writable stream.
   * @param {Uint8Array} data 8 bit unsigned data array to write to device.
   */
  async write(i) {
    const t = this.slipWriter(i);
    if (this.device.writable) {
      const n = this.device.writable.getWriter();
      this.tracing && this.trace(`Write ${t.length} bytes: ${this.hexConvert(t)}`), await n.write(t), n.releaseLock();
    }
  }
  /**
   * Append a buffer array after another buffer array
   * @param {Uint8Array} arr1 - First array buffer.
   * @param {Uint8Array} arr2 - magic hex number to select ROM.
   * @returns {Uint8Array} Return a 8 bit unsigned array.
   */
  appendArray(i, t) {
    const n = new Uint8Array(i.length + t.length);
    return n.set(i), n.set(t, i.length), n;
  }
  /**
   * Read from serial device and append to buffer
   */
  async readLoop() {
    for (var i; this.device.readable; ) {
      this.reader = (i = this.device.readable) === null || i === void 0 ? void 0 : i.getReader();
      try {
        const { value: t, done: n } = await this.reader.read();
        if (n) {
          this.trace("Serial port done");
          break;
        }
        if (t && t.length) {
          const a = Uint8Array.from(t);
          this.buffer = this.appendArray(this.buffer, a);
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
    const t = /G?uru Meditation Error: (?:Core \d panic'ed \(([a-zA-Z ]*)\))?/, n = /F?atal exception \(\d+\): (?:([a-zA-Z ]*)?.*epc)?/, a = new TextDecoder("utf-8").decode(i), s = a.match(t) || a.match(n);
    if (s) {
      const r = s[1] || s[2], l = `Guru Meditation Error detected${r ? ` (${r})` : ""}`;
      throw new Error(l);
    }
  }
  /**
   * Take a data array and return the first well formed packet after
   * replacing the escape sequence. Reads at least 8 bytes.
   * @param {number} timeout Timeout read data.
   * @returns {Uint8Array} Formatted packet using SLIP escape sequences.
   */
  async read(i) {
    let t = null, n = !1, a = null;
    for (; ; ) {
      const s = Date.now();
      for (a = new Uint8Array(0); Date.now() - s < i; )
        if (this.buffer.length > 0) {
          a = this.buffer, this.buffer = new Uint8Array(0);
          break;
        } else
          await Lt(1);
      if (!a || a.length === 0) {
        const r = t === null ? "Serial data stream stopped: Possible serial noise or corruption." : "No serial data received.";
        throw this.tracing && this.trace(r), new Error(r);
      }
      this.tracing && this.trace(`Read ${a.length} bytes: ${this.hexConvert(a)}`);
      for (let r = 0; r < a.length; r++) {
        const l = a[r];
        if (t === null)
          if (l === this.SLIP_END)
            t = new Uint8Array(0);
          else {
            this.tracing && this.trace(`Read invalid data: ${this.hexConvert(a)}`);
            const h = this.buffer;
            throw this.tracing && this.trace(`Remaining data in serial buffer: ${this.hexConvert(h)}`), this.detectPanicHandler(new Uint8Array([...a, ...h || []])), new Error(`Invalid head of packet (0x${l.toString(16)}): Possible serial noise or corruption.`);
          }
        else if (n)
          if (n = !1, l === this.SLIP_ESC_END)
            t = this.appendArray(t, new Uint8Array([this.SLIP_END]));
          else if (l === this.SLIP_ESC_ESC)
            t = this.appendArray(t, new Uint8Array([this.SLIP_ESC]));
          else {
            this.tracing && this.trace(`Read invalid data: ${this.hexConvert(a)}`);
            const h = this.buffer;
            throw this.tracing && this.trace(`Remaining data in serial buffer: ${this.hexConvert(h)}`), this.detectPanicHandler(new Uint8Array([...a, ...h || []])), new Error(`Invalid SLIP escape (0xdb, 0x${l.toString(16)})`);
          }
        else if (l === this.SLIP_ESC)
          n = !0;
        else if (l === this.SLIP_END) {
          if (this.tracing && this.trace(`Received full packet: ${this.hexConvert(t)}`), r + 1 < a.length) {
            const h = a.slice(r + 1);
            this.buffer = this.appendArray(h, this.buffer);
          }
          return t;
        } else
          t = this.appendArray(t, new Uint8Array([l]));
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
    let n;
    try {
      if (!this.device.readable)
        return;
      for (n = this.device.readable.getReader(); !t(); ) {
        const { value: a, done: s } = await n.read();
        if (s || !a)
          break;
        this.tracing && this.trace(`Read ${a.length} bytes: ${this.hexConvert(a)}`), i(a);
      }
    } catch (a) {
      this.trace(`Error reading from serial port: ${a}`), a instanceof Error && a.name === "NetworkError" && a.message.includes("device has been lost") && (this.trace("Device lost detected (NetworkError)"), this.onDeviceLostCallback && this.onDeviceLostCallback());
    } finally {
      n == null || n.releaseLock();
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
      await Lt(i);
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
class nr {
  constructor(i, t) {
    this.resetDelay = t, this.transport = i;
  }
  async reset() {
    await this.transport.setDTR(!1), await this.transport.setRTS(!0), await J(100), await this.transport.setDTR(!0), await this.transport.setRTS(!1), await J(this.resetDelay), await this.transport.setDTR(!1);
  }
}
class ar {
  constructor(i) {
    this.transport = i;
  }
  async reset() {
    await this.transport.setRTS(!1), await this.transport.setDTR(!1), await J(100), await this.transport.setDTR(!0), await this.transport.setRTS(!1), await J(100), await this.transport.setRTS(!0), await this.transport.setDTR(!1), await this.transport.setRTS(!0), await J(100), await this.transport.setRTS(!1), await this.transport.setDTR(!1);
  }
}
class sr {
  constructor(i, t = !1) {
    this.transport = i, this.usingUsbOtg = t, this.transport = i;
  }
  async reset() {
    this.usingUsbOtg ? (await J(200), await this.transport.setRTS(!1), await J(200)) : (await J(100), await this.transport.setRTS(!1));
  }
}
function rr(e) {
  const i = ["D", "R", "W"], t = e.split("|");
  for (const n of t) {
    const a = n[0], s = n.slice(1);
    if (!i.includes(a))
      return !1;
    if (a === "D" || a === "R") {
      if (s !== "0" && s !== "1")
        return !1;
    } else if (a === "W") {
      const r = parseInt(s);
      if (isNaN(r) || r <= 0)
        return !1;
    }
  }
  return !0;
}
class or {
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
      if (!rr(this.sequenceString))
        return;
      const n = this.sequenceString.split("|");
      for (const a of n) {
        const s = a[0], r = a.slice(1);
        s === "W" ? await i.W(Number(r)) : (s === "D" || s === "R") && await i[s](r === "1");
      }
    } catch {
      throw new Error("Invalid custom reset sequence");
    }
  }
}
function lr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Re, Oi;
function hr() {
  return Oi || (Oi = 1, Re = function(i) {
    return atob(i);
  }), Re;
}
var cr = hr();
const fr = /* @__PURE__ */ lr(cr);
async function Fi(e, i) {
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
      decodedData: Ui(t.data),
      decodedText: Ui(t.text)
    };
}
function Ui(e) {
  const t = fr(e).split("").map(function(n) {
    return n.charCodeAt(0);
  });
  return new Uint8Array(t);
}
class dr {
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
class yt extends dr {
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
    const n = this.EFUSE_RD_REG_BASE + 4 * t;
    return i.debug("Read efuse " + n), await i.readReg(n);
  }
  async getChipDescription(i) {
    const t = await this.readEfuse(i, 2);
    return (await this.readEfuse(i, 0) & 16 | t & 65536) != 0 ? "ESP8285" : "ESP8266EX";
  }
  async getCrystalFreq(i) {
    const t = await i.readReg(this.UART_CLKDIV_REG) & this.UART_CLKDIV_MASK, n = i.transport.baudrate * t / 1e6 / this.XTAL_CLK_DIVIDER;
    let a;
    return n > 33 ? a = 40 : a = 26, Math.abs(a - n) > 1 && i.info("WARNING: Detected crystal freq " + n + "MHz is quite different to normalized freq " + a + "MHz. Unsupported crystal in use?"), a;
  }
  _d2h(i) {
    const t = (+i).toString(16);
    return t.length === 1 ? "0" + t : t;
  }
  async readMac(i) {
    let t = await this.readEfuse(i, 0);
    t = t >>> 0;
    let n = await this.readEfuse(i, 1);
    n = n >>> 0;
    let a = await this.readEfuse(i, 3);
    a = a >>> 0;
    const s = new Uint8Array(6);
    return a != 0 ? (s[0] = a >> 16 & 255, s[1] = a >> 8 & 255, s[2] = a & 255) : n >> 16 & 255 ? (n >> 16 & 255) == 1 ? (s[0] = 172, s[1] = 208, s[2] = 116) : i.error("Unknown OUI") : (s[0] = 24, s[1] = 254, s[2] = 52), s[3] = n >> 8 & 255, s[4] = n & 255, s[5] = t >> 24 & 255, this._d2h(s[0]) + ":" + this._d2h(s[1]) + ":" + this._d2h(s[2]) + ":" + this._d2h(s[3]) + ":" + this._d2h(s[4]) + ":" + this._d2h(s[5]);
  }
  getEraseSize(i, t) {
    return t;
  }
}
yt.IROM_MAP_START = 1075838976;
yt.IROM_MAP_END = 1076887552;
const _r = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ESP8266ROM: yt
}, Symbol.toStringTag, { value: "Module" })), Zt = 233;
function Pt(e, i) {
  const t = i - 1 - e % i;
  return e + t;
}
function ve(e, i) {
  return e[i] | e[i + 1] << 8 | e[i + 2] << 16 | e[i + 3] << 24;
}
class nt {
  constructor(i, t, n = null, a = 0) {
    this.addr = i, this.data = t, this.fileOffs = n, this.flags = a, this.includeInChecksum = !0, this.addr !== 0 && this.padToAlignment(4);
  }
  copyWithNewAddr(i) {
    return new nt(i, this.data, 0);
  }
  splitImage(i) {
    const t = new nt(this.addr, this.data.slice(0, i), 0);
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
    this.data = Fe(this.data, i, 0);
  }
}
class Ni extends nt {
  constructor(i, t, n, a) {
    super(t, n, null, a), this.name = i;
  }
  toString() {
    return `${this.name} ${super.toString()}`;
  }
}
class Ze {
  constructor(i) {
    this.SEG_HEADER_LEN = 8, this.SHA256_DIGEST_LEN = 32, this.ELF_FLAG_WRITE = 1, this.ELF_FLAG_READ = 2, this.ELF_FLAG_EXEC = 4, this.segments = [], this.entrypoint = 0, this.elfSha256 = null, this.elfSha256Offset = 0, this.padToSize = 0, this.flashMode = 0, this.flashSizeFreq = 0, this.checksum = 0, this.datalength = 0, this.IROM_ALIGN = 0, this.MMU_PAGE_SIZE_CONF = [], this.ROM_LOADER = i;
  }
  loadCommonHeader(i, t, n) {
    const a = i[t], s = i[t + 1];
    if (this.flashMode = i[t + 2], this.flashSizeFreq = i[t + 3], this.entrypoint = ve(i, t + 4), a !== n)
      throw new k(`Invalid firmware image magic=0x${a.toString(16)}`);
    return s;
  }
  verify() {
    if (this.segments.length > 16)
      throw new k(`Invalid segment count ${this.segments.length} (max 16). Usually this indicates a linker script problem.`);
  }
  loadSegment(i, t, n = !1) {
    const a = t, s = ve(i, t), r = ve(i, t + 4);
    this.warnIfUnusualSegment(s, r, n);
    const l = i.slice(t + 8, t + 8 + r);
    if (l.length < r)
      throw new k(`End of file reading segment 0x${s.toString(16)}, length ${r} (actual length ${l.length})`);
    const h = new nt(s, l, a);
    return this.segments.push(h), h;
  }
  warnIfUnusualSegment(i, t, n) {
    n || (i > 1075838976 || i < 1073610752 || t > 65536) && console.warn(`WARNING: Suspicious segment 0x${i.toString(16)}, length ${t}`);
  }
  maybePatchSegmentData(i, t) {
    const n = i.length;
    if (this.elfSha256Offset >= t && this.elfSha256Offset < t + n) {
      const a = this.elfSha256Offset - t;
      if (a < this.SEG_HEADER_LEN || a + this.SHA256_DIGEST_LEN > n)
        throw new k(`Cannot place SHA256 digest on segment boundary(elf_sha256_offset=${this.elfSha256Offset}, file_pos=${t}, segment_size=${n})`);
      const s = a - this.SEG_HEADER_LEN;
      if (!i.slice(s, s + this.SHA256_DIGEST_LEN).every((d) => d === 0))
        throw new k(`Contents of segment at SHA256 digest offset 0x${this.elfSha256Offset.toString(16)} are not all zero. Refusing to overwrite.`);
      if (!this.elfSha256 || this.elfSha256.length !== this.SHA256_DIGEST_LEN)
        throw new k("ELF SHA256 digest is not properly initialized");
      const h = i.slice(0, s), o = i.slice(s + this.SHA256_DIGEST_LEN), c = h.length + this.elfSha256.length + o.length, u = new Uint8Array(c);
      return u.set(h, 0), u.set(this.elfSha256, h.length), u.set(o, h.length + this.elfSha256.length), u;
    }
    return i;
  }
  saveSegment(i, t, n, a = null) {
    const s = this.maybePatchSegmentData(n.data, t), r = new DataView(i.buffer, t);
    return r.setUint32(0, n.addr, !0), r.setUint32(4, s.length, !0), i.set(s, t + 8), a !== null ? Pi(s, a) : 0;
  }
  saveFlashSegment(i, t, n, a = null) {
    if (this.ROM_LOADER.CHIP_NAME === "ESP32") {
      const r = (t + n.data.length + this.SEG_HEADER_LEN) % this.IROM_ALIGN;
      if (r < 36) {
        const l = new Uint8Array(n.data.length + (36 - r));
        l.set(n.data), l.fill(0, n.data.length), n.data = l;
      }
    }
    return this.saveSegment(i, t, n, a);
  }
  /**
   * Return ESPLoader checksum from end of just-read image
   * @param {Uint8Array} data image to read checksum from
   * @param {number} offset Current offset in image
   * @returns {number} checksum value
   */
  readChecksum(i, t) {
    const n = Pt(t, 16);
    return i[n];
  }
  /**
   * Calculate checksum of loaded image, based on segments in segment array.
   * @returns {number} checksum value
   */
  calculateChecksum() {
    let i = Ge;
    for (const t of this.segments)
      t.includeInChecksum && (i = Pi(t.data, i));
    return i;
  }
  appendChecksum(i, t, n) {
    const a = Pt(t, 16);
    i[a] = n;
  }
  writeCommonHeader(i, t, n) {
    i[t] = Zt, i[t + 1] = n, i[t + 2] = this.flashMode, i[t + 3] = this.flashSizeFreq, new DataView(i.buffer, t + 4).setUint32(0, this.entrypoint, !0);
  }
  isIromAddr(i) {
    return yt.IROM_MAP_START <= i && i < yt.IROM_MAP_END;
  }
  getIromSegment() {
    const i = this.segments.filter((t) => this.isIromAddr(t.addr));
    if (i.length > 0) {
      if (i.length !== 1)
        throw new k(`Found ${i.length} segments that could be irom0. Bad ELF file?`);
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
      const n = this.segments[t - 1], a = this.segments[t];
      if (n.getMemoryType(this).join(",") === a.getMemoryType(this).join(",") && n.includeInChecksum === a.includeInChecksum && a.addr === n.addr + n.data.length && (a.flags & this.ELF_FLAG_EXEC) === (n.flags & this.ELF_FLAG_EXEC)) {
        const s = new Uint8Array(n.data.length + a.data.length);
        s.set(n.data), s.set(a.data, n.data.length), n.data = s;
      } else
        i.unshift(a);
    }
    i.unshift(this.segments[0]), this.segments = i;
  }
  setMmuPageSize(i) {
    if (!this.MMU_PAGE_SIZE_CONF && i !== this.IROM_ALIGN)
      console.warn(`WARNING: Changing MMU page size is not supported on ${this.ROM_LOADER.CHIP_NAME}! ` + (this.IROM_ALIGN !== 0 ? `Defaulting to ${this.IROM_ALIGN / 1024}KB.` : ""));
    else if (this.MMU_PAGE_SIZE_CONF && !this.MMU_PAGE_SIZE_CONF.includes(i)) {
      const t = this.MMU_PAGE_SIZE_CONF.map((n) => `${n / 1024}KB`).join(", ");
      throw new k(`${i} bytes is not a valid ${this.ROM_LOADER.CHIP_NAME} page size, select from ${t}.`);
    } else
      this.IROM_ALIGN = i;
  }
}
class at extends Ze {
  constructor(i, t = null, n = !0, a = !1) {
    super(i), this.securePad = null, this.flashMode = 0, this.flashSizeFreq = 0, this.version = 1, this.WP_PIN_DISABLED = 238, this.wpPin = this.WP_PIN_DISABLED, this.clkDrv = 0, this.qDrv = 0, this.dDrv = 0, this.csDrv = 0, this.hdDrv = 0, this.wpDrv = 0, this.chipId = 0, this.minRev = 0, this.minRevFull = 0, this.maxRevFull = 0, this.storedDigest = null, this.calcDigest = null, this.dataLength = 0, this.IROM_ALIGN = 65536, this.ROM_LOADER = i, this.appendDigest = n, this.ramOnlyHeader = a, t !== null && this.loadFromFile(t);
  }
  async loadFromFile(i) {
    const n = i instanceof Uint8Array ? i : le(i);
    let a = 0;
    const s = this.loadCommonHeader(n, a, Zt);
    a += 8, this.loadExtendedHeader(n, a), a += 16;
    for (let r = 0; r < s; r++) {
      const l = this.loadSegment(n, a);
      a += 8 + l.data.length;
    }
    if (this.checksum = this.readChecksum(n, a), a = Pt(a, 16), this.appendDigest) {
      const r = a;
      this.storedDigest = n.slice(a, a + this.SHA256_DIGEST_LEN);
      const l = await crypto.subtle.digest("SHA-256", n.slice(0, r));
      this.calcDigest = new Uint8Array(l), this.dataLength = r - 0;
    }
    this.verify();
  }
  isFlashAddr(i) {
    return this.ROM_LOADER.IROM_MAP_START <= i && i < this.ROM_LOADER.IROM_MAP_END || this.ROM_LOADER.DROM_MAP_START <= i && i < this.ROM_LOADER.DROM_MAP_END;
  }
  async save() {
    let i = 0;
    const t = new Uint8Array(1024 * 1024);
    let n = 0;
    this.writeCommonHeader(t, n, this.segments.length), n += 8, this.saveExtendedHeader(t, n), n += 16;
    let a = Ge;
    const s = this.segments.filter((h) => this.isFlashAddr(h.addr)).sort((h, o) => h.addr - o.addr), r = this.segments.filter((h) => !this.isFlashAddr(h.addr)).sort((h, o) => h.addr - o.addr);
    for (let h = 0; h < s.length; h++) {
      const o = s[h];
      if (o instanceof Ni && o.name === ".flash.appdesc") {
        s.splice(h, 1), s.unshift(o);
        break;
      }
    }
    for (let h = 0; h < r.length; h++) {
      const o = r[h];
      if (o instanceof Ni && o.name === ".dram0.bootdesc") {
        r.splice(h, 1), r.unshift(o);
        break;
      }
    }
    if (s.length > 0) {
      let h = s[0].addr;
      for (const o of s.slice(1)) {
        if (Math.floor(o.addr / this.IROM_ALIGN) === Math.floor(h / this.IROM_ALIGN))
          throw new k(`Segment loaded at 0x${o.addr.toString(16)} lands in same 64KB flash mapping as segment loaded at 0x${h.toString(16)}. Can't generate binary. Suggest changing linker script or ELF to merge sections.`);
        h = o.addr;
      }
    }
    if (this.ramOnlyHeader) {
      for (const h of r)
        a = this.saveSegment(t, n, h, a), n += 8 + h.data.length, i++;
      this.appendChecksum(t, n, a), n = Pt(n, 16);
      for (const h of s.reverse()) {
        let o = this.getAlignmentDataNeeded(h, n);
        if (o > 0) {
          const c = this.ROM_LOADER.BOOTLOADER_FLASH_OFFSET - this.SEG_HEADER_LEN;
          o < c && (o += this.IROM_ALIGN), o -= this.ROM_LOADER.BOOTLOADER_FLASH_OFFSET;
          const u = new nt(0, new Uint8Array(o).fill(0), n);
          a = this.saveSegment(t, n, u, a), n += 8 + o, i++;
        }
        this.saveFlashSegment(t, n, h), n += 8 + h.data.length, i++;
      }
    } else {
      for (; s.length > 0; ) {
        const h = s[0], o = this.getAlignmentDataNeeded(h, n);
        if (o > 0) {
          if (r.length > 0 && o > this.SEG_HEADER_LEN) {
            const c = r[0].splitImage(o);
            r[0].data.length === 0 && r.shift(), a = this.saveSegment(t, n, c, a);
          } else {
            const c = new nt(0, new Uint8Array(o).fill(0), n);
            a = this.saveSegment(t, n, c, a);
          }
          n += 8 + o, i++;
        } else {
          if ((n + 8) % this.IROM_ALIGN !== h.addr % this.IROM_ALIGN)
            throw new Error("Flash segment alignment mismatch");
          a = this.saveFlashSegment(t, n, h, a), s.shift(), n += 8 + h.data.length, i++;
        }
      }
      for (const h of r)
        a = this.saveSegment(t, n, h, a), n += 8 + h.data.length, i++;
    }
    if (this.securePad) {
      if (!this.appendDigest)
        throw new Error("secure_pad only applies if a SHA-256 digest is also appended to the image");
      const h = (n + this.SEG_HEADER_LEN) % this.IROM_ALIGN, o = 16;
      let c = 0;
      this.securePad === "1" ? c = 112 : this.securePad === "2" && (c = 32);
      const u = (this.IROM_ALIGN - h - o - c) % this.IROM_ALIGN, d = new nt(0, new Uint8Array(u).fill(0), n);
      a = this.saveSegment(t, n, d, a), n += 8 + u, i++;
    }
    this.ramOnlyHeader || (this.appendChecksum(t, n, a), n = Pt(n, 16));
    const l = n;
    if (this.ramOnlyHeader ? t[1] = r.length : t[1] = i, this.appendDigest) {
      const h = await crypto.subtle.digest("SHA-256", t.slice(0, l)), o = new Uint8Array(h);
      t.set(o, l), n += 32;
    }
    if (this.padToSize && n % this.padToSize !== 0) {
      const h = this.padToSize - n % this.padToSize, o = new Uint8Array(h);
      o.fill(255), t.set(o, n), n += h;
    }
    return t;
  }
  loadExtendedHeader(i, t) {
    const n = new DataView(i.buffer, t);
    this.wpPin = n.getUint8(0);
    const a = n.getUint8(1);
    [this.clkDrv, this.qDrv] = this.splitByte(a);
    const s = n.getUint8(2);
    [this.dDrv, this.csDrv] = this.splitByte(s);
    const r = n.getUint8(3);
    [this.hdDrv, this.wpDrv] = this.splitByte(r), this.chipId = n.getUint8(4), this.chipId !== this.ROM_LOADER.IMAGE_CHIP_ID && console.warn(`Unexpected chip id in image. Expected ${this.ROM_LOADER.IMAGE_CHIP_ID} but value was ${this.chipId}. Is this image for a different chip model?`), this.minRev = n.getUint8(5), this.minRevFull = n.getUint16(6, !0), this.maxRevFull = n.getUint16(8, !0);
    const l = n.getUint8(15);
    if (l === 0 || l === 1)
      this.appendDigest = l === 1;
    else
      throw new Error(`Invalid value for append_digest field (0x${l.toString(16)}). Should be 0 or 1.`);
  }
  saveExtendedHeader(i, t) {
    const n = new ArrayBuffer(16), a = new DataView(n);
    a.setUint8(0, this.wpPin), a.setUint8(1, this.joinByte(this.clkDrv, this.qDrv)), a.setUint8(2, this.joinByte(this.dDrv, this.csDrv)), a.setUint8(3, this.joinByte(this.hdDrv, this.wpDrv)), a.setUint8(4, this.ROM_LOADER.IMAGE_CHIP_ID), a.setUint8(5, this.minRev), a.setUint16(6, this.minRevFull, !0), a.setUint16(8, this.maxRevFull, !0);
    for (let s = 9; s < 15; s++)
      a.setUint8(s, 0);
    a.setUint8(15, this.appendDigest ? 1 : 0), i.set(new Uint8Array(n), t);
  }
  splitByte(i) {
    return [i & 15, i >> 4 & 15];
  }
  joinByte(i, t) {
    return i & 15 | (t & 15) << 4;
  }
  getAlignmentDataNeeded(i, t) {
    const n = i.addr % this.IROM_ALIGN - this.SEG_HEADER_LEN;
    let a = this.IROM_ALIGN - t % this.IROM_ALIGN + n;
    return a === 0 || a === this.IROM_ALIGN ? 0 : (a -= this.SEG_HEADER_LEN, a < 0 && (a += this.IROM_ALIGN), a);
  }
}
class ur extends Ze {
  constructor(i, t = null) {
    super(i), this.version = 1, this.ROM_LOADER = i, this.flashMode = 0, this.flashSizeFreq = 0, t !== null && this.loadFromFile(t);
  }
  loadFromFile(i) {
    const t = i instanceof Uint8Array ? i : le(i);
    let n = 0;
    const a = this.loadCommonHeader(t, n, Zt);
    n += 8;
    for (let s = 0; s < a; s++) {
      const r = this.loadSegment(t, n);
      n += 8 + r.data.length;
    }
    this.checksum = this.readChecksum(t, n), this.verify();
  }
  defaultOutputName(i) {
    return i + "-";
  }
}
class ft extends Ze {
  constructor(i, t = null) {
    super(i), this.version = 2, this.ROM_LOADER = i, this.flashMode = 0, this.flashSizeFreq = 0, t !== null && this.loadFromFile(t);
  }
  async loadFromFile(i) {
    const t = i instanceof Uint8Array ? i : le(i);
    let n = 0;
    const a = this.loadCommonHeader(t, n, ft.IMAGE_V2_MAGIC);
    n += 8, a !== ft.IMAGE_V2_SEGMENT && console.warn(`Warning: V2 header has unexpected "segment" count ${a} (usually 4)`);
    const s = this.flashMode, r = this.flashSizeFreq, l = this.entrypoint, h = this.loadSegment(t, n, !0);
    h.addr = 0, h.includeInChecksum = !1, n += 8 + h.data.length;
    const o = this.loadCommonHeader(t, n, Zt);
    n += 8, s !== this.flashMode && console.warn(`WARNING: Flash mode value in first header (0x${s.toString(16)}) disagrees with second (0x${this.flashMode.toString(16)}). Using second value.`), r !== this.flashSizeFreq && console.warn(`WARNING: Flash size/freq value in first header (0x${r.toString(16)}) disagrees with second (0x${this.flashSizeFreq.toString(16)}). Using second value.`), l !== this.entrypoint && console.warn(`WARNING: Entrypoint address in first header (0x${l.toString(16)}) disagrees with second header (0x${this.entrypoint.toString(16)}). Using second value.`);
    for (let c = 0; c < o; c++) {
      const u = this.loadSegment(t, n);
      n += 8 + u.data.length;
    }
    this.checksum = this.readChecksum(t, n), this.verify();
  }
  defaultOutputName(i) {
    const t = this.getIromSegment();
    let n = 0;
    t !== null && (n = t.addr - yt.IROM_MAP_START);
    const a = i.replace(/\.[^/.]+$/, ""), s = n & -4096;
    return `${a}-0x${s.toString(16).padStart(5, "0")}.bin`;
  }
}
ft.IMAGE_V2_MAGIC = 234;
ft.IMAGE_V2_SEGMENT = 4;
class gr extends at {
  constructor(i, t = null, n = !0, a = !1) {
    super(i, t, n, a), this.ROM_LOADER = i;
  }
}
class pr extends at {
  constructor(i, t = null, n = !0, a = !1) {
    super(i, t, n, a), this.ROM_LOADER = i;
  }
}
class wr extends at {
  constructor(i, t = null, n = !0, a = !1) {
    super(i, t, n, a), this.ROM_LOADER = i;
  }
}
class Er extends at {
  constructor(i, t = null, n = !0, a = !1) {
    super(i, t, n, a), this.MMU_PAGE_SIZE_CONF = [16384, 32768, 65536], this.ROM_LOADER = i;
  }
}
class We extends at {
  constructor(i, t = null, n = !0, a = !1) {
    super(i, t, n, a), this.MMU_PAGE_SIZE_CONF = [8192, 16384, 32768, 65536], this.ROM_LOADER = i;
  }
}
class Sr extends We {
  constructor(i, t = null, n = !0, a = !1) {
    super(i, t, n, a), this.ROM_LOADER = i;
  }
}
class mr extends at {
  constructor(i, t = null, n = !0, a = !1) {
    super(i, t, n, a), this.ROM_LOADER = i;
  }
}
class br extends at {
  constructor(i, t = null, n = !0, a = !1) {
    super(i, t, n, a), this.ROM_LOADER = i;
  }
}
class yr extends We {
  constructor(i, t = null, n = !0, a = !1) {
    super(i, t, n, a), this.ROM_LOADER = i;
  }
}
async function Bi(e, i) {
  const t = i instanceof Uint8Array ? i : le(i), n = e.CHIP_NAME.toLowerCase().replace(/[-()]/g, "");
  let a;
  if (n !== "esp8266")
    switch (n) {
      case "esp32":
        a = at;
        break;
      case "esp32s2":
        a = gr;
        break;
      case "esp32s3":
        a = pr;
        break;
      case "esp32c3":
        a = wr;
        break;
      case "esp32c2":
        a = Er;
        break;
      case "esp32c6":
        a = We;
        break;
      case "esp32c61":
        a = Sr;
        break;
      case "esp32c5":
        a = mr;
        break;
      case "esp32h2":
        a = yr;
        break;
      case "esp32p4":
        a = br;
        break;
      default:
        throw new k(`Unsupported chip name: ${n}`);
    }
  else {
    const l = t[0];
    if (l === Zt)
      a = ur;
    else if (l === ft.IMAGE_V2_MAGIC)
      a = ft;
    else
      throw new k(`Invalid image magic number: ${l}`);
  }
  const s = new a(e), r = s;
  if (typeof r.loadFromFile == "function") {
    const l = r.loadFromFile(t);
    l instanceof Promise && await l;
  }
  return s;
}
async function xr(e) {
  switch (e) {
    case 15736195: {
      const { ESP32ROM: i } = await import("./esp32-D_Iy8qXT.mjs");
      return new i();
    }
    case 203546735:
    case 1867591791:
    case 2084675695: {
      const { ESP32C2ROM: i } = await import("./esp32c2-CXkcp8EO.mjs");
      return new i();
    }
    case 1763790959:
    case 456216687:
    case 1216438383:
    case 1130455151: {
      const { ESP32C3ROM: i } = await import("./esp32c3-CQYyY32c.mjs");
      return new i();
    }
    case 752910447: {
      const { ESP32C6ROM: i } = await import("./esp32c6-C6snyMX6.mjs");
      return new i();
    }
    case 606167151:
    case 871374959:
    case 1333878895: {
      const { ESP32C61ROM: i } = await import("./esp32c61-BSOYk6F3.mjs");
      return new i();
    }
    case 285294703:
    case 1675706479:
    case 1607549039: {
      const { ESP32C5ROM: i } = await import("./esp32c5-DEJykOsR.mjs");
      return new i();
    }
    case 3619110528:
    case 2548236392: {
      const { ESP32H2ROM: i } = await import("./esp32h2-BvJSTt5D.mjs");
      return new i();
    }
    case 9: {
      const { ESP32S3ROM: i } = await import("./esp32s3-BWYq7mX9.mjs");
      return new i();
    }
    case 1990: {
      const { ESP32S2ROM: i } = await import("./esp32s2-DEERqwjU.mjs");
      return new i();
    }
    case 4293968129: {
      const { ESP8266ROM: i } = await Promise.resolve().then(() => _r);
      return new i();
    }
    case 0:
    case 182303440:
    case 117676761: {
      const { ESP32P4ROM: i } = await import("./esp32p4-z60zYEu-.mjs");
      return new i();
    }
    default:
      return null;
  }
}
class Ar {
  /**
   * Create a new ESPLoader to perform serial communication
   * such as read/write flash memory and registers using a LoaderOptions object.
   * @param {LoaderOptions} options - LoaderOptions object argument for ESPLoader.
   * ```
   * const myLoader = new ESPLoader({ transport: Transport, baudrate: number, terminal?: IEspLoaderTerminal });
   * ```
   */
  constructor(i) {
    var t, n, a, s, r, l, h, o;
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
      classicReset: (c, u) => new nr(c, u),
      customReset: (c, u) => new or(c, u),
      hardReset: (c, u) => new sr(c, u),
      usbJTAGSerialReset: (c) => new ar(c)
    }, i.serialOptions && (this.serialOptions = i.serialOptions), i.terminal && (this.terminal = i.terminal, this.terminal.clean()), typeof i.debugLogging < "u" && (this.debugLogging = i.debugLogging), i.port && (this.transport = new vn(i.port)), typeof i.enableTracing < "u" && (this.transport.tracing = i.enableTracing), !((t = i.resetConstructors) === null || t === void 0) && t.classicReset && (this.resetConstructors.classicReset = (n = i.resetConstructors) === null || n === void 0 ? void 0 : n.classicReset), !((a = i.resetConstructors) === null || a === void 0) && a.customReset && (this.resetConstructors.customReset = (s = i.resetConstructors) === null || s === void 0 ? void 0 : s.customReset), !((r = i.resetConstructors) === null || r === void 0) && r.hardReset && (this.resetConstructors.hardReset = (l = i.resetConstructors) === null || l === void 0 ? void 0 : l.hardReset), !((h = i.resetConstructors) === null || h === void 0) && h.usbJTAGSerialReset && (this.resetConstructors.usbJTAGSerialReset = (o = i.resetConstructors) === null || o === void 0 ? void 0 : o.usbJTAGSerialReset), this.info("esptool.js"), this.info("Serial port " + this.transport.getInfo());
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
  _byteArrayToInt(i, t, n, a) {
    return i | t << 8 | n << 16 | a << 24;
  }
  /**
   * Append a buffer array after another buffer array
   * @param {ArrayBuffer} buffer1 - First array buffer.
   * @param {ArrayBuffer} buffer2 - magic hex number to select ROM.
   * @returns {ArrayBufferLike} Return an array buffer.
   */
  _appendBuffer(i, t) {
    const n = new Uint8Array(i.byteLength + t.byteLength);
    return n.set(new Uint8Array(i), 0), n.set(new Uint8Array(t), i.byteLength), n.buffer;
  }
  /**
   * Append a buffer array after another buffer array
   * @param {Uint8Array} arr1 - First array buffer.
   * @param {Uint8Array} arr2 - magic hex number to select ROM.
   * @returns {Uint8Array} Return a 8 bit unsigned array.
   */
  _appendArray(i, t) {
    const n = new Uint8Array(i.length + t.length);
    return n.set(i, 0), n.set(t, i.length), n;
  }
  /**
   * Convert a unsigned 8 bit integer array to byte string.
   * @param {Uint8Array} u8Array - magic hex number to select ROM.
   * @returns {string} Return the equivalent string.
   */
  ui8ToBstr(i) {
    let t = "";
    for (let n = 0; n < i.length; n++)
      t += String.fromCharCode(i[n]);
    return t;
  }
  /**
   * Convert a byte string to unsigned 8 bit integer array.
   * @param {string} bStr - binary string input
   * @returns {Uint8Array} Return a 8 bit unsigned integer array.
   */
  bstrToUi8(i) {
    const t = new Uint8Array(i.length);
    for (let n = 0; n < i.length; n++)
      t[n] = i.charCodeAt(n);
    return t;
  }
  /**
   * Use the device serial port read function with given timeout to create a valid packet.
   * @param {number} op Operation number
   * @param {number} timeout timeout number in milliseconds
   * @returns {[number, Uint8Array]} valid response packet.
   */
  async readPacket(i = null, t = this.DEFAULT_TIMEOUT) {
    for (let n = 0; n < 100; n++) {
      const a = await this.transport.read(t);
      if (!a || a.length < 8)
        continue;
      const s = a[0];
      if (s !== 1)
        continue;
      const r = a[1], l = this._byteArrayToInt(a[4], a[5], a[6], a[7]), h = a.slice(8);
      if (s == 1) {
        if (i == null || r == i)
          return [l, h];
        if (h[0] != 0 && h[1] == this.ROM_INVALID_RECV_MSG)
          throw this.transport.flushInput(), new k("unsupported command error");
      }
    }
    throw new k("invalid response");
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
  async command(i = null, t = new Uint8Array(0), n = 0, a = !0, s = this.DEFAULT_TIMEOUT) {
    if (i != null) {
      this.transport.tracing && this.transport.trace(`command op:0x${i.toString(16).padStart(2, "0")} data len=${t.length} wait_response=${a ? 1 : 0} timeout=${(s / 1e3).toFixed(3)} data=${this.transport.hexConvert(t)}`);
      const r = new Uint8Array(8 + t.length);
      r[0] = 0, r[1] = i, r[2] = this._shortToBytearray(t.length)[0], r[3] = this._shortToBytearray(t.length)[1], r[4] = this._intToByteArray(n)[0], r[5] = this._intToByteArray(n)[1], r[6] = this._intToByteArray(n)[2], r[7] = this._intToByteArray(n)[3];
      let l;
      for (l = 0; l < t.length; l++)
        r[8 + l] = t[l];
      await this.transport.write(r);
    }
    return a ? this.readPacket(i, s) : [0, new Uint8Array(0)];
  }
  /**
   * Read a register from chip.
   * @param {number} addr - Register address number
   * @param {number} timeout - Timeout in milliseconds (Default: 3000ms)
   * @returns {number} - Command number value
   */
  async readReg(i, t = this.DEFAULT_TIMEOUT) {
    this.debug(`Read Register:${this.toHex(i)}`);
    const n = this._intToByteArray(i), a = await this.command(this.ESP_READ_REG, n, void 0, void 0, t);
    return this.debug(`Read Register Value:${a[0]}`), a[0];
  }
  /**
   * Write a number value to register address in chip.
   * @param {number} addr - Register address number
   * @param {number} value - Number value to write in register
   * @param {number} mask - Hex number for mask
   * @param {number} delayUs Delay number
   * @param {number} delayAfterUs Delay after previous delay
   */
  async writeReg(i, t, n = 4294967295, a = 0, s = 0) {
    let r = this._appendArray(this._intToByteArray(i), this._intToByteArray(t));
    r = this._appendArray(r, this._intToByteArray(n)), r = this._appendArray(r, this._intToByteArray(a)), s > 0 && (r = this._appendArray(r, this._intToByteArray(this.chip.UART_DATE_REG_ADDR)), r = this._appendArray(r, this._intToByteArray(0)), r = this._appendArray(r, this._intToByteArray(0)), r = this._appendArray(r, this._intToByteArray(s))), await this.checkCommand("write target memory", this.ESP_WRITE_REG, r);
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
      let n = await this.command(8, i, void 0, void 0, 100);
      this.syncStubDetected = n[0] === 0;
      for (let a = 0; a < 7; a++)
        n = await this.readPacket(8, 100), this.syncStubDetected = this.syncStubDetected && n[0] === 0;
      return n;
    } catch (n) {
      throw this.debug("Sync err " + n), n;
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
    const n = this.transport.peek(), a = Array.from(n, (u) => String.fromCharCode(u)).join(""), s = /boot:(0x[0-9a-fA-F]+)([\s\S]*?waiting for download)?/, r = a.match(s);
    let l = !1, h = "", o = !1;
    r && (l = !0, h = r[1], o = !!r[2]), this.debug(`bootMode:${h} downloadMode:${o}`);
    let c = "";
    for (let u = 0; u < 5; u++)
      try {
        this.debug(`Sync connect attempt ${u}`), this.transport.flushInput();
        const d = await this.sync();
        return this.debug(d[0].toString()), "success";
      } catch (d) {
        this.debug(`Error at sync ${d}`), d instanceof Error ? c = d.message : typeof d == "string" ? c = d : c = JSON.stringify(d);
      }
    return l && (c = `Wrong boot mode detected (${h}).
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
  async connect(i = "default_reset", t = 7, n = !0) {
    let a;
    this.info("Connecting...", !1), await this.transport.connect(this.romBaudrate, this.serialOptions), this.transport.readLoop();
    const s = this.constructResetSequence(i);
    for (let r = 0; r < t; r++) {
      const l = s.length > 0 ? s[r % s.length] : null;
      if (a = await this._connectAttempt(i, l), a === "success")
        break;
    }
    if (a !== "success")
      throw new k("Failed to connect with the device");
    if (this.debug("Connect attempt successful."), this.info(`
\r`, !1), n) {
      const r = await this.readReg(this.CHIP_DETECT_MAGIC_REG_ADDR) >>> 0;
      this.debug("Chip Magic " + r.toString(16));
      const l = await xr(r);
      if (typeof this.chip === null)
        throw new k(`Unexpected CHIP magic value ${r}. Failed to autodetect chip type.`);
      this.chip = l;
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
  async checkCommand(i = "", t = null, n = new Uint8Array(0), a = 0, s = 0, r = this.DEFAULT_TIMEOUT) {
    this.debug("check_command " + i);
    const l = 2, h = await this.command(t, n, a, void 0, r);
    if (h && h[1] && h[1].length < s + l) {
      const c = h[1].slice(0, 2);
      throw c[0] !== 0 ? new k(`Failed to ${i} failed with status ${c}`) : new k(`Failed to ${i}.
 Only got ${h[1].length} bytes of data.`);
    }
    const o = h[1].slice(s, s + l);
    if (o[0] !== 0)
      throw new k(`Failed to ${i} failed with status ${o}`);
    return s > 0 ? h[1].slice(0, s) : h[0];
  }
  /**
   * Start downloading an application image to RAM
   * @param {number} size Image size number
   * @param {number} blocks Number of data blocks
   * @param {number} blocksize Size of each data block
   * @param {number} offset Image offset number
   */
  async memBegin(i, t, n, a) {
    if (this.IS_STUB) {
      const r = a, l = a + i, h = this.chip.getChipRevision ? await this.chip.getChipRevision(this) : void 0, o = await Fi(this.chip.CHIP_NAME, h);
      if (o) {
        const c = [
          [o.bss_start || o.data_start, o.data_start + o.decodedData.length],
          [o.text_start, o.text_start + o.decodedText.length]
        ];
        for (const [u, d] of c)
          if (r < d && l > u)
            throw new k(`Software loader is resident at 0x${u.toString(16).padStart(8, "0")}-0x${d.toString(16).padStart(8, "0")}.
            Can't load binary at overlapping address range 0x${r.toString(16).padStart(8, "0")}-0x${l.toString(16).padStart(8, "0")}.
            Either change binary loading address, or use the no-stub option to disable the software loader.`);
      }
    }
    this.debug("mem_begin " + i + " " + t + " " + n + " " + a.toString(16));
    let s = this._appendArray(this._intToByteArray(i), this._intToByteArray(t));
    s = this._appendArray(s, this._intToByteArray(n)), s = this._appendArray(s, this._intToByteArray(a)), await this.checkCommand("enter RAM download mode", this.ESP_MEM_BEGIN, s);
  }
  /**
   * Get the checksum for given unsigned 8-bit array
   * @param {Uint8Array} data Unsigned 8-bit integer array
   * @param {number} state Initial checksum
   * @returns {number} - Array checksum
   */
  checksum(i, t = this.ESP_CHECKSUM_MAGIC) {
    for (let n = 0; n < i.length; n++)
      t ^= i[n];
    return t;
  }
  /**
   * Send a block of image to RAM
   * @param {Uint8Array} buffer Unsigned 8-bit array
   * @param {number} seq Sequence number
   */
  async memBlock(i, t) {
    let n = this._appendArray(this._intToByteArray(i.length), this._intToByteArray(t));
    n = this._appendArray(n, this._intToByteArray(0)), n = this._appendArray(n, this._intToByteArray(0)), n = this._appendArray(n, i);
    const a = this.checksum(i);
    await this.checkCommand("write to target RAM", this.ESP_MEM_DATA, n, a);
  }
  /**
   * Leave RAM download mode and run application
   * @param {number} entrypoint - Entrypoint number
   */
  async memFinish(i) {
    const t = i === 0 ? 1 : 0, n = this._appendArray(this._intToByteArray(t), this._intToByteArray(i));
    await this.checkCommand("leave RAM download mode", this.ESP_MEM_END, n, void 0, void 0, 200);
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
    const n = i * (t / 1e6);
    return n < 3e3 ? 3e3 : n;
  }
  /**
   * Start downloading to Flash (performs an erase)
   * @param {number} size Size to erase
   * @param {number} offset Offset to erase
   * @returns {number} Number of blocks (of size self.FLASH_WRITE_SIZE) to write.
   */
  async flashBegin(i, t) {
    const n = Math.floor((i + this.FLASH_WRITE_SIZE - 1) / this.FLASH_WRITE_SIZE), a = this.chip.getEraseSize(t, i), s = /* @__PURE__ */ new Date(), r = s.getTime();
    let l = 3e3;
    this.IS_STUB == !1 && (l = this.timeoutPerMb(this.ERASE_REGION_TIMEOUT_PER_MB, i)), this.debug("flash begin " + a + " " + n + " " + this.FLASH_WRITE_SIZE + " " + t + " " + i);
    let h = this._appendArray(this._intToByteArray(a), this._intToByteArray(n));
    h = this._appendArray(h, this._intToByteArray(this.FLASH_WRITE_SIZE)), h = this._appendArray(h, this._intToByteArray(t)), this.IS_STUB == !1 && (h = this._appendArray(h, this._intToByteArray(0))), await this.checkCommand("enter Flash download mode", this.ESP_FLASH_BEGIN, h, void 0, void 0, l);
    const o = s.getTime();
    return i != 0 && this.IS_STUB == !1 && this.info("Took " + (o - r) / 1e3 + "." + (o - r) % 1e3 + "s to erase flash block"), n;
  }
  /**
   * Start downloading compressed data to Flash (performs an erase)
   * @param {number} size Write size
   * @param {number} compsize Compressed size
   * @param {number} offset Offset for write
   * @returns {number} Returns number of blocks (size self.FLASH_WRITE_SIZE) to write.
   */
  async flashDeflBegin(i, t, n) {
    const a = Math.floor((t + this.FLASH_WRITE_SIZE - 1) / this.FLASH_WRITE_SIZE), s = Math.floor((i + this.FLASH_WRITE_SIZE - 1) / this.FLASH_WRITE_SIZE), r = /* @__PURE__ */ new Date(), l = r.getTime();
    let h, o;
    this.IS_STUB ? (h = i, o = this.DEFAULT_TIMEOUT) : (h = s * this.FLASH_WRITE_SIZE, o = this.timeoutPerMb(this.ERASE_REGION_TIMEOUT_PER_MB, h)), this.info("Compressed " + i + " bytes to " + t + "...");
    let c = this._appendArray(this._intToByteArray(h), this._intToByteArray(a));
    c = this._appendArray(c, this._intToByteArray(this.FLASH_WRITE_SIZE)), c = this._appendArray(c, this._intToByteArray(n)), (this.chip.CHIP_NAME === "ESP32-S2" || this.chip.CHIP_NAME === "ESP32-S3" || this.chip.CHIP_NAME === "ESP32-C3" || this.chip.CHIP_NAME === "ESP32-C2") && this.IS_STUB === !1 && (c = this._appendArray(c, this._intToByteArray(0))), await this.checkCommand("enter compressed flash mode", this.ESP_FLASH_DEFL_BEGIN, c, void 0, void 0, o);
    const u = r.getTime();
    return i != 0 && this.IS_STUB === !1 && this.info("Took " + (u - l) / 1e3 + "." + (u - l) % 1e3 + "s to erase flash block"), a;
  }
  /**
   * Write block to flash, retry if fail
   * @param {Uint8Array} data Unsigned 8-bit array data.
   * @param {number} seq Sequence number
   * @param {number} timeout Timeout in milliseconds (ms)
   * @returns {Promise<void>} Promise that resolves when the block is written.
   */
  async flashBlock(i, t, n) {
    let a = this._appendArray(this._intToByteArray(i.length), this._intToByteArray(t));
    a = this._appendArray(a, this._intToByteArray(0)), a = this._appendArray(a, this._intToByteArray(0)), a = this._appendArray(a, i);
    const s = this.checksum(i);
    await this.checkCommand("write to target Flash after seq " + t, this.ESP_FLASH_DATA, a, s, void 0, n);
  }
  /**
   * Write block to flash, send compressed, retry if fail
   * @param {Uint8Array} data Unsigned int 8-bit array data to write
   * @param {number} seq Sequence number
   * @param {number} timeout Timeout in milliseconds (ms)
   */
  async flashDeflBlock(i, t, n) {
    let a = this._appendArray(this._intToByteArray(i.length), this._intToByteArray(t));
    a = this._appendArray(a, this._intToByteArray(0)), a = this._appendArray(a, this._intToByteArray(0)), a = this._appendArray(a, i);
    const s = this.checksum(i);
    this.debug("flash_defl_block " + i[0].toString(16) + " " + i[1].toString(16)), await this.checkCommand("write compressed data to flash after seq " + t, this.ESP_FLASH_DEFL_DATA, a, s, void 0, n);
  }
  /**
   * Leave flash mode and run/reboot
   * @param {boolean} reboot Reboot after leaving flash mode ?
   * @param {number} timeout Timeout in milliseconds (ms)
   * @returns {Promise<void>} Promise that resolves when the flash mode is left.
   */
  async flashFinish(i = !1, t = this.DEFAULT_TIMEOUT) {
    const n = i ? 0 : 1, a = this._intToByteArray(n);
    await this.checkCommand("leave Flash mode", this.ESP_FLASH_END, a, void 0, void 0, t);
  }
  /**
   * Leave compressed flash mode and run/reboot
   * @param {boolean} reboot Reboot after leaving flash mode ?
   * @param {number} timeout Timeout in milliseconds (ms)
   * @returns {Promise<void>} Promise that resolves when the compressed flash mode is left.
   */
  async flashDeflFinish(i = !1, t = this.DEFAULT_TIMEOUT) {
    const n = i ? 0 : 1, a = this._intToByteArray(n);
    await this.checkCommand("leave compressed flash mode", this.ESP_FLASH_DEFL_END, a, void 0, void 0, t);
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
  async runSpiflashCommand(i, t, n, a = null, s = 0, r = 0) {
    const d = this.chip.SPI_REG_BASE, f = d + 0, g = d + 4, y = d + this.chip.SPI_USR_OFFS, p = d + this.chip.SPI_USR1_OFFS, w = d + this.chip.SPI_USR2_OFFS, E = d + this.chip.SPI_W0_OFFS;
    let m;
    this.chip.SPI_MOSI_DLEN_OFFS != null ? m = async (F, U) => {
      const z = d + this.chip.SPI_MOSI_DLEN_OFFS, he = d + this.chip.SPI_MISO_DLEN_OFFS;
      F > 0 && await this.writeReg(z, F - 1), U > 0 && await this.writeReg(he, U - 1);
      let _t = 0;
      r > 0 && (_t |= r - 1), s > 0 && (_t |= s - 1 << D), _t && await this.writeReg(p, _t);
    } : m = async (F, U) => {
      const z = p, he = 17, _t = 8, kn = F === 0 ? 0 : F - 1;
      let ce = (U === 0 ? 0 : U - 1) << _t | kn << he;
      r > 0 && (ce |= r - 1), s > 0 && (ce |= s - 1 << D), await this.writeReg(z, ce);
    };
    const _ = 1 << 18, R = 28, D = 26;
    if (n > 32)
      throw new k("Reading more than 32 bits back from a SPI flash operation is unsupported");
    if (t.length > 64)
      throw new k("Writing more than 64 bytes of data with one SPI command is unsupported");
    const S = t.length * 8, T = await this.readReg(y), A = await this.readReg(w);
    let b = -2147483648;
    n > 0 && (b |= 268435456), S > 0 && (b |= 134217728), s > 0 && (b |= 1073741824), r > 0 && (b |= 536870912), await m(S, n), await this.writeReg(y, b);
    let x = 7 << R | i;
    if (await this.writeReg(w, x), a && s > 0 && (this.SPI_ADDR_REG_MSB && (a = a << 32 - s), await this.writeReg(g, a)), S == 0)
      await this.writeReg(E, 0);
    else {
      t = Fe(t, 4, 0);
      const F = [];
      for (let z = 0; z < t.length; z += 4)
        F.push((t[z] | t[z + 1] << 8 | t[z + 2] << 16 | t[z + 3] << 24) >>> 0);
      let U = E;
      for (const z of F)
        await this.writeReg(U, z), U += 4;
    }
    await this.writeReg(f, _);
    let H;
    for (H = 0; H < 10 && (x = await this.readReg(f) & _, x != 0); H++)
      ;
    if (H === 10)
      throw new k("SPI command did not complete in time");
    const Wt = await this.readReg(E);
    return await this.writeReg(y, T), await this.writeReg(w, A), Wt;
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
    const t = i.getTime(), n = await this.checkCommand("erase flash", this.ESP_ERASE_FLASH, void 0, void 0, void 0, this.CHIP_ERASE_TIMEOUT);
    i = /* @__PURE__ */ new Date();
    const a = i.getTime();
    return this.info("Chip erase completed successfully in " + (a - t) / 1e3 + "s"), n;
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
    const n = this.timeoutPerMb(this.MD5_TIMEOUT_PER_MB, t);
    let a = this._appendArray(this._intToByteArray(i), this._intToByteArray(t));
    a = this._appendArray(a, this._intToByteArray(0)), a = this._appendArray(a, this._intToByteArray(0));
    const l = this.IS_STUB ? 16 : 32, h = await this.checkCommand("calculate md5sum", this.ESP_SPI_FLASH_MD5, a, void 0, l, n);
    return this.toHex(h);
  }
  /**
   * Read flash memory from the chip.
   * @param {number} addr Address number
   * @param {number} size Package size
   * @param {FlashReadCallback} onPacketReceived Callback function to call when packet is received
   * @returns {Uint8Array} Flash read data
   */
  async readFlash(i, t, n = null) {
    let a = this._appendArray(this._intToByteArray(i), this._intToByteArray(t));
    a = this._appendArray(a, this._intToByteArray(4096)), a = this._appendArray(a, this._intToByteArray(1024));
    const s = await this.checkCommand("read flash", this.ESP_READ_FLASH, a);
    if (s != 0)
      throw new k("Failed to read memory: " + s);
    let r = new Uint8Array(0);
    for (; r.length < t; ) {
      const l = await this.transport.read(this.FLASH_READ_TIMEOUT);
      if (l instanceof Uint8Array)
        l.length > 0 && (r = this._appendArray(r, l), await this.transport.write(this._intToByteArray(r.length)), n && n(l, r.length, t));
      else
        throw new k("Failed to read memory: " + l);
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
    const i = this.chip.getChipRevision ? await this.chip.getChipRevision(this) : void 0, t = await Fi(this.chip.CHIP_NAME, i);
    if (t === void 0)
      throw this.debug("Error loading Stub json"), new Error("Error loading Stub json");
    const n = [t.decodedText, t.decodedData];
    for (let r = 0; r < n.length; r++)
      if (n[r]) {
        const l = r === 0 ? t.text_start : t.data_start, h = n[r].length, o = Math.floor((h + this.ESP_RAM_BLOCK - 1) / this.ESP_RAM_BLOCK);
        await this.memBegin(h, o, this.ESP_RAM_BLOCK, l);
        for (let c = 0; c < o; c++) {
          const u = c * this.ESP_RAM_BLOCK, d = u + this.ESP_RAM_BLOCK;
          await this.memBlock(n[r].slice(u, d), c);
        }
      }
    this.info("Running stub..."), await this.memFinish(t.entry);
    const a = await this.transport.read(this.DEFAULT_TIMEOUT), s = String.fromCharCode(...a);
    if (s !== "OHAI")
      throw new k(`Failed to start stub. Unexpected response ${s}`);
    return this.info("Stub running..."), this.IS_STUB = !0, this.chip;
  }
  /**
   * Change the chip baudrate.
   */
  async changeBaud() {
    this.info("Changing baudrate to " + this.baudrate);
    const i = this.IS_STUB ? this.romBaudrate : 0, t = this._appendArray(this._intToByteArray(this.baudrate), this._intToByteArray(i));
    await this.command(this.ESP_CHANGE_BAUDRATE, t), this.info("Changed"), this.info("If the chip does not respond to any further commands, consider using a lower baud rate."), await Lt(50), await this.transport.disconnect(), await Lt(50), await this.transport.connect(this.baudrate, this.serialOptions), await Lt(50), this.transport.readLoop();
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
      const n = await this.chip.getChipRevision(this);
      this.info("Chip Revision: " + n);
    }
    this.info("Chip is " + t), this.info("Features: " + await this.chip.getChipFeatures(this)), this.info("Crystal is " + await this.chip.getCrystalFreq(this) + "MHz"), this.info("MAC: " + await this.chip.readMac(this)), await this.chip.readMac(this), typeof this.chip.postConnect < "u" && await this.chip.postConnect(this), await this.runStub(), this.romBaudrate !== this.baudrate && await this.changeBaud();
    try {
      const n = await this.readFlashId();
      this.info("Flash ID: " + n.toString(16)), (n === 16777215 || n === 0) && this.info(`WARNING: Failed to communicate with the flash chip,
read/write operations will fail.
Try checking the chip connections or removing
any other hardware connected to IOs.`);
    } catch (n) {
      throw new k("Unable to verify flash chip connection " + n);
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
      throw new k("Flash size " + i + " is not supported by this chip type. Supported sizes: " + this.chip.FLASH_SIZES);
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
  async _updateImageFlashParams(i, t, n = "keep", a = "keep", s = "keep") {
    if (this.debug(`_update_image_flash_params ${s} ${n} ${a}`), i.length < 8 || t != this.chip.BOOTLOADER_FLASH_OFFSET)
      return i;
    if (s === "keep" && n === "keep" && a === "keep")
      return this.info("Not changing the image"), i;
    const r = i[0];
    let l = i[2];
    const h = i[3];
    if (r !== this.ESP_IMAGE_MAGIC)
      return this.info("Warning: Image file at 0x" + t.toString(16) + " doesn't look like an image file, so not changing any flash settings."), i;
    try {
      (await Bi(this.chip, i)).verify();
    } catch {
      return this.debug(`Warning: Image file at 0x${t.toString(16)} is not a valid ${this.chip.CHIP_NAME} image, so not changing any flash settings.`), i;
    }
    const o = this.chip.CHIP_NAME !== "ESP8266" && i[23] === 49;
    n !== "keep" && (l = { qio: 0, qout: 1, dio: 2, dout: 3 }[n]);
    let c = h & 15;
    a !== "keep" && (c = { "40m": 0, "26m": 1, "20m": 2, "80m": 15 }[a]);
    let u = h & 240;
    if (s !== "keep")
      if (s === "detect") {
        this.info("Configuring flash size...");
        const g = await this.detectFlashSize();
        this.info("Detected flash size set to " + g), u = this.parseFlashSizeArg(g);
      } else
        u = this.parseFlashSizeArg(s);
    const d = l << 8 | c + u;
    this.info("Flash params set to " + d.toString(16));
    const f = new Uint8Array(i);
    if (i[2] !== l && (f[2] = l), i[3] !== c + u && (f[3] = c + u), o) {
      const g = await Bi(this.chip, f), y = f.slice(0, g.datalength), p = f.slice(g.datalength + g.SHA256_DIGEST_LEN), w = await crypto.subtle.digest("SHA-256", p), E = new Uint8Array(w), m = new Uint8Array(y.length + E.length + p.length);
      m.set(y, 0), m.set(E, y.length), m.set(p, y.length + E.length);
      const _ = m.slice(g.datalength, g.datalength + g.SHA256_DIGEST_LEN);
      return this.transport.hexify(E) === this.transport.hexify(_) ? this.info("SHA digest in image updated") : this.info(`WARNING: SHA recalculation for binary failed!
	Expected calculated SHA: ${this.transport.hexify(E)}
	SHA stored in binary:    ${this.transport.hexify(_)}`), m;
    }
    return f;
  }
  /**
   * Write set of file images into given address based on given FlashOptions object.
   * @param {FlashOptions} options FlashOptions to configure how and what to write into flash.
   */
  async writeFlash(i) {
    if (this.debug("EspLoader program"), i.flashSize !== "keep") {
      const a = this.flashSizeBytes(i.flashSize);
      for (let s = 0; s < i.fileArray.length; s++)
        if (i.fileArray[s].data.length + i.fileArray[s].address > a)
          throw new k(`File ${s + 1} doesn't fit in the available flash`);
    }
    this.IS_STUB === !0 && i.eraseAll === !0 && await this.eraseFlash();
    let t, n;
    for (let a = 0; a < i.fileArray.length; a++) {
      if (this.debug("Data Length " + i.fileArray[a].data.length), t = i.fileArray[a].data, this.debug("Image Length " + t.length), t.length === 0) {
        this.debug("Warning: File is empty");
        continue;
      }
      t = Fe(t, 4), n = i.fileArray[a].address, t = await this._updateImageFlashParams(t, n, i.flashMode, i.flashFreq, i.flashSize);
      let s = null;
      i.calculateMD5Hash && (s = i.calculateMD5Hash(t), this.debug("Image MD5 " + s));
      const r = t.length;
      let l;
      i.compress ? (t = er(t, { level: 9 }), l = await this.flashDeflBegin(r, t.length, n)) : l = await this.flashBegin(r, n);
      let h = 0, o = 0;
      const c = t.length;
      i.reportProgress && i.reportProgress(a, 0, c);
      let u = /* @__PURE__ */ new Date();
      const d = u.getTime();
      let f = 5e3;
      const g = new ir({ chunkSize: 1 });
      let y = 0;
      g.onData = function(E) {
        y += E.byteLength;
      };
      let p = 0;
      for (; p < t.length; ) {
        this.debug("Write loop " + n + " " + h + " " + l), this.info("Writing at 0x" + (n + y).toString(16) + "... (" + Math.floor(100 * (h + 1) / l) + "%)");
        const E = Math.min(this.FLASH_WRITE_SIZE, t.length - p), m = t.slice(p, p + E), _ = p + E >= t.length;
        if (i.compress) {
          const R = y;
          g.push(m, _);
          const D = y - R;
          let S = 3e3;
          this.timeoutPerMb(this.ERASE_WRITE_TIMEOUT_PER_MB, D) > 3e3 && (S = this.timeoutPerMb(this.ERASE_WRITE_TIMEOUT_PER_MB, D)), this.IS_STUB === !1 && (f = S), await this.flashDeflBlock(m, h, f), this.IS_STUB && (f = S);
        } else
          throw new k("Yet to handle Non Compressed writes");
        o += m.length, p += E, h++, i.reportProgress && i.reportProgress(a, o, c);
      }
      this.IS_STUB && (i.compress ? await this.flashDeflFinish(!1, f) : await this.flashFinish(!1, f)), u = /* @__PURE__ */ new Date();
      const w = u.getTime() - d;
      if (i.compress && this.info("Wrote " + r + " bytes (" + o + " compressed) at 0x" + n.toString(16) + " in " + w / 1e3 + " seconds."), s) {
        this.info("File  md5: " + s);
        const E = await this.flashMd5sum(n, r);
        if (this.info("Flash md5: " + E), new String(E).valueOf() != new String(s).valueOf())
          throw new k("MD5 of file does not match data in flash!");
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
    let n = this.DETECTED_FLASH_SIZES[t];
    return n ? this.info("Auto-detected Flash size: " + n) : (n = "4MB", this.info("Could not auto-detect Flash size. defaulting to 4MB")), n;
  }
  /**
   * Soft reset the device chip. Soft reset with run user code is the closest.
   * @param {boolean} stayInBootloader Flag to indicate if to stay in bootloader
   */
  async softReset(i) {
    if (this.IS_STUB) {
      if (this.chip.CHIP_NAME != "ESP8266")
        throw new k("Soft resetting is currently only supported on ESP8266");
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
  async after(i = "hard_reset", t, n) {
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
        n || this.info("Custom reset sequence not provided, doing nothing."), this.resetConstructors.customReset || this.info("Custom reset constructor not available, doing nothing."), this.resetConstructors.customReset && n && (this.info("Custom resetting using sequence " + n), await this.resetConstructors.customReset(this.transport, n).reset());
        break;
      default:
        this.info("Staying in bootloader."), this.IS_STUB && this.softReset(!0);
        break;
    }
  }
}
const Rr = [
  73,
  77,
  80,
  82,
  79,
  86,
  1
  // protocol version
];
var pt;
(function(e) {
  e[e.CURRENT_STATE = 1] = "CURRENT_STATE", e[e.ERROR_STATE = 2] = "ERROR_STATE", e[e.RPC = 3] = "RPC", e[e.RPC_RESULT = 4] = "RPC_RESULT";
})(pt || (pt = {}));
var ee;
(function(e) {
  e[e.STOPPED = 0] = "STOPPED", e[e.READY = 2] = "READY", e[e.PROVISIONING = 3] = "PROVISIONING", e[e.PROVISIONED = 4] = "PROVISIONED";
})(ee || (ee = {}));
const vr = {
  0: "NO_ERROR",
  1: "INVALID_RPC_PACKET",
  2: "UNKNOWN_RPC_COMMAND",
  3: "UNABLE_TO_CONNECT",
  5: "BAD_HOSTNAME",
  254: "TIMEOUT",
  255: "UNKNOWN_ERROR"
};
class Ir extends Error {
  constructor() {
    super("Port is not ready");
  }
}
const kr = (e, i = 2) => {
  let t = e.toString(16).toUpperCase();
  return t.startsWith("-") ? "-0x" + t.substring(1).padStart(i, "0") : "0x" + t.padStart(i, "0");
}, Hi = (e) => "[" + e.map((i) => kr(i)).join(", ") + "]", In = (e) => e.sort((i, t) => i.name.toLocaleLowerCase().localeCompare(t.name.toLocaleLowerCase())), Tr = (e, i) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    t.set(n.name, n);
  for (const n of i)
    t.set(n.name, n);
  return In(Array.from(t.values()));
}, Dr = 3e3, Cr = 3e4, zi = 3e4, Mr = (e, i) => e.length !== i.length ? !0 : e.some((t, n) => t.name !== i[n].name || t.rssi !== i[n].rssi || t.secured !== i[n].secured);
class $i extends EventTarget {
  /** Last device error (or local timeout). Assigning dispatches `error-changed`. */
  get error() {
    return this._error;
  }
  set error(i) {
    this._error = i, this.dispatchEvent(new CustomEvent("error-changed", { detail: this._error }));
  }
  constructor(i, t) {
    if (super(), this.port = i, this.logger = t, this._error = 0, this._rpcLock = Promise.resolve(), i.readable === null)
      throw new Error("Port is not readable");
    if (i.writable === null)
      throw new Error("Port is not writable");
  }
  /**
   * Detect Improv Serial, fetch the state and return the next URL if provisioned.
   * @param timeout Timeout in ms to wait for the device to respond. Default to 1000ms.
   */
  async initialize(i = 1e3) {
    if (this.logger.log("Initializing Improv Serial"), this._processInput(), this._reader === void 0)
      throw new Ir();
    let t;
    try {
      await new Promise(async (n, a) => {
        setTimeout(() => a(new Error("Improv Wi-Fi Serial not detected")), i), t = setInterval(() => this._sendRPC(2, []), 1e3), await this.requestCurrentState(), n(void 0);
      }), clearInterval(t), await this.requestInfo();
    } catch (n) {
      throw await this.close(), n;
    } finally {
      clearInterval(t);
    }
    return this.info;
  }
  async close() {
    this._reader && await new Promise((i) => {
      this._reader.cancel(), this.addEventListener("disconnect", i, { once: !0 });
    });
  }
  /**
   * This command will trigger at least one packet,
   * the Current State and if already provisioned,
   * the same response you would get if device provisioning
   * was successful (see below).
   *
   * A caller polling an intermittently-unresponsive device (e.g. one rebooting
   * to switch network interfaces) can pass a timeout shorter than the default
   * so each poll settles quickly.
   */
  async requestCurrentState(i) {
    var t;
    const n = new AbortController();
    let a;
    try {
      await new Promise((s, r) => {
        this.addEventListener("state-changed", () => s(), {
          once: !0,
          signal: n.signal
        }), a = this._sendRPCWithResponse(2, [], i), a.catch(r);
      });
    } catch (s) {
      throw new Error(`Error fetching current state: ${s}`);
    } finally {
      n.abort();
    }
    if (this.state !== ee.PROVISIONED) {
      (t = this._rpcFeedback) === null || t === void 0 || t.resolve([]);
      return;
    }
    this.nextUrl = (await a)[0];
  }
  async requestInfo(i) {
    const t = await this._sendRPCWithResponse(3, [], i);
    this.info = {
      firmware: t[0],
      version: t[1],
      name: t[3],
      chipFamily: t[2],
      osName: t.length > 4 ? t[4] : null,
      osVersion: t.length > 5 ? t[5] : null
    };
  }
  async provision(i, t, n) {
    const a = new TextEncoder(), s = a.encode(i), r = a.encode(t), l = [
      s.length,
      ...s,
      r.length,
      ...r
    ], h = await this._sendRPCWithResponse(1, l, n);
    this.nextUrl = h[0];
  }
  async scan(i) {
    const n = (await this._sendRPCWithMultipleResponses(4, [], i)).map(([a, s, r]) => ({
      name: a,
      rssi: parseInt(s),
      secured: r !== "NO"
    }));
    return In(n);
  }
  /**
   * Continuously scan for Wi-Fi networks, calling `onChange` whenever the list
   * of networks changes.
   *
   * Results are merged with previous scans (networks are keyed by name and kept
   * sorted alphabetically), so a network missing from a single scan won't
   * immediately disappear. `onChange` is only called when a value in the list
   * actually changes.
   *
   * Scanning stops on the first error or when the returned function is called.
   * If the first scan fails (e.g. the device doesn't support scanning, or stops
   * responding), `onChange` is called once with `null` to signal that networks
   * are unavailable.
   *
   * The returned function resolves once the in-flight scan has settled, so it
   * can be awaited before sending another RPC command (such as provisioning).
   */
  subscribeSSIDs(i) {
    let t = !0, n, a;
    const s = (async () => {
      for (; t; ) {
        let r;
        try {
          r = await this.scan(Cr);
        } catch (h) {
          this.logger.error("Error while scanning for Wi-Fi networks", h), t && n === void 0 && i(null);
          break;
        }
        if (!t)
          break;
        const l = n === void 0 ? r : Tr(n, r);
        (n === void 0 || Mr(n, l)) && (n = l, i(l)), await new Promise((h) => {
          a = h, setTimeout(h, Dr);
        });
      }
    })();
    return () => (t = !1, a == null || a(), s);
  }
  /**
   * Get the current hostname of the device.
   */
  async getHostname(i) {
    return (await this._sendRPCWithResponse(5, [], i))[0];
  }
  /**
   * Set the hostname of the device. Returns the hostname as set by the device.
   *
   * Hostnames need to conform to RFC 1123: letters, numbers and hyphens, up to
   * 255 characters. The device rejects other hostnames with a BAD_HOSTNAME error.
   */
  async setHostname(i, t) {
    const n = new TextEncoder();
    return (await this._sendRPCWithResponse(5, [...n.encode(i)], t))[0];
  }
  /**
   * Get the current device name. This is the same value as `info.name`.
   */
  async getDeviceName(i) {
    return (await this._sendRPCWithResponse(6, [], i))[0];
  }
  /**
   * Set the device name. Returns the device name as set by the device.
   *
   * When setting both the device name and the hostname, set the device name
   * first, as it can change the default hostname.
   */
  async setDeviceName(i, t) {
    const n = new TextEncoder(), a = await this._sendRPCWithResponse(6, [...n.encode(i)], t);
    return this.info && (this.info.name = a[0]), a[0];
  }
  /**
   * Request the device's network connectivity and supported interfaces.
   *
   * This is independent of the Wi-Fi provisioning state: a device already
   * online over Ethernet reports that here without Wi-Fi provisioning. The
   * first response string is the network flags as a decimal-encoded byte, and
   * when online the reachable device URL(s) follow.
   *
   * This command is optional. Devices that do not implement it respond with
   * UNKNOWN_RPC_COMMAND, so this rejects with that error for such devices.
   */
  async requestNetworkState(i) {
    const t = await this._sendRPCWithResponse(7, [], i), n = parseInt(t[0]);
    return {
      online: (n & 1) !== 0,
      supportsWifi: (n & 2) !== 0,
      supportsEthernet: (n & 4) !== 0,
      supportsThread: (n & 8) !== 0,
      supportsModem: (n & 16) !== 0,
      urls: t.slice(1)
    };
  }
  _sendRPC(i, t) {
    this.writePacketToStream(pt.RPC, [
      i,
      t.length,
      ...t
    ]);
  }
  /**
   * Run an RPC command once the previous one has settled, so devices that
   * handle a single command at a time never see two at once. The chain is kept
   * alive regardless of each command's outcome.
   */
  _enqueueRPC(i, t) {
    const n = () => this._awaitRPCResultWithTimeout(i(), t).finally(() => {
      this._rpcFeedback = void 0;
    }), a = this._rpcLock.then(n, n);
    return this._rpcLock = a.catch(() => {
    }), a;
  }
  _sendRPCWithResponse(i, t, n = zi) {
    return this._enqueueRPC(() => new Promise((a, s) => {
      this._rpcFeedback = { command: i, resolve: a, reject: s }, this._sendRPC(i, t);
    }), n);
  }
  _sendRPCWithMultipleResponses(i, t, n = zi) {
    return this._enqueueRPC(() => new Promise((a, s) => {
      this._rpcFeedback = { command: i, resolve: a, reject: s, receivedData: [] }, this._sendRPC(i, t);
    }), n);
  }
  async _awaitRPCResultWithTimeout(i, t) {
    if (!t)
      return await i;
    const n = setTimeout(() => this._setError(
      254
      /* ImprovSerialErrorState.TIMEOUT */
    ), t);
    try {
      return await i;
    } finally {
      clearTimeout(n);
    }
  }
  async _processInput() {
    this.logger.debug("Starting read loop"), this._reader = this.port.readable.getReader();
    try {
      let i = [], t, n = 0;
      for (; ; ) {
        const { value: a, done: s } = await this._reader.read();
        if (s)
          break;
        if (!(!a || a.length === 0))
          for (const r of a) {
            if (t === !1) {
              r === 10 && (t = void 0);
              continue;
            }
            if (t === !0) {
              i.push(r), i.length === n && (this._handleIncomingPacket(i), t = void 0, i = []);
              continue;
            }
            if (r === 10) {
              i = [];
              continue;
            }
            if (i.push(r), i.length !== 9)
              continue;
            if (t = String.fromCharCode(...i.slice(0, 6)) === "IMPROV", !t) {
              i = [];
              continue;
            }
            n = 9 + i[8] + 1;
          }
      }
    } catch (i) {
      this.logger.error("Error while reading serial port", i);
    } finally {
      this._reader.releaseLock(), this._reader = void 0;
    }
    this.logger.debug("Finished read loop"), this.dispatchEvent(new Event("disconnect"));
  }
  _handleIncomingPacket(i) {
    const t = i.slice(6), n = t[0], a = t[1], s = t[2], r = t.slice(3, 3 + s);
    if (this.logger.debug("PROCESS", {
      version: n,
      packetType: a,
      packetLength: s,
      data: Hi(r)
    }), n !== 1) {
      this.logger.error("Received unsupported version", n);
      return;
    }
    let l = t[3 + s], h = 0;
    for (let o = 0; o < i.length - 1; o++)
      h += i[o];
    if (h = h & 255, h !== l) {
      this.logger.error(`Received invalid checksum ${l}. Expected ${h}`);
      return;
    }
    if (a === pt.CURRENT_STATE)
      this.state = r[0], this.state !== ee.PROVISIONED && (this.nextUrl = void 0), this.dispatchEvent(new CustomEvent("state-changed", {
        detail: this.state
      }));
    else if (a === pt.ERROR_STATE)
      this._setError(r[0]);
    else if (a === pt.RPC_RESULT) {
      if (!this._rpcFeedback) {
        this.logger.error("Received result while not waiting for one");
        return;
      }
      const o = r[0];
      if (o !== this._rpcFeedback.command) {
        this.logger.error(`Received result for command ${o} but expected ${this._rpcFeedback.command}`);
        return;
      }
      const c = [], u = r[1], d = new TextDecoder("utf-8");
      let f = 2;
      for (; f < 2 + u; )
        c.push(d.decode(new Uint8Array(r.slice(f + 1, f + r[f] + 1)))), f += r[f] + 1;
      "receivedData" in this._rpcFeedback ? c.length > 0 ? this._rpcFeedback.receivedData.push(c) : this._rpcFeedback.resolve(this._rpcFeedback.receivedData) : this._rpcFeedback.resolve(c);
    } else
      this.logger.error("Unable to handle packet", t);
  }
  /**
   * Add header + checksum and write packet to stream
   */
  async writePacketToStream(i, t) {
    const n = new Uint8Array([
      ...Rr,
      i,
      t.length,
      ...t,
      0,
      // Will be checksum
      0
      // Will be newline
    ]);
    n[n.length - 2] = n.reduce((s, r) => s + r, 0) & 255, n[n.length - 1] = 10, this.logger.debug("Writing to stream:", Hi(new Array(...n)));
    const a = this.port.writable.getWriter();
    await a.write(n);
    try {
      a.releaseLock();
    } catch (s) {
      console.error("Ignoring release lock error", s);
    }
  }
  // Error is either received from device or is a timeout
  _setError(i) {
    i > 0 && this._rpcFeedback && this._rpcFeedback.reject(vr[i] || `UNKNOWN_ERROR (${i})`), this.error = i;
  }
}
const Tt = (e) => new Promise((i) => setTimeout(i, e)), $ = (e, i = !1) => {
  const t = document.querySelector("#flashStatus");
  t && (t.textContent = e, t.style.color = i ? "#ff8585" : "#aeb8c2");
};
async function Gi(e, i) {
  try {
    await i.setRTS(!0), await Tt(100), await e.after();
  } catch {
  }
}
async function Lr(e, i) {
  var l, h;
  const t = new URL(e, window.location.href).toString();
  $("Downloading firmware…");
  const n = await fetch(t, { cache: "no-store" });
  if (!n.ok) throw new Error(`Manifest download failed (${n.status}).`);
  const a = await n.json(), s = (l = a.builds) == null ? void 0 : l.find((o) => o.chipFamily === i && o.serialType === void 0);
  if (!((h = s == null ? void 0 : s.parts) != null && h.length)) throw new Error(`No ${i} firmware image is available in this manifest.`);
  const r = await Promise.all(s.parts.map(async (o) => {
    const c = await fetch(new URL(o.path, t), { cache: "no-store" });
    if (!c.ok) throw new Error(`Firmware download failed (${c.status}).`);
    return { data: new Uint8Array(await c.arrayBuffer()), address: o.offset };
  }));
  return { manifest: a, parts: r, total: r.reduce((o, c) => o + c.data.length, 0) };
}
async function Pr(e) {
  $("Opening Wi-Fi setup…"), await Tt(1200), await e.open({ baudRate: 115200, bufferSize: 8192 });
  let i = new $i(e, console);
  await i.initialize(1e4);
  const t = document.createElement("div");
  t.style.cssText = "position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.72);display:grid;place-items:center;padding:18px", t.innerHTML = `<div style="width:min(480px,100%);background:#161616;border:1px solid #3a424b;border-radius:8px;padding:22px;color:#eee;font:15px/1.45 system-ui,sans-serif">
    <h2 style="margin:0 0 8px">Connect WLED to Wi-Fi</h2>
    <p id="improv-message" style="margin:0 0 16px;color:#aeb8c2">Scanning nearby 2.4 GHz networks…</p>
    <label style="display:block;margin:10px 0 5px">Network</label>
    <select id="improv-ssid" style="width:100%;padding:9px;background:#0f1215;color:#eee;border:1px solid #3a424b;border-radius:4px"><option value="">Enter network manually</option></select>
    <input id="improv-manual-ssid" placeholder="Network name (SSID)" style="width:100%;box-sizing:border-box;margin-top:8px;padding:9px;background:#0f1215;color:#eee;border:1px solid #3a424b;border-radius:4px" />
    <label style="display:block;margin:10px 0 5px">Password</label>
    <input id="improv-password" type="password" placeholder="Wi-Fi password" style="width:100%;box-sizing:border-box;padding:9px;background:#0f1215;color:#eee;border:1px solid #3a424b;border-radius:4px" />
    <div id="improv-actions" style="display:flex;gap:10px;margin-top:18px"><button id="improv-rescan" style="padding:9px 12px">Scan again</button><button id="improv-connect" style="padding:9px 12px;background:#287f45;color:#fff;border:1px solid #3ea65e;border-radius:4px;font-weight:700">Connect</button><button id="improv-skip" style="margin-left:auto;padding:9px 12px">Skip</button></div>
  </div>`, document.body.appendChild(t);
  const n = t.querySelector("#improv-message"), a = t.querySelector("#improv-ssid"), s = t.querySelector("#improv-manual-ssid"), r = t.querySelector("#improv-password"), l = t.querySelector("#improv-actions");
  let h;
  const o = async () => {
    if (!h) return;
    const p = h;
    h = void 0, await p();
  }, c = (p) => {
    if (a.innerHTML = '<option value="">Enter network manually</option>', !p) {
      n.textContent = "Network scan unavailable. Enter the network name manually.";
      return;
    }
    for (const w of p) {
      const E = document.createElement("option");
      E.value = w.name, E.textContent = `${w.name}${w.secured ? " 🔒" : ""}`, a.appendChild(E);
    }
    n.textContent = p.length ? "Choose a network or enter one manually." : "No networks found yet. Keep this dialog open or enter the network name manually.";
  }, u = async () => {
    await o(), n.textContent = "Scanning nearby 2.4 GHz networks…", h = i.subscribeSSIDs(c);
  }, d = async () => {
    if (!await Promise.race([
      o().then(() => !0).catch(() => !1),
      Tt(2500).then(() => !1)
    ])) {
      n.textContent = "Restarting the Wi-Fi setup connection…";
      try {
        await i.close();
      } catch {
      }
      try {
        await e.close();
      } catch {
      }
      await Tt(150), await e.open({ baudRate: 115200, bufferSize: 8192 }), i = new $i(e, console), await i.initialize(1e4);
    }
  }, f = async () => {
    await o();
    try {
      await i.close();
    } catch {
    }
    try {
      await e.close();
    } catch {
    }
  }, g = async (p) => (t.remove(), await f(), p), y = async () => {
    const p = i.nextUrl;
    if (await f(), n.textContent = p ? "Wi-Fi settings sent. WLED reported this address:" : "Wi-Fi settings sent. The controller is connecting to your network.", a.disabled = s.disabled = r.disabled = !0, l.innerHTML = "", p)
      try {
        const E = new URL(p);
        if (E.protocol !== "http:" && E.protocol !== "https:") throw new Error("Unsupported URL protocol");
        const m = document.createElement("code");
        m.textContent = E.href, m.style.cssText = "display:block;margin:10px 0;padding:9px;background:#0f1215;border:1px solid #3a424b;border-radius:4px;overflow-wrap:anywhere", n.after(m);
        const _ = document.createElement("a");
        _.href = E.href, _.target = "_blank", _.rel = "noopener", _.textContent = "Open WLED in browser", _.style.cssText = "padding:9px 12px;background:#287f45;color:#fff;border:1px solid #3ea65e;border-radius:4px;font-weight:700;text-decoration:none", l.appendChild(_);
      } catch {
        n.textContent = "Wi-Fi settings sent. The controller is connecting to your network.";
      }
    const w = document.createElement("button");
    w.textContent = "Done", w.style.cssText = "margin-left:auto;padding:9px 12px", w.addEventListener("click", () => t.remove()), l.appendChild(w);
  };
  a.addEventListener("change", () => {
    a.value && (s.value = a.value);
  }), t.querySelector("#improv-rescan").addEventListener("click", u), t.querySelector("#improv-skip").addEventListener("click", () => g(!1)), t.querySelector("#improv-connect").addEventListener("click", async () => {
    const p = s.value.trim() || a.value;
    if (!p) {
      n.textContent = "Enter or select a Wi-Fi network first.";
      return;
    }
    n.textContent = "Preparing Wi-Fi settings…";
    try {
      await d(), n.textContent = "Sending Wi-Fi settings (this can take up to 45 seconds)…", await Promise.race([
        i.provision(p, r.value, 45e3),
        Tt(5e4).then(() => {
          throw new Error("Timed out waiting for the controller to confirm Wi-Fi settings");
        })
      ]), $("Wi-Fi settings sent. Select the WLED address to open it."), await y();
    } catch (w) {
      n.textContent = `Could not send Wi-Fi settings: ${(w == null ? void 0 : w.message) || w}`;
    }
  }), await u();
}
async function Or() {
  const e = document.querySelector("#flashBtn"), i = e == null ? void 0 : e.dataset.manifest;
  if (!i) return;
  if (!navigator.serial) {
    $("Web Serial requires current Chrome or Edge.", !0);
    return;
  }
  if (!window.confirm("This will write the selected RGB2Go firmware. Verify the controller and options, then continue.")) return;
  e.disabled = !0;
  let t;
  try {
    $("Select the controller COM port…");
    const n = await navigator.serial.requestPort();
    t = new vn(n);
    const a = new Ar({ transport: t, baudrate: 115200 });
    $("Connecting at 115200 baud…"), await a.main(), await a.flashId();
    const { manifest: s, parts: r, total: l } = await Lr(i, a.chip.CHIP_NAME);
    if (!window.confirm(`Ready to write ${s.name || "selected firmware"} ${s.version || ""} (${l.toLocaleString()} bytes) at 115200 baud. Start flashing?`)) {
      $("Flash canceled before writing."), await Gi(a, t);
      return;
    }
    let h = -1;
    $("Writing firmware: 0%…"), await a.writeFlash({
      fileArray: r,
      flashSize: "keep",
      flashMode: "keep",
      flashFreq: "keep",
      eraseAll: !1,
      compress: !0,
      reportProgress: (o, c, u) => {
        const d = r.slice(0, o).reduce((y, p) => y + p.data.length, 0), f = c / u * r[o].data.length, g = Math.floor((d + f) / l * 100);
        g !== h && (h = g, $(`Writing firmware: ${g}%…`));
      }
    }), await Gi(a, t), await t.disconnect(), $("Flash complete. Opening Wi-Fi setup…");
    try {
      await Pr(n);
    } catch (o) {
      console.warn("Wi-Fi setup unavailable", o), $("Flash complete. Wi-Fi setup did not open; connect to the WLED access point or enter Wi-Fi in WLED settings.");
    }
  } catch (n) {
    console.error(n), $(`Flash failed: ${(n == null ? void 0 : n.message) || n}`, !0);
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
  return (e = document.querySelector("#flashBtn")) == null ? void 0 : e.addEventListener("click", Or);
});
export {
  dr as R
};

function getLevenshteinTolerance(e) {
  return Object.prototype.hasOwnProperty.call(levenshteinTolerances, e.length)
    ? levenshteinTolerances[e.length]
    : 2 + 1 * Math.floor(e.length / 7);
}
function getLevenshteinDistance(e, t) {
  const n = [],
    r = e.length,
    o = t.length;
  if (0 === r) return o;
  if (0 === o) return r;
  for (let e = r; e >= 0; e -= 1) n[e] = [];
  for (let e = r; e >= 0; e -= 1) n[e][0] = e;
  for (let e = o; e >= 0; e -= 1) n[0][e] = e;
  for (let l = 1; l <= r; l += 1) {
    const c = e.charAt(l - 1);
    for (let h = 1; h <= o; h += 1) {
      if (l === h && n[l][h] > 4) return r;
      const o = t.charAt(h - 1),
        s = c === o ? 0 : 1;
      let a = n[l - 1][h] + 1;
      const i = n[l][h - 1] + 1,
        f = n[l - 1][h - 1] + s;
      i < a && (a = i),
        f < a && (a = f),
        (n[l][h] = a),
        l > 1 &&
          h > 1 &&
          c === t.charAt(h - 2) &&
          e.charAt(l - 2) === o &&
          (n[l][h] = Math.min(n[l][h], n[l - 2][h - 2] + s));
    }
  }
  return n[r][o];
}
const levenshteinTolerances = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 1,
  5: 1,
  6: 2,
  7: 2,
};
export { getLevenshteinTolerance, getLevenshteinDistance };

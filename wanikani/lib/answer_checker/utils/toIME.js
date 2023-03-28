function classifyKana(a, n) {
  const o = -1 !== smallKanaPrefix.indexOf(a[n]),
    s = -1 !== smallKanaSuffix.indexOf(a[n + 1]);
  return {
    hasSmallKana: o || s,
    isSurrounded: o && -1 !== smallKanaSuffix.indexOf(a[n + 2]),
  };
}
function splitIntoMorae(a) {
  const n = [];
  for (let o = 0; o < a.length; o += 1) {
    const { hasSmallKana: s, isSurrounded: t } = classifyKana(a, o);
    t
      ? (n.push(a[o] + a[o + 1] + a[o + 2]), (o += 2))
      : s
      ? (n.push(a[o] + a[o + 1]), (o += 1))
      : n.push(a[o]);
  }
  return n;
}
import { toRomaji } from "wanakana";
const smallKanaSuffix = [
    "\u3083",
    "\u3085",
    "\u3087",
    "\u30e3",
    "\u30e5",
    "\u30e7",
  ],
  smallKanaPrefix = ["\u3063", "\u30c3"];
export default function toIME(a) {
  return splitIntoMorae(a)
    .map((a) =>
      "\u3093" === a || "\u30f3" === a
        ? "nn"
        : "\u30fc" === a
        ? "-"
        : toRomaji(a)
    )
    .join("");
}

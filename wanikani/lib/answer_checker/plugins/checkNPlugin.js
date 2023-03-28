import { toRomaji } from "wanakana";
import toIME from "lib/answer_checker/utils/toIME";
const customRomajiMapping = {
    "\u3062": "di",
    "\u3065": "du",
    "\u3062\u3083": "dya",
    "\u3062\u3085": "dyu",
    "\u3062\u3087": "dyo",
    "\u3075": "hu",
  },
  toRomajiCustom = (t) =>
    toRomaji(t, { customRomajiMapping: customRomajiMapping }),
  toRomajiMora = (t) =>
    t.split("").map((t) => ("\u3063" === t ? "*" : toRomajiCustom(t))),
  startsWithN = (t) => t.startsWith("n") && t.length > 1,
  isValidTypo = (t, i, o) =>
    (t === i && !startsWithN(t)) ||
    `n${t}` === i ||
    (o && t === `n${i}`) ||
    (startsWithN(t) && "n" === i),
  allTyposAreRelatedToN = (t, i, o) =>
    t.every((t, a) => isValidTypo(t, i[a], o)),
  identical = (t, i) => t.every((t, o) => t === i[o]),
  missingNs = (t, i) => {
    const o = t.slice();
    return (
      i.forEach((t, i) => {
        "n" === t &&
          o[i] &&
          o[i].startsWith("n") &&
          "n" !== o[i] &&
          i !== o.length &&
          o.splice(i, 0, "n");
      }),
      o.length === i.length &&
        (identical(o, i) || allTyposAreRelatedToN(o, i, !0))
    );
  },
  compareMora = (t, i) =>
    !identical(t, i) &&
    (t.length === i.length ? allTyposAreRelatedToN(t, i) : missingNs(t, i));
export default function checkNPlugin(t, i, o) {
  if (!o || !o.readings || "reading" !== t) return null;
  const a = o.readings.map((t) => t.reading),
    n = a.filter((t) => -1 !== t.indexOf("\u3093"));
  if (!a.find((t) => t === i) && n.length > 0) {
    const t = toRomajiMora(i),
      o = n.map(toRomajiMora),
      a = n[o.findIndex((i) => compareMora(t, i))];
    if (a)
      return `Don\u2019t forget that \u3093 is typed as \u201cnn\u201d. Try typing \u201c${toIME(
        a
      )}\u201d.`;
  }
  return null;
}

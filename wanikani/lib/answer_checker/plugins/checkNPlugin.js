import { toRomaji } from "wanakana";
import toIME from "lib/answer_checker/utils/toIME";
import getReadingsFromSubject from "lib/answer_checker/utils/get_readings_from_subject";
const customRomajiMapping = {
    "\u3062": "di",
    "\u3065": "du",
    "\u3062\u3083": "dya",
    "\u3062\u3085": "dyu",
    "\u3062\u3087": "dyo",
    "\u3075": "hu",
  },
  toRomajiCustom = (n) =>
    toRomaji(n, { customRomajiMapping: customRomajiMapping }),
  toRomajiMora = (n) =>
    n.split("").map((n) => ("\u3063" === n ? "*" : toRomajiCustom(n))),
  identicalArrays = (n, t) =>
    n.length === t.length && n.every((n, e) => n === t[e]),
  cloneAndSplice = (n, t, e, ...i) => {
    const o = n.slice();
    return o.splice(t, e, ...i), o;
  },
  createMissingNPermutations = (n, t = 0) => {
    const e = n[n.length - 1],
      i = (t, e = 0) => {
        n.push(t), createMissingNPermutations(n, e);
      };
    return (
      e.forEach((n, o) => {
        if (!n.startsWith("n") || o < t) return;
        const a = e[o + 1];
        if (
          ("n" === n &&
            (a &&
              /^[aeiou]$/.test(a) &&
              i(cloneAndSplice(e, o + 1, 1, `n${a}`)),
            a &&
              /^(ya|yu|yo)$/.test(a) &&
              i(cloneAndSplice(e, o + 1, 0, "ni"))),
          /^n[aeiou]$/.test(n) && o > 0 && "n" !== e[o - 1])
        ) {
          const t = cloneAndSplice(e, o, 1, "n", n.charAt(1));
          i(t, o + 1),
            "ni" === n &&
              a &&
              /^(ya|yu|yo)$/.test(a) &&
              i(cloneAndSplice(e, o, 1, "n"), o + 1);
        }
      }),
      n
    );
  },
  createTooManyNPermutations = (n, t = 0) => {
    const e = n[n.length - 1],
      i = (t, e = 0) => {
        n.push(t), createTooManyNPermutations(n, e);
      };
    return (
      e.forEach((n, o) => {
        if ("n" !== n || o < t) return;
        const a = e[o + 1];
        if (
          (a &&
            /^n[aeou]$/.test(a) &&
            i(cloneAndSplice(e, o + 1, 1, a.charAt(1)), o + 1),
          "ni" === a)
        ) {
          const n = e[o + 2];
          /^(ya|yu|yo)$/.test(n)
            ? i(cloneAndSplice(e, o + 1, 1), o + 1)
            : i(cloneAndSplice(e, o + 1, 1, a.charAt(1)), o + 1);
        }
      }),
      n
    );
  },
  findMatchingIndexInArrayOfArrays = (n, t) =>
    n.findIndex((n) => t.some((t) => identicalArrays(n, t))),
  hasMatchedReading = (n, t) => n.find((n) => n === t),
  filterReadingsContainingCharacter = (n, t) =>
    n.filter((n) => -1 !== n.indexOf(t)),
  checkValidityAndExtractReadings = (n, t, e) => {
    if (!e || !e.readings || "reading" !== n)
      return { shouldNotCheck: !0, readingsContainingN: [] };
    const i = getReadingsFromSubject(e),
      o = filterReadingsContainingCharacter(i, "\u3093");
    return hasMatchedReading(i, t) || 0 === o.length
      ? { shouldNotCheck: !0, readingsContainingN: [] }
      : { shouldNotCheck: !1, readingsContainingN: o };
  },
  findIndexOfReadingWithTooFewNs = (n, t) => {
    const e = createMissingNPermutations([toRomajiMora(n)]);
    return findMatchingIndexInArrayOfArrays(t.map(toRomajiMora), e);
  },
  findIndexOfReadingWithTooManyNs = (n, t) => {
    const e = createTooManyNPermutations([toRomajiMora(n)]);
    return findMatchingIndexInArrayOfArrays(t.map(toRomajiMora), e);
  };
export default function checkNPlugin({
  questionType: n,
  response: t,
  item: e,
}) {
  const { shouldNotCheck: i, readingsContainingN: o } =
    checkValidityAndExtractReadings(n, t, e);
  if (i) return null;
  const a = findIndexOfReadingWithTooFewNs(t, o);
  if (-1 !== a)
    return `Don\u2019t forget that \u3093 is typed as \u201cnn\u201d. Try typing \u201c${toIME(
      o[a]
    )}\u201d.`;
  return -1 !== findIndexOfReadingWithTooManyNs(t, o)
    ? 'That looks like a typo. Watch out for those "n"s.'
    : null;
}

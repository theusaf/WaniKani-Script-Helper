function checkforTypo(e, t) {
  return e === smallPairs[t] && t;
}
function classify(e, t) {
  return checkforTypo(e, t)
    ? CLASSIFICATIONS.typo
    : e === t || CLASSIFICATIONS.mistake;
}
function findCorrections(e, t) {
  const n = [];
  for (let r = 0; r < e.length; r += 1) {
    const o = e[r],
      i = t[r],
      l = classify(o, i);
    if (
      (l === CLASSIFICATIONS.typo &&
        n.push({ expectedChar: i, expectedAnswer: t }),
      l === CLASSIFICATIONS.mistake)
    )
      return !1;
  }
  return n;
}
function compareBigAndSmall(e, t) {
  return e.length === t.length && findCorrections(e, t);
}
import toIME from "lib/answer_checker/utils/toIME";
import getReadingsFromSubject from "lib/answer_checker/utils/get_readings_from_subject";
const joinWordsNicely = (e) =>
    1 === e.length
      ? e[0]
      : 2 === e.length
      ? `${e[0]} and ${e[1]}`
      : `${e.slice(0, e.length - 1).join(", ")} and ${e[e.length - 1]}`,
  smallPairs = {
    "\u3083": "\u3084",
    "\u3085": "\u3086",
    "\u3087": "\u3088",
    "\u30e3": "\u30e4",
    "\u30e5": "\u30e6",
    "\u30e7": "\u30e8",
  },
  CLASSIFICATIONS = { typo: "typo", mistake: "mistake" };
export default function checkSmallHiragana(e, t, n) {
  if ("reading" !== e) return null;
  const r = getReadingsFromSubject(n)
      .map((e) => compareBigAndSmall(t, e))
      .filter((e) => e)[0],
    o = r && r.length > 0 && r.map(({ expectedChar: e }) => e);
  return r && r.length > 0
    ? `Watch out for the small ${joinWordsNicely(o)}. Try typing \u201c${toIME(
        r[0].expectedAnswer
      )}\u201d for this one.`
    : null;
}

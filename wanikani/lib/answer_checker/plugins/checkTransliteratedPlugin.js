function isIMEEquivalent(e, n) {
  return toHiragana(e) === toHiragana(addMissingNs(n), { IMEMode: !0 });
}
import getReadingsFromSubject from "lib/answer_checker/utils/get_readings_from_subject";
import { toHiragana } from "wanakana";
const missingNRegEx = /[^n]n$/g,
  missingNReplacer = (e) => e.replace("n", "nn"),
  addMissingNs = (e) => e.replaceAll(missingNRegEx, missingNReplacer),
  matchesReading = (e, n, a) =>
    "meaning" === n &&
    getReadingsFromSubject(e).some((e) => isIMEEquivalent(e, a)),
  matchesMeaning = (e, n, a) => {
    const t = a.toLowerCase();
    return "reading" === n && e.some((e) => t === e.toLowerCase());
  };
export default function checkTransliterated({
  questionType: e,
  response: n,
  item: a,
  result: t,
  inputChars: s,
  userSynonyms: i,
}) {
  if (t.passed) return null;
  let r = null;
  return (
    matchesReading(a, e, n) &&
      (r = "Oops, we want the meaning, not the reading."),
    matchesMeaning(a.meanings.concat(i), e, s) &&
      (r = "Oops, we want the reading, not the meaning."),
    r
  );
}

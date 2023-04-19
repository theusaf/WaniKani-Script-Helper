function isIMEEquivalent(e, n) {
  return toHiragana(e) === toHiragana(n, { IMEMode: !0 });
}
import getReadingsFromSubject from "lib/answer_checker/utils/get_readings_from_subject";
import { toHiragana } from "wanakana";
const matchesReading = (e, n, t) =>
    "meaning" === n &&
    getReadingsFromSubject(e).some((e) => isIMEEquivalent(e, t)),
  matchesMeaning = (e, n, t) => {
    const a = t.toLowerCase();
    return "reading" === n && e.some((e) => a === e.toLowerCase());
  };
export default function checkTransliterated({
  questionType: e,
  response: n,
  item: t,
  result: a,
  inputChars: r,
  userSynonyms: i,
}) {
  if (a.passed) return null;
  let s = null;
  return (
    matchesReading(t, e, n) &&
      (s = "Oops, we want the meaning, not the reading."),
    matchesMeaning(t.meanings.concat(i), e, r) &&
      (s = "Oops, we want the reading, not the meaning."),
    s
  );
}

function isIMEEquivalent(e, n) {
  return toHiragana(e) === toHiragana(n.replace(NsRegex, "n"));
}
import getReadingsFromSubject from "lib/answer_checker/utils/get_readings_from_subject";
import { toHiragana } from "wanakana";
const NsRegex = /nn/gi;
export default function checkTransliterated(e, n, a, t) {
  if ("meaning" === e && !t.passed) {
    if (getReadingsFromSubject(a).some((e) => isIMEEquivalent(e, n)))
      return "Oops, we want the meaning, not the reading.";
  }
  return null;
}

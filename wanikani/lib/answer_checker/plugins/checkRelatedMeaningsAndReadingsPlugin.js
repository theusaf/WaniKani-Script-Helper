import { toHiragana } from "wanakana";
const normalize = (a, n) =>
    "reading" === n ? toHiragana(a.trim()) : a.trim().toLowerCase(),
  extractMeanings = (a, n) => ((a && a[n]) || []).flatMap((a) => a.meanings),
  extractReadings = (a, n) => ((a && a[n]) || []).flatMap((a) => a.readings),
  hasPopulatedArray = (a, n) => a && a[n] && a[n].length > 0,
  normalizeArray = (a, n) => a.map((a) => normalize(a, n)),
  hasMatchingAnswers = (a, n, e) => -1 !== normalizeArray(a, n).indexOf(e),
  hasMatchingMeanings = (a, n, e) =>
    hasMatchingAnswers(extractMeanings(a, n), "meaning", e),
  hasMatchingReadings = (a, n, e) =>
    hasMatchingAnswers(extractReadings(a, n), "reading", e),
  shouldProcessRelatedMeaningsAndReadings = (a) =>
    hasPopulatedArray(a, "radicals") ||
    hasPopulatedArray(a, "kanji") ||
    hasPopulatedArray(a, "vocabulary"),
  messages = {
    Radical: {
      meaning: (a, n) =>
        hasMatchingMeanings(a, "kanji", n) &&
        "Oops, we want the radical meaning, not the kanji meaning.",
      reading: () => null,
    },
    Kanji: {
      meaning: (a, n) =>
        hasMatchingMeanings(a, "radicals", n)
          ? "Oops, we want the kanji meaning, not the radical meaning."
          : hasMatchingMeanings(a, "vocabulary", n) &&
            "Oops, we want the kanji meaning, not the vocabulary meaning.",
      reading: () => null,
    },
    Vocabulary: {
      meaning: (a, n) =>
        hasMatchingMeanings(a, "kanji", n) &&
        "Oops, we want the vocabulary meaning, not the kanji meaning.",
      reading: (a, n) =>
        hasMatchingReadings(a, "kanji", n) &&
        "Oops, we want the vocabulary reading, not the kanji reading.",
    },
  };
export default function checkRelatedMeaningsAndReadings({
  questionType: a,
  response: n,
  item: e,
}) {
  if (!shouldProcessRelatedMeaningsAndReadings(e)) return null;
  const i = normalize(n, a);
  return messages[e.type][a](e, i);
}

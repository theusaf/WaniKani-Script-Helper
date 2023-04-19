const matchesMeaning = (t, e) => {
    const s = e.substring(3).toLowerCase();
    return t.some((t) => s === t.toLowerCase());
  },
  shouldNotCheck = (t, e, s, o) =>
    t.passed ||
    "reading" === e ||
    "Kanji" !== s.type ||
    !o.toLowerCase().startsWith("to ");
export default function checkKanjiDoesNotStartWithTo({
  questionType: t,
  response: e,
  item: s,
  result: o,
}) {
  if (shouldNotCheck(o, t, s, e)) return null;
  let n = null;
  return (
    matchesMeaning(s.meanings, e) &&
      (n = 'This is a kanji, so it doesn\u2019t start with "to".'),
    n
  );
}

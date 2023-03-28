import { toHiragana } from "wanakana";
const normalize = (n, a) =>
  "reading" === a ? toHiragana(n.trim()) : n.trim().toLowerCase();
export default function checkSingleKanjiVocabPlugin(n, a, e) {
  if (!e.kanji) return null;
  return -1 !==
    e.kanji
      .reduce((a, e) => {
        const i = "meaning" === n ? e.meanings : e.readings;
        return a.concat(i.map((a) => normalize(a, n)));
      }, [])
      .indexOf(normalize(a, n))
    ? `Oops, we want the vocabulary ${n}, not the kanji ${n}.`
    : null;
}

import { stripOkurigana } from "wanakana";
const compareTos = (t, e) => {
  const s = t.toLowerCase();
  return s.startsWith("to ") && s.replace("to ", "") === e.toLowerCase();
};
export default function checkThatVerbStartsWithTo({
  questionType: t,
  response: e,
  item: s,
  result: a,
}) {
  if (
    !a.passed &&
    "meaning" === t &&
    s.meanings &&
    s.meanings.some((t) => t.toLowerCase().startsWith("to ")) &&
    !e.toLowerCase().startsWith("to ")
  ) {
    const t = s.meanings.find((t) => compareTos(t, e));
    if (t && s.characters) {
      const e = s.characters.replace(stripOkurigana(s.characters), "");
      return `Almost! It ends in ${
        e[e.length - 1]
      }, so it\u2019s a verb. Please type \u201c${t}\u201d.`;
    }
  }
  return null;
}

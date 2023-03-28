import { stripOkurigana } from "wanakana";
const compareTos = (t, e) => {
  const a = t.toLowerCase();
  return a.startsWith("to ") && a.replace("to ", "") === e.toLowerCase();
};
export default function checkThatVerbStartsWithTo(t, e, a, r) {
  if (
    !r.passed &&
    "meaning" === t &&
    a.meanings &&
    a.meanings.some((t) => t.toLowerCase().startsWith("to ")) &&
    !e.toLowerCase().startsWith("to ")
  ) {
    const t = a.meanings.find((t) => compareTos(t, e));
    if (t && a.characters) {
      const e = a.characters.replace(stripOkurigana(a.characters), "");
      return `Almost! It ends in ${
        e[e.length - 1]
      }, so it\u2019s a verb. Please type \u201c${t}\u201d.`;
    }
  }
  return null;
}

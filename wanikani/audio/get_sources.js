import { toHiragana } from "wanakana";
import { answerActionPass } from "lib/answer_checker/utils/constants";
const newSource = (e) => {
    const r = document.createElement("source");
    return (
      r.setAttribute("src", e.url),
      r.setAttribute("content_type", e.content_type),
      r
    );
  },
  getSources = ({
    subject: e,
    questionType: r,
    answer: t,
    results: n,
    preferredVoiceActorId: o,
  }) => {
    let a = [];
    if ("reading" === r && e.readings) {
      let r = n.action == answerActionPass ? t : e.readings[0].reading,
        s = e.readings.find((e) => e.reading === r);
      if (
        (s ||
          ((r = toHiragana(r, { convertLongVowelMark: !1 })),
          (s = e.readings.find((e) => e.reading === r))),
        s)
      ) {
        const e = s.pronunciations.find((e) => e.actor.id === o);
        e && (a = e.sources.map((e) => newSource(e)));
      }
    }
    return a;
  };
export { getSources };

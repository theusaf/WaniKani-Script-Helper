import { toHiragana } from "wanakana";
const newSource = (e) => {
    const audioSource = document.createElement("source");
    return (
      audioSource.setAttribute("src", e.url),
      audioSource.setAttribute("content_type", e.content_type),
      audioSource
    );
  },
  getSources = ({
    subject,
    questionType,
    answer,
    results,
    preferredVoiceActorId: preferredActor,
  }) => {
    let source = [];
    if ("reading" === questionType && subject.readings) {
      let reading = results.passed ? answer : subject.readings[0].reading,
        readingMatch = subject.readings.find((e) => e.reading === reading);
      if (
        (readingMatch ||
          ((reading = toHiragana(reading, { convertLongVowelMark: !1 })),
          (readingMatch = subject.readings.find((e) => e.reading === reading))),
        readingMatch)
      ) {
        const pronounciation = readingMatch.pronunciations.find(
          (e) => e.actor.id === preferredActor
        );
        pronounciation &&
          (source = pronounciation.sources.map((e) => newSource(e)));
      }
    }
    return source;
  };
export { getSources };

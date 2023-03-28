const getReadingsFromSubject = (e) => {
  switch (e.type) {
    case "Kanji":
      return e[e.primary_reading_type];
    case "Vocabulary":
      return e.readings.map((e) => e.reading);
    default:
      return [];
  }
};
export default getReadingsFromSubject;

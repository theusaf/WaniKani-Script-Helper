const getReadingsFromSubject = (subject) => {
  switch (subject.type) {
    case "Kanji":
      return subject[subject.primary_reading_type];
    case "Vocabulary":
      return subject.readings.map((e) => e.reading);
    default:
      return [];
  }
};
export default getReadingsFromSubject;

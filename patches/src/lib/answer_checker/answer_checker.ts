const TYPE_NAME_MAP = { onyomi: "on\u2019yomi", kunyomi: "kun\u2019yomi", nanori: "nanori" };

export function filterDigits(str: string): string[] {
  const match = str.match(/\d+/g);
  return match ? match.sort() : [];
}
export function hasDigits(str: string) {
  return filterDigits(str).length > 0;
}
export function digitsMatch(str1: string, str2: string) {
  return filterDigits(str1).toString() === filterDigits(str2).toString();
}
export function kanjiReadingChecker(reading: string, subject: Subject) {
  const readingTypes = ["kunyomi", "onyomi", "nanori"],
    whitelistedReadings = subject.auxiliary_readings
      .filter((reading) => reading.type === "whitelist")
      .map((reading) => reading.reading);
  let primaryReadings = subject[subject.primary_reading_type] as string[];
  primaryReadings = primaryReadings.concat(whitelistedReadings);
  const possibleAnswers: string[] = readingTypes
    .filter((type) => type !== subject.primary_reading_type)
    .reduce((acc, type) => acc.concat(subject[type as keyof typeof subject] as string[]), []),
    multipleAnswers = possibleAnswers.length > 0,
    wrongReadingFound = possibleAnswers.indexOf(reading) !== -1 && primaryReadings.indexOf(reading) === -1;
  return {
    passed: primaryReadings.indexOf(reading) !== -1,
    accurate: primaryReadings.indexOf(reading) !== -1,
    multipleAnswers,
    exception: wrongReadingFound && `WaniKani is looking for the ${TYPE_NAME_MAP[subject.primary_reading_type]} reading.`
  }
}
export function vocabularyReadingChecker(reading: string, subject: Subject) {
  let readings = subject.readings.map((reading) => reading.reading);
  const whitelistedReadings = subject.auxiliary_readings
    .filter((reading) => reading.type === "whitelist")
    .map((reading) => reading.reading);
  readings = readings.concat(whitelistedReadings);
  return {
    passed: readings.indexOf(reading) !== -1,
    accurate: readings.indexOf(reading) !== -1,
    multipleAnswers: subject.readings.length > 1,
    exception: false
  }
}

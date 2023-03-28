const getWarnList = (questionType, subject) =>
  (subject?.[`auxiliary_${questionType}s`] || []).filter(
    (t) => "warn" === t.type
  );
export default function checkWarningList(questionType, answer, subject) {
  const r = getWarnList(questionType, subject).find(
    (warnList) => warnList[questionType].toLowerCase() === answer.toLowerCase()
  );
  return r ? r.message : null;
}

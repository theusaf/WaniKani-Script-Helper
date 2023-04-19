const getWarnList = (e, t) =>
  (t?.[`auxiliary_${e}s`] || []).filter((e) => "warn" === e.type);
export default function checkWarningList({
  questionType: e,
  response: t,
  item: n,
}) {
  const s = getWarnList(e, n).find(
    (n) => n[e].toLowerCase() === t.toLowerCase()
  );
  return s ? s.message : null;
}

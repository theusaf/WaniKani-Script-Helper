const getWarnList = (t, e) =>
  (e?.[`auxiliary_${t}s`] || []).filter((t) => "warn" === t.type);
export default function checkWarningList(t, e, n) {
  const r = getWarnList(t, n).find(
    (n) => n[t].toLowerCase() === e.toLowerCase()
  );
  return r ? r.message : null;
}

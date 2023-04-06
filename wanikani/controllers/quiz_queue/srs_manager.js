import DidChangeSRSEvent from "events/did_change_srs_event";
export default class SRSManager {
  static textForLevel(e) {
    switch (!0) {
      case e > 0 && e <= 4:
        return "Apprentice";
      case 5 === e || 6 === e:
        return "Guru";
      case 7 === e:
        return "Master";
      case 8 === e:
        return "Enlighten";
      case 9 === e:
        return "Burn";
      default:
        return e;
    }
  }
  constructor(e) {
    this.srsMap = e;
  }
  updateSRS({ subject: e, stats: t }) {
    if (!this.srsMap.has(e.id)) return;
    const n = this.srsMap.get(e.id),
      r = t.meaning.incorrect + t.reading.incorrect;
    if (0 === r)
      window.dispatchEvent(
        new DidChangeSRSEvent({
          wentUp: !0,
          newLevelText: SRSManager.textForLevel(n + 1),
        })
      );
    else {
      const e = n >= 5 ? 2 : 1,
        t = Math.max(1, n - e * Math.round(r / 2));
      window.dispatchEvent(
        new DidChangeSRSEvent({
          wentUp: !1,
          newLevelText: SRSManager.textForLevel(t),
        })
      );
    }
  }
}

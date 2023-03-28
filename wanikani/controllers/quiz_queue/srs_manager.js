import DidChangeSRSEvent from "events/did_change_srs_event";
export default class SRSManager {
  srsMap;
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
  constructor(srsMap) {
    this.srsMap = srsMap;
  }
  updateSRS({ subject: subject, stats: stats }) {
    if (!this.srsMap.has(subject.id)) return;
    const srsLevel = this.srsMap.get(subject.id),
      totalIncorrect = stats.meaning.incorrect + stats.reading.incorrect;
    if (0 === totalIncorrect)
      console.log(srsLevel, SRSManager.textForLevel(srsLevel + 1)),
        window.dispatchEvent(
          new DidChangeSRSEvent({
            wentUp: !0,
            newLevelText: SRSManager.textForLevel(srsLevel + 1),
          })
        );
    else {
      const resetLevel = srsLevel >= 5 ? 2 : 1,
        newLevel = Math.max(
          1,
          srsLevel - resetLevel * Math.round(totalIncorrect / 2)
        );
      window.dispatchEvent(
        new DidChangeSRSEvent({
          wentUp: !1,
          newLevelText: SRSManager.textForLevel(newLevel),
        })
      );
    }
  }
}

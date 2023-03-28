import { Controller } from "@hotwired/stimulus";
const UPDATE_RATE = 6e4,
  MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  REVIEW_DATE_WORDS = {
    seconds: "< 1 minute",
    minute: "1 minute",
    minutes: "%d minutes",
    hour: "~1 hour",
    hours: "about %d hours",
    day: "a day",
    days: "%d days",
    month: "~1 month",
    months: "%d months",
    year: "~1 year",
    years: "%d years",
  };
export default class extends Controller {
  static values = { format: String };
  connect() {
    if (
      ((this.date = new Date(this.element.getAttribute("datetime"))),
      "next-review" === this.formatValue)
    )
      this.formatNextReviewDate();
    else this.formatDate();
  }
  disconnect() {
    clearTimeout(this.timerId);
  }
  formatDate() {
    const e = `${
      MONTHS[this.date.getMonth()]
    } ${this.date.getDate()}, ${this.date.getFullYear()}`;
    this.element.textContent = e;
  }
  formatNextReviewDate() {
    const e = this.date - new Date();
    if (e <= 0) return void (this.element.textContent = "Available Now");
    const t = this.wordsFromTimeOffest(e);
    (this.element.textContent = t),
      (this.timerId = setTimeout(
        () => this.formatNextReviewDate(),
        UPDATE_RATE
      ));
  }
  wordsFromTimeOffest(e) {
    const {
      seconds: t,
      minutes: r,
      hours: a,
      days: s,
      years: n,
    } = this.timePartsFromTimeOffest(e);
    switch (!0) {
      case t < 45:
        return REVIEW_DATE_WORDS.seconds.replace(/%d/i, Math.round(t));
      case t < 90:
        return REVIEW_DATE_WORDS.minute.replace(/%d/i, 1);
      case r < 45:
        return REVIEW_DATE_WORDS.minutes.replace(/%d/i, Math.round(r));
      case r < 90:
        return REVIEW_DATE_WORDS.hour.replace(/%d/i, 1);
      case a < 24:
        return REVIEW_DATE_WORDS.hours.replace(/%d/i, Math.round(a));
      case a < 42:
        return REVIEW_DATE_WORDS.day.replace(/%d/i, 1);
      case s < 30:
        return REVIEW_DATE_WORDS.days.replace(/%d/i, Math.round(s));
      case s < 45:
        return REVIEW_DATE_WORDS.month.replace(/%d/i, 1);
      case s < 365:
        return REVIEW_DATE_WORDS.months.replace(/%d/i, Math.round(s / 30));
      case n < 1.5:
        return REVIEW_DATE_WORDS.year.replace(/%d/i, 1);
      default:
        return REVIEW_DATE_WORDS.years.replace(/%d/i, Math.round(n));
    }
  }
  timePartsFromTimeOffest(e) {
    const t = Math.abs(e) / 1e3,
      r = t / 60,
      a = r / 60,
      s = a / 24;
    return { seconds: t, minutes: r, hours: a, days: s, years: s / 365 };
  }
}

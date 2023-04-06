import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static classes = ["toggleDisabled", "exceptionHidden"];
  static targets = ["toggle", "exception"];
  static values = { autoOpenAfterIncorrectCount: Number };
  initialize() {
    (this.urlTemplate = this.toggleTarget.getAttribute("href")),
      (this.enable = this.enable.bind(this)),
      (this.disable = this.disable.bind(this));
  }
  connect() {
    window.addEventListener("willShowNextQuestion", this.disable),
      window.addEventListener("didAnswerQuestion", this.enable);
  }
  disconnect() {
    window.removeEventListener("willShowNextQuestion", this.disable),
      window.removeEventListener("didAnswerQuestion", this.enable);
  }
  enable(e) {
    const { subjectWithStats: t, questionType: s, results: i } = e.detail;
    if (
      (this.showException(s, i),
      this.toggleTarget.classList.remove(this.toggleDisabledClass),
      this.toggleTarget.setAttribute(
        "href",
        this.urlTemplate.replace(":id", t.subject.id)
      ),
      this.autoOpenAfterIncorrectCountValue > 0)
    ) {
      const { meaning: t, reading: s } = e.detail.subjectWithStats.stats;
      !i.passed &&
        (t.incorrect >= this.autoOpenAfterIncorrectCountValue ||
          s.incorrect >= this.autoOpenAfterIncorrectCountValue) &&
        this.toggleTarget.click();
    }
  }
  disable() {
    this.hideException(),
      this.toggleTarget.classList.add(this.toggleDisabledClass);
  }
  showException(e, t) {
    let s = "";
    t.passed
      ? t.passed && t.accurate && t.multipleAnswers
        ? (s = `Did you know this item has multiple possible ${e}s?`)
        : t.passed &&
          !t.accurate &&
          (s = `Your answer was a bit off. Check the ${e} to make sure you are correct.`)
      : (s = `Need help? View the correct ${e} and mnemonic.`),
      (this.exceptionTarget.textContent = s),
      this.exceptionTarget.classList.toggle(
        this.exceptionHiddenClass,
        "" === s
      );
  }
  hideException() {
    (this.exceptionTarget.textContent = ""),
      this.exceptionTarget.classList.add(this.exceptionHiddenClass);
  }
}

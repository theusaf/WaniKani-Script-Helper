import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static classes = ["toggleDisabled", "exceptionHidden"];
  static targets = ["toggle", "exception"];
  static values = { autoOpenAfterIncorrectCount: Number };
  initialize() {
    this.urlTemplate = this.toggleTarget.getAttribute("href");
  }
  connect() {
    window.addEventListener("willShowNextQuestion", this.disable),
      window.addEventListener("didAnswerQuestion", this.enable);
  }
  disconnect() {
    window.removeEventListener("willShowNextQuestion", this.disable),
      window.removeEventListener("didAnswerQuestion", this.enable);
  }
  enable = (e) => {
    const {
      subjectWithStats: stats,
      questionType: questionType,
      results: results,
    } = e.detail;
    if (
      (this.showException(questionType, results),
      this.toggleTarget.classList.remove(this.toggleDisabledClass),
      this.toggleTarget.setAttribute(
        "href",
        this.urlTemplate.replace(":id", stats.subject.id)
      ),
      this.autoOpenAfterIncorrectCountValue > 0)
    ) {
      const { meaning: t, reading: s } = e.detail.subjectWithStats.stats;
      !results.passed &&
        (t.incorrect >= this.autoOpenAfterIncorrectCountValue ||
          s.incorrect >= this.autoOpenAfterIncorrectCountValue) &&
        this.toggleTarget.click();
    }
  };
  disable = () => {
    this.hideException(),
      this.toggleTarget.classList.add(this.toggleDisabledClass);
  };
  showException(type, results) {
    let s = "";
    results.passed
      ? results.passed && results.accurate && results.multipleAnswers
        ? (s = `Did you know this item has multiple possible ${type}s?`)
        : results.passed &&
          !results.accurate &&
          (s = `Your answer was a bit off. Check the ${type} to make sure you are correct.`)
      : (s = `Need help? View the correct ${type} and mnemonic.`),
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

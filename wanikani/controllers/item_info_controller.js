import { Controller } from "@hotwired/stimulus";
import { itemInfoException } from "lib/answer_checker/utils/constants";
import { answerActionFail } from "lib/answer_checker/utils/constants";
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
  enable(t) {
    const { subjectWithStats: e, results: i } = t.detail;
    if (
      (this.showException(i),
      this.toggleTarget.classList.remove(this.toggleDisabledClass),
      this.toggleTarget.setAttribute(
        "href",
        this.urlTemplate.replace(":id", e.subject.id)
      ),
      this.autoOpenAfterIncorrectCountValue > 0)
    ) {
      const { meaning: e, reading: s } = t.detail.subjectWithStats.stats;
      i.action === answerActionFail &&
        (e.incorrect >= this.autoOpenAfterIncorrectCountValue ||
          s.incorrect >= this.autoOpenAfterIncorrectCountValue) &&
        this.toggleTarget.click();
    }
  }
  disable() {
    this.hideException(),
      this.toggleTarget.classList.add(this.toggleDisabledClass);
  }
  showException(t) {
    t.message &&
      t.message.type === itemInfoException &&
      ((this.exceptionTarget.textContent = t.message.text),
      this.exceptionTarget.classList.remove(this.exceptionHiddenClass));
  }
  hideException() {
    (this.exceptionTarget.textContent = ""),
      this.exceptionTarget.classList.add(this.exceptionHiddenClass);
  }
}

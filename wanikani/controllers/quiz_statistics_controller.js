import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["percentCorrect", "completeCount", "remainingCount"];
  initialize() {
    (this.answeredCount = 0),
      (this.incorrectCount = 0),
      (this.completedCount = 0),
      (this.remainingCount = 0),
      (this.subjectCompleted = this.subjectCompleted.bind(this)),
      (this.didAnswerQuestion = this.didAnswerQuestion.bind(this));
  }
  connect() {
    (this.remainingCount = +this.remainingCountTarget.innerText),
      window.addEventListener("didCompleteSubject", this.subjectCompleted),
      window.addEventListener("didAnswerQuestion", this.didAnswerQuestion);
  }
  disconnect() {
    window.removeEventListener("didCompleteSubject", this.subjectCompleted),
      window.removeEventListener("didAnswerQuestion", this.didAnswerQuestion);
  }
  subjectCompleted() {
    (this.completedCount += 1),
      (this.remainingCount -= 1),
      (this.completeCountTarget.innerText = this.completedCount),
      (this.remainingCountTarget.innerText = this.remainingCount);
  }
  didAnswerQuestion({ detail: { results: t } }) {
    t.passed || (this.incorrectCount += 1), (this.answeredCount += 1);
    const e = Math.round(
      (100 * (this.answeredCount - this.incorrectCount)) / this.answeredCount
    );
    this.percentCorrectTarget.innerText = `${e}%`;
  }
}

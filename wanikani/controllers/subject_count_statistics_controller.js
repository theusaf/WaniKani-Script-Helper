import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["count"];
  initialize() {
    this.subjectCompleted = this.subjectCompleted.bind(this);
  }
  connect() {
    window.addEventListener("didCompleteSubject", this.subjectCompleted);
  }
  disconnect() {
    window.removeEventListener("didCompleteSubject", this.subjectCompleted);
  }
  subjectCompleted({ detail: { subjectWithStats: t } }) {
    const e = t.subject.subject_category,
      s = this.countTargets.find((t) => t.dataset.category === e);
    if (s) {
      const t = +s.innerText;
      s.innerText = Math.max(0, t - 1);
    }
  }
}

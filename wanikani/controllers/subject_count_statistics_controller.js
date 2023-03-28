import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["count"];
  connect() {
    window.addEventListener("didCompleteSubject", this.subjectCompleted);
  }
  disconnect() {
    window.removeEventListener("didCompleteSubject", this.subjectCompleted);
  }
  subjectCompleted = ({ detail: { subjectWithStats: t } }) => {
    const e = t.subject.subject_category,
      o = this.countTargets.find((t) => t.dataset.category === e);
    if (o) {
      const t = +o.innerText;
      o.innerText = Math.max(0, t - 1);
    }
  };
}

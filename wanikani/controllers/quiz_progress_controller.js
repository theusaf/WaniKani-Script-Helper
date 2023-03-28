import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["bar"];
  connect() {
    window.addEventListener("updateQuizProgress", this.updateProgress);
  }
  disconnect() {
    window.removeEventListener("updateQuizProgress", this.updateProgress);
  }
  updateProgress = ({ detail: { percentComplete: e } }) => {
    this.barTarget.style.width = `${Math.min(100, Math.max(e, 0))}%`;
  };
}

import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["percentCorrect", "completeCount", "remainingCount"];
  #e = 0;
  #t = 0;
  #n = 0;
  #i;
  connect() {
    (this.#i = +this.remainingCountTarget.innerText),
      window.addEventListener("didCompleteSubject", this.#o),
      window.addEventListener("didAnswerQuestion", this.#r);
  }
  disconnect() {
    window.removeEventListener("didCompleteSubject", this.#o),
      window.removeEventListener("didAnswerQuestion", this.#r);
  }
  #o = () => {
    (this.#n += 1),
      (this.#i -= 1),
      (this.completeCountTarget.innerText = this.#n),
      (this.remainingCountTarget.innerText = this.#i);
  };
  #r = ({ detail: { results: e } }) => {
    e.passed || (this.#t += 1), (this.#e += 1);
    const t = Math.round((100 * (this.#e - this.#t)) / this.#e);
    this.percentCorrectTarget.innerText = `${t}%`;
  };
}

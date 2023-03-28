import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["synonyms"];
  #t;
  initialize() {
    this.#t = JSON.parse(this.synonymsTarget.innerText);
  }
  connect() {
    window.addEventListener("didUpdateUserSynonyms", this.#n);
  }
  disconnect() {
    window.removeEventListener("didUpdateUserSynonyms", this.#n);
  }
  #n = (t) => {
    const { subjectId: n, synonyms: e } = t.detail;
    this.#t[n] = e;
  };
  synonymsForSubjectId(t) {
    return this.#t[t] || [];
  }
}

import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["synonyms"];
  initialize() {
    (this.updateSynonyms = this.updateSynonyms.bind(this)),
      (this.synonyms = JSON.parse(this.synonymsTarget.innerText));
  }
  connect() {
    window.addEventListener("didUpdateUserSynonyms", this.updateSynonyms);
  }
  disconnect() {
    window.removeEventListener("didUpdateUserSynonyms", this.updateSynonyms);
  }
  updateSynonyms(n) {
    const { subjectId: s, synonyms: t } = n.detail;
    this.synonyms[s] = t;
  }
  synonymsForSubjectId(n) {
    return this.synonyms[n] || [];
  }
}

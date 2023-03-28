import { Controller } from "@hotwired/stimulus";
import DidUpdateUserSynonymsEvent from "events/did_update_user_synonyms";
export default class extends Controller {
  static targets = ["synonym"];
  static values = { subjectId: Number };
  connect() {
    const t = this.subjectIdValue,
      s = this.synonymTargets.map((t) => t.dataset.synonym);
    window.dispatchEvent(
      new DidUpdateUserSynonymsEvent({ subjectId: t, synonyms: s })
    );
  }
}

import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  connect() {
    window.addEventListener("connectionTimeout", this.showConnectionTimeout),
      (this.element.dataset.loaded = !0);
  }
  disconnect() {
    window.removeEventListener("connectionTimeout", this.showConnectionTimeout),
      (this.element.dataset.loaded = !1);
  }
  showConnectionTimeout = () => {
    (this.element.hidden = !1), this.dispatch("open");
  };
}

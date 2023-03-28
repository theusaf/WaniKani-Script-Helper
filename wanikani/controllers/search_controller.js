import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static values = { connected: Boolean };
  static classes = ["open"];
  static targets = ["searchForm", "toggle", "input"];
  connect() {
    this.connectedValue = !0;
  }
  disconnect() {
    this.connectedValue = !1;
  }
  toggle() {
    this.searchFormTarget.classList.toggle(this.openClass);
    const t = this.searchFormTarget.classList.contains(this.openClass);
    this.toggleTargets.forEach((s) => s.setAttribute("aria-expanded", t)),
      t &&
        (window.scroll(0, 0),
        this.inputTarget.focus(),
        this.inputTarget.select());
  }
}

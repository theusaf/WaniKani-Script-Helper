import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static classes = ["menuOpen"];
  connect() {
    const e = this.element.dataset.hotkey;
    e &&
      (window.keyboardManager.registerHotKey({ key: e, callback: this.#e }),
      (this.element.dataset.hotkeyRegistered = !0));
  }
  disconnect() {
    const e = this.element.dataset.hotkey;
    e &&
      (window.keyboardManager.deregisterHotKey({ key: e, callback: this.#e }),
      (this.element.dataset.hotkeyRegistered = !1));
  }
  #e = () => {
    this.element.click();
  };
  toggleMenu() {
    this.element.classList.toggle(this.menuOpenClass);
  }
}

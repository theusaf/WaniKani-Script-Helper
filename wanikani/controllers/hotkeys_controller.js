import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static classes = ["menuOpen"];
  initialize() {
    this.onHotkey = () => {
      this.element.click();
    };
  }
  connect() {
    const e = this.element.dataset.hotkey;
    e &&
      (window.keyboardManager.registerHotKey({
        key: e,
        callback: this.onHotkey,
      }),
      (this.element.dataset.hotkeyRegistered = !0));
  }
  disconnect() {
    const e = this.element.dataset.hotkey;
    e &&
      (window.keyboardManager.deregisterHotKey({
        key: e,
        callback: this.onHotkey,
      }),
      (this.element.dataset.hotkeyRegistered = !1));
  }
  toggleMenu() {
    this.element.classList.toggle(this.menuOpenClass);
  }
}

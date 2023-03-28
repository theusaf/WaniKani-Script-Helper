import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["tab", "content"];
  static values = { nextTabHotkey: String, previousTabHotkey: String };
  #e;
  connect() {
    (this.#e = new IntersectionObserver(this.#t)),
      this.#e.observe(this.element);
  }
  disconnect() {
    this.#e.disconnect(), this.#s();
  }
  changeTab(e) {
    e.preventDefault(), e.stopPropagation();
    const t = e.currentTarget.getAttribute("href");
    this.#a(t);
  }
  #a = (e) => {
    const t = e.slice(1);
    this.contentTargets.find((e) => e.id === t) &&
      (this.contentTargets.forEach((e) => {
        e.hidden = e.id !== t;
      }),
      this.tabTargets.forEach((t) => {
        t.getAttribute("href") === e
          ? t.setAttribute("aria-selected", !0)
          : t.removeAttribute("aria-selected");
      }));
  };
  #t = (e) => {
    e[0].isIntersecting ? this.#i() : this.#s();
  };
  #i = () => {
    this.hasNextTabHotkeyValue &&
      window.keyboardManager.registerHotKey({
        key: this.nextTabHotkeyValue,
        callback: this.#r,
      }),
      this.hasPreviousTabHotkeyValue &&
        window.keyboardManager.registerHotKey({
          key: this.previousTabHotkeyValue,
          callback: this.#o,
        }),
      (this.element.dataset.hotkeyRegistered = !0);
  };
  #s = () => {
    this.hasNextTabHotkeyValue &&
      window.keyboardManager.deregisterHotKey({
        key: this.nextTabHotkeyValue,
        callback: this.#r,
      }),
      this.hasPreviousTabHotkeyValue &&
        window.keyboardManager.deregisterHotKey({
          key: this.previousTabHotkeyValue,
          callback: this.#o,
        }),
      (this.element.dataset.hotkeyRegistered = !1);
  };
  #r = () => {
    const e = this.tabTargets.findIndex((e) => e.hasAttribute("aria-selected")),
      t = e + 1 >= this.tabTargets.length ? 0 : e + 1;
    this.tabTargets[t].click();
  };
  #o = () => {
    const e = this.tabTargets.findIndex((e) => e.hasAttribute("aria-selected")),
      t = e - 1 < 0 ? this.tabTargets.length - 1 : e - 1;
    this.tabTargets[t].click();
  };
}

import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["tab", "content"];
  static values = { nextTabHotkey: String, previousTabHotkey: String };
  initialize() {
    (this.visibilityChange = this.visibilityChange.bind(this)),
      (this.handleNext = this.handleNext.bind(this)),
      (this.handlePrev = this.handlePrev.bind(this));
  }
  connect() {
    (this.observer = new IntersectionObserver(this.visibilityChange)),
      this.observer.observe(this.element);
  }
  disconnect() {
    this.observer.disconnect(), this.deregisterHotKeys();
  }
  changeTab(e) {
    e.preventDefault(), e.stopPropagation();
    const t = e.currentTarget.getAttribute("href");
    this.showContent(t);
  }
  showContent(e) {
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
  }
  visibilityChange(e) {
    e[0].isIntersecting ? this.registerHotKeys() : this.deregisterHotKeys();
  }
  registerHotKeys() {
    this.hasNextTabHotkeyValue &&
      window.keyboardManager.registerHotKey({
        key: this.nextTabHotkeyValue,
        callback: this.handleNext,
      }),
      this.hasPreviousTabHotkeyValue &&
        window.keyboardManager.registerHotKey({
          key: this.previousTabHotkeyValue,
          callback: this.handlePrev,
        }),
      (this.element.dataset.hotkeyRegistered = !0);
  }
  deregisterHotKeys() {
    this.hasNextTabHotkeyValue &&
      window.keyboardManager.deregisterHotKey({
        key: this.nextTabHotkeyValue,
        callback: this.handleNext,
      }),
      this.hasPreviousTabHotkeyValue &&
        window.keyboardManager.deregisterHotKey({
          key: this.previousTabHotkeyValue,
          callback: this.handlePrev,
        }),
      (this.element.dataset.hotkeyRegistered = !1);
  }
  handleNext() {
    const e = this.tabTargets.findIndex((e) => e.hasAttribute("aria-selected")),
      t = e + 1 >= this.tabTargets.length ? 0 : e + 1;
    this.tabTargets[t].click();
  }
  handlePrev() {
    const e = this.tabTargets.findIndex((e) => e.hasAttribute("aria-selected")),
      t = e - 1 < 0 ? this.tabTargets.length - 1 : e - 1;
    this.tabTargets[t].click();
  }
}

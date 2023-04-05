import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["button"];
  initialize() {
    this.handleTab = this.handleTab.bind(this);
  }
  connect() {
    window.keyboardManager.setModalMode(),
      this.registerHotKeys(),
      this.resetFocus();
  }
  disconnect() {
    window.keyboardManager.clearModalMode();
  }
  resetFocus() {
    (this.currentTabIndex = this.buttonTargets.findIndex(
      (t) => "true" === t.dataset.default
    )),
      this.buttonTargets[this.currentTabIndex].firstElementChild.focus();
  }
  handleTab(t) {
    t.stopPropagation(),
      t.preventDefault(),
      ++this.currentTabIndex >= this.buttonTargets.length &&
        (this.currentTabIndex = 0),
      this.buttonTargets[this.currentTabIndex].firstElementChild.focus();
  }
  registerHotKeys() {
    window.keyboardManager.registerHotKey({
      key: "Tab",
      callback: this.handleTab,
    }),
      this.buttonTargets.forEach((t) => {
        const e = t.firstElementChild,
          a = JSON.parse(e.dataset.hotkeys),
          r = () => e.click();
        a.forEach((t) =>
          window.keyboardManager.registerHotKey({ key: t, callback: r })
        );
      });
  }
}

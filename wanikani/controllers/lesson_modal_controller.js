import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  #t;
  static targets = ["button"];
  connect() {
    window.keyboardManager.setModalMode(), this.#e(), this.#r();
  }
  disconnect() {
    window.keyboardManager.clearModalMode();
  }
  #r = () => {
    (this.#t = this.buttonTargets.findIndex(
      (t) => "true" === t.dataset.default
    )),
      this.buttonTargets[this.#t].firstElementChild.focus();
  };
  #a = (t) => {
    t.stopPropagation(),
      t.preventDefault(),
      ++this.#t >= this.buttonTargets.length && (this.#t = 0),
      this.buttonTargets[this.#t].firstElementChild.focus();
  };
  #e = () => {
    window.keyboardManager.registerHotKey({ key: "Tab", callback: this.#a }),
      this.buttonTargets.forEach((t) => {
        const e = t.firstElementChild,
          r = JSON.parse(e.dataset.hotkeys),
          a = () => e.click();
        r.forEach((t) =>
          window.keyboardManager.registerHotKey({ key: t, callback: a })
        );
      });
  };
}

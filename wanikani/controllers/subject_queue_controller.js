import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["item"];
  connect() {
    const e = this.element.dataset.skipHotKey;
    e &&
      (window.keyboardManager.registerHotKey({ key: e, callback: this.#e }),
      (this.element.dataset.hotkeyRegistered = !0)),
      this.itemTargets.forEach((e) => {
        const t = e.firstElementChild;
        (t.hotkeys = JSON.parse(t.dataset.hotkeys || "[]")),
          t.hotkeys.length > 0 &&
            ((t.hotKeyCallback = () => t.click()),
            t.hotkeys.forEach((e) =>
              window.keyboardManager.registerHotKey({
                key: e,
                callback: t.hotKeyCallback,
              })
            ),
            (t.dataset.hotkeyRegistered = !0));
      });
  }
  disconnect() {
    const e = this.element.dataset.skipHotKey;
    e &&
      (window.keyboardManager.deregisterHotKey({ key: e, callback: this.#e }),
      (this.element.dataset.hotkeyRegistered = !1)),
      this.itemTargets.forEach((e) => {
        const t = e.firstElementChild;
        t.hotKeyCallback &&
          (t.hotkeys.forEach((e) =>
            window.keyboardManager.deregisterHotKey({
              key: e,
              callback: t.hotKeyCallback,
            })
          ),
          (t.dataset.hotkeyRegistered = !1));
      });
  }
  #e = () => {
    const e = new RegExp(window.location.pathname),
      t = this.itemTargets.findIndex((t) =>
        e.test(t.firstElementChild.getAttribute("href"))
      );
    this.itemTargets[t + 1].firstElementChild.click();
  };
}

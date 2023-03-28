import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["slide", "navigationItem"];
  static outlets = ["audio-player"];
  #e;
  connect() {
    window.location.hash && this.#t(window.location.hash, !1),
      window.keyboardManager.registerHotKey({
        key: "Right",
        callback: this.#a,
      }),
      window.keyboardManager.registerHotKey({
        key: "ArrowRight",
        callback: this.#a,
      }),
      window.keyboardManager.registerHotKey({ key: "d", callback: this.#a }),
      window.keyboardManager.registerHotKey({ key: "Left", callback: this.#i }),
      window.keyboardManager.registerHotKey({
        key: "ArrowLeft",
        callback: this.#i,
      }),
      window.keyboardManager.registerHotKey({ key: "a", callback: this.#i }),
      this.element.addEventListener("touchstart", this.#s),
      this.element.addEventListener("touchmove", this.#h),
      this.element.addEventListener("touchend", this.#r),
      this.element.addEventListener("touchcancel", this.#n),
      document.addEventListener("turbo:before-cache", this.#o),
      window.addEventListener("hashchange", this.#d),
      (this.element.dataset.hotkeyRegistered = !0);
  }
  disconnect() {
    window.keyboardManager.deregisterHotKey({
      key: "Right",
      callback: this.#a,
    }),
      window.keyboardManager.deregisterHotKey({
        key: "ArrowRight",
        callback: this.#a,
      }),
      window.keyboardManager.deregisterHotKey({ key: "d", callback: this.#a }),
      window.keyboardManager.deregisterHotKey({
        key: "Left",
        callback: this.#i,
      }),
      window.keyboardManager.deregisterHotKey({
        key: "ArrowLeft",
        callback: this.#i,
      }),
      window.keyboardManager.deregisterHotKey({ key: "a", callback: this.#i }),
      this.element.removeEventListener("touchstart", this.#s),
      this.element.removeEventListener("touchmove", this.#h),
      this.element.removeEventListener("touchend", this.#r),
      this.element.removeEventListener("touchcancel", this.#n),
      document.removeEventListener("turbo:before-cache", this.#o),
      window.removeEventListener("hashchange", this.#d),
      (this.element.dataset.hotkeyRegistered = !1);
  }
  #o = () => {
    this.#t(`#${this.slideTargets[0].id}`, !1);
  };
  #d = (e) => {
    let t = new URL(e.newURL).hash;
    "" === t && (t = `#${this.slideTargets[0].id}`), this.#t(t, !1);
  };
  switchSlide(e) {
    const t = e.currentTarget.getAttribute("href");
    t.startsWith("#") && this.#t(t, !0);
  }
  #t(e, t) {
    const a = e.slice(1);
    this.slideTargets.find((e) => e.id === a) &&
      (this.slideTargets.forEach((e) => {
        (e.hidden = e.id !== a),
          t &&
            !e.hidden &&
            this.hasAudioPlayerOutlet &&
            e.contains(this.audioPlayerOutlet.element) &&
            this.audioPlayerOutlet.play();
      }),
      this.navigationItemTargets.forEach((t) => {
        t.getAttribute("href") === e
          ? t.setAttribute("aria-selected", !0)
          : t.removeAttribute("aria-selected");
      }),
      window.scrollTo(0, 0));
  }
  #a = () => {
    this.slideTargets
      .find((e) => !e.hidden)
      .querySelector('[data-subject-slides-target="nextButton"]')
      .click();
  };
  #i = () => {
    this.slideTargets
      .find((e) => !e.hidden)
      .querySelector('[data-subject-slides-target="prevButton"]')
      .click();
  };
  #s = ({ touches: e }) => {
    (this.#e =
      e.length > 1 ? null : { touch: e[0], startTime: performance.now() }),
      this.#e || this.#n();
  };
  #h = ({ touches: e }) => {
    if (this.#e) {
      const t = e[0].screenX - this.#e.touch.screenX,
        a = this.slideTargets.find((e) => !e.hidden),
        i = Math.floor(t / 8);
      i < -5
        ? (a.dataset.willNavigate = "right")
        : i > 5
        ? (a.dataset.willNavigate = "left")
        : delete a.dataset.willNavigate,
        (a.style.transform = `translateX(${i}px)`);
    }
  };
  #r = () => {
    if (this.#e) {
      const e = this.slideTargets.find((e) => !e.hidden);
      (e.style.transform = ""),
        "left" === e.dataset.willNavigate && this.#i(),
        "right" === e.dataset.willNavigate && this.#a(),
        delete e.dataset.willNavigate,
        (this.#e = null);
    }
  };
  #n = () => {
    const e = this.slideTargets.find((e) => !e.hidden);
    (this.#e = null), delete e.dataset.willNavigate, (e.style.transform = "");
  };
}

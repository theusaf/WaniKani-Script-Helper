import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["slide", "navigationItem"];
  static outlets = ["audio-player"];
  initialize() {
    (this.handleNext = this.handleNext.bind(this)),
      (this.handlePrev = this.handlePrev.bind(this)),
      (this.beforeCache = this.beforeCache.bind(this)),
      (this.hashChanged = this.hashChanged.bind(this));
  }
  connect() {
    window.location.hash && this.showSlide(window.location.hash, !1),
      window.keyboardManager.registerHotKey({
        key: "Right",
        callback: this.handleNext,
      }),
      window.keyboardManager.registerHotKey({
        key: "ArrowRight",
        callback: this.handleNext,
      }),
      window.keyboardManager.registerHotKey({
        key: "d",
        callback: this.handleNext,
      }),
      window.keyboardManager.registerHotKey({
        key: "Left",
        callback: this.handlePrev,
      }),
      window.keyboardManager.registerHotKey({
        key: "ArrowLeft",
        callback: this.handlePrev,
      }),
      window.keyboardManager.registerHotKey({
        key: "a",
        callback: this.handlePrev,
      }),
      document.addEventListener("turbo:before-cache", this.beforeCache),
      window.addEventListener("hashchange", this.hashChanged),
      (this.element.dataset.hotkeyRegistered = !0);
  }
  disconnect() {
    window.keyboardManager.deregisterHotKey({
      key: "Right",
      callback: this.handleNext,
    }),
      window.keyboardManager.deregisterHotKey({
        key: "ArrowRight",
        callback: this.handleNext,
      }),
      window.keyboardManager.deregisterHotKey({
        key: "d",
        callback: this.handleNext,
      }),
      window.keyboardManager.deregisterHotKey({
        key: "Left",
        callback: this.handlePrev,
      }),
      window.keyboardManager.deregisterHotKey({
        key: "ArrowLeft",
        callback: this.handlePrev,
      }),
      window.keyboardManager.deregisterHotKey({
        key: "a",
        callback: this.handlePrev,
      }),
      document.removeEventListener("turbo:before-cache", this.beforeCache),
      window.removeEventListener("hashchange", this.hashChanged),
      (this.element.dataset.hotkeyRegistered = !1);
  }
  beforeCache() {
    this.showSlide(`#${this.slideTargets[0].id}`, !1);
  }
  hashChanged(e) {
    let t = new URL(e.newURL).hash;
    "" === t && (t = `#${this.slideTargets[0].id}`), this.showSlide(t, !1);
  }
  switchSlide(e) {
    const t = e.currentTarget.getAttribute("href");
    t.startsWith("#") && this.showSlide(t, !0);
  }
  showSlide(e, show) {
    const slideId = e.slice(1);
    this.slideTargets.find((e) => e.id === slideId) &&
      (this.slideTargets.forEach((e) => {
        (e.hidden = e.id !== slideId),
          show &&
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
  handleNext() {
    this.slideTargets
      .find((e) => !e.hidden)
      .querySelector('[data-subject-slides-target="nextButton"]')
      .click();
  }
  handlePrev() {
    this.slideTargets
      .find((e) => !e.hidden)
      .querySelector('[data-subject-slides-target="prevButton"]')
      .click();
  }
}

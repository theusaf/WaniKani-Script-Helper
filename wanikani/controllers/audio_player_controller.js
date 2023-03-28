import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["audio", "control"];
  static classes = ["playing", "stopped"];
  static values = { autoPlay: Boolean };
  #t;
  initialize() {
    (this.playing = !1), this.audioTarget.addEventListener("ended", this.stop);
  }
  connect() {
    (this.#t = new IntersectionObserver(this.#e)),
      this.#t.observe(this.element);
  }
  disconnect() {
    this.stop();
  }
  play = (t) => {
    t?.preventDefault(),
      this.playing ||
        (window.dispatchEvent(new CustomEvent("audioWillPlay")),
        this.audioTarget.play().then(() => {
          (this.playing = !0),
            this.controlTarget.classList.remove(this.stoppedClass),
            this.controlTarget.classList.add(this.playingClass);
        }));
  };
  stop = () => {
    (this.playing = !1),
      this.controlTarget.classList.add(this.stoppedClass),
      this.controlTarget.classList.remove(this.playingClass),
      this.audioTarget.pause(),
      (this.audioTarget.currentTime = 0);
  };
  #e = (t) => {
    t[0].isIntersecting ? this.#s() : this.#i();
  };
  #s = () => {
    const t = this.element.dataset.hotkey;
    t && window.keyboardManager.registerHotKey({ key: t, callback: this.play }),
      (this.element.dataset.hotkeyRegistered = !0);
  };
  #i = () => {
    const t = this.element.dataset.hotkey;
    t &&
      window.keyboardManager.deregisterHotKey({ key: t, callback: this.play }),
      (this.element.dataset.hotkeyRegistered = !1);
  };
}

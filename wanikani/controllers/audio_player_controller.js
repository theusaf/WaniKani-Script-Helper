import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["audio", "control"];
  static classes = ["playing", "stopped"];
  static values = { autoPlay: Boolean };
  initialize() {
    (this.playing = !1),
      (this.stop = this.stop.bind(this)),
      (this.play = this.play.bind(this)),
      (this.visibilityChange = this.visibilityChange.bind(this)),
      this.audioTarget.addEventListener("ended", this.stop);
  }
  connect() {
    (this.observer = new IntersectionObserver(this.visibilityChange)),
      this.observer.observe(this.element);
  }
  disconnect() {
    this.stop();
  }
  play(t) {
    t?.preventDefault(),
      this.playing ||
        (window.dispatchEvent(new CustomEvent("audioWillPlay")),
        this.audioTarget
          .play()
          .then(() => {
            (this.playing = !0),
              this.controlTarget.classList.remove(this.stoppedClass),
              this.controlTarget.classList.add(this.playingClass);
          })
          .catch((t) => {
            console.error(t.name, t.message);
          }));
  }
  stop() {
    (this.playing = !1),
      this.controlTarget.classList.add(this.stoppedClass),
      this.controlTarget.classList.remove(this.playingClass),
      this.audioTarget.pause(),
      (this.audioTarget.currentTime = 0);
  }
  visibilityChange(t) {
    t[0].isIntersecting ? this.registerHotKeys() : this.deregisterHotKeys();
  }
  registerHotKeys() {
    const t = this.element.dataset.hotkey;
    t && window.keyboardManager.registerHotKey({ key: t, callback: this.play }),
      (this.element.dataset.hotkeyRegistered = !0);
  }
  deregisterHotKeys() {
    const t = this.element.dataset.hotkey;
    t &&
      window.keyboardManager.deregisterHotKey({ key: t, callback: this.play }),
      (this.element.dataset.hotkeyRegistered = !1);
  }
}

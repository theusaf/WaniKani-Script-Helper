import { Controller } from "@hotwired/stimulus";
import { getSources } from "audio/get_sources";
export default class extends Controller {
  static targets = ["audio", "icon", "playButton"];
  static classes = ["playing", "stopped", "disabled"];
  static values = {
    preferredVoiceActorId: { type: Number, default: 1 },
    autoPlay: { type: Boolean, default: !1 },
  };
  #t = !1;
  #e = !1;
  #s = !1;
  initialize() {
    this.audioTarget.addEventListener("ended", this.#i);
  }
  connect() {
    window.addEventListener("willShowNextQuestion", this.#a),
      window.addEventListener("didAnswerQuestion", this.#o);
  }
  disconnect() {
    window.removeEventListener("willShowNextQuestion", this.#a),
      window.removeEventListener("didAnswerQuestion", this.#o),
      this.#i();
  }
  playButtonTargetConnected(t) {
    const e = t.dataset.hotkey;
    e &&
      (window.keyboardManager.registerHotKey({ key: e, callback: this.play }),
      (t.dataset.hotkeyRegistered = !0));
  }
  playButtonTargetDisconnected(t) {
    const e = t.dataset.hotkey;
    e &&
      (window.keyboardManager.deregisterHotKey({ key: e, callback: this.play }),
      (t.dataset.hotkeyRegistered = !1));
  }
  #l = (t) => {
    this.audioTarget.replaceChildren(...t),
      this.audioTarget.load(),
      (this.#e = t.length > 0),
      this.playButtonTarget.classList.toggle(this.disabledClass, !this.#e),
      (this.playButtonTarget.dataset.loaded = !0);
  };
  #a = () => {
    this.#t ? (this.#s = !0) : this.#n();
  };
  #o = (t) => {
    this.#n();
    const {
        subjectWithStats: { subject: e },
        questionType: s,
        answer: i,
        results: a,
      } = t.detail,
      o = getSources({
        subject: e,
        questionType: s,
        answer: i,
        results: a,
        preferredVoiceActorId: this.preferredVoiceActorIdValue,
      });
    this.#l(o),
      this.#e && this.autoPlayValue && t.detail.results.passed && this.play();
  };
  play = () => {
    !this.#t &&
      this.#e &&
      (window.dispatchEvent(new CustomEvent("audioWillPlay")),
      (this.#t = !0),
      this.iconTarget.classList.remove(this.stoppedClass),
      this.iconTarget.classList.add(this.playingClass),
      this.audioTarget.play());
  };
  #i = () => {
    this.#s
      ? this.#n()
      : ((this.#t = !1),
        this.iconTarget.classList.add(this.stoppedClass),
        this.iconTarget.classList.remove(this.playingClass),
        this.audioTarget.pause(),
        (this.audioTarget.currentTime = 0));
  };
  #n = () => {
    (this.#s = !1),
      this.#i(),
      (this.playButtonTarget.dataset.loaded = !1),
      this.#l([]);
  };
}

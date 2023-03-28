import { Controller } from "@hotwired/stimulus";
import { getSources } from "audio/get_sources";
export default class extends Controller {
  static targets = ["audio", "icon", "playButton"];
  static classes = ["playing", "stopped", "disabled"];
  static values = {
    preferredVoiceActorId: { type: Number, default: 1 },
    autoPlay: { type: Boolean, default: !1 },
  };
  // I don't really know what these variables are
  // just guessing
  #isPlaying = !1;
  #isEnabled = !1;
  #isStopping = !1;
  initialize() {
    this.audioTarget.addEventListener("ended", this.#onAudioEnded);
  }
  connect() {
    window.addEventListener("willShowNextQuestion", this.#onWillShowNextQuestion),
      window.addEventListener("didAnswerQuestion", this.#onDidAnswerQuestion);
  }
  disconnect() {
    window.removeEventListener("willShowNextQuestion", this.#onWillShowNextQuestion),
      window.removeEventListener("didAnswerQuestion", this.#onDidAnswerQuestion),
      this.#onAudioEnded();
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
  #loadAudio = (t) => {
    this.audioTarget.replaceChildren(...t),
      this.audioTarget.load(),
      (this.#isEnabled = t.length > 0),
      this.playButtonTarget.classList.toggle(this.disabledClass, !this.#isEnabled),
      (this.playButtonTarget.dataset.loaded = !0);
  };
  #onWillShowNextQuestion = () => {
    this.#isPlaying ? (this.#isStopping = !0) : this.#stopPlaying();
  };
  #onDidAnswerQuestion = (t) => {
    this.#stopPlaying();
    const {
        subjectWithStats: { subject: e },
        questionType: s,
        answer: i,
        results: a,
      } = t.detail,
      sources = getSources({
        subject: e,
        questionType: s,
        answer: i,
        results: a,
        preferredVoiceActorId: this.preferredVoiceActorIdValue,
      });
    this.#loadAudio(sources),
      this.#isEnabled && this.autoPlayValue && t.detail.results.passed && this.play();
  };
  play = () => {
    !this.#isPlaying &&
      this.#isEnabled &&
      (window.dispatchEvent(new CustomEvent("audioWillPlay")),
      (this.#isPlaying = !0),
      this.iconTarget.classList.remove(this.stoppedClass),
      this.iconTarget.classList.add(this.playingClass),
      this.audioTarget.play());
  };
  #onAudioEnded = () => {
    this.#isStopping
      ? this.#stopPlaying()
      : ((this.#isPlaying = !1),
        this.iconTarget.classList.add(this.stoppedClass),
        this.iconTarget.classList.remove(this.playingClass),
        this.audioTarget.pause(),
        (this.audioTarget.currentTime = 0));
  };
  #stopPlaying = () => {
    (this.#isStopping = !1),
      this.#onAudioEnded(),
      (this.playButtonTarget.dataset.loaded = !1),
      this.#loadAudio([]);
  };
}

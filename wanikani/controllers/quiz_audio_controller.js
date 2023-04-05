import { Controller } from "@hotwired/stimulus";
import { getSources } from "audio/get_sources";
export default class extends Controller {
  static targets = ["audio", "icon", "playButton"];
  static classes = ["playing", "stopped", "disabled"];
  static values = {
    preferredVoiceActorId: { type: Number, default: 1 },
    autoPlay: { type: Boolean, default: !1 },
  };
  initialize() {
    (this.playing = !1),
      (this.canPlay = !1),
      (this.clearOnStop = !1),
      (this.play = this.play.bind(this)),
      (this.stop = this.stop.bind(this)),
      (this.willShowNextQuestion = this.willShowNextQuestion.bind(this)),
      (this.didAnswerQuestion = this.didAnswerQuestion.bind(this)),
      this.audioTarget.addEventListener("ended", this.stop);
  }
  connect() {
    window.addEventListener("willShowNextQuestion", this.willShowNextQuestion),
      window.addEventListener("didAnswerQuestion", this.didAnswerQuestion);
  }
  disconnect() {
    window.removeEventListener(
      "willShowNextQuestion",
      this.willShowNextQuestion
    ),
      window.removeEventListener("didAnswerQuestion", this.didAnswerQuestion),
      this.stop();
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
  loadAudio(t) {
    this.audioTarget.replaceChildren(...t),
      this.audioTarget.load(),
      (this.canPlay = t.length > 0),
      this.playButtonTarget.classList.toggle(this.disabledClass, !this.canPlay),
      (this.playButtonTarget.dataset.loaded = !0);
  }
  willShowNextQuestion() {
    this.playing ? (this.clearOnStop = !0) : this.clearSources();
  }
  didAnswerQuestion(t) {
    this.clearSources();
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
    this.loadAudio(o),
      this.canPlay &&
        this.autoPlayValue &&
        t.detail.results.passed &&
        this.play();
  }
  play() {
    !this.playing &&
      this.canPlay &&
      (window.dispatchEvent(new CustomEvent("audioWillPlay")),
      (this.playing = !0),
      this.iconTarget.classList.remove(this.stoppedClass),
      this.iconTarget.classList.add(this.playingClass),
      this.audioTarget.play());
  }
  stop() {
    this.clearOnStop
      ? this.clearSources()
      : ((this.playing = !1),
        this.iconTarget.classList.add(this.stoppedClass),
        this.iconTarget.classList.remove(this.playingClass),
        this.audioTarget.pause(),
        (this.audioTarget.currentTime = 0));
  }
  clearSources() {
    (this.clearOnStop = !1),
      this.stop(),
      (this.playButtonTarget.dataset.loaded = !1),
      this.loadAudio([]);
  }
}

import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["content", "contentContainer", "contentToggle"];
  static classes = ["open", "toggleDisabled", "toggleOpen"];
  initialize() {
    (this.didAnswerQuestion = this.didAnswerQuestion.bind(this)),
      (this.willShowNextQuestion = this.willShowNextQuestion.bind(this)),
      (this.contentLoaded = this.contentLoaded.bind(this));
  }
  connect() {
    this.contentContainerTargets.forEach(this.hideContainer),
      (this.currentContainer = null),
      window.addEventListener("didAnswerQuestion", this.didAnswerQuestion),
      window.addEventListener(
        "willShowNextQuestion",
        this.willShowNextQuestion
      ),
      this.element.addEventListener("contentLoaded", this.contentLoaded),
      this.contentToggleTargets.forEach((t) => {
        const e = t.dataset.hotkey;
        e &&
          ((t.onHotkey = () => {
            t.click();
          }),
          window.keyboardManager.registerHotKey({
            key: e,
            callback: t.onHotkey,
          }),
          (t.dataset.hotkeyRegistered = !0));
      });
  }
  disconnect() {
    window.removeEventListener("didAnswerQuestion", this.didAnswerQuestion),
      window.removeEventListener(
        "willShowNextQuestion",
        this.willShowNextQuestion
      ),
      this.element.removeEventListener("contentLoaded", this.contentLoaded);
  }
  contentToggleTargetDisconnected(t) {
    const e = t.dataset.hotkey;
    e &&
      (window.keyboardManager.deregisterHotKey({
        key: e,
        callback: t.onHotkey,
      }),
      (t.dataset.hotkeyRegistered = !1));
  }
  showContainer(t) {
    t.style.display = "block";
  }
  hideContainer(t) {
    t.style.display = "none";
  }
  didAnswerQuestion() {
    this.currentContainer &&
      "didAnswerQuestion" === this.currentContainer.dataset.closeOnEvent &&
      this.close();
  }
  willShowNextQuestion() {
    this.currentContainer &&
      "willShowNextQuestion" === this.currentContainer.dataset.closeOnEvent &&
      this.close();
  }
  contentContainerFromEvent(t) {
    const e = t.currentTarget.dataset,
      n = e.turboFrame || e.contentId;
    return this.contentContainerTargets.find((t) => t.id === n);
  }
  open(t) {
    this.contentTarget.classList.add(this.openClass),
      this.currentContainer && this.hideContainer(this.currentContainer),
      this.contentToggleTargets.forEach((t) =>
        t.classList.remove(this.toggleOpenClass)
      );
    const e = this.contentContainerFromEvent(t);
    e &&
      (this.dispatch("willOpenContent"),
      (this.currentContainer = e),
      this.showContainer(this.currentContainer),
      t.currentTarget.classList.add(this.toggleOpenClass),
      "true" === this.currentContainer.dataset.loaded &&
        this.scrollContentIntoView());
  }
  close() {
    this.contentTarget.classList.remove(this.openClass),
      this.currentContainer && this.hideContainer(this.currentContainer),
      this.contentToggleTargets.forEach((t) =>
        t.classList.remove(this.toggleOpenClass)
      ),
      (this.currentContainer = null);
  }
  toggle(t) {
    if (!t.currentTarget.classList.contains(this.toggleDisabledClass)) {
      this.contentContainerFromEvent(t) === this.currentContainer
        ? this.close(t)
        : this.open(t);
    } else t.preventDefault();
  }
  scrollContentIntoView() {
    const t =
      this.currentContainer.getBoundingClientRect().top +
      document.documentElement.scrollTop -
      60;
    window.scrollTo({ top: t, left: 0, behavior: "smooth" });
  }
  contentLoaded() {
    this.currentContainer &&
      this.currentContainer.dataset.loaded &&
      this.scrollContentIntoView();
  }
}

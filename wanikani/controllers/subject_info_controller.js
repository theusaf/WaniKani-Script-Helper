import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static outlets = ["toggle"];
  initialize() {
    (this.didAnswerQuestion = this.didAnswerQuestion.bind(this)),
      (this.beforeFrameRender = this.beforeFrameRender.bind(this)),
      (this.toggleExpandAll = this.toggleExpandAll.bind(this));
  }
  connect() {
    window.addEventListener("didAnswerQuestion", this.didAnswerQuestion),
      this.element.addEventListener(
        "turbo:before-frame-render",
        this.beforeFrameRender
      ),
      (this.expanded = !1);
    const e = this.element.dataset.hotkey;
    e &&
      window.keyboardManager.registerHotKey({
        key: e,
        callback: this.toggleExpandAll,
      });
  }
  disconnect() {
    window.removeEventListener("didAnswerQuestion", this.didAnswerQuestion),
      this.element.removeEventListener(
        "turbo:before-frame-render",
        this.beforeFrameRender
      );
    const e = this.element.dataset.hotkey;
    e &&
      window.keyboardManager.deregisterHotKey({
        key: e,
        callback: this.toggleExpandAll,
      });
  }
  toggleOutletConnected(e) {
    e.hasContextValue &&
      e.contextValue.auto_expand_question_types &&
      e.contextValue.auto_expand_question_types.includes(
        this.currentQuestionType
      ) &&
      e.expand();
  }
  didAnswerQuestion(e) {
    (this.currentQuestionType = e.detail.questionType), (this.expanded = !1);
  }
  toggleExpandAll() {
    this.hasToggleOutlet &&
      (this.toggleOutlets.forEach((e) =>
        this.expanded ? e.collapse() : e.expand()
      ),
      (this.expanded = !this.expanded));
  }
  beforeFrameRender(e) {
    e.target === this.element &&
      e.detail.newFrame
        .querySelectorAll('a[data-turbo-frame="_blank"]')
        .forEach((e) => {
          e.setAttribute("target", "_blank");
        });
  }
}

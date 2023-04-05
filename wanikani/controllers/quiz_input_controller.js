import { Controller } from "@hotwired/stimulus";
import AnswerChecker from "lib/answer_checker/answer_checker";
import {
  normalizeReadingResponse,
  questionTypeAndResponseMatch,
} from "lib/answer_checker/utils/response_helpers";
import * as wanakana from "wanakana";
export default class extends Controller {
  static targets = [
    "input",
    "button",
    "inputContainer",
    "questionTypeContainer",
    "questionType",
    "category",
    "exception",
    "exceptionContainer",
    "form",
  ];
  static outlets = ["quiz-queue", "quiz-user-synonyms"];
  initialize() {
    (this.inputEnabled = !0),
      (this.answerChecker = new AnswerChecker()),
      (this.updateQuestion = this.updateQuestion.bind(this)),
      (this.scrollIntoView = this.scrollIntoView.bind(this)),
      (this.focusOrNext = this.focusOrNext.bind(this)),
      (this.handleBackspace = this.handleBackspace.bind(this)),
      (this.handleKeyDown = this.handleKeyDown.bind(this)),
      (this.handleInput = this.handleInput.bind(this)),
      (this.disableInput = this.disableInput.bind(this)),
      window.addEventListener("willShowNextQuestion", this.updateQuestion),
      this.formTarget.addEventListener("submit", (e) => {
        e.stopPropagation(), e.preventDefault();
      });
  }
  connect() {
    this.inputTarget.addEventListener("keydown", this.handleKeyDown),
      this.inputTarget.addEventListener("input", this.handleInput),
      window.visualViewport.addEventListener("resize", this.scrollIntoView),
      window.keyboardManager.registerHotKey({
        key: "Enter",
        callback: this.focusOrNext,
      }),
      window.keyboardManager.registerHotKey({
        key: "Backspace",
        callback: this.handleBackspace,
      }),
      window.addEventListener("connectionTimeout", this.disableInput),
      (this.element.dataset.hotkeyRegistered = !0),
      this.inputTarget.focus();
  }
  disconnect() {
    window.visualViewport.removeEventListener("resize", this.scrollIntoView),
      this.inputTarget.removeEventListener("keydown", this.handleKeyDown),
      this.inputTarget.removeEventListener("input", this.handleInput),
      window.removeEventListener("willShowNextQuestion", this.updateQuestion),
      window.removeEventListener("connectionTimeout", this.disableInput),
      window.keyboardManager.deregisterHotKey({
        key: "Enter",
        callback: this.focusOrNext,
      }),
      window.keyboardManager.deregisterHotKey({
        key: "Backspace",
        callback: this.handleBackspace,
      }),
      (this.element.dataset.hotkeyRegistered = !1);
  }
  quizQueueOutletConnected(e) {
    const t = this.questionTypeContainerTarget.dataset.questionType;
    e.nextItem(t);
  }
  focusOrNext() {
    this.inputEnabled
      ? (this.inputTarget.focus(), this.scrollIntoView())
      : this.buttonTarget.click();
  }
  handleBackspace(e) {
    e.preventDefault();
  }
  handleKeyDown(e) {
    if (
      ("Enter" === e.key && (e.preventDefault(), this.buttonTarget.click()),
      "Space" === e.code && 229 !== e.keyCode && !this.inputEnabled)
    ) {
      const t = 0.85 * window.innerHeight * (e.shiftKey ? -1 : 1),
        n = Math.ceil(document.documentElement.scrollTop + t);
      window.scrollTo({ left: 0, top: n, behavior: "smooth" }),
        e.preventDefault();
    }
    if (/(ArrowUp|ArrowDown)/.test(e.code) && !this.inputEnabled) {
      const t = "ArrowUp" === e.code ? -40 : 40,
        n = Math.ceil(document.documentElement.scrollTop + t);
      window.scrollTo({ left: 0, top: n, behavior: "smooth" }),
        e.preventDefault();
    }
  }
  handleInput(e) {
    this.inputEnabled ||
      (e.target.value.slice(0, -1) === this.lastAnswer &&
        window.keyboardManager.handleHotKey(
          new CustomEvent("fakeKeyDownEvent"),
          e.target.value.slice(-1)
        ),
      (this.inputTarget.value = this.lastAnswer));
  }
  disableInput() {
    (this.inputTarget.disabled = !0),
      window.keyboardManager.deregisterHotKey({
        key: "Enter",
        callback: this.focusOrNext,
      }),
      window.keyboardManager.deregisterHotKey({
        key: "Backspace",
        callback: this.handleBackspace,
      }),
      this.inputTarget.removeEventListener("keydown", this.handleKeyDown),
      this.inputTarget.removeEventListener("input", this.handleInput);
  }
  scrollIntoView() {
    if (document.activeElement === this.inputTarget && this.inputEnabled) {
      const e =
          this.inputTarget.getBoundingClientRect().bottom +
          document.documentElement.scrollTop,
        t =
          e <= visualViewport.height
            ? 0
            : Math.floor(e - visualViewport.height);
      document.documentElement.scrollTop = t;
    }
  }
  submitAnswer() {
    if (!this.hasQuizQueueOutlet || !this.hasQuizUserSynonymsOutlet) return;
    if (!this.inputEnabled)
      return (
        this.quizQueueOutlet.nextItem(),
        (this.inputEnabled = !0),
        this.inputContainerTarget.removeAttribute("correct"),
        this.inputTarget.focus(),
        void this.scrollIntoView()
      );
    this.clearException();
    let e = this.inputTarget.value.trim();
    if (
      ("reading" === this.currentQuestionType &&
        (e = normalizeReadingResponse(e)),
      (this.inputTarget.value = e),
      !questionTypeAndResponseMatch(this.currentQuestionType, e) ||
        0 == e.length)
    )
      return void this.shakeForm();
    const t = this.quizUserSynonymsOutlet.synonymsForSubjectId(
        this.currentSubject.id
      ),
      n = this.answerChecker.evaluate(
        this.currentQuestionType,
        e,
        this.currentSubject,
        t
      );
    n.exception
      ? (this.shakeForm(), this.showException(n.exception))
      : ((this.inputEnabled = !1),
        (this.lastAnswer = e),
        this.inputContainerTarget.setAttribute("correct", n.passed),
        this.quizQueueOutlet.submitAnswer(e, n));
  }
  updateQuestion(e) {
    (this.currentQuestionType = e.detail.questionType),
      (this.currentSubject = e.detail.subject),
      (this.categoryTarget.innerText = this.currentSubject.subject_category),
      (this.questionTypeTarget.innerText =
        "Radical" === this.currentSubject.subject_category
          ? "Name"
          : this.currentQuestionType),
      (this.questionTypeContainerTarget.dataset.questionType =
        this.currentQuestionType),
      (this.questionTypeContainerTarget.dataset.subjectId =
        this.currentSubject.id),
      (this.inputTarget.value = "");
    const t = "true" === this.inputTarget.dataset.wanakanaBound;
    "meaning" === this.currentQuestionType &&
      t &&
      (wanakana.unbind(this.inputTarget),
      delete this.inputTarget.dataset.wanakanaBound,
      this.inputTarget.removeAttribute("lang"),
      this.inputTarget.setAttribute("placeholder", "Your Response")),
      "reading" !== this.currentQuestionType ||
        t ||
        (wanakana.bind(this.inputTarget),
        (this.inputTarget.dataset.wanakanaBound = !0),
        this.inputTarget.setAttribute("placeholder", "\u7b54\u3048"));
  }
  appendKanaCharacter(e) {
    this.inputEnabled && (this.inputTarget.value += e);
  }
  deleteCharacter() {
    this.inputEnabled &&
      (this.inputTarget.value = this.inputTarget.value.slice(0, -1));
  }
  shakeForm() {
    const e = () => {
      this.inputContainerTarget.removeEventListener("animationend", e),
        this.inputContainerTarget.classList.remove("effects--shake");
    };
    this.inputContainerTarget.addEventListener("animationend", e),
      this.inputContainerTarget.classList.add("effects--shake");
  }
  showException(e) {
    "string" == typeof e &&
      ((this.exceptionTarget.innerText = e),
      (this.exceptionContainerTarget.hidden = !1));
  }
  clearException() {
    (this.exceptionContainerTarget.hidden = !0),
      (this.exceptionTarget.innerText = "");
  }
  get inputEnabled() {
    return (
      this.inputTarget.hasAttribute("enabled") &&
      "true" === this.inputTarget.getAttribute("enabled")
    );
  }
  set inputEnabled(e) {
    this.inputTarget.setAttribute("enabled", e);
  }
}

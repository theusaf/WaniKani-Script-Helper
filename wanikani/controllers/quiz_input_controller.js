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
  #e = new AnswerChecker();
  #t;
  initialize() {
    (this.#n = !0),
      window.addEventListener("willShowNextQuestion", this.#i),
      this.formTarget.addEventListener("submit", (e) => {
        e.stopPropagation(), e.preventDefault();
      });
  }
  connect() {
    window.keyboardManager.registerHotKey({ key: "Enter", callback: this.#a }),
      window.keyboardManager.registerHotKey({
        key: "Backspace",
        callback: this.#s,
      }),
      (this.element.dataset.hotkeyRegistered = !0),
      this.inputTarget.focus();
  }
  disconnect() {
    window.removeEventListener("willShowNextQuestion", this.#i),
      window.keyboardManager.deregisterHotKey({
        key: "Enter",
        callback: this.#a,
      }),
      window.keyboardManager.deregisterHotKey({
        key: "Backspace",
        callback: this.#s,
      }),
      (this.element.dataset.hotkeyRegistered = !1);
  }
  quizQueueOutletConnected(e) {
    const t = this.questionTypeContainerTarget.dataset.questionType;
    e.nextItem(t);
  }
  inputTargetConnected() {
    this.inputTarget.addEventListener("keydown", this.#r),
      this.inputTarget.addEventListener("input", this.#o);
  }
  #a = () => {
    this.#n
      ? this.inputTarget.focus()
      : (window.scrollTo(0, 0), this.buttonTarget.click());
  };
  #s = (e) => {
    e.preventDefault();
  };
  #r = (e) => {
    if (
      ("Enter" === e.key && (e.preventDefault(), this.buttonTarget.click()),
      "Space" === e.code && 229 !== e.keyCode && !this.#n)
    ) {
      const t = 0.85 * window.innerHeight * (e.shiftKey ? -1 : 1),
        n = Math.ceil(document.documentElement.scrollTop + t);
      window.scrollTo({ left: 0, top: n, behavior: "smooth" }),
        e.preventDefault();
    }
    if (/(ArrowUp|ArrowDown)/.test(e.code) && !this.#n) {
      const t = "ArrowUp" === e.code ? -40 : 40,
        n = Math.ceil(document.documentElement.scrollTop + t);
      window.scrollTo({ left: 0, top: n, behavior: "smooth" }),
        e.preventDefault();
    }
  };
  #o = (e) => {
    this.#n ||
      (e.target.value.slice(0, -1) === this.#t &&
        window.keyboardManager.handleHotKey(
          new CustomEvent("fakeKeyDownEvent"),
          e.target.value.slice(-1)
        ),
      (this.inputTarget.value = this.#t));
  };
  submitAnswer() {
    if (!this.hasQuizQueueOutlet || !this.hasQuizUserSynonymsOutlet) return;
    if (!this.#n)
      return (
        this.quizQueueOutlet.nextItem(),
        (this.#n = !0),
        this.inputContainerTarget.removeAttribute("correct"),
        void this.inputTarget.focus()
      );
    this.#u();
    let e = this.inputTarget.value.trim();
    if (
      ("reading" === this.currentQuestionType &&
        ((e = normalizeReadingResponse(e)), (this.inputTarget.value = e)),
      !questionTypeAndResponseMatch(this.currentQuestionType, e) ||
        0 == e.length)
    )
      return void this.#h();
    const t = this.quizUserSynonymsOutlet.synonymsForSubjectId(
        this.currentSubject.id
      ),
      n = this.#e.evaluate(this.currentQuestionType, e, this.currentSubject, t);
    n.exception
      ? (this.#h(), this.#c(n.exception))
      : ((this.#n = !1),
        (this.#t = e),
        this.inputContainerTarget.setAttribute("correct", n.passed),
        this.quizQueueOutlet.submitAnswer(e, n));
  }
  #i = (e) => {
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
  };
  appendKanaCharacter(e) {
    this.#n && (this.inputTarget.value += e);
  }
  deleteCharacter() {
    this.#n && (this.inputTarget.value = this.inputTarget.value.slice(0, -1));
  }
  #h = () => {
    const e = () => {
      this.inputContainerTarget.removeEventListener("animationend", e),
        this.inputContainerTarget.classList.remove("effects--shake");
    };
    this.inputContainerTarget.addEventListener("animationend", e),
      this.inputContainerTarget.classList.add("effects--shake");
  };
  #c = (e) => {
    "string" == typeof e &&
      ((this.exceptionTarget.innerText = e),
      (this.exceptionContainerTarget.hidden = !1));
  };
  #u = () => {
    (this.exceptionContainerTarget.hidden = !0),
      (this.exceptionTarget.innerText = "");
  };
  get #n() {
    return (
      this.inputTarget.hasAttribute("enabled") &&
      "true" === this.inputTarget.getAttribute("enabled")
    );
  }
  set #n(e) {
    this.inputTarget.setAttribute("enabled", e);
  }
}

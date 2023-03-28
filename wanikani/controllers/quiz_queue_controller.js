import { Controller } from "@hotwired/stimulus";
import QuizQueue from "controllers/quiz_queue/queue";
import QuizAPI from "controllers/quiz_queue/quiz_api";
export default class extends Controller {
  static targets = [
    "subjects",
    "doneDialogTemplate",
    "subjectIdsWithSRS",
    "subjectIds",
  ];
  static values = {
    completionUrl: String,
    doneUrl: String,
    itemsUrl: String,
    completeSubjectsInOrder: Boolean,
    questionOrder: String,
  };
  #e;
  initialize() {
    const e = new QuizAPI({
      completionUrl: this.completionUrlValue,
      itemsUrl: this.itemsUrlValue,
    });
    e.submitFailed();
    const t = JSON.parse(this.subjectsTarget.innerText);
    let i = new Map(),
      s = [];
    if (this.hasSubjectIdsWithSRSTarget) {
      const e = JSON.parse(this.subjectIdsWithSRSTarget.innerText),
        r = t.map((e) => e.id);
      (i = new Map(e)),
        (s = Array.from(i.keys()).filter((e) => !r.includes(e)));
    }
    if (this.hasSubjectIdsTarget) {
      const e = JSON.parse(this.subjectIdsTarget.innerText),
        i = t.map((e) => e.id);
      s = e.filter((e) => !i.includes(e));
    }
    this.#e = new QuizQueue({
      queue: t,
      api: e,
      srsMap: i,
      remainingIds: s,
      completeSubjectsInOrder: this.completeSubjectsInOrderValue,
      questionOrder: this.questionOrderValue,
      onDone: this.#t,
    });
  }
  nextItem = (e) => {
    this.#e.nextItem(e);
  };
  submitAnswer = (e, t) => {
    this.#e.submitAnswer(e, t);
  };
  #t = () => {
    if (this.hasDoneDialogTemplateTarget) {
      const e =
        this.doneDialogTemplateTarget.content.firstElementChild.cloneNode(!0);
      this.element.appendChild(e);
    } else this.hasDoneUrlValue && Turbo.visit(this.doneUrlValue);
  };
}

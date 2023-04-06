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
        n = t.map((e) => e.id);
      (i = new Map(e)),
        (s = Array.from(i.keys()).filter((e) => !n.includes(e)));
    }
    if (this.hasSubjectIdsTarget) {
      const e = JSON.parse(this.subjectIdsTarget.innerText),
        i = t.map((e) => e.id);
      s = e.filter((e) => !i.includes(e));
    }
    (this.onDone = this.onDone.bind(this)),
      (this.quizQueue = new QuizQueue({
        queue: t,
        api: e,
        srsMap: i,
        remainingIds: s,
        completeSubjectsInOrder: this.completeSubjectsInOrderValue,
        questionOrder: this.questionOrderValue,
        onDone: this.onDone,
      }));
  }
  nextItem(e) {
    this.quizQueue.nextItem(e);
  }
  submitAnswer(e, t) {
    this.quizQueue.submitAnswer(e, t);
  }
  onDone() {
    if (this.hasDoneDialogTemplateTarget) {
      const e =
        this.doneDialogTemplateTarget.content.firstElementChild.cloneNode(!0);
      this.element.appendChild(e);
    } else this.hasDoneUrlValue && Turbo.visit(this.doneUrlValue);
  }
}

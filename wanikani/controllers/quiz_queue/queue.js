import DidAnswerQuestionEvent from "events/did_answer_question";
import DidCompleteSubjectEvent from "events/did_complete_subject";
import UpdateQuizProgress from "events/update_quiz_progress";
import WillShowNextQuestionEvent from "events/will_show_next_question";
import CachedStats from "controllers/quiz_queue/cached_stats";
import WrapUpManager from "controllers/quiz_queue/wrap_up_manager";
import SRSManager from "controllers/quiz_queue/srs_manager";
export default class QuizQueue {
  #e;
  #t;
  #i;
  #s;
  #n;
  #r;
  #a;
  #u;
  #h = new CachedStats();
  #o = 10;
  #c = 20;
  #m = 100;
  #p = !1;
  #g = !1;
  #l = "random";
  constructor({
    queue: e,
    api: t,
    remainingIds: i,
    srsMap: s,
    completeSubjectsInOrder: n,
    questionOrder: r,
    onDone: a,
  }) {
    (this.#i = e.slice(0, this.#o)),
      (this.#s = e.slice(this.#o)),
      (this.#e = t),
      (this.#r = new WrapUpManager(this.#i.length)),
      (this.#a = new SRSManager(s)),
      (this.#u = i),
      (this.#t = a),
      (this.#n = this.#d),
      this.#Q(0),
      (this.#g = n),
      (this.#l = r);
  }
  nextItem(e) {
    if (0 === this.#d || (this.#r.wrappingUp && 0 === this.#i.length))
      return this.#t(), void this.#Q(0);
    this.currentItem = this.#i[0];
    const t = this.#h.get(this.currentItem);
    t.reading.complete ||
    (("meaning" === e || "meaningFirst" === this.#l) && !t.meaning.complete)
      ? (this.questionType = "meaning")
      : t.meaning.complete ||
        (("reading" === e || "readingFirst" === this.#l) && !t.reading.complete)
      ? (this.questionType = "reading")
      : (this.questionType = ["meaning", "reading"][
          Math.floor(2 * Math.random())
        ]),
      window.dispatchEvent(
        new WillShowNextQuestionEvent({
          subject: this.currentItem,
          questionType: this.questionType,
        })
      );
  }
  submitAnswer(e, t) {
    const i = this.#I(t.passed),
      s = JSON.parse(JSON.stringify({ subject: this.currentItem, stats: i }));
    window.dispatchEvent(
      new DidAnswerQuestionEvent({
        subjectWithStats: s,
        questionType: this.questionType,
        answer: e,
        results: t,
      })
    ),
      i.reading.complete && i.meaning.complete
        ? (this.#e.itemComplete({ item: this.currentItem, stats: i }),
          window.dispatchEvent(
            new DidCompleteSubjectEvent({ subjectWithStats: s })
          ),
          this.#a.updateSRS({ subject: this.currentItem, stats: i }),
          this.#v(),
          this.#Q(),
          this.#h.delete(this.currentItem))
        : this.#g || this.#w(t.passed);
  }
  #I = (e) => {
    const t = this.#h.get(this.currentItem);
    return (
      (t[this.questionType].complete = e),
      e || (t[this.questionType].incorrect += 1),
      this.#h.set(this.currentItem, t),
      t
    );
  };
  #Q = (e) => {
    "number" != typeof e &&
      (e = Math.round(((this.#n - this.#d) / this.#n) * 100)),
      window.dispatchEvent(new UpdateQuizProgress({ percentComplete: e }));
  };
  #v = () => {
    if (this.#r.wrappingUp) this.#i = this.#i.slice(1);
    else {
      const e = this.#o - this.#i.length + 1;
      (this.#i = this.#i.slice(1).concat(this.#s.slice(0, e))),
        (this.#s = this.#s.slice(e)),
        this.#S();
    }
    this.#r.updateQueueSize(this.#i.length);
  };
  get #d() {
    return this.#i.length + this.#s.length + this.#u.length;
  }
  #w = (e) => {
    const t = this.#i[0],
      i = this.#i.slice(1),
      s = (e, t) => Math.floor(Math.random() * (t - e + 1) + e),
      n = s(e ? 0 : Math.ceil(i.length / 2), i.length);
    i.splice(n, 0, t), (this.#i = i);
  };
  #S = () => {
    if (0 === this.#u.length || this.#s.length > this.#c || this.#p) return;
    this.#p = !0;
    const e = this.#u.slice(0, this.#m);
    this.#e
      .fetchItems({ ids: e })
      .then((e) => {
        (this.#s = this.#s.concat(e)), (this.#u = this.#u.slice(this.#m));
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        this.#p = !1;
      });
  };
}

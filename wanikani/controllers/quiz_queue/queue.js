import DidAnswerQuestionEvent from "events/did_answer_question";
import DidCompleteSubjectEvent from "events/did_complete_subject";
import UpdateQuizProgress from "events/update_quiz_progress";
import WillShowNextQuestionEvent from "events/will_show_next_question";
import CachedStats from "controllers/quiz_queue/cached_stats";
import WrapUpManager from "controllers/quiz_queue/wrap_up_manager";
import SRSManager from "controllers/quiz_queue/srs_manager";
export default class QuizQueue {
  constructor({
    queue: e,
    api: t,
    remainingIds: i,
    srsMap: s,
    completeSubjectsInOrder: n,
    questionOrder: u,
    onDone: r,
  }) {
    (this.maxActiveQueueSize = 10),
      (this.minBacklogQueueSize = 20),
      (this.fetchItemsBatchSize = 100),
      (this.fetchingMoreItems = !1),
      (this.stats = new CachedStats()),
      (this.activeQueue = e.slice(0, this.maxActiveQueueSize)),
      (this.backlogQueue = e.slice(this.maxActiveQueueSize)),
      (this.api = t),
      (this.wrapUpManager = new WrapUpManager(this.activeQueue.length)),
      (this.srsManager = new SRSManager(s)),
      (this.remainingIds = i),
      (this.onDone = r),
      (this.totalItems = this.remainingQueueLength),
      this.updateQuizProgress(0),
      (this.completeSubjectsInOrder = n),
      (this.questionOrder = u);
  }
  nextItem(e) {
    if (
      0 === this.remainingQueueLength ||
      (this.wrapUpManager.wrappingUp && 0 === this.activeQueue.length)
    )
      return this.onDone(), void this.updateQuizProgress(0);
    this.currentItem = this.activeQueue[0];
    const t = this.stats.get(this.currentItem);
    t.reading.complete ||
    (("meaning" === e || "meaningFirst" === this.questionOrder) &&
      !t.meaning.complete)
      ? (this.questionType = "meaning")
      : t.meaning.complete ||
        (("reading" === e || "readingFirst" === this.questionOrder) &&
          !t.reading.complete)
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
    const i = this.updateCurrentItemStats(t.passed),
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
        ? (this.api.itemComplete({ item: this.currentItem, stats: i }),
          window.dispatchEvent(
            new DidCompleteSubjectEvent({ subjectWithStats: s })
          ),
          this.srsManager.updateSRS({ subject: this.currentItem, stats: i }),
          this.updateQueues(),
          this.updateQuizProgress(),
          this.stats.delete(this.currentItem))
        : this.completeSubjectsInOrder || this.shuffleFirstItem(t.passed);
  }
  updateCurrentItemStats(e) {
    const t = this.stats.get(this.currentItem);
    return (
      (t[this.questionType].complete = e),
      e || (t[this.questionType].incorrect += 1),
      this.stats.set(this.currentItem, t),
      t
    );
  }
  updateQuizProgress(e) {
    "number" != typeof e &&
      (e = Math.round(
        ((this.totalItems - this.remainingQueueLength) / this.totalItems) * 100
      )),
      window.dispatchEvent(new UpdateQuizProgress({ percentComplete: e }));
  }
  updateQueues() {
    if (this.wrapUpManager.wrappingUp)
      this.activeQueue = this.activeQueue.slice(1);
    else {
      const e = this.maxActiveQueueSize - this.activeQueue.length + 1;
      (this.activeQueue = this.activeQueue
        .slice(1)
        .concat(this.backlogQueue.slice(0, e))),
        (this.backlogQueue = this.backlogQueue.slice(e)),
        this.fetchMoreItems();
    }
    this.wrapUpManager.updateQueueSize(this.activeQueue.length);
  }
  get remainingQueueLength() {
    return (
      this.activeQueue.length +
      this.backlogQueue.length +
      this.remainingIds.length
    );
  }
  shuffleFirstItem(e) {
    const t = this.activeQueue[0],
      i = this.activeQueue.slice(1),
      s = (e, t) => Math.floor(Math.random() * (t - e + 1) + e),
      n = s(e ? 0 : Math.ceil(i.length / 2), i.length);
    i.splice(n, 0, t), (this.activeQueue = i);
  }
  fetchMoreItems() {
    if (
      0 === this.remainingIds.length ||
      this.backlogQueue.length > this.minBacklogQueueSize ||
      this.fetchingMoreItems
    )
      return;
    this.fetchingMoreItems = !0;
    const e = this.remainingIds.slice(0, this.fetchItemsBatchSize);
    this.api
      .fetchItems({ ids: e })
      .then((e) => {
        (this.backlogQueue = this.backlogQueue.concat(e)),
          (this.remainingIds = this.remainingIds.slice(
            this.fetchItemsBatchSize
          ));
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        this.fetchingMoreItems = !1;
      });
  }
}

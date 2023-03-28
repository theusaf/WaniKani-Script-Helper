import DidAnswerQuestionEvent from "events/did_answer_question";
import DidCompleteSubjectEvent from "events/did_complete_subject";
import UpdateQuizProgress from "events/update_quiz_progress";
import WillShowNextQuestionEvent from "events/will_show_next_question";
import CachedStats from "controllers/quiz_queue/cached_stats";
import WrapUpManager from "controllers/quiz_queue/wrap_up_manager";
import SRSManager from "controllers/quiz_queue/srs_manager";
export default class QuizQueue {
  #api;
  #onDone;
  #items;
  #currentSlice;
  #totalRemaining;
  #wrapUpManager;
  #srsManager;
  #remainingIds;
  #statsMap = new CachedStats();
  #MAX_ITEM_ZUTSU = 10;
  #UNLOADED_THRESHHOLD = 20;
  #ITEMS_TO_LOAD = 100;
  #loading = !1;
  #completeSubjectsInOrder = !1;
  #questionOrder = "random";
  constructor({
    queue,
    api,
    remainingIds,
    srsMap,
    completeSubjectsInOrder,
    questionOrder,
    onDone,
  }) {
    (this.#items = queue.slice(0, this.#MAX_ITEM_ZUTSU)),
      (this.#currentSlice = queue.slice(this.#MAX_ITEM_ZUTSU)),
      (this.#api = api),
      (this.#wrapUpManager = new WrapUpManager(this.#items.length)),
      (this.#srsManager = new SRSManager(srsMap)),
      (this.#remainingIds = remainingIds),
      (this.#onDone = onDone),
      (this.#totalRemaining = this.#totalItemsRemaining),
      this.#updateQuizProgress(0),
      (this.#completeSubjectsInOrder = completeSubjectsInOrder),
      (this.#questionOrder = questionOrder);
  }
  nextItem(questionType) {
    if (
      0 === this.#totalItemsRemaining ||
      (this.#wrapUpManager.wrappingUp && 0 === this.#items.length)
    )
      return this.#onDone(), void this.#updateQuizProgress(0);
    this.currentItem = this.#items[0];
    const stat = this.#statsMap.get(this.currentItem);
    stat.reading.complete ||
    (("meaning" === questionType || "meaningFirst" === this.#questionOrder) &&
      !stat.meaning.complete)
      ? (this.questionType = "meaning")
      : stat.meaning.complete ||
        (("reading" === questionType ||
          "readingFirst" === this.#questionOrder) &&
          !stat.reading.complete)
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
  submitAnswer(answer, results) {
    const outcomeStat = this.#updateStatsFromOutcome(results.passed),
      subjectWithStats = JSON.parse(
        JSON.stringify({ subject: this.currentItem, stats: outcomeStat })
      );
    window.dispatchEvent(
      new DidAnswerQuestionEvent({
        subjectWithStats: subjectWithStats,
        questionType: this.questionType,
        answer: answer,
        results: results,
      })
    ),
      outcomeStat.reading.complete && outcomeStat.meaning.complete
        ? (this.#api.itemComplete({
            item: this.currentItem,
            stats: outcomeStat,
          }),
          window.dispatchEvent(
            new DidCompleteSubjectEvent({ subjectWithStats: subjectWithStats })
          ),
          this.#srsManager.updateSRS({
            subject: this.currentItem,
            stats: outcomeStat,
          }),
          this.#removeCurrentItem(),
          this.#updateQuizProgress(),
          this.#statsMap.delete(this.currentItem))
        : this.#completeSubjectsInOrder || this.#randomizeOrder(results.passed);
  }
  #updateStatsFromOutcome = (passed) => {
    const stat = this.#statsMap.get(this.currentItem);
    return (
      (stat[this.questionType].complete = passed),
      passed || (stat[this.questionType].incorrect += 1),
      this.#statsMap.set(this.currentItem, stat),
      stat
    );
  };
  #updateQuizProgress = (e) => {
    "number" != typeof e &&
      (e = Math.round(
        ((this.#totalRemaining - this.#totalItemsRemaining) /
          this.#totalRemaining) *
          100
      )),
      window.dispatchEvent(new UpdateQuizProgress({ percentComplete: e }));
  };
  #removeCurrentItem = () => {
    if (this.#wrapUpManager.wrappingUp) this.#items = this.#items.slice(1);
    else {
      const i = this.#MAX_ITEM_ZUTSU - this.#items.length + 1;
      (this.#items = this.#items
        .slice(1)
        .concat(this.#currentSlice.slice(0, i))),
        (this.#currentSlice = this.#currentSlice.slice(i)),
        this.#loadItems();
    }
    this.#wrapUpManager.updateQueueSize(this.#items.length);
  };
  get #totalItemsRemaining() {
    return (
      this.#items.length + this.#currentSlice.length + this.#remainingIds.length
    );
  }
  #randomizeOrder = (passed) => {
    const firstItem = this.#items[0],
      items = this.#items.slice(1),
      getRandomInt = (a, b) => Math.floor(Math.random() * (b - a + 1) + a),
      randomIndex = getRandomInt(
        passed ? 0 : Math.ceil(items.length / 2),
        items.length
      );
    items.splice(randomIndex, 0, firstItem), (this.#items = items);
  };
  #loadItems = () => {
    if (
      0 === this.#remainingIds.length ||
      this.#currentSlice.length > this.#UNLOADED_THRESHHOLD ||
      this.#loading
    )
      return;
    this.#loading = !0;
    const e = this.#remainingIds.slice(0, this.#ITEMS_TO_LOAD);
    this.#api
      .fetchItems({ ids: e })
      .then((e) => {
        (this.#currentSlice = this.#currentSlice.concat(e)),
          (this.#remainingIds = this.#remainingIds.slice(this.#ITEMS_TO_LOAD));
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        this.#loading = !1;
      });
  };
}

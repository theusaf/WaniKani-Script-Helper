
declare module "controllers/quiz_queue/queue" {
  import SRSManager from "controllers/quiz_queue/srs_manager";
  import WrapUpManager from "controllers/quiz_queue/wrap_up_manager";
  import CachedStats from "controllers/quiz_queue/cached_stats";
  import { QuestionAnswerResults, Subject } from "events/did_answer_question";
  import QuizAPI from "controllers/quiz_queue/quiz_api";

  export type SRSMap = Map<number, number>;

  export interface QueueConstructorParams {
    queue: Subject[];
    api: QuizAPI;
    remainingIds: number[];
    srsMap: SRSMap;
    /**
     * Whether or not to complete subjects in order.
     */
    completeSubjectsInOrder: boolean;
    /**
     * The order to determine what kind of question to ask.
     */
    questionOrder: "random" | "meaningFirst" | "readingFirst";
    /**
     * A callback that is called when the queue is done.
     */
    onDone: () => void;
  }

  export default class QuizQueue {
    minBacklogQueueSize: 20;
    fetchItemsBatchSize: 100;
    maxActiveQueueSize: 10;
    fetchingMoreItems: boolean;
    stats: CachedStats;
    activeQueue: Subject[];
    backlogQueue: Subject[];
    wrapUpManager: WrapUpManager;
    srsManager: SRSManager;
    totalItems: number;
    questionOrder: "random" | "meaningFirst" | "readingFirst";
    completeSubjectsInOrder: boolean;
    api: QuizAPI;
    questionType: "meaning" | "reading";
    currentItem: Subject;
    onDone: () => void;

    constructor(params: QueueConstructorParams);

    /**
     * Starts the next question.
     *
     * ---
     * * This method emits a `willShowNextQuestion` event.
     *   * If the remaining items is 0, this method will emit a `updateQuizProgress`
     *      event and call its `onDone` callback.
     *     * The callback is used by the `QuizQueueController` and redirects the
     *       user to the home page.
     * * This method does not affect API/cache.
     * ---
     * * This method is called by `QuizQueueController#nextItem`.
     * * This method is called by `QuizInputController#submitAnswer`.
     * * This method is called by `QuizInputController#quizQueueOutletConnected`.
     *
     * @param questionType
     */
    nextItem(questionType: "meaning" | "reading"): void;

    /**
     * Submits an answer to the api for the question and updates the queue.
     *
     * ---
     * * Emits a `didAnswerQuestion` event.
     * * Emits an `updateQuizProgress` event if an item is complete.
     * * @see `SRSManager#updateSRS` for its events.
     * * This method affects API/cache.
     *   * It submits answers to the API.
     *   * It re-arranges the item queue.
     * ---
     * * Called by `QuizInputController#submitAnswer`.
     * * Called by `QuizQueueController#submitAnswer`.
     *
     * @param answer
     * @param results
     */
    submitAnswer(answer: string, results: QuestionAnswerResults): void;

    /**
     * Updatese thh current item's stats.
     *
     * @param passed
     */
    updateCurrentItemStats(passed: boolean): void;

    /**
     * Calculates the progress of the quiz.
     *
     * @param percent
     */
    updateQuizProgress(percent?: number): void;

    /**
     * Loads new items and updates the data structures.
     */
    updateQueues(): void;

    /**
     * Repositions the current item somewhere in the queue.
     *
     * @param passed
     */
    shuffleFirstItem(passed: boolean): void;

    fetchMoreItems(): void;
  }
}

declare module "controllers/quiz_queue/queue" {
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
    questionType: "meaning" | "reading";
    currentItem: Subject;

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
  }
}

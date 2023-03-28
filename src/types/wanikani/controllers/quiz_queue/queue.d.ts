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
    constructor(params: QueueConstructorParams);

    /**
     * Starts the next question.
     *
     * @param questionType
     */
    nextItem(questionType: "meaning" | "reading"): void;

    /**
     * Submits an answer to the api for the question and updates the queue.
     *
     * @param answer
     * @param results
     */
    submitAnswer(answer: string, results: QuestionAnswerResults): void;
  }
}


declare module "controllers/quiz_queue_controller" {
 import QuizQueue from "controllers/quiz_queue/queue";
 import { QuestionAnswerResults } from "events/did_answer_question";
  import { ValueDefinitionMap } from "@hotwired/stimulus/dist/types/core/value_properties";
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static targets: string[];
    static values: ValueDefinitionMap;
    get subjectsTarget(): HTMLElement;
    get subjectsTargets(): HTMLElement[];
    get hasSubjectsTarget(): boolean;
    get doneDialogTemplateTarget(): HTMLElement;
    get doneDialogTemplateTargets(): HTMLElement[];
    get hasDoneDialogTemplateTarget(): boolean;
    get subjectIdsWithSRSTarget(): HTMLElement;
    get subjectIdsWithSRSTargets(): HTMLElement[];
    get hasSubjectIdsWithSRSTarget(): boolean;
    get subjectIdsTarget(): HTMLElement;
    get subjectIdsTargets(): HTMLElement[];
    get hasSubjectIdsTarget(): boolean;
    get completionUrlValue(): string;
    set completionUrlValue(value: string);
    get hasCompletionUrlValue(): boolean;
    get doneUrlValue(): string;
    set doneUrlValue(value: string);
    get hasDoneUrlValue(): boolean;
    get itemsUrlValue(): string;
    set itemsUrlValue(value: string);
    get hasItemsUrlValue(): boolean;
    get completeSubjectsInOrderValue(): boolean;
    set completeSubjectsInOrderValue(value: boolean);
    get hasCompleteSubjectsInOrderValue(): boolean;
    get questionOrderValue(): string;
    set questionOrderValue(value: string);
    get hasQuestionOrderValue(): boolean;

    quizQueue: QuizQueue

    initialize(): void;
    /**
     * Starts the next quiz item.
     *
     * @param questionType
     */
    nextItem(questionType: "meaning" | "reading"): void;
    /**
     * Submits an answer.
     *
     * @param answer
     * @param results
     */
    submitAnswer(answer: string, results: QuestionAnswerResults): void;

    onDone(): void;
  }
}

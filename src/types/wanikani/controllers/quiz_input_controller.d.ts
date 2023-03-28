
declare module "controllers/quiz_input_controller" {
  import QuizQueue from "controllers/quiz_queue/queue";
import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static targets: string[];
    static outlets: string[];
    get inputTarget(): HTMLInputElement;
    get inputTargets(): HTMLInputElement[];
    get hasInputTarget(): boolean;
    get buttonTarget(): HTMLButtonElement;
    get buttonTargets(): HTMLButtonElement[];
    get hasButtonTarget(): boolean;
    get inputContainerTarget(): HTMLElement;
    get inputContainerTargets(): HTMLElement[];
    get hasInputContainerTarget(): boolean;
    get questionTypeContainerTarget(): HTMLElement;
    get questionTypeContainerTargets(): HTMLElement[];
    get hasQuestionTypeContainerTarget(): boolean;
    get questionTypeTarget(): HTMLElement;
    get questionTypeTargets(): HTMLElement[];
    get hasQuestionTypeTarget(): boolean;
    get categoryTarget(): HTMLElement;
    get categoryTargets(): HTMLElement[];
    get hasCategoryTarget(): boolean;
    get exeptionTarget(): HTMLElement;
    get exeptionTargets(): HTMLElement[];
    get hasExeptionTarget(): boolean;
    get exceptionContainerTarget(): HTMLElement;
    get exceptionContainerTargets(): HTMLElement[];
    get hasExceptionContainerTarget(): boolean;
    get formTarget(): HTMLFormElement;
    get formTargets(): HTMLFormElement[];
    get hasFormTarget(): boolean;
    get quizQueueOutlet(): unknown; // todo
    get quizQueueOutlets(): unknown[]; // todo
    get quizQueueOutletElement(): HTMLElement;
    get quizQueueOutletElements(): HTMLElement[];
    get hasQuizQueueOutlet(): boolean;
    get quizUserSynonymsOutlet(): unknown; // todo
    get quizUserSynonymsOutlets(): unknown[]; // todo
    get quizUserSynonymsOutletElement(): HTMLElement;
    get quizUserSynonymsOutletElements(): HTMLElement[];
    get hasQuizUserSynonymsOutlet(): boolean;
    /**
     * Initializes the controller and sets up some event listeners.
     */
    initialize(): void;
    /**
     * Registers event listeners and hotkeys.
     */
    connect(): void;
    /**
     * Unregisters event listeners and hotkeys.
     */
    disconnect(): void;
    /**
     * Starts the questions.
     * Should be called sometime on load.
     *
     * @param queue
     */
    quizQueueOutletConnected(queue: QuizQueue): void;
    /**
     * Sets up event listeners for the input field.
     */
    inputTargetConnected(): void;
    submitAnswer(): void;
    appendKanaCharacter(char: string): void;
    deleteCharacter(): void;
  }

}

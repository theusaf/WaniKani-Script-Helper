declare module "controllers/item_info_controller" {
  import DidAnswerQuestionEvent, {
    QuestionAnswerResults,
  } from "events/did_answer_question";
  import { Controller } from "@hotwired/stimulus";
  import { ValueDefinitionMap } from "@hotwired/stimulus/dist/types/core/value_properties";
  export default class extends Controller {
    static classes: string[];
    static targets: string[];
    static values: ValueDefinitionMap;
    urlTemplate: string;
    get toggleTarget(): HTMLElement;
    get toggleTargets(): HTMLElement[];
    get hasToggleTarget(): boolean;
    get exceptionTarget(): HTMLElement;
    get exceptionTargets(): HTMLElement[];
    get hasExceptionTarget(): boolean;
    get toggleDisabledClass(): string;
    get toggleDisabledClasses(): string[];
    get hasToggleDisabledClass(): boolean;
    get exceptionHiddenClass(): string;
    get exceptionHiddenClasses(): string[];
    get hasExceptionHiddenClass(): boolean;
    get autoOpenAfterIncorrectCountValue(): number;
    set autoOpenAfterIncorrectCountValue(value: number);
    get hasAutoOpenAfterIncorrectCountValue(): boolean;
    initialize(): void;
    connect(): void;
    disconnect(): void;
    /**
     * Displays the item info.
     *
     * @param event
     */
    enable(event: DidAnswerQuestionEvent): void;
    /**
     * Hides the item info.
     */
    disable(): void;
    /**
     * Displays warnings for some answers.
     *
     * @param type
     * @param results
     */
    showException(
      type: "meaning" | "reading",
      results: QuestionAnswerResults
    ): void;
    hideException(): void;
  }
}

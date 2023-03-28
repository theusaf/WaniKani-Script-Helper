declare module "controllers/subject_info_controller" {
  import ToggleController from "controllers/toggle_controller";
  import DidAnswerQuestionEvent from "events/did_answer_question";
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static outlets: string[];
    get toggleOutlet(): ToggleController;
    get toggleOutlets(): ToggleController[];
    get toggleOutletElement(): HTMLElement;
    get toggleOutletElements(): HTMLElement[];
    get hasToggleOutlet(): boolean;
    currentQuestionType: string;
    expanded: boolean;
    toggleOutletConnected(outlet: ToggleController): void;
    connect(): void;
    disconnect(): void;
    /**
     * Updates the current question type for the controller.
     *
     * @param event
     */
    didAnswerQuestion(event: DidAnswerQuestionEvent): void;
    /**
     * Expands all information.
     */
    toggleExpandAll(): void;
  }
}

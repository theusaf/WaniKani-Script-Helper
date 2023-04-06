declare module "controllers/quiz_progress_controller" {
  import UpdateQuizProgress from "events/update_quiz_progress";
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static targets: string[];
    get barTarget(): HTMLElement;
    get barTargets(): HTMLElement[];
    get hasBarTarget(): boolean;
    initialize(): void;
    connect(): void;
    disconnect(): void;
    /**
     * Updates the progress bar.
     *
     * @param event
     */
    updateProgress(event: UpdateQuizProgress): void;
  }
}

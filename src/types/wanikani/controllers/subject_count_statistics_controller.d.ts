declare module "controllers/subject_count_statistics_controller" {
  import DidCompleteSubjectEvent from "events/did_complete_subject";
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static targets: string[];
    get countTarget(): HTMLElement;
    get countTargets(): HTMLElement[];
    get hasCountTarget(): boolean;

    initialize(): void;
    connect(): void;
    disconnect(): void;
    /**
     * Updates the remaining item count.
     *
     * @param event
     */
    subjectCompleted(event: DidCompleteSubjectEvent): void;
  }
}

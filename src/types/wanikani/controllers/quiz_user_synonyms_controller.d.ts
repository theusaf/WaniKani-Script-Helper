declare module "controllers/quiz_user_synonyms_controller" {
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static targets: string[];
    get synonymsTarget(): HTMLElement;
    get synonymsTargets(): HTMLElement[];
    get hasSynonymsTarget(): boolean;

    initialize(): void;
    connect(): void;
    disconnect(): void;
    /**
     * Gets the synonyms for the given subject ID.
     *
     * @param subjectId
     */
    synonymsForSubjectId(subjectId: number): string[];
  }
}

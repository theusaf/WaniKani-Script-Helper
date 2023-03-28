declare module "controllers/quiz_statistics_controller" {
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static targets: string[];
    get percentCorrectTarget(): HTMLElement;
    get percentCorrectTargets(): HTMLElement[];
    get hasPercentCorrectTarget(): boolean;
    get completeCountTarget(): HTMLElement;
    get completeCountTargets(): HTMLElement[];
    get hasCompleteCountTarget(): boolean;
    get remainingCountTarget(): HTMLElement;
    get remainingCountTargets(): HTMLElement[];
    get hasRemainingCountTarget(): boolean;
    connect(): void;
    disconnect(): void;
  }
}

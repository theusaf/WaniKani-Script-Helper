declare module "controllers/lesson_modal_controller" {
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static targets: string[];
    get buttonTarget(): HTMLElement;
    get buttonTargets(): HTMLElement[];
    get hasButtonTarget(): boolean;

    currentTabIndex: number;

    initialize(): void;

    /**
     * Enables modal mode.
     */
    connect(): void;
    /**
     * Disables modal mode.
     */
    disconnect(): void;

    resetFocus(): void;

    handleTab(): void;

    registerHotKeys(): void;
  }
}

declare module "controllers/accordion_controller" {
  import { Controller } from "@hotwired/stimulus";

  /**
   * This controller appears to be unused at the moment.
   */
  export default class extends Controller {
    static targets: string[];

    get containerTarget(): HTMLElement;
    get containerTargets(): HTMLElement[];
    get hasContainerTarget(): boolean;

    toggle(): void;
  }
}

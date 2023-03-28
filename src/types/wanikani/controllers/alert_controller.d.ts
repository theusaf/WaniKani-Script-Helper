declare module "controllers/alert_controller" {
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static classes: string[];

    get openClass(): string;
    get openClasses(): string;
    get hasOpenClass(): boolean;

    /**
     * Close the alert.
     *
     * @param event
     */
    close(event: Event): void;
  }
}

declare module "controllers/subject_queue_controller" {
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static targets: string[];
    get itemTarget(): HTMLElement;
    get itemTargets(): HTMLElement[];
    get hasItemTarget(): boolean;
    connect(): void;
    disconnect(): void;
  }

}

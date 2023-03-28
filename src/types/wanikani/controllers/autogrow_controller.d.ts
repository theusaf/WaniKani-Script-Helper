declare module "controllers/autogrow_controller" {
  import { Controller } from "@hotwired/stimulus";

  /**
   * Auto-grows textareas.
   */
  export default class extends Controller {
    initialize(): void;
    connect(): void;
    disconnect(): void;
    autoGrow(): void;
    debounce(func: () => void, wait: number): () => void;
  }
}

declare module "controllers/global_navigation_controller" {
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static targets: string[];
    static classes: string[];
    isDesktopView: boolean;
    isOpen: boolean;
    openClass: string;
    initialize(): void;
    connect(): void;
    disconnect(): void;
    onResize(): void;
    /**
     * Closes the navigation when the user clicks outside of it.
     *
     * @param event
     */
    onDocumentClick(event: Event): void;
    toggle(event: Event): void;
    open(): void;
    close(): void;
  }
}

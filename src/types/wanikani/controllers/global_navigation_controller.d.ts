declare module "controllers/global_navigation_controller" {
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static targets: string[];
    static classes: string[];
    isDesktopView: boolean;
    isOpen: boolean;
    get openClass(): string;
    get openClasses(): string;
    get hasOpenClass(): boolean;
    get toggleTarget(): HTMLElement;
    get toggleTargets(): HTMLElement[];
    get hasToggleTarget(): boolean;
    get navigationContentTarget(): HTMLElement;
    get navigationContentTargets(): HTMLElement[];
    get hasNavigationContentTarget(): boolean;
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

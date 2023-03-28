declare module "controllers/additional_content_controller" {
  import { Controller } from "@hotwired/stimulus";

  export default class extends Controller {
    static targets: string[];
    static classes: string[];

    get openClass(): string;
    get openClasses(): string;
    get hasOpenClass(): boolean;
    get toggleDisabledClass(): string;
    get toggleDisabledClasses(): string;
    get hasToggleDisabledClass(): boolean;
    get toggleOpenClass(): string;
    get toggleOpenClasses(): string;
    get hasToggleOpenClass(): boolean;
    get contentTarget(): HTMLElement;
    get contentTargets(): HTMLElement[];
    get hasContentTarget(): boolean;
    get contentContainerTarget(): HTMLElement;
    get contentContainerTargets(): HTMLElement[];
    get hasContentContainerTarget(): boolean;
    get contentToggleTarget(): HTMLElement;
    get contentToggleTargets(): HTMLElement[];
    get hasContentToggleTarget(): boolean;

    /**
     * Registers listeners and hotkeys.
     */
    connect(): void;

    /**
     * Unregisters listeners.
     */
    disconnect(): void;

    /**
     * Unregisters a hot key for a target.
     *
     * @param target
     */
    contentToggleTargetDisconnected(target: HTMLElement): void;

    /**
     * Sets the target's display to 'block'.
     *
     * @param target
     */
    showContainer(target: HTMLElement): void;

    /**
     * Sets the target's display to 'none'.
     *
     * @param target
     */
    hideContainer(target: HTMLElement): void;

    /**
     * Closes the additional content container.
     * Meant to be run when a question is answered.
     */
    didAnswerQuestion(): void;

    /**
     * Closes the additional content container.
     * Meant to be run when the next question is shown.
     */
    willShowNextQuestion(): void;

    /**
     * Gets the content container for the target of an event.
     *
     * @param event
     */
    contentContainerFromEvent(event: Event): HTMLElement;

    /**
     * Opens the additional content container.
     *
     * @param event
     */
    open(event: Event): void;

    /**
     * Closes the additional content container.
     *
     * @param event
     */
    close(event: Event): void;

    /**
     * Toggles the additional content container.
     *
     * @param event
     */
    toggle(event: Event): void;
  }
}

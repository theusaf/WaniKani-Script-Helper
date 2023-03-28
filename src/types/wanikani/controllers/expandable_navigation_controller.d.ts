declare module "controllers/expandable_navigation_controller" {
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static targets: string[];
    static classes: string[];
    isOpen: boolean;
    isDesktopView: boolean;
    get openClass(): string;
    get openClasses(): string;
    get hasOpenClass(): boolean;
    get toggleTarget(): HTMLElement;
    get toggleTargets(): HTMLElement[];
    get hasToggleTarget(): boolean;
    get expandableChunkTarget(): HTMLElement;
    get expandableChunkTargets(): HTMLElement[];
    get hasExpandableChunkTarget(): boolean;
    get expandableChunkContentTarget(): HTMLElement;
    get expandableChunkContentTargets(): HTMLElement[];
    get hasExpandableChunkContentTarget(): boolean;
    initialize(): void;
    connect(): void;
    disconnect(): void;
    toggle(event: Event): void;
    open(): void;
    close(): void;
  }
}

declare module "controllers/expandable_navigation_controller" {
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static targets: string[];
    static classes: string[];
    isOpen: boolean;
    isDesktopView: boolean;
    openClass: string;
    initialize(): void;
    connect(): void;
    disconnect(): void;
    toggle(event: Event): void;
    open(): void;
    close(): void;
  }
}

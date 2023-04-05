declare module "controllers/hotkeys_controller" {
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static classes: string[];
    get menuOpenClass(): string;
    get menuOpenClasses(): string;
    get hasMenuOpenClass(): boolean;

    initialize(): void;

    /**
     * Registers the controller hotkey.
     */
    connect(): void;
    /**
     * Unregisters the controller hotkey.
     */
    disconnect(): void;
    /**
     * Toggles the menu.
     */
    toggleMenu(): void;

    /**
     * Clicks on the element it controls.
     */
    onHotKey(): void;
  }
}

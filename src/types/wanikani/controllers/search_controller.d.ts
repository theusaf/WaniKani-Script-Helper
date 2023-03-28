declare module "controllers/search_controller" {
  import { ValueDefinitionMap } from "@hotwired/stimulus/dist/types/core/value_properties";
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static values: ValueDefinitionMap;
    static classes: string[];
    static targets: string[];
    get connectedValue(): boolean;
    set connectedValue(value: boolean);
    get hasConnectedValue(): boolean;
    get openClass(): string;
    get openClasses(): string;
    get hasOpenClass(): boolean;
    get searchFormTarget(): HTMLElement;
    get searchFormTargets(): HTMLElement[];
    get hasSearchFormTarget(): boolean;
    get toggleTarget(): HTMLElement;
    get toggleTargets(): HTMLElement[];
    get hasToggleTarget(): boolean;
    get inputTarget(): HTMLInputElement;
    get inputTargets(): HTMLInputElement[];
    get hasInputTarget(): boolean;
    connect(): void;
    disconnect(): void;
    /**
     * Toggles the search form.
     */
    toggle(): void;
  }
}

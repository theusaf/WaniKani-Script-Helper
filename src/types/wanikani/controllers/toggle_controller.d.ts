declare module "controllers/toggle_controller" {
  import { ValueDefinitionMap } from "@hotwired/stimulus/dist/types/core/value_properties";
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static targets: string[];
    static classes: string[];
    static values: ValueDefinitionMap;
    get contentTarget(): HTMLElement;
    get contentTargets(): HTMLElement[];
    get hasContentTarget(): boolean;
    get toggleTarget(): HTMLElement;
    get toggleTargets(): HTMLElement[];
    get hasToggleTarget(): boolean;
    get toggleClass(): string;
    get toggleClasses(): string;
    get hasToggleClass(): boolean;
    get contentClass(): string;
    get contentClasses(): string;
    get hasContentClass(): boolean;
    get appliesClassOnExpandValue(): boolean;
    set appliesClassOnExpandValue(value: boolean);
    get hasAppliesClassOnExpandValue(): boolean;
    get contextValue(): any;
    set contextValue(value: any);
    get hasContextValue(): boolean;
    initialize(): void;
    connect(): void;
    toggle(event: Event): void;
    expand(): void;
    collapse(): void;
  }
}

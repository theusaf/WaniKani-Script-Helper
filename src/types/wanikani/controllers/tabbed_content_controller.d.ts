declare module "controllers/tabbed_content_controller" {
  import { ValueDefinitionMap } from "@hotwired/stimulus/dist/types/core/value_properties";
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static targets: string[];
    static values: ValueDefinitionMap;
    get tabTarget(): HTMLElement;
    get tabTargets(): HTMLElement[];
    get hasTabTarget(): boolean;
    get contentTarget(): HTMLElement;
    get contentTargets(): HTMLElement[];
    get hasContentTarget(): boolean;
    get nextTabHotKeyValue(): string;
    set nextTabHotKeyValue(value: string);
    get hasNextTabHotKeyValue(): boolean;
    get previousTabHotKeyValue(): string;
    set previousTabHotKeyValue(value: string);
    get hasPreviousTabHotKeyValue(): boolean;
    connect(): void;
    disconnect(): void;
    changeTab(event: Event): void;
  }
}

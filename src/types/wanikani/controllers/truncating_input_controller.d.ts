declare module "controllers/truncating_input_controller" {
  import { ValueDefinitionMap } from "@hotwired/stimulus/dist/types/core/value_properties";
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static targets: string[];
    static values: ValueDefinitionMap;
    get remainingCountTarget(): HTMLElement;
    get remainingCountTargets(): HTMLElement[];
    get hasRemainingCountTarget(): boolean;
    get inputTarget(): HTMLInputElement;
    get inputTargets(): HTMLInputElement[];
    get hasInputTarget(): boolean;
    get maxLengthValue(): number;
    set maxLengthValue(value: number);
    get hasMaxLengthValue(): boolean;
    initialize(): void;
    /**
     * Updates the number of characters remaining.
     */
    updateCount(): void;
    /**
     * Truncates the text in the input to the maximum length.
     */
    truncateText(): void;
  }
}

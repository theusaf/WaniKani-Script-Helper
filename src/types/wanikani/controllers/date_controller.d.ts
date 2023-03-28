declare module "controllers/date_controller" {
  import { Controller } from "@hotwired/stimulus";
  import { ValueDefinitionMap } from "@hotwired/stimulus/dist/types/core/value_properties";
  export default class extends Controller {
    static values: ValueDefinitionMap;
    /**
     * Formats the initial date for the element.
     */
    connect(): void;
    disconnect(): void;
    /**
     * Formats the date for the element.
     */
    formatDate(): void;
    /**
     * Formats the date for the element and starts a timer to update it.
     */
    formatNextReviewDate(): void;
    /**
     * Converts a time offset in milliseconds to a human-readable string.
     *
     * @param offset The time in milliseconds to convert to words.
     */
    wordsFromTimeOffset(offset: number): string;
    /**
     * Breaks a time offset in milliseconds into parts.
     *
     * @param offset The time in milliseconds to convert to parts.
     */
    timePartsFromTimeOffset(offset: number): {
      seconds: number;
      minutes: number;
      hours: number;
      days: number;
      years: number;
    };
  }
}

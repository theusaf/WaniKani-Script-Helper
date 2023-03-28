declare module "controllers/audio_player_controller" {
  import { Controller } from "@hotwired/stimulus";
  import { ValueDefinitionMap } from "@hotwired/stimulus/dist/types/core/value_properties";
  export default class extends Controller {
    static targets: string[];
    static classes: string[];
    static values: ValueDefinitionMap;

    playing: boolean;
    initialize(): void;
    /**
     * Initializes listeners.
     * Run when controller is connected.
     */
    connect(): void;
    /**
     * Stops the audio.
     * Run when controller is disconnected.
     */
    disconnect(): void;
    /**
     * Begins playing the audio.
     *
     * @param event
     */
    play(event: Event): void;
    /**
     * Pauses the audio.
     */
    stop(): void;
  }
}

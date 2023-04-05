declare module "controllers/audio_player_controller" {
  import { Controller } from "@hotwired/stimulus";
  import { ValueDefinitionMap } from "@hotwired/stimulus/dist/types/core/value_properties";
  export default class extends Controller {
    static targets: string[];
    static classes: string[];
    static values: ValueDefinitionMap;

    get playingClass(): string;
    get playingClasses(): string;
    get hasPlayingClass(): boolean;
    get stoppedClass(): string;
    get stoppedClasses(): string;
    get hasStoppedClass(): boolean;
    get controlClass(): string;
    get controlClasses(): string;
    get hasControlClass(): boolean;
    get autoPlayValue(): boolean;
    set autoPlayValue(value: boolean);
    get hasAutoPlayValue(): boolean;
    get audioTarget(): HTMLAudioElement;
    get audioTargets(): HTMLAudioElement[];
    get hasAudioTarget(): boolean;
    get controlTarget(): HTMLElement;
    get controlTargets(): HTMLElement[];
    get hasControlTarget(): boolean;

    playing: boolean;
    observer: IntersectionObserver;

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

    visibilityChange(observers: IntersectionObserverEntry[]): void;
    registerHotKeys(): void;
    deregisterHotKeys(): void;
  }
}

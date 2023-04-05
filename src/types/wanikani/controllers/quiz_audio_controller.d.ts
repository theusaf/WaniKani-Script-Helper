declare module "controllers/quiz_audio_controller" {
  import { ValueDefinitionMap } from "@hotwired/stimulus/dist/types/core/value_properties";
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static targets: string[];
    static classes: string[];
    static values: ValueDefinitionMap;
    get audioTarget(): HTMLAudioElement;
    get audioTargets(): HTMLAudioElement[];
    get hasAudioTarget(): boolean;
    get iconTarget(): HTMLElement;
    get iconTargets(): HTMLElement[];
    get hasIconTarget(): boolean;
    get playButtonTarget(): HTMLElement;
    get playButtonTargets(): HTMLElement[];
    get hasPlayButtonTarget(): boolean;
    get prefererdVoiceActorIdValue(): number;
    set preferredVoiceActorIdValue(value: number);
    get hasPreferredVoiceActorIdValue(): boolean;
    get autoPlayValue(): boolean;
    set autoPlayValue(value: boolean);
    get hasAutoPlayValue(): boolean;

    playing: boolean;
    canPlay: boolean;
    clearOnStop: boolean;

    initialize(): void;
    connect(): void;
    disconnect(): void;
    playButtonTargetConnected(target: HTMLElement): void;
    playButtonTargetDisconnected(target: HTMLElement): void;
    willShowNextQuestion(): void;
    didAnswerQuestion(): void;
    clearSources(): void;
    /**
     * Loads the audio and prepares to play.
     */
    loadAudio(): void;
    play(): void;
    stop(): void;
  }
}

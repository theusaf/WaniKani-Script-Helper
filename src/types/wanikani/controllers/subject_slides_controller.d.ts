declare module "controllers/subject_slides_controller" {
  import AudioPlayerController from "controllers/audio_player_controller";
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static targets: string[];
    static outlets: string[];
    get slideTarget(): HTMLElement;
    get slideTargets(): HTMLElement[];
    get hasSlideTarget(): boolean;
    get navigationItemTarget(): HTMLElement;
    get navigationItemTargets(): HTMLElement[];
    get hasNavigationItemTarget(): boolean;
    get audioPlayerOutlet(): AudioPlayerController;
    get audioPlayerOutlets(): AudioPlayerController[];
    get audioPlayerOutletElement(): HTMLElement;
    get audioPlayerOutletElements(): HTMLElement[];
    get hasAudioPlayerOutlet(): boolean;
    connect(): void;
    disconnect(): void;
    switchSlide(event: Event): void;
  }
}

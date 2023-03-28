declare module "controllers/quiz_header_controller" {
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static targets: string[];
    static classes: string[];
    get charactersTarget(): HTMLElement;
    get charactersTargets(): HTMLElement[];
    get hasCharactersTarget(): boolean;
    get meaningTarget(): HTMLElement;
    get meaningTargets(): HTMLElement[];
    get hasMeaningTarget(): boolean;
    get characterImageTarget(): HTMLElement;
    get characterImageTargets(): HTMLElement[];
    get hasCharacterImageTarget(): boolean;
    get srsContainerTarget(): HTMLElement;
    get srsContainerTargets(): HTMLElement[];
    get hasSrsContainerTarget(): boolean;
    get srsIconUpTarget(): HTMLElement;
    get srsIconUpTargets(): HTMLElement[];
    get hasSrsIconUpTarget(): boolean;
    get srsIconDownTarget(): HTMLElement;
    get srsIconDownTargets(): HTMLElement[];
    get hasSrsIconDownTarget(): boolean;
    get srsTextTarget(): HTMLElement;
    get srsTextTargets(): HTMLElement[];
    get hasSrsTextTarget(): boolean;
    get baseClass(): string;
    get baseClasses(): string;
    get hasBaseClass(): boolean;
    initialize(): void;
    connect(): void;
    disconnect(): void;
  }

}

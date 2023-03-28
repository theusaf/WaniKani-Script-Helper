
declare module "controllers/kana_chart_controller" {
  import QuizInputController from "controllers/quiz_input_controller";
import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static targets: string[];
    static classes: string[];
    static outlets: string[];
    currentTab: HTMLElement;
    activeContent: HTMLElement;
    get activeTabClass(): string;
    get hasQuizInputOutlet(): boolean;
    get quizInputOutletHTMLElement(): HTMLElement;
    get quizInputOutletHTMLElements(): HTMLElement[];
    get tabTargets(): HTMLElement[];
    get tabTarget(): HTMLElement;
    get hasTabTarget(): boolean;
    get tabContentTarget(): HTMLElement;
    get tabContentTargets(): HTMLElement[];
    get hasTabContentTarget(): boolean;
    get quizInputOutlet(): QuizInputController;
    get quizInputOutlets(): QuizInputController[];
    connect(): void;
    showTabContent(event: Event): void;
    sendCharacter(event: Event): void;
    deleteCharacter(): void;
  }
}

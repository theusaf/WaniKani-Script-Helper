declare module "controllers/scrollable_controller" {
  import { Controller } from "@hotwired/stimulus";
  export default class extends Controller {
    static outlets: string[];

    get bodyOutlet(): Controller;
    get bodyOutlets(): Controller[];
    get hasBodyOutlet(): boolean;
    get bodyOutletElement(): HTMLElement;
    get bodyOutletElements(): HTMLElement[];

    initialize(): void;
    connect(): void;
    disconnect(): void;
    bodyOutletConnected(body: Controller): void;
    adjustOffset(): void;
    scrollIntoView(element: HTMLElement): void;
    scrollToTop(element: HTMLElement, offset: number): void;
  }
}

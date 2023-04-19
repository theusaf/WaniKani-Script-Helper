export interface VisualViewportShim extends VisualViewport {
  addEventListener(
    eventType: string,
    callback: (...input: any) => void,
    options: boolean | AddEventListenerOptions
  ): void;
  removeEventListener(
    eventType: string,
    callback: (...input: any) => void,
    options: boolean | AddEventListenerOptions
  ): void;
  get offsetTop(): 0;
  get offsetLeft(): 0;
  get pageTop(): 0;
  get pageLeft(): 0;
  get width(): number;
  get height(): number;
  get scale(): 1;
}

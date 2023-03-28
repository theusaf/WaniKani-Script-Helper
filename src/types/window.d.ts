import ConnectionTimeout from "events/connection_timeout";
import DidAnswerQuestionEvent from "events/did_answer_question";
import DidChangeSRSEvent from "events/did_change_srs_event";
import DidUpdateUserSynonymsEvent from "events/did_update_user_synonyms";
import RegisterWrapUpObserver from "events/register_wrap_up_observer";
import { KeyboardManager } from "lib/keyboard_manager";

interface WaniKaniEvents {
  connectionTimeout: ConnectionTimeout;
  didAnswerQuestion: DidAnswerQuestionEvent;
  didChangeSRS: DidChangeSRSEvent;
  didUpdateUserSynonyms: DidUpdateUserSynonymsEvent;
  registerWrapUpObserver: RegisterWrapUpObserver;
}

declare global {
  interface Window {
    keyboardManager: KeyboardManager;
  }

  interface EventTarget {
    addEventListener<K extends keyof WaniKaniEvents>(
      type: K,
      listener: (this: EventTarget, ev: WaniKaniEvents[K]) => void,
      options?: boolean | AddEventListenerOptions
    ): void;
    removeEventListener<K extends keyof WaniKaniEvents>(
      type: K,
      listener: (this: EventTarget, ev: WaniKaniEvents[K]) => void,
      options?: boolean | EventListenerOptions
    ): void;
    dispatchEvent<K extends keyof WaniKaniEvents>(
      event: WaniKaniEvents[K]
    ): boolean;
  }
}

import ConnectionTimeout from "events/connection_timeout";
import DidAnswerQuestionEvent from "events/did_answer_question";
import DidChangeSRSEvent from "events/did_change_srs_event";
import DidUpdateUserSynonymsEvent from "events/did_update_user_synonyms";
import RegisterWrapUpObserverEvent from "events/register_wrap_up_observer";
import DidCompleteSubjectEvent from "events/did_complete_subject";
import UpdateQuizProgress from "events/update_quiz_progress";
import WillShowNextQuestionEvent from "events/will_show_next_question";
import { KeyboardManager } from "lib/keyboard_manager";
import {
  TurboBeforeCacheEvent,
  TurboBeforeVisitEvent,
  TurboLoadEvent,
} from "@Hotwired/turbo";

interface WaniKaniEvents {
  connectionTimeout: ConnectionTimeout;
  didAnswerQuestion: DidAnswerQuestionEvent;
  didCompleteSubject: DidCompleteSubjectEvent;
  didChangeSRS: DidChangeSRSEvent;
  didUpdateUserSynonyms: DidUpdateUserSynonymsEvent;
  registerWrapUpObserver: RegisterWrapUpObserverEvent;
  updateQuizProgress: UpdateQuizProgress;
  willShowNextQuestion: WillShowNextQuestionEvent;
  audioWillPlay: CustomEvent;
  willOpenContent: CustomEvent;
}

export interface Events {
  /**
   * Fired when the connection is lost.
   */
  ConnectionTimeout: "connectionTimeout";
  /**
   * Fired when a question is answered.
   */
  QuestionAnswered: "didAnswerQuestion";
  /**
   * Fired when a subject is completed.
   */
  SubjectCompleted: "didCompleteSubject";
  /**
   * Fired when the SRS level of a subject changes.
   */
  SRSChanged: "didChangeSRS";
  /**
   * Fired when the user's synonyms are updated.
   */
  UserSynonymsUpdated: "didUpdateUserSynonyms";
  /**
   * Fired when a wrap-up observer is registered.
   */
  WrapUpObserverRegistration: "registerWrapUpObserver";
  /**
   * Fired when the quiz progress is updated.
   */
  QuizProgressUpdated: "updateQuizProgress";
  /**
   * Fired when the next question is about to be displayed.
   */
  NextQuestionWillDisplay: "willShowNextQuestion";
  /**
   * Fired when audio is about to play.
   */
  AudioWillPlay: "audioWillPlay";
  /**
   * Fired when content is about to be opened.
   */
  ContentWillOpen: "willOpenContent";
}

export type LocationMatcher = RegExp | string | ((url: string) => boolean);
export type ScriptCallback<K extends Event = Event> =
  | ((event: K) => void)
  | (() => void);
export interface WKHFScriptParams {
  locationMatcher: LocationMatcher;
  ignoreActiveState?: boolean;
  onBeforeVisit?: ScriptCallback<TurboBeforeVisitEvent>;
  onBeforeCache?: ScriptCallback<TurboBeforeCacheEvent>;
  onLoad?: ScriptCallback<TurboLoadEvent>;
  activate?: () => void;
  deactivate?: () => void;
}
export interface WKHFScript {
  locationMatcher: LocationMatcher;
}

export type EventListenerCallback<K extends keyof WaniKaniEvents> = (
  event: WaniKaniEvents[K]
) => void;

export interface WKHF {
  version: string;
  Events: Events;
  addEventListener<K extends keyof WaniKaniEvents>(
    event: K,
    listener: EventListenerCallback<K>
  ): void;
  removeEventListener<K extends keyof WaniKaniEvents>(
    event: K,
    listener: EventListenerCallback<K>
  ): void;
  registerScript(name: string, params: WKHFScriptParams): WKHFScript;
  unregisterScript(name: string): void;
  fetchScript(url: string): WKHFScript;
}

declare global {
  interface GlobalEventHandlersEventMap extends WaniKaniEvents {}
  interface Window {
    keyboardManager: KeyboardManager;
    FrontChat(command: string): void;
    wkhf: WKHF;
  }
}

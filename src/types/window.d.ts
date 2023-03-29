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
  /**
   * The matcher used to determine whether the script should
   * be active on a given location.
   *
   * This can be a regular expression, a string
   * (glob pattern), or a function.
   */
  locationMatcher: LocationMatcher;
  /**
   * Whether the script should listen to events even if it is not active.
   */
  ignoreActiveState?: boolean;
  /**
   * A callback that is fired before a new page is visited.
   * This occurs during turbo:before-visit, regardless of whether
   * the script matches both the current and next location.
   */
  onBeforeVisit?: ScriptCallback<TurboBeforeVisitEvent>;
  /**
   * A callback that is fired before the page is cached.
   * This occurs during turbo:before-cache, regardless of whether
   * the script matches both the current and next location.
   */
  onBeforeCache?: ScriptCallback<TurboBeforeCacheEvent>;
  /**
   * A callback that is fired when the page is loaded.
   * This occurs during turbo:load, regardless of whether
   * the script matches both the current and next location.
   */
  onLoad?: ScriptCallback<TurboLoadEvent>;
  /**
   * A callback that is fired when the script is activated.
   * Use it to set up listeners, observers, etc.
   */
  activate?: () => void;
  /**
   * A callback that is fired when the script is deactivated.
   * Use it to remove listeners, observers, things that you
   * do not want to be cached by Turbo, etc.
   */
  deactivate?: () => void;
}
export class WKHFScript {
  /**
   * The matcher used to determine whether the script should
   * be active on a given location.
   */
  locationMatcher: LocationMatcher;
  /**
   * Whether the script is active.
   */
  isActive: boolean;
  /**
   * Whether the script should listen to events even if it is not active.
   */
  ignoreActiveState: boolean;
  /**
   * Fired when the page is about to be visited. This occurs during
   * turbo:before-visit.
   *
   * @param event The event object.
   */
  onBeforeVisit: ScriptCallback<TurboBeforeVisitEvent>;
  /**
   * Fired when the page is about to be cached. This occurs during
   * turbo:before-cache.
   *
   * @param event The event object.
   */
  onBeforeCache: ScriptCallback<TurboBeforeCacheEvent>;
  /**
   * Fired when the page is loaded. This occurs during turbo:load.
   *
   * @param event The event object.
   */
  onLoad: ScriptCallback<TurboLoadEvent>;
  /**
   * Activates the script. This is called when the script is registered or when
   * the page changes to a location that matches the script's location matcher.
   * This occurs during turbo:load.
   */
  activate: () => void;
  /**
   * Deactivates the script. This is called when the script is unregistered or
   * when the page changes to a location that does not match the script's
   * location matcher. This occurs during turbo:before-cache.
   */
  deactivate: () => void;
  /**
   * Checks whether the script's location matcher matches the given location.
   *
   * @param url The location href to check.
   */
  doesLocationMatch(url: string): boolean;
  setOnBeforeVisit(callback: ScriptCallback<TurboBeforeVisitEvent>): void;
  setOnBeforeCache(callback: ScriptCallback<TurboBeforeCacheEvent>): void;
  setOnLoad(callback: ScriptCallback<TurboLoadEvent>): void;
  setActivate(callback: () => void): void;
  setDeactivate(callback: () => void): void;
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

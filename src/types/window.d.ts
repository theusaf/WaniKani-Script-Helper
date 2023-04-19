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
import { Application } from "@hotwired/stimulus";
import { VisualViewportShim } from "./wanikani/lib/polyfills/visual_viewport";

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
   *
   * ---
   * * Listened to by `TimeoutController`.
   * ---
   * * Emitted by `QuizAPI#submitFailed` when the connection is lost.
   * * Emitted by `QuizAPI#itemComplete` when the connection is lost.
   */
  ConnectionTimeout: "connectionTimeout";
  /**
   * Fired when a question is answered.
   *
   * ---
   * * Listened to by `AdditionalContentController` to close the additional
   *   content section.
   * * Listened to by `ItemInfoController` to enable the item info section.
   *   It may also show the item info section.
   * * Listened to by `QuizAudioController` to play the audio.
   * * Listened to by `QuizStatisticsController` to update the statistics
   *   display.
   * * Listened to by `SubjectInfoController` to update the subject info
   *   display.
   * ---
   * * Emitted by `QuizQueue#submitAnswer`.
   */
  QuestionAnswered: "didAnswerQuestion";
  /**
   * Fired when a subject is completed.
   *
   * ---
   * * Listened to by `QuizStatisticsController` to update the remaining
   *   items statistic.
   * * Listened to by `SubjectCountStatisticsController` to update the
   *   remaining items statistic.
   * ---
   * * Emitted by `QuizQueue#submitAnswer` when the subject is completed.
   */
  SubjectCompleted: "didCompleteSubject";
  /**
   * Fired when the SRS level of a subject changes.
   *
   * ---
   * * Listened to by `QuizHeaderController` to display the new SRS level
   *   for the item.
   * ---
   * * Emitted by `SRSManager#updateSRS`.
   */
  SRSChanged: "didChangeSRS";
  /**
   * Fired when the user's synonyms are updated.
   *
   * ---
   * * Listened to by `QuizUserSynonymsController` to update the user's
   *   synonyms for a subject in memory.
   * ---
   * * Emitted by `UserSynonymsController#connect`.
   */
  UserSynonymsUpdated: "didUpdateUserSynonyms";
  /**
   * Fired when a wrap-up observer is registered.
   *
   * ---
   * * Listened to by `WrapUpManager` to add the observer to its list and
   *   call its `onRegistration` callback.
   * ---
   * * Emitted by `WrapUpController#toggle` on the first toggle.
   */
  WrapUpObserverRegistration: "registerWrapUpObserver";
  /**
   * Fired when the quiz progress is updated.
   *
   * ---
   * * Listened to by `QuizProgressController` to update the progress bar.
   * ---
   * * Emitted by `QuizQueue#submitAnswer` when the subject is completed.
   * * Emitted by `QuizQueue#nextItem` when there are no more items.
   * * Emitted by `QuizQueue` at the start of the quiz (when the queue
   *   is created).
   */
  QuizProgressUpdated: "updateQuizProgress";
  /**
   * Fired when the next question is about to be displayed.
   *
   * ---
   * * Listened to by `AdditionalContentController` to close the additional
   *   content section.
   * * Listened to by `ItemInfoController` to disable the item info section.
   * * Listened to by `QuizAudioController` to stop the audio.
   * * Listened to by `QuizHeaderController` to update the quiz header or
   *   css classes.
   * * Listened to by `QuizInputController` to update the input field's
   *   placeholder and labels.
   * ---
   * * Emitted by `QuizQueue#nextItem` when there are more items.
   */
  NextQuestionWillDisplay: "willShowNextQuestion";
  /**
   * Fired when audio is about to play.
   *
   * ---
   * * Emitted by `QuizAudioController#play` if enabled.
   */
  AudioWillPlay: "audioWillPlay";
  /**
   * Fired when content is about to be opened.
   *
   * ---
   * * Emitted by `AudioPlayerController#play` if not already
   *   playing audio.
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
    Stimulus: Application;
  }
}

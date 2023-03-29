// ==UserScript==
// @name         WaniKani Hotwired Framework
// @namespace    https://theusaf.org
// @author       theusaf
// @description  A framework for writing scripts for WaniKani, focused on WaniKani's Hotwired actions.
// @version      1.0.0
// @match        https://www.wanikani.com/*
// @match        https://preview.wanikani.com/*
// @copyright    2023 theusaf
// @license      MIT
// @run-at       document-start
// @grant        none
// ==/UserScript==

import { EventListenerCallback, WaniKaniEvents } from "./types/window";

(function () {
  const wkhfListeners = new Map<
    keyof WaniKaniEvents,
    Set<EventListenerCallback<keyof WaniKaniEvents>>
  >();

  // ———————————————————————————— Public Items ————————————————————————————

  enum Events {
    /**
     * Fired when the connection is lost.
     */
    ConnectionTimeout = "connectionTimeout",
    /**
     * Fired when a question is answered.
     */
    QuestionAnswered = "didAnswerQuestion",
    /**
     * Fired when a subject is completed.
     */
    SubjectCompleted = "didCompleteSubject",
    /**
     * Fired when the SRS level of a subject changes.
     */
    SRSChanged = "didChangeSRS",
    /**
     * Fired when the user's synonyms are updated.
     */
    UserSynonymsUpdated = "didUpdateUserSynonyms",
    /**
     * Fired when a wrap-up observer is registered.
     */
    WrapUpObserverRegistration = "registerWrapUpObserver",
    /**
     * Fired when the quiz progress is updated.
     */
    QuizProgressUpdated = "updateQuizProgress",
    /**
     * Fired when the next question is about to be displayed.
     */
    NextQuestionWillDisplay = "willShowNextQuestion",
    /**
     * Fired when audio is about to play.
     */
    AudioWillPlay = "audioWillPlay",
    /**
     * Fired when content is about to be opened.
     */
    ContentWillOpen = "willOpenContent",
  }

  function addEventListener<K extends keyof WaniKaniEvents>(
    event: K,
    listener: EventListenerCallback<K>
  ) {
    if (!wkhfListeners.has(event)) wkhfListeners.set(event, new Set());
    wkhfListeners.get(event).add(listener);
  }

  function removeEventListener<K extends keyof WaniKaniEvents>(
    event: K,
    listener: EventListenerCallback<K>
  ) {
    if (!wkhfListeners.has(event)) return;
    wkhfListeners.get(event).delete(listener);
  }

  window.wkhf = {
    version: "1.0.0",
    addEventListener,
    removeEventListener,
    Events,
  };
})();

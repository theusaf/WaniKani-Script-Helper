// ==UserScript==
// @name             WaniKani Hotwired Framework
// @name:ja          WaniKaniのHotwiredのフレームワーク
// @namespace        https://theusaf.org
// @homepage         https://github.com/theusaf/wkhf
// @icon             https://img.craiyon.com/2023-03-29/2e148260a9c5412a94c4fc6ee49e4352.webp
// @author           theusaf
// @description      A framework for writing scripts for WaniKani, focused on WaniKani's Hotwired actions.
// @description:ja   WaniKaniのHotwiredアクションに焦点を当てた、WaniKaniのスクリプトを作るためのフレームワークです。
// @version          1.0.0
// @match            https://www.wanikani.com/*
// @match            https://preview.wanikani.com/*
// @copyright        2023 theusaf
// @license          MIT
// @run-at           document-start
// @grant            none
// ==/UserScript==

"use strict";

import {
  EventListenerCallback,
  LocationMatcher,
  ScriptCallback,
  WaniKaniEvents,
  WKHFScriptParams,
} from "./types/window";
import {
  TurboBeforeCacheEvent,
  TurboBeforeVisitEvent,
  TurboLoadEvent,
} from "@Hotwired/turbo";

enum Events {
  ConnectionTimeout = "connectionTimeout",
  QuestionAnswered = "didAnswerQuestion",
  SubjectCompleted = "didCompleteSubject",
  SRSChanged = "didChangeSRS",
  UserSynonymsUpdated = "didUpdateUserSynonyms",
  WrapUpObserverRegistration = "registerWrapUpObserver",
  QuizProgressUpdated = "updateQuizProgress",
  NextQuestionWillDisplay = "willShowNextQuestion",
  AudioWillPlay = "audioWillPlay",
  ContentWillOpen = "willOpenContent",
}

(function () {
  // ~~ Event Listening
  const wkhfListeners = new Map<
    keyof WaniKaniEvents,
    Set<EventListenerCallback<keyof WaniKaniEvents>>
  >();

  for (const event of Object.keys(Events)) {
    window.addEventListener(event, (event) => {
      const type = event.type as keyof WaniKaniEvents;
      if (!wkhfListeners.has(type)) return;
      for (const listener of wkhfListeners.get(type)) {
        listener(event as CustomEvent);
      }
    });
  }

  // Loading/unloading scripts
  class WKHFScript {
    locationMatcher: LocationMatcher;
    isActive: boolean;
    ignoreActiveState: boolean;
    #onBeforeVisit?: ScriptCallback<TurboBeforeVisitEvent>;
    #onBeforeCache?: ScriptCallback<TurboBeforeCacheEvent>;
    #onLoad?: ScriptCallback<TurboLoadEvent>;
    #deactivate?: () => void;
    #activate?: () => void;

    constructor({
      locationMatcher,
      ignoreActiveState = false,
      onBeforeVisit,
      onBeforeCache,
      onLoad,
      activate,
      deactivate,
    }: WKHFScriptParams) {
      this.locationMatcher = locationMatcher;
      this.#onBeforeVisit = onBeforeVisit;
      this.#onBeforeCache = onBeforeCache;
      this.#onLoad = onLoad;
      this.#activate = activate;
      this.#deactivate = deactivate;
      this.isActive = false;
      this.ignoreActiveState = ignoreActiveState;
    }

    onBeforeVisit(event: TurboBeforeVisitEvent) {
      try {
        this.#onBeforeVisit?.(event);
      } catch (e) {
        console.error(e);
      }
    }
    onBeforeCache(event: TurboBeforeCacheEvent) {
      try {
        this.#onBeforeCache?.(event);
      } catch (e) {
        console.error(e);
      }
    }
    onLoad(event: TurboLoadEvent) {
      try {
        this.#onLoad?.(event);
      } catch (e) {
        console.error(e);
      }
    }
    activate() {
      try {
        this.#activate?.();
        this.isActive = true;
      } catch (e) {
        console.error(e);
      }
    }
    deactivate() {
      try {
        this.#deactivate?.();
        this.isActive = false;
      } catch (e) {
        console.error(e);
      }
    }

    setOnBeforeVisit(onBeforeVisit: ScriptCallback<TurboBeforeVisitEvent>) {
      this.#onBeforeVisit = onBeforeVisit;
    }
    setOnBeforeCache(onBeforeCache: ScriptCallback<TurboBeforeCacheEvent>) {
      this.#onBeforeCache = onBeforeCache;
    }
    setOnLoad(onLoad: ScriptCallback<TurboLoadEvent>) {
      this.#onLoad = onLoad;
    }
    setActivate(activate: () => void) {
      this.#activate = activate;
    }
    setDeactivate(deactivate: () => void) {
      this.#deactivate = deactivate;
    }

    doesLocationMatch(url: string) {
      try {
        switch (typeof this.locationMatcher) {
          case "string": {
            // treat like a glob
            const glob = this.locationMatcher
              .replace(/\./g, "\\.")
              .replace(/\*/g, ".*")
              .replace(/\?/g, ".");
            const regex = new RegExp(glob);
            return regex.test(url);
          }
          case "function":
            return this.locationMatcher(url);
          case "object":
            return this.locationMatcher.test(url);
        }
      } catch (e) {
        console.error(e);
        return false;
      }
    }
  }
  const wkhfScripts = new Map<string, WKHFScript>();
  let nextUrl = window.location.href;
  window.addEventListener(
    "turbo:before-visit",
    (event: TurboBeforeVisitEvent) => {
      nextUrl = event.detail.url;
      for (const script of wkhfScripts.values()) {
        if (script.isActive || script.ignoreActiveState) {
          script.onBeforeVisit(event);
        }
      }
    }
  );
  window.addEventListener(
    "turbo:before-cache",
    (event: TurboBeforeCacheEvent) => {
      for (const script of wkhfScripts.values()) {
        if (script.isActive || script.ignoreActiveState) {
          script.onBeforeCache(event);
          if (script.isActive && !script.doesLocationMatch(nextUrl)) {
            script.deactivate();
          }
        }
      }
    }
  );
  window.addEventListener("turbo:load", (event: TurboLoadEvent) => {
    for (const script of wkhfScripts.values()) {
      if (script.doesLocationMatch(window.location.href)) {
        script.onLoad(event);
        if (!script.isActive) script.activate();
      }
    }
  });

  // ———————————————————————————— Public Methods ————————————————————————————

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

  function registerScript(name: string, script: WKHFScriptParams) {
    if (wkhfScripts.has(name)) {
      throw new Error(`Script '${name}' already exists`);
    }
    const scriptReference = new WKHFScript(script);
    wkhfScripts.set(name, scriptReference);
    if (scriptReference.doesLocationMatch(window.location.href)) {
      scriptReference.activate();
    }
    return scriptReference;
  }
  function unregisterScript(name: string) {
    const script = fetchScript(name);
    if (!script) return;
    if (script.isActive) script.deactivate();
    wkhfScripts.delete(name);
  }
  function fetchScript(name: string) {
    return wkhfScripts.get(name);
  }

  window.wkhf = {
    version: "1.0.0",
    addEventListener,
    removeEventListener,
    Events,
    registerScript,
    unregisterScript,
    fetchScript,
  };
})();

// ==UserScript==
// @name             WaniKani Hotwired Framework
// @name:ja          WaniKaniのHotwiredのフレームワーク
// @namespace        https://theusaf.org
// @homepage         https://github.com/theusaf/wkhf
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
Object.defineProperty(exports, "__esModule", { value: true });
var Events;
(function (Events) {
    /**
     * Fired when the connection is lost.
     */
    Events["ConnectionTimeout"] = "connectionTimeout";
    /**
     * Fired when a question is answered.
     */
    Events["QuestionAnswered"] = "didAnswerQuestion";
    /**
     * Fired when a subject is completed.
     */
    Events["SubjectCompleted"] = "didCompleteSubject";
    /**
     * Fired when the SRS level of a subject changes.
     */
    Events["SRSChanged"] = "didChangeSRS";
    /**
     * Fired when the user's synonyms are updated.
     */
    Events["UserSynonymsUpdated"] = "didUpdateUserSynonyms";
    /**
     * Fired when a wrap-up observer is registered.
     */
    Events["WrapUpObserverRegistration"] = "registerWrapUpObserver";
    /**
     * Fired when the quiz progress is updated.
     */
    Events["QuizProgressUpdated"] = "updateQuizProgress";
    /**
     * Fired when the next question is about to be displayed.
     */
    Events["NextQuestionWillDisplay"] = "willShowNextQuestion";
    /**
     * Fired when audio is about to play.
     */
    Events["AudioWillPlay"] = "audioWillPlay";
    /**
     * Fired when content is about to be opened.
     */
    Events["ContentWillOpen"] = "willOpenContent";
})(Events || (Events = {}));
(function () {
    // ~~ Event Listening
    const wkhfListeners = new Map();
    for (const event of Object.keys(Events)) {
        window.addEventListener(event, (event) => {
            const type = event.type;
            if (!wkhfListeners.has(type))
                return;
            for (const listener of wkhfListeners.get(type)) {
                listener(event);
            }
        });
    }
    // Loading/unloading scripts
    class WKHFScript {
        locationMatcher;
        isActive;
        ignoreActiveState;
        #onBeforeVisit;
        #onBeforeCache;
        #onLoad;
        #deactivate;
        #activate;
        constructor({ locationMatcher, ignoreActiveState = false, onBeforeVisit, onBeforeCache, onLoad, activate, deactivate, }) {
            this.locationMatcher = locationMatcher;
            this.#onBeforeVisit = onBeforeVisit;
            this.#onBeforeCache = onBeforeCache;
            this.#onLoad = onLoad;
            this.#activate = activate;
            this.#deactivate = deactivate;
            this.isActive = false;
            this.ignoreActiveState = ignoreActiveState;
        }
        onBeforeVisit(event) {
            try {
                this.#onBeforeVisit?.(event);
            }
            catch (e) {
                console.error(e);
            }
        }
        onBeforeCache(event) {
            try {
                this.#onBeforeCache?.(event);
            }
            catch (e) {
                console.error(e);
            }
        }
        onLoad(event) {
            try {
                this.#onLoad?.(event);
            }
            catch (e) {
                console.error(e);
            }
        }
        activate() {
            try {
                this.#activate?.();
                this.isActive = true;
            }
            catch (e) {
                console.error(e);
            }
        }
        deactivate() {
            try {
                this.#deactivate?.();
                this.isActive = false;
            }
            catch (e) {
                console.error(e);
            }
        }
        setOnBeforeVisit(onBeforeVisit) {
            this.#onBeforeVisit = onBeforeVisit;
        }
        setOnBeforeCache(onBeforeCache) {
            this.#onBeforeCache = onBeforeCache;
        }
        setOnLoad(onLoad) {
            this.#onLoad = onLoad;
        }
        setActivate(activate) {
            this.#activate = activate;
        }
        setDeactivate(deactivate) {
            this.#deactivate = deactivate;
        }
        doesLocationMatch(url) {
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
            }
            catch (e) {
                console.error(e);
                return false;
            }
        }
    }
    const wkhfScripts = new Map();
    let nextUrl = window.location.href;
    window.addEventListener("turbo:before-visit", (event) => {
        nextUrl = event.detail.url;
        for (const script of wkhfScripts.values()) {
            if (script.isActive || script.ignoreActiveState) {
                script.onBeforeVisit(event);
            }
        }
    });
    window.addEventListener("turbo:before-cache", (event) => {
        for (const script of wkhfScripts.values()) {
            if (script.isActive || script.ignoreActiveState) {
                script.onBeforeCache(event);
                if (script.isActive && !script.doesLocationMatch(nextUrl)) {
                    script.deactivate();
                }
            }
        }
    });
    window.addEventListener("turbo:load", (event) => {
        for (const script of wkhfScripts.values()) {
            if (script.doesLocationMatch(window.location.href)) {
                script.onLoad(event);
                if (!script.isActive)
                    script.activate();
            }
        }
    });
    // ———————————————————————————— Public Methods ————————————————————————————
    function addEventListener(event, listener) {
        if (!wkhfListeners.has(event))
            wkhfListeners.set(event, new Set());
        wkhfListeners.get(event).add(listener);
    }
    function removeEventListener(event, listener) {
        if (!wkhfListeners.has(event))
            return;
        wkhfListeners.get(event).delete(listener);
    }
    function registerScript(name, script) {
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
    function unregisterScript(name) {
        const script = fetchScript(name);
        if (!script)
            return;
        if (script.isActive)
            script.deactivate();
        wkhfScripts.delete(name);
    }
    function fetchScript(name) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC51c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGlCQUFpQjtBQUNqQixnREFBZ0Q7QUFDaEQsOENBQThDO0FBQzlDLHdDQUF3QztBQUN4QyxvREFBb0Q7QUFDcEQsNEJBQTRCO0FBQzVCLDBHQUEwRztBQUMxRyxpRkFBaUY7QUFDakYsMEJBQTBCO0FBQzFCLCtDQUErQztBQUMvQyxtREFBbUQ7QUFDbkQsaUNBQWlDO0FBQ2pDLHdCQUF3QjtBQUN4QixtQ0FBbUM7QUFDbkMseUJBQXlCO0FBQ3pCLGtCQUFrQjtBQUVsQixZQUFZLENBQUM7O0FBZWIsSUFBSyxNQXlDSjtBQXpDRCxXQUFLLE1BQU07SUFDVDs7T0FFRztJQUNILGlEQUF1QyxDQUFBO0lBQ3ZDOztPQUVHO0lBQ0gsZ0RBQXNDLENBQUE7SUFDdEM7O09BRUc7SUFDSCxpREFBdUMsQ0FBQTtJQUN2Qzs7T0FFRztJQUNILHFDQUEyQixDQUFBO0lBQzNCOztPQUVHO0lBQ0gsdURBQTZDLENBQUE7SUFDN0M7O09BRUc7SUFDSCwrREFBcUQsQ0FBQTtJQUNyRDs7T0FFRztJQUNILG9EQUEwQyxDQUFBO0lBQzFDOztPQUVHO0lBQ0gsMERBQWdELENBQUE7SUFDaEQ7O09BRUc7SUFDSCx5Q0FBK0IsQ0FBQTtJQUMvQjs7T0FFRztJQUNILDZDQUFtQyxDQUFBO0FBQ3JDLENBQUMsRUF6Q0ksTUFBTSxLQUFOLE1BQU0sUUF5Q1Y7QUFFRCxDQUFDO0lBQ0MscUJBQXFCO0lBQ3JCLE1BQU0sYUFBYSxHQUFHLElBQUksR0FBRyxFQUcxQixDQUFDO0lBRUosS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3ZDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN2QyxNQUFNLElBQUksR0FBRyxLQUFL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
function checkForUserScripts() {
  function n(n) {
    return void 0 !== window[n];
  }
  var i = {
    wkof: "WaniKani Open Framework",
    dpp: "WaniKani Dashboard Progress Plus",
    wklightning: "WaniKani Lightning Mode",
    reorder: "Wanikani Reorder Ultimate 2",
    scriptLog: "Wanikani Override",
    diagram: "WaniKani Stroke Order",
    wkgoldburn: "Wanikani Golden Burn",
    doublecheck: "Wanikani Double-Check",
    similarKanjiContainer: "WaniKani Similar kanji",
  };
  return Object.keys(i).some(function (i) {
    return n(i);
  });
}
function gtag() {
  dataLayer.push(arguments);
}
function turboLoad(n) {
  const i = window.analyticsOptions || {},
    e = Object.assign({}, defaultOptions, i);
  delete e.apiKey,
    (e.page_location = n.detail.url),
    (e.page_path = window.location.pathname),
    (e.page_title = document.title),
    checkForUserScripts() && (e["Userscripts Installed"] = "installed"),
    gtag("config", i.apiKey, e);
}
var defaultOptions = {
  custom_map: {
    dimension2: "Userscripts Installed",
    dimension3: "Current Level",
    dimension4: "Subscription Status",
    dimension5: "Maximum Level",
  },
};
(window.dataLayer = window.dataLayer || []),
  gtag("js", new Date()),
  document.documentElement.addEventListener("turbo:load", turboLoad);

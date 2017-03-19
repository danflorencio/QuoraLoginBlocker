{
  var redirect;
  var reloaded = false;

  var validPaths = new Array(5);
  validPaths.push("quora.com/sitemap", "quora.com/topic", "quora.com/profile",
                 "quora.com/about", "quora.com/careers", "quora.com/contact");

  chrome.runtime.onInstalled.addListener(function(info) {

  });

  function isValidURL(path) {
    for (var i = 0; i < validPaths.length; i++) {
      if (path.includes(validPaths[i])) {
        return true;
      }
    }
    return false;
  }

  // Reload page
  function reload() {
    chrome.tabs.update(null, {url:redirect});
  }

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    chrome.tabs.getSelected(null, function (tab1) {
      var url = new URL(tab.url);
      var domain = url.hostname;
      console.log(url.href.charAt(url.href.length-8));
      if (domain === "www.quora.com" && !(isValidURL(url.href))) {
        console.log("let's block it")
        if (url.href.charAt(url.href.length-8) != "?") {
          url += "?share=1";
          redirect = url;
          reload();
          console.log("blocked");
        }
        console.log(url);
        return;
      }
    })

  });

}

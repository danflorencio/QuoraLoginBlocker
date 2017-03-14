{
  var redirect;
  var reloaded = false;

  chrome.runtime.onInstalled.addListener(function(info) {

  });

  // Reload page
  function reload() {
    chrome.tabs.update(null, {url:redirect});
  }

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    chrome.tabs.getSelected(null, function (tab1) {
      var url = new URL(tab.url);
      var domain = url.hostname;
      console.log(url.href.charAt(url.href.length-8));
      if (domain === "www.quora.com" && !(url.href.includes("https://www.quora.com/search?"))
          && !(url.href.includes("https://www.quora.com/sitemap"))
          && !(url.href.includes("https://www.quora.com/topic"))) {
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

window.onload = function() {
  document.getElementById('redirect').addEventListener('click', openQuora);
}

function openQuora() {
  var url;
  chrome.tabs.getSelected(null,function(tab) {
    var tablink = tab.url;
    if (tablink == "https://www.quora.com/topic/Search-Quora-feature") {
      window.close();
      return;
    }
    if (tablink == "chrome://newtab/") {
      console.log("open in current tab");
      chrome.tabs.update(null, {url:"https://www.quora.com/topic/Search-Quora-feature"});
      window.close();
    }
    else {
      chrome.tabs.create({url:"https://www.quora.com/topic/Search-Quora-feature"});
    }
  });
  console.log(url);
  //chrome.tabs.create({url:"https://www.quora.com/topic/Search-Quora-feature"});
}

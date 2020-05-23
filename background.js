let default_data = {
  "serviceYoutubeCategories": [
    {
      "id": 1,
      "value": false
    },
    {
      "id": 2,
      "value": false
    },
    {
      "id": 10,
      "value": true
    },
    {
      "id": 15,
      "value": false
    },
    {
      "id": 17,
      "value": false
    },
    {
      "id": 19,
      "value": false
    },
    {
      "id": 20,
      "value": false
    },
    {
      "id": 21,
      "value": false
    },
    {
      "id": 22,
      "value": false
    },
    {
      "id": 23,
      "value": false
    },
    {
      "id": 24,
      "value": false
    },
    {
      "id": 25,
      "value": false
    },
    {
      "id": 27,
      "value": true
    },
    {
      "id": 28,
      "value": true
    },
    {
      "id": "others",
      "value": false
    }
  ]
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({focus: false}, () => {
    });
    chrome.storage.local.set(default_data, () => {
    });
    chrome.storage.local.set({panelsOpen: {youtube: false, spotify: false}}, () => {
    });
});

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  if (details.frameId === 0) {
    if (details.url.toString().indexOf('www.youtube.com/watch?v') != -1) {
      chrome.tabs.executeScript(details.tabId, {file: "/services/youtube.js"});
    }
  }
});
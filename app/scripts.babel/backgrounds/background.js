'use strict';

// TODO : Add a static website (github website ?)
chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

// TODO : Add a static changelog page
chrome.tabs.onUpdated.addListener(tabId => {
  chrome.pageAction.show(tabId);
});

console.log('\'Allo \'Allo! Event Page for Page Action');
chrome.runtime.onInstalled.addListener(() => {

  chrome.contextMenus.create({
    id: "toggleRead",
    title: " Read / Stop",
    contexts: ["selection"],
  });

});

chrome.contextMenus.onClicked.addListener((info, tab) => {

  if (info.menuItemId === "toggleRead") {

    chrome.tabs.sendMessage(tab.id, {
      action: "toggleRead",
      text: info.selectionText,
    });

  }

});
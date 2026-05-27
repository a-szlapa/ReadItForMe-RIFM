chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "readSelectedText",
        title: "Read it for me",
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "stopReadingText",
        title: "Stop",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {

    if (info.menuItemId === "readSelectedText") {

        chrome.tabs.sendMessage(tab.id, {
            action: "readText",
            text: info.selectionText
        });

    }
    if (info.menuItemId === "stopReadingText") {

        chrome.tabs.sendMessage(tab.id, {
            action: "stopReading",
            text: info.selectionText
        });

    }

});
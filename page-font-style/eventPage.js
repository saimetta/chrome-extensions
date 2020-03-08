//Listen to messages from content.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    //If message is showPageAction, display the extension Icon as active
    if (request.todo == "showPageAction") {
        chrome.tabs.query({active:true,currentWindow: true}, function(tabs){
            chrome.pageAction.show(tabs[0].id);
        });
    }
});

var menuItem = {
	"id": "wikisearch",
	"title": "Wikisearch",
	"contexts": ["selection"]
};

chrome.contextMenus.create(menuItem);


function fixedEncodedUri(str) {
	return encodeURI(str).replace(/%5B/g,'[').replace(/%5D/g,']');
}

chrome.contextMenus.onClicked.addListener(function (clickData){
	if(clickData.menuItemId == "wikisearch" && clickData.selectionText) {
		var wikiUrl = "https://en.wikipedia.org/wiki/"+fixedEncodedUri(clickData.selectionText);
		var wikiWindow = {
			"url": wikiUrl,
			"type": "popup",
			"top": 5,
			"left": 5,
			"width": parseInt(window.screen.availWidth/2,10),
			"height": parseInt(window.screen.availHeight/2,10)
		};
		chrome.windows.create(wikiWindow,function() {
		});
	}
});
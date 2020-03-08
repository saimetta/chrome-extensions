var menuItemEN = {
	"id": "readitEN",
	"title": "Read it! (EN)",
	"contexts": ["selection"]
},
menuItemES = {
	"id": "readitES",
	"title": "Read it! (SP)",
	"contexts": ["selection"]
};

chrome.contextMenus.create(menuItemEN);
chrome.contextMenus.create(menuItemES);


chrome.contextMenus.onClicked.addListener(function (clickData){
	var config = null;
	if(clickData.menuItemId == "readitEN" && clickData.selectionText) {
		config = {"rate": 0.9,'lang': 'en-US'};
	}
	if(clickData.menuItemId == "readitES" && clickData.selectionText) {
		config = {"rate": 0.9,'lang': 'es-AR'};
	}
	if (config) {
		chrome.tts.speak(clickData.selectionText,config);
	}
});
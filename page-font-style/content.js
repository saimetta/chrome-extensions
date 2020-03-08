chrome.runtime.sendMessage({todo: "showPageAction"});
//Listen to changeColor message
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request.todo == "changeColor"){
        //Set the color to the title class
        var addColor = '#' + request.clickedColor;
        $('h1').css('font-style','italic');
         $('h1').css('color', addColor);
    }
});

//REPO: https://github.com/gopinav/Chrome-Extensions/tree/master/PageFontStyle
$(function(){
    //Set the selected color by the user
    color = $('#fontColor').val();
    //Listen to events from the color picker to change the clor
    $("#fontColor").on("change paste keyup", function() {
        color = $(this).val();
    });
   //Send a message to the active tab with the selected color
   $('#btnChange').click(function(){
         chrome.tabs.query({active:true,currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {todo: "changeColor", clickedColor: color });
        });
   });
});

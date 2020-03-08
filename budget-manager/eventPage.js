//Handles context menus
//Define the menu item
var menuItem = {
    "id": "spendMoney",
    "title": "Spend Money",
    "contexts": ["selection"]
};
//Set the menu item to the context menu
chrome.contextMenus.create(menuItem);

//Helper function to verify if the selection is an int
function isInt(value) {
  return !isNaN(value) &&
         parseInt(Number(value)) == value &&
         !isNaN(parseInt(value, 10));
}
//On click store the spent
chrome.contextMenus.onClicked.addListener(function(clickData){
  //Listen to all context menu clicks
  if(clickData.menuItemId == "spendMoney" && clickData.selectionText) {
    //Our menu item was clicked and it has a selection
    if (isInt(clickData.selectionText)) {
      //Update the total
      chrome.storage.sync.get(['total','limit'],function (budget) {
        var newTotal = 0;
        if (budget.total) {
          newTotal += parseInt(budget.total,10);
        }
        newTotal += parseInt(clickData.selectionText,10);
        chrome.storage.sync.set({'total':newTotal},function() {
          if (newTotal >= budget.limit) {
            //Notify exceeded
            var notifOptions = {
              type: 'basic',
              iconUrl: 'icon.png',
              title: 'Limit reached',
              message: 'Uh oh! looks like you have reached the limit!'
            };
            chrome.notifications.create('limitNotif'+Date.now(),notifOptions);
          }else {
            //Notify spent saved
            var notifOptions = {
              type: 'basic',
              iconUrl: 'icon.png',
              title: 'Spent saved',
              message: 'Spent recorded'
            };
            chrome.notifications.create('spentSaved'+Date.now(),notifOptions);
          }
        });

      });
    }
  }
});

//Set a badge on storage change
chrome.storage.onChanged.addListener(function(changes,storageName) {
  chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()});
});

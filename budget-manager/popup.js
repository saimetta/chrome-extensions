//REPO: https://github.com/gopinav/Chrome-Extensions/tree/master/BudgetManager
$(function () {
  chrome.storage.sync.get(['total','limit'],function (budget) {
    $('#total').text(budget.total);
    $('#limit').text(budget.limit);
  });

  $("#spendAmount").click(function() {
    chrome.storage.sync.get(['total','limit'],function (budget) {
      var newTotal = 0;
      if (budget.total) {
        newTotal += parseInt(budget.total,10);
      }
      var amount = $('#amount').val();
      if (amount) {
        newTotal += parseInt(amount,10);
      }

      chrome.storage.sync.set({'total': newTotal},function () {
        if (amount && newTotal >= budget.limit) {
          var notifOptions = {
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'Limit reached',
            message: 'Uh oh! looks like you have reached the limit!'
          };
          chrome.notifications.create('limitNotif'+Date.now(),notifOptions);
        }
      });

      $('#total').text(newTotal);
      $('#amount').val('');
    });
  });
});

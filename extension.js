(function() {
	var url, checkPMs, closeNotification, found = -1, notification, showing = false;
	
	url = 'http://www.neogaf.com/forum/private.php';
	
	// Basically what we're doing here is grabbing the whole PM list page via AJAX (we can use XHR since we're an extension,
	// neat huh?) and then searching that massive string for a little part that tells us if we have a new PM or not. Then
	// we display the notification, and set a timeout on that notification closing. Then we call ourself after 2 minutes.
	checkPMs = function () {
		$.get(url, function(data) {
			found = data.search('<td class="alt1"><img src="images/neogaf/statusicon/pm_new.gif" alt="" border="0" /></td>');
			if (found !== -1) {
				notification = webkitNotifications.createHTMLNotification('notification.html');
				notification.show();
				window.setTimeout(closeNotification, 10000, notification);
			}
		}, 'html');
		window.setTimeout(checkPMs, 120000);
	};
	
	closeNotification = function (n) {
		n.cancel();
	};
	
	checkPMs();
})();
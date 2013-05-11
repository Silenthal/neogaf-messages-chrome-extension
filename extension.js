(function($, window, undefined) {
	var url = 'http://www.neogaf.com/forum/usercp.php',
		curUnread = [],
		notification;

	// Sets the default options for this extension.

	function setDefaultOptions() {
		var isInit = (localStorage.init == 'true');
		if (!isInit) {
			localStorage.init = 'true';
			// Default update time: 1 minute
			localStorage.updateTime = 60000;
			// Default click action: go to newest PM
			localStorage.toastClickAction = "pm";
			// Default notification type: tell you once
			localStorage.nagAction = "nagonce";
			// Initializing other localStorage options.
			localStorage.msgCount = 0;
			localStorage.msgID = "";
			localStorage.senderName = "";
			localStorage.msgTitle = "";
		}
	}

	// Combines message details on the PM page into an array of message objects,
	// containing ID, sender, and message title.

	function getUnreadMessages(data) {
		var temp = $("#collapseobj_usercp_pms", data).children(),
			msgIDs = $(temp).map(function() {
				return $(this).children().eq(1).attr('id');
			}).toArray(),
			msgTitles = $(temp).map(function() {
				return $("a", this).text();
			}).toArray(),
			msgSenders = $(temp).map(function() {
				return $("span[onclick*='member']", this).text();
			}).toArray();
		// Once those are gotten, combine them into objects.
		combined = [];
		for (var i = 0; i < msgIDs.length; i++) {
			var s = {
				msgID: msgIDs[i].substring(1),
				senderName: msgSenders[i],
				msgTitle: msgTitles[i]
			};
			combined.push(s);
		}
		return combined;
	}

	// Basically what we're doing here is grabbing the whole PM list page via AJAX (we can use cross-origin XHR 
	// since we're an extension, neat huh?) and then searching that massive string for the new message details.
	// Then we display the notification, and set a timeout on that notification closing. Then we call ourself
	// depending on the user-specified update time.
	function checkPMs() {
		$.get(url, function(data) {
			var messageDetails = getUnreadMessages(data),
				broadcastDetails = [];

			// If the user only wants new message notifications once per incoming,
			// filter out any unread message that's already been notified about.
			// Otherwise, just use all the unread messages.
			if (localStorage.nagAction === "nagonce") {
				broadcastDetails = messageDetails.filter(function(msgDetail, index) {
					for (i = 0; i < curUnread.length; i++) {
						if (curUnread[i].msgID === msgDetail.msgID) {
							return false;
						}
					}
					return true;
				});
			} else {
				broadcastDetails = messageDetails.slice(0);
			}

			curUnread = messageDetails.slice(0);

			// Then, if there are any notices to be made, make the toast.
			if (broadcastDetails.length !== 0) {
				localStorage.msgCount = broadcastDetails.length;
				localStorage.msgID = broadcastDetails[0].msgID;
				localStorage.senderName = broadcastDetails[0].senderName;
				localStorage.msgTitle = broadcastDetails[0].msgTitle;
				notification = webkitNotifications.createHTMLNotification('notification.html');
				notification.show();
				window.setTimeout(function(n) {
					n.cancel();
				}, 10000, notification);
			}
		}, 'html');
		window.setTimeout(checkPMs, localStorage.updateTime);
	}

	setDefaultOptions();

	checkPMs();
})(jQuery, window);
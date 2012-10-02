// Holds info about messages already notified about.
var curUnread = [];

(function() {
	var url, newPMSelector, setDefaultOptions, checkPMs, combineMessages, closeNotification, notification;
	
	url = 'http://www.neogaf.com/forum/private.php';
	newPMSelector = 'img[src="images/neogaf/statusicon/pm_new.gif"]';
	
	// Sets the default options for this extension.
	setDefaultOptions = function(){
		// Default update time: 1 minute
		localStorage.updateTime = 60000;
		// Default click action: go to newest PM
		localStorage.toastClickAction = "pm";
		// Initializing other localStorage options.
		localStorage.msgCount = 0;
		localStorage.id = "";
		localStorage.name = "";
		localStorage.title = "";
	}
	
	// Combines message details on the PM page into an array of message objects,
	// containing ID, sender, and message title.
	combineMessages = function(data){
		// Grab the page section dealing with PMs...
		var temp = $("#pmform", data)
		
		// Find all image elements that have the given src...
		.find(newPMSelector)
		
		// And grab the rows containing the 3 items needed.
		.map(function(){
			return $(this).closest('tr');
		}),
		
		// Message IDs are gotten from the id of the second child.
		msgIDs = $(temp).map(function(){
			return $(this).children().eq(1).attr('id');
		})
		.toArray(),
		
		// Message titles are contained in an <a> element.
		msgTitles = $(temp).map(function(){
			return $('a', this).text();
		})
		.toArray(),
		
		// And sender names are in a span with the specified
		// onclick info.
		msgSenders = $(temp).map(function(){
			return $('span[onclick*="member"]', this).text();
		})
		.toArray(),
		
		// Once those are gotten, combine them into objects.
		combined = [];
		for (var i = 0; i < msgIDs.length; i++){
			var s = {
			"id" : msgIDs[i].substring(1),
			"name" : msgSenders[i],
			"title" : msgTitles[i]
			};
			combined.push(s);
		}
		return combined;
	};
	
	// Basically what we're doing here is grabbing the whole PM list page via AJAX (we can use cross-origin XHR 
	// since we're an extension, neat huh?) and then searching that massive string for the new message details.
	// Then we display the notification, and set a timeout on that notification closing. Then we call ourself
	// after a minute.
	checkPMs = function(){
		$.get(url, function(data){
			
			// First, get the new messages (on page 1 of the PM page, that is).
			var messageDetails = combineMessages(data);
			
			// Remove any messages that have already been notified about from
			// the current unread ones.
			curUnread = curUnread.filter(function(messageID, index){
				var ret = false;
				for (i = 0; i < messageDetails.length;i++)
				{
					if (messageDetails[i].id == messageID)
					{
						ret = true;
						break;
					}
				}
				return ret;
			});
			
			// Then, remove from the "new message list" any messages that have already
			// been notified about.
			messageDetails = messageDetails.filter(function(message, index){
				if (curUnread.indexOf(message.id) === -1)
				{
					curUnread.push(message.id);
					return true;
				}
				else
				{
					return false;
				}
			});
			
			// Then, if there are any, make the toast.
			if (messageDetails.length !== 0) {
				localStorage.msgCount = curUnread.length;
				localStorage.id = messageDetails[0].id;
				localStorage.name = messageDetails[0].name;
				localStorage.title = messageDetails[0].title;
				notification = webkitNotifications.createHTMLNotification('notification.html');
				notification.show();
				window.setTimeout(closeNotification, 10000, notification);
			}
		}, 'html');
		window.setTimeout(checkPMs, localStorage.updateTime);
	};
	
	closeNotification = function(n){
		n.cancel();
	};
	
	setDefaultOptions();
	
	checkPMs();
})();
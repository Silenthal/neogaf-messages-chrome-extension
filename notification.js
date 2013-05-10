(function() {
	var pmPage = "http://www.neogaf.com/forum/private.php?do=showpm&pmid=",
		allPage = "http://www.neogaf.com/forum/private.php",
		count = localStorage.msgCount,
		senderName = localStorage.name,
		msgTitle = localStorage.title,
		msgId = localStorage.id,
		clickAction = localStorage.toastClickAction,
		message = document.getElementById("msg"),
		senderSpan = document.getElementById("sender"),
		titleSpan = document.getElementById("title"),
		clickHref = document.getElementById("messageTarget"),
		msg;
	if (count == 1) {
		msg = count + " unread message!";
	} else {
		msg = count + " unread messages!";
	}
	senderSpan.innerHTML = senderName;
	titleSpan.innerHTML = msgTitle;
	message.innerHTML = msg;
	if (clickAction === "pm") {
		clickHref.href = pmPage + msgId;
	} else if (clickAction === "all") {
		clickHref.href = allPage;
	}
}());
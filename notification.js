(function() {
	var pmPage = "http://www.neogaf.com/forum/private.php",
		msgCount = localStorage.msgCount,
		senderName = localStorage.senderName,
		msgTitle = localStorage.msgTitle,
		msgId = localStorage.msgID,
		clickAction = localStorage.toastClickAction,
		senderSpan = document.getElementById("sender"),
		titleSpan = document.getElementById("title"),
		message = document.getElementById("msg"),
		clickHref = document.getElementById("messageTarget"),
		msg = msgCount + " unread message";
	if (msgCount == 1) {
		msg += "!";
	} else {
		msg += "s!";
	}
	senderSpan.innerHTML = senderName;
	titleSpan.innerHTML = msgTitle;
	message.innerHTML = msg;
	clickHref.href = pmPage;
	if (clickAction === "pm") {
		clickHref.href += "?do=showpm&pmid=" + msgId;
	}
}());
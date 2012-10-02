var pmPage = "http://www.neogaf.com/forum/private.php?do=showpm&pmid=",
allPage = "http://www.neogaf.com/forum/private.php",
count = localStorage.msgCount,
name = localStorage.name,
title = localStorage.title,
id = localStorage.id,
clickAction = localStorage.toastClickAction,
message = document.getElementById("msg"),
senderSpan = document.getElementById("sender"),
titleSpan = document.getElementById("title"),
clickHref = document.getElementById("messageTarget"),
msg;
if (count == 1)
{
	msg = count + " unread message!";
}
else
{
	msg = count + " unread messages!";
}
senderSpan.innerHTML = name;
titleSpan.innerHTML = title;
message.innerHTML = msg;
if (clickAction === "pm"){
	clickHref.href = pmPage + id;
}
else if (clickAction === "all"){
	clickHref.href = allPage;
}
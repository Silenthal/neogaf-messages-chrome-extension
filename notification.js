var pmPage = "http://www.neogaf.com/forum/private.php?do=showpm&pmid=",
allPage = "http://www.neogaf.com/forum/private.php",
count = localStorage.msgCount,
name = localStorage.name,
title = localStorage.title,
id = localStorage.id,
clickAction = localStorage.toastClickAction,
message = document.getElementById("msg"),
clickHref = document.getElementById("messageTarget"),
msg;
if (count === 1)
{
	msg = count + " unread message!";
}
else
{
	msg = count + " unread messages!";
}
msg = msg + ' Latest is from ' + name + ', titled "' + title + '"';
message.innerHTML = msg;
if (clickAction === "pm"){
	clickHref.href = pmPage + id;
}
else if (clickAction === "all"){
	clickHref.href = allPage;
}
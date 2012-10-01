var msg;
var count = localStorage.msgCount;
var name = localStorage.name;
var title = localStorage.title;
var id = localStorage.id;
if (count == 1)
{
	msg = count + " unread message!";
}
else
{
	msg = count + " unread messages!";
}
msg = msg + ' Latest is from ' + name + ', titled "' + title + '"';
var message = document.getElementById("msg");
var msgTarget = document.getElementById("messageTarget");
message.innerHTML = msg;
msgTarget.href = "http://www.neogaf.com/forum/private.php?do=showpm&pmid=" + id;
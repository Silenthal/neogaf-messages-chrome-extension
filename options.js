function loadUpdateTime () {
	var utVal = localStorage.updateTime;
	if (!utVal) {
		return;
	}
	var select = document.getElementById("updateTime");
	for (var i = 0; i < select.children.length; i++) {
		var child = select.children[i];
		if (child.value == utVal) {
			child.selected = "true";
			break;
		}
	}
}

function saveUpdateTime () {
	var utSelect = document.getElementById("updateTime");
	localStorage.updateTime = utSelect.children[utSelect.selectedIndex].value;
}

function loadToastClickAction () {
	var tcaVal = localStorage.toastClickAction;
	if (!tcaVal) {
		return;
	}
	var select = document.getElementById("toastClickAction");
	for (var i = 0; i < select.children.length; i++) {
		var child = select.children[i];
		if (child.value == tcaVal) {
			child.selected = "true";
			break;
		}
	}
}

function saveToastClickAction () {
	var tuaSelect = document.getElementById("toastClickAction");
	localStorage.toastClickAction = tuaSelect.children[tuaSelect.selectedIndex].value;
}

function loadNagAction () {
	var naVal = localStorage.nagAction,
	nagonceRadio = document.getElementById("notify_nagonce"),
	nagRadio = document.getElementById("notify_nag");
	if (naVal == nagRadio.value){
		nagRadio.checked = true;
	}
	else if (naVal == nagonceRadio.value){
		nagonceRadio.checked = true;
	}
}

function saveNagAction () {
	var nagonceRadio = document.getElementById("notify_nagonce"),
	nagRadio = document.getElementById("notify_nag");
	if (nagRadio.checked){
		localStorage.nagAction = nagRadio.value;
	}
	else if (nagonceRadio.checked){
		localStorage.nagAction = nagonceRadio.value;
	}
}

function loadOptions () {
	loadUpdateTime();
	loadToastClickAction();
	loadNagAction();
}

$(document).ready(function () {
	loadOptions();
	$("#updateTime").change(function () {
		saveUpdateTime();
	});
	$("#toastClickAction").change(function () {
		saveToastClickAction();
	});
	$("#notify_nag").change(function () {
		saveNagAction();
	});
	$("#notify_nagonce").change(function () {
		saveNagAction();
	});
});
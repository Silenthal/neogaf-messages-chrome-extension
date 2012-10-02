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

function loadOptions () {
	loadUpdateTime();
	loadToastClickAction();
}

$(document).ready(function () {
	loadOptions();
	$("#updateTime").change(function () {
		saveUpdateTime();
	});
	$("#toastClickAction").change(function () {
		saveToastClickAction();
	});
});
var util = require("./util.js"),
	$ = util.$,
	$$ = util.$$,
	addEvent = util.addEvent;

var actionButtons = $$(".actions button");


function resetRound(roundNumber) {
	var buttons = $$(".actions button[data-round='" + roundNumber + "']");
	buttons.forEach(function(button) {
		button.setAttribute("data-action", "");
	});
}

function setRoundAction(roundNumber, area, action) {
	var button = $(".actions button[data-round='" + roundNumber + "'][data-area='" + area + "']");
	button.setAttribute("data-action", action);
}

actionButtons.forEach(function(button) {
	addEvent(button, "click", function() {
		var roundNumber = +button.getAttribute("data-round");
		var area = button.getAttribute("data-area");
		var currentAction = button.getAttribute("data-action");
		resetRound(roundNumber);
		var action = "";
		if (currentAction === "hit") {
			action = "block";
		} else {
			action = "hit";
		}
		setRoundAction(roundNumber, area, action);
	});
});

resetRound(1);
resetRound(2);
resetRound(3);

setRoundAction(1, "high", "hit");
setRoundAction(2, "high", "hit");
setRoundAction(3, "high", "hit");
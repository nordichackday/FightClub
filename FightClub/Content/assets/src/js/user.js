var util = require("./util.js"),
	$ = util.$,
	$$ = util.$$,
	addEvent = util.addEvent,
	ajax = util.ajax;

var buttonGo = $(".challenge-form .button-go");
var buttonRandom = $(".challenge-form .button-random");
var userInput = $(".challenge-form .username");


function getRandomUser() {
	ajax.get("/Opponent/Random/" + loggedInUser, function(err, data) {
		if (data) {
			data = JSON.parse(data);
			challengeUser(data.Username);
		}
	});
}

function getUserByName() {
	var name = userInput.value;
	if (!name || name === loggedInUser) {
		return;
	}
	ajax.get("/Opponent/" + name, function(err, data) {
		if (data) {
			data = JSON.parse(data);
			challengeUser(data.Username);
		}
	});
}

function challengeUser(name) {
	location.href = "/match/start/" + loggedInUser + "/vs/" + name;
}


addEvent(buttonGo, "click", getUserByName);
addEvent(buttonRandom, "click", getRandomUser);
var util = require("./util.js"),
	$ = util.$,
	$$ = util.$$,
	addClass = util.addClass,
	addEvent = util.addEvent;

var moveMap = {
	"blockhigh": 0,
	"hithigh": 1,
	"blockmid": 2,
	"hitmid": 3,
	"blocklow": 4,
	"hitlow": 5
};

function getMove(n) {
	for (var a in moveMap) {
		if (moveMap[a] === n) {
			return a;
		} 
	}
}

function battleDone() {
	$(".winner").innerHTML = matchData.winner + " wins!";
	addClass($(".winner"), "show");
	setTimeout(function() {
		location.href = "/"; 
	}, 3000);
}




function playRound(round, callback) {
	var move1 = getMove(round.player1);
	var move2 = getMove(round.player2);
	if (move1 === "hithigh" && (move2 === "blocklow" || move2 === "blockmid")) {
		move2 = "die";
	}
	if (move1 === "hitmid" && (move2 === "blocklow" || move2 === "blockhigh")) {
		move2 = "die";
	}
	if (move1 === "hitlow" && (move2 === "blockhigh" || move2 === "blockmid")) {
		move2 = "die";
	}
	if (move2 === "hithigh" && (move1 === "blocklow" || move1 === "blockmid")) {
		move1 = "die";
	}
	if (move2 === "hitmid" && (move1 === "blocklow" || move1 === "blockhigh")) {
		move1 = "die";
	}
	if (move2 === "hitlow" && (move1 === "blockhigh" || move1 === "blockmid")) {
		move1 = "die";
	}

	$(".field .player-1").setAttribute("data-state", move1);
	$(".field .player-2").setAttribute("data-state", move2);
	setTimeout(callback, 1000);
}

var rounds = matchData.rounds;

function nextRound() {

	var round = rounds.shift();
	playRound(round, function() {
		$(".field .player-1").setAttribute("data-state", "idle");
		$(".field .player-2").setAttribute("data-state", "idle");

		if (rounds.length) {
			setTimeout(nextRound, 2000);
		} else {
			battleDone();
		}
	});
}

$(".field .player-1").setAttribute("data-state", "idle");
$(".field .player-2").setAttribute("data-state", "idle");

setTimeout(nextRound, 3000);

setTimeout(function() {
	addClass($(".announcer"), "fade");
}, 100);

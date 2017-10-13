// global variables


// the action
$(document).ready(function(){
	
	var startRestart = function() {
		// player stats
		chewbaccaStats = {
			"name": "Chewbacca",
		 	"hp": 150,
		 	"enAttack": 15,
		 	"plAttack": 20,
		 	"plAttackInc": 7,
		 	"tagName": "chewbacca",
		};
		yodaStats = {
			"name": "Yoda",
		 	"hp": 100,
		 	"enAttack": 20,
		 	"plAttack": 10,
		 	"plAttackInc": 10,
		 	"tagName": "yoda",
		};
		ewoksStats = {
			"name": "Ewoks",
		 	"hp": 125,
		 	"enAttack": 15,
		 	"plAttack": 18,
		 	"plAttackInc": 8,
		 	"tagName": "ewoksStats",
		};
		hansoloStats = {
			"name": "Han Solo",
		 	"hp": 120,
		 	"enAttack": 18,
		 	"plAttack": 15,
		 	"plAttackInc": 9,
		 	"tagName": "hansolo",
		};

		// selected player and selected enemy object
		var selectedPlayer = {};
		var selectedEnemy = {};

		// player and enemy defeat flags
		var playerDefeat = false;
		var enemyDefeat = false;

		var enemiesLeft = 3;

		// player and enemy selcted flags
		var playerPicked = false;
		var enemyPicked = false;

		// show em!
		$(".characters #chewbacca").show();
		$(".characters #yoda").show();
		$(".characters #hansolo").show();
		$(".characters #ewoks").show();

		// hide em!
		$(".players #chewbacca").hide();
		$(".players #yoda").hide();
		$(".players #hansolo").hide();
		$(".players #ewoks").hide();

		$(".enemies #chewbacca").hide();
		$(".enemies #yoda").hide();
		$(".enemies #hansolo").hide();
		$(".enemies #ewoks").hide();

		$(".fighters #chewbacca").hide();
		$(".fighters #yoda").hide();
		$(".fighters #hansolo").hide();
		$(".fighters #ewoks").hide();

		// all icons need id of player
		$(".characters .thumbnail").on("click", function(id) {

			console.log($(this).attr("id"));
			var clicked = $(this).attr("id");
			console.log(clicked);

			if (playerPicked === false) {
				if (clicked === "chewbacca") {
					selectedPlayer = chewbaccaStats;
					$(".characters #chewbacca").hide();
					$(".characters #yoda").hide();
					$(".characters #ewoks").hide();
					$(".characters #hansolo").hide();
				 	$(".players #chewbacca").show();
				 	$(".enemies #yoda").show();
					$(".enemies #ewoks").show();
					$(".enemies #hansolo").show();
				 	playerPicked = true;
				}
				else if (clicked === "yoda") {
					selectedPlayer = yodaStats;
					$(".characters #chewbacca").hide();
					$(".characters #yoda").hide();
					$(".characters #ewoks").hide();
					$(".characters #hansolo").hide();
					$(".players #yoda").show();
					$(".enemies #chewbacca").show();
					$(".enemies #ewoks").show();
					$(".enemies #hansolo").show();
					playerPciked = true;
				}
				else if (clicked === "ewoks") {
					selectedPlayer = ewoksStats;
					$(".characters #chewbacca").hide();
					$(".characters #yoda").hide();
					$(".characters #ewoks").hide();
					$(".characters #hansolo").hide();
					$(".players #ewoks").show();
					$(".enemies #chewbacca").show();
					$(".enemies #yoda").show();
					$(".enemies #hansolo").show();
					playerPciked = true;
				}
				else if (clicked === "hansolo") {
					selectedPlayer = hansoloStats;
					$(".characters #chewbacca").hide();
					$(".characters #yoda").hide();
					$(".characters #ewoks").hide();
					$(".characters #hansolo").hide();
					$(".players #hansolo").show();
					$(".enemies #chewbacca").show();
					$(".enemies #yoda").show();
					$(".enemies #ewoks").show();
					playerPciked = true;
				}
			}

			console.log(selectedPlayer.name);
		});

		// enemy selection
		$(".enemies .thumbnail").on("click", function(id) {

			console.log($(this).attr("id"));
			var clicked = $(this).attr("id");
			console.log(clicked);

			if (enemyPicked === false) {
				if (clicked === "chewbacca") {
					selectedEnemy = chewbaccaStats
				 	$(".enemies #chewbacca").hide();
				 	$(".fighters #chewbacca").show();
				 	enemyPicked = true;
				}
				else if (clicked === "yoda") {
					selectedEnemy = yodaStats
					$(".enemies #yoda").hide();
					$(".fighters #yoda").show();
					enemyPicked = true;
				}
				else if (clicked === "ewoks") {
					selectedEnemy = ewoksStats
					$(".enemies #ewoks").hide();
					$(".fighters #ewoks").show();
					enemyPicked = true;
				}
				else if (clicked === "hansolo") {
					selectedEnemy = hansoloStats
					$(".enemies #hansolo").hide();
					$(".fighters #hansolo").show();
					enemyPicked = true;
				}
			enemiesLeft--;
			}
		});

		// attack using #attack-btn
		$("#attack").on("click", function() {
			//calculate points
			selectedPlayer.hp -= selectedEnemy.enAttack;
			selectedEnemy.hp -= selectedPlayer.plAttack;

			$("#playerNotification").html(selectedPlayer.name + " was hit for " + selectedEnemy.enAttack + " points.  " + selectedPlayer.hp + " hit points left!");
			$("#enemyNotification").html(selectedEnemy.name + " was hit for " + selectedPlayer.plAttack + " points.  " + selectedEnemy.hp + " hit points left!");

			selectedPlayer.plAttack += selectedPlayer.plAttackInc;

			console.log(selectedPlayer.hp);
			console.log(selectedEnemy.hp);
			console.log(selectedPlayer.plAttack);

			//logic for defeated enemy/player
			if (selectedPlayer.hp <= 0) {
				$("#playerNotification").html(selectedPlayer.name + " was defeated by " + selectedEnemy.name + "!");
				$("#enemyNotification").html('<button type="button" class="btn" id="restart">Play Again?</button><p>Do or do not, there is no try.</p>');
			}
			else if (selectedEnemy.hp <= 0 && enemiesLeft < 1) {
				$("#playerNotification").html(selectedPlayer.name + " defeated " + selectedEnemy.name + "!  YOU WIN!!!");
				$("#enemyNotification").html('<button type="button" class="btn" id="restart">Play Again?</button>');
			}
			else if (selectedEnemy.hp <= 0 && enemiesLeft > 1) {
				$("#playerNotification").html(selectedPlayer.name + " defeated " + selectedEnemy.name + "!");
				$("#enemyNotification").html("Select another enemy to battle!");
				enemyPicked = false;
			}

			// restart game
			$("#restart").on("click", function() {
				startRestart();
			});
		});
		
	}
	startRestart()
});
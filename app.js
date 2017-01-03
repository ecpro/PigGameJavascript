/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

$(function () {

    var current, activePlayer, diceVal, players, lastDiceVal = 0;

    // initiallize variables and start game
    init();

    // new game button 

    $(".btn-new").on("click", function (event) {
        $(".player-" + activePlayer + "-panel").toggleClass("active");
        init();
    });


    // rollDice

    function rollDice() {
        var diceImage, dice, totalDelay = 0;

        dice = $(".dice");

        // 1. rotate dice animation

        function rotateDice() {
            for (var x = 1; x < 7; x++) {

                function rotate() {
                    var random = Math.floor(Math.random() * 6) + 1;
                    var randomDiceImage = "dice-" + random + ".png";
                    dice.attr("src", randomDiceImage);
                }
                totalDelay += 10 * x;
                setTimeout(rotate, 10 * x);

            }

        }

        rotateDice();

        // 2. get a random dice value
        diceVal = Math.floor(Math.random() * 6) + 1;

        // 3. set the dice image corresponding to value generated in step 2
        diceImage = "dice-" + diceVal + ".png";

        //console.log("dice value : " + diceVal);
        //console.log("image " + diceImage);

        // 4. update the current score and activePlayer score


        // setTimeout to wait untill rotateDice finishes
        setTimeout(function () {
            dice.attr("src", diceImage);

            // if diceVal === 1 then set the current to activePlayer's score and togglePlayer 

            if (diceVal !== 1) {

                if (diceVal === 6 && lastDiceVal === 6) {
                    players[activePlayer] = 0;
                    togglePlayer();
                } else {
                    players[activePlayer] += diceVal;
                    console.log(activePlayer + " " + players[activePlayer]);
                    current += diceVal;
                    console.log("new current" + current);
                    $("#current-" + activePlayer).text(current);
                    lastDiceVal = diceVal;
                    if (players[activePlayer] >= 100) {
                        $("#name-" + activePlayer).text("Winner");
                        $(".player-" + activePlayer + "-panel").addClass("winner");
                        togglePlayer();
                        console.log(this);
                        $(".btn-roll").off("click");
                        $(".btn-hold").off("click");
                    }
                }

            } else {
                togglePlayer();
            }

        }, totalDelay);

    }



    // togglePlayer

    function togglePlayer() {
        $("#score-" + activePlayer).text(players[activePlayer]);
        current = 0;
        $("#current-" + activePlayer).text(current);

        if (activePlayer === 0) {
            activePlayer = 1;
        } else {
            activePlayer = 0;
        }
        $(".player-0-panel").toggleClass("active");
        $(".player-1-panel").toggleClass("active");
        lastDiceVal = 0;

    }

    // init game

    function init() {
        $("#score-0").text(0);
        $("#score-1").text(0);
        $("#current-0").text(0);
        $("#current-1").text(0);
        $("#name-0").text("Player 1");
        $("#name-1").text("Player 2");
        activePlayer = Math.floor(Math.random() * 2);
        $(".player-" + activePlayer + "-panel").addClass("active");
        $(".player-0-panel").removeClass("winner");
        $(".player-1-panel").removeClass("winner");
        players = [0, 0];
        current = 0, lastDiceVal = 0;
        $(".btn-hold").bind("click", togglePlayer);
        $(".btn-roll").bind("click", rollDice);
    }


});
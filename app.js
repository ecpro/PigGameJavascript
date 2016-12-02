/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

$(function(){

    //start game and initialize players 

    var score0, score1, current0, current1, activePlayer;
    
    score0 = $("#score-0");
    score1 = $("#score-1");
    current0 = $("#current-0");
    current1 = $("#current-1");    
    activePlayer = Math.floor(Math.random() * 2);
    
    $(".player-"+activePlayer+"-panel").addClass("active");
    
    // roll dice event
    
    $(".btn-roll").on("click", function(event){
        event.preventDefault();
        var diceVal,diceImage,dice,current = 0;
        
        diceVal = Math.floor(Math.random() * 6) + 1;
        //console.log("dice value : " + diceVal);
        diceImage = "dice-" + diceVal + ".png";
        //console.log("image " + diceImage);
        dice = $(".dice");
        
        // dice animation
        
        function rotateDice() {
            for(var x = 1; x < 7; x++) {
                
                function rotate() {
                    var random = Math.floor(Math.random() * 6) + 1;
                    var randomDiceImage = "dice-" + random + ".png";
                    dice.attr("src", randomDiceImage);
                }
                
                setTimeout(rotate, 100 * x);
                                
            }
            
            setTimeout(function() {
                dice.attr("src",diceImage);
                }, 1000);
            
        }
        
        rotateDice();
        
        diceVal !== 1 ? current += diceVal : current = 0;
        currentPlayer.text(current);
        
        if(diceVal === 1) {
            togglePlayer();
        }
        
        function togglePlayer() {  
            var plyScore;
            if(activePlayer === 1) {
                plyScore = score1.text();
                plyScore += current;
                score0.text(plyScore);
                currentPlayer.text("0");
                currentPlayer = $("#current-" + 0);
                $(".player-"+activePlayer+"-panel").toggleClass("active");
                activePlayer = 0;
            }
            else {
                plyScore = player0Score.text();
                plyScore += current;
                player1Score.text(plyScore);
                currentPlayer.text("0");
                currentPlayer = $("#current-" + 1);
                $(".player-"+activePlayer+"-panel").toggleClass("active");
                activePlayer = 1;
            }
        }
        
    });
    
    
});
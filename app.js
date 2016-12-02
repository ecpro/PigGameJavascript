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

    var current,activePlayer;
    current = 0;
    activePlayer = Math.floor(Math.random() * 2);
    
    $(".player-"+activePlayer+"-panel").addClass("active");
    
    // roll dice event
    
    $(".btn-roll").on("click", function(event){
        event.preventDefault();
        var diceVal,diceImage,dice;
        var totalDelay = 0;
        diceVal = Math.floor(Math.random() * 6) + 1;
        console.log("dice value : " + diceVal);
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
                totalDelay += 10 * x;
                setTimeout(rotate, 10 * x);
                                
            }
            
        }
        
        rotateDice();
        
        // update active players current score 
        
        setTimeout(function (){
            dice.attr("src", diceImage);
           
            if(diceVal !== 1) {
                current += diceVal;
                console.log("new current" + current);
                $("#current-"+activePlayer).text(current);
            }
            else {
                var curr = parseInt($("#score-"+activePlayer).text());
                current = curr + current;
                $("#score-"+activePlayer).text(current);
                current = 0;
                $("#current-"+activePlayer).text(current);
                togglePlayer();
            }
            
        }, totalDelay);
        
    });
    
    // hold button function implementation
    
    $(".btn-hold").on("click", function(event) {
        event.preventDefault();
        var temp = parseInt($("#score-" + activePlayer).text());
        current += temp;
        $("#score-"+ activePlayer).text(current);
        current = 0;
        $("#current-"+activePlayer).text(current);
        togglePlayer();
    });
    
    
    $(".btn-new").on("click", function(event) {
       resetGame(); 
    });
    
        function togglePlayer() {
            if(activePlayer === 0) {
                activePlayer = 1;
            }
            else {
                activePlayer = 0;
            }
         $(".player-0-panel").toggleClass("active");
         $(".player-1-panel").toggleClass("active");

            
        }
       
    function resetGame() {
        $("#score-0").text(0);
        $("#score-1").text(0);
        $("#current-0").text("0");
        $("#current-1").text("0");
        $(".player-"+activePlayer+"-panel").toggleClass("active");
        activePlayer = Math.floor(Math.random() * 2);
        $(".player-"+activePlayer+"-panel").toggleClass("active");

}
    
    
});
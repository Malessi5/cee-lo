const rollBtn = document.getElementById("roll-btn");
const startBtn = document.getElementById("start-btn");
const die1 = document.getElementById("one");
const die2 = document.getElementById("two");
const die3 = document.getElementById("three");
const banner = document.getElementById("banner");
const scoreBanner = document.getElementById("current-score");
const p1Score = document.getElementById("player-one-score");
const p2Score = document.getElementById("player-two-score");
const playerOne = document.getElementById("p1");
const playerTwo = document.getElementById("p2");

let p1Turn = true;
let currentPlayer;
const player1 = ["Player One",0];
const player2 = ["Player Two",0];

function clickToStart(){
banner.textContent = "Click New Game to Start"
};

clickToStart();

startBtn.addEventListener("click", startGame);

function startGame(){
    rollBtn.addEventListener("click", handleClick);
    plTurn = true;
    clearDice();
    console.log("New Game");
    console.log("Player One's turn to roll")
    banner.textContent = "Player One's turn to roll";
    scoreReset();
    rollBtn.disabled = false;
    playerOne.style.backgroundColor = "#D3E3FC";
    playerOne.style.color = "#000"
    playerTwo.style.backgroundColor = "";
    playerTwo.style.color = ""
}

function handleClick(){
    if (p1Turn === true) {
        currentPlayer = player1;
        
    } else {
        playerTwo.style.backgroundColor="#D3E3FC";
        playerTwo.style.color = "#000"
        playerOne.style.color = ""
        playerOne.style.backgroundColor = "";
        currentPlayer = player2;
    }
   
    let roll = diceRoll();
    if (!check456(roll,currentPlayer[0]) && !check123(roll,currentPlayer[0]) ){
   // check456(roll,currentPlayer[0]);
    //check123(roll,currentPlayer[0]);
    reroll(roll,currentPlayer[0]);

    currentPlayer[1] = checkScore(roll,currentPlayer[0]); 
        console.log(currentPlayer[1]);

    if (p1Turn == true){
        checkWinner(player1[1],player2[1]);
    } 
    }
}

function scoreReset(){
    player1[1] = 0;
    player2[1] = 0;
}

function checkWinner(score1,score2){
    //compare scores to find the winner
    if (score1 > score2){
        banner.textContent = "Player One wins!"
        console.log("Player One wins!");
        rollBtn.disabled = true;

    } else if (score1<score2) {
        banner.textContent = "Player Two wins!"
        console.log("Player Two wins!");
        rollBtn.disabled = true;
    } else if (score1 == score2){
        banner.textContent = "It's a tie!"
        console.log("It's a tie!");
        rollBtn.disabled = true;
    }
    scoreReset();
    
}

function diceRoll() {
    let thisRoll = [];    
    //generate 3 random numbers as dice rolls
    for (let i = 1; i <= 3; i++) {
           thisRoll.push(Math.floor(Math.random() * 6) +1);
       };
    showRoll(thisRoll);
    //sort numbers in ascending order
    thisRoll.sort(function(a, b){return a - b});
    console.log(thisRoll);
    return thisRoll;
};

function showRoll(roll){
    //take the current roll and show the proper dice image
    die1.src = diceImg(roll[0]);
    die2.src = diceImg(roll[1]);
    die3.src = diceImg(roll[2]);
}


function clearDice(){
    die1.src = "images/dice1.png";
    die2.src = "images/dice1.png";
    die3.src = "images/dice1.png";
    banner.textContent = "";
    scoreBanner.textContent = "";
    p1Score.textContent = "";
    p2Score.textContent = "";
}

function check456(roll,currentPlayer){
if (roll[0] === 4 && roll[1] === 5 && roll[2] === 6){
    //player wins
    console.log (currentPlayer + " Automatic win!");
    banner.textContent = currentPlayer + " Automatic win!";
    scoreBanner.textContent = currentPlayer + " Wins!"
    //end game
    
    rollBtn.disabled = true;
    return true;
    };

};

function check123(roll,player){
    if  (roll[0] === 1 && roll[1] === 2 && roll[2] === 3){
        //player loses
        console.log (player + " Automatic loss!");
        banner.textContent = player + " Automatic loss!";
        scoreBanner.textContent = player + " Loses!"
        //end game
        rollBtn.disabled = true;
        return true;
    };
  
};

function reroll(roll,player){

    if (!(roll[0] === 4 && roll[1] === 5 && roll[2] === 6) && !(roll[0] === 1 && roll[1] === 2 && roll[2] === 3)){
    if (roll[0] !== roll[1] && roll[1] !== roll[2]){
        console.log("Roll again, "+player);
        scoreBanner.textContent = "Roll again "+ player;
       
    }
}
};

function checkScore(roll,player){
    if (roll[0] === roll[1] && roll[1] === roll[2]) {
        //player scores triple
        console.log(player + " has triple " + roll[0]+"s");
        scoreBanner.textContent = player + " rolled triple " + roll[0]+"s";
        showScore(roll[0],true);
        swapTurns();
        return roll[0] * 3;
       
    } else if (roll[0] === roll[1]){
        //player rolls a pair 
        console.log(player + " has a "+ roll[2]);
        scoreBanner.textContent = player + " rolled a "+ roll[2];
        showScore(roll[2]);
        swapTurns();
        return roll[2];

    } else if (roll[1] === roll[2]){
        //player rolls a pair 
        console.log(player + " has a "+ roll[0]);
        scoreBanner.textContent = player + " rolled a "+ roll[0];
        showScore(roll[0]);
        swapTurns();
        return roll[0];

    } 
}

function showScore(score,triple){
    if (p1Turn == true) {
        if (triple == true){
            p1Score.textContent = "Triple " + score + "'s";
        } else{
        p1Score.textContent = score;    
        }
        
    } else {
        if (triple == true){
            p2Score.textContent = "Triple " + score + "'s";}
            else{
            p2Score.textContent = score;
            }
    }
}

function swapTurns() {
    p1Turn = !p1Turn;
    if (p1Turn == false){
        banner.textContent = "Player Two's turn to roll";
    console.log("Player Two's turn to roll")
    }
}

function diceImg(num){
    //pull the proper dice image based on the roll
        switch (num) {
            case 1:
            return "images/dice1.png"
            break;

            case 2:
            return "images/dice2.png"
            break;

            case 3:
            return "images/dice3.png"
            break;

            case 4:
            return "images/dice4.png"
            break;

            case 5:
            return "images/dice5.png"
            break;

            case 6:
            return "images/dice6.png"
            break;
        }
    
}
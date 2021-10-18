class Player {
  constructor(name) {
    (this.name = name), (this.score = 0), (this.wins = 0), (this.turn = false);
  }
}

class Game {
  constructor() {
    (this.players = []), (this.winner = null);
  }

  addPlayer(player) {
    this.players.push(player);
  }

  startGame() {
    while (!this.winner) {
      //roll dice
      //check score
    }
  }

  rollDice() {
    let thisRoll = [];
    for (let i = 1; i <= 3; i++) {
      thisRoll.push(Math.floor(Math.random() * 6) + 1);
    }
    return this.rollScore(thisRoll);
  }

  rollScore(dice) {
    dice.sort((a, b) => a - b);
    if (dice[0] === 4 && dice[1] === 5 && dice[2] === 6) {
      return 456;
    } else if (dice[0] === 1 && dice[1] === 2 && dice[2] === 3) {
      return 123;
    } else if (dice[0] === dice[1] && dice[1] === dice[2]) {
      return Number(`${dice[0]}${dice[1]}${dice[2]}`);
    } else if (dice[0] === dice[1] || dice[1] === dice[2]) {
      return dice[0] === dice[1] ? dice[2] : dice[0];
    } else {
      return 0;
    }
  }

  playerTurn(player) {
    player.score = this.rollDice();
  }
}

const game = new Game();

game.rollDice();

let userScore = 0;
let computerScore = 0;
let rollCount = 0;

const diceImages = [
    'images/Dice-1.png',
    'images/Dice-2.png',
    'images/Dice-3.png',
    'images/Dice-4.png',
    'images/Dice-5.png',
    'images/Dice-6.png'
];

class Player {
    constructor(name) {
        this.name = name;
        this.currentRoll = [0, 0];
    }

    rollDice() {
        this.currentRoll[0] = Math.floor(Math.random() * 6) + 1;
        this.currentRoll[1] = Math.floor(Math.random() * 6) + 1;
    }

    calculateScore() {
        const [die1, die2] = this.currentRoll;
        if (die1 === 1 || die2 === 1) {
            return 0;
        } else if (die1 === die2) {
            return (die1 + die2) * 2;
        } else {
            return die1 + die2;
        }
    }
}

const user = new Player('User');
const computer = new Player('Computer');

function updateDiceImages(player) {
    const dice1 = $(`#${player.name.toLowerCase()}Dice-1 img`);
    const dice2 = $(`#${player.name.toLowerCase()}Dice-2 img`);

    console.log(`${player.name} rolled: ${player.currentRoll[0]}, ${player.currentRoll[1]}`);  // Debug log
    
    dice1.fadeOut(200, function() {
        $(this).attr('src', diceImages[player.currentRoll[0] - 1]).fadeIn(200);
    });

    dice2.fadeOut(200, function() {
        $(this).attr('src', diceImages[player.currentRoll[1] - 1]).fadeIn(200);
    });
}

function rollDice() {
    if (rollCount >= 3) return;

    rollCount++;
    user.rollDice();
    computer.rollDice();

    updateDiceImages(user);
    updateDiceImages(computer);

    const userRoundScore = user.calculateScore();
    const computerRoundScore = computer.calculateScore();

    userScore += userRoundScore;
    computerScore += computerRoundScore;

    document.getElementById('userScore').textContent = userScore;
    document.getElementById('computerScore').textContent = computerScore;

    if (rollCount === 3) {
        displayResult();
    }
}

function displayResult() {
    let resultText;
    if (userScore > computerScore) {
        resultText = 'User wins!';
    } else if (userScore < computerScore) {
        resultText = 'Computer wins!';
    } else {
        resultText = 'It\'s a draw!';
    }

    document.getElementById('result').textContent = resultText;
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    rollCount = 0;

    document.getElementById('userScore').textContent = userScore;
    document.getElementById('computerScore').textContent = computerScore;
    document.getElementById('result').textContent = '';

    const diceElements = document.querySelectorAll('.dice img');
    diceElements.forEach(die => die.src = diceImages[0]);
}
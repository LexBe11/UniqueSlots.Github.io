let balance = 2500.00;
let activeBet = null;

function updateBalance() {
    document.getElementById('balance').innerText = `Balance: $${balance.toFixed(2)}`;
}

function placeBet(amount, button) {
    activeBet = amount;
    let buttons = document.querySelectorAll('.betting-options button');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

function spin() {
    if (activeBet === null) {
        alert("Please place a bet!");
        return;
    }

    if (balance < activeBet) {
        alert("Insufficient balance!");
        return;
    }

    balance -= activeBet;
    updateBalance();

    let symbols = ['🍒', '🍊', '🍏', '🍌', '7'];
    let results = [];

    // Random number to determine which pattern to use
    let randomNumber = Math.random() * 100;

    // Define patterns with different probabilities
    if (randomNumber < 2) {
        results = ['7', '7', '7']; // 2% chance for 3x 7s
    } else if (randomNumber < 10) {
        results = ['🍊', '7', '7']; // 8% chance for Orange, 2x 7s
    } else if (randomNumber < 18) {
        results = ['🍏', '7', '7']; // 8% chance for Apple, 2x 7s
    } else if (randomNumber < 26) {
        results = ['🍌', '7', '7']; // 8% chance for Banana, 2x 7s
    } else if (randomNumber < 34) {
        results = ['🍒', '7', '7']; // 8% chance for Cherry, 2x 7s
    } else if (randomNumber < 48) {
        results = ['7', '🍊', '🍏']; // 14% chance for 7, Orange, Apple
    } else if (randomNumber < 62) {
        results = ['🍊', '7', '🍌']; // 14% chance for Orange, 7, Banana
    } else if (randomNumber < 70) {
        results = ['🍏', '🍏', '7']; // 8% chance for 2x Apple, 7
    } else if (randomNumber < 78) {
        results = ['🍌', '🍌', '7']; // 8% chance for 2x Banana, 7
    } else if (randomNumber < 86) {
        results = ['🍒', '7', '🍏']; // 8% chance for Cherry, 7, Apple
    } else if (randomNumber < 92) {
        results = ['🍊', '🍊', '🍊']; // 6% chance for 3x Oranges
    } else if (randomNumber < 96) {
        results = ['🍏', '🍏', '🍏']; // 4% chance for 3x Apples
    } else if (randomNumber < 98) {
        results = ['🍌', '🍌', '🍌']; // 2% chance for 3x Bananas
    } else {
        results = ['🍒', '🍒', '🍒']; // Default: 2% chance for 3x Cherries
    }

    updateSlots(results);
    checkWin(results);
}

function updateSlots(results) {
    document.getElementById('slot1').textContent = results[0];
    document.getElementById('slot2').textContent = results[1];
    document.getElementById('slot3').textContent = results[2];
}

function checkWin(results) {
    let resultText = document.getElementById('result');
    let winnings = 0;

    if (results[0] === results[1] && results[1] === results[2]) {
        if (results[0] === '7') {
            resultText.textContent = 'Jackpot! 🎉 You got 3x 7s!';
            winnings = activeBet * 1000;
        } else if (results[0] === '🍊') {
            resultText.textContent = 'You got 3x Oranges!';
            winnings = activeBet * 50;
        } else if (results[0] === '🍏') {
            resultText.textContent = 'You got 3x Apples!';
            winnings = activeBet * 20;
        } else if (results[0] === '🍌') {
            resultText.textContent = 'You got 3x Bananas!';
            winnings = activeBet * 10;
        } else if (results[0] === '🍒') {
            resultText.textContent = 'You got 3x Cherries!';
            winnings = activeBet * 5;
        }
    } else {
        resultText.textContent = 'Try again!';
    }

    balance += winnings;
    updateBalance();
}

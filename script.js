let balance = 100; // Initial balance
const spinCost = 5; // Cost per spin

function spin() {
    if (balance >= spinCost) {
        balance -= spinCost; // Decrease balance by spin cost

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
        updateBalanceDisplay(); // Update the displayed balance
    } else {
        alert('Not enough balance to spin!');
    }
}

function updateSlots(results) {
    document.getElementById('slot1').textContent = results[0];
    document.getElementById('slot2').textContent = results[1];
    document.getElementById('slot3').textContent = results[2];
}

function checkWin(results) {
    let resultText = document.getElementById('result');

    if (results[0] === results[1] && results[1] === results[2]) {
        if (results[0] === '7') {
            resultText.textContent = 'Jackpot! 🎉 You got 3x 7s!';
        } else if (results[0] === '🍊') {
            resultText.textContent = 'You got 3x Oranges!';
        } else if (results[0] === '🍏') {
            resultText.textContent = 'You got 3x Apples!';
        } else if (results[0] === '🍌') {
            resultText.textContent = 'You got 3x Bananas!';
        } else if (results[0] === '🍒') {
            resultText.textContent = 'You got 3x Cherries!';
        }
    } else {
        resultText.textContent = 'Try again!';
    }
}

function updateBalanceDisplay() {
    document.getElementById('balance').textContent = 'Balance: $' + balance;
}

// Initial display update
updateBalanceDisplay();

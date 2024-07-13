let balance = 3500;
let betAmount = 10;
let symbols = ['🍒', '🍊', '🍏', '🍌', '7🖤', '7🔵', '7🔴', '7🟢'];

function spin() {
    if (balance < betAmount) {
        alert("Not enough balance to place the bet.");
        return;
    }

    balance -= betAmount;
    updateBalance();

    let results = [];
    let randomNumber = Math.random() * 100;

    // Define patterns with different probabilities
    if (randomNumber < 50) {
        results = ['🍏', '🍌', '🍒']; // 50% chance for Mixed Fruits
    } else if (randomNumber < 70) {
        results = ['🍒', '🍒', '🍒']; // 20% chance for 3x Cherries
    } else if (randomNumber < 85) {
        results = ['🍊', '🍊', '🍊']; // 15% chance for 3x Oranges
    } else if (randomNumber < 95) {
        results = ['🍏', '🍏', '🍏']; // 10% chance for 3x Apples
    } else if (randomNumber < 96) {
        results = ['🍌', '🍌', '🍌']; // 1% chance for 3x Bananas
    } else if (randomNumber < 97) {
        results = ['🍏', '🍌', '🍏']; // 1% chance for Mixed Fruits
    } else if (randomNumber < 98) {
        results = ['7🖤', '7🖤', '7🖤']; // 1% chance for 3x Black 7s
    } else if (randomNumber < 99) {
        results = ['7🔴', '7🔴', '7🔴']; // 1% chance for 3x Red 7s
    } else {
        results = ['7🔵', '7🔵', '7🔵']; // 1% chance for 3x Blue 7s
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

    if (results[0] === results[1] && results[1] === results[2]) {
        if (results[0] === '7🖤') {
            resultText.textContent = 'Jackpot! 🎉 You got 3x Black 7s! You win $10,000,000!';
            balance += 10000000;
        } else if (results[0] === '7🔵') {
            resultText.textContent = 'You got 3x Blue 7s! You win $2,500,000!';
            balance += 2500000;
        } else if (results[0] === '7🔴') {
            resultText.textContent = 'You got 3x Red 7s! You win $1,200,000!';
            balance += 1200000;
        } else if (results[0] === '7🟢') {
            resultText.textContent = 'You got 3x Green 7s! You win $830,000!';
            balance += 830000;
        } else if (results[0] === '🍒') {
            resultText.textContent = 'You got 3x Cherries! You win $10,000!';
            balance += 10000;
        } else if (results[0] === '🍊') {
            resultText.textContent = 'You got 3x Oranges! You win $5,000!';
            balance += 5000;
        } else if (results[0] === '🍏') {
            resultText.textContent = 'You got 3x Apples! You win $3,000!';
            balance += 3000;
        } else if (results[0] === '🍌') {
            resultText.textContent = 'You got 3x Bananas! You win $2,000!';
            balance += 2000;
        }
    } else {
        resultText.textContent = 'Try again!';
    }

    updateBalance();
}

function updateBalance() {
    document.getElementById('balance').textContent = balance;
}

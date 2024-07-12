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
    if (randomNumber < 0.01) {
        results = ['7🖤', '7🖤', '7🖤']; // 0.01% chance for 3x Black 7s
    } else if (randomNumber < 0.11) {
        results = ['7🔵', '7🔵', '7🔵']; // 0.1% chance for 3x Blue 7s
    } else if (randomNumber < 0.21) {
        results = ['7🔴', '7🔴', '7🔴']; // 0.1% chance for 3x Red 7s
    } else if (randomNumber < 0.31) {
        results = ['7🟢', '7🟢', '7🟢']; // 0.1% chance for 3x Green 7s
    } else if (randomNumber < 2.31) {
        results = ['7🔵', '7🔴', '7🟢']; // 2% chance for Blue 7, Red 7, Green 7
    } else if (randomNumber < 4.31) {
        results = ['7🔴', '7🟢', '7🖤']; // 2% chance for Red 7, Green 7, Black 7
    } else if (randomNumber < 6.31) {
        results = ['7🖤', '7🟢', '7🔵']; // 2% chance for Black 7, Green 7, Blue 7
    } else if (randomNumber < 16.31) {
        results = ['🍒', '🍒', '🍒']; // 10% chance for 3x Cherries
    } else if (randomNumber < 26.31) {
        results = ['🍊', '🍊', '🍊']; // 10% chance for 3x Oranges
    } else if (randomNumber < 36.31) {
        results = ['🍏', '🍏', '🍏']; // 10% chance for 3x Apples
    } else if (randomNumber < 46.31) {
        results = ['🍌', '🍌', '🍌']; // 10% chance for 3x Bananas
    } else if (randomNumber < 56.31) {
        results = ['🍒', '🍊', '🍏']; // 10% chance for Cherry, Orange, Apple
    } else if (randomNumber < 66.31) {
        results = ['🍌', '7🔴', '7🟢']; // 10% chance for Banana, Red 7, Green 7
    } else if (randomNumber < 76.31) {
        results = ['7🔵', '7🔴', '🍏']; // 10% chance for Blue 7, Red 7, Apple
    } else if (randomNumber < 78.31) {
        results = ['🍒', '🍊', '🍌']; // 2% chance for Cherry, Orange, Banana
    } else if (randomNumber < 80.31) {
        results = ['🍏', '🍌', '🍒']; // 2% chance for Apple, Banana, Cherry
    } else if (randomNumber < 82.31) {
        results = ['🍊', '🍏', '🍌']; // 2% chance for Orange, Apple, Banana
    } else if (randomNumber < 84.31) {
        results = ['7🖤', '7🔵', '7🔴']; // 2% chance for Black 7, Blue 7, Red 7
    } else if (randomNumber < 86.31) {
        results = ['7🟢', '7🔵', '7🔴']; // 2% chance for Green 7, Blue 7, Red 7
    } else if (randomNumber < 88.31) {
        results = ['7🔴', '7🟢', '7🔵']; // 2% chance for Red 7, Green 7, Blue 7
    } else if (randomNumber < 90.31) {
        results = ['7🔵', '7🟢', '7🖤']; // 2% chance for Blue 7, Green 7, Black 7
    } else {
        results = ['🍒', '🍒', '7🔵']; // Default: 10% chance for Cherry, Cherry, Blue 7
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
            balance += 100000;
        } else if (results[0] === '7🔵') {
            resultText.textContent = 'You got 3x Blue 7s! You win $2,500,000!';
            balance += 50000;
        } else if (results[0] === '7🔴') {
            resultText.textContent = 'You got 3x Red 7s! You win $1,200,000!';
            balance += 30000;
        } else if (results[0] === '7🟢') {
            resultText.textContent = 'You got 3x Green 7s! You win $830,000!';
            balance += 20000;
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

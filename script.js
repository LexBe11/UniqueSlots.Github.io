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
    if (randomNumber < 2) {
        results = ['7🖤', '7🖤', '7🖤']; // 2% chance for 3x Black 7s
    } else if (randomNumber < 4) {
        results = ['7🔵', '7🔵', '7🔵']; // 2% chance for 3x Blue 7s
    } else if (randomNumber < 6) {
        results = ['7🔴', '7🔴', '7🔴']; // 2% chance for 3x Red 7s
    } else if (randomNumber < 8) {
        results = ['7🟢', '7🟢', '7🟢']; // 2% chance for 3x Green 7s
    } else if (randomNumber < 10) {
        results = ['🍊', '7🖤', '7🔵']; // 2% chance for Orange, Black 7, Blue 7
    } else if (randomNumber < 12) {
        results = ['🍏', '7🔵', '7🔴']; // 2% chance for Apple, Blue 7, Red 7
    } else if (randomNumber < 14) {
        results = ['🍌', '7🔴', '7🟢']; // 2% chance for Banana, Red 7, Green 7
    } else if (randomNumber < 16) {
        results = ['🍒', '7🟢', '7🖤']; // 2% chance for Cherry, Green 7, Black 7
    } else if (randomNumber < 18) {
        results = ['7🖤', '7🔵', '7🔴']; // 2% chance for Black 7, Blue 7, Red 7
    } else if (randomNumber < 20) {
        results = ['7🔵', '7🔴', '7🟢']; // 2% chance for Blue 7, Red 7, Green 7
    } else if (randomNumber < 24) {
        results = ['🍊', '🍏', '🍌']; // 4% chance for Orange, Apple, Banana
    } else if (randomNumber < 28) {
        results = ['🍌', '🍌', '7🔵']; // 4% chance for 2x Banana, Blue 7
    } else if (randomNumber < 32) {
        results = ['🍒', '7🔵', '7🟢']; // 4% chance for Cherry, Blue 7, Green 7
    } else if (randomNumber < 36) {
        results = ['7🟢', '7🟢', '7🟢']; // 4% chance for 3x Green 7s
    } else if (randomNumber < 42) {
        results = ['🍏', '🍏', '7🔵']; // 6% chance for 2x Apple, Blue 7
    } else if (randomNumber < 48) {
        results = ['🍊', '7🟢', '7🔴']; // 6% chance for Orange, Green 7, Red 7
    } else if (randomNumber < 54) {
        results = ['7🔴', '7🟢', '7🖤']; // 6% chance for Red 7, Green 7, Black 7
    } else if (randomNumber < 60) {
        results = ['7🖤', '7🟢', '7🔵']; // 6% chance for Black 7, Green 7, Blue 7
    } else if (randomNumber < 70) {
        results = ['🍏', '🍌', '🍒']; // 10% chance for Apple, Banana, Cherry
    } else if (randomNumber < 80) {
        results = ['🍊', '7🔴', '7🖤']; // 10% chance for Orange, Red 7, Black 7
    } else if (randomNumber < 90) {
        results = ['7🔵', '7🔴', '7🍌']; // 10% chance for Blue 7, Red 7, Banana
    } else {
        results = ['🍒', '🍒', '🍒']; // Default: 10% chance for 3x Cherries
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
            resultText.textContent = 'Jackpot! 🎉 You got 3x Black 7s! You win $100,000!';
            balance += 100000;
        } else if (results[0] === '7🔵') {
            resultText.textContent = 'You got 3x Blue 7s! You win $50,000!';
            balance += 50000;
        } else if (results[0] === '7🔴') {
            resultText.textContent = 'You got 3x Red 7s! You win $30,000!';
            balance += 30000;
        } else if (results[0] === '7🟢') {
            resultText.textContent = 'You got 3x Green 7s! You win $20,000!';
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

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
        results = ['7🔴', '7🔴', '7🔴']; // 0.1% chance for 3x Red 7s
    } else if (randomNumber < 0.21) {
        results = ['7🔵', '7🔵', '7🔵']; // 0.1% chance for 3x Blue 7s
    } else if (randomNumber < 0.41) {
        results = ['7🟢', '7🟢', '7🟢']; // 0.2% chance for 3x Green 7s
    } else if (randomNumber < 2.41) {
        results = ['7🔵', '7🔴', '7🟢']; // 2% chance for Blue 7, Red 7, Green 7
    } else if (randomNumber < 4.41) {
        results = ['7🔴', '7🟢', '7🖤']; // 2% chance for Red 7, Green 7, Black 7
    } else if (randomNumber < 6.41) {
        results = ['7🖤', '7🟢', '7🔵']; // 2% chance for Black 7, Green 7, Blue 7
    } else if (randomNumber < 16.41) {
        results = ['🍒', '🍒', '🍒']; // 10% chance for 3x Cherries
    } else if (randomNumber < 26.41) {
        results = ['🍊', '🍊', '🍊']; // 10% chance for 3x Oranges
    } else if (randomNumber < 36.41) {
        results = ['🍏', '🍏', '🍏']; // 10% chance for 3x Apples
    } else if (randomNumber < 46.41) {
        results = ['🍌', '🍌', '🍌']; // 10% chance for 3x Bananas
    } else if (randomNumber < 56.41) {
        results = ['🍒', '🍊', '🍏']; // 10% chance for Cherry, Orange, Apple
    } else if (randomNumber < 66.41) {
        results = ['🍌', '7🔴', '7🟢']; // 10% chance for Banana, Red 7, Green 7
    } else if (randomNumber < 76.41) {
        results = ['7🔵', '7🔴', '🍏']; // 10% chance for Blue 7, Red 7, Apple
    } else if (randomNumber < 78.41) {
        results = ['🍒', '🍊', '🍌']; // 2% chance for Cherry, Orange, Banana
    } else if (randomNumber < 80.41) {
        results = ['🍏', '🍌', '🍒']; // 2% chance for Apple, Banana, Cherry
    } else if (randomNumber < 82.41) {
        results = ['🍊', '🍏', '🍌']; // 2% chance for Orange, Apple, Banana
    } else if (randomNumber < 84.41) {
        results = ['7🖤', '7🔵', '7🔴']; // 2% chance for Black 7, Blue 7, Red 7
    } else if (randomNumber < 86.41) {
        results = ['7🟢', '7🔵', '7🔴']; // 2% chance for Green 7, Blue 7, Red 7
    } else if (randomNumber < 88.41) {
        results = ['7🔴', '7🟢', '7🔵']; // 2% chance for Red 7, Green 7, Blue 7
    } else if (randomNumber < 90.41) {
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
    let resultText = document.getElementById('resultText');

    if (results[0] === results[1] && results[1] === results[2]) {
        switch (results[0]) {
            case '7🖤':
                balance += 1000000;
                resultText.textContent = 'Jackpot! You won 1,000,000!';
                break;
            case '7🔴':
                balance += 800000;
                resultText.textContent = 'Big Win! You won 800,000!';
                break;
            case '7🔵':
                balance += 500000;
                resultText.textContent = 'Nice! You won 500,000!';
                break;
            case '7🟢':
                balance += 300000;
                resultText.textContent = 'Good! You won 300,000!';
                break;
            case '🍒':
                balance += 100;
                resultText.textContent = 'You won 100!';
                break;
            case '🍊':
                balance += 50;
                resultText.textContent = 'You won 50!';
                break;
            case '🍏':
                balance += 25;
                resultText.textContent = 'You won 25!';
                break;
            case '🍌':
                balance += 10;
                resultText.textContent = 'You won 10!';
                break;
        }
    } else if (results.includes('7🖤') || results.includes('7🔴') || results.includes('7🔵') || results.includes('7🟢')) {
        if (results[0] === '7🖤' || results[1] === '7🖤' || results[2] === '7🖤') {
            balance += 500;
            resultText.textContent = 'You got a black 7! You won 500!';
        } else if (results[0] === '7🔴' || results[1] === '7🔴' || results[2] === '7🔴') {
            balance += 200;
            resultText.textContent = 'You got a red 7! You won 200!';
        } else if (results[0] === '7🔵' || results[1] === '7🔵' || results[2] === '7🔵') {
            balance += 100;
            resultText.textContent = 'You got a blue 7! You won 100!';
        } else if (results[0] === '7🟢' || results[1] === '7🟢' || results[2] === '7🟢') {
            balance += 50;
            resultText.textContent = 'You got a green 7! You won 50!';
        }
    } else {
        resultText.textContent = 'Try again!';
    }

    updateBalance();
}

function updateBalance() {
    document.getElementById('balance').textContent = 'Balance: ' + balance;
}

// Initialize balance display
updateBalance();

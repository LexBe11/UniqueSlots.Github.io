let balance = 800;
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
    } else if (randomNumber < 0.31) {
        results = ['7🔵', '7🔵', '7🔵']; // 0.2% chance for 3x Blue 7s
    } else if (randomNumber < 0.71) {
        results = ['7🟢', '7🟢', '7🟢']; // 0.4% chance for 3x Green 7s
    } else if (randomNumber < 1.31) {
        results = ['7🔵', '7🔴', '7🟢']; // 0.6% chance for Blue 7, Red 7, Green 7
    } else if (randomNumber < 1.91) {
        results = ['7🔴', '7🟢', '7🖤']; // 0.6% chance for Red 7, Green 7, Black 7
    } else if (randomNumber < 2.51) {
        results = ['7🖤', '7🟢', '7🔵']; // 0.6% chance for Black 7, Green 7, Blue 7
    } else if (randomNumber < 12.51) {
        results = ['🍒', '🍒', '🍒']; // 10% chance for 3x Cherries
    } else if (randomNumber < 22.51) {
        results = ['🍊', '🍊', '🍊']; // 10% chance for 3x Oranges
    } else if (randomNumber < 32.51) {
        results = ['🍏', '🍏', '🍏']; // 10% chance for 3x Apples
    } else if (randomNumber < 42.51) {
        results = ['🍌', '🍌', '🍌']; // 10% chance for 3x Bananas
    } else if (randomNumber < 50.00) {
        results = ['🍒', '🍊', '🍏']; // 7.49% chance for Mixed Fruits
    } else if (randomNumber < 57.50) {
        results = ['🍏', '🍌', '🍒']; // 7.50% chance for Mixed Fruits
    } else if (randomNumber < 65.00) {
        results = ['🍊', '🍒', '🍌']; // 7.50% chance for Mixed Fruits
    } else if (randomNumber < 72.50) {
        results = ['🍌', '🍏', '🍊']; // 7.50% chance for Mixed Fruits
    } else if (randomNumber < 80.00) {
        results = ['🍒', '🍏', '🍒']; // 7.50% chance for Mixed Fruits
    } else if (randomNumber < 87.50) {
        results = ['🍏', '🍌', '🍌']; // 7.50% chance for Mixed Fruits
    } else {
        results = [symbols[Math.floor(Math.random() * symbols.length)], 
                   symbols[Math.floor(Math.random() * symbols.length)], 
                   symbols[Math.floor(Math.random() * symbols.length)]];
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
            default:
                resultText.textContent = 'No win, try again!';
                break;
        }
    } else {
        resultText.textContent = 'No win, try again!';
    }

    updateBalance();
}

function updateBalance() {
    document.getElementById('balance').textContent = 'Balance: ' + balance;
}

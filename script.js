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
    } else if (randomNumber < 3.01) {
        results = ['🍒', '🍒', '🍒']; // 0.5% chance for 3x Cherries
    } else if (randomNumber < 5.01) {
        results = ['🍊', '🍊', '🍊']; // 2% chance for 3x Oranges
    } else if (randomNumber < 9.01) {
        results = ['🍌', '🍌', '🍌']; // 4% chance for 3x Bananas
    } else if (randomNumber < 19.01) {
        results = ['🍏', '🍏', '🍏']; // 10% chance for 3x Apples
    } else if (randomNumber < 21.01) {
        results = ['🍒', '🍊', '🍏']; // 2% chance for Mixed Fruits
    } else if (randomNumber < 23.01) {
        results = ['🍏', '🍌', '🍒']; // 2% chance for Mixed Fruits
    } else if (randomNumber < 25.01) {
        results = ['🍊', '🍒', '🍌']; // 2% chance for Mixed Fruits
    } else if (randomNumber < 27.01) {
        results = ['🍌', '🍏', '🍊']; // 2% chance for Mixed Fruits
    } else if (randomNumber < 29.01) {
        results = ['🍒', '🍏', '🍒']; // 2% chance for Mixed Fruits
    } else if (randomNumber < 31.01) {
        results = ['🍏', '🍌', '🍌']; // 2% chance for Mixed Fruits
    } else {
        results = [
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)]
        ];
    }

    document.getElementById('slot1').textContent = results[0];
    document.getElementById('slot2').textContent = results[1];
    document.getElementById('slot3').textContent = results[2];

    if (results[0] === results[1] && results[1] === results[2]) {
        if (results[0] === '7🖤') {
            balance += 5000000; // 3x Black 7s
        } else if (results[0] === '7🔴') {
            balance += 2000000; // 3x Red 7s
        } else if (results[0] === '7🔵') {
            balance += 1000000; // 3x Blue 7s
        } else if (results[0] === '7🟢') {
            balance += 800000; // 3x Green 7s
        } else if (results[0] === '🍒') {
            balance += 1000000; // 3x Cherries
        } else if (results[0] === '🍊') {
            balance += 50000; // 3x Oranges
        } else if (results[0] === '🍌') {
            balance += 20000; // 3x Bananas
        } else if (results[0] === '🍏') {
            balance += 10000; // 3x Apples
        }
        updateBalance();
    }
}

function updateBalance() {
    document.getElementById('balance').textContent =

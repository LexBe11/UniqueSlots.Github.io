const symbols = [
    '🍒', '🍊', '🍏', '🍌', '🍇', '🍓', '🍍', '🥭', '🍈',
    '7🖤', '7🔵', '7🔴', '7🟢',
    'BONUS🥇', 'BONUS🔵', 'BONUS🟢', 'BONUS⚫', 'BONUS🔴'
];

const payouts = {
    '7🖤': 178223922,
    '7🔵': 50000000,
    '7🔴': 20000000,
    '7🟢': 10000000,
    '🍒': 10000,
    '🍊': 5000,
    '🍏': 3000,
    '🍌': 2000,
    '🍇': 4000,
    '🍓': 6000,
    '🍍': 7000,
    '🥭': 8000,
    '🍈': 9000,
    'BONUS🥇': 75000000,
    'BONUS🔵': 50000000,
    'BONUS🟢': 40000000,
    'BONUS⚫': 30000000,
    'BONUS🔴': 20000000
};

let balance = parseFloat(localStorage.getItem('balance')) || 150;
const betAmount = 10;

const spinSound = new Audio('https://drive.google.com/uc?export=download&id=1dtYmJobuS87AADUhQF6oadQfo7RHufFd');
const jackpotSound = new Audio('https://drive.google.com/uc?export=download&id=1oukLH1PLUJxRyKJ_0TLkxaEfF-n6Dl-a');
const winSound = new Audio('https://drive.google.com/uc?export=download&id=1zcXdkTkZYLUGoDW0OT_tZl7bSZCvInpA');

function spin() {
    if (balance < betAmount) {
        alert("Not enough balance to place the bet.");
        return;
    }

    balance -= betAmount;
    updateBalance();

    let results = [];
    for (let i = 0; i < 3; i++) {
        results.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }

    spinSound.play();
    updateSlotsSequentially(results);
    setTimeout(() => checkWin(results), 3000);
}

function updateSlotsSequentially(results) {
    results.forEach((symbol, index) => {
        setTimeout(() => {
            document.getElementById(`slot${index + 1}`).textContent = symbol;
        }, index * 500);
    });
}

function checkWin(results) {
    let resultText = document.getElementById('result');
    let counts = {};
    results.forEach(symbol => {
        counts[symbol] = (counts[symbol] || 0) + 1;
    });

    let winMessage = 'Try again!';
    let winAmount = 0;

    // Get luck multiplier if active
    let multiplier = parseFloat(localStorage.getItem('luckMultiplier')) || 1;
    let expiry = parseFloat(localStorage.getItem('multiplierExpiry')) || 0;
    let currentTime = new Date().getTime();
    
    if (currentTime > expiry) {
        localStorage.removeItem('luckMultiplier');
        localStorage.removeItem('multiplierExpiry');
        multiplier = 1;
    }

    // Check for patterns and payouts
    for (let symbol of symbols) {
        if (counts[symbol] >= 3) {
            winAmount = payouts[symbol] * multiplier;
            winMessage = `You got ${counts[symbol]}x ${symbol}! You win $${winAmount}!`;
            break;
        }
    }

    if (winAmount > 0) {
        winSound.play();
        resultText.textContent = winMessage;
        balance += winAmount;
    } else {
        resultText.textContent = 'Try again!';
    }

    updateBalance();
}

function updateBalance() {
    localStorage.setItem('balance', balance);
    document.getElementById('balance').textContent = `$${balance}`;
}

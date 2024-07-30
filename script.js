let balance = 3500;
let betAmount = 10;
let symbols = [
    '🍒', '🍊', '🍏', '🍌', '7🖤', '7🔵', '7🔴', '7🟢',
    'BONUS🥇', 'BONUS🔵', 'BONUS🟢', 'BONUS⚫', 'BONUS🔴'
];

let payouts = {
    '7🖤': 178223922,
    '7🔵': 50000000,
    '7🔴': 20000000,
    '7🟢': 10000000,
    '🍒': 10000,
    '🍊': 5000,
    '🍏': 3000,
    '🍌': 2000,
    'BONUS🥇': 75000000,
    'BONUS🔵': 50000000,
    'BONUS🟢': 40000000,
    'BONUS⚫': 30000000,
    'BONUS🔴': 20000000
};

let spinSound = new Audio('https://drive.google.com/uc?export=download&id=1dtYmJobuS87AADUhQF6oadQfo7RHufFd');
let jackpotSound = new Audio('https://drive.google.com/uc?export=download&id=1oukLH1PLUJxRyKJ_0TLkxaEfF-n6Dl-a');
let winSound = new Audio('https://drive.google.com/uc?export=download&id=1zcXdkTkZYLUGoDW0OT_tZl7bSZCvInpA');

function spin() {
    if (balance < betAmount) {
        alert("Not enough balance to place the bet.");
        return;
    }

    balance -= betAmount;
    updateBalance();

    let results = [];
    for (let i = 0; i < 12; i++) {
        results.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }

    spinSound.play();
    updateSlotsSequentially(results);
    setTimeout(() => checkWin(results), 6000);
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

    // Check for patterns and payouts
    for (let symbol of symbols) {
        if (counts[symbol] >= 3) {
            winMessage = `You got ${counts[symbol]}x ${symbol}! You win $${payouts[symbol]}!`;
            winAmount = payouts[symbol];
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
    document.getElementById('balance').textContent = `Balance: $${balance}`;
}

function donate(amount) {
    balance += amount;
    updateBalance();
    alert(`Thank you for your donation of $${amount}!`);
}

function toggleAdminPanel() {
    // Placeholder function for admin panel toggle
    alert('Admin panel functionality not yet implemented.');
}

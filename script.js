const symbols = ['💀', '🌸', '🍒', 'BAR', '7️⃣'];
const payouts = { '7️⃣': 5000, 'BAR': 1000, '🌸': 500, '💀': 200 };
let balance = parseFloat(localStorage.getItem('balance')) || 150;
const spinSound = new Audio('https://example.com/spin-sound.mp3'); // Replace with a valid URL
const winSound = new Audio('https://example.com/win-sound.mp3'); // Replace with a valid URL

function spin() {
    const slotsBet = parseFloat(document.getElementById('slots-bet').value);
    if (isNaN(slotsBet) || slotsBet <= 0) {
        alert("Please enter a valid bet amount.");
        return;
    }
    
    if (balance < slotsBet) {
        alert("Not enough balance to place the bet.");
        return;
    }

    balance -= slotsBet;
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
    let resultText = document.getElementById('slots-result');
    let counts = {};
    results.forEach(symbol => {
        counts[symbol] = (counts[symbol] || 0) + 1;
    });

    let winMessage = 'Try again!';
    let winAmount = 0;

    for (let symbol of symbols) {
        if (counts[symbol] === 3) {
            winAmount = payouts[symbol];
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
    document.getElementById('balance').textContent = `Balance: $${balance}`;
}

// Initialize balance display
updateBalance();

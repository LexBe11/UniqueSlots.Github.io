let balance = 3500;
let betAmount = 10;
let symbols = ['🍒', '🍊', '🍏', '🍌', '7🖤', '7🔵', '7🔴', '7🟢', 'BONUS🥇', 'BONUS🔵', 'BONUS🟢', 'BONUS⚫', 'BONUS🔴', 'BONUS🟣', '3', '9', '21'];

// Spin sound (replace with actual URL if you have a spin sound)
let spinSound = new Audio('https://drive.google.com/uc?export=download&id=1dtYmJobuS87AADUhQF6oadQfo7RHufFd');

// Jackpot sound (convert from YouTube link and host it somewhere)
let jackpotSound = new Audio('https://drive.google.com/uc?export=download&id=1oukLH1PLUJxRyKJ_0TLkxaEfF-n6Dl-a'); // Replace with actual URL

// Win sound (convert from YouTube link and host it somewhere)
let winSound = new Audio('https://drive.google.com/uc?export=download&id=1zcXdkTkZYLUGoDW0OT_tZl7bSZCvInpA'); // Replace with actual URL

let reelLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11], // Horizontal lines
    [0, 4, 8], [3, 7, 11], // Diagonal lines
    [0, 3, 6], [1, 4, 7], [2, 5, 8], [6, 9, 10] // Vertical lines
];

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
            document.getElementById(`slot${index + 1}`).classList.remove('highlight');
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
    let hasJackpot = false;
    let winningLine = [];

    reelLines.forEach(line => {
        let symbolsInLine = line.map(index => results[index]);
        let countsInLine = symbolsInLine.reduce((acc, symbol) => {
            acc[symbol] = (acc[symbol] || 0) + 1;
            return acc;
        }, {});

        for (let symbol in countsInLine) {
            if (countsInLine[symbol] >= 3) {
                if (symbol === '7🖤') {
                    winMessage = `Jackpot! 🎉 You got ${countsInLine[symbol]}x Black 7s! You win $10,000,000!`;
                    winAmount += 10000000 * (countsInLine[symbol] / 3);
                    hasJackpot = true;
                    winningLine = line;
                } else if (symbol === '7🔵') {
                    winMessage = `You got ${countsInLine[symbol]}x Blue 7s! You win $2,500,000!`;
                    winAmount += 2500000 * (countsInLine[symbol] / 3);
                    winningLine = line;
                } else if (symbol === '7🔴') {
                    winMessage = `You got ${countsInLine[symbol]}x Red 7s! You win $1,000,000!`;
                    winAmount += 1000000 * (countsInLine[symbol] / 3);
                    winningLine = line;
                } else if (symbol === '7🟢') {
                    winMessage = `You got ${countsInLine[symbol]}x Green 7s! You win $500,000!`;
                    winAmount += 500000 * (countsInLine[symbol] / 3);
                    winningLine = line;
                } else if (symbol.startsWith('BONUS')) {
                    winMessage = `You got ${countsInLine[symbol]}x ${symbol}! You win $50,000!`;
                    winAmount += 50000 * (countsInLine[symbol] / 3);
                    winningLine = line;
                }
                line.forEach(index => {
                    document.getElementById(`slot${index + 1}`).classList.add('highlight');
                });
            }
        }
    });

    if (hasJackpot) {
        jackpotSound.play();
    } else if (winAmount > 0) {
        winSound.play();
    }

    balance += winAmount;
    resultText.textContent = winMessage;
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
    alert("Admin panel feature is not implemented yet.");
}

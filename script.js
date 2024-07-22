let balance = localStorage.getItem('balance') ? parseFloat(localStorage.getItem('balance')) : 3500;
let betAmount = 10;
let symbols = ['🍒', '🍊', '🍏', '🍌', '7🖤', '7🔵', '7🔴', '7🟢', 'BONUS🥇', 'BONUS🔵', 'BONUS🟢', 'BONUS⚫', 'BONUS🔴', 'BONUS🟣', '3', '9', '21'];
let luckMultiplier = localStorage.getItem('luckMultiplier') ? parseFloat(localStorage.getItem('luckMultiplier')) : 1;

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

    displaySlotsSequentially(results, 0);
}

function displaySlotsSequentially(results, index) {
    if (index < results.length) {
        document.getElementById(`slot${index + 1}`).textContent = results[index];
        setTimeout(() => displaySlotsSequentially(results, index + 1), 1000);
    } else {
        checkWin(results);
    }
}

function checkWin(results) {
    let resultText = document.getElementById('result');
    let counts = {};
    results.forEach(symbol => {
        counts[symbol] = (counts[symbol] || 0) + 1;
    });

    let winMessage = 'Try again!';
    let winAmount = 0;

    if (counts['7🖤'] >= 3) {
        winMessage = `Jackpot! 🎉 You got ${counts['7🖤']}x Black 7s! You win $10,000,000!`;
        winAmount += 10000000 * (counts['7🖤'] / 3);
    } else if (counts['7🔵'] >= 3) {
        winMessage = `You got ${counts['7🔵']}x Blue 7s! You win $2,500,000!`;
        winAmount += 2500000 * (counts['7🔵'] / 3);
    } else if (counts['7🔴'] >= 3) {
        winMessage = `You got ${counts['7🔴']}x Red 7s! You win $1,200,000!`;
        winAmount += 1200000 * (counts['7🔴'] / 3);
    } else if (counts['7🟢'] >= 3) {
        winMessage = `You got ${counts['7🟢']}x Green 7s! You win $830,000!`;
        winAmount += 830000 * (counts['7🟢'] / 3);
    } else if (counts['🍒'] >= 3) {
        winMessage = `You got ${counts['🍒']}x Cherries! You win $10,000!`;
        winAmount += 10000 * (counts['🍒'] / 3);
    } else if (counts['🍊'] >= 3) {
        winMessage = `You got ${counts['🍊']}x Oranges! You win $5,000!`;
        winAmount += 5000 * (counts['🍊'] / 3);
    } else if (counts['🍏'] >= 3) {
        winMessage = `You got ${counts['🍏']}x Apples! You win $3,000!`;
        winAmount += 3000 * (counts['🍏'] / 3);
    } else if (counts['🍌'] >= 3) {
        winMessage = `You got ${counts['🍌']}x Bananas! You win $2,000!`;
        winAmount += 2000 * (counts['🍌'] / 3);
    } else if (counts['3'] >= 3) {
        winMessage = `You got ${counts['3']}x 3s! You win $21,000!`;
        winAmount += 21000 * (counts['3'] / 3);
    } else if (counts['9'] >= 3) {
        winMessage = `You got ${counts['9']}x 9s! You win $27,000!`;
        winAmount += 27000 * (counts['9'] / 3);
    } else if (counts['21'] >= 3) {
        winMessage = `You got ${counts['21']}x 21s! You win $35,000!`;
        winAmount += 35000 * (counts['21'] / 3);
    } else if (counts['BONUS🥇'] >= 3) {
        winMessage = `Jackpot Bonus! You got ${counts['BONUS🥇']}x Gold Bonuses! You win $35,000,000!`;
        winAmount += 35000000 * (counts['BONUS🥇'] / 3);
    } else if (counts['BONUS🔵'] >= 3) {
        winMessage = `You got ${counts['BONUS🔵']}x Blue Bonuses! You win $15,000,000!`;
        winAmount += 15000000 * (counts['BONUS🔵'] / 3);
    } else if (counts['BONUS🟢'] >= 3) {
        winMessage = `You got ${counts['BONUS🟢']}x Green Bonuses! You win $12,500,000!`;
        winAmount += 12500000 * (counts['BONUS🟢'] / 3);
    } else if (counts['BONUS⚫'] >= 3) {
        winMessage = `You got ${counts['BONUS⚫']}x Black Bonuses! You win $7,500,000!`;
        winAmount += 7500000 * (counts['BONUS⚫'] / 3);
    } else if (counts['BONUS🔴'] >= 3) {
        winMessage = `You got ${counts['BONUS🔴']}x Red Bonuses! You win $5,500,000!`;
        winAmount += 5500000 * (counts['BONUS🔴'] / 3);
    } else if (counts['BONUS🟣'] >= 3) {
        winMessage = `You got ${counts['BONUS🟣']}x Purple Bonuses! You win $3,000,000!`;
        winAmount += 3000000 * (counts['BONUS🟣'] / 3);
    }

    if (winAmount > 0) {
        winAmount *= luckMultiplier;  // Apply luck multiplier
        balance += winAmount;
        resultText.textContent = winMessage;
    } else {
        resultText.textContent = 'Try again!';
    }

    updateBalance();
}

function updateBalance() {
    document.getElementById('balance').textContent = `Balance: $${balance.toFixed(2)}`;
    localStorage.setItem('balance', balance);
}

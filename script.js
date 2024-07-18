let balance = 3500;
let betAmount = 10;
let symbols = ['🍒', '🍊', '🍏', '🍌', '7🖤', '7🔵', '7🔴', '7🟢', 'BONUS🥇', 'BONUS🔵', 'BONUS🟢', 'BONUS⚫', 'BONUS🔴', 'BONUS🟣', '3', '9', '21'];
let spinSound = new Audio('https://raw.githubusercontent.com/your-username/UniqueSlots.Github.io/main/spin.mp3'); // Replace with your actual raw URL
let jackpotSound = new Audio('https://raw.githubusercontent.com/your-username/UniqueSlots.Github.io/main/jackpot.mp3'); // Replace with your actual raw URL

function spin() {
    if (balance < betAmount) {
        alert("Not enough balance to place the bet.");
        return;
    }

    balance -= betAmount;
    updateBalance();

    // Play the spin sound
    playSpinSound();

    let results = [];
    for (let i = 0; i < 12; i++) {
        results.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }

    updateSlots(results);
    checkWin(results);
}

function playSpinSound() {
    let timesPlayed = 0;
    let interval = setInterval(() => {
        spinSound.play();
        timesPlayed++;
        if (timesPlayed >= 3) {
            clearInterval(interval);
        }
    }, 500);
}

function updateSlots(results) {
    for (let i = 0; i < 12; i++) {
        document.getElementById(`slot${i + 1}`).textContent = results[i];
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
        jackpotSound.play();
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
        winMessage = `You got ${counts['3']}x 3s! You win $300!`;
        winAmount += 300 * (counts['3'] / 3);
    } else if (counts['9'] >= 3) {
        winMessage = `You got ${counts['9']}x 9s! You win $900!`;
        winAmount += 900 * (counts['9'] / 3);
    } else if (counts['21'] >= 3) {
        winMessage = `You got ${counts['21']}x 21s! You win $2100!`;
        winAmount += 2100 * (counts['21'] / 3);
    }

    if (counts['BONUS🥇'] >= 3) {
        winMessage += ` Bonus! You got ${counts['BONUS🥇']}x Golden Bonus! Multiplier x75!`;
        winAmount *= 75;
    } else if (counts['BONUS🔵'] >= 3) {
        winMessage += ` Bonus! You got ${counts['BONUS🔵']}x Blue Bonus! Multiplier x50!`;
        winAmount *= 50;
    } else if (counts['BONUS🟢'] >= 3) {
        winMessage += ` Bonus! You got ${counts['BONUS🟢']}x Green Bonus! Multiplier x40!`;
        winAmount *= 40;
    } else if (counts['BONUS⚫'] >= 3) {
        winMessage += ` Bonus! You got ${counts['BONUS⚫']}x Black Bonus! Multiplier x30!`;
        winAmount *= 30;
    } else if (counts['BONUS🔴'] >= 3) {
        winMessage += ` Bonus! You got ${counts['BONUS🔴']}x Red Bonus! Multiplier x20!`;
        winAmount *= 20;
    } else if (counts['BONUS🟣'] >= 3) {
        winMessage += ` Bonus! You got ${counts['BONUS🟣']}x Purple Bonus! Multiplier x10!`;
        winAmount *= 10;
    }

    balance += winAmount;
    resultText.textContent = winMessage;
    updateBalance();
}

function updateBalance() {
    document.getElementById('balance').textContent = `Balance: $${balance}`;
}

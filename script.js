let balance = 3500;
let betAmount = 10;
let symbols = ['🍒', '🍊', '🍏', '🍌', '7🖤', '7🔵', '7🔴', '7🟢', 'BONUS🥇', 'BONUS🔵', 'BONUS🟢', 'BONUS⚫', 'BONUS🔴', 'BONUS🟣', '3', '9', '21'];

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

    displaySlotsSequentially(results);
}

function displaySlotsSequentially(results) {
    let delay = 500;
    results.forEach((result, index) => {
        setTimeout(() => {
            document.getElementById(`slot${index + 1}`).textContent = result;
            if (index === results.length - 1) {
                checkWin(results);
            }
        }, delay * (index + 1));
    });
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
        playSound('jackpot.mp3');
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
        winMessage += ` Bonus! You got ${counts['BONUS🟢']}x Green Bonus! Multiplier x25!`;
        winAmount *= 25;
    } else if (counts['BONUS⚫'] >= 3) {
        winMessage += ` Bonus! You got ${counts['BONUS⚫']}x Black Bonus! Multiplier x10!`;
        winAmount *= 10;
    } else if (counts['BONUS🔴'] >= 3) {
        winMessage += ` Bonus! You got ${counts['BONUS🔴']}x Red Bonus! Multiplier x5!`;
        winAmount *= 5;
    } else if (counts['BONUS🟣'] >= 3) {
        winMessage += ` Bonus! You got ${counts['BONUS🟣']}x Purple Bonus! Multiplier x100!`;
        winAmount *= 100;
    }

    balance += winAmount;
    updateBalance();
    resultText.textContent = winMessage;
}

function updateBalance() {
    document.getElementById('balance').textContent = `Balance: $${balance}`;
}

function showAdminPanel() {
    let passcode = prompt("Enter admin passcode:");
    if (passcode === "your_secure_passcode") {
        let action = prompt("Enter action: 1. Add Balance 2. Add Luck Boost");
        if (action === "1") {
            let amount = parseInt(prompt("Enter amount to add:"));
            balance += amount;
            updateBalance();
        } else if (action === "2") {
            let multiplier = parseFloat(prompt("Enter luck multiplier (e.g., 1.5):"));
            betAmount /= multiplier;
        }
    } else {
        alert("Incorrect passcode.");
    }
}

function donate(amount) {
    alert(`Thank you for donating $${amount}!`);
    balance += amount;
    updateBalance();
}

function playSound(soundFile) {
    let audio = new Audio(soundFile);
    audio.play();
}

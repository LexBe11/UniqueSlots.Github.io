let balance = 3500;
let betAmount = 10;
let symbols = ['🍒', '🍊', '🍏', '🍌', '7🖤', '7🔵', '7🔴', '7🟢', 'BONUS🥇', 'BONUS🔵', 'BONUS🟢', 'BONUS⚫', 'BONUS🔴', 'BONUS🟣', '3', '9', '21'];
let spinSound = new Audio('https://drive.google.com/uc?export=download&id=1dtYmJobuS87AADUhQF6oadQfo7RHufFd'); // Spin sound
let jackpotSound = new Audio('https://drive.google.com/uc?export=download&id=1oukLH1PLUJxRyKJ_0TLkxaEfF-n6Dl-a'); // Jackpot sound
let winSound = new Audio('https://drive.google.com/uc?export=download&id=1zcXdkTkZYLUGoDW0OT_tZl7bSZCvInpA'); // Win sound

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
    let hasJackpot = false;

    if (counts['7🖤'] >= 3) {
        winMessage = `Jackpot! 🎉 You got ${counts['7🖤']}x Black 7s! You win $10,000,000!`;
        winAmount += 10000000 * (counts['7🖤'] / 3);
        hasJackpot = true;
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
    }

    if (winAmount > 0) {
        if (hasJackpot) {
            jackpotSound.play();
        } else {
            winSound.play();
        }
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

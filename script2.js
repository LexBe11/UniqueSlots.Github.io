let balance = 2500.00;

function updateBalance() {
    document.getElementById('balance').innerText = `Balance: $${balance.toFixed(2)}`;
}

function getRandomOutcome() {
    const outcomes = ['apple', 'orange', 'banana', 'seven'];
    return outcomes[Math.floor(Math.random() * outcomes.length)];
}

function getOdds(bet) {
    if (bet >= 1000) {
        return { seven: 0.00002, orange: 0.001, apple: 0.02, banana: 0.08 };
    } else if (bet >= 500) {
        return { seven: 0.0001, orange: 0.005, apple: 0.04, banana: 0.1 };
    } else if (bet >= 100) {
        return { seven: 0.001, orange: 0.01, apple: 0.05, banana: 0.2 };
    } else if (bet >= 50) {
        return { seven: 0.01, orange: 0.05, apple: 0.1, banana: 0.5 };
    } else if (bet >= 20) {
        return { seven: 0.02, orange: 0.1, apple: 0.2, banana: 0.6 };
    } else {
        return { seven: 0.02, orange: 0.16, apple: 0.52, banana: 0.8 };
    }
}

function placeBet(bet) {
    if (balance < bet) {
        alert('Insufficient balance!');
        return;
    }

    balance -= bet;

    const odds = getOdds(bet);
    const outcome = [];
    for (let i = 0; i < 3; i++) {
        const rand = Math.random();
        if (rand < odds.seven) {
            outcome.push('seven');
        } else if (rand < odds.seven + odds.orange) {
            outcome.push('orange');
        } else if (rand < odds.seven + odds.orange + odds.apple) {
            outcome.push('apple');
        } else {
            outcome.push('banana');
        }
    }

    let winnings = 0;
    if (outcome.every(v => v === 'seven')) {
        winnings = bet * 100;
    } else if (outcome.every(v => v === 'orange')) {
        winnings = bet * 50;
    } else if (outcome.every(v => v === 'apple')) {
        winnings = bet * 10;
    } else if (outcome.every(v => v === 'banana')) {
        winnings = bet * 2;
    }

    balance += winnings;
    updateBalance();
    document.getElementById('result').innerText = `Outcome: ${outcome.join(', ')} - Winnings: $${winnings.toFixed(2)}`;
}

updateBalance();

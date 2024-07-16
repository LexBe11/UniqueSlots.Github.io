let balance = 3500;
let betAmount = 10;
let symbols = ['🍒', '🍊', '🍏', '🍌', '7🖤', '7🔵', '7🔴', '7🟢', 'BONUS🥇', 'BONUS🔵', 'BONUS🟢', 'BONUS⚫', 'BONUS🔴', 'BONUS🟣', '9', '21', '3'];

let mixedVariations = [
    ['BONUS🥇', 'BONUS🥇', 'BONUS🥇'],
    ['BONUS🔵', 'BONUS🔵', 'BONUS🔵'],
    ['BONUS🟢', 'BONUS🟢', 'BONUS🟢'],
    ['BONUS⚫', 'BONUS⚫', 'BONUS⚫'],
    ['BONUS🔴', 'BONUS🔴', 'BONUS🔴'],
    ['BONUS🟣', 'BONUS🟣', 'BONUS🟣'],
    ['7🖤', '7🖤', '7🖤'],
    ['7🔵', '7🔵', '7🔵'],
    ['7🔴', '7🔴', '7🔴'],
    ['7🟢', '7🟢', '7🟢'],
    ['7🖤', '7🔵', '7🔴'],
    ['BONUS🥇', 'BONUS🔵', 'BONUS🟢'],
    ['BONUS🥇', 'BONUS🟢', 'BONUS⚫'],
    ['BONUS🟢', 'BONUS🔴', 'BONUS🟣'],
    ['7🖤', '7🟢', '7🔴'],
    ['7🔵', '7🔴', '7🟢'],
    ['🍒', '🍊', '🍏'],
    ['🍌', '🍊', '🍒'],
    ['🍏', '🍌', '🍒'],
    ['7🖤', 'BONUS🥇', '7🖤'],
    ['BONUS🟣', '7🔵', 'BONUS🟣'],
    ['7🔵', 'BONUS🟢', '7🔴'],
    ['BONUS🔴', '7🟢', 'BONUS⚫'],
    ['7🔴', 'BONUS🔵', 'BONUS🟢'],
    ['BONUS🟢', '7🖤', 'BONUS🟣'],
    ['7🟢', 'BONUS🥇', '7🔴'],
    ['BONUS🔵', 'BONUS🟢', 'BONUS⚫'],
    ['BONUS🟣', '7🔵', 'BONUS🥇'],
    ['BONUS🟢', '7🖤', '7🟢'],
    ['7🔴', 'BONUS🟢', 'BONUS🟣'],
    ['9', '9', '9'],
    ['21', '21', '21'],
    ['3', '3', '3'],
    ['9', '21', '3'],
    ['9', '9', '21'],
    ['3', '3', '9'],
    ['21', '21', '3'],
    ['3', '9', '21'],
    ['21', '9', '3'],
    ['7🖤', 'BONUS🥇', '9'],
    ['21', '🍊', 'BONUS⚫'],
    ['7🔵', 'BONUS🟢', '3'],
    ['🍒', '7🟢', 'BONUS🔵'],
    ['BONUS🟣', '21', '🍌'],
    ['3', '7🔴', 'BONUS🟣']
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

    updateSlots(results);
    checkWin(results);
}

function updateSlots(results) {
    for (let i = 0; i < 12; i++) {
        document.getElementById(`slot${i + 1}`).textContent = results[i];
    }
}

function checkWin(results) {
    let wins = {};
    for (let i = 0; i < results.length; i += 3) {
        let line = results.slice(i, i + 3);
        let lineKey = line.join(' ');

        if (wins[lineKey]) {
            wins[lineKey]++;
        } else {
            wins[lineKey] = 1;
        }
    }

    let winAmount = 0;

    for (let key in wins) {
        let count = wins[key];
        let line = key.split(' ');

        if (mixedVariations.some(variation => arraysEqual(variation, line))) {
            if (line.includes('21')) {
                winAmount += 50 * count;
            } else if (line.includes('9')) {
                winAmount += 30 * count;
            } else if (line.includes('3')) {
                winAmount += 20 * count;
            } else {
                winAmount += 10 * count;
            }
            alert(`You won with a mixed combination: ${key}!`);
        } else if (line.every(symbol => symbol === line[0])) {
            if (line[0] === 'BONUS🥇') {
                winAmount += 100 * count;
            } else if (line[0] === 'BONUS🔵') {
                winAmount += 90 * count;
            } else if (line[0] === 'BONUS🟢') {
                winAmount += 80 * count;
            } else if (line[0] === 'BONUS⚫') {
                winAmount += 70 * count;
            } else if (line[0] === 'BONUS🔴') {
                winAmount += 60 * count;
            } else if (line[0] === 'BONUS🟣') {
                winAmount += 50 * count;
            } else if (line[0] === '7🖤') {
                winAmount += 40 * count;
            } else if (line[0] === '7🔵') {
                winAmount += 30 * count;
            } else if (line[0] === '7🔴') {
                winAmount += 20 * count;
            } else if (line[0] === '7🟢') {
                winAmount += 10 * count;
            } else if (line[0] === '9') {
                winAmount += 25 * count;
            } else if (line[0] === '21') {
                winAmount += 35 * count;
            } else if (line[0] === '3') {
                winAmount += 15 * count;
            } else {
                winAmount += 5 * count;
            }
            alert(`You won with 3x ${line[0]}!`);
        }
    }

    balance += winAmount;
    updateBalance();
}

function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

function updateBalance() {
    document.getElementById('balance').textContent = balance;
}

document.getElementById('spinButton').addEventListener('click', spin);

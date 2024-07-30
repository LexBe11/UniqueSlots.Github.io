let balance = 3500;
const jackpotValues = {
    'red': 1000000,        // Red 7
    'green': 1500000,      // Green 7
    'blue': 2000000,       // Blue 7
    'yellow': 2500000,     // Yellow 7
    'purple': 3000000,     // Purple 7
    'orange': 3500000,     // Orange 7
    'pink': 4000000,       // Pink 7
    'black': 178223922     // Black 7 (rarest)
};
const slotSymbols = [
    '🍒', '🍋', '🍊', '🍉', '🍇', '🔔', '⭐', '7️⃣', 'BAR', '🍍', '🍎', '🍌', '🍓', '🥝', '🍈', '🍒', '🍋',
    {symbol: '7️⃣', color: 'red', probability: 0.10},  // Red 7
    {symbol: '7️⃣', color: 'green', probability: 0.10},  // Green 7
    {symbol: '7️⃣', color: 'blue', probability: 0.10},  // Blue 7
    {symbol: '7️⃣', color: 'yellow', probability: 0.10},  // Yellow 7
    {symbol: '7️⃣', color: 'purple', probability: 0.10},  // Purple 7
    {symbol: '7️⃣', color: 'orange', probability: 0.10},  // Orange 7
    {symbol: '7️⃣', color: 'pink', probability: 0.10},  // Pink 7
    {symbol: '7️⃣', color: 'black', probability: 0.001}  // Black 7
];
const slots = Array.from({ length: 12 }, (_, i) => document.getElementById(`slot${i + 1}`));

function getRandomSymbol() {
    const randomNum = Math.random();
    let cumulativeProbability = 0;

    for (const symbol of slotSymbols) {
        if (typeof symbol === 'object') {
            cumulativeProbability += symbol.probability;
            if (randomNum < cumulativeProbability) {
                return symbol;
            }
        } else {
            cumulativeProbability += 0.05;  // Default probability for other symbols
            if (randomNum < cumulativeProbability) {
                return {symbol: symbol, color: 'default'};
            }
        }
    }
    return {symbol: '🍒', color: 'default'};  // Fallback symbol
}

function spin() {
    if (balance <= 0) {
        alert("Out of balance!");
        return;
    }

    // Deduct the spin cost (assuming each spin costs $10)
    balance -= 10;
    document.getElementById('balance').innerText = `Balance: $${balance}`;

    // Populate the slots with random symbols
    const results = slots.map(slot => {
        const {symbol, color} = getRandomSymbol();
        slot.innerText = symbol;
        slot.style.color = color;  // Apply color if applicable
        return {symbol, color};
    });

    // Check for winning combinations
    const winningSymbols = checkForWinningCombinations(results);
    if (winningSymbols.length > 0) {
        const payout = calculatePayout(winningSymbols);
        balance += payout;
        document.getElementById('balance').innerText = `Balance: $${balance}`;
        document.getElementById('result').innerText = `You won $${payout.toLocaleString()} with ${winningSymbols.map(s => s.symbol).join(', ')}!`;
        playSound('win');
    } else {
        document.getElementById('result').innerText = 'No win. Try again!';
    }
}

function checkForWinningCombinations(results) {
    const symbolCounts = {};
    results.forEach(({symbol}) => {
        if (!symbolCounts[symbol]) {
            symbolCounts[symbol] = 0;
        }
        symbolCounts[symbol]++;
    });

    // Collect symbols that appear 3 or more times
    return Object.keys(symbolCounts).filter(symbol => symbolCounts[symbol] >= 3).map(symbol => ({symbol, count: symbolCounts[symbol]}));
}

function calculatePayout(winningSymbols) {
    let payout = 0;
    winningSymbols.forEach(({symbol, count}) => {
        // Define payout values for symbols
        switch (symbol) {
            case '7️⃣':
                const color = winningSymbols.find(s => s.symbol === symbol).color;
                payout += jackpotValues[color] || 0;
                break;
            case 'BAR':
                if (count >= 3) {
                    payout += 50000 * count;  // Example payout for BARs, multiplied by count
                }
                break;
            // Add more cases for other symbols as needed
            default:
                if (count >= 3) {
                    payout += 10000 * count;  // Example payout for other symbols, multiplied by count
                }
        }
    });
    return payout;
}

function playSound(type) {
    let sound;
    if (type === 'win') {
        sound = new Audio('path/to/win-sound.mp3');
    } else if (type === 'jackpot') {
        sound = new Audio('path/to/jackpot-sound.mp3');
    }
    sound.play();
}

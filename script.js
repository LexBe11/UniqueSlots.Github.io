let balance = 150; // Initial balance
const betAmount = 10; // Amount deducted per spin

function updateBalance() {
    document.getElementById('balance').innerText = balance;
}

function spin() {
    if (balance < betAmount) {
        alert('Not enough balance to spin!');
        return;
    }

    balance -= betAmount; // Deduct bet amount
    updateBalance(); // Update displayed balance

    let symbols = [
        '🍒', '🍊', '🍏', '🍌', '🍇', '🍉', '🍓', '🍍', 
        '🍑', '🥭', '🥥', '🍈', '☯️', '🐉', 
        '7🖤', '7🔴', '7🔵', '7🟢', '7🟠', '7🟣', 
        '7☯️'
    ];
    let results = [];

    // Random number to determine which pattern to use
    let randomNumber = Math.random() * 100;

    // Define patterns with different probabilities
    if (randomNumber < 1) {
        results = ['7☯️', '7☯️', '7☯️']; // 1% chance for 3x 7☯️
        balance += 100; // Example win amount
    } else if (randomNumber < 2) {
        results = ['7🖤', '7🖤', '7🖤']; // 1% chance for 3x Black 7
        balance += 50; // Example win amount
    } else if (randomNumber < 3) {
        results = ['7🔴', '7🔴', '7🔴']; // 1% chance for 3x Red 7
        balance += 50; // Example win amount
    } else if (randomNumber < 4) {
        results = ['7🔵', '7🔵', '7🔵']; // 1% chance for 3x Blue 7
        balance += 50; // Example win amount
    } else if (randomNumber < 5) {
        results = ['7🟢', '7🟢', '7🟢']; // 1% chance for 3x Green 7
        balance += 50; // Example win amount
    } else if (randomNumber < 6) {
        results = ['7🟠', '7🟠', '7🟠']; // 1% chance for 3x Orange 7
        balance += 50; // Example win amount
    } else if (randomNumber < 7) {
        results = ['7🟣', '7🟣', '7🟣']; // 1% chance for 3x Purple 7
        balance += 50; // Example win amount
    } else if (randomNumber < 8) {
        results = ['☯️', '☯️', '☯️']; // 1% chance for 3x Yang
        balance += 30; // Example win amount
    } else if (randomNumber < 9) {
        results = ['🐉', '🐉', '🐉']; // 1% chance for 3x Dragon
        balance += 30; // Example win amount
    } else if (randomNumber < 10) {
        results = ['🍒', '🍒', '🍒']; // 1% chance for 3x Cherry
        balance += 20; // Example win amount
    } else if (randomNumber < 11) {
        results = ['🍊', '🍊', '🍊']; // 1% chance for 3x Orange
        balance += 20; // Example win amount
    } else if (randomNumber < 12) {
        results = ['🍏', '🍏', '🍏']; // 1% chance for 3x Apple
        balance += 20; // Example win amount
    } else if (randomNumber < 13) {
        results = ['🍌', '🍌', '🍌']; // 1% chance for 3x Banana
        balance += 20; // Example win amount
    } else if (randomNumber < 14) {
        results = ['🍇', '🍇', '🍇']; // 1% chance for 3x Grape
        balance += 20; // Example win amount
    } else if (randomNumber < 15) {
        results = ['🍉', '🍉', '🍉']; // 1% chance for 3x Watermelon
        balance += 20; // Example win amount
    } else if (randomNumber < 16) {
        results = ['🍓', '🍓', '🍓']; // 1% chance for 3x Strawberry
        balance += 20; // Example win amount
    } else if (randomNumber < 17) {
        results = ['🍍', '🍍', '🍍']; // 1% chance for 3x Pineapple
        balance += 20; // Example win amount
    } else if (randomNumber < 18) {
        results = ['🍑', '🍑', '🍑']; // 1% chance for 3x Peach
        balance += 20; // Example win amount
    } else if (randomNumber < 19) {
        results = ['🥭', '🥭', '🥭']; // 1% chance for 3x Mango
        balance += 20; // Example win amount
    } else if (randomNumber < 20) {
        results = ['🥥', '🥥', '🥥']; // 1% chance for 3x Coconut
        balance += 20; // Example win amount
    } else if (randomNumber < 21) {
        results = ['🍈', '🍈', '🍈']; // 1% chance for 3x Melon
        balance += 20; // Example win amount
    } else if (randomNumber < 22) {
        results = ['7🖤', '7🖤', '7🖤']; // 1% chance for 3x Black 7
        balance += 50; // Example win amount
    } else if (randomNumber < 23) {
        results = ['7🔴', '7🔴', '7🔴']; // 1% chance for 3x Red 7
        balance += 50; // Example win amount
    } else if (randomNumber < 24) {
        results = ['7🔵', '7🔵', '7🔵']; // 1% chance for 3x Blue 7
        balance += 50; // Example win amount
    } else if (randomNumber < 25) {
        results = ['7🟢', '7🟢', '7🟢']; // 1% chance for 3x Green 7
        balance += 50; // Example win amount
    } else if (randomNumber < 26) {
        results = ['7🟠', '7🟠', '7🟠']; // 1% chance for 3x Orange 7
        balance += 50; // Example win amount
    } else if (randomNumber < 27) {
        results = ['7🟣', '7🟣', '7🟣']; // 1% chance for 3x Purple 7
        balance += 50; // Example win amount
    } else if (randomNumber < 28) {
        results = ['🍒', '🍒', '🍒']; // 1% chance for 3x Cherry
        balance += 20; // Example win amount
    } else if (randomNumber < 29) {
        results = ['🍊', '🍊', '🍊']; // 1% chance for 3x Orange
        balance += 20; // Example win amount
    } else if (randomNumber < 30) {
        results = ['🍏', '🍏', '🍏']; // 1% chance for 3x Apple
        balance += 20; // Example win amount
    } else if (randomNumber < 31) {
        results = ['🍌', '🍌', '🍌']; // 1% chance for 3x Banana
        balance += 20; // Example win amount
    } else if (randomNumber < 32) {
        results = ['🍇', '🍇', '🍇']; // 1% chance for 3x Grape
        balance += 20; // Example win amount
    } else if (randomNumber < 33) {
        results = ['🍉', '🍉', '🍉']; // 1% chance for 3x Watermelon
        balance += 20; // Example win amount
    } else if (randomNumber < 34) {
        results = ['🍓', '🍓', '🍓']; // 1% chance for 3x Strawberry
        balance += 20; // Example win amount
    } else if (randomNumber < 35) {
        results = ['🍍', '🍍', '🍍']; // 1% chance for 3x Pineapple
        balance += 20; // Example win amount
    } else if (randomNumber < 36) {
        results = ['🍑', '🍑', '🍑']; // 1% chance for 3x Peach
        balance += 20; // Example win amount
    } else if (randomNumber < 37) {
        results = ['🥭', '🥭', '🥭']; // 1% chance for 3x Mango
        balance += 20; // Example win amount
    } else if (randomNumber < 38) {
        results = ['🥥', '🥥', '🥥']; // 1% chance for 3x Coconut
        balance += 20; // Example win amount
    } else if (randomNumber < 39) {
        results = ['🍈', '🍈', '🍈']; // 1% chance for 3x Melon
        balance += 20; // Example win amount
    } else {
        results = ['❌', '❌', '❌']; // 61% chance for 3x Losing
    }

    // Update slot machine display
    document.getElementById('slot1').innerText = results[0];
    document.getElementById('slot2').innerText = results[1];
    document.getElementById('slot3').innerText = results[2];

    // Update balance display
    updateBalance();
}

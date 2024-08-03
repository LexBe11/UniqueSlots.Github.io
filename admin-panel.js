const passcode = '1234567890'; // secure passcode

function addBalance() {
    let userPasscode = prompt('Enter passcode:');
    if (userPasscode === passcode) {
        let amount = parseFloat(document.getElementById('balanceAmount').value);
        let currentBalance = parseFloat(localStorage.getItem('balance')) || 150;
        localStorage.setItem('balance', currentBalance + amount);
        alert('Balance added successfully!');
    } else {
        alert('Incorrect passcode!');
    }
}

function setLuckMultiplier() {
    let userPasscode = prompt('Enter passcode:');
    if (userPasscode === passcode) {
        let multiplier = parseFloat(document.getElementById('luckMultiplier').value);
        if (multiplier <= 0) {
            alert('Multiplier must be greater than 0.');
            return;
        }
        let expiry = new Date().getTime() + (10 * 60 * 1000); // 10 minutes from now
        localStorage.setItem('luckMultiplier', multiplier);
        localStorage.setItem('multiplierExpiry', expiry);
        alert('Luck multiplier set successfully!');
    } else {
        alert('Incorrect passcode!');
    }
}

// Initialize Firebase
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = firebase.firestore();

let userId = null; // Replace with the actual user ID after authentication

// Function to retrieve user data (like balance)
function retrieveUserData() {
  firestore.collection('users').doc(userId).get()
    .then((doc) => {
      if (doc.exists) {
        var userData = doc.data();
        document.getElementById('balance').textContent = `Balance: $${userData.balance}`;
      } else {
        console.log('No such document!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
}

// Example function to update user's balance
function updateBalance(newBalance) {
  firestore.collection('users').doc(userId).set({
    balance: newBalance
  }, { merge: true })
  .then(() => {
    console.log('Balance updated successfully!');
    document.getElementById('balance').textContent = `Balance: $${newBalance}`;
  })
  .catch((error) => {
    console.error('Error updating balance:', error);
  });
}

function spin() {
    let symbols = ['🍒', '🍊', '🍏', '🍌', '7', '7🔵', '7🔴', '7🟢'];
    let results = [];
    let balanceElement = document.getElementById('balance');
    let currentBalance = parseInt(balanceElement.textContent.replace('Balance: $', ''));

    if (currentBalance <= 0) {
        alert('You do not have enough balance to spin.');
        return;
    }

    let betAmount = getBetAmount(); // Function to get the selected bet amount
    if (currentBalance < betAmount) {
        alert('You do not have enough balance to place this bet.');
        return;
    }

    currentBalance -= betAmount;
    updateBalance(currentBalance); // Update balance in Firestore

    // Random number to determine which pattern to use
    let randomNumber = Math.random() * 1000;

    // Define patterns with different probabilities
    if (randomNumber < 1) {
        results = ['7🔵', '7🔵', '7🔵']; // 0.1% chance for 3x Blue 7s
    } else if (randomNumber < 2) {
        results = ['7🔴', '7🔴', '7🔴']; // 0.1% chance for 3x Red 7s
    } else if (randomNumber < 3) {
        results = ['7🟢', '7🟢', '7🟢']; // 0.1% chance for 3x Green 7s
    } else if (randomNumber < 5) {
        results = ['7', '7', '7']; // 0.2% chance for 3x Black 7s
    } else if (randomNumber < 25) {
        results = ['🍊', '7', '7']; // 2% chance for Orange, 2x 7s
    } else if (randomNumber < 45) {
        results = ['🍏', '7', '7']; // 2% chance for Apple, 2x 7s
    } else if (randomNumber < 65) {
        results = ['🍌', '7', '7']; // 2% chance for Banana, 2x 7s
    } else if (randomNumber < 85) {
        results = ['🍒', '7', '7']; // 2% chance for Cherry, 2x 7s
    } else if (randomNumber < 125) {
        results = ['7', '🍊', '🍏']; // 4% chance for 7, Orange, Apple
    } else if (randomNumber < 165) {
        results = ['🍊', '7', '🍌']; // 4% chance for Orange, 7, Banana
    } else if (randomNumber < 205) {
        results = ['🍏', '🍏', '7']; // 4% chance for 2x Apple, 7
    } else if (randomNumber < 245) {
        results = ['🍌', '🍌', '7']; // 4% chance for 2x Banana, 7
    } else if (randomNumber < 285) {
        results = ['🍒', '7', '🍏']; // 4% chance for Cherry, 7, Apple
    } else if (randomNumber < 325) {
        results = ['🍊', '🍊', '🍊']; // 4% chance for 3x Oranges
    } else if (randomNumber < 355) {
        results = ['🍏', '🍏', '🍏']; // 3% chance for 3x Apples
    } else if (randomNumber < 375) {
        results = ['🍌', '🍌', '🍌']; // 2% chance for 3x Bananas
    } else if (randomNumber < 395) {
        results = ['🍒', '🍒', '🍒']; // 2% chance for 3x Cherries
    } else {
        results = [symbols[Math.floor(Math.random() * symbols.length)], symbols[Math.floor(Math.random() * symbols.length)], symbols[Math.floor(Math.random() * symbols.length)]];
    }

    updateSlots(results);
    checkWin(results, betAmount); // Pass bet amount to checkWin function
}

function updateSlots(results) {
    document.getElementById('slot1').textContent = results[0];
    document.getElementById('slot2').textContent = results[1];
    document.getElementById('slot3').textContent = results[2];
}

function checkWin(results, betAmount) {
    let resultText = document.getElementById('result');
    let balanceElement = document.getElementById('balance');
    let currentBalance = parseInt(balanceElement.textContent.replace('Balance: $', ''));

    if (results[0] === results[1] && results[1] === results[2]) {
        let prize = 0;
        if (results[0] === '7🔵') {
            prize = betAmount * 100;
            resultText.textContent = `Jackpot! 🎉 You got 3x Blue 7s and won $${prize}!`;
        } else if (results[0] === '7🔴') {
            prize = betAmount * 75;
            resultText.textContent = `Jackpot! 🎉 You got 3x Red 7s and won $${prize}!`;
        } else if (results[0] === '7🟢') {
            prize = betAmount * 50;
            resultText.textContent = `Jackpot! 🎉 You got 3x Green 7s and won $${prize}!`;
        } else if (results[0] === '7') {
            prize = betAmount * 25;
            resultText.textContent = `Jackpot! 🎉 You got 3x Black 7s and won $${prize}!`;
        } else if (results[0] === '🍊') {
            prize = betAmount * 10;
            resultText.textContent = `You got 3x Oranges and won $${prize}!`;
        } else if (results[0] === '🍏') {
            prize = betAmount * 5;
            resultText.textContent = `You got 3x Apples and won $${prize}!`;
        } else if (results[0] === '🍌') {
            prize = betAmount * 3;
            resultText.textContent = `You got 3x Bananas and won $${prize}!`;
        } else if (results[0] === '🍒') {
            prize = betAmount * 2;
            resultText.textContent = `You got 3x Cherries and won $${prize}!`;
        }

        currentBalance += prize;
        updateBalance(currentBalance); // Update balance in Firestore
    } else {
        resultText.textContent = 'Try again!';
    }
}

function getBetAmount() {
    let selectedBetButton = document.querySelector('.bet-button.selected');
    return parseInt(selectedBetButton.value);
}

// Example usage: Set userId after authentication
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        userId = user.uid;
        retrieveUserData();
    } else {
        // User is signed out
        console.log('User signed out');
    }
});

function selectBet(button) {
    document.querySelectorAll('.bet-button').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}

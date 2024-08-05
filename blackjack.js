let blackjackBalance = parseFloat(localStorage.getItem('blackjackBalance')) || 150;
const blackjackBetAmount = 10;
const deck = [];

function initializeDeck() {
    const suits = ['♠️', '♥️', '♦️', '♣️'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    deck.length = 0;
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push(`${value}${suit}`);
        });
    });
    deck.sort(() => Math.random() - 0.5); // Shuffle
}

function startBlackjack() {
    initializeDeck();
    blackjackBalance -= blackjackBetAmount;
    updateBlackjackBalance();
    dealInitialCards();
}

function dealInitialCards() {
    const playerCards = [drawCard(), drawCard()];
    const dealerCards = [drawCard(), drawCard()];
    updateBlackjackDisplay(playerCards, dealerCards);
    checkBlackjack(playerCards, dealerCards);
}

function drawCard() {
    return deck.pop();
}

function updateBlackjackDisplay(playerCards, dealerCards) {
    document.getElementById('blackjack-player-cards').innerHTML = `Player Cards: ${playerCards.join(' ')}`;
    document.getElementById('blackjack-dealer-cards').innerHTML = `Dealer Cards: ${dealerCards[0]} ?`;
}

function hit() {
    const playerCards = document.getElementById('blackjack-player-cards').textContent.replace('Player Cards: ', '').split(' ');
    playerCards.push(drawCard());
    document.getElementById('blackjack-player-cards').innerHTML = `Player Cards: ${playerCards.join(' ')}`;
    if (calculateHandValue(playerCards) > 21) {
        document.getElementById('blackjack-result').textContent = 'Bust! You lose.';
        updateBlackjackBalance();
    }
}

function stand() {
    const playerCards = document.getElementById('blackjack-player-cards').textContent.replace('Player Cards: ', '').split(' ');
    const dealerCards = [document.getElementById('blackjack-dealer-cards').textContent.split(' ')[1], drawCard()];
    document.getElementById('blackjack-dealer-cards').innerHTML = `Dealer Cards: ${dealerCards.join(' ')}`;
    let dealerValue = calculateHandValue(dealerCards);

    while (dealerValue < 17) {
        dealerCards.push(drawCard());
        document.getElementById('blackjack-dealer-cards').innerHTML = `Dealer Cards: ${dealerCards.join(' ')}`;
        dealerValue = calculateHandValue(dealerCards);
    }

    const playerValue = calculateHandValue(playerCards);
    if (dealerValue > 21 || playerValue > dealerValue) {
        document.getElementById('blackjack-result').textContent = 'You win!';
        blackjackBalance += blackjackBetAmount * 2;
    } else if (playerValue < dealerValue) {
        document.getElementById('blackjack-result').textContent = 'Dealer wins!';
    } else {
        document.getElementById('blackjack-result').textContent = 'It\'s a tie!';
        blackjackBalance += blackjackBetAmount;
    }

    updateBlackjackBalance();
}

function calculateHandValue(cards) {
    let value = 0;
    let aceCount = 0;
    cards.forEach(card => {
        const cardValue = card.slice(0, -1);
        if (['J', 'Q', 'K'].includes(cardValue)) {
            value += 10;
        } else if (cardValue === 'A') {
            aceCount += 1;
            value += 11;
        } else {
            value += parseInt(cardValue);
        }
    });

    while (value > 21 && aceCount > 0) {
        value -= 10;
        aceCount -= 1;
    }

    return value;
}

function updateBlackjackBalance() {
    localStorage.setItem('blackjackBalance', blackjackBalance);
    document.getElementById('balance').textContent = `Balance: $${blackjackBalance}`;
}

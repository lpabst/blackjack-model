
// returns unshuffled stack of cards for specificed number of decks
function getAllCardsForNumberOfDecks(numberOfDecks) {
    const values = ['a', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'j', 'q', 'k'];
    const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
    let allCards = [];
    for (let i = 0; i < numberOfDecks; i++) {
        suits.forEach(suit => {
            values.forEach(value => {
                allCards.push({ value, suit })
            })
        })
    }
    return allCards;
}

// randomly orangizes all of the cards in the passed in array
function shuffleCards(cardsArray) {
    let shuffledArray = [];
    while (cardsArray.length) {
        const randomIndex = random(0, cardsArray.length - 1);
        shuffledArray.push(cardsArray[randomIndex]);
        cardsArray.splice(randomIndex, 1);
    }
    return shuffledArray;
}

// returns a shuffled stack of cards for the specified number of decks 
function shuffleDecks(numberOfDecks) {
    const allCards = getAllCardsForNumberOfDecks(numberOfDecks);
    const shuffledCards = shuffleCards(allCards);
    return shuffledCards;
}


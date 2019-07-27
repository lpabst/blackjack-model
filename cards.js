/**
 * All of the functions in this file are helper type functions. 
 * They all return new values that need to be saved
 */

// returns unshuffled stack of cards for specificed number of decks
function getAllCardsForNumberOfDecks(numberOfDecks) {
    let values = ['a', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'j', 'q', 'k'];
    let suits = ['hearts', 'spades', 'clubs', 'diamonds'];
    let allCards = [];
    for (let i = 0; i < numberOfDecks; i++) {
        suits.forEach(suit => {
            values.forEach(value => {
                let pointValue = typeof value === 'number' ? value : 10;
                if (value === 'a') pointValue = 11;
                allCards.push({
                    value,
                    suit,
                    pointValue
                })
            })
        })
    }
    return allCards;
}

// Randomly orangizes all of the cards and returns a new array
function shuffleCards(cardsArray) {
    let shuffledArray = [];
    while (cardsArray.length > 0) {
        let randomIndex = random(0, cardsArray.length - 1);
        shuffledArray.push(cardsArray[randomIndex]);
        cardsArray.splice(randomIndex, 1);
    }
    return shuffledArray;
}

// returns a shuffled stack of cards for the specified number of decks 
function shuffleDecks(numberOfDecks) {
    let allCards = getAllCardsForNumberOfDecks(numberOfDecks);
    let shuffledCards = shuffleCards(allCards);
    return shuffledCards;
}

// takes one card from the array
// returns the card and the new array
function takeCardFromStack(stackOfCards) {
    if (stackOfCards.length === 0) {
        throw Error('Deck (stack) is out of cards')
    }
    let card = stackOfCards[0];
    stackOfCards.splice(0, 1);
    return {
        card,
        stackOfCards
    };
}

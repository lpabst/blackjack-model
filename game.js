/**
 * This is the entry point for the simulation
 * This file calls the other files' functions to execute round after round until a desired result
 */

// Takes in a settings object
function startGame({
    numberOfPlayers,
    startingCashPerPlayer,
    numberOfDecks,
    numberOfRounds,
    continuousShuffle,
}) {
    // set things up
    let dealer = initDealer();
    let players = initPlayers(numberOfPlayers, startingCashPerPlayer);
    let stackOfCards = shuffleDecks(numberOfDecks);

    // play the game for the specified number of rounds
    for (let i = 0; i < numberOfRounds; i++) {
        playRound(continuousShuffle, dealer, players, stackOfCards);
    }

    return true;
}

function initPlayers(numberOfPlayers, startingCashPerPlayer) {
    let players = [];
    for (let i = 0; i < numberOfPlayers; i++) {
        const player = new player(startingCashPerPlayer)
        players.push(player);
    }
    return players;
}

function initDealer() {
    return new Dealer();
}

// Does one full round of play
function playRound(continuousShuffle, dealer, players, stackOfCards) {
    dealCardsForRound(players, dealer, stackOfCards);

    // each player decides what to do with their hand 
    players.forEach(player => {
        // TODO: (need a player.js file for this);
    })

    finalizeRound(dealer, players, continuousShuffle, stackOfCards);
    return true;
}

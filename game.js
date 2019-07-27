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
    let data = {
        dealer: initDealer(),
        players: initPlayers(numberOfPlayers, startingCashPerPlayer),
        stackOfCards: shuffleDecks(numberOfDecks),
        continuousShuffle
    }

    // play the game for the specified number of rounds
    for (let i = 0; i < numberOfRounds; i++) {
        playRound(data);
    }

    return true;
}

function initPlayers(numberOfPlayers, startingCashPerPlayer) {
    let players = [];
    for (let i = 0; i < numberOfPlayers; i++) {
        let player = new Player(startingCashPerPlayer)
        players.push(player);
    }
    return players;
}

function initDealer() {
    return new Dealer();
}

// Does one full round of play
function playRound(data) {
    data.players.forEach(player => player.makeBet());
    dealCardsForRound(data);
    data.players.forEach(player => finalizePlayersHand(player, data.dealer.pointsShowing))
    finishDealingDealersHand(data);
    finalizeRound(data);
    return true;
}

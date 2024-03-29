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
    doubleDownIsAllowed
}) {
    // set things up
    let data = {
        dealer: initDealer(),
        players: initPlayers(numberOfPlayers, startingCashPerPlayer),
        stackOfCards: getShuffleDecks(numberOfDecks),
        continuousShuffle,
        doubleDownIsAllowed
    }

    // play the game for the specified number of rounds
    for (let i = 0; i < numberOfRounds; i++) {
        playRound(data);
    }

    // some quick helpful numbers on players' winnings/losings
    let averagePlayerCash = 0;
    let largestLossStreak = 0;
    let largestWinStreak = 0;
    data.players.forEach(player => {
        averagePlayerCash += player.cash;
        if (player.winLossStreak.win > largestWinStreak) largestWinStreak = player.winLossStreak.win;
        if (player.winLossStreak.loss > largestLossStreak) largestLossStreak = player.winLossStreak.loss;
    });
    averagePlayerCash = averagePlayerCash / data.players.length;


    console.log(data);
    console.log(averagePlayerCash);
    console.log({ largestWinStreak, largestLossStreak });
    return data;
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
    let { dealer } = data;
    data.players.forEach(player => player.makeBet());
    dealCardsForRound(data);
    data.players.forEach(player => finalizePlayersHand(player, data))
    finishDealingDealersHand(data);
    handleFinalBetsAndPayouts(data);
    discardPlayersCards(dealer, dealer);
    handleReShuffling(data);
    return true;
}

startGame({
    numberOfPlayers: 10,
    startingCashPerPlayer: 100000,
    numberOfDecks: 4,
    numberOfRounds: 1000000,
    continuousShuffle: true,
    doubleDownIsAllowed: true
})

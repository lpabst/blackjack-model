
// Deals a hand
// Modifies all 3 objects/arrays being passed in
function dealCardsForRound(players, dealer, stackOfCards) {
    // deal one card to each player
    players.forEach(player => {
        player.isPlaying = true;
        givePlayerCardFromStack(player, stackOfCards)
    })

    // deal one card to the dealer - this is the card the players can see
    givePlayerCardFromStack(dealer, stackOfCards);
    dealer.pointsShowing = dealer.cards[0].pointValue;

    // deal a 2nd card to each player & check for blackjack 
    players.forEach(player => {
        givePlayerCardFromStack(player, stackOfCards);
        checkPlayerForBlackJack(player);
    })

    // deal a 2nd card to the dealer (face down)
    givePlayerCardFromStack(dealer, stackOfCards);

    return true;
}

// checks the players cards to see if they have blackjack
// if they do, pays them out immediately
//  - for now I'm just going to always pay out 3-2 for a blackjack
function checkPlayerForBlackJack(player, dealer) {
    let playersPoints = 0;
    player.cards.forEach(card => {
        // at this point any aces will have a value of 11
        playersPoints += card.pointValue;
    })
    if (player.cards.length === 2 && playersPoints === 21) {
        handlePlayerWon(player, dealer, true);
        return true;
    }
    return false;
}

function givePlayerCardFromStack(player, stackOfCards) {
    const card = takeCardFromStack(stackOfCards);
    player.cards.push(card);
    return true;
}

// returns the point value of the players hand
function getDetailsForPlayersHand(player) {
    let points = 0;
    let numberOfAces = 0;
    let numberOfHardAces = numberOfAces;

    // add up the points
    player.cards.forEach(card => {
        points += card.pointValue;
        if (card.value === 'a') numberOfAces++;
    })

    // Modify for hard Aces - an Ace that has to have a point value of 1 to avoid a bust is a 'hard' Ace
    let numberOfSoftAces = numberOfAces - numberOfHardAces;
    while (numberOfSoftAces > 0 && points > 21) {
        // minus 10 points for each Hard Ace until they're under 21 or out of aces
        points -= 10;
        numberOfHardAces++;
        numberOfSoftAces--;
    }

    return {
        points,
        numberOfAces,
        numberOfHardAces,
        numberOfSoftAces: numberOfAces - numberOfHardAces
    };
}

// takes the players cards and adds them to the dealers discard pile
function discardPlayersCards(player, dealer) {
    dealer.discardPile.push(...player.cards);
    player.cards = [];
    return true;
}

// checks if the player busted their hand
// If so, takes their bet and the round is over for them
function checkPlayerForBust(player, dealer) {
    const playersPoints = getDetailsForPlayersHand(player).points;
    if (playersPoints > 21) {
        handlePlayerLost(player, dealer);
        return true;
    }
    return false;
}

/**
 * The dealer keeps 'hitting' until they have 17 or more
 * If it's a soft 17 (an ace and any combo of other cards totalling 6) then the dealer hits again (h17 game)
 * NOTE: I could make that an optional parameter in the future to simulate h17 and s17 games
 */
function finishDealingDealersHand(dealer, stackOfCards) {
    let dealersHandDetails = getDetailsForPlayersHand(dealer);

    while (
        dealersHandDetails.points < 17 ||
        (dealersHandDetails.points === 17 && dealersHandDetails.numberOfSoftAces > 0)
    ) {
        givePlayerCardFromStack(dealer, stackOfCards);
        dealersHandDetails = getDetailsForPlayersHand(dealer);
    }

    return true;
}

// takes care of when a player wins
function handlePlayerWon(player, dealer, isBlackJack) {
    // blackjack gets a 3-2 payout ratio
    const payoutRatio = isBlackJack ? 1.5 : 1;

    // they get their bet back, plus a payout and the round is over for them
    player.cash += player.bet;
    player.cash += player.bet * payoutRatio;
    player.bet = 0;
    player.isPlaying = false;
    discardPlayersCards(player, dealer);
    return true;
}

// they lose their bet without any payout, and the round is over for them
function handlePlayerLost(player, dealer) {
    player.bet = 0;
    player.isPlaying = false;
    discardPlayersCards(player, dealer);
    return true;
}

// they get their bet back, but no payout, and the round is over for them
function handlePlayerTie(player, dealer) {
    player.cash += player.bet;
    player.bet = 0;
    player.isPlaying = false;
    discardPlayersCards(player, dealer);
    return true;
}

// Checks each players hand compared to the dealers hand and then manages bets & payouts
// Blackjacks and player busts should be handled while dealing, so here we just 
//  check if the dealer busted, or whose points are higher
function handleFinalBetsAndPayouts(dealer, players) {
    const dealersPoints = getDetailsForPlayersHand(dealer).points;
    players.forEach(player => {
        const playersPoints = getDetailsForPlayersHand(player).points;
        if (playersPoints > dealersPoints || dealersPoints > 21) {
            return handlePlayerWon(player, dealer, false);
        }
        if (playersPoints < dealersPoints) {
            return handlePlayerLost(player, dealer);
        }
        if (playersPoints === dealersPoints) {
            return handlePlayerTie(player, dealer)
        }
    })
    return true;
}

// figures out when it's time to re-shuffle, then does so
function handleReShuffling(continuousShuffle, stackOfCards, dealer) {
    // continuous shuffle re-shuffles all of the cards in between each round
    // otherwise, if we have less than half a deck left, let's re-shuffle
    if (continuousShuffle || stackOfCards.length < 26) {
        stackOfCards.push(...dealer.discardPile);
        dealer.discardPile = [];
        stackOfCards = shuffleCards(stackOfCards);
    }
    return true;
}

// ends the round
// dealer does final payouts, then discards his own cards and checks for a re-shuffle
function finalizeRound(dealer, players, continuousShuffle, stackOfCards) {
    handleFinalBetsAndPayouts(dealer, players);
    discardPlayersCards(dealer, dealer);
    handleReShuffling(continuousShuffle, stackOfCards, dealer);
    return true;
}

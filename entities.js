/**
 * We have a dealer and players, which are each objects with properties, so this file handles that
 */

function Player(startingCash) {
    this.cash = startingCash;
    this.cards = [];
    this.bet = 0;
}

function Dealer() {
    this.discardPile = [];
    this.cards = [];
}

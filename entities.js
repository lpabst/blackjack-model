/**
 * We have a dealer and players, which are each objects with properties, so this file handles that
 */

function Player(startingCash) {
    this.cash = startingCash;
    this.cards = [];
    this.bet = 0;

    this.makeBet = function (amt = 10) {
        this.bet = amt;
        this.cash -= this.bet;
    }
}

function Dealer() {
    this.discardPile = [];
    this.cards = [];
}

/**
 * We have a dealer and players, which are each objects with properties, so this file handles that
 */

function Player(startingCash) {
    this.cards = [];

    this.cash = startingCash;
    this.bet = 0;
    this.makeBet = function (amt = 10) {
        this.bet = amt;
        this.cash -= this.bet;
    }

    this.winLossStreak = {
        win: 0,
        loss: 0,
        tie: 0,
        currentStreak: 0,
        currentStreakType: null
    }
    this.updateWinLossStreak = function (newestResult) {
        // continue the streak if it's the same resultType that we've been getting
        if (this.winLossStreak.currentStreakType === newestResult) {
            this.winLossStreak.currentStreak++;
            // see if we have a new record
            let oldType = this.winLossStreak.currentStreakType;
            if (this.winLossStreak.currentStreak > this.winLossStreak[oldType]) {
                this.winLossStreak[oldType] = this.winLossStreak.currentStreak;
            }
        }
        // reset the current streak count if this result is different than what we've been getting
        else {
            this.winLossStreak.currentStreak = 1;
            this.winLossStreak.currentStreakType = newestResult;
        }
    }
}

function Dealer() {
    this.discardPile = [];
    this.cards = [];
}

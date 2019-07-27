/**
 * This file contains the logic for what a player decides to do with their hand
 */

// for now each player just bets $10 each time
function makeBet(player) {
    player.bet = 10;
    player.cash -= player.bet;
}

// I want the players to follow basic strategy 
function finalizePlayersHand(player, dealer) {

}

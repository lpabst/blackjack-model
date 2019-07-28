/**
 * This file contains the logic for what a player decides to do with their hand
 */

const H = 'HIT';
const S = 'STAND';
const DH = 'DOUBLE_OR_HIT';
const DS = 'DOUBLE_OR_STAND';
const SPLIT = 'SPLIT';
const D = 'DOUBLE_DOWN';
const Y = 'YES';
const N = 'NO';

// this isn't being used yet
// For now I'm not going to allow any DAS (double down and split) for simplicity
const splitPair = {
    2: { 'a': Y, 10: N, 9: Y, 8: Y, 7: Y, 6: N, 5: N, 4: N, 3: N, 2: N },
    3: { 'a': Y, 10: N, 9: Y, 8: Y, 7: Y, 6: Y, 5: N, 4: N, 3: N, 2: N },
    4: { 'a': Y, 10: N, 9: Y, 8: Y, 7: Y, 6: Y, 5: N, 4: N, 3: Y, 2: Y },
    5: { 'a': Y, 10: N, 9: Y, 8: Y, 7: Y, 6: Y, 5: N, 4: N, 3: Y, 2: Y },
    6: { 'a': Y, 10: N, 9: Y, 8: Y, 7: Y, 6: Y, 5: N, 4: N, 3: Y, 2: Y },
    7: { 'a': Y, 10: N, 9: N, 8: Y, 7: Y, 6: N, 5: N, 4: N, 3: Y, 2: Y },
    8: { 'a': Y, 10: N, 9: Y, 8: Y, 7: N, 6: N, 5: N, 4: N, 3: N, 2: N },
    9: { 'a': Y, 10: N, 9: Y, 8: Y, 7: N, 6: N, 5: N, 4: N, 3: N, 2: N },
    10: { 'a': Y, 10: N, 9: N, 8: Y, 7: N, 6: N, 5: N, 4: N, 3: N, 2: N },
    11: { 'a': Y, 10: N, 9: N, 8: Y, 7: N, 6: N, 5: N, 4: N, 3: N, 2: N },
}

const hardTotals = {
    2: { 17: S, 16: S, 15: S, 14: S, 13: S, 12: H, 11: DH, 10: DH, 9: H, 8: H },
    3: { 17: S, 16: S, 15: S, 14: S, 13: S, 12: H, 11: DH, 10: DH, 9: DH, 8: H },
    4: { 17: S, 16: S, 15: S, 14: S, 13: S, 12: S, 11: DH, 10: DH, 9: DH, 8: H },
    5: { 17: S, 16: S, 15: S, 14: S, 13: S, 12: S, 11: DH, 10: DH, 9: DH, 8: H },
    6: { 17: S, 16: S, 15: S, 14: S, 13: S, 12: S, 11: DH, 10: DH, 9: DH, 8: H },
    7: { 17: S, 16: H, 15: H, 14: H, 13: H, 12: H, 11: DH, 10: DH, 9: H, 8: H },
    8: { 17: S, 16: H, 15: H, 14: H, 13: H, 12: H, 11: DH, 10: DH, 9: H, 8: H },
    9: { 17: S, 16: H, 15: H, 14: H, 13: H, 12: H, 11: DH, 10: DH, 9: H, 8: H },
    10: { 17: S, 16: H, 15: H, 14: H, 13: H, 12: H, 11: DH, 10: H, 9: H, 8: H },
    11: { 17: S, 16: H, 15: H, 14: H, 13: H, 12: H, 11: DH, 10: H, 9: H, 8: H },
}

const softTotals = {
    2: { 20: S, 19: S, 18: DS, 17: H, 16: H, 15: H, 14: H, 13: H },
    3: { 20: S, 19: S, 18: DS, 17: DH, 16: H, 15: H, 14: H, 13: H },
    4: { 20: S, 19: S, 18: DS, 17: DH, 16: DH, 15: DH, 14: H, 13: H },
    5: { 20: S, 19: S, 18: DS, 17: DH, 16: DH, 15: DH, 14: DH, 13: DH },
    6: { 20: S, 19: DS, 18: DS, 17: DH, 16: DH, 15: DH, 14: DH, 13: DH },
    7: { 20: S, 19: S, 18: S, 17: H, 16: H, 15: H, 14: H, 13: H },
    8: { 20: S, 19: S, 18: S, 17: H, 16: H, 15: H, 14: H, 13: H },
    9: { 20: S, 19: S, 18: H, 17: H, 16: H, 15: H, 14: H, 13: H },
    10: { 20: S, 19: S, 18: H, 17: H, 16: H, 15: H, 14: H, 13: H },
    11: { 20: S, 19: S, 18: H, 17: H, 16: H, 15: H, 14: H, 13: H },
}

function getPlayerAction(dealersPoints, playersPoints, playerHasSoftAce, playersCards, doubleDownIsAllowed) {
    // TODO: at some point I need to add in splitting based on players cards here
    if (playersCards[0].value === playersCards[1].value) {

    }

    // after a splitting decision, lookup hit/stand decision
    let lookupTable = playerHasSoftAce ? softTotals : hardTotals;
    let playerAction = lookupTable[dealersPoints][playersPoints];

    // Check if doubling down on bet is allowed
    // player can only double down on their first move (when they have 2 cards)
    if (playerAction === DH) {
        if (doubleDownIsAllowed && playersCards.length === 2) playerAction = D;
        else playerAction = H;
    }
    if (playerAction === DS) {
        if (doubleDownIsAllowed && playersCards.length === 2) playerAction = D;
        else playerAction = S;
    }

    // default to stand if we didn't find an action for any reason
    if (!playerAction) playerAction = S;
    return playerAction;
}

// I want the players to follow basic strategy 
function finalizePlayersHand(player, data) {
    // if the player had blackjack they won't have any cards here and no action is required
    if (!player.cards || player.cards.length === 0) {
        return;
    }

    // get the player action
    let { dealer, stackOfCards, doubleDownIsAllowed } = data;
    let { points, numberOfSoftAces } = getDetailsForPlayersHand(player);
    let playerHasSoftAce = numberOfSoftAces > 0;
    let playerAction = getPlayerAction(dealer.pointsShowing, points, playerHasSoftAce, player.cards, doubleDownIsAllowed);

    // no action if player decides to stand
    if (playerAction === S) return;

    // on a hit, give the player a card then start the process over
    if (playerAction === H) {
        givePlayerCardFromStack(player, stackOfCards);
        let playerBusted = checkPlayerForBust(player, dealer);
        if (playerBusted) return;
        return finalizePlayersHand(player, data);
    }

    // on a double down, we double the player's bet, give them one final card, and that's it
    if (playerAction === D) {
        player.cash -= player.bet;
        player.bet += player.bet;
        givePlayerCardFromStack(player, stackOfCards);
        checkPlayerForBust(player, dealer);
        return;
    }
}

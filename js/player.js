class player {
    constructor(playerId, cardId, points, playerStatus){
    this.playerId = playerId; /**Gamers aka players freely choosen individual name as identifier */
    this.cardId = cardId; /**Card identifier, this needs to be more explained, how and what way we get this information */
    this.points = points;/*Show sum of current card value? */
    this.playerStatus = playerStatus; /**Here are  decission point  - dealer or opposit player */
    changePlayerId();
    showCards(); /*Show cards to other players or open one card if playerStatus is dealer */
    showPoints(); /*Show sum of all player cards values */
    takeCard();
    }
}
const player = new player('geimeris_number_one','Queen','10','player');
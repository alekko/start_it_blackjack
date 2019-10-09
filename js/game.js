class Game {
    constructor() { /**Evil comments with my freaky peasant language skills*/
      this.startgame  = startgame() /**Start new game as new player with new full decks and zero points */
      this.stay = stay() /**If points achieve level nearly 21 or equal to 21, then player can pass move, withot taking a card*/
      this.continuegame = continuegame() /**When winner is clear and loser want to win, then game continue with cards that left in deck*/
      this.quitgame = quitgame() /**If player want to avoid addiction to gambling, then game can be ended, by exiting from it */
    }
  
    getName = () => this.name
    getValue = () => this.value
    getSuite = () => this.suite
  
    setName = (name) => this.name = name
    setValue = (value) => this.value = value
    setSuite = (suite) => this.suite = suite
  }
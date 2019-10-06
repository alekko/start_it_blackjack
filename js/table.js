class Table {
  constructor(deckCount=2) {
    this.cards = []
    this.players = []
    this.deckCount = deckCount
    this.currentPlayer = null
    this.currentCard = null
    this.maximumPoints = 21
  }

  buildCardsFromDecks = () => {
    for (let counter = 0; counter < this.deckCount; counter++) {
      const newDeck = new Deck()
      newDeck.build()
      newDeck.shuffle()

      newDeck.cards.forEach(card => this.cards.push(card))
    }
  }

  addPlayers = players => {
    players.forEach(player => this.players.push(player))
  }

  startGame = () => {
    this.currentPlayer = this.players.find(player => player.type === 'player')
  }

  takeCard = () => {
    const currentCard = this.cards.pop()
    this.currentPlayer.addCard(currentCard)
    if (this.isGameOverForPlayer()){
      this.switchToDealer()
    }
  }

  isGameOverForPlayer = () => this.currentPlayer.points > this.maximumPoints

  switchToDealer = () => {
    this.currentPlayer = this.players.find(player => player.type === 'dealer')
  }
}

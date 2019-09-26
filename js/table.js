class Table {
  constructor(deckCount) {
    this.decks = []
    this.cards = []
    this.players = []
    this.deckCount = deckCount
    this.currentPlayer = null
    this.currentCard = null
    this.maximumPoints = 21
  }

  buildDecks = () => {
    for (let i = 0; i < this.deckCount; i++) {
      const deck = new Deck()
      deck.build()
      deck.shuffle()
      this.decks.push(deck)
    }
  }

  buildCards = () => {
    for (let i = 0; i < this.decks.length; i++) {
      for (let j = 0; j < this.decks[i].cards.length; j++) {
        this.cards.push(this.decks[i].cards[j])
      }
    }
  }

  addPlayers = () => {
    const player = new Player('Player One', 'player')
    const dealer = new Player('Dealer', 'dealer')
    this.players.push(player)
    this.players.push(dealer)
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

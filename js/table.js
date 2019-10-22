const MAX_POINTS = 21

class Table {
  constructor(deckCount = 2) {
    this.cards = []
    this.players = []
    this.deckCount = deckCount
    this.currentPlayer = null
    this.currentCard = null
    this.bet = 10
    this.cardsInDeck = deckCount * 52 - 4
  }

  player = () => this.players.find(player => player.type === 'player')
  dealer = () => this.players.find(player => player.type === 'dealer')

  addPlayers = () => this.players = [new Player('player'), new Player('dealer')]
  setCurrentPlayer = player => this.currentPlayer = player
  takeCardFromDeck = () => this.cards.pop()

  buildCards = () => {
    for (let counter = 0; counter < this.deckCount; counter++) {
      const deck = new Deck()
      deck.build()
      deck.shuffle()
      deck.cards.forEach(card => this.cards.push(card))
    }
  }

  startGame = () => {
    document.getElementById('before-game-actions').style.display = 'none'
    document.getElementById('after-game-actions').style.display = 'inline-block'

    if (document.getElementById('notification-block')) {
      var elem = document.getElementById('notification-block')
      elem.parentNode.removeChild(elem)
    }
    //this.player.cash(CASH)
    this.buildCards()
    this.addPlayers()
    this.player().addCard(this.takeCardFromDeck())
    this.player().addCard(this.takeCardFromDeck())
    this.dealer().addCard(this.takeCardFromDeck())
    const hiddenCard = this.takeCardFromDeck()
    hiddenCard.type = 'down'
    this.dealer().addCard(hiddenCard)
    this.setCurrentPlayer(this.player())
    this.player().updateCash(-10)
    this.renderCardsAndPoints()
  }

  takePlayerCard = () => {
    this.player().addCard(this.takeCardFromDeck())
    this.decCardsInDeck()
    this.renderCardsAndPoints()
    this.validatePlayerPoints()
    
    
  }

  decCardsInDeck = () =>{
    this.cardsInDeck = this.cardsInDeck - 1
  }

  validatePlayerPoints = () => {
    if (this.currentPlayer.points <= MAX_POINTS) return
    this.prepareTableForNewGame()
    this.notifyResult()
  }

  downCardTemplate = () => `<div class='card card-down'></div>`
  pointsTemplate = points => `<div class='points-block'><p>${points}</p></div>`
  deckTemplate = cardsInDeck => `<div class='cardsindeck'>${cardsInDeck}</div>`
  upCardTemplate = (suite, name, type) => `<div class='card ${suite} card-${type}'><p>${name}</p></div>`
  notificationTemplate = message => `<div id='notification-block'><p>${message}</p></div>`
  cashTemplate = cash => `<div class='cash'>CASH:<b>$${cash}</b></div>`
  

  renderCardsAndPoints = () => {
    let playerDeck = document.getElementById('player')
    let dealerDeck = document.getElementById('dealer')
    let deck = document.getElementById('deck')
    deck.innerHtml = playerDeck.innerHTML = dealerDeck.innerHTML = ''

    this.player().cards.forEach(({ suite, name }) =>
      playerDeck.innerHTML += this.upCardTemplate(suite, name)
    )
    playerDeck.innerHTML += this.pointsTemplate(this.player().getPoints())
    playerDeck.innerHTML += this.cashTemplate(this.player().getCash())
    deck.innerHTML += this.deckTemplate(this.cardsInDeck)
    this.dealer().cards.forEach(({ suite, name, type }) =>
      dealerDeck.innerHTML += type === 'down' ? this.downCardTemplate() : this.upCardTemplate(suite, name)
    )
    dealerDeck.innerHTML += this.pointsTemplate(this.dealer().getPoints())
  }

  notifyResult = () => {
    let result = ''
    const win = [
      'Malacis!!!',
      'Apsveicu, šī bija laba partija!',
      'Šo gan es negaidīju. Apsveisu!'
    ]
    const lose = [
      'Nākamreiz Tev noteikti paveiksies!!!',
      'Vienmēr uzvarēt nevar',
      'Ši nebija Tava partija ;)'
    ]

    if (this.player().getPoints() === this.dealer().getPoints()) {
      result = 'NEIZŠĶIRTS!'
      this.player().updateCash(10)
    } else if (this.player().getPoints() > this.dealer().getPoints() && this.player().getPoints() <= MAX_POINTS || this.dealer().getPoints() > MAX_POINTS) {
      result = win[Math.floor(Math.random() * win.length)]
      this.player().updateCash(20)
    } else {
      result = lose[Math.floor(Math.random() * lose.length)]
    }
    document.getElementById('game').innerHTML += this.notificationTemplate(result)
  }

  endTurn = () => {
    this.currentPlayer = this.dealer()
    this.currentPlayer.showHiddenCards()

    while (this.currentPlayer.getPoints() < 19)
      this.currentPlayer.addCard(this.takeCardFromDeck())

    this.renderCardsAndPoints()
    this.notifyResult()
    this.prepareTableForNewGame()
  }

  double = () => {
    this.player().addCard(this.takeCardFromDeck())
    this.renderCardsAndPoints()
    this.validatePlayerPoints()
    if (this.player().getPoints() <= 21)
      this.endTurn()
  }

  prepareTableForNewGame = () => {
    document.getElementById('before-game-actions').style.display = 'inline-block'
    document.getElementById('after-game-actions').style.display = 'none'
  }
}

const MAX_POINTS = 21

class Table {
  constructor(deckCount = 2) {
    this.cards = []
    this.players = []
    this.deckCount = deckCount
    this.currentPlayer = null
    this.currentCard = null
    this.bet = 10
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
    if (document.getElementById('notification-block-lose')) {
      var elemLose = document.getElementById('notification-block-lose')
      elemLose.parentNode.removeChild(elemLose)
    }

    this.buildCards()
    this.addPlayers()
    this.player().addCard(this.takeCardFromDeck())
    this.player().addCard(this.takeCardFromDeck())
    this.dealer().addCard(this.takeCardFromDeck())
    const hiddenCard = this.takeCardFromDeck()
    hiddenCard.type = 'down'
    this.dealer().addCard(hiddenCard)
    this.setCurrentPlayer(this.player())
    this.renderCardsAndPoints()
  }

  takePlayerCard = () => {
    this.player().addCard(this.takeCardFromDeck())
    this.renderCardsAndPoints()
    this.validatePlayerPoints()
  }

  validatePlayerPoints = () => {
    if (this.currentPlayer.points <= MAX_POINTS) return
    this.prepareTableForNewGame()
    this.notifyResult()
  }

  downCardTemplate = () => `<div class='card card-down'></div>`
  upCardTemplate = (suite, name) => `<div class='card ${suite}'><p>${name}</p></div>`
  pointsTemplate = points => `<div class='points-block'><p>${points}</p></div>`
  upCardTemplateNonactive = (suite, name) => `<div class='card-nonactive ${suite}'><p>${name}</p></div>`
  cashTemplate = cash => `<div class='cash'><p>${cash}</p></div>`
  notificationTemplate = message => `<div id='notification-block'><p>${message}</p></div>`
  notificationTemplateLose = message => `<div id='notification-block-lose'><p>${message}</p></div>`

  renderCardsAndPoints = () => {
    let playerDeck = document.getElementById('player')
    let dealerDeck = document.getElementById('dealer')
    playerDeck.innerHTML = dealerDeck.innerHTML = ''

    if (this.currentPlayer == this.player()) {
      this.player().cards.forEach(({ suite, name }) =>
        playerDeck.innerHTML += this.upCardTemplate(suite, name)
      )
      playerDeck.innerHTML += this.pointsTemplate(this.player().getPoints())
      playerDeck.innerHTML += this.cashTemplate('cash goes here')
      this.dealer().cards.forEach(({ suite, name, type }) =>
        dealerDeck.innerHTML += type === 'down' ? this.downCardTemplate() : this.upCardTemplateNonactive(suite, name)
      )
      dealerDeck.innerHTML += this.pointsTemplate(this.dealer().getPoints())
    } else {
      this.player().cards.forEach(({ suite, name }) =>
        playerDeck.innerHTML += this.upCardTemplateNonactive(suite, name)
      )
      playerDeck.innerHTML += this.pointsTemplate(this.player().getPoints())

      this.dealer().cards.forEach(({ suite, name, type }) =>
        dealerDeck.innerHTML += type === 'down' ? this.downCardTemplate() : this.upCardTemplate(suite, name)
      )
      dealerDeck.innerHTML += this.pointsTemplate(this.dealer().getPoints())
    }
  }

  notifyResult = () => {
    let notificationMessage = ''
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

    const draw = [
      'Ne uzvara ne zaudējums.',
      'Nebēdā, neizsķirts tomēr nav zaudējums'
    ]

    if (this.player().getPoints() === this.dealer().getPoints()) {
      notificationMessage = draw[Math.floor(Math.random() * draw.length)]
    } else if (this.player().getPoints() > this.dealer().getPoints() && this.player().getPoints() <= MAX_POINTS || this.dealer().getPoints() > MAX_POINTS) {
      notificationMessage = win[Math.floor(Math.random() * win.length)]
    } else {
      notificationMessage = lose[Math.floor(Math.random() * lose.length)]
    }

    document.getElementById('game').innerHTML += this.notificationTemplateLose(notificationMessage)
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
    if (this.player().getPoints() >= 21)
      this.endTurn()
  }

  prepareTableForNewGame = () => {
    document.getElementById('before-game-actions').style.display = 'inline-block'
    document.getElementById('after-game-actions').style.display = 'none'
  }
}

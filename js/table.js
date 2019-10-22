class Table {
  constructor(deckCount = 2) {
    this.cards = []
    this.players = []
    this.deckCount = deckCount
    this.playerCash = 100
    this.currentBet = null
  }

  playerDeck  = () => document.getElementById('player')
  dealerDeck  = () => document.getElementById('dealer')
  gameWrapper = () => document.getElementById('game')

  player = () => this.players.find(player => player.type === 'player')
  dealer = () => this.players.find(player => player.type === 'dealer')

  addPlayers    = () => this.players = [new Player('player'), new Player('dealer')]
  renewDeck     = () => this.cards.length < 50 && this.buildCards()
  getPlayerCash = () => this.playerCash
  setCurrentBet = (currentBet) => this.currentBet = currentBet
  setPlayerCash = (playerCash) => this.playerCash += playerCash

  buildCards = () => {
    this.cards = []
    for (let counter = 0; counter < this.deckCount; counter++) {
      const deck = new Deck()
      deck.build()
      deck.shuffle()
      deck.cards.forEach(card => this.cards.push(card))
    }
  }

  addCardTo = (currentPlayer, cardType = 'up') => {
    removePreviousCardsAnimations()

<<<<<<< HEAD
    if (document.getElementById('notification-block')) {
      var elem = document.getElementById('notification-block')
      elem.parentNode.removeChild(elem)
    }
    if (document.getElementById('notification-block-lose')) {
      var elemLose = document.getElementById('notification-block-lose')
      elemLose.parentNode.removeChild(elemLose)
    }
=======
    const card = this.cards.pop()
    const { type } = currentPlayer
    const { suite, name } = card
    const currentPlayerDeck = this[`${type}Deck`]()
>>>>>>> master

    card.type = cardType
    currentPlayer.addCard(card)
    currentPlayer.getPoints() > 21 && currentPlayer.changeNotSwappedAceValue()

    removeElementById(`${type}-points`)

    currentPlayerDeck.innerHTML += pointsTemplate(type, currentPlayer.getPoints())
    currentPlayerDeck.innerHTML += cardType === 'down'
      ? downCardTemplate()
      : upCardTemplate(suite, name, 'animated fadeInLeft')

    this.renderLeftCardsCounter()
  }

  takePlayerCard = () => {
    this.player().addCardTo(this.takeCardFromDeck())
    this.validatePlayerPoints()
  }

  startGame = () => {
    this.renewDeck()
    removeElementById('notification-block')
    this.renderPlayerCash()

    this.renderLeftCardsCounter()
    this.prepareTableForGame('start')
    this.addPlayers()

<<<<<<< HEAD
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
=======
    this.addCardTo(this.player())
    this.addCardTo(this.player())
    this.addCardTo(this.dealer())
    this.addCardTo(this.dealer(), 'down')
  }

  hit = () => {
    this.addCardTo(this.player())
    this.validatePlayerPoints()
>>>>>>> master
  }

  stand = () => {
    removeElementById('hidden-card')

    const hiddenCard = this.dealer().getHiddenCard()
    this.dealer().turnUpHiddenCard()

    this.dealerDeck().innerHTML += pointsTemplate('dealer', this.dealer().getPoints())
    this.dealerDeck().innerHTML += upCardTemplate(hiddenCard.suite, hiddenCard.name)

    while (this.dealer().getPoints() < 19) this.addCardTo(this.dealer())

    this.notifyResult()
    this.prepareTableForGame('end')
  }

  double = () => {
    this.setCurrentBet(this.currentBet * 2)
    this.addCardTo(this.player())
    this.validatePlayerPoints()
    this.stand()
  }

  validatePlayerPoints = () => {
    if (this.player().getPoints() > MAX_POINTS) {
      this.notifyResult()
      this.prepareTableForGame('end')
    }
  }

  notifyResult = () => {
    if (this.resultNotified) return
    const pp = this.player().getPoints()
    const dp = this.dealer().getPoints()
    let result = ''

    if (pp > dp && pp <= MAX_POINTS || dp > MAX_POINTS) result = 'win'
    else if (pp === dp) result = 'draw'
    else result = 'lose'

    result === 'lose'
      ? this.setPlayerCash(-this.currentBet)
      : this.setPlayerCash(this.currentBet)

    this.gameWrapper().innerHTML += notificationTemplate(getNotificationMessage(result), result)

    this.resultNotified = true
    this.renderPlayerCash()
    this.setCurrentBet(DEFAULT_BET)
  }

  renderPlayerCash = () => {
    removeElementById('player-cash')
    this.gameWrapper().innerHTML += cashTemplate(this.getPlayerCash())
  }

  renderLeftCardsCounter = () => {
    document.getElementById('in-game-deck-points').innerHTML = ''
    document.getElementById('in-game-deck-points').innerHTML = this.cards.length
  }

  prepareTableForGame = (type) => {
    document.getElementById('before-game-actions').style.display = type === 'start' ? 'none' : 'inline-block'
    document.getElementById('after-game-actions').style.display = type === 'start' ? 'inline-block' : 'none'

    if (type !== 'start') return
    this.resultNotified = false
    document.getElementById('dealer-chip').style.display = 'block'
    document.getElementById('in-game-deck').style.display = 'block'
    this.playerDeck().innerHTML = this.dealerDeck().innerHTML = ''
  }
}

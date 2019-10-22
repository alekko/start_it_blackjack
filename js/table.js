class Table {
  constructor(deckCount = 2) {
    this.cards = []
    this.players = []
    this.deckCount = deckCount
    this.playerCash = 100
    this.currentBet = null
  }

  player = () => this.players.find(player => player.type === 'player')
  dealer = () => this.players.find(player => player.type === 'dealer')
  addPlayers = () => this.players = [new Player('player'), new Player('dealer')]

  playerDeck  = () => document.getElementById('player')
  dealerDeck  = () => document.getElementById('dealer')
  gameWrapper = () => document.getElementById('game')

  buildCards = () => {
    this.cards = []
    for (let counter = 0; counter < this.deckCount; counter++) {
      const deck = new Deck()
      deck.build()
      deck.shuffle()
      deck.cards.forEach(card => this.cards.push(card))
    }
  }

  renderLeftCards = () => {
    document.getElementById('in-game-deck-points').innerHTML = ''
    document.getElementById('in-game-deck-points').innerHTML = this.cards.length
  }

  renewDeck = () => this.cards.length < 50 && this.buildCards()

  setCurrentBet = (currentBet) => this.currentBet = currentBet

  getPlayerCash = () => this.playerCash
  setPlayerCash = (playerCash) => this.playerCash += playerCash

  addCardTo = (currentPlayer, cardType = 'up') => {
    removePreviousCardsAnimations()

    const { type } = currentPlayer

    const card = this.cards.pop()
    card.type = cardType
    currentPlayer.addCard(card)

    const currentPlayerDeck = this[`${type}Deck`]()
    const { suite, name } = card

    removeElementById(`${type}-points`)

    currentPlayerDeck.innerHTML += pointsTemplate(type, currentPlayer.getPoints())
    currentPlayerDeck.innerHTML += cardType === 'down'
      ? downCardTemplate()
      : upCardTemplate(suite, name, 'animated fadeInLeft')

    this.renderLeftCards()
  }

  startGame = () => {
    this.renewDeck()
    removeElementById('notification-block')
    this.renderPlayerCash()

    this.renderLeftCards()
    this.prepareTableForGame('start')
    this.addPlayers()

    this.addCardTo(this.player())
    this.addCardTo(this.player())
    this.addCardTo(this.dealer())
    this.addCardTo(this.dealer(), 'down')
  }

  takePlayerCard = () => {
    this.player().addCardTo(this.takeCardFromDeck())
    this.validatePlayerPoints()
  }

  hit = () => {
    this.addCardTo(this.player())
    this.validatePlayerPoints()
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

  renderPlayerCash = () => {
    removeElementById('player-cash')
    this.gameWrapper().innerHTML += cashTemplate(this.getPlayerCash())
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

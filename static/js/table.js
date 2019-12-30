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

    const card = this.cards.pop()
    const { type } = currentPlayer
    const { suite, name } = card
    const currentPlayerDeck = this[`${type}Deck`]()

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

    this.addCardTo(this.player())
    this.addCardTo(this.player())
    this.addCardTo(this.dealer())
    this.addCardTo(this.dealer(), 'down')
    this.player().name = prompt("Ievadi spēlētāja vārdu","Azarts")
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

    // sūtām uz serveri rezultātu
    let rezultats = JSON.stringify({ nauda: this.getPlayerCash() , status: result, gamer: this.player().name})
    this.sendResultsToServer(rezultats)
  }
sendResultsToServer = (rezultats) => {
    // sūtām kā JSON
    let parameters = {
      method: 'POST',
      body: JSON.stringify({ value: rezultats}),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch('http://127.0.0.1:5000/save_result', parameters)
    .then(res => console.log(res))
    .then(res => console.log(res))
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
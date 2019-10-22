class Table {
  constructor(deckCount = 2) {
    this.cards          = []
    this.players        = []
    this.deckCount      = deckCount
    this.resultNotified = false
    this.playerCash     = 100
  }

  player = () => this.players.find(player => player.type === 'player')
  dealer = () => this.players.find(player => player.type === 'dealer')
  addPlayers = () => this.players = [new Player('player'), new Player('dealer')]

  updatePlayerCash = bet => this.playerCash += bet
  getPlayerCash = () => this.playerCash
  

  playerDeck = () => document.getElementById('player')
  dealerDeck = () => document.getElementById('dealer')
  deckTemplate = () => document.getElementById()

  buildCards = () => {
    for (let counter = 0; counter < this.deckCount; counter++) {
      const deck = new Deck()
      deck.build()
      deck.shuffle()
      deck.cards.forEach(card => this.cards.push(card))
    }
  }

  addCardTo = (player, cardType='up') => {
    removePreviousCardsAnimations()
    const card = this.cards.pop()
    card.type = cardType
    player.addCard(card)

    const playerDeck = this[`${player.type}Deck`]()
    const { suite, name } = card

    removeElementById(`${player.type}-points`)
    playerDeck.innerHTML += pointsTemplate('dealer', player.getPoints())
    playerDeck.innerHTML += cardType === 'down'
      ? downCardTemplate()
      : upCardTemplate(suite, name, 'animated fadeInLeft')

    if (player.type === 'player') {
      removeElementById('player-cash')
      document.getElementById('game').innerHTML += cashTemplate(this.getPlayerCash())
    }
  }

  startGame = () => {
    removeElementById('notification-block')
    this.prepareTableForGame('start')

    this.addPlayers()
    this.updatePlayerCash(-10)

    this.addCardTo(this.player())
    this.addCardTo(this.player())
    this.addCardTo(this.dealer())
    this.addCardTo(this.dealer(), 'down')
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
    this.addCardTo(this.player())
    this.validatePlayerPoints()
    this.endTurn()
  }

  validateForAce = () =>{
    forEach.player().cards()
      if (this.player.card === 11 && this.player.getPoints > 21){
        this.player.card = 1
        this.validatePlayerPoints()
      }
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

    if (pp > dp && pp <= MAX_POINTS || dp > MAX_POINTS){
      result = 'win'
      this.updatePlayerCash(+20)
    }
    else if (pp === dp){
      result = 'draw'
      this.updatePlayerCash(+10)
    }
    else result = 'lose'

    document.getElementById('game').innerHTML += notificationTemplate(getNotificationMessage(result), result)
    this.resultNotified = true
  }

  prepareTableForGame = (type) => {
    document.getElementById('before-game-actions').style.display = type === 'start' ? 'none' : 'inline-block'
    document.getElementById('after-game-actions').style.display = type === 'start' ? 'inline-block' : 'none'

    if (type !== 'start') return
    this.resultNotified = false
    document.getElementById('dealer-chip').style.display = 'block'
    this.playerDeck().innerHTML = this.dealerDeck().innerHTML = ''
  }
}

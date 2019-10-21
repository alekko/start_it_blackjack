class Player {
  constructor(type) {
    this.type   = type
    this.cards  = []
    this.points = 0
    this.cash = 100
  }

  updatePoints = point => this.points += point

  updateCash = (bet) => this.cash += bet

  getCash = () => this.cash;

  showHiddenCards = () => this.cards.map(card => card.type = 'up')

  getPoints = () => this.cards.filter(card =>
    card.type === 'up'
  ).reduce((prev, next) => prev + next.value, 0)

  addCard = card => {
    this.updatePoints(card.value)
    this.cards.push(card)
  }
  
}

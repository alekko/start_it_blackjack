class Player {
  constructor(type) {
    this.type   = type
    this.cards  = []
    this.points = 0
  }

  updatePoints = point => this.points += point
  getHiddenCard = () => this.cards.find(card => card.type === 'down')

  turnUpHiddenCard = () => this.getHiddenCard().type = 'up'
  showHiddenCards = () => this.cards.map(card => card.type = 'up')

  getPoints = () => this.cards.filter(
    card => card.type === 'up'
  ).reduce(
    (prev, next) => prev + next.value, 0
  )

  addCard = card => {
    this.updatePoints(card.value)
    this.cards.push(card)
  }

  changeNotSwappedAceValue = () => {
    const notSwappedAce = this.cards.find(card => card.name === 'A' && card.value === 11)
    notSwappedAce && notSwappedAce.setValue(1)
  }
}

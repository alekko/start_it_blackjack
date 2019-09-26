class Player {
  constructor(name, type) {
    this.points = 0
    this.cards = []
    this.type = type
    this.name = name
  }

  getName = () => this.name
  setName = (name) => this.name = names

  addCard = (card) => {
    this.updatePoints(card.value)
    this.cards.push(card)
  }

  updatePoints = (point) => this.points += point
}

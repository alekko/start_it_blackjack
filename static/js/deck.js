class Deck {
  constructor() {
    this.cards = []
  }

  build() {
    for (let i = 0; i < CARD_SUITS.length; i++) {
      for (let j = 0; j < CARD_NAMES.length; j++) {
        let cardValue = null
        if (j<8) cardValue = j + 2
        else if (CARD_NAMES[j] == 'A') cardValue = 11
        else cardValue = 10

        this.cards.push(new Card(cardValue, CARD_NAMES[j], CARD_SUITS[i]))
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let temp = this.cards[i]
      this.cards[i] = this.cards[j]
      this.cards[j] = temp
    }
  }
}

const NAMES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
const SUITS = ['hearts', 'diamonds', 'spades', 'clubs']

class Deck {
  constructor() {
    this.cards = []
  }

  build() {
    for (let i = 0; i < SUITS.length; i++) {
      for (let j = 0; j < NAMES.length; j++) {
        if (j<8)
          this.cards.push(new Card(j+2, NAMES[j], SUITS[i]))
        else if (NAMES[j] == 'A')
          this.cards.push(new Card(11, NAMES[j], SUITS[i]))
        else
          this.cards.push(new Card(10, NAMES[j], SUITS[i]))
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

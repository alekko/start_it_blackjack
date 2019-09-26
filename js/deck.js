const NAMES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
const SUITS = ['Hearts', 'Diamonds', 'Spades', 'Clubs']

class Deck {
  constructor() {
    this.cards = []
  }

  build() {
    for (let j = 0; j < SUITS.length; j++) {
      for (let n = 0; n < NAMES.length; n++) {
        if (n<8) {
          this.cards.push(
            new Card(n+2, NAMES[n], SUITS[j])
          )
        }
        else if (NAMES[n] == 'A') {
          this.cards.push(
            new Card(11, NAMES[n], SUITS[j])
          )
        }
        else {
          this.cards.push(
            new Card(10, NAMES[n], SUITS[j])
          )
        }
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  getCards = stringified => (stringified ? JSON.stringify(this.cards) : this.cards)
}


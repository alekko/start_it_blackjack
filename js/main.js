const table = new Table()

const players = [
  new Player('Player One', 'player'),
  new Player('Dealer', 'dealer')
]

const deck1 = new Deck()
deck1.build()
deck1.shuffle()

const deck2 = new Deck()
deck2.build()
deck2.shuffle()

const decks = [
  deck1,
  deck2
]

table.addPlayers(players)
// table.buildCardsFromDecks(decks)

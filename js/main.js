const table = new Table()
const Players = []
 Players.push( new Player('Player One', 'player'))
 Players.push( new Player('Dealer', 'dealer'))

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

table.addPlayers(Players)
// table.buildCardsFromDecks(decks)

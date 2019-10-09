class BlackJack {
  constructor(id) {
    this.galds = document.getElementById(id);
   
    this.divGameTable = document.createElement("div");
    this.divGameTable.setAttribute("class", "gametable"); /**gametable - simple table with some decks and cards on it ;) */
    this.galds.appendChild(this.divGameTable);

    this.divButtonBar = document.createElement("div");
    this.divButtonBar.setAttribute("class", "buttonbar");
    let btnStartGame = document.createElement("button");
    btnStartGame.innerHTML = "Sākt spēli!";
    btnStartGame.onclick = (evt) => { 
        this.startGame();
    }

    let btnTakeCard = document.createElement("button");
    btnTakeCard.innerHTML = "Paņemt kārti!";
    btnTakeCard.onclick = (evt) => { 
        this.startGame();
    }

    this.divButtonBar.appendChild(btnStartGame);
    this.divButtonBar.appendChild(btnTakeCard);

    this.galds.appendChild(this.divButtonBar);
  }

startGame(){
const ttable = new Table()
const players = []
 players.push( new Player('Player One', 'player'))
 players.push( new Player('Dealer', 'dealer'))

console.log(players[1])

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
console.log(decks[0])

ttable.addPlayers(players)
ttable.buildCardsFromDecks(decks)
console.log(ttable)
  }
}
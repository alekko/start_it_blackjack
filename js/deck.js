class Deck {
    constructor(size) {
        this.size = size;
        this.cards = []
    }
        newDeck() {
            const names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
            const suits = ['Hearts','Diamonds','Spades','Clubs'];
            //for( let i = 0; i < Deck.size; i++ ) {
                for( let j = 0; j < suits.length; j++ ) {
                    for( let n = 0; n < names.length; n++ ) {
                        this.cards.push(new Card(n+2, names[n], suits[j]))
                }
            }
            //}
        }
        shuffle(){
                for (var i = array.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
        }
        showDeck(){
                for( var i = 0; s < this.cards.length; i++ ) {
                CardofDeck.innerHTML = cards[i];
                
        }
        }

}

const deck1 = new Deck(1);
console.log(deck1);
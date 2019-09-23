class Deck {
    constructor(size) {
        this.size = size;
        this.cards = []
    }
        newDeck() {
            const names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
            const suits = ['Hearts','Diamonds','Spades','Clubs'];
            // es gribēju kko šādu lai vairāk par vienu kavu varētu būt bet man neiet
            // for( let i = 0; i < Deck.size; i++ ) {
            //     for( let j = 0; j < suits.length; j++ ) {
            //         for( let n = 0; n < names.length; n++ ) {
            //             this.cards.push(new Card(n+2+(52*i), names[n], suits[j]))
            //     }
            // }
            // }
                for( let j = 0; j < suits.length; j++ ) {
                    for( let n = 0; n < names.length; n++ ) {
                        if (n>8) {
                            this.cards.push(new Card(10, names[n], suits[j]));
                        }
                        else if (names[n] == 'A') {
                            this.cards.push(new Card(11, names[n], suits[j]));
                            }
                        else{
                        this.cards.push(new Card(n+2, names[n], suits[j]));
                }
            }
        }

        }

        shuffle(){
                for (var i = this.cards.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = this.cards[i];
                    this.cards[i] = this.cards[j];
                    this.cards[j] = temp;
                }
        }
        showDeck(){
            for( let i = 0; i < this.cards.length; i++ )
            console.log(deck1.cards[i]);
        }

}

const deck1 = new Deck(3);
deck1.newDeck();
deck1.shuffle();
deck1.showDeck();

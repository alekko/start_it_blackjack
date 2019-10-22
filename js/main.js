const MAX_POINTS = 21
const DEFAULT_BET = 10
const CARD_NAMES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
const CARD_SUITS = ['hearts', 'diamonds', 'spades', 'clubs']
const CARD_ANIMATION_CLASS = 'fadeInLeft'

const table = new Table()
table.buildCards()
table.setCurrentBet(DEFAULT_BET)

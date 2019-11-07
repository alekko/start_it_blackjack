class Card {
  constructor(value, name, suite, type = 'up') {
    this.name  = name
    this.type  = type
    this.suite = suite
    this.value = value
  }

  setValue = (value) => this.value = value
}

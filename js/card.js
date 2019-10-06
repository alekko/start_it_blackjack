class Card {
  constructor(value, name, suite) {
    this.name  = name
    this.value = value
    this.suite = suite
  }

  getName = () => this.name
  getValue = () => this.value
  getSuite = () => this.suite

  setName = (name) => this.name = name
  setValue = (value) => this.value = value
  setSuite = (suite) => this.suite = suite
}

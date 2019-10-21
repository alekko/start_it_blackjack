removeElementById = (id) => {
  const removableElement = document.getElementById(id)
  if (removableElement) removableElement.parentNode.removeChild(removableElement)
}

removePreviousCardsAnimations = () => {
  const element = document.querySelectorAll(`.${CARD_ANIMATION_CLASS}`)
  if (element) {
    element.forEach(el =>
      el.classList.remove(CARD_ANIMATION_CLASS)
    )
  }
}

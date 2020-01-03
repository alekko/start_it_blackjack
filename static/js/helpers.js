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

setCookie = (cookieName, cookieValue, expirationDays) => {
  let date = new Date();
  date.setTime(date.getTime() + (expirationDays*24*60*60*1000))
  const expires = 'expires='+ date.toUTCString()
  document.cookie = cookieName + '=' + cookieValue + ';' + expires + ';path=/'
}

getCookie = (cookieName) => {
  const name = cookieName + '='
  const decodedCookie = decodeURIComponent(document.cookie)
  const cookieArray = decodedCookie.split(';')
  for(let i = 0; i < cookieArray.length; i++) {
      let c = cookieArray[i]
      while (c.charAt(0) == ' ') c = c.substring(1)
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
  }
  return ''
}

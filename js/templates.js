downCardTemplate = () => `<div id='hidden-card' class='card'></div>`
pointsTemplate = (playerType, points) => `<div id='${playerType}-points' class='points-block'><p>${points}</p></div>`
upCardTemplate = (suite, name, klass) => `<div class='card ${suite} ${klass}'><p>${name}</p></div>`
cashTemplate = cash => `<div id='player-cash' class='cash'>CASH: <b>$${cash}</b></div>`
notificationTemplate = (message, type) => `<div id='notification-block' class='${type}-notification animated bounce'><p>${message}</p></div>`

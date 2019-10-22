const notifications = {
  win :[
    'Malacis!',
    'Apsveicu, šī bija laba partija!',
    'Šo gan es negaidīju. Apsveicu!'
  ],
  lose: [
    'Nākamreiz Tev noteikti paveiksies!',
    'Vienmēr uzvarēt nevar!',
    'Ši nebija Tava partija!'
  ],
  draw: [
    'Neizšķirts tomēr nav zaudējums!',
    'Ir uzvaras, ir zaudējumi, taču šeit ir neizšķirts!'
  ]
}

getNotificationMessage = (type) => notifications[type][Math.floor(Math.random() * notifications[type].length)]

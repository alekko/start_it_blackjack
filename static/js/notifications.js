const notifications = {
  win: [
    'Malacis!',
    'Apsveicu, šī bija laba spēle!',
    'Negaidīts pavērsiens, Jūs uzvarējāt! Apsveicu!'
  ],
  lose: [
    'Nākamreiz Tev noteikti paveiksies, vai arī nē!',
    'Vienmēr uzvarēt nevar, zaudējums arī ir rezultāts!',
    'Šī nebija Tava labākā spēle, varbūt pat sliktākā!'
  ],
  draw: [
    'Neizšķirts tomēr nav zaudējums! Bet nav arī uzvara!',
    'Ir uzvaras, ir zaudējumi, taču šeit ir neizšķirts!',
    'Izliksimies, ka neizšķirts nav bijis un mēģini vēlreiz!'
  ]
}

getNotificationMessage = (type) => notifications[type][Math.floor(Math.random() * notifications[type].length)]

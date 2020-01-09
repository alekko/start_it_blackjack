onload = () => $('#table').DataTable({
  language: {
    search:     'Meklēt:',
    lengthMenu: 'Parādīt _MENU_ ierakstus',
    info: 'Atrasti _START_ līdz _END_ no _TOTAL_ ierakstiem',
    infoEmpty: 'Atrasti 0',
    infoFiltered: '(Kopā _MAX_ ierakstu)',
    zeroRecords: 'Rezultāti netika atrasti',
    emptyTable: 'Tabula ir tukša',
    paginate: {
        first: 'Pirmais',
        previous: 'Iepriekšējais',
        next: 'Nākamais',
        last: 'Pēdējais'
    }
  }
})

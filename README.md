# IT Izglītības fonda - start(it) ietvaros izstrādāta spēle 'Blackjack', jeb 'Acīte'.

Sākums
----------

Pirms komandu izpildes nepieciešams uzstādīt vides mainīgos ``FLASK_APP`` un ``FLASK_DEBUG``:

Linux:
    export FLASK_APP=/path/to/app.py
    export FLASK_DEBUG=1

Windows CMD:
    set FLASK_APP=/path/to/app.py

Windows PowerShell:
    $env:FLASK_APP = /path/to/app.py

Veicam vides uzstādīšanu:

    cd start_it_blackjack
    pip3 install -r requirements.txt

Lai piedarbinātu lietotni izmantojam:

    flask run

Priekš shell
-----

Lai atvērtu interaktīvo shell:

    flask shell

Pēc noklusējuma pieejama lietotne ``app`` un modeļi.

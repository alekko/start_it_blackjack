# IT Izglītības fonda - start(it) ietvaros izstrādāta spēle 'Blackjack', jeb 'Acīte'.

Sākums
----------

Pirms komandu izpildes nepieciešams uzstādīt vides mainīgos ``FLASK_APP`` un ``FLASK_DEBUG``:

Linux/Macos:
    export FLASK_APP=/path/to/app.py
    export FLASK_DEBUG=1

Windows CMD:
    set FLASK_APP=/path/to/app.py
    set FLASK_DEBUG=1

Windows PowerShell:
    $env:FLASK_APP = /path/to/app.py
    $env:FLASK_DEBUG = 1

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

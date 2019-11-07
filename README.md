# IT Izglītības fonda - start(it) ietvaros izstrādāta spēle 'Blackjack', jeb 'Acīte'.

Sākums
----------

Pirms komandu izpildes nepieciešams uzstādīt vides mainīgos ``FLASK_APP`` un ``FLASK_DEBUG`` ::

    export FLASK_APP=/path/to/app.py
    export FLASK_DEBUG=1

Veicam vides uzstādīšanu ::

    cd start_it_blackjack
    pip3 install -r requirements.txt

Lai piedarbinātu lietotni izmantojam::

    flask run

Priekš shell
-----

Lai atvērtu interaktīvo shell, palaidiet ::

    flask shell

Pēc noklusējuma pieejama lietotne ``app`` un modeļi.

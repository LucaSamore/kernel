# Assignment 4: Medium-Fidelity Prototype

## Nome del progetto
**Nucleo**

## Prototipo selezionato
Abbiamo selezionato il paper prototype della **Web App** come direzione primaria, preferendola al concept della Mobile App.

### Motivazioni della scelta
La decisione deriva dall'analisi comparativa dei due prototipi svolta nell'Assignment 2, focalizzandosi sulla complessità dei task che il caregiver deve affrontare:

* **Supporto ai Task Complessi:** Come emerso dallo scenario "Check-up Diabete", la preparazione a visite specialistiche richiede la raccolta massiva e il filtraggio di documenti storici. Il prototipo Web offre lo spazio necessario per visualizzare griglie di documenti con *thumbnail* e metadati estesi, facilitando operazioni di *clustering* che su mobile risultavano macchinose e richiedevano eccessivo scroll.
* **Visualizzazione Dati e Trend:** Una *value proposition* chiave di Nucleo è trasformare i dati in "narrazioni evolutive". Durante i test, la visualizzazione dei trend di salute su Mobile è risultata "compressa e meno leggibile". La Web App, con la sua dashboard, permette di visualizzare i grafici e poter confrontare parametri clinici (es. colesterolo) per un'analisi approfondita in modo più intuitivo.
* **Gestione Centralizzata del Nucleo:** Il nostro obiettivo è superare la frammentazione degli account. L'interfaccia desktop supporta meglio la gestione simultanea di profili multipli e le operazioni amministrative "da scrivania" (es. gestione permessi, download referti), che rappresentano il carico cognitivo maggiore per i nostri utenti target.

### Strategia di migrazione delle funzionalità
Pur scartando l'architettura Mobile, abbiamo deciso di importare nella Web App il principio di **"Immediatezza Informativa"** che ne costituiva il punto di forza:  
**Widget:** Abbiamo integrato la logica dei widget del prototipo mobile nella sidebar destra della Web App. Questo permette all'utente di avere una visualizzazione immediata sui parametri vitali e/o sui prossimi appuntamenti appena effettuato il login, senza dover navigare nelle sottosezioni.

## 3. Link del prototipo
**Figma**: https://www.figma.com/design/2Kxn5tEYDuYKeH01EXiLmb/HCI---Medium-Prototype
import type { Tutorial } from '../components/tutorial/TutorialSystem.vue'

export const TUTORIALS: Tutorial[] = [
  {
    id: 'book-appointment',
    title: 'Come prenoto una visita?',
    description: 'Impara a prenotare una visita medica in pochi semplici passaggi',
    badge: {
      icon: '📅',
      color: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
      name: 'Prenotatore Esperto'
    },
    points: 100,
    steps: [
      {
        id: 'step-1',
        title: 'Prenota visita',
        description: 'Clicca sul pulsante "Prenota visita" per aprire il modulo di prenotazione',
        action: 'Tocca il pulsante "Prenota visita"',
        target: 'booking-button',
        imageHint: 'Pulsante blu nella sezione prenotazioni',
        completed: false
      },
      {
        id: 'step-2',
        title: 'Seleziona tipo visita',
        description: 'Scegli il tipo di visita dall\'elenco disponibile',
        action: 'Seleziona il tipo di visita desiderato',
        target: 'visit-type',
        imageHint: 'Lista delle visite disponibili',
        completed: false
      },
      {
        id: 'step-3',
        title: 'Scegli la data',
        description: 'Seleziona una data disponibile per la tua visita',
        action: 'Tocca una delle date disponibili',
        target: 'date-selector',
        imageHint: 'Calendario con date disponibili evidenziate',
        completed: false
      },
      {
        id: 'step-4',
        title: 'Scegli l\'orario',
        description: 'Seleziona l\'orario più comodo per te tra quelli disponibili',
        action: 'Tocca uno degli orari disponibili',
        target: 'time-selector',
        imageHint: 'Griglia con gli orari disponibili',
        completed: false
      },
      {
        id: 'step-5',
        title: 'Conferma prenotazione',
        description: 'Rivedi i dettagli e conferma la tua prenotazione',
        action: 'Tocca il pulsante "Conferma prenotazione"',
        target: 'confirm-booking',
        imageHint: 'Pulsante verde di conferma in fondo alla schermata',
        completed: false
      }
    ]
  },
  {
    id: 'upload-document',
    title: 'Come carico un documento?',
    description: 'Impara a caricare e organizzare i tuoi documenti sanitari',
    badge: {
      icon: '📄',
      color: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
      name: 'Archivista Pro'
    },
    points: 80,
    steps: [
      {
        id: 'doc-step-1',
        title: 'Vai ai Documenti',
        description: 'Tocca l\'icona Documenti nella barra di navigazione',
        action: 'Seleziona l\'icona Documenti',
        target: 'documents-tab',
        imageHint: 'Icona documenti nella barra inferiore',
        completed: false
      },
      {
        id: 'doc-step-2',
        title: 'Carica nuovo documento',
        description: 'Tocca il pulsante "+" per caricare un nuovo documento',
        action: 'Tocca il pulsante di caricamento',
        target: 'upload-button',
        imageHint: 'Pulsante "+" in alto a destra',
        completed: false
      },
      {
        id: 'doc-step-3',
        title: 'Seleziona il file',
        description: 'Scegli il documento da caricare dalla tua galleria o fotocamera',
        action: 'Seleziona il file da caricare',
        target: 'file-selector',
        imageHint: 'Menu di selezione file',
        completed: false
      },
      {
        id: 'doc-step-4',
        title: 'Aggiungi informazioni',
        description: 'Compila i dettagli del documento (data, tipo, medico)',
        action: 'Inserisci le informazioni richieste',
        target: 'document-info',
        imageHint: 'Form con i campi da compilare',
        completed: false
      },
      {
        id: 'doc-step-5',
        title: 'Conferma caricamento',
        description: 'Rivedi i dettagli e conferma il caricamento',
        action: 'Tocca "Conferma"',
        target: 'confirm-upload',
        imageHint: 'Pulsante di conferma',
        completed: false
      }
    ]
  },
  {
    id: 'customize-widgets',
    title: 'Come personalizzo i widget?',
    description: 'Scopri come personalizzare la tua dashboard con i widget più utili',
    badge: {
      icon: '⚙️',
      color: 'linear-gradient(135deg, #f59e0b, #f97316)',
      name: 'Customizer'
    },
    points: 60,
    steps: [
      {
        id: 'widget-step-1',
        title: 'Apri il selettore widget',
        description: 'Scorri fino alla sezione widget e tocca il pulsante "+"',
        action: 'Tocca il pulsante "+" nei widget',
        target: 'widget-add-button',
        imageHint: 'Pulsante "+" nella sezione "I miei widget"',
        completed: false
      },
      {
        id: 'widget-step-2',
        title: 'Scegli i widget',
        description: 'Seleziona i widget che vuoi visualizzare nella tua dashboard',
        action: 'Tocca i widget che desideri aggiungere',
        target: 'widget-selection',
        imageHint: 'Lista di widget disponibili',
        completed: false
      },
      {
        id: 'widget-step-3',
        title: 'Salva le modifiche',
        description: 'Conferma la selezione toccando "Salva"',
        action: 'Tocca il pulsante "Salva"',
        target: 'save-widgets',
        imageHint: 'Pulsante di salvataggio in alto',
        completed: false
      }
    ]
  },
  {
    id: 'monitor-health',
    title: 'Come monitoro la mia salute?',
    description: 'Impara a visualizzare e interpretare i tuoi parametri vitali',
    badge: {
      icon: '❤️',
      color: 'linear-gradient(135deg, #ec4899, #f43f5e)',
      name: 'Health Guardian'
    },
    points: 70,
    steps: [
      {
        id: 'health-step-1',
        title: 'Vai alla sezione Salute',
        description: 'Tocca l\'icona del cuore nella barra di navigazione',
        action: 'Seleziona l\'icona Salute',
        target: 'health-tab',
        imageHint: 'Icona cuore nella barra inferiore',
        completed: false
      },
      {
        id: 'health-step-2',
        title: 'Visualizza i parametri',
        description: 'Scorri per vedere tutti i tuoi parametri vitali',
        action: 'Esplora i parametri visualizzati',
        target: 'health-parameters',
        imageHint: 'Sezione con i parametri vitali',
        completed: false
      },
      {
        id: 'health-step-3',
        title: 'Controlla gli avvisi',
        description: 'Verifica se ci sono avvisi importanti sui tuoi valori',
        action: 'Leggi gli eventuali avvisi',
        target: 'health-alerts',
        imageHint: 'Sezione avvisi in alto',
        completed: false
      },
      {
        id: 'health-step-4',
        title: 'Esplora i grafici',
        description: 'Visualizza l\'andamento storico dei tuoi parametri',
        action: 'Scorri fino ai grafici storici',
        target: 'health-charts',
        imageHint: 'Sezione con i grafici di tendenza',
        completed: false
      }
    ]
  }
]

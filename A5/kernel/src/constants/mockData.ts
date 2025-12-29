import type { Document } from '../components/DocumentCard.vue'
import type { Appointment } from '../components/AppointmentCard.vue'

// Documenti centralizzati
export const MOCK_DOCUMENTS: Document[] = [
  {
    id: '1',
    title: 'Referto ECG - Controllo cardiologico',
    description: 'Elettrocardiogramma completo con esito nella norma. Ritmo sinusale regolare, frequenza cardiaca 72 bpm. Nessuna alterazione significativa riscontrata.',
    tags: ['Cardiologia', 'Esami'],
    date: '15 Dic 2024',
    doctor: 'Dr. Mario Rossi',
    hospital: 'Ospedale San Raffaele'
  },
  {
    id: '2',
    title: 'Esami del sangue - Emocromo completo',
    description: 'Analisi ematochimiche complete. Valori nella norma per globuli rossi, bianchi e piastrine. Glicemia 92 mg/dL, colesterolo totale 185 mg/dL.',
    tags: ['Analisi', 'Laboratorio'],
    date: '10 Dic 2024',
    doctor: 'Dr.ssa Laura Bianchi',
    hospital: 'Laboratorio Analisi Medicon'
  },
  {
    id: '3',
    title: 'Visita oculistica - Controllo vista',
    description: 'Esame della vista completo con valutazione del fondo oculare. Visus 10/10 occhio destro, 9/10 occhio sinistro. Prescrizione nuovi occhiali da vista.',
    tags: ['Oculistica', 'Visita'],
    date: '5 Dic 2024',
    doctor: 'Dr. Giuseppe Verdi',
    hospital: 'Centro Oculistico Vista Chiara'
  },
  {
    id: '4',
    title: 'Ecografia addominale completa',
    description: 'Esame ecografico dell\'addome superiore e inferiore. Fegato, milza, reni e vescica nella norma. Nessuna formazione patologica evidenziata.',
    tags: ['Diagnostica', 'Ecografia'],
    date: '28 Nov 2024',
    doctor: 'Dr. Antonio Ferrari',
    hospital: 'Centro Diagnostico San Marco'
  },
  {
    id: '5',
    title: 'Radiografia torace - RX standard',
    description: 'Radiografia del torace in 2 proiezioni. Polmoni ben espansi, non addensamenti parenchimali. Cuore di normali dimensioni. Esito negativo.',
    tags: ['Radiologia', 'Esami'],
    date: '20 Nov 2024',
    doctor: 'Dr.ssa Maria Colombo',
    hospital: 'Ospedale San Raffaele'
  },
  {
    id: '6',
    title: 'Visita dermatologica - Controllo nei',
    description: 'Mappatura completa dei nei con dermatoscopio digitale. Tutti i nevi esaminati presentano caratteristiche benigne. Consigliato controllo annuale.',
    tags: ['Dermatologia', 'Visita'],
    date: '12 Nov 2024',
    doctor: 'Dr. Francesco Russo',
    hospital: 'Centro Dermatologico Milano'
  },
  {
    id: '7',
    title: 'Esami funzionalità tiroidea - TSH, FT3, FT4',
    description: 'Dosaggio ormoni tiroidei. TSH 2.1 mU/L, FT3 3.2 pg/mL, FT4 1.1 ng/dL. Funzionalità tiroidea nella norma.',
    tags: ['Analisi', 'Endocrinologia'],
    date: '8 Nov 2024',
    doctor: 'Dr.ssa Laura Bianchi',
    hospital: 'Laboratorio Analisi Medicon'
  },
  {
    id: '8',
    title: 'Visita ortopedica - Dolore ginocchio',
    description: 'Valutazione clinica del ginocchio destro. Lieve condropatia rotulea. Consigliata fisioterapia e rinforzo muscolare quadricipite.',
    tags: ['Ortopedia', 'Visita'],
    date: '1 Nov 2024',
    doctor: 'Dr. Luca Moretti',
    hospital: 'Poliambulatorio Salute'
  }
]

// Appuntamenti centralizzati
export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    title: 'Visita cardiologica di controllo',
    description: 'Controllo annuale con ECG e misurazione pressione arteriosa',
    tags: ['Cardiologia', 'Controllo'],
    date: '13 Gen 2025',
    time: '15:30',
    user: 'Nonno Giulio',
    location: 'Ospedale San Raffaele'
  },
  {
    id: '2',
    title: 'Prelievo esami del sangue',
    description: 'Emocromo completo, glicemia, colesterolo e funzionalità epatica',
    tags: ['Analisi', 'Laboratorio'],
    date: '20 Gen 2025',
    time: '08:00',
    user: 'Marco',
    location: 'Laboratorio Analisi Medicon'
  },
  {
    id: '3',
    title: 'Seduta di fisioterapia',
    description: 'Trattamento riabilitativo ginocchio destro - 5° seduta',
    tags: ['Riabilitazione', 'Fisioterapia'],
    date: '27 Gen 2025',
    time: '16:30',
    user: 'Marco',
    location: 'Centro Fisioterapia Riabilita'
  },
  {
    id: '4',
    title: 'Visita pediatrica',
    description: 'Controllo di crescita e sviluppo con valutazione peso e altezza',
    tags: ['Pediatria', 'Controllo'],
    date: '1 Feb 2025',
    time: '10:00',
    user: 'Sofia',
    location: 'Ospedale Pediatrico Buzzi'
  },
  {
    id: '5',
    title: 'Ecografia addominale',
    description: 'Ecografia addome completo prescritto dal medico curante',
    tags: ['Diagnostica', 'Ecografia'],
    date: '5 Feb 2025',
    time: '14:00',
    user: 'Laura',
    location: 'Centro Diagnostico San Marco'
  },
  {
    id: '6',
    title: 'Visita oculistica - Controllo vista',
    description: 'Esame della vista completo con misurazione della pressione oculare',
    tags: ['Oculistica', 'Visita'],
    date: '10 Feb 2025',
    time: '11:00',
    user: 'Laura',
    location: 'Centro Oculistico Vista Chiara'
  }
]

// Funzione helper per ottenere gli ultimi N documenti
export const getRecentDocuments = (count: number = 3): Document[] => {
  return MOCK_DOCUMENTS.slice(0, count)
}

// Funzione helper per ottenere i prossimi N appuntamenti
export const getUpcomingAppointments = (count: number = 3): Appointment[] => {
  return MOCK_APPOINTMENTS.slice(0, count)
}

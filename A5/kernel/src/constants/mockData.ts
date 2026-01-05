import type { Document } from '../components/shared/DocumentCard.vue'
import type { Appointment } from '../components/bookingAppointment/AppointmentCard.vue'
import type { HealthParameter, HealthAlert, HealthMetricHistory } from '../types/health'

export interface SymptomSuggestion {
  id: string
  symptom: string
  keywords: string[]
  suggestedVisit: string
  visitType: string
  visitTypeId: string // ID matching VISIT_TYPES
  description: string
  urgency: 'low' | 'medium' | 'high'
  icon: string
}

// Intelligent search: symptom to visit mapping
export const SYMPTOM_SUGGESTIONS: SymptomSuggestion[] = [
  {
    id: 'back-pain',
    symptom: 'mal di schiena',
    keywords: ['schiena', 'lombare', 'dorsale', 'vertebrale', 'colonna'],
    suggestedVisit: 'Visita Ortopedica',
    visitType: 'Ortopedia',
    visitTypeId: 'orthopedics',
    description: 'Valutazione specialistica per dolore alla schiena e problemi vertebrali',
    urgency: 'medium',
    icon: '🦴'
  },
  {
    id: 'chest-pain',
    symptom: 'dolore al petto',
    keywords: ['petto', 'torace', 'cuore', 'cardiaco', 'oppressione'],
    suggestedVisit: 'Visita Cardiologica',
    visitType: 'Cardiologia',
    visitTypeId: 'cardiology',
    description: 'Controllo cardiologico per dolore toracico e problemi cardiaci',
    urgency: 'high',
    icon: '❤️'
  },
  {
    id: 'headache',
    symptom: 'mal di testa',
    keywords: ['testa', 'cefalea', 'emicrania', 'cranio'],
    suggestedVisit: 'Visita Neurologica',
    visitType: 'Neurologia',
    visitTypeId: 'neurology',
    description: 'Valutazione neurologica per mal di testa ricorrenti',
    urgency: 'medium',
    icon: '🧠'
  },
  {
    id: 'vision-problems',
    symptom: 'problemi di vista',
    keywords: ['vista', 'occhi', 'vedere', 'visione', 'oculare', 'miopia'],
    suggestedVisit: 'Visita Oculistica',
    visitType: 'Oculistica',
    visitTypeId: 'ophthalmology',
    description: 'Controllo della vista e valutazione oftalmologica',
    urgency: 'low',
    icon: '👁️'
  },
  {
    id: 'skin-issues',
    symptom: 'problemi alla pelle',
    keywords: ['pelle', 'derma', 'eruzione', 'prurito', 'macchie', 'nei'],
    suggestedVisit: 'Visita Dermatologica',
    visitType: 'Dermatologia',
    visitTypeId: 'dermatology',
    description: 'Controllo dermatologico per problemi cutanei',
    urgency: 'low',
    icon: '🔬'
  },
  {
    id: 'joint-pain',
    symptom: 'dolore alle articolazioni',
    keywords: ['articolazioni', 'ginocchio', 'anca', 'spalla', 'gomito', 'caviglia'],
    suggestedVisit: 'Visita Ortopedica',
    visitType: 'Ortopedia',
    visitTypeId: 'orthopedics',
    description: 'Valutazione ortopedica per dolori articolari',
    urgency: 'medium',
    icon: '🦴'
  },
  {
    id: 'breathing-issues',
    symptom: 'difficoltà respiratorie',
    keywords: ['respiro', 'respirare', 'polmoni', 'tosse', 'asma', 'affanno'],
    suggestedVisit: 'Visita Pneumologica',
    visitType: 'Pneumologia',
    visitTypeId: 'general',
    description: 'Valutazione pneumologica per problemi respiratori',
    urgency: 'high',
    icon: '🫁'
  },
  {
    id: 'stomach-pain',
    symptom: 'dolore allo stomaco',
    keywords: ['stomaco', 'pancia', 'addome', 'gastrico', 'digestione'],
    suggestedVisit: 'Visita Gastroenterologica',
    visitType: 'Gastroenterologia',    visitTypeId: 'general',    description: 'Consulto gastroenterologico per problemi digestivi',
    urgency: 'medium',
    icon: '🩺'
  }
]

// Documenti centralizzati
export const MOCK_DOCUMENTS: Document[] = [
  {
    id: '1',
    title: 'Referto ECG - Controllo cardiologico',
    description: 'Elettrocardiogramma completo con esito nella norma. Ritmo sinusale regolare, frequenza cardiaca 72 bpm. Nessuna alterazione significativa riscontrata.',
    tags: ['Cardiologia', 'Esami'],
    date: '7 Gen 2026',
    doctor: 'Dr. Mario Rossi',
    hospital: 'Ospedale San Raffaele'
  },
  {
    id: '2',
    title: 'Esami del sangue - Emocromo completo',
    description: 'Analisi ematochimiche complete. Valori nella norma per globuli rossi, bianchi e piastrine. Glicemia 92 mg/dL, colesterolo totale 185 mg/dL.',
    tags: ['Analisi', 'Laboratorio'],
    date: '29 Dic 2025',
    doctor: 'Dr.ssa Laura Bianchi',
    hospital: 'Laboratorio Analisi Medicon'
  },
  {
    id: 'prescription-1',
    title: 'Prescrizione farmaci - Antibiotico',
    description: 'Prescrizione medica per terapia antibiotica. Amoxicillina 1g, 3 volte al giorno per 7 giorni. Ritirare in farmacia.',
    tags: ['Prescrizione', 'Farmaci'],
    date: '27 Dic 2025',
    doctor: 'Dr. Mario Rossi',
    hospital: 'Ospedale San Raffaele',
    isPrescription: true,
    prescriptionCode: '8234567890123',
    expirationDays: 20,
  },
  {
    id: '3',
    title: 'Visita oculistica - Controllo vista',
    description: 'Esame della vista completo con valutazione del fondo oculare. Visus 10/10 occhio destro, 9/10 occhio sinistro. Prescrizione nuovi occhiali da vista.',
    tags: ['Oculistica', 'Visita'],
    date: '5 Nov 2025',
    doctor: 'Dr. Giuseppe Verdi',
    hospital: 'Centro Oculistico Vista Chiara'
  },
  {
    id: 'prescription-2',
    title: 'Prescrizione visita specialistica - Cardiologia',
    description: 'Richiesta visita cardiologica specialistica con ECG sotto sforzo. Prenotare entro 30 giorni.',
    tags: ['Prescrizione', 'Cardiologia'],
    date: '1 Nov 2025',
    doctor: 'Dr. Antonio Ferrari',
    hospital: 'Poliambulatorio Salute',
    isPrescription: true,
    prescriptionCode: '8234567890123',
    expirationDays: 20,
    usedDate : '10 Nov 2025'
  },
  {
    id: '4',
    title: 'Ecografia addominale completa',
    description: 'Esame ecografico dell\'addome superiore e inferiore. Fegato, milza, reni e vescica nella norma. Nessuna formazione patologica evidenziata.',
    tags: ['Diagnostica', 'Ecografia'],
    date: '28 Ott 2025',
    doctor: 'Dr. Antonio Ferrari',
    hospital: 'Centro Diagnostico San Marco'
  },
  {
    id: '5',
    title: 'Radiografia torace - RX standard',
    description: 'Radiografia del torace in 2 proiezioni. Polmoni ben espansi, non addensamenti parenchimali. Cuore di normali dimensioni. Esito negativo.',
    tags: ['Radiologia', 'Esami'],
    date: '20 Ott 2025',
    doctor: 'Dr.ssa Maria Colombo',
    hospital: 'Ospedale San Raffaele'
  },
  {
    id: 'prescription-3',
    title: 'Prescrizione esami del sangue',
    description: 'Richiesta esami ematochimici: emocromo, glicemia, profilo lipidico, funzionalità epatica e renale. Presentarsi a digiuno.',
    tags: ['Prescrizione', 'Analisi'],
    date: '20 Ott 2025',
    doctor: 'Dr.ssa Laura Bianchi',
    hospital: 'Laboratorio Analisi Medicon',
    isPrescription: true,
    prescriptionCode: '8234567890123',
    expirationDays: 20
  },
  {
    id: '6',
    title: 'Visita dermatologica - Controllo nei',
    description: 'Mappatura completa dei nei con dermatoscopio digitale. Tutti i nevi esaminati presentano caratteristiche benigne. Consigliato controllo annuale.',
    tags: ['Dermatologia', 'Visita'],
    date: '12 Ott 2025',
    doctor: 'Dr. Francesco Russo',
    hospital: 'Centro Dermatologico Milano'
  },
  {
    id: '7',
    title: 'Esami funzionalità tiroidea - TSH, FT3, FT4',
    description: 'Dosaggio ormoni tiroidei. TSH 2.1 mU/L, FT3 3.2 pg/mL, FT4 1.1 ng/dL. Funzionalità tiroidea nella norma.',
    tags: ['Analisi', 'Endocrinologia'],
    date: '8 Ott 2025',
    doctor: 'Dr.ssa Laura Bianchi',
    hospital: 'Laboratorio Analisi Medicon'
  },
  {
    id: '8',
    title: 'Visita ortopedica - Dolore ginocchio',
    description: 'Valutazione clinica del ginocchio destro. Lieve condropatia rotulea. Consigliata fisioterapia e rinforzo muscolare quadricipite.',
    tags: ['Ortopedia', 'Visita'],
    date: '1 Ott 2025',
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
    date: '13 Gen 2026',
    time: '15:30',
    user: 'Nonno Giulio',
    location: 'Ospedale San Raffaele'
  },
    {
    id: '16',
    title: 'Visita cardiologica di controllo',
    description: 'Controllo annuale con ECG e misurazione pressione arteriosa',
    tags: ['Cardiologia', 'Controllo'],
    date: '13 Gen 2026',
    time: '15:30',
    user: 'Nonno Giulio',
    location: 'Ospedale San Raffaele'
  },
  {
    id: '2',
    title: 'Prelievo esami del sangue',
    description: 'Emocromo completo, glicemia, colesterolo e funzionalità epatica',
    tags: ['Analisi', 'Laboratorio'],
    date: '20 Gen 2026',
    time: '08:00',
    user: 'Marco',
    location: 'Laboratorio Analisi Medicon'
  },
  {
    id: '3',
    title: 'Seduta di fisioterapia',
    description: 'Trattamento riabilitativo ginocchio destro - 5° seduta',
    tags: ['Riabilitazione', 'Fisioterapia'],
    date: '27 Gen 2026',
    time: '16:30',
    user: 'Marco',
    location: 'Centro Fisioterapia Riabilita'
  },
  {
    id: '4',
    title: 'Visita pediatrica',
    description: 'Controllo di crescita e sviluppo con valutazione peso e altezza',
    tags: ['Pediatria', 'Controllo'],
    date: '1 Feb 2026',
    time: '10:00',
    user: 'Sofia',
    location: 'Ospedale Pediatrico Buzzi'
  },
  {
    id: '5',
    title: 'Ecografia addominale',
    description: 'Ecografia addome completo prescritto dal medico curante',
    tags: ['Diagnostica', 'Ecografia'],
    date: '5 Feb 2026',
    time: '14:00',
    user: 'Laura',
    location: 'Centro Diagnostico San Marco'
  },
  {
    id: '6',
    title: 'Visita oculistica - Controllo vista',
    description: 'Esame della vista completo con misurazione della pressione oculare',
    tags: ['Oculistica', 'Visita'],
    date: '10 Feb 2026',
    time: '11:00',
    user: 'Laura',
    location: 'Centro Oculistico Vista Chiara'
  }
]

export const HEALTH_PARAMETERS: HealthParameter[] = [
  {
    id: 'cholesterol',
    name: 'Colesterolo',
    value: 185,
    unit: 'mg/dL',
    normalRange: { min: 120, max: 200 },
    trend: 'up',
    sourceDocuments: [
      {
        id: '2',
        title: 'Esami del sangue - Emocromo completo',
        date: '29 Dic 2025',
      },
      {
        id: '7',
        title: 'Esami funzionalità tiroidea - TSH, FT3, FT4',
        date: '8 Ott 2025',
      }
    ],
  },
  {
    id: 'blood-pressure-sys',
    name: 'Pressione sistolica',
    value: 120,
    unit: 'mmHg',
    normalRange: { min: 90, max: 120 },
    trend: 'stable',
    sourceDocuments: [
      {
        id: '1',
        title: 'Referto ECG - Controllo cardiologico',
        date: '7 Gen 2026',
      }
    ],
  },
  {
    id: 'blood-pressure-dia',
    name: 'Pressione diastolica',
    value: 80,
    unit: 'mmHg',
    normalRange: { min: 60, max: 80 },
    trend: 'stable',
    sourceDocuments: [
      {
        id: '1',
        title: 'Referto ECG - Controllo cardiologico',
        date: '7 Gen 2026',
      }
    ],
  },
  {
    id: 'heart-rate',
    name: 'Frequenza cardiaca',
    value: 72,
    unit: 'bpm',
    normalRange: { min: 60, max: 100 },
    trend: 'down',
    sourceDocuments: [
      {
        id: '1',
        title: 'Referto ECG - Controllo cardiologico',
        date: '7 Gen 2026',
      }
    ],
  },
  {
    id: 'glucose',
    name: 'Glicemia',
    value: 105,
    unit: 'mg/dL',
    normalRange: { min: 70, max: 100 },
    trend: 'up',
    sourceDocuments: [
      {
        id: '2',
        title: 'Esami del sangue - Emocromo completo',
        date: '29 Dic 2025',
      }
    ],
  },
  {
    id: 'oxygen',
    name: 'Saturazione O₂',
    value: 98,
    unit: '%',
    normalRange: { min: 95, max: 100 },
    trend: 'stable',
    sourceDocuments: [
      {
        id: '1',
        title: 'Referto ECG - Controllo cardiologico',
        date: '7 Gen 2026',
      }
    ],
  }
]

export const HEALTH_ALERTS: HealthAlert[] = [
  {
    id: 'alert-1',
    parameterId: 'glucose',
    parameterName: 'Glicemia leggermente elevata',
    severity: 'warning',
    message: 'Il tuo livello di glicemia è di 105 mg/dL, leggermente sopra il range ottimale.',
    recommendation: 'Riduci il consumo di zuccheri e carboidrati raffinati. Aumenta l\'attività fisica.',
  },
]

// Widget storico parametri salute
export const CHOLESTEROL_HISTORY: HealthMetricHistory = {
  parameterId: 'cholesterol',
  data: [
    { date: '1 Nov', value: 165 },
    { date: '8 Nov', value: 170 },
    { date: '15 Nov', value: 175 },
    { date: '22 Nov', value: 180 },
    { date: '29 Nov', value: 178 },
    { date: '6 Dic', value: 185 },
  ],
  sourceDocuments: [
    {
      id: '2',
      title: 'Esami del sangue - Emocromo completo',
      date: '29 Dic 2025',
    },
    {
      id: '7',
      title: 'Esami funzionalità tiroidea - TSH, FT3, FT4',
      date: '8 Ott 2025',
    }
  ],
}

export const BLOOD_PRESSURE_SYS_HISTORY: HealthMetricHistory = {
  parameterId: 'blood-pressure-sys',
  data: [
    { date: '1 Nov', value: 118 },
    { date: '8 Nov', value: 120 },
    { date: '15 Nov', value: 122 },
    { date: '22 Nov', value: 119 },
    { date: '29 Nov', value: 121 },
    { date: '6 Dic', value: 120 },
  ],
  sourceDocuments: [
    {
      id: '1',
      title: 'Referto ECG - Controllo cardiologico',
      date: '7 Gen 2026',
    }
  ],
}

export const HEART_RATE_HISTORY: HealthMetricHistory = {
  parameterId: 'heart-rate',
  data: [
    { date: '1 Nov', value: 78 },
    { date: '8 Nov', value: 76 },
    { date: '15 Nov', value: 75 },
    { date: '22 Nov', value: 74 },
    { date: '29 Nov', value: 73 },
    { date: '6 Dic', value: 72 },
  ],
  sourceDocuments: [
    {
      id: '1',
      title: 'Referto ECG - Controllo cardiologico',
      date: '7 Gen 2026',
    }
  ],
}

export const GLUCOSE_HISTORY: HealthMetricHistory = {
  parameterId: 'glucose',
  data: [
    { date: '1 Nov', value: 92 },
    { date: '8 Nov', value: 95 },
    { date: '15 Nov', value: 98 },
    { date: '22 Nov', value: 102 },
    { date: '29 Nov', value: 103 },
    { date: '6 Dic', value: 105 },
  ],
  sourceDocuments: [
    {
      id: '2',
      title: 'Esami del sangue - Emocromo completo',
      date: '29 Dic 2025',
    }
  ],
}

// Helper per ottenere un parametro specifico
export const getHealthParameter = (id: string): HealthParameter | undefined => {
  return HEALTH_PARAMETERS.find(p => p.id === id)
}

// Helper per ottenere lo storico di un parametro
export const getHealthHistory = (id: string): HealthMetricHistory | undefined => {
  const histories: Record<string, HealthMetricHistory> = {
    'cholesterol': CHOLESTEROL_HISTORY,
    'blood-pressure-sys': BLOOD_PRESSURE_SYS_HISTORY,
    'heart-rate': HEART_RATE_HISTORY,
    'glucose': GLUCOSE_HISTORY,
  }
  return histories[id]
}

// Dati widget aggiuntivi
export const WIDGET_DATA = {
  nextMedicationReminder: {
    medication: 'Vitamina D',
    time: '20:00',
    daysLeft: 0, // oggi
  },
  nextVaccine: {
    name: 'Antinfluenzale',
    date: '15 Gen 2025',
    daysLeft: 16,
  },
}

// Tipi di visite disponibili
export const VISIT_TYPES = [
  { id: 'cardiology', key: 'cardiology'},
  { id: 'dermatology', key: 'dermatology'},
  { id: 'general', key: 'general', icon: '⚕️' },
  { id: 'ophthalmology', key: 'ophthalmology'},
  { id: 'orthopedics', key: 'orthopedics'},
  { id: 'pediatrics', key: 'pediatrics'},
  { id: 'gynecology', key: 'gynecology'},
  { id: 'neurology', key: 'neurology'},
  { id: 'psychiatry', key: 'psychiatry'},
  { id: 'physiotherapy', key: 'physiotherapy'},
  { id: 'bloodTest', key: 'bloodTest'},
  { id: 'ecg', key: 'ecg'},
  { id: 'ultrasound', key: 'ultrasound'},
  { id: 'xray', key: 'xray'},
]

// Slot orari disponibili
export const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
]


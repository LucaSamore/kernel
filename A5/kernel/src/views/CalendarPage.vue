<script setup lang="ts">
import { ref, computed } from 'vue'
import { CalendarOptions, EventClickArg, DateSelectArg } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import TagBar, { type Tag } from '@/components/TagBar.vue'
import AppointmentCard, { type Appointment } from '@/components/AppointmentCard.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'

// Mock data - appuntamenti di esempio
const appointments = ref<Appointment[]>([
  {
    id: '1',
    title: 'Visita cardiologica',
    description: 'Controllo annuale dal cardiologo',
    tags: ['Salute', 'Cuore'],
    date: '13 Gen 2024',
    time: '15:30',
    doctor: 'Dr. Rossi',
    location: 'Ospedale San Marco'
  },
  {
    id: '2',
    title: 'Esami del sangue',
    description: 'Prelievo per emocromo completo',
    tags: ['Salute', 'Analisi'],
    date: '20 Gen 2024',
    time: '08:00',
    location: 'Laboratorio Medicon'
  },
  {
    id: '3',
    title: 'Fisioterapia',
    description: 'Seduta di fisioterapia',
    tags: ['Salute', 'Riabilitazione'],
    date: '27 Gen 2024',
    time: '16:30',
    doctor: 'Dr. Verdi',
    location: 'Centro Fisioterapia'
  },
  {
    id: '4',
    title: 'Visita pediatrica',
    description: 'Controllo di crescita bambino',
    tags: ['Salute', 'Pediatria'],
    date: '1 Feb 2024',
    time: '10:00',
    doctor: 'Dr. Bianchi',
    location: 'Ospedale Pediatrico'
  },
  {
    id: '5',
    title: 'Ecografia',
    description: 'Ecografia addominale',
    tags: ['Salute', 'Diagnostica'],
    date: '5 Feb 2024',
    time: '14:00',
    location: 'Centro Diagnostico'
  }
])

// Tags per la TagBar
const tags = ref<Tag[]>([
  { id: 'all', label: 'Tutti', count: appointments.value.length },
  { id: 'salute', label: 'Salute', count: 5 },
  { id: 'lavoro', label: 'Lavoro', count: 0 },
  { id: 'famiglia', label: 'Famiglia', count: 0 }
])

const selectedTag = ref('all')
const selectedAppointmentId = ref<string | null>(null)

// Eventi per FullCalendar
const calendarEvents = computed(() => {
  return appointments.value.map(apt => ({
    id: apt.id,
    title: apt.title,
    date: parseDateToISO(apt.date),
    backgroundColor: selectedAppointmentId.value === apt.id ? '#000' : '#3b82f6',
    borderColor: selectedAppointmentId.value === apt.id ? '#000' : '#3b82f6'
  }))
})

// Configurazione FullCalendar
const calendarOptions = ref<CalendarOptions>({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  locale: 'it',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,dayGridWeek'
  },
  events: calendarEvents.value,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  eventClick: handleEventClick,
  select: handleDateSelect,
  height: 'auto'
})

// Appuntamenti filtrati per tag
const filteredAppointments = computed(() => {
  if (selectedTag.value === 'all') {
    return appointments.value
  }
  return appointments.value.filter(apt => 
    apt.tags?.some(tag => tag.toLowerCase() === selectedTag.value.toLowerCase())
  )
})

function handleTagSelected(tagId: string) {
  selectedTag.value = tagId
}

function handleEventClick(clickInfo: EventClickArg) {
  selectedAppointmentId.value = clickInfo.event.id
  
  // Scroll verso l'appuntamento nella lista (solo su desktop)
  if (window.innerWidth >= 768) {
    const element = document.getElementById(`appointment-${clickInfo.event.id}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }
}

function handleDateSelect(selectInfo: DateSelectArg) {
  // Qui potresti aprire un dialog per creare un nuovo appuntamento
  console.log('Selected date range:', selectInfo.startStr, 'to', selectInfo.endStr)
}

function handleAppointmentClick(id: string) {
  selectedAppointmentId.value = id
}

function handleNewAppointment() {
  // Implementare apertura dialog per nuovo appuntamento
  console.log('Nuovo appuntamento')
}

// Helper per convertire la data in formato ISO
function parseDateToISO(dateString: string): string {
  // Mappa per i mesi italiani abbreviati
  const monthMap: { [key: string]: number } = {
    'Gen': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'Mag': 4, 'Giu': 5,
    'Lug': 6, 'Ago': 7, 'Set': 8, 'Ott': 9, 'Nov': 10, 'Dic': 11
  }
  
  const parts = dateString.split(' ')
  if (parts.length === 3) {
    const day = parseInt(parts[0])
    const month = monthMap[parts[1]]
    const year = parseInt(parts[2])
    
    if (!isNaN(day) && month !== undefined && !isNaN(year)) {
      const date = new Date(year, month, day)
      return date.toISOString().split('T')[0]
    }
  }
  
  return new Date().toISOString().split('T')[0]
}
</script>

<template>
  <div class="calendar-page">
    <!-- Header Section -->
    <div class="header-section">
      <div class="header-content">
        <div>
          <h1 class="page-title">Calendario</h1>
          <p class="page-subtitle">Calendario condiviso della tua famiglia</p>
        </div>
        <button class="new-appointment-btn" @click="handleNewAppointment">
          <PlusIcon class="w-5 h-5" />
          Nuovo appuntamento
        </button>
      </div>
    </div>

    <!-- Tag Bar -->
    <div class="tag-bar-container">
      <TagBar :tags="tags" @tag-selected="handleTagSelected" />
    </div>

    <!-- Calendar and Appointments Section -->
    <div class="content-section">
      <!-- Calendar -->
      <div class="calendar-container">
        <FullCalendar :options="{ ...calendarOptions, events: calendarEvents }" />
      </div>

      <!-- Appointments List -->
      <div class="appointments-container">
        <h2 class="appointments-title">Appuntamenti</h2>
        <div class="appointments-list">
          <AppointmentCard
            v-for="appointment in filteredAppointments"
            :id="`appointment-${appointment.id}`"
            :key="appointment.id"
            :appointment="appointment"
            :selected="selectedAppointmentId === appointment.id"
            @click="handleAppointmentClick"
          />
          
          <div v-if="filteredAppointments.length === 0" class="empty-state">
            <p class="text-gray-500">Nessun appuntamento trovato</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding: 2rem;
  background: linear-gradient(135deg, #e0f2fe 0%, #ddd6fe 50%, #fce7f3 100%);
  position: relative;
}

.calendar-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(14, 165, 233, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.2) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.header-section {
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  animation: slideInDown 0.5s cubic-bezier(0, 0, 0.2, 1);
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #171717;
  margin: 0;
  line-height: 1.25;
}

.page-subtitle {
  font-size: 1rem;
  color: #525252;
  margin-top: 0.5rem;
  line-height: 1.5;
}

.new-appointment-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(12px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  white-space: nowrap;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.new-appointment-btn:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
}

.tag-bar-container {
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  animation: fadeIn 0.5s cubic-bezier(0, 0, 0.2, 1);
  animation-delay: 0.1s;
  animation-fill-mode: both;
}

.content-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  flex: 1;
  overflow: hidden;
  position: relative;
  z-index: 1;
  animation: fadeIn 0.5s cubic-bezier(0, 0, 0.2, 1);
  animation-delay: 0.2s;
  animation-fill-mode: both;
}

.calendar-container {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
  overflow: auto;
  box-shadow: 0 0.5rem 1.875rem rgba(0, 0, 0, 0.08);
}

.appointments-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.appointments-container:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.appointments-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #171717;
  margin-bottom: 1rem;
  line-height: 1.25;
}

.appointments-list {
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5rem;
}

/* Scrollbar personalizzata */
.appointments-list::-webkit-scrollbar {
  width: 8px;
}

.appointments-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.appointments-list::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  backdrop-filter: blur(8px);
}

.appointments-list::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  color: #525252;
}

/* FullCalendar customization */
:deep(.fc) {
  font-family: inherit;
}

:deep(.fc-button) {
  background-color: #000 !important;
  border-color: #000 !important;
  text-transform: capitalize;
}

:deep(.fc-button:hover) {
  background-color: #1f2937 !important;
}

:deep(.fc-button-active) {
  background-color: #1f2937 !important;
}

:deep(.fc-daygrid-day-number) {
  color: #374151;
  font-weight: 500;
}

:deep(.fc-col-header-cell-cushion) {
  color: #111827;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
}

:deep(.fc-event) {
  cursor: pointer;
}

:deep(.fc-daygrid-day.fc-day-today) {
  background-color: #fef3c7 !important;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .calendar-page {
    padding: 1rem;
  }

  .header-content {
    flex-direction: column;
    align-items: stretch;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .new-appointment-btn {
    justify-content: center;
  }

  .content-section {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    overflow-y: auto;
  }

  .calendar-container,
  .appointments-container {
    overflow: visible;
  }

  .appointments-list {
    overflow: visible;
  }
}

@media (max-width: 640px) {
  .calendar-page {
    padding: 0.75rem;
  }

  .page-title {
    font-size: 1.25rem;
  }

  .page-subtitle {
    font-size: 0.875rem;
  }

  .new-appointment-btn {
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
  }

  .calendar-container {
    padding: 1rem;
  }

  .appointments-title {
    font-size: 1.25rem;
  }
}
</style>

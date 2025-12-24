<script setup lang="ts">
import { ref } from 'vue'
import SearchBar from '../components/SearchBar.vue'
import QuickActions from '../components/QuickActions.vue'
import UpcomingAppointments from '../components/UpcomingAppointments.vue'
import DocumentCard from '../components/DocumentCard.vue'
import WidgetPanel from '../components/WidgetPanel.vue'
import type { Appointment } from '../components/AppointmentCard.vue'
import type { Document } from '../components/DocumentCard.vue'

const searchQuery = ref('')
const appointments = ref<Appointment[]>([
  {
    id: '1',
    title: 'Visita cardiologica',
    description: 'Controllo annuale',
    date: '28 Dicembre 2025',
    time: '10:30',
    user: 'Marco',
    location: 'Ospedale San Raffaele',
    tags: ['Cardiologia', 'Controllo']
  },
  {
    id: '2',
    title: 'Analisi del sangue',
    description: 'Esami di routine',
    date: '5 Gennaio 2026',
    time: '08:00',
    user: 'Luca',
    location: 'Laboratorio Centrale',
    tags: ['Analisi']
  }
])
const recentDocuments = ref<Document[]>([
  {
    id: '1',
    title: 'Referto visita cardiologica',
    description: 'Esito positivo. Cuore in buone condizioni, nessuna anomalia rilevata.',
    date: '15 Dicembre 2025',
    doctor: 'Dr. Rossi',
    hospital: 'Ospedale San Raffaele',
    tags: ['Cardiologia', 'Referto']
  },
  {
    id: '2',
    title: 'Esami del sangue - Controllo trimestrale',
    description: 'Valori nella norma. Colesterolo leggermente alto, continuare dieta.',
    date: '10 Dicembre 2025',
    doctor: 'Dr. Bianchi',
    hospital: 'Laboratorio Centrale',
    tags: ['Analisi', 'Sangue']
  }
])

const handleSearch = (query: string) => {
  searchQuery.value = query
  console.log('Searching for:', query)
}
const handleUpload = () => {
  console.log('Upload document')
}

const handleNewAppointment = () => {
  console.log('Create new appointment')
}
const handleAppointmentClick = (id: string) => {
  console.log('Appointment clicked:', id)
}
</script>

<template>
  <div class="home-page">
    <div class="content-grid">
      <div class="main-column">
        <div class="section-card space-y-3">
          <SearchBar @search="handleSearch" />
          <p class="text-xs text-gray-500 font-hand text-center">
            {{ $t('home.searchHint') }}
          </p>
        </div>

        <div class="section-card">
          <QuickActions 
            @upload="handleUpload"
            @new-appointment="handleNewAppointment"
          />
        </div>

        <div class="section-card">
          <UpcomingAppointments 
            :appointments="appointments"
            @appointment-click="handleAppointmentClick"
          />
        </div>

        <div class="section-card space-y-3">
          <h3 class="font-hand text-2xl">{{ $t('home.recentDocuments') }}</h3>
          <div class>
            <DocumentCard
              v-for="doc in recentDocuments.slice(0, 2)"
              :key="doc.id"
              :document="doc"
            />
          </div>
        </div>
      </div>

      <div class="widget-column">
        <div class="widget-card">
          <WidgetPanel />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 100%;
  padding: 1.5rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 20rem;
  gap: 1.5rem;
  width: 100%;
  align-items: start;
}

.main-column {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.section-card {
  padding: 1.25rem;
}

.widget-column {
  display: block;
}

.widget-card {
  position: sticky;
  margin-top: 1.65rem;
}

.font-hand {
  font-family: 'Comic Sans MS', cursive, sans-serif;
}

@media (min-width: 1024px) {
  .widget-column {
    display: block;
  }
}

@media (max-width: 1023px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .widget-card {
    position: static;
  }
}

@media (max-width: 768px) {
  .home-page {
    padding: 1rem;
  }

  .section-card {
    padding: 1rem;
  }
}
</style>

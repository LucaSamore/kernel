<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { XMarkIcon, DocumentPlusIcon, PlusIcon } from '@heroicons/vue/24/outline'
import SearchBar from '../shared/SearchBar.vue'
import UpcomingAppointments from '../bookingAppointment/UpcomingAppointments.vue'
import DocumentCard from '../shared/DocumentCard.vue'
import AppointmentBooking from '../bookingAppointment/AppointmentBooking.vue'
import WidgetPanel from '../widgets/WidgetPanel.vue'
import { MOCK_APPOINTMENTS, MOCK_DOCUMENTS } from '../../constants/mockData'
import type { TutorialStep } from './TutorialSystem.vue'
import type { Document } from '../shared/DocumentCard.vue'

const { t } = useI18n()

const props = defineProps<{
  currentStep: TutorialStep | null
  tutorialId: string
}>()

const emit = defineEmits<{
  actionCompleted: []
  close: []
}>()

// State
const searchQuery = ref('')
const showBookingModal = ref(false)
const appointments = computed(() => MOCK_APPOINTMENTS.slice(0, 2))
const recentDocuments = computed(() => MOCK_DOCUMENTS.slice(0, 2))

// Handlers
const handleSearch = (query: string) => {
  searchQuery.value = query
  if (props.currentStep?.target === 'search-input' && query.length > 0) {
    emit('actionCompleted')
  }
}

const handleUpload = () => {
  console.log('Tutorial: upload document')
}

const handleNewAppointment = () => {
  showBookingModal.value = true
  if (props.currentStep?.target === 'booking-button') {
    emit('actionCompleted')
  }
}

const handleAppointmentClick = (id: string) => {
  console.log('Tutorial: appointment clicked', id)
}

const handleDocumentClick = (document: Document) => {
  console.log('Tutorial: document clicked', document.id)
}

// Tutorial event handlers for AppointmentBooking
const handleTutorialVisitSelected = () => {
  if (props.currentStep?.target === 'visit-type') {
    emit('actionCompleted')
  }
}

const handleTutorialDateSelected = () => {
  if (props.currentStep?.target === 'date-selector') {
    emit('actionCompleted')
  }
}

const handleTutorialTimeSelected = () => {
  if (props.currentStep?.target === 'time-selector') {
    emit('actionCompleted')
  }
}

const handleTutorialConfirmed = () => {
  if (props.currentStep?.target === 'confirm-booking') {
    emit('actionCompleted')
    // Chiudi l'ambiente virtuale dopo breve delay
    setTimeout(() => {
      emit('close')
    }, 1000)
  }
}

const handleBookingClose = () => {
  showBookingModal.value = false
}

const handleBookingConfirm = (appointment: any) => {
  console.log('Tutorial: booking confirmed', appointment)
  showBookingModal.value = false
}

// Highlight logic
const shouldHighlight = (target: string) => {
  return props.currentStep?.target === target
}

// Watch per aggiungere classe CSS agli elementi nel modal quando viene aperto
watch(showBookingModal, (isOpen) => {
  if (isOpen && props.currentStep) {
    // Aspetta che il modal sia renderizzato, poi prova più volte
    let attempts = 0
    const maxAttempts = 10
    
    const tryApplyHighlight = () => {
      applyHighlightToCurrentStep()
      attempts++
      
      // Se non ha trovato l'elemento, riprova dopo un po'
      const hasHighlight = document.querySelector('.tutorial-highlighted')
      if (!hasHighlight && attempts < maxAttempts) {
        setTimeout(tryApplyHighlight, 200)
      }
    }
    
    setTimeout(tryApplyHighlight, 300)
  } else {
    // Rimuovi tutte le classi highlight quando chiudi il modal
    removeAllHighlights()
  }
})

// Funzione per applicare highlight allo step corrente
const applyHighlightToCurrentStep = () => {
  if (!props.currentStep) return
  
  removeAllHighlights()
  
  const target = props.currentStep.target
  console.log('[Tutorial] Applying highlight to:', target)
  
  let element: Element | null = null
  
  // Selettori più robusti basati sulla struttura DOM reale
  if (target === 'visit-type') {
    // Cerca il container del visit type selector
    element = document.querySelector('.visit-type-selector') || 
              document.querySelector('[class*="visit"]')
    console.log('[Tutorial] Visit type element:', element)
  } else if (target === 'date-selector') {
    // Cerca il container delle date - prova vari selettori
    element = document.querySelector('.date-selector')
    if (!element) {
      const datesGrid = document.querySelector('.dates-grid')
      element = datesGrid?.parentElement || null
    }
    console.log('[Tutorial] Date selector element:', element)
  } else if (target === 'time-selector') {
    // Cerca il container degli orari
    element = document.querySelector('.time-slot-selector')
    if (!element) {
      const timesGrid = document.querySelector('.times-grid')
      element = timesGrid?.parentElement || null
    }
    console.log('[Tutorial] Time selector element:', element)
  } else if (target === 'confirm-booking') {
    // Cerca il footer del modal con i bottoni
    const modalFooter = document.querySelector('.modal-footer')
    element = modalFooter?.querySelector('.button-primary') || null
    console.log('[Tutorial] Confirm button element:', element)
  }
  
  if (element) {
    element.classList.add('tutorial-highlighted')
    console.log('[Tutorial] ✓ Highlight applied successfully')
  } else {
    console.warn('[Tutorial] ✗ Element not found for target:', target)
  }
}

// Funzione per rimuovere tutti gli highlight
const removeAllHighlights = () => {
  document.querySelectorAll('.tutorial-highlighted').forEach(el => {
    el.classList.remove('tutorial-highlighted')
  })
}

// Cleanup highlight quando cambia step
watch(() => props.currentStep, () => {
  // Rimuovi highlight precedenti e applica quello nuovo
  setTimeout(() => {
    applyHighlightToCurrentStep()
  }, 100)
})
</script>

<template>
  <div class="virtual-environment">
    <!-- Close button -->
    <button 
      class="close-virtual-button" 
      @click="$emit('close')" 
      :aria-label="t('tutorial.close')"
    >
      <XMarkIcon class="w-6 h-6" />
    </button>

    <!-- Simulated browser window -->
    <div class="browser-window">
      <!-- Browser chrome -->
      <div class="browser-chrome">
        <div class="browser-controls">
          <span class="browser-dot red"></span>
          <span class="browser-dot yellow"></span>
          <span class="browser-dot green"></span>
        </div>
        <div class="browser-address-bar">
          <span class="lock-icon">🔒</span>
          <span class="address-text">app.nucleo.health</span>
        </div>
        <div class="browser-actions"></div>
      </div>

      <!-- Web app content -->
      <div class="web-app-container">

        <!-- HomePage content wrapper con background -->
        <div class="home-page-wrapper">
          <div class="content-grid">
            <div class="main-column">
              <!-- Search Section -->
              <div 
                :class="['section-card space-y-3', { 'highlighted': shouldHighlight('search-bar') || shouldHighlight('search-input') }]"
              >
                <SearchBar @search="handleSearch" />
                <p class="search-hint">
                  {{ t('home.searchHint') }}
                </p>
              </div>

              <!-- Quick Actions -->
              <div class="quick-actions">
                <div class="flex gap-4">
                  <button 
                    @click="handleUpload"
                    class="quick-action-btn flex-1"
                  >
                    <DocumentPlusIcon class="w-5 h-5" />
                    <span>{{ t('home.uploadDocument') }}</span>
                  </button>
                  <button 
                    @click="handleNewAppointment"
                    :class="['quick-action-btn flex-1', { 'highlighted': shouldHighlight('booking-button') }]"
                  >
                    <PlusIcon class="w-5 h-5" />
                    <span>{{ t('home.newAppointment') }}</span>
                  </button>
                </div>
              </div>

              <!-- Upcoming Appointments -->
              <div class="section-card">
                <h3 class="section-title">{{ t('home.upcomingAppointments') }}</h3>
                <UpcomingAppointments 
                  :appointments="appointments"
                  @appointment-click="handleAppointmentClick"
                />
              </div>

              <!-- Recent Documents -->
              <div class="section-card space-y-3">
                <h3 class="font-hand font-semibold text-2xl">{{ t('home.recentDocuments') }}</h3>
                <div>
                  <DocumentCard
                    v-for="doc in recentDocuments"
                    :key="doc.id"
                    :document="doc"
                    @click="handleDocumentClick(doc)"
                  />
                </div>
              </div>
            </div>

            <!-- Widget Panel -->
            <div class="widget-column">
              <div class="widget-card">
                <WidgetPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Appointment Booking Modal - con tutorial mode e no blur -->
    <Teleport to="body">
      <AppointmentBooking
        :is-open="showBookingModal"
        :tutorial-mode="true"
        :no-blur="true"
        @close="handleBookingClose"
        @confirm="handleBookingConfirm"
        @tutorial:visit-selected="handleTutorialVisitSelected"
        @tutorial:date-selected="handleTutorialDateSelected"
        @tutorial:time-selected="handleTutorialTimeSelected"
        @tutorial:confirmed="handleTutorialConfirmed"
      />
    </Teleport>

    <!-- Virtual environment indicator -->
    <div class="virtual-badge">
      <span class="virtual-icon">🎮</span>
      <span class="virtual-text">{{ t('tutorial.virtualMode') }}</span>
    </div>
  </div>
</template>

<style scoped>
.virtual-environment {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  position: relative;
}

.close-virtual-button {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #525252;
  transition: all 0.2s;
  z-index: 800;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.close-virtual-button:hover {
  background: white;
  transform: scale(1.1);
  color: #171717;
}

/* Browser Window Simulation */
.browser-window {
  width: 90%;
  max-width: 1200px;
  height: 85vh;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 
    0 0 0 1px rgba(0, 0, 0, 0.1),
    0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.4s cubic-bezier(0, 0, 0.2, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.browser-chrome {
  height: 3rem;
  background: linear-gradient(180deg, #f5f5f5 0%, #e8e8e8 100%);
  border-bottom: 1px solid #d0d0d0;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  gap: 1rem;
  flex-shrink: 0;
}

.browser-controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.browser-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.browser-dot.red { background: #ff5f57; }
.browser-dot.yellow { background: #ffbd2e; }
.browser-dot.green { background: #28ca42; }

.browser-address-bar {
  flex: 1;
  height: 1.75rem;
  background: white;
  border: 1px solid #d0d0d0;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: #525252;
}

.lock-icon {
  font-size: 0.875rem;
}

.address-text {
  font-weight: 500;
  color: #171717;
}

.browser-actions {
  width: 100px;
}

/* Web App Container */
.web-app-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: white;
}

.virtual-topbar {
  height: 70px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.topbar-title {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Wrapper per HomePage - AGGIUNGI BACKGROUND */
.home-page-wrapper {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: linear-gradient(135deg, #e0f2fe 0%, #ddd6fe 50%, #fce7f3 100%);
  position: relative;
}

.home-page-wrapper::before {
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
}

/* Layout styles - mantengono posizione relativa per z-index */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 20rem;
  gap: 1.5rem;
  padding: 1.5rem;
  align-items: start;
  position: relative;
  z-index: 1;
}

.main-column {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.widget-column {
  display: block;
}

.widget-card {
  position: sticky;
  top: 1.65rem;
}

.section-card {
  padding: 1.25rem;
}

.space-y-3 > * + * {
  margin-top: 0.75rem;
}

.quick-actions {
  margin: 1rem;
}

.flex {
  display: flex;
}

.gap-4 {
  gap: 1rem;
}

.flex-1 {
  flex: 1;
}

.search-hint {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #737373;
  text-align: center;
}

.quick-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.25rem;
  border-radius: 0.75rem;
  color: #171717;
  font-size: 0.875rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.quick-action-btn:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.section-title {
  font-weight: 600;
  font-size: 1.5rem;
  color: #525252;
}

.font-hand {
  font-family: 'Comic Sans MS', cursive;
}

.font-semibold {
  font-weight: 600;
}

.text-2xl {
  font-size: 1.5rem;
}

/* Highlight animation - funziona sia nella home che nel modal */
.highlighted {
  animation: pulse-highlight 2s infinite;
  position: relative;
  z-index: 10;
}

/* Classe globale per highlight nel modal (teleportato) */
:global(.tutorial-highlighted) {
  animation: pulse-highlight 2s infinite !important;
  position: relative !important;
  z-index: 100 !important;
}

@keyframes pulse-highlight {
  0%, 100% {
    box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.5);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(14, 165, 233, 0.3);
  }
}

/* Virtual Badge */
.virtual-badge {
  position: absolute;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  background: rgba(139, 92, 246, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.4);
  z-index: 10000;
}

.virtual-icon {
  font-size: 1.25rem;
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
  .virtual-environment {
    padding: 1rem;
  }

  .browser-window {
    width: 100%;
    height: 90vh;
  }

  .content-grid {
    padding: 1rem;
  }

  .close-virtual-button {
    top: 0.75rem;
    right: 0.75rem;
    width: 2.5rem;
    height: 2.5rem;
  }

  .virtual-badge {
    top: 0.75rem;
  }
}
</style>
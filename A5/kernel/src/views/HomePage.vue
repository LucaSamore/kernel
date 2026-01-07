<script setup lang="ts">
import { ref, computed } from 'vue'
import { DocumentPlusIcon, PlusIcon } from '@heroicons/vue/24/outline'
import SearchBar from '../components/shared/SearchBar.vue'
import SearchSuggestionCard from '../components/shared/SearchSuggestionCard.vue'
import Toast from '../components/shared/Toast.vue'
import UpcomingAppointments from '../components/bookingAppointment/UpcomingAppointments.vue'
import DocumentCard from '../components/shared/DocumentCard.vue'
import DocumentModal from '../components/documents/DocumentModal.vue'
import WidgetPanel from '../components/widgets/WidgetPanel.vue'
import AppointmentBooking from '../components/bookingAppointment/AppointmentBooking.vue'
import { MOCK_DOCUMENTS, MOCK_APPOINTMENTS, SYMPTOM_SUGGESTIONS } from '../constants/mockData'
import { COLORS } from '../constants/constants'
import type { Document } from '../components/shared/DocumentCard.vue'
import type { SymptomSuggestion } from '../constants/mockData'

const searchQuery = ref('')
const appointments = computed(() => MOCK_APPOINTMENTS.slice(0, 2))
const recentDocuments = computed(() => MOCK_DOCUMENTS.slice(0, 2))
const isBookingOpen = ref(false)
const selectedDocument = ref<Document | null>(null)
const isDocumentModalOpen = ref(false)
const preselectedVisitType = ref<string | null>(null)
const showSuccessToast = ref(false)

// Intelligent search suggestions (multiple results)
const searchSuggestions = computed<SymptomSuggestion[]>(() => {
  if (!searchQuery.value || searchQuery.value.length < 3) return []
  
  const query = searchQuery.value.toLowerCase().trim()
  
  // Find all matching suggestions based on keywords
  return SYMPTOM_SUGGESTIONS.filter(suggestion => 
    suggestion.keywords.some(keyword => query.includes(keyword)) ||
    suggestion.symptom.toLowerCase().includes(query)
  )
})

const handleSearch = (query: string) => {
  searchQuery.value = query
}

const handleUpload = () => {
  console.log('Upload document')
}

const handleNewAppointment = () => {
  preselectedVisitType.value = null
  isBookingOpen.value = true
}

const handleSuggestionBooking = (suggestion: SymptomSuggestion) => {
  // Open booking modal with pre-filled visit type
  preselectedVisitType.value = suggestion.visitTypeId
  isBookingOpen.value = true
}

const handleAppointmentClick = (id: string) => {
  console.log('Appointment clicked:', id)
}

const handleBookingConfirm = (appointment: any) => {
  console.log('Appointment booked:', appointment)
  showSuccessToast.value = true
}

const handleDocumentClick = (document: Document) => {
  selectedDocument.value = document
  isDocumentModalOpen.value = true
}

const handleCloseDocumentModal = () => {
  isDocumentModalOpen.value = false
  setTimeout(() => {
    selectedDocument.value = null
  }, 300)
}

const handleCloseToast = () => {
  showSuccessToast.value = false
}
</script>

<template>
  <div class="home-page">
    <div class="content-grid">
      <div class="main-column">
        <div class="section-card space-y-3">
          <SearchBar @search="handleSearch" />
          <p class="search-hint text-xs text-gray-500 font-hand text-center">
            {{ $t('home.searchHint') }}
          </p>
        </div>

        <!-- Intelligent Search Suggestions (Multiple Results) -->
        <div v-if="searchSuggestions.length > 0" class="search-suggestions-wrapper">
          <SearchSuggestionCard 
            v-for="suggestion in searchSuggestions"
            :key="suggestion.id"
            :suggestion="suggestion"
            @book-appointment="handleSuggestionBooking"
          />
        </div>

        <div class="quick-actions">
          <div class="flex gap-4">
            <button 
              @click="handleUpload"
              class="quick-action-btn flex-1"
            >
              <DocumentPlusIcon class="w-5 h-5" />
              <span>{{ $t('home.uploadDocument') }}</span>
            </button>
            <button 
              @click="handleNewAppointment"
              class="quick-action-btn flex-1"
            >
              <PlusIcon class="w-5 h-5" />
              <span>{{ $t('home.newAppointment') }}</span>
            </button>
          </div>
        </div>

        <div class="section-card">
          <h3 class="font-hand font-semibold text-2xl">{{ $t('home.upcomingAppointments') }}</h3>
          <UpcomingAppointments 
            :appointments="appointments"
            @appointment-click="handleAppointmentClick"
          />
        </div>

        <div class="section-card space-y-3">
          <h3 class="font-hand font-semibold text-2xl">{{ $t('home.recentDocuments') }}</h3>
          <div class>
            <DocumentCard
              v-for="doc in recentDocuments.slice(0, 2)"
              :key="doc.id"
              :document="doc"
              @click="handleDocumentClick(doc)"
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

    <!-- Appointment Booking Modal -->
    <AppointmentBooking
      :is-open="isBookingOpen"
      :preselected-visit="preselectedVisitType"
      @close="isBookingOpen = false"
      @confirm="handleBookingConfirm"
    />

  <!-- Document Modal (Teleported to body) -->
  <Teleport to="body">
    <DocumentModal
      :document="selectedDocument"
      :is-open="isDocumentModalOpen"
      @close="handleCloseDocumentModal"
    />
  </Teleport>

  <!-- Success Toast -->
  <Toast
    :show="showSuccessToast"
    message="Prenotazione confermata con successo!"
    :duration="4000"
    @close="handleCloseToast"
  />
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 100%;
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--bg-gradient-start) 0%, var(--bg-gradient-mid) 50%, var(--bg-gradient-end) 100%);
  position: relative;
}

.home-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, var(--sky-0ea5e9-20) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, var(--purple-a855f7-20) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 20rem;
  gap: 1.5rem;
  width: 100%;
  align-items: start;
  position: relative;
  z-index: 1;
}

.search-hint {
  margin-top: 0.5rem;
}

.search-suggestions-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem;
  animation: fadeIn 0.4s cubic-bezier(0, 0, 0.2, 1);
}

.main-column {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.section-card {
  padding: 1.25rem;
  animation: slideInDown 0.5s cubic-bezier(0, 0, 0.2, 1);
  animation-fill-mode: both;
}

.section-card:nth-child(1) {
  animation-delay: 0s;
}

.section-card:nth-child(3) {
  animation-delay: 0.2s;
}

.section-card:nth-child(4) {
  animation-delay: 0.3s;
}

.quick-actions {
  margin: 1rem;
  animation: fadeIn 0.5s cubic-bezier(0, 0, 0.2, 1);
  animation-delay: 0.1s;
  animation-fill-mode: both;
}

.widget-column {
  display: block;
}

.widget-card {
  position: sticky;
  margin-top: 1.65rem;
  animation: fadeIn 0.5s cubic-bezier(0, 0, 0.2, 1);
  animation-delay: 0.2s;
  animation-fill-mode: both;
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

@media (max-width: 768px) {
  .home-page {
    padding: 1rem;
  }

  .section-card {
    padding: 1rem;
  }
}

.quick-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  color: var(--text-primary);
  font-weight: 600;
  background: var(--white-60);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--white-50);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  box-shadow: 0 4px 16px var(--black-8), inset 0 1px 0 var(--white-80);
}

.quick-action-btn:hover {
  transform: translateY(-2px);
  background: var(--white-80);
  box-shadow: 0 8px 24px var(--black-12), inset 0 1px 0 var(--white-90);
}
</style>

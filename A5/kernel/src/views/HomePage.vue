<script setup lang="ts">
import { ref, computed } from 'vue'
import { DocumentPlusIcon, PlusIcon } from '@heroicons/vue/24/outline'
import SearchBar from '../components/shared/SearchBar.vue'
import UpcomingAppointments from '../components/bookingAppointment/UpcomingAppointments.vue'
import DocumentCard from '../components/shared/DocumentCard.vue'
import DocumentModal from '../components/documents/DocumentModal.vue'
import WidgetPanel from '../components/widgets/WidgetPanel.vue'
import AppointmentBooking from '../components/bookingAppointment/AppointmentBooking.vue'
import { MOCK_DOCUMENTS, MOCK_APPOINTMENTS } from '../constants/mockData'
import { COLORS } from '../constants/constants'
import type { Document } from '../components/shared/DocumentCard.vue'

const searchQuery = ref('')
const appointments = computed(() => MOCK_APPOINTMENTS.slice(0, 2))
const recentDocuments = computed(() => MOCK_DOCUMENTS.slice(0, 2))
const isBookingOpen = ref(false)
const selectedDocument = ref<Document | null>(null)
const isDocumentModalOpen = ref(false)

const handleSearch = (query: string) => {
  searchQuery.value = query
  console.log('Searching for:', query)
}
const handleUpload = () => {
  console.log('Upload document')
}

const handleNewAppointment = () => {
  isBookingOpen.value = true
}

const handleAppointmentClick = (id: string) => {
  console.log('Appointment clicked:', id)
}

const handleBookingConfirm = (appointment: any) => {
  console.log('Appointment booked:', appointment)
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
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 100%;
  padding: 1.5rem;
  background: linear-gradient(135deg, #e0f2fe 0%, #ddd6fe 50%, #fce7f3 100%);
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
    radial-gradient(circle at 20% 30%, rgba(14, 165, 233, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.2) 0%, transparent 50%);
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
  color: v-bind('COLORS.textPrimary');
  font-weight: 600;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.quick-action-btn:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9);
}
</style>

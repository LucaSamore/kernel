<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { UserIcon, MapPinIcon } from '@heroicons/vue/24/outline'
import BaseModal from '../shared/BaseModal.vue'
import VisitTypeSelector from './VisitTypeSelector.vue'
import DateSelector from './DateSelector.vue'
import TimeSlotSelector from './TimeSlotSelector.vue'
import { getAppointmentDetails } from '../../constants/mockData'

interface Props {
  isOpen: boolean
  preselectedVisit?: string | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  confirm: [appointment: any]
}>()

// Stati del componente
const selectedVisit = ref<string | null>(props.preselectedVisit || null)
const selectedDate = ref<string | null>(null)
const selectedTime = ref<string | null>(null)
const isLoadingDates = ref(false)
const isLoadingTimes = ref(false)

// Watch for preselected visit to auto-load dates
watch(() => props.preselectedVisit, (newValue) => {
  if (newValue && props.isOpen) {
    selectedVisit.value = newValue
    // Auto-load dates when visit is preselected
    selectedDate.value = null
    selectedTime.value = null
    isLoadingDates.value = true
    
    setTimeout(() => {
      isLoadingDates.value = false
    }, 1500)
  }
}, { immediate: true })

// Funzione per resettare tutti i campi
const resetFields = () => {
  selectedVisit.value = null
  selectedDate.value = null
  selectedTime.value = null
  isLoadingDates.value = false
  isLoadingTimes.value = false
}

// Funzione per chiudere e resettare
const handleClose = () => {
  resetFields()
  emit('close')
}

const handleVisitSelect = () => {
  // Reset selezioni precedenti e mostra loading
  selectedDate.value = null
  selectedTime.value = null
  isLoadingDates.value = true
  
  // Simula chiamata API
  setTimeout(() => {
    isLoadingDates.value = false
  }, 1500)
}

const handleDateSelect = () => {
  selectedTime.value = null // Reset orario quando si cambia data
  isLoadingTimes.value = true
  
  // Simula chiamata API per caricare orari
  setTimeout(() => {
    isLoadingTimes.value = false
  }, 1000)
}

const handleConfirm = () => {
  if (!selectedVisit.value || !selectedDate.value || !selectedTime.value) return
  
  const appointment = {
    visitType: selectedVisit.value,
    date: selectedDate.value,
    time: selectedTime.value,
  }
  
  emit('confirm', appointment)
  resetFields()
  emit('close')
}

const canConfirm = computed(() => {
  return selectedVisit.value && selectedDate.value && selectedTime.value
})

// Get appointment details when date and time are selected
const appointmentDetails = computed(() => {
  if (!selectedDate.value || !selectedTime.value) return null
  return getAppointmentDetails(selectedDate.value, selectedTime.value)
})
</script>

<template>
  <BaseModal
    :is-open="isOpen"
    :title="$t('appointmentBooking.title')"
    max-width="lg"
    @close="handleClose"
  >
    <!-- Body -->
    <VisitTypeSelector
      v-model="selectedVisit"
      @select="handleVisitSelect"
    />

    <DateSelector
      v-model="selectedDate"
      :disabled="!selectedVisit"
      :loading="isLoadingDates"
      @select="handleDateSelect"
    />

    <TimeSlotSelector
      v-model="selectedTime"
      :selected-date="selectedDate"
      :disabled="!selectedDate"
      :loading="isLoadingTimes"
    />

    <!-- Appointment Details -->
    <Transition name="slide-fade">
      <div v-if="appointmentDetails" class="appointment-details">
        <h3 class="details-title">Dettagli appuntamento</h3>
        <div class="details-content">
          <div class="detail-item">
            <div class="detail-icon">
              <UserIcon class="w-5 h-5" />
            </div>
            <div class="detail-text">
              <p class="detail-label">Medico</p>
              <p class="detail-value">{{ appointmentDetails.doctor }}</p>
            </div>
          </div>
          <div class="detail-item">
            <div class="detail-icon">
              <MapPinIcon class="w-5 h-5" />
            </div>
            <div class="detail-text">
              <p class="detail-label">Luogo</p>
              <p class="detail-value">{{ appointmentDetails.location }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Footer -->
    <template #footer>
      <button 
        class="button button-secondary" 
        @click="handleClose"
      >
        {{ $t('appointmentBooking.cancel') }}
      </button>
      <button 
        class="button button-primary" 
        :disabled="!canConfirm"
        @click="handleConfirm"
      >
        {{ $t('appointmentBooking.confirm') }}
      </button>
    </template>
  </BaseModal>
</template>

<style scoped>
/* Footer Buttons */
.button {
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.button-secondary {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #525252;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.button-secondary:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.button-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.button-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.button-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Appointment Details */
.appointment-details {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: rgba(59, 130, 246, 0.08);
  backdrop-filter: blur(12px);
  border: 1.5px solid rgba(59, 130, 246, 0.2);
  border-radius: 1.25rem;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.details-title {
  font-size: 1rem;
  font-weight: 700;
  color: #171717;
  margin: 0 0 1rem 0;
}

.details-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.detail-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.25);
  border-radius: 0.75rem;
  color: #3b82f6;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
}

.detail-text {
  flex: 1;
  min-width: 0;
}

.detail-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #737373;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.25rem 0;
}

.detail-value {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #171717;
  margin: 0;
  line-height: 1.4;
}

/* Slide fade transition */
.slide-fade-enter-active {
  animation: slideInUp 0.4s cubic-bezier(0, 0, 0.2, 1);
}

.slide-fade-leave-active {
  animation: slideOut 0.3s cubic-bezier(0, 0, 0.2, 1);
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>

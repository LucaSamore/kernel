<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseModal from './shared/BaseModal.vue'
import VisitTypeSelector from './bookingAppointment/VisitTypeSelector.vue'
import DateSelector from './bookingAppointment/DateSelector.vue'
import TimeSlotSelector from './bookingAppointment/TimeSlotSelector.vue'

interface Props {
  isOpen: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
  confirm: [appointment: any]
}>()

// Stati del componente
const selectedVisit = ref<string | null>(null)
const selectedDate = ref<string | null>(null)
const selectedTime = ref<string | null>(null)
const isLoadingDates = ref(false)
const isLoadingTimes = ref(false)

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
</style>

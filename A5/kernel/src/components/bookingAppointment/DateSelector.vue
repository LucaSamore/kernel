<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import LoadingSpinner from '../shared/LoadingSpinner.vue'

interface Props {
  modelValue: string | null
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  loading: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'select': [date: string]
}>()

const dateOffset = ref(0)
const customStartDate = ref<string>(new Date().toISOString().split('T')[0] ?? '')

// Genera date disponibili casuali a partire da domani (o data personalizzata)
const availableDates = computed(() => {
  const dates: Array<{ value: string; label: string }> = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Data di partenza: domani o data personalizzata
  let startDate: Date
  if (customStartDate.value) {
    startDate = new Date(customStartDate.value)
    startDate.setHours(0, 0, 0, 0)
  } else {
    startDate = new Date(today)
    startDate.setDate(today.getDate() + 1) // Partenza da domani
  }
  
  let daysAdded = 0
  let currentOffset = dateOffset.value * 10 // 10 date per pagina
  
  // Seed per casualità consistente basato sull'offset
  let seed = 1000 + currentOffset
  
  for (let i = currentOffset; daysAdded < 10 && i < currentOffset + 30; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    
    const dayOfWeek = date.getDay()
    
    // Salta sempre la domenica
    if (dayOfWeek === 0) continue
    
    // Genera numero pseudo-casuale per questo giorno
    seed = (seed * 9301 + 49297) % 233280
    const random = seed / 233280
    
    // Logica di inclusione:
    // - Sabato: 10% di probabilità
    // - Giorni feriali: 90% di probabilità (a volte salta)
    let includeDate = false
    
    if (dayOfWeek === 6) {
      // Sabato: raramente disponibile (10%)
      includeDate = random < 0.1
    } else {
      // Lun-Ven: di solito disponibile (90%)
      includeDate = random < 0.9
    }
    
    if (includeDate) {
      const isoDate = date.toISOString().split('T')[0]
      if (isoDate) {
        dates.push({
          value: isoDate,
          label: date.toLocaleDateString('it-IT', { 
            weekday: 'short', 
            day: 'numeric', 
            month: 'short',
            year: 'numeric'
          })
        })
        daysAdded++
      }
    }
  }
  
  return dates
})

const minDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
})

const handleDateSelect = (date: string) => {
  emit('update:modelValue', date)
  emit('select', date)
}

const loadMoreDates = () => {
  dateOffset.value++
}

const loadPreviousDates = () => {
  if (dateOffset.value > 0) {
    dateOffset.value--
  }
}

const handleCustomDateChange = () => {
  // Reset offset quando cambia la data personalizzata
  dateOffset.value = 0
}

// Reset offset quando il componente viene disabilitato
watch(() => props.disabled, (newDisabled) => {
  if (newDisabled) {
    dateOffset.value = 0
    customStartDate.value = new Date().toISOString().split('T')[0]!
  }
})
</script>

<template>
  <div class="date-selector" :class="{ 'section-disabled': disabled }">
    <h3 class="section-title">{{ $t('appointmentBooking.selectDate') }}</h3>
    
    <!-- Loading state -->
    <LoadingSpinner 
      v-if="loading" 
      size="small" 
      :message="$t('appointmentBooking.loadingAvailability')" 
      inline 
    />

    <!-- Date grid -->
    <div v-else-if="!disabled">
      <!-- Date picker personalizzato -->
      <div class="custom-date-picker">
        <label class="date-picker-label">{{ $t('appointmentBooking.customDateLabel') }}</label>
        <input
          v-model="customStartDate"
          type="date"
          class="date-picker-input"
          :min="minDate"
          max="9999-12-31"
          @change="handleCustomDateChange"
          @keydown.prevent
        />
      </div>

      <div class="dates-grid">
        <button
          v-for="date in availableDates"
          :key="date.value"
          class="date-card"
          :class="{ 'date-selected': modelValue === date.value }"
          @click="handleDateSelect(date.value)"
        >
          <span class="date-label">{{ date.label }}</span>
        </button>
      </div>
      
      <div class="date-navigation">
        <button 
          v-if="dateOffset > 0" 
          class="load-more-button" 
          @click="loadPreviousDates"
        >
          {{ $t('appointmentBooking.loadPreviousDates') }}
        </button>
        <button 
          class="load-more-button" 
          @click="loadMoreDates"
        >
          {{ $t('appointmentBooking.loadMoreDates') }}
        </button>
      </div>
    </div>

    <!-- Placeholder quando è disabilitato -->
    <div v-else class="placeholder-message">
      <p>{{ $t('appointmentBooking.selectVisit') }}</p>
    </div>
  </div>
</template>

<style scoped>
.date-selector {
  margin-bottom: 2rem;
}

.section-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: #171717;
  margin: 0 0 1rem 0;
}

.placeholder-message {
  padding: 2rem;
  text-align: center;
  color: #a3a3a3;
  font-size: 0.875rem;
  background: rgba(248, 250, 252, 0.4);
  border-radius: 12px;
  border: 1px dashed rgba(203, 213, 225, 0.5);
}

/* Custom Date Picker */
.custom-date-picker {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.date-picker-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(31, 41, 55, 0.8);
  margin-bottom: 0.5rem;
}

.date-picker-input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  font-size: 0.9375rem;
  color: #1f2937;
  transition: all 0.2s ease;
  cursor: pointer;
}

.date-picker-input::-webkit-calendar-picker-indicator {
  cursor: pointer;
}

.date-picker-input:hover {
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(59, 130, 246, 0.5);
}

.date-picker-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Dates Grid */
.dates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
  gap: 0.75rem;
}

.date-card {
  position: relative;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 0.75rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.date-card:hover {
  background: rgba(255, 255, 255, 0.4);
  border-color: rgba(59, 130, 246, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.date-selected {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
  border-color: rgba(59, 130, 246, 0.7);
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.date-selected:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
  border-color: rgba(59, 130, 246, 0.8);
}

.date-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #171717;
  text-align: center;
  text-transform: capitalize;
}

.date-navigation {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.load-more-button {
  flex: 1;
  padding: 0.875rem 1.5rem;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #3b82f6;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.load-more-button:hover {
  background: rgba(255, 255, 255, 0.4);
  border-color: rgba(59, 130, 246, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

@media (max-width: 768px) {
  .dates-grid {
    grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
  }
}
</style>
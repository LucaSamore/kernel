<script setup lang="ts">
import { computed } from 'vue'
import { TIME_SLOTS } from '../../constants/mockData'
import LoadingSpinner from '../shared/LoadingSpinner.vue'

interface Props {
  modelValue: string | null
  selectedDate: string | null
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  loading: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'select': [time: string]
}>()

// Slot orari con disponibilità casuale
const availableTimeSlots = computed(() => {
  if (!props.selectedDate) return []
  
  // Genera casualmente slot occupati (circa 30% degli slot)
  const occupiedCount = Math.floor(TIME_SLOTS.length * 0.3)
  const occupiedIndices = new Set<number>()
  
  // Usa la data come seed per avere risultati consistenti per la stessa data
  const seed = props.selectedDate.split('-').join('')
  let randomValue = parseInt(seed) % 1000
  
  while (occupiedIndices.size < occupiedCount) {
    randomValue = (randomValue * 9301 + 49297) % 233280
    const index = randomValue % TIME_SLOTS.length
    occupiedIndices.add(index)
  }
  
  return TIME_SLOTS.map((slot, index) => ({
    time: slot,
    available: !occupiedIndices.has(index)
  }))
})

const handleTimeSelect = (time: string, available: boolean) => {
  if (!available) return
  emit('update:modelValue', time)
  emit('select', time)
}
</script>

<template>
  <div class="time-slot-selector" :class="{ 'section-disabled': disabled }">
    <h3 class="section-title">{{ $t('appointmentBooking.selectTime') }}</h3>
    
    <!-- Loading state per orari -->
    <LoadingSpinner 
      v-if="loading" 
      size="small" 
      :message="$t('appointmentBooking.loadingAvailability')" 
      inline 
    />

    <div v-else-if="selectedDate && !loading" class="times-grid">
      <button
        v-for="slot in availableTimeSlots"
        :key="slot.time"
        class="time-slot"
        :class="{ 
          'time-selected': modelValue === slot.time,
          'time-unavailable': !slot.available 
        }"
        :disabled="!slot.available"
        @click="handleTimeSelect(slot.time, slot.available)"
      >
        {{ slot.time }}
      </button>
    </div>

    <!-- Placeholder quando non c'è data selezionata -->
    <div v-else-if="!selectedDate" class="placeholder-message">
      <p>{{ $t('appointmentBooking.selectDate') }}</p>
    </div>
  </div>
</template>

<style scoped>
.time-slot-selector {
  margin-bottom: 2rem;
}

.time-slot-selector:last-child {
  margin-bottom: 0;
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

/* Times Grid */
.times-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
  gap: 0.625rem;
}

.time-slot {
  position: relative;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 0.625rem;
  padding: 0.75rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #171717;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.time-slot:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.4);
  border-color: rgba(59, 130, 246, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.time-selected {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
  border-color: rgba(59, 130, 246, 0.7);
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.time-unavailable {
  opacity: 0.4;
  cursor: not-allowed;
  text-decoration: line-through;
  background: rgba(200, 200, 200, 0.2);
}

@media (max-width: 768px) {
  .times-grid {
    grid-template-columns: repeat(auto-fill, minmax(4rem, 1fr));
  }
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { VISIT_TYPES } from '../../constants/mockData'
import LoadingSpinner from '../shared/LoadingSpinner.vue'

const { t } = useI18n()

interface Props {
  modelValue: string | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'select': [visitId: string]
}>()

const searchQuery = ref('')
const showDropdown = ref(false)

// Filtra tipi di visite in base alla ricerca
const filteredVisits = computed(() => {
  if (!searchQuery.value) return VISIT_TYPES
  
  const query = searchQuery.value.toLowerCase()
  return VISIT_TYPES.filter(visit => 
    t(`appointmentBooking.visitTypes.${visit.key}`).toLowerCase().includes(query)
  )
})

const handleVisitSelect = (visitId: string) => {
  const visit = VISIT_TYPES.find(v => v.id === visitId)
  if (visit) {
    searchQuery.value = t(`appointmentBooking.visitTypes.${visit.key}`)
    showDropdown.value = false
    emit('update:modelValue', visitId)
    emit('select', visitId)
  }
}

const handleFocus = () => {
  showDropdown.value = true
}

const handleInput = () => {
  showDropdown.value = true
}
</script>

<template>
  <div class="visit-type-selector">
    <h3 class="section-title">{{ $t('appointmentBooking.selectVisit') }}</h3>
    
    <div v-if="loading">
      <LoadingSpinner size="small" :message="$t('appointmentBooking.loadingAvailability')" inline />
    </div>
    
    <div v-else class="search-container">
      <div class="search-wrapper" @click="handleFocus">
        <MagnifyingGlassIcon class="search-icon" />
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="$t('appointmentBooking.searchPlaceholder')"
          class="search-input"
          @focus="handleFocus"
          @input="handleInput"
        />
      </div>

      <!-- Dropdown visite -->
      <Transition name="dropdown">
        <div v-if="showDropdown && filteredVisits.length > 0" class="visits-dropdown">
          <button
            v-for="visit in filteredVisits"
            :key="visit.id"
            class="visit-option"
            :class="{ 'visit-option-selected': modelValue === visit.id }"
            @click="handleVisitSelect(visit.id)"
          >
            <span class="visit-name">{{ $t(`appointmentBooking.visitTypes.${visit.key}`) }}</span>
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.visit-type-selector {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: #171717;
  margin: 0 0 1rem 0;
}

.search-container {
  position: relative;
}

.search-wrapper {
  position: relative;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  cursor: text;
}

.search-wrapper:focus-within {
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #737373;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #171717;
  font-weight: 500;
  outline: none;
}

.search-input::placeholder {
  color: #a3a3a3;
}

/* Visits Dropdown */
.visits-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.60);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  max-height: 20rem;
  overflow-y: auto;
  z-index: 10;
}

.visit-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  width: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.visit-option:last-child {
  border-bottom: none;
}

.visit-option:hover {
  background: rgba(255, 255, 255, 0.3);
}

.visit-option-selected {
  background: rgba(59, 130, 246, 0.1);
}

.visit-name {
  font-size: 0.9375rem;
  font-weight: 500;
  color: #171717;
  text-align: left;
  flex: 1;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

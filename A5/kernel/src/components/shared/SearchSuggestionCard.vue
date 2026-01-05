<script setup lang="ts">
import { computed } from 'vue'
import { SparklesIcon, CalendarIcon } from '@heroicons/vue/24/outline'
import type { SymptomSuggestion } from '../../constants/mockData'

interface Props {
  suggestion: SymptomSuggestion
}

const props = defineProps<Props>()

const emit = defineEmits<{
  bookAppointment: [suggestion: SymptomSuggestion]
}>()

const urgencyColor = computed(() => {
  switch (props.suggestion.urgency) {
    case 'high':
      return 'rgba(239, 68, 68, 0.15)'
    case 'medium':
      return 'rgba(251, 191, 36, 0.15)'
    case 'low':
      return 'rgba(34, 197, 94, 0.15)'
    default:
      return 'rgba(0, 0, 0, 0.05)'
  }
})

const urgencyBorderColor = computed(() => {
  switch (props.suggestion.urgency) {
    case 'high':
      return 'rgba(239, 68, 68, 0.3)'
    case 'medium':
      return 'rgba(251, 191, 36, 0.3)'
    case 'low':
      return 'rgba(34, 197, 94, 0.3)'
    default:
      return 'rgba(0, 0, 0, 0.1)'
  }
})

const urgencyLabel = computed(() => {
  switch (props.suggestion.urgency) {
    case 'high':
      return 'Urgente'
    case 'medium':
      return 'Medio'
    case 'low':
      return 'Non urgente'
    default:
      return ''
  }
})

const handleBookAppointment = () => {
  emit('bookAppointment', props.suggestion)
}
</script>

<template>
  <div class="suggestion-card">
    <div class="suggestion-header">
      <div class="suggestion-icon-badge">
        <SparklesIcon class="w-4 h-4 text-blue-600" />
      </div>
      <div class="suggestion-title-section">
        <h3 class="suggestion-title">Suggerimento intelligente</h3>
        <p class="suggestion-subtitle">Basato sulla tua ricerca: "{{ suggestion.symptom }}"</p>
      </div>
    </div>

    <div class="suggestion-content">
      <div class="visit-info">
        <div class="visit-icon">{{ suggestion.icon }}</div>
        <div class="visit-details">
          <h4 class="visit-title">{{ suggestion.suggestedVisit }}</h4>
          <p class="visit-description">{{ suggestion.description }}</p>
          <div class="visit-meta">
            <span class="visit-type-badge">{{ suggestion.visitType }}</span>
            <span class="urgency-badge" :style="{ 
              backgroundColor: urgencyColor, 
              borderColor: urgencyBorderColor 
            }">
              {{ urgencyLabel }}
            </span>
          </div>
        </div>
      </div>

      <button class="book-button" @click="handleBookAppointment">
        <CalendarIcon class="w-5 h-5" />
        <span>Prenota visita</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.suggestion-card {
  padding: 1.25rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 1.25rem;
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  animation: slideInUp 0.4s cubic-bezier(0, 0, 0.2, 1);
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.suggestion-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%);
  opacity: 0.6;
}

.suggestion-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(59, 130, 246, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.suggestion-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.suggestion-icon-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 0.75rem;
  flex-shrink: 0;
}

.suggestion-title-section {
  flex: 1;
}

.suggestion-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: #1e40af;
  margin: 0;
  line-height: 1.2;
}

.suggestion-subtitle {
  font-size: 0.75rem;
  color: #3b82f6;
  margin: 0.25rem 0 0 0;
  line-height: 1.2;
}

.suggestion-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.visit-info {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.visit-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
  line-height: 1;
}

.visit-details {
  flex: 1;
  min-width: 0;
}

.visit-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #171717;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.visit-description {
  font-size: 0.875rem;
  color: #525252;
  margin: 0 0 0.75rem 0;
  line-height: 1.5;
}

.visit-meta {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.visit-type-badge,
.urgency-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 0.5rem;
  border: 1px solid;
}

.visit-type-badge {
  background: rgba(14, 165, 233, 0.15);
  color: #0369a1;
  border-color: rgba(14, 165, 233, 0.3);
}

.urgency-badge {
  color: #171717;
}

.book-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 0.875rem;
  font-weight: 700;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
}

.book-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(59, 130, 246, 0.4);
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
}

.book-button:active {
  transform: translateY(0);
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .suggestion-card {
    padding: 1rem;
  }

  .visit-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .visit-icon {
    font-size: 2rem;
  }
}
</style>

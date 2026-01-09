<script setup lang="ts">
import { ref } from 'vue'
import { XMarkIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
import type { TutorialStep } from './TutorialSystem.vue'

const props = defineProps<{
  step: TutorialStep
  stepNumber: number
  totalSteps: number
  progress: number
}>()

const emit = defineEmits<{
  complete: []
  close: []
}>()

const isExpanded = ref(true)

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

const handleCloseClick = () => {
  // Solo collassa la guida, non chiude il tutorial
  isExpanded.value = false
}
</script>

<template>
  <div :class="['tutorial-step-guide', { 'collapsed': !isExpanded }]">
    <div class="guide-header" @click="toggleExpanded">
      <div class="guide-title-section">
        <div class="step-indicator">
          <span class="step-number">{{ stepNumber }}</span>
          <span class="step-total">/{{ totalSteps }}</span>
        </div>
        <div class="guide-title">
          <h3>{{ step.title }}</h3>
          <p v-if="isExpanded">{{ step.description }}</p>
        </div>
      </div>
      <button 
        class="close-guide" 
        @click.stop="handleCloseClick" 
        :aria-label="$t('tutorial.minimize')"
        :title="$t('tutorial.minimize')"
      >
        <XMarkIcon class="w-5 h-5" />
      </button>
    </div>

    <div v-if="isExpanded" class="guide-content">
      <!-- Progress bar -->
      <div class="progress-section">
        <div class="progress-label">
          <span>Progresso</span>
          <span class="progress-percentage">{{ progress }}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
        </div>
      </div>

      <!-- Action instruction -->
      <div class="action-instruction">
        <div class="instruction-icon">👉</div>
        <div class="instruction-text">
          <strong>{{ step.action }}</strong>
        </div>
      </div>

      <!-- Completion button -->
      <button class="manual-complete-btn" @click="$emit('complete')">
        <CheckCircleIcon class="w-5 h-5" />
        <span>Ho completato questo step</span>
      </button>
    </div>

    <!-- Minimized toggle button -->
    <button v-if="!isExpanded" class="expand-button" @click="toggleExpanded">
      ▼ Mostra istruzioni
    </button>
  </div>
</template>

<style scoped>
.tutorial-step-guide {
  position: fixed;
  top: 1rem;
  left: 1rem;
  width: 300px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 2px solid rgba(14, 165, 233, 0.4);
  border-radius: 1.25rem;
  box-shadow: 
    0 12px 48px rgba(0, 0, 0, 0.25),
    0 4px 16px rgba(14, 165, 233, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  z-index: 900;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideInLeft 0.5s cubic-bezier(0, 0, 0.2, 1);
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.tutorial-step-guide.collapsed {
  max-width: 80px;
}

.tutorial-step-guide.collapsed .guide-title h3,
.tutorial-step-guide.collapsed .guide-title p {
  display: none;
}

.guide-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.25rem;
  cursor: pointer;
  user-select: none;
}

.guide-title-section {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  flex: 1;
}

.step-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
  border-radius: 0.75rem;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
}

.step-number {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  line-height: 1;
}

.step-total {
  font-size: 0.625rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.125rem;
}

.guide-title {
  flex: 1;
}

.guide-title h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #171717;
  margin: 0 0 0.25rem 0;
  line-height: 1.3;
}

.guide-title p {
  font-size: 0.8125rem;
  color: #525252;
  margin: 0;
  line-height: 1.4;
}

.close-guide {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #737373;
  transition: all 0.2s;
  flex-shrink: 0;
}

.close-guide:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #171717;
}

.guide-content {
  padding: 0 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.progress-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8125rem;
  color: #525252;
  font-weight: 500;
}

.progress-percentage {
  font-weight: 700;
  color: #0ea5e9;
  font-size: 0.875rem;
}

.progress-bar {
  width: 100%;
  height: 0.5rem;
  background: rgba(14, 165, 233, 0.15);
  border-radius: 0.25rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #0ea5e9, #8b5cf6);
  border-radius: 0.25rem;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.action-instruction {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(139, 92, 246, 0.1));
  border: 1px solid rgba(14, 165, 233, 0.2);
  border-radius: 0.75rem;
}

.instruction-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.instruction-text {
  flex: 1;
  font-size: 0.875rem;
  color: #171717;
  line-height: 1.5;
}

.instruction-text strong {
  font-weight: 600;
  color: #0ea5e9;
}

.visual-hint {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hint-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #525252;
}

.hint-image {
  position: relative;
  width: 100%;
  background: rgba(0, 0, 0, 0.02);
  border: 1px dashed rgba(0, 0, 0, 0.1);
  border-radius: 0.75rem;
  overflow: hidden;
}

.image-placeholder {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.05), rgba(139, 92, 246, 0.05));
}

.pointer-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.pointer-circle {
  width: 2rem;
  height: 2rem;
  border: 3px solid #0ea5e9;
  border-radius: 50%;
  background: rgba(14, 165, 233, 0.2);
  animation: pulse-ring 2s infinite;
}

@keyframes pulse-ring {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
}

.pointer-arrow {
  font-size: 2rem;
  color: #0ea5e9;
  font-weight: 700;
}

.hint-description {
  font-size: 0.8125rem;
  color: #525252;
  text-align: center;
  font-weight: 500;
}

.manual-complete-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.manual-complete-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
}

.expand-button {
  width: 100%;
  padding: 0.75rem;
  background: rgba(14, 165, 233, 0.1);
  border: none;
  border-top: 1px solid rgba(14, 165, 233, 0.2);
  border-radius: 0 0 1rem 1rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #0ea5e9;
  cursor: pointer;
  transition: all 0.2s;
}

.expand-button:hover {
  background: rgba(14, 165, 233, 0.15);
}

@media (max-width: 768px) {
  .tutorial-step-guide {
    left: 0.5rem;
    right: 0.5rem;
    width: auto;
    max-width: calc(100% - 1rem);
  }
}
</style>

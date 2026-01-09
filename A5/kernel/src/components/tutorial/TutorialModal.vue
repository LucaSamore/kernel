<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import TutorialSystem from './TutorialSystem.vue'
import type { Tutorial } from './TutorialSystem.vue'

const props = defineProps<{
  isOpen: boolean
  tutorials: Tutorial[]
}>()

const emit = defineEmits<{
  close: []
}>()

const modalRef = ref<HTMLElement | null>(null)
const previousActiveElement = ref<HTMLElement | null>(null)

const handleBackdropClick = (e: MouseEvent) => {
  if ((e.target as HTMLElement).classList.contains('tutorial-modal-overlay')) {
    emit('close')
  }
}

// Focus trap per accessibilità
const trapFocus = (e: KeyboardEvent) => {
  if (e.key !== 'Tab' || !modalRef.value) return

  const focusableElements = modalRef.value.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  if (e.shiftKey) {
    if (document.activeElement === firstElement) {
      e.preventDefault()
      lastElement?.focus()
    }
  } else {
    if (document.activeElement === lastElement) {
      e.preventDefault()
      firstElement?.focus()
    }
  }
}

// Gestione apertura/chiusura modal
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    previousActiveElement.value = document.activeElement as HTMLElement
    document.addEventListener('keydown', trapFocus)
    document.body.style.overflow = 'hidden'
    
    setTimeout(() => {
      const firstFocusable = modalRef.value?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      firstFocusable?.focus()
    }, 100)
  } else {
    document.removeEventListener('keydown', trapFocus)
    document.body.style.overflow = ''
    previousActiveElement.value?.focus()
  }
})

// Gestione tasto ESC
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.removeEventListener('keydown', trapFocus)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="tutorial-modal">
      <div 
        v-if="isOpen" 
        class="tutorial-modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tutorial-modal-title"
        @click="handleBackdropClick"
      >
        <div 
          ref="modalRef"
          class="tutorial-modal-container"
        >
          <!-- Close button -->
          <button 
            class="tutorial-modal-close"
            @click="emit('close')"
            aria-label="Chiudi tutorial"
          >
            <XMarkIcon class="w-6 h-6" />
          </button>

          <!-- Tutorial System Content -->
          <div class="tutorial-modal-content">
            <TutorialSystem 
              :tutorials="tutorials"
              @close="emit('close')"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.tutorial-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--bg-gradient-start-10) 0%, var(--bg-gradient-mid-10) 50%, var(--bg-gradient-end-10) 100%);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 700;
  padding: 2rem;
  animation: fadeIn 0.3s ease-out;
}

.tutorial-modal-overlay::before {
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
}

.tutorial-modal-container {
  position: relative;
  width: 100%;
  max-width: 1400px;
  max-height: 90vh;
  background: var(--white-40);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--white-60);
  border-radius: 1.5rem;
  box-shadow: 0 12px 48px var(--black-10), 0 4px 16px var(--black-8), inset 0 1px 0 var(--white-80);
  overflow: hidden;
  animation: slideUpModal 0.4s cubic-bezier(0, 0, 0.2, 1);
  z-index: 1;
}

.tutorial-modal-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 10;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background: var(--white-40);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--white-50);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  color: var(--gray-525252);
  box-shadow: 0 2px 8px var(--black-6), inset 0 1px 0 var(--white-50);
  flex-shrink: 0;
}

.tutorial-modal-close:hover {
  background: var(--white-50);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px var(--black-10), inset 0 1px 0 var(--white-70);
}

.tutorial-modal-content {
  width: 100%;
  height: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 1.5rem;
}

/* Custom scrollbar */
.tutorial-modal-content::-webkit-scrollbar {
  width: 10px;
}

.tutorial-modal-content::-webkit-scrollbar-track {
  background: var(--white-30);
  border-radius: 5px;
  margin: 0.5rem 0;
}

.tutorial-modal-content::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, var(--accent-primary-40) 0%, var(--accent-secondary-20) 100%);
  border-radius: 5px;
  border: 2px solid var(--white-30);
  transition: all 0.2s ease;
}

.tutorial-modal-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, var(--accent-primary-60) 0%, var(--accent-primary-40) 100%);
  border-color: var(--white-40);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUpModal {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes slideDownModal {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(30px) scale(0.96);
  }
}

.tutorial-modal-enter-active {
  transition: opacity 0.3s ease-out;
}

.tutorial-modal-leave-active {
  transition: opacity 0.25s ease-in;
}

.tutorial-modal-enter-from,
.tutorial-modal-leave-to {
  opacity: 0;
}

.tutorial-modal-enter-active .tutorial-modal-container {
  animation: slideUpModal 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.tutorial-modal-leave-active .tutorial-modal-container {
  animation: slideDownModal 0.3s cubic-bezier(0.4, 0, 1, 1);
}

/* Responsive */
@media (max-width: 1024px) {
  .tutorial-modal-overlay {
    padding: 1rem;
  }
  
  .tutorial-modal-container {
    max-height: 95vh;
  }
  
  .tutorial-modal-close {
    top: 1rem;
    right: 1rem;
  }
  
  .tutorial-modal-content {
    padding: 1.25rem;
  }
}

@media (max-width: 768px) {
  .tutorial-modal-overlay {
    padding: 0.5rem;
  }
  
  .tutorial-modal-container {
    max-width: 100%;
    max-height: 98vh;
    border-radius: 1rem;
  }
  
  .tutorial-modal-content {
    padding: 1rem;
  }
  
  .tutorial-modal-close {
    width: 2rem;
    height: 2rem;
    top: 0.75rem;
    right: 0.75rem;
  }
}
</style>
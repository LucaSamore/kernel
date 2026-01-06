<script setup lang="ts">
import { CheckCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline'

interface Props {
  message: string
  show: boolean
  duration?: number
  type?: 'success' | 'error' | 'info' | 'warning'
}

const props = withDefaults(defineProps<Props>(), {
  duration: 3000,
  type: 'success'
})

const emit = defineEmits<{
  close: []
}>()

// Auto close after duration
if (props.show && props.duration > 0) {
  setTimeout(() => {
    emit('close')
  }, props.duration)
}

// Determine aria-live based on type
const ariaLive = props.type === 'error' ? 'assertive' : 'polite'
</script>

<template>
  <Teleport to="body">
    <Transition name="toast">
      <div 
        v-if="show" 
        class="toast-container"
        role="status"
        :aria-live="ariaLive"
        aria-atomic="true"
      >
        <div class="toast-content">
          <div class="toast-icon" :class="`toast-icon-${type}`">
            <CheckCircleIcon class="w-6 h-6" aria-hidden="true" />
          </div>
          <p class="toast-message">{{ message }}</p>
          <button 
            class="toast-close" 
            @click="emit('close')"
            aria-label="Chiudi notifica"
          >
            <XMarkIcon class="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.toast-container {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 10000;
  animation: slideInRight 0.4s cubic-bezier(0, 0, 0.2, 1);
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 1);
  min-width: 320px;
  max-width: 480px;
}

.toast-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  flex-shrink: 0;
  border: 1px solid;
  box-shadow: 0 2px 8px;
}

.toast-icon-success {
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
  border-color: rgba(16, 185, 129, 0.3);
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);
}

.toast-icon-error {
  background: rgba(239, 68, 68, 0.12);
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.3);
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.15);
}

.toast-icon-warning {
  background: rgba(245, 158, 11, 0.12);
  color: #f59e0b;
  border-color: rgba(245, 158, 11, 0.3);
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.15);
}

.toast-icon-info {
  background: rgba(14, 165, 233, 0.12);
  color: #0ea5e9;
  border-color: rgba(14, 165, 233, 0.3);
  box-shadow: 0 2px 8px rgba(14, 165, 233, 0.15);
}

.toast-message {
  flex: 1;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #171717;
  margin: 0;
  line-height: 1.5;
}

.toast-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  color: #525252;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
  flex-shrink: 0;
}

.toast-close:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: scale(1.05);
}

.toast-close:active {
  transform: scale(0.95);
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Transition animations */
.toast-enter-active {
  animation: slideInRight 0.4s cubic-bezier(0, 0, 0.2, 1);
}

.toast-leave-active {
  animation: slideOutRight 0.3s cubic-bezier(0, 0, 0.2, 1);
}

@keyframes slideOutRight {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

@media (max-width: 640px) {
  .toast-container {
    top: 1rem;
    right: 1rem;
    left: 1rem;
  }

  .toast-content {
    min-width: 0;
    width: 100%;
  }
}
</style>

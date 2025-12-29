<script setup lang="ts">
import { DocumentPlusIcon, PlusIcon } from '@heroicons/vue/24/outline'
import { COLORS } from '../constants/constants'

const emit = defineEmits<{
  upload: []
  newAppointment: []
}>()
</script>

<template>
  <div class="flex gap-4">
    <button 
      @click="emit('upload')"
      class="quick-action-btn flex-1"
    >
      <DocumentPlusIcon class="w-5 h-5 " />
      <span>{{ $t('home.uploadDocument') }}</span>
    </button>
    <button 
      @click="emit('newAppointment')"
      class="quick-action-btn flex-1"
    >
      <PlusIcon class="w-5 h-5" />
      <span>{{ $t('home.newAppointment') }}</span>
    </button>
  </div>
</template>

<style scoped>
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

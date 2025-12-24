<script setup lang="ts">
import { DocumentPlusIcon, PlusIcon } from '@heroicons/vue/24/outline'

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
  color: black;
  font-weight: 600;
  border-color: black;
  border: 2px solid;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
}

.quick-action-btn:hover {
  transform: translateY(-0.125rem);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
</style>

<script setup lang="ts">
import { UserIcon, PlusIcon } from '@heroicons/vue/24/outline'

interface Profile {
  name?: string
  role?: string
  isAddCard?: boolean
}

defineProps<Profile>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div 
    @click="emit('click')"
    :class="[
      'profile-card',
      { 'add-card': isAddCard },
      'w-36 h-44 flex flex-col items-center justify-center gap-3',
      'rounded-lg',
      'hover:shadow-lg hover:-translate-y-1',
    ]"
  >
    <div class="w-20 h-20 rounded-full flex items-center justify-center">
      <PlusIcon v-if="isAddCard" class="w-8 h-8 text-gray-400" :stroke-width="1.5" />
      <UserIcon v-else class="w-10 h-10 text-gray-400" :stroke-width="1.5" />
    </div>
    
    <div v-if="!isAddCard" class="text-center">
      <span class="block text-xl font-medium text-gray-900">{{ name }}</span>
      <span class="block text-xs text-gray-500">{{ role }}</span>
    </div>
    
    <span v-else class="text-lg text-gray-500">{{ name }}</span>
  </div>
</template>

<style scoped>
.profile-card {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.add-card {
  background: rgba(255, 255, 255, 0.15);
  border: 2px dashed rgba(0, 0, 0, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.add-card:hover {
  background: rgba(255, 255, 255, 0.25);
}

.profile-card:hover {
  transform: translateY(-4px) !important;
  background: rgba(255, 255, 255, 0.45);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border-color: rgba(0, 0, 0, 0.65);
}
</style>

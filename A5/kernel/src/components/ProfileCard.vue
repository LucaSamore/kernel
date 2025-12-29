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
      isAddCard ? 'border-dashed' : '',
      'w-36 h-44 flex flex-col items-center justify-center gap-3',
      'rounded-lg border border-black',
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

.profile-card:hover {
  transform: translateY(-4px) !important;
}
</style>

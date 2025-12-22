<script setup lang="ts">
import type { FunctionalComponent } from 'vue'
import { TagIcon } from '@heroicons/vue/24/outline'

export interface CardMetadata {
  icon: FunctionalComponent
  label: string
}

interface Props {
  title: string
  description: string
  icon: FunctionalComponent
  tags?: string[]
  metadata: CardMetadata[]
  selected?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div 
    :class="['base-card', { 'card-selected': selected }]"
    @click="emit('click')"
  >
    <div class="card-content">
      <!-- Icon -->
      <div class="shrink-0">
        <div class="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
          <component :is="icon" class="w-7 h-7 text-gray-600" />
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <!-- Title -->
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          {{ title }}
        </h3>

        <!-- Description -->
        <p class="text-sm text-gray-600">
          {{ description }}
        </p>

        <!-- Tags -->
        <div v-if="tags && tags.length > 0" class="tags-container">
          <span
            v-for="tag in tags"
            :key="tag"
            class="tag-badge"
          >
            <TagIcon class="w-3 h-3" />
            {{ tag }}
          </span>
        </div>

        <!-- Metadata (date, doctor, location, etc.) -->
        <div class="flex items-center flex-wrap gap-4 text-sm text-gray-500">
          <div 
            v-for="(meta, index) in metadata"
            :key="index"
            class="flex items-center gap-1.5"
          >
            <component :is="meta.icon" class="w-4 h-4" />
            <span>{{ meta.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.base-card {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(0.75rem);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin: 0.75rem 0;
  border: 2px solid #d1d5db;
  box-shadow: 0 0.5rem 1.875rem rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: all 0.3s ease;
}

.base-card:hover {
  transform: translateY(-0.25rem);
  box-shadow: 0 0.75rem 2.5rem rgba(0, 0, 0, 0.18);
}

.card-selected {
  border-color: #000;
  background-color: rgba(255, 255, 255, 0.95);
}

.card-content {
  display: flex;
  gap: 1.5rem;
  align-items: start;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}

.tag-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  background-color: #f3f4f6;
  color: #374151;
  font-size: 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #1f2937;
  font-weight: 500;
}

@media (max-width: 640px) {
  .base-card {
    padding: 1rem;
  }

  .card-content {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>

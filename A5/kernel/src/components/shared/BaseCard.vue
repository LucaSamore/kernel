<script setup lang="ts">
import type { FunctionalComponent } from 'vue'
import { TagIcon } from '@heroicons/vue/24/outline'
import { COLORS } from '../../constants/constants'

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
        <div class="w-14 h-14 bg-white/30 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/40 shadow-lg">
          <component :is="icon" class="w-7 h-7 text-gray-800" />
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <!-- Title -->
        <h3 class="text-lg font-semibold mb-2" :style="{ color: COLORS.primary }">
          {{ title }}
        </h3>

        <!-- Description -->
        <p class="text-sm" :style="{ color: COLORS.textPrimary }">
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
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  border-radius: 1.25rem;
  padding: 1.5rem;
  margin: 0.75rem 0;
  border: 1.5px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.base-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 1);
  background: rgba(255, 255, 255, 0.35);
  border-color: rgba(255, 255, 255, 0.9);
}

.card-selected {
  border: 2px solid rgba(0, 0, 0, 0.6);
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 1);
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
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(8px);
  color: v-bind('COLORS.textPrimary');
  font-size: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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

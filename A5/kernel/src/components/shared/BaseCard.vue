<script setup lang="ts">
import type { FunctionalComponent } from 'vue'
import { COLORS } from '../../constants/constants'

export interface CardMetadata {
  icon: FunctionalComponent
  label: string
}

interface Props {
  title: string
  description: string
  icon: FunctionalComponent
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
      <div class="flex-1 min-w-0 content-wrapper">
        <!-- Title Row with Actions -->
        <div class="title-row">
          <h3 class="text-lg font-semibold" :style="{ color: COLORS.primary }">
            {{ title }}
          </h3>
          <slot name="title-actions" />
        </div>

        <!-- Custom content slot (e.g., badges) -->
        <slot name="after-title" />

        <!-- Description -->
        <p class="text-sm" :style="{ color: COLORS.textPrimary }">
          {{ description }}
        </p>

        <!-- Metadata (date, doctor, location, etc.) -->
        <div class="flex items-center flex-wrap gap-4 text-sm text-gray-500 metadata-row">
          <div 
            v-for="(meta, index) in metadata"
            :key="index"
            class="flex items-center gap-1.5"
          >
            <component :is="meta.icon" class="w-4 h-4" />
            <span>{{ meta.label }}</span>
          </div>
        </div>

        <!-- Actions Slot (bottom right, absolute) -->
        <div v-if="$slots.actions" class="card-actions">
          <slot name="actions" />
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

.content-wrapper {
  position: relative;
  padding-right: 0;
  min-height: 6rem;
}

.title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.title-row h3 {
  flex: 1;
  min-width: 0;
}

.metadata-row {
  margin-top: 0.5rem;
  padding-right: 18rem;
}

.card-actions {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@media (max-width: 640px) {
  .base-card {
    padding: 1rem;
  }

  .content-wrapper {
    padding-right: 0;
    padding-bottom: 6rem;
  }

  .card-actions {
    position: static;
    margin-top: 1rem;
  }

  .card-content {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>

<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/outline'
import type { Component } from 'vue'

interface Props {
  icon?: Component
  title: string
  subtitle?: string
  showChevron?: boolean
  variant?: 'default' | 'danger'
}

const props = withDefaults(defineProps<Props>(), {
  showChevron: true,
  variant: 'default'
})

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <div 
    class="settings-item"
    :class="{ 'settings-item--danger': variant === 'danger' }"
    @click="handleClick"
  >
    <component 
      v-if="icon" 
      :is="icon" 
      class="settings-item__icon"
    />
    
    <div class="settings-item__content">
      <div class="settings-item__title">
        {{ title }}
      </div>
      <div v-if="subtitle" class="settings-item__subtitle">
        {{ subtitle }}
      </div>
    </div>
    
    <ChevronRightIcon 
      v-if="showChevron" 
      class="settings-item__chevron"
    />
  </div>
</template>

<style scoped>
.settings-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.125rem 1.25rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  position: relative;
}

.settings-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(14, 165, 233, 0.05);
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0, 0, 0.2, 1);
  border-radius: inherit;
}

.settings-item:hover::before {
  opacity: 1;
}

.settings-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(4px);
}

.settings-item__icon {
  width: 24px;
  height: 24px;
  color: #0ea5e9;
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  filter: drop-shadow(0 2px 4px rgba(14, 165, 233, 0.2));
}

.settings-item:hover .settings-item__icon {
  color: #0284c7;
  transform: scale(1.1);
  filter: drop-shadow(0 4px 8px rgba(14, 165, 233, 0.3));
}

.settings-item--danger .settings-item__icon {
  color: #ef4444;
  filter: drop-shadow(0 2px 4px rgba(239, 68, 68, 0.2));
}

.settings-item--danger::before {
  background: rgba(239, 68, 68, 0.1);
}

.settings-item--danger:hover {
  background: rgba(239, 68, 68, 0.15);
}

.settings-item--danger:hover .settings-item__icon {
  color: #dc2626;
  transform: scale(1.1);
  filter: drop-shadow(0 4px 8px rgba(239, 68, 68, 0.3));
}

.settings-item__content {
  flex: 1;
  min-width: 0;
}

.settings-item__title {
  font-size: 1rem;
  font-weight: 500;
  color: #171717;
  line-height: 1.4;
  transition: color 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.settings-item:hover .settings-item__title {
  color: #0a0a0a;
}

.settings-item--danger .settings-item__title {
  color: #ef4444;
}

.settings-item--danger:hover .settings-item__title {
  color: #dc2626;
}

.settings-item__subtitle {
  font-size: 0.875rem;
  color: #525252;
  margin-top: 0.25rem;
  line-height: 1.3;
  transition: color 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.settings-item:hover .settings-item__subtitle {
  color: #404040;
}

.settings-item__chevron {
  width: 20px;
  height: 20px;
  color: #a3a3a3;
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.settings-item:hover .settings-item__chevron {
  color: #525252;
  transform: translateX(4px);
}
</style>

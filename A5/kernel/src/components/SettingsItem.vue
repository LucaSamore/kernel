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
  gap: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.settings-item:hover {
  background-color: #1f2937;
}

.settings-item__icon {
  width: 24px;
  height: 24px;
  color: #6b7280;
  flex-shrink: 0;
  transition: color 0.2s ease;
}

.settings-item:hover .settings-item__icon {
  color: #ffffff;
}

.settings-item--danger .settings-item__icon {
  color: #ef4444;
}

.settings-item--danger:hover {
  background-color: #ef4444;
}

.settings-item--danger:hover .settings-item__icon {
  color: #ffffff;
}

.settings-item__content {
  flex: 1;
  min-width: 0;
}

.settings-item__title {
  font-size: 15px;
  color: #1f2937;
  line-height: 1.4;
  transition: color 0.2s ease;
}

.settings-item:hover .settings-item__title {
  color: #ffffff;
}

.settings-item--danger .settings-item__title {
  color: #ef4444;
}

.settings-item--danger:hover .settings-item__title {
  color: #ffffff;
}

.settings-item__subtitle {
  font-size: 13px;
  color: #6b7280;
  margin-top: 2px;
  line-height: 1.3;
  transition: color 0.2s ease;
}

.settings-item:hover .settings-item__subtitle {
  color: #e5e7eb;
}

.settings-item__chevron {
  width: 20px;
  height: 20px;
  color: #9ca3af;
  flex-shrink: 0;
  transition: color 0.2s ease;
}

.settings-item:hover .settings-item__chevron {
  color: #ffffff;
}
</style>

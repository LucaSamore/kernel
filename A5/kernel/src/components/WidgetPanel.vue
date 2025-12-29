<script setup lang="ts">
import { ref } from 'vue'
import { 
  CalendarIcon, 
  BellIcon,
  PlusIcon
} from '@heroicons/vue/24/outline'

const quickStats = ref([
  { label: 'Prossima visita', value: '3 giorni', icon: CalendarIcon },
  { label: 'Documenti nuovi', value: '2', icon: BellIcon },
])
</script>

<template>
  <div class="widget-panel">
    <div class="panel-header">
      <h3 class="text-xl font-hand font-semibold">{{ $t('home.quickOverview') }}</h3>
      <button class="icon-button" type="button" aria-label="Aggiungi widget">
        <PlusIcon class="w-5 h-5" />
      </button>
    </div>

    <div class="widget-list">
      <div
        v-for="(stat, index) in quickStats"
        :key="index"
        class="widget-card"
      >
        <div class="flex items-center gap-3">
          <div class="icon-pill">
            <component :is="stat.icon" class="w-5 h-5" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-sm text-gray-600">{{ stat.label }}</div>
            <div class="text-lg font-semibold text-gray-900">{{ stat.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-hand {
  font-family: 'Comic Sans MS', cursive, sans-serif;
}

.widget-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 1.5rem;
  padding: 1.25rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.65rem;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.8);
  color: #525252;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  position: relative;
  background: rgba(255, 255, 255, 0.5);
}

.icon-button:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: translateY(-2px);
}

.widget-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.widget-card {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 0.75rem;
  padding: 0.875rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.widget-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.7);
}

.icon-pill {
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
</style>

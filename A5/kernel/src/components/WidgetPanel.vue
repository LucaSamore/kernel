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
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 0.5rem 1.875rem rgba(0, 0, 0, 0.08);
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
}

.widget-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.widget-card {
  background-color: #f9fafb;
  border-radius: 0.65rem;
  padding: 0.875rem 1rem;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}

.widget-card:hover {
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.12);
  transform: translateY(-0.1rem);
  background-color: #ffffff;
}

.icon-pill {
  width: 2.5rem;
  height: 2.5rem;
  background: #ffffff;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
</style>

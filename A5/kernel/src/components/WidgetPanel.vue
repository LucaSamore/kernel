<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  CalendarIcon, 
  BellIcon,
  PlusIcon
} from '@heroicons/vue/24/outline'
import WidgetSelector, { type WidgetOption } from './WidgetSelector.vue'
import CompactHealthMetric from './CompactHealthMetric.vue'
import CompactHealthChart from './CompactHealthChart.vue'
import { 
  getHealthParameter,
  getHealthHistory,
  WIDGET_DATA 
} from '../constants/mockData'

const { t } = useI18n()
const isWidgetSelectorOpen = ref(false)
const selectedWidgetIds = ref<string[]>([])

// Widget disponibili (configurazione base, testi da i18n)
const availableWidgets = computed<WidgetOption[]>(() => [
  // Widget rapidi
  {
    id: 'next-visit',
    name: t('widgets.items.nextVisit.name'),
    description: t('widgets.items.nextVisit.description'),
    icon: '📅',
    category: 'quick',
  },
  {
    id: 'new-docs',
    name: t('widgets.items.newDocs.name'),
    description: t('widgets.items.newDocs.description'),
    icon: '🔔',
    category: 'quick',
  },
  {
    id: 'medication-reminder',
    name: t('widgets.items.medicationReminder.name'),
    description: t('widgets.items.medicationReminder.description'),
    icon: '💊',
    category: 'quick',
  },
  {
    id: 'next-vaccine',
    name: t('widgets.items.nextVaccine.name'),
    description: t('widgets.items.nextVaccine.description'),
    icon: '💉',
    category: 'quick',
  },
  
  // Parametri vitali
  {
    id: 'heart-rate',
    name: t('widgets.items.heartRate.name'),
    description: t('widgets.items.heartRate.description'),
    icon: '❤️',
    category: 'health-metric',
  },
  {
    id: 'blood-pressure-sys',
    name: t('widgets.items.bloodPressureSys.name'),
    description: t('widgets.items.bloodPressureSys.description'),
    icon: '🩺',
    category: 'health-metric',
  },
  {
    id: 'blood-pressure-dia',
    name: t('widgets.items.bloodPressureDia.name'),
    description: t('widgets.items.bloodPressureDia.description'),
    icon: '💉',
    category: 'health-metric',
  },
  {
    id: 'glucose',
    name: t('widgets.items.glucose.name'),
    description: t('widgets.items.glucose.description'),
    icon: '🩸',
    category: 'health-metric',
  },
  {
    id: 'oxygen',
    name: t('widgets.items.oxygen.name'),
    description: t('widgets.items.oxygen.description'),
    icon: '🫁',
    category: 'health-metric',
  },
  {
    id: 'cholesterol',
    name: t('widgets.items.cholesterol.name'),
    description: t('widgets.items.cholesterol.description'),
    icon: '🧪',
    category: 'health-metric',
  },
  
  // Grafici
  {
    id: 'heart-rate-chart',
    name: t('widgets.items.heartRateChart.name'),
    description: t('widgets.items.heartRateChart.description'),
    icon: '📊',
    category: 'health-chart',
  },
  {
    id: 'glucose-chart',
    name: t('widgets.items.glucoseChart.name'),
    description: t('widgets.items.glucoseChart.description'),
    icon: '📈',
    category: 'health-chart',
  },
  {
    id: 'blood-pressure-sys-chart',
    name: t('widgets.items.bloodPressureSysChart.name'),
    description: t('widgets.items.bloodPressureSysChart.description'),
    icon: '📉',
    category: 'health-chart',
  },
  {
    id: 'cholesterol-chart',
    name: t('widgets.items.cholesterolChart.name'),
    description: t('widgets.items.cholesterolChart.description'),
    icon: '📈',
    category: 'health-chart',
  },
])

// Widget attivi ordinati secondo l'ordine di availableWidgets
const activeWidgets = computed(() => {
  return availableWidgets.value.filter(widget => 
    selectedWidgetIds.value.includes(widget.id)
  )
})

// Helper per ottenere il titolo e parametri del grafico
const getChartData = (id: string) => {
  const chartId = id.replace('-chart', '')
  const history = getHealthHistory(chartId)
  const param = getHealthParameter(chartId)
  
  if (!history || !param) return undefined
  
  return {
    data: history,
    title: param.name,
    unit: param.unit,
    normalRange: param.normalRange
  }
}

const handleSaveWidgets = (newSelection: string[]) => {
  selectedWidgetIds.value = newSelection
  localStorage.setItem('selectedWidgets', JSON.stringify(newSelection))
}

onMounted(() => {
  const saved = localStorage.getItem('selectedWidgets')
  if (saved) {
    try {
      selectedWidgetIds.value = JSON.parse(saved)
    } catch (e) {
      selectedWidgetIds.value = ['next-visit', 'new-docs']
    }
  } else {
    selectedWidgetIds.value = ['next-visit', 'new-docs']
  }
})
</script>

<template>
  <div class="widget-panel">
    <div class="panel-header">
      <h3 class="text-xl font-hand font-semibold">{{ $t('home.quickOverview') }}</h3>
      <button 
        class="icon-button" 
        type="button" 
        :aria-label="$t('widgets.emptyState.addButton')"
        @click="isWidgetSelectorOpen = true"
      >
        <PlusIcon class="w-5 h-5" />
      </button>
    </div>

    <div v-if="activeWidgets.length === 0" class="empty-state">
      <p class="text-sm text-gray-500 text-center">
        {{ $t('widgets.emptyState.title') }}
      </p>
      <p class="text-xs text-gray-400 text-center">
        {{ $t('widgets.emptyState.description') }}
      </p>
      <button 
        class="add-widget-btn"
        @click="isWidgetSelectorOpen = true"
      >
        <PlusIcon class="w-4 h-4" />
        {{ $t('widgets.emptyState.addButton') }}
      </button>
    </div>

    <div v-else class="widget-list">
      <template v-for="widget in activeWidgets" :key="widget.id">
        <!-- Quick Stats Widgets -->
        <div v-if="widget.id === 'next-visit'" class="widget-card">
          <div class="flex items-center gap-3">
            <div class="icon-pill">
              <CalendarIcon class="w-5 h-5" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm text-gray-600">Prossima visita</div>
              <div class="text-lg font-semibold text-gray-900">3 giorni</div>
            </div>
          </div>
        </div>

        <div v-else-if="widget.id === 'new-docs'" class="widget-card">
          <div class="flex items-center gap-3">
            <div class="icon-pill">
              <BellIcon class="w-5 h-5" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm text-gray-600">Documenti nuovi</div>
              <div class="text-lg font-semibold text-gray-900">2</div>
            </div>
          </div>
        </div>

        <div v-else-if="widget.id === 'medication-reminder'" class="widget-card">
          <div class="flex items-center gap-3">
            <div class="icon-pill text-xl">💊</div>
            <div class="flex-1 min-w-0">
              <div class="text-sm text-gray-600">{{ WIDGET_DATA.nextMedicationReminder.medication }}</div>
              <div class="text-lg font-semibold text-gray-900">{{ WIDGET_DATA.nextMedicationReminder.time }}</div>
            </div>
          </div>
        </div>

        <!-- Health Metric Widgets -->
        <CompactHealthMetric
          v-else-if="widget.category === 'health-metric' && getHealthParameter(widget.id)"
          :parameter="getHealthParameter(widget.id)!"
          :compact="true"
        />

        <!-- Health Chart Widgets -->
        <CompactHealthChart
          v-else-if="widget.category === 'health-chart' && getChartData(widget.id)"
          :title="getChartData(widget.id)!.title"
          :data="getChartData(widget.id)!.data"
          :unit="getChartData(widget.id)!.unit"
          :normal-range="getChartData(widget.id)!.normalRange"
          :compact="true"
        />
      </template>
    </div>

    <!-- Widget Selector Modal -->
    <WidgetSelector
      :is-open="isWidgetSelectorOpen"
      :available-widgets="availableWidgets"
      :selected-widget-ids="selectedWidgetIds"
      @close="isWidgetSelectorOpen = false"
      @save="handleSaveWidgets"
    />
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
  border: 1px solid rgba(255, 255, 255, 0.6);
  color: #525252;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  position: relative;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.icon-button:hover {
  background: rgba(255, 255, 255, 0.7);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8);
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

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1rem;
}

.add-widget-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: rgba(59, 130, 246, 0.15);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(59, 130, 246, 0.4);
  border-radius: 0.75rem;
  color: #3b82f6;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.add-widget-btn:hover {
  background: rgba(59, 130, 246, 0.25);
  border-color: rgba(59, 130, 246, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5);
}
</style>

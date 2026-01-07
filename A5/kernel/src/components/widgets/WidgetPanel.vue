<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  CalendarIcon, 
  BellIcon,
  PlusIcon
} from '@heroicons/vue/24/outline'
import WidgetSelector, { type WidgetOption } from './WidgetSelector.vue'
import HealthMetricWidget from '../health/HealthMetricWidget.vue'
import HealthChart from '../health/HealthChart.vue'
import { 
  getHealthParameter,
  getHealthHistory,
  WIDGET_DATA 
} from '../../constants/mockData'

const { t } = useI18n()
const isWidgetSelectorOpen = ref(false)
const selectedWidgetIds = ref<string[]>([])
const isLoadingWidgets = ref(false)
const loadingProgress = ref(0)

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

const handleSaveWidgets = async (newSelection: string[]) => {
  isWidgetSelectorOpen.value = false
  isLoadingWidgets.value = true
  loadingProgress.value = 0
  
  // Simula caricamento dati dai documenti
  const totalSteps = newSelection.length
  
  for (let i = 0; i < totalSteps; i++) {
    // Simula lettura documenti per ogni widget
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200))
    loadingProgress.value = ((i + 1) / totalSteps) * 100
  }
  
  // Piccolo delay finale per mostrare il completamento
  await new Promise(resolve => setTimeout(resolve, 200))
  
  selectedWidgetIds.value = newSelection
  localStorage.setItem('selectedWidgets', JSON.stringify(newSelection))
  isLoadingWidgets.value = false
  loadingProgress.value = 0
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

    <!-- Loading State -->
    <div v-if="isLoadingWidgets" class="loading-state">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <div class="loading-text">
          <p class="text-sm font-medium text-gray-700">{{ $t('widgets.loading.title') }}</p>
          <p class="text-xs text-gray-500">{{ $t('widgets.loading.description') }}</p>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: loadingProgress + '%' }"></div>
        </div>
        <div class="text-xs text-gray-500 text-center">{{ Math.round(loadingProgress) }}%</div>
      </div>
    </div>

    <div v-else-if="activeWidgets.length === 0" class="empty-state">
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
        <HealthMetricWidget
          v-else-if="widget.category === 'health-metric' && getHealthParameter(widget.id)"
          :parameter="getHealthParameter(widget.id)!"
          :compact="true"
        />

        <!-- Health Chart Widgets -->
        <HealthChart
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
.widget-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--white-40);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--white-60);
  border-radius: 1.5rem;
  padding: 1.25rem;
  box-shadow: 0 8px 32px var(--black-8), inset 0 1px 0 var(--white-80);
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
  border: 1px solid var(--white-60);
  color: var(--gray-525252);
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  position: relative;
  background: var(--white-50);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px var(--black-6), inset 0 1px 0 var(--white-60);
}

.icon-button:hover {
  background: var(--white-70);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--black-10), inset 0 1px 0 var(--white-80);
}

.widget-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.widget-card {
  background: var(--white-50);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 0.75rem;
  padding: 0.875rem 1rem;
  border: 1px solid var(--white-40);
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
  box-shadow: 0 2px 8px var(--black-6), inset 0 1px 0 var(--white-60);
}

.widget-card:hover {
  box-shadow: 0 4px 16px var(--black-12), inset 0 1px 0 var(--white-80);
  transform: translateY(-2px);
  background: var(--white-70);
}

.icon-pill {
  width: 2.5rem;
  height: 2.5rem;
  background: var(--white-80);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--white-30);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px var(--black-5);
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
  background: var(--blue-3b82f6-15);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--blue-3b82f6-40);
  border-radius: 0.75rem;
  color: var(--blue-3b82f6);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  box-shadow: 0 2px 8px var(--blue-3b82f6-15), inset 0 1px 0 var(--white-30);
}

.add-widget-btn:hover {
  background: var(--blue-3b82f6-25);
  border-color: var(--blue-3b82f6-60);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px var(--blue-3b82f6-30), inset 0 1px 0 var(--white-50);
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid var(--blue-3b82f6-20);
  border-top-color: var(--blue-3b82f6);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  text-align: center;
}

.progress-bar {
  width: 100%;
  height: 0.5rem;
  background: var(--blue-3b82f6-15);
  border-radius: 0.25rem;
  overflow: hidden;
  box-shadow: inset 0 1px 2px var(--black-10);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, var(--blue-3b82f6) 0%, var(--blue-8b5cf6) 100%);
  border-radius: 0.25rem;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 10px var(--accent-primary-50);
}
</style>

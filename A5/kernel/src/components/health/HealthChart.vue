<script setup lang="ts">
import { computed, ref } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
} from 'chart.js';
import type { HealthMetricHistory } from '../../types/health';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Props {
  title: string;
  data: HealthMetricHistory;
  unit: string;
  normalRange?: {
    min: number;
    max: number;
  };
  compact?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  compact: false
});

const showDetails = ref(false);

const chartData = computed(() => ({
  labels: props.data.data.map((d) => d.date),
  datasets: [
    {
      label: props.title,
      data: props.data.data.map((d) => d.value),
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: props.compact ? 2 : 4,
      pointHoverRadius: props.compact ? 4 : 6,
      pointBackgroundColor: '#3b82f6',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
    },
  ],
}));

const chartOptions = computed<ChartOptions<'line'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: props.compact ? 8 : 12,
      titleFont: {
        size: props.compact ? 12 : 14,
      },
      bodyFont: {
        size: props.compact ? 11 : 13,
      },
      callbacks: {
        label: (context) => {
          return `${context.parsed.y} ${props.unit}`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: props.compact ? 9 : 11,
        },
      },
    },
    y: {
      beginAtZero: false,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
      ticks: {
        font: {
          size: props.compact ? 9 : 11,
        },
        callback: (value) => {
          return `${value} ${props.unit}`;
        },
      },
    },
  },
}));

const toggleDetails = () => {
  showDetails.value = !showDetails.value;
};
</script>

<template>
  <div :class="compact ? 'compact-chart' : 'chart-widget'">
    <div :class="compact ? 'mb-2' : 'mb-4'">
      <h3 :class="compact ? 'text-md font-semibold text-gray-800' : 'text-lg font-semibold text-gray-800'">
        {{ title }}
      </h3>
      <p v-if="normalRange" :class="compact ? 'text-xs text-gray-600' : 'text-sm text-gray-600'">
        {{$t('health.normalRange')}}{{ normalRange.min }}-{{ normalRange.max }} {{ unit }}
      </p>
    </div>
    <div :class="compact ? 'h-32' : 'h-64'">
      <Line :data="chartData" :options="chartOptions" />
    </div>
    
    <!-- Source Documents Section -->
    <div class="source-documents-section">
      <button 
        @click="toggleDetails" 
        class="details-toggle"
      >
        <svg 
          class="w-4 h-4 transition-transform duration-200" 
          :class="{ 'rotate-180': showDetails }"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
        <span class="ml-2 text-sm font-medium">
          {{ showDetails ? $t('health.sourceDocuments.hideDetails') : $t('health.sourceDocuments.showDetails') }}
        </span>
      </button>
      
      <transition name="expand">
        <div v-if="showDetails" class="details-content">
          <p class="text-xs text-gray-600 mb-3">{{ $t('health.sourceDocuments.description') }}</p>
          <div v-if="data.sourceDocuments && data.sourceDocuments.length > 0" class="space-y-2">
            <div 
              v-for="doc in data.sourceDocuments" 
              :key="doc.id" 
              class="document-item"
            >
              <div class="flex items-start">
                <svg class="w-4 h-4 text-sky-600 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                </svg>
                <div class="ml-2 flex-1">
                  <p class="text-xs font-medium text-gray-800">{{ doc.title }}</p>
                  <p class="text-xs text-gray-500">{{ doc.date }}</p>
                </div>
              </div>
            </div>
          </div>
          <p v-else class="text-xs text-gray-500 italic">{{ $t('health.sourceDocuments.noDocuments') }}</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.compact-chart {
  width: 100%;
  padding: 0.875rem 1rem;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 0.75rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  align-self: start;
}

.compact-chart:hover {
  background: rgba(255, 255, 255, 0.65);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transform: translateY(-2px);
}

.chart-widget {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 1.25rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  align-self: start;
}

.chart-widget:hover {
  background: rgba(255, 255, 255, 0.65);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.source-documents-section {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.details-toggle {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  background: transparent;
  border: none;
  color: #0ea5e9;
  cursor: pointer;
  transition: color 0.2s;
  border-radius: 0.5rem;
}

.details-toggle:hover {
  color: #0284c7;
  background: rgba(14, 165, 233, 0.05);
}

.details-content {
  margin-top: 0.75rem;
  padding: 1rem;
  background: rgba(224, 242, 254, 0.3);
  border-radius: 0.75rem;
  border: 1px solid rgba(14, 165, 233, 0.15);
}

.document-item {
  padding: 0.625rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 0.5rem;
  border: 1px solid rgba(14, 165, 233, 0.1);
  transition: all 0.2s;
}

.document-item:hover {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(14, 165, 233, 0.2);
  transform: translateX(2px);
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 500px;
  transform: translateY(0);
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>

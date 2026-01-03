<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
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
} from 'chart.js'
import type { HealthMetricHistory } from '../../types/health'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface Props {
  title: string
  data: HealthMetricHistory
  unit: string
  normalRange?: {
    min: number
    max: number
  }
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  compact: false
})

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
}))

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
          return `${context.parsed.y} ${props.unit}`
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
          return `${value} ${props.unit}`
        },
      },
    },
  },
}))
</script>

<template>
  <div :class="compact ? 'compact-chart' : 'chart-widget'">
    <div :class="compact ? 'mb-2' : 'mb-4'">
      <h3 :class="compact ? 'text-sm font-semibold text-gray-800' : 'text-lg font-semibold text-gray-800'">
        {{ title }}
      </h3>
      <p v-if="normalRange" :class="compact ? 'text-xs text-gray-600' : 'text-sm text-gray-600'">
        {{ normalRange.min }}-{{ normalRange.max }} {{ unit }}
      </p>
    </div>
    <div :class="compact ? 'h-32' : 'h-64'">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style scoped>
.compact-chart {
  padding: 0.875rem 1rem;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 0.75rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.compact-chart:hover {
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transform: translateY(-2px);
}

.chart-widget {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 1.25rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.chart-widget:hover {
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8);
}
</style>

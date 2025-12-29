<script setup lang="ts">
import { computed } from 'vue';
import type { HealthParameter } from '../types/health';

interface Props {
  parameter: HealthParameter;
}

const props = defineProps<Props>();

const isInRange = computed(() => {
  return (
    props.parameter.value >= props.parameter.normalRange.min &&
    props.parameter.value <= props.parameter.normalRange.max
  );
});

const statusColor = computed(() => {
  return isInRange.value ? 'text-green-600' : 'text-red-600';
});

const trendIcon = computed(() => {
  if (props.parameter.trend === 'up') return '↗';
  if (props.parameter.trend === 'down') return '↘';
  return '→';
});

const trendColor = computed(() => {
  if (props.parameter.trend === 'up') return 'text-red-500';
  if (props.parameter.trend === 'down') return 'text-green-500';
  return 'text-gray-500';
});
</script>

<template>
  <div class="metric-widget">
    <div class="flex justify-between items-start mb-2">
      <h3 class="text-gray-700 text-sm font-medium">{{ parameter.name }}</h3>
      <span :class="trendColor" class="text-2xl font-bold">{{ trendIcon }}</span>
    </div>
    <div class="flex items-baseline mb-3">
      <span :class="statusColor" class="text-4xl font-bold">
        {{ parameter.value }}
      </span>
      <span class="text-gray-600 text-sm ml-2">{{ parameter.unit }}</span>
    </div>
    <div class="text-xs text-gray-600">
      Range normale: {{ parameter.normalRange.min }}-{{ parameter.normalRange.max }}
      {{ parameter.unit }}
    </div>
  </div>
</template>

<style scoped>
.metric-widget {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 1.25rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.metric-widget:hover {
  background: rgba(255, 255, 255, 0.65);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transform: translateY(-2px);
}
</style>

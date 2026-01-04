<script setup lang="ts">
import { computed, ref } from 'vue';
import type { HealthParameter } from '../../types/health';

interface Props {
  parameter: HealthParameter;
  compact?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  compact: false
});

const showDetails = ref(false);

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

const toggleDetails = () => {
  showDetails.value = !showDetails.value;
};
</script>

<template>
  <div :class="compact ? 'compact-metric' : 'metric-widget'">
    <div class="flex justify-between items-start" :class="compact ? 'mb-1' : 'mb-2'">
      <h3 class="text-gray-800 font-semibold" :class="compact ? 'text-md' : 'text-lg'">{{ parameter.name }}</h3>
      <span :class="[trendColor, compact ? 'text-lg' : 'text-2xl']" class="font-bold">{{ trendIcon }}</span>
    </div>
    <div class="text-xs text-gray-600" :class="compact ? 'mb-2' : 'mb-3'">
      {{ $t('health.normalRange') }} {{ parameter.normalRange.min }}-{{ parameter.normalRange.max }}
      {{ parameter.unit }}
    </div>
    <div class="flex items-baseline" :class="compact ? 'mb-1' : 'mb-3'">
      <span :class="[statusColor, compact ? 'text-2xl' : 'text-4xl']" class="font-bold">
        {{ parameter.value }}
      </span>
      <span class="text-gray-600" :class="[compact ? 'text-xs ml-1' : 'text-sm ml-2']">{{ parameter.unit }}</span>
    </div>

    <!-- Source Documents Section -->
    <div class="source-documents-section">
      <button @click="toggleDetails" class="details-toggle">
        <svg class="w-3.5 h-3.5 transition-transform duration-200" :class="{ 'rotate-180': showDetails }" fill="none"
          stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
        <span class="ml-1.5 text-xs font-medium">
          {{ showDetails ? $t('health.sourceDocuments.hideDetails') : $t('health.sourceDocuments.showDetails') }}
        </span>
      </button>

      <transition name="expand">
        <div v-if="showDetails" class="details-content">
          <p class="text-xs text-gray-600 mb-2">{{ $t('health.sourceDocuments.description') }}</p>
          <div v-if="parameter.sourceDocuments && parameter.sourceDocuments.length > 0" class="space-y-1.5">
            <div v-for="doc in parameter.sourceDocuments" :key="doc.id" class="document-item">
              <div class="flex items-start">
                <svg class="w-3.5 h-3.5 text-sky-600 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clip-rule="evenodd" />
                </svg>
                <div class="ml-1.5 flex-1">
                  <p class="text-xs font-medium text-gray-800 leading-tight">{{ doc.title }}</p>
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
.compact-metric {
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

.compact-metric:hover {
  background: rgba(255, 255, 255, 0.65);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transform: translateY(-2px);
}

.metric-widget {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 1.25rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  align-self: start;
}

.metric-widget:hover {
  background: rgba(255, 255, 255, 0.65);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transform: translateY(-2px);
}

.source-documents-section {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.details-toggle {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.375rem;
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
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: rgba(224, 242, 254, 0.3);
  border-radius: 0.5rem;
  border: 1px solid rgba(14, 165, 233, 0.15);
}

.document-item {
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 0.375rem;
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
  max-height: 400px;
  transform: translateY(0);
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>

<script setup lang="ts">
import { computed } from 'vue';
import type { HealthAlert } from '../../types/health';

interface Props {
  alert: HealthAlert;
}

const props = defineProps<Props>();

const alertClasses = computed(() => {
  const baseClasses = 'p-4 rounded-lg border-l-4 mb-3';
  if (props.alert.severity === 'danger') {
    return `${baseClasses} bg-red-50 border-red-500`;
  }
  return `${baseClasses} bg-yellow-50 border-yellow-500`;
});

const iconClasses = computed(() => {
  if (props.alert.severity === 'danger') {
    return 'text-red-600';
  }
  return 'text-yellow-600';
});

const titleClasses = computed(() => {
  if (props.alert.severity === 'danger') {
    return 'text-red-800';
  }
  return 'text-yellow-800';
});

const textClasses = computed(() => {
  if (props.alert.severity === 'danger') {
    return 'text-red-700';
  }
  return 'text-yellow-700';
});
</script>

<template>
  <div :class="alertClasses">
    <div class="flex items-start">
      <div class="shrink-0">
        <svg
          :class="iconClasses"
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="ml-3 flex-1">
        <h3 :class="titleClasses" class="text-sm font-semibold mb-1">
          {{ alert.parameterName }}
        </h3>
        <p :class="textClasses" class="text-sm mb-2">
          {{ alert.message }}
        </p>
        <p :class="textClasses" class="text-sm font-medium">
          💡 {{ alert.recommendation }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.p-4 {
  padding: 1rem;
}

.rounded-lg {
  border-radius: 1rem;
}

.border-l-4 {
  border-left-width: 4px;
}

.mb-3 {
  margin-bottom: 0.75rem;
}

.bg-red-50 {
  background: var(--error-10-on-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--error-30);
  box-shadow: 0 4px 16px var(--shadow), inset 0 1px 0 var(--white-50);
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.bg-red-50:hover {
  background: var(--error-15-on-bg);
  box-shadow: 0 6px 20px var(--shadow), inset 0 1px 0 var(--white-60);
}

.border-red-500 {
  border-left-color: var(--error);
}

.bg-yellow-50 {
  background: var(--warning-10-on-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--warning-30);
  box-shadow: 0 4px 16px var(--shadow), inset 0 1px 0 var(--white-50);
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.bg-yellow-50:hover {
  background: var(--warning-15-on-bg);
  box-shadow: 0 6px 20px var(--shadow), inset 0 1px 0 var(--white-60);
}

.border-yellow-500 {
  border-left-color: var(--warning);
}

.text-red-600 {
  color: var(--error);
}

.text-red-700 {
  color: var(--error);
}

.text-red-800 {
  color: var(--error);
}

.text-yellow-600 {
  color: var(--warning);
}

.text-yellow-700 {
  color: var(--warning);
}

.text-yellow-800 {
  color: var(--warning);
}
</style>

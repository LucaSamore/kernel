<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  id: string
  label: string
  error?: string
  required?: boolean
  description?: string
}

const props = defineProps<Props>()

const errorId = computed(() => `${props.id}-error`)
const descriptionId = computed(() => `${props.id}-description`)

const ariaDescribedby = computed(() => {
  const ids: string[] = []
  if (props.description) ids.push(descriptionId.value)
  if (props.error) ids.push(errorId.value)
  return ids.length > 0 ? ids.join(' ') : undefined
})
</script>

<template>
  <div class="form-field">
    <label 
      :for="id" 
      class="form-label"
      :class="{ 'form-label-required': required }"
    >
      {{ label }}
      <span v-if="required" class="required-indicator" aria-label="campo obbligatorio">*</span>
    </label>

    <p 
      v-if="description" 
      :id="descriptionId" 
      class="form-description"
    >
      {{ description }}
    </p>

    <div class="form-input-wrapper">
      <slot 
        :id="id"
        :aria-invalid="error ? 'true' : 'false'"
        :aria-describedby="ariaDescribedby"
        :aria-required="required"
      />
    </div>

    <div 
      v-if="error" 
      :id="errorId" 
      class="form-error"
      role="alert"
      aria-live="polite"
    >
      <svg 
        class="form-error-icon" 
        viewBox="0 0 20 20" 
        fill="currentColor"
        aria-hidden="true"
      >
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
      <span>{{ error }}</span>
    </div>
  </div>
</template>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #171717;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.form-label-required {
  color: #171717;
}

.required-indicator {
  color: #dc2626;
  font-weight: 700;
}

.form-description {
  font-size: 0.8125rem;
  color: #525252;
  margin: 0;
  line-height: 1.5;
}

.form-input-wrapper {
  position: relative;
}

.form-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 0.875rem;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #dc2626;
  animation: slideDown 0.2s ease-out;
}

.form-error-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Focus styles per input dentro il wrapper */
.form-input-wrapper:focus-within {
  /* Gli stili di focus sono gestiti dai singoli input */
}
</style>

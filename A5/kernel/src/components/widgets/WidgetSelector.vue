<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseModal from '../shared/BaseModal.vue'

export interface WidgetOption {
  id: string
  name: string
  description: string
  icon: string
  category: 'quick' | 'health-metric' | 'health-chart'
}

interface Props {
  isOpen: boolean
  availableWidgets: WidgetOption[]
  selectedWidgetIds: string[]
}

const props = defineProps<Props>()
const { t } = useI18n()

const emit = defineEmits<{
  close: []
  save: [selectedIds: string[]]
}>()

const localSelection = ref<string[]>([...props.selectedWidgetIds])

// Sincronizza localSelection quando la modale si apre
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    localSelection.value = [...props.selectedWidgetIds]
  }
})

const toggleWidget = (widgetId: string) => {
  const index = localSelection.value.indexOf(widgetId)
  if (index > -1) {
    localSelection.value.splice(index, 1)
  } else {
    localSelection.value.push(widgetId)
  }
}

const isSelected = (widgetId: string) => {
  return localSelection.value.includes(widgetId)
}

const handleSave = () => {
  emit('save', localSelection.value)
  emit('close')
}

const categorizedWidgets = computed(() => {
  const categories = {
    quick: [] as WidgetOption[],
    'health-metric': [] as WidgetOption[],
    'health-chart': [] as WidgetOption[]
  }
  
  props.availableWidgets.forEach(widget => {
    categories[widget.category].push(widget)
  })
  
  return categories
})

const getCategoryName = (category: string) => {
  const categoryMap: Record<string, string> = {
    'quick': t('widgets.categories.quick'),
    'health-metric': t('widgets.categories.healthMetric'),
    'health-chart': t('widgets.categories.healthChart')
  }
  return categoryMap[category] || category
}
</script>

<template>
  <BaseModal
    :is-open="isOpen"
    :title="$t('widgets.selector.title')"
    :subtitle="$t('widgets.selector.subtitle', { count: localSelection.length, total: availableWidgets.length })"
    max-width="lg"
    @close="emit('close')"
  >
          <div 
            v-for="(widgets, category) in categorizedWidgets" 
            :key="category"
            class="category-section"
          >
            <h3 class="category-title">{{ getCategoryName(category as string) }}</h3>
            <div class="widget-grid">
              <div
                v-for="widget in widgets"
                :key="widget.id"
                class="widget-option"
                :class="{ 'widget-selected': isSelected(widget.id) }"
                @click="toggleWidget(widget.id)"
              >
                <div class="widget-option-main">
                  <div class="widget-icon-large">{{ widget.icon }}</div>
                  <div class="widget-option-content">
                    <div class="widget-option-name">{{ widget.name }}</div>
                    <div class="widget-option-description">{{ widget.description }}</div>
                  </div>
                </div>
                <div class="widget-option-footer">
                  <div class="checkbox-wrapper">
                    <div class="checkbox" :class="{ 'checkbox-checked': isSelected(widget.id) }">
                      <svg v-if="isSelected(widget.id)" class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span class="checkbox-label">{{ isSelected(widget.id) ? $t('widgets.selector.selected') : $t('widgets.selector.select') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
    <template #footer>
      <button class="button button-secondary" @click="emit('close')">
        {{ $t('widgets.selector.cancel') }}
      </button>
      <button class="button button-primary" @click="handleSave">
        {{ $t('widgets.selector.save') }}
      </button>
    </template>
  </BaseModal>
</template>

<style scoped>
.category-section {
  margin-bottom: 2rem;
}

.category-section:last-child {
  margin-bottom: 0;
}

.category-title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #404040;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 1rem 0;
  padding-left: 0.25rem;
}

.widget-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 1.25rem;
}

.widget-option {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 1.25rem;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.widget-option:hover {
  background: rgba(255, 255, 255, 0.4);
  border-color: rgba(59, 130, 246, 0.4);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.widget-selected {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
  border-color: rgba(59, 130, 246, 0.7);
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.widget-selected:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
  border-color: rgba(59, 130, 246, 0.8);
  box-shadow: 0 8px 28px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.widget-option-main {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  flex: 1;
}

.widget-icon-large {
  font-size: 2.5rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.6);
  flex-shrink: 0;
}

.widget-option-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 1.25rem;
  background: rgba(0, 0, 0, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.checkbox-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #525252;
  transition: color 0.3s;
}

.widget-selected .checkbox-label {
  color: #3b82f6;
}

.checkbox {
  width: 1.75rem;
  height: 1.75rem;
  border: 2.5px solid rgba(209, 213, 219, 0.8);
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
}

.checkbox-checked {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border-color: transparent;
  box-shadow: 0 3px 12px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.widget-option-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.widget-option-name {
  font-size: 1rem;
  font-weight: 700;
  color: #171717;
  line-height: 1.3;
}

.widget-option-description {
  font-size: 0.8125rem;
  color: #737373;
  line-height: 1.5;
}

.button {
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.button-secondary {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: #525252;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.button-secondary:hover {
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  transform: translateY(-1px);
}

.button-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
}

.button-primary:hover {
  box-shadow: 0 6px 24px rgba(59, 130, 246, 0.4);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .widget-grid {
    grid-template-columns: 1fr;
  }
}
</style>

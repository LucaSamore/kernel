<script setup lang="ts">
import { ref, computed } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

export interface WidgetOption {
  id: string
  name: string
  description: string
  icon: string
  category: 'quick' | 'health-metric' | 'health-chart'
}

interface Props {
  availableWidgets: WidgetOption[]
  selectedWidgetIds: string[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  save: [selectedIds: string[]]
}>()

const localSelection = ref<string[]>([...props.selectedWidgetIds])

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

const categoryNames = {
  quick: 'Widget rapidi',
  'health-metric': 'Parametri vitali',
  'health-chart': 'Grafici andamento'
}
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="emit('close')">
      <div class="modal-container">
        <div class="modal-header">
          <div>
            <h2 class="modal-title">Personalizza i tuoi widget</h2>
            <p class="modal-subtitle">Selezionati: {{ localSelection.length }} / {{ availableWidgets.length }}</p>
          </div>
          <button 
            class="close-button"
            @click="emit('close')"
            aria-label="Chiudi"
          >
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>

        <div class="modal-body">
          <div 
            v-for="(widgets, category) in categorizedWidgets" 
            :key="category"
            class="category-section"
          >
            <h3 class="category-title">{{ categoryNames[category as keyof typeof categoryNames] }}</h3>
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
                    <span class="checkbox-label">{{ isSelected(widget.id) ? 'Selezionato' : 'Seleziona' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="button button-secondary" @click="emit('close')">
            Annulla
          </button>
          <button class="button button-primary" @click="handleSave">
            Salva modifiche
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(224, 242, 254, 0.10) 0%, rgba(221, 214, 254, 0.10) 50%, rgba(252, 231, 243, 0.10) 100%);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  animation: fadeIn 0.2s ease-out;
}

.modal-overlay::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(14, 165, 233, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%);
  pointer-events: none;
}

.modal-container {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  max-width: 42rem;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s cubic-bezier(0, 0, 0.2, 1);
  position: relative;
  z-index: 1;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #171717;
  margin: 0;
}

.modal-subtitle {
  font-size: 0.875rem;
  color: #737373;
  margin: 0.25rem 0 0 0;
}

.close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #525252;
  border: 1px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 2rem;
}

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

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .modal-container {
    max-height: 95vh;
  }

  .widget-grid {
    grid-template-columns: 1fr;
  }

  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 1.25rem 1.5rem;
  }
}
</style>

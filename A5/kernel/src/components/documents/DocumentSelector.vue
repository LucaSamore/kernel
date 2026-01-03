<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'
import type { Document } from '../shared/DocumentCard.vue'

interface Props {
  selectedDocId: string | null
  availableDocuments: Document[]
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Seleziona un documento'
})

const emit = defineEmits<{
  select: [docId: string]
}>()

const { t } = useI18n()
const showDropdown = ref(false)

const selectedDocument = computed(() => {
  return props.availableDocuments.find(doc => doc.id === props.selectedDocId) || null
})

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const selectDocument = (docId: string) => {
  emit('select', docId)
  showDropdown.value = false
}

const closeDropdown = () => {
  showDropdown.value = false
}

// Chiudi dropdown quando si clicca fuori
defineExpose({ closeDropdown })
</script>

<template>
  <div class="selector-wrapper">
    <div class="selector-dropdown">
      <button
        type="button"
        :class="['selector-button', { 'has-selection': selectedDocId }]"
        @click="toggleDropdown"
      >
        <span class="selector-label">
          {{ selectedDocument ? selectedDocument.title : placeholder }}
        </span>
        <ChevronDownIcon class="w-5 h-5" />
      </button>

      <Transition name="dropdown">
        <div v-if="showDropdown" class="dropdown-menu">
          <div class="dropdown-header">
            {{ t('documents.comparison.availableDocuments') }}
          </div>
          <div class="dropdown-items">
            <button
              v-for="doc in availableDocuments"
              :key="doc.id"
              type="button"
              :class="['dropdown-item', { 'is-selected': doc.id === selectedDocId }]"
              @click="selectDocument(doc.id)"
            >
              <div class="dropdown-item-content">
                <span class="dropdown-item-title">{{ doc.title }}</span>
                <div class="dropdown-item-tags">
                  <span
                    v-for="(tag, index) in doc.tags"
                    :key="index"
                    class="dropdown-tag"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.selector-wrapper {
  position: relative;
}

.selector-dropdown {
  position: relative;
}

.selector-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 1rem;
  color: #525252;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.selector-button:hover {
  background: rgba(255, 255, 255, 0.4);
  border-color: rgba(59, 130, 246, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.selector-button.has-selection {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
  border-color: rgba(59, 130, 246, 0.6);
  color: #171717;
}

.selector-label {
  flex: 1;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  z-index: 10;
  overflow: hidden;
}

.dropdown-header {
  padding: 0.75rem 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #525252;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
}

.dropdown-items {
  max-height: 20rem;
  overflow-y: auto;
}

.dropdown-item {
  width: 100%;
  padding: 0.875rem 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
  text-align: left;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background: rgba(59, 130, 246, 0.08);
}

.dropdown-item.is-selected {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
}

.dropdown-item-content {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.dropdown-item-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #171717;
}

.dropdown-item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.dropdown-tag {
  padding: 0.125rem 0.5rem;
  background: rgba(0, 0, 0, 0.06);
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #525252;
}

/* Animazione dropdown */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

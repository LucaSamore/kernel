<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseModal from '../../shared/BaseModal.vue'
import DocumentSelector from './DocumentSelector.vue'
import DocumentViewer from '../DocumentViewer.vue'
import type { Document } from '../../shared/DocumentCard.vue'

interface Props {
  isOpen: boolean
  documents: Document[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const { t } = useI18n()

// State
const selectedLeftDoc = ref<string | null>(null)
const selectedRightDoc = ref<string | null>(null)
const leftPageIndex = ref(0)
const rightPageIndex = ref(0)

// Filtra documenti per escludere le prescrizioni
const comparableDocuments = computed(() => {
  return props.documents.filter(doc => !doc.tags.includes('Prescrizione'))
})

// Documenti disponibili per i dropdown (con esclusione mutua)
const leftAvailableDocuments = computed(() => {
  return comparableDocuments.value.filter(doc => doc.id !== selectedRightDoc.value)
})

const rightAvailableDocuments = computed(() => {
  return comparableDocuments.value.filter(doc => doc.id !== selectedLeftDoc.value)
})

// Documenti selezionati completi
const leftDocument = computed(() => {
  return comparableDocuments.value.find(doc => doc.id === selectedLeftDoc.value) || null
})

const rightDocument = computed(() => {
  return comparableDocuments.value.find(doc => doc.id === selectedRightDoc.value) || null
})

// Handlers per selezione documenti
const handleSelectLeft = (docId: string) => {
  selectedLeftDoc.value = docId
  leftPageIndex.value = 0
}

const handleSelectRight = (docId: string) => {
  selectedRightDoc.value = docId
  rightPageIndex.value = 0
}

// Handlers per navigazione pagine
const handleLeftPrevPage = () => {
  if (leftPageIndex.value > 0) {
    leftPageIndex.value--
  }
}

const handleLeftNextPage = () => {
  leftPageIndex.value++
}

const handleRightPrevPage = () => {
  if (rightPageIndex.value > 0) {
    rightPageIndex.value--
  }
}

const handleRightNextPage = () => {
  rightPageIndex.value++
}

// Reset e chiusura
const handleClose = () => {
  selectedLeftDoc.value = null
  selectedRightDoc.value = null
  leftPageIndex.value = 0
  rightPageIndex.value = 0
  emit('close')
}

// Reset quando il modal si chiude
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    selectedLeftDoc.value = null
    selectedRightDoc.value = null
    leftPageIndex.value = 0
    rightPageIndex.value = 0
  }
})
</script>

<template>
  <BaseModal
    :is-open="isOpen"
    max-width="xl"
    :show-footer="true"
    @close="handleClose"
  >
    <template #header>
      <div class="comparison-header">
        <h2 class="comparison-title">{{ t('documents.comparison.title') }}</h2>
        <p class="comparison-subtitle">{{ t('documents.comparison.subtitle') }}</p>
      </div>
    </template>

    <div class="comparison-container">
      <!-- Selettori documenti -->
      <div class="selectors-row">
        <DocumentSelector
          :selected-doc-id="selectedLeftDoc"
          :available-documents="leftAvailableDocuments"
          :placeholder="t('documents.comparison.selectDocument')"
          @select="handleSelectLeft"
        />
        
        <DocumentSelector
          :selected-doc-id="selectedRightDoc"
          :available-documents="rightAvailableDocuments"
          :placeholder="t('documents.comparison.selectDocument')"
          @select="handleSelectRight"
        />
      </div>

      <!-- Visualizzatori documenti -->
      <div class="documents-row">
        <DocumentViewer
          :document="leftDocument"
          :current-page-index="leftPageIndex"
          @prev-page="handleLeftPrevPage"
          @next-page="handleLeftNextPage"
        />
        
        <DocumentViewer
          :document="rightDocument"
          :current-page-index="rightPageIndex"
          @prev-page="handleRightPrevPage"
          @next-page="handleRightNextPage"
        />
      </div>
    </div>

    <template #footer>
      <button class="button button-secondary" @click="handleClose">
        {{ t('documents.comparison.close') }}
      </button>
    </template>
  </BaseModal>
</template>

<style scoped>
.comparison-header {
  width: 100%;
}

.comparison-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
}

.comparison-subtitle {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
}

.comparison-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: 60vh;
}

.selectors-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.documents-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  flex: 1;
}

.button {
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.button-secondary {
  background: var(--white-30);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--white-50);
  color: var(--text-secondary);
  box-shadow: 0 2px 8px var(--shadow), inset 0 1px 0 var(--white-50);
}

.button-secondary:hover {
  background: var(--white-40);
  box-shadow: 0 4px 16px var(--shadow), inset 0 1px 0 var(--white-70);
  transform: translateY(-1px);
}

@media (max-width: 1024px) {
  .selectors-row,
  .documents-row {
    grid-template-columns: 1fr;
  }
}
</style>

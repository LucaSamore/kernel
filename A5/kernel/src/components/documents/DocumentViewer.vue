<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'
import type { Document } from '../shared/DocumentCard.vue'

// Import delle immagini del referto (per ora uguali per tutti)
import referto1 from '../../assets/documents/referto_ECG_1.jpg'
import referto2 from '../../assets/documents/referto_ECG_2.jpg'
import referto3 from '../../assets/documents/referto_ECG_3.jpg'

interface Props {
  document: Document | null
  currentPageIndex: number
  showPanel?: boolean  // Se false, non mostra il wrapper panel (per uso in modal)
  previewHeight?: string  // Altezza custom della preview
}

const props = withDefaults(defineProps<Props>(), {
  showPanel: true,
  previewHeight: '22rem',
  showHospital: false
})

const emit = defineEmits<{
  prevPage: []
  nextPage: []
}>()

const { t } = useI18n()

// Array delle immagini del referto
const documentImages = [referto1, referto2, referto3]
const totalPages = documentImages.length

const currentImage = computed(() => {
  return documentImages[props.currentPageIndex]
})

const canGoPrev = computed(() => props.currentPageIndex > 0)
const canGoNext = computed(() => props.currentPageIndex < totalPages - 1)
</script>

<template>
  <div :class="showPanel ? 'document-panel' : 'document-viewer-standalone'">
    <!-- Placeholder quando non c'è selezione -->
    <div v-if="!document" class="placeholder">
      <div class="placeholder-icon">📄</div>
      <p class="placeholder-text">{{ t('documents.comparison.selectPlaceholder') }}</p>
    </div>

    <!-- Document Viewer -->
    <div v-else class="document-viewer">
      <!-- Preview con navigazione -->
      <div class="document-preview-wrapper">
        <button
          type="button"
          class="nav-button"
          :disabled="!canGoPrev"
          @click="emit('prevPage')"
        >
          <ChevronLeftIcon class="w-6 h-6" />
        </button>

        <div class="preview-area" :style="{ height: previewHeight }">
          <img
            :src="currentImage"
            :alt="`${document.title} - ${t('documents.comparison.page', { current: currentPageIndex + 1, total: totalPages })}`"
            class="document-image"
          />
        </div>

        <button
          type="button"
          class="nav-button"
          :disabled="!canGoNext"
          @click="emit('nextPage')"
        >
          <ChevronRightIcon class="w-6 h-6" />
        </button>
      </div>

      <!-- Page indicator -->
      <div class="page-indicator">
        <span class="page-text">
          {{ t('documents.comparison.page', { current: currentPageIndex + 1, total: totalPages }) }}
        </span>
      </div>

      <!-- Slot per metadata custom (es. con icone per modal) -->
      <slot name="metadata">
        <!-- Default: Document info semplice (per comparison) -->
        <div class="document-info">
          <!-- Description -->
          <div v-if="document.description" class="info-section">
            <span class="info-label">{{ t('documents.comparison.description') }}</span>
            <p class="description-text">{{ document.description }}</p>
          </div>

          <!-- Tags -->
          <div v-if="document.tags?.length" class="info-section">
            <span class="info-label">{{ t('documents.comparison.tags') }}</span>
            <div class="info-tags">
              <span
                v-for="(tag, index) in document.tags"
                :key="index"
                class="info-tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Date -->
          <div class="info-row">
            <span class="info-label">{{ t('documents.comparison.date') }}</span>
            <span class="info-value">{{ document.date }}</span>
          </div>

          <!-- Doctor -->
          <div class="info-row">
            <span class="info-label">{{ t('documents.comparison.doctor') }}</span>
            <span class="info-value">{{ document.doctor }}</span>
          </div>

          <!-- Hospital -->
          <div class="info-row">
            <span class="info-label">{{ t('documents.comparison.hospital') }}</span>
            <span class="info-value">{{ document.hospital }}</span>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.document-panel {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 1.25rem;
  padding: 1.25rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.document-viewer-standalone {
  display: flex;
  flex-direction: column;
}

.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 100%;
  min-height: 25rem;
}

.placeholder-icon {
  font-size: 4rem;
  opacity: 0.3;
}

.placeholder-text {
  font-size: 1rem;
  font-weight: 600;
  color: #737373;
  opacity: 0.6;
}

.document-viewer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.document-preview-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.preview-area {
  background: linear-gradient(135deg, rgba(224, 242, 254, 0.4) 0%, rgba(221, 214, 254, 0.4) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 1rem;
  padding: 0.75rem;
  /* height rimossa - ora controllata via prop */
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6);
  overflow: hidden;
}

.document-image {
  height: 100%;
  width: 100%;
  object-fit: contain;
  border-radius: 0.5rem;
}

.nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(224, 242, 254, 0.5) 0%, rgba(221, 214, 254, 0.5) 100%);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  color: #0ea5e9;
  flex-shrink: 0;
  box-shadow: 0 4px 16px rgba(14, 165, 233, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.nav-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.6);
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.nav-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.page-indicator {
  text-align: center;
}

.page-text {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #64748b;
  background: linear-gradient(135deg, rgba(224, 242, 254, 0.4) 0%, rgba(221, 214, 254, 0.4) 100%);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 0.375rem 0.875rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  display: inline-block;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.document-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.875rem;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8125rem;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  font-size: 0.8125rem;
}

.info-label {
  font-weight: 600;
  color: #525252;
}

.info-value {
  color: #171717;
  font-weight: 500;
}

.description-text {
  color: #171717;
  line-height: 1.5;
}

.info-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.info-tag {
  padding: 0.25rem 0.625rem;
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #525252;
}
</style>

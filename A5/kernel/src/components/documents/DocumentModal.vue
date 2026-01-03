<script setup lang="ts">
import { ref } from 'vue'
import { ArrowDownTrayIcon, ShareIcon } from '@heroicons/vue/24/outline'
import type { Document } from '../shared/DocumentCard.vue'
import BaseModal from '../shared/BaseModal.vue'
import DocumentViewer from './DocumentViewer.vue'

interface Props {
  document: Document | null
  isOpen: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const currentPageIndex = ref(0)

const handlePrevPage = () => {
  if (currentPageIndex.value > 0) {
    currentPageIndex.value--
  }
}

const handleNextPage = () => {
  currentPageIndex.value++
}

const handleDownload = () => {
  console.log('Download documento:', props.document?.id)
  // Implementare logica di download
}

const handleShare = () => {
  console.log('Condividi documento:', props.document?.id)
  // Implementare logica di condivisione
}
</script>

<template>
  <BaseModal
    v-if="document"
    :is-open="isOpen"
    :title="document.title"
    max-width="md"
    @close="emit('close')"
  >
    <template #header>
      <div class="document-header">
        <h2 class="document-title">{{ document.title }}</h2>
      </div>
    </template>

    <!-- DocumentViewer con stile default -->
    <DocumentViewer
      :document="document"
      :current-page-index="currentPageIndex"
      :show-panel="false"
      preview-height="35vh"
      @prev-page="handlePrevPage"
      @next-page="handleNextPage"
    />

    <template #footer>
      <button class="action-button download-button" @click="handleDownload">
        <ArrowDownTrayIcon class="w-5 h-5" />
        {{ $t('documentModal.download') }}
      </button>
      <button class="action-button share-button" @click="handleShare">
        <ShareIcon class="w-5 h-5" />
        {{ $t('documentModal.share') }}
      </button>
    </template>
  </BaseModal>
</template>

<style scoped>
.document-header {
  width: 100%;
}

.document-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.action-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 1rem;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
  border: 1px solid transparent;
}

.download-button {
  background: linear-gradient(135deg, #0ea5e9 0%, #a855f7 100%);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 16px rgba(14, 165, 233, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.download-button:hover {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.95) 0%, rgba(59, 130, 246, 1) 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(14, 165, 233, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.share-button {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #171717;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.share-button:hover {
  background: rgba(255, 255, 255, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

@media (max-width: 768px) {
  .action-button {
    width: 100%;
  }
}
</style>

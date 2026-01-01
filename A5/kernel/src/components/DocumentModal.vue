<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowDownTrayIcon, ShareIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { CalendarIcon, UserIcon, BuildingOfficeIcon } from '@heroicons/vue/24/solid'
import type { Document } from './DocumentCard.vue'
import BaseModal from './shared/BaseModal.vue'

// Import delle immagini del referto
import referto1 from '../assets/documents/referto_ECG_1.jpg'
import referto2 from '../assets/documents/referto_ECG_2.jpg'
import referto3 from '../assets/documents/referto_ECG_3.jpg'

interface Props {
  document: Document | null
  isOpen: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

// Array delle immagini del referto
const documentImages = [referto1, referto2, referto3]

const currentPage = ref(1)
const totalPages = ref(documentImages.length) // Numero di pagine basato sulle immagini

// Immagine corrente da visualizzare
const currentImage = computed(() => {
  return documentImages[currentPage.value - 1]
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const handleDownload = () => {
  console.log('Download documento:', props.document?.id)
  // Implementare logica di download
}

const handleShare = () => {
  console.log('Condividi documento:', props.document?.id)
  // Implementare logica di condivisione
}

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    emit('close')
  }
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
        <div class="tags-container-header">
          <span
            v-for="(tag, index) in document.tags"
            :key="index"
            class="tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </template>
          <!-- Document Preview -->
          <div class="document-preview">
            <button
              class="nav-button nav-left"
              :disabled="currentPage <= 1"
              @click="prevPage"
            >
              <ChevronLeftIcon class="w-6 h-6" />
            </button>

            <div class="preview-area">
              <img 
                :src="currentImage" 
                :alt="`${document.title} - Pagina ${currentPage}`"
                class="document-image"
              />
            </div>

            <button
              class="nav-button nav-right"
              :disabled="currentPage >= totalPages"
              @click="nextPage"
            >
              <ChevronRightIcon class="w-6 h-6" />
            </button>
          </div>

          <!-- Page Indicator -->
          <div class="page-indicator">
            <span class="page-text">Pagina {{ currentPage }} di {{ totalPages }}</span>
          </div>

          <!-- Description -->
          <div class="description-section">
            <p class="description-label">{{ $t('documentModal.descriptionLabel') }}</p>
            <p class="description-text">{{ document.description }}</p>
          </div>

          <!-- Metadata -->
          <div class="metadata-grid">
            <div class="metadata-item">
              <CalendarIcon class="w-5 h-5 text-gray-600" />
              <span>{{ document.date }}</span>
            </div>
            <div class="metadata-item">
              <UserIcon class="w-5 h-5 text-gray-600" />
              <span>{{ document.doctor }}</span>
            </div>
            <div class="metadata-item">
              <BuildingOfficeIcon class="w-5 h-5 text-gray-600" />
              <span>{{ document.hospital }}</span>
            </div>
          </div>

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
  margin: 0 0 0.75rem 0;
}

.tags-container-header {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.document-preview {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.preview-area {
  background: linear-gradient(135deg, rgba(224, 242, 254, 0.4) 0%, rgba(221, 214, 254, 0.4) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 1.25rem;
  padding: 1rem;
  height: 35vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 0 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6);
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  overflow: hidden;
}

.document-image {
  height: 100%;
  object-fit: contain;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.page-indicator {
  text-align: center;
  margin-bottom: 1.5rem;
}

.page-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748b;
  background: linear-gradient(135deg, rgba(224, 242, 254, 0.4) 0%, rgba(221, 214, 254, 0.4) 100%);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  display: inline-block;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.nav-button {
  margin-bottom: 1.5rem;
}

.page-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748b;
  background: linear-gradient(135deg, rgba(224, 242, 254, 0.4) 0%, rgba(221, 214, 254, 0.4) 100%);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  display: inline-block;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
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

.nav-button:hover {
  background: rgba(255, 255, 255, 0.6);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.nav-button:disabled {
  opacity: 0;
  cursor: default;
  pointer-events: none;
  transform: none;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tag {
  padding: 0.35rem 0.75rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.65rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #171717;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
}

.description-section {
  margin-bottom: 1.5rem;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(135deg, rgba(252, 231, 243, 0.3) 0%, rgba(224, 242, 254, 0.3) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 1.25rem;
  box-shadow: 0 4px 16px rgba(168, 85, 247, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.description-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: black;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.description-text {
  font-size: 0.95rem;
  color: #0f172a;
  line-height: 1.6;
}

.metadata-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.metadata-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.125rem;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 0.875rem;
  font-size: 0.875rem;
  color: #171717;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.6);
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.modal-footer {
  display: flex;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  background: linear-gradient(135deg, rgba(224, 242, 254, 0.3) 0%, rgba(221, 214, 254, 0.3) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
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
  .metadata-grid {
    grid-template-columns: 1fr;
  }
  
  .action-button {
    width: 100%;
  }
}
</style>

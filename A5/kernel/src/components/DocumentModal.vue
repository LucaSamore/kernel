<script setup lang="ts">
import { ref, computed } from 'vue'
import { XMarkIcon, ArrowDownTrayIcon, ShareIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { CalendarIcon, UserIcon, BuildingOfficeIcon } from '@heroicons/vue/24/solid'
import type { Document } from './DocumentCard.vue'

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
  <Transition name="modal">
    <div
      v-if="isOpen && document"
      class="modal-backdrop"
      @click="handleBackdropClick"
    >
      <div class="modal-container" @click.stop>
        <!-- Header -->
        <div class="modal-header">
          <h2 class="modal-title">
            {{ document.title }}
          </h2>
          <button class="close-button" @click="$emit('close')">
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>

        <!-- Content -->
        <div class="modal-content">
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

          <!-- Tags -->
          <div class="tags-container">
            <span
              v-for="(tag, index) in document.tags"
              :key="index"
              class="tag"
            >
              {{ tag }}
            </span>
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
        </div>

        <!-- Footer Actions -->
        <div class="modal-footer">
          <button class="action-button download-button" @click="handleDownload">
            <ArrowDownTrayIcon class="w-5 h-5" />
            {{ $t('documentModal.download') }}
          </button>
          <button class="action-button share-button" @click="handleShare">
            <ShareIcon class="w-5 h-5" />
            {{ $t('documentModal.share') }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(224, 242, 254, 0.3) 0%, rgba(221, 214, 254, 0.3) 50%, rgba(252, 231, 243, 0.3) 100%);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-backdrop::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 30% 40%, rgba(14, 165, 233, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 70% 60%, rgba(168, 85, 247, 0.15) 0%, transparent 50%);
  pointer-events: none;
}

.modal-container {
  width: 100%;
  max-width: 32rem;
  max-height: 92vh;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1.5px solid rgba(255, 255, 255, 0.7);
  border-radius: 1.5rem;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1), 
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: modalSlideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  z-index: 1;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  background: linear-gradient(135deg, rgba(224, 242, 254, 0.3) 0%, rgba(221, 214, 254, 0.3) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  color: #64748b;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.close-button:hover {
  background: linear-gradient(135deg, rgba(252, 231, 243, 0.6) 0%, rgba(221, 214, 254, 0.6) 100%);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.2);
  color: #a855f7;
}

.modal-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
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

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container {
  animation: modalSlideIn 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.modal-leave-active .modal-container {
  animation: modalSlideOut 0.3s cubic-bezier(0, 0, 0.2, 1);
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes modalSlideOut {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-30px) scale(0.95);
  }
}

/* Scrollbar personalizzata */
.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  backdrop-filter: blur(8px);
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .modal-backdrop {
    padding: 1rem;
  }

  .modal-container {
    max-height: 95vh;
    border-radius: 1.25rem;
  }

  .modal-header {
    padding: 1.25rem 1.5rem;
  }

  .modal-title {
    font-size: 1.25rem;
  }

  .modal-content {
    padding: 1.5rem;
  }

  .preview-area {
    height: 35vh;
    padding: 0.75rem;
    margin: 0 0.5rem;
  }

  .document-image {
    border-radius: 0.5rem;
  }

  .nav-button {
    width: 2.5rem;
    height: 2.5rem;
  }

  .modal-footer {
    padding: 1.25rem 1.5rem;
    flex-direction: column;
  }

  .metadata-grid {
    grid-template-columns: 1fr;
  }
}
</style>

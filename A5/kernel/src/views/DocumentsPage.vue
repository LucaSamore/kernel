<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowsRightLeftIcon } from '@heroicons/vue/24/outline'
import SearchBar from '../components/shared/SearchBar.vue'
import TagBar from '../components/shared/TagBar.vue'
import DocumentCard from '../components/shared/DocumentCard.vue'
import DocumentModal from '../components/documents/DocumentModal.vue'
import DocumentComparisonModal from '../components/documents/comparison/DocumentComparisonModal.vue'
import type { Tag } from '../components/shared/TagBar.vue'
import type { Document } from '../components/shared/DocumentCard.vue'
import { MOCK_DOCUMENTS } from '../constants/mockData'

const searchQuery = ref('')
const selectedTag = ref('tutti')
const selectedDocument = ref<Document | null>(null)
const isModalOpen = ref(false)
const isComparisonModalOpen = ref(false)

const tags = computed<Tag[]>(() => [
  { id: 'tutti', label: 'Tutti', count: MOCK_DOCUMENTS.length },
  { id: 'prescrizione', label: 'Prescrizione', count: MOCK_DOCUMENTS.filter(d => d.tags.includes('Prescrizione')).length },
  { id: 'cardiologia', label: 'Cardiologia', count: MOCK_DOCUMENTS.filter(d => d.tags.includes('Cardiologia')).length },
  { id: 'analisi', label: 'Analisi', count: MOCK_DOCUMENTS.filter(d => d.tags.includes('Analisi')).length },
  { id: 'diagnostica', label: 'Diagnostica', count: MOCK_DOCUMENTS.filter(d => d.tags.includes('Diagnostica')).length }
])

const documents = ref<Document[]>(MOCK_DOCUMENTS)

const filteredDocuments = computed(() => {
  let filtered = documents.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(doc =>
      doc.title.toLowerCase().includes(query) ||
      doc.description.toLowerCase().includes(query) ||
      doc.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Filter by tag
  if (selectedTag.value !== 'tutti') {
    filtered = filtered.filter(doc => 
      doc.tags.some(tag => tag.toLowerCase() === selectedTag.value.toLowerCase())
    )
  }

  return filtered
})

const handleSearch = (query: string) => {
  searchQuery.value = query
}

const handleTagSelected = (tagId: string) => {
  selectedTag.value = tagId
}

const handleDocumentClick = (document: Document) => {
  selectedDocument.value = document
  isModalOpen.value = true
}

const handleCloseModal = () => {
  isModalOpen.value = false
  setTimeout(() => {
    selectedDocument.value = null
  }, 300)
}

const handleOpenComparison = () => {
  isComparisonModalOpen.value = true
}

const handleCloseComparison = () => {
  isComparisonModalOpen.value = false
}
</script>

<template>
  <div class="documents-page">
    <div class="header-section">
      <div class="header-content">
        <div>
          <h1 class="page-title">{{ $t('documents.title') }}</h1>
          <p class="page-subtitle">{{ $t('documents.subtitle') }}</p>
        </div>
        <button class="comparison-btn" @click="handleOpenComparison">
          <ArrowsRightLeftIcon class="w-5 h-5" />
          {{ $t('documents.documentComparison') }}
        </button>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="section-spacing">
      <SearchBar @search="handleSearch" />
    </div>

    <!-- Tag Bar -->
    <div class="section-spacing">
      <TagBar
        :tags="tags"
        :selected-tag="selectedTag"
        @tag-selected="handleTagSelected"
      />
    </div>

    <!-- Documents List -->
    <div v-if="filteredDocuments.length" class="documents-list">
      <DocumentCard
        v-for="doc in filteredDocuments"
        :key="doc.id"
        :document="doc"
        @click="() => handleDocumentClick(doc)"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12 text-gray-500">
      {{ $t('documents.noResults') }}
    </div>
  </div>

  <!-- Document Modal (Teleported to body) -->
  <Teleport to="body">
    <DocumentModal
      :document="selectedDocument"
      :is-open="isModalOpen"
      @close="handleCloseModal"
    />
  </Teleport>

  <!-- Document Comparison Modal -->
  <DocumentComparisonModal
    :is-open="isComparisonModalOpen"
    :documents="documents"
    @close="handleCloseComparison"
  />
</template>

<style scoped>

.header-section {
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  animation: slideInDown 0.5s cubic-bezier(0, 0, 0.2, 1);
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #171717;
  margin: 0;
  line-height: 1.25;
}

.page-subtitle {
  font-size: 1rem;
  color: #525252;
  margin-top: 0.5rem;
  line-height: 1.5;
}

.comparison-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(12px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  white-space: nowrap;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.comparison-btn:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
}

.documents-page {
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #e0f2fe 0%, #ddd6fe 50%, #fce7f3 100%);
  position: relative;
}

.documents-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(14, 165, 233, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.2) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.page-header {
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  animation: slideInDown 0.5s cubic-bezier(0, 0, 0.2, 1);
}

.page-header h1 {
  margin: 0;
  font-size: 1.875rem;
  font-weight: 700;
  color: #171717;
  line-height: 1.25;
}

.page-header p {
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
  color: #525252;
  line-height: 1.5;
}

.section-spacing {
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  animation: fadeIn 0.5s cubic-bezier(0, 0, 0.2, 1);
  animation-delay: 0.1s;
  animation-fill-mode: both;
}

.documents-list {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  animation: fadeIn 0.5s cubic-bezier(0, 0, 0.2, 1);
  animation-delay: 0.2s;
  animation-fill-mode: both;
}

.text-center {
  text-align: center;
  padding: 3rem 1rem;
  font-size: 1.125rem;
  color: #737373;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 1;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

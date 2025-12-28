<script setup lang="ts">
import { ref, computed } from 'vue'
import SearchBar from '../components/SearchBar.vue'
import TagBar from '../components/TagBar.vue'
import DocumentCard from '../components/DocumentCard.vue'
import type { Tag } from '../components/TagBar.vue'
import type { Document } from '../components/DocumentCard.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const searchQuery = ref('')
const selectedTag = ref('tutti')

const tags = computed<Tag[]>(() => [
  { id: 'tutti', label: t('documents.tags.all'), count: 15 },
  { id: 'daLeggere', label: t('documents.tags.toRead'), count: 1 },
  { id: 'cardiologia', label: t('documents.tags.cardiology'), count: 3 }
])

const documents = ref<Document[]>([
  {
    id: '1',
    title: 'Referto ECG',
    description: 'Descrizione contenuto referto...',
    tags: ['esami', 'Tag2'],
    date: '10/01/2025',
    doctor: 'Dottore #1',
    hospital: 'Ospedale #1'
  },
  {
    id: '2',
    title: 'Esame del sangue',
    description: 'Descrizione contenuto referto...',
    tags: ['esami', 'Tag2'],
    date: '20/07/2024',
    doctor: 'Dottore #1',
    hospital: 'Ospedale #1'
  },
  {
    id: '3',
    title: 'Visita oculistica',
    description: 'Descrizione contenuto referto...',
    tags: ['visita', 'Tag3'],
    date: '28/06/2024',
    doctor: 'Dottore #3',
    hospital: 'Ospedale #2'
  },
  {
    id: '4',
    title: 'Controllo pressione',
    description: 'Descrizione contenuto referto...',
    tags: ['esami', 'Tag1'],
    date: '15/03/2024',
    doctor: 'Dottore #2',
    hospital: 'Ospedale #1'
  }
])

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
    // Here you can implement tag-specific filtering logic
    // For now, just showing all documents
  }

  return filtered
})

const handleSearch = (query: string) => {
  searchQuery.value = query
}

const handleTagSelected = (tagId: string) => {
  selectedTag.value = tagId
}
</script>

<template>
  <div class="documents-page">
    <!-- Header -->
    <div class="page-header">
      <h1 class="text-2xl font-bold text-gray-900">
        {{ $t('documents.title') }}
      </h1>
      <p class="text-base text-gray-500">
        {{ $t('documents.subtitle') }}
      </p>
    </div>

    <!-- Search Bar -->
    <div class="section-spacing">
      <SearchBar @search="handleSearch" />
    </div>

    <!-- Tag Bar -->
    <div class="section-spacing">
      <TagBar :tags="tags" @tag-selected="handleTagSelected" />
    </div>

    <!-- Documents List -->
    <div class="documents-list">
      <DocumentCard
        v-for="doc in filteredDocuments"
        :key="doc.id"
        :document="doc"
      />
    </div>

    <!-- Empty State -->
    <div v-if="filteredDocuments.length === 0" class="text-center py-12 text-gray-500">
      {{ $t('documents.noResults') }}
    </div>
  </div>
</template>

<style scoped>
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

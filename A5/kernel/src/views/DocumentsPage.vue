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
  height: 100%;
  padding: 1rem 2rem 2rem 2rem;
}

.page-header {
  margin-bottom: 0.5rem;
}

.section-spacing {
  margin-bottom: 0.5rem;
}
</style>

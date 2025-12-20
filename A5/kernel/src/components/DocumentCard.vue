<script setup lang="ts">
import { DocumentIcon, MapPinIcon } from '@heroicons/vue/24/outline'

export interface Document {
  id: string
  title: string
  description: string
  tags: string[]
  date: string
  doctor?: string
  hospital?: string
}

interface Props {
  document: Document
}

defineProps<Props>()
</script>

<template>
  <div class="document-card">
    <div class="card-content">
      <!-- Document Icon -->
      <div class="shrink-0">
        <div class="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
          <DocumentIcon class="w-7 h-7 text-gray-600" />
        </div>
      </div>

      <!-- Document Content -->
      <div class="flex-1 min-w-0">
        <!-- Title -->
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          {{ document.title }}
        </h3>

        <!-- Description -->
        <p class="text-sm text-gray-600 mb-4">
          {{ document.description }}
        </p>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="tag in document.tags"
            :key="tag"
            class="px-3 py-1 bg-gray-100 text-gray-700 text-xs"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Date and Location -->
        <div class="flex items-center gap-6 text-sm text-gray-500">
          <div class="flex items-center gap-1.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{{ document.date }}</span>
          </div>

          <template v-if="document.doctor">
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{{ document.doctor }}</span>
            </div>
          </template>

          <template v-if="document.hospital">
            <div class="flex items-center gap-1.5">
              <MapPinIcon class="w-4 h-4" />
              <span>{{ document.hospital }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.document-card {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(0.75rem);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin: 0.75rem 0;
  border: 2px solid #d1d5db;
  box-shadow: 0 0.5rem 1.875rem rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: all 0.3s ease;
}

.document-card:hover {
  transform: translateY(-0.25rem);
  box-shadow: 0 0.75rem 2.5rem rgba(0, 0, 0, 0.18);
}

.card-content {
  display: flex;
  align-items: start;
  gap: 1.5rem;
}
</style>

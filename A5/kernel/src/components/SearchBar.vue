<script setup lang="ts">
import { ref } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const searchQuery = ref('')

const emit = defineEmits<{
  search: [query: string]
}>()

const handleSearch = () => {
  emit('search', searchQuery.value)
}
</script>

<template>
  <div class="search-bar-wrapper">
    <div class="search-bar-container">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="$t('documents.searchPlaceholder')"
        class="search-input"
        @input="handleSearch"
      />
      <MagnifyingGlassIcon class="search-icon" />
      <button class="filter-button">
        <svg class="filter-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.search-bar-wrapper {
  position: relative;
  width: 100%;
  padding: 0.5rem 0;
}

.search-bar-container {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 0.625rem 1.5rem 0.625rem 3rem;
  border: 2px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  ring: 2px;
  ring-color: #9ca3af;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #9ca3af;
}

.filter-button {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: transparent;
  border: none;
  cursor: pointer;
}

.filter-button:hover {
  background-color: #f3f4f6;
}

.filter-icon {
  width: 1.125rem;
  height: 1.125rem;
  color: #9ca3af;
}
</style>

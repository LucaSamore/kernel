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
  padding: 0;
}

.search-bar-container {
  position: relative;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6);
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.search-bar-container:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  background: rgba(255, 255, 255, 0.45);
}

.search-input {
  width: 100%;
  min-height: 44px;
  padding: 0.75rem 3.5rem 0.75rem 3rem;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #171717;
  font-weight: 500;
}

.search-input::placeholder {
  color: #737373;
}

.search-input:focus {
  outline: none;
}

.search-bar-container:focus-within {
  border-color: rgba(14, 165, 233, 0.5);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #525252;
}

.filter-button {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
}

.filter-button:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: translateY(-50%) scale(1.05);
}

.filter-icon {
  width: 1.125rem;
  height: 1.125rem;
  color: #525252;
}
</style>

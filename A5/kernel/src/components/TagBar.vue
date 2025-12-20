<script setup lang="ts">
import { ref } from 'vue'

export interface Tag {
  id: string
  label: string
  count?: number
}

interface Props {
  tags: Tag[]
}

const props = defineProps<Props>()

const selectedTag = ref(props.tags[0]?.id || '')

const emit = defineEmits<{
  tagSelected: [tagId: string]
}>()

const selectTag = (tagId: string) => {
  selectedTag.value = tagId
  emit('tagSelected', tagId)
}
</script>

<template>
  <div class="tag-bar">
    <button
      v-for="tag in tags"
      :key="tag.id"
      :class="['tag-button', { 'tag-active': selectedTag === tag.id }]"
      @click="selectTag(tag.id)"
    >
      {{ tag.label }}
      <span v-if="tag.count !== undefined">
        ({{ tag.count }})
      </span>
    </button>
  </div>
</template>

<style scoped>
.tag-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0.5rem 0;
}

.tag-button {
  padding: 0.5rem 1.5rem;
  border: 2px solid black;
  background-color: white;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.tag-button:hover {
  background-color: #f9fafb;
}

.tag-button.tag-active {
  background-color: black;
  color: white;
}
</style>

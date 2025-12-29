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
  gap: 0.75rem;
  padding: 0;
}

.tag-button {
  min-height: 36px;
  padding: 0.5rem 1.25rem;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 0.75rem;
  color: #171717;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.tag-button:hover {
  background: rgba(255, 255, 255, 0.85);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tag-button.tag-active {
  background: rgba(2, 132, 199, 0.9);
  backdrop-filter: blur(16px);
  border-color: rgba(2, 132, 199, 0.95);
  color: #ffffff;
  box-shadow: 0 4px 16px rgba(14, 165, 233, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.tag-button.tag-active:hover {
  background: rgba(2, 132, 199, 0.95);
  transform: translateY(-2px);
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue'

export interface Tag {
  id: string
  label: string
  count?: number
}

interface Props {
  tags: Tag[]
  selectedTag?: string
  multiple?: boolean
  activeTags?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  selectedTag: '',
  multiple: false,
  activeTags: () => []
})

const localSelectedTag = ref(props.selectedTag || props.tags[0]?.id || '')

watch(() => props.selectedTag, (newVal) => {
  if (newVal) {
    localSelectedTag.value = newVal
  }
})

const emit = defineEmits<{
  tagSelected: [tagId: string]
}>()

const isTagActive = (tagId: string) => {
  if (props.multiple) {
    return props.activeTags.includes(tagId)
  }
  return localSelectedTag.value === tagId
}

const selectTag = (tagId: string) => {
  if (!props.multiple) {
    localSelectedTag.value = tagId
  }
  emit('tagSelected', tagId)
}
</script>

<template>
  <div class="tag-bar">
    <button
      v-for="tag in tags"
      :key="tag.id"
      :class="['tag-button', { 'tag-active': isTagActive(tag.id) }]"
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
  background: var(--white-75);
  backdrop-filter: blur(12px);
  border: 1px solid var(--white-60);
  border-radius: 0.75rem;
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
  box-shadow: 0 2px 8px var(--black-6), inset 0 1px 0 var(--white-40);
}

.tag-button:hover {
  background: var(--white-85);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--black-10);
}

.tag-button.tag-active {
  background: linear-gradient(135deg, var(--blue-3b82f6) 0%, var(--blue-8b5cf6) 100%);
  backdrop-filter: blur(16px);
  border-color: var(--white-30);
  color: #ffffff;
  box-shadow: 0 4px 16px var(--blue-3b82f6-30), inset 0 1px 0 var(--white-20);
}

.tag-button.tag-active:hover {
  background: linear-gradient(135deg, var(--blue-2563eb) 0%, var(--blue-7c3aed) 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--blue-3b82f6-40), inset 0 1px 0 var(--white-30);
}
</style>

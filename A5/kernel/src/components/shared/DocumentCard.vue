<script setup lang="ts">
import { computed } from 'vue'
import { DocumentIcon, MapPinIcon, UserIcon, CalendarIcon } from '@heroicons/vue/24/outline'
import BaseCard, { type CardMetadata } from '../shared/BaseCard.vue'

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

const props = defineProps<Props>()

const metadata = computed<CardMetadata[]>(() => {
  const meta: CardMetadata[] = [
    { icon: CalendarIcon, label: props.document.date }
  ]
  
  if (props.document.doctor) {
    meta.push({ icon: UserIcon, label: props.document.doctor })
  }
  
  if (props.document.hospital) {
    meta.push({ icon: MapPinIcon, label: props.document.hospital })
  }
  
  return meta
})
</script>

<template>
  <BaseCard
    :title="document.title"
    :description="document.description"
    :icon="DocumentIcon"
    :tags="document.tags"
    :metadata="metadata"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CalendarIcon, MapPinIcon, UserIcon, ClockIcon } from '@heroicons/vue/24/outline'
import BaseCard, { type CardMetadata } from './shared/BaseCard.vue'

export interface Appointment {
  id: string
  title: string
  description: string
  tags?: string[]
  date: string
  time?: string
  user?: string
  location?: string
}

interface Props {
  appointment: Appointment
  selected?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [id: string]
}>()

const metadata = computed<CardMetadata[]>(() => {
  const meta: CardMetadata[] = [
    { icon: CalendarIcon, label: props.appointment.date }
  ]
  
  if (props.appointment.time) {
    meta.push({ icon: ClockIcon, label: props.appointment.time })
  }
  
  if (props.appointment.user) {
    meta.push({ icon: UserIcon, label: props.appointment.user })
  }
  
  if (props.appointment.location) {
    meta.push({ icon: MapPinIcon, label: props.appointment.location })
  }
  
  return meta
})

const handleClick = () => {
  emit('click', props.appointment.id)
}
</script>

<template>
  <BaseCard
    :title="appointment.title"
    :description="appointment.description"
    :icon="CalendarIcon"
    :tags="appointment.tags"
    :metadata="metadata"
    :selected="selected"
    @click="handleClick"
  />
</template>

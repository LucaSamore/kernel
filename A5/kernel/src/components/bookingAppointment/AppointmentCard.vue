<script setup lang="ts">
import { computed } from 'vue'
import { CalendarIcon, MapPinIcon, UserIcon, ClockIcon, PencilIcon, XCircleIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'
import BaseCard, { type CardMetadata } from '../shared/BaseCard.vue'

const { t } = useI18n()

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
  edit: [id: string]
  cancel: [id: string]
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

const handleEdit = (event: Event) => {
  event.stopPropagation()
  emit('edit', props.appointment.id)
}

const handleCancel = (event: Event) => {
  event.stopPropagation()
  emit('cancel', props.appointment.id)
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
  >
    <template #actions>
      <button
        class="action-button edit-button"
        @click="handleEdit"
        :title="t('appointments.editAppointment')"
      >
        <PencilIcon class="w-4 h-4" />
        <span>{{ t('appointments.editAppointment') }}</span>
      </button>
      <button
        class="action-button cancel-button"
        @click="handleCancel"
        :title="t('appointments.cancelAppointment')"
      >
        <XCircleIcon class="w-4 h-4" />
        <span>{{ t('appointments.cancelAppointment') }}</span>
      </button>
    </template>
  </BaseCard>
</template>

<style scoped>
.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 0.625rem;
  border: 1px solid;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
  white-space: nowrap;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  width: 100%;
}

.edit-button {
  background: var(--white-60);
  border-color: var(--white-50);
  color: var(--text-primary);
  box-shadow: 0 2px 8px var(--shadow), inset 0 1px 0 var(--white-80);
}

.edit-button:hover {
  background: var(--white-80);
  border-color: var(--white-70);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px var(--shadow), inset 0 1px 0 var(--white-90);
}

.cancel-button {
  background: var(--white-50);
  border-color: var(--error-40);
  color: var(--error);
  box-shadow: 0 2px 8px var(--error-10), inset 0 1px 0 var(--white-60);
}

.cancel-button:hover {
  background: var(--white-70);
  border-color: var(--error-60);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px var(--error-20), inset 0 1px 0 var(--white-80);
}

@media (max-width: 768px) {
  .action-button span {
    display: none;
  }
  
  .action-button {
    padding: 0.5rem;
    justify-content: center;
    min-width: 2rem;
  }
}
</style>

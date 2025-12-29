<script setup lang="ts">
import AppointmentCard, { type Appointment } from './AppointmentCard.vue'

interface Props {
  appointments: Appointment[]
}

defineProps<Props>()

const emit = defineEmits<{
  appointmentClick: [id: string]
}>()
</script>

<template>
  <div class="space-y-3">
    <div v-if="appointments.length === 0" class="text-gray-500 text-center py-8">
      {{ $t('home.noAppointments') }}
    </div>
    <div v-else class="space-y-3">
      <AppointmentCard
        v-for="appointment in appointments"
        :key="appointment.id"
        :appointment="appointment"
        @click="emit('appointmentClick', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.font-hand {
  font-family: 'Comic Sans MS', cursive, sans-serif;
}
</style>

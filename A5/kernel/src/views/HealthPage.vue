<script setup lang="ts">
import { ref } from 'vue';
import HealthAlert from '../components/HealthAlert.vue';
import HealthMetricWidget from '../components/HealthMetricWidget.vue';
import HealthChart from '../components/HealthChart.vue';
import type { HealthParameter, HealthAlert as HealthAlertType, HealthMetricHistory } from '../types/health';

// Mock data for health parameters
const healthParameters = ref<HealthParameter[]>([
  {
    id: 'cholesterol',
    name: 'Colesterolo',
    value: 185,
    unit: 'mg/dL',
    normalRange: { min: 120, max: 200 },
    trend: 'up',
  },
  {
    id: 'blood-pressure-sys',
    name: 'Pressione sistolica',
    value: 120,
    unit: 'mmHg',
    normalRange: { min: 90, max: 120 },
    trend: 'stable',
  },
  {
    id: 'blood-pressure-dia',
    name: 'Pressione diastolica',
    value: 80,
    unit: 'mmHg',
    normalRange: { min: 60, max: 80 },
    trend: 'stable',
  },
  {
    id: 'heart-rate',
    name: 'Frequenza cardiaca',
    value: 72,
    unit: 'bpm',
    normalRange: { min: 60, max: 100 },
    trend: 'down',
  },
  {
    id: 'glucose',
    name: 'Glicemia',
    value: 105,
    unit: 'mg/dL',
    normalRange: { min: 70, max: 100 },
    trend: 'up',
  },
  {
    id: 'oxygen',
    name: 'Saturazione O₂',
    value: 98,
    unit: '%',
    normalRange: { min: 95, max: 100 },
    trend: 'stable',
  },
]);

// Mock data for alerts
const alerts = ref<HealthAlertType[]>([
  {
    id: 'alert-1',
    parameterId: 'glucose',
    parameterName: 'Glicemia leggermente elevata',
    severity: 'warning',
    message: 'Il tuo livello di glicemia è di 105 mg/dL, leggermente sopra il range ottimale.',
    recommendation: 'Riduci il consumo di zuccheri e carboidrati raffinati. Aumenta l\'attività fisica.',
  },
]);

// Mock data for chart history
const cholesterolHistory = ref<HealthMetricHistory>({
  parameterId: 'cholesterol',
  data: [
    { date: '1 Nov', value: 165 },
    { date: '8 Nov', value: 170 },
    { date: '15 Nov', value: 175 },
    { date: '22 Nov', value: 180 },
    { date: '29 Nov', value: 178 },
    { date: '6 Dic', value: 185 },
  ],
});

const bloodPressureSysHistory = ref<HealthMetricHistory>({
  parameterId: 'blood-pressure-sys',
  data: [
    { date: '1 Nov', value: 118 },
    { date: '8 Nov', value: 120 },
    { date: '15 Nov', value: 122 },
    { date: '22 Nov', value: 119 },
    { date: '29 Nov', value: 121 },
    { date: '6 Dic', value: 120 },
  ],
});

const heartRateHistory = ref<HealthMetricHistory>({
  parameterId: 'heart-rate',
  data: [
    { date: '1 Nov', value: 78 },
    { date: '8 Nov', value: 76 },
    { date: '15 Nov', value: 75 },
    { date: '22 Nov', value: 74 },
    { date: '29 Nov', value: 73 },
    { date: '6 Dic', value: 72 },
  ],
});

const glucoseHistory = ref<HealthMetricHistory>({
  parameterId: 'glucose',
  data: [
    { date: '1 Nov', value: 92 },
    { date: '8 Nov', value: 95 },
    { date: '15 Nov', value: 98 },
    { date: '22 Nov', value: 102 },
    { date: '29 Nov', value: 103 },
    { date: '6 Dic', value: 105 },
  ],
});
</script>

<template>
  <div>
    <!-- Header Section -->
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Salute</h1>
      <p class="text-gray-600">
        Monitora i tuoi parametri vitali e ricevi consigli personalizzati per mantenerti in salute.
      </p>
    </div>

    <!-- Alerts Section -->
    <div v-if="alerts.length > 0" class="mb-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-3">
        ⚠️ Avvisi importanti
      </h2>
      <div class="space-y-3">
        <HealthAlert v-for="alert in alerts" :key="alert.id" :alert="alert" />
      </div>
    </div>

    <!-- Metrics Overview Section -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-3">
        📊 I tuoi parametri
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <HealthMetricWidget
          v-for="param in healthParameters"
          :key="param.id"
          :parameter="param"
        />
      </div>
    </div>

    <!-- Charts Section -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-3">
        📈 Andamento storico
      </h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HealthChart
          title="Colesterolo totale"
          :data="cholesterolHistory"
          unit="mg/dL"
          :normal-range="{ min: 120, max: 200 }"
        />
        <HealthChart
          title="Pressione sistolica"
          :data="bloodPressureSysHistory"
          unit="mmHg"
          :normal-range="{ min: 90, max: 120 }"
        />
        <HealthChart
          title="Frequenza cardiaca"
          :data="heartRateHistory"
          unit="bpm"
          :normal-range="{ min: 60, max: 100 }"
        />
        <HealthChart
          title="Glicemia"
          :data="glucoseHistory"
          unit="mg/dL"
          :normal-range="{ min: 70, max: 100 }"
        />
      </div>
    </div>

    <!-- Info Section -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-5">
      <div class="flex items-start">
        <div class="shrink-0">
          <svg
            class="w-6 h-6 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-semibold text-blue-800 mb-1">
            Informazioni sui dati
          </h3>
          <p class="text-sm text-blue-700">
            I dati mostrati provengono dai tuoi dispositivi connessi e dalle misurazioni registrate.
            Ricorda di consultare sempre il tuo medico per una valutazione professionale.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

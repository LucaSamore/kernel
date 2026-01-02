<script setup lang="ts">
import { ref } from 'vue'
import HealthAlert from '../components/HealthAlert.vue'
import HealthMetricWidget from '../components/widgets/HealthMetricWidget.vue'
import HealthChart from '../components/HealthChart.vue'
import { 
  HEALTH_PARAMETERS, 
  HEALTH_ALERTS,
  CHOLESTEROL_HISTORY,
  BLOOD_PRESSURE_SYS_HISTORY,
  HEART_RATE_HISTORY,
  GLUCOSE_HISTORY
} from '../constants/mockData'

const healthParameters = ref(HEALTH_PARAMETERS)
const alerts = ref(HEALTH_ALERTS)
const cholesterolHistory = ref(CHOLESTEROL_HISTORY)
const bloodPressureSysHistory = ref(BLOOD_PRESSURE_SYS_HISTORY)
const heartRateHistory = ref(HEART_RATE_HISTORY)
const glucoseHistory = ref(GLUCOSE_HISTORY)
</script>

<template>
  <div class="health-page">
    <!-- Header Section -->
    <div class="page-header">
      <h1 class="text-2xl font-bold text-gray-900">Salute</h1>
      <p class="text-base text-gray-500">
        Monitora i tuoi parametri vitali e ricevi consigli personalizzati per mantenerti in salute.
      </p>
    </div>

    <!-- Alerts Section -->
    <div v-if="alerts.length > 0" class="section-spacing">
      <h2 class="section-title">
        ⚠️ Avvisi importanti
      </h2>
      <div class="space-y-3">
        <HealthAlert v-for="alert in alerts" :key="alert.id" :alert="alert" />
      </div>
    </div>

    <!-- Metrics Overview Section -->
    <div class="section-spacing">
      <h2 class="section-title">
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
    <div class="section-spacing">
      <h2 class="section-title">
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
    <div class="info-card">
      <div class="flex items-start">
        <div class="shrink-0">
          <svg
            class="w-6 h-6 text-sky-600"
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
          <h3 class="text-sm font-semibold text-gray-800 mb-1">
            Informazioni sui dati
          </h3>
          <p class="text-sm text-gray-700">
            I dati mostrati provengono dai tuoi dispositivi connessi e dalle misurazioni registrate.
            Ricorda di consultare sempre il tuo medico per una valutazione professionale.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.health-page {
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #e0f2fe 0%, #ddd6fe 50%, #fce7f3 100%);
  position: relative;
}

.health-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(14, 165, 233, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.2) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.page-header {
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  animation: slideInDown 0.5s cubic-bezier(0, 0, 0.2, 1);
}

.page-header h1 {
  margin: 0;
  font-size: 1.875rem;
  font-weight: 700;
  color: #171717;
  line-height: 1.25;
}

.page-header p {
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
  color: #525252;
  line-height: 1.5;
}

.section-spacing {
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  animation: fadeIn 0.5s cubic-bezier(0, 0, 0.2, 1);
  animation-delay: 0.1s;
  animation-fill-mode: both;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #171717;
  margin-bottom: 1rem;
}

.info-card {
  padding: 1.5rem;
  background: rgba(224, 242, 254, 0.5);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(14, 165, 233, 0.3);
  border-radius: 1.25rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 1;
  animation: fadeIn 0.5s cubic-bezier(0, 0, 0.2, 1);
  animation-delay: 0.3s;
  animation-fill-mode: both;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .health-page {
    padding: 1rem;
  }

  .page-header {
    padding: 1.25rem 1.5rem;
  }

  .page-header h1 {
    font-size: 1.5rem;
  }

  .page-header p {
    font-size: 0.875rem;
  }

  .section-title {
    font-size: 1.125rem;
  }
}
</style>

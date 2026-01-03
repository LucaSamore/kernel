<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ProfileCard from '../components/shared/ProfileCard.vue'
import { useAuth } from '../authentication/useAuth'

const { t } = useI18n()
const router = useRouter()
const { login } = useAuth()

interface Profile {
  id: string
  name: string
  role: string
}

const profiles = ref<Profile[]>([
  { id: '1', name: 'Marco', role: 'Tu' },
  { id: '2', name: 'Laura', role: 'Moglie' },
  { id: '3', name: 'Sofia', role: 'Figlia' },
  { id: '4', name: 'Nonno Giulio', role: 'Padre' }
])

const selectProfile = (profile: Profile) => {
  login(profile)
  router.push('/home')
}

const addProfile = () => {
  console.log('Aggiungi nuovo profilo')
}
</script>

<template>
  <div class="login-page">
    <h1 class="login-title">
      Nucleo
      <div 
        class="absolute -bottom-5 left-0 w-full h-1 bg-gray-900"
      ></div>
    </h1>
    
    <p class="text-gray-600 text-xl font-medium">
      {{ t('login.subtitle') }}
    </p>

    
    <div class="flex flex-wrap justify-center gap-6 max-w-4xl">
      <ProfileCard
        v-for="profile in profiles"
        :key="profile.id"
        :name="profile.name"
        :role="profile.role"
        @click="selectProfile(profile)"
      />
      
      <ProfileCard
        :name="t('login.addProfile')"
        :is-add-card="true"
        @click="addProfile"
      />
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem;
  background: linear-gradient(135deg, #e0f2fe 0%, #ddd6fe 50%, #fce7f3 100%);
  position: relative;
}

.login-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(14, 165, 233, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.login-title {
  font-size: clamp(3rem, 8vw, 4.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  color: #171717;
  position: relative;
  z-index: 1;
  animation: fadeInDown 0.6s cubic-bezier(0, 0, 0.2, 1);
}

.title-underline {
  position: absolute;
  bottom: -1.25rem;
  left: 0;
  width: 100%;
  height: 4px;
  background: #171717;
  animation: expandWidth 0.8s cubic-bezier(0, 0, 0.2, 1);
}

.login-subtitle {
  color: #525252;
  font-size: 1.25rem;
  font-weight: 500;
  position: relative;
  z-index: 1;
  animation: fadeIn 0.6s cubic-bezier(0, 0, 0.2, 1);
  animation-delay: 0.2s;
  animation-fill-mode: both;
}

.profiles-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  max-width: 56rem;
  position: relative;
  z-index: 1;
  animation: fadeIn 0.6s cubic-bezier(0, 0, 0.2, 1);
  animation-delay: 0.4s;
  animation-fill-mode: both;
}

@keyframes fadeInDown {
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

@keyframes expandWidth {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .login-page {
    padding: 1rem;
  }
  
  .login-subtitle {
    font-size: 1rem;
  }
  
  .profiles-container {
    gap: 1rem;
  }
}
</style>

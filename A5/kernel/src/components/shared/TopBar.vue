<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuth } from '../../authentication/useAuth'
import TutorialButton from '../tutorial/TutorialButton.vue'
import TutorialModal from '../tutorial/TutorialModal.vue'
import { TUTORIALS } from '../../constants/tutorialData'

const { t, locale } = useI18n()
const router = useRouter()
const { currentUser, logout: authLogout } = useAuth()
const showUserMenu = ref(false)
const showLanguageMenu = ref(false)

// Tutorial state
const showTutorialModal = ref(false)
const completedTutorials = ref<Set<string>>(new Set())

const toggleLanguageMenu = () => {
  showLanguageMenu.value = !showLanguageMenu.value
}

const changeLanguage = (lang: string) => {
  locale.value = lang
  showLanguageMenu.value = false
}

const currentLanguage = computed(() => {
  return locale.value === 'it' ? 'ITA' : 'ENG'
})

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const logout = () => {
  authLogout()
  showUserMenu.value = false
  router.push('/login')
}

const changeUser = () => {
  showUserMenu.value = false
  router.push('/login')
}

const openTutorials = () => {
  showTutorialModal.value = true
}

const closeTutorials = () => {
  showTutorialModal.value = false
}
</script>

<template>
  <div class="topbar-container">
    <div class="flex items-center">
      <h1 class="topbar-title text-[clamp(1rem,2.5vw,1.25rem)] font-semibold m-0 cursor-pointer hover:opacity-80 transition-opacity" @click="router.push('/home')">{{ t('app.title') }}</h1>
    </div>
    <div class="flex items-center gap-6 topbar-actions">
      <button 
        class="glass-button topbar-icon-button relative flex items-center justify-center w-[clamp(2rem,5vw,2.25rem)] h-[clamp(2rem,5vw,2.25rem)] rounded-md"
        :title="t('topbar.notifications')"
        :aria-label="`${t('topbar.notifications')} - 1 non letta`"
      >
        <svg class="topbar-icon w-[clamp(1rem,3vw,1.25rem)] h-[clamp(1rem,3vw,1.25rem)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        <span class="absolute -top-1 -right-1 bg-gray-900 text-white text-[clamp(0.5rem,1.5vw,0.625rem)] font-semibold w-4 h-4 rounded-full flex items-center justify-center" aria-label="1 notifica">
          1
        </span>
      </button>

      <!-- Tutorial Button -->
      <TutorialButton 
        :tutorials="TUTORIALS"
        :completed-tutorials="completedTutorials"
        @click="openTutorials"
      />
      
      <!-- Language Selector -->
      <div class="relative">
        <button 
          class="glass-button topbar-icon-button flex items-center gap-1.5 px-2.5 py-1.5 rounded-md"
          :aria-label="`Lingua corrente: ${currentLanguage}. Clicca per cambiare lingua`"
          :aria-expanded="showLanguageMenu"
          @click="toggleLanguageMenu"
        >
          <span class="topbar-text text-[clamp(0.75rem,2vw,0.875rem)] font-semibold">{{ currentLanguage }}</span>
          <svg class="topbar-icon-secondary w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <div 
          v-if="showLanguageMenu" 
          class="glass-menu absolute top-[calc(100%+0.5vh)] right-0 rounded-lg min-w-24 z-50 overflow-hidden"
        >
          <button
            class="w-full flex items-center justify-center px-4 py-2.5 hover:bg-gray-50 transition-colors cursor-pointer"
            :class="{ 'bg-blue-50': locale === 'it' }"
            :aria-label="locale === 'it' ? 'Italiano - selezionato' : 'Seleziona italiano'"
            :aria-current="locale === 'it' ? 'true' : undefined"
            @click="changeLanguage('it')"
          >
            <span class="text-sm font-semibold lang-menu-text">ITA</span>
          </button>
          <button
            class="w-full flex items-center justify-center px-4 py-2.5 hover:bg-gray-50 transition-colors cursor-pointer"
            :class="{ 'bg-blue-50': locale === 'en' }"
            :aria-label="locale === 'en' ? 'Inglese - selezionato' : 'Seleziona inglese'"
            :aria-current="locale === 'en' ? 'true' : undefined"
            @click="changeLanguage('en')"
          >
            <span class="text-sm font-semibold lang-menu-text">ENG</span>
          </button>
        </div>
      </div>
      
      <div class="relative">
        <button 
          class="glass-button topbar-icon-button flex items-center gap-2 px-3 py-1.5 rounded-md"
          :aria-label="`Menu utente ${currentUser?.name || 'User'}`"
          :aria-expanded="showUserMenu"
          @click="toggleUserMenu"
        >
          <div class="w-[clamp(1.25rem,4vw,1.5rem)] h-[clamp(1.25rem,4vw,1.5rem)] rounded-full bg-gray-200 flex items-center justify-center topbar-user-icon">
            <svg class="topbar-icon w-[clamp(0.875rem,3vw,1.125rem)] h-[clamp(0.875rem,3vw,1.125rem)]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>
          <span class="user-name-text topbar-text text-[clamp(0.75rem,2vw,0.875rem)] font-medium">{{ currentUser?.name || 'User' }}</span>
          <svg class="topbar-icon-secondary w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <div 
          v-if="showUserMenu" 
          class="glass-menu absolute top-[calc(100%+0.5vh)] right-0 rounded-lg min-w-50 z-50 overflow-hidden"
        >
          <button 
            class="w-full py-3 px-4 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
            :aria-label="`Profilo utente ${currentUser?.name || 'User'}. Clicca per cambiare utente`"
            @click="changeUser"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </div>
              <div class="text-left">
                <div class="text-sm font-semibold text-gray-900">{{ currentUser?.name }}</div>
                <div class="text-xs text-gray-600">{{ currentUser?.role }}</div>
              </div>
            </div>
          </button>
          
          <!-- Logout Button -->
          <button
            class="w-full flex items-center gap-1 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
            :aria-label="t('userMenu.logout')"
            @click="logout"
          >
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 shrink-0">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </div>
            <span class="text-sm font-medium user-menu-text">{{ t('userMenu.logout') }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Tutorial Modal -->
    <TutorialModal 
      :is-open="showTutorialModal"
      :tutorials="TUTORIALS"
      @close="closeTutorials"
    />
  </div>
</template>

<style scoped>
.topbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--white-40) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--white-60) !important;
  box-shadow: 0 4px 24px var(--black-8), inset 0 1px 0 var(--white-80) !important;
  height: 8vh;
  width: 100%;
  padding-left: clamp(2rem, 1.5vw, 3rem);
  padding-right: clamp(2rem, 1.5vw, 3rem);
  position: relative;
  z-index: 10;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.topbar-title {
  color: var(--text-heading);
}

/* Topbar icons and text */
.topbar-icon {
  color: var(--topbar-icon-color);
}

.topbar-icon-secondary {
  color: var(--topbar-text-secondary);
}

.topbar-text {
  color: var(--topbar-text-color);
}

.topbar-user-icon {
  color: var(--topbar-text-secondary);
}

.lang-menu-text,
.user-menu-text {
  color: var(--accent-primary);
}

.glass-button {
  background: var(--white-60) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border: 1px solid var(--white-50) !important;
  box-shadow: 0 2px 8px var(--black-5), inset 0 1px 0 var(--white-80) !important;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1) !important;
}

.glass-button:hover {
  background: var(--white-80) !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 16px var(--black-12), inset 0 1px 0 var(--white-90) !important;
}

.glass-menu {
  background: var(--glass-menu-bg) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border: 1px solid var(--glass-menu-border) !important;
  box-shadow: var(--glass-menu-shadow), var(--glass-menu-inset-shadow) !important;
}

.glass-menu button:hover {
  background: var(--glass-menu-hover-bg) !important;
}

.glass-menu .text-gray-900 {
  color: var(--glass-menu-text-primary) !important;
}

.glass-menu .text-gray-600 {
  color: var(--glass-menu-text-secondary) !important;
}

/* Responsive Design - Mobile */
@media (max-width: 480px) {
  .topbar-container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .topbar-actions {
    gap: 0.5rem !important;
  }
  
  .user-name-text {
    display: none;
  }
  
  .glass-button {
    padding: 0.375rem 0.5rem !important;
  }
  
  .glass-menu {
    right: -0.5rem;
    min-width: 200px;
  }
}

@media (max-width: 768px) {
  .topbar-container {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
  
  .topbar-actions {
    gap: 0.75rem !important;
  }
}
</style>
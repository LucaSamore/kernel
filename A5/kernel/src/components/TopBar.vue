<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuth } from '../composables/useAuth'
import { COLORS } from '../constants/constants'

const { t } = useI18n()
const router = useRouter()
const { currentUser, logout: authLogout } = useAuth()
const showUserMenu = ref(false)

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const logout = () => {
  authLogout()
  showUserMenu.value = false
  router.push('/login')
}
</script>

<template>
  <div class="topbar-container">
    <div class="flex items-center">
      <h1 class="text-[clamp(1rem,2.5vw,1.25rem)] font-semibold m-0" :style="{ color: COLORS.primary }">{{ t('app.title') }}</h1>
    </div>
    <div class="flex items-center gap-6">
      <button 
        class="glass-button relative flex items-center justify-center w-[clamp(2rem,5vw,2.25rem)] h-[clamp(2rem,5vw,2.25rem)] rounded-md"
        :title="t('topbar.notifications')"
      >
        <svg class="w-[clamp(1rem,3vw,1.25rem)] h-[clamp(1rem,3vw,1.25rem)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        <span class="absolute -top-1 -right-1 bg-gray-900 text-white text-[clamp(0.5rem,1.5vw,0.625rem)] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
          1
        </span>
      </button>
      <div class="relative">
        <button 
          class="glass-button flex items-center gap-2 px-3 py-1.5 rounded-md"
          @click="toggleUserMenu"
        >
          <div class="w-[clamp(1.25rem,4vw,1.5rem)] h-[clamp(1.25rem,4vw,1.5rem)] rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
            <svg class="w-[clamp(0.875rem,3vw,1.125rem)] h-[clamp(0.875rem,3vw,1.125rem)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>
          <span class="text-[clamp(0.75rem,2vw,0.875rem)] font-medium text-gray-900">{{ currentUser?.name || 'User' }}</span>
          <svg class="text-gray-600 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <div 
          v-if="showUserMenu" 
          class="glass-menu absolute top-[calc(100%+0.5vh)] right-0 rounded-lg min-w-50 z-50 overflow-hidden"
        >
          <div class="py-3 px-4 border-b border-gray-200">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </div>
              <div>
                <div class="text-sm font-semibold" :style="{ color: COLORS.primary }">{{ currentUser?.name }}</div>
                <div class="text-xs" :style="{ color: COLORS.textSecondary }">{{ currentUser?.role }}</div>
              </div>
            </div>
          </div>
          
          <!-- Logout Button -->
          <button
            class="w-full flex items-center gap-1 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
            @click="logout"
          >
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 shrink-0">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </div>
            <span class="text-sm font-medium" :style="{ color: COLORS.primary }">{{ t('userMenu.logout') }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.topbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.4) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.6) !important;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8) !important;
  height: 8vh;
  width: 100%;
  padding-left: clamp(2rem, 1.5vw, 3rem);
  padding-right: clamp(2rem, 1.5vw, 3rem);
  position: relative;
  z-index: 10;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.glass-button {
  background: rgba(255, 255, 255, 0.6) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8) !important;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1) !important;
}

.glass-button:hover {
  background: rgba(255, 255, 255, 0.8) !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9) !important;
}

.glass-menu {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border: 1px solid rgba(255, 255, 255, 0.6) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8) !important;
}

.glass-menu button:hover {
  background: rgba(14, 165, 233, 0.08) !important;
}
</style>

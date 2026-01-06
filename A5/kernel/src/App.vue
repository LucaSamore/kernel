<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TopBar from './components/shared/TopBar.vue'
import BottomBar from './components/shared/BottomBar.vue'
import LegalFooter from './components/shared/LegalFooter.vue'

const route = useRoute()

const hideNavigation = computed(() => route.meta.hideNavigation === true)
</script>

<template>
  <div class="app-container">
    <!-- Skip link per accessibilità WCAG 2.4.1 -->
    <a href="#main-content" class="skip-link">Salta al contenuto principale</a>
    
    <TopBar v-if="!hideNavigation" />
    <main 
      id="main-content"
      :class="hideNavigation ? 'h-screen' : 'main-content'"
      tabindex="-1"
    >  
      <router-view />
    </main>
    <BottomBar v-if="!hideNavigation" />
    <LegalFooter v-if="!hideNavigation" />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #e0f2fe 0%, #ddd6fe 50%, #fce7f3 100%);
  position: relative;
}

.app-container::before {
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

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem 1.5rem;
  position: relative;
  z-index: 1;
}

/* Skip link per accessibilità - visibile solo al focus */
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  background: #171717;
  color: white;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  font-weight: 600;
  z-index: 10000;
  border-radius: 0 0 0.5rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: top 0.3s;
}

.skip-link:focus {
  top: 0;
  outline: 3px solid #0ea5e9;
  outline-offset: 2px;
}

main:focus {
  outline: none;
}
</style>

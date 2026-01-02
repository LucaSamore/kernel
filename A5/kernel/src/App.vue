<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TopBar from './components/shared/TopBar.vue'
import BottomBar from './components/shared/BottomBar.vue'

const route = useRoute()

const hideNavigation = computed(() => route.meta.hideNavigation === true)
</script>

<template>
  <div class="app-container">
    <TopBar v-if="!hideNavigation" />
    <main :class="hideNavigation ? 'h-screen' : 'main-content'">  
      <router-view />
    </main>
    <BottomBar v-if="!hideNavigation" />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #e0f2fe 0%, #ddd6fe 50%, #fce7f3 100%);
  position: relative;
  overflow: hidden;
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
  padding: 1.25rem 1.5rem 6rem;
  position: relative;
  z-index: 1;
}
</style>

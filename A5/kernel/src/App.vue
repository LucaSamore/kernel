<script setup lang="ts">
import TopBar from './components/TopBar.vue'
import BottomBar from './components/BottomBar.vue'
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <TopBar />
    <main class="flex-1 overflow-y-auto p-5 px-6">
      <router-view />
    </main>
    <BottomBar />
  </div>
</template>

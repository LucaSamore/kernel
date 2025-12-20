<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { TABS } from '../constants/constants'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const tabsData = computed(() => 
  TABS.map(tab => ({ ...tab, label: t(tab.key) }))
)

const activeTab = computed(() => route.name as string)

const setActiveTab = (tabId: string) => {
  router.push({ name: tabId })
}
</script>

<template>
  <div class="bg-white border-b border-gray-200 w-full h-[8vh]">
    <div class="flex w-full h-full">
      <button
        v-for="tab in tabsData"
        :key="tab.id"
        :class="[
          'relative flex-1 text-sm font-medium whitespace-nowrap transition-colors',
          activeTab === tab.id
            ? 'text-gray-900'
            : 'text-gray-600 hover:text-gray-900'
        ]"
        @click="setActiveTab(tab.id)"
      >
        <span 
          v-if="activeTab === tab.id"
          class="absolute top-0 left-0 right-0 h-0.75 bg-gray-900 rounded-b"
        />
        {{ tab.label }}
      </button>
    </div>
  </div>
</template>

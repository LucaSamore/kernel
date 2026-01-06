<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { TABS, COLORS } from '../../constants/constants'
import { 
  HomeIcon, 
  DocumentTextIcon, 
  HeartIcon, 
  CalendarIcon, 
  Cog6ToothIcon 
} from '@heroicons/vue/24/outline'
import { 
  HomeIcon as HomeIconSolid, 
  DocumentTextIcon as DocumentTextIconSolid, 
  HeartIcon as HeartIconSolid, 
  CalendarIcon as CalendarIconSolid, 
  Cog6ToothIcon as Cog6ToothIconSolid 
} from '@heroicons/vue/24/solid'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const tabIcons = {
  home: { outline: HomeIcon, solid: HomeIconSolid },
  documenti: { outline: DocumentTextIcon, solid: DocumentTextIconSolid },
  salute: { outline: HeartIcon, solid: HeartIconSolid },
  calendario: { outline: CalendarIcon, solid: CalendarIconSolid },
  impostazioni: { outline: Cog6ToothIcon, solid: Cog6ToothIconSolid }
}

const tabsData = computed(() => 
  TABS.map(tab => ({ 
    ...tab, 
    label: t(tab.key),
    icon: tabIcons[tab.id as keyof typeof tabIcons]
  }))
)

const activeTab = computed(() => route.name as string)

const setActiveTab = (tabId: string) => {
  router.push({ name: tabId })
}
</script>

<template>
  <div class="bottombar-wrapper">
    <div class="bottombar-container">
      <button
        v-for="tab in tabsData"
        :key="tab.id"
        :class="['tab-button', { active: activeTab === tab.id }]"
        :aria-label="`Vai alla sezione ${tab.label}`"
        :aria-current="activeTab === tab.id ? 'page' : undefined"
        @click="setActiveTab(tab.id)"
      >
        <component 
          :is="activeTab === tab.id ? tab.icon.solid : tab.icon.outline" 
          class="tab-icon"
          aria-hidden="true"
        />
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.bottombar-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 1rem;
  z-index: 10;
  pointer-events: none;
}

.bottombar-container {
  pointer-events: all;
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 2rem;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.12), 
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.tab-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  min-width: 4rem;
  border-radius: 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  color: v-bind('COLORS.textSecondary');
  position: relative;
}

.tab-button:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.tab-button.active {
  background: rgba(255, 255, 255, 0.8);
  color: #0ea5e9;
  box-shadow: 
    0 4px 16px rgba(14, 165, 233, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.tab-button.active::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 1rem;
  padding: 2px;
  background: linear-gradient(135deg, #0ea5e9 0%, #a855f7 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.6;
}

.tab-icon {
  width: 1.5rem;
  height: 1.5rem;
  transition: transform 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.tab-label {
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.tab-button.active .tab-label {
  font-weight: 600;
  color: #0ea5e9;
}

.tab-button.active .tab-icon {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .bottombar-container {
    padding: 0.5rem 1rem;
    gap: 0.25rem;
  }

  .tab-button {
    padding: 0.5rem 0.75rem;
    min-width: 3.5rem;
  }

  .tab-icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  .tab-label {
    font-size: 0.625rem;
  }
}
</style>

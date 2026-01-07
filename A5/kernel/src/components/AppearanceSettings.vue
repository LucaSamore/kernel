<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useTheme, type ThemeMode, type ColorBlindMode } from '../composables/useTheme'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

const { t } = useI18n()
const { themeMode, colorBlindMode, setThemeMode, setColorBlindMode } = useTheme()

const colorBlindOptions: { value: ColorBlindMode; label: string }[] = [
  { value: 'none', label: t('settings.app.appearance.colorBlind.none') },
  { value: 'deuteranopia', label: t('settings.app.appearance.colorBlind.deuteranopia') },
  { value: 'protanopia', label: t('settings.app.appearance.colorBlind.protanopia') },
  { value: 'tritanopia', label: t('settings.app.appearance.colorBlind.tritanopia') }
]
</script>

<template>
  <div class="appearance-settings">
    <!-- Tema chiaro/scuro -->
    <div class="setting-group">
      <h3 class="setting-label">{{ t('settings.app.appearance.theme.title') }}</h3>
      <div class="theme-selector">
        <button
          class="theme-button"
          :class="{ active: themeMode === 'light' }"
          @click="setThemeMode('light')"
        >
          <SunIcon class="theme-icon" />
          <span>{{ t('settings.app.appearance.theme.light') }}</span>
        </button>
        <button
          class="theme-button"
          :class="{ active: themeMode === 'dark' }"
          @click="setThemeMode('dark')"
        >
          <MoonIcon class="theme-icon" />
          <span>{{ t('settings.app.appearance.theme.dark') }}</span>
        </button>
      </div>
    </div>

    <!-- Modalità daltonici -->
    <div class="setting-group">
      <h3 class="setting-label">{{ t('settings.app.appearance.colorBlind.title') }}</h3>
      <p class="setting-description">{{ t('settings.app.appearance.colorBlind.subtitle') }}</p>
      <div class="color-blind-selector">
        <label
          v-for="option in colorBlindOptions"
          :key="option.value"
          class="radio-option"
          :class="{ active: colorBlindMode === option.value }"
        >
          <input
            type="radio"
            :value="option.value"
            :checked="colorBlindMode === option.value"
            @change="setColorBlindMode(option.value)"
          />
          <span class="radio-label">{{ option.label }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.appearance-settings {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.setting-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.setting-label {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.setting-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
}

.theme-selector {
  display: flex;
  gap: 0.75rem;
}

.theme-button {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--white-70);
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(10px);
}

.theme-button:hover {
  background: var(--bg-secondary-90);
  border-color: var(--accent-primary);
}

.theme-button.active {
  background: var(--accent-primary-10);
  border-color: var(--accent-primary);
}

.theme-icon {
  width: 2rem;
  height: 2rem;
  color: var(--accent-primary);
}

.theme-button span {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
}

.color-blind-selector {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: var(--white-70);
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(10px);
}

.radio-option:hover {
  background: var(--bg-secondary-90);
  border-color: var(--accent-primary);
}

.radio-option.active {
  background: var(--accent-primary-10);
  border-color: var(--accent-primary);
}

.radio-option input[type="radio"] {
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
  accent-color: var(--accent-primary);
}

.radio-label {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-primary);
}

/* Supporto tema scuro */
:root.dark .theme-button,
:root.dark .radio-option {
  background: var(--white-70);
}

:root.dark .theme-button:hover,
:root.dark .radio-option:hover {
  background: var(--bg-secondary-90);
}

:root.dark .theme-button.active,
:root.dark .radio-option.active {
  background: var(--accent-primary-15);
}
</style>

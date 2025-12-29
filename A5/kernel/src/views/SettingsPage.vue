<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import SettingsItem from '../components/SettingsItem.vue'
import {
  UserCircleIcon,
  UsersIcon,
  ShieldCheckIcon,
  BellIcon,
  LockClosedIcon,
  SwatchIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'

const { t } = useI18n()
const router = useRouter()

const handleItemClick = (item: string) => {
  console.log('Clicked:', item)
}

const handleChangeProfile = () => {
  router.push('/login')
}
</script>

<template>
  <div class="settings-page">
    <div class="settings-header">
      <h1 class="settings-title">{{ t('settings.title') }}</h1>
      <p class="settings-subtitle">{{ t('settings.subtitle') }}</p>
    </div>

    <!-- Account -->
    <div class="settings-section">
      <div class="settings-section-header">
        {{ t('settings.account.title') }}
      </div>
      <div class="settings-account">
        <div class="settings-account-avatar">
          <span>M</span>
        </div>
        <div class="settings-account-info">
          <div class="settings-account-name">Marco</div>
          <div class="settings-account-role">{{ t('settings.account.owner') }}</div>
        </div>
        <button class="settings-account-button" @click="handleChangeProfile">
          {{ t('settings.account.changeProfile') }}
        </button>
      </div>
    </div>

    <!-- Profilo e famiglia -->
    <div class="settings-section">
      <div class="settings-section-header">
        {{ t('settings.profileFamily.title') }}
      </div>
      <div class="settings-list">
        <SettingsItem
          :icon="UserCircleIcon"
          :title="t('settings.profileFamily.myProfile.title')"
          :subtitle="t('settings.profileFamily.myProfile.subtitle')"
          @click="handleItemClick('myProfile')"
        />
        <SettingsItem
          :icon="UsersIcon"
          :title="t('settings.profileFamily.familyManagement.title')"
          :subtitle="t('settings.profileFamily.familyManagement.subtitle')"
          @click="handleItemClick('familyManagement')"
        />
        <SettingsItem
          :icon="ShieldCheckIcon"
          :title="t('settings.profileFamily.permissions.title')"
          :subtitle="t('settings.profileFamily.permissions.subtitle')"
          @click="handleItemClick('permissions')"
        />
      </div>
    </div>

    <!-- App -->
    <div class="settings-section">
      <div class="settings-section-header">
        {{ t('settings.app.title') }}
      </div>
      <div class="settings-list">
        <SettingsItem
          :icon="BellIcon"
          :title="t('settings.app.notifications.title')"
          :subtitle="t('settings.app.notifications.subtitle')"
          @click="handleItemClick('notifications')"
        />
        <SettingsItem
          :icon="LockClosedIcon"
          :title="t('settings.app.privacy.title')"
          :subtitle="t('settings.app.privacy.subtitle')"
          @click="handleItemClick('privacy')"
        />
        <SettingsItem
          :icon="SwatchIcon"
          :title="t('settings.app.appearance.title')"
          :subtitle="t('settings.app.appearance.subtitle')"
          @click="handleItemClick('appearance')"
        />
      </div>
    </div>

    <!-- Dati e privacy -->
    <div class="settings-section">
      <div class="settings-section-header">
        {{ t('settings.dataPrivacy.title') }}
      </div>
      <div class="settings-list">
        <SettingsItem
          :icon="ArrowDownTrayIcon"
          :title="t('settings.dataPrivacy.exportData.title')"
          :subtitle="t('settings.dataPrivacy.exportData.subtitle')"
          @click="handleItemClick('exportData')"
        />
        <SettingsItem
          :icon="DocumentTextIcon"
          :title="t('settings.dataPrivacy.terms.title')"
          :subtitle="t('settings.dataPrivacy.terms.subtitle')"
          @click="handleItemClick('terms')"
        />
      </div>
    </div>

    <!-- Centro assistenza -->
    <div class="settings-section">
      <div class="settings-section-header">
        {{ t('settings.support.title') }}
      </div>
      <div class="settings-list">
        <SettingsItem
          :icon="QuestionMarkCircleIcon"
          :title="t('settings.support.helpCenter.title')"
          :subtitle="t('settings.support.helpCenter.subtitle')"
          @click="handleItemClick('helpCenter')"
        />
      </div>
    </div>

    <!-- Esci dall'account -->
    <div class="settings-section">
      <div class="settings-list">
        <SettingsItem
          :icon="ArrowRightOnRectangleIcon"
          :title="t('settings.logout')"
          variant="danger"
          :show-chevron="false"
          @click="handleItemClick('logout')"
        />
      </div>
    </div>

    <!-- Footer -->
    <div class="settings-footer">
      {{ t('settings.footer.version') }}
    </div>
  </div>
</template>

<style scoped>
.settings-page {
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #e0f2fe 0%, #ddd6fe 50%, #fce7f3 100%);
  position: relative;
}

.settings-page::before {
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

.settings-header {
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

.settings-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #171717;
  margin: 0;
  line-height: 1.25;
}

.settings-subtitle {
  font-size: 1rem;
  color: #525252;
  margin: 0.5rem 0 0 0;
  line-height: 1.5;
}

.settings-section {
  margin-top: 2rem;
  position: relative;
  z-index: 1;
  animation: fadeIn 0.5s cubic-bezier(0, 0, 0.2, 1);
  animation-fill-mode: both;
}

.settings-section:nth-child(2) { animation-delay: 0.1s; }
.settings-section:nth-child(3) { animation-delay: 0.15s; }
.settings-section:nth-child(4) { animation-delay: 0.2s; }
.settings-section:nth-child(5) { animation-delay: 0.25s; }
.settings-section:nth-child(6) { animation-delay: 0.3s; }
.settings-section:nth-child(7) { animation-delay: 0.35s; }

.settings-section-header {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #404040;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 0 0.75rem;
  margin-left: 0.5rem;
}

.settings-list {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 1.25rem;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.settings-list > * {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.settings-list > *:last-child {
  border-bottom: none;
}

.settings-account {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 1.25rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.settings-account:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.settings-account-avatar {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #0ea5e9 0%, #a855f7 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 16px rgba(14, 165, 233, 0.3);
  transition: transform 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.settings-account:hover .settings-account-avatar {
  transform: scale(1.05);
}

.settings-account-avatar span {
  font-size: 1.375rem;
  font-weight: 600;
  color: #ffffff;
}

.settings-account-info {
  flex: 1;
}

.settings-account-name {
  font-size: 1.0625rem;
  font-weight: 600;
  color: #171717;
  line-height: 1.4;
}

.settings-account-role {
  font-size: 0.875rem;
  color: #525252;
  margin-top: 0.125rem;
  line-height: 1.3;
}

.settings-account-button {
  font-size: 0.875rem;
  font-weight: 500;
  color: #0ea5e9;
  background: rgba(14, 165, 233, 0.1);
  border: 1px solid rgba(14, 165, 233, 0.2);
  border-radius: 0.75rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
}

.settings-account-button:hover {
  color: #ffffff;
  background: rgba(14, 165, 233, 0.8);
  border-color: transparent;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
}

.settings-footer {
  text-align: center;
  padding: 2rem 0;
  font-size: 0.8125rem;
  color: #737373;
  position: relative;
  z-index: 1;
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
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .settings-page {
    padding: 1rem;
  }
  
  .settings-header {
    padding: 1.25rem 1.5rem;
  }
  
  .settings-title {
    font-size: 1.5rem;
  }
  
  .settings-subtitle {
    font-size: 0.875rem;
  }
}
</style>

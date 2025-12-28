<script setup lang="ts">
import { useI18n } from 'vue-i18n'
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

const handleItemClick = (item: string) => {
  console.log('Clicked:', item)
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
        <button class="settings-account-button">
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
  height: 100%;
  padding: 1rem 2rem 2rem;
  background-color: #f9fafb;
}

.settings-title {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px;
}

.settings-subtitle {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
}

.settings-section {
  margin-top: 32px;
}

.settings-section-header {
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 0 8px;
}

.settings-list {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.settings-list > * {
  border-bottom: 1px solid #f3f4f6;
}

.settings-list > *:last-child {
  border-bottom: none;
}

.settings-account {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.settings-account-avatar {
  width: 48px;
  height: 48px;
  background-color: #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.settings-account-avatar span {
  font-size: 18px;
  font-weight: 600;
  color: #6b7280;
}

.settings-account-info {
  flex: 1;
}

.settings-account-name {
  font-size: 15px;
  font-weight: 500;
  color: #111827;
}

.settings-account-role {
  font-size: 13px;
  color: #6b7280;
  margin-top: 2px;
}

.settings-account-button {
  font-size: 13px;
  color: #3b82f6;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.settings-account-button:hover {
  color: #2563eb;
}

.settings-footer {
  text-align: center;
  padding: 24px 0;
  font-size: 12px;
  color: #9ca3af;
}

@media (max-width: 768px) {
  .settings-page {
    padding: 1rem;
  }
}
</style>

export const COLORS = {
  primary: '#1a1a1a',
  background: '#f8f8f8',
  border: '#e0e0e0',
  borderDark: '#d0d0d0',
  textPrimary: '#1a1a1a',
  textSecondary: '#666',
  white: '#ffffff',
  hover: '#f5f5f5',
  notification: '#ff4444',
} as const

export const TABS = [
  { id: 'home', key: 'tabs.home' },
  { id: 'documenti', key: 'tabs.documents' },
  { id: 'salute', key: 'tabs.health' },
  { id: 'calendario', key: 'tabs.calendar' },
  { id: 'impostazioni', key: 'tabs.settings' }
] as const

export const TAGS = [
  { id: 'tutti', key: 'tags.all', count: 10 },
  { id: 'daLeggere', key: 'tags.toRead', count: 1 },
  { id: 'cartella', key: 'tags.folder', count: 3 }
] as const

export const USERS = [
  { id: 1, name: 'User #1' },
  { id: 2, name: 'User #2' },
  { id: 3, name: 'User #3' },
  { id: 4, name: 'User #4' }
] as const

export const USER_MENU_ITEMS = [
  { id: 'profile', key: 'userMenu.profile' },
  { id: 'settings', key: 'userMenu.settings' },
  { id: 'logout', key: 'userMenu.logout' }
] as const

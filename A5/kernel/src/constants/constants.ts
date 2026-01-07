export const COLORS = {
  primary: 'var(--text-heading-dark)',
  background: 'var(--bg-light)',
  border: 'var(--border-light)',
  borderDark: 'var(--border-medium)',
  textPrimary: 'var(--text-heading-dark)',
  textSecondary: 'var(--text-gray-600)', // Gray-600: contrasto 4.54:1 WCAG AA conforme
  white: 'var(--white)',
  hover: 'var(--bg-hover)',
  notification: 'var(--notification-red)', // Red-600: contrasto 4.52:1 WCAG AA conforme
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

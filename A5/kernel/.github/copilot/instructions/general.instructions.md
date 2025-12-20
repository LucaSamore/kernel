---
applyTo: "**"
---

# Copilot Development Instructions

## CSS and Styling
- **Always use Tailwind CSS** for styling components
- Do not create custom CSS files unless absolutely necessary
- Use Tailwind utility classes directly in components
- Follow Tailwind best practices for responsive design

## Component Architecture
- **Create small, reusable components** when developing large features
- Break down complex components into smaller, focused units
- Each component should have a single, well-defined responsibility
- Favor composition over complexity

## Constants and Translations
- **Never hardcode constants** directly in component files
- Store all constants in dedicated constants files
- **Constant variable names must be in English** (e.g., `PRIMARY_TITLE`, `ERROR_MESSAGE`)
- **Constant values must be in Italian** when representing user-facing content (e.g., `STATO_ATTIVO = 'attivo'`)
- **Never hardcode text strings** in components
- Always use translation files (`it.json`) for all user-facing text
- Use **vue-i18n** for internationalization with the `useI18n` composable

## Code Language
- **Write all code in English**: variable names, function names, comments, file names, constant names
- **Exception**: constant values and translation strings must be in Italian (as the site is in Italian)
- Use English for: 
  - Component names (e.g., `UserProfile.vue`, not `ProfiloUtente.vue`)
  - Function and method names (e.g., `handleSubmit`, not `gestisciInvio`)
  - Comments and documentation
  - Type definitions and interfaces
  - Constant variable names (e.g., `const USER_STATUS`, not `const STATO_UTENTE`)
  
## File Organization
```
/components        # Reusable Vue components (English names)
/constants         # Constant files (English variable names, Italian values)
/i18n              # Translation files
  /it.json         # Italian translations
/composables       # Vue composables
/plugins           # Vue plugins (e.g., i18n configuration)
/router            # Vue Router configuration
/views             # Page-level components
```

## Example Structure

### Component File (English)
```vue
<!-- components/UserCard.vue -->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { USER_STATUS_ACTIVE, USER_STATUS_INACTIVE } from '@/constants/constants'

const { t } = useI18n()
</script>

<template>
  <div class="p-4 bg-white rounded-lg shadow-md">
    <h2 class="text-xl font-bold">{{ t('user.title') }}</h2>
    {/* Component logic */}
  </div>
</template>
```

### Constants File (English names, Italian values)
```typescript
// constants/constants.ts
export const USER_STATUS_ACTIVE = 'attivo'
export const USER_STATUS_INACTIVE = 'inattivo'
export const SESSION_TIMEOUT = 3600

export const TABS = [
  { id: 'home', key: 'tabs.home' },
  { id: 'documenti', key: 'tabs.documents' }
] as const
```

### Translation File
```json
// i18n/it.json
{
  "user": {
    "title": "Profilo Utente",
    "status": "Stato"
  }
}
```
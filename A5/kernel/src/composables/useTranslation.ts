import { ref } from 'vue'
import itTranslations from '../i18n/it.json'

type TranslationKey = string

const translations = ref(itTranslations)

export function useTranslation() {
  const t = (key: TranslationKey): string => {
    const keys = key.split('.')
    let value: any = translations.value
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  return { t }
}

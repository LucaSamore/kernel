<script setup lang="ts">
import { ref, computed } from 'vue'
import { DocumentIcon, MapPinIcon, UserIcon, CalendarIcon, Bars4Icon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline'
import BaseCard, { type CardMetadata } from '../shared/BaseCard.vue'
import BaseModal from '../shared/BaseModal.vue'
import BarcodeDisplay from './BarcodeDisplay.vue'

export interface Document {
  id: string
  title: string
  description: string
  tags: string[]
  date: string
  doctor?: string
  hospital?: string
  isPrescription?: boolean
  prescriptionCode?: string
  expirationDays?: number
  usedDate?: string
}

export type DocumentType = 'prescription' | 'report' | 'analysis' | 'visit' | 'diagnostic' | 'other'

export interface DocumentCategory {
  type: DocumentType
  label: string
  icon: string
  color: string
  bgColor: string
  borderColor: string
}

const DOCUMENT_CATEGORIES: Record<DocumentType, DocumentCategory> = {
  prescription: {
    type: 'prescription',
    label: 'Prescrizione',
    icon: '💊',
    color: 'var(--doc-prescription)',
    bgColor: 'var(--doc-prescription-bg)',
    borderColor: 'var(--doc-prescription-border)'
  },
  report: {
    type: 'report',
    label: 'Referto',
    icon: '📋',
    color: 'var(--doc-report)',
    bgColor: 'var(--doc-report-bg)',
    borderColor: 'var(--doc-report-border)'
  },
  analysis: {
    type: 'analysis',
    label: 'Analisi',
    icon: '🧪',
    color: 'var(--doc-analysis)',
    bgColor: 'var(--doc-analysis-bg)',
    borderColor: 'var(--doc-analysis-border)'
  },
  visit: {
    type: 'visit',
    label: 'Visita',
    icon: '👨‍⚕️',
    color: 'var(--doc-visit)',
    bgColor: 'var(--doc-visit-bg)',
    borderColor: 'var(--doc-visit-border)'
  },
  diagnostic: {
    type: 'diagnostic',
    label: 'Diagnostica',
    icon: '🔬',
    color: 'var(--doc-diagnostic)',
    bgColor: 'var(--doc-diagnostic-bg)',
    borderColor: 'var(--doc-diagnostic-border)'
  },
  other: {
    type: 'other',
    label: 'Altro',
    icon: '📄',
    color: 'var(--doc-other)',
    bgColor: 'var(--doc-other-bg)',
    borderColor: 'var(--doc-other-border)'
  }
}

interface Props {
  document: Document
  selectable?: boolean
  selected?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  selectable: false,
  selected: false
})

const emit = defineEmits<{
  click: []
  toggleSelect: []
}>()

const showBarcodeModal = ref(false)

// Detect document category based on tags and content
const documentCategory = computed<DocumentCategory>(() => {
  if (props.document.isPrescription) {
    return DOCUMENT_CATEGORIES.prescription
  }
  
  const tags = props.document.tags.map(t => t.toLowerCase())
  const title = props.document.title.toLowerCase()
  
  if (tags.some(t => t.includes('analisi') || t.includes('laboratorio')) || 
      title.includes('esami del sangue') || title.includes('emocromo')) {
    return DOCUMENT_CATEGORIES.analysis
  }
  
  if (tags.some(t => t.includes('visita')) || title.includes('visita')) {
    return DOCUMENT_CATEGORIES.visit
  }
  
  if (tags.some(t => t.includes('diagnostica') || t.includes('ecografia') || 
                      t.includes('radiologia') || t.includes('radiografia'))) {
    return DOCUMENT_CATEGORIES.diagnostic
  }
  
  if (tags.some(t => t.includes('referto') || t.includes('esami')) || 
      title.includes('referto') || title.includes('controllo')) {
    return DOCUMENT_CATEGORIES.report
  }
  
  return DOCUMENT_CATEGORIES.other
})

// Metadata per BaseCard
const metadata = computed<CardMetadata[]>(() => {
  const meta: CardMetadata[] = [
    { icon: CalendarIcon, label: props.document.date }
  ]
  
  if (props.document.doctor) {
    meta.push({ icon: UserIcon, label: props.document.doctor })
  }
  
  if (props.document.hospital) {
    meta.push({ icon: MapPinIcon, label: props.document.hospital })
  }
  
  return meta
})

// Calcola se la prescrizione è scaduta
const isExpired = computed(() => {
  if (!props.document.isPrescription || !props.document.expirationDays) {
    return false
  }
  
  const issueDate = parseItalianDate(props.document.date)
  if (!issueDate) return false
  
  const expirationDate = new Date(issueDate)
  expirationDate.setDate(expirationDate.getDate() + props.document.expirationDays)
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  return today > expirationDate
})

// Calcola la data di scadenza formattata
const expirationDate = computed(() => {
  if (!props.document.isPrescription || !props.document.expirationDays) {
    return null
  }
  
  const issueDate = parseItalianDate(props.document.date)
  if (!issueDate) return null
  
  const expDate = new Date(issueDate)
  expDate.setDate(expDate.getDate() + props.document.expirationDays)
  
  return formatItalianDate(expDate)
})

// Stato della prescrizione: 'valid', 'expired', 'used'
const prescriptionStatus = computed(() => {
  if (!props.document.isPrescription) return null
  
  if (props.document.usedDate) return 'used'
  if (isExpired.value) return 'expired'
  return 'valid'
})

// Funzione per parsare date italiane nel formato "GG Mese AAAA"
function parseItalianDate(dateStr: string): Date | null {
  const months: Record<string, number> = {
    'Gen': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'Mag': 4, 'Giu': 5,
    'Lug': 6, 'Ago': 7, 'Set': 8, 'Ott': 9, 'Nov': 10, 'Dic': 11
  }
  
  const parts = dateStr.split(' ')
  if (parts.length !== 3) return null
  
  const day = parseInt(parts[0] || '')
  const monthKey = parts[1] || ''
  const month = months[monthKey]
  const year = parseInt(parts[2] || '')
  
  if (isNaN(day) || month === undefined || isNaN(year)) return null
  
  return new Date(year, month, day)
}

// Funzione per formattare una data in formato italiano
function formatItalianDate(date: Date): string {
  const months = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic']
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

// Handler per il click sulla card (solo documenti normali)
const handleCardClick = () => {
  if (props.selectable) {
    emit('toggleSelect')
  } else if (!props.document.isPrescription) {
    emit('click')
  }
}

// Handler per mostrare il barcode
const handleShowBarcode = (event: Event) => {
  event.stopPropagation()
  showBarcodeModal.value = true
}

// Handler per chiudere la modal
const handleCloseBarcode = () => {
  showBarcodeModal.value = false
}

// Handler per il download del barcode (placeholder)
const handleDownloadBarcode = () => {
  console.log('Download barcode per prescrizione:', props.document.id)
  // TODO: Implementare download
}
</script>

<template>
  <div 
    class="document-card-wrapper" 
    :class="{ 'selectable': selectable, 'selected': selected }"
    @click="handleCardClick"
  >
    <!-- Selection Checkbox (when in selection mode) -->
    <div v-if="selectable" class="selection-checkbox" :class="{ 'checked': selected }">
      <svg v-if="selected" class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    </div>

    <BaseCard
      :title="document.title"
      :description="document.description"
      :icon="DocumentIcon"
      :metadata="metadata"
    >
      <!-- Barcode Button (inline with title) -->
      <template v-if="document.isPrescription" #title-actions>
        <button
          class="barcode-action-button"
          @click="handleShowBarcode"
        >
          <Bars4Icon class="w-4 h-4" />
          <span>Mostra Codice</span>
        </button>
      </template>

      <!-- Document Type Badge (after title) -->
      <template #after-title>
        <div class="document-type-badge" :style="{
          backgroundColor: documentCategory.bgColor,
          borderColor: documentCategory.borderColor,
          color: documentCategory.color
        }">
          <span class="badge-icon">{{ documentCategory.icon }}</span>
          <span class="badge-label">{{ documentCategory.label }}</span>
        </div>
      </template>
    </BaseCard>
  </div>

  <!-- Modal Codice a Barre -->
  <Teleport to="body">
    <BaseModal
      :is-open="showBarcodeModal"
      :title="$t('documents.prescriptionCode')"
      :subtitle="$t('documents.prescriptionCodeSubtitle')"
      max-width="sm"
      @close="handleCloseBarcode"
    >
      <div class="barcode-container">
        <!-- Informazioni prescrizione -->
        <div class="prescription-info">
          <p class="prescription-title">{{ document.title }}</p>
          <p class="prescription-date">{{ $t('documents.issuedOn') }}: {{ document.date }}</p>
          <p v-if="prescriptionStatus === 'valid'" class="prescription-expiration">{{ $t('documents.expiresIn', { days: document.expirationDays }) }}</p>

        </div>
        
        <!-- Codice a barre o Placeholder -->
        <div v-if="prescriptionStatus === 'valid'" class="barcode-wrapper">
          <BarcodeDisplay :code="document.prescriptionCode || '8234567890123'" />
        </div>
        
        <!-- Placeholder per prescrizione scaduta/utilizzata -->
        <div v-else class="barcode-placeholder">
          <p class="placeholder-text">{{ $t('documents.barcodeNotAvailable') }}</p>
        </div>
        
        <!-- Messaggio di stato -->
        <div v-if="prescriptionStatus === 'used'" class="status-message used-message">
          <p class="status-text">{{ $t('documents.usedOn', { date: document.usedDate }) }}</p>
        </div>
        
        <div v-else-if="prescriptionStatus === 'expired'" class="status-message expired-message">
          <p class="status-text">{{ $t('documents.expiredOn', { date: expirationDate }) }}</p>
        </div>
        
        <p v-else class="barcode-instruction">{{ $t('documents.barcodeInstruction') }}</p>
      </div>
      
      <template #footer>
        <button 
          v-if="prescriptionStatus === 'valid'" 
          class="button button-primary" 
          @click="handleDownloadBarcode"
        >
          <ArrowDownTrayIcon class="w-5 h-5" />
          {{ $t('documents.downloadBarcode') }}
        </button>
        <button class="button button-secondary" @click="handleCloseBarcode">
          {{ $t('documents.close') }}
        </button>
      </template>
    </BaseModal>
  </Teleport>
</template>

<style scoped>
.document-card-wrapper {
  position: relative;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
}

.document-card-wrapper.selectable {
  padding-left: 3rem;
}

.document-card-wrapper.selectable:hover {
  transform: translateX(4px);
}

.document-card-wrapper.selected {
  opacity: 0.95;
}

.selection-checkbox {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.75rem;
  height: 1.75rem;
  border: 2px solid var(--text-primary-20);
  border-radius: 0.5rem;
  background: var(--bg-secondary-80);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
  z-index: 10;
}

.selection-checkbox.checked {
  background: linear-gradient(135deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%);
  border-color: transparent;
  box-shadow: 0 4px 12px var(--accent-primary-40);
}

/* Document Type Badge (inline under title) */
.document-type-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  border: 1.5px solid;
  border-radius: 0.75rem;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  font-weight: 700;
  font-size: 0.8125rem;
  box-shadow: 0 2px 8px var(--badge-shadow), inset 0 1px 0 var(--white-40);
  margin-bottom: 0.75rem;
  width: fit-content;
  animation: fadeInScale 0.4s cubic-bezier(0, 0, 0.2, 1);
}

.badge-icon {
  font-size: 1.125rem;
  line-height: 1;
}

.badge-label {
  font-weight: 700;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  font-size: 0.75rem;
}

/* Barcode Action Button (inline with title) */
.barcode-action-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, var(--blue-3b82f6) 0%, var(--blue-8b5cf6) 100%);
  border: 1px solid var(--white-20);
  border-radius: 0.75rem;
  color: white;
  font-weight: 700;
  font-size: 0.8125rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  box-shadow: 0 2px 8px var(--blue-3b82f6-25), inset 0 1px 0 var(--white-20);
  white-space: nowrap;
  flex-shrink: 0;
}

.barcode-action-button:hover {
  background: linear-gradient(135deg, var(--blue-2563eb) 0%, var(--blue-7c3aed) 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px var(--blue-3b82f6-30), inset 0 1px 0 var(--white-30);
}

.barcode-action-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px var(--blue-3b82f6-30);
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.barcode-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem 0;
}

.prescription-info {
  text-align: center;
}

.prescription-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
}

.prescription-date {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
}

.prescription-expiration {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0.25rem 0 0 0;
  text-decoration: underline;
  font-style: italic;
}

.barcode-wrapper {
  display: flex;
  justify-content: center;
  padding: 1.5rem;
  background: var(--bg-primary);
  border-radius: 1rem;
  border: 2px dashed var(--border-color);
}

.barcode-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--bg-secondary-80);
  border-radius: 1rem;
  border: 2px dashed var(--border-color);
  min-height: 120px;
}

.placeholder-icon {
  width: 3rem;
  height: 3rem;
  margin-bottom: 0.75rem;
}

.placeholder-icon.expired {
  color: var(--warning);
}

.placeholder-icon.used {
  color: var(--success);
}

.placeholder-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-align: center;
  margin: 0;
}

.status-message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 0.875rem;
  margin-top: 1rem;
}

.status-message.used-message {
  background: var(--success-10);
  border: 1px solid var(--success-30);
}

.status-message.expired-message {
  background: var(--warning-10);
  border: 1px solid var(--warning-30);
}

.status-icon {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
}

.used-message .status-icon {
  color: var(--doc-visit);
}

.expired-message .status-icon {
  color: var(--doc-diagnostic);
}

.status-text {
  font-size: 0.9375rem;
  font-weight: 600;
  margin: 0;
}

.used-message .status-text {
  color: var(--success-text-dark);
}

.expired-message .status-text {
  color: var(--warning-text-dark);
}

.barcode-instruction {
  text-align: center;
  font-size: 0.875rem;
  color: var(--gray-525252);
  margin: 0;
  line-height: 1.5;
}

.button {
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.button-primary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%);
  color: white;
  border: 1px solid var(--bg-secondary-30);
  box-shadow: 0 4px 16px var(--accent-primary-30), inset 0 1px 0 var(--bg-secondary-20);
}

.button-primary:hover {
  background: linear-gradient(135deg, var(--bg-gradient-start-85-black) 0%, var(--bg-gradient-end-85-black) 100%);
  box-shadow: 0 6px 20px var(--accent-primary-40), inset 0 1px 0 var(--bg-secondary-30);
  transform: translateY(-1px);
}

.button-secondary {
  background: var(--bg-secondary-30);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--bg-secondary-50);
  color: var(--text-secondary);
  box-shadow: 0 2px 8px var(--text-primary-6), inset 0 1px 0 var(--bg-secondary-50);
}

.button-secondary:hover {
  background: var(--bg-secondary-40);
  box-shadow: 0 4px 16px var(--text-primary-10), inset 0 1px 0 var(--bg-secondary-70);
  transform: translateY(-1px);
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    AcademicCapIcon,
    TrophyIcon,
    StarIcon
} from '@heroicons/vue/24/outline'
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/vue/24/solid'
import VirtualEnvironment from './VirtualEnvironment.vue'
import TutorialStepGuide from './TutorialStepGuide.vue'

const { t } = useI18n()

export interface TutorialStep {
    id: string
    title: string
    description: string
    action: string
    target: string
    imageHint?: string
    completed: boolean
}

export interface Tutorial {
    id: string
    title: string
    description: string
    badge: {
        icon: string
        color: string
        name: string
    }
    steps: TutorialStep[]
    points: number
}

const props = defineProps<{
    tutorials: Tutorial[]
}>()

const emit = defineEmits<{
    close: []
}>()

const selectedTutorial = ref<Tutorial | null>(null)
const currentStepIndex = ref(0)
const showVirtualEnv = ref(false)
const completedTutorials = ref<Set<string>>(new Set())

const totalProgress = computed(() => {
    const completed = props.tutorials.filter(t =>
        completedTutorials.value.has(t.id)
    ).length
    return Math.round((completed / props.tutorials.length) * 100)
})

const totalPoints = computed(() => {
    return Array.from(completedTutorials.value).reduce((sum, tutorialId) => {
        const tutorial = props.tutorials.find(t => t.id === tutorialId)
        return sum + (tutorial?.points || 0)
    }, 0)
})

const earnedBadges = computed(() => {
    return props.tutorials
        .filter(t => completedTutorials.value.has(t.id))
        .map(t => t.badge)
})

const currentStep = computed(() => {
    if (!selectedTutorial.value) return null
    return selectedTutorial.value.steps[currentStepIndex.value]
})

const progressPercentage = computed(() => {
    if (!selectedTutorial.value) return 0
    return Math.round((currentStepIndex.value / selectedTutorial.value.steps.length) * 100)
})

const selectTutorial = (tutorial: Tutorial) => {
    selectedTutorial.value = tutorial
    currentStepIndex.value = 0
    showVirtualEnv.value = false
}

const startTutorial = () => {
    showVirtualEnv.value = true
}

const handleStepComplete = () => {
    if (!selectedTutorial.value) return

    if (currentStepIndex.value < selectedTutorial.value.steps.length - 1) {
        currentStepIndex.value++
    } else {
        completedTutorials.value.add(selectedTutorial.value.id)
        showVirtualEnv.value = false
        setTimeout(() => {
            selectedTutorial.value = null
            currentStepIndex.value = 0
        }, 1500)
    }
}

const closeTutorial = () => {
    showVirtualEnv.value = false
    selectedTutorial.value = null
    currentStepIndex.value = 0
}
</script>

<template>
    <div class="tutorial-system">
        <!-- Header con statistiche (senza bottone close) -->
        <div class="tutorial-header">
            <div class="header-content">
                <div class="header-title-section">
                    <AcademicCapIcon class="header-icon" />
                    <div>
                        <h2 class="header-title">{{ t('tutorial.title') }}</h2>
                        <p class="header-subtitle">{{ t('tutorial.subtitle') }}</p>
                    </div>
                </div>
            </div>

            <!-- Stats -->
            <div class="stats-container">
                <div class="stat-card">
                    <TrophyIcon class="stat-icon trophy" />
                    <div class="stat-content">
                        <div class="stat-value">{{ totalPoints }}</div>
                        <div class="stat-label">{{ t('tutorial.points') }}</div>
                    </div>
                </div>
                <div class="stat-card">
                    <StarIcon class="stat-icon star" />
                    <div class="stat-content">
                        <div class="stat-value">{{ earnedBadges.length }}</div>
                        <div class="stat-label">{{ t('tutorial.badges') }}</div>
                    </div>
                </div>
                <div class="stat-card progress-card">
                    <div class="progress-info">
                        <span class="progress-label">{{ t('tutorial.progress') }}</span>
                        <span class="progress-value">{{ totalProgress }}%</span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" :style="{ width: `${totalProgress}%` }"></div>
                    </div>
                </div>
            </div>

            <!-- Badges earned -->
            <div v-if="earnedBadges.length > 0" class="badges-showcase">
                <h3 class="badges-title">{{ t('tutorial.earnedBadges') }}</h3>
                <div class="badges-grid">
                    <div v-for="badge in earnedBadges" :key="badge.name" class="badge-item"
                        :style="{ background: badge.color }">
                        <span class="badge-icon">{{ badge.icon }}</span>
                        <span class="badge-name">{{ badge.name }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tutorial selection -->
        <div v-if="!selectedTutorial" class="tutorials-grid">
            <div v-for="tutorial in tutorials" :key="tutorial.id" class="tutorial-card"
                @click="selectTutorial(tutorial)">
                <div class="tutorial-card-header">
                    <div class="tutorial-badge" :style="{ background: tutorial.badge.color }">
                        <span>{{ tutorial.badge.icon }}</span>
                    </div>
                    <CheckCircleIconSolid v-if="completedTutorials.has(tutorial.id)" class="completed-icon" />
                </div>
                <h3 class="tutorial-title">{{ tutorial.title }}</h3>
                <p class="tutorial-description">{{ tutorial.description }}</p>
                <div class="tutorial-footer">
                    <div class="tutorial-steps-count">
                        {{ tutorial.steps.length }} {{ t('tutorial.steps') }}
                    </div>
                    <div class="tutorial-points">
                        +{{ tutorial.points }} {{ t('tutorial.pts') }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Tutorial active view -->
        <div v-else-if="!showVirtualEnv" class="tutorial-detail">
            <button class="back-button" @click="closeTutorial">
                ← {{ t('tutorial.back') }}
            </button>

            <div class="tutorial-detail-header">
                <div class="tutorial-detail-badge" :style="{ background: selectedTutorial.badge.color }">
                    <span>{{ selectedTutorial.badge.icon }}</span>
                </div>
                <div>
                    <h2 class="tutorial-detail-title">{{ selectedTutorial.title }}</h2>
                    <p class="tutorial-detail-description">{{ selectedTutorial.description }}</p>
                </div>
            </div>

            <div class="steps-list">
                <div v-for="(step, index) in selectedTutorial.steps" :key="step.id" class="step-item">
                    <div class="step-number">{{ index + 1 }}</div>
                    <div class="step-content">
                        <h4 class="step-title">{{ step.title }}</h4>
                        <p class="step-description">{{ step.description }}</p>
                    </div>
                </div>
            </div>

            <button class="start-button" @click="startTutorial">
                {{ t('tutorial.startTutorial') }}
            </button>
        </div>

        <!-- Virtual Environment Modal -->
        <Teleport to="body">
            <div v-if="showVirtualEnv" class="virtual-modal-overlay">
                <div class="split-screen-container">

                    <div class="tutorial-sidebar">
                        <TutorialStepGuide v-if="currentStep && selectedTutorial" :step="currentStep"
                            :step-number="currentStepIndex + 1" :total-steps="selectedTutorial.steps.length"
                            :progress="progressPercentage" @complete="handleStepComplete" @close="closeTutorial" />
                    </div>

                    <div class="virtual-environment-container">
                        <VirtualEnvironment v-if="selectedTutorial" :current-step="currentStep || null"
                            :tutorial-id="selectedTutorial.id" @action-completed="handleStepComplete"
                            @close="closeTutorial" />
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<style scoped>
.tutorial-system {
    width: 100%;
    background: transparent;
    padding: 0;
}

.tutorial-header {
    margin-bottom: 1.25rem;
}

.header-content {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 1.5rem;
}

.header-title-section {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.header-icon {
    width: 3rem;
    height: 3rem;
    color: #0ea5e9;
    flex-shrink: 0;
}

.header-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #171717;
    margin: 0;
}

.header-subtitle {
    font-size: 0.95rem;
    color: #525252;
    margin: 0.25rem 0 0 0;
}

.stats-container {
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 0.75rem;
    margin-bottom: 1rem;
}

.stat-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.stat-icon {
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
}

.stat-icon.trophy {
    color: #f59e0b;
}

.stat-icon.star {
    color: #8b5cf6;
}

.stat-content {
    display: flex;
    flex-direction: column;
}

.stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #171717;
    line-height: 1;
}

.stat-label {
    font-size: 0.75rem;
    color: #737373;
    margin-top: 0.25rem;
}

.progress-card {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
}

.progress-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.progress-label {
    font-size: 0.875rem;
    color: #525252;
    font-weight: 500;
}

.progress-value {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0ea5e9;
}

.progress-bar-container {
    width: 100%;
    height: 0.5rem;
    background: rgba(14, 165, 233, 0.2);
    border-radius: 0.25rem;
    overflow: hidden;
}

.progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #0ea5e9, #8b5cf6);
    border-radius: 0.25rem;
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.badges-showcase {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 1rem;
}

.badges-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #404040;
    margin: 0 0 0.75rem 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.badges-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.badge-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    color: white;
    font-weight: 600;
    font-size: 0.875rem;
}

.badge-icon {
    font-size: 1.25rem;
}

.tutorials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
}

.tutorial-card {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 1.25rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.tutorial-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    background: rgba(255, 255, 255, 0.65);
}

.tutorial-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.tutorial-badge {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.completed-icon {
    width: 2rem;
    height: 2rem;
    color: #10b981;
}

.tutorial-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #171717;
    margin: 0 0 0.5rem 0;
}

.tutorial-description {
    font-size: 0.875rem;
    color: #525252;
    margin: 0 0 1rem 0;
    line-height: 1.5;
}

.tutorial-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.tutorial-steps-count {
    font-size: 0.8125rem;
    color: #737373;
}

.tutorial-points {
    font-size: 0.875rem;
    font-weight: 600;
    color: #8b5cf6;
}

.tutorial-detail {
    max-width: 600px;
    margin: 0 auto;
}

.back-button {
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #525252;
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 1.5rem;
}

.back-button:hover {
    background: rgba(255, 255, 255, 0.8);
    transform: translateX(-2px);
}

.tutorial-detail-header {
    display: flex;
    gap: 1.25rem;
    align-items: flex-start;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 1.25rem;
}

.tutorial-detail-badge {
    width: 4rem;
    height: 4rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    flex-shrink: 0;
}

.tutorial-detail-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #171717;
    margin: 0 0 0.5rem 0;
}

.tutorial-detail-description {
    font-size: 0.95rem;
    color: #525252;
    margin: 0;
    line-height: 1.6;
}

.steps-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
}

.step-item {
    display: flex;
    gap: 1rem;
    padding: 1.25rem;
    background: rgba(255, 255, 255, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 1rem;
}

.step-number {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    flex-shrink: 0;
}

.step-content {
    flex: 1;
}

.step-title {
    font-size: 1rem;
    font-weight: 600;
    color: #171717;
    margin: 0 0 0.25rem 0;
}

.step-description {
    font-size: 0.875rem;
    color: #525252;
    margin: 0;
    line-height: 1.5;
}

.start-button {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
    color: white;
    border: none;
    border-radius: 1rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 16px rgba(14, 165, 233, 0.3);
}

.start-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(14, 165, 233, 0.4);
}

.virtual-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
    z-index: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease-out;
}

.split-screen-container {
    width: 100%;
    height: 100%;
    display: flex;
}

.tutorial-sidebar {
    flex-shrink: 0;
}

.virtual-environment-container {
    flex: 1;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@media (max-width: 768px) {
    .stats-container {
        grid-template-columns: 1fr;
    }

    .tutorials-grid {
        grid-template-columns: 1fr;
    }

    .header-title {
        font-size: 1.5rem;
    }
}
</style>
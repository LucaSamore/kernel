<script setup lang="ts">
import { computed } from 'vue'
import { TrophyIcon, StarIcon, AcademicCapIcon } from '@heroicons/vue/24/outline'
import type { Tutorial } from './TutorialSystem.vue'

const props = defineProps<{
  tutorials: Tutorial[]
  completedTutorials: Set<string>
}>()

const emit = defineEmits<{
  click: []
}>()

const totalPoints = computed(() => {
  return Array.from(props.completedTutorials).reduce((sum, tutorialId) => {
    const tutorial = props.tutorials.find(t => t.id === tutorialId)
    return sum + (tutorial?.points || 0)
  }, 0)
})

const earnedBadges = computed(() => {
  return props.tutorials
    .filter(t => props.completedTutorials.has(t.id))
    .length
})

const totalProgress = computed(() => {
  const completed = props.tutorials.filter(t =>
    props.completedTutorials.has(t.id)
  ).length
  return Math.round((completed / props.tutorials.length) * 100)
})
</script>

<template>
  <button class="tutorial-button glass-button" @click="emit('click')" aria-label="Apri tutorial interattivi">
    <div class="tutorial-content">
      <AcademicCapIcon class="header-icon" />
      <span class="tutorial-label">Tutorial interattivi</span>
      
      <div class="tutorial-stats">
        <div class="stat-group">
          <TrophyIcon class="stat-icon trophy" />
          <span class="stat-value">{{ totalPoints }}</span>
        </div>
        
        <div class="stat-group">
          <StarIcon class="stat-icon star" />
          <span class="stat-value">{{ earnedBadges }}</span>
        </div>
        
        <div class="progress-wrapper">
          <div class="progress-track">
            <div class="progress-fill" :style="{ width: `${totalProgress}%` }"></div>
          </div>
          <span class="progress-label">{{ totalProgress }}%</span>
        </div>
      </div>
    </div>
  </button>
</template>

<style scoped>
.tutorial-button {
  display: flex;
  align-items: center;
  height: 2.25rem;
  padding: 0 0.75rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
}

.tutorial-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.tutorial-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--topbar-text-color);
  white-space: nowrap;
  line-height: 1;
}

.header-icon {
    width: 1rem;
    height: 1rem;
    color: #0ea5e9;
    flex-shrink: 0;
}

.tutorial-stats {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.stat-group {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.stat-icon {
  width: 0.875rem;
  height: 0.875rem;
  flex-shrink: 0;
}

.stat-icon.trophy {
  color: #f59e0b;
}

.stat-icon.star {
  color: #8b5cf6;
}

.stat-value {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--topbar-text-color);
  line-height: 1;
}

.progress-wrapper {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.progress-track {
  width: 3rem;
  height: 0.25rem;
  background: var(--accent-primary-15);
  border-radius: 0.125rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--sky-0ea5e9), var(--purple-a855f7));
  border-radius: 0.125rem;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-label {
  font-size: 0.6875rem;
  font-weight: 700;
  color: var(--sky-0ea5e9);
  white-space: nowrap;
  line-height: 1;
}

/* Responsive */
@media (max-width: 1200px) {
  .tutorial-content {
    gap: 0.5rem;
  }
  
  .tutorial-stats {
    gap: 0.5rem;
  }
  
  .progress-track {
    width: 2.5rem;
  }
}

@media (max-width: 1024px) {
  .tutorial-label {
    font-size: 0.6875rem;
  }
  
  .stat-icon {
    width: 0.8125rem;
    height: 0.8125rem;
  }
  
  .stat-value {
    font-size: 0.6875rem;
  }
  
  .progress-label {
    font-size: 0.625rem;
  }
}

@media (max-width: 768px) {
  .tutorial-button {
    height: 2rem;
    padding: 0 0.625rem;
  }
  
  .tutorial-content {
    gap: 0.5rem;
  }
  
  .tutorial-stats {
    gap: 0.375rem;
  }
  
  .progress-track {
    width: 2rem;
  }
}

@media (max-width: 480px) {
  .tutorial-label {
    display: none;
  }
  
  .header-icon {
    display: none;
  }
  
  .tutorial-button {
    padding: 0 0.5rem;
  }
  
  .tutorial-content {
    gap: 0.375rem;
  }
  
  .progress-track {
    width: 2.5rem;
  }
}
</style>
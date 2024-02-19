<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useDarkMode } from '@/utils/composables/darkMode';
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
import FooterComponent from '@/components/layout/FooterComponent.vue';

const { isDarkMode, applyDarkMode } = useDarkMode();
</script>

<template>
  <div :class="isDarkMode ? 'dark' : ''">
    <HeaderComponent
      :toggle-dark="applyDarkMode"
      :is-dark-mode="isDarkMode"
    />
    <main class="w-full container-height bg-zinc-50 dark:bg-slate-900">
      <RouterView v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    <FooterComponent />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

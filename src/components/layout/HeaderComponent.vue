<script setup lang="ts">
import IconSum from '@/components/icons/IconSum.vue';
import IconMoon from '@/components/icons/IconMoon.vue';

const props = defineProps(['toggleDark', 'isDarkMode']);
</script>

<template>
  <header class="h-14 fixed w-full flex px-4 py-2 bg-blue-500 dark:bg-slate-700">
    <img
      alt="Vue logo"
      class="block"
      src="@/assets/logo.svg"
      width="40"
      height="40"
    />

    <div class="flex justify-center w-full items-center">
      <h2 class="text-white text-2xl">OnCar</h2>
    </div>

    <div class="h-full flex items-center gap-4 text-white">
      <button
        @click="props.toggleDark()"
        class="animate-pulse"
      >
        <IconSum v-if="props.isDarkMode" />
        <IconMoon v-else />
      </button>
    </div>
  </header>
</template>

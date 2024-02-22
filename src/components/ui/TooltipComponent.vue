<script setup lang="ts">
defineProps({
  message: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div :class="$style.hasTooltip">
    <slot />
    <span :class="$style.tooltip"> {{ message }} </span>
  </div>
</template>

<style module lang="postcss">
.tooltip {
  @apply invisible absolute text-sm bg-slate-600 p-1 rounded;
}

.hasTooltip:hover .tooltip {
  @apply visible z-50;
}
</style>

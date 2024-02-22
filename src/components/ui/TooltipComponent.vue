<script setup lang="ts">
defineProps({
  message: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div class="hasTooltip">
    <slot />
    <span class="tooltip invisible text-sm bg-slate-600 p-1 rounded"> {{ message }} </span>
  </div>
</template>

<style>
.tooltip {
  position: absolute;
}

.hasTooltip:hover .tooltip {
  z-index: 50;
  visibility: visible;
}
</style>

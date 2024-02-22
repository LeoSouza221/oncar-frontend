<script setup lang="ts">
import ModalComponent from '@/components/layout/ModalComponent.vue';
//
</script>

<template>
  <ModalComponent v-model="true">
    <div>teste</div>
  </ModalComponent>
</template>

<style module lang="postcss">
.teste {
  @apply flex;
}
</style>

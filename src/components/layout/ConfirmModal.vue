<script setup lang="ts">
import { computed } from 'vue';
import { useDarkMode } from '@/utils/composables/darkMode';
import ModalComponent from './ModalComponent.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:modelValue', 'confirmAction']);

const { isDarkMode } = useDarkMode();

const isOpen = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  },
});
</script>

<template>
  <ModalComponent v-model="isOpen">
    <div
      class="card w-[300px] dark:bg-slate-700 dark:text-white"
      :class="isDarkMode ? 'dark' : ''"
    >
      <div class="py-2 text-center">
        <p>{{ message }}</p>
      </div>

      <div class="pt-2 flex justify-between">
        <button
          class="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
          @click="isOpen = false"
        >
          Cancelar
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="$emit('confirmAction')"
        >
          Confirmar
        </button>
      </div>
    </div>
  </ModalComponent>
</template>

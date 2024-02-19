<script setup lang="ts">
import { computed, ref } from 'vue';
import type { PropType } from 'vue';
import type { Car } from '@/types/car';
import { useCarsStore } from '@/stores/manageCars';
import InputCompnent from '@/components/ui/InputComponent.vue';
import ModalComponent from '@/components/layout/ModalComponent.vue';

const inputError = ref<boolean>(true);
const inputErrorMessage = ref<string>('');
const carStore = useCarsStore();

const props = defineProps({
  modalValue: {
    type: Object as PropType<Car>,
    required: true,
  },
  isModalOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['update:modalValue', 'update:isModalOpen']);

const todoItem = computed({
  get() {
    return props.modalValue;
  },
  set(newValue) {
    emit('update:modalValue', newValue);
  },
});

const openModal = computed({
  get() {
    return props.isModalOpen;
  },
  set(newValue) {
    emit('update:isModalOpen', newValue);
  },
});

function changeTodoItem() {
  const isOnlySpaces = todoItem.value.item.replace(/\s/g, '').length;

  if (!todoItem.value.item.length) {
    inputError.value = true;
    inputErrorMessage.value = 'Digite pelo menos 1 caracter';

    return;
  }

  if (!isOnlySpaces) {
    inputError.value = true;
    inputErrorMessage.value = 'Itens não devem conter somente espaços';

    return;
  }

  carStore.changeCarItem(todoItem.value);

  openModal.value = false;
  inputError.value = false;
}
</script>

<template>
  <ModalComponent v-model="openModal">
    <div class="card w-[400px] dark:bg-slate-700 dark:text-white">
      <div>
        <h3 class="text-2xl">Editar tarefa</h3>
      </div>
      <div class="py-2">
        <InputCompnent
          v-model="todoItem.item"
          :error="inputError"
          :error-message="inputErrorMessage"
          @update:update-model="changeTodoItem()"
        />
      </div>

      <div class="pt-2 flex justify-between">
        <button
          class="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
          @click="openModal = false"
          >Cancelar</button
        >

        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="changeTodoItem"
          >Confirmar</button
        >
      </div>
    </div>
  </ModalComponent>
</template>

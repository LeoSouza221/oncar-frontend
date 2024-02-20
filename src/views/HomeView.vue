<script setup lang="ts">
import { ref } from 'vue';
// import type { TodoItem } from '@/types/todoItem';
import { useCar } from '@/utils/composables/carsComposable';
import CarList from '@/components/layout/CarList.vue';
// import InputComponent from '@/components/InputComponent.vue';

const isClear = ref<boolean>(false);
const inputError = ref<boolean>(true);
const inputErrorMessage = ref<string>('');
const newCar = ref<string>('');
const { carStore, cars } = useCar();

function validateText() {
  const isOnlySpaces = newCar.value.replace(/\s/g, '').length;

  if (!newCar.value.length && !isClear.value) {
    inputError.value = true;
    inputErrorMessage.value = 'Digite pelo menos 1 caracter';

    return false;
  }

  if (!isOnlySpaces && !isClear.value) {
    inputError.value = true;
    inputErrorMessage.value = 'Itens não devem conter somente espaços';

    return false;
  }

  inputError.value = false;
  isClear.value = false;

  return true;
}

function addNewTodoItem() {
  isClear.value = false;

  const isValid = validateText();

  if (!isValid) {
    return;
  }

  // const newTodoItem: TodoItem = {
  //   item: newCar.value,
  //   id: new Date().getTime(),
  // };

  // todoStore.addNewTodoItem(newTodoItem);
  clearInput();
}

function clearInput() {
  newCar.value = '';
  isClear.value = true;
}
</script>

<template>
  <div class="custom-height flex justify-center items-center p-2">
    <div class="card w-[500px] dark:bg-slate-700 dark:text-white">
      <div class="flex justify-between gap-4">
        <h3 class="text-lg">Listagem de carros</h3>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10"
          @click="addNewTodoItem"
        >
          Adicionar
        </button>
      </div>

      <div class="py-2">
        <CarList v-model="cars" />
      </div>
    </div>
  </div>
</template>

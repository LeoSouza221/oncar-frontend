<script setup lang="ts">
import { ref } from 'vue';
// import type { TodoItem } from '@/types/todoItem';
// import { useTodo } from '@/utils/composables/todoComposable';
// import ListTodoItems from '@/components/ListTodoItems.vue';
// import InputComponent from '@/components/InputComponent.vue';

const isClear = ref<boolean>(false);
const inputError = ref<boolean>(true);
const inputErrorMessage = ref<string>('');
const todoText = ref<string>('');
// const { todoStore, todoItems, concludeItems } = useTodo();

function validateText() {
  const isOnlySpaces = todoText.value.replace(/\s/g, '').length;

  if (!todoText.value.length && !isClear.value) {
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
  //   item: todoText.value,
  //   id: new Date().getTime(),
  // };

  // todoStore.addNewTodoItem(newTodoItem);
  clearInput();
}

function clearInput() {
  todoText.value = '';
  isClear.value = true;
}
</script>

<template>
  <div class="custom-height flex justify-center items-center p-2">
    <div class="card w-[500px] dark:bg-slate-700 dark:text-white">
      <div class="flex gap-4">
        <!-- <InputModel
          v-model="todoText"
          :error="inputError"
          :error-message="inputErrorMessage"
          placeholder="Adicione um item a lista"
          @update:update-model="addNewTodoItem()"
        /> -->
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10"
          @click="addNewTodoItem"
        >
          Adicionar
        </button>
      </div>

      <div class="py-2">
        <div>
          <!-- <router-link
            class="hover:underline hover:cursor-pointer"
            to="/todo-list"
          >
            <span class="text-lg font-bold py-2">Itens pendentes</span>
          </router-link> -->
          <div class="h-[200px] overflow-y-auto overflow-x-hidden">
            <!-- <ListTodoItems v-model="todoItems" /> -->
          </div>
        </div>

        <div class="py-2">
          <!-- <router-link
            class="hover:underline hover:cursor-pointer"
            :to="{ name: 'todo-list', query: { isConclude: 'true' } }"
          >
            <span class="text-lg font-bold py-2">Itens concluídos</span>
          </router-link> -->
          <div class="h-[200px] overflow-y-auto overflow-x-hidden">
            <!-- <ListTodoItems v-model="concludeItems" is-conclude /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

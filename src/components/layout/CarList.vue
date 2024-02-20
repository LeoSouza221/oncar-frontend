<script setup lang="ts">
import { computed, ref, reactive } from 'vue';
import type { Car } from '@/types/car';
import { useCarsStore } from '@/stores/manageCars';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import ModalComponent from './ModalComponent.vue';
import EditCarModal from './EditCarModal.vue';
import { useDarkMode } from '@/utils/composables/darkMode';

const props = defineProps({
  modelValue: {
    type: Array<Car>,
    required: true,
  },
  isConclude: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue']);

const carStore = useCarsStore();
const { isDarkMode } = useDarkMode();

const isModalOpen = ref<boolean>(false);
const isConcludeModalOpen = ref<boolean>(false);
const selectedItem = ref(0);
let carEdit: Car = reactive({
  id: 0,
  model: '',
  color: '',
  brand: '',
});

const cars = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  },
});

function confirmConclusion(index: number) {
  selectedItem.value = index;

  isConcludeModalOpen.value = true;
}

function editItem(index: number) {
  isModalOpen.value = true;
  carEdit = { ...cars.value[index] };
}

function removeItem(index?: number) {
  if (index) {
    carStore.removeCar(index);
    return;
  }

  carStore.removeCar(selectedItem.value);
}

function concludeItem() {
  carStore.addNewCarItem(selectedItem.value);
  isConcludeModalOpen.value = false;

  removeItem();
}
</script>

<template>
  <div
    v-if="cars?.length"
    class="h-[300px] overflow-y-auto overflow-x-hidden"
  >
    <TransitionGroup
      name="list"
      tag="ul"
      class="py-2 w-full dark:text-white"
    >
      <li
        v-for="(car, index) in cars"
        :key="index"
        class="grid grid-cols-12 gap-2 py-2 items-center"
      >
        <div
          class="col-span-9 text-start"
          :class="`col-span-${isConclude ? '12' : '9'}`"
        >
          <span class="text-base font-semibold">
            {{ car.model }}
          </span>
          <div>
            <span
              class="text-sm"
              :class="isConclude ? 'line-through' : ''"
            >
              {{ car.brand }} - {{ car.color }}
            </span>
          </div>
        </div>
        <div
          v-if="!isConclude"
          class="col-span-3 flex justify-end gap-2"
        >
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded-full"
            @click="editItem(index)"
          >
            <IconEdit />
          </button>
          <button
            class="bg-red-600 hover:bg-red-500 text-white font-bold p-1 rounded-full"
            @click="removeItem(index)"
          >
            <IconDelete />
          </button>
          <!-- <button
          class="bg-green-600 hover:bg-green-500 text-white font-bold p-1 rounded-full"
          @click="confirmConclusion(index)"
        >
          <IconCheck />
        </button> -->
        </div>
      </li>
    </TransitionGroup>
  </div>

  <div
    v-else
    class="w-full text-center opacity-25 p-4"
  >
    <p>Não há itens</p>
  </div>

  <EditCarModal
    v-model:modal-value="carEdit"
    v-model:is-modal-open="isModalOpen"
  />

  <ModalComponent v-model="isConcludeModalOpen">
    <div
      class="card w-[300px] dark:bg-slate-700 dark:text-white"
      :class="isDarkMode ? 'dark' : ''"
    >
      <div class="py-2 text-center">
        <p>Tem certeza que deseja finalizar o item?</p>
      </div>

      <div class="pt-2 flex justify-between">
        <button
          class="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
          @click="isConcludeModalOpen = false"
        >
          Cancelar
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="concludeItem"
        >
          Confirmar
        </button>
      </div>
    </div>
  </ModalComponent>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

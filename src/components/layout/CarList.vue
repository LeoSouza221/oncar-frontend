<script setup lang="ts">
import { computed, ref, reactive, onMounted } from 'vue';
import { useCarsStore } from '@/stores/manageCars';
import { useRoute } from 'vue-router';
import type { Car } from '@/types/car';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import EditCarModal from './EditCarModal.vue';
import ConfirmModal from './ConfirmModal.vue';

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
const route = useRoute();
const isModalOpen = ref<boolean>(false);
const isConfirmOpen = ref<boolean>(false);
const selectedItem = ref(0);
let carEdit: Car = reactive({
  id: 0,
  model: '',
  color: '',
  brand: '',
});

// onMounted(() => {
//   if (route.path === '/edit') {
//     const { car } = route.query;

//     const position = cars.value.findIndex((itemCar) => {
//       return itemCar.id?.toString() === car;
//     });

//     if (position >= 0) {
//       editCar(position);
//     }
//   }
// });

const cars = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  },
});

function editCar(index: number) {
  isModalOpen.value = true;
  carEdit = { ...cars.value[index] };
}

function removeCarAndCloseModal() {
  carStore.removeCar(selectedItem.value);
  isConfirmOpen.value = false;
}

function confirmRemoveCar(index: number) {
  isConfirmOpen.value = true;
  selectedItem.value = index;
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
          <span class="text-base font-semibold text-slate-700 dark:text-white">
            {{ car.model }}
          </span>
          <div>
            <span
              class="text-sm text-slate-700 dark:text-white"
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
            @click="editCar(index)"
          >
            <IconEdit />
          </button>
          <button
            class="bg-red-600 hover:bg-red-500 text-white font-bold p-1 rounded-full"
            @click="confirmRemoveCar(index)"
          >
            <IconDelete />
          </button>
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

  <ConfirmModal
    v-model="isConfirmOpen"
    message="Tem certeza que deseja excluir este veículo?"
    @confirm-action="removeCarAndCloseModal"
  />
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

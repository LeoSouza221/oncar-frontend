import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useCarsStore } from '@/stores/manageCars';
import type { Car } from '@/types/car';

export function useTodo() {
  const carsStore = useCarsStore();
  const { cars } = storeToRefs(carsStore);

  onMounted(() => {
    const localCars: Car[] = localStorage['todo-items']
      ? JSON.parse(localStorage.getItem('todo-items') ?? '')
      : [];
    const emptyTodo: Car[] = [];

    if (localCars.length) {
      cars.value = emptyTodo.concat(localCars);
    }
  });

  watch(
    () => cars.value,
    (newValue) => {
      updateLocalStorage('todo-items', newValue);
    },
    { deep: true },
  );

  function updateLocalStorage(item: string, newValue: Car[]) {
    localStorage.setItem(item, JSON.stringify(newValue));
  }

  return { carsStore, cars };
}

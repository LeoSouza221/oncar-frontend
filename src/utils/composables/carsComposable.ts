import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useCarsStore } from '@/stores/manageCars';
import type { Car } from '@/types/car';
import carList from '@/utils/carList.json';

export function useCar() {
  const carsStore = useCarsStore();
  const { cars } = storeToRefs(carsStore);

  onMounted(() => {
    const localCars: Car[] = localStorage['car-items']
      ? JSON.parse(localStorage.getItem('car-items') ?? '')
      : [];
    const emptyTodo: Car[] = [];

    if (localCars.length) {
      cars.value = emptyTodo.concat(localCars);
    } else {
      updateLocalStorage('car-items', carList.cars);
      cars.value = emptyTodo.concat(carList.cars);
    }
  });

  watch(
    () => cars.value,
    (newValue) => {
      updateLocalStorage('car-items', newValue);
    },
    { deep: true },
  );

  function updateLocalStorage(item: string, newValue: Car[]) {
    localStorage.setItem(item, JSON.stringify(newValue));
  }

  return { carsStore, cars };
}

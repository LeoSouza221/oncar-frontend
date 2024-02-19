import { defineStore } from 'pinia';
import type { Car } from '@/types/car';

export const useCarsStore = defineStore('counter', {
  state: () => ({
    cars: [] as Car[],
  }),
  actions: {
    removeCar(index: number) {
      this.cars.splice(index, 1);
    },
    changeCarItem(car: Car) {
      const { id } = car;
      const position = this.cars.findIndex((item) => item.id === id);

      if (position >= 0) {
        this.cars[position] = { ...car };
      }
    },
    addNewCarItem(car: Car) {
      this.cars.push(car);
    },
  },
});

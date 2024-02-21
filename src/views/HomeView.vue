<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useCar } from '@/utils/composables/carsComposable';
import { useRoute } from 'vue-router';
import CarList from '@/components/layout/CarList.vue';
import AddCarModal from '@/components/layout/AddCarModal.vue';
import InputComponent from '@/components/ui/InputComponent.vue';

const { cars } = useCar();
const route = useRoute();
const isModalOpen = ref(false);
const search = ref('');

onMounted(() => {
  if (route.path === '/add') {
    isModalOpen.value = true;
  }
});

const carsList = computed(() => {
  return cars.value.filter((car) =>
    JSON.stringify(car).toString().toLowerCase().includes(search.value.toLowerCase()),
  );
});
</script>

<template>
  <div class="custom-height flex justify-center items-center p-2">
    <div class="card w-[500px] dark:bg-slate-700 dark:text-white">
      <div>
        <h3 class="text-lg font-bold text-slate-700 dark:text-white"> Listagem de carros </h3>
      </div>
      <div class="flex items-start gap-4">
        <InputComponent
          v-model="search"
          placeholder="Buscar veículo"
        />
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10"
          @click="isModalOpen = true"
        >
          Adicionar
        </button>
      </div>

      <div class="py-2">
        <CarList v-model="carsList" />
      </div>
    </div>
    <AddCarModal v-model="isModalOpen" />
  </div>
</template>

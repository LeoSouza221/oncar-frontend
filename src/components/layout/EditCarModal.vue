<script setup lang="ts">
import { computed, ref, reactive } from 'vue';
import type { PropType } from 'vue';
import type { Car } from '@/types/car';
import { useCarsStore } from '@/stores/manageCars';
import InputCompnent from '@/components/ui/InputComponent.vue';
import ModalComponent from '@/components/layout/ModalComponent.vue';

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

const carStore = useCarsStore();
const inputsErrors = reactive({
  model: {
    hasError: false,
    message: '',
  },
  brand: {
    hasError: false,
    message: '',
  },
  color: {
    hasError: false,
    message: '',
  },
});

const car = computed({
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

function isValidModel() {
  const isOnlySpaces = car.value.model.replace(/\s/g, '').length;

  if (!car.value.model.length) {
    inputsErrors.model.hasError = true;
    inputsErrors.model.message = 'Digite pelo menos 1 caracter';

    return false;
  } else if (!isOnlySpaces) {
    inputsErrors.model.hasError = true;
    inputsErrors.model.message = 'Itens não devem conter somente espaços';

    return false;
  }

  return true;
}

function isValidBrand() {
  const isOnlySpaces = car.value.brand.replace(/\s/g, '').length;

  if (!car.value.brand.length) {
    inputsErrors.brand.hasError = true;
    inputsErrors.brand.message = 'Digite pelo menos 1 caracter';

    return false;
  } else if (!isOnlySpaces) {
    inputsErrors.brand.hasError = true;
    inputsErrors.brand.message = 'Itens não devem conter somente espaços';

    return false;
  }

  return true;
}

function isValidColor() {
  const isOnlySpaces = car.value.color.replace(/\s/g, '').length;

  if (!car.value.color.length) {
    inputsErrors.color.hasError = true;
    inputsErrors.color.message = 'Digite pelo menos 1 caracter';

    return false;
  } else if (!isOnlySpaces) {
    inputsErrors.color.hasError = true;
    inputsErrors.color.message = 'Itens não devem conter somente espaços';

    return false;
  }

  return true;
}

function clearAndCloseModal() {
  openModal.value = false;
  inputsErrors.brand.hasError = false;
  inputsErrors.color.hasError = false;
  inputsErrors.model.hasError = false;
}

function validateAndSubmit(e: Event) {
  e.preventDefault();

  if (!isValidModel()) return;
  if (!isValidBrand()) return;
  if (!isValidColor()) return;

  carStore.changeCarItem(car.value);

  clearAndCloseModal();
}
</script>

<template>
  <ModalComponent v-model="openModal">
    <div class="card w-[400px] dark:bg-slate-700 dark:text-white">
      <div>
        <h3 class="text-2xl">Editar carro</h3>
      </div>
      <form @submit="validateAndSubmit">
        <div class="pt-2">
          <label>
            Modelo
            <InputCompnent
              v-model="car.model"
              :error="inputsErrors.model.hasError"
              :error-message="inputsErrors.model.message"
            />
          </label>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <label>
            Marca
            <InputCompnent
              v-model="car.brand"
              :error="inputsErrors.brand.hasError"
              :error-message="inputsErrors.brand.message"
            />
          </label>
          <label>
            Cor
            <InputCompnent
              v-model="car.color"
              :error="inputsErrors.color.hasError"
              :error-message="inputsErrors.color.message"
              @update:update-model="validateAndSubmit"
            />
          </label>
        </div>

        <div class="pt-2 flex justify-between">
          <button
            class="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
            @click="clearAndCloseModal"
          >
            Cancelar
          </button>

          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Confirmar
          </button>
        </div>
      </form>
    </div>
  </ModalComponent>
</template>

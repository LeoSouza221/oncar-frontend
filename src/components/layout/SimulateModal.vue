<script setup lang="ts">
import { computed, ref, reactive, watch } from 'vue';
import type { PropType } from 'vue';
import type { Car } from '@/types/car';
import { useRouter } from 'vue-router';
import InputCompnent from '@/components/ui/InputComponent.vue';
import ModalComponent from '@/components/layout/ModalComponent.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  car: {
    type: Object as PropType<Car>,
    required: true,
  },
});
const emit = defineEmits(['update:modelValue']);

const router = useRouter();
const isSimulate = ref(false);
const result = ref('');
const score = ref(0);
const data = ref({
  name: '',
  document: '',
});
const inputsErrors = reactive({
  name: {
    hasError: false,
    message: '',
  },
  document: {
    hasError: false,
    message: '',
  },
});

const isOpen = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  },
});

watch(isOpen, (newValue) => {
  if (newValue) {
    router.replace({
      path: '/simulation',
    });

    return;
  }

  router.replace({
    path: '/',
  });
});

function isValidName() {
  const isOnlySpaces = data.value.name.replace(/\s/g, '').length;

  if (!data.value.name.length) {
    inputsErrors.name.hasError = true;
    inputsErrors.name.message = 'Digite pelo menos 1 caracter';

    return false;
  } else if (!isOnlySpaces) {
    inputsErrors.name.hasError = true;
    inputsErrors.name.message = 'Itens não devem conter somente espaços';

    return false;
  }

  return true;
}

function isValidDocument() {
  const isOnlySpaces = data.value.document.replace(/\s/g, '').length;

  if (!data.value.document.length) {
    inputsErrors.document.hasError = true;
    inputsErrors.document.message = 'Digite pelo menos 1 caracter';

    return false;
  } else if (!isOnlySpaces) {
    inputsErrors.document.hasError = true;
    inputsErrors.document.message = 'Itens não devem conter somente espaços';

    return false;
  }

  return true;
}

function clearAndCloseModal() {
  isOpen.value = false;
  isSimulate.value = false;
  data.value.document = '';
  data.value.name = '';
  inputsErrors.name.hasError = false;
  inputsErrors.document.hasError = false;
}

function simulateFinancial() {
  isSimulate.value = true;
  score.value = Math.floor(Math.random() * (1000 - 0 + 1) + 0);

  if (score.value < 300) {
    result.value = 'Reprovado';
  } else if (score.value >= 300 && score.value < 600) {
    result.value = '70% de entrada, 30% do comprometimento da renda';
  } else if (score.value >= 600 && score.value < 800) {
    result.value = '50% de entrada, 25% do comprometimento da renda';
  } else if (score.value >= 800 && score.value < 950) {
    result.value = '30% de entrada, 20% do comprometimento da renda';
  } else {
    result.value = '100% de financiamento, taxa zero.';
  }
}

function validateAndSubmit(e: Event) {
  e.preventDefault();

  if (!isValidName()) return;
  if (!isValidDocument()) return;

  simulateFinancial();
}
</script>

<template>
  <ModalComponent v-model="isOpen">
    <div class="card w-[400px] dark:bg-slate-700 dark:text-white">
      <div>
        <h3 class="text-2xl text-slate-700 dark:text-white"> Simular financiamento </h3>
      </div>
      <form
        v-if="!isSimulate"
        @submit="validateAndSubmit"
      >
        <div class="pt-2">
          <label class="text-slate-700 dark:text-white">
            Nome
            <InputCompnent
              v-model="data.name"
              :error="inputsErrors.name.hasError"
              :error-message="inputsErrors.name.message"
            />
          </label>
        </div>

        <label class="text-slate-700 dark:text-white">
          Documento
          <InputCompnent
            v-model="data.document"
            :error="inputsErrors.document.hasError"
            :error-message="inputsErrors.document.message"
          />
        </label>

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
            Simular
          </button>
        </div>
      </form>

      <div
        v-else
        class="py-2 text-slate-700 dark:text-white"
      >
        <span class="text-center text-lg">
          Sr(a) {{ data.name }} sua simulação para o {{ car.model }} - {{ car.color }} foi:
        </span>

        <p class="font-semibold"
          >- Score: <span class="font-normal">{{ score }}</span></p
        >
        <p class="font-semibold">
          - Resultado: <span class="font-normal">{{ result }}</span></p
        >

        <div class="pt-4 flex justify-between">
          <button
            class="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
            @click="clearAndCloseModal"
          >
            Cancelar
          </button>

          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            @click="clearAndCloseModal"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </ModalComponent>
</template>

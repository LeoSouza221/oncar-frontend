import { onMounted, ref } from 'vue';

export function useDarkMode() {
  const isDarkMode = ref(false);

  onMounted(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      isDarkMode.value = true;
    } else {
      isDarkMode.value = false;
    }
  });

  const applyDarkMode = () => {
    if (isDarkMode.value) {
      localStorage.theme = 'light';
      isDarkMode.value = false;
    } else {
      localStorage.theme = 'dark';
      isDarkMode.value = true;
    }
  };

  return { isDarkMode, applyDarkMode };
}

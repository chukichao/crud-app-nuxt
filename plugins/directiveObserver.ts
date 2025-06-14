import type { DirectiveBinding } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('observer', {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      const options = {
        rootMargin: '0px',
        threshold: 1.0,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const callback = (entries: any) => {
        if (entries[0].isIntersecting) {
          binding.value({ scroll: true });
        }
      };

      const observer = new IntersectionObserver(callback, options);
      observer.observe(el);
    },
  });
});

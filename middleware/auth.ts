const { hasDataLocalStorage } = useStorage();

export default defineNuxtRouteMiddleware((to) => {
  const isAuthenticated = hasDataLocalStorage("auth");

  if (isAuthenticated) {
    navigateTo(to.fullPath);
  } else {
    navigateTo("/");
  }
});

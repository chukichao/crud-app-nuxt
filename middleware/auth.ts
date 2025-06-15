const { hasDataLocalStorage } = useStorage();

export default defineNuxtRouteMiddleware((to) => {
	const isAuthenticated = hasDataLocalStorage("auth");

	if (isAuthenticated && !to.path.includes("/posts")) {
		return navigateTo(to.fullPath);
	} else if (!isAuthenticated && to.path !== "/") {
		return navigateTo("/");
	}
});

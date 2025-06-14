export default defineNuxtRouteMiddleware((to) => {
	if (localStorage.getItem("auth")) {
		navigateTo(to.fullPath);
	} else {
		navigateTo("/");
	}
});

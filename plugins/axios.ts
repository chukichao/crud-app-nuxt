import axios from "axios";

export default defineNuxtPlugin(() => {
	const axiosPlugin = axios.create();

	return {
		provide: {
			axiosPlugin,
		},
	};
});

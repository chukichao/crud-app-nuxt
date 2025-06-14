export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	if (!body.name || !body.age) {
		return;
	}

	return body;
});

// в компоненте
// const submitForm = async () => {
//   const { data } = await useFetch('/api/example', {
//     method: 'post',
//     body: form,
//   });
// };

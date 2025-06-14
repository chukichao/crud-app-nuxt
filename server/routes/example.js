// в компоненте
// const submitForm = async () => {
//   const { data } = await useFetch('/api/example');
// };

// export default defineEventHandler(() => {
//   return {
//     name: 'John',
//     age: 42,
//   };
// });

// в компоненте
// const submitForm = async () => {
//   const { data } = await useFetch('/api/example', {
//     method: 'post',
//     body: form,
//   });
// };

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.name || !body.age) {
    return;
  }

  return body;
});

export default defineEventHandler(() => {
  return {
    name: 'John',
    age: 42,
  };
});

// в компоненте
// const submitForm = async () => {
//   const { data } = await useFetch('/api/example');
// };

// ----------------------------------------------------------

// const { data: posts } = await useFetch('/api/posts');
// console.log(toRow(posts.value));

export const useStorage = () => {
  const hasDataLocalStorage = (key: string) =>
    localStorage.getItem(key) ? true : false;

  return {
    hasDataLocalStorage,
  };
};

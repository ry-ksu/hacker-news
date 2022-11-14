export const dateMapping = (date: number) => {
  const result = new Date(date * 1000).toString();
  return result.slice(0, 24);
};

export const getUrlParam = (param: string): string | null => {
  const { search } = window.location;
  const params = new URLSearchParams(search);
  return params.get(param);
};

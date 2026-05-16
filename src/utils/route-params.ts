export const encodeRouteParam = (value: string) => encodeURIComponent(value);

export const decodeRouteParam = (value = "") => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

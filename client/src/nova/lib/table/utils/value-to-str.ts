export const valueToStr = (val: unknown) => {
  if (typeof val === "undefined") return "";
  if (typeof val === "object") return JSON.stringify(val);
  return String(val);
};

export const formater = (value) => {
  return new Intl.NumberFormat("en").format(value);
};

export function strLength(str, length) {
  return str.substring(0, length) + "...";
}

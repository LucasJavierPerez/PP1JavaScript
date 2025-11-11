export const colorOptions = [
  { label: 'Azul', value: 'azul' },
  { label: 'Verde', value: 'verde' },
  { label: 'Rojo', value: 'rojo' },
  { label: 'Amarillo', value: 'amarillo' },
];

export const colorDictionary = colorOptions.reduce((acc, option) => {
  acc[option.value] = option.label;
  return acc;
}, {});

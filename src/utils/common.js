const snakeToCamel = (line) => line.replace(/([-_]\w)/g, g => g[1].toUpperCase());
const camelToSnake = (line) => line.split(/(?=[A-Z])/).join('_').toLowerCase();

export const convertSnakeToCamel = (item) => {
  console.log(item.id);
  const result = {};

  Object.entries(item).forEach(([key, value]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      result[snakeToCamel(key)] = convertSnakeToCamel(value);
      return;
    }
    result[snakeToCamel(key)] = value;
  });

  console.log('result: ', result);
  return result;
};

export const convertCamelToSnake = (item) => {
  const result = {};

  Object.entries(item).forEach(([key, value]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      result[camelToSnake(key)] = convertSnakeToCamel(value);
      return;
    }
    result[camelToSnake(key)] = value;
  });

  return result;
};

export const SCALE_FACTOR = 1.1;

export const addScaleFactor = (object, keys) => {
  if (typeof object === 'object') {
    const result = { ...object };
    Object.keys(object).forEach(key => {
      if (Array.isArray(keys)) {
        for (const arrKey of keys) {
          result[key][arrKey] = Math.round(object[key][arrKey] * SCALE_FACTOR);
        }
      } else {
        result[key] = Math.round(object[key] * SCALE_FACTOR);
      }
    });
    return result;
  }
  return object * SCALE_FACTOR;
};

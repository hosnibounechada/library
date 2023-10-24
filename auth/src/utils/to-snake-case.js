function camelToSnake(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => camelToSnake(item));
  } else if (obj !== null && typeof obj === "object") {
    const newObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = key.replace(
          /[A-Z]/g,
          (match) => `_${match.toLowerCase()}`
        );
        newObj[newKey] = camelToSnake(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
}

module.exports = camelToSnake;

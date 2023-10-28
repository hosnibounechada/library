function snakeToCamel(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => snakeToCamel(item));
  } else if (obj !== null && typeof obj === "object") {
    const newObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = key.replace(/_([a-z])/g, (match, group) =>
          group.toUpperCase()
        );
        newObj[newKey] = snakeToCamel(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
}

module.exports = snakeToCamel;

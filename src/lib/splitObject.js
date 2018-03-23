const splitObject = obj =>
  Object.keys(obj).reduce((acc, key) => acc.concat({ [key]: obj[key] }), []);

export default splitObject;

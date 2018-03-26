const uniq = entries =>
  entries.filter((elem, pos, arr) => arr.indexOf(elem) === pos);

export default uniq;

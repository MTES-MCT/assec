export const parseQuery = (search = null) => {
  // FIXME -> encode decode URI
  if (!search) return null;
  const str = search.indexOf('?') === 0 && search.substr(1);
  const parsed =
    str &&
    str.split('&').reduce((acc, pair) => {
      const splitted = (pair.indexOf('=') !== -1 && pair.split('=')) || pair;
      const prop = (splitted && splitted.length > 0 && splitted[0]) || null;
      if (!prop) return acc;
      const val = (splitted && splitted.length > 1 && splitted[1]) || null;
      return Object.assign({}, acc, { [prop]: val });
    }, {});
  return parsed;
};

export default parseQuery;

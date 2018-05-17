export const capitalize = (str = '') => {
  const rez = str.toLocaleLowerCase().trim();
  return `${rez.charAt(0).toUpperCase()}${rez.slice(1)}`;
};

export default capitalize;

export const keypath = (path, prefix) =>
  `${prefix}::${path
    .split('/')
    .filter(v => v)
    .join('::')}`;

export default keypath;

module.exports = (message, color) => {
  // `$ echo -e "\033[1mThis is a BOLD line\033[0m"`
  const getcolor = (msg, code) => `\x1b[${code}m${msg}\x1b[39m`;

  switch (color) {
  case 'white':
    return getcolor(message, 37);
  case 'cyan':
    return getcolor(message, 36);
  case 'magenta':
    return getcolor(message, 35);
  case 'blue':
    return getcolor(message, 34);
  case 'yellow':
    return getcolor(message, 33);
  case 'green':
    return getcolor(message, 32);
  case 'red':
    return getcolor(message, 31);
  case 'black':
    return getcolor(message, 30);
  case 'grey':
  case 'gray':
  default:
    return getcolor(message, 90);
  }
};

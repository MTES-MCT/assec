/* eslint
  max-len: 0,
  no-console: 0 */
const colorize = require('./colorize');

module.exports = {
  ok: (message, target = '') => {
    const msg = `${colorize(`${target ? `${target} ` : ''}`, 'grey')}${colorize(
      'OK ',
      'green',
    )}${message}`;
    return console.log(msg);
  },
  debug: (message, target = '') => {
    const msg = `${colorize(`${target ? `${target} ` : ''}`, 'grey')}${colorize(
      'debug ',
      'blue',
    )}${message}`;
    return console.log(msg);
  },
  info: (message, target = '') => {
    const msg = `${colorize(`${target ? `${target} ` : ''}`, 'grey')}${colorize(
      'info ',
      'yellow',
    )}${message}`;
    return console.log(msg);
  },
  warn: (message, target = '') => {
    const msg = `${colorize(`${target ? `${target} ` : ''}`, 'grey')}${colorize(
      'warning ',
      'magenta',
    )}${message}`;
    return console.log(msg);
  },
  error: (message, target = '') => {
    const msg = `${colorize(`${target ? `${target} ` : ''}`, 'grey')}${colorize(
      'error ',
      'red',
    )}${message}`;
    return console.log(msg);
  },
};

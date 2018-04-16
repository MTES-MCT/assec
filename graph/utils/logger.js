import { colorize } from './colorize';

export const logger = {
  ok: (message, target = '') => {
    const msg = `
${colorize(`${target ? `${target} ` : ''}`, 'grey')}${colorize(
  'OK ',
  'green',
)}${message}
    `;
    return process.stdout.write(msg);
  },
  debug: (message, target = '') => {
    const msg = `
${colorize(`${target ? `${target} ` : ''}`, 'grey')}${colorize(
  'debug ',
  'blue',
)}${message}
    `;
    return process.stdout.write(msg);
  },
  info: (message, target = '') => {
    const msg = `
${colorize(`${target ? `${target} ` : ''}`, 'grey')}${colorize(
  'info ',
  'yellow',
)}${message}
`;
    return process.stdout.write(msg);
  },
  warn: (message, target = '') => {
    const msg = `
${colorize(`${target ? `${target} ` : ''}`, 'grey')}${colorize(
  'warning ',
  'magenta',
)}${message}
    `;
    return process.stdout.write(msg);
  },
  error: (message, target = '') => {
    const msg = `
${colorize(`${target ? `${target} ` : ''}`, 'grey')}${colorize(
  'error ',
  'red',
)}${message}
    `;
    return process.stdout.write(msg);
  },
};

export default logger;

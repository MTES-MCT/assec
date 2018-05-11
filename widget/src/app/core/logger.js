/* eslint
  no-console: 0
*/
import { usedebug } from './utils/usedebug';

export const Logger = {
  debug: (msg) => {
    if (!usedebug()) return;
    console.log('Logger.debug message => ', msg);
  },
  ok: (msg) => {
    console.log('Logger.ok message => ', msg);
  },
  warn: (msg) => {
    console.log('Logger.warn message => ', msg);
  },
  error: (msg) => {
    console.log('Logger.error message => ', msg);
  },
};

export default Logger;

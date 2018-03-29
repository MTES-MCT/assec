const { assert } = require('chai');

const mockdata = false;

describe('MyScript', () => {
  describe('MyScript.method()', () => {
    it('return something', () => {
      const myscript = new MyScript();
      const result = myscript.method();
      assert.equal(result, mockdata);
    });
  });
});

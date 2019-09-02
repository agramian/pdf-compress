import pdfCompress from '../lib/pdf-compress.js';

describe('PDF compress argument validation', () => {
  it('should throw an error if no arguments are passed', () => {
    chai.expect(() => compress()).to.throw(Error, pdfCompressStrings.errors.missingArgs);
  });
});

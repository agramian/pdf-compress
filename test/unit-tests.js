import { expect } from 'chai';

import { compress, strings as pdfCompressStrings } from '../lib/pdf-compress';

describe('PDF compress argument validation', () => {
  it('should throw an error if no arguments are passed', () => {
    expect(() => compress()).to.throw(Error, pdfCompressStrings.errors.missingArgs);
  });
  it('should throw an error if no argument is passed for compressTarget', () => {
    expect(() => compress({})).to.throw(Error, pdfCompressStrings.errors.missingCompressTargetArg);
  });
  it('should throw an error if no argument is passed for window', () => {
    expect(() => compress(null, "test")).to.throw(Error, pdfCompressStrings.errors.missingWindowArg);
  });
  it('should throw an error if an invalid argument is passed', () => {
    expect(() => compress({}, 1)).to.throw(Error, pdfCompressStrings.errors.invalidArg);
    expect(() => compress({}, {})).to.throw(Error, pdfCompressStrings.errors.invalidArg);
    expect(() => compress({}, [])).to.throw(Error, pdfCompressStrings.errors.invalidArg);
  });
});

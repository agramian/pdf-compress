import strings from './strings';

const pdfjs = require('pdfjs-dist');

const compress = (window, compressTarget) => {
  // validate args
  if (!window && !compressTarget) {
    throw new Error(strings.errors.missingArgs);
  }
  if (!compressTarget) {
    throw new Error(strings.errors.missingCompressTargetArg);
  }
  if (!window) {
    throw new Error(strings.errors.missingWindowArg);
  }
  if (!(typeof compressTarget === 'string' || compressTarget.constructor === Uint8Array)) {
    throw new Error(strings.errors.invalidArg);
  }
  // create canvas and context
  const canvas = window.document.createElement('canvas');
  const context = canvas.getContext('2d');
  // read file using file reader
  const fileReader = new window.FileReader();
  fileReader.onload = () => {
    // turn array buffer into typed array
    const typedArray = new Uint8Array(this.result);
    // load the pdf
    pdfjs.getDocument(typedArray).then((pdf) => {
      // iterate through pages
      [...Array(pdf.numPages).keys()].forEach((i) => {
        pdf.getPage(i).then((page) => {
          const viewport = page.getViewport(1.0);
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          page.render({
            canvasContext: context,
            viewport,
          }).then(() => {
            console.log('Done rendering page');
            console.log(canvas.toDataURL('image/jpeg', 1.0));
          });
        });
      });
    });
    // initiate file reading
    fileReader.readAsArrayBuffer(compressTarget);
  };
};

export { compress, strings };

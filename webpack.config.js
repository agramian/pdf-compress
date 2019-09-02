const path = require('path');
const { env } = require('yargs').argv;
const pkg = require('./package.json');

const libraryName = pkg.name;

let outputFile;
let mode;

if (env === 'build') {
  mode = 'production';
  outputFile = `${libraryName}.min.js`;
} else {
  mode = 'development';
  outputFile = `${libraryName}.js`;
}

const config = {
  mode,
  entry: `${__dirname}/src/index.js`,
  devtool: 'source-map',
  output: {
    path: `${__dirname}/lib`,
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: "(typeof window !== 'undefined' ? window : this)"
  },
  externals: {
    'pdfjs-dist': {
      commonjs: 'pdfjs-dist',
      commonjs2: 'pdfjs-dist',
      amd: 'pdfjs-dist',
      root: 'pdfjs-dist'
    }
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  }
};

module.exports = config;

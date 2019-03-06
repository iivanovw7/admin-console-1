const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  // Inform webpack that we're building a bundle
  // for Node.js, rather than for the browser
  target: 'node',

  // Tell webpack the root file of our server application
  entry: './src/index.ts',

  devtool: 'inline-source-map',

  // Tell webpack where to put output file that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  // Telling webpack not to include any library into the bundle
  // if this library from /node_modules/ folder
  externals: [webpackNodeExternals()],

  resolve: {
    extensions: ['.js', '.ts']
  },

  // Tell webpack to run babel on every file it runs through
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            ['env', { targets: { browsers: ['last 2 versions'] } }]
          ],
          plugins: [
            ['transform-runtime', {
              'regenerator': true
            }]
          ]
        }
      }
    ]
  }
};

module.exports = config;
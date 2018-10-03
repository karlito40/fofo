const path = require('path');

const baseConfig = {
  devtool: 'inline-source-map',
  entry: {
    contentScript: './src/content-script/index.js',
    background: './src/background/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    }]
  }
};

const scriptsConfig = Object.assign({}, baseConfig, {
  name: 'ScriptsConfig',
  entry: {
    contentScript: './src/content-script/index.js',
    background: './src/background/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
});

const popupConfig = Object.assign({}, baseConfig,{
  name: 'PopupConfig',
  entry: {
    popup: './src/popup/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist/public')
  },
});

// Return Array of Configurations
module.exports = [
  scriptsConfig, popupConfig,       
];

// module.exports = {
//   devtool: 'inline-source-map',
//   entry: {
//     contentScript: './src/content-script/index.js',
//     background: './src/background/index.js',
//     popup: './src/popup/index.js',
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist')
//   },
//   module: {
//     rules: [{
//       test: /\.js?$/,
//       exclude: /node_modules/,
//       use: {
//         loader: 'babel-loader',
//         options: {
//           cacheDirectory: true
//         }
//       }
//     }]
//   }
// };
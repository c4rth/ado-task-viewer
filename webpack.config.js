const path = require("path");

module.exports = {
  mode: "development",
  target: 'webworker',
  entry: path.join(__dirname, 'app', 'index.tsx'),
  output: {
    filename: 'bundle.js',
    // filename: '[name].js',
    path: path.resolve(__dirname, 'out', 'app'),
    hashFunction: "xxhash64", // node 17 & webpack 5
  },
  externals: {
    vscode: 'commonjs vscode'
    // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
    // modules added here also need to be added in the .vsceignore file
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  /*
  optimization: {
    splitChunks: {
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/]((react).*)[\\/]/,
          name: "react",
          chunks: "all"
        },
        fluentui: {
          test: /[\\/]node_modules[\\/]((@fluentui).*)[\\/]/,
          name: "fluentui",
          chunks: "all"
        },
        commons: {
          test: /[\\/]node_modules[\\/]((?!(react|@fluentui)).*)[\\/]/,
          name: "commons",
          chunks: "all"
        }
      }
    }
  },
  */
  performance: {
    hints: 'warning'
  },
};
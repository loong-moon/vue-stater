const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'stater.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'stater',
    libraryTarget: 'umd', // 将你的 library 暴露为所有的模块定义下都可运行的方式
  },
  mode: "development", // development, production
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
}
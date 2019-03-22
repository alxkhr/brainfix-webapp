const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.vue', '.ts', '.js', '.css'],
  },
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new VueLoaderPlugin(), new CleanWebpackPlugin(), new CopyWebpackPlugin(['res/html'])],
  devServer: {
    contentBase: 'res/html',
    historyApiFallback: {
      index: 'index.html',
    },
  },
};

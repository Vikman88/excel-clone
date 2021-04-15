const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const loader = require('sass-loader');

const getPath = (fileName) => path.resolve(__dirname, fileName);
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
const fileName = (ext) => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`);
const jsLoader = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  ];

  if (isDev) {
    loaders.push('eslint-loader');
  }

  return loaders;
};

module.exports = {
  context: getPath('src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: fileName('js'),
    path: getPath('dist'),
  },
  devServer: {
    port: 3000,
    hot: isDev,
  },
  devtool: isDev ? 'source-map' : false,
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': getPath('src'),
      '@core': getPath('src/core'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin({
      patterns: [{ from: getPath('src/favicon.ico'), to: getPath('dist') }],
    }),
    new MiniCssExtractPlugin({
      filename: fileName('css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoader(),
      },
    ],
  },
};

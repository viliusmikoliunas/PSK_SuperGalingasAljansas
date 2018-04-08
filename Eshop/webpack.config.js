const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const appDir = path.resolve(__dirname, 'app/');
const buildDir = path.resolve(__dirname, 'wwwroot/dist/');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin(
  {
    template: path.resolve(appDir, 'index.html'),
    hash: true,
    filename: 'index.html',
    inject: 'body'
  }
);

module.exports = {
  entry: {
    main: path.resolve(appDir,'index.jsx')
  },
  output: {
    filename: 'bundle.js',
    path: buildDir,
    publicPath: '/dist/'
  },
  mode: 'development',
  plugins: [HTMLWebpackPluginConfig],
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: buildDir,
    hot: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: appDir,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
          plugins: [
            'react-hot-loader/babel',
            'babel-plugin-transform-class-properties',
            'babel-plugin-transform-object-rest-spread'
          ]
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [{
          loader: 'eslint-loader',
          query: {
            configFile: './.eslintrc'
          }
        }]
      },
      {
        test: /\.(png|jpg|)$/,
        loader: 'url-loader?limit=200000'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};

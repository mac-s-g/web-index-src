const path = require('path');
const webpack = require('webpack');
const wds_port = 3001;

const PATHS = {
    src: path.join(__dirname, 'src'),
    js: path.join(__dirname, 'src/js'),
    style: path.join(__dirname, 'src/style'),
    images: path.join(__dirname, 'src/style/images'),
    build: path.join(__dirname, 'dist'),
};

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

//web app entrypoint
const entrypoint = PATHS.js + '/entry.js';

const config = {
  entry: [entrypoint],
  externals: {},
  devServer: {
    host: '0.0.0.0',
    port: wds_port,
    hot: true,
    inline: true,
    historyApiFallback: true,
    contentBase: PATHS.build
  },
  output: {
    path: PATHS.build,
    filename: 'main.js',
    library: 'macReact',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: [".js", ".json", ".css", ".scss"]
  },
  devtool: process.env.NODE_ENV == 'production' ? false : 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        include: [PATHS.js]
      },
      {
        test: /\.s?css$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      },
      {
        test: /favicon\.ico$/,
        loader: 'url-loader?limit=0',
        include: PATHS.images
      }
    ]
  }
};

module.exports = config;

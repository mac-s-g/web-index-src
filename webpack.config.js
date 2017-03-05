const path = require('path');
const webpack = require('webpack');
const wds_port = 2000;
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PATHS = {
    src: path.join(__dirname, 'src'),
    js: path.join(__dirname, 'src/js'),
    style: path.join(__dirname, 'src/style'),
    scss: path.join(__dirname, 'src/style/scss'),
    images: path.join(__dirname, 'src/style/images'),
    build_index: path.join(__dirname, 'build'),
    build_assets: path.join(__dirname, 'build/assets'),
    images: path.join(__dirname, 'src/style/images')
};

const config = {
  entry: [
    // activate HMR for React
    'react-hot-loader/patch',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack-dev-server/client?http://localhost:' + wds_port,
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',
    // the entry point of our app
    PATHS.js + '/entry.js',
  ],
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  devServer: {
    host: '0.0.0.0',
    port: wds_port,
    hot: true,
    inline: true,
    historyApiFallback: true,
    contentBase: PATHS.build_index,
    publicPath: '/assets/'
  },
  output: {
      path: PATHS.build_assets,
      filename: 'main.bundle.js',
      publicPath: '/assets/'
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    // new ExtractTextPlugin(PATHS.style + '/scss/extractStyle.css')
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: path.join(__dirname, './'),
        postcss () {
          return [
            require('postcss-import')({
              root: __dirname,
              path: PATHS.js
            }),
            require('postcss-mixins')(),
            require('postcss-each')(),
            require('postcss-cssnext')(),
            require('postcss-reporter')({
              clearMessages: true
            })
          ];
        },
        sassLoader: {
          data: '@import "' + PATHS.scss + '/_theme.scss";' 
        }
      }
    }),
  ],
  resolve: {
    extensions: [".js", ".json", ".css", ".scss"]
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'babel-preset-es2015',
                'babel-preset-react',
                'babel-preset-stage-0'
              ].map(require.resolve),
              plugins: [
                'transform-class-properties',
                'transform-decorators-legacy',
                'react-html-attrs',
                'transform-function-bind'
              ]
            }
          }
        ],
        include: PATHS.js
      },
      {
        test: /\.s?css(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: PATHS.scss + '/global',
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              minimize: true,
              importLoaders: 1,
              localIdentName: "[name]--[local]--[hash:base64:8]"
            }
          },
          "sass-loader",
          "postcss-loader"
        ]
      },
      {
        test: /app\-globals\.scss(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        include: PATHS.scss + '/global',
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ]
      },
      { 
        test: /\.swf$/, 
        loader: "file-loader" 
      },
      { 
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      { 
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "file-loader" 
      },
      {
        test: /\.(jpg|png|ico)$/,
        loader: 'url-loader?limit=25000',
        include: PATHS.images
      }
    ]
  }
};

module.exports = config;

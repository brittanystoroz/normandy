var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,

  entry: ['./normandy/control/static/control/js/index.js', './normandy/control/static/control/admin/sass/control.scss'], // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs

  output: {
      path: path.resolve('./assets/bundles/'),
      filename: "control-[hash].js",
  },

  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
    new ExtractTextPlugin("[name].css"),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],

  module: {
    loaders: [
      { test: /(\.|\/)(jsx|js)$/, loader: 'babel',
        'query': {
          presets: ['es2015', 'react'],
          plugins: ['transform-es2015-destructuring']
        }
      },
      { test: /\.scss$/,
        loaders: ['style','css','sass']
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader'
      }
    ],
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx'],
    alias: {
      react: path.resolve('./node_modules/react'),
      $: path.resolve('./node_modules/jquery/dist'),
    },
  },
}

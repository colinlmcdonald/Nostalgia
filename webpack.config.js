var path = require('path')
var webpack =require('webpack')

module.exports = {

  devtool: 'eval', 
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080', 
    './src/index.js' 
  ],
  output: {
    path: path.join(__dirname, 'public', 'build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        },
        exclude: '/node_modules'
      },
      //This converts our .css into JS
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.jpg$/, 
        loader: 'url-loader?limit=8192' 
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};
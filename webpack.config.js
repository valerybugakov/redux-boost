const path = require('path')
const webpack = require('webpack')

const { NODE_ENV } = process.env
const production = NODE_ENV === 'production'

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `redux-boost{production ? '.min' : ''}.js`,
    library: 'ReduxBoost',
    libraryTarget: 'umd',
  },
  mode: production ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
  ],
  externals: {
    react: 'react',
    redux: 'redux',
    reselect: 'reselect',
  },
}

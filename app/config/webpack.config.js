const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const EnvironmentPlugin = require('webpack').EnvironmentPlugin

const ROOT = path.join(__dirname, '../../')

const PATHS = {
  app: path.join(ROOT, 'app'),
  build: path.join(ROOT, 'docs')
}

module.exports = (env = {}) => {

  console.log('ENV:', env);
  
  const common =  {
    entry: { // looks for entry filenames
      app: PATHS.app, // scan the content for import and require
    },
    output: { // bundles everthing to the output.path dir
      path: PATHS.build, // naming it with output.filename
      filename: '[name].bundle.js' // [name] replaced with entry object key
    },

    plugins: [
      new HtmlPlugin({
        template: path.join(PATHS.app, 'index.html'),
        hash: env.prod ? true : false
      }),

      new ExtractTextPlugin('[name].css'),

      new EnvironmentPlugin({
        NODE_ENV: env.prod ? 'production' : 'development',
        REDIRECT_URI: env.prod ? 'https://epoch.github.io/meup/index.html' : 'http://localhost:8080',
        CLIENT_ID: env.prod ? 'naq8hg8v8kr2gds5tqj3k63f3u' : 'pr6g9lev3fbdbbioha0l15ntff'
      })
    ],

    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader']
          })
        },
        {
          test: /\.(png|gif|jpg)$/,
          loader: 'url-loader',
          options: { limit: '25000' }
        },
        {
          test: /\.(ttf|eot|svg)$/,
          loader: 'file-loader'
        }
      ]
    }
  }
    
  const dev = {
    devtool: 'cheap-module-source-map',
    devServer: {
      port: 8080,
      stats: 'errors-only'   
    }
  }

  if (env.dev)
    return Object.assign({}, common, dev)
  else
    return Object.assign({}, common)

} // end function

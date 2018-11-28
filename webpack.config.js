const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
	mode: isDev ? 'development' : 'production',
	entry: [
		'@babel/polyfill', // enables async-await
		'./client/index.js' // app injection point here
	],
	  optimization: {
	    minimizer: [
	      new UglifyJsPlugin({
	        cache: true,
	        parallel: true,
	        sourceMap: true // set to true if you want JS source maps
	      }),
	      new OptimizeCSSAssetsPlugin({})
	    ]
	  },
	output: {
		path: __dirname,
		// filename: 'public/bundle.js' // app ejection point here (all bundled up!)
		filename: 'output/[name].[contenthash].js' // app ejection point here (all bundled up!)
	},
	  plugins: [
	    new CleanWebpackPlugin(['dist'])
	],
	stats: 'errors-only', //minimizes logging of webpack
	resolve: {
		extensions: ['.js', '.jsx']
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: { loader: 'babel-loader', options: { minified: true } }
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					'postcss-loader'
				]
			}
		]
	}
}

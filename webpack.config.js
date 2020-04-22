const path = require('path');
const HWP = require('html-webpack-plugin');
module.exports = {
	entry: path.join(__dirname, '/src/index.js'),
	output: {
		filename: 'build.js',
		path: path.join(__dirname, '/dist')
	},
	devServer: {
		hot: true,
		contentBase: __dirname,
		publicPath: "/",
		watchContentBase: true,
		disableHostCheck: true,
		historyApiFallback: true,
		port: 4100
	},
	module:{
		rules:[{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		},
		{
			test: /\.scss$/,
			  use: [
				// Creates `style` nodes from JS strings
				'style-loader',
				// Translates CSS into CommonJS
				'css-loader',
				// Compiles Sass to CSS
				'sass-loader',
			  ]
		},
		{ test: /\.css$/, loader: "style-loader!css-loader" }
	]
	},
	plugins:[
		new HWP(
			{template: path.join(__dirname,'/public/index.html')}
		)
	]
}
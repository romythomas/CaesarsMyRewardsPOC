const path = require('path');
const HWP = require('html-webpack-plugin');
const { InjectManifest } = require("workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = {
	entry: path.join(__dirname, '/src/index.js'),
	output: {
		filename: 'build.js',
    path: path.join(__dirname, '/dist'),
    publicPath: '/'
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
			loader: 'babel-loader',
			options: {
                presets: [
                  ['@babel/preset-env', {
                    debug: true,
					useBuiltIns: 'usage',
					"corejs": 3
                  }],
                ],
                plugins: [
                   '@babel/plugin-proposal-object-rest-spread',
                   '@babel/plugin-transform-spread'
                ]
              }
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
		{ test: /\.css$/, 
			loader: "style-loader!css-loader" 
		},
		{
			test: /\.(png|svg|jpg|gif)$/,
			use: [
			'file-loader',
			],
		},
		{
		test: /\.(woff|woff2|eot|ttf|otf)$/,
		use: [
			'file-loader',
		],
		}
	]
	},
	plugins:[
		new HWP({template: path.join(__dirname,'src/index.html')}),
		new WebpackPwaManifest({
			name: "Caesars Progressive Web App",
			orientation: "portrait",
			display: "standalone",
			filename: "manifest.json",
			start_url: "./pwa",
			short_name: "CaesarsPWA",
			description: "A standalone demo PWA!",
			background_color: "#2c2c2c",
			theme_color: "#2c2c2c",
			icons: [
			  {
				"src": "./src/icons/icon.png",
				"sizes": "144x144 64x64 32x32 24x24 16x16",
				"type": "image/png"
				
			  }
			]
			
		  }),

		new InjectManifest({
			swSrc: "./src/src-sw.js",
			swDest: "sw.js",
			exclude: [/test.*/]
		  })
	]
}
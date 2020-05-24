const path = require("path");
const HWP = require("html-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const webpack = require("webpack");

module.exports = {
    entry: path.join(__dirname, "/src/index.js"),
    output: {
        filename: "bundle.[hash].js",
        chunkFilename: "[name].chunk.js",
        path: path.join(__dirname, "/dist"),
        publicPath: "/"
    },
    node: {
        fs: "empty",
        net: "empty",
        tls: "empty"
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
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                debug: true,
                                useBuiltIns: "usage",
                                corejs: 3
                            }
                        ]
                    ],
                    plugins: ["@babel/plugin-proposal-object-rest-spread", "@babel/plugin-transform-spread"]
                }
            },
            {
                test: /\.scss$/,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader"
                ]
            },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[hash].[ext]",
                            outputPath: "fonts/"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HWP({ template: path.join(__dirname, "src/index.html") }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb/),
        new WebpackPwaManifest({
            name: "Caesars Progressive Web App",
            orientation: "portrait",
            display: "standalone",
            filename: "manifest.json",
            start_url: "./",
            short_name: "CaesarsPWA",
            description: "A standalone demo PWA!",
            background_color: "#2c2c2c",
            theme_color: "#2c2c2c",
            icons: [
                {
                    src: "./src/icons/icon-72x72.png",
                    sizes: "72x72",
                    type: "image/png"
                },
                {
                    src: "./src/icons/icon-96x96.png",
                    sizes: "96x96",
                    type: "image/png"
                },
                {
                    src: "./src/icons/icon-128x128.png",
                    sizes: "128x128",
                    type: "image/png"
                },
                {
                    src: "./src/icons/icon-144x144.png",
                    sizes: "144x144",
                    type: "image/png"
                },
                {
                    src: "./src/icons/icon-152x152.png",
                    sizes: "152x152",
                    type: "image/png"
                },
                {
                    src: "./src/icons/icon-192x192.png",
                    sizes: "192x192",
                    type: "image/png"
                },
                {
                    src: "./src/icons/icon-384x384.png",
                    sizes: "384x384",
                    type: "image/png"
                },
                {
                    src: "./src/icons/icon-512x512.png",
                    sizes: "512x512",
                    type: "image/png"
                }
            ]
        }),
        new InjectManifest({
            swSrc: "./src/src-sw.js",
            swDest: "src.sw.js",
            exclude: [/test.*/]
        })
    ]
};

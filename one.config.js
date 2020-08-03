const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const HtmlWebpackSkipAssetsPlugin = require('html-webpack-skip-assets-plugin').HtmlWebpackSkipAssetsPlugin;

module.exports = {
    entry: {
        index_bundle: ['babel-polyfill',
        './src/global.js',
        './src/libs/onefile.js',
        './src/populatesheet.js',
        './src/index.js',
        ],
        fontawesome: './src/libs/fontawesome.js'
    },
    performance: {
        hints: false
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserJSPlugin({
                test: /\.js(\?.*)?$/i,
                terserOptions: {
                    module: true
                }
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                }
            })
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'distOne'),
    },
    module: {
        rules: [
            { test: /\.(js)$/, exclude: /node_modules/, use: ['babel-loader'] },
            { test: /\.handlebars$/, loader: "handlebars-loader?helperDirs[]=" + __dirname + "/src/handlebars/helpers" },
            { test: /\.(otf|jpg)$/, use: { loader: 'url-loader' }},
            { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
            { test: /\.hbs$/, loader: "handlebars-loader"}
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    plugins: [
        new MiniCssExtractPlugin(),

        new HtmlWebpackPlugin({
            inlineSource: '.(js|css)$',
            excludeAssets: ['fontawesome.js'],
            title: "5E Sheet",
            template: "./src/handlebars/index.hbs",
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: false,
                removeScriptTypeAttributes: false,
                removeStyleLinkTypeAttributes: false,
                useShortDoctype: true
            }
        }),

        new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),

        new HtmlWebpackSkipAssetsPlugin(),

        new FileManagerPlugin({
            onEnd: [
                {
                    copy: [
                        { source: path.resolve(__dirname, 'distOne', 'index.html'), destination: path.resolve(__dirname, 'index.html') }
                    ]
                }
            ]
        })
    ]
};
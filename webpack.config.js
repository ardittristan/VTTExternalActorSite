const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
    entry: {
        index: ['babel-polyfill', './src/index.js'],
        populatesheet: './src/populatesheet.js',
        fontawesome: './src/libs/fontawesome.js',
        global: './src/global.js'
    },
    performance: {
        hints: false
    },
    optimization: {
        minimize: false,     // disable when done
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
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            { test: /\.(js)$/, exclude: /node_modules/, use: ['babel-loader'] },
            { test: /\.handlebars$/, loader: "handlebars-loader?helperDirs[]=" + __dirname + "/src/handlebars/helpers" },
            { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'] }
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    plugins: [
        new MiniCssExtractPlugin(),

        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src', 'fonts'), to: path.resolve(__dirname, 'dist', 'fonts') }
            ]
        }),

        new FileManagerPlugin({
            onEnd: [
                {
                    mkdir: [
                        path.resolve(__dirname, 'dist', 'libs')
                    ]
                },
                {
                    move: [
                        { source: path.resolve(__dirname, 'dist', 'fontawesome.js'), destination: path.resolve(__dirname, 'dist', 'libs', 'fontawesome.js') }
                    ]
                }
            ]
        })
    ]
};
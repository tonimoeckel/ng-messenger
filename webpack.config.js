"use strict";
var webpack = require('webpack');
var path = require('path');
var IS_PROD = process.argv.indexOf('-p') > -1;
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css"
});
exports.__esModule = true;
exports["default"] = {
    devtool: IS_PROD ? 'source-map' : 'eval',
    entry: path.join(__dirname, 'demo', 'entry.ts'),
    output: {
        filename: 'demo.js',
        path: IS_PROD ? path.join(__dirname, 'demo') : __dirname
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: 'tslint-loader?emitErrors=false&failOnHint=false',
                exclude: /node_modules/,
                enforce: 'pre'
            }, {
                test: /\.tsx?$/,
                loaders: ['ts-loader', 'angular2-template-loader'],
                exclude: /node_modules/
            }, {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: /node_modules/
            }, {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ['raw-loader', 'sass-loader'] // sass-loader not scss-loader
            }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devServer: {
        port: 8000,
        inline: true,
        hot: true,
        historyApiFallback: true,
        contentBase: 'demo'
    },
    plugins: (IS_PROD ? [] : [new webpack.HotModuleReplacementPlugin()]).concat([
        new webpack.DefinePlugin({
            ENV: JSON.stringify(IS_PROD ? 'production' : 'development')
        }),
        new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/, path.join(__dirname, 'src')),
        extractSass
    ]),
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};
//# sourceMappingURL=webpack.config.js.map
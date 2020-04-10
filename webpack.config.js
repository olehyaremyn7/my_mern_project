const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
       main: ['@babel/polyfill','./client/src/index.js','./app.js'],
        auth: './routes/auth.routes.js',
        link: './routes/link.routes.js',
        redirect: './routes/redirect.routes.js',
        middleware: './routes/auth.middleware.js'
    },
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:8080/dist'
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './client/public/index.html'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
                options: {
                    presets: ['@babel/preset-react']
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    devServer: {
        port: 3000
    }
};
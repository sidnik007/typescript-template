const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx', // make sure this points to your entry file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                use: ['file-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'], // add .tsx and .ts here
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // adjust this path if necessary
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        hot: true,
    },
};

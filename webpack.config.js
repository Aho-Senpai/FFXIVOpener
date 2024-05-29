const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    mode: "none",
    entry: "./scripts/main.ts",
    output: {
        filename: "main.js",
        path: __dirname,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "html/index.html",
            template: "./index.html",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        "projectReferences": true
                    },
                },
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devServer: {
        static: "./"
    }
};
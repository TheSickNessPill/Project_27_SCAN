const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "/src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js",
        publicPath: "/"
    },
    cache: false,
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: ["url-loader?limit=10000", "img-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({ template: "./src/index.html" })
    ]
}
const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist/js'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            { test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    }
}

// const path = require("path");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const glob = require("glob");
//
// module.exports = {
//     entry: {
//         "bundle.js": glob.sync("build/static/?(js|css)/main.*.?(js|css)").map(f => path.resolve(__dirname, f)),
//     },
//     output: {
//         filename: "build/static/js/bundle.min.js",
//     },
//     mode: 'development',
//     optimization: {
//         minimize: false
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.css$/,
//                 use: ["style-loader", "css-loader"],
//             },
//         ],
//     },
//     // plugins: [new UglifyJsPlugin()],
// }
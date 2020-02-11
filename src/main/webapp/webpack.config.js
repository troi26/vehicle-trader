const path = require('path');
// const SRC = path.resolve(__dirname, 'src/main/js');

const SRC = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist/js'),
        filename: 'index_bundle.js'
    },
    // resolve: {
    //     modules: [path.join(__dirname, "node_modules")]
    // },
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
            }, {
             test: /\.(ttf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // include: SRC,
                use: [{
                    loader: 'file-loader'
                }]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                            disable: true,
                            // includePaths: ['./node_modules']
                        },
                    },
            ]}, {
                test: /\.mp3$/,
                include: SRC,
                loader: 'file-loader'
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
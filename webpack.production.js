var path = require("path");
var webpack = require("webpack");
const sassLoaders = [
'style-loader',
  'css-loader',
  'postcss-loader',
  'sass-loader?sourceMap?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, '')
];
module.exports = {
    entry :  {
        bundle : ['./src/index.js']
    },
    output: {
        filename: '[name].js', //this is the default name, so you can skip it
        //at this directory our bundle file will be available
        //make sure port 8090 is used when launching webpack-dev-server
        path: path.join(__dirname, "lib/")
    },
    module: {
        loaders: [
            {
                //tell webpack to use jsx-loader for all *.jsx files
                test: /.jsx?$/,
                loaders: ['babel'],
                include: [path.resolve(__dirname, "src")]
            }, {
                test: /\.scss$/,
                loader: sassLoaders.join("!")

            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
    
  ]

}
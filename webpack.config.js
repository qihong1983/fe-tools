let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let htmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var path = require("path");

var rootdir = __dirname;
// console.log(path.resolve(__dirname, './common/libs/jquery/jquery-1.11.1.min.js'));
module.exports = {
    devtool: '#source-map',
    entry: {
        build: "./src/demo.js",
    },
    output: {
        path: "./build/",
        filename: "[name].js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    watch: true,
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            }),
            exclude: "./node_modules/"
        }, 
        // {
        //     test: /\.js$/,
        //     exclude: "/node_modules/",
        //     loader: 'babel',//在webpack的module部分的loaders里进行配置即可
        //     query: {
        //       presets: ['es2015','react']
        //     },
        //     include: path.resolve(__dirname, "src")
        // },
        {
            test: /\.js?$/,
            loaders: ['babel-loader?presets[]=es2015&presets[]=react'],
        
            exclude: "./node_modules/",
            include: path.resolve(__dirname, "src")
        }, 
        {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192' //  <= 8kb的图片base64内联
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&minetype=application/font-woff'
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10&minetype=application/font-woff'
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10&minetype=application/octet-stream'
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader'
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10&minetype=image/svg+xml'
        }]
    },
    devServer: {

    },
    resolve: {
        alias: {
            // 'jquery': path.resolve(rootdir, './src/common/libs/jquery/jquery-1.11.1.min.js')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
        }), 
        new ExtractTextPlugin("styles.css"),
        new CopyWebpackPlugin([{
            from: __dirname + '/src'
        }]),
        new htmlWebpackPlugin({
            title: "demo",
            filename: "demo.html",
            template: "templates/demo.html",
            hash: true, // true | false。如果是true，会给所有包含的script和css添加一个唯一的webpack编译hash值。这对于缓存清除非常有用。
            inject: false,
            chunks: ["build"]
        }),
        new CommonsChunkPlugin("libs")
    ]
}

'use strict';
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const vueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const webpack = require('webpack');

module.exports = {
    //入口
    entry:{
        main:'./src/main.js',
        // vendors:['vue','axios','vue-router','vue-picture-preview','moment']
    },

    output:{
        //所有产出资源路径
        path:path.join(__dirname,'dist'),
        filename:'js/build.js'
    },

    module:{
        rules:[
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:/node_modules/,
                options:{
                    presets:['es2015'],
                    plugins:['transform-runtime']
                }
            },
            {
                test:/\.css$/,
                // loaders:'style-loader!css-loader!postcss-loader'
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','postcss-loader']
                })
                // use:['style-loader','css-loader','postcss-loader']

            },
            {
                test:/\.less$/,
                loader:"style-loader!css-loader!postcss-loader!less-loader"
            },
            {
                test:/\.(jpg|png|svg|ttf|woff|woff2|gif)$/,
                loader:'url-loader',
                options:{
                    limit:4096,
                    name:'assets/[name].[ext]'
                }
            },
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },

            //解析vue-preview的es6代码
            {
                test:/vue-preview.src.*?js$/,
                loader:'babel-loader',
                exclude: /node_modules/,
                options:{
                    presets:['es2015'],
                    plugins:['transform-runtime']
                }
            }
        ]
    },
    plugins:[
        new UglifyJSPlugin(),
        new htmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new vueLoaderPlugin(),
        new ExtractTextPlugin("css/style.css"),
        // new webpack.optimize.SplitChunksPlugin({
        //     commons: {
        //         name: "vendors",
        //         chunks: "initial",
        //         minChunks: Infinity
        //     }
        // }),
        // new webpack.optimize.RuntimeChunkPlugin({
        //     name: "manifest"
        // })
    ],
};
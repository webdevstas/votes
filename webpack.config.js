const path = require('path')
// eslint-disable-next-line node/no-unpublished-require
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname),
    mode: 'development',
    entry: {
        'index': "@babel/polyfill",
        'newVote': '/src/newVote.js',
        'voteProcess': '/src/voteProcess.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/js/'),
    },
    optimization: {
        minimizer:[
            new TerserWebpackPlugin()
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: '/node_modules/',
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env'
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties'
                    ]
                }
            }
        ]
    }
}

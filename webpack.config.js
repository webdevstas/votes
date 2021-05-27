const path = require('path')
// eslint-disable-next-line node/no-unpublished-require
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname),
    mode: 'development',
    entry: ['@babel/polyfill', '/src/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/js'),
        publicPath: ''
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

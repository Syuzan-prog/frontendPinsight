const dotenv = require('dotenv').config(); // eslint-disable-line no-unused-vars
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, '../src/index.jsx'),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                auto: (filePath) => ![
                                    'resources',
                                    'node_modules',
                                ].some((globalPath) => filePath.includes(globalPath)),
                                localIdentName: '[name]_[local]_[hash:6]',
                            },
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ['postcss-preset-env', {
                                        browsers: 'last 2 versions',
                                    }],
                                    ['autoprefixer', {
                                        grid: true,
                                    }],
                                ],
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
                exclude: /avatars/,
            },
            {
                test: /avatars\/\d+.png$/i,
                type: 'asset/inline',
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
        new webpack.DefinePlugin({
            APP_API_URL: JSON.stringify(process.env.APP_API_URL),
        }),
        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                    ['pngquant', {
                        quality: [0.65, 0.9],
                        speed: 4,
                    }],
                    ['svgo', {}],
                ],
            },
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'public/static',
                    to: 'static',
                },
            ],
        }),
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx', '.scss'],
        modules: [
            path.resolve(__dirname, '../src'),
            'node_modules',
        ],
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[contenthash].bundle.js',
        chunkFilename: '[name].[contenthash].bundle.js',
        publicPath: '/',
    },
};

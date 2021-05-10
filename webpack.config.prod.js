const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    target: 'web',
    context: __dirname,
    mode: 'production',
    entry: './src/index.tsx',
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, './dist/'),
        filename: 'scripts/[name].[contenthash:8].js',
        chunkFilename: 'scripts/[name].[contenthash:8].chunk.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.less']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[contenthash:base64:11]',
                            },
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: path.resolve(__dirname, 'postcss.config.js'),
                            }
                        },
                    },
                    'less-loader',
                ],
            },
            {
                test: /\.png$|\.gif$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    outputPath: 'assets/images/',
                    publicPath: 'assets/images/',
                }
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash:8].css',
            chunkFilename: 'styles/[id].[contenthash:8].css',
        }),
    ],
    stats: {
        colors: true,
        logging: 'error'
    },
    devtool: undefined,
    devServer: {
        contentBase: 'dist/',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        minimize: true,
        // 去除 license.txt
        minimizer: [
            // 去除 license.txt
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
                extractComments: false,
            })
        ],
    },
}


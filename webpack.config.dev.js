const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    target: 'web',
    mode: 'development',
    context: __dirname,
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
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[path][name]-[local]',
                            },
                            importLoaders: 2,
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
    devtool: 'source-map',
    devServer: {
        contentBase: 'dist/',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 2000
        },
    },
}


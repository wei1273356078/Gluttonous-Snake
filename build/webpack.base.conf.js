const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path');


module.exports = {
    entry: path.resolve(__dirname, '../src/index.ts'),
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../dist'),
        // 配置环境，兼容旧版浏览器
        environment: {
            // 告诉webpack，不使用箭头函数
            arrowFunction: false,
            // 告诉webpack，不适用const
            const: false,
        }
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'   // 加载babel配置（就是.babelrc文件）
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    // 加载babel配置（就是.babelrc文件）
                    // 'babel-loader',
                    'ts-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '../dist')
        },
        host: 'localhost',
        port: 8088,
        hot: true,
        client: {
            logging: 'none',
            progress: true,
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/index.html'),
            title: 'gluttonousSnake'
        })
    ],
    devtool: 'inline-source-map',
    mode: 'development',
    stats: 'errors-only'   // 控制终端打印的
}
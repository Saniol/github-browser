const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',

    entry: {
        app: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle-[name].js',
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },

    devServer: {
        publicPath: '/dist',
        compress: true,
        port: 8080,
    },
};

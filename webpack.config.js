module.exports = {
    entry: ['./src/main'],
    output: {
        path: require('path').join(__dirname, 'app'),
        filename: 'dist/bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}

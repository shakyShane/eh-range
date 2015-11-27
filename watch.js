const browserSync          = require('browser-sync').create();
const webpack              = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const stripAnsi            = require('strip-ansi');

const webpackConfig   = require('./webpack.config');
webpackConfig.debug   = true;
webpackConfig.devtool = '#eval-source-map';

const bundler         = webpack(webpackConfig);

bundler.plugin('done', function (stats) {
    if (stats.hasErrors() || stats.hasWarnings()) {
        return browserSync.sockets.emit('fullscreen:message', {
            title: 'Webpack Error',
            body: stripAnsi(stats.toString()),
            timeout: 10000
        });
    }
    browserSync.reload();
});

browserSync.init({
    server: './app',
    open: false,
    logFileChanges: false,
    middleware: [
        webpackDevMiddleware(bundler, {
            publicPath: webpackConfig.output.publicPath,
            stats: {colors: true}
        })
    ],
    plugins: ['bs-fullscreen-message'],
    files: [
        'app/css/*.css',
        'app/*.html'
    ]
});

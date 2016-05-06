// Karma configuration
module.exports = function(config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: 'normandy/control/tests/',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'index.js',
            { pattern: 'mock/*.json', watched: true, served: true, included: true },
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'index.js': ['webpack'],
            'normandy/control/static/control/js/components/*.jsx': ['react-jsx'],
        },

        webpack: {
            module: {
                loaders: [
                    {
                        test: /(\.|\/)(jsx|js)$/,
                        exclude: /node_modules/,
                        loader: 'babel',
                        'query': {
                          presets: ['react', 'es2015', 'stage-2']
                        }
                    },
                ],
            },
            devtool: 'inline-source-map',
        },

        webpackServer: {
          quiet: true // Suppress all webpack messages, except errors
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['nyan'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Firefox'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,
    });
};

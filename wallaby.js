var wallabyWebpack = require('wallaby-webpack');
var path = require('path');

var compilerOptions = Object.assign(require('./tsconfig.json').compilerOptions);

compilerOptions.module = 'CommonJs';

module.exports = function(wallaby) {
    var webpackPostprocessor = wallabyWebpack({
        entryPatterns: ['wallabyTest.js', 'apps/**/*spec.js', 'libs/**/*spec.js'],

        module: {
            rules: [
                { test: /\.css$/, loader: ['raw-loader'] },
                { test: /\.html$/, loader: 'raw-loader' },
                {
                    test: /\.ts$/,
                    loader: '@ngtools/webpack',
                    include: /node_modules/,
                    query: { tsConfigPath: 'tsconfig.json' }
                },
                { test: /\.js$/, loader: 'angular2-template-loader', exclude: /node_modules/ },
                { test: /\.styl$/, loaders: ['raw-loader', 'stylus-loader'] },
                {
                    test: /\.less$/,
                    loaders: ['raw-loader', { loader: 'less-loader', options: { paths: [__dirname] } }]
                },
                { test: /\.scss$|\.sass$/, loaders: ['raw-loader', 'sass-loader'] },
                { test: /\.(jpg|png|svg)$/, loader: 'url-loader?limit=128000' }
            ]
        },

        resolve: {
            extensions: ['.js', '.ts'],
            modules: [
                path.join(wallaby.projectCacheDir, 'apps'),
                path.join(wallaby.projectCacheDir, 'libs'),
                'node_modules'
            ],
            alias: {
                '@ng-holistic/ramda': path.join(wallaby.projectCacheDir, 'libs/core/src/lib/r'),
                '@ng-holistic/core': path.join(wallaby.projectCacheDir, 'libs/core/src/lib/index'),
                '@ng-holistic/forms': path.join(wallaby.projectCacheDir, 'libs/forms/src/lib/index'),
                '@ng-holistic/clr-controls': path.join(wallaby.projectCacheDir, 'libs/clr-controls/src/lib/index'),
                '@ng-holistic/clr-forms': path.join(wallaby.projectCacheDir, 'libs/clr-forms/src/lib/index'),
                '@ng-holistic/clr-lists': path.join(wallaby.projectCacheDir, 'libs/clr-lists/src/lib/index'),
                '@ng-holistic/lists': path.join(wallaby.projectCacheDir, 'libs/lists/src/lib/index')
            }
        },
        node: {
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
            dns: 'empty'
        }
    });

    return {
        files: [
            { pattern: 'wallabyTest.ts', load: false },
            { pattern: 'apps/**/*.+(ts|css|less|scss|sass|styl|html|json|svg)', load: false },
            { pattern: 'apps/**/*.d.ts', ignore: true },
            { pattern: 'apps/**/*spec.ts', ignore: true },
            { pattern: 'apps/**/*-e2e/**', ignore: true },
            { pattern: 'libs/**/*.+(ts|css|less|scss|sass|styl|html|json|svg)', load: false },
            { pattern: 'libs/**/*.d.ts', ignore: true },
            { pattern: 'libs/**/*spec.ts', ignore: true },
            { pattern: 'libs/**/*-e2e/**', ignore: true },
            { pattern: 'apps/**/cypress/**', ignore: true },
            { pattern: 'libs/**/cypress/**', ignore: true }
        ],

        tests: [
            { pattern: 'apps/**/*spec.ts', load: false },
            { pattern: 'libs/**/*spec.ts', load: false },
            { pattern: 'apps/**/*-e2e/**', ignore: true },
            { pattern: 'libs/**/*-e2e/**', ignore: true },
            { pattern: 'apps/**/cypress/**', ignore: true },
            { pattern: 'libs/**/cypress/**', ignore: true }
        ],

        testFramework: 'jasmine',

        compilers: {
            '**/*.ts': wallaby.compilers.typeScript(compilerOptions)
        },

        middleware: function(app, express) {
            var path = require('path');
            app.use('/favicon.ico', express.static(path.join(__dirname, 'libs/shared/src/favicon.ico')));
            app.use('/assets', express.static(path.join(__dirname, 'libs/shared/src/assets')));
        },

        env: {
            kind: 'electron'
        },

        postprocessor: webpackPostprocessor,

        setup: function() {
            window.__moduleBundler.loadTests();
        },

        debug: true
    };
};

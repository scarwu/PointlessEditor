'use strict';
/**
 * Gulp Tasks
 *
 * @author      Scar Wu
 * @copyright   Copyright (c) Scar Wu (http://scar.tw)
 */

let gulp = require('gulp');
let del = require('del');
let $ = require('gulp-load-plugins')();
let log = require('fancy-log');
let colors = require('ansi-colors');
let webpack = require('webpack');
let webpackStream = require('webpack-stream');
let webpackConfig = require('./webpack.config.js');
let postfix = (new Date()).getTime().toString();

let ENVIRONMENT = 'development';
let WEBPACK_NEED_WATCH = false;

/**
 * Compile Style & Script
 */
function handleCompileError(event) {
    log.error(colors.red(event.message), 'error.');
}

function compileSass() {
    return gulp.src('src/frontend/styles/main.{sass,scss}')
        .pipe($.sass({
            outputStyle: ('production' === ENVIRONMENT) ? 'compressed' : 'expanded'
        }).on('error', handleCompileError))
        .pipe($.autoprefixer())
        .pipe($.rename(function (path) {
            path.basename = path.basename.split('.')[0];
            path.extname = '.min.css';
        }))
        .pipe(gulp.dest('temp/frontend/styles'));
}

function compileWebpack(callback) {
    if ('production' === ENVIRONMENT) {
        let definePlugin = new webpack.DefinePlugin({
            'process.env': {
                'ENV': "'production'",
                'BUILD_TIME': postfix,
                'NODE_ENV': JSON.stringify('production')
            }
        });

        webpackConfig.mode = ENVIRONMENT;
        webpackConfig.plugins = webpackConfig.plugins || [];
        webpackConfig.plugins.push(definePlugin);
    }

    if (WEBPACK_NEED_WATCH) {
        webpackConfig.watch = true;
    }

    let result = gulp.src('src/frontend/scripts/main.js')
        .pipe(webpackStream(webpackConfig, webpack).on('error', handleCompileError))
        .pipe(gulp.dest('temp/frontend/scripts'));

    if (WEBPACK_NEED_WATCH) {
        callback();
    } else {
        return result;
    }
}

/**
 * Copy Files & Folders
 */
function copyBackend() {
    return gulp.src('src/backend/**/*')
        .pipe(gulp.dest('temp/backend'));
}

function copyFrontendFonts() {
    return gulp.src('src/frontend/fonts/*')
        .pipe(gulp.dest('temp/frontend/fonts'));
}

function copyFrontendImages() {
    return gulp.src('src/frontend/images/**/*')
        .pipe(gulp.dest('temp/frontend/images'));
}

function copyFrontendVendorFonts() {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*.{otf,eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest('temp/frontend/fonts/vendor'));
}

/**
 * Watching Files
 */
function watch() {

    // Watch Files
    gulp.watch('temp/**/*').on('change', $.livereload.changed);
    gulp.watch('src/backend/**/*', copyBackend);
    gulp.watch('src/frontend/fonts/*', copyFrontendFonts);
    gulp.watch('src/frontend/images/**/*', copyFrontendImages);
    gulp.watch('src/frontend/styles/**/*.{sass,scss}', compileSass);

    // Start LiveReload
    $.livereload.listen();
}

/**
 * Release
 */
function releaseCopyAll() {
    return gulp.src('temp/**/*')
        .pipe(gulp.dest('dist'));
}

function releaseReplaceIndex() {
    return gulp.src('dist/backend/index.php')
        .pipe($.replace('$postfix = time()', '$postfix = ' + postfix))
        .pipe(gulp.dest('dist/backend'));
}

/**
 * Set Variables
 */
function setEnv(callback) {

    // Warrning: Change ENVIRONMENT to Prodctuion
    ENVIRONMENT = 'production';

    callback();
}

function setWatch(callback) {

    // Webpack need watch
    WEBPACK_NEED_WATCH = true;

    callback();
}

/**
 * Clean Temp Folders
 */
function cleanTemp() {
    return del('temp');
}

function cleanDist() {
    return del('dist');
}

/**
 * Bundled Tasks
 */
gulp.task('prepare', gulp.series(
    cleanTemp,
    gulp.parallel(copyBackend, copyFrontendFonts, copyFrontendImages, copyFrontendVendorFonts),
    gulp.parallel(compileSass, compileWebpack)
));

gulp.task('release', gulp.series(
    setEnv, cleanDist,
    'prepare',
    releaseCopyAll, releaseReplaceIndex
));

gulp.task('default', gulp.series(
    setWatch,
    'prepare',
    watch
));

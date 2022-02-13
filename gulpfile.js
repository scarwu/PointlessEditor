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
// let webpack = require('webpack');
// let webpackStream = require('webpack-stream');
// let svelteConfig = require('./webpack.config.js');
let postfix = (new Date()).getTime().toString();

let ENVIRONMENT = 'development';
let SVELTE_NEED_WATCH = false;

/**
 * Compile Style & Script
 */
function handleCompileError(event) {
    log.error(colors.red(event.message), 'error.');
}

function compileSass() {
    return gulp.src('src/styles/editor.{sass,scss}')
        .pipe($.sass({
            outputStyle: ('production' === ENVIRONMENT) ? 'compressed' : 'expanded'
        }).on('error', handleCompileError))
        .pipe($.autoprefixer())
        .pipe($.rename(function (path) {
            path.basename = path.basename.split('.')[0];
            path.extname = '.min.css';
        }))
        .pipe(gulp.dest('temp/assets/styles'));
}

function compileSvelte(callback) {
    if ('production' === ENVIRONMENT) {
        // let definePlugin = new webpack.DefinePlugin({
        //     'process.env': {
        //         'ENV': "'production'",
        //         'BUILD_TIME': postfix,
        //         'NODE_ENV': JSON.stringify('production')
        //     }
        // });

        // svelteConfig.mode = ENVIRONMENT;
        // svelteConfig.plugins = svelteConfig.plugins || [];
        // svelteConfig.plugins.push(definePlugin);
    }

    if (SVELTE_NEED_WATCH) {
        // svelteConfig.watch = true;
    }

    let result = gulp.src('src/scripts/editor.js')
        .pipe(webpackStream(svelteConfig, webpack).on('error', handleCompileError))
        .pipe(gulp.dest('temp/scripts'));

    if (SVELTE_NEED_WATCH) {
        callback();
    } else {
        return result;
    }
}

/**
 * Copy Files & Folders
 */
function copyFrontendFonts() {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('temp/fonts'));
}

function copyFrontendImages() {
    return gulp.src('src/images/**/*')
        .pipe(gulp.dest('temp/images'));
}

function copyFrontendVendorFonts() {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*.{otf,eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest('temp/fonts/vendor'));
}

/**
 * Watching Files
 */
function watch() {

    // Watch Files
    gulp.watch('temp/**/*').on('change', $.livereload.changed);
    gulp.watch('src/fonts/*', copyFrontendFonts);
    gulp.watch('src/images/**/*', copyFrontendImages);
    gulp.watch('src/styles/**/*.{sass,scss}', compileSass);

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

/**
 * Set Variables
 */
function setEnv(callback) {
    ENVIRONMENT = 'production';

    callback();
}

function setWatch(callback) {
    SVELTE_NEED_WATCH = true;

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
    gulp.parallel(copyFrontendFonts, copyFrontendImages, copyFrontendVendorFonts),
    gulp.parallel(compileSass, compileSvelte)
));

gulp.task('release', gulp.series(
    setEnv, cleanDist,
    'prepare',
    releaseCopyAll
));

gulp.task('default', gulp.series(
    setWatch,
    'prepare',
    watch
));

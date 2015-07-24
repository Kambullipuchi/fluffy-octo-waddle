(function () {

    'use strict';

    var gulp = require('gulp'),
        uglify = require('gulp-uglify'),
        jshint = require('gulp-jshint'),
        concat = require('gulp-concat'),
        rev = require('gulp-rev'),
        usemin = require('gulp-usemin'),
        connect = require('gulp-connect'),
        watch = require('gulp-watch'),
        rimraf = require('gulp-rimraf'),
        copy = require('gulp-copy'),
        sourcemaps = require('gulp-sourcemaps'),
        del = require('del');

    gulp.task('minification', function () {
        gulp.src('src/index.html')
            .pipe(usemin({
                libraries: [uglify(), rev()],
                javascripts: [sourcemaps.init(), jshint(), jshint.reporter('jshint-stylish'), uglify(), rev(), sourcemaps.write('./')],
                stylesheets: [rev()]
            }))
            .pipe(gulp.dest('build/'));
    });


    gulp.task('connect', function () {
        connect.server({
            root: 'build/',
            port: 12345
        });
    });

    gulp.task('clean', function () {
        del(['build/**/*'], function (err, paths) {
            console.log('\n', paths.join('\n'));
        });
    });



    gulp.task('build', ['minification', 'connect']);

    gulp.task('default', ['build']);

})();
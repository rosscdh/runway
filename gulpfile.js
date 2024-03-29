/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

var gulp = require('gulp');
var wrench = require('wrench');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});



gulp.task('production', function () {
    gulp.start('config:production');
    gulp.start('build');
    //gulp.start('serve');
});

gulp.task('staging', function () {
    gulp.start('config:staging');
    gulp.start('build');
    //gulp.start('serve');
});

gulp.task('dev', function () {
    gulp.start('config:dev');
    gulp.start('build');
    //gulp.start('serve');
});

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
    gulp.start('config:dev');
    gulp.start('build');
    gulp.start('serve');
});
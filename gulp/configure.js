'use strict';

var gulp = require('gulp');
var rename = require("gulp-rename");
var ngConstant = require('gulp-ng-constant');


gulp.task('config:dev', function () {
  gulp.src('./config/dev.json')
    .pipe(rename("env.config.js")) // important rename dev to config
    .pipe(ngConstant({
      name: 'HiveEmpire.config',
    }))
    // Writes config.js to src/app/config.json folder
    .pipe(gulp.dest('src/app'));
});

gulp.task('config:staging', function () {
  gulp.src('./config/environments/staging/staging.json')
    .pipe(rename("env.config.js")) // important rename prod to config
    .pipe(ngConstant({
      name: 'HiveEmpire.config',
    }))
    // Writes config.js to src/app/config.json folder
    .pipe(gulp.dest('src/app'));
});


gulp.task('config:production', function () {
  gulp.src('./config/environments/production/production.json')
    .pipe(rename("env.config.js")) // important rename prod to config
    .pipe(ngConstant({
      name: 'HiveEmpire.config',
    }))
    // Writes config.js to src/app/config.json folder
    .pipe(gulp.dest('src/app'));
});

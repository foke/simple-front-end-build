// Dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');

// Vars
var input = '../style/**/*.scss';
var output = '../style/';

// Tasks
gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(output));
});

gulp.task('watch', function() {
  // Run sass on css changes
  gulp.watch(input, ['sass']).on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });

  // Watch for changes (live reload)
  gulp.watch(['../*.html','../style/**/*.css','../script/**/*.js']).on('change', function(file) {
    gulp.src(file.path).pipe(connect.reload());
  });
});

gulp.task('connect', function() {
  connect.server({
    root: '../',
    port: 8080,
    livereload: true
  });
});

gulp.task('default', ['connect', 'sass', 'watch']);

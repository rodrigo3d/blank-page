'use strict';

var cp = require('child_process');

var browserSync = require('browser-sync');
var del = require('del');
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var header = require('gulp-header');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');

var pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
  ' * RODRIGO3D.COM - <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright ' + (new Date()).getFullYear(), ' <%= pkg.author.name %> - <%= pkg.author.email %>\n',
  ' * Licenciado sob <%= pkg.license %> (https://github.com/rodrigo3d/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  ''
].join('');

var messages = {
  jekyllBuild: '<span style="color: red">Running:</span> $ jekyll build'
};

var jekyllCommand = (/^win/.test(process.platform)) ? 'windows' : 'linux';

// Build the Jekyll Site
if (jekyllCommand === 'windows') {
  gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll.bat', ['build'], { stdio: 'inherit' })
      .on('close', done);
  });
}
if (jekyllCommand === 'linux') {
  gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('bundle', ['exec', 'jekyll build'], { stdio: 'inherit' })
      .on('close', done);
  });
}

// Rebuild Jekyll & do page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

// Wait for jekyll-build, then launch the Server
gulp.task('browser-sync', ['jekyll-build'], function () {
  browserSync.init({
    server: { baseDir: "./_site", directory: false, index: "index.html" }
  });
});

// Gulp task to minify css files
gulp.task('css:theme', function () {
  return gulp.src(['./src/css/**/*.css'])
    .pipe(plumber())
    // .pipe(concat('custom.css'))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest('./_site/assets/css/'))
    .pipe(browserSync.stream())
    .pipe(gulp.dest('./assets/css/'))
    .pipe(plumber.stop());
});

// Gulp task to minify JavaScript files
gulp.task('js:theme', function () {
  return gulp.src(['./src/js/**/*.js', '!./src/js/*.min.js', '!./src/js/analytics.js'])
    .pipe(plumber())
    // .pipe(concat('custom.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest('./_site/assets/js/'))
    .pipe(browserSync.stream())
    .pipe(gulp.dest('./assets/js/'))
    .pipe(plumber.stop());
});

// Gulp task to minify image files
gulp.task('img', function () {
  return gulp.src(['./src/img/**/*.{gif,jpg,jpeg,png,svg,ico}', '!./src/img/**/*.fw.png'])
    .pipe(plumber())
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('./_site/assets/img/'))
    .pipe(browserSync.stream())
    .pipe(gulp.dest('./assets/img/'))
    .pipe(plumber.stop());
});

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function () {

  // Bootstrap
  gulp.src([
    './node_modules/bootstrap/dist/**/*.min.*',
    '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
    '!./node_modules/bootstrap/dist/css/bootstrap-reboot*',
    '!./node_modules/bootstrap/dist/**/*.map'
  ])
    .pipe(gulp.dest('./assets/vendor/bootstrap/'))

  // Font Awesome
  gulp.src([
    './node_modules/font-awesome/**/*.min.*',
    './node_modules/font-awesome/**/fonts/*',
    '!./node_modules/font-awesome/{less,less/*}',
    '!./node_modules/font-awesome/{scss,scss/*}',
    '!./node_modules/font-awesome/.*',
    '!./node_modules/font-awesome/*.{txt,json,md}',
    '!./node_modules/font-awesome/**/*.map'
  ])
    .pipe(gulp.dest('./assets/vendor/font-awesome/'))

  // jQuery
  gulp.src([
    './node_modules/jquery/dist/*.min.*',
    '!./node_modules/jquery/dist/core.js',
    '!./node_modules/jquery/dist/*.map'
  ])
    .pipe(gulp.dest('./assets/vendor/jquery/'))

  // Popper.js
  gulp.src([
    './node_modules/popper.js/dist/*.min.*',
    '!./node_modules/popper.js/.*',
    '!./node_modules/popper.js/*.{txt,json,md}',
    '!./node_modules/popper.js/**/*.map'
  ])
    .pipe(gulp.dest('./assets/vendor/popper.js/'))

  // Pace js
  gulp.src([
    './node_modules/pace-js/*.min.*',
    './node_modules/pace-js/**/themes/green/*minimal*'
  ])
    .pipe(gulp.dest('./assets/vendor/pace-js/'))

});

// Clean output directory
gulp.task('clean', function () {
  return del([
    './_site',
    './assets'
  ]);
});

// Watch all files for changes & recompile

//Watch all files, run jekyll & reload BrowserSync
gulp.task('watch', function () {
  gulp.watch('./src/css/**/*.css', ['css:theme']);
  gulp.watch('./src/js/**/*.js', ['js:theme']);
  gulp.watch(['**/*.yml', '**/*.html'], ['jekyll-rebuild']);
});

// Gulp task to minify all files
gulp.task('default', ['clean'], function () {
  runSequence(
    'css:theme',
    'js:theme',
    'img',
    'vendor',
    'browser-sync',
    'watch'
  );
});

// Gulp task to build all files
gulp.task('build', ['clean'], function () {
  runSequence(
    'css:theme',
    'js:theme',
    'img',
    'vendor',
    'jekyll-build'
  );
});

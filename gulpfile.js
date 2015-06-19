/*global -$ */
'use strict';

var gulp = require('gulp');
var hbs = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var path = require('path');
var data = require('gulp-data');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var merge = require('merge-stream');
var reload = browserSync.reload;

/**
 * Compiling Styles
 */
gulp.task('styles', function() {
  return gulp.src('./app/styles/main.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.postcss([
      require('autoprefixer-core')({
        browsers: ['last 1 version']
      })
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({
      stream: true
    }));
});


/**
 * JSHint on Javascript
 */

gulp.task('jshint', function() {
  return gulp.src('app/scripts/**/*.js')
    .pipe(reload({
      stream: true,
      once: true
    }))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});


/**
 * Javascript compiling/minifying
 */

gulp.task('js', function() {

  return gulp.src('./app/**/*.js')
    .pipe(gulp.dest('./.tmp'));

});


/**
 * Minifying images to temp dir
 */

gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{
        cleanupIDs: false
      }]
    })))
    .pipe(gulp.dest('./dist/images'));
});


/**
 * Compile HBS to HTML
 */
gulp.task('compile', function() {
  var options = {
    ignorePartials: true,
    batch: ['./app/partials'],
    helpers: {
      html: function(string) {
        return new hbs.Handlebars.SafeString(string);
      }
    }
  };
  var filename;

  return gulp.src('./app/**/*.html')
    .pipe(data(function(file) {
      filename = path.basename(file.path).substr(0, path.basename(file.path).lastIndexOf('.'));
      return require('./app/content/' + filename + '.json');
    }))
    .pipe(hbs(data, options))
    .pipe(data(function(file) {
      filename = path.basename(file.path).substr(0, path.basename(file.path).lastIndexOf('.'));
      return rename(filename + '.html');
    }))
    .pipe(gulp.dest('./.tmp'));
});


gulp.task('html', ['styles', 'js', 'images', 'compile'], function() {
  var assets = $.useref.assets({
    searchPath: ['.tmp']
  });

  return gulp.src('./.tmp/**/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.ga({
      tag: 'body',
      url: 'hackathon.backbase.com',
      uid: 'UA-332005-15'
    }))
    .pipe($.if('*.html', $.minifyHtml({
      conditionals: true,
      loose: true
    })))
    .pipe(gulp.dest('./dist'));

});


gulp.task('extras', function() {
  return merge(gulp.src(['app/*.*', '!app/*.html', 'app/CNAME'], {
      dot: true
    }).pipe(gulp.dest('dist')),
    gulp.src(['bower_components/fontawesome/fonts/*.*'], {
      dot: true
    }).pipe(gulp.dest('dist/fonts')),
    gulp.src(['app/content/**'], {
      dot: true
    }).pipe(gulp.dest('dist/content')));
});


gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));


gulp.task('serve', ['compile', 'styles'], function() {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  // watch for changes
  gulp.watch([
    'app/**/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*',
    'app/partials/**/*.hbs'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/partials/**/*.hbs', ['compile', reload]);
  gulp.watch('bower.json', ['wiredep']);
});

// inject bower components
gulp.task('wiredep', function() {
  var wiredep = require('wiredep').stream;

  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap-sass-official'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});


gulp.task('build', ['html', 'extras'], function() {
  return gulp.src('dist/**/*').pipe($.size({
    title: 'build',
    gzip: true
  }));
});

gulp.task('deploy', ['build'], function() { //, ['build']
  return gulp.src('dist')
    .pipe($.subtree({
      message: 'Site updated at ' + new Date(),
      branch: 'gh-pages'
    }))
    .pipe($.clean());
});

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});

var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    exec = require('child_process').exec,
    autoprefixer = require('gulp-autoprefixer'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    browserSync = require('browser-sync').create();

/**
 * Run test once and exit
 */

gulp.task('server-start', function(cb) {
    exec('mongod --dbpath ./data', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('server', function(cb) {
    exec('mongod --dbpath ./data', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
    exec('node ./server.js', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("public/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("public/css"));
});


gulp.task('reload', function() {
    return gulp.src('./public/**/*.*');
});


gulp.task('default', function() {
    return gulp.src('public/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })).pipe(gulp.dest(''));
});

gulp.task('lint', function() {
    gulp.src('./public/js/**/*.js')
        .pipe(jshint())
});

gulp.task('develop', function() {
    nodemon({
            script: 'server.js',
            ext: 'html js',
            tasks: ['lint']
        })
        .on('restart', function() {
            console.log('restarted!')
        })
});

gulp.task('browser-sync', ['develop'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:8080",
        files: ["public/**/*.*"],
        port: 7000,
    });
});
gulp.task('watch', function() {
    gulp.watch("public/sass/*.scss", ['sass']);
    gulp.watch(['public/scripts/*.js'], ['reload']);
    gulp.watch(['public/css/*.css'], ['reload']);
});

gulp.task('default', ['sass', 'server', 'watch']);

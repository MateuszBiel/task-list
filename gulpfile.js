var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var    exec = require('child_process').exec;
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');

/**
 * Run test once and exit
 */
gulp.task('test', function(done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
});

gulp.task('server', function (cb) {
  exec('node ./server.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
  exec('mongod --dbpath ./data', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("public/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("public/css"));
});

gulp.task('connect', function(){
    connect.server({
        livereload: true,
        port: 8080
    });
});

gulp.task('reload', function(){
    gulp.src('./public/**/*.*')
    .pipe(connect.reload());
});


gulp.task('default', function () {
    return gulp.src('public/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(''));
});


gulp.task('watch',function(){
    gulp.watch("public/sass/*.scss", ['sass']);
    gulp.watch(['public/scripts/*.js'], ['reload']);
    gulp.watch(['public/css/*.css'], ['reload']);
})

gulp.task('default', ['sass', 'server', 'watch']);


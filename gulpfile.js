var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json', { sortOutput: true });

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done).start();
});



// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: ""
    });

    gulp.watch("app/sass/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

// gulp.task('tsChecker', function () {
//         var tsResult = tsProject.src() // instead of gulp.src(...) 
//         .pipe(ts(tsProject));
    
//     return tsResult.js.pipe(gulp.dest(''))
//         .pipe(browserSync.stream());
// // });

// gulp.task('default', ['serve','tsChecker']);
gulp.task('default', ['serve']);
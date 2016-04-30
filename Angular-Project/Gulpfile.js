var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('app/styles/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/styles/css/'));
});

//Watch task
gulp.task('watch',function() {
    gulp.watch('app/styles/sass/**/*.scss',['sass']);
});
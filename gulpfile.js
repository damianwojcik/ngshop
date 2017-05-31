var gulp = require("gulp");
var browserSync = require("browser-sync");
var sass = require("gulp-sass");
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

gulp.task("reload", function() {
    browserSync.reload();
});

gulp.task("serve", ["sass"], function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("*.html", ["reload"]);
    gulp.watch("assets/js/**/*.js", ["scripts"]);
    gulp.watch("assets/css/**/*.+(scss|sass)", ["sass"]);
});

gulp.task("sass", function() {
    gulp.src("assets/css/**/*.+(scss|sass)")
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 1%']
        }))
        .pipe(gulp.dest("./"))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest("./"))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp.src("assets/js/**/*.js")
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest("./"))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest("./"))
        .pipe(browserSync.stream());
});

gulp.task("default", ["serve"]);
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourceMaps = require("gulp-sourcemaps");
const uglify = require('gulp-uglify');
const obfuscate = require("gulp-obfuscate");
const imagemin = require("gulp-imagemin");

function comprimeImagemin () {
    return gulp.src("./source/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'));
}
function comprimeJs () {
    return gulp.src('./source/script/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/script'));
}

function compilaSass() {
    return gulp.src('./source/styles/main.scss')
    .pipe(sourceMaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    })).pipe(sourceMaps.write('./maps'))
    .pipe(gulp.dest('./build/styles'))

}

exports.default = function () {
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false},  gulp.series(compilaSass))
    gulp.watch('./source/script/*.js', {ignoreInitial: false},  gulp.series(comprimeJs))
    gulp.watch('./source/images/*', {ignoreInitial: false},  gulp.series(comprimeImagemin))
}

const gulp = require("gulp");

// create a dist file to contain all HTML files
gulp.task("processHTML", ()=>{
    gulp.src("*.html")
        .pipe(gulp.dest("dist"));

});

// process all js files to dist
gulp.task("processJS",()=>{
    gulp.src("*.js")
        .pipe(gulp.dest("dist"));
});

// using JShint for linting my code
const jshint = require("gulp-jshint");

gulp.task("processJS", () => {
    gulp.src("*.js")
        .pipe(jshint({
            esversion: 6
        }))
        .pipe(jshint.reporter("default"))
        .pipe(gulp.dest("dist"));
});


// using gulp-babel for transpiling my code
const babel = require("gulp-babel");

gulp.task("processJS", () => {
    gulp.src("*.js")
        .pipe(jshint({
            esversion: 6
        }))
        .pipe(jshint.reporter("default"))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest("dist"));
});


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

const jshint = require("gulp-jshint");

gulp.task("processJS", () => {
    gulp.src("*.js")
        .pipe(jshint({
            esversion: 6
        }))
        .pipe(jshint.reporter("default"))
        .pipe(gulp.dest("dist"));
});
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
    gulp.src("blog.js")
        .pipe(jshint({
            esversion: 6
        }))
        .pipe(jshint.reporter("default"))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest("dist"));
});

gulp.task("processJS", () => {
    gulp.src("functions.js")
        .pipe(jshint({
            esversion: 6
        }))
        .pipe(jshint.reporter("default"))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest("dist"));
});

//// babel-polyfill issue. 
//// set up another task to copy  browser.js  to our  dist  folder.

gulp.task("babelPolyfill", () => {
    gulp.src('node_modules/babel-polyfill/browser.js')
        .pipe(gulp.dest('dist/node_modules/babel-polyfill'));
});

// using gulp-uglify to minifying my code

const uglify = require("gulp-uglify");


gulp.task('processJS', () => {
    gulp.src('blog.js')
      .pipe(jshint({
        esversion: 6
      }))
      .pipe(jshint.reporter('default'))
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));
  });

  gulp.task('processJS', () => {
    gulp.src('functions.js')
      .pipe(jshint({
        esversion: 6
      }))
      .pipe(jshint.reporter('default'))
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));
  });

  // getting Gulp to run all of these tasks automatically!

  const runSequence = require("run-sequence");
  
  gulp.task('default', (callback) => {
    runSequence(['processHTML', 'processJS', 'babelPolyfill'], callback);
  });

  // watching my  files

  gulp.task("watch", ()=>{
    gulp.watch("*.js",["processJS"]);
    gulp.watch("*.html",["processHTML"]);
  });

  gulp.task('default', (callback) => {
    runSequence(['processHTML', 'processJS', 'babelPolyfill'], 'watch', callback);
  });


  // using Gulp to automatically run and refresh our browser window every time we modify my code

  const browserSync = require("browser-sync").create();
  gulp.task('browserSync', () => {
    browserSync.init({
      server: './dist',
      port: 8080,
      ui: {
        port: 8081
      }
    });
  });

    gulp.task('watch', ['browserSync'], () => {
        gulp.watch('*.js', ['processJS']);
        gulp.watch('*.html', ['processHTML']);
    
        gulp.watch('dist/*.js', browserSync.reload);
        gulp.watch('dist/*.html', browserSync.reload);
  });
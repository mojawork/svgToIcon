'use strict';

const gulp = require('gulp');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');

const browserSync = require('browser-sync').create();


// ---- config ---
const fontName = 'Icons';  //Name of the font
const fontFormat =  ['ttf', 'eot', 'woff'];  //The font file formats that will be created
const runTimestamp = Math.round(Date.now()/1000); //Recommended to get consistent builds when watching files

// ---- import ---
const importDir = "./import";
const svgDir = 'import/svg/*.svg'; //Source folder containing the SVG images
const indexTemplate = 'import/templates/index.html'; //The path to the template that will be used to create the index file
const cssTemplate = 'import/templates/icons.css'; //The path to the template that will be used to create the CSS file

// ---- export ---
const baseDir = "./dist";
const cssExport = 'css/icons.css'; //The path where the css file will be generated
const fontExport = 'dist/fonts'; //The path where the fonts will be generated
// const scssExport = 'import/templates/_icons.scss';


gulp.task('iconfont', function(){
    return gulp.src([svgDir])
        .pipe(iconfontCss({
            fontName: fontName,
            path: cssTemplate,
            targetPath: '../' + cssExport
        }))
        .pipe(iconfont({
            prependUnicode: false, // Recommended option
            fontName: fontName,
            formats: fontFormat,
            normalize: true,
            timestamp: runTimestamp
        }))
        .pipe(gulp.dest(fontExport));
});

gulp.task('copyindex', function () {
    console.log('jou');
    gulp.src(indexTemplate)
        .pipe(gulp.dest(baseDir));
});


// --- watch task ---
gulp.task('serve', ['iconfont'], function () {
    browserSync.init({
        server: {
            baseDir: baseDir
        }
    });
    gulp.watch(indexTemplate, ['copyindex']).on('change', browserSync.reload);
    gulp.watch(svgDir, ['iconfont']).on('change', browserSync.reload);
    gulp.watch(cssTemplate, ['iconfont']).on('change', browserSync.reload);

});
// --- watch task ---
'use strict';

const gulp = require('gulp');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');


// ---- config ---
const fontName = 'Icons';  //Name of the font
const fontFormat =  ['ttf', 'eot', 'woff'];  //The font file formats that will be created
const runTimestamp = Math.round(Date.now()/1000); //Recommended to get consistent builds when watching files

// ---- import ---
const folderSvg = 'import/svg/*.svg'; //Source folder containing the SVG images
const cssTemplate = 'import/templates/_icons.css'; //The path to the template that will be used to create the SASS/LESS/CSS file
const scssTemplate = 'import/templates/_icons.scss';

// ---- export ---
const cssExport = 'css/icons.css'; //The path where the css file will be generated
const fontExport = 'app/assets/fonts'; //The path where the fonts will be generated
const scssExport = 'import/templates/_icons.scss';


gulp.task('iconfont', function(){
    return gulp.src([folderSvg])
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
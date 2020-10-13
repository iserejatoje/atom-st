let preprocessor = 'scss',
    fileswatch = 'html,css',
    baseDir = 'app',
    online = true;

let paths = {

    scripts: {
        src: [
            // 'node_modules/jquery/dist/jquery.min.js',
            baseDir + '/js/app.js'
        ],
        dest: baseDir + '/js',
    },

    styles: {
        src: baseDir + '/' + preprocessor + '/main.*',
        dest: baseDir + '/css',
    },

    cssOutputName: 'app.min.css',
    jsOutputName: 'app.min.js',
}

const {src, dest, parallel, series, watch} = require('gulp');
const sass = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const newer = require('gulp-newer');
const svgSprite = require('gulp-svg-sprite');

function browsersync() {
    browserSync.init({
        server: {baseDir: './'},
        notify: false,
        online: online
    })
}

function svgs() {
    return src(baseDir + '/svg/*.svg')
        .pipe(svgSprite({
                mode: {
                    stack: {
                        sprite: "../sprite.svg"
                    }
                },
            }
        ))
        .pipe(dest(baseDir + '/img/'));
}

function scripts() {
    return src(paths.scripts.src)
        .pipe(concat(paths.jsOutputName))
        .pipe(uglify())
        .pipe(dest(paths.scripts.dest))
        .pipe(browserSync.stream())
}

function styles() {
    return src(paths.styles.src)
        .pipe(newer(paths.styles.dest))
        .pipe(sass())
        .pipe(concat(paths.cssOutputName))
        .pipe(autoprefixer({overrideBrowserslist: ['last 10 versions'], grid: true}))
        // .pipe(cleancss({level: {1: {specialComments: 0}}}))
        .pipe(dest(paths.styles.dest))
        .pipe(browserSync.stream())
}

function startwatch() {
    watch(baseDir + '/' + preprocessor + '/**/*', {usePolling: true}, styles);
    watch(baseDir + '/**/*.{' + fileswatch + '}', {usePolling: true}).on('change', browserSync.reload);
    watch([baseDir + '/js/**/*.js', '!' + paths.scripts.dest + '/*.min.js'], {usePolling: true}, scripts);
}

exports.browsersync = browsersync;
exports.assets = series(styles, scripts);
exports.styles = styles;
exports.scripts = scripts;
exports.svgs = svgs;
exports.default = parallel(styles, scripts, browsersync, startwatch);
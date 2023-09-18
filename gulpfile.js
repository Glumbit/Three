const gulp = require('gulp');
const { src, dest, watch, parallel, series } = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;
const clean = require('gulp-clean');
const count = require('gulp-count');
const include = require('gulp-include');
const ts = require('gulp-typescript');


const avif = require('gulp-avif');
const webp = require('gulp-webp');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const svgSprite = require('gulp-svg-sprite');

const browserSync = require('browser-sync').create();

// КОНФЕРТОРЫ КАРТИНОК(в WEBP, AVIF)

function webpConverter() {
	return src('app/stocks/img/*.*')
		.pipe(newer('app/assets/img'))
		.pipe(webp())
}

function sprite() {
	return src('app/stocks/img/*.svg')
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: '../sprite.svg',
					example: true
				}
			}
		}))
		.pipe(dest('app/assets/img'))
}

function imageMinimize(done) {
	// include(avifConverter(), webpConverter()).pipe(imagemin()).pipe(dest(('app/assets/img/dist')))

	// avifConverter().pipe(imagemin()).pipe(dest(('app/assets/img/dist')))
	webpConverter().pipe(imagemin()).pipe(dest(('app/assets/img')))
	done()
}

// ОБЬЕДЕНИТЬ И МИНИФИЦИРОВАТЬ JS И SASS

function scripts() {
	return src('app/assets/ts/*.ts')
		.pipe(ts({
			noImplicitAny: true,
			module: 'ESNext',
			removeComments: true,
			outDir: 'main-min.js',
			experimentalDecorators: true
		}))
		.pipe(concat('main-min.js'))
		.pipe(uglify())
		.pipe(dest('app/assets/js'))
		.pipe(browserSync.stream())
}

function sassCompiler() {
	return src('app/assets/sass/*.scss')
		.pipe(autoprefixer({ overrideBrowserslist: ['last 2 version'] }))
		.pipe(concat('style-min.scss'))
		.pipe((sass({ outputStyle: 'compressed' })))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(dest('app/assets/css'))
		.pipe(browserSync.stream())
}

function pagesMerge() {
	return src('app/pages/*.html')
		.pipe(include({
			includePaths: 'app/assets/components'
		}))
		.pipe(dest('app'))
		.pipe(browserSync.stream())
}

function pageReload() {
	browserSync.init({
		server: {
			baseDir: "app/"
		}
	});
}

function onSave() {
	pageReload()
	watch(['app/assets/sass'], sassCompiler)
	watch(['app/stocks/img'], imageMinimize)
	watch(['app/assets/ts'], scripts)
	watch(['app/assets/components/*', 'app/pages/*'], pagesMerge)
	watch(['app/*.html']).on('change', browserSync.reload);
}

function buildCreate() {
	return src([
		'app/assets/css/style-min.css',
		'app/assets/img/*.*',
		'!app/assets/img/*.svg',
		'!app/assets/img/stack/sprite.stack.html',
		// 'app/assets/img/dist/sprite.svg',
		'app/assets/js/main-min.js',
		'app/*.html'
	], { base: 'app' })
		.pipe(dest('build'));
}

function buildCleaner() {
	return src('./build/')
		.pipe(clean());
}

exports.scripts = scripts;
exports.sassCompiler = sassCompiler;
exports.onSave = onSave;
exports.sprite = sprite;
exports.imageMinimize = imageMinimize;
exports.pagesMerge = pagesMerge;
exports.build = series(buildCleaner, buildCreate);

exports.default = parallel(sassCompiler, scripts, imageMinimize, onSave);
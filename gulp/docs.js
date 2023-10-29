const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const htmlclean = require('gulp-htmlclean')
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const csso = require('gulp-csso');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const groupMedia = require('gulp-group-css-media-queries');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

const changed = require('gulp-changed');
const newer =  require('gulp-newer');
const connect = require('gulp-connect');


const fileIncludeSetting = {
	prefix: '@@',
	basepath: '@file',
};
const plumberNotify = (title) => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: 'Error <%= error.message %>',
			sound: false,
		}),
	};
};

gulp.task('html:docs', function() {
	return gulp.src('./src/pages/*.html')
	.pipe(changed('./docs/'))
	.pipe(plumber(plumberNotify('HTML')))
	.pipe(fileInclude(fileIncludeSetting))
  .pipe(htmlclean())
	.pipe(gulp.dest('./docs/'))
	.pipe(connect.reload())
})

gulp.task('sass:docs', function() {
	return gulp.src('./src/styles/index.scss')
  .pipe(changed('./docs/css/'))
	.pipe(plumber(plumberNotify('SCSS')))
	.pipe(sourceMaps.init())
  
	.pipe(sassGlob())
  
	.pipe(groupMedia())
	.pipe(sass())
  .pipe(postcss([ autoprefixer() ]))
  .pipe(csso())
	.pipe(sourceMaps.write())
	.pipe(gulp.dest('./docs/css/'))
	.pipe(connect.reload())
})

gulp.task('images:docs', function() {
	return gulp.src('./src/images/**/*')
	.pipe(changed('./docs/images/'))
	.pipe(newer('./docs/images/'))
  .pipe(webp())
  .pipe(gulp.dest('./docs/images/'))
  .pipe(gulp.src('./src/images/**/*'))
  .pipe(changed('./docs/images/'))
	.pipe(newer('./docs/images/'))
	.pipe(imagemin({verbose:true}))
	.pipe(gulp.dest('./docs/images/'))
	.pipe(connect.reload())
})






gulp.task('files:docs', function() {
	return gulp.src('./src/files/**/*')
	.pipe(changed('./docs/files/'))
	.pipe(gulp.dest('./docs/files/'))
	.pipe(connect.reload())
})

gulp.task('js:docs', function () {
	return gulp
		.src('./src/scripts/entry-scripts/*.js')
		.pipe(changed('./docs/js/'))
		.pipe(plumber(plumberNotify('JS')))
		.pipe(babel())
		.pipe(webpack(require('./../webpack.config.js')))
		.pipe(gulp.dest('./docs/js'))
		.pipe(connect.reload());
});


gulp.task('clean:docs', function(done) {
	if(fs.existsSync('./docs/')) {
		return gulp.src('./docs/', {read: false}).pipe(clean({force: true}))
	} 
	done();
})


gulp.task('connect:docs', function() {
	connect.server({
		root: 'docs',
		livereload: true
	});
});
const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const newer =  require('gulp-newer');
const webp = require('gulp-webp');
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


gulp.task('html:dev', function() {
	return gulp.src('./src/pages/*.html')
	.pipe(changed('./build/', {hasChanged: changed.compareContents}))
	.pipe(plumber(plumberNotify('HTML')))
	.pipe(fileInclude(fileIncludeSetting))
	.pipe(gulp.dest('./build/'))
	.pipe(connect.reload())
})

gulp.task('sass:dev', function() {
	return gulp.src('./src/styles/index.scss')
	.pipe(changed('./build/css/'))
	.pipe(plumber(plumberNotify('SCSS')))
	.pipe(sourceMaps.init())
	.pipe(sassGlob())
	.pipe(sass())
	// .pipe(groupMedia())
	.pipe(sourceMaps.write())
	.pipe(gulp.dest('./build/css/'))
	.pipe(connect.reload())
})

gulp.task('images:dev', function() {
	return gulp.src('./src/images/**/*')
	.pipe(changed('./build/images/'))
	.pipe(newer('./build/images/'))
	// // .pipe(imagemin({verbose:true}))
	// .pipe(gulp.dest('./build/images/'))
	// .pipe(connect.reload())

	.pipe(webp())
  .pipe(gulp.dest('./build/images/'))
  .pipe(gulp.src('./src/images/**/*'))
  .pipe(changed('./build/images/'))
	.pipe(newer('./build/images/'))
	.pipe(imagemin({verbose:true}))
	.pipe(gulp.dest('./build/images/'))
	.pipe(connect.reload())




})

gulp.task('files:dev', function() {
	return gulp.src('./src/files/**/*')
	.pipe(changed('./build/files/'))
	.pipe(gulp.dest('./build/files/'))
	.pipe(connect.reload())
})

gulp.task('js:dev', function () {
	return gulp
		.src('./src/scripts/entry-scripts/*.js')
		.pipe(changed('./build/js/'))
		.pipe(plumber(plumberNotify('JS')))
		.pipe(webpack(require('./../webpack.config.js')))
		.pipe(gulp.dest('./build/js'))
		.pipe(connect.reload());
});

gulp.task('clean:dev', function(done) {
	if(fs.existsSync('./build/')) {
		return gulp.src('./build/', {read: false}).pipe(clean({force: true}))
	} 
	done();
})

gulp.task('connect:dev', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('watch:dev', function () {
	gulp.watch('./src/styles/**/*.scss', gulp.parallel('sass:dev'));
	gulp.watch(['./src/partials/**/*.html','./src/pages/**/*.html', ], gulp.parallel('html:dev'));
	gulp.watch('./src/images/**/*', gulp.parallel('images:dev'));
	gulp.watch('./src/files/**/*', gulp.parallel('files:dev'));
	gulp.watch('./src/scripts/**/*.js', gulp.parallel('js:dev'));
});
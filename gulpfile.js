const gulp = require('gulp');


// Tasks
// require('./gulp/dev.js');
// require('./gulp/docs.js');

// gulp.task(
// 	'default',
// 	gulp.series(
// 		'clean:dev',
// 		gulp.parallel('html:dev', 'sass:dev', 'images:dev',  'files:dev', 'js:dev'),
// 		gulp.parallel('server:dev', 'watch:dev')
// 	)
// );



// gulp.task(
// 	'docs',
// 	gulp.series(
// 		'clean:docs',
// 		gulp.parallel('html:docs', 'sass:docs', 'images:docs', 'files:docs', 'js:docs'),
// 		gulp.parallel('server:docs')
// 	)
// );





// const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');

// gulp.task('clean:dev', function (done) {
// 	if (fs.existsSync('./build/')) {
// 		return gulp
// 			.src('./build/', { read: false })
// 			.pipe(clean({ force: true }));
// 	}
// 	done();
// });

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

// gulp.task('html:dev', function () {
// 	return (
// 		gulp
// 			// .src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
// 			.src(['./src/pages/**/*.html', '!./src/partials/*.html'])
// 			.pipe(changed('./build/', { hasChanged: changed.compareContents }))
// 			.pipe(plumber(plumberNotify('HTML')))
// 			.pipe(fileInclude(fileIncludeSetting))
// 			.pipe(gulp.dest('./build/'))
// 	);
// });


gulp.task('html', function() {
	return gulp.src('./src/pages/*.html')
	.pipe(plumber(plumberNotify('HTML')))
	.pipe(fileInclude(fileIncludeSetting))
	.pipe(gulp.dest('./dist/'))
	.pipe(connect.reload())
})

gulp.task('sass', function() {
	return gulp.src('./src/styles/index.scss')
	.pipe(plumber(plumberNotify('SCSS')))
	.pipe(sourceMaps.init())
	.pipe(sass())
	// .pipe(groupMedia())
	.pipe(sourceMaps.write())
	.pipe(gulp.dest('./dist/css/'))
	.pipe(connect.reload())
})

gulp.task('images', function() {
	return gulp.src('./src/images/**/*')
	.pipe(gulp.dest('./dist/images/'))
	.pipe(connect.reload())
})

gulp.task('files', function() {
	return gulp.src('./src/files/**/*')
	.pipe(gulp.dest('./dist/files/'))
	.pipe(connect.reload())
})




// gulp.task('sass:dev', function () {
// 	return (
// 		gulp
// 			.src('./src/scss/*.scss')
// 			.pipe(changed('./build/css/'))
// 			.pipe(plumber(plumberNotify('SCSS')))
// 			.pipe(sourceMaps.init())
// 			.pipe(sassGlob())
// 			.pipe(sass())
// 			.pipe(sourceMaps.write())
// 			.pipe(gulp.dest('./build/css/'))
// 	);
// });






// gulp.task('images:dev', function () {
// 	return gulp
// 		.src('./src/img/**/*')
// 		.pipe(changed('./build/img/'))
// 		// .pipe(imagemin({ verbose: true }))
// 		.pipe(gulp.dest('./build/img/'));
// });


// gulp.task('files:dev', function () {
// 	return gulp
// 		.src('./src/files/**/*')
// 		.pipe(changed('./build/files/'))
// 		.pipe(gulp.dest('./build/files/'));
// });

// gulp.task('js:dev', function () {
// 	return gulp
// 		.src('./src/js/*.js')
// 		.pipe(changed('./build/js/'))
// 		.pipe(plumber(plumberNotify('JS')))
// 		// .pipe(babel())
// 		.pipe(webpack(require('./../webpack.config.js')))
// 		.pipe(gulp.dest('./build/js/'));
// });

const serverOptions = {
	livereload: true,

	open: true,

};

// gulp.task('server:dev', function () {
// 	return gulp.src('./build/').pipe(server(serverOptions));
// });

// gulp.task('watch:dev', function () {
// 	gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass:dev'));
// 	gulp.watch('./src/html/**/*.html', gulp.parallel('html:dev'));
// 	gulp.watch('./src/img/**/*', gulp.parallel('images:dev'));
// 	gulp.watch('./src/files/**/*', gulp.parallel('files:dev'));
// 	gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev'));
// });











// const gulp = require('gulp');

// HTML
// const fileInclude = require('gulp-file-include');
// const htmlclean = require('gulp-htmlclean');
// const webpHTML = require('gulp-webp-html');

// SASS
// const sass = require('gulp-sass')(require('sass'));
// const sassGlob = require('gulp-sass-glob');
// const autoprefixer = require('gulp-autoprefixer');
// const csso = require('gulp-csso');
// const webpCss = require('gulp-webp-css');

// const server = require('gulp-server-livereload');
// const clean = require('gulp-clean');
// const fs = require('fs');
//  const sourceMaps = require('gulp-sourcemaps');
const groupMedia = require('gulp-group-css-media-queries');
// const plumber = require('gulp-plumber');
// const notify = require('gulp-notify');
// const webpack = require('webpack-stream');
// const babel = require('gulp-babel');
// const changed = require('gulp-changed');

// Images
// const imagemin = require('gulp-imagemin');
// const webp = require('gulp-webp');


// gulp.task('clean:docs', function (done) {
// 	if (fs.existsSync('./docs/')) {
// 		return gulp
// 			.src('./docs/', { read: false })
// 			.pipe(clean({ force: true }));
// 	}
// 	done();
// });

// const fileIncludeSetting = {
// 	prefix: '@@',
// 	basepath: '@file',
// };

// const plumberNotify = (title) => {
// 	return {
// 		errorHandler: notify.onError({
// 			title: title,
// 			message: 'Error <%= error.message %>',
// 			sound: false,
// 		}),
// 	};
// };

// gulp.task('html:docs', function () {
// 	return gulp
// 		.src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
// 		.pipe(changed('./docs/'))
// 		.pipe(plumber(plumberNotify('HTML')))
// 		.pipe(fileInclude(fileIncludeSetting))
// 		.pipe(webpHTML())
// 		.pipe(htmlclean())
// 		.pipe(gulp.dest('./docs/'));
// });

// gulp.task('sass:docs', function () {
// 	return gulp
// 		.src('./src/scss/*.scss')
// 		.pipe(changed('./docs/css/'))
// 		.pipe(plumber(plumberNotify('SCSS')))
// 		.pipe(sourceMaps.init())
// 		.pipe(autoprefixer())
// 		.pipe(sassGlob())
// 		.pipe(webpCss())
// 		.pipe(groupMedia())
// 		.pipe(sass())
// 		.pipe(csso())
// 		.pipe(sourceMaps.write())
// 		.pipe(gulp.dest('./docs/css/'));
// });

// gulp.task('images:docs', function () {
// 	return gulp
// 		.src('./src/img/**/*')
// 		.pipe(changed('./docs/img/'))
// 		.pipe(webp())
// 		.pipe(gulp.dest('./docs/img/'))
// 		.pipe(gulp.src('./src/img/**/*'))
// 		.pipe(changed('./docs/img/'))
// 		.pipe(imagemin({ verbose: true }))
// 		.pipe(gulp.dest('./docs/img/'));
// });



// gulp.task('files:docs', function () {
// 	return gulp
// 		.src('./src/files/**/*')
// 		.pipe(changed('./docs/files/'))
// 		.pipe(gulp.dest('./docs/files/'));
// });

// gulp.task('js:docs', function () {
// 	return gulp
// 		.src('./src/js/*.js')
// 		.pipe(changed('./docs/js/'))
// 		.pipe(plumber(plumberNotify('JS')))
// 		.pipe(babel())
// 		.pipe(webpack(require('./../webpack.config.js')))
// 		.pipe(gulp.dest('./docs/js/'));
// });

// const serverOptions = {
// 	livereload: true,
// 	open: true,
// };

// gulp.task('server:docs', function () {
// 	return gulp.src('./docs/').pipe(server(serverOptions));
// });






// gulp.task('server', function() {
// 	return gulp.src('./dist/').pipe(server({ port: 8080, ...serverOptions }))
// })


gulp.task('clean', function(done) {
	if(fs.existsSync('./dist/')) {
		return gulp.src('./dist/', {read: false}).pipe(clean({force: true}))
	} 
	done();
})


gulp.task('watch', function () {
	gulp.watch('./src/styles/**/*.scss', gulp.parallel('sass'));
	gulp.watch(['./src/partials/**/*.html','./src/pages/**/*.html', ], gulp.parallel('html'));
	gulp.watch('./src/images/**/*', gulp.parallel('images'));
	gulp.watch('./src/files/**/*', gulp.parallel('files'));
});

// gulp.task(
// 	'default',
// 	gulp.series(
// 		'clean',
// 		gulp.parallel('html', 'sass', 'images'),
// 		gulp.parallel('watch','server' )
// 	)
// );

const connect = require('gulp-connect');
gulp.task('connect', function() {
	connect.server({
		root: 'dist',
		livereload: true
	});
});

gulp.task(
	'default',
	gulp.series(
		'clean',
		gulp.parallel('html', 'sass', 'images', 'files'),
		gulp.parallel('connect','watch' )
	)
);

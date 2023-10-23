const gulp = require('gulp');
require('./gulp/dev.js');
require('./gulp/docs.js');


gulp.task(
	'default',
	gulp.series(
		'clean:dev',
		gulp.parallel('html:dev', 'sass:dev', 'images:dev', 'files:dev', 'js:dev'),
		gulp.parallel('connect:dev','watch:dev' )
	)
);

gulp.task(
	'docs',
	gulp.series(
		'clean:docs',
		gulp.parallel('html:docs', 'sass:docs', 'images:docs', 'files:docs', 'js:docs'),
		gulp.parallel('connect:docs' )
	)
);


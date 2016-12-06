var gulp = require('gulp')
	,stylus = require('gulp-stylus')
	,browserSync = require('browser-sync')
	,jade = require('gulp-jade')
	,watch = require('gulp-watch')
	,runSequence = require('run-sequence')
	,clean = require('gulp-clean')
	,autoprefixer = require('gulp-autoprefixer')
	,postcss = require('gulp-postcss')
	;



gulp.task('jade', function(){
	gulp.src('./src/view/**/*.jade')
		.pipe(jade({
			pretty:true
		}))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('stylus', function(){
	var processors = [
		autoprefixer({browsers: ['last 1 version']}),
	];
	gulp.src('./src/css/**/*.styl')
		.pipe(stylus())
		.pipe(autoprefixer())
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('css', function(){
	gulp.src('./src/css/**/*.css')
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('script', function(){
	gulp.src('./src/script/**/*.js')
		//.pipe(watch({glob:'./src/script/**/*.js'}))
		.pipe(gulp.dest('./dist/script'));
});


//copy images
gulp.task('image', function(){
	gulp.src('./src/image/**/*.{png,gif,jpg,svg}')
		.pipe(gulp.dest('./dist/image'));
});

//brower sync
gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: "./dist"
		}
	});
});

//server
gulp.task('server', function(){
	browserSync({
		server: {
			baseDir: "./dist"
		}
	});
});


//watch and serve
gulp.task('watch', function(){
	watch('./src/view/**/*.jade', function(){
		gulp.start('jade');
	});
	watch('./src/css/**/*.styl', function(){
		gulp.start('stylus');
	});
	watch('./src/css/**/*.css', function(){
		gulp.start('css');
	});
	watch('./src/script/**/*.js', function(){
		gulp.start('script');
	});
	watch('./src/image/**/*.{png,gif,jpg,svg}', function(){
		gulp.start('image');
	});


	gulp.watch(['.src/**/*']).on('change', browserSync.reload);
})


/**
 * Product and Optimize tasks
 */
gulp.task('minify', function(){

})

//clean dist directory
gulp.task('clean', function(){
	//return, for asynchronous call
	return gulp.src('./dist/**/*', {read:false})
		.pipe(clean());
});


gulp.task('default', runSequence('jade','stylus','css','script', 'image','watch', 'server'));

gulp.task('product', []);

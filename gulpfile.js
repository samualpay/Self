var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	connect = require('gulp-connect'),
	watch = require('gulp-watch')
	
gulp.task('default', function(){
	console.log('Hello Gulp!');
});
gulp.task('serverGo' , function(){
	console.log('serverGo');
	connect.server({
		livereload: true,
		port: 8088
	});
});
gulp.task('reload' , function(){
	console.log('reload');
	connect.reload();
});
gulp.task('server',['serverGo'],function(){
	gulp.watch(['css/**','data/**','documents/**','images/**','js/**','*.html','_config.yml','*.md'], ['reload']);
})


var gulp=require("gulp"),
	browserSync=require("browser-sync").create(),
    concat=require("gulp-concat");


//合并css文件
gulp.task("concatcss",function(){
	return gulp.src("./src/css/*.css")
	.pipe(concat('main.css'))
	.pipe(gulp.dest("./dist/"))
});
//合并js文件
gulp.task("concatjs",function(){
	return gulp.src("./src/css/*.js")
	.pipe(concat('main.js'))
	.pipe(gulp.dest("./dist/"))
});
//创建本地服务器
gulp.task("server",function(){
	browserSync.init({
		server:{
			baseDir:"./dist/"
		}
	})
});
gulp.task("default",["concatcss","concatjs","server"]);

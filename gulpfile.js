var gulp=require("gulp"),
	browserSync=require("browser-sync").create(),
	contentIncluder=require("gulp-content-includer"),
    concat=require("gulp-concat");


//合并css文件
gulp.task("concatcss",function(){
	return gulp.src("./src/css/*.css")
	.pipe(concat('main.css'))
	.pipe(gulp.dest("./dist/css/"))
});
//合并js文件
gulp.task("concatjs",function(){
	return gulp.src("./src/script/*.js")
	.pipe(gulp.dest("./dist/script/"))
});
//合并html模块
gulp.task("includeHtml",function(){
	return gulp.src("./src/html/*.html")
	.pipe(contentIncluder({
          includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g
      }))
	.pipe(gulp.dest("./dist/html/"))
})
/*输出html*/
gulp.task("html",function(){
	return gulp.src("./src/html/*.html")
	.pipe(gulp.dest("./dist/"))
})
//reload
gulp.task("reload",function(){
	browserSync.reload();
})
//创建本地服务器
gulp.task("browserSync",function(){
	browserSync.init({
		server:{
			baseDir:"./dist/"
		}
	})
});
//监听
gulp.task("watch",function(){
	gulp.watch("src/html/*.html",["includeHtml","reload","html"]);
	gulp.watch("src/css/*.css",["concatcss","reload"]);
	gulp.watch("src/script/*.js",["concatjs","reload"]);
	gulp.watch("src/images/",["reload"]);

})
gulp.task("default",["concatcss","concatjs","browserSync","includeHtml","html","watch"]);
gulp.task("server",["browserSync","watch"]);

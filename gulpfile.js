var browserify  = require('browserify');
var fs          = require('fs');
var express     = require('express');
var gulp        = require('gulp');
var uglify      = require('gulp-uglify');
var source      = require('vinyl-source-stream');
var streamify   = require('gulp-streamify');
var sass        = require('gulp-sass');
var gulpif      = require('gulp-if');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var image       = require('gulp-image');

var sassPath  = "./src/sass/main.scss";
var jsPath    = "./src/js/main";
var outputDir = "./build";
var imgPath   = "./src/images/*";

function handleError(err){
  console.log(err.toString());
  this.emit('end');
}

var env = process.env.NODE_ENV || 'development';
//Change Node environment to production to minify compiled index.js
// var env = process.env.NODE_ENV || 'production';

gulp.task('express', function(){

  var app = express();
  app.use(express.static(__dirname + '/build'));
  app.set('view engine', 'hbs');
  app.set('views', __dirname + '/src/views');
  app.get('/', function(req, res){
    res.render('index.hbs');
  });

  app.listen(3000);

});


//Handle Images Task

gulp.task('image', function(){
  gulp.src(imgPath)
    .pipe(gulp.dest(outputDir + '/images'));
});



gulp.task('js', function(){
  return browserify(jsPath,{debug: env === 'development'})
    .bundle()
    .on('error', handleError)
    .pipe(source('index.js'))
    .on('error', handleError)
    .pipe(gulpif(env === 'production', streamify(uglify())))
    .pipe(gulp.dest(outputDir + '/js'));
});


gulp.task('sass', function(){
  var config = {};

  if(env === 'development'){
    config.sourceComments = 'map';
  }

  if(env === 'production'){
    config.outputStyle = 'compressed';
  }

  return gulp.src(sassPath)
    .on('error', handleError)
    .pipe(sass(config))
    .on('error', handleError)
    .pipe(gulp.dest(outputDir + '/css'))
    .on('error', handleError)
    .pipe(reload({stream: true}));
});

// Static Server + watching scss/html files
gulp.task( 'serve', [ 'sass', 'js', 'image', 'express'], function() {
    var port = process.env.PORT || 3000;

    browserSync.init({
        proxy: 'http://localhost:' + port,
        port: 3000
    });

    gulp.watch('./src/js/**/*.js', ['js']);
    gulp.watch('./src/js/**/*.json', ['js']);
    gulp.watch('./src/views/**/*.hbs', ['js',reload]);
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/images/*.jpg', ['image', reload]);
    gulp.watch('./src/images/*.svg', ['image', reload]);
    gulp.watch('./src/images/*.png', ['image', reload]);
    gulp.watch("./src/views/index.hbs").on('change', reload);
});


gulp.task('default', ['serve']);

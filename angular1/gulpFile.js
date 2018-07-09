const gulp = require('gulp');
const util = require('gulp-util');

//serve para executar as tasks em sequencia
const sequence = require('run-sequence');

//importo os arquivos de tasks
require('./gulpTasks/app');
require('./gulpTasks/deps');
require('./gulpTasks/server');

//essa task default é uma convenção que deve ser utilizada e será chamada indiretamente quando rodar o gulp no run dev que está no package.json
gulp.task('default', () => {
  if(util.env.production){
    sequence('deps', 'app')
  } else {
    sequence('deps', 'app', 'server')
  }
});

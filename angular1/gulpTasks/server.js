const gulp = require('gulp');
const watch = require('gulp-watch'); //fica monitorando ações nos arquivos para disparar as tasks
const webserver = require('gulp-webserver');

//fica monitorando as alterações de arquivos, se você alterar um js ele só sobre a alteração do js e não precisa regerar tudo
gulp.task('watch', () => {
  watch('app/**/*.html', () => gulp.start('app.html')) //sempre que eu fizer uma alteração em um arquivo html, será disparado a task app.html que está no arquivo app e essa task vai substituir o arquivo alterado pelo antigo, mantendo as alterações feitas e o sistema sempre atualizado
  watch('app/**/*.css', () => gulp.start('app.css'))
  watch('app/**/*.js', () => gulp.start('app.js'))
  watch('assets/**/*.*', () => gulp.start('app.assets'))
})

//será responsável por inicializar o servidor, mas precisa que watch seja chamada antes
//sempre que houver uma alteração na pasta publica atravéz dos watchers acima
gulp.task('server', ['watch'], () => {
  return gulp.src('public').pipe(webserver({
    livereload : true, //sempre que a pasta public mudar, ele vai dar um relead na aplicação
    port: 3000,
    open: true //dispara a abertura do browser
  }))
})

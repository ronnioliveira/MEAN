(function(){
  angular.module('app').component('contentHeader', {
    bindings: {
      title: '@', //O @ diz que será uma string estática
      small: '@',
    },
    template: `
    <section class="content-header">
      <h1> {{ $ctrl.title }} <small>{{ $ctrl.small }}</small> </h1>
    </section>
    `
  })
})()

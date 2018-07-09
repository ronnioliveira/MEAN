(function(){
  //esse array com 3 elementos é a forma do angular de fazer injeção de dependência
  angular.module('app').config([
    '$stateProvider', //é um objeto do ui-router que serve para fazer a navegação
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      //quando eu mudar para o estado dashboardState, vou colocar /Dashboard na URL e carregar o template que está dentro de templateUrl
      $stateProvider.state('dashboardState', {
        url: "/dashboard",
        templateUrl: "dashboard/dashboard.html" //isso será carregado dentro do index.html na div do ui-view
      }).state('billingCycleState', {
        url: "/billingCycles?page",//digo que a url vai suportar o parãmetro page
        templateUrl: "billingCycle/tabs.html"
      })
      //se tentar acessar um estado que não existe, sempre irá para o dashboard
      $urlRouterProvider.otherwise('/dashboard')
    }
  ])

  /*O ui-router funciona como uma máquina de estado, onde você pode transitar de um estado para outro.
  Acima eu tenho a possibilidade de transitar entre os estados dashboarState e billingCycleState
  */

})()

(function() { //function auto invocada para não ficar no escopo global
  angular.module('app').controller('DashboardCtrl', [
    '$http', //injetando a dependência do $scope e $http
    DashboardController
  ])

  //O $hhtp é um service do angular e já faz parte do core quando o angular é instalado
  function DashboardController($http){

    const vm = this //peguei o scope
    vm.getSummary = function() { //essa função vai fazer uma requisição http para api Rest do backend para obter o sumary
      const url = 'http://localhost:3003/api/billingSummary'
    
      $http.get(url).then(function(response) { //passei o credit e debit sem ser um objeto genérico, pq sei que essas propriedades já existem no retorno. Isso se chama destructing
        //window.alert('aaa');

        const {credit = 0, debt = 0} = response.data
        vm.credit = credit;
        vm.debt = debt;
        vm.total = credit - debt;
      })
    }

    vm.getSummary()
  }
})()

(function(){
  angular.module('app').controller('BillingCycleCtrl', [
    '$http',
    '$location', //para paginação
    'messages',
    'tabs',
    BillingCycleController
  ])

  function BillingCycleController($http, $location, messages, tabs) {
    const vm = this //pegando referência do próprio controller, garantindo referência do controller correto
    const url = 'http://localhost:3003/api/billingCycles'

    vm.refresh = function() {
      const page = parseInt($location.search().page) || 1 //procuro valor de page na url, se não existir, o padrão será 1

      $http.get(`${url}?skip=${(page - 1) * 4}&limit=4`).then(function(response){
        vm.billingCycle = {credits:[{}], debts:[{}]}
        vm.billingCycles = response.data
        vm.calculateValues()

        $http.get('http://localhost:3003/api/billingCount').then((response) => { //o count já traz do mongo a quantidade de billingCycles
          vm.pages = Math.ceil(response.data.value / 4) //o ceil arredonda para cima
          tabs.show(vm, {tabList: true, tabCreate: true})
        })
      })
    }

    vm.create = function() {
      $http.post(url, vm.billingCycle).then(function(response) { //chamada do callback para sucesso
        vm.refresh() //limpa o objeto
        messages.addSuccess('Operação realizada com sucesso!!!')
    }).catch(function(response){
      messages.addError(response.data.errors) //esse nome errors foi o nome que eu dei no back em billingCycleService.js
    })
  }

  vm.showTabUpdate = (billingCycle) => {
    vm.billingCycle = billingCycle
    vm.calculateValues()
    tabs.show(vm, {tabUpdate: true})
  }

  vm.showTabDelete = (billingCycle) => {
    vm.billingCycle = billingCycle
    vm.calculateValues()
    tabs.show(vm, {tabDelete: true})
  }

  vm.update = () => {
    const updateUrl = `${url}/${vm.billingCycle._id}`
    $http.put(updateUrl, vm.billingCycle).then((response) => {
      vm.refresh()
      messages.addSuccess('Alteração realizada com sucesso')
    }).catch((response) =>{
      messages.addError(response.data.errors)
    })
  }

  //esse método não recebe nenhum parâmetro, pois quando você clicou no botão excluir, o objeto já foi passada para vm.billingCycle
  vm.delete = () => {
    const deleteUrl = `${url}/${vm.billingCycle._id}`
    const objectName = vm.billingCycle.name
    $http.delete(deleteUrl, vm.billingCycle).then((response) => {
      vm.refresh()
      messages.addSuccess(`O registro ${objectName}, foi removido com sucesso`)
    }).catch((response) => {
      messages.addError(response.data.errors)
    })
  }

  vm.addCredit = (index) => {
    vm.billingCycle.credits.splice(index + 1, 0, {})
  }

  vm.cloneCredit = (index, {name, value}) => {
    vm.billingCycle.credits.splice(index + 1, 0, {name, value})
    vm.calculateValues()
  }

  vm.deleteCredit = (index) => {
    if (vm.billingCycle.credits.length > 1) {
      vm.billingCycle.credits.splice(index, 1)
      vm.calculateValues()
    }
  }

  vm.addDebt = (index) => {
    vm.billingCycle.debts.splice(index + 1, 0, {})
  }

  vm.cloneDebt = (index, {name, value, status}) => {
    vm.billingCycle.debts.splice(index + 1, 0, {name, value, status})
    vm.calculateValues()
  }

  vm.deleteDebt = (index) => {
    if (vm.billingCycle.debts.length > 1) {
      vm.billingCycle.debts.splice(index, 1)
      vm.calculateValues()
    }
  }

  vm.calculateValues = () => {
    vm.credit = 0
    vm.debt = 0

    if (vm.billingCycle) {
      vm.billingCycle.credits.forEach(({value}) => { //aqui eu faço um destruction pegando apenas o value do objeto
        vm.credit += !value || isNaN(value) ? 0 : parseFloat(value)
      })
      vm.billingCycle.debts.forEach(({value}) => { //aqui eu faço um destruction pegando apenas o value do objeto
        vm.debt += !value || isNaN(value) ? 0 : parseFloat(value)
      })
    }

    vm.total = vm.credit - vm.debt
  }

  vm.refresh()
}
})()

(function(){
  angular.module('app').controller('AuthCtrl', [
    '$location',
    'messages',
    AuthController
  ])

  function AuthController($location, messages) {
    const vm = this

    vm.loginMode = true

    //modifica a exibição de login ou novo usuário
    vm.changeMode = () => vm.loginMode = !vm.loginMode

    vm.login = () => {
      console.log(`Login... ${vm.user.email}`)
    }

    vm.signup = () => {
      console.log(`Signup... ${vm.user.email}`)
    }

    vm.getUser = () => ({ name: 'Usuário MOCK', email: 'mock@mock.com' })

    vm.logout = () => {
      console.log('Logout...')
    }
  }
})()

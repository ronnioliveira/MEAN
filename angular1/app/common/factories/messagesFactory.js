(function(){
  angular.module('app').factory('messages', [
    'toastr',
    MessagesFactory
  ])

  function MessagesFactory(toastr) {

    function addMessage(messages, title, toastrMethod) {
      if (messages instanceof Array) {
        messages.forEach(message => toastr[toastrMethod](message, title))
      } else {
        toastr[toastrMethod](messages, title)
      }
    }

    function addSuccess(messages) {
      addMessage(messages, 'Sucesso', 'success')
    }

    function addError(messages) {
      addMessage(messages, 'Erro', 'error')
    }

    function addWarning(messages) {
      addMessage(messages, 'Atenção', 'warning')
    }

    return {addSuccess, addError, addWarning} //como é uma factory, eu tenho que exportar todos os métodos que eu quero que possam ser consumidos
  }

})()

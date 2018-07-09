const BillingCycle = require('../billingCycle/billingCycle')

//estou criando uma nova rota com o nome 'count' que tem como callback um middleware. Essa rota .route tem a ver com o express
function billingCount(req, res){
  //aqui eu acesso o método count do mongoDB e passo uma função de callback que vai receber a resposta do banco de dados
  BillingCycle.count(function(error, value){
    if (error) {
      res.status(500).json({errors: [error]})
    } else {
      res.json({value})
    }
  })
}

module.exports = { billingCount }

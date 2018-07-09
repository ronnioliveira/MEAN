const BillingCycle = require('./billingCycle')
const _ = require('lodash')

//aqui será criada a minha api REST para os métodos get, post, put e delete. Isso é criado pelo nodeRestful
BillingCycle.methods(['get', 'post', 'put', 'delete'])

//sempre que fizer um update, irá retornar o objeto novo, com  a alteração já feita. o runValidators diz que devem ser feitas todas as validações especificadas no BillingCycle.js na hora de fazer o update
BillingCycle.updateOptions({new: true, runValidators: true})

BillingCycle.after('post', sendErrorOrNext).after('put', sendErrorOrNext)

function sendErrorOrNext(req, res, next){
  //os erros gerados ficam dentro do bundle do nodeRestful
  const bundle = res.locals.bundle;

  if (bundle.errors) {
    var errors = parseErrors(bundle.errors);
    res.status(500).json({errors});
  } else {
    next();
  }
}

function parseErrors(nodeRestfulErrors) {
  const errors = [];
  _.forIn(nodeRestfulErrors, error => errors.push(error.message));
  return errors;
}


//estou criando uma nova rota com o nome 'count' que tem como callback um middleware. Essa rota .route tem a ver com o express
BillingCycle.route('count', function(req, res, next){
  //aqui eu acesso o método count do mongoDB e passo uma função de callback que vai receber a resposta do banco de dados
  BillingCycle.count(function(error, value){
    if (error) {
      res.status(500).json({errors: [error]})
    } else {
      res.json({value})
    }
  })
})

module.exports = BillingCycle

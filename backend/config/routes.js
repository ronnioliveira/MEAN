
const express = require('express')

module.exports = function(server) {

  // API Routes
  const router = express.Router()
  server.use('/api', router)

  // rotas da API
  const billingCycleService = require('../api/billingCycle/billingCycleService')
  billingCycleService.register(router, '/billingCycles')

  const billingSummaryService = require('../api/billingSummary/billingSummaryService')
  router.route('/billingSummary').get(billingSummaryService.getSummary)

  const billingCountService = require('../api/billingCount/billingCountService')
  router.route('/billingCount').get(billingCountService.billingCount)
}





/*const express = require('express')
//const auth = require('./auth') //importação do middleware de autenticação

module.exports = function(server){

  /*
  Rotas que estarão abertas
  */
/*
  const openApi = express.Router()  
  server.use('/oapi', openApi)

  const AuthService = require('../api/user/authService')  
  openApi.post('/login', AuthService.login)  
  openApi.post('/signup', AuthService.signup)  
  openApi.post('/validateToken', AuthService.validateToken)
*/

  /*
  Rotas fechadas
  */
  //API routes


/*  const protectedApi = express.Router()

  //middleware que será chamado sempre que existir api na url
  //estou dizendo que sempre terá que ter a /api para conseguir fazer a rota definida abaixo
  server.use('/api', protectedApi)

  /*uso o router do express e digo qual é a rota '/teste', qual é o método 'get' e passo uma função middleware
  router.route('/teste').get(function(req, res, next){
    res.send('funcionou')
  })*/

  //protectedApi.use(auth)

  // rotas da API


/*
  const billingCycleService = require('../api/billingCycle/billingCycleService')

  //register é um método node restful que diz todos os serviços irão utilizar como url raiz 'billingCycles' e registra todas as rotas que forem criadas
  billingCycleService.register(router, '/billingCycles')

  const billingSummaryService = require('../api/billingSummary/billingSummaryService')
  router.route('/billingSummary').get(billingSummaryService.getSummary)

  const billingCountService = require('../api/billingCount/billingCountService')
  router.route('/billingCount').get(billingCountService.billingCount)
}

/*
Primeiro fizemos o mapeamento no arquivo billingCycle.js. Isso deve ser feito para que o mongoose saiba o que e como deve ser persistido no mongo
Depois no arquivo billingCycleService dissemos que serão criadas serviços REST para os verbos http get, post, put e delete
Depois aqui na linha 19, mandamos registrar o router do express que está na linha 5 e dizemos que nossa url base é 'billingCycles'

*/

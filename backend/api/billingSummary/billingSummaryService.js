const _ = require('lodash')
const BillingCycle = require('../billingCycle/billingCycle')

//middleware
function getSummary(req, res){
  //a função aggregate é do mongoose
  BillingCycle.aggregate([{
    //essa função $project pode ser vista na documentação do mongoDB
    $project: {credit: {$sum : "$credits.value"}, debt: {$sum: "$debts.value"}}
  }, {
    //com o _id: null vai agregar todos os dados em um único registro, pois não especifiquei nenhum critério
    $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
  }, {
    //No agrupamento acima é obrigatório o uso do _id, então essa linha exclui a exibição do _id, mostrando apenas credit e debit
    $project: {_id: 0, credit: 1, debt: 1}
  }]).exec((error, result) =>{
    if (error) {
      res.status(500).json({errors: [error]})
    } else {
      res.json(result[0] || {credit: 0, debt: 0})
    }
  })
}

module.exports = { getSummary }

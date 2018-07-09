
const restful = require('node-restful'); //facilita a forma de expor uma api REST para frontend
const mongoose = restful.mongoose;

const creditSchema = new mongoose.Schema({
  name: {type: String, required: true },
  value: {type: Number, min: 0, required: true }
})

const debtSchema = new mongoose.Schema({
  name: {type: String, required: true},
  value: {type: Number, min: 0, required: [true, 'Informe o valor do débito!']},
  status: {type: String, required: false, uppercase: true, enum:['PAGO','PENDENTE','AGENDADO']}
})

const billingCycleSchema = new mongoose.Schema({
  name: {type: String, required: true },
  month: {type: Number, required: true, min:1, max:12},
  year: {type:Number, min: 1970, max:2100, required: true},
  credits: [creditSchema],
  debts: [debtSchema]
})

//expostando um model a partir de billingCycleSchema com o nome BillingCycle
module.exports = restful.model('BillingCycle', billingCycleSchema)

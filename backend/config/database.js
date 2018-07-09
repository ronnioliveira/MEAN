const mongoose = require('mongoose')
module.exports = mongoose.connect('mongodb://localhost/db_finance')

//aqui eu digo que para todas as mensagens de erro do tipo required essa será a mensagem, se não houver nada especificado no mapeamento em billingCycle.js
mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'."
mongoose.Error.messages.String.enum = "O '{VALUE}' não é válido para o atributo '{PATH}'"

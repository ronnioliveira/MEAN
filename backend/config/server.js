const port = 3003;

const bodyParser = require('body-parser');//var fazer o parse do que chega, por exemplo transformar um JSON em objeto
const express = require('express');//O express é fortemente baseado no conceito de middleware
const server = express(); //servidor do express
const allowCors = require('./cors');
const queryParser = require('express-query-int')//serve para converter para inteiro os valores que vem como parâmetro na url

//server.use(), Quando usa-se uma função assim, sem passar url, diz que toda a requisição que chegar, independente de url vai passar por esse middleware

//esses dois midlewares abaixo serão utilizados para todas as requisições, pois não está passando nenhuma URL específica.
server.use(bodyParser.urlencoded({extended: true})); //quando você submete um formulário, por exemplo, do frontend ele vem no formato urlencoded. Essa linha diz que o bodyparser poderá interpretar mais do que o padrão
server.use(bodyParser.json()) //Se os dados que foram submetidos, não são do formato suportado pela linha acima, então será verificado se o body é um JSon. Se for um json, então ele transforma isso em um objeto.
server.use(allowCors) //permitir fazer requisição de um domínio diferente do domínio da API
server.use(queryParser())

server.listen(port, function(){ //faço o servidor escutar a porta declarada na constante
  console.log(`BACKEND is running on port ${port}.`);
})

module.exports = server

//criação de um midlewares
/*
server.use(function(req, res, next){
  console.log('meu middleware 1');
  next();
})

server.use(function(req, res, next){
  console.log('meu middleware 2');
  res.send('Funcionou Novamente!!!')
})
*/

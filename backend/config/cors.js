
//como eu tenho duas aplicações separadas, rodando em portas diferentes, eu tenho que dizer que
//a aplicação do back estará acessível para requisições externas
//essa informações eu encontro em developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
module.exports = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'),
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'),
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'),
  next() //preciso fazer esse next para que o que foi aplicado não morra aqui e vá para o próximo middleware
}

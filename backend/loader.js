const server = require('./config/server');
require('./config/database');

//retorna o que foi atribuido ao exports do arquivo routes.js
require('./config/routes')(server)//passando como parametro o server que está dentro do arquivo server.js e está sendo exportado e obtido na linha 1 

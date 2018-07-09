//esse arquivo será responsável por proteger alguns webservices do sistema

const jwt = require('jsonwebtoken')
const env = require('../.env')
 
module.exports = (req, res, next) => {
  // CORS preflight request  
  if(req.method === 'OPTIONS') { //verifica se a requisição é feita de uma aplicação externa, pois quando uma aplicação externa faz uma requisição ela manda um OPTIONS e a partir disso dizermos para ela, quais são os métodos que estarão disponíveis para serem consumidos  
    next()  
  } else {  
    const token = req.body.token || req.query.token || req.headers['authorization']

    if(!token) {  
      return res.status(403).send({errors: ['No token provided.']})  
    }

    jwt.verify(token, env.authSecret, function(err, decoded) {  
      if(err) {  
        return res.status(403).send({  
          errors: ['Failed to authenticate token.']  
        })  
      } else {  
        //req.decoded = decoded  
        next()  
      }  
    })  
  }
}

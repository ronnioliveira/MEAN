const _ = require('lodash')
const jwt = require('jsonwebtoken') //responsável pelo token
const bcrypt = require('bcrypt') //ira salvar a senha do usuário criptografada
const User = require('./user')
const env = require('../../.env') //para obter o authSecret para gerar o token

const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,12})/

const sendErrorsFromDB = (res, dbErrors) => {//tratar erros do banco de dados
  const errors = []  
  _.forIn(dbErrors.errors, error => errors.push(error.message))  
  return res.status(400).json({errors})
}

const login = (req, res, next) => { //middleware de login  
  const email = req.body.email || ''
  const password = req.body.password || ''

  User.findOne({email}, (err, user) => {//busco um usuário esperando receber um erro ou o usuário
    if(err) {
      return sendErrorsFromDB(res, err)
    } else if (user && bcrypt.compareSync(password, user.password)) { //comparo a senha que veio com a criptografada. Esse método consegue verificar se o hash de senha que está vindo é compatível com a senha digitada
      const token = jwt.sign(user, env.authSecret, { //utilizo o authSecret para criar o token
        expiresIn: "1 day"  
      })  
      const { name, email } = user  
      res.json({ name, email, token }) //respondo o nome, email e token
    } else { //caso não retone usuário ou erro ou nenhuma das duas
      return res.status(400).send({errors: ['Usuário/Senha inválidos']})  
    }  
  })
}

const validateToken = (req, res, next) => {  //validação do token caso o usuário feche o browser e tente abrir novamento. A validade é de um dia como descrito acima
  const token = req.body.token || ''  //pego o token do body da requisição
  jwt.verify(token, env.authSecret, function(err, decoded) { //faço a verificação com o jwt passando o token e o authSecret
    return res.status(200).send({valid: !err})  
  })
}

const signup = (req, res, next) => {  
  const name = req.body.name || ''  
  const email = req.body.email || ''  
  const password = req.body.password || ''  
  const confirmPassword = req.body.confirm_password || ''

  if(!email.match(emailRegex)) {//validação do e-mail válido pelo regex
    return res.status(400).send({errors: ['O e-mail informado está inválido']})  
  }

  if(!password.match(passwordRegex)) {  //validação do password válido pelo regex
    return res.status(400).send({errors: [  
      "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-12."  
    ]})  
  }

  const salt = bcrypt.genSaltSync() //valor gerado pelo bcrypt para gerar o hash da senha. Cada hash é gerado a partir da senha digita e para a mesma senha podem existir vários hashs
  const passwordHash = bcrypt.hashSync(password, salt)  

  if(!bcrypt.compareSync(confirmPassword, passwordHash)) {  
    return res.status(400).send({errors: ['Senhas não conferem.']})  
  }

  User.findOne({email}, (err, user) => { //faço a consulta pra ver se já existe um e-mail cadastrado
    if(err) {  
      return sendErrorsFromDB(res, err)  
    } else if (user) {  
      return res.status(400).send({errors: ['Usuário já cadastrado.']})  
    } else {  
      const newUser = new User({ name, email, password: passwordHash })  
      newUser.save(err => { //crio novo usuário com nome, email e senha criptografada
        if(err) {  
          return sendErrorsFromDB(res, err)  
        } else {  
          login(req, res, next) //se cadastrou com sucesso, já faço o login do usuário
        }  
      })  
    }  
  })
}

module.exports = { login, signup, validateToken }

const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')


function secureRoute(req, res, next){
  const authToken = req.headers.authorization
  if (!authToken || !authToken.startsWith('Bearer')) {
    return res.status(401).send({ message: 'Unauthorized, Invalid/No Token' })
  }

  const token = authToken.replace('Bearer ', '')

  jwt.verify(token, secret, (err, payload) => {
    if (err) return res.status(401).send({ message: 'Unauthorized, Bad/Expired Token' })
    const userId = payload.sub
    User 
      .findById(userId)
      .then(user => {
        if (!user) return res.status(401).send({ message: 'Unauthorized, User Not Found' })
        req.currentUser = user
        next()
      })
      .catch(() => res.status(401).send({ message: 'Unauthorized, an error occurred.' }))
  })


}

module.exports = secureRoute
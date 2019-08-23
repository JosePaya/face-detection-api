const handleRegister = (req, res, db, bcrypt) => {
  const { firstname, lastname, email, password } = req.body

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json('Incorrect details provided for registration')
  }

  bcrypt.hash(password, null, null, function (err, hash) {
    db.transaction(function (tran) {
      return tran
        .insert({ hash, email })
        .into('login')
        .returning('email')
        .then(loginEmail => {
          return tran('user')
            .returning('*')
            .insert({
              firstname: firstname,
              lastname: lastname,
              email: loginEmail[0],
              joinedon: new Date()
            })
            .then(user => res.json(user[0]))
        })
        .catch(() => {
          tran.rollback
          res.status(400).json('Unable to register login details')
        })
    })
  })
}

module.exports = {
  handleRegister
}
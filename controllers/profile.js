const handleProfileGet = (req, res, db) => {
  const { id } = req.params

  db('user').where({ id })
    .then(user => {
      if (user.length) {
        res.json(user)
      } else {
        res.status(400).json('User not found')
      }
    })
    .catch(() => res.status(400).json('Error retrieving user from database'))
}

module.exports = {
  handleProfileGet: handleProfileGet
}
const handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json('Insufficient Login details provided')
    }

    db.select('hash')
        .from('login')
        .where('email', '=', email)
        .then(hashResult => {
            if (hashResult.length) {
                bcrypt.compare(password, hashResult[0].hash, function (err, response) {
                    response === true
                        ? db('user').where('email', email).then(user => res.json(user[0]))
                        : res.status(400).json(`Invalid password for ${email}`)
                });
            } else {
                res.status(400).json('User does not exist')
            }
        })
        .catch(() => res.status(400).json('An error occurred during login process'))
}

module.exports = {
    handleSignin
}
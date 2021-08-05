const bcrypt = require('bcryptjs');

const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body

      for (let i = 0; i < users.length; i++) {
        const passConf = bcrypt.compareSync(password, users[i].passHash)
        if (users[i].username === username && passConf) {
          res.status(200).send(users[i])
        } else {
          res.status(400).send("User not found.")
        }
      }
      
    },
    register: (req, res) => {
        console.log('Registering User')

        const { username, email, firstName, lastName, password } = req.body

        const salt = bcrypt.genSaltSync(10);
        const passHash = bcrypt.hashSync(password, salt);

        const newUser = {
          username,
          email,
          firstName,
          lastName,
          passHash
        }
        users.push(newUser)
        let visibleNewUser = {...newUser}
        delete visibleNewUser.passHash
        res.status(200).send(visibleNewUser)
    }
}
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require("../jokes/jokes-model");
const restrict = require("../auth/authenticate-middleware")
const secrets = require('../config/secrets');

router.post('/register', async (req, res, next) => {

  const user = req.body;

  // const salt = bcrypt.genSaltSync(8)

  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    })
});

router.post('/login', async (req, res, next) => {
  let { username, password } = req.body;

  // console.log(req.body)

  Users.findBy({ username })
    .first()
    .then(user => {

      // console.log(user)

      if (user && bcrypt.compareSync(password, user.password)) {
        console.log(req.session.user)
        req.session.user = username;
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'invalid credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;

const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    console.log('hit router.post(login)')
    const { email, password } = req.body;
    res.send({ token: await User.authenticate({ email, password })});
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    console.log(req)
    const { firstName, lastName, email, password } = req.body;
    console.log(firstName, lastName, email, password)
    const user = await User.create({ firstName, lastName, email, password });
    console.log(user)
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

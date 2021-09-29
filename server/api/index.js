const router = require('express').Router();
const guestUserRouter = require('./guestUsers');
const userRouter = require('./users');
const albumsRouter = require('./albums');
const cartRouter = require('./cart');

router.use('/admin/users', userRouter);
router.use('/guestusers', guestUserRouter);
router.use('/albums', albumsRouter);
router.use('/cart', cartRouter);

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;

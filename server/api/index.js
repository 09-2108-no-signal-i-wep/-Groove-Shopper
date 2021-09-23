const router = require("express").Router();
const usersRouter = require("./users");
const albumsRouter = require("./albums");

router.use("/users", usersRouter);
router.use("/albums", albumsRouter);

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;

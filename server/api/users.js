const userRouter = require("express").Router();

const User = require("../db/models/User");

// Path: /api/admin/users
userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "firstName", "lastName", "email"],
    });
    res.send(users);
  } catch (err) {
    next(err);
  }
});

userRouter.delete("/", async (req, res, next) => {
  try {
    const toBeDeleteUser = await User.findByPk(req.body.id);
    await toBeDeleteUser.destroy();
    res.send(toBeDeleteUser);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/:userId", async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId, {
      attributes: ["id", "firstName", "lastName", "email", "isAdmin"],
    });
    res.send(singleUser);
  } catch (error) {
    next(error);
  }
});

userRouter.put("/:userId", async (req, res, next) => {
  try {
    const updateUserAdmin = await User.findByPk(req.params.userId);
    await updateUserAdmin.update(req.body);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;

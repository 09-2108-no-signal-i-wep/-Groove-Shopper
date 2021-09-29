const userRouter = require("express").Router();
const {
  models: { User },
} = require("../db");
const { requireToken } = require("./userMiddleware");

// Path: /api/admin/users
userRouter.get("/", requireToken, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const users = await User.findAll({
        // explicitly select only the id and username fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ["id", "firstName", "lastName", "email"],
      });
      res.send(users);
    } else {
      res.status(403).send("Access Denied");
    }
  } catch (err) {
    next(err);
  }
});

userRouter.delete("/", requireToken, async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send("how dare u");
    }
    const toBeDeleteUser = await User.findByPk(req.body.id);
    await toBeDeleteUser.destroy();
    res.send(toBeDeleteUser);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/:userId", requireToken, async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send("Please go away");
    }
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
    if (!req.user.isAdmin) {
      return res.status(403).send("absolutely not");
    }
    const updateUserAdmin = await User.findByPk(req.params.userId);
    await updateUserAdmin.update(req.body);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;

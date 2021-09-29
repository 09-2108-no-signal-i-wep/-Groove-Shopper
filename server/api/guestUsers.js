const guestUserRouter = require("express").Router();
const {
  models: { User },
} = require("../db");

//Path: /api/guestusers/emails
guestUserRouter.get("/emails", (req, res, next) => {
  User.findAll({
        attributes: ["email"],
        raw: true
      })
      .then((accounts) => res.send(accounts.map(account => account.email)))
      .catch((err) => next(err));
  });

module.exports = guestUserRouter;




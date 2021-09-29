const { INTEGER, BOOLEAN, DATE } = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  userId: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isCart: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  // total: {
  //   type: INTEGER,
  //   allowNull: false,
  // },
  date: {
    type: DATE,
    allowNull: false,
    defaultValue: Date.now(),
  },
});

module.exports = Order;

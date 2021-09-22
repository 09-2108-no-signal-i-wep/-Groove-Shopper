const { STRING, TEXT } = require("sequelize");
const db = require("../db");

const Artist = db.define("artist", {
  name: {
    type: STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  bio: {
    type: TEXT,
    // allowNull: false,
  },
});

module.exports = Artist;

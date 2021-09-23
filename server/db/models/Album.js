const { STRING, DECIMAL, INTEGER, TEXT } = require("sequelize");
const db = require("../db");

const Album = db.define("album", {
  genreId: {
    type: INTEGER,
    // allowNull: false,
    // validate: { notEmpty: true },
  },
  title: {
    type: STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  artistId: {
    type: INTEGER,
    allowNull: false,
    validate: { notEmpty: true },
  },
  price: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 1999,
    validate: { notEmpty: true },
  },
  releaseYear: {
    type: INTEGER,
    allowNull: false,
    validate: { notEmpty: true },
  },
  cover: {
    type: TEXT,
    allowNull: false,
    validate: { notEmpty: true },
  },
});

module.exports = Album;

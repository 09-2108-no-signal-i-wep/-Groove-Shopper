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
    defaultValue:
      "https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/514dc845-04f5-4538-8a4f-869b64243265/1-2.jpg",
  },
});

module.exports = Album;

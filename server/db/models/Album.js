const { STRING, INTEGER, TEXT } = require("sequelize");
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
  // artistId: {
  //   type: INTEGER,
  //   allowNull: false,
  //   validate: { notEmpty: true },
  // },
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
      "https://ctl.s6img.com/society6/img/NRs_DGWuFscSGOFMDBShBAJrlFc/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/be717f86046f43bca5d182d47aaf9d2d/~~/vinyl-record808704-prints.jpg",
  },
});

module.exports = Album;

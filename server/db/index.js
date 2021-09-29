//this is the access point for all things database related!
const db = require("./db");

const User = require("./models/User");
const Album = require("./models/Album");
const Order = require("./models/Order");
const Artist = require("./models/Artist");
const Genre = require("./models/Genre");
const OrderAlbum = require("./models/OrderAlbum");

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);

Album.belongsToMany(Order, {
  through: OrderAlbum,
});
Order.belongsToMany(Album, {
  through: OrderAlbum,
});

Artist.hasMany(Album);
Album.belongsTo(Artist, { foreignKey: "artistId" });

Album.hasOne(Genre);
Genre.belongsTo(Album);

module.exports = {
  db,
  models: {
    User,
    Album,
    Order,
    Artist,
    Genre,
  },
};

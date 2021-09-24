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

// const showMagicMethods = async () => {
//   const order = await Order.create({
//     userId: 1,
//     isCart: true,
//     total: 5000,
//   });

//   const album = await Album.create({
//     title: "Flying Microtonal Banana",
//     artistId: 1,
//     price: 1099,
//     releaseYear: 2007,
//     cover: "https://f4.bcbits.com/img/a2731568276_10.jpg",
//   });
//   console.log("AHHHH", order, album);
//   await order.addAlbum(album);

//   console.log("TEST ORDER", order);
//   //console.log('METHODS', order.__proto__)
// };

//showMagicMethods();

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

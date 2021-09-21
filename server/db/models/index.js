const User = require('./User');
const Album = require('./Album');
const Order = require('./Order');
const Artist = require('./Artist');
const Genre = require('./Genre');
const OrderAlbum = require('./OrderAlbum');

User.hasMany(Order);
Order.belongsTo(User);

Album.belongsToMany(Order, {through: OrderAlbum});
Order.belongsToMany(Album, {through: OrderAlbum});

Album.hasOne(Artist);
Artist.belongsTo(Album);

Album.hasOne(Genre);
Genre.belongsTo(Album);

module.exports = {
    User,
    Album,
    Order,
    Artist,
    Genre,
}

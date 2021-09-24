const {INTEGER } = require('sequelize');
const db = require('../db');

const OrderAlbum = db.define('orderAlbum', {
    quantity: {
        type: INTEGER,
        allowNull: false
    },
    cost: {
        type: INTEGER,
        defaultValue: 0
    }
});

module.exports = OrderAlbum;

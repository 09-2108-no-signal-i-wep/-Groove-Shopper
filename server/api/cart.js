const cart = require('express').Router();

const { models: { Album, Order, OrderAlbum } } = require('../db');

// Path: /api/cart/:userId
cart.get('/:userId', (req, res, next) => {
    Order.findAll({
        where: {
            userId: req.params.userId,
            isCart: true
        },
        include: [
            {
                model: Album, as: 'products'
            }
        ]
    })
        .then((data) => res.send(data))
        .catch((err) => next(err));
});

// PUT /api/cart/
cart.put('/', async (req, res, next) => {
    try {
        const userOrder = await Order.findOne({
            where: {
                userId: req.params.userId,
                isCart: true
            }
        });
        const updateSingleOrderAlbum = await OrderAlbum.findOne({
            where: {
                orderId: userOrder.id,
                albumId: req.body.id
            }
        })
        updateSingleOrderAlbum.quantity = req.body.quantity;
        await updateSingleOrderAlbum.save()
        res.sendStatus(204);
        } catch (error) {
        next(error);
        }
});

// PUT /api/cart/:albumId
cart.delete('/:albumId', async (req, res, next) => {
    OrderAlbum.findByPk(req.params.id)
        .then((product) => {
            product.destroy();
            res.status(200).send(product);
        })
        .catch((err) => next(err));
});

// PUT /api/cart/:userid/checkout
cart.put('/:userid/checkout', (req, res, next) => {
    Order.findOne({
        where: {
            userId: req.params.userId,
            isCart: true
        }})
        .then((userOrder) => {
            userOrder.update({ isCart: false});
            res.send(userOrder);
        })
        .catch((err) => next(err));
});

module.exports = cart;

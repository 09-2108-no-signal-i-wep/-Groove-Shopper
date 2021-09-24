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
                model: Album,
            }
        ]
    })
        .then((data) => res.send(data))
        .catch((err) => next(err));
});

// POST /api/cart/:userId

// PUT /api/cart/ -- updates quantity in cart
cart.put('/:userId', async (req, res, next) => {
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

// PUT /api/cart/:userId -- deletes an album in the cart
cart.put('/:userId', async (req, res, next) => {

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

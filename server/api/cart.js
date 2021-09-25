const cart = require("express").Router();

const {
  models: { Album, Order },
} = require("../db");

const OrderAlbum = require("../db/models/OrderAlbum");

// Path: /api/cart/:userId\
// WORKS!!
cart.get("/:userId", (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.userId,
      isCart: true,
    },
    include: [
      {
        model: Album,
      },
    ],
  })
    .then((data) => res.send(data))
    .catch((err) => next(err));
});

// POST /api/cart/:userId - ADD TO CART. This creates a new set of ORDER-Album (Details)
// WORKS!
cart.post("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const userOrder = await Order.findOne({
      where: {
        userId: userId,
        isCart: true,
      },
    });
    const newOrderDetail = await OrderAlbum.create({
      // want to add conditional if you click add to cart a second time
      orderId: userOrder.userId,
      albumId: req.body.albumId,
      quantity: req.body.quantity,
      cost: req.body.cost,
    });

    res.send(newOrderDetail);
  } catch (error) {
    console.log("cart POST error");
    next(error);
  }
});

// PUT /api/cart/:userId -- updates quantity in cart - WORKS (MOSTLY) see below about updating cost
cart.put("/:userId", async (req, res, next) => {
  try {
    const userOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        isCart: true,
      },
    });

    const updateSingleOrderAlbum = await OrderAlbum.findOne({
      where: {
        orderId: userOrder.id,
        albumId: req.body.albumId,
      },
    });
    updateSingleOrderAlbum.quantity = req.body.quantity; // need to update cost;
    await updateSingleOrderAlbum.save();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// PUT /api/cart/:userId -- deletes an album in the cart
// SHOULD THIS BE A DELETE INSTEAD OF A PUT??

// cart.put("/:userId", async (req, res, next) => {
//   try {
//     // find the order based on userId where cart is true;
//     const userOrder = await Order.findOne({
//       where: {
//         userId: req.params.userId,
//         isCart: true,
//       },
//     });
//     console.log('USERORDER', userOrder)
//     console.log('REQ BODY', req.body)
//     // find the associated orderAlbum table row;
//     const deleteSingleOrderAlbum = await OrderAlbum.findOne({
//       where: {
//         orderId: userOrder.id,
//         albumId: req.body,
//       },
//     });

//     await deleteSingleOrderAlbum.destroy();
//     res.status(200).send(deleteSingleOrderAlbum);
//   } catch (error) {
//     console.log("Delete from cart error API");
//     next(error);
//   }

// OrderAlbum.findByPk(req.params.id)
//     .then((product) => {
//         product.destroy();
//         res.status(200).send(product);
//     })
//     .catch((err) => next(err));
//});

/*
CHECKOUT PROCESS
Since each user starts out with an empty cart, the checkout button needs to do two things.
1. Change current cart to 'isCart = false' to set the current order into a completed order (used later for order history)
2. Create a brand new cart that is empty, waiting for the next user order

PUT updates it (#1)
POST creates a new one with isCart = true (#2)

*/

// PUT /api/cart/:userid/checkout -- Changes order from cart to completed
// WORKS
cart.put("/:userId/checkout", async (req, res, next) => {
  try {
    const userOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        isCart: true,
      },
    });

    userOrder.isCart = false;
    await userOrder.save();
    res.sendStatus(204);
  } catch (error) {
    console.log("API CHECKOUT ERROR");
    next(error);
  }
});

// WORKS!!
cart.post("/:userId/checkout", async (req, res, next) => {
  try {
    const newOrder = Order.create({ userId: req.params.userId, isCart: true, total: 0 });
    console.log(newOrder);
    res.send(newOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = cart;

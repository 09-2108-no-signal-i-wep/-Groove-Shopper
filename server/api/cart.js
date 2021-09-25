const cart = require("express").Router();

const {
  models: { Album, Order },
} = require("../db");

const OrderAlbum = require("../db/models/OrderAlbum");

// Path: /api/cart/:userId
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

    //console.log("NEWORDER", newOrderDetail);
    res.send(newOrderDetail); // unsure about this. Also need to update total in userOrder (cart);
  } catch (error) {
    console.log("cart POST error");
    next(error);
  }
});

// PUT /api/cart/:userId -- updates quantity in cart
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
        albumId: req.body.id,
      },
    });
    updateSingleOrderAlbum.quantity = req.body.quantity;
    await updateSingleOrderAlbum.save();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// PUT /api/cart/:userId -- deletes an album in the cart
cart.put("/:userId", async (req, res, next) => {
  try {
    // find the order based on userId where cart is true;
    const userOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        isCart: true,
      },
    });
    // find the associated orderAlbum table row;
    const deleteSingleOrderAlbum = await OrderAlbum.findOne({
      where: {
        orderId: userOrder.id,
        albumId: req.body.id,
      },
    });

    await deleteSingleOrderAlbum.destroy();
    res.status(200).send(deleteSingleOrderAlbum);
  } catch (error) {
    console.log("Delete from cart error API");
    next(error);
  }

  // OrderAlbum.findByPk(req.params.id)
  //     .then((product) => {
  //         product.destroy();
  //         res.status(200).send(product);
  //     })
  //     .catch((err) => next(err));
});

// PUT /api/cart/:userid/checkout -- Changes order from cart to completed
cart.put("/:userid/checkout", async (req, res, next) => {
  try {
    const userOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        isCart: true,
      },
    });

    userOrder.isCart = false;
    // need to create another user order that is empty
    res.send(userOrder);
  } catch (error) {
    console.log("API CHECKOUT ERROR");
    next(error);
  }

  // Order.findOne({
  //   where: {
  //     userId: req.params.userId,
  //     isCart: true,
  //   },
  // })
  //   .then((userOrder) => {
  //     userOrder.update({ isCart: false });
  //     res.send(userOrder);
  //   })
  //   .catch((err) => next(err));
});

cart.post("/:userId", async (req, res, next) => {
  try {
    const newOrder = Order.create({ userId: req.params.userId, isCart: true });
    res.send(newOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = cart;

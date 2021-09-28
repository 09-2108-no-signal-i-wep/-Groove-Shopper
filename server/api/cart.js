const cart = require("express").Router();

const {
  models: { Album, Order, Artist },
} = require("../db");
const OrderAlbum = require("../db/models/OrderAlbum");
const { requireToken } = require("./userMiddleware");

// Path: /api/cart/user
cart.get("/user/:userId", (req, res, next) => {
  Order.findOne({
    where: {
      userId: req.params.userId,
      isCart: true,
    },
    include: [
      {
        model: Album,
        include: [Artist],
      },
    ],
  })
    .then((data) => res.send(data))
    .catch((err) => next(err));
});

// POST /api/cart/add - ADD TO CART. This creates a new set of ORDER-Album (Details)

cart.post("/add", async (req, res, next) => {
  try {
    console.log("boddy", req.body);
    const { albumId, quantity, cost, userId } = req.body;

    const userOrder = await Order.findOrCreate({
      where: {
        userId: userId,
        isCart: true,
      },
      defaults: {
        total: 0,
      },
    });

    await OrderAlbum.create({
      orderId: userOrder[0].id,
      albumId: albumId,
      quantity: quantity,
      cost: cost,
    });

    const newOrderDetail = await OrderAlbum.findOne({
      where: {
        orderId: userOrder[0].id,
      },
    });

    console.log("nnew new", newOrderDetail);

    res.send(newOrderDetail);
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
cart.delete("/remove/:albumId", requireToken, async (req, res, next) => {
  try {
    const { albumId } = req.params;

    // find the order based on userId where cart is true;
    const userOrder = await Order.findOne({
      where: {
        userId: req.user.id,
        isCart: true,
      },
    });
    // find the associated orderAlbum table row;
    const deleteSingleOrderAlbum = await OrderAlbum.findOne({
      where: {
        orderId: userOrder.id,
        albumId: albumId,
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
cart.put("/:userid/checkout", requireToken, async (req, res, next) => {
  try {
    const userOrder = await Order.findOne({
      where: {
        userId: req.user.Id,
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

module.exports = cart;

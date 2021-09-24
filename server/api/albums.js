const albumRouter = require("express").Router();

const {
  models: { Album, Artist },
} = require("../db");

// Path: /api/albums
albumRouter.get("/", async (req, res, next) => {
  try {
    const albums = await Album.findAll();
    res.send(albums);
  } catch (error) {
    next(error);
  }
});

// GET /api/albums/:albumId
albumRouter.get("/:albumId", async (req, res, next) => {
  try {
    console.log("in single album router");
    const singleAlbum = await Album.findByPk(req.params.albumId, {
      include: {
        model: Artist,
      },
    });
    res.json(singleAlbum);
  } catch (error) {
    console.log("GET single album error", error);
    next(error);
  }
});

// FOR ADMIN
// albumRouter.post('/', async(req, res, next) => {
//   try {
//     const newAlbum = await Album.create(req.body)
//     res.json(newAlbum)
//   } catch(error) {
//     next(error)
//   }})

module.exports = albumRouter;

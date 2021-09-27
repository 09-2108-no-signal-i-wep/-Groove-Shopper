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

/* *************** FOR ADMIN *************** */

albumRouter.delete("/", async (req, res, next) => {
  try {
    const toBeDeleted = await Album.findByPk(req.body.id);
    await toBeDeleted.destroy();
    res.send(toBeDeleted);
  } catch (error) {
    console.log("DELETE ALBUM ERROR", error);
    next(error);
  }
});

albumRouter.post("/", async (req, res, next) => {
  try {
    // find artist by name
    let artistSearch = await Artist.findOne({
      where: {
        name: req.body.name,
      },
    });

    // if !artist, make new artist
    if (!artistSearch) {
      artistSearch = await Artist.create({ name: req.body.name });
      res.send(artistSearch);
    }
    //make new album and with artist Id coming from artist
    const newAlbum = await Album.create({
      title: req.body.title,
      artistId: artistSearch.id,
      price: req.body.price,
      releaseYear: req.body.releaseYear,
      // need to upload cover art
    });

    res.json(newAlbum);
  } catch (error) {
    next(error);
  }
});

module.exports = albumRouter;

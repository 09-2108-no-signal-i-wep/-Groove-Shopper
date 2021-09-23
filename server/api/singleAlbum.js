// const singleAlbumRouter = require("express").Router();
// const Album = require("../db/models/Album");
// const Artist = require("../db/models/Artist");

// // /api/:albumId

// singleAlbumRouter.get("/:albumId", async (req, res, next) => {
//   try {
//     console.log('in single album router')
//     const singleAlbum = await Album.findByPk(req.params.albumId, {
//       include: {
//         model: Artist,
//       },
//     });
//     console.log('ahhhhh', singleAlbum)
//     res.json(singleAlbum);
//   } catch (error) {
//     console.log("GET single album error", error);
//     next(error);
//   }
// });

// module.exports = singleAlbumRouter;

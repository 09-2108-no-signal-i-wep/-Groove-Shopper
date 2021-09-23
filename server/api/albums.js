const router = require('express').Router();

const { models: { Album } } = require('../db');

// Path: /api/albums
router.get('/', async (req, res, next) => {
  try {
    const albums = await Album.findAll();
    res.send(albums);
  } catch (error) {
    next(error);
  }
});

// FOR ADMIN
// router.post('/', async(req, res, next) => {
//   try {
//     const newAlbum = await Album.create(req.body)
//     res.json(newAlbum)
//   } catch(error) {
//     next(error)
//   }})

module.exports = router;

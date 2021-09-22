const router = require('express').Router()
const { Album } = require('../db/models/Album')

// Path: /api/albums
router.get('/', async(req, res, next) => {
  try {
    const albums = await Album.findAll()
    res.json(albums)
  } catch(error) {
    next(error)
  }})


  // For admin
  // router.post('/', async(req, res, next) => {
  //   try {
  //     const newAlbum = await Album.create(req.body)
  //     res.json(newAlbum)
  //   } catch(error) {
  //     next(error)
  //   }})

  module.exports = router;

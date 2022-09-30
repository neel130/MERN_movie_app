const express = require('express');
const { createMovie, getAllMovies, singleMovie, updateMovie } = require('../controller/movieController');
const router = express.Router();

router.post('/new',createMovie);
router.get('/all',getAllMovies);
router.get('/:id',singleMovie);
router.put('/update/:id',updateMovie);


module.exports = router ;

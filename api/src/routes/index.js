const { Router } = require('express');
const videogames = require('./getVideogames');
const genres = require('./getGenres');

const router = Router();

router.use('/videogames', videogames);
router.use('/genres', genres);

module.exports = router;

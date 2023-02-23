const { Router } = require('express');
const videogames = require('./getVideogames');
const genres = require('./getGenres');
const platforms = require('./getPlatforms');

const router = Router();

router.use('/videogames', videogames);
router.use('/genres', genres);
router.use('/platforms', platforms);

module.exports = router;

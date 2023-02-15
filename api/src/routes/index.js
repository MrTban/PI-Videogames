const { Router } = require('express');
const videogames = require('./getVideogames');
const genres = require('./getGenres');
const platforms = require('./getPlatforms');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.use('/videogames', videogames);
router.use('/genres', genres);
router.use('/platforms', platforms);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;

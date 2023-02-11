const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const routerVideogames = require('./videogames');
const routerGenres = require('./genres');
const routerPlatforms = require('./platforms');
// const videogameDetail = require('./videogameDetail');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', routerVideogames);
router.use('/genres', routerGenres);
router.use('/platforms', routerPlatforms);
// router.use('/allvideogames', videogameDetail);

module.exports = router;

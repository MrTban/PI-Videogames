const { Router } = require('express');
const { Genre } = require('../db/db');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const routerGenres = Router();

routerGenres.get('/', async (req, res) => {
	try {
		const allGenres = await Genre.findAll();
		res.status(200).json(allGenres);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

routerGenres.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const findedGenre = await Genre.findByPk(id);
		if (findedGenre) {
			res.status(200).json(findedGenre);
		} else throw new Error(`Genre with id ${id} does not exist`);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

module.exports = routerGenres;

const { Router } = require('express');
const { KEY_NAME } = process.env;
const { Videogame } = require('../db/db');

const routerVideogames = Router();

routerVideogames.get('/', async (req, res) => {
	try {
		const allVideogames = await Videogame.findAll();
		res.status(200).json(allVideogames);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

module.exports = routerVideogames;

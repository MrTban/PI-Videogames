const { Router } = require('express');
const { Platform } = require('../db/db');

const routerPlatforms = Router();

routerPlatforms.get('/', async (req, res) => {
	try {
		const allPlatform = await Platform.findAll();
		res.status(200).json(allPlatform);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

routerPlatforms.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const findedPlatform = await Platform.findByPk(id);
		if (findedPlatform) {
			res.status(200).json(findedPlatform);
		} else throw new Error(`Platform with id ${id} does not exist`);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

module.exports = routerPlatforms;

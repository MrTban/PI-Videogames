const { Router } = require('express');
const { genresDb, postGenre } = require('../controllers/controllers');

const router = Router();

router.get('/', async (req, res) => {
	try {
		const allGenres = await genresDb();
		res.status(200).send(allGenres);
	} catch (error) {
		res.status(404).send({ error: error.message });
	}
});

router.post('/', async (req, res) => {
	try {
		const { name } = req.body;
		const newGenre = await postGenre(name);
		res.status(200).send(newGenre);
	} catch (error) {
		res.status(404).send({ error: error.message });
	}
});

module.exports = router;

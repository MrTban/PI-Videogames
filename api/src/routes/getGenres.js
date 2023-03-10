const { Router } = require('express');
const { genresApi } = require('../controllers/controllers');

const router = Router();

router.get('/', async (req, res) => {
	try {
		const allGenres = await genresApi();
		res.status(200).send(allGenres);
	} catch (error) {
		res.status(404).send({ error: error.message });
	}
});

module.exports = router;

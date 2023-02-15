const { Router } = require('express');
const { platformsDb, postPlatform } = require('./controllers');

const router = Router();

router.get('/', async (req, res) => {
	try {
		const allPlatforms = await platformsDb();
		res.status(200).send(allPlatforms);
	} catch (error) {
		res.status(404).send(error);
	}
});

router.post('/', async (req, res) => {
	try {
		const { name } = req.body;
		const newPlatform = await postPlatform(name);
		res.status(200).send(newPlatform);
	} catch (error) {
		res.status(404).send(error);
	}
});

module.exports = router;

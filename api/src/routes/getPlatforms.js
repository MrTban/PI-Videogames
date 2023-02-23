const { Router } = require('express');
const { platformsApi } = require('../controllers/controllers');

const router = Router();

router.get('/', async (req, res) => {
	try {
		const allPlatforms = await platformsApi();
		res.status(200).send(allPlatforms);
	} catch (error) {
		res.status(404).send({ error: error.message });
	}
});

module.exports = router;

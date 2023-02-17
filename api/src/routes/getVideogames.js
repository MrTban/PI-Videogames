const { Router } = require('express');
const axios = require('axios');
const { getInfoTotal, postVideoGame } = require('../controllers/controllers');
const { Videogame, Genre } = require('../db/db');
const { API_KEY } = process.env;

const router = Router();

router.get('/', async (req, res) => {
	const { name } = req.query;
	const allGames = await getInfoTotal();
	if (name) {
		const filterName = await allGames.filter((vg) =>
			vg.name.toLowerCase().includes(name.toLocaleLowerCase())
		);
		filterName.length
			? res.status(200).send(filterName)
			: res.status(404).send('Cannot find the game with this name');
	} else {
		res.status(200).json(allGames);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		if (isNaN(id)) {
			const game = await Videogame.findByPk(id, { include: Genre });
			res.status(200).json(game);
		} else {
			const gameApi = await axios.get(
				`https://api.rawg.io/api/games/${id}?key=${API_KEY}`,
				{
					headers: {
						'accept-encoding': '*',
					},
				}
			);
			const result = {
				id: gameApi.data.id,
				name: gameApi.data.name,
				description: gameApi.data.description_raw,
				rating: gameApi.data.rating,
				image: gameApi.data.background_image,
				released: gameApi.data.released,
				publishers: gameApi.data.publishers.map((pb) => pb.name),
				website: gameApi.data.website,
				genres: gameApi.data.genres.map((gen) => {
					return { id: gen.id, name: gen.name };
				}),
				platforms: gameApi.data.platforms.map((el) => el.platform.name),
				stores: gameApi.data.stores.map((s) => s.store.name),
				tags: gameApi.data.tags.map((t) => t.name),
			};
			res.status(200).json(result);
		}
	} catch (error) {
		res.status(404).send({ error: error.message });
	}
});

router.post('/', async (req, res) => {
	try {
		const objVideoGame = req.body;
		const newGame = await postVideoGame(objVideoGame);
		res.status(200).json(newGame);
	} catch (error) {
		res.status(404).send({ error: error.message });
	}
});

module.exports = router;

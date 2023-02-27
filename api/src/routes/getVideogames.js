const { Router } = require('express');
const axios = require('axios');
const { getAllGames, deleteGameById } = require('../controllers/controllers');
const { Videogame, Genre, Platform } = require('../db/db');
const { API_KEY } = process.env;

const router = Router();

router.get('/', async (req, res) => {
	try {
		const { name } = req.query;
		const allGames = await getAllGames();
		if (name) {
			const filterName = await allGames.filter((game) =>
				game.name.toLowerCase().includes(name.toLocaleLowerCase())
			);
			filterName.length
				? res.status(200).send(filterName)
				: res.status(404).send('Cannot find the game with this name');
		} else {
			res.status(200).send(allGames);
		}
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		if (isNaN(id)) {
			const game = await Videogame.findByPk(id, {
				include: {
					model: Platform,
					// attributes: ['name'],
					through: {
						attributes: [],
					},
				},
				include: {
					model: Genre,
					// attributes: ['name'],
					through: {
						attributes: [],
					},
				},
			});

			res.status(200).json(game);
		} else {
			const response = await axios.get(
				`https://api.rawg.io/api/games/${id}?key=${API_KEY}`
			);
			const result = {
				id: response.data.id,
				name: response.data.name,
				description: response.data.description_raw,
				rating: response.data.rating,
				image: response.data.background_image,
				released: response.data.released,
				publishers: response.data.publishers.map((pb) => pb.name),
				website: response.data.website,
				genres: response.data.genres.map((gen) => gen.name),
				platforms: response.data.platforms.map((el) => el.platform.name),
				stores: response.data.stores.map((s) => s.store.name),
				tags: response.data.tags.map((t) => t.name),
			};
			res.status(200).send(result);
		}
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

router.post('/', async (req, res) => {
	try {
		const { name, description, released, rating, image, platforms, genres } = req.body;

		if (!name || !description || !released || !rating || !platforms || !genres)
			throw new Error('Mandatory data missing');

		const newGame = await Videogame.create({
			name,
			description,
			released,
			rating,
			image,
		});
		platforms.map(async (p) => {
			const [platformDB, created] = await Platform.findOrCreate({
				where: {
					name: p,
				},
			});
			await newGame.addPlatform(platformDB);
		});
		genres.map(async (g) => {
			const [genreDB, created] = await Genre.findOrCreate({
				where: {
					name: g,
				},
			});
			await newGame.addGenre(genreDB);
		});
		res.status(201).json({ ...newGame.dataValues, platforms: platforms, genres: genres });
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const deleteGame = await deleteGameById(parseInt(id));

		if (deleteGame.error) throw new Error(deleteGame.error);

		return res.status(201).send(deleteGame);
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
});

module.exports = router;

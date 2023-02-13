const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Op } = require('sequelize');

require('dotenv').config();
const { Videogame, Genre } = require('../db');
const axios = require('axios');
const router = Router();
const { API_KEY } = process.env;

const urlConcat = async () => {
	const primeraPag = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);

	const segundaPag = await axios.get(
		`https://api.rawg.io/api/games?key=${API_KEY}&page=2`
	);
	const tercerPag = await axios.get(
		`https://api.rawg.io/api/games?key=${API_KEY}&page=3`
	);
	const cuartaPag = await axios.get(
		`https://api.rawg.io/api/games?key=${API_KEY}&page=4`
	);
	const quintaPag = await axios.get(
		`https://api.rawg.io/api/games?key=${API_KEY}&page=5`
	);

	const videogamesApi = await primeraPag.data.results.concat(
		segundaPag.data.results,
		tercerPag.data.results,
		cuartaPag.data.results,
		quintaPag.data.results
	);

	const resultApi = await Promise.all(videogamesApi);

	return resultApi;
};

router.get('/', async (req, res, next) => {
	try {
		const name = req.query.name;
		const { genre } = req.query;

		const resultApi = await urlConcat();

		const resultFinalApi = resultApi.map((el) => {
			return {
				id: el.id,
				name: el.name,
				description: el.slug,
				image: el.background_image,
				rating: el.rating,
				released: el.released,
				platforms: el.platforms.map((el) => el.platform.name),
				genres: el.genres.map((el) => el.name),
			};
		});

		const videogamesDb = await Videogame.findAll({
			//esto es otra promesa
			include: [
				{
					model: Genre,
					//aca no hace falta aclarar porque es un solo atributo
					attributes: ['name'],
					through: {
						attributes: [],
					},
				},
			],
		});

		const infoTotal = resultFinalApi.concat(videogamesDb);

		if (name) {
			let videogameName = infoTotal.filter((el) =>
				el.name.toLowerCase().includes(name.toLowerCase())
			);
			let resultName = videogameName.slice(0, 15);

			resultName.length
				? res.status(200).send(resultName)
				: res.status(404).send('No se encontro el videojuego');
		} else res.status(200).send(infoTotal);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { name, image, platforms, description, rating, released, genres, createdInDb } =
			req.body; //esto es lo que recibe del body

		if (!name || !description) throw new Error('ERROR!!');
		else {
			const newGame = await Videogame.findOrCreate({
				where: {
					name,
					image: image
						? image
						: 'https://media.kasperskydaily.com/wp-content/uploads/sites/92/2020/02/17105257/game-ratings-featured.jpg',
					description,
					rating,
					createdInDb,
					released,
					platforms,
				},
			});

			let genresId = await Genre.findAll({
				where: {
					name: {
						[Op.in]: genres,
					},
				},
			});

			newGame.addGenre(genresId);

			res.status(200).json(newGame);
		}

		//console.log(total)
	} catch (error) {
		res.status(404).send({ error: error.message });

		//aca el sigueinte midleware es el del manejo de errores en app.js
	}
});

const getApiId = async (id) => {
	const apiId = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);

	const dataUrl = await apiId.data;

	const detailId = {
		id: dataUrl.id,
		name: dataUrl.name,
		description: dataUrl.description_raw,
		rating: dataUrl.rating,
		image: dataUrl.background_image,
		released: dataUrl.released,
		publishers: dataUrl.publishers.map((pb) => pb.name),
		website: dataUrl.website,
		platforms: dataUrl.platforms.map((pf) => pf.platform.name),
		genres: dataUrl.genres.map((g) => g.name),
		stores: dataUrl.stores.map((s) => s.store.name),
		tags: dataUrl.tags.map((t) => t.name),
	};

	return detailId;
};

router.get('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;

		if (id.length <= 7) {
			const videoGameApi = await getApiId(id);
			res.status(200).send(videoGameApi);
		}

		if (id.includes('-')) {
			const videoGameDb = await Videogame.findByPk(
				id,

				{
					include: [
						{
							model: Genre,

							attributes: ['name'],
							through: {
								attributes: [],
							},
						},
					],
				}
			);

			res.status(200).send(videoGameDb);
		} else res.status(404).json({ msg: 'Game not found' });
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;

		if (id.length <= 7) {
			res.status(404).send({ msg: 'No se puede eliminar juegos existentes' });
		}

		if (id.includes('-')) {
			const videoGameDb = await Videogame.findByPk(id, {
				include: [
					{
						model: Genre,

						attributes: ['name'],
						through: {
							attributes: [],
						},
					},
				],
			});

			await videoGameDb.destroy({
				where: {
					id,
				},
			});

			res.status(200).send({ msg: 'Juego eliminado' });
		}

		// else res.status(404).json({ msg: "Game not found" })
	} catch (error) {
		next(error);
	}
});

module.exports = router;

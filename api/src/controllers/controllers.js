require('dotenv').config();
const axios = require('axios');
const { Videogame, Genre, Platform } = require('../db/db');
const { API_KEY } = process.env;

const getInfoApi = async () => {
	let allGames = [];
	let apiUrl = `https://api.rawg.io/api/games?key=${API_KEY}`;
	try {
		for (let i = 0; i < 5; i++) {
			const info = await axios.get(apiUrl, {
				headers: {
					'accept-encoding': '*',
				},
			});

			info.data.results.map((vg) => {
				allGames.push({
					id: vg.id,
					name: vg.name,
					description: vg.description,
					image: vg.background_image,
					released: vg.released,
					rating: vg.rating,
					platforms: vg.platforms.map((e) => e.platform.name),
					genres: vg.genres.map((e) => e.name),
				});
			});
			apiUrl = info.data.next;
		}
		return allGames;
	} catch (error) {
		console.log('error');
	}
};

const getInfo = async () => {
	const infoDb = await Videogame.findAll({
		include: {
			model: Genre,
			attributes: ['name'],
			through: {
				attributes: [],
			},
		},
		include: {
			model: Platform,
			attributes: ['name'],
			through: {
				attributes: [],
			},
		},
	});

	return infoDb;
};

const getAllGames = async () => {
	const infoApi = await getInfoApi();
	const infoDb = await getInfo();
	const allGames = infoApi.concat(infoDb);
	return allGames;
};

const genresApi = async () => {
	try {
		const gamesGenresApi = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`);
		const genres = gamesGenresApi.data.results.map((g) => {
			return g.name;
		});

		genres.forEach((g) => {
			Genre.findOrCreate({
				where: { name: g },
			});
		});
		const genresDb = await Genre.findAll();
		return genresDb;
	} catch (error) {
		console.log('error en genresDb', error);
	}
};

const platformsApi = async () => {
	try {
		const gamesPlatformsApi = await axios(
			`https://api.rawg.io/api/platforms?key=${API_KEY}`
		);
		const platforms = gamesPlatformsApi.data.results.map((g) => g.name);

		platforms.forEach((g) => {
			Platform.findOrCreate({
				where: { name: g },
			});
		});
		const platformsDb = await Platform.findAll();

		return platformsDb;
	} catch (error) {
		console.log('error en genresDb', error);
	}
};

module.exports = {
	getInfoApi,
	getInfo,
	getAllGames,
	genresApi,
	platformsApi,
};

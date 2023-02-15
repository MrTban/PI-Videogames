require('dotenv').config();
const axios = require('axios');
const { Videogame, Genre, Platform } = require('../db');
const { API_KEY } = process.env;
//const apikey= 'c8e8066c85b94b5eb903237cc75394b2';

//https://api.rawg.io/api/games?key=c8e8066c85b94b5eb903237cc75394b2

//traer 100 juegos de la API
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
					platforms: vg.platforms.map((e) => {
						return e.platform.name;
					}),
					genres: vg.genres.map((e) => {
						return { name: e.name };
					}),
				});
			});
			apiUrl = info.data.next;
		}
		return allGames;
	} catch (error) {
		console.log('error');
	}
};

const getInfoDb = async () => {
	const infoDb = await Videogame.findAll({
		include: {
			model: Genre,
			attributes: ['name'],
			through: {
				attributes: [],
			},
		},
	});

	return infoDb;
};

const getInfoTotal = async () => {
	const infoApi = await getInfoApi();
	const infoDb = await getInfoDb();
	const allGames = infoApi.concat(infoDb);
	return allGames;
};

const genresDb = async () => {
	try {
		const infoApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`, {
			headers: {
				'accept-encoding': '*',
			},
		});
		const genres = infoApi.data.results.map((g) => {
			return g.name;
		});

		genres.forEach((g) => {
			Genre.findOrCreate({
				where: { name: g },
			});
		});
		const genresDb = await Genre.findAll();
		//res.send(genresDb);
		return genresDb;
	} catch (error) {
		console.log('error en genresDb', error);
	}
};

const platformsDb = async () => {
	try {
		const infoApi = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`, {
			headers: {
				'accept-encoding': '*',
			},
		});
		const platforms = infoApi.data.results.map((p) => {
			return p.name;
		});

		platforms.forEach((p) => {
			Platform.findOrCreate({
				where: { name: p },
			});
		});
		const platformsDb = await Platform.findAll();
		return platformsDb;
	} catch (error) {
		console.log('error en platformsDb', error);
	}
};

const postGenre = async (name) => {
	const genreCreated = await Genre.create(name);
	return genreCreated;
};

const postPlatform = async (name) => {
	const platformCreated = await Platform.create(name);
	return platformCreated;
};

const postVideoGame = async (objVideoGame) => {
	console.log(objVideoGame);
	try {
		const { name, description, released, rating, image, platforms, genres } =
			objVideoGame;

		const videoGame = {
			name,
			description,
			released,
			rating,
			platforms,
			image,
		};
		const videoGameCreated = await Videogame.create(videoGame);
		genres.map(async (g) => {
			let genre = await Genre.findAll({
				where: { name: g },
			});
			videoGameCreated.addGenre(genre);
		});
		// return videoGameCreated;
	} catch (error) {
		console.log('error en post/game', error);
	}
};

module.exports = {
	getInfoApi,
	getInfoDb,
	getInfoTotal,
	genresDb,
	postVideoGame,
	postGenre,
	platformsDb,
	postPlatform,
};

require('dotenv').config();
const axios = require('axios');
const { Videogame, Genre, Platform } = require('../db/db');
const { API_KEY } = process.env;

const getInfoApi = async () => {
	let allGames = [];
	apiUrl = `https://api.rawg.io/api/games?key=${API_KEY}`;
	try {
		for (let i = 0; i < 5; i++) {
			const info = await axios(apiUrl);

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
		throw new Error(error);
	}
};

const getDbInfo = async () => {
	const instance = await Videogame.findAll({ include: { all: true, nested: true } });
	const data = JSON.parse(JSON.stringify(instance));
	if (data === null) {
		return [];
	}
	const games = data.map((dbGames) => {
		const game = {
			...dbGames,
			genres: dbGames.Genres.map((g) => g.name),
			platforms: dbGames.Platforms.map((p) => p.name),
		};
		delete dbGames.Genre;
		delete dbGames.Platform;
		return game;
	});

	return games;
};

const getAllGames = async () => {
	const infoApi = await getInfoApi();
	const infoDb = await getDbInfo();
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
		throw new Error(error);
	}
};

const platformsApi = async () => {
	try {
		const gamesPlatformsApi = await axios(
			`https://api.rawg.io/api/platforms?key=${API_KEY}`
		);
		const platforms = gamesPlatformsApi.data.results.map((p) => p.name);

		platforms.forEach((p) => {
			Platform.findOrCreate({
				where: { name: p },
			});
		});
		const platformsDb = await Platform.findAll();

		return platformsDb;
	} catch (error) {
		throw new Error(error);
	}
};

const deleteGameById = async (id) => {
	try {
		const deletedGame = await Videogame.destroy({ where: { id: id } });

		return deletedGame;
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = {
	getInfoApi,
	getDbInfo,
	getAllGames,
	genresApi,
	platformsApi,
	deleteGameById,
};

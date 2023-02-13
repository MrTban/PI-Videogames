const { Videogame, Genre, Platform } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

const getVideogameApiData = async () => {
	try {
		let i = 1;
		let dataVideogames = [];

		while (i < 6) {
			const response = await axios(
				`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
			);

			dataVideogames.push(response);
			i++;
		}

		dataVideogames = (await Promise.all(dataVideogames)).map((res) =>
			res.data.results.map((vg) => {
				return {
					id: vg.id,
					name: vg.name,
					description: vg.slug,
					image: vg.background_image,
					rating: vg.rating,
					released: vg.released,
					platforms: vg.platforms.map((vg) => vg.platform.name),
					genres: vg.genres.map((vg) => vg.name),
				};
			})
		);

		let allVideogames = [];
		dataVideogames.map((dvg) => {
			allVideogames = allVideogames.concat(dvg);
		});

		return allVideogames;
	} catch (error) {
		return { error: error.message };
	}
};

const getGenresApiData = async () => {
	try {
		const response = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`);

		const allGenres = await response.data.results.map((g) => g.name);

		return allGenres;
	} catch (error) {}
};

const getPlatformsApiData = async () => {
	try {
		let i = 1;
		let dataPlatforms = [];

		while (1 < 6) {
			const response = await axios(
				`https://api.rawg.io/api/platforms?key=${API_KEY}&page=${i}`
			);

			dataPlatforms.push(response);
			i++;
		}

		dataPlatforms = (await Promise.all(dataPlatforms)).map((res) =>
			res.data.results.map((p) => p.name)
		);

		let allPlatforms = [];
		dataPlatforms.map((dp) => {
			allPlatforms = allPlatforms.concat(dp);
		});

		return allPlatforms;
	} catch (error) {}
};

const saveVideogameApiData = async () => {
	try {
		const allVideogames = await getVideogameApiData();

		await Videogame.bulkCreate(allVideogames);

		return allVideogames;
	} catch (error) {
		return { error: error.message };
	}
};

const saveGenresApiData = async () => {
	try {
		const allGenres = await getGenresApiData();

		await Genre.bulkCreate(allGenres);

		return allGenres;
	} catch (error) {
		return { error: error.message };
	}
};

const savePlatformsApiData = async () => {
	try {
		const allPlatforms = await getPlatformsApiData();

		await Platform.bulkCreate(allPlatforms);

		return allPlatforms;
	} catch (error) {
		return { error: error.message };
	}
};

module.exports = { saveApiData, saveGenresApiData, savePlatformsApiData };

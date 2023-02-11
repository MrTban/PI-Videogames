require('dotenv').config();
const axios = require('axios');
const { Genre } = require('../../db/db');
const { KEY_NAME } = process.env;

const getAllGenres = async () => {
	try {
		let response = await axios(`https://api.rawg.io/api/genres?key=${KEY_NAME}`);
		let genres = response.data.results.map((genre) => {
			return { name: genre.name };
		});
		return genres;
	} catch (error) {
		throw new Error(error);
	}
};

const saveGenres = async () => {
	try {
		const allGenres = await getAllGenres();
		await Genre.bulkCreate(allGenres);

		return allGenres;
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = { getAllGenres, saveGenres };

const { Genre } = require('../../db/db');

const getAllGenres = async () => {
	try {
		const allGenres = await Genre.findAll();

		return allGenres;
	} catch (error) {
		return { error: error.message };
	}
};

module.exports = getAllGenres;

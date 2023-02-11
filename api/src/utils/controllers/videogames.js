const { Videogame } = require('../../db/db');

const getAllVideogames = async () => {
	try {
		const allVideogames = await Videogame.findAll();

		return allVideogames;
	} catch (error) {
		return { error: error.message };
	}
};

module.exports = getAllVideogames;

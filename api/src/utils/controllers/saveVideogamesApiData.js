const axios = require('axios');
require('dotenv').config();
const { KEY_NAME } = process.env;
const { Videogame } = require('../../db/db');

const getAllVideogames = async () => {
	try {
		let allVideogames = [];

		for (let i = 1; i <= 4; i++) {
			//TODO AUMENTAR A 5 o 10
			let response = await axios(
				`https://api.rawg.io/api/games?key=${KEY_NAME}&page=${i}`
			);
			let map = response.data.results.map((game) => {
				let { name, rating, platforms, released, background_image } = game;
				return {
					name,
					description: '',
					platforms,
					image: background_image,
					released,
					rating,
				};
			});
			allVideogames = [...allVideogames, ...map];
		}
		console.log(allVideogames);
		return allVideogames;
	} catch (error) {
		return { error: error.message };
	}
};

const saveVideogames = async () => {
	try {
		const allVideogames = await getAllVideogames();

		await Videogame.bulkCreate(allVideogames);

		return allVideogames;
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = { saveVideogames, getAllVideogames };

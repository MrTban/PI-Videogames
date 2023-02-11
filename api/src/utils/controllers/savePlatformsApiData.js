require('dotenv').config();
const axios = require('axios');
const { Platform } = require('../../db/db');

const { KEY_NAME } = process.env;

const getAllPlatforms = async () => {
	try {
		let response = await axios(`https://api.rawg.io/api/platforms?key=${KEY_NAME}`);
		let map = response.data.results.map((genre) => {
			return { name: genre.name };
		});
		return map;
	} catch (err) {
		throw new Error(err);
	}
};

const savePlatforms = async () => {
	try {
		const allPlatforms = await getAllPlatforms();
		await Platform.bulkCreate(allPlatforms);
		return allPlatforms;
	} catch (err) {
		throw new Error(err);
	}
};

module.exports = { getAllPlatforms, savePlatforms };

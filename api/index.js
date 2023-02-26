const server = require('./src/app.js');
const { conn } = require('./src/db/db');
require('dotenv').config();
const { PORT } = process.env;

// Syncing all the models at once.

conn.sync({ force: false }).then(async () => {
	// console.log('Data connected');
	server.listen(PORT, () => {
		console.log('%s listening at', PORT);
	});
});

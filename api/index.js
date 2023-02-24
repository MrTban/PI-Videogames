const server = require('./src/app.js');
const { conn } = require('./src/db/db');

const port = process.env.PORT || 3001;

// Syncing all the models at once.

conn.sync({ force: false }).then(async () => {
	// console.log('Data connected');
	server.listen(port, () => {
		console.log(`Server raised in port: ${port}`);
	});
});

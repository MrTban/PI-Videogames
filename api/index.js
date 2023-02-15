const server = require('./src/app.js');
const { conn } = require('./src/db');

// Syncing all the models at once.

conn.sync({ force: true }).then(async () => {
	console.log('Data connected');
	server.listen(3001, () => {
		console.log('Server in http://localhost:3001');
	});
});

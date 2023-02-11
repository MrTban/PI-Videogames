//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db/db');
const { saveVideogames } = require('./src/utils/controllers/saveVideogamesApiData');
const { saveGenres } = require('./src/utils/controllers/saveGenresApiData');
const { savePlatforms } = require('./src/utils/controllers/savePlatformsApiData');

const PORT = 3001;

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
	await saveVideogames();
	await saveGenres();
	await savePlatforms();
	server.listen(PORT, () => {
		console.log(`Server on http://localhost:${PORT}`); // eslint-disable-line no-console
	});
});

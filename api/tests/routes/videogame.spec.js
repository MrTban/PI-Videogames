/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app');
const { Videogame, conn } = require('../../src/db/db');

const agent = session(app);
const videogame = {
	name: 'Super Mario Bros',
	description: 'lorem ipsum',
	image:
		'https://media.gettyimages.com/id/533801804/es/foto/silver-back-gorilla.jpg?s=612x612&w=gi&k=20&c=fdyxlSisLTJx_z1kU1y6W0UFHKTp8kjTmSaSLACnY3I=',
	rating: 4.5,
	genres: ['Action'],
	platforms: ['PC'],
	released: '2022-05-11',
};

describe('Videogame routes', () => {
	before(() =>
		conn.authenticate().catch((err) => {
			console.error('Unable to connect to the database:', err);
		})
	);
	beforeEach(() =>
		Videogame.sync({ force: true }).then(() => Videogame.create(videogame))
	);
	describe('GET /videogames', () => {
		it('should get 200', () => agent.get('/videogames').expect(200));
	});
});

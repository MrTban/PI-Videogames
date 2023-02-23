const { Videogame, conn } = require('../../src/db/db');
const { expect } = require('chai');
// const supertest = require('supertest-as-promised')(require('../../src/app.js'))

describe('Videogame model', () => {
	before(() =>
		conn.authenticate().catch((err) => {
			console.error('Unable to connect to the database:', err);
		})
	);
	describe('Validators', () => {
		beforeEach(() => Videogame.sync({ force: true }));

		//* name
		describe('name', () => {
			it('should throw an error if name is null', (done) => {
				Videogame.create({})
					.then(() => done(new Error('It requires a valid name')))
					.catch(() => done());
			});
			it('should work when its a valid name', () => {
				Videogame.create({ name: 'Super Mario Bros' })
					.then(() => done('Success'))
					.catch(() => done());
			});
		});

		//*description
		describe('description', () => {
			it('should throw an error if description is null', (done) => {
				Videogame.create({})
					.then(() => done(new Error('It requires a valid description')))
					.catch(() => done());
			});
			it('should work when its a valid description', () => {
				Videogame.create({
					description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
        nihil, eveniet aliquid culpa officia aut!
        `,
				})
					.then(() => done('Success'))
					.catch(() => done());
			});
		});

		describe('description', () => {
			it('should throw an error if description is null', (done) => {
				Videogame.create({})
					.then(() => done(new Error('It requires a valid description')))
					.catch(() => done());
			});
			it('should work when its a valid description', () => {
				Videogame.create({
					description:
						'https://t3.ftcdn.net/jpg/01/23/29/38/360_F_123293816_PvnD8vbMlABfywNSfZdpRRxfwPe71yVG.jpg',
				})
					.then(() => done('Success'))
					.catch(() => done());
			});
		});
	});
});

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'Videogame',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			released: {
				type: DataTypes.DATEONLY,
				allowNull: true,
			},
			rating: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			// platforms: {
			// 	type: DataTypes.ARRAY(DataTypes.STRING),
			// 	allowNull: true,
			// },
			image: {
				type: DataTypes.STRING,
				defaultValue:
					'https://static.displate.com/857x1200/displate/2021-11-23/a9c80ae5589aebc94387f63326f7d2d1_22bf647282ff5f2cacdf9bedcebe64d5.jpg',
			},
			createdInDb: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
		},
		{ timestamps: false }
	);
};

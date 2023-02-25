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
					'https://i.pinimg.com/564x/17/93/7c/17937c5624135c85cae6f10f58e2f496.jpg',
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

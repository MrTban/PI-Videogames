const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	sequelize.define(
		'Videogame',
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			released: {
				type: DataTypes.STRING,
				allowNull: true,
			},

			image: {
				type: DataTypes.STRING,
				allowNull: true,
			},

			rating: {
				type: DataTypes.FLOAT,
				allowNull: true,
				validate: {
					min: 0,
					max: 5,
					isEven(value) {
						if (value > 5 || value < 0) {
							throw new Error('Only even values are allowed!');
						}
					},
				},
			},
			platforms: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: true,
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

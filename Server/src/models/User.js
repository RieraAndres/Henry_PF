const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
	sequelize.define('User', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		birthdate: {
			type: DataTypes.DATEONLY, // FORMATO DE FECHA = Año/mes/día 
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING,
		},
		email: {
	 		type: DataTypes.STRING,
	 		allowNull: false,
	 		unique: true,
	 		validate: {
	 			isEmail: true,
	 		},
		},
		userName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {   // Usar funciones para hashear o encriptar, y también para verificar 
			type: DataTypes.STRING,   // librería bcrypt
			allowNull: false,
		},
		numberPhone: {
			type: DataTypes.STRING,
		},
		typeUser: {
			type: DataTypes.ENUM('Adopter', 'Admin'),
			allowNull: false,
		},
		donante: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	});
}
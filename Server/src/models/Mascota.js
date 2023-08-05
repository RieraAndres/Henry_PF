const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
	sequelize.define('Mascota', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			unique: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		specie: {
			type: DataTypes.ENUM('Dog', 'Cat'),
			allowNull: true,
		},
		// race: {
		// 	type: DataTypes.STRING,
		// },
		age: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		size: {
			type: DataTypes.ENUM('Grande', 'Chico', 'Mediano'), //Atributo que agregué(Carlos) para el cambio hecho en el form
			allowNull: true
		},
		gender: {
			type: DataTypes.ENUM('hembra', 'macho'),
			allowNull: true,
		},
		imageUrl: { // Nuevo atributo para la URL de la imagen
			type: DataTypes.STRING,
			allowNull: true,
		},
		location: {
			type: DataTypes.STRING,
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
		},
		// healthCondition: {
		// 	type: DataTypes.TEXT,
		// 	allowNull: true,
		// },
		// status: {
		// 	type: DataTypes.ENUM('disponible', 'solicitado', 'adoptado'),
		// 	allowNull: true,
		// },
	});
}
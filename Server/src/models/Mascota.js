const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
	sequelize.define('Mascota', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		specie: {
			type: DataTypes.ENUM('Dog', 'Cat'),
			allowNull: false,
		},
		race: {
			type: DataTypes.STRING,
		},
		age: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		gender: {
			type: DataTypes.ENUM('hembra', 'macho'),
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
		},
		healthCondition: {
			type: DataTypes.TEXT,
			allowNull: false,
		},	
		status: {
			type: DataTypes.ENUM('disponible', 'solicitado', 'adoptado'),
			allowNull: false,
		},
		{
			freezeTableName: true
		}
	});
}
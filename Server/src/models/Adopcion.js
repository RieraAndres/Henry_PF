const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
	sequelize.define('Adopcion', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		dateAdoption: {
			type: DataTypes.DATE,  // Formato: Año/mes/día + Hora: minutos: segundos 
			allowNull: false,
			defaultValue: DataTypes.NOW, // Fecha y hora exacta de registro
		},
		addressAdoption: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		comment: {
			type: DataTypes.TEXT,
		},
		status: {
			type: DataTypes.ENUM('pendiente', 'aprobada', 'rechazada'),
			allowNull: false,
			defaultValue: 'pendiente',
		},
	});
};
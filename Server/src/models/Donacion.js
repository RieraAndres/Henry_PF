const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
	sequelize.define('Donacion', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: uuidv4(),
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		nameDonante: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING,
	 		allowNull: true,
	 		unique: false,
	 		validate: {
	 			isEmail: true,
	 		},
		},
		numberPhone: {
			type: DataTypes.STRING,
		},
		amount: {
			type: DataTypes.DECIMAL(8, 2), // Permite monto hasta: 12345678.99 Por ej.(8 dígitos y 2 decimales)
			allowNull: false,
		},
		receiver: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
		},
		mp_preference_id: {
			type: DataTypes.STRING,
			unique: true,
		},
		mp_payment_id: {
			type: DataTypes.STRING,
			unique: true,
		},
		mp_status: {
			type: DataTypes.STRING,
		},
	});
}
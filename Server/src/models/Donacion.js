const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = sequelize.define('Donacion', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false,
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
	{
		freezeTableName: true
	}
});
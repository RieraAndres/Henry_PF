{ DataTypes } = require('sequelize');
{ v4: uuidv4 } = require('uuid');
const { hashPassword, comparePassword } = require('../passwordUtils/passwordUtils.js');

module.exports = (sequelize) => {
	const User = sequelize.define('User', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
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
		password: { 
			type: DataTypes.STRING,
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
		{
			freezeTableName: true
		}});

		// Esto hashea las contraseñas antes de que genere el registro o actualizar la contraseña
		User.beforeCreate(async (user) => {
			if(user.changed('password')) {
				user.password = await hashPassword(user.password);
			}
		});

		User.beforeUpdate(async (user) => {
			if(user.changed('password')) {
				user.password = await hashPassword(user.password);
			}
		});
		// Verificación de contraseña
		User.prototype.verifyPassword = async (password) => {
			return await comparePassword(password, this.password);
		};
	return User;
};
const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { hashPassword, comparePassword } = require('../passwordUtils/passwordUtils.js');

module.exports = (sequelize) => {
	const User = sequelize.define('User', {
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

	User.beforeCreate(async function(user) {  // Antes de guardar un nuevo registro o actualizar la contraseña, hasheamos la contraseña
    	if (user.changed('password')) {
      		user.password = await hashPassword(user.password);
    	}
  	});

  	User.beforeUpdate(async function(user) { 
    	if (user.changed('password')) {
      		user.password = await hashPassword(user.password);
    	}
  	});

  	User.prototype.verifyPassword = async function(password) {  // Método para verificar la contraseña
    	return await comparePassword(password, this.password);
  	};

  	return User; 
}
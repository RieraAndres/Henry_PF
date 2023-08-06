const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
	sequelize.define('Mascota', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
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
		status: {  //Añadí status nuevamente(Marcos), ya que es necesario para el "borrado lógico"(desactivación de una mascota cuando es adoptada) va de la mano con ruta DELETE
		 	type: DataTypes.BOOLEAN, 
		 	allowNull: true,
		 	defaultValue: true,
		}
		// healthCondition: {
		// 	type: DataTypes.TEXT,
		// 	allowNull: true,
		//},	
	});
}
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('Review', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
        puntuacion:{
            type: DataTypes.ENUM('1','2','3','4','5'),
            allowNull: false,
        },
        comentario:{
            type: DataTypes.STRING,
            allowNull: false
        }
	});
};
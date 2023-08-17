require('dotenv').config();
const { Sequelize } = require('sequelize');

const fs = require('fs');
const path = require('path');
const {
	DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY
} = process.env;

// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/patitas_sin_hogar`, {
// 	logging: false,
// 	native: false,
// });

const sequelize = new Sequelize(DB_DEPLOY, {
	logging: false,
	native: false,
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, 'models/'))
	.filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
	.forEach((file) =>{
		modelDefiners.push(require(path.join(__dirname, 'models/', file)));
	});

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Adopcion, Donacion, Mascota, Review, User } = sequelize.models;

User.hasMany(Adopcion, { foreignKey: 'adoptante_id', as: 'adopcionesAdoptante' });
User.hasMany(Adopcion, { foreignKey: 'admin_id', as: 'adopcionesAdmin' });
User.hasMany(Donacion, { foreignKey: 'donante_id', as: 'donaciones' });

Adopcion.belongsTo(User, { foreignKey: 'adoptante_id', as: 'adoptante' });
Adopcion.belongsTo(User, { foreignKey: 'admin_id', as: 'admin' });
Adopcion.belongsTo(Mascota, { foreignKey: 'mascota_id', as: 'mascota' });

Donacion.belongsTo(User, { foreignKey: 'donante_id', as: 'donante' });

Mascota.hasOne(Adopcion, { foreignKey: 'mascota_id', as: 'adopcion' });
Mascota.belongsTo(User, {foreignKey: 'user_id', as:'publicador'})
User.hasMany(Mascota, { foreignKey: 'user_id', as: 'mascotas' });

User.hasMany(Review, {foreignKey:'user_id', as: 'user'})
Review.belongsTo(User, { foreignKey: 'user_id', as: 'reviewer'})

module.exports = {
	...sequelize.models,
	conn: sequelize,
}
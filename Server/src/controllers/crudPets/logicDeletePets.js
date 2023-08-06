const { Mascota, User } = require('../../db');

const logicDeletePets = async (id) => {
	const petNull = await Mascota.findByPk(id);
	if(!petNull){
		throw new Error('Mascota no encontrada');
	}

	await petNull.update({ status: false });
	return petNull
}

module.exports = logicDeletePets;
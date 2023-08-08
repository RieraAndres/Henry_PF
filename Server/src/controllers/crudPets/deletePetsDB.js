const { Mascota, User } = require('../../db');

const deletePets = async (id) => {
	const petX = await Mascota.findByPk(id);
	if(!petX){
		throw new Error('Mascota no encontrada');
	}

	await petX.destroy()
	return 'Mascota eliminada con éxito'
};

module.exports = deletePets;
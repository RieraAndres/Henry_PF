const { User } = require('../../db');

const setAdminUser = async (id) => {
	const user = await User.findOne({
		where: {
			typeUser: 'Adopter',
		}
	});

	if(!user){
		throw new Error('Usuario no encontrado');
	}

	if (user.typeUser === 'Admin') {
      throw new Error('El usuario ya es un administrador.');
    }

	await user.update({ typeUser: 'Admin' });
	return user
}

module.exports = setAdminUser;
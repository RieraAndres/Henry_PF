const { Mascota, User } = require('../../db');
/*const getIdPet = require('./getIdPet');*/

const modifyPets = async ( id, name, gender, age, imageUrl, specie, size, location, description, status, email, numberPhone) => {
	const pet = await Mascota.findByPk(id);
	if(!pet) {
		throw new Error('Mascota no encontrada');
	}

	pet.name = name;
	pet.gender = gender;
	pet.age = age;
	pet.imageUrl = imageUrl;
	pet.specie = specie;
	pet.size = size;
	pet.location = location;
	pet.description = description;
	pet.email = email;
	pet.numberPhone = numberPhone;
	pet.status = status;

	await pet.save();

	return pet; 
};

module.exports = modifyPets;
const {Mascota, User} = require('../../db')

//Controlador para acceder a todos las mascotas
const getAllPets = async() => {
    try {
        const allPets =  await Mascota.findAll(
            {
            include: {
                model: User,
                as: 'donante',
                attributes: ['email', 'numberPhone'],
            }
        }
        )
        return allPets
    } catch (error) {
        console.log(error);
    } 
}


module.exports = getAllPets;
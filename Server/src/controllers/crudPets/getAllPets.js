const {Mascota, User} = require('../../db')

//Controlador para acceder a todos las mascotas
const getAllPets = async() => {
    try {
        return await Mascota.findAll()
    } catch (error) {
        console.log(error);
    }
}


module.exports = getAllPets;
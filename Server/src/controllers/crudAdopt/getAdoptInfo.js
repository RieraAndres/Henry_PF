const {Adopcion, User} = require('../../db')

//Controlador para acceder a todos las mascotas
const getAllAdoptInfo = async() => {
    try {
        const allAdoptInfo =  await Adopcion.findAll(
            {
            include: {
                model: User,
                as: 'adoptante',
                attributes: ['email', 'name', 'numberPhone', 'birthdate'],
            }})
        return allAdoptInfo
    } catch (error) {
        throw new Error('Un error ha ocurrido buscando la información.');
    } 
}

module.exports = getAllAdoptInfo
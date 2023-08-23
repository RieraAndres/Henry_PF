const { Adopcion, User } = require('../../db');

const postAdoptPet = async (id, name, numberPhone, email, birthdate, addressAdoption, dateAdoption, comment) => {
    try {
        // Buscar al usuario por su dirección de correo electrónico (que debe ser única)
        const existingUser = await User.findOne(
            { 
                where: 
                { 
                    email, 
                } 
            });

        if (existingUser) {
            const createAdopt = await Adopcion.create({
                addressAdoption,
                dateAdoption,
                comment,
                adoptante_id: existingUser.id, // Asignar el ID del usuario existente a la columna adoptanteId en la tabla de Adopción
                mascota_id: id //Asignado el id por params segun el id de la mascota
            });
            return createAdopt;

        }
    } catch (error) {
        console.error('Error en el proceso de adopción:', error);
        throw new Error('Un error ha ocurrido realizando la solicitud.');
    }
};

module.exports = postAdoptPet;

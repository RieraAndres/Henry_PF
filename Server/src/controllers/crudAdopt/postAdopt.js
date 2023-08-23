const nodemailer = require("nodemailer")
const { Adopcion, User, Mascota } = require('../../db');
const sendEmail = require('./mailing/nodemailer')
const htmlForEmail = require('./mailing/htmlForEmail')


const postAdoptPet = async (id, name, age, location, size, description, user_id, nameUser, numberPhone, 
    email, birthdate, addressAdoption,dateAdoption, comment) => {
    try {
        // Buscar al usuario por su dirección de correo electrónico (que debe ser única)
        const existingUser = await User.findOne({ where: { email } });
        const petInfo = await Mascota.findOne({ where: { id: id }, include: { model: User, as: 'publicador' } });
        
        if (existingUser) {
            const createAdopt = await Adopcion.create({
                addressAdoption,
                dateAdoption,
                comment,
                adoptante_id: existingUser.id, // Asignar el ID del usuario existente a la columna adoptanteId en la tabla de Adopción
                mascota_id: id, //Asignado el id por params segun el id de la mascota
                user_id: petInfo.user_id,
            });
            const formattedDateAdoption = createAdopt.dateAdoption.toISOString();
            const publicadorName = petInfo.publicador.name;
            const publicadorlastName = petInfo.publicador.lastName;
            const publicadorNumber = petInfo.publicador.numberPhone;
            const lastName = existingUser.lastName
            const gender = petInfo.gender;
            const htmlContent = htmlForEmail({
                name, lastName, nameUser, publicadorName, publicadorlastName, publicadorNumber, numberPhone, birthdate, addressAdoption,
                formattedDateAdoption, comment, age, gender, location, size, description
            });

            // Envío del correo al usuario interesado en adoptar
            sendEmail([existingUser.email, petInfo.publicador.email], 'Confirmación de solicitud de Adopción', '', htmlContent);
            
            return createAdopt;

        }
    } catch (error) {
        console.error('Error en el proceso de adopción:', error);
        throw new Error('Un error ha ocurrido realizando la solicitud.');
    }
};

module.exports = postAdoptPet;

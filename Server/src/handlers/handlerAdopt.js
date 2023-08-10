const postAdoptPet = require('../controllers/crudAdopt/postAdopt');
const getAllAdoptInfo = require('../controllers/crudAdopt/getAdoptInfo')
const { User, Mascota } = require('../db');

const handlerAdoptPet = async (req, res) => {
    const { name, numberPhone, email, birthdate, addressAdoption, dateAdoption, comment } = req.body;
    const { id } = req.params; // ID de la mascota
    try {
        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await User.findOne({ where: { email } });

        if (!existingUser) { 
            return res.status(400).json({ error: 'Usuario no registrado. Regístrese antes de Realizar una solicitud de adopción.' });
        }
        const petToAdopt = await Mascota.findOne({ where: { id : id} });
        // Crear la solicitud de adopción usando los datos del usuario y los datos específicos de la adopción
        const createAdopt = await postAdoptPet(id,name, numberPhone, email, birthdate, addressAdoption, dateAdoption, comment);

        return res.status(201).json({ message: 'Solicitud de adopción creada exitosamente', data: createAdopt });
    } catch (error) {
        console.error('Error en el proceso de adopción:', error);
        return res.status(500).json({ error: 'Error en el proceso de adopción', details: error.message })
    }
};

const handlerAllAdoptInfo = async(req,res) => {
    try {
        const infoAdoptions = await getAllAdoptInfo()
        return res.json(infoAdoptions)
    } catch (error) {
        return res.status(500).json({ error: 'No se pudo acceder a la info' });
    }
}

module.exports = { handlerAdoptPet, handlerAllAdoptInfo };
